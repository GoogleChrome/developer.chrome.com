---
layout: 'layouts/blog-post.njk'
title: 'The future of Picture-in-Picture'
description: >
  News of an origin trial from Chrome that enables arbitrary HTML content in an always-on-top window.
authors:
  - beaufortfrancois
date: 2023-02-02
hero: image/vvhSqZboQoZZN9wBvoXq72wzGAf1/lofWr2Afx8wx94iMIEyg.jpg
alt: Person holding a photo of a boat.
tags:
  - chrome-111
  - media
---

Before the [Document Picture-in-Picture API][spec], it was only possible to put an HTML `<video>` element into a Picture-in-Picture window. This new API makes it possible to open an always-on-top window that can be populated with arbitrary HTML content. It is available as an [origin trial] starting in Chrome&nbsp;111 on desktop.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/Eaaypsy6NZ9UljxtJ2fV.png", alt="A Picture-in-Picture window playing Sintel trailer video.", width="800", height="499" %}
  <figcaption>A Picture-in-Picture window created with the Document Picture-in-Picture API (<a href="https://document-picture-in-picture-api.glitch.me/">demo</a>).</figcaption>
</figure>

The new API provides much more than is available from the existing [Picture-in-Picture API for `<video>`]. For example, you can provide custom controls and inputs (for example, [captions], playlists, time scrubber, liking and disliking videos) to improve the user's Picture-in-Picture video player experience.

With a full Document in Picture-in-Picture, video conferencing web apps can combine multiple video streams into a single Picture-in-Picture window without having to rely on [canvas hacks]. They can also provide custom controls such as sending a message, muting another user, or raising a hand.

The following code snippet shows you how to toggle Picture-in-Picture for a custom video player.

```js
async function togglePictureInPicture() {
  // Close Picture-in-Picture window if any.
  if (documentPictureInPicture.window) {
    documentPictureInPicture.window.close();
    return;
  }

  // Open a Picture-in-Picture window.
  const pipWindow = await documentPictureInPicture.requestWindow({
    initialAspectRatio: 640 / 360,
    copyStyleSheets: true,
  });

  // Move video to the Picture-in-Picture window.
  const video = document.querySelector("#video");
  pipWindow.document.body.append(video);

  // Listen for the PiP closing event to move the video back.
  pipWindow.addEventListener("unload", (event) => {
    const videoContainer = document.querySelector("#videoContainer");
    const pipVideo = event.target.querySelector("#video");
    videoContainer.append(pipVideo);
  });
}
```

Check out [Picture-in-Picture for any Element, not just &lt;video&gt;][doc] for more information.

Developer feedback is really important at this stage, so please [file issues on GitHub][issues] with suggestions and questions.

Hero image by [Jakob Owens].

[spec]: https://wicg.github.io/document-picture-in-picture/
[origin trial]: /docs/web-platform/document-picture-in-picture/#register-for-the-origin-trial
[picture-in-picture api for `<video>`]: /blog/watch-video-using-picture-in-picture/
[captions]: https://bugs.chromium.org/p/chromium/issues/detail?id=854935
[canvas hacks]: /blog/watch-video-using-picture-in-picture/#show-canvas-element-in-picture-in-picture-window
[doc]: /docs/web-platform/document-picture-in-picture/
[issues]: https://github.com/WICG/document-picture-in-picture/issues
[jakob owens]: https://unsplash.com/photos/jHjjWSmnznc
