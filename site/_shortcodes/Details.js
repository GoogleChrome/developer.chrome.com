/**
 * Renders a Details collapsible component.
 * @param {string} content A string of markdown
 * @param {string} [state=''] Whether the element is open.
 */
function Details(content, state) {
  const stateOverride = state === 'open' ? 'open' : '';

  return `<details class="details" ${stateOverride}>

${content}</details>`;
}

module.exports = {Details};
