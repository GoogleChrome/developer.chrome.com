---
layout: 'layouts/blog-post.njk'
title: 'RenderingNG deep-dive: LayoutNG'
description: >
  How the large architecture change of LayoutNG reduces and mitigates various types of bugs and performance issues.
thumbnail: image/kheDArv5csY6rvQUJDbWRscckLr1/PSZ58CfBFUUNasONGnHg.jpg
alt: The conceptual model of the new layout architecture.
date: 2021-10-08
authors:
  - iankilpatrick
  - kojiishi
tags:
  - rendering
---
{% Aside %}
This post is a part of a series on the Chromium rendering engine. Check out the rest of the series to learn more about [RenderingNG](/blog/renderingng), [the architecture](/blog/renderingng-architecture/), [key data structures](/blog/renderingng-data-structures/), and [VideoNG](/blog/videong/).
{% endAside %}

I'm Ian Kilpatrick, 
an engineering lead on the Blink layout team, along with Koji Ishii. 
Before working on the Blink team, 
I was a front-end engineer (before Google had the role of "front-end engineer"), 
building features within Google Docs, Drive, and Gmail. 
After around five years in that role I took a large gamble switching to the Blink team, 
effectively learning C++ on the job, 
and attempting to ramp up on the massively complex Blink codebase. 
Even today, I only understand a relatively small portion of it. 
I'm grateful for the time given to me during this period. 
I was comforted by the fact a lot of "recovering front-end engineers" made the transition to being a "browser engineer" before me.

My prior experience has guided me personally while on the Blink team. 
As a front-end engineer I constantly ran into browser inconsistencies, 
performance issues, rendering bugs, and missing features.
LayoutNG was an opportunity for me to help systematically fix these issues within Blink's layout system, 
and represents the sum of many engineers' efforts over the years.

In this post, I'll explain how a large architecture change like this can reduce and mitigate various types of bugs and performance issues.

## A 30,000 foot view of layout engine architectures

Previously, Blink's layout tree was what I'll refer to as a "mutable tree".

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/3XiF82V7kn7G881m7Q5v.png", 
alt="Shows the tree as described in the following text.", width="800", height="371" %}

Each object in the layout tree contained *input* information, 
such as the available size imposed by a parent, 
the position of any floats, and *output* information, 
for example, the final width and height of the object or its x and y position.

These objects were kept around between renders. 
When a change in style occured, 
we marked that object as dirty and likewise all of its parents in the tree. 
When the layout phase of the rendering pipeline was run, 
we'd then clean the tree, walk any dirty objects, then run layout to get them to a clean state.

We found that this architecture resulted in many classes of issues, 
which we'll describe below. 
But first, let's step back and consider what the inputs and outputs of layout are.

Running layout on a node in this tree conceptually takes the "Style plus DOM", 
and any parent constraints from the parent layout system (grid, block, or flex), 
runs the layout constraint algorithm, and produces a result.

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/PSZ58CfBFUUNasONGnHg.jpg", 
alt="The conceptual model described previously.", width="800", height="517" %}

Our new architecture formalizes this conceptual model. 
We still have the layout tree, but use it primarily to hold onto the inputs and outputs of layout. 
For the output, we generate a completely new, _immutable_ object called the _fragment tree_.

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/bk9rOOYOwTfrLNflgghW.png", 
alt="The fragment tree.", width="800", height="262" %}

I covered the 
[immutable fragment tree previously](/blog/renderingng-data-structures/#the-immutable-fragment-tree), 
describing how it is designed to reuse large portions of the previous tree for incremental layouts.

Additionally, we store the parent constraints object which generated that fragment. 
We use this as a _cache key_ which we'll discuss more below.

The inline (text) layout algorithm is also rewritten to match the new immutable architecture. 
It not only produces the 
[immutable flat list representation](/blog/renderingng-data-structures/#inline-fragment-items) 
for inline layout, but also features paragraph-level caching for faster relayout, 
shape-per-paragraph to apply font features across elements and words, 
a new Unicode bidirectional algorithm using ICU, a lot of correctness fixes, and more.

## Types of layout bugs

Layout bugs broadly speaking fall into four different categories, 
each with different root causes.

### Correctness

When we think about bugs in the rendering system, we typically think about correctness, 
for example: "Browser A has X behaviour, while Browser B has Y behaviour", 
or "Browsers A and B are both broken". 
Previously this is what we spent a lot of our time on, 
and in the process we were constantly fighting with the system. 
A common failure mode was to apply a very targeted fix for one bug, 
but find weeks later that we had caused a regression in another (seemingly unrelated) part of the system.

As described in [previous posts](/blog/renderingng/#reliability), 
this is a sign of a very brittle system. 
For layout specifically, we didn't have a clean contract between any classes, 
causing browser engineers to depend on state which they shouldn't, 
or mis-interpret some value from another part of the system.

As an example, at one point we had a chain of approximately 10 bugs over the course of more than a year, 
related to flex layout. 
Each fix caused either a correctness or performance issue in part of the system, 
leading to yet another bug.

Now that LayoutNG clearly defines the contract between all the components in the layout system, 
we've found that we can apply changes with much more confidence. 
We also benefit greatly from the excellent [Web Platform Tests](/blog/renderingng/#testing-and-metrics) (WPT) project, 
which allows multiple parties to contribute to a common web test suite.

Today we find that if we release a real regression on our stable channel, 
it typically has no  associated tests in the WPT repository, 
and doesn't result from a misunderstanding of component contracts. 
Further, as part of our bugfix policy, we always add a new WPT test, 
helping to ensure that no browser should make the same mistake again.

### Under-invalidation

If you've ever had a mysterious bug where resizing the browser window or toggling a CSS property magically makes the bug go away, 
you've run into an under-invalidation problem. 
Effectively a portion of the mutable tree was deemed clean, 
but due to some change in parent constraints it didn't represent the correct output.

This is very common with the two-pass 
(walking the layout tree twice to determine the final layout state) layout modes described below. 
Previously our code would look like:

```cpp
if (/* some very complicated statement */) {
  child->ForceLayout();
}
```

A fix for this type of bug would typically be:

```cpp
if (/* some very complicated statement */ ||
    /* another very complicated statement */) {
  child->ForceLayout();
}
```

A fix for this type of problem would typically cause a severe performance regression, 
(see over-invalidation below), and was very delicate to get correct.

Today (as described above) we have an immutable parent constraints object which describes all the inputs from the parent layout to the child. 
We store this with the resulting immutable fragment. 
Due to this, 
we have a centralized place where we *diff* these two inputs to determine if the child needs to have another layout pass performed. 
This diffing logic is complicated, but well-contained. 
Debugging this class of under-invalidation issues typically results in manually inspecting the two inputs 
and deciding what in the input changed such that another layout pass is required.

Fixes to this diffing code are typically simple, 
and easily [unit-testable](https://chromium.googlesource.com/chromium/src/+/main/third_party/blink/renderer/core/layout/ng/ng_layout_result_caching_test.cc) due to the simplicity of creating these independent objects.

<figure>
{% Img
  src="image/kheDArv5csY6rvQUJDbWRscckLr1/TmFGmAxnYrZFeRjhaxyr.png",
  alt="Comparing a fixed width and percentage width image.",
  width="380",
  height="240"
%}
  <figcaption>
    A fixed width/height element doesn't care if the available-size given to it increases, however a percentage-based width/height does. The <em>available-size</em> is represented on the <em>Parent Constraints</em> object, and as part of the diffing algorithm will perform this optimization.
  </figcaption>
</figure>

The diffing code for the above example is:

```cpp
if (width.IsPercent()) {
  if (old_constraints.WidthPercentageSize() 
    != new_constraints.WidthPercentageSize())
   return kNeedsLayout;
}
if (height.IsPercent()) {
  if (old_constraints.HeightPercentageSize() 
    != new_constraints.HeightPercentageSize())
   return kNeedsLayout;
}
```

### Hysteresis

This class of bugs is similar to under-invalidation. 
Essentially, in the previous system it was incredibly difficult to ensure that layout was idempotent-that is, 
re-running layout with the same inputs, resulted in the same output.

In the example below we are simply switching a CSS property back and forth between two values. 
However this results in an "infinitely growing" rectangle.

<figure>
{% Video src="video/kheDArv5csY6rvQUJDbWRscckLr1/DZxkoIlg22Ogrx5WepAc.mp4", autoplay="true", controls="true" %}
  <figcaption>
    The video and <a href="https://hysteresis-layout.glitch.me/">demo</a> show a hysteresis bug in Chrome 92 and below. It is fixed in Chrome 93.</figcaption>
</figure>

With our previous mutable tree, 
it was incredibly easy to introduce bugs like this. 
If the code made the mistake of reading the size or position of an object at the incorrect time or stage 
(as we didn't "clear" the previous size or position for example), 
we would immediately add a subtle hysteresis bug. 
These bugs typically don't appear in testing as the majority of tests focus on a single layout and render. 
Even more concerningly, we knew that some of this hysteresis was needed to get some layout modes working correctly. 
We had bugs where we'd perform an optimization to remove a layout pass, 
but introduce a "bug" as the layout mode required two passes in order to get the correct output.

<figure>
{% Img
  src="image/kheDArv5csY6rvQUJDbWRscckLr1/ykGPhJ7ATzAVWrh8m8R5.png",
  alt="A tree demonstrating the problems described in the preceding text.",
  width="380",
  height="240"
%}
  <figcaption>
    Depending on the previous layout result information, results in non-idempotent layouts
  </figcaption>
</figure>

With LayoutNG, as we have explicit input and output data-structures, 
and accessing the previous state isn't allowed, we have broadly mitigated this class of bug from the layout system.

### Over-invalidation and performance

This is the direct opposite of the under-invalidation class of bugs. 
Often when fixing an under-invalidation bug we'd trigger a performance cliff.

We often had to make difficult choices favouring correctness over performance. 
In the next section we'll dive deeper into how we mitigated these types of performance issues.

#### Rise of the two-pass layouts and performance cliffs

Flex and grid layout represented a shift in the expressiveness of layouts on the web. 
However, these algorithms were fundamentally different from the block layout algorithm that came before them.

Block layout (in almost all cases) only requires the engine to perform layout on all its children exactly once. 
This is great for performance, but ends up not being as expressive as web developers want.

For example, 
often you want the size of all children to expand to the size of the largest. 
To support this, the parent layout (flex or grid) 
will perform a measure pass to determine how large each of the children is, 
then a layout pass to stretch all children to this size. 
This behaviour is the default for both flex and grid layout.

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/UQFVXUjWuUmTyfXJqLGf.png", 
alt="Two sets of boxes, the first shows the intrinsic size of the boxes in the measure pass, the second at layout all equal height.", width="800", height="267" %}

These two-pass layouts were initially acceptable performance-wise, 
as people typically didn't nest them deeply. 
However, we started to see significant performance issues as more complex content emerged. 
If you don't cache the result of the measure phase, 
the layout tree will thrash between its _measure_ state, and its final _layout_ state.

<figure>
{% Img
  src="image/kheDArv5csY6rvQUJDbWRscckLr1/bk9rOOYOwTfrLNflgghW.png",
  alt="The one, two, and three-pass layouts explained in the caption.",
  width="380",
  height="240"
%}
  <figcaption>
    In the above image, we have three <code>&lt;div&gt;</code> elements. 
A simple one-pass layout (like block layout) will visit three layout nodes (complexity O(n)). 
However for a two-pass layout (like flex or grid), 
this can potentially result in complexity of O(2<sup>n</sup>) visits for this example.
  </figcaption>
</figure>

{% Aside %}
A recurrence relation for this specific example is:

- layout(div) = 2 &#42; layout(child)
- layout(div) = 2 &#42; 2 &#42; layout(grandchild)
- layout(div) = 2<sup>n</sup>

Where `n` is the depth of the tree. 
Things get more complicated if there is a higher branching factor 
(more than one child at each level, etc).
{% endAside %}

<figure>
{% Img
  src="image/kheDArv5csY6rvQUJDbWRscckLr1/q1VwbP1in5I5idJ8Vq0s.png",
  alt="Graph showing the exponential increase in layout time.",
  width="380",
  height="240"
%}
  <figcaption>
    This image and <a href="https://exponential-layout.glitch.me/">demo</a> shows an exponential layout with Grid layout. This is fixed in Chrome 93 as a result of moving Grid onto the new architecture
  </figcaption>
</figure>

Previously we'd try to add very specific caches to flex and grid layout in order to combat this type of performance cliff. 
This worked (and we got very far with Flex), 
but were constantly fighting with under and over invalidation bugs.

{% Aside %}
We thought our previous attempts with flexbox were pretty good, 
but when we moved flex over to the new architecture our metrics showed large improvements in very slow layout times in the wild, 
indicating that we clearly missed some cases which the new system caught.
{% endAside %}

LayoutNG lets us create explicit data structures for both the input and output of layout, 
and on top of that we have built caches of the measure and layout passes. 
This brings the complexity back to O(n), 
resulting in predictably linear performance for web developers. 
If there is ever a case where a layout is doing three-pass layout we'll simply cache that pass as well. 
This may open up opportunities to safely introduce more advanced layout modes in the future-an example of how RenderingNG fundamentally 
[unlocks extensibility](/blog/renderingng/#extensibility-the-right-tools-for-the-job) across the board. 
In some cases Grid layout can require three-pass layouts, but is exceedingly rare at the moment.

We find that when developers run into performance issues specifically with layout, 
it is typically due to an exponential layout time bug rather than the raw throughput of the layout stage of the pipeline. 
If a small incremental change (one element changing a single css property) results in a 50-100ms layout, 
this is likely an exponential layout bug.

## In summary

Layout is a massively complex area, 
and we didn't cover all sorts of interesting details such as inline layout optimizations 
(really how the whole inline and text sub-system works), 
and even the concepts talked about here really only scratched the surface, 
and glossed over many details. 
However, hopefully we've shown how systematically improving the architecture of a system can lead to outsized gains over the long term.

That said, we know we still have lots of work ahead of us. 
We are aware of classes of issues (both performance and correctness) that we are working on solving, 
and are excited about new layout features coming to CSS. 
We believe LayoutNG's architecture makes solving these problems safe and tractable.

_One image (you know which one!) by Una Kravets_.
