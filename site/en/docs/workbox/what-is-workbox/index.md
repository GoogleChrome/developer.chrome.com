---
layout: "layouts/doc-post.njk"
title: What is Workbox?
date: 2021-09-24
description: >
  Introducing Workbox, a set of modules that simplify common service worker routing and caching.
---

At this point, service workers may seem tricky.
There's lots of complex interactions that are hard to get right.
Network requests! Caching strategies! Cache management! Precaching!
It's a lot to remember.
This doesn't make service worker an ill-designed technology;
it works as intended, and solves hard problems.

Good abstractions make complex APIs easier to use.
That's where Workbox comes in.
Workbox is a set of modules that simplify common service worker routing and caching.
Each module available addresses a specific aspect of service worker development.
Workbox aims to make using service workers as easy as possible,
while allowing the flexibility to accommodate complex application requirements where needed.

In the simplest cases,
[`workbox-build`](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build)
offers a couple of methods that can generate a service worker that precaches specified assets.
The [`generateSW`](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW)
method does most of the work out of the box,
while the [`injectManifest`](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.injectManifest)
method offers more control when necessary.

For more advanced use cases, other modules can help. A few such modules are:

- [`workbox-routing`](https://developers.google.com/web/tools/workbox/modules/workbox-routing) for request matching.
- [`workbox-strategies`](https://developers.google.com/web/tools/workbox/modules/workbox-strategies) for caching strategies.
- [`workbox-precaching`](https://developers.google.com/web/tools/workbox/modules/workbox-precaching) for precaching.
- [`workbox-expiration`](https://developers.google.com/web/tools/workbox/modules/workbox-expiration) for managing caches.
- [`workbox-window`](https://developers.google.com/web/tools/workbox/modules/workbox-window) for registering a service worker and handling updates in the [`window context`](https://developer.mozilla.org/docs/Web/API/Window).

These and [other modules](https://developers.google.com/web/tools/workbox/modules)
help compose service worker code in a declarative fashion that's easier to read and maintain than using service worker APIs directly.
This documentation will explain how to use them in an applied fashion.
