---
api: storage
---

## Overview

This API has been optimized to meet the specific storage needs of extensions. It provides the same
storage capabilities as the [localStorage API][local-storage] with the following key differences:

- User data can be automatically synced with Chrome sync (using `storage.sync`).
- Your extension's content scripts can directly access user data without the need for a background
  page.
- A user's extension settings can be persisted even when using [split incognito
  behavior][incognito].
- It's asynchronous with bulk read and write operations, and therefore faster than the blocking and
  serial `localStorage API`.
- User data can be stored as objects (the `localStorage API` stores data in strings).
- Enterprise policies configured by the administrator for the extension can be read (using
  `storage.managed` with a [schema][api-storage]).

## Manifest

You must declare the "storage" permission in the [extension manifest][api-tabs] to use the storage
API. For example:

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "storage"
  ],
  ...
}
```

## Usage

To store user data for your extension, you can use either `storage.sync`:

```js
chrome.storage.sync.set({key: value}, function() {
  console.log('Value is set to ' + value);
});

chrome.storage.sync.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});
```

or `storage.local`:

```js
chrome.storage.local.set({key: value}, function() {
  console.log('Value is set to ' + value);
});

chrome.storage.local.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});
```

When using `storage.sync`, the stored data will automatically be synced to any Chrome browser that
the user is logged into, provided the user has sync enabled.

When Chrome is offline, Chrome stores the data locally. The next time the browser is online, Chrome
syncs the data. Even if a user disables syncing, `storage.sync` will still work. In this case, it
will behave identically to `storage.local`.

{% Aside 'warning' %}

Confidential user information should not be stored! The storage area isn't encrypted.

{% endAside %}

The `storage.managed` storage is read-only.

## Storage and throttling limits

`chrome.storage` is not a big truck. It's a series of tubes. And if you don't understand, those
tubes can be filled, and if they are filled when you put your message in, it gets in line, and it's
going to be delayed by anyone that puts into that tube enormous amounts of material.

For details on the current limits of the storage API, and what happens when those limits are
exceeded, please see the quota information for [sync][prop-sync] and [local][prop-local].

## Examples

If you're interested in tracking changes made to a data object, you can add a listener to its
`onChanged` event. Whenever anything changes in storage, that event fires. Here's sample code to
listen for saved changes:

```js
//// background.js ////

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});
```

We can take this idea even further. In this example we have an [options page][options-page] that
allows the user to toggle a "debug mode" in the extension (implementation not shown here). Changes
to this setting are immediately saved to sync storage by the options page and the background script uses `storage.onChanged` to apply the setting as soon as possible.

```html
<!-- options.html -->

<script defer src="options.js"></script>
<form id="optionsForm">
  <label for="debug">
    <input type="checkbox" name="debug" id="debug">
    Enable debug mode
  </label>
</form>
```

```js
//// options.js ////

// In-page cache of the user's options
const options = {};

// Initialize the form with the user's option settings
chrome.storage.sync.get('options', (data) => {
  Object.assign(options, data.options);
  optionsForm.debug.checked = Boolean(options.debug);;
});

// Immediately persist options changes
optionsForm.debug.addEventListener('change', (event) => {
  options.debug = event.target.checked;
  chrome.storage.sync.set({options});
});
```

```js
//// background.js ////

// Watch for changes to the user's options & apply them
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.options?.newValue) {
    const debugMode = Boolean(changes.options.newValue.debug);
    console.log('enable debug mode?', debugMode);
    setDebugMode(debugMode);
  }
});
```

Since service workers are not always running, Manifest V3 extensions sometimes need to
asynchronously load data from storage before they execute their event handlers. To do this, the
below snippet uses an async `action.onClicked` event handler that waits for the `storageCache`
global to be populated before executing its logic.

```js
//// background.js ////

// Where we will expose all the data we retrieve from storage.sync.
const storageCache = {};
// Asynchronously retrieve data from storage.sync, then cache it.
const initStorageCache = getAllStorageSyncData().then(items => {
  // Copy the data retrieved from storage into storageCache.
  Object.assign(storageCache, items);
});

chrome.action.onClicked.addListener(async (tab) => {
  try {
    await initStorageCache;
  } catch (e) {
    // Handle error that occurred during storage initialization.
  }
  // Normal action handler logic.
});

// Reads all data out of storage.sync and exposes it via a promise.
//
// Note: Once the Storage API gains promise support, this function
// can be greatly simplified.
function getAllStorageSyncData() {
  // Immediately return a promise and start asynchronous work
  return new Promise((resolve, reject) => {
    // Asynchronously fetch all data from storage.sync.
    chrome.storage.sync.get(null, (items) => {
      // Pass any observed errors down the promise chain.
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      // Pass the data retrieved from storage down the promise chain.
      resolve(items);
    });
  });
}
```

[api-storage]: /docs/extensions/mv2/manifest/storage
[api-tabs]: /docs/extensions/mv2/tabs
[incognito]: /docs/extensions/mv2/manifest/incognito
[local-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[options-page]: https://developer.chrome.com/docs/extensions/mv3/options/
[prop-local]: #property-local
[prop-sync]: #property-sync
