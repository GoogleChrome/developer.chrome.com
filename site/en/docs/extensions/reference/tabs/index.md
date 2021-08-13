---
api: tabs
extra_permissions_html:
  The majority of the <code>chrome.tabs</code> API can be used without declaring any permission. However, the <code>"tabs"</code> permission is required in order to populate the <code>url</code>, <code>pendingUrl</code>, <code>title</code>, and <code>favIconUrl</code> properties of <code><a href="#type-Tab">Tab</a></code>.
---

## Manifest

You can use most `chrome.tabs` methods and events without declaring any permissions in the
extension's [manifest][manifest] file. However, if you require access to the `url`, `pendingUrl`,
`title`, or `favIconUrl` properties of [`tabs.Tab`][tab], you must declare the `"tabs"` permission
in the manifest, as shown below:

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

This example demonstrates how the background script can retrieve the currently focused tab.

{% Aside %}

This example requires Manifest due to the use of [Promises][promises]. Additionally, content scripts
cannot use `tabs.query`.

{% endAside %}

```js
//// background.js

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
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

[manifest]: /docs/extensions/mv3/manifest/
[promises]: /docs/extensions/mv3/promises/
[tab]: #type-Tab
[mv2-tabs-samples]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/mv2-archive/api/tabs/
[samples-repo]: https://github.com/GoogleChrome/chrome-extensions-samples
