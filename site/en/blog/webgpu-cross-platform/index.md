---
layout: "layouts/blog-post.njk"
title: "WebGPU: the cross-platform graphics API of tomorrow"
description: "Learn how to build an app with WebGPU for the web and specific platforms."
hero: "image/vvhSqZboQoZZN9wBvoXq72wzGAf1/C9CyIqxrytYlH4uqCbgX.jpg"
alt: "Landscape photography of person's hand in front of sunrise."
date: 2023-07-20
#updated: YYYY-MM-DD
authors:
  - beaufortfrancois
tags:
  - webgpu
---

For web developers, WebGPU is a web graphics API that provides a unified and fast access to GPUs by exposing modern hardware capabilities and allowing rendering and computation operations on a GPU, similar to Direct3D 12, Metal, and Vulkan.

While it’s true, that story is not complete. WebGPU is first and foremost the result of a collaborative effort including major companies such as Apple, Google, Intel, Mozilla, and Microsoft. Among them, some [realized](https://kvark.github.io/web/gpu/native/2020/05/03/point-of-webgpu-native.html) that WebGPU could be more than a Javascript API but a cross-platform graphics API that could be used by developers across ecosystems other than the web. To fulfill the primary goal, a JavaScript API was [introduced](/blog/webgpu-release/) in Chrome 113. However, another significant project has been developed alongside it: the [webgpu.h](https://github.com/webgpu-native/webgpu-headers/blob/main/webgpu.h) C API. This C header file lists all the available procedures and data structures of WebGPU. It serves as a platform-agnostic hardware abstraction layer, allowing you to build platform-specific applications by providing a consistent interface across different platforms.

In this article, you will learn how to write a simple C++ app using WebGPU that runs both on the web and specific platforms. Spoiler alert, you’ll get the same red triangle that appears in a browser window and a desktop window with minimal adjustments to your codebase.

<figure>
{% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/JlK2WU8CCN4JaFMFu71O.png", alt="Screenshot of a red triangle powered by WebGPU in a browser window and a desktop window on macOS.", width="800", height="517" %}
  <figcaption>
     The same triangle powered by WebGPU in a browser window and a desktop window.
  </figcaption>
</figure>

## How does it work?

To see the completed application check out the [WebGPU cross-platform app](https://github.com/beaufortfrancois/webgpu-cross-platform-app/) repository.

The app is a minimalistic C++ example that shows how to use [WebGPU](https://gpuweb.github.io/gpuweb/) to build desktop and web apps from a single codebase. Under the hood, it uses WebGPU's [webgpu.h](https://github.com/webgpu-native/webgpu-headers/blob/main/webgpu.h) as a platform-agnostic hardware abstraction layer through a C++ wrapper called [webgpu_cpp.h](https://source.chromium.org/chromium/chromium/src/+/main:third_party/dawn/include/webgpu/webgpu_cpp.h).

{% Aside 'warning' %}
The webgpu.h and webgpu_cpp.h APIs are not yet stabilized.
{% endAside %}

On the web, the app is built against [Emscripten](https://emscripten.org/), which has [bindings](https://github.com/emscripten-core/emscripten/blob/main/src/library_webgpu.js) implementing webgpu.h on top of the JavaScript API. On specific platforms such as macOS or Windows, this project can be built against [Dawn](https://dawn.googlesource.com/dawn/), Chromium's cross-platform WebGPU implementation. It’s worth mentioning [wgpu-native](https://github.com/gfx-rs/wgpu-native), a Rust implementation of webgpu.h, also exists but is not used in this article.

## Getting started

All you need to start is a C++ compiler and [CMake](https://cmake.org/) to handle cross-platform builds in a standard way. Then, in a dedicated folder, create a `main.cpp` source file and a `CMakeLists.txt` build file.

The `main.cpp` file contains an empty `main()` function for now.

```cpp
int main() {}
```

The `CMakeLists.txt` file contains basic information about the project. The last line specifies the executable name is "app" and its source code is `main.cpp`.

```cmake
cmake_minimum_required(VERSION 3.13) # CMake version check
project(app)                         # Create project "app"
set(CMAKE_CXX_STANDARD 20)           # Enable C++20 standard

add_executable(app "main.cpp")
```

Run `cmake -B build` to create build files in a "build/" sub folder and `cmake --build build` to actually build the app and generate the executable file.

```bash
# Build the app with CMake.
$ cmake -B build && cmake --build build

# Run the app.
$ ./build/app
```

The app runs but there’s no output yet, as you need a way to draw things on the screen.

### Get Dawn

To draw your triangle, you can take advantage of [Dawn](https://dawn.googlesource.com/dawn/), Chromium's cross-platform WebGPU implementation. This includes [GLFW](https://www.glfw.org/) C++ library for drawing to the screen. One way to download Dawn is to add it as a [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) to your repository. The commands below will fetch it in a "dawn/" sub folder.

```bash
$ git init
$ git submodule add https://dawn.googlesource.com/dawn
```

Then, append to the `CMakeLists.txt` file as follows:
- The CMake `DAWN_FETCH_DEPENDENCIES` option will fetch all Dawn dependencies.
- The `dawn/` sub folder will be included in the target.
- Your app will depend on `webgpu_dawn`, `webgpu_cpp`, and `webgpu_glfw` targets so that you can use them in the `main.cpp` file later.

```cmake
…
set(DAWN_FETCH_DEPENDENCIES ON)
add_subdirectory("dawn" EXCLUDE_FROM_ALL)
target_link_libraries(app PRIVATE webgpu_dawn webgpu_cpp webgpu_glfw)
```

### Open a window

Now that Dawn is available, use GLFW to draw things on the screen. This library included in `webgpu_glfw` for convenience, allows you to write code that is platform-agnostic for window management.

To open a window named "WebGPU window" with a resolution of 512x512, update the `main.cpp` file as below. Note that `glfwWindowHint()` is used here to request no particular graphics API initialization.

```cpp
#include <GLFW/glfw3.h>

const uint32_t kWidth = 512;
const uint32_t kHeight = 512;

void Start() {
  if (!glfwInit()) {
    return;
  }

  glfwWindowHint(GLFW_CLIENT_API, GLFW_NO_API);
  GLFWwindow* window =
      glfwCreateWindow(kWidth, kHeight, "WebGPU window", nullptr, nullptr);

  while (!glfwWindowShouldClose(window)) {
    glfwPollEvents();
    // TODO: Render a triangle using WebGPU.
  }
}

int main() {
  Start();
}
```

Rebuilding the app and running it as before now results in an empty window. You’re making progress!

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/gL4jXP6R9bjAErMsWCDP.png", alt="Screenshot of a empty macOS window.", width="800", height="517" %}
  <figcaption>
     An empty window.
  </figcaption>
</figure>

### Get GPU device

In JavaScript, [`navigator.gpu`](https://developer.mozilla.org/docs/Web/API/Navigator/gpu) is your entrypoint for accessing the GPU. In C++, you need to manually create a `wgpu::Instance` variable that’s used for the same purpose. For convenience, declare `instance` at the top of the `main.cpp` file and call `wgpu::CreateInstance()` inside `main()`.

```cpp
…
#include <webgpu/webgpu_cpp.h>

wgpu::Instance instance;
…

int main() {
  instance = wgpu::CreateInstance();
  Start();
}
```

Accessing the GPU is asynchronous due to the shape of the JavaScript API. In C++, create a helper `GetDevice()` function that takes a callback function argument and calls it with the resulting `wgpu::Device`.

{% Aside 'note' %}
The code below will be simplified when [WebAssembly JavaScript Promise Integration API](https://v8.dev/blog/jspi) is available. This is not the case at the time of writing.
{% endAside %}

```cpp
void GetDevice(void (*callback)(wgpu::Device)) {
  instance.RequestAdapter(
      nullptr,
      [](WGPURequestAdapterStatus status, WGPUAdapter cAdapter,
         const char* message, void* userdata) {
        if (status != WGPURequestAdapterStatus_Success) {
          exit(0);
        }
        wgpu::Adapter adapter = wgpu::Adapter::Acquire(cAdapter);
        adapter.RequestDevice(
            nullptr,
            [](WGPURequestDeviceStatus status, WGPUDevice cDevice,
               const char* message, void* userdata) {
              wgpu::Device device = wgpu::Device::Acquire(cDevice);
              reinterpret_cast<void (*)(wgpu::Device)>(userdata)(device);
            },
            userdata);
      },
      reinterpret_cast<void*>(callback));
}
```

For easier access, declare a `wgpu::Device` variable at the top of the `main.cpp` file and update the `main()` function to call `GetDevice()` and assign its result callback to `device` before calling `Start()`.

 ```cpp
wgpu::Device device;
…

int main() {
  instance = wgpu::CreateInstance();
  GetDevice([](wgpu::Device dev) {
    device = dev;
    Start();
  });
}
```

### Draw a triangle

The [swap chain](https://en.wikipedia.org/wiki/Swap_chain) is not exposed in the JavaScript API as the browser takes care of it. In C++, you need to create it manually. Once again, for convenience, declare a `wgpu::SwapChain` variable at the top of the `main.cpp` file. Just after creating the GLFW window in `Start()`, call the handy `wgpu::glfw::CreateSurfaceForWindow()` function to create a `wgpu::Surface` (similar to an HTML canvas) and use it to setup the swap chain by calling the new helper `SetupSwapChain()` function in `InitGraphics()`. You also need to call `swapChain.Present()` to present the next texture in the while loop. This has no visible effect as there is no rendering happening yet.

```cpp
#include <webgpu/webgpu_glfw.h>
…

wgpu::SwapChain swapChain;

void SetupSwapChain(wgpu::Surface surface) {
  wgpu::SwapChainDescriptor scDesc{
      .usage = wgpu::TextureUsage::RenderAttachment,
      .format = wgpu::TextureFormat::BGRA8Unorm,
      .width = kWidth,
      .height = kHeight,
      .presentMode = wgpu::PresentMode::Fifo};
  swapChain = device.CreateSwapChain(surface, &scDesc);
}

void InitGraphics(wgpu::Surface surface) {
  SetupSwapChain(surface);
}

void Render() {
  // TODO: Render a triangle using WebGPU.
}

void Start() {
  …
  wgpu::Surface surface =
      wgpu::glfw::CreateSurfaceForWindow(instance, window);

  InitGraphics(surface);

  while (!glfwWindowShouldClose(window)) {
    glfwPollEvents();
    Render();
    swapChain.Present();
  }
}
```

Now is a good time to create the render pipeline with the code below. For easier access, declare a `wgpu::RenderPipeline` variable at the top of the `main.cpp` file and call the helper function `CreateRenderPipeline()` in `InitGraphics()`.

```cpp
wgpu::RenderPipeline pipeline;
…

const char shaderCode[] = R"(
    @vertex fn vertexMain(@builtin(vertex_index) i : u32) ->
      @builtin(position) vec4f {
        const pos = array(vec2f(0, 1), vec2f(-1, -1), vec2f(1, -1));
        return vec4f(pos[i], 0, 1);
    }
    @fragment fn fragmentMain() -> @location(0) vec4f {
        return vec4f(1, 0, 0, 1);
    }
)";

void CreateRenderPipeline() {
  wgpu::ShaderModuleWGSLDescriptor wgslDesc{};
  wgslDesc.code = shaderCode;

  wgpu::ShaderModuleDescriptor shaderModuleDescriptor{
      .nextInChain = &wgslDesc};
  wgpu::ShaderModule shaderModule =
      device.CreateShaderModule(&shaderModuleDescriptor);

  wgpu::ColorTargetState colorTargetState{
      .format = wgpu::TextureFormat::BGRA8Unorm};

  wgpu::FragmentState fragmentState{.module = shaderModule,
                                    .entryPoint = "fragmentMain",
                                    .targetCount = 1,
                                    .targets = &colorTargetState};

  wgpu::RenderPipelineDescriptor descriptor{
      .vertex = {.module = shaderModule, .entryPoint = "vertexMain"},
      .fragment = &fragmentState};
  pipeline = device.CreateRenderPipeline(&descriptor);
}

void InitGraphics(wgpu::Surface surface) {
  …
  CreateRenderPipeline();
}
```

Finally, send rendering commands to the GPU in the `Render()` function called each frame.

```cpp
void Render() {
  wgpu::RenderPassColorAttachment attachment{
      .view = swapChain.GetCurrentTextureView(),
      .loadOp = wgpu::LoadOp::Clear,
      .storeOp = wgpu::StoreOp::Store};

  wgpu::RenderPassDescriptor renderpass{.colorAttachmentCount = 1,
                                        .colorAttachments = &attachment};

  wgpu::CommandEncoder encoder = device.CreateCommandEncoder();
  wgpu::RenderPassEncoder pass = encoder.BeginRenderPass(&renderpass);
  pass.SetPipeline(pipeline);
  pass.Draw(3);
  pass.End();
  wgpu::CommandBuffer commands = encoder.Finish();
  device.GetQueue().Submit(1, &commands);
}
```

Rebuilding the app with CMake and running it now results in the long-awaited red triangle in a window! Take a break—you deserve it.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/I52fOYRoAfbkbgNszPU9.png", alt="Screenshot of a red triangle in a macOS window.", width="800", height="517" %}
  <figcaption>
     A red triangle in a desktop window.
  </figcaption>
</figure>

## Compile to WebAssembly

Let’s have a look now at the minimal changes required to adjust your existing codebase to draw this red triangle in a browser window. As said earlier, the app will be built against [Emscripten](https://emscripten.org/), a tool for compiling C/C++ programs to WebAssembly, which has [bindings](https://github.com/emscripten-core/emscripten/blob/main/src/library_webgpu.js) implementing webgpu.h on top of the JavaScript API.

### Update CMake settings

Once Emscripten is installed, update the `CMakeLists.txt` build file as below. The highlighted parts are the only things you need to change:
- `set_target_properties` is used to automatically add the "html" file extension to the target file. In other words, you’ll generate an "app.html" file.
- The `USE_WEBGPU` app link option is required to enable WebGPU support in Emscripten. Without it, your `main.cpp` file can’t access the `webgpu/webgpu_cpp.h` file.
- The `USE_GLFW` app link option is also required here so that you can reuse your GLFW code.

```cmake/6-9,13
cmake_minimum_required(VERSION 3.13) # CMake version check
project(app)                         # Create project "app"
set(CMAKE_CXX_STANDARD 20)           # Enable C++20 standard

add_executable(app "main.cpp")

if(EMSCRIPTEN)
  set_target_properties(app PROPERTIES SUFFIX ".html")
  target_link_options(app PRIVATE "-sUSE_WEBGPU=1" "-sUSE_GLFW=3")
else()
  set(DAWN_FETCH_DEPENDENCIES ON)
  add_subdirectory("dawn" EXCLUDE_FROM_ALL)
  target_link_libraries(app PRIVATE webgpu_dawn webgpu_cpp webgpu_glfw)
endif()
```

### Update the code

In Emscripten, creating a `wgpu::surface` requires a HTML canvas element. For this, call `instance.CreateSurface()` and specify the `#canvas` selector to match the appropriate HTML canvas element in the HTML page generated by Emscripten.

Instead of using a while loop, call [`emscripten_set_main_loop(Render)`](https://emscripten.org/docs/api_reference/emscripten.h.html#c.emscripten_set_main_loop) to make sure the `Render()` function is called at a proper smooth rate that lines up properly with the browser and monitor.

```cpp/2-4,6
#include <GLFW/glfw3.h>
#include <webgpu/webgpu_cpp.h>
#if defined(__EMSCRIPTEN__)
#include <emscripten/emscripten.h>
#else
#include <webgpu/webgpu_glfw.h>
#endif
```

```cpp/9-15,18,22-24,30
void Start() {
  if (!glfwInit()) {
    return;
  }

  glfwWindowHint(GLFW_CLIENT_API, GLFW_NO_API);
  GLFWwindow* window =
      glfwCreateWindow(kWidth, kHeight, "WebGPU window", nullptr, nullptr);

#if defined(__EMSCRIPTEN__)
  wgpu::SurfaceDescriptorFromCanvasHTMLSelector canvasDesc{};
  canvasDesc.selector = "#canvas";

  wgpu::SurfaceDescriptor surfaceDesc{.nextInChain = &canvasDesc};
  wgpu::Surface surface = instance.CreateSurface(&surfaceDesc);
#else
  wgpu::Surface surface =
      wgpu::glfw::CreateSurfaceForWindow(instance, window);
#endif

  InitGraphics(surface);

#if defined(__EMSCRIPTEN__)
  emscripten_set_main_loop(Render, 0, false);
#else
  while (!glfwWindowShouldClose(window)) {
    glfwPollEvents();
    Render();
    swapChain.Present();
  }
#endif
}
```

### Build the app with Emscripten

The only change needed to build the app with Emscripten is to prepend the `cmake` commands with the [magical](https://blog.ngzhian.com/emscripten-cmake.html) `emcmake` shell script. This time, generate the app in a `build-web` sub folder and start a HTTP server. Finally, open your browser and visit `build-web/app.html`.

```bash
# Build the app with Emscripten.
$ emcmake cmake -B build-web && cmake --build build-web

# Start a HTTP server.
$ npx http-server
```

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/vVU2crPsa4iRHU8065Uh.png", alt="Screenshot of a red triangle in a browser window.", width="800", height="517" %}
  <figcaption>
     A red triangle in a browser window.
  </figcaption>
</figure>

## What’s next

Here’s what you can expect in the future:

- Improvements in the stabilization of webgpu.h and webgpu_cpp.h APIs.
- Dawn initial support for Android and iOS.

In the meantime, please file [WebGPU issues for Emscripten](https://github.com/emscripten-core/emscripten/issues) and [Dawn issues](https://bugs.chromium.org/p/dawn/issues/list) with suggestions and questions.

## Resources

Feel free to explore the [source code](https://github.com/beaufortfrancois/webgpu-cross-platform-app) of this app.

If you want to dive more in creating native 3D applications in C++ from scratch with WebGPU, check out [Learn WebGPU for C++ documentation](https://eliemichel.github.io/LearnWebGPU/index.html) and [Dawn Native WebGPU Examples](https://dj2.github.io/Dusk/).

If you're interested in Rust, you can also explore the [wgpu](https://wgpu.rs) graphics library based on WebGPU. Take a look at their [hello-triangle](https://wgpu.rs/examples-gpu/?example=hello-triangle) demo.

## Acknowledgments

This article was reviewed by [Corentin Wallez](/authors/cwallez/), [Kai Ninomiya](https://github.com/kainino0x), and [Rachel Andrew](/authors/rachelandrew/).

Photo by [Marc-Olivier Jodoin](https://unsplash.com/@marcojodoin) on [Unsplash](https://unsplash.com/photos/TStNU7H4UEE).
