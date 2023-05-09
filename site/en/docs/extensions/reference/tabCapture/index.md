---
api: tabCapture
has_warning: This permission <a href="/docs/extensions/mv3/permission_warnings/#permissions_with_warnings">triggers a warning</a>.
---

## Overview

The chrome.tabCapture API allows you to access a [MediaStream][media-stream] containing video and
audio of the current tab. It can only be called after the user invokes an extension, such as by
clicking the extension's action button. This is similar to the behavior of the
[activeTab][active-tab] permission.

## Preserving system audio

When a [MediaStream][media-stream] is obtained for a tab, audio in that tab will no longer be played
to the user. This is similar to the behavior of the [`getDisplayMedia()`][get-display-media] function when
the [`suppressLocalAudioPlayback`][supress-playback] flag is set to true.

To continue playing audio to the user, use the following:

```js
const output = new AudioContext();
const source = output.createMediaStreamSource(stream);
source.connect(output.destination);
```

This creates a new `AudioContext` and connects the audio of the tab's `MediaStream` to the default
destination.

## Stream IDs

Calling [chrome.tabCapture.getMediaStreamId][get-media-stream-id] will return a stream ID. To later
access a [MediaStream][media-stream] from the ID, use the following:

```js
navigator.mediaDevices.getUserMedia({
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
```

## Learn more

To learn more about how to use the `chrome.tabCapture` API, see
[Audio recording and screen capture][audio-recording-screen-capture]. This demonstrates how to use
`tabCapture` and related APIs to solve a number of common use cases.

[get-media-stream-id]: #method-getMediaStreamId
[active-tab]: /docs/extensions/mv3/manifest/activeTab/
[media-stream]: https://developer.mozilla.org/docs/Web/API/MediaStream
[get-display-media]: https://developer.mozilla.org/docs/Web/API/MediaDevices/getDisplayMedia
[supress-playback]: https://developer.mozilla.org/docs/Web/API/MediaTrackSupportedConstraints/suppressLocalAudioPlayback
[audio-recording-screen-capture]: /docs/extensions/mv3/screen_capture/
