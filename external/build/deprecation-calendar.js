const {default: fetch} = require('node-fetch');
const fs = require('fs');
const path = require('path');

const DEPRECATION_ENDPOINT =
  'https://chromestatus.com/api/v0/features?q=feature_type=3';

const CHANNELS_ENDPOINT = 'https://chromestatus.com/api/v0/channels';

async function fetchDeprecations() {
  const r = await fetch(DEPRECATION_ENDPOINT);

  const deprecationsText = await (await r.text()).substring(5);
  const deprecationsJson = JSON.parse(deprecationsText);

  const deprecationsSort = (a, b) => {
    // Move features without versions to end of list.
    if (!b.browsers.chrome.desktop) {
      return -1;
    }

    if (!a.browsers.chrome.desktop) {
      return 1;
    }

    // Sort by most recent feature.
    return (
      parseInt(b.browsers.chrome.desktop) - parseInt(a.browsers.chrome.desktop)
    );
  };

  return deprecationsJson?.features.sort(deprecationsSort);
}

async function fetchChannels(start, end) {
  let queryString = '';
  if (start !== undefined && end !== undefined) {
    queryString = `?start=${start}&end=${end}`;
  }
  const r = await fetch(`${CHANNELS_ENDPOINT}${queryString}`);

  const channelsText = await (await r.text()).substring(5);
  const channelsJson = JSON.parse(channelsText);
  return channelsJson;
}

function getVersions(deprecations) {
  const versions = deprecations
    .map(f => f.browsers.chrome.desktop)
    .filter(f => f !== undefined)
    .sort((a, b) => parseInt(a) - parseInt(b));

  return versions;
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

    const formattedDeprecation = {};
    formattedDeprecation.version = deprecation.browsers.chrome.desktop;
    formattedDeprecation.name = deprecation.name;
    formattedDeprecation.date = date;

    return formattedDeprecation;
  });

  const targetFile = path.join(__dirname, '../data/deprecation-calendar.json');
  fs.writeFileSync(targetFile, JSON.stringify(formattedDeprecations));
}

run();
