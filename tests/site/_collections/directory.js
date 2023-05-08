const test = require('ava');
const {mergeCollections} = require('../../../site/_collections/directory');

class FakeCollectionItem {
  constructor(title, fileSlug, date) {
    this.title = title;
    this.fileSlug = fileSlug;
    this.date = new Date(date);
  }
}

test('translated item replaces base item', t => {
  const baseCollection = [
    new FakeCollectionItem('Article 2', 'article-2', '2022-10-07'),
    new FakeCollectionItem('Article 1', 'article-1', '2022-10-06'),
  ];

  const localeCollection = [
    new FakeCollectionItem('Artikel 2', 'article-2', '2022-10-07'),
  ];

  const mergedCollection = mergeCollections(baseCollection, localeCollection);

  t.is(mergedCollection[0].fileSlug, localeCollection[0].fileSlug);
  t.is(mergedCollection[0].title, localeCollection[0].title);
  t.is(mergedCollection[1].fileSlug, baseCollection[1].fileSlug);
});

test('remaining items get appended', t => {
  const baseCollection = [
    new FakeCollectionItem('Article 4', 'article-4', '2022-10-09'),
    new FakeCollectionItem('Article 3', 'article-3', '2022-10-08'),
    new FakeCollectionItem('Article 2', 'article-2', '2022-10-07'),
    new FakeCollectionItem('Article 1', 'article-1', '2022-10-06'),
  ];

  const localeCollection = [
    new FakeCollectionItem('Artikel 1', 'article-1', '2022-10-06'),
  ];

  const mergedCollection = mergeCollections(baseCollection, localeCollection);

  t.is(mergedCollection[0].fileSlug, baseCollection[0].fileSlug);
  t.is(mergedCollection[1].fileSlug, baseCollection[1].fileSlug);
  t.is(mergedCollection[2].fileSlug, baseCollection[2].fileSlug);
  t.is(mergedCollection[3].fileSlug, localeCollection[0].fileSlug);
  t.is(mergedCollection[3].title, localeCollection[0].title);
});
