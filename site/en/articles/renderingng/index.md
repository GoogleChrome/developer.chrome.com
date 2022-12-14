---
layout: 'layouts/blog-post.njk'
title: 'RenderingNG'
description: >
  In 2021, we will largely complete the process of designing, building and shipping RenderingNG, a next-generation rendering architecture for Chromium.
subhead: >
  Ready for the next generation of web content
date: 2021-06-22
updated: 2021-06-23
authors:
  - chrishtr
tags:
  - rendering
---
{% Aside %}
This post is a part of a series on the Chromium rendering engine. Check out the rest of the series to learn more about the [RenderingNG architecture](/blog/renderingng-architecture/), [key data structures](/blog/renderingng-data-structures/), [VideoNG](/blog/videong/), [LayoutNG](/blog/layoutng/)
and [BlinkNG](/blog/blinkng/).
{% endAside %}

I'm Chris Harrelson,
the engineering lead for Rendering (transforming HTML and CSS to pixels) in Blink.
I've been deep in the trenches of rendering performance on the web for over eight years,
with a personal goal of doing whatever I can to make delivering excellent UX on the web faster,
easier, and more reliable.
I'm excited for us to tell you about what we've done in that time to build a new, cutting-edge Chromium rendering engine architecture.
To achieve this has been an enormous labor of love,
and I hope you enjoy hearing about it!

In 2021, we will largely complete the process of designing, building and shipping this architecture. Let's call it RenderingNG,
since it is truly a next-generation rendering architecture that greatly outperforms what came before.
RenderingNG has been in progress for at least eight years,
and represents the collective work of many dedicated Chromium developers.
It unlocks a huge amount of potential for the next generation of fast, fluid, reliable,
responsive and interactive web content.
It's also a baseline that I believe defines a new minimum standard for all web rendering engines that developers can rely on.

<figure>
{% Img
src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/m1d1iB6Ts2HqWRAx8cX5.jpg",
alt="Sketch of the different elements of RenderingNG",
width="800", height="789" %}
  <figcaption>RenderingNG</figcaption>
</figure>

This blog post is the first in a series,
where we'll explain what we built, why we built it, and how it works.
In this first post, I'll start with:

- Our north star goal.
- The pyramid of success:
principles that guide our work, and examples of those principles in practice.
- The features and capabilities that RenderingNG makes possible.
- A high-level overview of the major project components of RenderingNG.

## North star

The north star goal motivating RenderingNG is that the browser engine implementation,
and the richness of its rendering APIs, should not be a limiting factor of  UX on the web.

You should not need to worry about browser bugs making features unreliable,
or breaking your site's rendering.

There should be no mysterious performance cliffs.
And, you should not need to work around missing built-in features.

It should just work.

I believe RenderingNG is a huge step towards this north star goal.
Before RenderingNG, we could (and did) add rendering features and improve performance,
but struggled to make those features reliable for developers,
and there were many performance cliffs.
Now we have an architecture that systematically squashes many of those problems,
and also unblocks advanced features that were not considered feasible before. It:

- Has rock-solid core features across different platform, device, and operating system combos.
- Has predictable and reliable performance.
- Maximizes usage of hardware capabilities (cores, GPU, screen resolution, refresh rates, low-level raster APIs).
- Performs only the work that's needed to display visible content.
- Has built-in support for common visual design, animation and interaction design patterns.
- Provides developer APIs to easily manage rendering costs.
- Provides rendering pipeline extension points for developer add-ins.
- Optimizes all content—HTML, CSS, 2D Canvas, 3D canvas, images, video, and fonts.

### Comparison with other browser rendering engines

Gecko and Webkit have also implemented most of the same architectural features described in these blog posts,
and in some cases even added them before Chromium.
Which is great!
While any one browser getting faster and more reliable is cause for celebration and has real impact,
the ultimate goal is to advance the baseline for all browsers, so that developers can rely on it.

## The pyramid of success

My philosophy is that success is the result of first achieving reliability,
then scalable performance,
and finally extensibility.

{% Img
src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/9etubUUi0q6g05dqPurk.jpg",
alt="Pyramid with labels Reliability at the base,
Performance in the middle, extensibility at the top",
width="800", height="365" %}

As with a real-life pyramid, each level provides a necessarily-solid foundation for the level above.

## Reliability

{% Img
src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/xzpN0AsbF2yocQSDXk7v.jpg",
alt="Sketch showing how with RenderingNG features can be added without a large increase in frustration",
width="800", height="421" %}

If rich and complex user experiences are to be possible at all,
the first thing we need is a rock-solid platform.
The core features and underpinnings must work correctly,
and keep working over time.
And it's just as important that those features compose well and don't have strange edge-case behavior or bugs.

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/TciyjFBU8BqhabpODe7w.jpg",
alt="Sketch shows circular nature of adding features, getting feedback, improving reliability",
width="800", height="627" %}

For this reason, reliability is the single most important part of RenderingNG.
And reliability is the result of good testing,
quality feedback loops, metrics, and software design patterns.

To give a sense of how important I think reliability is,
we spent most of the last eight years nailing just this part.
First, we built a deep knowledge of the system—learning from bug reports where the weak points were and fixing them,
bootstrapping comprehensive tests, and
understanding the performance needs of sites and limitations of Chromium's performance.
Then we carefully and incrementally designed and rolled out key design patterns and data structures.
Only then were we ready to add truly next-generation primitives for responsive design,
scalability and customization of rendering.


{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/pITBDEX5JnddksI8bQge.jpg",
alt="Sketch graph shows reliability, performance, and extensibility improving over time",
width="800", height="360" %}

This is not to say that nothing was improved over that time in Chromium.
In fact, the opposite is true!
Those years saw a steady and sustained increase in reliability and performance
as we refactored and rolled out each improvement step-by-step.

### Testing and metrics

Over the past 8 years,
we have added tens of thousands of unit,
performance and integration tests.
In addition, we have developed comprehensive metrics measuring many aspects of how Chromium's rendering behaves in local testing,
in performance benchmarks,
and in the wild on real sites, with real users and devices.

But no matter how great RenderingNG (or another browser's rendering engine, for that matter) is,
it still won't be easy to develop for the web if there are lots of bugs or differences in behavior between browsers.
To address this, we also maximize use of
[Web Platform Tests](https://web-platform-tests.org/).
Each of these tests verifies a usage pattern of the web platform that all browsers should aim to pass.
We also closely monitor metrics for
[passing more tests over time](https://wpt.fyi/results/)
and [increasing core compatibility](https://wpt.fyi/compat2021).

Web Platform Tests are a collaborative effort.
For example, Chromium engineers have added only about 10% of the total WPT tests for features of CSS;
other browser vendors, independent contributors, and spec authors contribute the rest.
It takes a village to raise the interoperable web!

<figure>
 {% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/EALd0RHmBdnxkPNmh5Mu.png",
 alt="Tests passing in different engines",
 width="800", height="406",
 class="screenshot" %}
 <figcaption>
 From <a href="http://wpt.fyi/compat2021">wpt.fyi/compat2021</a>,
 measuring pass rate of WPTs for core features
 </figcaption>
</figure>

### Good software design patterns

Reliably delivering quality software is, in turn,
a whole lot easier if the code is easy to understand,
and designed in a way that minimizes the likelihood of bugs.
We'll have a lot more to say about RenderingNG's software design in subsequent blog posts.

## Scalable performance

Achieving great performance—across the dimensions of speed, memory, and power use—
is the next most important aspect of RenderingNG.
We want interactions with all web sites to be smooth and responsive,
yet not sacrifice the stability of the device.

But we don't just want performance,
we want scalable performance—an architecture that performs reliably well on low-end and high-end machines,
and across OS platforms.
I call this scaling up—taking advantage of all that the hardware device can achieve,
and scaling down—maximizing efficiency and reducing demand on the system when needed.

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/Hdfm4k1cSwfJpffgx3eH.jpg",
alt="", width="800", height="533" %}

To get there, we needed to make maximum use of caching,
performance isolation, and GPU hardware acceleration.
Let's consider each in turn. And to make it concrete,
let's think about how each of them contributes to the performance of one extremely important interaction on web pages: scrolling.

### Caching

In a dynamic, interactive UI platform such as the web,
caching is the single most important way to dramatically improve performance.
The most well-known kind of caching in a browser is the HTTP cache,
but rendering also has many caches.
The most important cache for scrolling is cached GPU textures and display lists,
which allow scrolling to be extremely fast while minimizing battery drain and working well across a variety of devices.

Caching helps battery life and animation frame rate for scrolling,
but even more important is that it unblocks performance isolation from the main thread.

### Performance isolation

On modern desktop computers,
you never have to worry about background applications slowing down the one you're working in.
That's because of preemptive multitasking,
which is in turn a form of performance isolation:
making sure independent tasks don't slow each other down.

On the web, the best example of performance isolation is scrolling.
Even on websites that have lots of slow JavaScript,
scrolling can be very smooth,
because it runs on a different thread that doesn't have to depend on the JavaScript and layout thread.
We put a ton of effort into RenderingNG to make sure that every possible scroll is threaded,
through caching that goes well beyond just a display list to more complex situations.
Examples include code to represent fixed- and sticky-positioned elements,
passive event listeners, and high-quality text rendering.

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/ooz0P0bUN3x69HDzJWaW.jpg",
alt="Sketch shows that with RenderingNG performance stays solid even when JavaScript is very slow.",
width="800", height="559" %}

### GPU acceleration

A GPU makes generating pixels and drawing to the screen dramatically faster—in
many cases, every pixel can be drawn in parallel with every other pixel,
resulting in an enormous speed increase.
A key component of RenderingNG is GPU raster and draw everywhere.
This uses the GPU on all platforms, and all devices, to hyper-accelerate the rendering and animating of web content.
This is especially important on low-end devices or very high-end ones,
which often have a much more capable GPU than other parts of the device.


{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/2kly2kdoelhTeDqUHEPn.jpg",
alt="Sketch shows that with RenderingNG performance does not degrade so much.",
width="800", height="559" %}

## Extensibility: The right tools for the job

Once we have reliability and scalable performance,
we're now ready to build on top a host of tools to help developers extend the built-in parts of HTML,
CSS and Canvas,
and in ways that do not sacrifice any of that hard-won performance and reliability.

This includes built-in plus JavaScript-exposed APIs for advanced use cases of responsive design,
progressive rendering, smoothness and responsiveness, and threaded rendering.

The following open web APIs, championed by Chromium, were made possible by RenderingNG,
and were previously considered infeasible.

All of them were developed with open specifications and collaboration with open web
partners—engineers at other browsers, experts, and web developers.
In subsequent blog posts, we will dive into each of these and explain how RenderingNG makes them possible.

- [content-visibility](https://web.dev/content-visibility/):
allows sites to easily avoid rendering work for offscreen content,
and cache rendering for not-currently-shown single page application views.
- [OffscreenCanvas](/web/updates/2018/08/offscreen-canvas): allows canvas rendering
(both the 2D canvas API and WebGL) to run on its own thread for reliably excellent performance.
This project is also another major milestone for the web—it's
the very first web API that allows JavaScript (or WebAssembly!)
to render a single web page document from multiple threads.
- [Container queries](https://web.dev/new-responsive/): allows a single component to responsively lay itself out,
unblocking a whole universe of plug-and-play components (currently an experimental implementation).
- [Origin isolation](https://web.dev/origin-agent-cluster/): allows sites to opt into more performance isolation between iframes.
- Off-main-thread [paint worklets](https://web.dev/houdini-how/): gives developers a way to extend how elements are painted,
with code that runs on the compositor thread.

In addition to explicit web APIs,
RenderingNG allowed us to ship several very significant "automatic features" that benefit all sites:

- [Site Isolation](/blog/site-isolation/):
puts cross-origin iframes in different CPU processes,
for better security and performance isolation.
- [Vulkan](https://www.vulkan.org/),
[D3D12](https://docs.microsoft.com/en-us/windows/win32/direct3d12/directx-12-programming-guide), and
[Metal](https://developer.apple.com/metal/): takes advantage of lower-level APIs that use GPUs more efficiently than OpenGL.
- More composited animations:
[SVG](/blog/hardware-accelerated-animations/), background color.

Additional upcoming features unblocked by RenderingNG that we're excited about include:

- [Scroll-linked animations](https://drafts.csswg.org/scroll-animations-1/).
- [Hidden, yet searchable and accessible DOM](https://github.com/whatwg/html/issues/6040).
- [Shared element transitions](https://github.com/WICG/shared-element-transitions).
- [Custom layout](https://www.w3.org/TR/css-layout-api-1/).
- Off-main-thread compositing; decoupling threading and compositing.

## Key projects that make up RenderingNG

Below is a list of the key projects within RenderingNG. Subsequent blog posts will deep-dive into each of them.

### CompositeAfterPaint

Disentangles compositing from style, layout and paint,
allowing much-improved reliability and predictable performance, increased throughput,
and using less memory without sacrificing performance. It began in 2014 and will finish this year.

<table>
  <thead>
    <tr>
      <th>Year</th>
      <th>Progress</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2015</td>
      <td>Ship display lists.</td>
    </tr>
    <tr>
      <td>2017</td>
      <td>Ship new invalidation.</td>
    </tr>
    <tr>
      <td>2018</td>
      <td>Ship property trees part 1.</td>
    </tr>
    <tr>
      <td>2019</td>
      <td>Ship property trees part 2.</td>
    </tr>
    <tr>
      <td>2021</td>
      <td>Completed shipping the project.</td>
    </tr>
    <tr>
  </tbody>
</table>

### LayoutNG

A ground-up rewrite of all layout algorithms,
for greatly improved reliability and more predictable performance. It began in 2016
and is planned to finish this year.

<table>
  <thead>
    <tr>
      <th>Year</th>
      <th>Progress</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2019</td>
      <td>Ship block flow.</td>
    </tr>
    <tr>
      <td>2020</td>
      <td>Ship flex, editing.</td>
    </tr>
    <tr>
      <td>2021</td>
      <td>Ship everything else.</td>
    </tr>
    <tr>
  </tbody>
</table>

### BlinkNG

A systematic cleanup and refactoring of the Blink rendering engine into cleanly separated pipeline phases.
This allows for better caching, higher reliability,
and re-entrant or delayed-rendering features such as content-visibility and container queries. It began in 2014, and incremental improvement and has been ongoing since. It will complete in 2021.

### GPU Acceleration everywhere

A long-term effort to roll out GPU rasterization, draw and animation on all platforms, all of the time.
GPU acceleration provides an enormous speedup for most content,
because every pixel can be processed in parallel.
It is also an effective method for improving performance on low-end devices, which tend to still have a GPU.
It began in 2014 and completed in 2020.

<table>
  <thead>
    <tr>
      <th>Year</th>
      <th>Progress</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2014</td>
      <td>Canvas support. Shipped on opt-in content on Android.</td>
    </tr>
    <tr>
      <td>2016</td>
      <td>Ship on Mac.</td>
    </tr>
    <tr>
      <td>2017</td>
      <td>GPU is used on over 60% of Android page views.</td>
    </tr>
    <tr>
      <td>2018</td>
      <td>Ship on Windows, ChromeOS, and Android Go.</td>
    </tr>
    <tr>
      <td>2019</td>
      <td>Threaded GPU rasterization.</td>
    </tr>
    <tr>
      <td>2020</td>
      <td>Ship remaining Android content.</td>
    </tr>
    <tr>
  </tbody>
</table>

### Threaded scrolling, animations, and decode

A long-term effort to move all scrolling, non-layout-inducing animations,
and image decoding off of the main thread. It began in 2011 and is ongoing.

<table>
  <thead>
    <tr>
      <th>Year</th>
      <th>Progress</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2011</td>
      <td>Initial support for threaded scroll and animation.</td>
    </tr>
    <tr>
      <td>2015</td>
      <td>Layer squashing.</td>
    </tr>
    <tr>
      <td>2016</td>
      <td>Universal overflow scrolling.</td>
    </tr>
    <tr>
      <td>2017</td>
      <td>Image decodes on compositor thread.</td>
    </tr>
    <tr>
      <td>2018</td>
      <td>Image Animations on compositor thread.</td>
    </tr>
    <tr>
      <td>2020</td>
      <td>Always composite fixed-position.</td>
    </tr>
    <tr>
      <td>2021</td>
      <td>Percentage transform animations, SVG animations.</td>
    </tr>
    <tr>
  </tbody>
</table>

### Viz

A centralized raster and draw process for Chromium that increases throughput,
optimizes memory, and allows optimal use of hardware capabilities.
It also has other benefits less visible to web developers but very visible to users,
such as unblocking Site Isolation and decoupling the rendering pipeline from browser UI rendering. It began in 2016 and will complete in 2021.

<table>
  <thead>
    <tr>
      <th>Year</th>
      <th>Progress</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2018</td>
      <td>OOP-R shipped on Android, Mac and Windows.</td>
    </tr>
    <tr>
      <td>2019</td>
      <td>OOP-D shipped. OOP-R shipped everywhere (except Canvas). SkiaRenderer shipped on Linux.</td>
    </tr>
    <tr>
      <td>2020</td>
      <td>SkiaRenderer shipped on Windows & Android. Vulkan shipped on Android.</td>
    </tr>
    <tr>
      <td>2021</td>
      <td>SkiaRenderer shipped on Mac (and ChromeOS soon).</td>
    </tr>
    <tr>
  </tbody>
</table>

Definitions of terms in the chart above:

OOP-D
: Out of process display compositor.
Display compositing is the same kind of activity as an
[OS compositor](https://en.wikipedia.org/wiki/Compositing_window_manager).
Out of process means doing it in the Viz process instead of the web page's render process or the browser UI process.

OOP-R
: Out of process raster. Raster is converting display lists into pixels.
Out of process means doing it in the Viz process instead of the web page's render process.

SkiaRenderer
: A new display compositor implementation that can support execution on a range of different
underlying GPU APIs such as Vulkan, D3D12 or Metal.

### Threaded and accelerated canvas rendering

This is the project that put in place the architectural pieces that made OffscreenCanvas possible.
It began in 2015 and will finish in 2021.

<table>
  <thead>
    <tr>
      <th>Year</th>
      <th>Progress</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2018</td>
      <td>Ship OffscreenCanvas.</td>
    </tr>
    <tr>
      <td>2019</td>
      <td>Ship ImageBitmapRenderingContext.</td>
    </tr>
    <tr>
      <td>2021</td>
      <td>Ship OOP-R.</td>
    </tr>
    <tr>
  </tbody>
</table>

### VideoNG

A long-term effort to provide efficient, reliable, and high quality video playback on the web.

<table>
  <thead>
    <tr>
      <th>Year</th>
      <th>Progress</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2014</td>
      <td>Introduced a Mojo-based rendering framework.</td>
    </tr>
    <tr>
      <td>2015</td>
      <td>Shipped <a href="https://docs.google.com/document/d/1oUb_ap0TAa1sDci0wEQ6BEzd_lB7Eghv93NXyZ3952E/preview">Project Butter</a> and video overlays for smoother video rendering.</td>
    </tr>
    <tr>
      <td>2016</td>
      <td>Shipped unified Android and desktop decoding and rendering pipelines.</td>
    </tr>
    <tr>
      <td>2017</td>
      <td>Shipped HDR and color-corrected video rendering.</td>
    </tr>
    <tr>
      <td>2018</td>
      <td>Shipped Mojo-based video decoding pipeline.</td>
    </tr>
    <tr>
      <td>2019</td>
      <td>Shipped Surface-based video rendering pipeline.</td>
    </tr>
    <tr>
      <td>2021</td>
      <td>Shipped <a href="https://en.wikipedia.org/wiki/4K_resolution">4K</a> protected content rendering support on ChromeOS.</td>
    </tr>
  </tbody>
</table>

Definitions of terms in the chart above:

Mojo
: A next-generation IPC subsystem for Chromium.

Surface
: A concept that is part of the Viz project design.

## Conclusion

I couldn't be more excited about the rate of improvement of rendering on the web and Chromium.
I expect the pace will continue to accelerate in coming years
as we are able to build on top of the solid basis of RenderingNG.

Stay tuned for many more future posts that will go into a lot more detail about the new architecture,
how it came to be, and how it works.

_Devices photo by
[Eirik Solheim](https://unsplash.com/@eirikso?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on
[Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_

Illustrations by Una Kravets.
