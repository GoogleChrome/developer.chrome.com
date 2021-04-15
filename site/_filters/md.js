const md = require('markdown-it')();

const linkMatch = /{@link (\S+?)(|\s+\S+?)}/g;

/**
 * @param {string} ref
 * @return {string|undefined}
 * @this {any}
 */
function resolveRawRef(ref) {
  // console.info('requested link for', ref, 'this API is', this.ctx.api);

  // TODO: demo for links
  if (ref === 'events.Event') {
    if (this.ctx.api === 'events') {
      return '#type-Event';
    }
    return '../events/#type-Event';
  }

  return undefined;
}

function updateAtLink(content, resolver) {
  return content.replace(linkMatch, (_, link, text) => {
    if (!text) {
      text = `\`${link}\``;
    }

    const href = resolver(link);
    if (href) {
      return `[${text}](${href})`;
    }
    return text;
  });
}

/**
 * Render content as markdown. Does not incorporate any site-specific Markdown behavior.
 *
 * @param {string?} content
 * @return {string|undefined}
 * @this {any}
 */
function render(content) {
  if (!content) {
    return;
  }

  const resolver = resolveRawRef.bind(this);
  content = updateAtLink(content, resolver);
  return md.render(content);
}

/**
 * Render content as inline markdown. Does not incorporate any site-specific Markdown behavior.
 *
 * @param {string?} content
 * @return {string|undefined}
 * @this {any}
 */
function renderInline(content) {
  if (!content) {
    return;
  }

  const resolver = resolveRawRef.bind(this);
  content = updateAtLink(content, resolver);
  return md.renderInline(content);
}

/**
 * @param {{
 *   name: string,
 *   internal: boolean,
 * }} model
 * @return {string|undefined}
 * @this {any}
 */
function modelToHref(model) {
  if (!model.internal) {
    return;
  }
  return resolveRawRef.call(this, model.name);
}

module.exports = {render, renderInline, modelToHref};
