const ImgixClient = require('imgix-core-js');
const {html, safeHtml} = require('common-tags');
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

  params = {auto: 'format', ...params};
  options = {minWidth: 200, maxWidth: 1600, ...options};

  return html`
    <img
      src="${generateSrc(src, params)}"
      srcset="${client.buildSrcSet(src, params, options)}"
      ${sizes ? `sizes="${sizes}"` : ''}
      ${height ? `height="${height}"` : ''}
      ${width ? `width="${width}"` : ''}
      ${alt ? `alt="${safeHtml`${alt}`}"` : ''}
      ${className ? `class="${className}"` : ''}
      ${lazy ? 'loading="lazy"' : ''}
    />
  `.replace(/\n/g, '');
};

module.exports = {img, generateSrc};
