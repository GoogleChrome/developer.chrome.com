/**
 * Wrap tables in a .responsive-tables class so they horizontally overflow
 * on mobile.
 * @param {cheerio.Selector} $ A cheerio representation of the page. This object
 * will be modified in place.
 */
const tables = $ => {
  $('table:not(.fixed-table)').each((_, elem) => {
    const $elem = $(elem);
    $elem.replaceWith(`<div class="responsive-table">${$elem}</div>`);
  });
};

module.exports = {tables};
