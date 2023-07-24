---
layout: 'layouts/blog-post.njk'
title: What's new in Chrome 116 for Extensions
description: >
  A summary of important changes in Chrome 116 for Chrome Extension developers.

subhead: >
  Chrome 116 is now available in beta and includes many exciting updates for Chrome Extension developers. Let’s take a quick look at what’s new.

# Required
date: 2023-07-20

hero: 'image/6hHqS5auVgWhN0cQNQztaJx5w4M2/zADAEYZOjtxhAet6UmP4.jpg'

alt: 'Chrome 116 Beta'

authors:
  - sebastianbenz

tags:
  - extensions-news
---
<style>
video {
  max-width: 400px;
}
</style>

<figure>
{% Video src="video/6hHqS5auVgWhN0cQNQztaJx5w4M2/WlKT7eIIzRIrrMZKiJed.mp4", width="400", height="400", class="screenshot", preload=true, loop=true, playsinline=true, autoplay=true %}
</figure>

## Programmatically open a Sidepanel {: #sidepanel-open }

Sidepanel has been one of the most requested features in Chrome extensions and has been available in Chrome since version 114. After launching the Side Panel API, one of the first pieces of feedback that we’ve received was that developers wanted a way to programmatically open a side panel. And here it is: [`chrome.sidePanel.open`][chrome-sidepanel-open] is now in beta. You can use it to open the extension side panel programmatically in response to a user interaction, such as a context menu click:

```js
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openSidePanel') {
    // This will open the panel in all the pages on the current window.
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});
```

## WebSocket support in Service Workers {: #sw-websockets }

WebSocket support is critical for many extensions planning to move to Manifest V3. Chrome 116 further improves WebSocket support in service workers as all WebSocket activity will reset the [30s service worker idle timer][sw-lifecycle]. This means that as long as your WebSocket is active, the service worker will stay alive. 

You can use this to implement a keepalive mechanism ensuring your service worker stays active while you’re waiting for messages from your server - even if it takes more than 30s until the next message arrives:

```js
function keepAlive() {
  const keepAliveIntervalId = setInterval(
    () => {
      if (webSocket) {
        webSocket.send('keepalive');
      } else {
        clearInterval(keepAliveIntervalId);
      }
    },
    // It's important to pick an interval that's shorter than 30s, to
    // avoid that the service worker becomes inactive.
    20 * 1000
  );
}
```

Check out our new WebSocket [guide][websocket-guide] and [sample][websocket-sample] for more details.

## Strong keepalive for Service Workers {: #sw-keepalive }

Speaking of service worker lifecycle, another important update has landed: strong keepalive for APIs requiring user interaction. APIs that require a user interaction will have "strong" keepalives for extension service workers (i.e., allow the worker to take longer than 5 minutes on this task):

* [`permissions.request()`][permission-request]
* [`desktopCapture.chooseDesktopMedia()`][desktop-capture]
* [`identity.launchWebAuthFlow()`][identity-launchwebflow]
* [`management.uninstall()`][management-uninstall]

## Recording audio and video in the background {: #tab-capture }

Another gap between Manifest V2 and Manifest V3 has been closed: you can record audio and video in the background using `tabCapture` and offscreen documents. Use the [`chrome.tabCapture`][tabcapture] API in a service worker
to obtain a stream ID following a user gesture. This can then be passed to an [offscreen document][offscreen-document] to start recording.

Check out our updated [`tabCapture` guide][tabcapture-guide] to learn how it works or, for a working example,  see the [Tab Capture - Recorder][recorder-sample] sample.

## New API: runtime.getContexts() {: #runtime-get-contexts }

The new [`runtime.getContexts()` API][runtime-contexts] lets you fetch information about active contexts associated with your extensions. For example, you can use it to check if there is an active offscreen document:

```js
const existingContexts = await chrome.runtime.getContexts({});
const offscreenDocument = existingContexts.find(
    (c) => c.contextType === 'OFFSCREEN_DOCUMENT'
  );
``` 

## New offscreen reason: GEOLOCATION {: #offscreen-geolocation }

`geolocation` has been added as another [valid reason for using an offscreen document][offscreen-document-reasons]. Check out our guide [using geolocation][tut-geo] to learn more about how to obtain the geographical location of the extension using the Offscreen API.

## chrome.action.setBadgeText() {: #action-setbadge }

[`action.setBadgeText`][action-setbadgetext] has been updated to address an inconsistency between Manifest V2 and Manifest V3. Passing an empty string or `null` to `action.setBadgeText`  will clear the badge text for the specified tab and default to the global badge text instead.

```js
action.setBadgeText({tabId: tabId, text: ''});

```

## Summary: another step towards Manifest V3 {: #summary }

With improved Service Worker lifetime support and the updated TabCapture API we’ve continued to make progress on our goal to close the feature gap between Manifest V2 and V3. Checkout our [known issues page][known-issues] for the current status. 


[action-setbadgetext]: /docs/extensions/reference/action/#method-setBadgeText
[chrome-sidepanel-open]: /docs/extensions/reference/sidePanel/#method-open
[desktop-capture]: /docs/extensions/reference/desktopCapture/#method-chooseDesktopMedia
[identity-launchwebflow]: /docs/extensions/reference/identity/#method-launchWebAuthFlow
[management-uninstall]: /docs/extensions/reference/management/#method-uninstall
[doc-native-msg]: /docs/extensions/mv3/nativeMessaging/
[known-issues]: /docs/extensions/migrating/known-issues/
[runtime-contexts]:/docs/extensions/reference/runtime/#method-getContexts
[offscreen-document]: /docs/extensions/reference/offscreen/
[offscreen-document-reasons]: /docs/extensions/reference/offscreen/#type-Reason
[permission-request]: /docs/extensions/reference/permissions/#method-request
[recorder-sample]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.tabcapture-recorder
[sw-lifecycle]: /docs/extensions/mv3/service_workers/service-worker-lifecycle/
[tabcapture]: /docs/extensions/reference/tabCapture
[tabcapture-guide]: /docs/extensions/mv3/screen_capture/
[tut-geo]: /docs/extensions/mv3/geolocation/
[websocket-guide]: /docs/extensions/mv3/tut_websockets/
[websocket-sample]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.websockets




