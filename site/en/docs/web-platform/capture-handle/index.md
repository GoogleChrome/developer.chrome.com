---
layout: 'layouts/doc-post.njk'
title: 'Better tab sharing with Capture Handle'
description: >
  The web platform now ships with Capture Handle, a mechanism that allows a capturing web app to ergonomically and confidently identify the captured web app, if the captured web app has opted-in.
authors:
  - beaufortfrancois
  - eladalon
date: 2022-05-09
hero: image/vvhSqZboQoZZN9wBvoXq72wzGAf1/MVkes5k3ySeJuhwlHHen.jpeg
alt: A photo of the Hall of Mirrors at Versailles palace
tags:
  - chrome-102
---

The web platform now ships with Capture Handle, a mechanism that helps collaboration between capturing and captured web apps. Capture Handle allows a capturing web app to ergonomically and confidently identify the captured web app. (If the captured web app has opted-in.)

A few examples illustrate the benefits.

<b>Example 1:</b> If a video conferencing web app is capturing a presentation web app, the video conferencing web app can expose controls to the user for navigating between slides. Because the controls are embedded directly in the video conferencing web app, the user doesn’t have to repeatedly switch between the video conferencing tab and the presented tab. With this burden lifted, the user is now free to concentrate more fully on the delivery of their presentation.

<b>Example 2:</b> The "hall of mirrors" effect occurs when a captured surface is rendered back to the location being captured. Notably, if the user chooses to capture the tab in which a video conferencing call is taking place, and the video conferencing web app renders a local preview, this dreaded effect will be observed. Using Capture Handle, self-capture can be detected and mitigated; for example, by the web app suppressing the local preview.

{% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/5t66EMS6gRWaXUYHwTfq.png", alt="Illustration of the hall of mirrors effect", width="800", height="517" %}

## About Capture Handle {: #capture-handle }

Capture Handle consists of two complementary parts:

- Captured web apps can opt-in to exposing certain information to some origins with `navigator.mediaDevices.setCaptureHandleConfig()`.
- Capturing web apps can then read that information with `getCaptureHandle()` on `MediaStreamTrack` objects.

### Captured side

Web apps can expose information to would-be capturing web apps. It does so by calling `navigator.mediaDevices.setCaptureHandleConfig()` with an optional object consisting of these members:

- `handle`: Can be any string up to 1024 characters..
- `exposeOrigin`: If `true`, the origin of the captured web app may be exposed to capturing web apps.
- `permittedOrigins`: Valid values are (i) an empty array, (ii) an array with the single item `"*"`, or (iii) an array of origins. If `permittedOrigins` consists of the single item `"*"`, then `CaptureHandle` is observable by all capturing web apps. Otherwise, it is observable only to capturing web apps whose origin is in `permittedOrigins`.

The following example shows how to expose a randomly generated UUID as an handle and the origin to any capturing web app.

```js
const config = {
  handle: crypto.randomUUID(),
  exposeOrigin: true,
  permittedOrigins: ['*'],
};
navigator.mediaDevices.setCaptureHandleConfig(config);
```

Note that the captured web app does not know if it is being captured. Unless, that is, the capturing web app uses `CaptureHandle` information to establish communication with the captured web app (using messaging via a worker, or a shared cloud infrastructure for instance).

### Capturing side

The capturing web app holds a video `MediaStreamTrack`, and can read the capture handle information by calling `getCaptureHandle()` on that `MediaStreamTrack`. This call returns `null` if no capture handle is available, or if the capturing web app is not permitted to read it. If a capture handle is available, and the capturing web app is added to `permittedOrigins`, this call returns an object with the following members:

- `handle`: The string value set by the captured web app with `navigator.mediaDevices.setCaptureHandleConfig()`.
- `origin`: The origin of the captured web app if `exposeOrigin` was set to `true`. Otherwise, it is not defined.

The following example shows how to read the capture handle information from a video track.

```js
// Prompt the user to capture their display (screen, window, tab).
const stream = await navigator.mediaDevices.getDisplayMedia();

// Check if the video track is exposing information.
const [videoTrack] = stream.getVideoTracks();
const captureHandle = videoTrack.getCaptureHandle();
if (captureHandle) {
  // Use captureHandle.origin and captureHandle.handle...
}
```

Monitor `CaptureHandle` changes by listening to `"capturehandlechange"` events on a `MediaStreamTrack` object. Changes happen when:

- The captured web app calls `navigator.mediaDevices.setCaptureHandleConfig()`.
- A [cross-document navigation] occurs in the captured web app.

```js
videoTrack.addEventListener('capturehandlechange', event => {
  captureHandle = event.target.getCaptureHandle();
  // Consume new capture handle...
});
```

## Security and privacy {: #security-privacy }

Collaboration between capturing and captured web apps is theoretically possible today, by embedding "magic pixels" in the captured web app or embedding QR codes in the video stream for example. Capture Handle offers a simpler, more reliable, and more secure mechanism. It also allows the captured web app to select the audience - either select origins or the entire web.

Note that `navigator.mediaDevices.setCaptureHandleConfig()` is only available to top-level main frames in secure browsing contexts (HTTPS only).

## Sample {: #sample }

You can play with Capture Handle by running the [sample] on Glitch. Be
sure to [check out the source code].

{% Glitch { id: 'capture-handle', path: 'index.js', previewSize: 0 } %}

## Demos

Some demos are available at:

- [Remote Control]
- [Self-Capture Detection]

## Feature detection

To check if `getCaptureHandle()` is supported, use:

```js
if ('getCaptureHandle' in MediaStreamTrack.prototype) {
  // getCaptureHandle() is supported.
}
```

To check if `navigator.mediaDevices.setCaptureHandleConfig()` is supported, use:

```js
if ('setCaptureHandleConfig' in navigator.mediaDevices) {
  // navigator.mediaDevices.setCaptureHandleConfig() is supported.
}
```

## Browser support

At the time of writing, Capture Handle is available in Chrome&nbsp;102.

## What's next {: #future }

Here's a sneak peek of what to expect in the near future that will improve screensharing on the web:

- [Region Capture] would allow cropping a video track derived from display-capture of the current tab.
- [Conditional Focus] would allow the capturing web app to instruct the browser to either switch focus to the captured display-surface, or to avoid such a focus change.

## Feedback {: #feedback }

The Chrome team and the web standards community want to hear about your experiences with Capture Handle.

### Tell us about the design

Is there something about Capture Handle that doesn't work like you expected? Or are there missing methods or properties that you need to implement your idea? Have a question or comment on the security model?

- File a spec issue on the [GitHub repo][issues], or add your thoughts to an existing issue.

### Problem with the implementation?

Did you find a bug with Chrome's implementation? Or is the implementation different from the spec?

- File a bug at <https://new.crbug.com>. Be sure to include as much detail as you can, and simple instructions for reproducing. [Glitch](https://glitch.com) works great for sharing quick and easy repros.

### Show support

Are you planning to use Capture Handle? Your public support helps the Chrome team prioritize features and shows other browser vendors how critical it is to support them.

Send a tweet to [@ChromiumDev] and let us know where and how you are using it.

## Helpful links {: #links }

- [Specification][spec]
- [Explainer]
- [TAG review][tag]
- [Chromium bug][cr-bug]
- [ChromeStatus.com entry][cr-status]

## Acknowledgements

Thanks to [Joe Medley] for reviewing this article.

[cross-document navigation]: https://chromium.googlesource.com/chromium/src/+/main/docs/navigation_concepts.md#Same_Document-and-Cross_Document-Navigations
[sample]: https://capture-handle.glitch.me/
[check out the source code]: https://glitch.com/edit/#!/capture-handle?path=index.js
[remote control]: https://w3c.github.io/mediacapture-handle/identity/demos/remote_control/capturer.html
[self-capture detection]: https://w3c.github.io/mediacapture-handle/identity/demos/self_capture_detection/index.html
[region capture]: https://w3c.github.io/mediacapture-region/
[conditional focus]: https://wicg.github.io/conditional-focus
[issues]: https://github.com/w3c/mediacapture-handle/issues
[@chromiumdev]: https://twitter.com/ChromiumDev
[spec]: https://w3c.github.io/mediacapture-handle/identity/
[explainer]: https://github.com/w3c/mediacapture-handle/blob/main/identity/explainer.md
[tag]: https://github.com/w3ctag/design-reviews/issues/645
[cr-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=1200907
[cr-status]: https://www.chromestatus.com/feature/4854125411958784
[joe medley]: https://github.com/jpmedley
[jessica kantak bailey]: https://unsplash.com/@jkkantakbailey
[unsplash]: https://unsplash.com/photos/WMCvwBTWSi0
