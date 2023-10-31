---
layout: "layouts/blog-post.njk"
title: "What's New in WebGPU (Chrome&nbsp;113)"
description: "WebGPU ships in Chrome with WebCodecs integration in origin trial."
hero: "image/vvhSqZboQoZZN9wBvoXq72wzGAf1/CSlUvgWseW4EHsIDJhTD.png"
alt: "What's new in WebGPU logo"
date: 2023-04-26
#updated: YYYY-MM-DD
authors:
  - beaufortfrancois
tags:
  - new-in-webgpu
  - webgpu
  - chrome-113
  - media
  - video
---

After years of development, the Chrome team announces that the first release of WebGPU is now available by default in Chrome on ChromeOS, macOS, and Windows. Check out [Chrome ships WebGPU](/blog/webgpu-release) to learn more.

We've also started adding [comprehensive documentation for WebGPU](https://developer.mozilla.org/docs/Web/API/WebGPU_API) on MDN.

And there's more.

## Use WebCodecs `VideoFrame` source in `importExternalTexture()`

WebGPU exposes an API to create opaque "external texture" objects from `HTMLVideoElement` through [`importExternalTexture()`](https://www.w3.org/TR/webgpu/#dom-gpudevice-importexternaltexture). You can use these objects to sample the video frames efficiently, potentially in a 0-copy way directly from the source YUV data.

However, the initial WebGPU specification does not allow creating `GPUExternalTexture` objects from WebCodecs [`VideoFrame`](https://developer.mozilla.org/docs/Web/API/VideoFrame) objects. This capability is important for advanced video processing apps that already use WebCodecs and would like to integrate WebGPU in the video processing pipeline. Discussion is currently happening in the [gpuweb/gpuweb#1380](https://github.com/gpuweb/gpuweb/issues/1380) issue.

### Enable the feature

By default, this [feature](https://chromestatus.com/feature/5078348864159744) is not enabled in Chrome, but it can be experimented with in Chrome&nbsp;113 by explicitly enabling the functionality. You can activate it locally by enabling the "WebGPU Developer Features" [flag](/docs/web-platform/chrome-flags/#chromeflags) at `chrome://flags/#enable-webgpu-developer-features`.

To enable it for all visitors to your app, an [origin trial](/origintrials/#/view_trial/1705738358866575361) is currently underway and set to end in Chrome&nbsp;118 (December 8, 2023).  To participate in the trial, sign up and include a meta element with the origin trial token in either the HTML or HTTP header. For more information, refer to the [Get started with origin trials](/docs/web-platform/origin-trials/) post.

### Sample code

```js
// Access the GPU device.
const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();

// Create VideoFrame from HTMLVideoElement.
const video = document.querySelector("video");
const videoFrame = new VideoFrame(video);

const texture = device.importExternalTexture({ source: videoFrame });
// TODO: Use texture in bind group creation.
```

Check out the [Video Uploading with WebCodecs](https://webgpu.github.io/webgpu-samples/samples/videoUploadingWebCodecs) experimental sample to play with it.

{% Partial 'webgpu/whats-new.md' %}
