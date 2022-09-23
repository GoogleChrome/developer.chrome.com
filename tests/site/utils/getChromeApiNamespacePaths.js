const test = require('ava');

const getChromeApiNamespaces = require('../../../site/_data/chromeApiNamespaces.js');
const {
  getChromeApiNamespacePaths,
} = require('../../../site/_utils/getChromeApiNamespacePaths.js');

const apiNamespaces = getChromeApiNamespaces();

test('builds namespace paths for events', t => {
  const apiNamespacePaths = getChromeApiNamespacePaths(apiNamespaces['events']);

  t.assert(apiNamespacePaths.includes('chrome.events.Event'));
  t.assert(apiNamespacePaths.includes('chrome.events.UrlFilter'));
  t.assert(apiNamespacePaths.includes('chrome.events.Event'));
});

test('builds namespace paths for usb', t => {
  const apiNamespacePaths = getChromeApiNamespacePaths(apiNamespaces['usb']);

  t.assert(apiNamespacePaths.includes('chrome.usb.ConfigDescriptor'));
  t.assert(apiNamespacePaths.includes('chrome.usb.ControlTransferInfo'));
  t.assert(apiNamespacePaths.includes('chrome.usb.Device'));
});
