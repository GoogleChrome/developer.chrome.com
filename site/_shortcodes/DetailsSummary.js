/**
 * Renders the always visible part of the Details component.
 * @param {string} content A string of markdown
 */
function DetailsSummary(content) {
  // Whitespace is needed for the markdown parser to process the ${content}.
  return `<summary class="details__summary"> <div class="details__header stack">

${content}</div></summary>`;
}

module.exports = {DetailsSummary};
