const {html, safeHtml} = require('common-tags');
const ImgixClient = require('imgix-core-js');
const {imgix: domain} = require('../_data/site.json');

const client = new ImgixClient({domain, includeLibraryParam: false});

/**
 * Generates src URL of image from imgix path or URL.
 *
 * @param {string} src Path (or URL) for image.
 * @param {Object} params Imgix API params.
 * @return {string}
 */
const generateSrc = (src, params) => client.buildURL(src, params);

/**
 * Takes an imgix url or path and generates an `<img>` element with `srcset`.
 *
 * @param {ImgArgs} args Named arguments
 * @return {string}
 */
const img = args => {
  // eslint-disable-next-line prefer-const
  let {src, alt, width, height, sizes, lazy, className, params, options} = args;

  if (!src) {
    throw new Error('src is a required argument');
  }

  if (alt === undefined || typeof alt !== 'string') {
    throw new Error(`alt text must be a string, received a ${typeof alt}`);
  }

  if (lazy === undefined) {
    lazy = true;
  }

  // https://docs.imgix.com/apis/rendering
  params = {auto: 'format', ...params};
  // https://github.com/imgix/imgix-core-js#imgixclientbuildsrcsetpath-params-options
  options = {minWidth: 200, maxWidth: 1600, widthTolerance: 0.07, ...options};

  // Below you'll notice that we do alt !== undefined. That's because passing in
  // an empty string is a valid alt value. It tells a screen reader to ignore
  // the image (useful for purely decorative images). If we just did alt ? ...
  // the emptry string would evaluate as falsey and no alt attribute would be
  // written at all—which _is_ an accessibility violation.
  return html`
    <img
      src="${generateSrc(src, params)}"
      srcset="${client.buildSrcSet(src, params, options)}"
      ${sizes ? `sizes="${sizes}"` : ''}
      ${height ? `height="${height}"` : ''}
      ${width ? `width="${width}"` : ''}
      ${alt !== undefined ? `alt="${safeHtml`${alt}`}"` : ''}
      ${className ? `class="${className}"` : ''}
      ${lazy ? 'loading="lazy"' : ''}
    />
  `.replace(/\n/g, '');
};

module.exports = {img, generateSrc};
