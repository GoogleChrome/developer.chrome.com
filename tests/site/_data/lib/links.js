const test = require('ava');
const {getLinkActiveState} = require('../../../../site/_data/lib/links');

test('returns current and active if the urls match', t => {
  const expected = ' data-state="active" aria-current="page"';

  let itemUrl = '/';
  let pageUrl = '/';
  t.assert(getLinkActiveState(itemUrl, pageUrl) === expected);

  itemUrl = '/docs';
  pageUrl = '/docs';
  t.assert(getLinkActiveState(itemUrl, pageUrl) === expected);

  itemUrl = '/foo/bar/baz';
  pageUrl = '/foo/bar/baz';
  t.assert(getLinkActiveState(itemUrl, pageUrl) === expected);
});

test('returns active if the page path is a subpath of the item', t => {
  const expected = ' data-state="active"';

  const itemUrl = '/docs';
  const pageUrl = '/docs/extensions';
  t.assert(getLinkActiveState(itemUrl, pageUrl) === expected);
});

test('returns undefined if no match is found', t => {
  const expected = undefined;

  let itemUrl = '/docs';
  let pageUrl = '/blog';
  t.assert(getLinkActiveState(itemUrl, pageUrl) === expected);

  itemUrl = 'https://google.com';
  pageUrl = '/blog';
  t.assert(getLinkActiveState(itemUrl, pageUrl) === expected);

  itemUrl = '';
  pageUrl = '/blog';
  t.assert(getLinkActiveState(itemUrl, pageUrl) === expected);
});
