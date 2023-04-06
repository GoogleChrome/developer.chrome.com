---
layout: "layouts/doc-post.njk"
title: "Changelog for WebGPU"
description: "WebGPU release notes in Chrome"
subhead: "Keep track of WebGPU changes in in Chrome "
date: 2023-04-06
#updated: YYYY-MM-DD
authors:
 - beaufortfrancois
---

## Chrome 113

### WebGPU ships in Chrome

The [initial release of WebGPU](/blog/webgpu-release) is available on ChromeOS, macOS, and Windows.

### WebGPU WebCodecs integration

WebGPU exposes an API to create opaque "external texture" objects from `HTMLVideoElement`. These objects can be used to sample the video frames efficiently, potentially in a 0-copy way directly from the source YUV data.

However the WebGPU specification for the first version of WebGPU does not allow creating `GPUExternalTextures` from WebCodecs `VideoFrame` objects. This capability is important for advanced video processing applications that are already using WebCodecs and would like to integrate WebGPU in the video processing pipeline.

This [feature](https://chromestatus.com/feature/5078348864159744) adds support for using a `VideoFrame` as the source for a `GPUExternalTexture`.

```js
const externalTexture = gpuDevice.importExternalTexture({ source: videoFrame });
```

[Register for the WebGPU WebCodecs integration trial](/origintrials/#/view_trial/1705738358866575361).
