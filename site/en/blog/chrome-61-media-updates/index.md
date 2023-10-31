---
# Required
layout: 'layouts/blog-post.njk'

# Required
title: Audio/Video Updates in Chrome 61

# Required
description: >
  A round up of the audio/video updates in Chrome 61.

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
authors:
  - beaufortfrancois

# Required
date: 2017-07-28

# Optional
# Include an updated date when you update your post
updated: 2018-07-31

# Optional
# How to add a new tag
# https://developer.chrome.com/docs/handbook/how-to/add-a-tag/
tags:
  - news
  - chrome61
  - media



---


- Chrome now [disables video tracks when a MSE video is played in the
  background](#background-video-track-optimizations) to optimize performance.
- Video will [go fullscreen when device is rotated](#auto-fullscreen-rotate).

## Background video track optimizations (MSE only)


{% Aside 'warning' %}
Warning: This feature has been delayed until Chrome 62. See [http://crbug.com/752726](http://crbug.com/752726).
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
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/7cgDU2FYNESIjQSXJClv.png", alt="Log panel in the chrome://media-internals page", width="800", height="292" %}
  <figcaption>
    <b>Figure 1.</b>
    Log panel in the <i>chrome://media-internals</i> page
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
Warning: This feature has been delayed until Chrome 62. See [http://crbug.com/713233](https://bugs.chromium.org/p/chromium/issues/detail?id=713233#c30).
{% endAside %}

If you rotate a device to landscape while a video is playing in the viewport,
playback will automatically switch to fullscreen mode. Rotating the device to
portrait puts the video back to windowed mode.

Note that you can implement manually this behavior yourself. (See the [Mobile Web Video
Playback] article).

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/syuAKl8Xwbakxq2riawV.png", alt="Automatic video fullscreen when device is rotated", width="800", height="385" %}
  <figcaption>
    <b>Figure 2.</b>
    Automatic video fullscreen when device is rotated
  </figcaption>
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

[media source extensions (mse)]: /web/fundamentals/media/mse/basics
[page visibility api]: https://www.w3.org/TR/page-visibility/
[keyframe]: https://en.wikipedia.org/wiki/Key_frame#Video_compression
[mobile web video playback]: /web/fundamentals/media/mobile-web-video-playback#fullscreen
[fullscreen element]: https://developer.mozilla.org/docs/Web/API/Document/fullscreenElement
[screen orientation api]: https://w3c.github.io/screen-orientation/
