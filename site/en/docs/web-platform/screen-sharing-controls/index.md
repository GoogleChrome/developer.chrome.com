---
layout: 'layouts/doc-post.njk'
title: 'Privacy-preserving screen sharing controls'
description: >
 Guide the user away from oversharing thanks to privacy-preserving screen sharing controls on the web.
authors:
  - beaufortfrancois
  - eladalon
date: 2022-09-29
updated: 2023-03-14
hero: image/vvhSqZboQoZZN9wBvoXq72wzGAf1/5VpvNzrvEM3qSxasqP1j.jpeg
alt: toddler holding her lips photo
tags:
  - chrome-107
---

Sharing tabs, windows, and screens is already possible on the web platform with the [Screen Capture API]. In short, [`getDisplayMedia()`] allows the user to select a screen or portion of a screen (such as a window) to capture as a media stream. This stream can then be recorded or shared with others over the network. This article introduces some recent changes to the API to better preserve privacy, and prevent accidental sharing of personal information.

Here’s a list of controls you can use for privacy preserving screen sharing:
- The `displaySurface` option can indicate that the web app prefers to offer a specific display surface type (tabs, windows, or screens).
- The `surfaceSwitching` option indicates whether Chrome should allow the user to dynamically switch between shared tabs.
- The `selfBrowserSurface` option can be used to prevent the user from sharing the current tab. This avoids the "hall of mirrors" effect.
- The `systemAudio` option ensures Chrome only offers relevant audio-capture to the user.

## Changes to `getDisplayMedia()`

The following changes have been made to [`getDisplayMedia()`].

### The `displaySurface` option {: #displaySurface }

Web apps with specialized user journeys, which work best with sharing a window or a screen, can still ask Chrome to offer windows or screens more prominently in the media picker. The ordering of the offer remains unchanged, but the relevant pane is pre-selected.

The values for the [`displaySurface`] option are:
- `"browser"` for tabs.
- `"window"` for windows.
- `"monitor"` for screens.

```js
const stream = await navigator.mediaDevices.getDisplayMedia({
  // Pre-select the "Window" pane in the media picker.
  video: { displaySurface: "window" },
});
```

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/AaQIUrKKCvoNuaBjvGOM.png", alt="Screenshot of the media picker featuring the pre-selected \"Window\" pane.", width="800", height="524" %}
  <figcaption>
    The "Window" pane is pre-selected in the media picker. 
  </figcaption>
</figure>

Note that we don’t offer the option to pre-select a specific window or screen. This is by design, as that would give the web app too much power over the user.

### The `surfaceSwitching` option {: #surfaceSwitching }

One of the top-cited reasons for sharing the entire screen, is the desire to seamlessly switch between sharing different surfaces during a session. To address this, Chrome now exposes a button that lets a user dynamically switch between sharing different tabs. This "Share this tab instead" button has previously been available to Chrome extensions, and can now be used by any web app which calls [`getDisplayMedia()`].

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/Q0bg9d0YrZHDXFxnWcN0.png", alt="Screenshot of the button used to dynamically switch between sharing different tabs", width="800", height="328" %}
  <figcaption>
    The "Share this tab instead" button in Chrome.
  </figcaption>
</figure>

If [`surfaceSwitching`] is set to `"include"`, the browser will expose said button. If set to `"exclude"`, it will refrain from showing the user that button. Web apps are encouraged to set an explicit value, since Chrome might change the default value over time.

```js
const stream = await navigator.mediaDevices.getDisplayMedia({
  video: true,
  // Ask Chrome to expose browser-level UX elements that allow
  // the user to switch the underlying track at any time,
  // initiated by the user and without prior action by the web app.
  surfaceSwitching: "include"
});
```

### The `selfBrowserSurface` option {: #selfBrowserSurface }

In video conferencing scenarios, users often make the mistake of selecting the video conferencing tab itself, leading to a "hall of mirrors" effect, howling and general confusion.

To protect users from themselves, video conferencing web apps can now set [`selfBrowserSurface`] to `"exclude"`. Chrome will then exclude the current tab from the list of tabs offered to the user. To include it, set it to `"include"`. Presently, the default value for `selfBrowserSurface` is `"exclude"`, but web apps are encouraged to set it explicitly, as the default may change in the future.

```js
const stream = await navigator.mediaDevices.getDisplayMedia({
  video: true,
  selfBrowserSurface: "exclude"  // Avoid 🦶🔫.
});
```

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/2inHAZj84X6WZ0ew0vaM.png", alt="Screenshot of the media picker excluding the current tab", width="800", height="432" %}
  <figcaption>
    The current tab is excluded, only the second tab is present. 
  </figcaption>
</figure>


Note that an explicit `selfBrowserSurface: "exclude"` is mutually exclusive with [`preferCurrentTab: true`].

### The `systemAudio` option {: #systemAudio }

[`getDisplayMedia()`] allows capturing audio alongside video. But not all audio is created equal. Consider video conferencing web apps:
- If the user shares another tab, it makes sense to capture audio as well.
- System audio, on the other hand, includes remote participants' own audio, and should not be transmitted back to them.

In the future, it may be possible to exclude some audio sources from the capture. But for now, video conferencing web apps often find it best to just avoid capturing system audio. This could previously be done by checking what display surface the user chose, and stopping the audio track if they chose to share a screen. However, this raises a small issue, in that some users are confused when they explicitly check the checkbox to share system audio, and are then told by remote participants that no audio is incoming.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/G6ipYLLSEMTutcu1wtJJ.jpg", alt="Screenshots of media pickers featuring tab audio sharing", width="800", height="556" %}
  <figcaption>
    Sharing tab audio is offered in "Chrome Tab" pane, but not in "Entire Screen" pane.
  </figcaption>
</figure>

By setting [`systemAudio`] to `"exclude"`, a web app can avoid baffling users through mixed signals. Chrome will offer to capture audio alongside tabs and windows, but not alongside screens.

```js
const stream = await navigator.mediaDevices.getDisplayMedia({
  video: true,
  audio: true,           // Ask to capture audio; caveat follows.
  systemAudio: "exclude" // Do not offer to capture *system* audio.
});
```

Presently, the default value for `systemAudio` is `"include"`, but web apps are encouraged to set it explicitly, as the default may change in the future.

## Demo  {: #demo }

You can play with these screen sharing controls by running the [demo] on Glitch. Be sure to [check out the source code].

{% Glitch { id: 'screen-sharing-controls', path: 'index.js', previewSize: 0 } %}

## Browser support {: #browser-support }

`displaySurface`, `surfaceSwitching`, and `selfBrowserSurface` are available in Chrome&nbsp;107 on desktop. `systemAudio` is available in Chrome&nbsp;105 on desktop. 

## Feedback {: #feedback }

The Chrome team and the web standards community want to hear about your experiences with those screen sharing controls.

### Tell us about the design

Is there something about those screen sharing controls that doesn't work as you expected? Or are there missing methods or properties that you need to implement your idea? Have a question or comment on the security model?

* File a spec issue on the [GitHub repo][issues], or add your thoughts to an existing issue.

### Problem with the implementation?

Did you find a bug with Chrome's implementation? Or is the implementation different from the spec?

* File a bug at <https://new.crbug.com>. Be sure to include as much detail as you can, and simple instructions for reproducing. [Glitch](https://glitch.com) works well for sharing code.

### Show support

Are you planning to use those screen sharing controls? Your public support helps the Chrome team prioritize features and shows other browser vendors how critical it is to support them.

Send a tweet to [@ChromiumDev] and let us know where and how you are using it.

## Helpful links {: #links }

- [Specification][spec]
- [`displaySurface` explainer]
- [`surfaceSwitching` explainer]
- [`selfBrowserSurface` explainer]
- [`systemAudio` explainer]
- [TAG review][tag]

## Acknowledgements

Hero image by [John Schnobrich].

Thanks to [Rachel Andrew] for reviewing this article.

[screen capture api]: https://w3c.github.io/mediacapture-screen-share/
[`getdisplaymedia()`]: https://developer.mozilla.org/docs/web/api/mediadevices/getdisplaymedia
[`displaysurface`]: https://w3c.github.io/mediacapture-screen-share/#dfn-displaysurface
[`surfaceswitching`]: https://w3c.github.io/mediacapture-screen-share/#dom-displaymediastreamoptions-surfaceswitching
[`selfbrowsersurface`]: https://w3c.github.io/mediacapture-screen-share/#dom-displaymediastreamoptions-selfbrowsersurface
[`prefercurrenttab: true`]: https://wicg.github.io/prefer-current-tab/
[`systemaudio`]: https://w3c.github.io/mediacapture-screen-share/#dom-displaymediastreamoptions-systemaudio
[demo]: https://screen-sharing-controls.glitch.me/
[check out the source code]: https://glitch.com/edit/#!/screen-sharing-controls?path=index.js
[conditional focus]: https://wicg.github.io/conditional-focus/
[issues]: https://github.com/w3c/mediacapture-screen-share/issues/
[@chromiumdev]: https://twitter.com/chromiumdev
[spec]: https://w3c.github.io/mediacapture-screen-share/
[`displaysurface` explainer]: https://github.com/eladalon1983/screen-share-explainers/blob/main/displaySurface_Constraint_Explainer.md
[`surfaceswitching` explainer]: https://github.com/eladalon1983/screen-share-explainers/blob/main/surfaceSwitching_Explainer.md
[`selfbrowsersurface` explainer]: https://github.com/eladalon1983/screen-share-explainers/blob/main/selfBrowserSurface_Explainer.md
[`systemaudio` explainer]: https://github.com/eladalon1983/screen-share-explainers/blob/main/systemAudio_Explainer.md
[tag]: https://github.com/w3ctag/design-reviews/issues/744
[john schnobrich]: https://unsplash.com/photos/2FPjlAyMQTA
[rachel andrew]: https://github.com/rachelandrew
