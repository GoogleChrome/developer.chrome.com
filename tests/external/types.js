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
});
