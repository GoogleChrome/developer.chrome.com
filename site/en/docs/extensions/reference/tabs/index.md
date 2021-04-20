---
api: tabs
extra_permissions_html:
  The majority of the <code>chrome.tabs</code> API can be used without declaring any permission. However, the <code>"tabs"</code> permission is required in order to populate the <code>url</code>, <code>pendingUrl</code>, <code>title</code>, and <code>favIconUrl</code> properties of <code><a href="#type-Tab">Tab</a></code>.
---

## Manifest

You can use most `chrome.tabs` methods and events without declaring any permissions in the
extension's [manifest][1] file. However, if you require access to the [`url`][2], [`pendingUrl`][3],
[`title`][4], or [`favIconUrl`][5] properties of [`tabs.Tab`][6], you must declare the `"tabs"`
permission in the manifest, as shown below:

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

A common pattern for extensions is to open an onboarding page in a new tab when the extension is installed. The following example shows how to do this.

{% Aside %} Cannot use `chrome.tabs.create()` in content scripts. {% endAside %}.

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

{% Aside %} Requires Manifest V3 due to the use of Promises. Cannot use `tabs.query` in content
scripts. {% endAside %}

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

{% Aside %} Requires Manifest V3 due to the use of Promises. Cannot use `tabs.get` or `tabs.update`
in content scripts. {% endAside %}

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

### More samples

For more examples that demonstrate the Tabs API, see the [mv2-archive/api/tabs][7] directory of the
[chrome-extensions-samples][samples-repo] repository. For other examples and for help in viewing the
source code, see [Samples][8].

[1]: /docs/extensions/mv2/tabs
[2]: #property-Tab-url
[3]: #property-Tab-pendingUrl
[4]: #property-Tab-title
[5]: #property-Tab-favIconUrl
[6]: #type-Tab
[7]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/mv2-archive/api/tabs/
[8]: /docs/extensions/mv2/samples

[samples-repo]: https://github.com/GoogleChrome/chrome-extensions-samples
