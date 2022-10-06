const test = require('ava');
const {mergeCollections} = require('../../../site/_collections/directory');

/**
 * @return {EleventyCollectionItem}
 */
function virtualItem(title, fileSlug, date) {
  return {
    title,
    fileSlug,
    date: new Date(date),
  };
}

test('translated item replaces base item', t => {
  const baseCollection = [
    virtualItem('Article 3', 'article-3', '2022-10-08'),
    virtualItem('Article 2', 'article-2', '2022-10-07'),
    virtualItem('Article 1', 'article-1', '2022-10-06'),
  ];
  baseCollection.items = baseCollection;

  const localeCollection = [
    virtualItem('Artikel 2', 'article-2', '2022-10-07'),
  ];
  localeCollection.items = localeCollection;

  const mergedCollection = mergeCollections(baseCollection, localeCollection);

  t.is(mergedCollection[0], baseCollection[0]);
  t.is(mergedCollection[1], localeCollection[0]);
  t.is(mergedCollection[2], baseCollection[2]);
});
