/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
 * @param {string} channel
 * @param {number} version
 * @return {Promise<ChromeReleaseData?>}
 */
async function dataForVersion(channel, version) {
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

  // The underlying data contains useful keys "stable_date", "earliest_beta" and "final_beta",
  // among others, most of which are currently ignored.

  return {
    mstone: version,
    key: channel,
    stableDate: new Date(data['stable_date']),
  };
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

  /** @type {{[channel: string]: number}} */
  const channelRelease = {};

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
      channelRelease[channel] = Math.max(
        channelRelease[channel] ?? 0,
        majorVersion
      );
    }
  }

  /** @type {{[channel: string]: ChromeReleaseData}} */
  const channels = {};

  // Now that we have all major versions, look up and/or cache the schedule for each version. This
  // might be the same version for multiple channels, but Eleventy is caching the result for us.
  for (const [channel, mstone] of Object.entries(channelRelease)) {
    const data = await dataForVersion(channel, mstone);
    if (data) {
      channels[channel] = data;
    }
  }

  return {channels};
};
