/**
 * Renders the always visible part of the Details component.
 * @param {string} content A string of markdown
 */
function DetailsSummary(content) {
  // const validLevels = ['h2', 'h3', 'h4', 'h5', 'h6', 'p'];

  // if (!validLevels.includes(headingLevel)) {
  //   throw new Error(
  //     'Invalid heading level for Details component. Use h2, h3, h4, h5, h6, or p.'
  //   );
  // }
  // const contentArr = content.trim().split('\n');
  // const heading = contentArr.shift();
  // const preview = contentArr.length ? contentArr.join('\n') : '';
  // const renderedPreview = preview
  //   ? html`<p class="details__preview">${md.renderInline(preview)}</p>`
  //   : '';

  return `<summary class="details__summary"><div class="details__header type--h4">

${content}</div></summary>`;
}

module.exports = {DetailsSummary};
