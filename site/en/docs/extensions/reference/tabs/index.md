---
api: tabs
extra_permissions_html:
  The majority of the <code>chrome.tabs</code> API can be used without declaring any permission. However, the <code>"tabs"</code> permission is required in order to populate the <code>url</code>, <code>pendingUrl</code>, <code>title</code>, and <code>favIconUrl</code> properties of <code><a href="#type-Tab">Tab</a></code>.
---

## Manifest

### No permission

You can use most Tabs API methods and events without declaring any permissions. The following are a some common examples:

- Opening a new tab using `tabs.create()`.
- Moving a tab using `tabs.move()`.
- Reloading the tab using `tabs.reload()`.

### Tabs, host permissions or... both?

If you need access to any of the following properties of [`tabs.Tab`][tab]: `url`, `pendingUrl`,
`title`, or `favIconUrl`, you have to request permission in the extension's
[manifest][doc-manifest] file. The following are a couple of examples:

- Querying tabs by specific URLs.
- Muting tabs that contain a keyword in the title.

Use the following table to determine which permission you need:

| Permission           | Tab data access                                                                 |
|----------------------|---------------------------------------------------------------------------------|
| **Host permissions** | Access to the tabs matching the URL [match patterns][doc-match].                |
| **Tabs**             | Access to the data of all tabs.                                                 |
| **Both**             | Access to host permissions to specific URLs, and the data of all the open tabs. |

The following are code samples fo each case, along with the correspondent [permission warning][doc-perms].

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

#### Permission warning

Read and change all your data on the websites you visit

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

#### Permission warning

Read your browsing history

  </web-tab>
  <web-tab title="Both (code)">

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "tabs"
  ],
  "host_permissions": [
    "https://www.google.com/"
  ],
  ...
}
```

#### Permission warnings

- Read your browsing history
- Read and change your data on www.google.com


  </web-tab>
</web-tabs>


## Examples

The following sections demonstrate several common use cases for the chrome.tabs API.

### Opening an extension page in a new tab

A common pattern for extensions is to open an onboarding page in a new tab when the extension is
installed. The following example shows how to do this.

{% Aside %}

Content scripts cannot use `chrome.tabs.create()`.

{% endAside %}

```js
//// background.js

chrome.runtime.onInstalled.addListener((reason) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: 'onboarding.html'
    });
  }
});
```

### Get the current tab

This example demonstrates how the background script can retrieve the active tab from the
currently-focused window (or most recently-focused window, if no Chrome windows are focused). This
can usually be thought of as the user's current tab.

{% Aside %}

This example requires Manifest V3 due to the use of [Promises][doc-promises]. Additionally, content
scripts cannot use `tabs.query`.

{% endAside %}

```js
//// background.js

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
```

### Mute the specified tab

This example shows how an extension can toggle the muted state for a given tab.

{% Aside %}

Requires Manifest V3 due to the use of Promises. Content scripts cannot use `tabs.get` or
`tabs.update`.

{% endAside %}

```js
//// background.js

function toggleMuteState(tabId) {
  chrome.tabs.get(tabId, async (tab) => {
    let muted = !tab.mutedInfo.muted;
    await chrome.tabs.update(tabId, { muted });
    console.log(`Tab ${tab.id} is ${ muted ? 'muted' : 'unmuted' }`);
  });
}
```

### Move the current tab to the first position when clicked

This example shows how to move a tab while a drag may or may not be in progress.

{% Aside %}

Manifest V3 required due to the use of Promises and chrome.tabs.onActivated(), replacing
chrome.tabs.onSelectionChanged(). The use of catch(error) in a Promise context is a way to ensure
that an error that otherwise populates chrome.runtime.lastError is not unchecked. chrome.tabs.move
is used in this example, but the same waiting pattern can be used for other calls that modify tabs
while a drag may be in progress.

{% endAside %}

```js
//// background.js

chrome.tabs.onActivated.addListener(activeInfo => move(activeInfo));

async function move(activeInfo) {
  try {
    await chrome.tabs.move(activeInfo.tabId, {index: 0});
    console.log('Success.');
  } catch (error) {
    if (error == 'Error: Tabs cannot be edited right now (user may be dragging a tab).') {
      setTimeout(() => move(activeInfo), 50);
    }
  }
}
```

### More samples

For more examples that demonstrate the Tabs API, see the [mv2-archive/api/tabs][mv2-tabs-samples]
directory of the [chrome-extensions-samples][samples-repo] repository.

[doc-manifest]: /docs/extensions/mv3/manifest/
[doc-perms]: /docs/extensions/mv3/permission_warnings/
[doc-promises]: /docs/extensions/mv3/promises/
[mv2-tabs-samples]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/mv2-archive/api/tabs/
[samples-repo]: https://github.com/GoogleChrome/chrome-extensions-samples
[tab]: #type-Tab
