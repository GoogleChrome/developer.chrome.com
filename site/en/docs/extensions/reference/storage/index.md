---
api: storage
---

## Overview {: #overview }

The Storage API provides an extension-specific way to persist user data and state. It's similar to the web platform's storage APIs ([IndexedDB][mdn-indexeddb], and [Storage][mdn-storage]), but was designed to meet the storage needs of extensions. The following are a few key features:

- All extension contexts, including the extension service worker and content scripts have access to the Storage API.
- The JSON serializable values are stored as object properties.
- The Storage API is asynchronous with bulk read and write operations.
- Even if the user clears the cache and browsing history, the data persists.
- Stored settings persist even when using [split incognito][incognito].
- Includes an exclusive read-only [managed storage area][manifest-storage] for enterprise policies.

## Manifest {: #manifest}

To use the storage API, declare the `"storage"` permission in the extension
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

## Concepts and usage {: #usage }

{% Details %}
{% DetailsSummary %}
Can extensions use web storage APIs?
{% endDetailsSummary %}

While extensions can use the [`Storage`][mdn-storage] interface (accessible from `window.localStorage`) in some contexts (popup and other HTML pages), we don't recommend it for the following reasons:

- Extension's service worker can't access `Storage`.
- Content scripts share storage with the host page.
- Data saved using the `Storage` interface is lost when the user clears their browsing history.

To move data from web storage APIs to extension storage APIs from a service worker:

1. Create an offscreen document with a conversion routine and an [`onMessage`][on-message] handler.
2. Add a conversion routine to an offscreen document. <!--Is 2 an alternative to 1? If so, I'd like to combine them and present them as options.-->
3. In the extension service worker, check `chrome.storage` for your data.
4. If your data isn't found, [create][create-offscreen] an offscreen document and call [`sendMessage()`][send-message] to start the conversion routine.
5. Inside the offscreen document's `onMessage` handler, call the conversion routine.

There are also some nuances to how web storage APIs work in extensions. Learn more in the
[Storage and Cookies][storage-and-cookies] article.

{% endDetails %}

### Storage areas

The Storage API is divided into the following *storage areas*:

[`storage.local`][prop-local]
: Data is stored locally and cleared when the extension is removed. The storage limit is 10 MB (5&nbsp;MB in Chrome 113 and earlier), but can be increased by requesting the `"unlimitedStorage"` permission. We recommend using `storage.local` using it to store larger amounts of data.
<--I think we removed unlimitedStorage from the permissions list. How does that affect this?-->

[`storage.sync`][prop-sync]
: If syncing is enabled, the data is synced to any Chrome browser that the user is logged into. If disabled, it behaves like `storage.local`. Chrome stores the data locally when the browser is offline and resumes syncing when it's back online. The quota limitation is approximately 100 KB, 8 KB per item. We recommend using `storage.sync` to preserve user settings across synced browsers. If you're working with sensitive user data, instead use `storage.session`.

[`storage.session`][prop-session]
: Holds data in memory for the duration of a browser session. By default, it's not exposed to content scripts, but this behavior can be changed by setting [`chrome.storage.session.setAccessLevel()`][method-access-level]. The storage limit is 10 MB (1&nbsp;MB in Chrome 111 and earlier). We recommend using `storage.session` to store global variables across service worker runs.

[`storage.managed`][prop-managed]
: Administrators can use a [schema][manifest-storage] and enterprise policies to configure a supporting extension's settings in a managed environment. This storage area is read-only.

The following samples demonstrate the `local`, `sync`, and
`session` storage areas:

<web-tabs>
  <web-tab title="storage.local">

  ```js
  chrome.storage.local.set({ key: value }).then(() => {
    console.log("Value is set");
  });

  chrome.storage.local.get(["key"]).then((result) => {
    console.log("Value currently is " + result.key);
  });
  ```

  </web-tab>
  <web-tab title="storage.sync">

  ```js
  chrome.storage.sync.set({ key: value }).then(() => {
    console.log("Value is set");
  });

  chrome.storage.sync.get(["key"]).then((result) => {
    console.log("Value currently is " + result.key);
  });
  ```

  </web-tab>
  <web-tab title="storage.session">

  ```js
  chrome.storage.session.set({ key: value }).then(() => {
    console.log("Value was set");
  });

  chrome.storage.session.get(["key"]).then((result) => {
    console.log("Value currently is " + result.key);
  });
  ```

  </web-tab>
</web-tabs>


To learn more about the `managed` storage area, see [Manifest for storage areas][manifest-storage].


### Storage and throttling limits {: #storage-and-throttling-limits}

Don't think of adding to the Storage API as putting things in a big truck. Think of adding to
storage as being like putting something in a pipe. The pipe may have material in it already, and it
may even be filled. Always assume a delay between when you add to storage and when it is actually
recorded. <!--I'd like to understand the truck metaphor better, and maybe come up with something more accessible. What are we assuming about how a truck on a road behaves differently from fluid in a pipe?-->

For details on storage area limitations and what happens when they are exceeded, see the quota information for [`sync`][prop-sync], [`local`][prop-local], and [`session`][prop-session].

## Use cases {: #use-cases}

The following sections demonstrate common use cases for the Storage API.

### Synchronous response to storage updates

To track changes made to storage, add a listener to its `onChanged` event. When anything changes in storage, that event fires. The sample code listens for these changes:


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

Because service workers don't run all the time, Manifest V3 extensions sometimes need to
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

[create-offscreen]: /docs/extensions/reference/offscreen/#method-createDocument
[doc-manifest]: /docs/extensions/mv3/manifest
[gh-global-context-search]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/17956f44b6f04d28407a4b7eee428611affd4fab/api/contextMenus/global_context_search
[gh-water-alarm]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/17956f44b6f04d28407a4b7eee428611affd4fab/examples/water_alarm_notification
[incognito]: /docs/extensions/mv3/manifest/incognito
[manifest-storage]: /docs/extensions/mv3/manifest/storage
[mdn-indexeddb]: https://developer.mozilla.org/docs/Web/API/Window/indexeddb
[mdn-storage]: https://developer.mozilla.org/docs/Web/API/Storage
[method-access-level]: #method-StorageArea-setAccessLevel
[offscreen-document]: /docs/extensions/reference/offscreen/
[on-message]: /docs/extensions/reference/runtime/#event-onMessage
[options-page]: https://developer.chrome.com/docs/extensions/mv3/options/
[prop-local]: #property-local
[prop-sync]: #property-sync
[prop-session]: #property-session
[prop-managed]: #property-managed
[send-message]: /docs/extensions/reference/runtime/#method-sendMessage
[storage-and-cookies]: /docs/extensions/mv3/storage-and-cookies
