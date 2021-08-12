/**
 * A filter to remove draft pages.
 * We allow drafts to appear in a dev environment, but omit them from
 * collections in a production environment.
 * @param {EleventyCollectionItem} item
 * @return {boolean}
 */
const filterDrafts = item => {
  if (process.env.NODE_ENV === 'production') {
    return !item.data.draft;
  }
  return true; // include everything in non-prod
};

module.exports = {filterDrafts};
