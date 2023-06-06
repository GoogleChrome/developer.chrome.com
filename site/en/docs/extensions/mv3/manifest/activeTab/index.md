---
layout: "layouts/doc-post.njk"
title: "The activeTab permission"
seoTitle: "Chrome Extensions: The activeTab permission"
date: 2012-09-21
updated: 2021-09-20
description: How to use the activeTab permission in your Chrome Extension.
---

The `"activeTab"` permission gives an extension temporary access to the currently active tab when the
user _invokes_ the extension - for example by clicking its [action][api-action]. Access to the tab
lasts while the user is on that page, and is revoked when the user navigates away or closes the tab.

This serves as an alternative for many uses of `"<all_urls>"`, but displays _no warning message_
during installation:

{% Aside %}
From M72 onwards, the `"activeTab"` permission will be granted until the user navigates to a
different origin. That is, if the user invokes the extension on https://example.com and then
navigates to https://example.com/foo, the extension will continue to have access to the page. If the
user navigates to https://chromium.org, access is revoked.
{% endAside %}

Without `"activeTab"`:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/yNt7dAfXO9RlkRjr0rMV.png",
       alt="Without activeTab", height="190", width="490" %}

With `"activeTab"`:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/rejIX68BPQrssxbh98BH.png",
       alt="With activeTab", height="190", width="490" %}

## Example {: #example }

See the [Page Redder][gh-page-redder] sample extension:

{% Label %}manifest.json:{% endLabel %}

```json
{
  "name": "Page Redder",
  "version": "2.0",
  "permissions": [
    "activeTab",
    "scripting"
  ],
  "background": {
    "service_worker": "service-worker.js"
  },
  "action": {
    "default_title": "Make this page red"
  },
  "manifest_version": 3
}
```

{% Label %}service-worker:{% endLabel %}

```js
function reddenPage() {
  document.body.style.backgroundColor = 'red';
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes('chrome://')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: reddenPage
    });
  }
});
```

## Motivation {: #motivation }

Consider a web clipping extension that has an [action][api-action] and a [context menu item][api-context-menu]. This
extension may only really need to access tabs when its action is clicked, or when its
context menu item is executed.

Without `"activeTab"`, this extension would need to request full, persistent access to every website,
just so that it could do its work if it happened to be called upon by the user. This is a lot of
power to entrust to such a simple extension. And if the extension is ever compromised, the attacker
gets access to everything the extension had.

In contrast, an extension with the `"activeTab"` permission only obtains access to a tab in response
to an explicit user gesture. If the extension is compromised the attacker would need to wait for the
user to invoke the extension before obtaining access. And that access only lasts until the tab is
navigated or is closed.

## What "activeTab" allows {: #what-activeTab-allows }

While the `activeTab` permission is enabled for a tab, an extension can:

- Call [`scripting.insertCSS`][insert-css-method] or [`scripting.executeScript`][execute-script-method] on that tab.
- Get the URL, title, and favicon for that tab via an API that returns a [`tabs.Tab`][tabs-tab] object
  (essentially, `"activeTab"` grants [host permission][match-pattern] temporarily).
- Intercept network requests in the tab to the tab's main frame origin using the [webRequest][api-webrequest]
  API. The extension temporarily gets host permissions for the tab's main frame origin.

## Invoking activeTab {: #invoking-activeTab }

The following user gestures enable `activeTab`:

- Executing an [action][api-action]
- Executing a [context menu item][api-context-menu]
- Executing a keyboard shortcut from the [commands API][api-commands]
- Accepting a suggestion from the [omnibox API][api-omnibox]

[api-action]: /docs/extensions/reference/action
[api-commands]: /docs/extensions/reference/commands
[api-context-menu]: /docs/extensions/reference/contextMenus
[api-omnibox]: /docs/extensions/reference/omnibox
[api-webrequest]: /docs/extensions/reference/webRequest
[execute-script-method]: /docs/extensions/reference/scripting#method-executeScript
[gh-page-redder]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.page-redder
[insert-css-method]: /docs/extensions/reference/scripting#method-insertCSS
[match-pattern]: /docs/extensions/mv3/match_patterns/
[tabs-tab]: /docs/extensions/reference/tabs#type-Tab
