const md = require('markdown-it')();

const linkMatch = /{@link (\S+?)(|\s+\S+?)}/g;

function updateAtLink(content) {
  return content.replace(linkMatch, (_, link, text) => {
    if (!text) {
      return `[\`${link}\`](#)`;
    }
    return `[${text}](#)`;
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
