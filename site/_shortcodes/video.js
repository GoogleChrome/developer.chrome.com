const ImgixClient = require('imgix-core-js');
const {html} = require('common-tags');
const mime = require('browser-media-mime-type');
const {imgix: domain} = require('../_data/site.json');

const client = new ImgixClient({domain, includeLibraryParam: false});

/**
 *
 * @param {string} src
 * @return {string}
 */
const generateSource = src => {
  let type = src.split('.').pop();
  type = mime('.' + type);
  return html`
    <source src="${client.buildURL(src)}" ${type ? `type="${type}"` : ''} />
  `.replace(/\n/g, '');
};

/**
 * @param {string|string[]} paths Path(s) for video.
 * @returns {string}
 */
const video = paths => {
  if (typeof paths === 'string') {
    paths = [paths];
  }

  return html`
    <video controls>
      ${paths.map(generateSource)}
    </video>
  `;
};

module.exports = {video};
