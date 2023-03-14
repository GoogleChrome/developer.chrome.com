---
layout: 'layouts/doc-post.njk'
title: Minimize main thread work
description: |
  Learn about the browser's main thread and how you can optimize your web page
  to reduce main thread load and improve performance.
date: 2019-05-02
updated: 2019-10-04
---

The browser's [renderer process](/blog/inside-browser-part3/)
is what turns your code into a web page that your users can interact with.
By default, the [main thread](https://developer.mozilla.org/docs/Glossary/Main_thread)
of the renderer process typically handles most code:
it parses the HTML and builds the DOM, parses the CSS and applies the specified styles,
and parses, evaluates, and executes the JavaScript.

The main thread also processes user events.
So, any time the main thread is busy doing something else,
your web page may not respond to user interactions,
leading to a bad experience.

## How the Lighthouse main thread work audit fails

[Lighthouse](/docs/lighthouse/overview/)
flags pages that keep the main thread busy for longer than 4&nbsp;seconds
during load:

<figure>
  {% Img src="image/tcFciHGuF3MxnTr1y5ue01OGLBn2/kcHYoy1vfoJX76JVyM9T.png", alt="A screenshot of the Lighthouse Minimize main thread work audit", width="800", height="408" %}
</figure>

To help you identify the sources of main thread load,
Lighthouse shows a breakdown of where CPU time was spent
while the browser loaded your page.

{% Partial 'lighthouse-performance/scoring.njk' %}

## How to minimize main thread work

The sections below are organized based on the categories that Lighthouse reports.
See [The anatomy of a frame](https://aerotwist.com/blog/the-anatomy-of-a-frame/)
for an overview of how Chromium renders web pages.

See [Do less main thread work](/docs/devtools/lighthouse/#main)
to learn how to use Chrome DevTools to investigate exactly what your main thread is doing
as the page loads.

### Script evaluation

- [Optimize third-party JavaScript](https://web.dev/fast/#optimize-your-third-party-resources)
- [Debounce your input handlers](https://web.dev/debounce-your-input-handlers/)
- [Use web workers](https://web.dev/off-main-thread/)

### Style and layout

- [Reduce the scope and complexity of style calculations](https://web.dev/reduce-the-scope-and-complexity-of-style-calculations/)
- [Avoid large, complex layouts and layout thrashing](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/)

### Rendering

- [Stick to compositor only properties and manage layer count](https://web.dev/stick-to-compositor-only-properties-and-manage-layer-count/)
- [Simplify paint complexity and reduce paint areas](https://web.dev/simplify-paint-complexity-and-reduce-paint-areas/)

### Parsing HTML and CSS

- [Extract critical CSS](https://web.dev/extract-critical-css/)
- [Minify CSS](https://web.dev/minify-css/)
- [Defer non-critical CSS](https://web.dev/defer-non-critical-css/)

### Script parsing and compilation

- [Reduce JavaScript payloads with code splitting](https://web.dev/reduce-javascript-payloads-with-code-splitting/)
- [Remove unused code](https://web.dev/remove-unused-code/)

### Garbage collection

- [Monitor your web page's total memory usage with `measureMemory()`](https://web.dev/monitor-total-page-memory-usage/)

## Resources

- [Source code for **Minimize main thread work** audit](https://github.com/GoogleChrome/lighthouse/blob/main/core/audits/mainthread-work-breakdown.js)
- [Main thread (MDN)](https://developer.mozilla.org/docs/Glossary/Main_thread)
- [Inside look at modern web browser (part 3)](/blog/inside-browser-part3/)
