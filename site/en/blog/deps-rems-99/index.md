---
title: Deprecations and removals in Chrome 99
description: >
  A round up of the deprecations and removals in Chrome 99 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2022-02-03
updated: 2022-02-03
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/km2rEb4m5xmqo3Y2KVMn.png'
alt: >
  Deprecations and Removals hero logo
tags:
  - deprecations
  - removals
  - chrome-99
---

{% include 'partials/see-all-dep-rem.md' %}

Chrome 99 beta was released on February 3, 2022 and is expected to become the
stable version in early March, 2022.

## Remove Battery Status API on Insecure Origins

[Battery Status API is no longer supported on insecure origins](https://chromestatus.com/feature/4878376799043584),
such as HTTP pages or HTTPS iframes embedded in HTTP pages. The Battery Status
API allows web developers to access, among other things, a system's battery
charging level and whether it is being charged. It is a powerful feature that
has been around for over a decade and, as such, was originally designed with
different security constraints.

## Remove font-family -webkit-standard

This version of Chrome
[removes support for the `font-family` value `"-webkit-standard"](https://www.chromestatus.com/feature/5639265565278208)`.
This value is merely an alias for the proprietary keyword `"-webkit-body"` and
is only exposed because it's inherited from WebKit. Removing this improves
alignment with the CSS specifications and with Firefox.

## Remove GamepadList

The
`[navigator.getGamepads()](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getGamepads)`
method now returns an array of
`[Gamepad](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad)` objects
[instead of a GamepadList](https://www.chromestatus.com/feature/5693119438782464).
`GamepadList` is no longer supported in Chrome. This brings Chrome in line with
spec and with Gecko and Webkit. For information on Gamepads generally, see [Play
the Chrome dino game with your gamepad](https://web.dev/gamepad/).

## Remove minor WebCodecs spec violations

Chrome has [removed two
items](https://www.chromestatus.com/feature/5667793157488640) that do not
conform to recent changes in the WebCodecs spec.

The `EncodedVideoChunkOutputCallback()` method takes an
`EncodedVideoChunkMetadata` dictionary. Previously a member called
temporalLayerId was located at `EncodedVideoChunkMetadata.temporalLayerId`. In
conformance with the spec, it is now located at
`EncodedVideoChunkMetadata.SvcOutputMetadata.temporalLayerId`.

The spec requires that the `VideoFrame()` constructor include a timestamp
argument (`VideoFrameInit.timestamp`) for `CanvasImageSource` types that don't
implicitly have a timestamp (e.g. `HTMLCanvasElement`). Failing to include the
timestamp should result in a `TypeError`, but Chrome previously defaulted the
timestamp to zero. This seems helpful, but is problematic if you then send the
`VideoFrame` to a `VideoEncoder`, where timestamps are used to guide bitrate
control.

## Remove the document.domain setter

The `document.domain` setter, which allows developers to relax the same-origin
policy [has been removed](https://chromestatus.com/feature/5428079583297536).
This setter complicates the fundamental security boundary Chrome aims to
maintain, and puts roadblocks in the way of post-Spectre changes to Chromium's
process model.

[Chromium's threat model](chromium.googlesource.com/chromium/src/+/master/docs/security/side-channel-threat-model.md)
requires us to consider a process as the only defensible security boundary. To
that end, aligning origins with processes is paramount. The `document.domain`
setter makes this a difficult task, as we don't know whether the same-origin
policy will be relaxed until runtime, when it's too late to change the process
into which a document has committed. We have some opt-out mechanisms; ideally
this would switch to an opt-in.

{% include 'partials/deprecations-policy.md' %}
