---
title: Deprecations and removals in Chrome 99
description: >
  A round up of the deprecations and removals in Chrome 99 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2022-02-03
updated: 2022-02-04
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/km2rEb4m5xmqo3Y2KVMn.png'
alt: >
  Deprecations and Removals hero logo
tags:
  - deprecations-removals
  - chrome-99
---

{% Partial 'see-all-dep-rem.md' %}

Chrome 99 beta was released on February 3, 2022 and is expected to become the
stable version in early March, 2022.

## Remove Battery Status API on insecure origins

[Battery Status API is no longer supported on insecure origins](https://chromestatus.com/feature/4878376799043584),
such as HTTP pages or HTTPS iframes embedded in HTTP pages. The Battery Status
API allows web developers to access, among other things, a system's battery
charging level and whether it is being charged. It is a powerful feature that
has been around for over a decade and, as such, was originally designed with
different security constraints.

## Remove font-family -webkit-standard

This version of Chrome
[removes support for the `font-family` value `"-webkit-standard"`](https://www.chromestatus.com/feature/5639265565278208).
This value is merely an alias for the proprietary keyword `"-webkit-body"` and
is only exposed because it's inherited from WebKit. Removing this improves
alignment with the CSS specifications and with Firefox.

## Remove GamepadList

The
[`navigator.getGamepads()`](https://developer.mozilla.org/docs/Web/API/Navigator/getGamepads)
method now returns an array of
[`Gamepad`](https://developer.mozilla.org/docs/Web/API/Gamepad) objects
[instead of a GamepadList](https://www.chromestatus.com/feature/5693119438782464).
`GamepadList` is no longer supported in Chrome. This brings Chrome in line with
specification and with Gecko and Webkit. For information on Gamepads generally, see [Play
the Chrome dino game with your gamepad](https://web.dev/gamepad/).

## Update WebCodecs to match the specification

Chrome has [removed two
items](https://www.chromestatus.com/feature/5667793157488640) because of
recent changes in the WebCodecs specification.

The `EncodedVideoChunkOutputCallback()` method takes an
`EncodedVideoChunkMetadata` dictionary. Previously a member called
`temporalLayerId` was located at `EncodedVideoChunkMetadata.temporalLayerId`. In
line with the specification, it is now located at
`EncodedVideoChunkMetadata.SvcOutputMetadata.temporalLayerId`.

The specification requires that the `VideoFrame()` constructor include a timestamp
argument (`VideoFrameInit.timestamp`) for `CanvasImageSource` types that don't
implicitly have a timestamp (for example, `HTMLCanvasElement`). Failing to include the
timestamp should result in a `TypeError`, but Chrome previously defaulted the
timestamp to zero. This seems helpful, but is problematic if you then send the
`VideoFrame` to a `VideoEncoder`, where timestamps are used to guide bitrate
control.

{% Partial 'deprecations-policy.md' %}
