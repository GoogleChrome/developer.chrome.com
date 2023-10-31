---
layout: "layouts/blog-post.njk"
title: "What's New in WebGPU (Chrome&nbsp;117)"
description: "Unset vertex buffer and bind group, make lost devices appear to function, and more."
hero: "image/vvhSqZboQoZZN9wBvoXq72wzGAf1/4CJvqJwPMVdfWPvDLLa4.png"
alt: "What's new in WebGPU logo"
date: 2023-09-05
#updated: YYYY-MM-DD
authors:
  - beaufortfrancois
tags:
  - new-in-webgpu
  - webgpu
  - chrome-117
---

## Unset vertex buffer

Passing `null` rather than a [`GPUBuffer`](https://developer.mozilla.org/docs/Web/API/GPUBuffer) to `setVertexBuffer()` on [`GPURenderPassEncoder`](https://developer.mozilla.org/docs/Web/API/GPURenderPassEncoder/setVertexBuffer) or [`GPURenderBundleEncoder`](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/setVertexBuffer) allows you to unset a previously set vertex buffer in a given slot. See [issue dawn:1675](https://bugs.chromium.org/p/dawn/issues/detail?id=1675).

```js
// Set vertex buffer in slot 0.
myRenderPassEncoder.setVertexBuffer(0, myVertexBuffer);

// Then later, unset vertex buffer in slot 0.
myRenderPassEncoder.setVertexBuffer(0, null);
```

## Unset bind group

Passing `null` rather than a [`GPUBindGroup`](https://developer.mozilla.org/docs/Web/API/GPUBindGroup) to `setBindGroup()` on [`GPURenderPassEncoder`](https://developer.mozilla.org/docs/Web/API/GPURenderPassEncoder/setBindGroup) or [`GPURenderBundleEncoder`](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/setBindGroup) allows you to unset a previously set bind group in a given slot. See [issue dawn:1675](https://bugs.chromium.org/p/dawn/issues/detail?id=1675).

```js
// Set bing group in slot 0.
myRenderPassEncoder.setBindGroup(0, myBindGroup);

// Then later, unset bind group in slot 0.
myRenderPassEncoder.setBindGroup(0, null);
```

## Silence errors from async pipeline creation when device is lost

The [`createComputePipelineAsync()`](https://developer.mozilla.org/docs/Web/API/GPUDevice/createComputePipelineAsync) and [`createRenderPipelineAsync()`](https://developer.mozilla.org/docs/Web/API/GPUDevice/createRenderPipelineAsync) methods of `GPUDevice` return a promise which resolves when the creation of the pipeline has completed. From now on, errors from async pipeline creation will be silenced when the `GPUDevice` is [`lost`](https://developer.mozilla.org/docs/Web/API/GPUDevice/lost) to make lost devices appear to function as much as possible. See [dawn issue:1874](https://bugs.chromium.org/p/dawn/issues/detail?id=1874).

## SPIR-V shader module creation updates

Creating a [SPIR-V](https://en.wikipedia.org/wiki/Standard_Portable_Intermediate_Representation) shader module with [`createShaderModule()`](https://developer.mozilla.org/docs/Web/API/GPUDevice/createShaderModule) now throws a TypeError unless you run Chrome with the "Unsafe WebGPU Support" [flag](/docs/web-platform/chrome-flags/) as SPIR-V is not part of the WebGPU specification. Prior to this change using SPIR-V would cause a [GPUInternalError](https://gpuweb.github.io/gpuweb/#gpuinternalerror) to be generated instead.
See [change chromium:4711911](https://chromium-review.googlesource.com/c/chromium/src/+/4711911).

## Improving developer experience

The validation error message for bind group layout bindings in vertex shader has been improved for read-write storage buffer and write-only storage texture bindings. See [issue dawn:1883](https://bugs.chromium.org/p/dawn/issues/detail?id=1883).

## Caching pipelines with automatically generated layout

Pipelines created with `createRenderPipeline({ layout: "auto" })` now take advantage of caching mechanisms in Chrome. It means that these pipelines will be created more efficiently and will use less memory. See [issue dawn:1933](https://bugs.chromium.org/p/dawn/issues/detail?id=1933).

## Dawn updates

The `wgpu::RequestAdapterOptionsBackendType` is now part of `wgpu::RequestAdapterOptions` to make it easier for applications to request a particular backend when getting an adapter. See the following example and [issue dawn:1875](https://bugs.chromium.org/p/dawn/issues/detail?id=1875).

```cpp
wgpu::RequestAdapterOptions options = {
    .backendType = wgpu::BackendType::D3D12};

// Request D3D12 adapter.
myInstance.RequestAdapter(&options, myCallback, myUserData);
```

Several additional methods have been implemented for Node.js. See [change dawn:142465](https://dawn-review.googlesource.com/c/dawn/+/142465).

The [webgpu.h](https://github.com/webgpu-native/webgpu-headers/blob/main/webgpu.h) C API has changed its type for boolean values from `stdbool` to `WGPUBool`, which is a `uint32_t`. This change was made to ensure that the API has an equivalent [ABI](https://en.wikipedia.org/wiki/Application_binary_interface) in C and C++.

This covers only some of the key highlights. Check out the exhaustive [list of commits](https://dawn.googlesource.com/dawn/+log/chromium/5845..chromium/5938).

{% Partial 'webgpu/whats-new.md' %}
