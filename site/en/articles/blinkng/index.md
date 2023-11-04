---
layout: 'layouts/blog-post.njk'
title: 'RenderingNG deep-dive: BlinkNG'
description: >
  Find out about BlinkNG and the various sub-projects that addressed long-standing problems in the organization and structure of Blink code.
thumbnail: image/HodOHWjMnbNw56hvNASHWSgZyAf2/eg6i9S7UHWfrkF9Oube7.png
alt: The rendering pipeline before and aftr BLinkNG.
date: 2022-04-19
authors:
  - stefanzager
  - chrishtr
tags:
  - rendering
---
{% Aside %}
This post is a part of a series on the Chromium rendering engine. Check out the rest of the series to learn more about [RenderingNG](/blog/renderingng/), [RenderingNG architecture](/blog/renderingng-architecture/), [key data structures](/blog/renderingng-data-structures/), [VideoNG](/blog/videong/), and [LayoutNG](/blog/layoutng/).
{% endAside %}


_Blink_ refers to Chromium's implementation of the [web platform](https://en.wikipedia.org/wiki/Web_platform), and it encompasses all the phases of rendering prior to compositing, culminating in _compositor commit_. You can read more about blink rendering architecture in a previous [article](/blog/renderingng-architecture/#render-process-main-thread-components) in this series. 

[Blink](https://en.wikipedia.org/wiki/Blink_(browser_engine)) began life as a fork of [WebKit](https://en.wikipedia.org/wiki/WebKit), which is itself a fork of [KHTML](https://en.wikipedia.org/wiki/KHTML), which dates to 1998. It contains some of the oldest (and most critical) code in Chromium, and by 2014 it was definitely showing its age. In that year, we embarked on a set of ambitious projects under the banner of what we're calling BlinkNG, with the goal of addressing long-standing deficiencies in the organization and structure of the Blink code. This article will explore BlinkNG and its constituent projects: why we did them, what they accomplished, the guiding principles that shaped their design, and the opportunities for future improvements they afford.

{% Img src="image/HodOHWjMnbNw56hvNASHWSgZyAf2/eg6i9S7UHWfrkF9Oube7.png", alt="The rendering pipeline before and after BlinkNG.", width="800", height="362" %}

## Rendering pre-NG

The rendering pipeline within Blink was always conceptually split into phases (_style_, _layout_, _paint_, and so on), but the abstraction barriers were leaky. Broadly speaking, the data associated with rendering consisted of long-lived, mutable objects. These objects could be—and were—modified at any time, and were frequently recycled and reused by successive rendering updates. It was impossible to reliably answer simple questions such as:

-  Does the output of style, layout, or paint need to be updated?
-  When will these data get their "final" value?
-  When is it OK to modify these data?
-  When will this object be deleted?

There are many examples of this, including:

_Style_ would generate `ComputedStyle`s based on stylesheets; but `ComputedStyle` was not immutable; in some cases it would be modified by later pipeline stages.

_Style_ would generate a tree of `LayoutObject`, and then _layout_ would annotate those objects with size and positioning information. In some cases, _layout_ would even modify the tree structure. There was no clear separation between the inputs and outputs of _layout_.

_Style_ would generate accessory data structures that determined the course of _compositing_, and those data structures were modified in place by every phase after _style_.

At a lower level, rendering data types largely consists of specialized trees (for example, the DOM tree, style tree, layout tree, paint property tree); and rendering phases are implemented as recursive tree walks. Ideally, a tree walk should be _contained_: when processing a given tree node, we should not access any information outside of the subtree rooted at that node. That was never true pre-RenderingNG; tree walks frequently accessed information from the ancestors of the node being processed. This made the system very fragile and error-prone. It was also impossible to begin a tree walk from anywhere but the root of the tree.

Finally, there were many on-ramps into the rendering pipeline sprinkled throughout the code: forced layouts triggered by JavaScript, partial updates triggered during document load, forced updates to prepare for event targeting, scheduled updates requested by the display system, and specialized APIs exposed only to test code, to name a few. There were even a few _recursive_ and _reentrant_ paths into the rendering pipeline (that is, jumping to the beginning of one stage from the middle of another). Each of these on-ramps had their own idiosyncratic behavior, and in some cases the output of rendering would depend on the manner in which the rendering update was triggered.

## What we changed

BlinkNG is composed of many sub-projects, big and small, all with the shared goal of eliminating the architectural deficits described earlier. These projects share a few guiding principles designed to make the rendering pipeline more of an actual pipeline:

-  **Uniform point of entry**: We should always enter the pipeline at the beginning.
-  **Functional stages**: Each stage should have well-defined inputs and outputs, and its behavior should be _functional_, that is, deterministic and repeatable, and the outputs should depend only on the defined inputs.
-  **Constant inputs**: The inputs of any stage should be effectively constant while the stage is running.
-  **Immutable outputs**: Once a stage has finished, its outputs should be immutable for the remainder of the rendering update.
-  **Checkpoint consistency**: At the end of each stage, the rendering data produced thus far should be in a self-consistent state.
-  **Deduplication of work**: Only compute each thing once.

A complete list of BlinkNG sub-projects would make for tedious reading, but following are a few of particular consequence.

### The document lifecycle

The [DocumentLifecycle](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/dom/document_lifecycle.h;l=45) class keeps track of our progress through the rendering pipeline. It allows us to do basic checks that enforce the invariants listed earlier, such as:

-  If we are modifying a ComputedStyle property, then the document lifecycle must be `kInStyleRecalc`.
-  If the DocumentLifecycle state is `kStyleClean` or later, then `NeedsStyleRecalc()` must return _false_ for any attached node.
-  When entering the _paint_ lifecycle phase, the lifecycle state must be `kPrePaintClean`.

Over the course of implementing BlinkNG, we systematically eliminated code paths that violated these invariants, and sprinkled many more assertions throughout the code to ensure we don't regress.

If you've ever been down the rabbit hole looking at low-level rendering code, you may well ask yourself, "How did I get here?" As mentioned earlier, there are a variety of points of entry into the rendering pipeline. Previously, this included recursive and reentrant call paths, and places where we entered the pipeline at an intermediate phase, rather than starting from the beginning. In the course of BlinkNG, we analyzed these call paths and determined that they were all reducible to two basic scenarios:

-  All rendering data need to be updated—for example, when generating new pixels for display or doing a hit test for event targeting.
-  We need an up-to-date value for a specific query which can be answered without updating all rendering data. This includes most JavaScript queries, for example, `node.offsetTop`.

There are now only two points of entry into the rendering pipeline, corresponding to these two scenarios. The reentrant code paths have been removed or refactored, and it is no longer possible to enter the pipeline starting at an intermediate phase. This has eliminated a lot of mystery around exactly when and how rendering updates happen, making it much easier to reason about the behavior of the system.

### Pipelining style, layout, and pre-paint

Collectively, the rendering phases before _paint_ are responsible for the following:

-  Running the _style cascade_ algorithm to calculate final style properties for DOM nodes.
-  Generating the layout tree representing the box hierarchy of the document.
-  Determining size and position information for all boxes.
-  Rounding or snapping sub-pixel geometry to whole pixel boundaries for painting.
-  Determining the properties of composited layers (affine transformation, filters, opacity, or anything else that can be GPU accelerated).
-  Determining what content has changed since the previous paint phase, and needs to be painted or repainted (paint invalidation).

This list hasn't changed, but before BlinkNG much of this work was done in an ad hoc way, spread across multiple rendering phases, with lots of duplicated functionality and built-in inefficiencies. For example, the _style_ phase has always been primarily responsible for calculating the final style properties for nodes, but there were a few special cases where we didn't determine final style property values until after the _style_ phase was complete. There was no formal or enforceable point in the rendering process where we could say with certainty that style information was complete and immutable.

Another good example of pre-BlinkNG trouble is paint invalidation. Previously, paint invalidation was strewn throughout all rendering phases leading up to paint. When modifying style or layout code, it was difficult to know what changes to paint invalidation logic were needed, and it was easy to make a mistake leading to under- or over-invalidation bugs. You can read more about the intricacies of the old paint invalidation system in the article from this series devoted to [LayoutNG](/blog/layoutng/#under-invalidation).

Snapping subpixel layout geometry to whole pixel boundaries for painting is an example of where we had multiple implementations of the same functionality, and did a lot of redundant work. There was one pixel-snapping code path used by the paint system, and an entirely separate code path used whenever we needed a one-off, on-the-fly calculation of pixel-snapped coordinates outside of the paint code. Needless to say, each implementation had its own bugs, and their results did not always match. Because there was no caching of this information, the system would sometimes perform the exact same computation repeatedly—another strain on performance.

Here are some significant projects that eliminated the architectural deficits of the rendering phases prior to paint.

### Project Squad: Pipelining the style phase

This project tackled two main deficits in the style phase which prevented it from being cleanly pipelined:  

There are two primary outputs of the style phase: `ComputedStyle`, containing the result of running the CSS cascade algorithm over the DOM tree; and a tree of `LayoutObjects`, which establishes the order of operations for the layout phase. Conceptually, running the cascade algorithm should happen strictly before generating the layout tree; but previously, these two operations were interleaved. _Project Squad_ succeeded in splitting these two into distinct, sequential phases.  
  
Previously, `ComputedStyle` did not always get its final value during style recalc; there were a few situations where `ComputedStyle` was updated during a later pipeline phase. Project Squad successfully refactored these code paths, so that `ComputedStyle` is never modified after the style phase.

### LayoutNG: Pipelining the layout phase

This [monumental project](/blog/layoutng/)—one of the cornerstones of RenderingNG—was a complete rewrite of the layout rendering phase. We won't do justice to the entire project here, but there are a few notable aspects for the overall BlinkNG project:

- Previously, the layout phase received a tree of `LayoutObject` created by the style phase, and annotated the tree with size and position information. Thus, there was no clean separation of inputs from outputs. LayoutNG introduced the _fragment tree_, which is the primary, read-only output of layout, and serves as the primary input to subsequent rendering phases.  
- LayoutNG brought the _containment property_ to layout: when calculating the size and position of a given `LayoutObject`, we no longer look outside the subtree rooted at that object. All of the information needed to update layout for a given object is calculated beforehand and provided as a read-only input to the algorithm.  
-  Previously, there were edge cases where the layout algorithm was not strictly functional: the result of the algorithm depended on the most recent prior layout update. LayoutNG eliminated those cases.

### The pre-paint phase

Previously, there was no formal pre-paint rendering phase, just a grab bag of post-layout operations. The _pre-paint_ phase grew out of the recognition that there were a few related functions that could be best implemented as a systematic traversal of the layout tree after layout was complete; most importantly:  

-  **Issuing paint invalidations**: It's very difficult to do paint invalidation correctly during the course of layout, when we have incomplete information. It's much easier to get right, and can be very efficient, if it's split into two distinct processes: during style and layout, content can be marked with a simple boolean flag as "possibly needs paint invalidation." During the pre-paint tree walk, we check these flags and issue invalidations as necessary.  
-  **Generating paint property trees**: A process described in greater detail further on.  
-  **Computing and recording pixel-snapped paint locations**: The recorded results can be used by the paint phase, and also by any downstream code that needs them, without any redundant computation.

### Property trees: Consistent geometry

[Property trees](/blog/renderingng-data-structures/#property-trees) were introduced early in RenderingNG to deal with the complexity of scrolling, which on the web has a different structure than all other kinds of visual effects. Before property trees, Chromium's compositor used a single "layer" hierarchy to represent the geometrical relationship of composited content, but that quickly fell apart as the full complexities of features such as position:fixed became apparent. The layer hierarchy grew extra non-local pointers indicating the "scroll parent" or "clip parent" of a layer, and before long it was very hard to understand the code.

Property trees fixed this by representing the overflow scroll and clip aspects of content separately from all other visual effects. This made it possible to correctly model the true visual and scrolling structure of websites. Next, "all" we had to do was to implement algorithms on top of the property trees, such as the screen-space transform of composited layers, or determining which layers scrolled and which did not.

In fact, we soon noticed that there were many other places in the code where similar geometrical questions were raised. (The [key data structures post](/blog/renderingng-data-structures/#property-trees) has a more complete list.) Several of them had duplicate implementations of the same thing the compositor code was doing; all had a different subset of bugs; and none of them properly modeled true website structure. The solution then became clear: centralize all the geometry algorithms in one place and refactor all the code to use it.

These algorithms in turn all depend on property trees, which is why property trees are a _key_ data structure–that is, one used throughout the pipeline–of RenderingNG. So to achieve this goal of centralized geometry code, we needed to introduce the concept of property trees much earlier in the pipeline–in pre-paint–and change all APIs that now depended on them to require pre-paint be run before they could execute.

This story is yet another aspect of the BlinkNG refactoring pattern: identify key computations, refactor to avoid duplicating them, and create well-defined pipeline stages which create the data structures feeding them. We compute property trees at exactly the point when all of the necessary information is available; and we ensure that the property trees cannot change while later rendering stages are running.

### Composite after paint: Pipelining paint and compositing

_Layerization_ is the process of figuring out which DOM content goes into its own composited layer (which, in turn, represents a GPU texture). Before RenderingNG, layerization ran before paint, not after (see [here](/blog/renderingng-architecture/#rendering-pipeline-structure) for the current pipeline–note the change of order). We would first decide which parts of the DOM went into which composited layer, and only then draw display lists for those textures. Naturally, the decisions depended on factors such as which DOM elements were animating or scrolling, or had 3D transforms, and which elements painted on top of which.

This caused major problems, because it more or less required that there were circular dependencies in the code, which is a big problem for a rendering pipeline. Let's see why through an example. Suppose we need to _invalidate_ paint (meaning that we need to re-draw the display list and then raster it again). The need to invalidate could come from a change in the DOM, or from a changed style or layout. But of course, we'd like to only invalidate the parts that have actually changed. That meant finding out which composited layers were affected, and then invalidating part or all of the display lists for those layers.

This means that invalidation depended on DOM, style, layout, and past layerization decisions (past: meaning for the previous rendered frame). But the current layerization depends on all of those things as well. And since we didn't have two copies of all layerization data, it was hard to tell the difference between the past and future layerization decisions.  So we ended up with lots of code that had circular reasoning. This led sometimes to illogical or incorrect code, or even crashes or security issues, if we weren't very careful.

To deal with this situation, early on we introduced the concept of the `DisableCompositingQueryAsserts` object. Most of the time, if code tried to query past layerization decisions, it would cause an assertion failure and crash the browser if it was in debug mode. This helped us avoid introducing new bugs. And in each case where the code legitimately needed to query past layerization decisions, we put in code to allow it by allocating a `DisableCompositingQueryAsserts` object.

Our plan was to, over time, get rid of all call sites `DisableCompositingQueryAssert` objects, and then declare the code safe and correct. But what we discovered is that a number of the calls were essentially impossible to remove as long as layerization happened before paint. (We were finally able to remove it [only very recently](https://chromium-review.googlesource.com/c/chromium/src/+/3321653)!) This was the first reason discovered for the Composite After Paint project. What we learned was that, even if you have a well-defined pipeline phase for an operation, if it is in the wrong place in the pipeline you will eventually get stuck.

The second reason for the Composite After Paint project was the Fundamental Compositing bug. One way to state this bug is that DOM elements are not a good 1:1 representation of an efficient or complete layerization scheme for web page contents. And since compositing was before paint, it more or less inherently depended on DOM elements, not display lists or property trees. This is very similar to the reason we introduced property trees, and just as with property trees, the solution falls out directly if you figure out the right pipeline phase, run it at the right time, and provide it with the correct key data structures. And as with property trees, this was a good opportunity to guarantee that once the paint phase is complete, its output is immutable for all subsequent pipeline phases.

## Benefits

As you've seen, a well-defined rendering pipeline yields enormous long-term benefits. There are even more than you might think:

-  **Greatly improved reliability**: This one is pretty straightforward. Cleaner code with well-defined and understandable interfaces is easier to understand, write, and test. This makes it more reliable. It also makes the code safer and more stable, with fewer crashes and fewer use-after-free bugs.
-  **Expanded test coverage**: In the course of BlinkNG, we added a great many new tests to our suite. This includes unit tests that provide focused verification of internals; regression tests that prevent us from reintroducing old bugs we've fixed (so many!); and lots of additions to the public, collectively-maintained [Web Platform Test suite](https://wpt.fyi), which all browsers use to measure conformance to web standards.
-  **Easier to extend**: If a system is broken down into clear components, it's not necessary to understand other components at any level of detail in order to make progress on the current one. This makes it easier for everyone to add value to the rendering code without having to be a deep expert, and it also makes it easier to reason about the behavior of the entire system.
-  **Performance**: Optimizing algorithms written in spaghetti code is difficult enough, but it's almost impossible to achieve even bigger things such as [universal threaded scrolling and animations](/blog/renderingng/#threaded-scrolling-animations-and-decode) or the [processes and threads for site isolation](/blog/renderingng-architecture/#process-and-thread-structure) without such a pipeline. Parallelism can help us to improve performance tremendously, but is also extremely complicated.
-  **Yielding and containment**: There are several new features made possible by BlinkNG that exercise the pipeline in new and novel ways. For example, what if we wanted to only run the rendering pipeline until a budget has expired? Or skip rendering for subtrees known to be not relevant to the user right now? That's what the [content-visibility](/blog/renderingng/#extensibility-the-right-tools-for-the-job) CSS property enables. What about making the style of a component depend on its layout? That's [container queries](/blog/renderingng/#extensibility-the-right-tools-for-the-job).

## Case study: Container queries

Container queries is a highly anticipated upcoming web platform feature (it has been the number one most requested feature from CSS developers for years). If it's so great, why doesn't it exist yet? The reason is that an implementation of container queries requires very careful understanding and control of the relationship between the style and layout code. Let's take a closer look.

A container query allows the styles that apply to an element to depend on the laid-out size of an ancestor. Since the laid-out size is computed during layout, that means that we need to run style recalc after layout; but [style recalc runs before layout](/blog/renderingng-architecture/#rendering-pipeline-structure)! This chicken-and-egg paradox is the entire reason why we couldn't implement container queries prior to BlinkNG.

How can we resolve this? Isn't it a backwards pipeline dependency, that is, the same problem that projects such as Composite After Paint solved? Even worse, what if the new styles change the size of the ancestor? Won't this sometimes lead to an infinite loop?

In principle, the circular dependency can be solved by use of the contain CSS property, which allows rendering outside of an element _not to depend on rendering within that element's subtree_. That means that the new styles applied by a container can't affect the container's size, because container queries [requires containment](https://drafts.csswg.org/css-contain-3/#container-type).

But actually, that was not enough, and it was necessary to introduce a weaker type of containment than just size containment. This is because it's common to want a container queries container to be able to resize in only one direction (usually block) based on its inline dimensions. So the concept of [inline-size containment](https://drafts.csswg.org/css-contain-3/#containment-inline-size) was added. But as you can see from the very long note in that section, it was not at all clear for a long time if inline size containment was possible.

It's one thing to describe containment in abstract spec language, and it's quite another thing to implement it correctly. Recall that one of the goals of BlinkNG was to bring the containment principle to the tree walks that constitute the main logic of rendering: when traversing a subtree, no information should be required from outside the subtree. As it happens (well, it wasn't exactly an accident), it's _much_ cleaner and easier to implement CSS containment if the rendering code abides by the containment principle.

## Future: off-main-thread compositing … and beyond!

The rendering pipeline shown [here](/blog/renderingng-architecture/#rendering-pipeline-structure) is actually a bit ahead of the current RenderingNG implementation. It shows layerization as being off the main thread, whereas currently it's still on the main thread. However, it's only a matter of time before this is done, now that Composite After Paint has shipped and layerization is after paint.

To understand why this is important, and where else it may lead, we need to consider the architecture of the rendering engine from a somewhat higher vantage point. One of the most durable obstacles to improving Chromium's performance is the simple fact that the main thread of the renderer handles both main application logic (that is, running script) and the bulk of rendering. As a result, the main thread is frequently saturated with work, and main thread congestion is frequently the bottleneck in the entire browser.

The good news is that it doesn't have to be this way! This aspect of Chromium's architecture dates all the way back to the [KHTML](https://en.wikipedia.org/wiki/KHTML) days, when single-threaded execution was the dominant programing model. By the time multi-core processors became common in consumer-grade devices, the single-threaded assumption was thoroughly baked into Blink (previously WebKit). We have wanted to introduce more threading into the rendering engine for a long time, but it was simply impossible in the old system. One of the main objectives of Rendering NG was to dig ourselves out of this hole, and make it possible to move rendering work, in part or in whole, to another thread (or threads).

Now that BlinkNG is approaching completion, we are already starting to explore this area; [Non-Blocking Commit](http://crbug.com/1255972) is a first foray into changing the renderer's threading model. _Compositor commit_ (or just _commit_) is a synchronization step between the main thread and the compositor thread. During commit, we make copies of rendering data that are produced on the main thread, to be used by the downstream compositing code running on the compositor thread. While this synchronization is happening, main thread execution is stopped while the copying code runs on the compositor thread. This is done to ensure that the main thread doesn't modify its rendering data while the compositor thread is copying it.

Non-Blocking Commit will eliminate the need for the main thread to stop and wait for the commit stage to end—the main thread will continue doing work while commit runs concurrently on the compositor thread. The net effect of Non-Blocking Commit will be a reduction in the time dedicated to rendering work on the main thread, which will decrease congestion on the main thread, and improve performance. As of this writing (March 2022), we have a working prototype of Non-Blocking Commit, and we're preparing to do a detailed analysis of its impact on performance.

Waiting in the wings is [Off-main-thread Compositing](https://docs.google.com/document/d/1BfIqMcJvmMFdk8e_KKeOEofz16610Mql6gmfeFhrsZk/preview), with the goal of making the rendering engine match the illustration by moving _layerization_ off the main thread, and onto a worker thread. Like Non-Blocking Commit, this will reduce congestion on the main thread by diminishing its rendering workload. A project like this would never have been possible without the architectural improvements of Composite After Paint.

And there are more projects in the pipeline (pun intended)! We finally have a foundation that makes it possible to experiment with redistributing rendering work, and we are very excited to see what's possible!
