---
api: storage
---

## Overview {: #overview }

The Storage API provides an extension-specific way to persist extension data and state. It's similar from the web platform's storage APIs ([IndexedDB][mdn-indexeddb], [localStorage][mdn-localstorage]), but has been optimized to meet the storage needs of extensions: 

- Data is serialized as JSON strings and stored as objects.
- Storage is asynchronous with bulk read and write operations.
- Storage data persists when the user clears cache and browsing history.
- Can be used by content scripts, service worker, and other extension contexts.
- A user's extension settings persist even when using [split incognito
  behavior][incognito].
- Offers an exclusive read-only managed storage area for enterprise policies.

{% Details %}
{% DetailsSummary %}
💡 Can I use localStorage in my extension?
{% endDetailsSummary %}

Even though extensions can use [Window.localStorage][mdn-localstorage] in certain contexts (popup and other HTML pages), it is not recommended for the following reasons:

- The service worker cannot access localStorage API.
- Content scripts share the localStorage of the host page.
- The browser clears any data stored by the extension in localStorage when the user clear their browsing history and data for privacy reasons.

{% endDetails %}

### Storage areas

The Storage API is divided into four buckets ("storage areas"): 

- [**storage.local**][prop-local]
  - Data is stored locally.
  - Quota can be increased with the `"unlimitedStorage"` permission.
  - Removing the extension clears the storage data.
  - Quota limitation is 5 MB approx. 
  - Consider using it to store larger amounts of data.

- [**storage.sync**][prop-sync]
  - If syncing is enabled, the data is synced to any Chrome browser that the user is logged into.
  - When the browser is offline, Chrome stores the data locally. Once back online the data will be synced.
  - If syncing is disabled, it behaves like `storage.local`. 
  - Quota limitation is 100 KB approx, 8 KB per item
  - Consider using it to preserve user settings across synced browsers. 

{% Aside 'warning' %}

Confidential user data should not be saved in `storage.local` and `storage.sync` because they are not encrypted. For sensitive data, we recommend the `session` storage area, which is not stored in local disk.

{% endAside %}

- [**storage.session**][prop-session]
  - Holds small amounts of data in memory for the duration of a browser session.
  - Not available in content scripts.
  - Quota limitation is 1 MB approx.
  - Consider using it to store global variables or confidential user information.

- [**storage.managed**][prop-managed]
  - Administrator can use a [schema][manifest-storage] to configure enterprise policies.
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

The following samples demonstrate the `local`, `sync`, and
`sessions` storage areas:

<web-tabs>
  <web-tab title="storage.local">

  ```js
  chrome.storage.local.set({ key: value }).then(() => {
    console.log("Value is set to " + value);
  });

  chrome.storage.local.get(["key"]).then((result) => {
    console.log("Value currently is " + result.key);
  });
  ```

  </web-tab>
  <web-tab title="storage.sync">

  ```js
  chrome.storage.sync.set({ key: value }).then(() => {
    console.log("Value is set to " + value);
  });

  chrome.storage.sync.get(["key"]).then((result) => {
    console.log("Value currently is " + result.key);
  });
  ```

  </web-tab>
  <web-tab title="storage.session">

  ```js
  chrome.storage.session.set({ key: value }).then(() => {
    console.log("Value is set to " + value);
  });

  chrome.storage.session.get(["key"]).then((result) => {
    console.log("Value currently is " + result.key);
  });
  ```

  </web-tab>
</web-tabs>

<!-- ---  -->
For `managed` storage area usage details, see [Manifest for storage areas][manifest-storage].

## Storage and throttling limits

The Storage API is not a big truck. It's a series of tubes. And if you don't understand, those
tubes can be filled, and if they are filled when you put your message in, it gets in line, and it's
going to be delayed by anyone that puts into that tube enormous amounts of material.

For details on the current limits of the storage API, and what happens when those limits are
exceeded, please see the quota information for [sync][prop-sync] and [local][prop-local].

## Use cases {: #examples}

The following sections demonstrate some common use cases for the Storage API.

### Synchronous response to storage updates

To track changes made to a data object, you can add a listener to its `onChanged` event. When anything changes in storage, that event fires. The sample code listens for these changes:

{% Label %}background.js:{% endLabel %}

```js
chrome.storage.onChanged.addListener((changes, namespace) => {
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
to this setting are immediately saved to sync storage by the options page and the service worker uses `storage.onChanged` to apply the setting as soon as possible.

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
const storageCache = { count: 0 };
// Asynchronously retrieve data from storage.sync, then cache it.
const initStorageCache = chrome.storage.sync.get().then((items) => {
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
  storageCache.count++;
  storageCache.lastTabId = tab.id;
  chrome.storage.sync.set(storageCache);
});
```

## Extension examples

To see other demos of the Storage API, explore any of the following examples:

- [Global search extension][gh-global-context-search].
- [Water alarm extension][gh-water-alarm].


[doc-manifest]: /docs/extensions/mv3/manifest
[gh-global-context-search]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/17956f44b6f04d28407a4b7eee428611affd4fab/api/contextMenus/global_context_search
[gh-water-alarm]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/17956f44b6f04d28407a4b7eee428611affd4fab/examples/water_alarm_notification
[incognito]: /docs/extensions/mv2/manifest/incognito
[manifest-storage]: /docs/extensions/mv3/manifest/storage
[mdn-indexeddb]: https://developer.mozilla.org/docs/Web/API/Window/indexeddb
[mdn-localstorage]: https://developer.mozilla.org/docs/Web/API/Window/localStorage
[options-page]: https://developer.chrome.com/docs/extensions/mv3/options/
[prop-local]: #property-local
[prop-sync]: #property-sync
[prop-session]: #property-session
[prop-managed]: #property-managed