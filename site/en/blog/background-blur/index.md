---
layout: 'layouts/blog-post.njk'
title: 'Blur camera background'
description: >
  A new origin trial from Chrome that allows web developers to control camera background blur.
authors:
  - beaufortfrancois
date: 2023-05-02
hero: image/vvhSqZboQoZZN9wBvoXq72wzGAf1/vMZWdUfClsmRYEwgCEv5.jpg
alt: A person in sharp focus in front of a blurred background. 
tags:
  - chrome-114
  - media
---

Background blur is a popular function in modern video conferencing applications. It automatically distinguishes the background from the person in front of the camera, blurring the surroundings while maintaining the focus on the individual. 

The Background Blur API brings background concealment capabilities to the web. This API makes it possible for web apps to ask the operating system to efficiently apply the background blur effect to a camera's video feed. This eliminates the costly need for manual application of the effect through machine learning frameworks such as TensorFlow.js, Mediapipe, or cloud-based solutions, which require processing each video frame individually.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/6aOVvWweKJHipwWx3FZF.png", alt="Photo with background blur turned off and on.", width="800", height="367" %}
  <figcaption>Photo with background blur turned off (left) and on (right).</figcaption>
</figure>

## Enable the Background Blur API

By default, the Background Blur API is not enabled in Chrome, but it can be experimented with in Chrome&nbsp;114 by explicitly enabling the functionality. You can activate it locally by enabling the "Experimental Web Platform features" [flag](/docs/web-platform/chrome-flags/#chromeflags) at `chrome://flags/#enable-experimental-web-platform-features`.

To enable it for all visitors to your app, an [origin trial](/origintrials/#/view_trial/2228155915641552897) is currently underway and set to end in Chrome&nbsp;117 (November 3, 2023).  To participate in the trial, sign up and include a meta element with the origin trial token in either the HTML or HTTP header. For more information, refer to the [Get started with origin trials](/docs/web-platform/origin-trials/) post.


## Observe background blur changes

The `backgroundBlur` boolean setting on a `MediaStreamTrack` allows you to know whether the operating system applies background blur on the media device. In addition, when the user switches background blur on or off through an operating system affordance, a `"configurationchange"` event is fired on a `MediaStreamTrack`.


The following code snippet illustrates how to monitor changes to background blur on a media device that the user has granted access to.

```js
// Prompt the user to grant access to a camera.
const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// Show camera video feed to the user (optional).
document.querySelector("video").srcObject = stream;

// Read current background blur value.
const [track] = stream.getVideoTracks();
let { backgroundBlur } = track.getSettings();
console.log(`Background blur is ${backgroundBlur ? "ON" : "OFF"}`);

// Listen to background blur changes.
track.addEventListener("configurationchange", () => {
  if (backgroundBlur !== track.getSettings().backgroundBlur) {
    backgroundBlur = track.getSettings().backgroundBlur;
    console.log(`Background blur is now ${backgroundBlur ? "ON" : "OFF"}`);
  }
});
```

## Toggle background blur

The `backgroundBlur` array capability on a `MediaStreamTrack` allows you to know whether you can control background blur on the media device. If it’s undefined or contains only one value (`[true]` or `[false]`), you cannot control camera background blur. If it contains two values, you can use the `applyConstraints()` method on a `MediaStreamTrack` to request the operating system to toggle the background blur effect to the camera’s video feed. The returned promise will resolve on success and reject on error.


The following code snippet illustrates how to control camera background blur on a media device that the user has granted access to.

```js
// Prompt the user to grant access to a camera.
const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// Show camera video feed to the user (optional).
document.querySelector("video").srcObject = stream;

// Check whether the user can toggle background blur in the web app.
// If not, note that you may still want to apply it through a fallback
// software solution.
const [track] = stream.getVideoTracks();
if (track.getCapabilities().backgroundBlur?.length === 2) {
  const button = document.querySelector("button");
  button.addEventListener("click", toggleBackgroundBlurButtonClick);
  button.disabled = false;
}

async function toggleBackgroundBlurButtonClick() {
  const constraints = {
    backgroundBlur: !track.getSettings().backgroundBlur,
  };
  // Request operating system to toggle background blur.
  await track.applyConstraints(constraints);
  const newSettings = track.getSettings();
  log(`Background blur is now ${newSettings.backgroundBlur ? "ON" : "OFF"}`);
}
```

## Platform support

The Background Blur API is available in Chrome&nbsp;114 on ChromeOS, macOS, and Windows.

ChromeOS and macOS currently only allow you to observe background blur changes that the user can make through their operating system UI such as the Control Center in macOS. Windows allows you to observe and control background blur.

## Demo

You can toggle background blur and observe changes by playing with the [official sample](https://googlechrome.github.io/samples/image-capture/background-blur.html). (As previously mentioned, the availability of those features relies on the platform's support.)

<figure class="screenshot">
  {% Video
    playsinline="true",
    src="video/vvhSqZboQoZZN9wBvoXq72wzGAf1/7KPKVoVLCabbNkdVWqpI.mp4",
    loop="true",
    autoplay="true",
    muted="true",
    controls="true"
  %}
  <figcaption>A web app observing camera background blur changes.</figcaption>
</figure>

## Feedback

Developer feedback is really important at this stage, so please [file issues on GitHub](https://github.com/w3c/mediacapture-extensions/issues/) with suggestions and questions.

We’d love to hear your thoughts on whether exposing background blur as a boolean value fits your needs, or if a more granular approach like "light", "strong", "off" would be more appropriate, even if it may not be compatible with what's exposed on all operating systems.

## Useful links

- [Explainer](https://github.com/riju/backgroundBlur/blob/main/explainer.md)
- [Specification](https://w3c.github.io/mediacapture-extensions/#exposing-mediastreamtrack-source-background-blur-support)
- [Chromium tracking bug](https://crbug.com/1338665)
- [ChromeStatus.com entry](https://chromestatus.com/feature/5077577782263808)
- [TAG Review](https://github.com/w3ctag/design-reviews/issues/826)
- [Intent to Experiment](https://groups.google.com/a/chromium.org/g/blink-dev/c/Jr9vE8mSS-8/m/ycIHIDZnCgAJ)

## Acknowledgements

Hero image by [Ayo Ogunseinde](https://unsplash.com/photos/sibVwORYqs0).
