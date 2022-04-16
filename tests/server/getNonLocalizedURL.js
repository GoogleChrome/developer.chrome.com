/**
 * @fileoverview Tests the logic used when translating invalid localized URLs to
 * valid URLs without an i18n prefix.
 */

const path = require('path');
const test = require('ava');

const {getNonLocalizedURL} = require('../../server/not-found');

const ROOT_DIR = path.join(__dirname, 'fixtures');
const DEFAULT_LOCALE = 'en';

test('returns null if no redirect is possible', t => {
  const result = getNonLocalizedURL(
    '/ja/doesnotexist/',
    ROOT_DIR,
    DEFAULT_LOCALE
  );
  t.is(result, null);
});

test('returns null if no redirect is possible, with an index.html suffix', t => {
  const result = getNonLocalizedURL(
    '/ja/doesnotexist/index.html',
    ROOT_DIR,
    DEFAULT_LOCALE
  );
  t.is(result, null);
});

test('returns null if no redirect is possible, without a trailing /', t => {
  const result = getNonLocalizedURL('/doesnotexist', ROOT_DIR, DEFAULT_LOCALE);
  t.is(result, null);
});

test('returns null if the URL starts with the default locale', t => {
  const result = getNonLocalizedURL('/en/ignored/', ROOT_DIR, DEFAULT_LOCALE);
  t.is(result, null);
});

test('returns the URL if a redirect is possible', t => {
  const result = getNonLocalizedURL('/ja/exists/', ROOT_DIR, DEFAULT_LOCALE);
  t.is(result, '/exists/');
});

test('returns the URL if a redirect is possible, with an index.html suffix', t => {
  const result = getNonLocalizedURL(
    '/ja/exists/index.html',
    ROOT_DIR,
    DEFAULT_LOCALE
  );
  t.is(result, '/exists/');
});
