const typedoc = require('typedoc');
const {LogLevel: TypeDocLogLevel} = require('typedoc/dist/lib/utils');
const path = require('path');
const fs = require('fs');

const debug = true;

const modules = [
  '../preamble.d.ts',
  'node_modules/workbox-routing/index.d.ts',
  'node_modules/workbox-core/index.d.ts',
];

const outputPath = path.join(
  __dirname,
  '../../site/_data/namespaces-source.json'
);

// Work from cache dir, so node resolve stuff.
process.chdir(path.join(__dirname, 'cache'));

class Transform {
  /**
   * @param {typedoc.JSONOutput.ProjectReflection} project
   */
  constructor(project) {
    this.project = project;
  }

  /**
   * @return {Promise<typedoc.JSONOutput.DeclarationReflection[]>}
   */
  async run() {
    this.walk(this.project);

    for (const entrypoint of this.project.children ?? []) {
      const lastPart = path.basename(entrypoint.name);
      console.info(lastPart);
    }

    return this.project.children ?? [];
  }

  /**
   * @param {typedoc.JSONOutput.DeclarationReflection} node
   */
  walk(node) {
    if (node.children) {
      node.children = node.children.filter(c => this.filter(c));
      for (const c of node.children) {
        this.walk(c);
      }
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

(async function run() {
  // TODO: trigger "npm update" or install

  const app = new typedoc.Application();
  app.options.addReader(new typedoc.TSConfigReader());
  app.bootstrap({
    entryPoints: modules,
    logger(message, level) {
      switch (level) {
        case TypeDocLogLevel.Warn:
        case TypeDocLogLevel.Error:
          throw new Error(`failed to parse typedoc: ${message}`);
      }
    },
  });
  app.options.setCompilerOptions(
    modules,
    {
      // nb. just for workbox; change for other parse
      lib: ['lib.webworker.d.ts'],
      declaration: true,
    },
    undefined
  );
  const reflection = app.convert();
  if (!reflection) {
    throw new Error(`failed to convert modules: ${modules}`);
  }
  const json = app.serializer.projectToObject(reflection);
  const t = new Transform(json);

  const out = await t.run();

  const render = debug
    ? JSON.stringify(out, undefined, 2)
    : JSON.stringify(out);
  fs.writeFileSync(outputPath, render);
  console.info('Written', out.length, 'namespaces to', outputPath);
})();
