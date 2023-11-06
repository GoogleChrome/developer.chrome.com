---
layout: "layouts/blog-post.njk"
title: "What's New in WebGPU (Chrome&nbsp;119)"
description: "Filterable 32-bit float textures, unorm10-10-10-2 vertex format, rgb10a2uint texture format, and more."
hero: "image/vvhSqZboQoZZN9wBvoXq72wzGAf1/wl2nb6hZ75H1Ym5be9B6.png"
alt: "What's new in WebGPU logo"
date: 2023-10-24
#updated: YYYY-MM-DD
authors:
  - beaufortfrancois
tags:
  - new-in-webgpu
  - webgpu
  - chrome-119
---

## Filterable 32-bit float textures

32-bit floating-point textures are used to store high-precision data, such as HDR images and depth maps. They are especially important for GPUs used in high-end gaming and professional applications.

Filterable 32-bit float textures support describes the ability of a GPU to filter 32-bit floating-point textures. This means that the GPU can smooth out the edges of floating-point textures, making them appear less jagged. It is similar to the "OES_texture_float_linear" extension in WebGL.

Not all GPUs support filterable 32-bit float textures. When the `"float32-filterable"` feature is available in a `GPUAdapter`, you can now request a `GPUDevice` with this feature and filter textures with "r32float", "rg32float", and "rgba32float" formats. See the following example and [issue dawn:1664](https://bugs.chromium.org/p/dawn/issues/detail?id=1664).

```js
const adapter = await navigator.gpu.requestAdapter();
if (!adapter.features.has("float32-filterable")) {
  throw new Error("Filterable 32-bit float textures support is not available");
}
// Explicitly request filterable 32-bit float textures support.
const device = await adapter.requestDevice({
  requiredFeatures: ["float32-filterable"],
});

// Create a sampler with linear filtering.
const sampler = device.createSampler({
  magFilter: "linear",
});

// Create a texture with rgba32float format.
const texture = device.createTexture({
  size: [100, 100],
  format: "rgba32float",
  usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.TEXTURE_BINDING,
});

// Write data to texture, create a bindgroup with sampler and texture and
// send the appropriate commands to the GPU....
```

## unorm10-10-10-2 vertex format

A new vertex format called "unorm10-10-10-2" aka "rgb10a2" has been added to the [WebGPU specification](https://gpuweb.github.io/gpuweb/#dom-gpuvertexformat-unorm10-10-10-2). It consists of one packed 32-bit value with four normalized unsigned integer values, arranged as 10 bits, 10 bits, 10 bits, and 2 bits. See the following example and [issue dawn:2044](https://bugs.chromium.org/p/dawn/issues/detail?id=2044).

```js
// Define the layout of vertex attribute data with unorm10-10-10-2 format.
const buffers = [
  {
    arrayStride: 0,
    attributes: [
      { format: "unorm10-10-10-2", offset: 0, shaderLocation: 0 },
    ],
  },
];

// Describe the vertex shader entry point and its input buffer layouts.
const vertex = {
  module: myVertexShaderModule,
  entryPoint: "main",
  buffers,
};

// Pass vertex to device.createRenderPipeline() and
// use vec4<f32> type in WGSL shader code to manipulate data.
```

## rgb10a2uint texture format

A new texture format called "rgb10a2uint" has been added to the [WebGPU specification](https://gpuweb.github.io/gpuweb/#dom-gputextureformat-rgb10a2uint). It consists of a 32-bit packed pixel format with four unsigned integer components: 10-bit red, 10-bit green, 10-bit blue, and 2-bit alpha. See the following example and [issue dawn:1936](https://bugs.chromium.org/p/dawn/issues/detail?id=1936).

```js
// Create a texture with rgb10a2uint format.
const texture = device.createTexture({
  size: [100, 100],
  format: "rgb10a2uint",
  usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.TEXTURE_BINDING,
});

// Write data to texture, create a bindgroup with texture and
// send the appropriate commands to the GPU....
```

## Dawn updates

Timestamp queries allow WebGPU applications to measure precisely (down to the nanosecond) how much time their GPU commands take to execute. The API shape to capture timestamps queries at the beginning and end of passes have been updated to match the WebGPU specification. See the following example and [issue dawn:1800](https://bugs.chromium.org/p/dawn/issues/detail?id=1800).

```cpp
// Create a timestamp query set that will store the timestamp values.
wgpu::QuerySetDescriptor querySetDescriptor = {
    .count = 2,
    .type = wgpu::QueryType::Timestamp};
wgpu::QuerySet querySet = device.CreateQuerySet(&querySetDescriptor);

wgpu::RenderPassTimestampWrites timestampWrites = {
    .querySet = querySet,
    .beginningOfPassWriteIndex = 0,
    .endOfPassWriteIndex = 1};
wgpu::ComputePassDescriptor pass{.timestampWrites = &timestampWrites};

// Write the queue timestamp into beginningOfPassWriteIndex and
// endOfPassWriteIndex of myQuerySet respectively before and after the pass
// commands execute.
myEncoder.BeginComputePass(&pass);
```

This covers only some of the key highlights. Check out the exhaustive [list of commits](https://dawn.googlesource.com/dawn/+log/chromium/5993..chromium/6045).

{% Partial 'webgpu/whats-new.md' %}
