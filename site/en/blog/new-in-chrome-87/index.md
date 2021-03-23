---
title: New in Chrome 87
description: >
  Chrome 87 is rolling out now! You can now control pan, tilt, and zoom on
  webcams that support it, range requests and service workers don't require
  as many workarounds, the font access API starts it's origin trial, and
  plenty more. Let's dive in and see what's new for developers in Chrome 87!
layout: 'layouts/blog-post.njk'
date: 2020-11-17
updated: 2020-11-23
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/xFjaDDkGd2mBReqdPxdy.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-87
---

Chrome 87 is starting to roll out to stable now.

{% YouTube id='NCKMMzVn1c8' %}

Here's what you need to know:

* [Chrome Dev Summit](#cds) is back on December 9 & 10.
* You can now control [pan, tilt, and zoom](#ptz) on webcams that support it.
* [Range requests](#rr) and service workers don't require as many workarounds.
* The [font access API](#font-access) starts it's origin trial.
* And, there's [plenty more](#more).

I'm [Pete LePage](https://twitter.com/petele), working, and shooting
from home, let's dive in and see what's new for developers in Chrome 87!

## Chrome Dev Summit {: #cds }

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/M6GzgK34vmmwUhsymAmI.png", alt="Chrome Dev Summit logo", className="float-right", height="311", width="800" %}

The Chrome Dev Summit is back on December 9th and 10th with its 8th chapter.
But this time, we're coming to you. We're bringing all the latest updates,
lots of new content, and plenty of Chromies.

There are a ton of [great talks][cds-schedule], workshops, office hours, etc,
and we'll be in the YouTube chat to answer your questions.
[Learn more][cds2020], and find out how you can not just watch, but participate!

## Camera pan, tilt, zoom {: #ptz }

Most meeting rooms at Google have cameras with pan, tilt, and zoom
capabilities, so that the camera can be pointed at the people in the
room. But it's not just fancy conference cameras that support PTZ - pan,
tilt, zoom - many web cams support it too.

Starting in Chrome 87, once a user has granted permission you can now control
the PTZ features on a camera.

Feature detection is a little different from what you're probably used to.
You'll need to call `navigator.mediaDevices.getSupportedConstraints()` to see
if the _browser_ supports PTZ.

```js
const supports = navigator.mediaDevices.getSupportedConstraints();

if (supports.pan && supports.tilt && supports.zoom) {
  // Browser supports camera PTZ.
}
```

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/CzXFGEZF3U05FAzXY42p.jpg", alt="Permission prompt for PTZ", className="float-right", height="382", width="800" %}

Then, like all other powerful APIs, the user will need to grant permission
to the camera, but also to PTZ functionality.

To request permission for PTZ functionality, call
`navigator.mediaDevices.getUserMedia()` with the PTZ constraints. This will
prompt the user to grant both regular camera and camera with PTZ permissions.

<br style="clear: both;" />

```js
try {
  const opts = {video: {pan: true, tilt: true, zoom: true}};
  const stream = await navigator.mediaDevices.getUserMedia(opts);
  document.querySelector("#video").srcObject = stream;
} catch (error) {
  // User denies prompt, or
  // matching media is not available.
}
```

Finally, a call to `MediaStreamTrack.getSettings()` will tell you what the
_camera_ supports.

```js
const [videoTrack] = stream.getVideoTracks();
const capabilities = videoTrack.getCapabilities();
const settings = videoTrack.getSettings();

if ('pan' in settings) {
  enablePan(capabilities, settings);
}
// Similar for tilt and zoom...
```

Once the user has granted permission, you can then call
`videoTrack.applyConstraints()` to adjust the pan, tilt, and zoom.

```js
function enablePan(capabilities, settings) {
  const input = document.getElementById('rangePan');
  input.min = capabilities.pan.min;
  input.max = capabilities.pan.max;
  input.step = capabilities.pan.step;
  input.value = settings.pan;

  input.addEventListener('input', async () => {
    const opts = { advanced: [{ pan: input.value }] };
    await videoTrack.applyConstraints(opts);
  });
}
```

Personally, I'm really excited about PTZ, so I can hide my messy kitchen, but
you'll have to check out the video to see that!

Francois has a great post [Control camera pan, tilt, and zoom][wd-ptz] on
web.dev with code samples, complete details the best way to request
permission, and a demo, so that you can try it out, and see if your webcam
supports PTZ.

## Range requests and service workers {: #rr }

[HTTP range requests][mdn-rr], which have been available in major browsers
for several years, allow servers to send requested data to the client in chunks.
This is especially useful for large media files, where the user experience is
improved through smoother playback, enhanced scrubbing, and better pause and
resume functions.

Historically, range requests and services workers did not work well together,
forcing developers to build work-arounds. Starting in Chrome 87, passing
range requests through to the network from inside a service worker will
"just work."

```js
self.addEventListener('fetch', (event) => {
  // The Range: header will pass through
  // in browsers that behave correctly.
  event.respondWith(fetch(event.request));
});
```

For an explanation of the issues with range requests and what's changed in
Chrome 87, see Jeff's article [Handling range requests in a service worker][wd-rr]
on web.dev.

## Origin Trial: Font access API {: #font-access }

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/x5qv7Ylxb9i2mtWkBwVt.png", alt="Screen shot of Photopea image editor", className="float-right", height="575", width="800" %}

Bringing design apps like Figma, Gravit Designer, and Photopea, to the web is great,
and we're seeing a lot more coming. While the web has the ability to offer a
plethora of fonts, not everything is available on the web.

For many designers, there are some fonts installed on their computer that are
critical to their work. For example, corporate logo fonts, or specialized
fonts for CAD and other design applications.

With the font access API, which starts an origin trial in Chrome 87, a site
can now enumerate the installed fonts, giving users access to all of the fonts
on their system.

<br style="clear: both;" />

```js
// Query for all available fonts and log metadata.
const fonts = navigator.fonts.query();
try {
  for await (const metadata of fonts) {
    console.log(`${metadata.family} (${metadata.fullName})`);
  }
} catch (err) {
  console.error(err);
}

// Roboto (Roboto Black)
// Roboto (Roboto Black Italic)
// Roboto (Roboto Bold)
```

And sites can hook in at lower levels to get access to the font bytes,
allowing them to do their own OpenType layout implementation, or perform
vector filters, or transforms, on the glyph shapes.

```js
const fonts = navigator.fonts.query();
try {
  for await (const metadata of fonts) {
    const sfnt = await metadata.blob();
    makeMagic(metadata.family, sfnt);
  }
} catch (err) {
  console.error(err);
}
```

Check out Tom's article [Use advanced typography with local fonts][wd-fonts]
on web.dev with all the details, and the link to the Origin Trial so you can
try it yourself.

## And more {: #more }

* Transferable Streams - `ReadableStream`, `WritableStream`, and
  `TransformStream` objects can now be passed as arguments to `postMessage()`.
* We've implemented the most granular `flow-relative` features of the CSS
  Logical Properties and Values spec, including shorthands and offsets to
  make these logical properties and values a bit easier to write.
  For example, a single `margin-block` property can replace separate
  `margin-block-start` and `margin-block-end` rules.
* New `@font-face` descriptors have been added to `ascent-override`,
  `descent-override`, and `line-gap-override` to override metrics of the font.
* There are several new `text-decoration` and `underline` properties.
* And there are a number of changes related to cross-origin isolation.

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 87.

* [What's new in Chrome DevTools (87)](/blog/new-in-devtools-87)
* [Chrome 87 deprecations & removals](https://developers.google.com/web/updates/2020/10/chrome-87-deps-rems)
* [ChromeStatus.com updates for Chrome 87](https://www.chromestatus.com/features#milestone%3D87)
* [What's new in JavaScript in Chrome 87](https://v8.dev/blog/v8-release-87)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/86.0.4240.75..87.0.4280.65)

## Subscribe {: .hide-from-toc }

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I'm Pete LePage, and as soon as Chrome 88 is released, I'll be right here to
tell you -- what's new in Chrome!

[wd-ptz]: https://web.dev/camera-pan-tilt-zoom/
[wd-fonts]: https://web.dev/local-fonts/
[mdn-rr]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests
[wd-rr]: https://web.dev/sw-range-requests/
[cds2020]: /devsummit/?utm_source=nic87&utm_medium=website
[cds-schedule]: /devsummit/schedule/?utm_source=nic87&utm_medium=website
