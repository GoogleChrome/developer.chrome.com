---
layout: "layouts/doc-post.njk"
title: "Audio recording and screen capture"
seoTitle: "Chrome Extensions: Audio recording and screen capture"
date: 2023-04-14
updated: 2023-04-14
description: How to record audio or video from a tab, window or screen
---

APIs such as [chrome.tabCapture][tabCapture] and [getDisplayMedia][getDisplayMedia] provide a
variety of ways to monitor and record audio and video from a tab, window or screen.

## Common Use Cases

### Screen Recording {: #screen-recording}

For screen recording, use the [getDisplayMedia][getDisplayMedia] API. This provides the user with
the ability to select which tab, window or screen they wish to share and provides a clear indication
that recording is taking place.

```js
// User will be prompted to select what they would like to share.
const stream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });
```

If called within a content script, recording will automatically end when the user navigates to a new
page. To record in the background and across navigations, use an
[offscreen document][offscreen-documents] with the <code>DISPLAY_MEDIA</code> reason.

### Tab capture based on user gesture

Some use cases need to capture the current tab following a user interaction
with the extension's action icon. In these cases, it is not desirable to show a secondary dialog
asking the user what they would like to share.

#### Audio and video (single page)

If your recording does not need to persist across navigations, use [chrome.tabCapture.getMediaStreamId][tabCapture-media-stream-id] to get a stream ID in the popup, and then pass that ID to a content script. Make sure to set the `consumerTabId` property to allow the tab to access this stream:

```js
chrome.tabs.query({ active: true, lastFocusedWindow: true }, ([{ id: tabId }]) => {
  chrome.tabCapture.getMediaStreamId({ consumerTabId: tabId }, async (id) => {
    chrome.tabs.sendMessage(tabId, { name: "media-id", data: id });
  });
});
```

Then, in the content script, obtain a stream from the ID:

```js
chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg.name === "media-id") {
    const media = await navigator.mediaDevices.getUserMedia({
      audio: {
        mandatory: {
          chromeMediaSource: "tab",
          chromeMediaSourceId: msg.data,
        },
      },
      video: {
        mandatory: {
          chromeMediaSource: "tab",
          chromeMediaSourceId: msg.data,
        },
      },
    });
  }
});
```

#### Audio and video (across navigations)

{% Aside %}

In the future, we may support passing a media stream ID to an [offscreen document][offscreen-documents] so recording can more easily persist across navigations. We are collecting feedback in the [chromium-extensions mailing list][feedback-mailing-list].

{% endAside %}

To record audio and video across navigations, you can open an extension page in a new tab or window, and directly obtain a stream. Set the `targetTabId` property to capture the correct tab:

```js
chrome.tabs.query({ active: true, lastFocusedWindow: true }, ([{ id: tabId }]) => {
  chrome.tabCapture.getMediaStreamId({ targetTabId: tabId }, async (id) => {
    chrome.tabs.sendMessage(tabId, { name: "media-id", data: id });
  });
});
```

Alternatively, consider using the [screen recording](#screen-recording) approach which allows you to record in the background using an offscreen document.

#### Audio only

If you only need to record audio, you can directly obtain a stream in the extension popup using [chrome.tabCapture.capture][tabCapture-capture]. When the popup closes, recording will be stopped.

```js
chrome.tabCapture.capture({ audio: true }, (stream) => {
  // Continue to play the captured audio to the user.
  const output = new AudioContext();
  const source = output.createMediaStreamSource(stream);
  source.connect(output.destination);

  // TODO: Do something with the stream (e.g record it)
});
```

## Other Considerations

For more information on how to record a stream, see the [MediaRecorder][media-recorder] API.

[tabCapture]: /docs/extensions/reference/tabCapture
[tabCapture-focus-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=1434258
[tabCapture-capture]: /docs/extensions/reference/tabCapture/#method-capture
[tabCapture-media-stream-id]: /docs/extensions/reference/tabCapture/#method-getMediaStreamId
[getDisplayMedia]: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia
[offscreen-documents]: /blog/Offscreen-Documents-in-Manifest-v3/
[feedback-mailing-list]: https://groups.google.com/a/chromium.org/g/chromium-extensions/c/Ef08XtOOyoI/m/L5HM7yPsBAAJ
[media-recorder]: https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder