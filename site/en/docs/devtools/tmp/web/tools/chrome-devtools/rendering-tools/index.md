---
layout: "layouts/doc-post.njk"
title: "Analyze Runtime Performance"
authors:
  - kaycebasques
  - megginkearney
date: 2015-04-13
updated: 2020-07-10
description: "Users expect pages to be interactive and smooth. Each stage in the pixel pipeline represents an opportunity to introduce jank. Learn about tools and strategies to identify and fix common problems that slow down runtime performance."
---

Users expect pages to be interactive and smooth. Each stage in the pixel pipeline represents an
opportunity to introduce jank. Learn about tools and strategies to identify and fix common problems
that slow down runtime performance.

## TL;DR {: #tldr }

- Don't write JavaScript that forces the browser to recalculate layout. Separate read and write
  functions, and perform reads first.
- Don't over-complicate your CSS. Use less CSS and keep your CSS selectors simple.
- Avoid layout as much as possible. Choose CSS that doesn't trigger layout at all.
- Painting can take up more time than any other rendering activity. Watch out for paint bottlenecks.

## JavaScript {: #javascript }

JavaScript calculations, especially ones that trigger extensive visual changes, can stall
application performance. Don't let badly-timed or long-running JavaScript interfere with user
interactions.

### Tools {: #tools }

Make a **Timeline** [recording][1] and look for suspiciously long **Evaluate Script** events. If you
find any, you can enable the [JS Profiler][2] and re-do your recording to get more detailed
information about exactly which JS functions were called and how long each took.

If you're noticing quite a bit of jank in your JavaScript, you may need to take your analysis to the
next level and collect a JavaScript CPU profile. CPU profiles show where execution time is spent
within your page's functions. Learn how to create CPU profiles in [Speed Up JavaScript
Execution][3].

### Problems {: #problems }

The following table describes some common JavaScript problems and potential solutions:

<table><thead><tr><th>Problem</th><th>Example</th><th>Solution</th></tr></thead><tbody><tr><td data-th="Problem">Expensive input handlers affecting response or animation.</td><td data-th="Example">Touch, parallax scrolling.</td><td data-th="Solution">Let the browser handle touch and scrolls, or bind the listener as late as possible (see <a href="http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/">Expensive Input Handlers in Paul Lewis' runtime performance checklist</a>).</td></tr><tr><td data-th="Problem">Badly-timed JavaScript affecting response, animation, load.</td><td data-th="Example">User scrolls right after page load, setTimeout / setInterval.</td><td data-th="Solution"><a href="/web/fundamentals/performance/rendering/optimize-javascript-execution">Optimize JavaScript execution</a>: use <code translate="no" dir="ltr">requestAnimationFrame</code>, spread DOM manipulation over frames, use Web Workers.</td></tr><tr><td data-th="Problem">Long-running JavaScript affecting response.</td><td data-th="Example">The <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">DOMContentLoaded event</a> stalls as it's swamped with JS work.</td><td data-th="Solution">Move pure computational work to <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">Web Workers</a>. If you need DOM access, use <code translate="no" dir="ltr">requestAnimationFrame</code> (see also <a href="/web/fundamentals/performance/rendering/optimize-javascript-execution">Optimize JavaScript Execution</a>).</td></tr><tr><td data-th="Problem">Garbage-y scripts affecting response or animation.</td><td data-th="Example">Garbage collection can happen anywhere.</td><td data-th="Solution">Write less garbage-y scripts (see <a href="http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/">Garbage Collection in Animation in Paul Lewis' runtime performance checklist</a>).</td></tr></tbody></table>

## Style {: #style }

Style changes are costly, especially if those changes affect more than one element in the DOM. Any
time you apply styles to an element, the browser has to figure out the impact on all related
elements, recalculate the layout, and repaint.

Related Guides:

- [Reduce the Scope and Complexity of Styles Calculations][10]

### Tools {: #tools_2 }

Make a **Timeline** [recording][11]. Check the recording for large **Recalculate Style** events
(displayed in purple).

Click on a **Recalculate Style** event to view more information about it in the **Details** pane. If
the style changes are taking a long time, that's a performance hit. If the style calculations are
affecting a large number of elements, that's another area with room for improvement.

{% Img src="image/admin/FqzRqrOzaWhqMeBbg0W7.png", alt="Long recalculate style", width="800", height="466" %}

To reduce the impact of **Recalculate Style** events:

- Use the [CSS Triggers][12] to learn which CSS properties trigger layout, paint, and composite.
  These properties have the worst impact on rendering performance.
- Switch to properties that have less impact. See [Stick to compositor-only properties and manage
  layer count][13] for more guidance.

### Problems {: #problems_2 }

The following table describes some common style problems and potential solutions:

<table><thead><tr><th>Problem</th><th>Example</th><th>Solution</th></tr></thead><tbody><tr><td data-th="Problem">Expensive style calculations affecting response or animation.</td><td data-th="Example">Any CSS property that changes an element's geometry, like its width, height, or position; the browser has to check all other elements and redo the layout.</td><td data-th="Solution"><a href="/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing">Avoid CSS that triggers layouts.</a></td></tr><tr><td data-th="Problem">Complex selectors affecting response or animation.</td><td data-th="Example">Nested selectors force the browser to know everything about all the other elements, including parents and children.</td><td data-th="Solution"><a href="/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations">Reference an element in your CSS with just a class.</a></td></tr></tbody></table>

Related Guides:

- [Reduce the Scope and Complexity of Styles Calculations][16]

## Layout {: #layout }

Layout (or reflow in Firefox) is the process by which the browser calculates the positions and sizes
of all the elements on a page. The web's layout model means that one element can affect others; for
example, the width of the `<body>` element typically affects its children's widths, and so on, all
the way up and down the tree. The process can be quite involved for the browser.

As a general rule of thumb, if you ask for a geometric value back from the DOM before a frame is
complete, you are going to find yourself with "forced synchronous layouts", which can be a big
performance bottleneck if repeated frequently or performed for a large DOM tree.

Related Guides:

- [Avoid Layout Thrashing][17]
- [Diagnose Forced Synchronous Layouts][18]

### Tools {: #tools_3 }

The Chrome DevTools **Timeline** identifies when a page causes forced synchronous layouts. These
**Layout** events are marked with red bars.

{% Img src="image/admin/fDFrcqzkWgCWYLcoCfSj.png", alt="forced synchronous layout", width="800", height="206" %}

"Layout thrashing" is a repetition of forced synchronous layout conditions. This occurs when
JavaScript writes and reads from the DOM repeatedly, which forces the browser to recalculate the
layout over and over. To identify layout thrashing, look for a pattern of multiple forced
synchronous layout warnings (as in the screenshot above).

### Problems {: #problems_3 }

The following table describes some common layout problems and potential solutions:

<table><thead><tr><th>Problem</th><th>Example</th><th>Solution</th></tr></thead><tbody><tr><td data-th="Problem">Forced synchronous layout affecting response or animation.</td><td data-th="Example">Forcing the browser to perform layout earlier in the pixel pipeline, resulting in repeating steps in the rendering process.</td><td data-th="Solution">Batch your style reads first, then do any writes (see also <a href="/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing">Avoid large, complex layouts and layout thrashing</a>).</td></tr></tbody><tbody><tr><td data-th="Problem">Layout thrashing affecting response or animation.</td><td data-th="Example">A loop that puts the browser into a read-write-read-write cycle, forcing the browser to recalculate layout over and over again.</td><td data-th="Solution">Automatically batch read-write operations using <a href="https://github.com/wilsonpage/fastdom">FastDom library</a>.</td></tr></tbody></table>

## Paint and composite {: #paint_and_composite }

Paint is the process of filling in pixels. It is often the most costly part of the rendering
process. If you've noticed that your page is janky in any way, it's likely that you have paint
problems.

Compositing is where the painted parts of the page are put together for displaying on screen. For
the most part, if you stick to compositor-only properties and avoid paint altogether, you should see
a major improvement in performance, but you need to watch out for excessive layer counts (see also
[Stick to compositor-only properties and manage layer count][21]).

### Tools {: #tools_4 }

Want to know how long painting takes or how often painting occurs? Enable the [Paint profiler][22]
on the **Timeline** panel and then [make a recording][23]. If most of your rendering time is spent
painting, you have paint problems.

{% Img src="image/admin/FpTO5wDQ5w3vsbYeWARc.png", alt="Long paint times in timeline recording", width="800", height="637" %}

Check out the [**rendering settings**][24] menu for further configurations that can help diagnose
paint problems.

### Problems {: #problems_4 }

The following table describes some common paint and composite problems and potential solutions:

<table><thead><tr><th>Problem</th><th>Example</th><th>Solution</th></tr></thead><tbody><tr><td data-th="Problem">Paint storms affecting response or animation.</td><td data-th="Example">Big paint areas or expensive paints affecting response or animation.</td><td data-th="Solution">Avoid paint, promote elements that are moving to their own layer, use transforms and opacity (see <a href="/web/fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas">Simplify paint complexity and reduce paint areas</a>).</td></tr><tr><td data-th="Problem">Layer explosions affecting animations.</td><td data-th="Example">Overpromotion of too many elements with translateZ(0) greatly affects animation performance.</td><td data-th="Solution">Promote to layers sparingly, and only when you know it offers tangible improvements (see <a href="/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count">Stick to composite-only properties and manage layer count</a>).</td></tr></tbody></table>

[1]:
  https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool#make-a-recording
[2]:
  https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool#profile-js
[3]: /web/tools/chrome-devtools/rendering-tools/js-execution
[4]: http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/
[5]: /web/fundamentals/performance/rendering/optimize-javascript-execution
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[8]: /web/fundamentals/performance/rendering/optimize-javascript-execution
[9]: http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/
[10]: /web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations
[11]:
  https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool#make-a-recording
[12]: https://csstriggers.com
[13]:
  /web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count
[14]: /web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing
[15]: /web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations
[16]: /web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations
[17]: /web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing
[18]: /web/tools/chrome-devtools/rendering-tools/forced-synchronous-layouts
[19]: /web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing
[20]: https://github.com/wilsonpage/fastdom
[21]:
  /web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count
[22]:
  https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool#profile-painting
[23]:
  https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool#make-a-recording
[24]:
  https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool#rendering-settings
[25]: /web/fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas
[26]:
  /web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count
