const ImgixClient = require('imgix-core-js');
const {html} = require('common-tags');
const {imgix: domain} = require('../_data/site.json');

const client = new ImgixClient({domain, includeLibraryParam: false});

/**
 * @param {string} path Path for image.
 * @param {string} [alt] Alt text or options for image.
 * @param {number} [width] Width, in pixels, of image.
 * @param {number} [height] Height, in pixels, of image.
 * @param {ImgOptions} [options] Image options.
 * @return {string}
 */
const img = (path, alt, width, height, options = {}) => {
  if (alt !== undefined && typeof alt !== 'string') {
    throw new Error(`alt text must be a string, received a ${typeof alt}`);
  }

  options = {maxWidth: 1600, widthTolerance: 0.2, ...options};
  const params = {
    auto: 'format',
  };
  const src = client.buildURL(path, params);
  const srcSet = client.buildSrcSet(path, params, options);

  return html`
    <img
      src="${src}"
      srcset="${srcSet}"
      ${height ? `height="${height}"` : ''}
      ${width ? `width="${width}"` : ''}
      ${alt ? `alt="${alt}"` : ''}
      loading="lazy"
    />
  `.replace(/\n/g, '');
};

module.exports = {img};
