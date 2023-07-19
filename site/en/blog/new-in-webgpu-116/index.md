---
layout: "layouts/blog-post.njk"
title: "What's New in WebGPU (Chrome&nbsp;116)"
description: "WebCodecs integration, video playback improvements, and more."
hero: "image/vvhSqZboQoZZN9wBvoXq72wzGAf1/HPmAwocOzAsHp5hoUkMU.png"
alt: "What's new in WebGPU logo"
date: 2023-08-08
#updated: YYYY-MM-DD
authors:
  - beaufortfrancois
tags:
  - new-in-webgpu
  - webgpu
  - chrome-116
  - media
  - video
---

## WebCodecs integration

WebGPU exposes an API to create opaque "external texture" objects from `HTMLVideoElement` through [`importExternalTexture()`](https://developer.mozilla.org/docs/Web/API/GPUDevice/importExternalTexture). You can use these objects to sample the video frames efficiently, potentially in a 0-copy way directly from the source [YUV](https://en.wikipedia.org/wiki/YUV) color model data.

However, the initial WebGPU specification did not allow creating `GPUExternalTexture` objects from WebCodecs [`VideoFrame`](https://developer.mozilla.org/docs/Web/API/VideoFrame) objects. This capability is important for advanced video processing apps that already use WebCodecs and would like to integrate WebGPU in the video processing pipeline. WebCodecs integration adds support for using a `VideoFrame` as the source for a [`GPUExternalTexture`](https://developer.mozilla.org/docs/Web/API/GPUExternalTexture) and a [`copyExternalImageToTexture()`](https://developer.mozilla.org/docs/Web/API/GPUQueue/copyExternalImageToTexture) call. See the following example, and the [chromestatus entry](https://chromestatus.com/feature/5078348864159744).

```js
// Access the GPU device.
const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();

// Create VideoFrame from HTMLVideoElement.
const video = document.querySelector("video");
const videoFrame = new VideoFrame(video);

// Create texture from VideoFrame.
const texture = device.importExternalTexture({ source: videoFrame });
// TODO: Use texture in bind group creation.
```

Check out the [Video Uploading with WebCodecs](https://webgpu.github.io/webgpu-samples/samples/videoUploadingWebCodecs) experimental sample to play with it.

## Lost device returned by GPUAdapter requestDevice()

If the [`requestDevice()`](https://developer.mozilla.org/docs/Web/API/GPUAdapter/requestDevice) method on [`GPUAdapter`](https://developer.mozilla.org/docs/Web/API/GPUAdapter) fails because it has been already used to create a [`GPUDevice`](https://developer.mozilla.org/docs/Web/API/GPUDevice), it now fulfills with a `GPUDevice` immediately marked as lost, rather than returning a promise that rejects with `null`. See [issue chromium:1234617](https://bugs.chromium.org/p/chromium/issues/detail?id=1234617).

```js
const adapter = await navigator.gpu.requestAdapter();
const device1 = await adapter.requestDevice();

// New! The promise is not rejected anymore with null.
const device2 = await adapter.requestDevice();
// And the device is immediately marked as lost.
const info = await device2.lost;
```

## Keep video playback smooth if importExternalTexture() is called

When [`importExternalTexture()`](https://developer.mozilla.org/docs/Web/API/GPUDevice/importExternalTexture) is called with an `HTMLVideoElement`, the associated video playback is not throttled anymore when the video is not visible in the viewport. See [issue chromium:1425252](https://bugs.chromium.org/p/chromium/issues/detail?id=1425252).

## Spec conformance

The `message` argument in the [`GPUPipelineError()`](https://developer.mozilla.org/docs/Web/API/GPUPipelineError/GPUPipelineError) constructor is optional. See [change chromium:4613967](https://chromium-review.googlesource.com/c/chromium/src/+/4613967).

An error is fired when calling [`createShaderModule()`](https://developer.mozilla.org/docs/Web/API/GPUDevice/createShaderModule) if the WGSL source `code` contains contains `\0`. See [issue dawn:1345](https://bugs.chromium.org/p/dawn/issues/detail?id=1345).

The default maximum level of detail (`lodMaxClamp`) used when sampling a texture with [`createSampler()`](https://developer.mozilla.org/docs/Web/API/GPUDevice/createSampler) is 32. See [change chromium:4608063](https://chromium-review.googlesource.com/c/chromium/src/+/4608063).

## Improving developer experience

A message is displayed in the DevTools JavaScript console to remind developers when they are using WebGPU on an unsupported platform. See [change chromium:4589369](
https://chromium-review.googlesource.com/c/chromium/src/+/4589369).

Buffer validation error messages are instantly shown in DevTools JavaScript console when [`getMappedRange()`](https://developer.mozilla.org/docs/Web/API/GPUBuffer/getMappedRange) fails without forcing developers to send commands to the queue. See [change chromium:4597950](https://chromium-review.googlesource.com/c/chromium/src/+/4597950).

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/cgLVz3xRIjZUI9xQ7bKV.png", alt="Screenshot of DevTools JavaScript console featuring buffer validation error message.", width="800", height="280" %}
  <figcaption>
    Buffer validation error message in DevTools JavaScript console.
  </figcaption>
</figure>

## Dawn updates

The `disallow_unsafe_apis` debug toggle has been renamed to `allow_unsafe_apis` and made its default to disabled. This toggle suppresses validation errors on API entry points or parameter combinations that aren't considered secure yet. It can be useful for [debugging](https://dawn.googlesource.com/dawn/+/refs/heads/main/docs/dawn/debugging.md).
 See [issue dawn:1685](https://bugs.chromium.org/p/dawn/issues/detail?id=1685).

The `wgpu::ShaderModuleWGSLDescriptor` deprecated `source` attribute is removed in favor of `code`. See [change dawn:130321](https://dawn-review.googlesource.com/c/dawn/+/130321).

The missing `wgpu::RenderBundle::SetLabel()` method has been implemented. See [change dawn:134502](https://dawn-review.googlesource.com/c/dawn/+/134502).

Applications can request a particular backend when getting an adapter with the `wgpu::RequestAdapterOptionsBackendType` option. See an example below and [issue dawn:1875](https://bugs.chromium.org/p/dawn/issues/detail?id=1875).

```cpp
wgpu::RequestAdapterOptionsBackendType backendTypeOptions = {};
backendTypeOptions.backendType = wgpu::BackendType::D3D12;

wgpu::RequestAdapterOptions options = {};
options.nextInChain = &backendTypeOptions;

// Request D3D12 adapter.
myInstance.RequestAdapter(&options, myCallback, myUserData);
```

A new `SwapChain::GetCurrentTexture()` method has been added with additional usages for swapchain textures so that the return `wgpu::Texture` can be used in copies. See an example below and [issue dawn:1551](https://bugs.chromium.org/p/dawn/issues/detail?id=1551).

```cpp
wgpu::SwapChain swapchain = myDevice.CreateSwapChain(mySurface, &myDesc);
swapchain.GetCurrentTexture();
swapchain.Present();
```

This covers only some of the key highlights. Check out the exhaustive [list of commits](https://dawn.googlesource.com/dawn/+log/chromium/5790..chromium/5845).

{% Partial 'webgpu/whats-new.md' %}
