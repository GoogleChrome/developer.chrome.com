/**
 * @fileoverview Tests for the redirect-handler used by the server.
 */

const test = require('ava');
const {
  ensureTrailingSlashOnly,
  prepareHandler,
} = require('../../server/redirect');

const sharedYamlSource = `
redirects:
- from: /subscribe
  to: /newsletter

- from: /subscribe/all/...
  to: /newsletter

- from: /foo/...
  to: /bar/...

- from: /external/...
  to: https://google.com/...
`;

test('normalizes paths', t => {
  t.is(ensureTrailingSlashOnly('/foo/index.html'), '/foo/');
  t.is(
    ensureTrailingSlashOnly('/foo/index.HTML'),
    '/foo/index.HTML/',
    'must only match lower-case index.html'
  );
  t.is(ensureTrailingSlashOnly(''), '/');
});

test('handles simple redirects', t => {
  const h = prepareHandler(sharedYamlSource);

  t.is(h('/subscribe'), '/newsletter');
  t.is(
    h('/subscribe/index.html'),
    '/newsletter',
    'trailing index.html is ignored'
  );
  t.is(h('/subscribe/other.html'), null, 'unhandled URL returns null');
});

test('handles group redirects', t => {
  const h = prepareHandler(sharedYamlSource);

  t.is(h('/subscribe/all/foo'), '/newsletter', 'group => non-group redirect');
  t.is(
    h('/foo/x'),
    '/bar/x/',
    'group redirect functions, trailing slash added'
  );
  t.is(h('/foo/x/index.html'), '/bar/x/', 'index.html is stripped');
  t.is(
    h('/external/hello'),
    'https://google.com/hello/',
    'external redirect is also normalized'
  );
  t.is(h('/external/'), 'https://google.com/');
  t.is(h('/external'), 'https://google.com/', 'matches without trailing slash');
});

test('includes query strings', t => {
  const h = prepareHandler(sharedYamlSource);

  t.is(h('/subscribe/?foo'), '/newsletter?foo=');
  t.is(h('/subscribe/?foo=1&foo=2'), '/newsletter?foo=1&foo=2');
});
