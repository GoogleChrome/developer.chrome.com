---
layout: "layouts/doc-post.njk"
title: "The activeTab permission"
seoTitle: "MV2 - The activeTab permission [Deprecated]"
date: 2012-09-21
updated: 2018-11-01
description: How to use the activeTab permission in your Chrome Extension.
---

{% Aside 'warning' %}
You're viewing the deprecated Manifest V2 version of this article. See [Manifest V3 - The activeTab permission](/docs/extensions/mv3/manifest/activeTab/) for the MV3 equivalent.

The Chrome Web Store no longer accepts Manifest V2 extensions. Follow the [Manifest V3 Migration guide](/docs/extensions/migrating) to convert your extension to Manifest V3.
{% endAside %}

The `activeTab` permission gives an extension temporary access to the currently active tab when the
user _invokes_ the extension - for example by clicking its [browser action][1]. Access to the tab
lasts while the user is on that page, and is revoked when the user navigates away or closes the tab.

This serves as an alternative for many uses of `<all_urls>`, but displays _no warning message_
during installation:

**Note:** From M72 onwards, the `activeTab` permission will be granted until the user navigates to a
different origin. That is, if the user invokes the extension on https://example.com and then
navigates to https://example.com/foo, the extension will continue to have access to the page. If the
user navigates to https://chromium.org, access is revoked.

Without `activeTab`:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/yNt7dAfXO9RlkRjr0rMV.png",
       alt="Without activeTab", height="190", width="490" %}

With `activeTab`:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/rejIX68BPQrssxbh98BH.png",
       alt="With activeTab", height="190", width="490" %}

## Example {: #example }

See the [Page Redder][2] sample extension:

```json
{
  "name": "Page Redder",
  "version": "2.0",
  "permissions": [
    "activeTab"
  ],
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  "browser_action": {
    "default_title": "Make this page red"
  },
  "manifest_version": 2
}
```

```js
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
});
```

## Motivation {: #motivation }

Consider a web clipping extension that has a [browser action][3] and [context menu item][4]. This
extension may only really need to access tabs when its browser action is clicked, or when its
context menu item is executed.

Without `activeTab`, this extension would need to request full, persistent access to every web site,
just so that it could do its work if it happened to be called upon by the user. This is a lot of
power to entrust to such a simple extension. And if the extension is ever compromised, the attacker
gets access to everything the extension had.

In contrast, an extension with the `activeTab` permission only obtains access to a tab in response
to an explicit user gesture. If the extension is compromised the attacker would need to wait for the
user to invoke the extension before obtaining access. And that access only lasts until the tab is
navigated or is closed.

## What activeTab allows {: #what-activeTab-allows }

While the `activeTab` permission is enabled for a tab, an extension can:

- Call [`tabs.executeScript`][5] or [`tabs.insertCSS`][6] on that tab.
- Get the URL, title, and favicon for that tab via an API that returns a [`tabs.Tab`][7] object
  (essentially, `activeTab` grants the [`tabs`][8] permission temporarily).
- Intercept network requests in the tab to the tab's main frame origin using the [webRequest][9]
  API. The extension temporarily gets host permissions for the tab's main frame origin.

## Invoking activeTab {: #invoking-activeTab }

The following user gestures enable `activeTab`:

- Executing a [browser action][10]
- Executing a [page action][11]
- Executing a [context menu item][12]
- Executing a keyboard shortcut from the [commands API][13]
- Accepting a suggestion from the [omnibox API][14]

[1]: /docs/extensions/reference/browserAction
[2]: /docs/extensions/mv2/samples#page-redder
[3]: /docs/extensions/reference/browserAction
[4]: /docs/extensions/reference/contextMenus
[5]: /docs/extensions/reference/tabs#method-executeScript
[6]: /docs/extensions/reference/tabs#method-insertCSS
[7]: /docs/extensions/reference/tabs#type-Tab
[8]: /docs/extensions/reference/tabs#manifest
[9]: /docs/extensions/reference/webRequest
[10]: /docs/extensions/reference/browserAction
[11]: /docs/extensions/reference/pageAction
[12]: /docs/extensions/reference/contextMenus
[13]: /docs/extensions/reference/commands
[14]: /docs/extensions/reference/omnibox
