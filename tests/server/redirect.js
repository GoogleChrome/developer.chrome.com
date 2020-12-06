/**
 * @fileoverview Tests for the redirect-handler used by the server.
 */

const test = require('ava');
const {buildCheckHandlerInternal} = require('../../server/redirect');
const YAML = require('js-yaml');

const sharedYamlSource = `
redirects:
- from: /subscribe
  to: /newsletter

- from: /subscribe/all/...
  to: /newsletter

- from: /foo/...
  try: /bar/...

- from: /external/...
  to: https://google.com/...

- from: /check_file_test
  try:
  - /does_not_exist.js
  - /redirect.js  # we expect this file to exist
  else: /fallback.js

- from: /check_folder_test/...
  try: /...

- from: /check_folder_test/...
  to: /giveup.js
`;

const {redirects} = YAML.load(sharedYamlSource);

test('handles checking files', t => {
  const h = buildCheckHandlerInternal(redirects, [
    __dirname, // pretend to serve this directory
  ]);
  t.is(h('/check_file_test'), '/redirect.js');

  t.is(h('/check_folder_test/redirect.js'), '/redirect.js');
  t.is(h('/check_folder_test/does_not_exist.js'), '/giveup.js');
});

test('handles simple redirects', t => {
  const h = buildCheckHandlerInternal(redirects);

  t.is(h('/subscribe'), '/newsletter');
  t.is(
    h('/subscribe/index.html'),
    '/newsletter/index.html',
    'trailing index.html is retained'
  );
  t.is(h('/subscribe/other.html'), null, 'unhandled URL returns null');
});

test('handles group redirects', t => {
  const h = buildCheckHandlerInternal(redirects);

  t.is(h('/subscribe/all/foo'), '/newsletter', 'group => non-group redirect');
  t.is(
    h('/foo/x'),
    '/bar/x',
    'group redirect functions, trailing slash unchanged'
  );
  t.is(h('/foo/x/index.html'), '/bar/x/index.html', 'index.html is retained');
  t.is(
    h('/external/hello'),
    'https://google.com/hello',
    'external redirect is also unchanged'
  );
  t.is(h('/external/'), 'https://google.com/');
  t.is(h('/external'), 'https://google.com/', 'matches without trailing slash');
});

test('includes query strings', t => {
  const h = buildCheckHandlerInternal(redirects);

  t.is(h('/subscribe/?foo'), '/newsletter/?foo');
  t.is(h('/subscribe/?foo=1&foo=2'), '/newsletter/?foo=1&foo=2');
});
