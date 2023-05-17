---
layout: 'layouts/blog-post.njk'
title: 'WebGPU: Unlocking modern GPU access in the browser'
subhead: >
 Learn how WebGPU unlocks the power of the GPU for faster machine learning performance and better graphics rendering.
description: >
 Learn how WebGPU unlocks the power of the GPU for faster machine learning performance and better graphics rendering.
authors:
  - cwallez
  - toji
  - beaufortfrancois
date: 2023-05-10
hero: image/vvhSqZboQoZZN9wBvoXq72wzGAf1/NnlP9aTRih5dtWPC23Sd.png
alt: Simulated particles using compute shaders, rendered with the WebGPU logo.
tags:
  - chrome-113
  - webgpu
---

{% YouTube id="m6T-Mq1BPXg" %}

The new [WebGPU API](https://gpuweb.github.io/gpuweb/) unlocks massive performance gains in graphics and machine learning workloads. This article explores how WebGPU is an improvement over the current solution of WebGL, with a sneak peek at future developments. But first, let’s provide some context for why WebGPU was developed.

## Context on WebGPU

[WebGL landed in Chrome in 2011](https://blog.chromium.org/2010/12/webgl-now-in-beta-here-comes-3d-web.html). By allowing web applications to take advantage of GPUs, WebGL enables [amazing experiences](https://experiments.withgoogle.com/search?q=WebGL) on the web—from Google Earth, to interactive music videos, to 3D real-estate walkthroughs and more. WebGL was based on the [OpenGL](https://en.wikipedia.org/wiki/OpenGL) family of APIs first developed in 1992. That's a long time ago! And you can imagine that GPU hardware has evolved significantly since that time.

To keep up with this evolution, a new breed of APIs were developed to more efficiently interact with modern GPU hardware. APIs like [Direct3D 12](https://learn.microsoft.com/windows/win32/direct3d12/what-is-directx-12-), [Metal](https://developer.apple.com/metal/), and [Vulkan](https://www.vulkan.org). These new APIs have supported new and demanding use cases for GPU programming such as the explosion in machine learning and advances in rendering algorithms. WebGPU is the successor to WebGL bringing the advancements of this new class of modern APIs to the Web.

WebGPU unlocks a lot of new GPU programming possibilities in the browser. It  better reflects how modern GPU hardware works, while also laying a foundation for more advanced GPU capabilities in the future. The API has been baking in the [W3C’s "GPU for the Web"](https://www.w3.org/community/gpu/) group since 2017, and is a collaboration between many companies such as Apple, Google, Mozilla, Microsoft, and Intel. And now after 6 years of work, we’re excited to announce that one of the biggest additions to the Web platform is finally available!

WebGPU is available today in Chrome&nbsp;113 on ChromeOS, macOS, and Windows, with other platforms coming soon. A huge thank you to other Chromium contributors and Intel in particular who helped make this happen.

Now let’s take a look at some of the exciting use cases WebGPU enables.

## Unlocking new GPU workloads for rendering

WebGPU features such as [compute shaders](/articles/gpu-compute/) enable new classes of algorithms to be ported on the GPU. For example, algorithms that can add more dynamic details to scenes, simulate physical phenomenons, and more! There are even workloads that previously could only be done in JavaScript that can now be moved to the GPU.

The following video shows the marching cubes algorithm being used to triangulate the surface of these metaballs. In the first 20 seconds of the video, the algorithm, when it's running in JavaScript, struggles to keep up with the page only running at 8 FPS resulting in janky animation. To keep it performant in JavaScript we would need to lower the level of details a lot.

It's a night and day difference when we move the same algorithm to a compute shader, which is seen in the video  after 20 seconds. The performance improves dramatically with the page now running at a smooth 60 FPS and there's still a lot of performance headroom for other effects. In addition the page’s main JavaScript loop is completely freed up for other tasks, ensuring that interactions with the page stay responsive.

<figure>
  {% YouTube id='VDEvx4huikU' %}
  <figcaption>
    The metaballs demo
  </figcaption>
</figure>

WebGPU also enables complex visual effects that were not practical before. In the following example, created in the popular [Babylon.js](https://www.babylonjs.com/) library, the ocean surface is being simulated entirely on the GPU. The realistic dynamics are created from many independent waves being added to each other. But simulating each wave directly would be too expensive.

<figure>
  {% YouTube id='uH9cB5-D2L0' %}
  <figcaption>
    The ocean demo
  </figcaption>
</figure>

That's why the demo uses an advanced algorithm called [Fast Fourier Transform](https://en.wikipedia.org/wiki/Fast_Fourier_transform). Instead of representing all the waves as complex positional data, this uses the spectral data which is much more efficient to perform computations. Then each frame uses the Fourier Transform to convert from spectral data to the positional data that represents the height of the waves.

## Faster ML inference

WebGPU is also useful to accelerate machine learning, which has become a major use of GPUs in recent years.

For a long time, creative developers have been repurposing WebGL's rendering API to perform non-rendering operations such as machine learning computations. However, this requires drawing the pixels of triangles as a way to initiate the computations, and carefully packing and unpacking tensor data in texture instead of more general purpose memory accesses.

<figure class="screenshot">
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/s0tVrCZEB6nmH1oF2Lob.png", alt="An illustration of the inefficiencies in a single ML operator execution with WebGL, including redundant memory loads, redundant computations, and few values written per thread.", width="800", height="376" %}
  <figcaption>
    A single ML operator execution with WebGL.
  </figcaption>
</figure>

Using WebGL in this way requires developers to awkwardly conform their code to the expectations of an API designed only for drawing. Combined with the lack of basic features like shared memory access between computations, this leads to duplicate work and suboptimal performance.

Compute shaders are WebGPU's primary new feature and remove these pain points. Compute shaders offer a more flexible programming model that takes advantage of the GPU's massively parallel nature while not being constrained by the strict structure of rendering operations.

<figure class="screenshot">
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/MoQayjLj9DVjHNX4haLo.png", alt="The various efficiency gains in WebGPU compute shaders, including shared memory loads, shared computations, and flexible writes to memory.", width="800", height="375" %}
  <figcaption>
    WebGPU compute shader efficiencies.
  </figcaption>
</figure>

Compute shaders give more opportunity for sharing data and computation results within groups of shader work for better efficiency. This can lead to significant gains over previous attempts to use WebGL for the same purpose.

As an example of the efficiency gains this can bring, an initial port of an image diffusion model in TensorFlow.js shows a 3x performance gain on a variety of hardware when moved from WebGL to WebGPU. On some of the hardware tested the image was rendered in under 10 seconds. And because this was an early port, we believe there are even more improvements possible in both WebGPU and TensorFlow.js! Check out [What’s new with Web ML in 2023?](https://io.google/2023/program/7845543e-04ef-458b-8041-7ff1fb95721a/) Google I/O session.

But WebGPU is not only about bringing GPU features to the web.

## Designed for JavaScript first

The features that enable these use cases have been available to platform-specific desktop and mobile developers for a while, and it’s been our challenge to expose them in a way that feels like a natural part of the web platform.

WebGPU was developed with the benefit of hindsight from over a decade of developers doing amazing work with WebGL. We were able to take the problems they encountered, the bottlenecks they hit, and the issues they raised and funneled all of that feedback into this new API.

We saw that WebGL’s global state model made creating robust, composable libraries and applications difficult and fragile. So WebGPU dramatically reduces the amount of state that developers need to keep track of while sending the GPU commands.

We heard that debugging WebGL applications was a pain, so WebGPU includes more flexible [error handling](https://toji.dev/webgpu-best-practices/error-handling) mechanisms that don’t tank your performance. And we’ve gone out of our way to ensure that every message you get back from the API is [easy to understand and actionable](https://twitter.com/DasSurma/status/1486312385996640262).

We also saw that frequently the overhead of making too many JavaScript calls was a bottleneck for complex WebGL applications. As a result, the WebGPU API is less chatty, so you can accomplish more with fewer function calls. We focus on performing heavyweight validation up front, keeping the critical draw loop as lean as possible. And we offer new APIs like [Render Bundles](https://developer.mozilla.org/docs/Web/API/GPURenderBundle), which allow you to record large numbers of drawing commands in advance and replay them with a single call.

To demonstrate what a dramatic difference a feature like render bundles can make, here’s another demo from Babylon.js. Their WebGL 2 renderer can execute all the JavaScript calls to render this art gallery scene about 500 times a second. Which is pretty good!

<figure>
  {% YouTube id='qTe-ukinOpI' %}
  <figcaption>
    The art gallery
  </figcaption>
</figure>

Their WebGPU renderer, however, enables a feature they call Snapshot Rendering. Built on top of WebGPUs render bundles, this feature allows the same scene to be submitted more than 10x faster. This significantly reduced overhead allows WebGPU to render more complex scenes, while also allowing applications to do more with JavaScript in parallel.

Modern graphics APIs have a reputation for complexity, trading simplicity for extreme optimization opportunities. WebGPU, on the other hand, is focused on cross-platform compatibility, handling traditionally difficult topics like resource synchronization automatically in most cases.

This has the happy side effect that WebGPU is easy to learn and use. It relies on existing features of the web platform for things like image and video loading, and leans into well-known JavaScript patterns like Promises for asynchronous operations. This helps keep the amount of boilerplate code needed to a minimum. You can get your first triangle on-screen in under 50 lines of code.

```html
<canvas id="canvas" width="512" height="512"></canvas>
<script type="module">
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter.requestDevice();

  const context = canvas.getContext("webgpu");
  const format = navigator.gpu.getPreferredCanvasFormat();
  context.configure({ device, format });

  const code = `
    @vertex fn vertexMain(@builtin(vertex_index) i : u32) ->
      @builtin(position) vec4f {
       const pos = array(vec2f(0, 1), vec2f(-1, -1), vec2f(1, -1));
       return vec4f(pos[i], 0, 1);
    }
    @fragment fn fragmentMain() -> @location(0) vec4f {
      return vec4f(1, 0, 0, 1);
    }`;
  const shaderModule = device.createShaderModule({ code });
  const pipeline = device.createRenderPipeline({
    layout: "auto",
    vertex: {
      module: shaderModule,
      entryPoint: "vertexMain",
    },
    fragment: {
      module: shaderModule,
      entryPoint: "fragmentMain",
      targets: [{ format }],
    },
  });
  const commandEncoder = device.createCommandEncoder();
  const colorAttachments = [
    {
      view: context.getCurrentTexture().createView(),
      loadOp: "clear",
      storeOp: "store",
    },
  ];
  const passEncoder = commandEncoder.beginRenderPass({ colorAttachments });
  passEncoder.setPipeline(pipeline);
  passEncoder.draw(3);
  passEncoder.end();
  device.queue.submit([commandEncoder.finish()]);
</script>
```

## Conclusion

It's exciting to see all the new possibilities that WebGPU brings to the web platform and we're looking forward to seeing all the cool new use cases that you will find for WebGPU!

A vibrant ecosystem of libraries and frameworks has been built around WebGL, and that same ecosystem is eager to embrace WebGPU. Support for WebGPU is in-progress or already complete in many popular Javascript WebGL libraries, and in some cases taking advantage of the benefits of WebGPU might be as simple as changing a single flag!

<figure>
{% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/3ULtPOk23sZ2G63yEnEd.png", alt="Babylon.js, Construct 3, Google Earth, Google Meet, PlayCanvas, Sketchfab, Three.JS, TensorFlow.js, and Unity.", width="800", height="286" %}
  <figcaption>Frameworks, applications, and libraries with finished or ongoing WebGPU ports.</figcaption>
</figure>

And this [first release in Chrome 113](/blog/webgpu-release/) is just a start. While our initial release is for Windows, ChromeOS, and MacOS, we plan to bring WebGPU to the remaining platforms like Android and Linux in the near future.

And it’s not just the Chrome team that’s been working on launching WebGPU. Implementations are also in-progress in Firefox and WebKit as well.

Additionally, new features are already being designed at the W3C that can be exposed when available in hardware. For example: In Chrome we plan to enable [support for 16 bit floating point numbers in shaders](https://bugs.chromium.org/p/tint/issues/detail?id=1502) and the [DP4 class of instructions](https://bugs.chromium.org/p/tint/issues/detail?id=1497) soon for even more machine learning performance improvements.

WebGPU is an extensive API that unlocks amazing performance if you invest in it. Today we could only cover its benefits at a high level, but if you'd like to get a hands-on start with WebGPU, please check out our introductory Codelab, [Your first WebGPU app](https://codelabs.developers.google.com/your-first-webgpu-app), where you’ll build a GPU version of the classic Conway’s Game of Life. This codelab will walk you through the process step-by-step, so you can try it out even if it’s your first time doing GPU development.

The [WebGPU samples](https://webgpu.github.io/webgpu-samples/) are also a good place to get a feel for the API. They range from the traditional "hello triangle" to more complete rendering and compute pipelines, demonstrating a variety of techniques. Finally, check out our other [resources](/blog/webgpu-release/#resources).
