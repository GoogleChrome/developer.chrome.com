---
title: Media updates in Chrome 61
description: >
  Background video track optimizations and automatic video fullscreen when
  device is rotated are here!
layout: 'layouts/blog-post.njk'
date: 2017-07-28
updated: 2018-07-31
authors:
  - beaufortfrancois
tags:
  - media
  - chrome-61
---

- Chrome now [disables video tracks when an MSE video is played in the
  background](#background-video-track-optimizations) to optimize performance.
- Video will [go fullscreen when device is rotated](#auto-fullscreen-rotate).

## Background video track optimizations (MSE only) {: #background-video-track-optimizations}

{% Aside 'warning' %}
This feature has been delayed until Chrome 62. See [crbug.com/752726](https://crbug.com/752726).
{% endAside %}

To improve battery life, Chrome now disables video tracks when the video is
played in the background (e.g., in a non-visible tab) if the video uses [Media
Source Extensions (MSE)].

You can inspect these changes by going to the `chrome://media-internals` page,
and filter for the "info" property. When the tab containing a playing video
becomes inactive, you'll see a message like `Selected video track: []`
indicating that the video track has been disabled. When the tab becomes active
again, video track is re-enabled automatically.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/4QmnUQGtBX1N3y64ucE6.png", alt="Log panel in the chrome://media-internals page", width="800", height="292" %}
  <figcaption>
    Log panel in the <code>chrome://media-internals</code> page
  </figcaption>
</figure>

For those who want to understand what is happening, here's a JavaScript code
snippet that shows you what Chrome is roughly doing behind the scenes.

```js
var video = document.querySelector('video');
var selectedVideoTrackIndex;

document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    // Disable video track when page is hidden.
    selectedVideoTrackIndex = video.videoTracks.selectedIndex;
    video.videoTracks[selectedVideoTrackIndex].selected = false;
  } else {
    // Re-enable video track when page is not hidden anymore.
    video.videoTracks[selectedVideoTrackIndex].selected = true;
  }
});
```

You may want to reduce the quality of the video stream when video track is
disabled. It would be as simple as using the [Page Visibility API] as shown
above to detect when a page is hidden.

And here are some restrictions:

- This optimization only applies to videos with a [keyframe] distance < 5s.
- If the video doesn't contain any audio tracks, the video will be
  automatically paused when played in the background.

[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=663999)

## Automatic video fullscreen when device is rotated {: #auto-fullscreen-rotate }

{% Aside 'warning' %}
This feature has been delayed until Chrome 62. See [crbug.com/713233](https://crbug.com/713233#c30).
{% endAside %}

If you rotate a device to landscape while a video is playing in the viewport,
playback will automatically switch to fullscreen mode. Rotating the device to
portrait puts the video back to windowed mode.

Note that you can manually implement this behavior yourself. (See the [Mobile Web Video
Playback] article).

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/aJVkS8Qor8mNrUAhAuxl.png", alt="Automatic video fullscreen when device is rotated", width="800", height="385" %}
</figure>

This magic behavior only happens when:

- device is an Android phone (not a tablet)
- user's screen orientation is set to "Auto-rotate"
- video size is at least 200x200px
- video uses native controls
- video is currently playing
- at least 75% of the video is visible (on-screen)
- orientation rotates by 90 degrees (not 180 degrees)
- there is no [fullscreen element] yet
- screen is not locked using the [Screen Orientation API]

[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=713233)

<!-- lint disable definition-case -->

[Media Source Extensions (MSE)]: https://developers.google.com/web/fundamentals/media/mse/basics
[Page Visibility API]: https://www.w3.org/TR/page-visibility/
[keyframe]: https://en.wikipedia.org/wiki/Key_frame#Video_compression
[Mobile Web Video Playback]: https://developers.google.com/web/fundamentals/media/mobile-web-video-playback#fullscreen
[fullscreen element]: https://developer.mozilla.org/docs/Web/API/Document/fullscreenElement
[Screen Orientation API]: https://w3c.github.io/screen-orientation/
