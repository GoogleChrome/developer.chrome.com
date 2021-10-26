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

    /** @type {{[id: string]: ExtendedReflection}} */
    this.namespaces = {};

    /** @type {ExtendedReflection[]} */
    this.pendingReferences = [];

    /** @type {Map<number, ExtendedReflection>} */
    this.indexForReferences = new Map();
  }

  /**
   */
  async run() {
    // Find all namespaces with non-namespace children.
    this.findNamespaceRoots();

    // Use these as roots.

    for (const namespace of Object.values(this.namespaces)) {
      this.walk(namespace, null, namespace);
    }

    for (const node of this.pendingReferences) {
      if (node.type?.type !== 'reference') {
        throw new Error(`bad pendingReference: ${JSON.stringify(node)}`);
      }
      const {type} = node;
      const extendedType = /** @type {ExtendedReferenceType} */ (type);

      const target = type.id ? this.indexForReferences.get(type.id) : undefined;
      if (!target) {
        continue;
      }

      if (node._pageHref === target._pageHref) {
        // This is the same page, so just use the target's ID.
        extendedType._href = '#' + target._pageId;
      } else {
        // Otherwise, create a whole link.
        extendedType._href = '../' + target._pageHref + '/#' + target._pageId;
      }
    }

    return this.namespaces;

    // this.walk(this.project);
    // return this.namespaces;
  }

  findNamespaceRoots() {
    /**
     * @param {typedoc.JSONOutput.DeclarationReflection} node
     * @param {typedoc.JSONOutput.DeclarationReflection} parent
     */
    const traverse = (node, parent) => {
      const extendedNode = /** @type {ExtendedReflection} */ (node);
      if (parent === this.project) {
        extendedNode._name = node.name;
      } else {
        const parentExtendedNode = /** @type {ExtendedReflection} */ (parent);
        extendedNode._name = `${parentExtendedNode._name}.${node.name}`;
      }

      const id = extendedNode._name.replace(/^chrome\./, '');
      extendedNode._pageHref = id.replaceAll('.', '_');

      let hasOnlyNamespaces = true;

      for (const child of node.children ?? []) {
        if (child.kind === typedoc.ReflectionKind.Namespace) {
          traverse(child, node);
        } else {
          hasOnlyNamespaces = false;
        }
      }

      if (!hasOnlyNamespaces) {
        this.namespaces[id] = extendedNode;
      }
    };

    // Traverse through the project's top-level namespaces. It should not have anything else.
    for (const child of this.project.children ?? []) {
      if (child.kind === typedoc.ReflectionKind.Namespace) {
        traverse(child, this.project);
      }
    }
  }

  /**
   * @param {typedoc.JSONOutput.DeclarationReflection} node
   * @param {ExtendedReflection?} parent
   * @param {ExtendedReflection} namespace
   */
  walk(node, parent, namespace) {
    const extendedNode = /** @type {ExtendedReflection} */ (node);

    let nodePrefix = 'type';

    // Set the page that this node is on, which might be needed bt children.
    if (parent) {
      extendedNode._name = `${parent._name}.${node.name}`;
      extendedNode._pageHref = namespace._pageHref;
    }

    // We create virtual nodes at -1, so don't store them.
    if (node.id > 0) {
      this.indexForReferences.set(node.id, extendedNode);
    }

    if (node.type?.type === 'reference') {
      if (chromeEventRefTypes.includes(node.type.name)) {
        // This is actually a reference to a Chrome event type. This returns the parameters of the
        // `addListener` method, so they can be upgraded too.
        const children = this.upgradeEventNode(node);
        for (const c of children) {
          this.walk(c, extendedNode, namespace);
        }
        nodePrefix = 'event';
      } else {
        // We'll resolve this later.
        this.pendingReferences.push(extendedNode);
        nodePrefix = 'property';
      }
    }

    const effectiveDeclarationNode = declarationWith(node);
    const effectiveComment = effectiveDeclarationNode?.comment ?? node.comment;
    extendedNode._feature = this._processTags(effectiveComment?.tags ?? []);

    // This is a type or namespace or something with children.
    // Only process non-namespace children, we caught those above.
    if (effectiveDeclarationNode?.children?.length) {
      const children = (effectiveDeclarationNode.children ?? []).filter(
        ({kind}) => kind !== typedoc.ReflectionKind.Namespace
      );
      effectiveDeclarationNode.children = [];

      if (children.length) {
        extendedNode._type = {
          properties: children,
        };
        for (const c of children) {
          this.walk(c, extendedNode, namespace);
        }
      }
    }

    // This is a function or a method.
    if (effectiveDeclarationNode?.signatures?.length) {
      nodePrefix = 'method';

      const {signatures} = effectiveDeclarationNode;
      effectiveDeclarationNode.signatures = [];

      // Hoist the comment onto the top node if it doesn't already have one.
      // This solves the problem that TypeDoc thinks methods are actually "methodName.methodName".
      node.comment = node.comment ?? signatures[0]?.comment;

      /** @type {Map<string, typedoc.JSONOutput.ParameterReflection>} */
      const allParams = new Map();

      for (const s of signatures) {
        for (const param of s.parameters ?? []) {
          if (!allParams.has(param.name) || param.flags.isOptional) {
            allParams.set(param.name, param);
          }
        }

        if (s.type) {
          // this is the Promise verison, or a version with a return value
          // TODO: group separately?
        }
      }

      extendedNode._method = {
        parameters: [...allParams.values()],
      };

      // We just created virtual params, so just walk over them.
      for (const param of extendedNode._method.parameters) {
        this.walk(param, extendedNode, namespace);
      }
    }

    // This has embedded types (intersection, union, array or tuple).
    // We descend into them as a virtual reflection just so things like _method and references are
    // correctly addressed.
    if (
      effectiveDeclarationNode?.type?.['types'] ||
      effectiveDeclarationNode?.type?.['elements'] ||
      effectiveDeclarationNode?.type?.['elementType']
    ) {
      const t = effectiveDeclarationNode.type;

      // Grab any inner properties of a union or intersection, entirely for "chrome.storage" which
      // does a weird intersection between a ref and properties.
      /** @type {typedoc.JSONOutput.DeclarationReflection[]} */
      const innerProperties = [];
      const unionOrIntersectionType = 'types' in t;

      /** @type {typedoc.JSONOutput.SomeType[]} */
      const allTypes = [t['types'], t['elements'], t['elementType']]
        .flat()
        .filter(x => x);

      for (const t of allTypes) {
        /** @type {typedoc.JSONOutput.DeclarationReflection} */
        const virtualNode = {
          id: -1,
          name: effectiveDeclarationNode.name,
          kind: typedoc.ReflectionKind.TypeAlias,
          flags: {},
          type: t,
        };
        this.walk(virtualNode, extendedNode, namespace);

        if (unionOrIntersectionType) {
          const extendedVirtualNode = /** @type {ExtendedReflection} */ (
            virtualNode
          );
          if (extendedVirtualNode._type) {
            innerProperties.push(...extendedVirtualNode._type.properties);
          }
        }
      }

      // Apply the properties if we found any.
      if (innerProperties.length) {
        extendedNode._type = {properties: innerProperties};
      }
    }

    // Set the ID on the page last, because we get its nodePrefix (e.g., "method" or "property")
    // via the checks above.
    if (parent) {
      // Remove e.g., "chrome.networking.onc." from "chrome.networking.onc.someApiName".
      const pageIdPart = extendedNode._name.substr(namespace._name.length + 1);
      extendedNode._pageId = nodePrefix + '-' + pageIdPart.replaceAll('.', '-');
    }
  }

  /**
   * @param {typedoc.JSONOutput.DeclarationReflection} node
   */
  upgradeEventNode(node) {
    const extendedNode = /** @type {ExtendedReflection} */ (node);
    const referenceType = /** @type {typedoc.JSONOutput.ReferenceType} */ (
      /** @type {unknown} */ (node.type)
    );

    const typeArguments = referenceType.typeArguments;

    const firstArgument = typeArguments?.[0];
    if (!firstArgument) {
      throw new Error(
        `got reference to ${referenceType.name} without argument`
      );
    }

    /** @type {typedoc.JSONOutput.ParameterReflection[]} */
    let parameters;

    if (referenceType.name === 'CustomChromeEvent') {
      // CustomChromeEvent specifies all parameters to addListener directly.
      const arg = /** @type {typedoc.JSONOutput.ReflectionType} */ (
        firstArgument
      );
      parameters = arg.declaration?.signatures?.[0]?.parameters ?? [];
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
      if (!typeArguments[1] || !typeArguments[2]) {
        throw new Error(
          `declarative event missing args: ${JSON.stringify(referenceType)}`
        );
      }

      extendedNode._event = {
        conditions: typeArguments[1],
        actions: typeArguments[2],
      };

      // TODO: need to traverse these too?
      return [];
    } else {
      // Otherwise, steal the declaration and include it as a single paramater.
      parameters = [
        {
          id: -1,
          name: 'callback',
          kind: 32768,
          flags: {},
          type: referenceType.typeArguments?.[0],
        },
      ];
    }

    // If this is a normal event, pretend it's a method.
    extendedNode._method = {parameters};
    extendedNode._event = {};
    return parameters;
  }

  /**
   * @param {typedoc.JSONOutput.CommentTag[]} tags
   * @return {FeatureInfo}
   */
  _processTags(tags) {
    /** @type {{value: string, since?: string}} */
    const deprecated = {value: ''};

    /** @type {{value: string|number, description: string}[]} */
    const enumPairs = [];

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
        case 'chrome-enum': {
          // TODO: This relies on enums looking like `"foo_bar"`, without spaces.
          const raw = text.split(' ')[0].replaceAll('\\_', '_');
          const rest = raw.substr(text.length + 1);
          enumPairs.push({value: JSON.parse(raw), description: rest});
        }
      }
    });

    // TODO: augment feature/result with enum

    return out;
  }
}

/**
 * @param {typedoc.JSONOutput.DeclarationReflection} node
 * @param {(dr: typedoc.JSONOutput.DeclarationReflection) => boolean} filter
 * @return {typedoc.JSONOutput.DeclarationReflection|undefined}
 */
function declarationWith(node, filter = () => true) {
  if (node.type?.type === 'reflection' && node.type.declaration) {
    return declarationWith(node.type.declaration, filter);
  } else if (filter(node)) {
    return node;
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
