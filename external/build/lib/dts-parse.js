/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const typedoc = require('typedoc');

// nb. we include "Event" as typedoc flattens "event.Events" sometimes (?)
const chromeEventRefTypes = ['CustomChromeEvent', 'events.Event', 'Event'];

class Transform {
  /**
   * @param {typedoc.JSONOutput.ProjectReflection} project
   */
  constructor(project) {
    this.project = project;

    /** @type {{[id: string]: typedoc.JSONOutput.DeclarationReflection}} */
    this.namespaces = {};
  }

  /**
   */
  async run() {
    // Find all namespaces with non-namespace children.
    this.walk(this.project);
    return this.namespaces;
  }

  /**
   * @param {typedoc.JSONOutput.Reflection} node
   * @param {typedoc.JSONOutput.Reflection[]} parents
   */
  walk(node, parents = []) {
    const parentsForChild = [...parents, node];

    if ('children' in node) {
      const reflection =
        /** @type {typedoc.JSONOutput.DeclarationReflection} */ (node);

      const children = (reflection?.children ?? []).filter(this.filter);
      for (const c of children) {
        this.walk(c, parentsForChild);
      }
      reflection.children = children;
    }

    // Flatten signatures. Chrome has weird optional signatures.
    if (signaturesForReflection(node)) {
      this._mergeSignatures(node, parents);
    }

    if ('type' in node) {
      // 'type' can appear on different types of reflection, just assert the common 'type' param.
      const typedNode = /** @type {{type?: typedoc.JSONOutput.SomeType}} */ (
        node
      );

      if (typedNode.type?.type === 'reflection' && typedNode.type.declaration) {
        this.walk(typedNode.type.declaration, parentsForChild);
      }

      if (
        typedNode.type?.type === 'reference' &&
        typedNode.type.typeArguments
      ) {
        for (const t of typedNode.type.typeArguments) {
          if (t.type === 'reflection' && t.declaration) {
            this.walk(t.declaration, parentsForChild);
          }
        }
      }
    }

    if (node.kind === typedoc.ReflectionKind.CallSignature) {
      const callSignature =
        /** @type {typedoc.JSONOutput.SignatureReflection} */ (node);
      if (callSignature.parameters) {
        for (const c of callSignature.parameters) {
          this.walk(c, parentsForChild);
        }
      }
    }

    // We visit the self node last, as the visit call below can delete parts of its children too.
    this.visit(node, parents);
  }

  /**
   * @param {typedoc.JSONOutput.DeclarationReflection} node
   * @param {typedoc.JSONOutput.Reflection[]} parents
   */
  _mergeSignatures(node, parents) {
    // Grab the signatures either from the reflection (inline type) or from top-level (if
    // function). This is kinda gross below but just matches the conditional.
    // nb. It's possible for signatures to be empty if an inline function takes no parameters.
    const signatures = signaturesForReflection(node);
    if (!signatures) {
      throw new Error(
        `can't merge for node without signatures: ${JSON.stringify(node)}`
      );
    }

    // Hoist the comment onto the top node if it doesn't already have one.
    // This solves the problem that TypeDoc thinks methods are actually "methodName.methodName".
    node.comment = node.comment ?? signatures[0]?.comment;

    /** @type {Map<string, typedoc.JSONOutput.ParameterReflection>} */
    const allParams = new Map();

    for (const s of signatures) {
      for (const param of s.parameters ?? []) {
        if (allParams.has(param.name) && !param.flags.isOptional) {
          // optional params win
          continue;
        }
        allParams.set(param.name, param);
      }

      if (s.type) {
        // this is the Promise verison, or a version with a return value
        // TODO: group separately?
      }
    }

    // FIXME: We can't delete this or the event code doesn't work.
    // Clear the old data so our JSON isn't enormous.
    // delete node.signatures;
    // if (node.type?.type === 'reflection') {
    //   delete node.type.declaration?.signatures;
    // }

    const extendedNode = /** @type {ExtendedReflection} */ (node);
    extendedNode._method = {
      parameters: [...allParams.values()],
    };

    // We just created virtual params, so just walk over them.
    for (const param of extendedNode._method.parameters) {
      this.walk(param, parents);
    }
  }

  /**
   * @param {typedoc.JSONOutput.Reflection} node
   * @param {typedoc.JSONOutput.Reflection[]} parents
   */
  visit(node, parents) {
    const parts = parents
      .filter(parent => parent.kind !== typedoc.ReflectionKind.Project)
      .map(parent => parent.name);
    parts.push(node.name);
    const fqdn = parts.filter(x => x).join('.');

    if (node.kind === typedoc.ReflectionKind.Namespace) {
      const declaration =
        /** @type {typedoc.JSONOutput.DeclarationReflection} */ (node);
      const hasNonNamespaceChild = (declaration.children ?? []).some(
        x => x.kind !== typedoc.ReflectionKind.Namespace
      );
      if (!hasNonNamespaceChild) {
        return;
      }
      this.namespaces[fqdn] = node;
    }

    const extendedNode = /** @type {ExtendedReflection} */ (node);

    extendedNode._name = fqdn;

    // Grab the comment off the _type_ first, which includes @since and etc.
    const preferComment = node?.type?.declaration?.comment ?? node.comment;
    extendedNode._feature = this._processTags(preferComment?.tags ?? []);

    // This is an event reference (used in Chrome extensions), so parse it for easy reference.
    if (
      node.type?.type === 'reference' &&
      chromeEventRefTypes.includes(node.type.name)
    ) {
      const firstArgument = node.type.typeArguments?.[0];
      if (!firstArgument) {
        throw new Error(`got reference to ${node.type.name} without argument`);
      }

      /** @type {typedoc.JSONOutput.ParameterReflection[]|undefined} */
      let parameters;

      if (node.type.name === 'CustomChromeEvent') {
        // CustomChromeEvent specifies all parameters to addListener directly.
        const arg = /** @type {typedoc.JSONOutput.ReflectionType} */ (
          firstArgument
        );
        parameters = arg.declaration?.signatures?.[0]?.parameters;
      } else if (firstArgument.type === 'intrinsic') {
        // This is a declarative event, because its first argument is "never".
        const intrinsicType = /** @type {typedoc.JSONOutput.IntrinsicType} */ (
          firstArgument
        );
        if (intrinsicType.name !== 'never') {
          throw new Error(
            `unexpected first argument for declarative event: ${JSON.stringify(
              firstArgument
            )}`
          );
        }

        // TODO: something
      } else {
        // Otherwise, steal the declaration and include it as a single paramater.
        parameters = [
          {
            id: -1,
            name: 'callback',
            kind: 32768,
            flags: {},
            type: node.type.typeArguments?.[0],
          },
        ];
      }

      // If this is a normal event, pretend it's a method.
      if (parameters) {
        extendedNode._method = {parameters};
        extendedNode._event = {};

        // Walk these node as we've just created them virtually for addListener's callback type.
        // It won't be walked otherwise.
        for (const param of parameters) {
          this.walk(param, parents);
        }
      }
      // TODO: what if it's a declarative event
    }
  }

  /**
   * @param {typedoc.JSONOutput.CommentTag[]} tags
   * @return {FeatureInfo}
   */
  _processTags(tags) {
    /** @type {{value: string, since?: string}} */
    const deprecated = {value: ''};

    /** @type {FeatureInfo} */
    const out = {
      channel: 'stable',
    };

    tags.forEach(({tag, text}) => {
      text = text.trim(); // some show up with extra \n

      switch (tag) {
        case 'chrome-platform-apps':
          out.platformAppsOnly = true;
          break;
        case 'since':
          out.since = text;
          break;
        case 'chrome-channel':
          out.channel = text;
          break;
        case 'chrome-permission':
          out.permissions = out.permissions ?? [];
          out.permissions.push(text);
          break;
        case 'chrome-manifest':
          out.manifestKeys = out.manifestKeys ?? [];
          out.manifestKeys.push(text);
          break;
        case 'deprecated':
          out.deprecated = deprecated;
          deprecated.value = text;
          break;
        case 'chrome-deprecated-since':
          out.deprecated = deprecated;
          deprecated.since = text;
          break;
        case 'chrome-min-manifest':
          out.minManifest = text;
          break;
        case 'chrome-max-manifest':
          out.maxManifest = text;
          break;
        case 'chrome-disallow-service-workers':
          out.disallowServiceWorkers = true;
          break;
      }
    });

    return out;
  }

  /**
   * @param {typedoc.JSONOutput.DeclarationReflection} node
   * @return {boolean}
   */
  filter(node) {
    return true;

    // nb. All of our parsed namespaces are external.
    return !(node.flags?.isPrivate || node.name.startsWith('_'));
  }
}

/**
 * @param {typedoc.JSONOutput.Reflection} node
 * @return {typedoc.JSONOutput.SignatureReflection[]|undefined}
 */
function signaturesForReflection(node) {
  if (node['signatures']) {
    const reflection = /** @type {typedoc.JSONOutput.DeclarationReflection} */ (
      node
    );
    return reflection.signatures ?? [];
  }

  if (node['type']) {
    const typedNode = /** @type {{type?: typedoc.JSONOutput.SomeType}} */ (
      node
    );
    if (typedNode.type?.type === 'reflection' && typedNode.type.declaration) {
      return signaturesForReflection(typedNode.type.declaration);
    }
  }

  return undefined;
}

/**
 * Fetches and builds typedoc JSON for the given .d.ts source files.
 *
 * @param {...string} sources
 * @return {Promise<{[id: string]: typedoc.JSONOutput.DeclarationReflection}>}
 */
module.exports = async function parse(...sources) {
  const app = new typedoc.Application();
  app.options.addReader(new typedoc.TSConfigReader());
  app.bootstrap({
    // excludeExternals: true,
    excludeInternal: true,
    excludePrivate: true,
    excludeProtected: true,
    entryPoints: sources,
    logger(message, level) {
      switch (level) {
        case typedoc.LogLevel.Warn:
        case typedoc.LogLevel.Error:
          throw new Error(`failed to parse typedoc: ${message}`);
      }
    },
  });
  app.options.setCompilerOptions(
    sources,
    {
      // TODO: for Workbox assume we're a webworker
      // lib: ['lib.webworker.d.ts'],
      declaration: true,
    },
    undefined
  );
  const reflection = app.convert();
  if (!reflection) {
    throw new Error(`failed to convert modules: ${sources}`);
  }
  const json = app.serializer.projectToObject(reflection);
  const t = new Transform(json);

  const out = await t.run();
  return out;
};
