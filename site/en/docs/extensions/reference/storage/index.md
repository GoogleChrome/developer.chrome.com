---
api: storage
---

## Overview {: #overview }

The Storage API provides an extension-specific way to persist extension data and state. It's similar to, but different from the web platform's storage APIs (IndexedDB, localStorage), it has been optimized to meet the specific storage needs of extensions: 

- Storage data persists when the user clears their browsing history and cache.
- All extension context can access the data, including content scripts and service workers.
- A user's extension settings can be persisted even when using [split incognito
  behavior][incognito].
- Data is serialized as JSON strings and stored as objects.
- It's asynchronous with bulk read and write operations.
- Offers exclusive read-only storage area for enterprise policies.

The Storage API is divided into 4 different buckets ("storage areas"). The following are a few features of each storage area: 

### Local

- Data is stored locally on the computer that Chrome is running the extension.
- Storage quota can be expanded with the `"unlimitedStorage"` permission.
- Removing the extension clears the data stored in local storage.
- Quota limitation is 5 MB approx. 
- Consider using it when you need to store larger amounts of data.

### Sync

- If the user has sync enabled, the stored data will be synced to any Chrome browser that the user is logged into.
- Quota limitation is 100 KB approx, 8 KB per item
- Consider using it to preserve user preferences across synced browsers. 

{% Aside 'warning' %}

Confidential user data should not be stored in local and sync, unless you restrict the [access level](www.todo.com). The storage area isn't encrypted. Another alternative is using sessions storage.

{% endAside %}

### Sessions

Say something clever here, the following blah:

- Holds small amounts of data in memory for the duration of a browser session.
- Secure (not available for Content Scripts)
- Quota limitation is 1 MB approx.
- Consider using it to store global variables or confidential user information.

### Managed

- Administrator can configure enterprise policies for the extension with a [schema][api-storage].
- Storage is read-only.


## Manifest

You must declare the `"storage"` permission in the [extension manifest][doc-manifest] to use the storage
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

## Usage {: #usage }

The following code samples demonstrate how to use `storage.local`, `storage.sync`, and
`storage.sessions`:




### Local {: #usage-local }

```js
chrome.storage.local.set({ key: value }).then(() => {
  console.log("Value is set to " + value);
});

chrome.storage.local.get(["key"]).then((result) => {
  console.log("Value currently is " + result.key);
});
```

### Sync {: #usage-sync}

When using `storage.sync`, the stored data will automatically be synced to any Chrome browser that
the user is logged into, provided the user has sync enabled. If a user disables syncing, then `storage.sync` will still work, but will behave like `storage.local`.

```js
chrome.storage.sync.set({ key: value }).then(() => {
  console.log("Value is set to " + value);
});

chrome.storage.sync.get(["key"]).then((result) => {
  console.log("Value currently is " + result.key);
});
```

When Chrome is offline, Chrome stores the data locally. The next time the browser is online, Chrome
will sync the data. 

### Sessions {: #usage-sessions }

```js
chrome.storage.session.set({ key: value }).then(() => {
  console.log("Value is set to " + value);
});

chrome.storage.session.get(["key"]).then((result) => {
  console.log("Value currently is " + result.key);
});
```

## Storage and throttling limits

`chrome.storage` is not a big truck. It's a series of tubes. And if you don't understand, those
tubes can be filled, and if they are filled when you put your message in, it gets in line, and it's
going to be delayed by anyone that puts into that tube enormous amounts of material.

For details on the current limits of the storage API, and what happens when those limits are
exceeded, please see the quota information for [sync][prop-sync] and [local][prop-local].

## Examples

The following sections demonstrate how to use `chrome.storage` to address some common use cases.

### Synchronous response to storage updates

If you're interested in tracking changes made to a data object, you can add a listener to its
`onChanged` event. Whenever anything changes in storage, that event fires. Here's sample code to
listen for saved changes:

{% Label %}background.js:{% endLabel %}

```js
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

{% Label %}options.html:{% endLabel %}

```html
<script defer src="options.js"></script>
<form id="optionsForm">
  <label for="debug">
    <input type="checkbox" name="debug" id="debug">
    Enable debug mode
  </label>
</form>
```

{% Label %}options.js:{% endLabel %}

```js
// In-page cache of the user's options
const options = {};

// Initialize the form with the user's option settings
chrome.storage.sync.get('options', (data) => {
  Object.assign(options, data.options);
  optionsForm.debug.checked = Boolean(options.debug);
});

// Immediately persist options changes
optionsForm.debug.addEventListener('change', (event) => {
  options.debug = event.target.checked;
  chrome.storage.sync.set({options});
});
```

{% Label %}background.js:{% endLabel %}

```js
// Watch for changes to the user's options & apply them
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.options?.newValue) {
    const debugMode = Boolean(changes.options.newValue.debug);
    console.log('enable debug mode?', debugMode);
    setDebugMode(debugMode);
  }
});
```

### Asynchronous preload from storage

Since service workers are not always running, Manifest V3 extensions sometimes need to
asynchronously load data from storage before they execute their event handlers. To do this, the
below snippet uses an async `action.onClicked` event handler that waits for the `storageCache`
global to be populated before executing its logic.

{% Label %}background.js:{% endLabel %}

```js
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
[doc-manifest]: /docs/extensions/mv3/manifest
[incognito]: /docs/extensions/mv2/manifest/incognito
[local-storage]: https://developer.mozilla.org/docs/Web/API/Window/localStorage
[options-page]: https://developer.chrome.com/docs/extensions/mv3/options/
[prop-local]: #property-local
[prop-sync]: #property-sync
