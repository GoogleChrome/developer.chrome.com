---
title: New in Chrome 94
description: >
  Chrome 94 is rolling out now! The default color space for `<canvas>`
  elements is now formally defined as SRGB, and you can change it to Display
  P3. There's a new, low level way to access built in audio and video codecs,
  important for streaming games, video editors, and such. WebGPU starts its
  origin trial. And, there's plenty more!
layout: 'layouts/blog-post.njk'
date: 2021-09-21
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/bFEcnAWdzNkXaSSp0hX4.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-94
---

{% YouTube id='c5XIDt90VgY' %}

Here's what you need to know:

* The [default color space](#canvas-colorspace) for `<canvas>` elements is
  now formally defined  in the spec as *SRGB*, and you can change it to
  *Display P3*.
* [WebCodecs](#webcodecs) is a new, low level way to access built in audio and
  video codecs, important for streaming games, video editors, and such.
* [WebGPU](#webgpu) starts its origin trial.
* The [PWA Summit](#pwa-summit) is coming up October 6-7.
* And there's plenty [more](#more).

I'm [Pete LePage](https://petelepage.com), working, and shooting
from home, let's dive in and see what's new for developers in Chrome 94.

## Default color space for `canvas` elements {: #canvas-colorspace }

How color is rendered on screen is critical to some users. For photographers,
print illustrators, and many others, the colors on screen need to match what's
printed. Starting in Chrome 94, [`<canvas>` elements are fully color managed][cs-canvas]
using *sRGB*. Previously, *sRGB* was convention, but not explicitly defined
in the spec.

```js
opts = {colorSpace:'display-p3'};
const ctx = canvas.getContext('2d', opts);
```

More importantly, you can now specify which color space to use when creating
a `<canvas>` rendering context 2d object, or an `ImageData` object, including
the P3 color space.

## WebCodecs {: #webcodecs }

Putting video on a page is easy enough. But, if you need to do something a
little more complex, and interact with the components of a video stream,
it's hard, and typically requires you to use Web Assembly to ship
[your own codecs][wasm-av1]!

But shipping your own codec means writing code the browser already has, and
it can't take advantage of hardware acceleration! The Web Codecs API makes it
possible to use the media components and codecs that are already in the browser.

Personally, I've always struggled to remember the correct command line switches
to encode a video for the web, or to convert a GIF to a video file. Using
the APIs available via WebCodecs, I could quickly build a web app that
reads a file and exports the correct files needed for the web.

<figure class="w-figure">
  {% Img src="image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/lEovMYp8oh1JSClCLCiD.png", alt="The path from a Canvas or an ImageBitmap to the network or to storage", width="800", height="393" %}
  <figcaption class="w-figcaption">
    The path from a <code>Canvas</code> or an <code>ImageBitmap</code> to the
    network or to storage
  </figcaption>
</figure>

Web apps that require full control over the way media content is processed,
like video editors, video conferencing, streaming apps, and so on. Access to
the browsers built in media controls is huge.

Showing anything useful in thirty seconds is hard, so check out
[Video processing with WebCodecs][wd-codecs] on web.dev for a deep dive with
lots of code and a few cool demos!

## WebGPU {: #webgpu }

WebGPU is a new API that exposes modern graphics capabilities, specifically
Direct3D 12, Metal, and Vulkan. You can think of it like WebGL, but it
provides access to more advanced features of the GPU, and it also provides
support for performing [general computations on the GPU][gpu-compute].

<figure class="w-figure">
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/WHoJmX2IU7roV4iabH6M.png", alt="Architecture diagram showing WebGPUs connection between OS APIs and Direct3D 12, Metal, and Vulkan.", width="800", height="313" %}
  <figcaption class="w-figcaption">
    WebGPU architecture diagram
  </figcaption>
</figure>

It's starting an [origin trial][ot-gpu] in Chrome 94, and both Safari and
Firefox are currently working on their implementations.

<figure class="w-figure">
  {% Video src="video/vvhSqZboQoZZN9wBvoXq72wzGAf1/Xb7LvsJ5e8efTssp94c6.mov", autoplay=true, muted=true, playsinline=true, loop=true %}
  <figcaption class="w-figcaption">
    A Babylon.js demo of a rough sea being simulated using WebGPU's compute
    shader capability.
  </figcaption>
</figure>

François has a great article, [Access modern GPU features with WebGPU][wd-gpu]
on web.dev with the details, and compares the performance of matrix
multiplication running on the CPU versus the GPU. Here's a hint. The
[GPU wins][wd-compute-perf].

## PWA Summit {: #pwa-summit }

The [PWA Summit][pwa-summit] is coming up October 6-7. It's a
a free, online conference focused on helping everyone succeed with Progressive
Web Apps. The PWA Summit is a collaboration between folks from a handful of
different companies involved in the creation of PWA technologies: Google,
Intel, Microsoft, and Samsung.

There are a ton of great talks and content. You can learn more and register at
[PWASummit.org][pwa-summit]. I hope to see you there!

## And more! {: #more }

Of course there's plenty more.

The prioritized [`scheduler.postTask()`][cs-scheduler] method allows you to
schedule tasks, and dynamically change their priorities, or cancel them all
together.

If you've ever fought with a re-layout when scroll bars appear, the
[`scrollbar-gutter`][cs-gutters] property will make you happy. It provides
control over the presence of scrollbar gutters, allowing you to prevent
layout changes as content expands.

The use of [WebSQL in **third-party** contexts is now deprecated][websql-3p],
and removal is expected in Chrome 97. Web SQL Database standard was abandoned
in November 2010. It was never implemented in Firefox, and was deprecated in
Safari in 2019. It will be deprecated and removed from Chrome when usage is
low enough. If you're still using WebSQL, now would be a good time to start
planning your migration off of it.

And the [virtual keyboard API][wd-vkeyboard] gives you more control over how
and when the virtual, on-screen keyboard is shown. It allows you to explicitly
control any scrolling behaviour, or changes to layout when the keyboard
appears or disappears.

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 94.

* [What's new in Chrome DevTools (94)](/blog/new-in-devtools-94/)
* [Chrome 94 deprecations & removals](/blog/deps-rems-94/)
* [ChromeStatus.com updates for Chrome 94](https://www.chromestatus.com/features#milestone%3D94)
* [What's new in JavaScript in Chrome 94](https://v8.dev/blog/v8-release-94)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/93.0.4577.69..94.0.4606.56)
* [Chrome release calendar](https://chromiumdash.appspot.com/schedule)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5)
to [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I'm Pete LePage, and as soon as Chrome 95 is released, I'll be right here to
tell you what's new in Chrome!

[wd-compute-perf]: https://web.dev/gpu-compute/#performance-findings
[wd-gpu]: https://web.dev/gpu/
[gpu-compute]: https://web.dev/gpu-compute/
[cs-canvas]: https://www.chromestatus.com/feature/5807007661555712
[wd-codecs]: https://web.dev/webcodecs/
[ot-gpu]: https://developer.chrome.com/origintrials/#/view_trial/118219490218475521
[wd-vkeyboard]: https://web.dev/virtualkeyboard/
[websql-3p]: https://www.chromestatus.com/feature/5684870116278272
[cs-gutters]: https://www.chromestatus.com/feature/5746559209701376
[cs-scheduler]: https://www.chromestatus.com/feature/6031161734201344
[pwa-summit]: https://pwasummit.org/
[wasm-av1]: https://github.com/GoogleChromeLabs/wasm-av1
