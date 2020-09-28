const {fetchFromCache} = require('./lib/cache');

const OMAHA_PROXY_JSON = 'https://omahaproxy.appspot.com/all.json';
const SCHEDULE_JSON =
  'https://chromiumdash.appspot.com/fetch_milestone_schedule';

// these OS' have weird releases, don't include
const SKIP_OS = ['webview', 'ios'];

/**
 * Finds the major Chrome release version from the passed string that looks like "84.0.1231.11".
 *
 * @param {string} raw
 * @return {number}
 */
function extractMajorVersion(raw) {
  // this is [major, minor, branch, patch]
  const [major] = raw.split('.').map(x => parseInt(x) || 0);
  return major;
}

/**
 * Fetches Chrome release data for a major version from the Chromium Dashboard. Can return null
 * if the version or data returned is invalid.
 *
 * @param {number} version
 * @return {!Promise<?Object>}
 */
async function dataForVersion(version) {
  const url = `${SCHEDULE_JSON}?mstone=${version}`;
  const json = await fetchFromCache(url);

  // We expect this to be shaped like {mstones: [{...}]}, with just a single item returned.

  if (!('mstones' in json) || !json['mstones'][0]) {
    return null;
  }
  const data = json['mstones'][0];
  if (!('stable_date' in data) || data['mstone'] !== version) {
    return null;
  }

  // This contains useful keys "stable_date", "earliest_beta" and "final_beta", among others.
  return data;
}

/**
 * Generates Chrome version information.
 *
 * Returns the current version for each channel (i.e., "stable" => 85) as well as its release
 * information, if available.
 *
 * @return {!Promise<{channels: !Object<string, !Object>}>}
 */
module.exports = async function buildVersionInformation() {
  const json = await fetchFromCache(OMAHA_PROXY_JSON);
  const channels = {};

  // Find the current version for every channel. The published data returns the versions for each
  // operating system. We take the highest major version found across each OS and use that.
  for (const {os, versions} of json) {
    if (SKIP_OS.includes(os)) {
      continue;
    }

    for (const {channel, version} of versions) {
      const majorVersion = extractMajorVersion(version);
      if (majorVersion === 0) {
        continue;
      }
      if (channel in channels) {
        channels[channel].mstone = Math.max(
          channels[channel].mstone,
          majorVersion
        );
      } else {
        channels[channel] = {channel, mstone: majorVersion};
      }
    }
  }

  // Now that we have all major versions, look up and/or cache the schedule for each version. This
  // might be the same version for multiple channels, but Eleventy is caching the result for us.
  for (const channel in channels) {
    const {mstone} = channels[channel];
    const update = await dataForVersion(mstone);

    // dataForVersion doesn't know about the channel name, so we use Object.assign to ensure the
    // channel name is still included in the value. This lets Eleventy paginate over just values.
    Object.assign(channels[channel], update);
  }

  return {channels};
};
