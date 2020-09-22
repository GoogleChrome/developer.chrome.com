const test = require('ava');
const {findByUrl} = require('../../../../site/_data/lib/find');

test.beforeEach(t => {
  t.context.collection = [
    {url: '/foo/', title: 'Foo'},
    {url: '/es/bar/', title: 'Bar'},
  ];
});

test('finds a url if it exists in the collection', t => {
  const {collection} = t.context;

  const itemToFind = '/foo/';
  const result = findByUrl(collection, itemToFind);
  t.assert(result.title === 'Foo');
});

test('finds a url (not absolute) if it exists in the collection', t => {
  const {collection} = t.context;

  const itemToFind = 'foo';
  const result = findByUrl(collection, itemToFind);
  t.assert(result.title === 'Foo');
});

test('finds a url (without a trailing slash) if it exists in the collection', t => {
  const {collection} = t.context;

  const itemToFind = '/foo';
  const result = findByUrl(collection, itemToFind);
  t.assert(result.title === 'Foo');
});

test('finds language-specific url if it exists', t => {
  const {collection} = t.context;

  const itemToFind = '/bar';
  const result = findByUrl(collection, itemToFind, '/es');
  t.assert(result.title === 'Bar');
});

test('finds language-specific url (not absolute) if it exists', t => {
  const {collection} = t.context;

  const itemToFind = '/bar';
  const result = findByUrl(collection, itemToFind, 'es');
  t.assert(result.title === 'Bar');
});
