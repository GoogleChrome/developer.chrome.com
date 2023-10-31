const {default: fetch} = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');

const DEPRECATION_ENDPOINT =
  'https://chromestatus.com/api/v0/features?q=feature_type=3';

const CHANNELS_ENDPOINT = 'https://chromestatus.com/api/v0/channels';

/**
 * Fetches channel data from an endpoint URL.
 * @async
 * @param {string} endpoint - The URL of the endpoint to fetch data from.
 * @returns {Promise<object>} - An array of channel data objects.
 **/

async function fetchData(endpoint) {
  let data = {};

  try {
    data = await fetch(endpoint);

    // Remove first 5 chars to have a correctly formatted JSON
    data = (await data.text()).substring(5);
    data = JSON.parse(data.toString());
  } catch (error) {
    console.error('Error fetching the data', error);
  }
  return data;
}

/**
 * Fetches all the deprecations from a list of features
 *
 * @return {Promise<object[]>} A promise that resolves in an array containing
 * all the deprecations
 */
async function fetchDeprecations() {
  let deprecations = await fetchData(DEPRECATION_ENDPOINT);
  deprecations = deprecationsSort(deprecations?.features);
  return deprecations;
}

/**
 * Fetches all channels info needed to get depracation
 * dates starting from a Chrome version
 *
 * @param {number | undefined} start oldest version needed
 * @param {number  | undefined} end newest version needed
 * @return {Promise<object[]>} A promise that resolves in an array containing
 * all the channel infos needed
 */
async function fetchChannels(start, end) {
  const params = new URLSearchParams();
  if (start !== undefined && end !== undefined) {
    params.set('start', start.toString());
    params.set('end', end.toString());
  }
  const queryString = params.toString();

  const channels = fetchData(`${CHANNELS_ENDPOINT}?${queryString}`);

  return channels;
}

/**
 * Starting from an array of deprecations, removes the ones that have
 * no Chrome version associated and then orders them chronologically
 *
 * @param {object[]} deprecations a list of deprecations to filter and order
 * @return {number[]} an array containing all the versions involved in the
 * deprecation list
 */
function getVersions(deprecations) {
  const versions = deprecations
    .map(f => f.browsers.chrome.desktop)
    .filter(f => f !== null)
    .sort((a, b) => parseInt(a) - parseInt(b));

  return versions;
}

/**
 * Confronts deprecations to sort them chronologically using Array.sort()
 *
 * @param {object[]} deprecations
 * @return {object[]}
 */
function deprecationsSort(deprecations) {
  return deprecations.sort((a, b) => {
    if (!b.browsers.chrome.desktop) return -1;
    if (!a.browsers.chrome.desktop) return 1;
    return (
      parseInt(b.browsers.chrome.desktop) - parseInt(a.browsers.chrome.desktop)
    );
  });
}

/**
 *Formats an array of deprecations using the given channels data.
 * @param {Object[]} deprecations - An array of deprecations to format.
 * @param {Object} channels - An object containing channel data.
 * @returns {Object[]} - An array of formatted deprecations.
 **/

function formatDeprecations(deprecations, channels) {
  const formattedDeprecations = deprecations.map(deprecation => {
    const channel = channels[deprecation.browsers.chrome.desktop];
    let date = 'N/A';
    if (channel && channel.stable_date) {
      date = channel.stable_date.slice(0, -9);
    }

    const formattedDeprecation = {
      id: deprecation.id,
      version: deprecation.browsers.chrome.desktop,
      name: deprecation.name,
      date: date,
    };

    return formattedDeprecation;
  });

  return formattedDeprecations;
}

async function run() {
  const deprecations = await fetchDeprecations();
  const versions = getVersions(deprecations);
  const channels = await fetchChannels(versions.at(0), versions.at(-1));

  const targetFile = path.join(__dirname, '../data/chrome-deprecations.json');
  try {
    fs.writeFile(
      targetFile,
      JSON.stringify(formatDeprecations(deprecations, channels))
    );
  } catch (error) {
    console.error('Error writing the data', error);
  }
}

run();
