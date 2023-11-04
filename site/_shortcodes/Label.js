/** Renders a filename associated with a code snippet.
 * @param {string} filename A filename representing the code snippet
 */
function Label(filename) {
  return `<div class="type--caption"><p class="code-label">${filename}</p></div>`;
}

module.exports = {Label};
