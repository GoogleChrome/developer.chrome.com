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

## Common use cases {: #common-use-cases }

### Screen recording {: #screen-recording }

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

### Tab capture based on user gesture {: #user-gesture }

Calling [`getDisplayMedia()`][get-display-media] results in the browser showing a dialog which asks
the user what they would like to share. However, in some cases the user has just clicked on the
[action button][action-button] to invoke your extension for a specific tab, and you would like to
immediately start capturing the tab without this prompt.

#### Audio and video {: #audio-and-video }

{% Aside %}

In the future, we may support passing a media stream ID to an
[offscreen document][offscreen-documents] so recording can happen in the background and more easily
persist across navigations. We are collecting feedback in the
[chromium-extensions mailing list][feedback-mailing-list].

{% endAside %}

To record audio and video across navigations, you can open an extension page in a new tab or window,
and directly obtain a stream. Set the `targetTabId` property to capture the correct tab.

In your popup:

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

#### Audio only {: #audio-only }

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
