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
   * @param {typedoc.JSONOutput.DeclarationReflection} node
   * @param {typedoc.JSONOutput.DeclarationReflection[]} parents
   */
  walk(node, parents = []) {
    if (!this.filter(node)) {
      return;
    }

    this.visit(node, parents);

    for (const c of node.children ?? []) {
      this.walk(c, [...parents, node]);
    }
  }

  /**
   * @param {typedoc.JSONOutput.DeclarationReflection} node
   * @param {typedoc.JSONOutput.DeclarationReflection[]} parents
   */
  visit(node, parents) {
    if (node.kindString === 'Namespace') {
      const hasNonNamespaceChild = (node.children ?? []).some(
        x => x.kindString !== 'Namespace'
      );
      if (!hasNonNamespaceChild) {
        return;
      }
      const parts = parents
        .filter(parent => parent.kindString !== 'Project')
        .map(parent => parent.name);
      parts.push(node.name);
      const joined = parts.filter(x => x).join('.');
      this.namespaces[joined] = node;
    }
  }

  /**
   * @param {typedoc.JSONOutput.DeclarationReflection} node
   * @return {boolean}
   */
  filter(node) {
    // nb. All of our parsed namespaces are external.
    return !(node.flags?.isPrivate || node.name.startsWith('_'));
  }
}

/**
 * Fetches and builds typedoc JSON for the given .d.ts source files.
 *
 * @param {...string[]} sources
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
