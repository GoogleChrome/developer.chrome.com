const {default: fetch} = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');

const DEPRECATION_ENDPOINT =
  'https://chromestatus.com/api/v0/features?q=feature_type=3';

const CHANNELS_ENDPOINT = 'https://chromestatus.com/api/v0/channels';

/**
 * Fetches all the deprecations from a list of features
 *
 * @return {promise} A promise that resolves in an array containing
 * all the deprecations
 */
async function fetchDeprecations() {
  let deprecations = [];
  try {
    const data = await fetch(DEPRECATION_ENDPOINT);

    const deprecationsText = (await data.text()).substring(5); // Remove first 5 chars to have a correctly formatted JSON
    const deprecationsJson = JSON.parse(deprecationsText);
    deprecations = deprecationsJson?.features.sort(deprecationsSort);
  } catch (error) {
    console.error('Error fetching the deprecations', error);
  }
  return deprecations;
}

/**
 * Fetches all channels info needed to get depracation
 * dates starting from a Chrome version
 *
 * @param {number | undefined} start oldest version needed
 * @param {number  | undefined} end newest version needed
 * @return {promise} A promise that resolves in an array containing
 * all the channel infos needed
 */
async function fetchChannels(start, end) {
  let channels = [];
  let queryString = '';
  if (start !== undefined && end !== undefined) {
    queryString = `?start=${start}&end=${end}`;
  }

  try {
    const data = await fetch(`${CHANNELS_ENDPOINT}${queryString}`);

    const channelsText = (await data.text()).substring(5); // Remove first 5 chars to have a correctly formatted JSON
    channels = JSON.parse(channelsText);
  } catch (error) {
    console.error('Error fetching the channels', error);
  }

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
    .filter(f => f !== undefined)
    .sort((a, b) => parseInt(a) - parseInt(b));

  return versions;
}

/**
 * Confronts deprecations to sort them chronologically using Array.sort()
 *
 * @param {object} a
 * @param {object} b
 * @return {number}
 */
function deprecationsSort(a, b) {
  if (!b.browsers.chrome.desktop) return -1;
  if (!a.browsers.chrome.desktop) return 1;

  return (
    parseInt(b.browsers.chrome.desktop) - parseInt(a.browsers.chrome.desktop)
  );
}

async function run() {
  const deprecations = await fetchDeprecations();
  const versions = getVersions(deprecations);
  const channels = await fetchChannels(versions.at(0), versions.at(-1));

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

  const targetFile = path.join(__dirname, '../data/deprecation-calendar.json');
  try {
    fs.writeFile(targetFile, JSON.stringify(formattedDeprecations));
  } catch (error) {
    console.error('Error writing the data', error);
  }
}

run();
