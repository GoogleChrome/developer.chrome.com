---
layout: "layouts/doc-post.njk"
title: "Inline-installation deprecation migration FAQ"
date: 2018-06-12
updated: 2018-08-23
description: Frequently asked questions about the deprecation of inline installations for Chrome Extensions.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

As of 06/12/2018, inline installation is deprecated. For more information, read our [Chromium Blog
post][1].

## Timeline questions {: #timeline_questions }

### What will change on 2018-06-12? {: #change_jun12 }

Any Chrome Web Store item, such as extensions and apps, first published on or after 2018-06-12 will
have inline-installation disabled. "Disabled" means that inline installation attempts will be
automatically redirected to the item's details page on the Chrome Web Store where the user can
complete the installation. Nothing will change for existing items in the store that were first
published before this date.

### What will change on 2018-09-12? {: #change_sep12 }

The disabling will apply to ALL items regardless of publish date. 100% of inline installation
attempts for all items will be redirected to the Chrome Web Store where users can complete the
install.

### What do I need to do before 2018-09-12? {: #what_do_sept12 }

You don't need to change anything, but we suggest you review your installation flow and replace the
`chrome.webstore.install()` call with a navigation directly to your item's Chrome Web Store listing.
Doing that now lets you verify it produces the best user experience.

We also recommend that you incorporate the new Chrome Web Store [download badge][2] into your
install flow on your site.

### What will change in M71 (Dec 2018)? {: #change_dec18 }

Beginning in M71, Chrome will no longer support the `chrome.webstore.install()` method and calling
it will fail, resulting in a broken installation flow on your site. At this point calls to the API
will throw a JavaScript TypeError. You should remove any calls to the API method before this date.

## After inline-installation is disabled {: #after_disabled }

### What will the installation flow look like? {: #future_flow }

When your site calls `chrome.webstore.install()`, Chrome will no longer trigger a dialog immediately
but will instead open a new foreground tab to the details page of the Chrome WebStore (i.e.
https://chrome.google.com/webstore/detail/<item-id>). From there, the user can go through the
standard installation process by clicking "install", and a dialog will prompt the user to read
permissions and install or cancel. After the dialog is dismissed, the tab will remain on the Chrome
Web Store.

### How can I tell if my installation was successful? {: #if_successful }

When you call `chrome.webstore.install()`, the failureCallback will be triggered with an error
saying that the user was redirected to the Chrome Web Store. It will not indicate whether the
installation was successful or not. Remember that beginning in Chrome 71, calls to
`chrome.webstore.install()` will fail so the failureCallback will never be executed.

Without this API, your site can still detect if your item is already installed by communicating
between the extension and your web site. This can be done through extension messaging and the
[externally_connectable][3] property in the manifest.

```json
"externally_connectable": {
  "matches": ["https://www.example.com/*"]
}
```

```js
// JS running on https://example.com
try {
  chrome.runtime.sendMessage('<extension id>', <message>, function() {
    if (chrome.runtime.lastError) {
      // Extension is not installed.
    }
  });
} catch (e) {
  // Extension is not installed.
}
```

### How do I trigger an informational page after installation? {: #trigger }

Use the [chrome.runtime][4] event and open a new tab after installation. Here's an example to use in
your background page:

```js
chrome.runtime.onInstalled.addListener(function listener(details) {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({url: "https://www.example.com/"});
    chrome.runtime.onInstalled.removeListener(listener);
  }
});
```

### Can I get an exception? {: #exception }

No. This policy change applies to all items in the Chrome Web Store without exception.

[1]: https://blog.chromium.org/2018/06/improving-extension-transparency-for.html
[2]: /webstore/branding#badge
[3]: /docs/extensions/mv2/messaging#external-webpage
[4]: /docs/extensions/runtime#event-onInstalled
