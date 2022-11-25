const test = require('ava');
const domTransformer = require('../../../site/_transforms/dom-transformer');

test("ignores content if there's no outputPath", async t => {
  const content = '<a href="/en/foo"></a>';
  const expected = '<a href="/en/foo"></a>';

  let outputPath = false;
  let actual = await domTransformer(content, outputPath);
  t.assert(actual === expected);

  outputPath = undefined;
  actual = await domTransformer(content, outputPath);
  t.assert(actual === expected);

  outputPath = '';
  actual = await domTransformer(content, outputPath);
  t.assert(actual === expected);
});

test('ignores content if the locale is invalid', async t => {
  const content = '<a href="/en/foo"></a>';
  const expected = '<a href="/en/foo"></a>';

  let outputPath = '/xx/foo.html';
  let actual = await domTransformer(content, outputPath);
  t.assert(actual === expected);

  outputPath = '/feed.xml';
  actual = await domTransformer(content, outputPath);
  t.assert(actual === expected);
});
