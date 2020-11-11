const ImgixClient = require('imgix-core-js');
const {html, safeHtml} = require('common-tags');
const {imgix: domain} = require('../_data/site.json');

const client = new ImgixClient({domain, includeLibraryParam: false});

/**
 * Generates src URL of image from imgix path or URL.
 *
 * @param {string} path Path (or URL) for image.
 * @param {Object} params Imgix API params.
 * @return {string}
 */
const generateSrc = (path, params) => client.buildURL(path, params);

/**
 * Takes an imgix url or path and generates an `<img>` element with `srcset`.
 *
 * @param {string} path Path for image.
 * @param {string} [alt] Alt text or options for image.
 * @param {number|string} [width] Width, in pixels, of image.
 * @param {number|string} [height] Height, in pixels, of image.
 * @param {Object} [params] Imgix API params.
 * @param {ImgOptions} [options] Image options.
 * @return {string}
 */
const img = (path, alt, width, height, params = {}, options = {}) => {
  if (!path) {
    throw new Error('must provide a path to an image');
  }

  if (alt !== undefined && typeof alt !== 'string') {
    throw new Error(`alt text must be a string, received a ${typeof alt}`);
  }

  params = {auto: 'format', ...params};
  options = {maxWidth: 1600, ...options};
  const src = generateSrc(path, params);
  const srcset = client.buildSrcSet(path, params, options);

  return html`
    <img
      src="${src}"
      srcset="${srcset}"
      ${height ? `height="${height}"` : ''}
      ${width ? `width="${width}"` : ''}
      ${alt ? `alt="${safeHtml`${alt}`}"` : ''}
      loading="lazy"
    />
  `.replace(/\n/g, '');
};

module.exports = {img, generateSrc};
