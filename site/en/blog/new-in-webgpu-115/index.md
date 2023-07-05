---
layout: "layouts/blog-post.njk"
title: "What's New in WebGPU (Chrome&nbsp;115)"
description: "Supported WGSL language extensions, experimental support for Direct3D 11, and more."
hero: "image/vvhSqZboQoZZN9wBvoXq72wzGAf1/IOiG6dNWepqrGWtntbBx.png"
alt: "What's new in WebGPU logo"
date: 2023-06-20
updated: 2023-06-26
authors:
  - beaufortfrancois
tags:
  - new-in-webgpu
  - webgpu
  - chrome-115
---

## Supported WGSL language extensions

The [`wgslLanguageFeatures`](https://www.w3.org/TR/webgpu/#gpuwgsllanguagefeatures) member of the [`GPU`](https://developer.mozilla.org/docs/Web/API/GPU) object lists the names of supported WGSL [language extensions](https://gpuweb.github.io/gpuweb/wgsl/#language-extension). Supported WGSL language extensions are automatically enabled, therefore you don’t need to explicitly request one. This list is currently empty but you can expect plenty of them in the future (for example, `do-while loops`). See [issue dawn:1777](https://bugs.chromium.org/p/dawn/issues/detail?id=1777).

```js
if (navigator.gpu.wgslLanguageFeatures?.has("unknown-feature")) {
  // Use unknown-feature in WGSL shader code.
}
```

## Unset vertex buffer

Passing `null` rather than a [`GPUBuffer`](https://developer.mozilla.org/docs/Web/API/GPUBuffer) to `setVertexBuffer()` on [`GPURenderPassEncoder`](https://developer.mozilla.org/docs/Web/API/GPURenderPassEncoder/setVertexBuffer) or [`GPURenderBundleEncoder`](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/setVertexBuffer) allows you to unset a previously set vertex buffer in a given slot. See [issue dawn:1675](https://bugs.chromium.org/p/dawn/issues/detail?id=1675).

```js
// Set vertex buffer in slot 0.
myRenderPassEncoder.setVertexBuffer(0, myVertexBuffer);

// Then later, unset vertex buffer in slot 0.
myRenderPassEncoder.setVertexBuffer(0, null);
```

## Experimental support for Direct3D 11

The Chromium team is working on adding WebGPU support for Direct3D 11. You can now experiment with it locally by running Chrome on Windows with the `--enable-unsafe-webgpu --use-webgpu-adapter=d3d11` command-line flags. See [issue dawn:1705](https://bugs.chromium.org/p/dawn/issues/detail?id=1705).

## Get discrete GPU by default on AC power 

On dual GPU macOS devices, if [`requestAdapter()`](https://developer.mozilla.org/docs/Web/API/GPU/requestAdapter) is called without a [`powerPreference`](https://developer.mozilla.org/docs/Web/API/GPU/requestAdapter#powerpreference) option, the discrete GPU is returned when the user’s device is on AC power. Otherwise, the integrated GPU is returned. See [change 4499307]( https://chromium-review.googlesource.com/c/chromium/src/+/4499307).

## Improving developer experience 
 
### New DevTools warnings

If the `depth` key is used in a `GPUExtend3DDict` a warning is shown in the DevTools Console since the correct key is `depthOrArrayLayers`. See [issue chromium:1440900](https://bugs.chromium.org/p/chromium/issues/detail?id=1440900).

A warning is also raised if  a `GPUBlendComponent` has a mix of explicit and defaulted members. See [issue dawn:1785](https://bugs.chromium.org/p/dawn/issues/detail?id=1785).

Even though zero-size dispatches and draws are valid, a warning encourages developers to avoid them when possible. See [issue dawn:1786](https://bugs.chromium.org/p/dawn/issues/detail?id=1786).

### Better error messages 
 
An improved error message is now provided when using a `GPUCommandEncoder` if [`finish()`](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/finish) has been called already. See [issue dawn:1736](https://bugs.chromium.org/p/dawn/issues/detail?id=1736).

When submitting command buffers with destroyed objects, the labels of the command buffers that were used in [`submit()`](https://developer.mozilla.org/docs/Web/API/GPUQueue/submit) are now visible in the error message. See [issue dawn:1747](https://bugs.chromium.org/p/dawn/issues/detail?id=1747).


The invalid part of the depth stencil state is now specified in the error message when validating [`depthStencil`](https://developer.mozilla.org/docs/Web/API/GPUDevice/createRenderPipeline#depthstencil_object_structure). See [issue dawn:1735](https://bugs.chromium.org/p/dawn/issues/detail?id=1735).

The [`minBindingSize`](https://gpuweb.github.io/gpuweb/#dom-gpubufferbindinglayout-minbindingsize) validation error message now reports the group and number of the binding that failed validation, as well as the buffer. See [issue dawn:1604](https://bugs.chromium.org/p/dawn/issues/detail?id=1604).


Error messages returned by the [`mapAsync()`](https://developer.mozilla.org/docs/Web/API/GPUBuffer/mapAsync) method on a `GPUBuffer` object have been improved to help developers when debugging. See an example below and [issue chromium:1431622](https://bugs.chromium.org/p/chromium/issues/detail?id=1431622).

```js
// Create a GPU buffer and map it.
const descriptor = { size: 0, usage: GPUBufferUsage.MAP_READ };
const buffer = device.createBuffer(descriptor);
buffer.mapAsync(GPUMapMode.READ);

// Before it has been mapped, request another mapping.
try {
  await buffer.mapAsync(GPUMapMode.READ);
} catch (error) {
  // New! Error message tells you mapping is already pending.
  console.warn(error.message);
}
```

### Labels in macOS debugging tools

The `use_user_defined_labels_in_backend` debug toggle allows you to forward object labels to the backend so that they can be seen in platform-specific debugging tools like RenderDoc, PIX, or Instruments. From now on, a better debug experience is provided on macOS when you enable it for [debugging](https://dawn.googlesource.com/dawn/+/refs/heads/main/docs/dawn/debugging.md). See [issue dawn:1784](https://bugs.chromium.org/p/dawn/issues/detail?id=1784)

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/nAvHCTgkRT9nePW6aTYI.png", alt="Screenshot of Instruments app on macOS featuring custom labels coming from WebGPU.", width="800", height="524" %}
  <figcaption>
    User defined labels in the Instruments app on macOS.
  </figcaption>
</figure>


### Log HLSL if compilation fails

The `dump_shaders` debug toggle allows you to log input WGSL shaders and translated backend shaders. From now on, when you enable it for [debugging](https://dawn.googlesource.com/dawn/+/refs/heads/main/docs/dawn/debugging.md), the HLSL will be dumped if it fails compilation. See [issue dawn:1681](https://bugs.chromium.org/p/dawn/issues/detail?id=1681)

## Dawn updates

### Transient attachments

You can create attachments that allow render pass operations to stay in tile memory, avoiding VRAM traffic and potentially avoiding VRAM allocation for the textures by setting the `wgpu::TextureUsage::TransientAttachment` usage. This feature is supported only for Metal and Vulkan. See [issue dawn: 1695](https://bugs.chromium.org/p/dawn/issues/detail?id=1695).

```cpp
wgpu::TextureDescriptor desc;
desc.format = wgpu::TextureFormat::RGBA8Unorm;
desc.size = {1, 1, 1};
desc.usage = wgpu::TextureUsage::RenderAttachment |
             wgpu::TextureUsage::TransientAttachment;

auto transientTexture = device.CreateTexture(&desc);

// You can now create views from the texture to serve as transient
// attachments, e.g. as color attachments in a render pipeline.
```

### Building without `depot_tools`

A new `DAWN_FETCH_DEPENDENCIES` CMake option allows you to fetch Dawn dependencies using a Python script that reads DEPS files instead of requiring the installation of [`depot_tools`](http://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up) by all projects that depend on it. See [change 131750](https://dawn-review.googlesource.com/c/dawn/+/131750).

{% Partial 'webgpu/whats-new.md' %}
