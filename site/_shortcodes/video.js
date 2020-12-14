const mime = require('browser-media-mime-type');
const {html} = require('common-tags');
const path = require('path');
const url = require('url');
const {bucket, gcs} = require('../_data/site.json');

/**
 *
 * @param {string} src
 * @return {string}
 */
const generateSource = src => {
  let type = src.split('.').pop();
  type = mime('.' + type);
  src = new url.URL(path.join(bucket, src), gcs).href;
  return html`
    <source src="${src}" ${type ? `type="${type}"` : ''} />
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

  return html`<video controls>${paths.map(generateSource)}</video>`;
};

module.exports = {video};
