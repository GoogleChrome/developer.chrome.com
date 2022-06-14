---
api: tabs
extra_permissions_html:
  The majority of the Tabs API can be used without declaring any permission. However, the <code>"tabs"</code> permission is required in order to populate the <code>url</code>, <code>pendingUrl</code>, <code>title</code>, and <code>favIconUrl</code> properties of <code><a href="#type-Tab">Tab</a></code>.
---

## Overview

## Manifest {: #manifest }

### No permission required {: #no-perm }

You can use most Tabs API methods and events without declaring any permissions. The following are some examples:

- Opening a new tab with `tabs.create()`.
- Moving a tab with `tabs.move()`.
- Reloading the tab with `tabs.reload()`.

### Tabs permission or host permissions {: #perms }

If your extension needs access to any of the following properties of [`tabs.Tab`][tab]: `url`, `pendingUrl`,
`title`, or `favIconUrl`, use the following table to determine which
permission to request:

| Permission           | Use case                                                       |
|----------------------|----------------------------------------------------------------|
| **Host permissions** | If you only need access to the tabs of the match pattern URLs. |
| **Tabs**             | If you need access to the data of all tabs.                                 |

The following code shows how to declare each permission in the extension's [manifest][doc-manifest].

<web-tabs>
  <web-tab title="Host Permissions (code)">

  ```json
  {
    "name": "My extension",
    ...
    "host_permissions": [
      "*://*/*"
    ],
    ...
  }
  ```
  </web-tab>
    <web-tab title="Tabs permission (code)">
   
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

{% Aside 'caution' %}

The `cookies` permission triggers a [permission warning][doc-perms].

{% endAside %}

## Use cases {: #examples }

The following sections demonstrate several common use cases for the Tabs API.

### Opening an extension page in a new tab

A common pattern for extensions is to open an onboarding page in a new tab when the extension is
installed. The following example shows how to do this.

```js
// background.js

chrome.runtime.onInstalled.addListener((reason) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: 'onboarding.html'
    });
  }
});
```

{% Aside 'success' %}

For this example, you do not need to request any [permissions][section-manifest].

{% endAside %}

### Get the current tab

This example demonstrates how the background script can retrieve the active tab from the
currently-focused window (or most recently-focused window, if no Chrome windows are focused). This
can usually be thought of as the user's current tab.

<web-tabs>
  <web-tab title="Manifest V3 (promise)">

  ```js
  // background.js

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
  // background.js

  function getCurrentTab(callback) {
    let queryOptions = { active: true, lastFocusedWindow: true };
    chrome.tabs.query(queryOptions, ([tab]) => {
      if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
      // `tab` will either be a `tabs.Tab` instance or `undefined`.
      callback(tab);
    });
  }
  ```

  </web-tab>
</web-tabs>


{% Aside 'gotchas' %}

The activeTab permission is **not** required to query for the active tab. Read more about the [Tabs API
and permissions][section-manifest].

{% endAside %}


### Mute the specified tab

This example shows how an extension can toggle the muted state for a given tab.

<web-tabs>
  <web-tab  title="Manifest V3 (promise)">
  
  ```js
  // background.js

  function toggleMuteState(tabId) {
    chrome.tabs.get(tabId, async (tab) => {
      let muted = !tab.mutedInfo.muted;
      await chrome.tabs.update(tabId, { muted });
      console.log(`Tab ${tab.id} is ${ muted ? 'muted' : 'unmuted' }`);
    });
  }
  ```

</web-tab>
<web-tab  title="Manifest V2 (callback)">

  ```js
  // background.js
  function toggleMuteState(tabId) {
    chrome.tabs.get(tabId, (tab) => {
      let muted = !tab.mutedInfo.muted;
      chrome.tabs.update(tabId, { muted }, () => {
        console.log(`Tab ${tab.id} is ${muted ? 'muted' : 'unmuted'}`);
      });
    });
  }
  ```

  </web-tab>
</web-tabs>

### Move the current tab to the first position when clicked

This example shows how to move a tab while a drag may or may not be in progress.

<web-tabs>
  <web-tab  title="Manifest V3 (promise)">

```js
// background.js

chrome.tabs.onActivated.addListener(activeInfo => moveToFirstPosition(activeInfo));

async function moveToFirstPosition(activeInfo) {
  try {
    await chrome.tabs.move(activeInfo.tabId, {index: 0});
    console.log('Success.');
  } catch (error) {
    if (error == 'Error: Tabs cannot be edited right now (user may be dragging a tab).') {
      setTimeout(() => moveToFirstPosition(activeInfo), 50);
    }
  }
}
```

{% Aside 'success' %}

The use of catch(error) in a Promise context is
a way to ensure that an error that otherwise populates chrome.runtime.lastError is not unchecked. 

{% endAside %}



```js
// background.js

chrome.tabs.onActivated.addListener((activeInfo) =>
  moveToFirstPositionMV2(activeInfo)
);

function moveToFirstPositionMV2(activeInfo) {
  chrome.tabs.move(activeInfo.tabId, { index: 0 }, () => {
    if (chrome.runtime.lastError) {
      const error = chrome.runtime.lastError;
      if (
        error ==
        'Error: Tabs cannot be edited right now (user may be dragging a tab).'
      ) {
        setTimeout(() => moveToFirstPositionMV3(activeInfo), 50);
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



While this example uses `chrome.tabs.move`, you can use the same waiting pattern for other calls that modify tabs
while a drag may be in progress.

### Extension examples {: #more-samples}

For more examples that demonstrate the Tabs API, see the [mv2-archive/api/tabs][mv2-tabs-samples]
directory of the [chrome-extensions-samples][samples-repo] repository.

[doc-manifest]: /docs/extensions/mv3/manifest/
[doc-match]: /docs/extensions/mv3/match_patterns/
[doc-perms]: /docs/extensions/mv3/permission_warnings/
[doc-promises]: /docs/extensions/mv3/promises/
[mv2-tabs-samples]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/mv2-archive/api/tabs/
[samples-repo]: https://github.com/GoogleChrome/chrome-extensions-samples
[tab]: #type-Tab
[section-manifest]: #manifest
