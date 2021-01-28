const test = require('ava');
const cheerio = require('cheerio');
const {
  prettyUrls: prettyUrlsRaw,
} = require('../../../site/_transforms/pretty-urls');

/**
 * @param {cheerio.Selector} $
 * @param {string} outputPath
 * @param {string} locale
 */
const prettyUrls = ($, outputPath, locale) => {
  prettyUrlsRaw($, outputPath, locale);
  return $;
};

const template = markup => {
  return cheerio.load(`<html><head></head><body>${markup}</body></html>`);
};

test('removes the /en/ prefix from links', t => {
  const locale = 'en';
  const outputPath = '/en/bar/index.html';
  let $ = template('<a href="/en/foo"></a>');
  let expected = template('<a href="/foo/"></a>').html();
  let actual = prettyUrls($, outputPath, locale).html();
  t.assert(actual === expected);

  $ = template('<a href="/en/foo/bar/baz/"></a>');
  expected = template('<a href="/foo/bar/baz/"></a>').html();
  actual = prettyUrls($, outputPath, locale).html();
  t.assert(actual === expected);

  $ = template('<a href="/en/"></a>');
  expected = template('<a href="/"></a>').html();
  actual = prettyUrls($, outputPath, locale).html();
  t.assert(actual === expected);

  $ = template('<a href="/en"></a>');
  expected = template('<a href="/"></a>').html();
  actual = prettyUrls($, outputPath, locale).html();
  t.assert(actual === expected);
});

test('adds the /${locale}/ prefix to links', t => {
  const locale = 'pl';
  const outputPath = '/pl/bar/index.html';
  let $ = template('<a href="/foo"></a>');
  let expected = template('<a href="/pl/foo/"></a>').html();
  let actual = prettyUrls($, outputPath, locale).html();
  t.assert(actual === expected);

  $ = template('<a href="/foo/bar/baz/"></a>');
  expected = template('<a href="/pl/foo/bar/baz/"></a>').html();
  actual = prettyUrls($, outputPath, locale).html();
  t.assert(actual === expected);

  $ = template('<a href="/"></a>');
  expected = template('<a href="/pl/"></a>').html();
  actual = prettyUrls($, outputPath, locale).html();
  t.assert(actual === expected);
});

test('ignores external links', t => {
  const locale = 'en';
  const outputPath = '/en/foo/index.html';
  let $ = template('<a href="https://example.com"></a>');
  let expected = template('<a href="https://example.com"></a>').html();
  let actual = prettyUrls($, outputPath, locale).html();
  t.assert(actual === expected);

  $ = template('<a href="http://example.com"></a>');
  expected = template('<a href="http://example.com"></a>').html();
  actual = prettyUrls($, outputPath, locale).html();
  t.assert(actual === expected);

  $ = template('<a href="http://en/example.com"></a>');
  expected = template('<a href="http://en/example.com"></a>').html();
  actual = prettyUrls($, outputPath, locale).html();
  t.assert(actual === expected);
});

test('ignores links without an href', t => {
  const locale = 'en';
  const outputPath = '/en/bar/index.html';
  const $ = template('<a></a>');
  const expected = template('<a></a>').html();
  const actual = prettyUrls($, outputPath, locale).html();
  t.assert(actual === expected);
});

test('ignores internal links', t => {
  const locale = 'en';
  const outputPath = '/en/bar/index.html';
  const $ = template('<a href="#foo"></a>');
  const expected = template('<a href="#foo"></a>').html();
  const actual = prettyUrls($, outputPath, locale).html();
  t.assert(actual === expected);
});

test('adds the locale prefix but does not add a trailing slash if there is a hash anchor', t => {
  const locale = 'pl';
  const outputPath = '/pl/docs/example/index.html';
  const $ = template('<a href="/docs/example/#foo"></a>');
  const expected = template('<a href="/pl/docs/example/#foo"></a>').html();
  const actual = prettyUrls($, outputPath, locale).html();
  t.assert(actual === expected);
});

test('removes the /en/ prefix but does not add a trailing slash if there is a hash anchor', t => {
  const locale = 'en';
  const outputPath = '/en/docs/example/index.html';
  const $ = template('<a href="/en/docs/example/#foo"></a>');
  const expected = template('<a href="/docs/example/#foo"></a>').html();
  const actual = prettyUrls($, outputPath, locale).html();
  t.assert(actual === expected);
});

test('ignores mailto links', t => {
  const locale = 'en';
  const outputPath = '/en/bar/index.html';
  const $ = template('<a href="mailto:me@google.com"></a>');
  const expected = template('<a href="mailto:me@google.com"></a>').html();
  const actual = prettyUrls($, outputPath, locale).html();
  t.assert(actual === expected);
});

test('ignores relative links', t => {
  const locale = 'en';
  const outputPath = '/en/bar/index.html';
  let $ = template('<a href="foo.jpg"></a>');
  let expected = template('<a href="foo.jpg"></a>').html();
  let actual = prettyUrls($, outputPath, locale).html();
  t.assert(actual === expected);

  $ = template('<a href="./foo.jpg"></a>');
  expected = template('<a href="./foo.jpg"></a>').html();
  actual = prettyUrls($, outputPath, locale).html();
  t.assert(actual === expected);

  $ = template('<a href="../foo.jpg"></a>');
  expected = template('<a href="../foo.jpg"></a>').html();
  actual = prettyUrls($, outputPath, locale).html();
  t.assert(actual === expected);
});
