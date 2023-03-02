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

const OMAHA_PROXY_JSON = 'https://omahaproxy.appspot.com/all.json';
const SCHEDULE_JSON =
  'https://chromiumdash.appspot.com/fetch_milestone_schedule';

// these OS' have weird releases, don't include
const SKIP_OS = ['webview', 'ios'];

// How many previous releases counting back from the current one should be fetched
const MILESTONES_OFFSET = 48;

// How many milestones should be fetched in total
const MILESTONES_COUNT = 96;

const {default: fetch} = require('node-fetch');

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
  const json = await fetch(url).then(r => r.json());

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
 * Requests a list of Chrome milestones and their relevant
 * release dates from the schedule endpoint.
 * @param {number} offset Number of past releases to fetch
 * @param {number} count Number of releases to fetch in total
 * @returns The fetch releases, with their stable and beta dates
 */
async function dataForVersions(offset, count) {
  const url = `${SCHEDULE_JSON}?offset=-${offset}&n=${count}`;
  const data = await fetch(url).then(r => r.json());

  if (!('mstones' in data) || !data['mstones'][0]) {
    return {};
  }

  const milestones = {};
  for (const mstone of data['mstones']) {
    milestones[mstone.mstone] = {
      stableDate: new Date(mstone['stable_date']),
      earliestBetaDate: new Date(mstone['earliest_beta']),
      finalBetaDate: new Date(mstone['final_beta']),
    };
  }

  return milestones;
}

/**
 * Generates Chrome version information.
 *
 * While there are many channels, we just care about 'stable' and 'beta'. This method returns a
 * value for both.
 *
 * Beta is not always stable+1 in the underlying data, it can either be stable+0 or stable+2
 * depending on the point in the release cycle.
 *
 * @return {Promise<{channels: Object<string, !Object>, milestones: Object<string, !Object>}>}
 */
module.exports = async function buildVersionInformation() {
  const json = await fetch(OMAHA_PROXY_JSON).then(r => r.json());

  /** @type {{[channel: string]: number}} */
  const raw = {};

  // Find the current version for every channel. The published data returns the versions for each
  // operating system. We take the highest major version found across each OS and use that.
  for (const {os, versions} of json) {
    if (SKIP_OS.includes(os)) {
      continue;
    }

    for (const {channel, version} of versions) {
      if (!['stable', 'beta'].includes(channel)) {
        continue;
      }
      const majorVersion = extractMajorVersion(version);
      if (majorVersion === 0) {
        continue;
      }
      raw[channel] = Math.max(raw[channel] ?? 0, majorVersion);
    }
  }

  // Sanity-check that we have 'stable', and if we have 'beta', that it's one or two higher.
  // Create the virtual 'pending' if it's two higher.
  if (!('stable' in raw) || raw['beta'] < raw['stable']) {
    console.warn(raw);
    throw new Error('bad Chrome release data, no stable or beta < stable');
  }
  if (!('beta' in raw) || raw['beta'] === raw['stable']) {
    // pretend beta is stable+1 if it's not here or beta===stable
    raw['beta'] = raw['stable'] + 1;
  }
  const {beta, stable} = raw;
  if (beta === stable + 1) {
    // great
  } else if (beta === stable + 2) {
    // This can occur if Chrome does something weird with releases, basically the previous beta
    // is about to be released but it's not done yet.
    raw['pending'] = stable + 1;
  } else {
    console.warn(raw);
    throw new Error('bad Chrome release data, beta is >+2 from stable');
  }

  // Now that we have all major versions, look up and/or cache the schedule for each version. This
  // might be the same version for multiple channels, but Eleventy is caching the result for us.

  /** @type {(arg: [string, number]) => Promise<[string, ChromeReleaseData]>} */
  const fetchChannelData = async ([channel, mstone]) => {
    const data = await dataForVersion(channel, mstone);
    if (!data) {
      throw new Error(`couldn't fetch data for Chrome ${mstone}`);
    }
    return [channel, data];
  };

  const channels = Object.fromEntries(
    await Promise.all(Object.entries(raw).map(fetchChannelData))
  );

  const milestones = await dataForVersions(MILESTONES_OFFSET, MILESTONES_COUNT);

  return {channels, milestones};
};
