---
layout: "layouts/doc-post.njk"
title: "Reach peak performance"
date: 2018-04-16
updated: 2020-05-07
description: Guidelines on how to build a high-performance Chrome Extension.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

Extensions are an addition to the browser, designed to provide supplementary and customized
functionality. An extension that slows down or impairs the browsing experience is problematic to the
user and counter to the Chrome extension objective. In addition to general good coding habits,
developers should follow these practices to ensure their extensions are running at peak performance.

## Defer everything Possible {: #defer_everything }

Refrain from loading resources until they are needed. Include only what is needed to open an
extension in its startup function. Do not load things during startup that are only needed if the
user clicks a button, or features that work only when the user is logged in before they have a
chance to do so.

## Manage important events {: #background_pages }

An efficient [background script][1] contains registered events that are important to their
extension. They lie dormant until a listener is triggered, act accordingly, then return to a dormant
state. It is a drain on system resources to keep an unneeded script running.

Background scripts should be registered in the manifest with their persistence set to false if
possible.

```json
{
  "name": "High Performance Extension",
  "description" : "Sleepy Background Script",
  "version": "1.0",
  ...
  "background": {
   "scripts": ["background.js"],
   "persistent": false
  },
  ...
}
```

The only occasion to keep a background script persistently active is if the extension uses
[`chrome.webRequest` API][2] to block or modify network requests. The webRequest API is incompatible
with non-persistent background pages.

```json
{
  "name": "High Performance Extension",
  "description" : "Persistent Background Script",
  "version": "1.0",
  ...
  "background": {
    "scripts": ["background.js"],
    "persistent": true
  },
  "permissions": [
    "webRequest",
    "webRequestBlocking",
    "https://<distracting social media site>.com/*"
  ],
 ...
}
```

```js
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    return {redirectUrl: "/"};
  },
  {urls: ["https://social.media.distraction.com/*"]},
  ["blocking"]
);
```

## Contain content scripts {: #content_script }

[Content scripts][3] should work as the secret agents of an extension, subtly reading from or
modifying the webpage while relying on the extension core to work heavier logic. They should have
clear targets to avoid invasive activity on irrelevant pages. Ideally, content scripts should go
unnoticed in the browsing experience aside from purposeful behavior.

### Declare targets {: #declare_targets }

An extension running content scripts in unnecessary locations or at inappropriate times can cause
the browser to slow down and potentially create functionality errors. Avoid this by providing [match
patterns][4] in the manifest and running the script at `document_idle` instead of `document_start`.

```json
{
  "name": "High Performance Extension",
  "description" : "Superfly Superlight Content Scripts",
  "version": "1.0",
  ...
  "content_scripts": [
    {
      "js": ["content_script.js"],
      "matches": ["/*"],
      "run_at": "document_idle"
    }
  ]
  ...
}
```

If an extension will only need to access a webpage with the user's action, have it [injected
programmatically][5]. A programmatic injection will only run when a user invokes it.

```js
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: 'document.body.style.fontSize="100px"'
  });
});
```

### Use content scripts only when required {: #no_content_scripts }

Many extensions may not need a content script at all to accomplish desired functionality. Using the
[`declarativeContent` API][6] will set rules for the extension to recognize when relevant conditions
are met. This is more efficient than a content script and uses less code!

If an extension needed to display a page action to the user when they visited a site with an HTML5
`<video>` element, it could specify a declarative rule.

```js
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            css: ["video"],
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});
```

## Evaluate code efficiency {: #code }

The same general practices for website performance can be applied to extensions such as implement
techniques of asynchronous programming and keeping code minimal and compact.

Use tools, such as [Lighthouse][7], to evaluate an extensions performance and target areas that
could improve on visual extension pages.

[1]: /background_pages
[2]: /webRequest
[3]: /content_scripts
[4]: /match_patterns
[5]: /content_scripts#pi
[6]: /declarativeContent
[7]: https://developers.google.com/web/tools/lighthouse
