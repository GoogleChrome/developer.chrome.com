const md = require('../_filters/md');

/** Renders a filename associated with a code snippet.
 * @param {string} filename A filename representing the code snippet
 */
function Label(filename) {
  const renderedContent = md.renderDevSiteInline(filename);
  if (this.ctx.export) {
    return `<span class="wd-label">${renderedContent}</span>`;
  }
  return `<div class="type--caption"><p class="code-label">${filename}</p></div>`;
}

module.exports = {Label};
