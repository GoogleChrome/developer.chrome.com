---
title: Sanitizer API deprecation
description: >
  Chrome 119 will deprecate current Sanitizer API implementation to catch up with future specification updates.
layout: 'layouts/blog-post.njk'
date: 2023-10-14
authors:
  - jxck
tags:
  - sanitizer-api
  - chrome-119
---

Work on [the Sanitizer API](https://github.com/WICG/sanitizer-api) began in 2020, with the aim of building a secure API to sanitize HTML on browsers.

Chrome shipped an initial version of the Sanitizer API in Chrome 105, based on the specification draft at that time. We introduced this version of the API to developers, and gathered useful implementation experience. 

However, changes to the specification mean that the proposed API shape has changed substantially. To prevent the current API from becoming entrenched, we decided to deprecate the current implementation in Chrome 119.

See more details in [Intent to Deprecate: Remove "Sanitizer API MVP"](https://groups.google.com/a/chromium.org/g/blink-dev/c/PNTt4oFXt8c/m/C1bS0ityBAAJ).

The new API is still being discussed in the [WICG](https://github.com/WICG/sanitizer-api/), and we intend to implement the result in Chrome when the specification matures. We'll post an article to introduce it once it’s ready.
