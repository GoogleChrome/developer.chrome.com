---
layout: "layouts/blog-post.njk"
title: "Capturing the WebGPU ecosystem"
description: "Learn about how the WebGPU ecosystem extends beyond the JavaScript, C++, and Rust realms."
hero: "image/vvhSqZboQoZZN9wBvoXq72wzGAf1/Tf6H2VXtm3SMiaE1ZtuH.jpg"
alt: "Photo of three green leafed plants."
date: 2023-11-09
authors:
  - beaufortfrancois
  - cwallez
tags:
  - webgpu
---

WebGPU is often perceived as a web graphics API that grants unified and fast access to GPUs by exposing cutting-edge hardware capabilities and enabling rendering and computation operations on a GPU, analogous to Direct3D 12, Metal, and Vulkan.

However, WebGPU transcends the boundaries of a mere JavaScript API; it is a fundamental building block akin to [WebAssembly](https://webassembly.org/), with implications that extend far beyond the web due to its burgeoning ecosystem. The Chrome team acknowledges WebGPU as more than just web technology; it’s a thriving ecosystem centered around a core technology.

## Exploring the current ecosystem

The journey begins with the [JavaScript specification](https://gpuweb.github.io/gpuweb/), a [collaborative effort](https://github.com/gpuweb/gpuweb/graphs/contributors) involving numerous organizations such as Apple, Google, Intel, Mozilla, and Microsoft. Currently, all major web browsers have implemented or are in the process of implementing WebGPU.

At the same time, [Mozilla and Google recognized WebGPU's potential](https://kvark.github.io/web/gpu/native/2020/05/03/point-of-webgpu-native.html) in platform-specific applications and separated WebGPU implementations from browsers, enabling standalone usage.

For Chrome, this materialized as [Dawn](https://dawn.googlesource.com/dawn), a C/C++ library that translates WebGPU calls into GPU driver commands. Dawn empowers C and C++ applications to use WebGPU natively, providing a portable and ergonomic GPU abstraction using browser vendor expertize.

As demonstrated in the blog post [WebGPU: the cross-platform graphics API of tomorrow](/blog/webgpu-cross-platform/), porting a platform-specific WebGPU application to the web is straightforward. [Emscripten](https://emscripten.org/), the C++ WebAssembly toolchain, already supports WebGPU, requiring only minimal modifications to port it to the web.

You can also run your JavaScript WebGPU code outside the browser with the Node.js JavaScript runtime as it includes [a WebGPU module based on Dawn](https://dawn.googlesource.com/dawn/+/refs/heads/main/src/dawn/node/). It allows you to run your code without modifications server-side or in other platform-specific contexts.

A similar ecosystem exists for Rust with [wgpu](https://wgpu.rs/), Firefox's implementation of WebGPU. Wgpu can be directly integrated into Rust applications, which can then be ported to the web using [web-sys](https://crates.io/crates/web-sys). Additionally, the Deno JavaScript runtime supports WebGPU through wgpu. See [wgpu alliance with Deno](https://gfx-rs.github.io/2021/09/16/deno-webgpu.html) blog post.

This establishes a parallel ecosystem between Rust and C++ as shown in the following diagram.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/HV6f4WZG4HNEoI5Nj6PW.png", alt="Diagram of the WebGPU ecosystem in 2023.", width="800", height="560" %}
  <figcaption>WebGPU ecosystem in 2023.</figcaption>
</figure>

## Emerging horizons

The WebGPU ecosystem extends beyond the JavaScript, C++, and Rust realms.

Your preferred programming language may actually already have bindings for WebGPU as engineers working on WebGPU implementations are also developing a [common C header for WebGPU](https://github.com/webgpu-native/webgpu-headers). This can be used to target Dawn, wgpu, and others, easing the creation of bindings for languages using C [FFI](https://en.wikipedia.org/wiki/Foreign_function_interface).

The Chrome team is also considering using Dawn as the default rendering backend for all browser UI elements, including menus, toolbars, developer tools, and web content. This would eliminate the need for separate rendering implementations for each native API, simplifying the development process. This feature is currently in the experimental stage on macOS and Windows behind the `chrome://flags/#skia-graphite` flag.

## Acknowledgements

Hero image by [Daniel Öberg](https://unsplash.com/@artic_studios) on [Unsplash](https://unsplash.com/photos/three-green-leafed-plants-sEApBUS4fIk).
