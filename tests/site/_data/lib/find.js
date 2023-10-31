const test = require('ava');
const {findByUrl, findByFilePath} = require('../../../../site/_data/lib/find');

test.beforeEach(t => {
  t.context.collection = [
    {url: '/foo/', filePathStem: '/en/foo', title: 'Foo'},
    {url: '/es/foo/', filePathStem: '/es/foo', title: 'Foo es'},
    {url: '/es/bar/', filePathStem: '/es/bar', title: 'Bar'},
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

test('finds a path if it exists in the collection', t => {
  const {collection} = t.context;

  const result = findByFilePath(collection, '/foo');
  t.assert(result.title === 'Foo');
});

test('finds a path (not absolute) if it exists in the collection', t => {
  const {collection} = t.context;

  const result = findByFilePath(collection, 'foo');
  t.assert(result.title === 'Foo');
});

test('finds a path (without a trailing slash) if it exists in the collection', t => {
  const {collection} = t.context;

  const result = findByFilePath(collection, '/foo');
  t.assert(result.title === 'Foo');
});

test('finds language-specific path if it exists', t => {
  const {collection} = t.context;

  const result = findByFilePath(collection, '/bar', '/es');
  t.assert(result.title === 'Bar');
});

test('finds best-fit language path if it exists', t => {
  const {collection} = t.context;

  const result = findByFilePath(collection, '/foo', 'es');
  t.assert(result.title === 'Foo es');
});

test('finds language-specific path (not absolute) if it exists', t => {
  const {collection} = t.context;

  const result = findByFilePath(collection, '/bar', 'es');
  t.assert(result.title === 'Bar');
});
