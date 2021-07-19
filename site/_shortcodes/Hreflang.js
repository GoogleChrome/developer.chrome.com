const {findByUrl} = require('../_data/lib/find');
const path = require('path');

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
  const urlParts = url.split('/');
  const replace = site.locales.includes(urlParts[1]) ? 1 : 0;
  const hreflangs = site.locales.reduce((out, locale) => {
    urlParts.splice(1, replace, locale);
    const hreflang = urlParts.join('/');
    if (findByUrl(collections.all, hreflang)) {
      out.push(
        `<link href="${path.join(site.url, hreflang)}" rel="alternate" hreflang="${locale}">`
      );
    }
    return out;
  }, []);
  return hreflangs.length > 1 ? hreflangs.join('\n') : '';
}

module.exports = {Hreflang};
