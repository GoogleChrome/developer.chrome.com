---
layout: "layouts/blog-post.njk"
title: "From WebGL to WebGPU"
description: "Learn some tips for WebGL developers who are migrating to WebGPU."
hero: "image/vvhSqZboQoZZN9wBvoXq72wzGAf1/zgz7uZNkCxByGrzpKGq1.png"
alt: "WebGL and WebGPU logos"
date: 2023-09-19
#updated: YYYY-MM-DD
authors:
  - beaufortfrancois
tags:
  - webgpu
  - media
  - video
---

As a WebGL developer, you may be both intimidated and excited to start using WebGPU, the successor to WebGL that brings the advancements of modern graphics APIs to the web. 

It’s reassuring to know that WebGL and WebGPU share many core concepts. Both APIs allow you to run small programs called shaders on the GPU. WebGL supports vertex and fragment shaders, while WebGPU also supports compute shaders. WebGL uses the OpenGL Shading Language (GLSL) while WebGPU uses the WebGPU Shading Language (WGSL). Although the two languages are different, the underlying concepts are mostly the same.

With that in mind, this article highlights some differences between WebGL and WebGPU, to help you get started.

## Global state

WebGL has a [lot of global state](https://webglfundamentals.org/webgl/lessons/resources/webgl-state-diagram.html). Some settings apply to all rendering operations, such as which textures and buffers are bound. You set this global state by calling various API functions, and it remains in effect until you change it. The global state in WebGL is a [major source of errors](https://kangz.net/posts/2016/07/11/lets-do-opengl-archeology/), as it is easy to forget to change a global setting. Additionally, global state makes code sharing difficult, as developers need to be careful not to accidentally change the global state in a way that affects other parts of the code.

WebGPU is a stateless API, and does not maintain a global state. Instead, it uses the concept of a [pipeline](https://gpuweb.github.io/gpuweb/#pipelines) to encapsulate all of the rendering state that was global in WebGL. A pipeline contains information such as which blending, topology, and attributes to use. A pipeline is immutable. If you want to change some settings, you need to create another pipeline. WebGPU also uses [command encoders](https://gpuweb.github.io/gpuweb/#command-encoding) to batch commands together and execute them in the order that they were recorded. This is useful in shadow mapping for example, where, in a single pass over the objects, the application can record multiple command streams, one for each light's shadow map.

To summarize, as WebGL’s global state model made creating robust, composable libraries and applications difficult and fragile, WebGPU significantly reduced the amount of state that developers needed to keep track of while sending commands to the GPU.

## Sync no more

On GPUs, it is typically inefficient to send commands and wait for them synchronously, as this can flush the pipeline and cause [bubbles](https://en.wikipedia.org/wiki/Pipeline_stall). This is especially true in WebGPU and WebGL, which use a multi-process architecture with the GPU driver running in a separate process from JavaScript. 

In WebGL, for example, calling `gl.getError()` requires a synchronous [IPC](/blog/inside-browser-part1/#executing-program-on-process-and-thread) from the JavaScript process to the GPU process and back. This can cause a bubble on the CPU side as the two processes communicate.

To avoid these bubbles, WebGPU is designed to be completely [asynchronous](https://gpuweb.github.io/gpuweb/#asynchrony). The [error model](https://toji.dev/webgpu-best-practices/error-handling) and all other operations happen asynchronously. For example, when you create a texture, the operation appears to succeed immediately, even if the texture is actually an error. You can only discover the error asynchronously. This design keeps the cross-process communication bubble-free and gives applications reliable performance.

## Compute shaders

Compute shaders are programs that run on the GPU to perform general-purpose computations. They are available only in WebGPU, not WebGL.

Unlike vertex and fragment shaders, they are not limited to graphics processing, and can be used for a wide variety of tasks, such as machine learning, physics simulation, and scientific computing. Compute shaders are executed in parallel by hundreds or even thousands of threads, which makes them very efficient for processing large datasets. Learn about [GPU compute](/articles/gpu-compute) and more detail [in this extensive article about WebGPU](https://surma.dev/things/webgpu/index.html).

## Video frame processing

Processing video frames using JavaScript and WebAssembly has some drawbacks: the cost of copying the data from GPU memory to CPU memory, and the limited parallelism that can be achieved with workers and CPU threads. WebGPU does not have those limitations, making it a great fit for processing video frames thanks to its tight integration with the [WebCodecs](https://developer.mozilla.org/docs/Web/API/WebCodecs_API) API.

The following code snippet shows how to import a VideoFrame as an external texture in WebGPU and process it. You can try out this [demo](https://webgpu-video-processing.glitch.me/).

```js
// Init WebGPU device and pipeline...
// Configure canvas context...
// Feed camera stream to video...

(function render() {
  const videoFrame = new VideoFrame(video);
  applyFilter(videoFrame);
  requestAnimationFrame(render);
})();

function applyFilter(videoFrame) {
  const texture = device.importExternalTexture({ source: videoFrame });
  const bindgroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [{ binding: 0, resource: texture }],
  });
  // Finally, submit commands to GPU
}
```

{% Glitch { id: 'webgpu-video-processing', path: 'script.js' } %}

## Application portability by default

WebGPU forces you to request [`limits`](https://developer.mozilla.org/docs/Web/API/GPUAdapter/limits). By default, [`requestDevice()`](https://developer.mozilla.org/docs/Web/API/GPUAdapter/requestDevice) returns a GPUDevice that may not match the physical device’s hardware capabilities, but rather a reasonable and lowest common denominator of all GPUs. By requiring developers to request device limits, WebGPU ensures that applications will run on as many devices as possible.

## Canvas handling

WebGL automatically manages the canvas after you create a WebGL context and supply [context attributes](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/getContext) such as alpha, antialias, colorSpace, depth, preserveDrawingBuffer, or stencil.

On the other hand, WebGPU requires you to manage the canvas yourself. For example, to achieve antialiasing in WebGPU, you would create a multisample texture and render to it. Then, you would resolve the multisample texture to a regular texture and draw that texture to the canvas. This manual management allows you to output to as many canvases as you want from a single [GPUDevice](https://developer.mozilla.org/docs/Web/API/GPUDevice) object. In contrast, WebGL can only create one context per canvas. 

Check out the [WebGPU Multiple Canvases demo](https://jsgist.org/?src=bcb94d8b67b19f71a9792966da827af7).

On a side note, browsers currently have a limit on the number of WebGL canvases per page. At the time of writing, Chrome and Safari can only use up to 16 WebGL canvases simultaneously; Firefox can create up to 200 of them. On the other hand, there is no limit on the number of WebGPU canvases per page.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/xxUCC7nuUT35G5mafrIT.png", alt="Screenshot featuring maximum number of WebGL canvases in Safari, Chrome, and Firefox browsers", width="800", height="517" %}
  <figcaption>
     The maximum number of WebGL canvases in Safari, Chrome, and Firefox (from left to right) - <a target="_blank" href="https://max-gl-contexts.glitch.me/">demo</a>.
  </figcaption>
</figure>

## Helpful error messages

WebGPU provides a call stack for every message that is returned from the API. This means that you can quickly see where the error occurred in your code, which is [helpful](https://twitter.com/DasSurma/status/1486312385996640262) for debugging and fixing errors.

Besides providing a call stack, WebGPU error messages are also easy to understand and actionable. The error messages typically include a description of the error and suggestions for how to fix the error.

WebGPU also allows you to provide a custom [`label`](https://gpuweb.github.io/gpuweb/#dom-gpuobjectbase-label) for each WebGPU object. This label is then used by the browser in GPUError messages, console warnings, and browser developer tools.

## From names to indexes

In WebGL, many things are connected by names. For example, you can declare a uniform variable called `myUniform` in GLSL and get its location using `gl.getUniformLocation(program, 'myUniform')`. This comes handy as you get an error if you mistype the name of the uniform variable.

On the other hand, in WebGPU, everything is entirely connected by byte offset or index (often called [location](https://gpuweb.github.io/gpuweb/wgsl/#input-output-locations)). It is your responsibility to keep the locations for the code in WGSL and JavaScript in sync.

## Mipmap generation

In WebGL, you can create a texture's level 0 mip and then call `gl.generateMipmap()`. WebGL will then generate all the other mip levels for you. 

In WebGPU, you must generate mipmaps yourself. There is no built-in function to do this. See the [spec discussion](https://github.com/gpuweb/gpuweb/issues/386) to learn more about the decision. You can use handy libraries such as [webgpu-utils](https://github.com/greggman/webgpu-utils) to generate mipmaps or learn how to do it [yourself](https://webgpufundamentals.org/webgpu/lessons/webgpu-importing-textures.html).

## Storage buffers and storage textures

Uniform buffers are supported by both WebGL and WebGPU and allow you to pass constant parameters of limited size to shaders. Storage buffers, which look a lot like uniform buffers, are only supported by WebGPU and are more powerful and flexible than uniform buffers.

- Storage buffers data passed to shaders can be much larger than uniform buffers. While the spec says uniform buffers bindings can be up to 64KB in size (see [`maxUniformBufferBindingSize`](https://gpuweb.github.io/gpuweb/#dom-supported-limits-maxuniformbufferbindingsize)) , the maximum size of a storage buffer binding is at least 128MB in WebGPU (see [`maxStorageBufferBindingSize`](https://gpuweb.github.io/gpuweb/#dom-supported-limits-maxstoragebufferbindingsize)).

- Storage buffers are writable, and support some atomic operations while uniform buffers are just read-only. This allows new classes of algorithms to be implemented.

- Storage buffers bindings support runtime-sized arrays for more flexible algorithms, while uniform buffer array sizes have to be provided in the shader. 

Storage textures are only supported in WebGPU, and are to textures what storage buffers are to uniform buffers. They are more flexible than regular textures, supporting random access writes (and reads as well in the future).

## Buffer and texture changes

In WebGL, you can create a buffer or texture and then change its size at any time with `gl.bufferData()` and `gl.texImage2D()` respectively for instance.

In WebGPU, buffers and textures are immutable. This means that you cannot change their size, usage, or format after they have been created. You can only change their contents.

## Space convention differences

In WebGL, the Z [clip space](https://developer.mozilla.org/docs/Web/API/WebGL_API/WebGL_model_view_projection#clip_space) range is from -1 to 1. In WebGPU, the Z clip space range is from 0 to 1. This means that objects with a z value of 0 are the closest to the camera, while objects with a z value of 1 are the furthest away.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/8Y8w4tqvwQlKyTjld2Si.svg", alt="Illustration of Z clip space ranges in WebGL and WebGPU.", width="800", height="414" %}
    <figcaption>
      Z clip space ranges in WebGL and WebGPU.
    </figcaption>
</figure>

WebGL uses the OpenGL convention, where the Y axis is up and the Z axis is towards the viewer. WebGPU uses the Metal convention, where the Y axis is down and the Z axis is out of the screen. Note that the Y axis direction is down in framebuffer coordinate, viewport coordinate and fragment/pixel coordinate. In clip space, the Y axis direction is still up as in WebGL.

## Acknowledgements

Thanks to Corentin Wallez, Gregg Tavares, Stephen White, Ken Russell, and Rachel Andrew for reviewing this article.

I also recommend [WebGPUFundamentals.org](https://webgpufundamentals.org/webgpu/lessons/webgpu-from-webgl.html) for a deep dive of differences between WebGPU and WebGL.
