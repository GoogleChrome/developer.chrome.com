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
    return DetailsExport.bind(this)(content, state);
  }

  const stateOverride = state === 'open' ? 'open' : '';
  // Whitespace is needed for the markdown parser to process the ${content}.
  return `<details class="details stack" ${stateOverride}>

${content}</details>`;
}

/**
 * @this {Object}
 * @param {*} content
 * @param {*} state
 * @returns
 */
function DetailsExport(content, state) {
  // Parse content to DOM, to pluck out a potential DetailsSummary/h*.showalways element
  // and move it out of the actual content div
  const $ = cheerio.load(`<div id="content">${content}</div>`);

  const $summary = $('div.showalways');
  let summary = '';
  if ($summary) {
    // The summary can have a heading element, and a preview sentence, which need
    // to be rendered as markdown, independently
    const $heading = $summary.find('.inline');
    $heading.html(md.renderDevSiteInline($heading.html()));

    const $preview = $summary.find('.block');
    if ($preview.length) {
      $preview.html(md.renderDevSiteInline($preview.html()));
    }

    summary = $summary.prop('outerHTML');
    $('#content').html($('#content').html().replace(summary, ''));
  }

  $('#content').html(md.renderDevSite($('#content').html()));

  const computedState = state === 'open' ? 'expanded' : '';
  return `
<div>
  <devsite-expandable ${computedState} class="arrow-icon">
    ${summary}
    <div>
      ${pretty($('#content').html())}
    </div>
  </devsite-expandable>
</div>`;
}

module.exports = {Details};
