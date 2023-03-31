---
title: >
  DevTools Tips: What are source maps?
description: >
  Learn how source maps can help you debug your original code instead of deployed.
layout: 'layouts/blog-post.njk'
date: 2023-03-31
authors:
  - sofiayem
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Ho0KpciQ9ch9ERgYwzjb.png'
alt: >
  DevTools Tips hero logo
tags:
  - devtools
  - devtools-tips
---

[Source maps](https://web.dev/source-maps/) let you keep your code readable and debuggable even after you've combined and minified it, without impacting performance.

{% YouTube id='FIYkjjFYvoI' %}

When using various transpilers, minifiers, and bundlers, the code you deploy differs from the code you author. To improve network performance, these tools compress the code into a single line, remove unnecessary characters, and shorten variables.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/jPx9rKYya49Lvy4Jd7J2.png", alt="Minified code and the original one.", width="800", height="353" %}

[Many tools](/docs/devtools/javascript/source-maps/#use_a_supported_preprocessor) can generate source maps to accompany your code.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/aVYvIvSYbjtw8oXpOnTt.png", alt="A source map.", width="800", height="702" %}

Chrome DevTools reads both the deployed code and source maps and lets you [debug your code](/docs/devtools/javascript/source-maps/#debugging_with_source_maps) as you normally would, even with [breakpoints](/docs/devtools/javascript/breakpoints/).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/FsUhQPFclSeWoGojWM30.png", alt="Using breakpoints in DevTools in an authored source file.", width="800", height="485" %}

To better understand how source maps work, check out the [source maps visualizer](https://sokra.github.io/source-map-visualization/).

Additionally, source maps can have [extensions](https://sourcemaps.info/spec.html#h.ghqpj1ytqjbm). If you build tools and frameworks, consider supporting them. Check out this [Case Study: Better Angular Debugging with DevTools](/blog/devtools-better-angular-debugging/), where the DevTools Team and Angular improved the debugging experience in DevTools by supporting the [`x_google_ignoreList` extension](/articles/x-google-ignore-list/).

To learn more, see:

- [Introduction to JavaScript Source Maps](/blog/sourcemaps/)
- [What are source maps?](https://web.dev/source-maps/)
- [Debug your original code instead of deployed with source maps](/docs/devtools/javascript/source-maps/)
