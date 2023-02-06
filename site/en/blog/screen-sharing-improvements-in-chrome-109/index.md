---
layout: 'layouts/blog-post.njk'
title: 'Screen sharing improvements in Chrome 109'
description: >
 Details of two screen sharing improvements for the web—a mechanism for controlling tab focus when screen sharing, and a mechanism to control local audio playback.
authors:
  - beaufortfrancois
  - eladalon
date: 2022-11-28
hero: image/vvhSqZboQoZZN9wBvoXq72wzGAf1/1gYV3BbeqdYWvolyzP0E.jpg
alt: Brown wooden letter t-embossed decor photo.
tags:
  - chrome-109
---

Web apps can already use [`getDisplayMedia()`] to capture tabs, windows or screens as a [MediaStream]. From Chrome&nbsp;109, you can take advantage of the following improvements:

- When screen sharing starts, [Conditional Focus] allows the capturing web app to control whether the browser focuses the captured tab or window, or whether the capturing tab remains active.
- The `suppressLocalAudioPlayback` option controls whether the audio playing in a tab would be played out of the user’s local speakers.

## Conditional Focus

Using Conditional Focus, web apps can now control whether the captured tab or window will be focused when capture starts, or whether the capturing page should remain in focus.

```js
const controller = new CaptureController();
// Prompt the user to share a tab, a window or a screen.
const stream =
    await navigator.mediaDevices.getDisplayMedia({ controller });

const [track] = stream.getVideoTracks();
const displaySurface = track.getSettings().displaySurface;
if (displaySurface === "browser") {
  // Focus the captured tab.
  controller.setFocusBehavior("focus-captured-surface");
} else if (displaySurface === "window") {
  // Do not move focus to the captured window.
  // Keep the capturing page focused.
  controller.setFocusBehavior("no-focus-change");
}
```

Check out [Better screen sharing with Conditional Focus] for more information.

## Suppress local audio playback

It is common for colleagues to gather in a room so that one of them would present from their laptop to an in-room conferencing solution with a dedicated monitor and speakers. The presenter will typically mute their own laptop, and use the external speakers which are often louder; this also ensures audio is in sync with video. The [`suppressLocalAudioPlayback`] audio constraint saves time here. When set to `true`, it indicates that the browser should stop relaying audio to the local speakers when capture starts. The default value for this constraint is `false`.

```js
// Prompt the user to share a tab, a window or a screen with audio.
// If successful, stop the captured audio from being played out over
// the local device’s speakers.
const stream = await navigator.mediaDevices.getDisplayMedia({
  audio: { suppressLocalAudioPlayback: true },
});
const [audioTrack] = stream.getAudioTracks();
const settings = audioTrack.getSettings();
console.log(settings.suppressLocalAudioPlayback); // true
```

As of the time of writing, `suppressLocalAudioPlayback` does not yet work with `applyConstraints()`. See [Bug 1381959].

## Acknowledgements

Hero image by [Brett Jordan].

Thanks to [Rachel Andrew] for reviewing this article.

[`getdisplaymedia()`]: https://developer.mozilla.org/docs/Web/API/MediaDevices/getDisplayMedia
[mediastream]: https://developer.mozilla.org/docs/Web/API/MediaStream
[conditional focus]: /docs/web-platform/conditional-focus/
[better screen sharing with conditional focus]: /docs/web-platform/conditional-focus/
[`suppresslocalaudioplayback`]: https://w3c.github.io/mediacapture-screen-share/#dom-mediatrackconstraintset-suppresslocalaudioplayback
[`applyconstraints`]: https://developer.mozilla.org/docs/Web/API/MediaStreamTrack/applyConstraints
[bug 1381959]: https://bugs.chromium.org/p/chromium/issues/detail?id=1381959
[brett jordan]: https://unsplash.com/photos/Ng5tDxfpuzI
[rachel andrew]: https://github.com/rachelandrew
