---
title: Chrome 113 beta
description: >
  New CSS media features, the linear() easing function, and WebGPU.
subhead: >
  New CSS media features, the linear() easing function, and WebGPU.
layout: 'layouts/blog-post.njk'
date: 2023-04-06 
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/MYpMWroPXERbeqC3LbZS.png'
alt: >
  Chrome 113 beta hero logo
tags:
  - beta
  - chrome-113
---

Unless otherwise noted, changes described below apply to the newest Chrome beta channel release for Android, ChromeOS, Linux, macOS, and Windows. Learn more about the features listed here through the provided links or from the list on ChromeStatus.com. Chrome 113 is beta as of 6 April, 2023. You can download the latest on [Google.com](https://www.google.com/chrome/beta/) for desktop or on Google Play Store on Android.

## CSS

This release adds four new CSS features.

### CSS overflow media features

Chrome 113 includes the [`overflow-inline`](https://developer.mozilla.org/docs/Web/CSS/@media/overflow-inline) and [`overflow-block`](https://developer.mozilla.org/docs/Web/CSS/@media/overflow-inline) media features. They enable testing of how a device handles content that overflows the initial containing block. 

### CSS `update` media feature

The [`update`](https://developer.mozilla.org/docs/Web/CSS/@media/update-frequency) media feature enables the creation of styles for print, slow, and fast output displays: 

- `print`: Documents on paper.
- `slow`: Includes e-ink and underpowered displays.
- `fast`: Regular computer displays. 

### The `linear()` easing function

The [`linear()`](https://developer.mozilla.org/docs/Web/CSS/easing-function#linear_easing_function) easing function enables linear interpolation between a number of points. This enables more complex animations such as bounce and elastic effects.

### The image-set() type

The [image-set()](https://developer.mozilla.org/docs/Web/CSS/image/image-set) functional notation is a CSS type for specifying a range of image options, such as different images for different screen densities, and letting the browser select the best one. It can be used with CSS properties such as background-image.

Chrome 113 adds the unprefixed `image-set` type so authors no longer need to use `-webkit-image-set`. The implementation has also been brought up to the current spec with new resolution units (`dppx`, `dpi`, and `dpcm`), image type support (for example, `type("image/avif")`), raw urls without `url()`, and gradient image options.

## Web APIs

### Fetch: Headers.getSetCookie()

Adds a way to get the values of multiple `Set-Cookie` headers without combining them. In HTTP, `Set-Cookie` is a special header for historical reasons because it can appear multiple times in a response but cannot be combined, unlike other headers. Headers objects don't currently support having multiple values of the `Set-Cookie` header, and this feature adds that capability. 

### WebAuthn: Large blob storage extension (largeBlob)

This release has support for the [WebAuthn](https://developer.mozilla.org/docs/Web/API/Web_Authentication_API) largeBlob extension. This extension allows relying parties to store opaque data associated with a credential.

### WebGPU

[WebGPU](/blog/webgpu-release/) is the successor to the WebGL and WebGL 2 graphics APIs for the Web. It provides modern features such as GPU compute, lower overhead access to GPU hardware, the ability to render to multiple canvases from a single graphics device, and better, more predictable performance.

[Comprehensive documentation for WebGPU](https://developer.mozilla.org/docs/Web/API/WebGPU_API) can be found on MDN.

## Private State Token API

The [Private State Token API](/docs/privacy-sandbox/trust-tokens/) is a new API (formerly known as the Trust Token API) for propagating user signals across sites, without using cross-site persistent identifiers like third party cookies for anti-fraud purposes. Anti-fraud methods that rely on third party cookies will not work once third party cookies are depreciated. The motivation of this API is to provide means to fight fraud in a world with no third party cookies. 

Private State Token API does not generate or define anti-fraud signals. This is up to the corresponding first party and the token issuers. The API enforces limits on the information transferred in these signals for privacy concerns. The Private State Token API is based on the Privacy Pass protocol from the [IETF working group](https://datatracker.ietf.org/wg/privacypass/about/). It can be considered as a web-exposed form of the Privacy Pass protocols. 

{% Aside %}
This API will be rolled out slowly to users over a number of weeks to enable testing and evaluation.
{% endAside %}


## Origin trials in progress

In Chrome 113 you can opt into the following new [origin trials](/docs/web-platform/origin-trials/). 

### Deprecation trial for WebRTC Callback-based legacy getStats()

`RTCPeerConnection` has two versions of `getStats()`, one that is spec-compliant returning the report via resolving a promise, and one that is non-standard returning a very different report via a callback as the first argument. The callback-based one will soon be removed. This deprecation trial is available from Chrome 113 to 121 for apps that require more time.

[Register for the legacy getStats() deprecation trial](/origintrials/#/view_trial/3633278999381147649).

### WebGPU WebCodecs integration

WebGPU exposes an API to create opaque "external texture" objects from `HTMLVideoElement`. These objects can be used to sample the video frames efficiently, potentially in a 0-copy way directly from the source YUV data.

However the WebGPU specification for the first version of WebGPU does not allow creating `GPUExternalTextures` from WebCodecs `VideoFrame` objects. This capability is important for advanced video processing applications that are already using WebCodecs and would like to integrate WebGPU in the video processing pipeline.

This feature adds support for using a `VideoFrame` as the source for a `GPUExternalTexture`.

[Register for the WebGPU WebCodecs integration trial](/origintrials/#/view_trial/1705738358866575361).

## Deprecations and removals

This version of Chrome introduces the deprecations and removals listed below. Visit ChromeStatus.com for lists of planned deprecations, current deprecations and previous removals.

This release of Chrome deprecates two features.

### Secure Payment Confirmation: Rename `rp` to `rpId` in `CollectedClientAdditionalPaymentData`

Secure Payment Confirmation (SPC) is a Web API to support streamlined authentication during a payment transaction. It builds on top of WebAuthn to bring strong authentication to payment flows. In the initial spec and implementation of SPC, the output `CollectedClientAdditionalPaymentData` dictionary of the cryptogram contained a parameter named `rp`. This was renamed in the specification to `rpId` to align with WebAuthn, and Chrome is changing its implementation to match (that is, adding `rpId` and removing `rp`).

### Deprecate the `document.domain` setter

The `document.domain` setter allows developers to relax the same-origin policy, complicating the fundamental security boundary we aim to maintain. The `document.domain` setter will now be opt-in via [`Origin-keyed agent clusters`](https://chromestatus.com/features/5683766104162304). The setter will remain, but the origin remains unchanged.
