const fs = require('fs');
const path = require('path');
const {i18n} = require('../_filters/i18n');

const defaultLocale = 'en';

/**
 * Load SVG icons to be injected into the page.
 * @param {string} name The filename (without extension) of the svg icon to
 * load.
 * @return {string} The SVG file contents.
 */
function loadIcon(name) {
  const iconPath = path.resolve(
    path.join(__dirname, `../_includes/icons/${name}.svg`)
  );
  return fs.readFileSync(iconPath, 'utf-8');
}

const icons = {
  caution: loadIcon('error'),
  warning: loadIcon('warning'),
  success: loadIcon('done'),
  objective: loadIcon('done'),
  important: loadIcon('lightbulb-outline'),
  'key-term': loadIcon('ink-highlighter'),
  codelab: loadIcon('code'),
  example: loadIcon('graph'),
  update: loadIcon('update'),
};

/**
 * Renders a uniquely colored box around the passed in content.
 * @param {string} content A string of markdown
 * @param {string} [type='note'] An aside style type
 */
function Aside(content, type = 'note') {
  // @ts-ignore: `this` has type of `any`
  const locale = this.ctx.locale || defaultLocale;
  let text;

  // implement backwards compatibility for old "gotchas" type, rewrite to "important" type
  if (type === 'gotchas') {
    type = 'important';
  }

  if (type !== 'note') {
    text = i18n(`i18n.common.${type}`, locale);
  }

  // prettier-ignore
  // The funky whitespace here is intentional.
  // We need to have a newline between the opening div and ${content} so the
  // markdown parser will kick in again.
  // And because the content might be a <pre> element, which renders whitespace,
  // we need to make sure it's not indented in any way.
  // Also, if we render an .aside__label, we need to make sure there is not a
  // newline between it and the opening div or markdown-it will insert an extra
  // closing </div> if the Aside is used inside of a markdown definition list.
  return `<div class="aside aside--${type}">${ type !== 'note' ? `<div class="aside__label gap-bottom-300">${icons[type]}<span>${text}</span></div>` : ''}

${content}</div>`;
}

module.exports = {Aside};
