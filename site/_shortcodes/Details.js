const cheerio = require('cheerio');
const pretty = require('pretty');
const md = require('../_filters/md');

/**
 * Renders a Details collapsible component.
 * @param {string} content A string of markdown
 * @param {string} [state=''] Whether the element is open.
 */
function Details(content, state) {
  if (this.ctx.export) {
    return `{# TODO(migration): Unwrapped Details shortcode - start #}
${content}
{# TODO(migration): Unwrapped Details shortcode - end #}`;
  }

  const stateOverride = state === 'open' ? 'open' : '';
  // Whitespace is needed for the markdown parser to process the ${content}.
  return `<details class="details stack" ${stateOverride}>

${content}</details>`;
}

module.exports = {Details};
