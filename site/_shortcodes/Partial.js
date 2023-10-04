const path = require('path');

const {findByFilePath} = require('../_data/lib/find');
const {defaultLocale} = require('../_data/site.json');
const {exportFile} = require('../_export/utils/exportFile');
const {renderTemplate} = require('../_export/shortcodes/Export');

const basePath = '_partials';

/**
 * Returns the rendered content of a page living in the partials collection
 * @param {string} partialPath Partial path
 */
async function Partial(partialPath) {
  // @ts-ignore: `this` has type of `any`
  const locale = this.ctx.locale || defaultLocale;

  partialPath = path.join('/', basePath, partialPath);
  // filePathStems for eleventy end at the directory name, w/o a trailing slash
  // Therefore make sure there aren't any file extensions or index stubs
  partialPath = partialPath.replace(/(index)?.(md|njk|html)$/, '');

  const partial = findByFilePath(
    // @ts-ignore: `this` has type of `any`
    this.ctx.collections.partials,
    partialPath,
    locale
  );
  if (!partial) {
    console.warn(`No partial found at ${partialPath}`);
    return '';
  }

  // Proactively render the template to prevent 11ty from complaining
  // that we are accessing a rendered template (partial.templateContent)
  // before it has done all it's business
  const template = partial.template;
  template.wrapWithLayouts = false;

  if (this.ctx.export) {
    const ext = partial.template.parsed.ext;
    const transformedTemplate = await renderTemplate(
      partial.template.inputContent,
      Object.assign({}, this.ctx, {export: true})
    );

    await exportFile(
      this.ctx,
      transformedTemplate || 'Failed to render partial.',
      `${partialPath}${ext}`
    );
    return `{% include '/_partials/${partialPath}.${ext}'}`;
  }

  // @ts-ignore: `this` has type of `any`
  const templateContent = await template.render(this.ctx);
  return templateContent;
}

module.exports = {Partial};
