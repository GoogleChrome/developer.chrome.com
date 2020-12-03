/**
 * A filter to remove draft pages.
 * We allow drafts to appear in a dev environment, but omit them from
 * collections in a production environment.
 * @param {EleventyCollectionItem} item
 * @return {boolean}
 */
const drafts = item => {
  if (process.env.NODE_ENV !== 'production') {
    return true;
  } else {
    return !item.data.draft;
  }
};

module.exports = {drafts};
