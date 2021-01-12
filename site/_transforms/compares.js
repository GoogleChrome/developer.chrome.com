const {i18n} = require('../_filters/i18n');

const types = ['better', 'worse'];

/**
 *
 * @param {cheerio.Cheerio} $elem A cheerio element.
 * @param {string} type The aside type (e.g. 'caution').
 * @param {string} locale The locale of the current page.
 */
const addLabel = ($elem, type, locale) => {
  const text = i18n(`i18n.common.compare_${type}`, locale);
  $elem.prepend(`<div class="compare--label">${text}</div>`);
};

/**
 *
 * @param {cheerio.Selector} $ A cheerio representation of the page. This object
 * will be modified in place.
 * @param {string} locale The locale of the current page.
 */
const compares = ($, locale) => {
  $('.compare').each((_, elem) => {
    const $elem = $(elem);
    for (const type of types) {
      if ($elem.hasClass(`compare--${type}`)) {
        addLabel($elem, type, locale);
        break;
      }
    }
  });
};

module.exports = {compares};
