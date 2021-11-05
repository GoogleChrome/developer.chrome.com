/**
 * @fileoverview Tests for TypeDoc / .d.ts parser.
 */

// eslint-disable-next-line ava/use-test
const {default: test} = require('ava');
const tmp = require('tmp');
const fs = require('fs');
const path = require('path');
const dtsParse = require('../../external/build/lib/dts-parse.js');

/**
 * @param {{module?: string, source: string}[]} sources
 * @param {string=} mode
 */
async function parseVirtualTypes(sources, mode) {
  const t = tmp.dirSync();

  try {
    /** @type {string[]} */
    const paths = [];

    for (const {source, module} of sources) {
      const dir = module ? path.join(t.name, 'node_modules', module) : t.name;
      const file = path.join(dir, 'index.d.ts');

      fs.mkdirSync(dir, {recursive: true});
      fs.writeFileSync(file, source);

      paths.push(file);

      // Create a virtual node module for import.
      if (module) {
        // nb. TypeDoc expects "index.d.ts" regardless of what we put here.
        const j = {name: module, types: 'index.d.ts'};
        fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify(j));
      }
    }

    return await dtsParse({silent: true, sources: paths, mode});
  } finally {
    fs.rmSync(t.name, {recursive: true});
  }
}

test('chrome-like data', async t => {
  const source = `
declare namespace chrome {
  export namespace purelyForTest {
    export interface Foo {

      /**
       * @since Chrome 42
       */
      hello: number;
    }
  }
}
  `;

  const types = await parseVirtualTypes([{source}]);
  t.deepEqual(Object.keys(types), ['purelyForTest']);

  // FIXME: types not inferring here

  const fooNamespace = types['purelyForTest']?._type?.properties[0];
  const helloProperty = fooNamespace?._type?.properties[0];

  t.deepEqual(helloProperty?._feature, {
    channel: 'stable',
    since: 'Chrome 42',
  });

  t.is(helloProperty?._name, 'chrome.purelyForTest.Foo.hello');
  t.is(helloProperty?._pageHref, 'purelyForTest');
  t.is(helloProperty?._pageId, 'property-Foo-hello');

  t.deepEqual(helloProperty?.type, {
    name: 'number',
    type: 'intrinsic',
  });
});

test('early optional method', async t => {
  const source = `
declare namespace chrome {
  export namespace purelyForTest {
    export function foo(a: number, b: string, c?: string): void;
    export function foo(b: string, c?: string): void;
  }
}
  `;

  const types = await parseVirtualTypes([{source}]);

  const fooMethod = types['purelyForTest']?._type.properties[0];
  t.truthy(fooMethod._method);
  t.falsy(fooMethod._method.return, 'method has void return type, left blank');
  t.falsy(fooMethod._method.isReturnsAsync, 'not async');

  const params = fooMethod._method.parameters;
  t.is(params.length, 3);
  t.true(
    params[0].flags.isOptional,
    'param a is optional, merged from signatures'
  );
  t.falsy(params[1].flags.isOptional, 'param b is not optional');
  t.true(params[2].flags.isOptional, 'param c is optional');
});

test('workbox-like data', async t => {
  const source1 = `
type HTTPMethod = 'GET';
type Route = string;

declare class Router {
  private readonly _routes;
  private _defaultHandler?;
  private _catchHandler?;
  /**
   * Initializes a new Router.
   */
  constructor();
  /**
   * @return {Map<string, Array<module:workbox-routing.Route>>} routes A \`Map\` of HTTP
   * method name ('GET', etc.) to an array of all the corresponding \`Route\`
   * instances that are registered.
   */
  get routes(): Map<HTTPMethod, Route[]>;
}
/**
 * @module workbox-test
 */
export { Router };
  `;

  const source2 = `
import { Router } from 'workbox-router';

/**
 * Does a thing!
 *
 * @param r The router to do a thing on
 */
declare function DoThing(r: Router): number;

export { DoThing };
`;

  const sources = [
    {source: source1, module: 'workbox-router'},
    {source: source2, module: 'workbox-whatever'},
  ];

  const types = await parseVirtualTypes(sources, 'workbox');

  const outputKeys = Object.keys(types);
  outputKeys.sort();
  t.deepEqual(outputKeys, ['workbox-router', 'workbox-whatever']);

  const routerType = types['workbox-router'];
  const routerRouterClass = routerType?._type?.properties[0];
  t.is(routerRouterClass?._name, 'workbox-router.Router');
});
