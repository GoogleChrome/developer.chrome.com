const fs = require('fs');
const {i18n} = require('../_filters/i18n');

/**
 * Load SVG icons to be injected into the page.
 * @param {string} name The filename (without extension) of the svg icon to
 * load.
 * @return {string} The SVG file contents.
 */
const loadIcon = name =>
  fs.readFileSync(`site/_includes/icons/${name}.svg`, 'utf-8');

const icons = {
  caution: loadIcon('error'),
  warning: loadIcon('warning'),
  success: loadIcon('done'),
  gotchas: loadIcon('lightbulb-outline'),
  key: loadIcon('ink-highlighter'),
  codelab: loadIcon('code'),
};
const types = Object.keys(icons);

/**
 *
 * @param {cheerio.Cheerio} $elem A cheerio element.
 * @param {string} type The aside type (e.g. 'caution').
 * @param {string} locale The locale of the current page.
 */
const addLabel = ($elem, type, locale) => {
  const text = i18n(`i18n.common.${type}`, locale);
  $elem.prepend(
    `<div class="aside__label gap-bottom-300">
      ${icons[type]}
      <span>${text}</span>
    </div>`
  );
};

/**
 *
 * @param {cheerio.Selector} $ A cheerio representation of the page. This object
 * will be modified in place.
 * @param {string} locale The locale of the current page.
 */
const asides = ($, locale) => {
  $('.aside').each((_, elem) => {
    const $elem = $(elem);
    for (const type of types) {
      if ($elem.hasClass(`aside--${type}`)) {
        addLabel($elem, type, locale);
        break;
      }
    }
  });
};

module.exports = {asides};
