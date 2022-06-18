const {findByUrl} = require('../_data/lib/find');
const {getLocalizedPaths} = require('../_filters/urls');

/**
 * Outputs a list of <link hreflang=""> tags with alternate language versions
 * for the given url.
 * @param {string} url Current page url
 * @param {object} site Site object from _data/site.json
 * @param {EleventyCollectionObject} collections Eleventy collections object
 */
function Hreflang(url, site, collections) {
  if (!url) {
    return;
  }
  const hreflangs = getLocalizedPaths(url, site.locales).filter(hreflang =>
    findByUrl(collections.all, hreflang[0])
  );
  const links = hreflangs.map(hreflang => {
    return (
      `<link href="${site.url}${hreflang[0]}" ` +
      `rel="alternate" hreflang="${hreflang[1]}">`
    );
  });
  return links.length > 1 ? links.join('\n') : '';
}

module.exports = {Hreflang};
