/**
 * Renders the always visible part of the Details component.
 * @param {string} content A string of markdown
 */
function DetailsSummary(content) {
  if (this.ctx.export) {
    return DetailsSummaryExport.bind(this)(content);
  }

  // Whitespace is needed for the markdown parser to process the ${content}.
  return `<summary class="details__summary"> <div class="details__header stack">

${content}</div></summary>`;
}

/**
 * @this {Object}
 * @param {*} content
 * @returns
 */
function DetailsSummaryExport(content) {
  const lines = content.trim().split('\n');
  const heading = lines.shift();

  content = lines.length ? lines.join('\n') : '';

  // Just return the plain text content here as rendering markdown will cause
  // weird escaping issues - Markdown is rendered in `Details`, once the DOM
  // has been ordered in a DevSite compatible way
  return `<div class="showalways">
    <div class="inline">${heading}</div>
    ${content ? `<div class="block">${content}</div>` : ''}
</div>`;
}

module.exports = {DetailsSummary};
