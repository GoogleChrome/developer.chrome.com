---
layout: 'layouts/blog-post.njk'
title: 'Key data structures and their roles in RenderingNG'
description: >
  This post explains the components of the RenderingNG architecture,
  and how the rendering pipeline flows through them.
date: 2021-08-24
authors:
  - chrishtr
  - danielcheng
  - progers
  - kojiishi
  - iankilpatrick
  - kylecharbonneau
tags:
  - rendering
---

{% Aside %}
This post is a part of a series on the Chromium rendering engine. Check out the rest of the series to learn more about [RenderingNG](/blog/renderingng), [the architecture](/blog/renderingng-architecture/), [VideoNG](/blog/videong/), and [LayoutNG](/blog/layoutng/).
{% endAside %}

Previous posts in this series gave an overview of the
[goals, key properties](/blog/renderingng/)
and [high-level component pieces](/blog/renderingng-architecture/)
of the RenderingNG architecture.
Now let's dig into the key data structures that are inputs and outputs to the rendering pipeline.

These data structures are:

- _Frame trees_, which are composed of local and remote nodes
that represent which web documents are in which render process and which Blink renderer.
- The _immutable fragment tree_,
represents the output of (and input to) the layout constraint algorithm.
- _Property trees_, which represent the transform, clip, effect,
and scroll hierarchies of a web document,
and are used throughout the pipeline.
- _Display lists and paint chunks_ are the inputs to the raster and layerization algorithms.
- _Compositor frames_ encapsulate surfaces, render surfaces,
and GPU texture tiles that are used to draw using the GPU.

Before walking through these data structures, I want to show the following simple example
what builds on one from the previous post. I'll use this example a few times in this post,
showing how the data structures apply to it.

```html
<html>
  <div style="overflow: hidden; width: 100px; height: 100px;">
    <iframe style="filter: blur(3px);
      transform: rotateZ(1deg);
      width: 100px; height: 300px"
      id="one" src="foo.com/etc"></iframe>
  </div>
  <iframe style="top:200px;
    transform: scale(1.1) translateX(200px)"
    id="two" src="bar.com"></iframe>
</html>
```

## Frame trees

Chrome may sometimes choose to render a cross-origin frame
in a different render process from its parent frame.

In the example from the introduction,
there are three total frames:

{% Img
src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/EQSvmkpx3AwpuzCu5aD0.jpg",
alt="A parent frame foo.com, containing two iframes.",
width="800", height="521" %}

With site isolation, Chromium will use two render processes to render this web page.
Each render process has its own representation of the frame tree for that web page:

{% Img
src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/XOTcLaN6NesRqZ78NF6z.jpg",
alt="Two frame trees representing the two render processes.",
width="800", height="347" %}

A frame rendered in a different process is represented as a remote frame.
A remote frame holds the minimum information needed to act as a placeholder in rendering,
such as its dimensions, for example.
The remote frame otherwise does not contain any information needed to render its actual contents.

In contrast,
a local frame represents a frame that will go through the standard rendering pipeline
described in previous posts.
The local frame contains all the information needed to turn the data for that frame
(such as the DOM tree and style data) into something that can be rendered and displayed.

The rendering pipeline operates on the granularity of a
[local frame tree fragment](/blog/renderingng-architecture/#:~:text=the%20device%20display.-,Local%20frame%20trees,-are%20a%20bit).
Consider a more complicated example with `foo.com` as the main frame:

```html
<iframe src="bar.com"></iframe>
```

And the following `bar.com` subframe:

```html
<iframe src="foo.com/etc"></iframe>
```

Although there are still only two renderers,
there are now three local frame tree fragments,
with two in the render process for `foo.com` and one in the render process for `bar.com`:

{% Img
src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/ppqoaHvu4K4nF3fi71IA.jpg",
alt="A representation of the two renders, and three frame tree fragments.",
width="800", height="478" %}

To produce one compositor frame for the web page,
Viz simultaneously requests a compositor frame from the root frame of each of the three local frame trees,
and then [aggregates](/blog/renderingng-architecture/#rendering-pipeline-structure) them.
(See also the compositor frames section later in this post.)

The `foo.com` main frame and the `foo.com/other-page` subframe
are part of the same frame tree and rendered in the same process.
However, the two frames still have independent [document lifecycles](/blog/renderingng-architecture/#render-process-main-thread-components)
as they are part of different local frame tree fragments.
For this reason, it is not possible to generate one compositor frame for both in one update.
The render process does not have enough information
to composite the compositor frame generated for `foo.com/other-page`
directly into the compositor frame for the `foo.com` main frame.
For example, the out-of-process `bar.com` parent frame may affect the display of the `foo.com/other-url` iframe,
by transforming the iframe with CSS or occluding parts of the iframe with other elements in its DOM.

### The visual property update waterfall

Visual properties like the device scale factor and the viewport size affect the rendered output
and must be synchronized between the local frame tree fragments.
The root of each local frame tree fragment has a widget object associated with it.
Visual property updates go to the main frame's widget before propogating
to the remaining widgets from top to bottom.
For example, when the viewport size changes:

{% Img
src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/3SKEhds80XC09WFEytwh.jpg",
alt="Diagram of the process explained in the preceding text.",
width="800", height="272" %}

This process is not instantaneous,
so the replicated visual properties also include a sync token.
The Viz compositor uses this sync token to wait for all the local frame tree fragments
to submit a compositor frame with the current sync token.
This process avoids mixing compositor frames with different visual properties.

## The immutable fragment tree

The immutable fragment tree is the output of the layout stage of the rendering pipeline.
It represents the position and size of all elements on the page
(without transforms applied).

{% Img
src="image/HodOHWjMnbNw56hvNASHWSgZyAf2/EmO3PAWQ6QzMgwJweFvl.jpeg",
alt="Representation of the fragments in each tree, with one fragment being marked as needing layout.",
width="800", height="441" %}

Each fragment represents a part of a DOM element.
Typically there is only one fragment per element,
but there can be more if it is split across different pages when printing,
or columns when in a multi-column context.

After layout, each fragment becomes immutable and is never changed again.
Importantly, we also place a few additional restrictions. We don't:

- Allow any "up" references in the tree.
(A child can't have a pointer to its parent.)
- "bubble" data down the tree
(a child only reads information from its children, not from its parent).

These restrictions allow us to reuse a fragment for a subsequent layout.
Without these restrictions we'd need to often regenerate the whole tree, which is expensive.

Most layouts are typically incremental updates, for example,
a web app updating a small portion of the UI in response to the user clicking on an element.
Ideally, layout should only do work proportional to what actually changed on-screen.
We can achieve this by reusing as many parts of the previous tree as possible.
This means (typically) we only need to rebuild the spine of the tree.

In the future, this immutable design will allow us to do interesting things
like passing the immutable fragment tree across thread boundaries if needed
(to perform subsequent phases on a different thread),
generate multiple trees for a smooth layout animation,
or perform parallel speculative layouts.
It also gives us the potential of multi-threading layout itself.

### Inline fragment items

Inline content (styled text predominantly) uses a slightly different representation.
Rather than a tree structure with boxes and pointers,
we represent inline content in a flat list representing the tree.
The primary benefit is that a flat list representation for inlines is fast,
useful for inspecting or querying inline data-structures,
and memory efficient.
This is extremely important for web rendering performance,
as rendering of text is very complex,
and can easily become the slowest part of the pipeline unless highly optimized.

As an interesting historical note,
this is very similar to how
[Internet Explorer previously represented its DOM](https://blogs.windows.com/msedgedev/2017/04/19/modernizing-dom-tree-microsoft-edge/)
as it was built initially in a similar way as a text editor.

The flat list is created for each
[inline formatting context](https://developer.mozilla.org/docs/Web/CSS/Inline_formatting_context)
in the order of a depth-first search of its inline layout subtree.
Each entry in the list is a tuple of (object, number of descendants).
For example, consider this DOM:

```html
<div style="width: 0;">
  <span style="color: blue; position: relative;">Hi</span> <b>there</b>.
</div>
```

(Note the `width` property is set to 0 so that the line wraps between "Hi" and "there.")
When the inline formatting context for this situation is represented as a tree,
it looks like the following:

```json
{
  "Line box": {
    "Box <span>": {
      "Text": "Hi"
    }
  },
  "Line box": {
    "Box <b>": {
      "Text": "There"
    }
  },
  {
    "Text": "."
  }
}
```

The flat list looks like this:

- (Line box, 2)
- (Box &lt;span&gt;, 1)
- (Text "Hi", 0)
- (Line box, 3)
- (Box &lt;b&gt;, 1)
- (Text "there", 0)
- (Text ".", 0)

There are many consumers of this data structure: accessibility APIs,
and geometry APIs such as
[getClientRects](https://developer.mozilla.org/docs/Web/API/Range/getClientRects),
and [contenteditable](https://developer.mozilla.org/docs/Web/API/HTMLElement/contentEditable).
Each has different requirements.
These components access the flat data structure through a convenience cursor.

The [cursor](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/layout/ng/inline/ng_inline_cursor.h)
has APIs such as
`MoveToNext`,
`MoveToNextLine`,
`CursorForChildren`.
This cursor representation is very powerful for text content, for multiple reasons:

- Iterating in the depth-first search order is very fast.
This is used very often because it is similar to caret movements.
Since it's a flat list, depth-first search is just incrementing the array offset,
providing fast iterations and memory locality.
- It provides breadth-first search, which is necessary when, for example,
painting the background of line and inline boxes.
- Knowing the number of descendants makes moving to the next sibling fast
(just increment the array offset by that number).

## Property trees

As you know, the DOM is a tree of elements (plus text nodes),
and CSS can apply various styles to elements.

These come mostly in four flavors of effect:

- **Layout:** inputs to the layout constraint algorithm.
- **Paint:** how to paint and raster the element
(but not its descendants).
- **Visual:** raster/draw effects applied to the DOM subtree,
such as transforms, filters, and clipping.
- **Scrolling:** axis-aligned and rounded corner
clipping and scrolling of the contained subtree.

Property trees are data structures that explain how visual and scrolling effects apply to DOM elements.
They provide the means to answer questions such as: where,
relative to the screen, is a given DOM element,
given its layout size and position?
And: what sequence of GPU operations should be used to apply visual and scrolling effects?

Visual and scrolling effects on the web are very complicated in their full glory.
So the most important thing property trees do is translate that complexity
into a single data structure that precisely represents their structure and meaning,
while at the same time removing the rest of the complexity of the DOM and CSS.
This lets us implement algorithms for compositing and scrolling with much more confidence. In particular:

- Potentially error-prone geometry and other calculations
can be centralized into one place.
- The complexity of building and updating property trees
is isolated into one rendering pipeline stage.
- It's much easier and faster to send property trees around to different threads and processes than full DOM state,
thereby making it possible to use them for many use cases.
- The more use cases there are,
the more wins we can get from geometry caching built on top,
as they can reuse each others' caches.

RenderingNG uses property trees for many purposes, including:

- Separating compositing from paint, and compositing from the main thread.
- Determining an optimal compositing / draw strategy.
- Measuring
[IntersectionObserver](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API)
geometry.
- Avoiding work for offscreen elements and GPU texture tiles.
- Efficiently and accurately invalidating paint and raster.
- Measuring
[layout shift](https://web.dev/cls/) and
[largest contentful paint](https://web.dev/lcp/) in Core Web Vitals.

Every web document has four separate property trees: transform, clip, effect, and scroll.(*)
The transform tree represents CSS transforms and scrolling.
(A scroll transform is represented as a 2D transform matrix.)
The clip tree represents
[overflow clips](https://developer.mozilla.org/docs/Web/CSS/overflow).
The effect tree represents all other visual effects: opacity, filters, masks,
blend modes, and other kinds of clips such as clip-path.
The scroll tree represents information about scrolling,
such as how scrolls
[chain](https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior) together;
it is needed to perform scrolling on the compositor thread.
Each node in a property tree represents a scroll or visual effect applied by a DOM element.
If it happens to have multiple effects,
there may be more than one property tree node in each tree for the same element.

The topology of each tree is like a sparse representation of the DOM.
For example, if there are three DOM elements with overflow clips,
then there will be three clip tree nodes,
and the structure of the clip tree will follow
the containing block relationship between the overflow clips.
There are also links between the trees.
These links indicate the relative DOM hierarchy,
and hence order of application, of the nodes.
For example, if a transform on a DOM element is below another DOM element with a filter,
then of course the transform applies before the filter.

Each DOM element has a _property tree state_,
which is a 4-tuple (transform, clip, effect, scroll)
that indicates the nearest ancestor clip,
transform, and effect tree nodes that take effect on that element.
This is very convenient, because with this information we know exactly the list of clips,
transforms, and effects that apply to that element,
and in which order.
This tells us where it is on screen and how to draw it.

{% Aside %}
(*) There are four trees because scrolling only applies to the contained subtree.
An element is contained by a scroller if it scrolls with it,
and `position:absolute` and `position: fixed`
elements often escape ancestor scrolling elements,
in situations where the scrolling element is not in the containing block chain
(the containing block chain for a DOM element is its containing block, plus that containing block's containing block, and so on up to the root element),
recursively) of the fixed- or absolute-positioned element.

However, all other visual effects apply to the entire DOM subtree.
Because of this mismatch,
the topology of the clipping and scrolling aspects of property trees
is sometimes quite different than for visual effects.
This is also why most visual effects induce a containing block for all descendants
([example](https://github.com/w3c/fxtf-drafts/issues/11)).
The full structure of property trees is quite complicated;
see the long code comments
[here](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/paint/object_paint_properties.h;l=96)
for information on this subject.
{% endAside %}

### Example

([source](https://output.jsbin.com/goqojuz/quiet))

```html
<html>
  <div style="overflow: scroll; width: 100px; height: 100px;">
    <iframe style="filter: blur(3px);
      transform: rotateZ(1deg);
      width: 100px; height: 300px"
  id="one" srcdoc="iframe one"></iframe>
  </div>
  <iframe style="top:200px;
      transform: scale(1.1) translateX(200px)" id=two
      srcdoc="iframe two"></iframe>
</html>
```

For the preceding example (which is slightly different than the one in the introduction),
here are the key elements of the property trees generated:

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/C2O9E1zlHNvPQRFhZSnJ.jpg",
alt="An example of the various elements in the property tree.",
width="800", height="1162" %}

{% Aside %}
There are several more complexities that I have omitted from this diagram,
such as nodes representing the
[visual viewport](https://developer.mozilla.org/docs/Web/API/Visual_Viewport_API)
and nodes used for engine-internal performance optimizations,
such as
[paint offset and isolation](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/paint/object_paint_properties.h;l=96).
In addition, this diagram does not indicate the links between the trees.
For example, the 3px blur applies within the `#one rotate` transform space.
{% endAside %}

## Display lists and paint chunks

A display item contains low-level drawing commands (see
[here](https://source.chromium.org/chromium/chromium/src/+/main:cc/paint/paint_op_buffer.h))
that can be rasterized with
[Skia](https://skia.org/).
Display items are typically simple, with just a few drawing commands, such as drawing a border or background. The paint tree walk iterates over the layout tree and associated fragments following [CSS painting order](https://www.w3.org/TR/CSS2/zindex.html)
to produce a display item list.

For example:

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/SlSAGPoa5RxmfWgJm0UN.png",
alt="A blue box, with the words 'Hello world' inside a green rectangle.",
width="141", height="141" %}

```html
<div id="green" style="background:green; width:80px;">
    Hello world
</div>
<div id="blue" style="width:100px;
  height:100px; background:blue;
  position:absolute;
  top:0; left:0; z-index:-1;">
</div>
```

This HTML and CSS would produce the following display list,
where each cell is a display item:

<table class="with-borders">
  <thead>
    <tr>
      <th>View's background</th>
      <th><code>#blue</code> background</th>
      <th><code>#green</code> background</th>
      <th><code>#green</code> inline text</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>drawRect</code> with size 800x600 and color white.</td>
      <td><code>drawRect</code> with size 100x100 at position 0,0 and color blue.</td>
      <td><code>drawRect</code> with size 80x18 at position 8,8 and color green.</td>
      <td><code>drawTextBlob</code> with position 8,8 and text "Hello world".</td>
    </tr>
  </tbody>
</table>

The display item list is ordered back-to-front.
In the example above, the green div is before the blue div in DOM order,
but CSS paint order requires that the negative z-index blue div paints
before ([step 3](https://www.w3.org/TR/CSS2/zindex.html)) the green div
([step 4.1](https://www.w3.org/TR/CSS2/zindex.html)).
Display items roughly correspond to atomic steps of the CSS paint order specification.
A single DOM element may result in several display items,
such as how #green has a display item for the background and another display item for the inline text.
This granularity is important for representing the full complexity of the CSS paint order specification,
such as interleaving created by negative margin:

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/zVk6hYkYWD4lpMz1bIw2.png",
alt="A green rectangle, with a grey box partly overlaid and the words 'Hello world.'",
width="141", height="141" %}

```html
<div id="green" style="background:green; width:80px;">
    Hello world
</div>
<div id="gray" style="width:35px; height:20px;
  background:gray;margin-top:-10px;"></div>
```

This would produce the following display list, where each cell is a display item:

<table class="with-borders">
  <thead>
    <tr>
      <th>View's background</th>
      <th><code>#green</code> background</th>
      <th><code>#gray</code> background</th>
      <th><code>#green</code> inline text</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>drawRect</code> with size 800x600 and color white.</td>
      <td><code>drawRect</code> with size 80x18 at position 8,8 and color green.</td>
      <td><code>drawRect</code> with size 35x20 at position 8,16 and color grey.</td>
      <td><code>drawTextBlob</code> with position 8,8 and text "Hello world".</td>
    </tr>
  </tbody>
</table>

The display item list is stored and reused by later updates.
If a layout object has not changed during the paint tree walk,
its display items are copied from the previous list.
An additional optimization relies on a property of the CSS paint order specification:
stacking contexts paint atomically.
If no layout object has changed within a stacking context,
the paint tree walk skips the stacking context
and copies the entire sequence of display items from the previous list.

The current property tree state is maintained during the paint tree walk
and the display item list is grouped into "chunks" of display items that share the same property tree state.
This is demonstrated in the following example:

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/eiszXLEX8VNqKTKxm0ML.png",
alt="A pink box with a tilted orange box.", width="140", height="141" %}

```html
<div id="scroll" style="background:pink; width:100px;
   height:100px; overflow:scroll;
   position:absolute; top:0; left:0;">
    Hello world
    <div id="orange" style="width:75px; height:200px;
      background:orange; transform:rotateZ(25deg);">
        I'm falling
    </div>
</div>
```

This would produce the following display list, where each cell is a display item:

<table class="with-borders">
  <thead>
    <tr>
      <th>View's background</th>
      <th><code>#scroll</code> background</th>
      <th><code>#scroll</code> inline text</th>
      <th><code>#orange</code> background</th>
      <th><code>#orange</code> inline text</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>drawRect</code> with size 800x600 and color white.</td>
      <td><code>drawRect</code> with size 100x100 at position 0,0 and color pink.</td>
      <td><code>drawTextBlob</code> with position 0,0 and text "Hello world".</td>
      <td><code>drawRect</code> with size 75x200 at position 0,0 and color orange.</td>
      <td><code>drawTextBlob</code> with position 0,0 and text "I'm falling".</td>
    </tr>
  </tbody>
</table>

The transform property tree and paint chunks would then be (simplified for brevity):

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/1vRNJYOyFNsur4ZMFyvF.png",
alt="An image of the preceding table, the first two cells in chunk 1, the third in chunk 2, the last two cells in chunk 3.",
width="607", height="196" %}

The ordered list of paint chunks,
which are groups of display items and a property tree state,
are the inputs to the layerize step of the rendering pipeline.
The entire list of paint chunks could be merged into a single composited layer and rasterized together,
but this would require expensive rasterization each time the user scrolled.
A composited layer could be created for each paint chunk
and rasterized individually to avoid all re-rasterization, but that would quickly exhaust GPU memory.
The layerize step has to make tradeoffs between GPU memory and reducing the costs when things change.
A good general approach is to merge chunks by default,
and not merge paint chunks that have property tree states that are expected to change on the compositor thread,
such as with compositor-thread scrolling or compositor-thread transform animations.

The preceding example should ideally produce two composited layers:

- A 800x600 composited layer containing the drawing commands:
  1. `drawRect` with size 800x600 and color white
  2. `drawRect` with size 100x100 at position 0,0 and color pink
- A 144x224 composited layer containing the drawing commands:
  1. `drawTextBlob` with position 0,0 and text "Hello world"
  2. translate 0,18
  3. `rotateZ(25deg)`
  4. `drawRect` with size 75x200 at position 0,0 and color orange
  5. `drawTextBlob` with position 0,0 and text "I'm falling"

If the user scrolls `#scroll`,
the second composited layer is moved, but no rasterization is needed.

For the example
[here](https://output.jsbin.com/goqojuz/quiet),
from the previous section on property trees,
there are six paint chunks.
Together with their (transform, clip, effect, scroll) property tree states, they are:

- Document background: document scroll, document clip, root, document scroll.
- Horizontal, vertical and scroll corner for div (three separate paint chunks):
document scroll, document clip, `#one` blur, document scroll.
- Iframe `#one`: `#one` rotate, overflow scroll clip, `#one` blur, div scroll.
- Iframe `#two`: `#two` scale, document clip, root, document scroll.

## Compositor frames: surfaces, render surfaces and GPU texture tiles

As discussed in the [previous post](/blog/renderingng-architecture/) (a worked example is
[here](/blog/renderingng-architecture/#an-example-in-practice)),
the browser and render processes manage rasterization of content
then submit compositor frames to the Viz process for presentation to the screen.
Compositor frames are how RenderingNG represents how to stitch rasterized content together
and efficiently draw it using the GPU.

### Tiles

In theory,
a render process or browser process compositor could rasterize pixels
into a single texture the full size of the renderer viewport and submit that texture to Viz.
To display it, the display compositor would just have to copy the pixels
from that single texture into the appropriate position in the frame buffer
(for example, the screen). However, if that compositor wanted to update even
a single pixel it would need to re-rasterize the full viewport and submit a new texture to Viz.

Instead, the viewport is divided into tiles.
A separate GPU texture tile backs each tile with the rasterized pixels for part of the viewport.
The renderer can then update individual tiles or even
just change the position on screen for the existing tiles.
For example, when scrolling a website,
the position of existing tiles would shift up and only occasionally
a new tile would need to be rasterized for content further down the page.

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/9X5xFJBzRp0AC9jZDijQ.jpg",
alt="Four tiles.", width="800", height="743" %}

The image above depicts an image of a sunny day, with four tiles.
When a scroll occurs, a fifth tile begins to appear.
One of the tiles happens to only have one color (sky blue),
and there is a video and an iframe on top. Which leads to the next topic.

### Quads and surfaces

GPU texture tiles are a special kind of _quad_,
which is just a fancy name for one category of texture or another.
A quad identifies the input texture, and indicates how to transform and apply visual effects to it.
For example, regular content tiles have a transform indicating their x, y position in the tile grid.

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/gIYqoKgiVmAWRqYOZ5P8.jpg",
alt="GPU texture tiles.", width="800", height="604" %}

These rasterized tiles are wrapped in a _render pass_, which is a list of quads.
The render pass doesn't contain any pixel information;
instead, it has instructions on where and how to draw each quad to produce the desired pixel output.
There is a _draw quad_ for each GPU texture tile.
The display compositor just has to iterate through the list of quads,
drawing each one with the specified visual effects,
to produce the desired pixel output for the render pass.
Compositing draw quads for a render pass can be done efficiently on the GPU,
because the allowed visual effects are carefully chosen to be those that map directly to GPU features.

There are additional types of draw quads beyond rasterized tiles.
For example, there are _solid color draw quads_ that are not backed by a texture at all,
or _texture draw quads_ for non-tile textures like video or canvas.

It is also possible for a compositor frame to embed another compositor frame.
For example, the browser compositor produces a compositor frame with the browser UI,
and an empty rectangle where the render compositor content will be embedded.
Another example is site isolated iframes. This embedding is accomplished through _surfaces_.

When a compositor submits a compositor frame, it is accompanied by an identifier,
called a _surface ID_, allowing other compositor frames to embed it by reference.
The newest compositor frame submitted with a particular surface ID is stored by Viz.
Another compositor frame can then refer to it later via a _surface draw quad_,
and therefore Viz knows what to draw.
(Note that surface draw quads contain surface IDs only, and not textures.)

### Intermediate render passes

Some visual effects, such as many filters or advanced blend modes,
require that two or more quads are drawn to an intermediate texture.
Then the intermediate texture is drawn into a destination buffer on the GPU (or possibly another intermediate texture),
applying the visual effect at the same time.
To allow for this, a compositor frame actually contains a list of render passes.
There is always a root render pass,
which is drawn last and whose destination corresponds to the frame buffer,
and there may be more.

The possibility of multiple render passes explains the name
"render pass." Each pass has to be executed sequentially on the GPU, in multiple "passes",
whereas a single pass can be completed in a single massively parallel GPU computation.

### Aggregation

Multiple compositor frames are submitted to Viz,
and they need to be drawn to the screen together.
This is accomplished by an aggregation phase that converts them into a single,
aggregated compositor frame.
Aggregation replaces surface draw quads by the compositor frames they specify.
It is also an opportunity to optimize away unnecessary intermediate textures or content that is offscreen.
For example, in many cases the compositor frame for a site isolated iframe
does not need its own intermediate texture,
and can be drawn directly into the frame buffer via appropriate draw quads.
The aggregation phase figures out such optimizations
and applies them based on global knowledge not accessible to individual render compositors.

### Example

Here are the actual compositor frames that represent the example from the beginning of this post.

<ul>
  <li><code>foo.com/index.html</code> surface: id=0
	  <ul>
      <li><strong>Render pass 0:</strong> draw to output.
		    <ul>
          <li>Render pass draw quad: draw with 3px blur and clip into render pass 0.
			      <ul>
              <li><strong>Render pass 1:</strong>
				        <ul>
                  <li>Draw quads for tile contents of <code>#one</code> iframe, with x and y positions for each.</li>
                </ul>
              </li>
            </ul>
          </li>
		      <li>Surface draw quad: with ID 2, drawn with scale and translate transform.</li>
        </ul>
      </li>
    </ul>
  </li>

  <li>Browser UI surface: ID=1
	  <ul>
      <li><strong>Render pass 0:</strong> draw to output.
		    <ul>
          <li>Draw quads for browser UI (tiled also)</li>
        </ul>
      </li>
    </ul>
  </li>
  <li><code>bar.com/index.html</code> surface: ID=2
    <ul>
  	  <li><strong>Render pass 0:</strong> draw to output.
        <ul>
          <li>Draw quads for contents of <code>#two</code> iframe, with x and y positions for each.</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

## Conclusion

Thanks for reading!
Together with the previous two posts,
this concludes the overview of RenderingNG.
Next up will be deep-dives on the challenges and technology within many of the sub-components
of the rendering pipeline, all the way from beginning to end.
Those will be coming soon!

_Illustrations by Una Kravets._
