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

A common pattern for extensions is to open an onboarding page in a new tab when the extension is installed. The following example shows how to do this. {% Aside %} Note that this code must be called from a background context, because tabs cannot use `chrome.tabs.create()`{% end Aside %}.

```js
chrome.runtime.onInstalled.addListener((reason) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: 'onboarding.html'
    });
  }
});
```

### Get the current tab

This example demonstrates how the background script can retrieve the currently focused tab. {% Aside %} Requires Manifest V3. Cannot be used in a content script. {% end Aside %}

{# Editor's note: what happened about converting this example to a promise with a note? #}

```js
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
```

### Request background script to navigate current tab

This example shows how a content script could ask the background script to navigate the current tab.
{# Editor's note: I'd like to frame this as a use case; is there an obvious one? #}

```js
// Content script
function requestNavigation(url) {
  chrome.runtime.sendMessage({ action: 'navigate', url });
}
```

```js
// Background script
chrome.runtime.onMessage.addListener(messageListener);

function messageListener(request, sender, _sendResponse) {
  if (request.action === 'navigate') {
    // Sanitize URL in to guard against compromised content scripts
    let url = new URL(request.url);
    chrome.tabs.update(sender.tab.id, { url: url.toString() });
  }
}
```

### More samples

![Two tabs in a window](tabs.png)

More samples simple examples of manipulating tabs with the Tabs API can be found in the
[mv2-archive/api/tabs][7] directory of the [chrome-extensions-samples][samples-repo] repository. For
other examples and for help in viewing the source code, see [Samples][8].

[1]: /docs/extensions/mv2/tabs
[2]: #property-Tab-url
[3]: #property-Tab-pendingUrl
[4]: #property-Tab-title
[5]: #property-Tab-favIconUrl
[6]: #type-Tab
[7]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/mv2-archive/api/tabs/
[8]: /docs/extensions/mv2/samples

[samples-repo]: https://github.com/GoogleChrome/chrome-extensions-samples
