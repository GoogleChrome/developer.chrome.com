const test = require('ava');
const domTransformer = require('../../../site/_transforms/dom-transformer');

test("ignores content if there's no outputPath", t => {
  const content = '<a href="/en/foo"></a>';
  const expected = '<a href="/en/foo"></a>';

  let outputPath = false;
  let actual = domTransformer(content, outputPath);
  t.assert(actual === expected);

  outputPath = undefined;
  actual = domTransformer(content, outputPath);
  t.assert(actual === expected);

  outputPath = '';
  actual = domTransformer(content, outputPath);
  t.assert(actual === expected);
});

test('ignores content if the locale is invalid', t => {
  const content = '<a href="/en/foo"></a>';
  const expected = '<a href="/en/foo"></a>';

  let outputPath = '/xx/foo.html';
  let actual = domTransformer(content, outputPath);
  t.assert(actual === expected);

  outputPath = '/feed.xml';
  actual = domTransformer(content, outputPath);
  t.assert(actual === expected);
});
