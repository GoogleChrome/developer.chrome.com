const test = require('ava');
const tmp = require('tmp');
const fs = require('fs');

const {parseChromeTypesFile} = require('../../../tools/types/types');

const namespacesPromise = buildCommonTestNamespaces();

/**
 * We use a common parsed string for many tests. This returns a Promise (even
 * though it's needless) so failures show up in each test case.
 *
 * @return {Promise<RenderNamespace[]>}
 */
async function buildCommonTestNamespaces() {
  const commonTestSource = `
declare namespace notChrome {
  export var testValue: number;
}

declare namespace chrome {
  export namespace test {
    export var variableTestSingle: "foo";
    export var enumTestMany: "foo" | "bar";
    export type enumTypeSingle = "single_option";
    export interface Stuff {}
  }
  export namespace stuff {
    export interface StuffType {
      manySelfStuff?: chrome.stuff.StuffType[];
      otherNamespaceStuff: chrome.test.Stuff;
    }
    export type TwoStuffType = {0: StuffType, 1: StuffType} & StuffType[];
  }
}
`;
  const f = tmp.fileSync({postfix: '.d.ts'});
  try {
    fs.writeFileSync(f.name, commonTestSource);
    return parseChromeTypesFile(f.name);
  } finally {
    f.removeCallback();
  }
}

test('parse demo Chrome types', async t => {
  const namespaces = await namespacesPromise;
  t.is(namespaces.length, 2);

  const [chromeStuff, chromeTest] = namespaces;
  t.is(chromeStuff.name, 'stuff');
  t.is(chromeTest.name, 'test');

  // Check that a variable that can only be one thing is not converted to an enum.
  const variableTestSingle = chromeTest.properties.find(
    ({name}) => name === 'variableTestSingle'
  );
  t.deepEqual(
    variableTestSingle,
    {
      fullName: 'chrome.test.variableTestSingle',
      name: 'variableTestSingle',
      literalValue: '"foo"',
      type: 'primitive',
      primitiveType: 'string',
    },
    'single string var is kept as primitive'
  );

  // Check that a type that can only be one thing is converted to an enum.
  const enumTypeSingle = chromeTest.types.find(
    ({name}) => name === 'enumTypeSingle'
  );
  t.deepEqual(
    enumTypeSingle,
    {
      fullName: 'chrome.test.enumTypeSingle',
      name: 'enumTypeSingle',
      isEnum: true,
      type: 'union',
      options: [
        {
          literalValue: '"single_option"',
          type: 'primitive',
          primitiveType: 'string',
        },
      ],
    },
    'single enum type is created'
  );

  // Check that an odd union type is converted to an array of minimum length.
  const typeTwoStuff = chromeStuff.types.find(
    ({name}) => name === 'TwoStuffType'
  );
  t.deepEqual(
    typeTwoStuff,
    {
      fullName: 'chrome.stuff.TwoStuffType',
      name: 'TwoStuffType',
      type: 'array',
      minLength: 2,
      elementType: {
        type: 'reference',
        referenceType: 'chrome.stuff.StuffType',
      },
    },
    'TwoStuffType is a reference to array of minLength=2'
  );
});
