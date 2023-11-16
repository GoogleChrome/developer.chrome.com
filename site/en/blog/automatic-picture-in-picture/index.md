---
layout: "layouts/blog-post.njk"
title: "Automatic picture-in-picture for web apps"
description: "Chrome allows video conferencing web apps to automatically enter picture-in-picture."
hero: "image/vvhSqZboQoZZN9wBvoXq72wzGAf1/NOYOTQG5rjItk9Y4n6tH.jpg"
alt: "A hand holding a photo frame."
date: 2023-11-16
#updated: YYYY-MM-DD
authors:
  - beaufortfrancois
tags:
  - media
  - chrome-120
---

With the [recent introduction](/blog/the-future-of-picture-in-picture/) of the Document Picture-in-Picture API (and even [before](/blog/media-updates-in-chrome-73/#auto-pip)), web developers are increasingly interested in being able to automatically open a picture-in-picture window when the user switches focus from their current tab. This is especially useful for video conferencing web apps, where it allows presenters to see and interact with participants in real time while presenting a document or using other tabs or windows.

<figure>
  {% Video
    playsinline="true",
    src="video/vvhSqZboQoZZN9wBvoXq72wzGAf1/d6A26QZ10brUT1I3Bpnv.mov",
    loop="true",
    autoplay="true",
    muted="true",
    controls="true"
  %}
  <figcaption>A picture-in-picture window opened and closed automatically when user switches tabs.</figcaption>
</figure>

## Enter picture-in-picture automatically

To support these video conferencing use cases, from Chrome 120 desktop web apps can automatically enter picture-in-picture, with a few restrictions to ensure a positive user experience. A web app is only eligible for automatic picture-in-picture if it meets all of the following conditions:

- It has registered a [media session action](https://www.w3.org/TR/mediasession/#ref-for-enumdef-mediasessionaction) handler for the `"enterpictureinpicture"` action.

- It is actively capturing camera or microphone via [getUserMedia](https://developer.mozilla.org/docs/Web/API/MediaDevices/getUserMedia).

- The user allows "automatic picture-in-picture" through a browser setting enabled by default.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/2CGgV9yA5qdhoenu2FxF.jpg", alt="Screenshot of the automatic picture-in-picture setting in Chrome browser site information pane.", width="800", height="450" %}
  <figcaption>Automatic picture-in-picture setting in Chrome browser site information pane.</figcaption>
</figure>

When a web app is eligible, the media session action handler callback function for the `"enterpictureinpicture"` action is fired when the user switches focus to another tab, allowing it to open a picture-in-picture window without a user gesture. 

Web developers can either use the [Picture-in-Picture API for &lt;video&gt;](/blog/watch-video-using-picture-in-picture/) to open a picture-in-picture window from an HTML &lt;video&gt; element, or the [Document Picture-in-Picture API](/docs/web-platform/document-picture-in-picture/) to open an always-on-top window to populate with arbitrary HTML content. The picture-in-picture window is not focused when opened and automatically closed when the page visibility becomes visible again.

The following example shows you how to request access to the user’s camera. Then, safely register a media session action handler for the `"enterpictureinpicture"` action with a callback function that opens a picture-in-picture window. This window contains the user’s camera video stream with the Picture-in-Picture API for &lt;video&gt;.

```js
const video = document.querySelector("video");
// Request access to the user's camera.
navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  video.srcObject = stream;
});

try {
  // Request video to automatically enter picture-in-picture when eligible.
  navigator.mediaSession.setActionHandler("enterpictureinpicture", () => {
    video.requestPictureInPicture();
  });
} catch (error) {
  console.log("The enterpictureinpicture action is not yet supported.");
}
```

Try the [Video Conferencing Media Session](https://googlechrome.github.io/samples/media-session/video-conferencing.html) sample.

## Enter picture-in-picture from browser media control

The `"enterpictureinpicture"` media session action is also useful when the user wants to enter picture-in-picture using the media control in the Chrome browser UI.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/V8PWQyWDC1PNuXgP4Ctl.jpg", alt="Screenshot of media control in Chrome browser, with the cursor on picture-in-picture user control.", width="800", height="423" %}
  <figcaption>Media control in Chrome browser, with the cursor on picture-in-picture user control.</figcaption>
</figure>

When there is no HTML &lt;video&gt; element playing but only audio, registering the media session action handler for `"enterpictureinpicture"` tells the browser that the web app knows how to handle it and will take care of opening a picture-in-picture window itself.

It is also useful when the web app wants to use the [Document Picture-in-Picture API](/docs/web-platform/document-picture-in-picture/) to open a picture-in-picture window instead of letting the browser handling it with the Picture-in-Picture API for &lt;video&gt;.

The following example demonstrates how to safely register a media session action handler for the `"enterpictureinpicture"` action. The callback function opens a picture-in-picture window with the Document Picture-in-Picture API when the user enters picture-in-picture using the media control in the Chrome browser UI.

```js
try {
  // Use the Document Picture-in-Picture API when entering
  // picture-in-picture from browser media control.
  navigator.mediaSession.setActionHandler("enterpictureinpicture", async () => {
    const pipWindow = await documentPictureInPicture.requestWindow();
    // Populate HTML content and handle closing window...
  });
} catch (error) {
  console.log("The enterpictureinpicture action is not yet supported.");
}
```

Try the Document Picture-in-Picture API [VideoJS player demo](https://document-picture-in-picture-api.glitch.me/) or the [Video Media Session sample](https://googlechrome.github.io/samples/media-session/video.html).

## Engage and share feedback

If you have feedback or encounter any issues, you can share them at [crbug.com](https://bugs.chromium.org/p/chromium/issues/entry?components=Blink%3EMedia%3EPictureInPicture).

## Resources

- [Spec changes](https://github.com/w3c/mediasession/pull/295)
- [ChromeStatus entry](https://chromestatus.com/feature/6245717716238336)
- [Intent to Ship](https://groups.google.com/a/chromium.org/g/blink-dev/c/BEhYD8v4zY0/m/ZcINHmMMBAAJ)

## Acknowledgments

Thanks to Tommy Steimel, Ryan Flores, Shimi Rahim, Frank Liberato, and Rachel Andrew for their reviews.

Hero image by [pine watt](https://unsplash.com/@pinewatt) on [Unsplash](https://unsplash.com/photos/person-hand-holding-photo-frame-3_Xwxya43hE).
