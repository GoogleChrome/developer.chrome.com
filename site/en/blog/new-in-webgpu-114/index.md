---
layout: "layouts/blog-post.njk"
title: "What's New in WebGPU (Chrome&nbsp;114)"
description: "JavaScript optimization and more."
hero: "image/vvhSqZboQoZZN9wBvoXq72wzGAf1/znYgV4QdntjZKrQLE1Zv.png"
alt: "What's new in WebGPU logo"
date: 2023-05-31
#updated: YYYY-MM-DD
authors:
  - beaufortfrancois
tags:
  - new-in-webgpu
  - webgpu
  - chrome-114
---

## Optimizing JavaScript

Chromium contributors sped up WebGPU performance for [`GPUComputePassEncoder`](https://developer.mozilla.org/docs/Web/API/GPUComputePassEncoder), [`GPURenderPassEncoder`](https://developer.mozilla.org/docs/Web/API/GPURenderPassEncoder), and [`GPUCommandEncoder`](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder) methods by reducing the overhead of making calls from generated code in V8 JavaScript engine to C++ handlers in Blink rendering engine. See [issue chromium:1417558](https://bugs.chromium.org/p/chromium/issues/detail?id=1417558).

The following microbenchmark shows CPU time of calls from JavaScript decreasing from around 0.5 ms per 10K draws to around 0.3 ms per 10K draws, which is a 40% improvement.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/1vHWXusRaLlkPgOb0nnO.png", alt="Screenshot of Chrome browser benchmark graph showing fast calls improvements.", width="800", height="216" %}
  <figcaption>
    Chrome benchmark graph showing fast calls improvements (<a href="https://chromeperf.appspot.com/report?sid=c5b915dc2e3d1d17cc76253f15839c488404af5ec02712361f80b45fca916689&start_rev=1121535&end_rev=1128342">source</a>).
  </figcaption>
</figure>

## getCurrentTexture() on unconfigured canvas throws InvalidStateError

Calling `GPUCanvasContext` `getCurrentTexture()` method on an unconfigured canvas now throws `InvalidStateError` instead of `OperationError` according to the [WebGPU spec](https://gpuweb.github.io/gpuweb/#dom-gpucanvascontext-getcurrenttexture). See [issue chromium:1424461](https://bugs.chromium.org/p/chromium/issues/detail?id=1424461).

```js
const context = document.querySelector("canvas").getContext("webgpu");
context.getCurrentTexture(); // Throws InvalidStateError
```

## WGSL updates

Zero-filled vectors of [AbstractInt](https://gpuweb.github.io/gpuweb/wgsl/#abstractint) can now be written as `vec2()`, `vec3()`, and `vec4()`. See [issue tint:1892](https://bugs.chromium.org/p/tint/issues/detail?id=1892). For example:

- `vec2()` is `vec2(0,0)`
- `vec3()` is `vec3(0,0,0)`
- `vec4()` is `vec4(0,0,0,0)`

## Dawn updates

### Improving error messages

Descriptor labels for invalid objects are not being dropped anymore so that you can see them in error messages. See [issue dawn:1771](https://bugs.chromium.org/p/dawn/issues/detail?id=1771).

### Add missing APIs for Node.js

The `GPUAdapter::requestAdapterInfo()` and `GPUBuffer::getMapState()` methods are now implemented for Node.js. See [issue dawn:1761](https://bugs.chromium.org/p/dawn/issues/detail?id=1761).

{% Partial 'webgpu/whats-new.md' %}
