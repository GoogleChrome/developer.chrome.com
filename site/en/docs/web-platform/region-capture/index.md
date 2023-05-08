---
layout: 'layouts/doc-post.njk'
title: 'Better tab sharing with Region Capture'
description: >
 The web platform now ships with Region Capture, a performant and robust way for cropping a video track.
authors:
  - beaufortfrancois
  - eladalon
date: 2022-06-21
updated: 2022-11-14
hero: image/vvhSqZboQoZZN9wBvoXq72wzGAf1/05M2IjnWmaeFbIDWaznm.jpeg
alt: A woman holding her hands up and making a frame with her fingers. Above her the sky is blue with a few clouds.
tags:
  - chrome-104
---

The web platform already allows a web app to capture a video track of the current tab. It now ships with Region Capture, a mechanism for cropping these video tracks. The web app designates a portion of the current tab as its area of interest, and the browser crops all pixels outside that area.

Web apps could previously crop video tracks “manually”. That is, web apps could manipulate each and every single frame directly. This was neither robust nor performant. Region Capture addresses these shortcomings. The web app can now instruct the browser to do the work on its behalf.

## About Region Capture {: #region-capture }

So you've created a website with Dynamic Content™. It's the best web app ever, and people just can't stop using it, often collaboratively. A possible next step is to embed virtual conferencing capabilities. You decide to go with that. You team up with an existing video conferencing service provider, embedding their web app as a cross-origin iframe. The video conferencing web app captures the current tab as a video track and transmits it to remote participants.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/L87rANm3IfsVZiMHfbH2.png", alt="Screenshot of a browser window featuring a web app highlighting the main content area and cross-origin iframe.", width="800", height="568" %}
  <figcaption>
    The main content area is in blue and the cross-origin iframe is in red.
  </figcaption>
</figure>

**Not so fast…** You don't really want to transmit people's own videos back to them, now, do you? Better crop that part away. But how? The embedded iframe does not know what content you expose and where, so it cannot crop without some help. You could, in theory, pass the intended coordinates. But what happens if the user resizes the window? Scrolls the viewport? Zooms in or out? Interacts with the page in a way that produces a layout change? Even if you send the new coordinates to the capturing iframe, timing issues could still lead to some miscropped frames.

Let's use Region Capture then. There is an [`Element`] on your page, maybe a `<div>`, which contains the main content. Let's call it `mainContentArea`. You want the video conferencing web app to capture and share remotely the area defined by this element's [bounding box]. So you derive a `CropTarget` from `mainContentArea`. You pass this `CropTarget` to the video conferencing web app. After cropping the video track using this `CropTarget`, frames on that track now consist only of the pixels that fall within the bounding box of `mainContentArea`. If `mainContentArea` changes size, shape or location, the video track follows along, without requiring any additional input from either web app.

Let's go over these steps again:

You define a `CropTarget` in your web app by calling `CropTarget.fromElement()` with the element of your choice as input.

```js
// In the main web app, associate mainContentArea with a new CropTarget
const mainContentArea = document.querySelector("#mainContentArea");
const cropTarget = await CropTarget.fromElement(mainContentArea);
```

You pass the `CropTarget` to the video conferencing web app.

```js
// Send the CropTarget to the video conferencing web app.
const iframe = document.querySelector("#videoConferenceIframe");
iframe.contentWindow.postMessage(cropTarget);
```

The video conferencing web app asks the browser to crop the track to the area defined by `CropTarget` by calling `cropTo()` on the self-capture video track with the crop target received from the main web app.

```js
// In the embedded video conferencing web app, ask the user for permission
// to start capturing the current tab.
const stream = await navigator.mediaDevices.getDisplayMedia({
  preferCurrentTab: true,
});
const [track] = stream.getVideoTracks();

// Start cropping the self-capture video track using the CropTarget
// received over window.onmessage.
await track.cropTo(cropTarget);

// Enjoy! Transmit remotely the cropped video track with RTCPeerConnection.
```

Et voilà! You're done.

## Deep dive

### Feature detection

To check if `CropTarget.fromElement()` is supported, use:

```js
if ("CropTarget" in self && "fromElement" in CropTarget) {
  // Deriving a target is supported.
}
```

### Deriving a CropTarget

Let's focus on the Element called `mainContentArea`. To derive a `CropTarget` from it, call `CropTarget.fromElement(mainContentArea)`. The returned Promise will be resolved with a new `CropTarget` object if successful. Otherwise it will be rejected if you have minted an unreasonable number of `CropTarget` objects.

```js
const mainContentArea = document.querySelector("#mainContentArea");
const cropTarget = await CropTarget.fromElement(mainContentArea);
```

Unlike an `Element`, a `CropTarget` object is [serializable]. It can be passed to another document using [`Window.postMessage()`], for instance.

{% Aside %}
Prior to Chrome&nbsp;106, `CropTarget.fromElement(mainContentArea)` would reject if the type for `mainContentArea` was not `<div>` or iframe.
{% endAside %}

### Cropping

When tab-capturing, the video track is instantiated as a [`BrowserCaptureMediaStreamTrack`], which is a subclass of [`MediaStreamTrack`]. That subclass exposes `cropTo()`. Call `track.cropTo(cropTarget)` to start cropping to the contours of `mainContentArea` (the Element from which cropTarget was derived).

If successful, the Promise will be resolved when it can be guaranteed that all subsequent video frames will consist of the pixels that fall within the bounding box of the `mainContentArea`.

If unsuccessful, the Promise will be rejected. This will happen if:
- The `CropTarget` was minted in another tab. (For now - stay tuned.)
- The `CropTarget` was derived from an Element that no longer exists.
- The track has [clones].
- The current track is not a self-capture video track; see below.

The `cropTo()` method is exposed on any tab-capture video track, and not just for self-capture. It is therefore advisable to check if the user selected the current tab, before attempting to crop the track. This can be accomplished using [Capture Handle]. It is also possible to ask the browser to nudge the user towards self-capture using [`preferCurrentTab`].

```js
// Start cropping the self-capture video track using the CropTarget.
await track.cropTo(cropTarget);
```

To revert to the uncropped state, call `cropTo()` with `null`.

```js
// Stop cropping.
await track.cropTo(null);
```

### Occluding and occluded content

For Region Capture, only the position and size of the target matter, not the [z-index]. Pixels occluding the target will be captured. Occluded parts of the target will not be captured.

This is a corollary of Region Capture being essentially cropping. One alternative, which will be its own future API, is Element-level Capture; that is, capture only pixels associated with the target, regardless of occlusions. Such an API has a different set of security and privacy requirements than simple cropping.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/baMnFn0oH9NbRhBQ1XQR.png", alt="Picture of different results for Region Capture and Element-level Capture API.", width="800", height="446" %}
  <figcaption>
    Region Capture's behavior with occluding content.
  </figcaption>
</figure>

## Security and privacy {: #security-privacy }

Region Capture allows a web app that's already observing all pixels in the tab, to voluntarily remove some of those pixels. It is patently secure, as no new information can be gained.

Region Capture can be used to limit what information is sent to remote participants. For example, maybe you'd like to share some slides, but not your speaker notes.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/XLZZK696L6YS2pqvJWJV.png", alt="Screenshot of a browser window containing slides and speaker notes.", width="800", height="490" %}
  <figcaption>
    A web app containing slides and speaker notes.<br/>Sharing the notes remotely is highly undesirable. Cue Region Capture.
  </figcaption>
</figure>

Note that locally, Region Capture does not add any security guarantees. When handing a track off to another document, the receiving **document** can still uncrop the track and gain access to all of the captured tab's pixels.

Chrome draws a blue border around the edges of captured tabs. When cropping, Chrome generally draws the blue border around the cropped target.

## Demo  {: #demo }

You can play with Region Capture by running the [demo] on Glitch. Be
sure to [check out the source code].

<figure>
  {% Video src="video/vvhSqZboQoZZN9wBvoXq72wzGAf1/cD35pOdNnfPnjUQ6jI7L.mov", muted="true", autoplay="true", loop="true" %}
</figure>

{% Glitch { id: 'region-capture-demo', path: 'iframe.js', previewSize: 0 } %}

## Browser support

At the time of writing, Region Capture is available in Chrome&nbsp;104 on desktop.

## What's next {: #future }

Here's a sneak peek of what to expect in the near future that will improve screen sharing on the web:

- Region Capture will support captures of other tabs.
- [Conditional Focus] will allow the capturing web app to instruct the browser to either switch focus to the captured display surface, or to avoid such a focus change.
- An [Element-level Capture API] might be provided.

## Feedback {: #feedback }

The Chrome team and the web standards community want to hear about your experiences with Region Capture.

### Tell us about the design

Is there something about Region Capture that doesn't work as you expected? Or are there missing methods or properties that you need to implement your idea? Have a question or comment on the security model?

* File a spec issue on the [GitHub repo][issues], or add your thoughts to an existing issue.

### Problem with the implementation?

Did you find a bug with Chrome's implementation? Or is the implementation different from the spec?

* File a bug at [https://new.crbug.com](https://bugs.chromium.org/p/chromium/issues/entry?components=Blink%3EGetDisplayMedia%3ERegionCapture). Be sure to include as much detail as you can, and simple instructions for reproducing. [Glitch](https://glitch.com) works great for sharing quick and easy repros.

### Show support

Are you planning to use Region Capture? Your public support helps the Chrome team prioritize features and shows other browser vendors how critical it is to support them.

Send a tweet to [@ChromiumDev] and let us know where and how you are using it.

## Helpful links {: #links }

- [Specification][spec]
- [Explainer]
- [TAG review][tag]
- [Chromium bug][cr-bug]
- [ChromeStatus.com entry][cr-status]

## Acknowledgements

Thanks to [Joe Medley] for reviewing this article.

[`element`]: https://developer.mozilla.org/docs/Web/API/Element
[bounding box]: https://developer.mozilla.org/docs/Glossary/bounding_box
[serializable]: https://developer.mozilla.org/docs/Glossary/Serializable_object
[`window.postmessage()`]: https://developer.mozilla.org/docs/Web/API/Window/postMessage
[`browsercapturemediastreamtrack`]: https://w3c.github.io/mediacapture-region/#browser-capture-media-stream-track
[`mediastreamtrack`]: https://developer.mozilla.org/docs/Web/API/MediaStreamTrack
[clones]: https://developer.mozilla.org/docs/Web/API/MediaStreamTrack/clone
[capture handle]: /blog/capture-handle/
[`prefercurrenttab`]: https://wicg.github.io/prefer-current-tab/
[z-index]: https://developer.mozilla.org/docs/Web/CSS/z-index
[demo]: https://region-capture-demo.glitch.me/
[check out the source code]: https://glitch.com/edit/#!/region-capture-demo?path=iframe.js
[conditional focus]: https://wicg.github.io/conditional-focus
[element-level capture api]: https://bugs.chromium.org/p/chromium/issues/detail?id=1350054
[issues]: https://github.com/w3c/mediacapture-region/issues
[@chromiumdev]: https://twitter.com/ChromiumDev
[spec]: https://w3c.github.io/mediacapture-region/
[explainer]: https://github.com/w3c/mediacapture-region/blob/main/README.md
[tag]: https://github.com/w3ctag/design-reviews/issues/710
[cr-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=1247761
[cr-status]: https://www.chromestatus.com/feature/5712447794053120
[joe medley]: https://github.com/jpmedley
