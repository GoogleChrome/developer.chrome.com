/**
 * @return {EleventyData}
 */
module.exports = {
  type: 'event',
  permalink: false,
  isVirtualItem: true,
  eleventyComputed: {
    id: data => data.page.fileSlug,
    deepLink: data => {
      return `/meet-the-team#${data.id}`;
    },
  },
};
