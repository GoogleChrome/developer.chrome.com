/**
 * @fileoverview Extract browser extension samples from sample list data.
 */

const path = require('path');
const fs = require('fs');

module.exports = (() => {
  const dataFile = path.join(
    __dirname,
    '../../external/data/extension-samples.json'
  );
  /** @type {extensionSample[]} */
  const extensionSamples = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));

  const sampleTypes = {
    API_SAMPLE: 'API Sample',
    FUNCTIONAL_SAMPLE: 'Functional Sample',
  };

  const availableAPIs = new Set();
  const availablePermissions = new Set();
  extensionSamples.forEach(sample => {
    sample.apis.forEach(api => {
      availableAPIs.add(`${api.namespace}_${api.propertyName}`);
    });
    sample.permissions.forEach(permission => {
      availablePermissions.add(permission);
    });
  });

  const samplesKeyedByName = {};
  extensionSamples.forEach(sample => {
    samplesKeyedByName[sample.name] = sample;
  });

  return {
    sampleTypes,
    samples: extensionSamples.sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    ),
    samplesKeyedByName,
    availableAPIs: Array.from(availableAPIs.keys()).sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    ),
    availablePermissions: Array.from(availablePermissions.keys()).sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    ),
  };
})();
