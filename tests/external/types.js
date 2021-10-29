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
 * @param {string} source
 */
async function parseVirtualTypes(source) {
  const t = tmp.dirSync();
  const file = path.join(t.name, 'types.d.ts');
  try {
    fs.writeFileSync(file, source);
    return await dtsParse({silent: true, sources: [file]});
  } finally {
    fs.rmSync(t.name, {recursive: true});
  }
}

test('basic', async t => {
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

  const types = await parseVirtualTypes(source);
  t.deepEqual(Object.keys(types), ['purelyForTest']);

  // FIXME: types not inferring here

  const fooNamespace = types['purelyForTest']?._type?.properties[0];
  const helloProperty = fooNamespace?._type?.properties[0];

  t.deepEqual(helloProperty._feature, {
    channel: 'stable',
    since: 'Chrome 42',
  });

  t.is(helloProperty._name, 'chrome.purelyForTest.Foo.hello');
  t.is(helloProperty._pageHref, 'purelyForTest');
  t.is(helloProperty._pageId, 'property-Foo-hello');

  t.deepEqual(helloProperty.type, {
    name: 'number',
    type: 'intrinsic',
  });
});
