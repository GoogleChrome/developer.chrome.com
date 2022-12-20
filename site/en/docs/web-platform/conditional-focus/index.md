---
layout: 'layouts/doc-post.njk'
title: 'Better screen sharing with Conditional Focus'
description: >
 Conditionally focus a tab or window when screen sharing on the web.
authors:
  - beaufortfrancois
  - eladalon
date: 2022-11-28
hero: image/vvhSqZboQoZZN9wBvoXq72wzGAf1/O12v673aOekK889d5Upi.jpg
alt: Person holding eyeglasses with distant items in focus through the glasses.
tags:
  - chrome-109
---

The [Screen Capture API] lets the user select a tab, window, or screen to capture as a media stream. This stream can then be recorded or shared with others over the network. This documentation introduces Conditional Focus, a mechanism for web apps to control whether the captured tab or window will be focused when capture starts, or whether the capturing page will remain focused.

## Browser support {: #browser-support }

Conditional Focus is available from Chrome&nbsp;109.

## Background

When a web app starts capturing a tab or a window, the browser faces a decision—should the captured surface be brought to the forefront, or should the capturing page remain focused? The answer depends on the reason for calling `getDisplayMedia()`, and on the surface the user ends up selecting.

Consider a **hypothetical** video conferencing web app. By reading `track.getSettings().displaySurface` and potentially examining the [Capture Handle], the video conferencing web app can understand what the user chose to share. Then:

- If the captured tab or window can be remotely controlled, keep the video conference in focus.
- Otherwise, focus the captured tab or window.

In the example above, the video conferencing web app would retain focus if sharing a slides deck, allowing the user to remotely flip through the slides; but if the user chose to share a text editor, the video conferencing web app would immediately switch focus to the captured tab or window.

## Using the Conditional Focus API

Instantiate a `CaptureController` and pass it to `getDisplayMedia()`. By calling `setFocusBehavior()` immediately after the `getDiplayMedia()` returned promise resolves, you can control whether the captured tab or window will be focused or not. This can only be done if the user shared a tab or a window.

```js
const controller = new CaptureController();

// Prompt the user to share a tab, a window or a screen.
const stream =
    await navigator.mediaDevices.getDisplayMedia({ controller });

const [track] = stream.getVideoTracks();
const displaySurface = track.getSettings().displaySurface;
if (displaySurface == "browser") {
  // Focus the captured tab.
  controller.setFocusBehavior("focus-captured-surface");
} else if (displaySurface == "window") {
  // Do not move focus to the captured window.
  // Keep the capturing page focused.
  controller.setFocusBehavior("no-focus-change");
}
```

When deciding whether to focus, it is possible to take the [Capture Handle] into account.

```js
// Retain focus if capturing a tab dialed to example.com.
// Focus anything else.
const origin = track.getCaptureHandle().origin;
if (displaySurface == "browser" && origin == "https://example.com") {
  controller.setFocusBehavior("no-focus-change");
} else if (displaySurface != "monitor") {
  controller.setFocusBehavior("focus-captured-surface");
}
```

It is even possible to decide whether to focus before calling `getDisplayMedia()`.

```js
// Focus the captured tab or window when capture starts.
const controller = new CaptureController();
controller.setFocusBehavior("focus-captured-surface");

// Prompt the user to share their screen.
const stream =
    await navigator.mediaDevices.getDisplayMedia({ controller });
```

You can call `setFocusBehavior()` arbitrarily many times before the promise resolves, or at most once immediately after the promise resolves. The last invocation overrides all previous invocations.

More precisely:
- The `getDisplayMedia()` returned promise resolves on a microtask. Calling `setFocusBehavior()` after that microtask completes throws an error.
- Calling `setFocusBehavior()` more than a second after capture starts is no-op.

That is, both of the following snippets will fail:

```js
// Prompt the user to share their screen.
const stream =
    await navigator.mediaDevices.getDisplayMedia({ controller });

// Too late, because it follows the completion of the task
// on which the getDisplayMedia() promise resolved.
// This will throw.
setTimeout(() => {
  controller.setFocusBehavior("focus-captured-surface");
});
```

```js
// Prompt the user to share their screen.
const stream =
    await navigator.mediaDevices.getDisplayMedia({ controller });

const start = new Date();
while (new Date() - start <= 1000) {
  // Idle for ≈1s.
}

// Because too much time has elapsed, the browser will have
// already decided whether to focus.
// This fails silently.
controller.setFocusBehavior("focus-captured-surface");
```

Calling `setFocusBehavior()` also throws in the following cases:

- the video track of the stream returned by `getDisplayMedia()` is not ["live"].
- after the `getDisplayMedia()` returned promise resolves, if the user shared a screen (not a tab or a window).

## Sample  {: #sample }

You can play with Conditional Focus by running the [demo] on Glitch. Be sure to [check out the source code].

{% Glitch { id: 'conditional-focus', path: 'index.js', previewSize: 0 } %}

## Feature detection {: #feature-detection }

To check if `CaptureController.setFocusBehavior()` is supported, use:

```js
if (
  "CaptureController" in window &&
  "setFocusBehavior" in CaptureController.prototype
) {
  // CaptureController.setFocusBehavior() is supported.
}
```

## Feedback {: #feedback }

The Chrome team and the web standards community want to hear about your experiences with Conditional Focus.

### Tell us about the design

Is there something about Conditional Focus that doesn't work as you expected? Or are there missing methods or properties that you need to implement your idea? Have a question or comment on the security model?

* File a spec issue on the [GitHub repo][issues], or add your thoughts to an existing issue.

### Problem with the implementation?

Did you find a bug with Chrome's implementation? Or is the implementation different from the spec?

* File a bug at <https://new.crbug.com>. Be sure to include as much detail as you can, and simple instructions for reproducing. [Glitch](https://glitch.com) works well for sharing code.

### Show support

Are you planning to use Conditional Focus? Your public support helps the Chrome team prioritize features and shows other browser vendors how critical it is to support them.

Send a tweet to [@ChromiumDev] and let us know where and how you are using it.

## Helpful links {: #links }

- [Specification][spec]
- [Explainer]
- [TAG review][tag]

## Acknowledgements

Hero image by [Elena Taranenko].

Thanks to [Rachel Andrew] for reviewing this article.

[screen capture api]: https://w3c.github.io/mediacapture-screen-share/
[`getdisplaymedia()`]: https://developer.mozilla.org/docs/Web/API/MediaDevices/getDisplayMedia
[capture handle]: /docs/web-platform/capture-handle/
["live"]: https://developer.mozilla.org/docs/Web/API/MediaStreamTrack/readyState
[demo]: https://conditional-focus.glitch.me/
[check out the source code]: https://glitch.com/edit/#!/conditional-focus?path=index.js
[conditional focus]: https://wicg.github.io/conditional-focus/
[issues]: https://github.com/w3c/mediacapture-screen-share/issues/
[@chromiumdev]: https://twitter.com/ChromiumDev
[spec]: https://w3c.github.io/mediacapture-screen-share/#capturecontroller
[explainer]: https://github.com/WICG/conditional-focus/blob/main/README.md
[tag]: https://github.com/w3ctag/design-reviews/issues/679
[elena taranenko]: https://unsplash.com/photos/hCUA4xtxVTA
[rachel andrew]: https://github.com/rachelandrew
