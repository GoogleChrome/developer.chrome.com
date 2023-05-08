---
layout: 'layouts/blog-post.njk'
title: 'Avoiding oversharing when screen sharing'
description: >
 The web platform now ships with additional controls for privacy preserving screen sharing.
authors:
  - beaufortfrancois
  - eladalon
date: 2022-09-29
hero: image/vvhSqZboQoZZN9wBvoXq72wzGAf1/fr1l39yWeyjH8uAZlIbC.jpeg
alt: three person pointing the silver laptop computer photo
tags:
  - chrome-105
  - chrome-107
---

Sharing tabs, windows, and screens is already possible on the web platform thanks to [`getDisplayMedia()`]. We’re now shipping the following improvements that guide the user away from accidental oversharing:

- Sharing tabs is now the default option, rather than sharing screens.
- The [`displaySurface`] option can indicate that the web app prefers to offer a specific display surface type (tabs, windows, or screens).
- The [`surfaceSwitching`] option indicates whether Chrome should allow the user to dynamically switch between shared tabs.
- The [`selfBrowserSurface`] option can be used to prevent the user from sharing the current tab. This avoids the "hall of mirrors" effect.
- The [`systemAudio`] option ensures Chrome only offers relevant audio-capture to the user.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/SRzjjJ9AQVQVyjTCXskh.png", alt="Screenshot of the media picker prompt upon calling getDisplayMedia().", width="800", height="524" %}
  <figcaption>
    Chrome’s media picker prompt upon calling getDisplayMedia().
  </figcaption>
</figure>

## Reordering the selection offered to the user {: #reordering }

When [`getDisplayMedia()`] is called, users are presented with a media picker which allows them to share whichever display surface they would like. Experience shows that the ordering of the offering affects the users’ selection. We are experimenting in Chrome&nbsp;107 with reordering the picker in order to nudge users towards tabs, which is the best option in the majority of cases.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/7z4i2ZI77UZA80WRg4Rc.jpg", alt="Screenshots of the old and new media picker prompts.", width="800", height="556" %}
  <figcaption>
    Chrome’s media picker (old vs. new).
  </figcaption>
</figure>

The expected benefits are as follows:

### Privacy

Previously, screens were offered as the default option. This is the least privacy-preserving option, as users may end up exposing more personal information than they had originally intended. Such as:
- Timezone (via the system clock)
- Language
- System notifications
- Running apps
- Installed apps
- Installed extensions
- Bookmarks
- Browsing history (via the omnibox)
- The user’s profile pictures (browser, system, other apps)
- Rugby-club affiliation (via desktop wallpapers)
- Audio notifications from backgrounded apps, like a calendar

Most of these concerns are mitigated by sharing a tab instead of a screen.

### Feature-completeness

Tab sharing is more feature-complete:
- Sharing tab audio is supported on all platforms; sharing system audio and window audio is only implemented on some platforms, at the time of writing.
- When sharing tabs, complementary features enable closer collaboration with the captured content:
  - [Capture Handle] allows the identification of the captured tab and establishment of a communications channel with it.
  - [Region Capture] allows further scoping down of captured content.

### Performance and user experience

When a user intends to share another web app, it’s preferable to directly share the tab running that app, rather than its Chrome window, or even the entire screen.
- The tab will continue being shared even if the user interacts with another app.
- The resulting image on remote users’ participants is going to be “zoomed in on the action” and therefore clearer.
- Avoiding the capture, encoding and transmission of irrelevant content saves CPU and bandwidth.
- A more stable frame-rate is possible for tab-capture than for other types of capture.

## New screen sharing controls

The new `displaySurface`, `surfaceSwitching`, `selfBrowserSurface`, and `systemAudio` options will allow you to tailor your screen sharing experience.

Check out [Privacy-preserving screen sharing controls] for more information.

## What's next {: #future }

The [`suppressLocalAudioPlayback`] option will indicate whether the audio playing in a tab would be played out of the user’s local speakers.

[Conditional Focus] will allow the capturing web app to instruct the browser to either switch focus to the captured display surface, or to avoid such a focus change.

## Acknowledgements

Hero image by [Jelleke Vanooteghem].

Thanks to [Rachel Andrew] for reviewing this article.

[`getdisplaymedia()`]: https://developer.mozilla.org/docs/Web/API/MediaDevices/getDisplayMedia
[`displaysurface`]: /docs/web-platform/screen-sharing-controls/#displaySurface
[`surfaceswitching`]: /docs/web-platform/screen-sharing-controls/#surfaceSwitching
[`selfbrowsersurface`]: /docs/web-platform/screen-sharing-controls/#selfBrowserSurface
[`systemaudio`]: /docs/web-platform/screen-sharing-controls/#systemAudio
[capture handle]: /docs/web-platform/capture-handle/
[region capture]: /docs/web-platform/region-capture/
[privacy-preserving screen sharing controls]: /docs/web-platform/screen-sharing-controls/
[conditional focus]: https://wicg.github.io/conditional-focus/
[`suppresslocalaudioplayback`]: https://w3c.github.io/mediacapture-screen-share/#dom-mediatracksupportedconstraints-suppresslocalaudioplayback 
[jelleke vanooteghem]: https://unsplash.com/photos/kabtmcdcAbk
[rachel andrew]: https://github.com/rachelandrew
