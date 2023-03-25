---
layout: 'layouts/blog-post.njk'
title: 'Overview of the RenderingNG architecture'
description: >
  This post explains the components of the RenderingNG architecture,
  and how the rendering pipeline flows through them.
date: 2021-07-26
authors:
  - chrishtr
tags:
  - rendering
---

{% Aside %}
This post is a part of a series on the Chromium rendering engine. Check out the rest of the series to learn more about [RenderingNG](/blog/renderingng),  [key data structures](/blog/renderingng-data-structures/), [VideoNG](/blog/videong/), and [LayoutNG](/blog/layoutng/).
{% endAside %}

In a [previous post](/blog/renderingng/),
I gave an overview of the RenderingNG architecture goals and key properties.
This post will explain how its component pieces are set up,
and how the rendering pipeline flows through them.

Starting at the highest level and drilling down from there,
the tasks of rendering are:

1. _Render contents_ into pixels on the screen.
1. _Animate visual effects_ on the contents from one state to another.
1. _Scroll_ in response to input.
1. _Route input_ efficiently to the right places so that developer scripts and other subsystems can respond.

The _contents_ to render are a tree of _frames_ for each browser tab, plus the browser UI.
And, a stream of raw input events from touch screens,
mice, keyboards, and other hardware devices.

Each frame includes:

- DOM state
- CSS
- Canvases
- External resources, such as images, video, fonts, and SVG

A _frame_ is an HTML document, plus its URL.
A web page loaded in a browser tab has a top-level frame,
child frames for each iframe included in the top-level document,
and their recursive iframe descendants.

A _visual effect_ is a graphical operation applied to a bitmap,
such as scroll, transform, clip, filter, opacity, or blend.

## Architecture components

In RenderingNG, these tasks are split logically across several stages and code components.
The components end up in various CPU processes, threads,
and sub-components within those threads.
Each plays an important role in achieving
[reliability](/blog/renderingng/#reliability),
[scalable performance](/blog/renderingng/#scalable-performance)
and [extensibility](/blog/renderingng/#extensibility-the-right-tools-for-the-job) for all web content.

### Rendering pipeline structure

{% Img
src="image/cGQxYFGJrUUaUZyWhyt9yo5gHhs1/yiOcXy6pCOAlx6fhBVFP.jpeg",
alt="Diagram of the rendering pipeline as explained in the following text.",
width="800", height="1273" %}

Rendering proceeds in a pipeline with a number of stages and artifacts created along the way.
Each _stage_ represents code that does one well-defined task within rendering.
The _artifacts_ are data structures that are inputs or outputs of the stages;
in the diagram inputs or outputs are indicated with arrows.

This blog post won't go into much detail about the artifacts;
that will be discussed in the next post:
_Key Data Structures and their roles in RenderingNG_.

### The pipeline stages

In the preceeding diagram, stages are notated with colors indicating in which thread or process they execute:

- **Green:** render process main thread
- **Yellow:** render process compositor
- **Orange:** viz process

In some cases they can execute in multiple places,
depending on the circumstance,
which is why some have two colors.

The stages are:

1. _Animate:_ change computed styles and mutate _property trees_ over time based on declarative timelines.
1. _Style:_ apply CSS to the DOM, and create _computed styles_.
1. _Layout:_ determine the size and position of DOM elements on the screen,
and create the _immutable fragment tree_.
1. _Pre-paint:_ compute property trees and
[invalidate](https://en.wikipedia.org/wiki/Cache_invalidation)
any existing _display lists_ and GPU _texture tiles_ as appropriate.
1. _Scroll:_ update the scroll offset of documents and scrollable DOM elements, by mutating property trees.
1. _Paint:_ compute a display list that describes how to raster GPU texture tiles from the DOM.
1. _Commit:_ copy property trees and the display list to the compositor thread.
1. _Layerize:_ break up the display list into a _composited layer list_ for independent rasterization and animation.
1. _Raster, decode and paint worklets:_ turn display lists, encoded images, and paint worklet code, respectively, into
[GPU texture tiles](https://en.wikipedia.org/wiki/Tiled_rendering).
1. _Activate:_ create a _compositor frame_ representing how to draw and position GPU tiles to the screen, together with any visual effects.
1. _Aggregate:_ combine compositor frames from all the visible compositor frames into a single, global compositor frame.
1. _Draw:_ execute the aggregated compositor frame on the GPU to create pixels on-screen.

Stages of the rendering pipeline can be skipped if they aren't needed.
For example, animations of visual effects, and scroll, can skip layout, pre-paint and paint.
This is why animation and scroll are marked with yellow and green dots in the diagram.
If layout, pre-paint, and paint can be skipped for visual effects,
they can be run entirely on the compositor thread and skip the main thread.

Browser UI rendering is not depicted directly here,
but can be thought of as a simplified version of this same pipeline
(and in fact its implementation shares much of the code).
Video (also not directly depicted)
generally renders via independent code that decodes frames into GPU texture tiles
that are then plugged into compositor frames and the draw step.

## Process and thread structure

{% Aside %}
There are more CPU processes and threads in the Chromium architecture than pictured here.
These diagrams focus only on those critical to rendering.
{% endAside %}

### CPU processes

The use of multiple CPU processes achieves performance and security isolation
between sites and from browser state,
and stability and security isolation from GPU hardware.

{% Img
src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/i2t9ihLrkRg5qxUkXOsd.jpeg",
alt="Diagram of the various parts of the CPU processes", width="800", height="626" %}

- The _render process_ renders, animates, scrolls, and routes input for a single site and tab combination.
There are many render processes.
- The _browser process_ renders, animates, and routes input for the browser UI
(including the URL bar, tab titles and icons),
and routes all remaining input to the appropriate render process.
There is exactly one browser process.
- The _Viz process_ aggregates compositing from multiple render processes
plus the browser process.
It rasters and draws using the GPU. There is exactly one Viz process.

Different [sites](https://web.dev/same-site-same-origin/) always end up in different render processes.
(In reality,
[always on desktop; when possible on mobile](https://blog.chromium.org/2019/10/recent-site-isolation-improvements.html).
I'll write "always" below,
but this caveat applies throughout.)

Multiple browser tabs or windows of the same site usually go in different render processes,
unless the tabs are related (one [opening](https://developer.mozilla.org/docs/Web/API/Window/opener)
the other).
Under strong memory pressure on desktop Chromium may put multiple tabs
from the same site into the same render process even if not related.

Within a single browser tab,
frames from different sites are always in different render processes from each other,
but frames from the same site are always in the same render process.
From the perspective of rendering,
the important advantage of multiple render processes is that cross-site iframes
and tabs achieve [performance isolation](/blog/renderingng/#performance-isolation)
from each other.
In addition, origins can opt into [even more isolation](https://web.dev/origin-agent-cluster/).

There is exactly one Viz process for all of Chromium.
After all, there is usually only one GPU and screen to draw to.
Separating Viz into its own process is good for stability in the face of bugs in GPU drivers or hardware.
It's also good for security isolation,
which is important for GPU APIs like [Vulkan](/blog/renderingng/#extensibility-the-right-tools-for-the-job).
It's also important for
[security in general](http://www.chromium.org/developers/design-documents/oop-iframes/oop-iframes-rendering#TOC-Cross-site-texture-stealing).

Since the browser can have many tabs and windows,
and all of them have browser UI pixels to draw,
you might wonder: why there is exactly one browser process?
The reason is that only one of them is focused at a time;
in fact, non-visible browser tabs are mostly deactivated and drop all of their GPU memory.
However, complex browser UI rendering features are increasingly being implemented
in render processes as well (known as
[WebUI](https://www.chromium.org/developers/webui)).
This is not for performance isolation reasons,
but in order to take advantage of the ease of use of Chromium's web rendering engine.

[On older Android devices](https://chromium.googlesource.com/chromium/src/+/HEAD/android_webview/docs/architecture.md),
the render and browser process are shared when used in a WebView
(this does not apply to Chromium on Android generally, just WebView).
On WebView, the browser process is also shared with the embedding app,
and WebView has only one render process.

There is also sometimes a utility process for decoding protected video content.
This process is not depicted above.

## Threads

Threads help achieve performance isolation and responsiveness in spite of slow tasks,
pipeline parallelization and multiple buffering.

{% Img
src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/rdgwp4YLNUeUyuc6Eld1.jpeg", alt="A diagram of the render process as described in the article.",
width="800", height="556" %}

- The _main thread_ runs scripts, the rendering event loop, the document lifecycle,
hit testing, script event dispatching, and parsing of HTML, CSS and other data formats.
  - _Main thread helpers_ perform tasks such as creating image bitmaps and blobs that require encoding or decoding.
  - _[Web Workers](https://developer.mozilla.org/docs/Web/API/Web_Workers_API)_
  run script, and a rendering event loop for OffscreenCanvas.
- The _Compositor thread_ processes input events,
performs scrolling and animations of web content,
computes optimal layerization of web content,
and coordinates image decodes, paint worklets and raster tasks.
  - _Compositor thread helpers_ coordinate Viz raster tasks,
  and execute image decode tasks, paint worklets and fallback raster.
- _Media, demuxer or audio output threads_ decode,
process and synchronize video and audio streams.
(Remember that video executes in parallel with the main rendering pipeline.)

Separating the main and compositor threads is critically important for
[performance isolation](/blog/renderingng/#performance-isolation)
of animation and scrolling from main thread work.

There is only one main thread per render process,
even though multiple tabs or frames from the same site may end up in the same process.
However, there is performance isolation from work performed in various browser APIs.
For example, generation of image bitmaps and blobs in the Canvas API run in a main thread helper thread.

Likewise, there is only one compositor thread per render process.
It is generally not a problem that there is only one,
because all of the really expensive operations on the compositor thread
are delegated to either compositor worker threads or the Viz process,
and this work can be done in parallel with input routing, scrolling or animation.
Compositor worker threads coordinate tasks run in the Viz process,
but [GPU acceleration everywhere](/blog/renderingng/#gpu-acceleration-everywhere)
can fail for reasons outside of Chromium's control,
such as driver bugs.
In these situations the worker thread will do the work in a fallback mode on the CPU.

The number of compositor worker threads depends on the capabilities of the device.
For example, desktops will generally use more threads,
as they have more CPU cores and are less battery-constrained than mobile devices.
This is an example of
[scaling up and scaling down](/blog/renderingng/#scalable-performance).

It's also interesting to note that the render process threading architecture
is an application of three different optimization patterns:

- _Helper threads:_ sending long-running subtasks off to additional threads,
to keep the parent thread responsive to other requests happening simultaneously.
The main thread helper and compositor helper threads are good examples of this technique.
- _[Multiple buffering](https://en.wikipedia.org/wiki/Multiple_buffering):_
showing previously rendered content while rendering new content,
to hide the latency of rendering. The compositor thread uses this technique.
- _Pipeline parallelization:_ running the rendering pipeline in multiple places simultaneously.
This is how scrolling and animation can be fast,
even if a main thread rendering update is happening,
because scroll and animation can run in parallel.

### Browser process

{% Img
src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/Upqecg8lPRgKFlqLH61g.jpeg",
alt="A browser process diagram showing the relationship between the Render and compositing thread, and the render and compositing thread helper.", width="800", height="426" %}

- The _render and compositing thread_ responds to input in the browser UI,
routes other input to the correct render process; lays out and paints browser UI.
- The _render and compositing thread helpers_
execute image decode tasks and fallback raster or decode.

The browser process render and compositing thread are similar
to the code and functionality of a render process,
except that the main thread and compositor thread are combined into one.
There is only one thread needed in this case because there is no need for
performance isolation from long main thread tasks,
since there are none by design.

### Viz process

{% Img
src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/kCNDRcHDGun6wfUnEcbJ.jpeg",
alt="A diagram showing that the Viz process includes the GPU main thread, and the display compositor thread.", width="800", height="479" %}

- The _GPU main thread_ rasters display lists and video frames into GPU texture tiles,
and draws compositor frames to the screen.
- The _display compositor thread_ aggregates and optimizes compositing from each render process,
plus the browser process, into a single compositor frame for presentation to the screen.

Raster and draw generally happen on the same thread,
because both of them rely on GPU resources,
and it's hard to reliably make multi-threaded use of the GPU
(easier multi-threaded access to the GPU is one motivation for developing the new
[Vulkan](https://www.vulkan.org/) standard).
On Android WebView, there is a separate OS-level render thread for drawing
because of how WebViews are embedded into a native app.
Other platforms will likely have such a thread in the future.

The display compositor is on a different thread because it needs to be responsive at all times,
and not block on any possible source of slowdown on the GPU main thread.
One cause of slowdown on the GPU main thread is calls into non-Chromium code,
such as vendor-specific GPU drivers, that may be slow in hard-to-predict ways.

## Component structure

Within each render process main or compositor thread,
there are logical software components that interact with each other in structured ways.

### Render process main thread components

{% Img
src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/5pqtEVTK9xbbB7sc2s87.jpeg",
alt="A diagram of the Blink renderer.", width="800", height="464" %}

- _Blink renderer:_
  - The _local frame tree fragment_ represents the tree of local frames and the DOM within frames.
  - The _DOM and Canvas APIs_ component contains implementations of all of these APIs.
  - The _document lifecycle runner_ executes the rendering pipeline steps up to and including the commit step.
  - The _input event hit testing and dispatching_ component executes hit tests to find out which
  DOM element is targeted by an event,
  and runs the input event dispatching algorithms and default behaviors.
- The _rendering event loop scheduler and runner_ decides what to run on the event loop and when.
It schedules rendering to happen at a cadence matching the device display.

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/RKXD237nuR9aHxw6O2Mc.jpeg",
alt="A diagram of the frame tree.", width="800", height="629" %}

_Local frame tree fragments_ are a bit complicated to think about.
Recall that a frame tree is the main page and its child iframes, recursively.
A frame is _local_ to a render process if it is rendered in that process,
and otherwise it is _remote_.

You can imagine coloring frames according to their render process.
In the preceding image, the green circles are all frames in one render process;
the orange ones are in a second, and the blue one is in a third.

A local frame tree fragment is a connected component of the same color in a frame tree.
There are four local frame trees in the image: two for site A, one for site B, and one for site C.
Each local frame tree gets its own Blink renderer component.
A local frame tree's Blink renderer may or may not be in the same render process as other local frame trees
(it's determined by the way render processes are selected, as described earlier).

### Render process compositor thread structure

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/zdmgrfrspiED4fOQtoca.jpeg",
alt="A diagram showing the render process compositor components.", width="800", height="559" %}

The render process compositor components include:

- A _data handler_ that maintains a composited layer list, display lists and property trees.
- A _lifecycle runner_ that runs the animate, scroll, composite, raster,
and decode and activate steps of the rendering pipeline.
(Remember that animate and scroll can occur in both the main thread and the compositor.)
- An _input and hit test handler_ performs input processing and hit testing at the resolution of composited layers,
to determine if scrolling gestures can be run on the compositor thread,
and which render process hit tests should target.

## An example in practice

Let's now make the architecture concrete with an example.
In this example there are three tabs:

**Tab 1: foo.com**

```html
<html>
  <iframe id=one src="foo.com/other-url"></iframe>
  <iframe  id=two src="bar.com"></iframe>
</html>
```

**Tab 2: bar.com**

```html
<html>
 …
</html>
```

**Tab 3: baz.com**
```html
<html>
 …
</html>
```

The process, thread and component structure for these tabs will look like this:

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/nZBgx5iZHvSO2ncBhCfw.jpeg",
alt="Diagram of the process for the tabs.", width="800", height="432" %}

Now let's walk through one example each of the four main tasks of rendering,
which as you may recall are:

1. _Render_ contents into pixels on the screen.
1. _Animate_ visual effects on the contents from one state to another.
1. _Scroll_ in response to input.
1. _Route_ input efficiently to the right places so that developer scripts and other subsystems can respond.

To _render_ the changed DOM for tab one:

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/PeiVVctKuse0JAwHrui2.jpeg",
alt="", width="800", height="488" %}

1. A developer script changes the DOM in the render process for foo.com.
1. The Blink renderer tells the compositor that it needs a render to occur.
1. The compositor tells Viz it needs a render to occur.
1. Viz signals the start of the render back to the compositor.
1. The compositor forwards the start signal on to the Blink renderer.
1. The main thread event loop runner runs the document lifecycle.
1. The main thread sends the result to the compositor thread.
1. The compositor event loop runner runs the compositing lifecycle.
1. Any raster tasks are sent to Viz for raster (there are often more than one of these tasks).
1. Viz rasters content on the GPU.
1. Viz acknowledges completion of the raster task.
Note: Chromium often doesn't wait for the raster to complete,
and instead uses something called a
[sync token](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/gpu/sync_token_internals.md)
that has to be resolved
by raster tasks before step 15 executes.
1. A compositor frame is sent to Viz.
1. Viz aggregates the compositor frames for the foo.com render process,
the bar.com iframe render process, and the browser UI.
1. Viz schedules a draw.
1. Viz draws the aggregated compositor frame to the screen.

To _animate_ a CSS transform transition on tab two:

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/JBZ4Fo0wpEznvZIaz2wS.jpeg",
alt="", width="800", height="488" %}

1. The compositor thread for the bar.com render process ticks an animation
in its compositor event loop by mutating the existing property trees.
This then re-runs the compositor lifecycle. (Raster and decode tasks may occur, but are not depicted here.)
1. A compositor frame is sent to Viz.
1. Viz aggregates the compositor frames for the foo.com render process, the bar.com render process, and the browser UI.
1. Viz schedules a draw.
1. Viz draws the aggregated compositor frame to the screen.

To _scroll_ the web page on tab three:

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/BTQMujxRdySU0rsgydwB.jpeg",
alt="", width="800", height="456" %}

1. A sequence of `input` events (mouse, touch or keyboard) come to the browser process.
1. Each event is routed to baz.com's render process compositor thread.
1. The compositor determines if the main thread needs to know about the event.
1. The event is sent, if necessary, to the main thread.
1. The main thread fires `input` event listeners
(`pointerdown`, `touchstar`, `pointermove`, `touchmove` or `wheel`)
to see if listeners will call `preventDefault` on the event.
1. The main thread returns whether `preventDefault` was called to the compositor.
1. If not, the input event is sent back to the browser process.
1. The browser process converts it to a scroll gesture by combining it with other recent events.
1. The scroll gesture is sent once again to baz.com's render process compositor thread,
1. The scroll is applied there, and the compositor thread for the bar.com
render process ticks an animation in its compositor event loop.
This then mutates scroll offset in the property trees and re-runs the compositor lifecycle.
It also tells the main thread to fire a `scroll` event (not depicted here).
1. A compositor frame is sent to Viz.
1. Viz aggregates the compositor frames for the foo.com render process,
the bar.com render process, and the browser UI.
1. Viz schedules a draw.
1. Viz draws the aggregated compositor frame to the screen.

{% Aside %}
Note that each input event after the first can skip steps three and four,
because the scroll has already begun and at that point scripts can observe it via the `scroll` event,
but no longer interrupt.
{% endAside %}

To _route_ a `click` event on a hyperlink in iframe #two on tab one:

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/GnXCsuXJkNegGDMQAhnx.jpeg",
alt="", width="800", height="488" %}

1. An `input` event (mouse, touch or keyboard) comes to the browser process.
It performs an approximate hit test
to determine that the bar.com iframe render process should receive the click, and sends it there.
1. The compositor thread for bar.com routes the `click` event to the main thread
for bar.com and schedules a rendering event loop task to process it.
1. The input event processor for bar.com's main thread hit tests to determine which
DOM element in the iframe was clicked, and fires a `click` event for scripts to observe.
Hearing no `preventDefault`, it navigates to the hyperlink.
1. Upon load of destination page of the hyperlink, the new state is rendered,
with steps similar to the "render changed DOM" example above.
(These subsequent changes are not depicted here.)

## Conclusion

Phew, that was a lot of detail.
As you can see, rendering in Chromium is quite complicated!
It can take a lot of time to remember and internalize all the pieces,
so don't be worried if it seems overwhelming.

The most important takeaway is that there is a conceptually simple rendering pipeline,
which through careful modularization and attention to detail,
has been split into a number of self-contained components.
These components have then been split across parallel processes and threads to maximize
[scalable performance](/blog/renderingng/#scalable-performance)
and [extensibility](/blog/renderingng/#extensibility-the-right-tools-for-the-job) opportunities.

Each of those components plays a critical role in enabling
all of the performance and features modern web apps need.
Soon we'll publish deep-dives into each of them,
and the important roles they play.

But before that, I'll also explain how the key data structures mentioned in this post
(the ones indicated in blue at the sides of the rendering pipeline diagram)
are just as important to RenderingNG as code components.

Thanks for reading, and stay tuned!

_Illustrations by Una Kravets._
