const test = require('ava');
const {mergeCollections} = require('../../../site/_collections/directory');

class FakeCollectionItem {
  constructor(title, fileSlug, date) {
    this.title = title;
    this.fileSlug = fileSlug;
    this.date = new Date(date);
  }
}

class FakeCollection {
  constructor(items) {
    this.items = items;
  }

  getAllSorted() {
    return this.items;
  }
}

test('translated item replaces base item', t => {
  const baseCollection = new FakeCollection([
    new FakeCollectionItem('Article 2', 'article-2', '2022-10-07'),
    new FakeCollectionItem('Article 1', 'article-1', '2022-10-06'),
  ]);

  const localeCollection = new FakeCollection([
    new FakeCollectionItem('Artikel 2', 'article-2', '2022-10-07'),
  ]);

  const mergedCollection = mergeCollections(baseCollection, localeCollection);

  t.is(mergedCollection[0], baseCollection[0]);
  t.is(mergedCollection[1], localeCollection[0]);
  t.is(mergedCollection[2], baseCollection[2]);
});

test('remaining items get appended', t => {
  const baseCollection = new FakeCollection([
    new FakeCollectionItem('Article 4', 'article-4', '2022-10-09'),
    new FakeCollectionItem('Article 3', 'article-3', '2022-10-08'),
    new FakeCollectionItem('Article 2', 'article-2', '2022-10-07'),
    new FakeCollectionItem('Article 1', 'article-1', '2022-10-06'),
  ]);

  const localeCollection = new FakeCollection([
    new FakeCollectionItem('Artikel 1', 'article-1', '2022-10-06'),
  ]);

  const mergedCollection = mergeCollections(baseCollection, localeCollection);

  t.is(mergedCollection[0], localeCollection[0]);
  t.is(mergedCollection[1], baseCollection[1]);
  t.is(mergedCollection[2], baseCollection[2]);
  t.is(mergedCollection[3], baseCollection[3]);
});
