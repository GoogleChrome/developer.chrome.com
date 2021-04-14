const md = require('markdown-it')();

const linkMatch = /{@link (\S+?)(|\s+\S+?)}/g;

function updateAtLink(content) {
  return content.replace(linkMatch, (_, link, text) => {
    if (!text) {
      text = link;
      return `<a href="#">${text}</a>`;
    }
    return `<code><a href="#">${text}</a></code>`;
  });
}

/**
 * Render content as markdown. Does not incorporate any site-specific Markdown behavior.
 *
 * @param {string?} content
 * @return {string|undefined}
 */
function render(content) {
  if (!content) {
    return;
  }

  content = updateAtLink(content);
  return md.render(content);
}

/**
 * Render content as inline markdown. Does not incorporate any site-specific Markdown behavior.
 *
 * @param {string?} content
 * @return {string|undefined}
 */
function renderInline(content) {
  if (!content) {
    return;
  }

  content = updateAtLink(content);
  return md.renderInline(content);
}

module.exports = {render, renderInline};
