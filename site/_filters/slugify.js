const uslug = require('uslug');

/**
 * Slugify a string using uslug.
 * We already use uslug with markdown-it-anchors to slugify markdown headings.
 * This filter just exposes that same ability to our nunjucks templates.
 * @param {string} s A string to slugify.
 * @return {string}
 */
const slugify = s => uslug(s);

module.exports = {slugify};
