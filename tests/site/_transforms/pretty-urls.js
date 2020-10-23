const test = require('ava');
const {prettyUrls} = require('../../../site/_transforms/pretty-urls');

const template = markup => {
  return `<html><head></head><body>${markup}</body></html>`;
};

test("returns content if it doesn't have an output path", t => {
  let content = 'hello';
  let expected = 'hello';
  let outputPath = undefined;

  t.assert(prettyUrls(content, outputPath) === expected);

  content = 'world';
  outputPath = false;
  expected = 'world';

  t.assert(prettyUrls(content, outputPath) === expected);

  content = 'foo';
  outputPath = 1;
  expected = 'foo';

  t.assert(prettyUrls(content, outputPath) === expected);
});

test('returns content if the output locale is invalid', t => {
  const content = 'hello';
  const expected = 'hello';
  const outputPath = '/xx/foo/index.html';

  t.assert(prettyUrls(content, outputPath) === expected);
});

test('removes the /en/ prefix from links', t => {
  let content = template('<a href="/en/foo"></a>');
  let expected = template('<a href="/foo/"></a>');
  let outputPath = '/en/bar/index.html';

  t.assert(prettyUrls(content, outputPath) === expected);

  content = template('<a href="/en/foo/bar/baz/"></a>');
  expected = template('<a href="/foo/bar/baz/"></a>');
  outputPath = '/en/bar/index.html';

  t.assert(prettyUrls(content, outputPath) === expected);

  content = template('<a href="/en/"></a>');
  expected = template('<a href="/"></a>');
  outputPath = '/en/bar/index.html';

  t.assert(prettyUrls(content, outputPath) === expected);

  content = template('<a href="/en"></a>');
  expected = template('<a href="/"></a>');
  outputPath = '/en/bar/index.html';

  t.assert(prettyUrls(content, outputPath) === expected);
});

test('adds the /${locale}/ prefix to links', t => {
  let content = template('<a href="/foo"></a>');
  let expected = template('<a href="/pl/foo/"></a>');
  let outputPath = '/pl/bar/index.html';

  t.assert(prettyUrls(content, outputPath) === expected);

  content = template('<a href="/foo/bar/baz/"></a>');
  expected = template('<a href="/pl/foo/bar/baz/"></a>');
  outputPath = '/pl/bar/index.html';

  t.assert(prettyUrls(content, outputPath) === expected);

  content = template('<a href="/"></a>');
  expected = template('<a href="/pl/"></a>');
  outputPath = '/pl/bar/index.html';

  t.assert(prettyUrls(content, outputPath) === expected);
});

test('ignores external links', t => {
  let content = template('<a href="https://example.com"></a>');
  let expected = template('<a href="https://example.com"></a>');
  let outputPath = '/en/foo/index.html';

  t.assert(prettyUrls(content, outputPath) === expected);

  content = template('<a href="http://example.com"></a>');
  expected = template('<a href="http://example.com"></a>');
  outputPath = '/en/foo/index.html';

  t.assert(prettyUrls(content, outputPath) === expected);

  content = template('<a href="http://en/example.com"></a>');
  expected = template('<a href="http://en/example.com"></a>');
  outputPath = '/en/foo/index.html';

  t.assert(prettyUrls(content, outputPath) === expected);
});

test('ignores links without an href', t => {
  const content = template('<a></a>');
  const expected = template('<a></a>');
  const outputPath = '/en/bar/index.html';

  t.assert(prettyUrls(content, outputPath) === expected);
});

test('ignores internal links', t => {
  const content = template('<a href="#foo"></a>');
  const expected = template('<a href="#foo"></a>');
  const outputPath = '/en/bar/index.html';

  t.assert(prettyUrls(content, outputPath) === expected);
});

test('adds the locale prefix but does not add a trailing slash if there is a hash anchor', t => {
  const content = template('<a href="/docs/example/#foo"></a>');
  const expected = template('<a href="/pl/docs/example/#foo"></a>');
  const outputPath = '/pl/docs/example/index.html';

  t.assert(prettyUrls(content, outputPath) === expected);
});

test('removes the /en/ prefix but does not add a trailing slash if there is a hash anchor', t => {
  const content = template('<a href="/en/docs/example/#foo"></a>');
  const expected = template('<a href="/docs/example/#foo"></a>');
  const outputPath = '/en/docs/example/index.html';

  t.assert(prettyUrls(content, outputPath) === expected);
});

test('ignores mailto links', t => {
  const content = template('<a href="mailto:me@google.com"></a>');
  const expected = template('<a href="mailto:me@google.com"></a>');
  const outputPath = '/en/bar/index.html';

  t.assert(prettyUrls(content, outputPath) === expected);
});

test('ignores relative links', t => {
  let content = template('<a href="foo.jpg"></a>');
  let expected = template('<a href="foo.jpg"></a>');
  let outputPath = '/en/bar/index.html';

  t.assert(prettyUrls(content, outputPath) === expected);

  content = template('<a href="./foo.jpg"></a>');
  expected = template('<a href="./foo.jpg"></a>');
  outputPath = '/en/bar/index.html';

  t.assert(prettyUrls(content, outputPath) === expected);

  content = template('<a href="../foo.jpg"></a>');
  expected = template('<a href="../foo.jpg"></a>');
  outputPath = '/en/bar/index.html';

  t.assert(prettyUrls(content, outputPath) === expected);
});
