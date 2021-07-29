/**
 * Temporarily disable TS type check as the global `wd` namespace
 * that comes from `webdev-infra` is currently broken.
 */
// @ts-nocheck
const {Video: BuildVideoShortcode} = require('webdev-infra/shortcodes/Video');
const {bucket, imgixDomain} = require('../_data/site.json');

/**
 * @param {import('webdev-infra/types').VideoArgs} args Named arguments
 * @returns {string}
 */
const Video = BuildVideoShortcode(bucket, imgixDomain);

module.exports = {Video};
