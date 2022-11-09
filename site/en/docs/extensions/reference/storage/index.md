---
api: storage
---

## Overview {: #overview }

The Storage API provides an extension-specific way to persist user data and state. It's similar to the web platform's storage APIs ([IndexedDB][mdn-indexeddb], [localStorage][mdn-localstorage]), but was designed to meet the storage needs of extensions. The following are a few key features: 

- Content scripts can directly access chrome.storage.
- Stores JSON serializable values as object properties.
- Storage is asynchronous with bulk read and write operations.
- Storage data persists when the user clears the cache and browsing history.
- Available in the service worker, content scripts, and other extension contexts.
- A user's extension settings persist even when using [split incognito][incognito].
- Offers an exclusive read-only [managed storage area][manifest-storage] for enterprise policies.

{% Details %}
{% DetailsSummary %}
💡 Can extensions use Window.localStorage?
{% endDetailsSummary %}

Even though extensions can access [Window.localStorage][mdn-localstorage] in some contexts (popup and other HTML pages), it is not recommended for the following reasons:

- The extension's service worker cannot access the localStorage API.
- Content scripts share the localStorage of the host page.
- Data saved to localStorage is lost when the user clears their browsing history.

{% endDetails %}

### Storage areas

The Storage API is divided into the following four buckets ("storage areas"): 

- [**storage.local**][prop-local]
  - Data is stored locally, which is cleared when the extension is removed.
  - Quota limitation is approx 5 MB, but can be increased by requesting the `"unlimitedStorage"` permission.
  - Consider using it to store larger amounts of data.

- [**storage.sync**][prop-sync]
  - If syncing is enabled, the data is synced to any Chrome browser that the user is logged into. If disabled, it behaves like `storage.local`.
  - When the browser is offline, Chrome stores the data locally and resumes syncing when it's back online.
  - Quota limitation is 100 KB approx, 8 KB per item.
  - Consider using it to preserve user settings across synced browsers. 

{% Aside 'warning' %}

Local and sync storage areas should not store confidential user data because they are not encrypted at rest. When working with sensitive data, consider using the `session` storage area to hold values in memory until the browser is shut down.

{% endAside %}

- [**storage.session**][prop-session]
  - Holds small amounts of data in memory for the duration of a browser session.
  - Not available in content scripts.
  - Quota limitation is 1 MB approx.
  - Consider using it to store global variables across service worker runs.

- [**storage.managed**][prop-managed]
  - Administrator can use a [schema][manifest-storage] and enterprise policies to configure a supporting extension's settings in a managed environment.
  - Storage is read-only.

## Manifest {: #manifest}

To use the storage API, you must declare the `"storage"` permission in the extension
[manifest][doc-manifest]. For example:

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
`session` storage areas:

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


To learn more about the `managed` storage area, see [Manifest for storage areas][manifest-storage].


## Storage and throttling limits {: #storage-and-throttling-limits}

The Storage API is not a big truck. It's a series of tubes. And if you don't understand, those
tubes can be filled, and if they are filled when you put your message in, it gets in line, and it's
going to be delayed by anyone that puts into that tube enormous amounts of material.

For details on storage area limitations and what happens when they are exceeded, see the quota information for [`sync`][prop-sync], [`local`][prop-local], and [`session`][prop-session].

## Use cases {: #examples}

The following sections demonstrate some common use cases for the Storage API.

### Synchronous response to storage updates

To track changes made to storage, you can add a listener to its `onChanged` event. When anything changes in storage, that event will fire. The sample code listens for these changes:

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

We can take this idea even further. In this example, we have an [options page][options-page] that
allows the user to toggle a "debug mode" (implementation not shown here).  The options page immediately saves the new settings to `storage.sync`, and the service worker uses `storage.onChanged` to apply the setting as soon as possible.

{% Label %}options.html:{% endLabel %}

```html
<!-- type="module" allows you to use top level await -->
<script defer src="options.js" type="module"></script>
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
const optionsForm = document.getElementById("optionsForm");

// Immediately persist options changes
optionsForm.debug.addEventListener("change", (event) => {
  options.debug = event.target.checked;
  chrome.storage.sync.set({ options });
});

// Initialize the form with the user's option settings
const data = await chrome.storage.sync.get("options");
Object.assign(options, data.options);
optionsForm.debug.checked = Boolean(options.debug);
```

{% Label %}background.js:{% endLabel %}

```js
function setDebugMode() { /* ... */ }

// Watch for changes to the user's options & apply them
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.options?.newValue) {
    const debugMode = Boolean(changes.options.newValue.debug);
    console.log('enable debug mode?', debugMode);
    setDebugMode(debugMode);
  }
});
```

### Asynchronous preload from storage {: #asynchronous-preload-from-storage}

Since service workers are not always running, Manifest V3 extensions sometimes need to
asynchronously load data from storage before they execute their event handlers. To do this, the
following snippet uses an async `action.onClicked` event handler that waits for the `storageCache`
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
