---
layout: 'layouts/blog-post.njk'
title: 'Deep-dive: VideoNG'
description: >
  Learn about modern playback systems and how Chromium powers several hundred million hours of watch time every day.
date: 2021-09-14
updated: 2021-10-19
thumbnail: 'image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/L14to8AnyICHGkgfgEJm.jpg'
alt: 'Bytes flowing in, and structured packets flowing out.'
authors:
  - dalecurtis
tags:
  - rendering
---
{% Aside %}
This post is a part of a series on the Chromium rendering engine. Check out the rest of the series to learn more about [RenderingNG](/blog/renderingng), [the architecture](/blog/renderingng-architecture/), and [key data structures](/blog/renderingng-data-structures/).
{% endAside %}

I'm Dale Curtis,
the engineering lead for media playback in Chromium.
My team is responsible for the web facing APIs for video playback like
[MSE](https://www.w3.org/TR/media-source/) and
[WebCodecs](https://www.w3.org/TR/webcodecs/),
and the platform specific internals involved in demuxing, decoding, and rendering audio and video.

In this article, I'll walk you through Chromium's video rendering architecture.
While some details around extensibility are likely Chromium-specific,
most of the concepts and designs discussed here apply to other rendering engines and even native playback apps.

Chromium's playback architecture has changed significantly over the years.
While we didn't start with the idea of a
[pyramid of success](/blog/renderingng/#the-pyramid-of-success) as described in the first post in this series,
we ultimately followed similar steps: reliability, performance, and then extensibility.

In the [beginning](https://caniuse.com/video),
video rendering was quite simple—[just a for loop](https://chromium.googlesource.com/chromium/src/+/5755042e9569648ce2d11e18e9d46834bc7395e4/media/renderers/video_renderer_impl.cc#198)
choosing which software decoded video frames to send to the compositor.
For years this was reliable enough, but as the complexity of the web increased,
the need for more performance and efficiency led to architectural changes.
Many improvements required OS-specific primitives;
thus, our architecture also had to become more extensible to reach all of Chromium's platforms.

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/IMFPhRwU3MKT1lEvfzIZ.png",
alt="Diagram of rendering flow to different Chromium platforms.",
width="800", height="449" %}

Video rendering can be broken into two steps:
choosing what to deliver and delivering that information efficiently.
In the interest of readability,
I'll cover efficient delivery before diving into how Chromium chooses what to deliver.

## Some terms and layout

Since this article focuses on rendering,
I'll only briefly touch on the demuxing and decoding aspects of the pipeline.

{% Aside 'key-term' %}
Demuxing is the process by which the media pipeline turns a byte stream into individual encoded audio and video packets.
{% endAside %}

{% Aside 'key-term' %}
Decoding is the process by which those packets are turned into raw audio and video frames.
In the context of media playback,
rendering is choosing where in time to present those decoded audio and video frames.
{% endAside %}

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/f3QXPzlrvld8AowYWoLM.jpg",
alt="Bytes flowing in, and structured packets flowing out.",
width="800", height="771" %}

Decoding and demuxing in our modern security-conscious world requires a fair bit of care.
Binary parsers are rich target environments,
and media playback is full of binary parsing.
As such, security issues in media parsers are extremely common.

Chromium practices
[defense in depth](https://www.chromium.org/Home/chromium-security/core-principles)
to reduce the risk of security issues to our users.
In practical terms, this means demuxing and software decoding always happen in a low privilege process,
while hardware decoding occurs in a process with just enough privileges to talk to the system's GPU.

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/hQtJnwvdqeJn6fAKjw4e.png",
alt="The Chromium sandboxes for the renderer, GPU, and audio processes.",
width="622", height="267" %}

Chromium's cross-process communication mechanism is called
[Mojo](https://chromium.googlesource.com/chromium/src/+/HEAD/mojo/README.md).
While we won't get into the details of Mojo in this article,
as the abstraction layer between processes,
it's a cornerstone of Chromium's extensible media pipeline.
It's important to be aware of this as we walk through the playback pipeline
since it informs the complex orchestration of cross-process components interacting to receive,
demux, decode, and finally display media.

## So many bits

Understanding today's video rendering pipelines requires knowledge of why video is special: bandwidth.
A 3840x2160 (4K) resolution playback at 60 frames per second
uses between 9-12 gigabits/second of memory bandwidth.
While modern systems may have a peak bandwidth in hundreds of gigabits per second,
video playback still represents a substantial portion.
Without care, the total bandwidth can easily multiply due to copies or trips between GPU and CPU memory.

The goal of any modern video playback engine with efficiency in mind
is to minimize bandwidth between the decoder and the final rendering step.
For this reason, video rendering is largely decoupled from Chromium's main rendering pipeline.
Specifically, from the perspective of our main rendering pipeline,
video is just a fixed-size hole with opacity.
Chromium achieves this using a concept called
[surfaces](/blog/renderingng-data-structures/#compositor-frames-surfaces-render-surfaces-and-gpu-texture-tiles)—whereby each video talks directly to
[Viz](/blog/renderingng-architecture/#cpu-processes).

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/yqFdcKq83mHZPypofin1.png",
alt="A webpage with a hole and an arrow saying 'Video goes here'.",
width="572", height="281" %}

Due to the popularity of mobile computing,
power and efficiency have become a significant focus in the current generation.
A result of this is that decoding and rendering are more coupled than ever at the hardware
level—resulting in video just looking like a hole with opacity, even to the OS itself!
Platform level decoders often only provide opaque buffers
that Chromium passes through to the platform level compositing system in the form of overlays.

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/uuMo0YkjYi6ZRNTh1Qxn.png",
alt="A webpage with a hole and an arrow saying 'Video goes here', wrapped by a box representing the operating system.",
width="571", height="362" %}

Every platform has its own form of overlays that their platform decoding APIs work in concert with.
Windows has
[Direct Composition](https://docs.microsoft.com/en-us/windows/win32/medfound/hardware-overlay-support) and
[Media Foundation Transforms](https://docs.microsoft.com/en-us/windows/win32/medfound/media-foundation-transforms),
macOS has
[CoreAnimation Layers](https://developer.apple.com/documentation/quartzcore/calayer) and
[VideoToolbox](https://developer.apple.com/documentation/videotoolbox),
Android has
[SurfaceView](https://developer.android.com/reference/android/view/SurfaceView) and
[MediaCodec](https://developer.android.com/reference/android/media/MediaCodec), and Linux has
[VASurfaces](https://source.chromium.org/chromium/chromium/src/+/main:media/gpu/vaapi/va_surface.h;l=20;drc=e0b362edd9b49143b89fc76c4a31dd5603b6fbd0) and
[VA-API](https://01.org/linuxmedia/vaapi).
Chromium's abstractions for these concepts are handled by
the
[OverlayProcessor](https://source.chromium.org/chromium/chromium/src/+/main:components/viz/service/display/overlay_processor_interface.h;drc=0deb8efb4a2bbf029b1990ca5e1dc96037ac25f8) and
[mojo::VideoDecoder](https://source.chromium.org/chromium/chromium/src/+/main:media/mojo/mojom/video_decoder.mojom;drc=4041de9d04f91b51497e7769608391a8e8bedf5e) interfaces respectively.

In some cases it's possible for these buffers to be mappable into system memory,
so they don't even need to be opaque and don't consume any bandwidth until accessed—Chromium calls these
[GpuMemoryBuffers](https://docs.google.com/document/d/1SaTYTBvHWWDKA3MPJPpQ-79RNgdS4Xu4g3KiD39VQjU/preview).
On Windows these are backed by
[DXGI buffers](https://docs.microsoft.com/en-us/windows/win32/direct3ddxgi/d3d10-graphics-programming-guide-dxgi),
on macOS
[IOSurfaces](https://developer.apple.com/documentation/iosurface),
on Android
[AHardwareBuffers](https://developer.android.com/ndk/reference/group/a-hardware-buffer), and on Linux
[DMA buffers](https://01.org/linuxgraphics/gfx-docs/drm/driver-api/dma-buf.html#buffer-sharing-and-synchronization).
While video playback generally doesn't need this access,
these buffers are important for video capture to ensure minimal bandwidth between the capture device and eventual encoders.

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/oOERhv9vDRkFKnKSjFOf.png",
alt="Diagram of the buffers mentioned in the preceding text.",
width="580", height="420" %}

Since the GPU is often responsible for both decoding and displaying,
the use of these (also often) opaque buffers ensures that high bandwidth video data never actually leaves the GPU.
As we discussed earlier,
keeping data on the GPU is incredibly important for efficiency;
especially at high resolutions and frame rates.

The more we can take advantage of OS primitives like overlays and GPU buffers,
the less bandwidth is spent shuffling video bytes around unnecessarily.
Keeping everything in one place from decoding all the way to rendering can lead to incredible power efficiency.
For example, when Chromium
[enabled overlays](https://bugs.chromium.org/p/chromium/issues/detail?id=594449) on macOS,
power consumption during fullscreen video playback was halved!
On other platforms like
[Windows](https://bugs.chromium.org/p/chromium/issues/detail?id=654631),
[Android](https://bugs.chromium.org/p/chromium/issues/detail?id=889328) and
[ChromeOS](https://bugs.chromium.org/p/chromium/issues/detail?id=370522),
we can use overlays even in non-fullscreen cases, saving up to 50% nearly everywhere.


## Rendering

Now that we've covered the optimal delivery mechanisms,
we can discuss how Chromium chooses what to deliver.
Chromium's playback stack uses a "pull" based architecture,
meaning each component in the stack requests its inputs from the one below it in hierarchical order.
At the top of the stack is the rendering of audio and video frames,
next lower is decoding, followed by demuxing, and finally I/O.
Each rendered audio frame advances a clock which is used to choose video frames
for rendering when combined with a presentation interval.

On each presentation interval (each
[refresh](https://en.wikipedia.org/wiki/Refresh_rate) of the display),
the video renderer is asked to provide a video frame by a
[CompositorFrameSink](https://source.chromium.org/chromium/chromium/src/+/main:services/viz/public/mojom/compositing/compositor_frame_sink.mojom;l=26;drc=eae24aa28b1f099f28431612963d39bafd0e4213)
attached to the
[SurfaceLayer](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/how_cc_works.md#SurfaceLayer) mentioned earlier.
For content with a
[frame rate](https://en.wikipedia.org/wiki/Frame_rate) less than the display rate,
that means showing the same frame more than once,
while if the frame rate is greater than the display rate, some frames are never shown.

There's much more to synchronizing audio and video in ways that are pleasing to viewers.
See [Project Butter](https://docs.google.com/document/d/1oUb_ap0TAa1sDci0wEQ6BEzd_lB7Eghv93NXyZ3952E/preview)
for a longer discussion on how optimal video smoothness is accomplished in Chromium.
It explains how video rendering can be broken down into ideal sequences representing how many times each frame should be shown.
For example: "1 frame every display interval ([1], 60&nbsp;fps in 60&nbsp;Hz)",
"1 frame every 2 intervals ([2], 30&nbsp;fps in 60&nbsp;Hz)",
or more complicated patterns like [2:3:2:3:2] (25&nbsp;fps in 60&nbsp;Hz)
covering multiple distinct frames and display intervals.
The closer a video renderer sticks to this ideal pattern the more likely a user will perceive a playback as being smooth.

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/JPUQv1c8ZPCwLAVXBuO5.png",
alt="The sequence of demuxing, decoding, and rendering.",
width="468", height="211" %}

While most Chromium platforms render frame by frame, not all do.
Our extensible architecture allows for batched rendering as well.
Batched rendering is an efficiency technique where the OS level compositor
is told about multiple frames in advance and handles releasing them on an application provided timing schedule.

## The future is now?

We've focused on how Chromium takes advantage of OS primitives to deliver a best in class playback experience.
But what about websites that want to go beyond basic video playback?
Can we offer them the same powerful primitives that Chromium itself uses to usher in the next generation of web content?

We think the answer is yes!
[Extensibility](/blog/renderingng/#extensibility-the-right-tools-for-the-job)
is at the heart of how we think about the web platform these days.
We've been working with other browsers and developers to create new technologies like
[WebGPU](https://www.w3.org/TR/webgpu/) and
[WebCodecs](https://w3c.github.io/webcodecs/)
so that web developers can use the very same primitives Chromium does when talking to the OS.
WebGPU brings support for
[GPU buffers](https://www.w3.org/TR/webgpu/#buffer-interface)
and WebCodecs brings platform decoding and encoding primitives
compatible with the aforementioned overlay and GPU buffer systems.

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/dpL5XG0wzSQ7lFnbYsbU.png",
alt="Relationship between WebCodecs and WebGPU.",
width="524", height="98" %}

## End of stream

Thanks for reading! I hope you've left with a better understanding of modern playback systems and
how Chromium powers several hundred million hours of watch time every day.
If you're looking for further reading on codecs and modern web video I recommend
[H.264 is magic](https://sidbala.com/h-264-is-magic/) by Sid Bala,
[How Modern Video Players Work](https://blog.streamroot.io/how-modern-video-players-work/) by Erica Beaves,
and [Packaging award-winning shows with award-winning technology](https://netflixtechblog.com/packaging-award-winning-shows-with-award-winning-technology-c1010594ba39)
by Cyril Concolato.

One illustration (the pretty one!) by Una Kravets.
