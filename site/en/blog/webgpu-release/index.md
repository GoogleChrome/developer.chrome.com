---
layout: 'layouts/blog-post.njk'
title: 'Chrome ships WebGPU'
subhead: >
 After years of development, the Chrome team ships WebGPU which allows high-performance 3D graphics and data-parallel computation on the web.
description: >
 After years of development, the Chrome team ships WebGPU which allows high-performance 3D graphics and data-parallel computation on the web.
authors:
  - beaufortfrancois
  - cwallez
date: 2023-04-06
hero: image/vvhSqZboQoZZN9wBvoXq72wzGAf1/DV3geEz9FsEc3JiFPSY2.png
alt: Battle damaged Sci-fi helmet rendered with WebGPU.
tags:
  - chrome-113
  - webgpu
---

The Chrome team is thrilled to announce that WebGPU is now available by default in Chrome&nbsp;113, which is currently in the Beta channel. WebGPU is a new web graphics API that offers significant benefits such as greatly reduced JavaScript workload for the same graphics and more than three times improvements in machine learning model inferences. This is possible due to more flexible GPU programming and access to advanced capabilities that WebGL does not provide.

This initial release of WebGPU is available on ChromeOS, macOS, and Windows. Support for other platforms is coming later this year.

## A new dawn for web graphics

WebGPU is a new API for the web, which exposes modern hardware capabilities and allows rendering and computation operations on a GPU, similar to Direct3D 12, Metal, and Vulkan. Unlike the WebGL family of APIs, WebGPU offers access to more advanced GPU features and provides first-class support for general computations on the GPU. The API is designed with the web platform in mind, featuring an idiomatic JavaScript API, integration with promises, support for importing videos, and a polished developer experience with great error messages.

This initial release of WebGPU serves as a building block for future updates and enhancements. The API will offer more advanced graphics features, and developers are encouraged to send [requests for additional features](https://github.com/gpuweb/gpuweb/issues). The Chrome team also plans to provide deeper access to shader cores for even more machine learning optimizations and additional ergonomics in WGSL, the WebGPU Shading Language.

WebGPU is the result of a collaborative effort by the [W3C's "GPU for the Web" Community Group](https://www.w3.org/community/gpu/), which includes contributions from major companies such as Mozilla, Apple, Intel, and Microsoft. After six years of development ([90 contributors, 2000 commits,
3000 issues](https://github.com/gpuweb/gpuweb/graphs/contributors)), from the initial design in 2017, the first implementation is now available in Chrome, with support for Firefox and Safari in progress.

Both the [Dawn](https://dawn.googlesource.com/dawn) library for Chromium and the [wgpu](https://github.com/gfx-rs/wgpu) library for Firefox are available as standalone packages, and they offer great portability and ergonomic layers that abstract OS GPU APIs. Using these libraries in native applications also makes it easier to port to [WASM](https://webassembly.org/) through [Emscripten](https://emscripten.org/) and [Rust web-sys](https://rustwasm.github.io/wasm-bindgen/web-sys/index.html).

## Browser support

This initial release of WebGPU is available in Chrome&nbsp;113 on ChromeOS devices with Vulkan support, Windows devices with Direct3D 12 support, and macOS. Linux, Android, and expanded support for existing platforms will come soon.

WebGPU is currently a work-in-progress in [Firefox](https://hacks.mozilla.org/2020/04/experimental-webgpu-in-firefox/) and [Safari](https://github.com/WebKit/WebKit/commits/main/Source/WebCore/Modules/WebGPU), in addition to the initial implementation in Chrome.

## Library support

Many widely used WebGL libraries are already in the process of implementing WebGPU support or have already done so. This means that using WebGPU may only require making a single line change:
- [Babylon.js](https://doc.babylonjs.com/setup/support/webGPU) has full WebGPU support already.
- [PlayCanvas](https://blog.playcanvas.com/initial-webgpu-support-lands-in-playcanvas-engine-1-62/) announced initial WebGPU support.
- [TensorFlow.js](https://www.npmjs.com/package/@tensorflow/tfjs-backend-webgpu) supports WebGPU-optimized versions of most operators.
- [Three.js](https://threejs.org) WebGPU support is underway, see [examples](https://threejs.org/examples/?q=webgpu#webgpu_particles).

## Resources

WebGPU is a significant technology, and we recommend the following resources to learn more:
- Check out the W3C specifications for [WebGPU](https://gpuweb.github.io/gpuweb/) and [WGSL](https://gpuweb.github.io/gpuweb/wgsl/).
- Experiment with [samples](https://webgpu.github.io/webgpu-samples/) and explore WGSL with a [tour](https://google.github.io/tour-of-wgsl/).
- Look at the [MDN documentation](https://developer.mozilla.org/docs/Web/API/WebGPU_API).
- Read the official [explainer](https://gpuweb.github.io/gpuweb/explainer/) and [best practices](https://toji.dev/webgpu-best-practices/).
- Learn about [GPU compute](/articles/gpu-compute/) and [more](https://surma.dev/things/webgpu/index.html).

## Acknowledgments

Many thanks to all Chromium contributors and especially to Intel folks for their invaluable support in making this possible.
