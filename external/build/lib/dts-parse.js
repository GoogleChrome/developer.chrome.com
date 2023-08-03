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

/**
 * @fileoverview This largely parses an input .d.ts file with TypeDoc and transforms/flattens it
 * for rendering on the Chrome Developers site. It find interesting namespaces and converts their
 * {@link typedoc.JSONOutput.ProjectReflection} definitions to {@link ExtendedReflection} that
 * contain extra information making them easy to render.
 *
 * More documentation here: https://github.com/GoogleChrome/developer.chrome.com/wiki/Types
 */

const typedoc = require('typedoc');
const {InsertMissingTagsHelper} = require('./dts-parse/missing-param-tags');

// matches "{@link ...}"
const linkMatch = /{@link (\S+?)(|\s+.+?)}/g;

// nb. we include "Event" as typedoc flattens "event.Events" sometimes (?)
const chromeEventRefTypes = ['CustomChromeEvent', 'events.Event', 'Event'];

class Transform {
  /**
   * @param {typedoc.JSONOutput.ProjectReflection} project
   * @param {string=} mode
   */
  constructor(project, mode) {
    this.project = project;
    this.mode = mode;

    /** @type {{[id: string]: ExtendedReflection}} */
    this.pageRoots = {};

    /** @type {ExtendedReflection[]} */
    this.pendingReferences = [];

    /** @type {Map<number, ExtendedReflection>} */
    this.indexForReferences = new Map();

    /** @type {{[id: string]: ExtendedReflection}} */
    this.allByName = {};
  }

  /**
   * Runs the conversion process for a generic .d.ts file loaded into {@link project}.
   *
   * @return {Promise<{[id: string]: ExtendedReflection}>}
   */
  async run() {
    if (this.mode === 'workbox') {
      this.findModuleRoots();
    } else {
      // Find all namespaces with non-namespace children.
      this.findNamespaceRoots();
    }

    if (!Object.keys(this.pageRoots).length) {
      console.warn(this.project);
    }

    // Walk all namespaces as roots.
    for (const namespace of Object.values(this.pageRoots)) {
      this.walk(namespace, null, namespace);
    }

    // Fix all references.
    for (const node of this.pendingReferences) {
      if (node.type?.type !== 'reference') {
        throw new Error(`bad pendingReference: ${JSON.stringify(node)}`);
      }
      const {type} = node;
      const extendedType = /** @type {ExtendedReferenceType} */ (type);

      const target = type.id ? this.indexForReferences.get(type.id) : undefined;
      if (target) {
        extendedType._href = this.createHref(node, target);
      }
    }

    // Update all comments (fix their "{@link ...}" code).
    for (const node of Object.values(this.allByName)) {
      if (node.comment?.shortText) {
        // Fix the node's basic comment.
        let commentText =
          node.comment.shortText + '\n\n' + (node.comment.text ?? '');
        commentText = this.insertCommentHrefForLink(node, commentText);
        if (commentText) {
          node._comment = commentText;
        }
      }

      // Fix the node's deprecated notice.
      const deprecated = node._feature.deprecated;
      if (deprecated?.value) {
        deprecated.value = this.insertCommentHrefForLink(
          node,
          deprecated.value
        );
      }

      // Fix the node's enums, if any.
      for (const e of node._enums ?? []) {
        e.description = this.insertCommentHrefForLink(node, e.description);
      }
    }

    // Success!
    return this.pageRoots;
  }

  /**
   * Replaces `{@link ...}` annotations found in the text, rooted at the specified node.
   *
   * @param {ExtendedReflection} node
   * @param {string|undefined} raw
   * @return {string}
   */
  insertCommentHrefForLink(node, raw) {
    raw = (raw ?? '').trim();
    return raw.replace(linkMatch, (_, link, text) => {
      if (!text) {
        text = `\`${link}\``;
      }
      const other = this.resolveLink(node._name, link);
      if (other) {
        const href = this.createHref(node, other);
        if (href) {
          return `[${text}](${href})`;
        }
      }
      // There's a small number of {@link} in the codebase that don't resolve. Whatever.
      return text;
    });
  }

  /**
   * Create a link between the two nodes. (This assumes the `_pageId` and optional `_pageHref`)
   * values are already configured.
   *
   * @param {ExtendedReflection} from
   * @param {ExtendedReflection} to
   * @return {string|undefined}
   */
  createHref(from, to) {
    // This is "#foo" if there's an ID, or blank otherwise.
    const hashPlusId = to._pageId ? '#' + to._pageId : '';

    if (from._pageHref === to._pageHref) {
      // This is the same page, so just use the target's ID.
      // Return undefined if this is a node linking to its own namespace (the ID will be blank).
      return hashPlusId || undefined;
    } else {
      // Otherwise, create a whole link.
      return '../' + to._pageHref + '/' + hashPlusId;
    }
  }

  /**
   * Resolve a link from the given ID to the given link, after {@link allByName} has been created.
   *
   * This literally just appends the target link to all combinations of the given ID and tests
   * for presence, e.g.: for id="foo.bar.zing.Hello" link="Bar"
   *   1. "foo.bar.zing.Hello.Bar"
   *   2. "foo.bar.zing.Bar"
   *   3. "foo.bar.Bar"
   *   4. "foo.Bar"
   *   5. "Bar"
   *
   * @param {string} id
   * @param {string} link
   */
  resolveLink(id, link) {
    id = id.trim();
    link = link.trim();
    if (!link) {
      return;
    }

    /** @type {(s: string) => string} */
    const popLast = s => {
      const last = s.lastIndexOf('.');
      return last > 0 ? s.substr(0, last) : '';
    };

    for (;;) {
      const check = id ? `${id}.${link}` : link;
      const cand = this.allByName[check];
      if (cand) {
        return cand;
      }
      if (!id) {
        break;
      }
      id = popLast(id);
    }

    return undefined;
  }

  /**
   * Walks the project and finds modules which have children. Sets up {@link pageRoots} and
   * {@link allByName}.
   */
  findModuleRoots() {
    const hasNonModule = (this.project.children ?? []).some(reflection => {
      return reflection.kind !== typedoc.ReflectionKind.Module;
    });

    // If the project itself has non-module childen, we probably just parsed a single file.
    const modules = hasNonModule ? [this.project] : this.project.children ?? [];

    for (const module of modules) {
      const extendedModule = /** @type {ExtendedReflection} */ (module);

      extendedModule._name = module.name;
      extendedModule._pageHref = module.name;

      this.pageRoots[extendedModule._name] = extendedModule;
      this.allByName[extendedModule._name] = extendedModule;
    }
  }

  /**
   * Walks the project and find namespaces which have non-namespace children. Sets up
   * {@link pageRoots} and {@link allByName} for these.
   *
   * This is used for Chrome's source, which parses a giant file with numerous namespaces.
   *
   * Note that in Chrome's source, we have nested namespaces like "networking.onc":
   * "networking" isn't included since it only has namespaces for children.
   */
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
      extendedNode._pageHref = id.replace(/\./g, '_');

      let hasOnlyNamespaces = true;

      for (const child of node.children ?? []) {
        if (child.kind === typedoc.ReflectionKind.Namespace) {
          traverse(child, node);
        } else {
          hasOnlyNamespaces = false;
        }
      }

      if (!hasOnlyNamespaces) {
        this.pageRoots[id] = extendedNode;
        this.allByName[extendedNode._name] = extendedNode;
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
   * Filters a given node.
   *
   * @param {typedoc.JSONOutput.DeclarationReflection} node
   * @param {ExtendedReflection?} _parent
   * @param {ExtendedReflection} _namespace
   * @return {boolean}
   */
  // eslint-disable-next-line no-unused-vars
  filter(node, _parent, _namespace) {
    if (node.flags.isPrivate) {
      return false;
    }
    return true;
  }

  /**
   * Walks and visits all nodes, filtering as nessecary.
   *
   * @param {Iterable<typedoc.JSONOutput.DeclarationReflection>} nodes
   * @param {ExtendedReflection?} parent
   * @param {ExtendedReflection} namespace
   * @return {ExtendedReflection[]}
   */
  walkAll(nodes, parent, namespace) {
    const walked = Array.from(nodes).map(node =>
      this.walk(node, parent, namespace)
    );
    return /** @type {ExtendedReflection[]} */ (walked.filter(x => x));
  }

  /**
   * Walks and visits a single node, converting the `node` param to actually provide the extended
   * type {@link ExtendedReflection}. This is called recursively from within this method.
   *
   * @param {typedoc.JSONOutput.DeclarationReflection} node
   * @param {ExtendedReflection?} parent
   * @param {ExtendedReflection} namespace
   * @return {ExtendedReflection?} the same node but casted to {@link ExtendedReflection}
   */
  walk(node, parent, namespace) {
    if (!this.filter(node, parent, namespace)) {
      return null;
    }

    const extendedNode = /** @type {ExtendedReflection} */ (node);

    let nodePrefix = 'type';
    if (node.kind & typedoc.ReflectionKind.VariableOrProperty) {
      nodePrefix = 'property';
    }

    // Set the page that this node is on, which might be needed bt children.
    if (parent) {
      extendedNode._name = `${parent._name}.${node.name}`;
      extendedNode._pageHref = namespace._pageHref;
      this.allByName[extendedNode._name] = extendedNode;
    }

    // We create virtual nodes at -1, so don't store them.
    if (node.id > 0) {
      this.indexForReferences.set(node.id, extendedNode);
    }

    if (node.type?.type === 'reference') {
      // Only upgrade node if not a workbox type
      // The upgrade Event node should only be applied to Chrome specific events
      if (
        this.mode !== 'workbox' &&
        chromeEventRefTypes.includes(node.type.name)
      ) {
        // This is actually a reference to a Chrome event type. This returns the parameters of the
        // `addListener` method, so they can be upgraded too.
        const {children, isDeclarative} = this.upgradeEventNode(node);

        // Walk these nodes and apply as a method.
        if (children) {
          const parameters = this.walkAll(children, extendedNode, namespace);
          if (!isDeclarative) {
            extendedNode._method = {parameters};
          }
        }

        nodePrefix = 'event';
      } else {
        // We'll resolve this later.
        this.pendingReferences.push(extendedNode);
      }
    }

    const effectiveDeclarationNode = declarationWith(node);

    // This is a type or namespace or something with children.
    // Only process non-namespace children, we caught those above.
    if (effectiveDeclarationNode.children?.length) {
      const children = (effectiveDeclarationNode.children ?? []).filter(
        ({kind}) => kind !== typedoc.ReflectionKind.Namespace
      );
      effectiveDeclarationNode.children = [];

      if (children.length) {
        // Upgrade and cast all the children to `properties`.
        const properties = this.walkAll(children, extendedNode, namespace);
        extendedNode._type = {properties};
      }
    }

    // This is a function or a method.
    if (effectiveDeclarationNode.signatures?.length) {
      nodePrefix = 'method';

      let nodeComment = effectiveDeclarationNode.comment;
      let returnSignatureComment = undefined;

      /** @type {typedoc.JSONOutput.SomeType | undefined} */
      let returnType = undefined;

      const {signatures} = effectiveDeclarationNode;
      effectiveDeclarationNode.signatures = [];

      /** @type {Map<string, typedoc.JSONOutput.ParameterReflection>} */
      const allParams = new Map();

      for (const s of signatures) {
        for (const param of s.parameters ?? []) {
          // This is incorrect syntax that annotates optional params, e.g. "[foo]"
          // It shows up inside the Workbox source.
          if (/^\[.*\]$/.test(param.name)) {
            param.name = param.name.substring(1, param.name.length - 1);
          }
          if (!allParams.has(param.name) || param.flags.isOptional) {
            allParams.set(param.name, {...param});
          }
        }

        // If there's a return type and it's not void, record it for display later.
        if (
          s.type &&
          !(s.type.type === 'intrinsic' && s.type.name === 'void')
        ) {
          // The signature with a return value wins the comment, as unlike the parameters, this
          // comment is on the signature.
          nodeComment = nodeComment ?? s.comment;
          returnSignatureComment = s.comment;

          // TODO: This can appear multiple times (bad Promise method) but should always be equal.
          returnType = s.type;
        }
      }

      // We need to check every param to see if it's missing in some OTHER signature.
      for (const param of allParams.values()) {
        if (param.flags.isOptional) {
          continue; // this is already optional
        }

        for (const s of signatures) {
          const paramNames = (s.parameters ?? []).map(({name}) => name);

          // If this signature doesn't have this param, it's optional.
          // This marks "early optional" params.
          if (!paramNames.includes(param.name)) {
            param.flags.isOptional = true;
            break; // skip rest, won't become _more_ optional
          }
        }
      }

      // Hoist the comment onto the top node if it doesn't already have one (and we didn't pick it
      // up from choosing the signature with a return type).
      // This solves the problem that TypeDoc thinks methods are actually "methodName.methodName".
      nodeComment = nodeComment ?? signatures[0]?.comment;
      node.comment = nodeComment;

      extendedNode._method = {parameters: []};

      // If we have a return type, create a virtual ParameterReflection that we walk over and
      // record in "_method.return" for display.
      if (returnType) {
        /** @type {typedoc.JSONOutput.ParameterReflection} */
        const virtualNode = {
          id: -1,
          name: 'return',
          kind: typedoc.ReflectionKind.Parameter,
          flags: {},
          type: returnType,
          comment: {
            // Pull out tags that start with "@chrome-returns-extra" and put them here.
            tags: this.extractReturnTags(returnSignatureComment?.tags ?? []),
            shortText: nodeComment?.returns,
          },
        };

        // Upgrade the virtual node we just built and store.
        extendedNode._method.return =
          this.walk(virtualNode, extendedNode, namespace) ?? undefined;

        // "returnsAsync" is a concept only for Chrome types where we have multiple signatures.
        // If there's a single signature, don't bother announcing this.
        if (
          signatures.length >= 2 &&
          returnType?.type === 'reference' &&
          returnType.name === 'Promise'
        ) {
          extendedNode._method.isReturnsAsync = true;
        }
      }

      // Upgrade all the parameters and store on the extended type.
      extendedNode._method.parameters = this.walkAll(
        allParams.values(),
        extendedNode,
        namespace
      );
    }

    // This could have embedded types (intersection, union, array or tuple).
    // We descend into them as a virtual reflection just so things like _method and references are
    // correctly addressed.
    if (!extendedNode._event) {
      const t = effectiveDeclarationNode.type;

      // Grab any inner properties of a union or intersection, entirely for "chrome.storage" which
      // does a weird intersection between a ref and properties.
      /** @type {ExtendedReflection[]} */
      const innerProperties = [];
      const hoistProperties = Boolean(
        t && ('types' in t || 'elementType' in t)
      );

      /** @type {typedoc.JSONOutput.SomeType[]} */
      const allTypes = [
        t?.['types'],
        t?.['elements'],
        t?.['elementType'],
        t?.['typeArguments'],
      ]
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

        if (hoistProperties) {
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

    // Extract comment/tags for processing below.
    const effectiveComment = effectiveDeclarationNode?.comment ?? node.comment;
    const effectiveTags = effectiveComment?.tags ?? [];

    // Set feature information last, as the comment may have changed (due to signatures).
    extendedNode._feature = this._processTagsToFeature(effectiveTags);

    // Is this actually a type containing enums? Add any relevant information.
    const maybeEumPairs = this._processTagsForChromeEnum(effectiveTags);
    if (maybeEumPairs) {
      extendedNode._enums = maybeEumPairs;
    }

    // Set the ID on the page last, because we get its nodePrefix (e.g., "method" or "property")
    // via the checks above.
    if (parent) {
      // Remove e.g., "chrome.networking.onc." from "chrome.networking.onc.someApiName".
      const pageIdPart = extendedNode._name.substr(namespace._name.length + 1);
      extendedNode._pageId = nodePrefix + '-' + pageIdPart.replace(/\./g, '-');
    }

    return extendedNode;
  }

  /**
   * Given tags from a method signature, extract virtual comment tags. This just takes anything
   * identified with "chrome-returns-extra" and extracts it, as there's otherwise no good way
   * to annotate the return type (it's not a reflection that can have tags).
   *
   * @param {typedoc.JSONOutput.CommentTag[]} tags
   * @return {typedoc.JSONOutput.CommentTag[]|undefined}
   */
  extractReturnTags(tags) {
    /** @type {typedoc.JSONOutput.CommentTag[]} */
    const virtualNodeTags = [];

    for (const tag of tags) {
      if (tag.tag !== 'chrome-returns-extra') {
        continue;
      }

      const tagName = tag.text.split(' ')[0];
      const rest = tag.text.substr(tagName.length).trim();

      virtualNodeTags.push({tag: tagName, text: rest});
    }

    return virtualNodeTags.length ? virtualNodeTags : undefined;
  }

  /**
   * Converts the passed node, which points to `chrome.Event` or `CustomChromeEvent`, to have a
   * magic `_event` property describing its behavior to the rendering code.
   *
   * @param {typedoc.JSONOutput.DeclarationReflection} node
   * @return {{children: typedoc.JSONOutput.DeclarationReflection[], isDeclarative: boolean}}
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

      // Declarative events all support a number of types in an array for both their conditions and
      // their actions. However TypeDoc doesn't gives us an array for singulars.

      /** @type {(type: typedoc.JSONOutput.SomeType) => typedoc.JSONOutput.SomeType[]} */
      const ensureArrayOfType = type => {
        if (type.type === 'union') {
          // TODO(samthor): this cast is redundant but tsc is confused.
          return /** @type {typedoc.JSONOutput.SomeType[]} */ (type.types);
        }
        return [type];
      };

      const conditions = ensureArrayOfType(typeArguments[1]);
      const actions = ensureArrayOfType(typeArguments[2]);
      extendedNode._event = {conditions, actions};

      // Return virtual types that get updated (for references).
      const children = [...conditions, ...actions].map(type => {
        return {
          id: -1,
          name: '_declarative-fake',
          kind: typedoc.ReflectionKind.TypeAlias,
          flags: {},
          type,
        };
      });
      return {children, isDeclarative: true};
    } else {
      // Otherwise, steal the declaration and include it as a single paramater.
      parameters = [
        {
          id: -1,
          name: 'callback',
          kind: typedoc.ReflectionKind.Parameter,
          flags: {},
          type: referenceType.typeArguments?.[0],
        },
      ];
    }

    // If this is a normal event, pretend it's a method.
    // Our parent applies the `_method` update.
    extendedNode._event = {};
    return {children: parameters, isDeclarative: false};
  }

  /**
   * @param {typedoc.JSONOutput.CommentTag[]} tags
   * @return {FeatureInfo}
   */
  _processTagsToFeature(tags) {
    /** @type {{value: string, since?: string}} */
    const deprecated = {value: ''};

    /** @type {FeatureInfo} */
    const out = {
      channel: 'stable',
    };

    // See https://github.com/GoogleChrome/developer.chrome.com/issues/2298
    let chromeOsOnly = undefined;

    tags.forEach(({tag, text}) => {
      text = text.trim(); // some show up with extra \n

      switch (tag) {
        case 'default':
          out.default = text;
          break;
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
        case 'chrome-platform':
          // If chromeos is the platform, and chromeOsOnly is undefined because
          // we haven't seen any other platforms, this might be chromeOsOnly.
          if (text === 'chromeos' && chromeOsOnly === undefined) {
            chromeOsOnly = true;
          } else if (text === 'lacros') {
            // We don't currently have a lacros specific pill, so we don't need
            // to do much here, but we should avoid falling in to the next case
            // and unsetting chromeOsOnly.
          } else {
            // The first time we see a platform that's not chromeos or lacros,
            // we know the feature isn't chromeOsOnly.
            chromeOsOnly = false;
          }
          break;
      }
    });

    if (chromeOsOnly === true) {
      out.chromeOsOnly = true;
    }

    return out;
  }

  /**
   * @param {typedoc.JSONOutput.CommentTag[]} tags
   * @return {TypesEnumPair[]|undefined}
   */
  _processTagsForChromeEnum(tags) {
    /** @type {TypesEnumPair[]} */
    const enums = [];

    tags.forEach(({tag, text}) => {
      text = text.trim(); // some show up with extra \n
      if (tag !== 'chrome-enum') {
        return;
      }

      // TODO: This relies on enums looking like `"foo\_bar"`, without spaces.
      // If this JSON.parse breaks it's likely because an enum has a space in it.
      const raw = text.split(' ')[0].replace(/\\_/g, '_');
      const value = JSON.parse(raw);

      const rest = text.substring(text.indexOf(' ') + 1).trim();
      enums.push({value, description: rest});
    });

    return enums.length ? enums : undefined;
  }
}

/**
 * Returns this node, unless it is a type that points to a declaration. (Appears in cases like
 * some embedded interface types.)
 *
 * @param {typedoc.JSONOutput.DeclarationReflection} node
 * @return {typedoc.JSONOutput.DeclarationReflection}
 */
function declarationWith(node) {
  if (node.type?.type === 'reflection' && node.type.declaration) {
    return declarationWith(node.type.declaration);
  } else {
    return node;
  }
}

/**
 * Fetches and builds typedoc JSON for the given .d.ts source files.
 *
 * @param {{silent?: boolean, sources: string[], mode?: string}} options
 * @return {Promise<{[id: string]: ExtendedReflection}>}
 */
module.exports = async function parse({silent, sources, mode}) {
  /** @type {typedoc.TypeScript.CompilerOptions} */
  const typescriptOptions = {
    declaration: true,
    esModuleInterop: true,
  };

  /** @type {Partial<typedoc.TypeDocOptions>} */
  const typedocOptions = {
    emit: 'none',
    listInvalidSymbolLinks: true,
    entryPoints: sources,
    logger(message, level) {
      switch (level) {
        case typedoc.LogLevel.Warn:
        case typedoc.LogLevel.Error:
          throw new Error(`failed to parse typedoc: ${message}`);
      }
      if (!silent) {
        console.warn(message);
      }
    },
  };

  switch (mode) {
    case 'workbox':
      // We don't want to parse DOM.
      typescriptOptions.lib = ['lib.webworker.d.ts'];
      break;
  }

  const app = new typedoc.Application();
  app.options.addReader(new typedoc.TSConfigReader());
  app.bootstrap(typedocOptions);

  // nb. This doesn't need to be ref'ed, it just attaches to converter.
  new InsertMissingTagsHelper(app.converter);

  app.options.setCompilerOptions(sources, typescriptOptions, undefined);
  const project = app.convert();
  if (!project) {
    throw new Error(`failed to convert modules: ${sources}`);
  }

  // HACK: Quickly remove the filename from all reflections. This comes from a temp directory, so
  // it will cause the data to change _every build_.
  //   * This could be kept somehow to point back to the source files for e.g., Workbox.
  //   * This could be used to extend every reflection before converting to JSON, rather than us
  //     traversing the whole JSON tree, because it guarantees to visit every reflection (even
  //     those hidden in types or template arguments etc).
  for (const reflection of project.getReflectionsByKind(
    typedoc.ReflectionKind.All
  )) {
    for (const source of reflection.sources ?? []) {
      source.fileName = '';
    }
  }

  const json = app.serializer.projectToObject(project);
  const t = new Transform(json, mode);

  const out = await t.run();
  return out;
};
