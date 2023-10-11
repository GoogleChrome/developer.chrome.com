---
layout: "layouts/blog-post.njk"
title: "What's New in WebGPU (Chrome&nbsp;118)"
description: "Extended source support for copyExternalImageToTexture, experimental support for read-write and read-only storage texture, and more."
hero: "image/vvhSqZboQoZZN9wBvoXq72wzGAf1/9H2CFU1J8kyyvVUH8dgA.png"
alt: "What's new in WebGPU logo"
date: 2023-10-03
#updated: YYYY-MM-DD
authors:
  - beaufortfrancois
tags:
  - new-in-webgpu
  - webgpu
  - chrome-118
---

## HTMLImageElement and ImageData support in copyExternalImageToTexture()

The [`copyExternalImageToTexture()`](https://developer.mozilla.org/docs/Web/API/GPUQueue/copyExternalImageToTexture) method on `GPUQueue` allows you to copy a snapshot taken from a source image, video, or canvas into a given `GPUTexture`. You can now pass [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement) and [`ImageData`](https://developer.mozilla.org/docs/Web/API/ImageData) objects as the source. See the following example and [issue chromium:1471372](https://bugs.chromium.org/p/chromium/issues/detail?id=1471372).

```js
// Fetch and decode image.
const source = document.createElement("img");
source.src = "my-image.png";
await source.decode();

// Create destination texture.
const size = [source.width, source.height];
const texture = myDevice.createTexture({
 size,
 format: "rgba8unorm",
 usage:
   GPUTextureUsage.COPY_DST |
   GPUTextureUsage.RENDER_ATTACHMENT |
   GPUTextureUsage.TEXTURE_BINDING,
});

// Copies a snapshot taken from the source image into a texture.
myDevice.queue.copyExternalImageToTexture({ source }, { texture }, size);
```

## Experimental support for read-write and read-only storage texture

The storage texture binding type allows you to perform texture reads without sampling and store to arbitrary positions in shaders. When the `"chromium-experimental-read-write-storage-texture"` feature is available in a `GPUAdapter`, you can now request a `GPUDevice` with this feature and set `GPUStorageTexture` access to either `"read-write"` or `"read-only"` when creating a bind group layout. Previously this was restricted to `"write-only"`.

To take advantage of this, you must explicitly enable this extension in your WGSL code with `enable chromium_experimental_read_write_storage_texture`. When enabled, you can use `read_write` and `read` access qualifier for storage textures, the `textureLoad()` and `textureStore()` built-in functions behave accordingly, and a new `textureBarrier()` built-in function is available to synchronize texture memory accesses in a workgroup. See the following example and [issue dawn:1972](https://bugs.chromium.org/p/dawn/issues/detail?id=1972).

This feature is still experimental and may change. While it’s [getting standardized](https://github.com/gpuweb/gpuweb/issues/3838), run chrome with the `--enable-dawn-features=allow_unsafe_apis` [flag](/docs/web-platform/chrome-flags/) to make it available.

```js
const feature = "chromium-experimental-read-write-storage-texture";
const adapter = await navigator.gpu.requestAdapter();
if (!adapter.features.has(feature)) {
  throw new Error("Read-write storage texture support is not available");
}
// Explicitly request read-write storage texture support.
const device = await adapter.requestDevice({
  requiredFeatures: [feature],
});

const bindGroupLayout = device.createBindGroupLayout({
  entries: [{
    binding: 0,
    visibility: GPUShaderStage.COMPUTE,
    storageTexture: {
      access: "read-write", // <-- New!
      format: "r32uint",
    },
  }],
});

const shaderModule = device.createShaderModule({ code: `
  enable chromium_experimental_read_write_storage_texture;
  @group(0) @binding(0) var tex : texture_storage_2d<r32uint, read_write>;

  @compute @workgroup_size(1, 1)
  fn main(@builtin(local_invocation_id) local_id: vec3u) {
    var data = textureLoad(tex, vec2i(local_id.xy));
    data.x *= 2;
    textureStore(tex, vec2i(local_id.xy), data);
  }`,
});

// You can now create a compute pipeline with this shader module and
// send the appropriate commands to the GPU.
```

## Dawn updates

The [webgpu.h](https://github.com/webgpu-native/webgpu-headers/blob/main/webgpu.h) C API has renamed the following fields for consistency: `requiredFeaturesCount` to `requiredFeatureCount`, `pipelineStatisticsCount` to `pipelineStatisticCount`, and `colorFormatsCount` to `colorFormatCount`. See [issue dawn:146040](https://dawn-review.googlesource.com/c/dawn/+/146040).

A new `DawnInfo` program (similar to [vulkaninfo](https://vulkan.lunarg.com/doc/view/latest/windows/vulkaninfo.html)) allows you to list toggles, adapters, adapter features and adapter limits. It is available when building dawn `samples`. Here’s the output below heavily trimmed for brevity. See [change dawn:149020](https://dawn-review.googlesource.com/c/dawn/+/149020).

```bash
$ ./out/Debug/DawnInfo 
Toggles
=======
  Name: allow_unsafe_apis
    Suppresses validation errors on API entry points or parameter combinations
    that aren't considered secure yet.
    http://crbug.com/1138528
[…]

Adapter
=======
VendorID: 0x106B
Vendor: apple
Architecture: common-3
DeviceID: 0x0000
Name: Apple M1 Pro
Driver description: Metal driver on macOS Version 13.5.1 (Build 22G90)
Adapter Type: discrete GPU
Backend Type: Metal
Power: <undefined>

  Features
  ========
   * depth_clip_control
      Disable depth clipping of primitives to the clip volume
      https://bugs.chromium.org/p/dawn/issues/detail?id=1178
[…]

  Adapter Limits
  ==============
    maxTextureDimension1D: 16,384
    maxTextureDimension2D: 16,384
[…]
```

This covers only some of the key highlights. Check out the exhaustive [list of commits](https://dawn.googlesource.com/dawn/+log/chromium/5938..chromium/5993).

{% Partial 'webgpu/whats-new.md' %}
