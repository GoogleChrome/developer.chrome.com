---
api: tabs
---

## Overview

The Tabs API not only offers features for manipulating and managing tabs, but can also detect the
[language][tabs-detect-language] of the tab, take a [screenshot][tabs-capture], and
[communicate][tabs-message] with a tab's content scripts. 

{% Aside %}

The Tabs API can be used in the service worker and extension pages, but not in content scripts.

{% endAside %}

## Manifest {: #manifest }

Most functions don't require any permission, like, for example: [creating][tabs-create] a new tab,
[reloading][tabs-reload] a tab, [navigating][tabs-update] to another URL, etc.

### Permissions {: #perms }

One of the following permissions is required to access sensitive [`tabs.Tab`][tab] properties, like
the `url`, `pendingUrl`, `title`, and `favIconUrl` or to capture a screenshot:

[Host permissions][doc-match]

: <div class="stack">

  Host permissions grant access to sensitive Tab properties on matching tabs. They also allow an
  extension to perform more intrusive actions that require user consent such as [injecting content
  scripts](#method-executeScript), [inserting](#method-insertCSS)/[removing](#method-removeCSS) CSS,
  and [capturing screenshots](#method-captureVisibleTab) on matching pages.

  {% Aside %}

  A better alternative for capturing the visible tab or current tab data, is the [`"activeTab"`][doc-activetab]
  permission, which doesn't trigger any warnings.

  {% endAside %}

  </div>

Tabs permission

: The `"tabs"` permission allows access to sensitive Tab properties.

The following are examples of how to declare each permission in the [manifest][doc-manifest]:

<web-tabs>
  <web-tab title="Host Permissions (Manifest)">

  ```json
  {
    "name": "My extension",
    ...
    "host_permissions": [
      "http://*/*",
      "https://*/*"
    ],
    ...
  }
  ```
  </web-tab>
    <web-tab title="Tabs permission (Manifest)">
   
  ```json
  {
    "name": "My extension",
    ...
    "permissions": [
      "tabs"
    ],
    ...
  }
  ```

  </web-tab>
</web-tabs>


## Use cases {: #examples }

The following sections demonstrate some common use cases.

### Opening an extension page in a new tab

A common pattern for extensions is to open an onboarding page in a new tab when the extension is
installed. The following example shows how to do this.

{% Label %}background.js:{% endLabel %}

```js
chrome.runtime.onInstalled.addListener((reason) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: 'onboarding.html'
    });
  }
});
```

{% Aside 'success' %}

This example doesn't require any [permissions][section-manifest].

{% endAside %}

### Get the current tab

This example demonstrates how an extension's service worker can retrieve the active tab from the
currently-focused window (or most recently-focused window, if no Chrome windows are focused). This
can usually be thought of as the user's current tab.

<web-tabs>
  <web-tab title="Manifest V3 (promise)">

  ```js
  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
  ```

  </web-tab>
  <web-tab title="Manifest V2 (callback)">

  ```js
  function getCurrentTab(callback) {
    let queryOptions = { active: true, lastFocusedWindow: true };
    chrome.tabs.query(queryOptions, ([tab]) => {
      if (chrome.runtime.lastError) 
      console.error(chrome.runtime.lastError);
      // `tab` will either be a `tabs.Tab` instance or `undefined`.
      callback(tab);
    });
  }
  ```

  </web-tab>
</web-tabs>


### Mute the specified tab

This example shows how an extension can toggle the muted state for a given tab.

<web-tabs>
  <web-tab  title="Manifest V3 (promise)">

  ```js
  async function toggleMuteState(tabId) {
    const tab = await chrome.tabs.get(tabId);
    const muted = !tab.mutedInfo.muted;
    await chrome.tabs.update(tabId, {muted});
    console.log(`Tab ${tab.id} is ${muted ? 'muted' : 'unmuted'}`);
  }
  ```

</web-tab>
<web-tab  title="Manifest V2 (callback)">

  ```js
  function toggleMuteState(tabId) {
    chrome.tabs.get(tabId, (tab) => {
      let muted = !tab.mutedInfo.muted;
      chrome.tabs.update(tabId, {muted}, () => {
        console.log(`Tab ${tab.id} is ${muted ? 'muted' : 'unmuted'}`);
      });
    });
  }
  ```

  </web-tab>
</web-tabs>

### Move the current tab to the first position when clicked

This example shows how to move a tab while a drag may or may not be in progress. While this example
uses `chrome.tabs.move`, you can use the same waiting pattern for other calls that modify tabs while
a drag may be in progress.

<web-tabs>
  <web-tab  title="Manifest V3 (promise)">

  ```js
  chrome.tabs.onActivated.addListener(moveToFirstPosition);

  async function moveToFirstPosition(activeInfo) {
    try {
      await chrome.tabs.move(activeInfo.tabId, {index: 0});
      console.log('Success.');
    } catch (error) {
      if (error == 'Error: Tabs cannot be edited right now (user may be dragging a tab).') {
        setTimeout(() => moveToFirstPosition(activeInfo), 50);
      } else {
        console.error(error);
      }
    }
  }
  ```

{% Aside 'success' %}

The use of catch(error) in a Promise context is a way to ensure that an error that otherwise
populates chrome.runtime.lastError is not unchecked. 

{% endAside %}
  </web-tab>
  <web-tab title="Manifest V2 (callback)">

```js
chrome.tabs.onActivated.addListener(moveToFirstPositionMV2);

function moveToFirstPositionMV2(activeInfo) {
  chrome.tabs.move(activeInfo.tabId, { index: 0 }, () => {
    if (chrome.runtime.lastError) {
      const error = chrome.runtime.lastError;
      if (error == 'Error: Tabs cannot be edited right now (user may be dragging a tab).') {
        setTimeout(() => moveToFirstPositionMV2(activeInfo), 50);
      } else {
        console.error(error);
      }
    } else {
      console.log('Success.');
    }
  });
}
```
  </web-tab>
</web-tabs>

## Extension examples {: #more-samples}

For more Tabs API extensions demos, explore any of the following:

- [Manifest V2 - Tabs API extensions][mv2-tabs-samples].
- [Manifest V3 - Tabs Manager][mv3-tabs-manager].

[doc-activetab]:/docs/extensions/mv3/manifest/activeTab/ 
[doc-manifest]: /docs/extensions/mv3/manifest/
[doc-match]: /docs/extensions/mv3/match_patterns/
[doc-perms]: /docs/extensions/mv3/permission_warnings/
[doc-promises]: /docs/extensions/mv3/promises/
[mv2-tabs-samples]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/mv2-archive/api/tabs/
[mv3-tabs-manager]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/tabs-manager
[samples-repo]: https://github.com/GoogleChrome/chrome-extensions-samples
[section-manifest]: #manifest
[tab]: #type-Tab
[tabs-capture]: #method-captureVisibleTab
[tabs-create]: #method-create
[tabs-detect-language]: #method-detectLanguage
[tabs-message]: #method-sendMessage
[tabs-reload]: #method-reload
[tabs-update]: #method-update
