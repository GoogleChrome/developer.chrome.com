const fs = require('fs');
const {i18n} = require('../_filters/i18n');

/**
 * Load SVG icons to be injected into the page.
 * @param {string} name The filename (without extension) of the svg icon to
 * load.
 * @return {string} The SVG file contents.
 */
const loadIcon = name =>
  fs.readFileSync(`site/_includes/icons/${name}.svg`, 'utf-8');

const icons = {
  caution: loadIcon('error'),
  warning: loadIcon('warning'),
  success: loadIcon('done'),
  gotchas: loadIcon('lightbulb-outline'),
  'key-term': loadIcon('ink-highlighter'),
  codelab: loadIcon('code'),
};

/**
 * Renders a uniquely colored box around the passed in content.
 * @param {string} content A string of markdown
 * @param {string} [type='note'] An aside style type
 */
function Aside(content, type = 'note') {
  // Infer the page locale using this.page.
  // The locale is used to display localized text next to the icon
  // e.g. 'Caution' -> 'Precaución'
  let locale;
  // @ts-ignore
  if (this.page && this.page.filePathStem) {
    // filePath stem looks like '/en/docs/webstore/hosted_apps/index'
    // @ts-ignore
    locale = this.page.filePathStem.split('/')[1];
  } else {
    locale = 'en';
  }

  let text;
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
