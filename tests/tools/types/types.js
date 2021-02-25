const test = require('ava');
const tmp = require('tmp');
const fs = require('fs');

const {
  generateTypeDocProject,
  extractPublicChromeNamespaces,
  renderNamespaceFromNamespace,
} = require('../../../tools/types/types');
const {exportedChildren} = require('../../../tools/types/helpers');

const namespacesPromise = buildCommonTestNamespaces();

// We use a common parsed string for a number of tests. This returns a Promise
// so failures here show up in each test case, not globally.
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
    const project = generateTypeDocProject(f.name);
    const namespaces = extractPublicChromeNamespaces(project);
    const out = [];
    for (const name in namespaces) {
      const rn = renderNamespaceFromNamespace(
        'test.d.ts',
        name,
        namespaces[name]
      );
      out.push(rn);
    }
    return out;
  } finally {
    f.removeCallback();
  }
}

// Ensure that we remove all temporary files.
test.afterEach.always(t => {
  t.context.cleanup?.();
});

test('identifies exported namespace children', t => {
  const source = `
declare namespace test {
  var foo: number;

  export {foo as bar};
  export {foo as bar2};

  export var bar3: "enum";

  export interface Exported {}
}
`;
  const f = tmp.fileSync({postfix: '.d.ts'});
  fs.writeFileSync(f.name, source);
  t.context.cleanup = f.removeCallback;

  const td = generateTypeDocProject(f.name);
  const testNamespace = td.getChildByName('test');

  const children = exportedChildren(testNamespace, ~0);
  const keys = Object.keys(children);
  keys.sort();

  t.deepEqual(keys, ['Exported', 'bar', 'bar2', 'bar3']);
});

test('parse demo Chrome types', async t => {
  const namespaces = await namespacesPromise;
  t.is(namespaces.length, 2);

  const [chromeStuff, chromeTest] = namespaces;
  t.is(chromeStuff.fullName, 'chrome.stuff');
  t.is(chromeTest.fullName, 'chrome.test');

  // Check that a variable that can only be one thing is not converted to an enum.
  const variableTestSingle = chromeTest.properties.find(
    ({name}) => name === 'variableTestSingle'
  );
  t.deepEqual(
    variableTestSingle,
    {
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
      name: 'TwoStuffType',
      type: 'array',
      minLength: 2,
      elementType: {
        type: 'reference',
        referenceLink: '#type-StuffType',
        referenceType: 'StuffType',
      },
    },
    'TwoStuffType is a reference to array of minLength=2'
  );
});
