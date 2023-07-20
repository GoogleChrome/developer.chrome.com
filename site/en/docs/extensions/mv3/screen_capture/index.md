---
layout: "layouts/doc-post.njk"
title: "Audio recording and screen capture"
seoTitle: "Chrome Extensions: Audio recording and screen capture"
date: 2023-04-14
description: How to record audio or video from a tab, window, or screen.
---

This guide explains different approaches for recording audio and video from a tab, window, or
screen using APIs such as [`chrome.tabCapture`][tabcapture] or
[`getDisplayMedia()`][get-display-media].

## Screen recording {: #screen-recording }

For screen recording, call [`getDisplayMedia()`][get-display-media], which triggers the dialog box
shown below. This provides the user with the ability to select which tab, window or screen they wish
to share and provides a clear indication that recording is taking place.

<figure data-size="full">
  {% Img src="image/wVNVUJS8Z8O04i1tJKSdsp6nkRQ2/Q78okJG9DlfNwzyf2mly.png", alt="Screen share dialog for example.com", width="728", height="610" %}
  <figcaption>Screen share dialog for example.com.</figcaption>
</figure>

The following example requests access to record both audio and video.

```js
const stream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });
```

If called within a content script, recording will automatically end when the user navigates to a new
page. To record in the background and across navigations, use an
[offscreen document][offscreen-documents] with the `DISPLAY_MEDIA` reason.

## Tab capture based on user gesture {: #user-gesture }

Calling [`getDisplayMedia()`][get-display-media] results in the browser showing a dialog which asks
the user what they would like to share. However, in some cases the user has just clicked on the
[action button][action-button] to invoke your extension for a specific tab, and you would like to
immediately start capturing the tab without this prompt.

### Recording audio and video in the background {: #audio-and-video-offscreen-doc }

Starting in Chrome 116, you can call the [`chrome.tabCapture`][tabcapture] API in a service worker
to obtain a stream ID following user gesture. This can then be passed to an offscreen document to
start recording.

In your service worker:

```js
chrome.action.onClicked.addListener(async (tab) => {
  const existingContexts = await chrome.runtime.getContexts({});

  const offscreenDocument = existingContexts.find(
    (c) => c.contextType === 'OFFSCREEN_DOCUMENT'
  );

  // If an offscreen document is not already open, create one.
  if (!offscreenDocument) {
    // Create an offscreen document.
    await chrome.offscreen.createDocument({
      url: 'offscreen.html',
      reasons: ['USER_MEDIA'],
      justification: 'Recording from chrome.tabCapture API',
    });
  }

  // Get a MediaStream for the active tab.
  const streamId = await chrome.tabCapture.getMediaStreamId({
    targetTabId: tab.id
  });

  // Send the stream ID to the offscreen document to start recording.
  chrome.runtime.sendMessage({
    type: 'start-recording',
    target: 'offscreen',
    data: streamId
  });
});
```

Then, in your offscreen document:

```js
chrome.runtime.onMessage.addListener(async (message) => {
  if (message.target !== 'offscreen') return;
  
  if (message.type === 'start-recording') {
    const media = await navigator.mediaDevices.getUserMedia({
      audio: {
        mandatory: {
          chromeMediaSource: "tab",
          chromeMediaSourceId: message.data,
        },
      },
      video: {
        mandatory: {
          chromeMediaSource: "tab",
          chromeMediaSourceId: message.data,
        },
      },
    });

    // Continue to play the captured audio to the user.
    const output = new AudioContext();
    const source = output.createMediaStreamSource(media);
    source.connect(output.destination);

    // TODO: Do something to recording the MediaStream.
  }
});
```

For a full example, see the [Tab Capture - Recorder][recorder-sample] sample.

### Recording audio and video in a new tab {: #audio-and-video-new-tab }

Prior to Chrome 116, it was not possible to use the [`chrome.tabCapture`][tabcapture] API in a
service worker or to consume a stream ID created by that API in an offscreen document. Both of these
are requirements for the approach above.

Instead, you can open an extension page in a new tab or window, and directly obtain a stream. Set
the `targetTabId` property to capture the correct tab.

Start by opening an extension page (perhaps in your popup or service worker):

```js
chrome.windows.create({ url: chrome.runtime.getURL("recorder.html") });
```

Then, in your extension page:

```js
chrome.tabCapture.getMediaStreamId({ targetTabId: tabId }, async (id) => {
  const media = await navigator.mediaDevices.getUserMedia({
    audio: {
      mandatory: {
        chromeMediaSource: "tab",
        chromeMediaSourceId: id,
      },
    },
    video: {
      mandatory: {
        chromeMediaSource: "tab",
        chromeMediaSourceId: id,
      },
    },
  });

  // Continue to play the captured audio to the user.
  const output = new AudioContext();
  const source = output.createMediaStreamSource(media);
  source.connect(output.destination);
});
```

Alternatively, consider using the [screen recording](#screen-recording) approach which allows you to
record in the background using an offscreen document, but shows the user a dialog to select a tab,
window or screen to record from.

### Recording audio in a popup {: #audio-only }

{% Aside 'caution' %}

This approach only works for audio, as attempting to capture video from the popup causes
focus to move and the popup to close.

{% endAside %}

If you only need to record audio, you can directly obtain a stream in the extension popup using
[chrome.tabCapture.capture][tabcapture-capture]. When the popup closes, recording will be stopped.

```js
chrome.tabCapture.capture({ audio: true }, (stream) => {
  // Continue to play the captured audio to the user.
  const output = new AudioContext();
  const source = output.createMediaStreamSource(stream);
  source.connect(output.destination);

  // TODO: Do something with the stream (e.g record it)
});
```

If you need the recording to persist across navigations, consider using the approach described
in the [previous section](#audio-and-video-offscreen-doc).

## Other considerations {: #other-considerations }

For more information on how to record a stream, see the [MediaRecorder][media-recorder] API.

[tabcapture]: /docs/extensions/reference/tabCapture
[tabcapture-capture]: /docs/extensions/reference/tabCapture/#method-capture
[tabcapture-media-stream-id]: /docs/extensions/reference/tabCapture/#method-getMediaStreamId
[get-display-media]: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia
[offscreen-documents]: /blog/Offscreen-Documents-in-Manifest-v3/
[feedback-mailing-list]: https://groups.google.com/a/chromium.org/g/chromium-extensions/c/Ef08XtOOyoI/m/L5HM7yPsBAAJ
[media-recorder]: https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
[action-button]: /docs/extensions/mv3/user_interface/#action
[recorder-sample]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.tabcapture-recorder
