---
layout: 'layouts/blog-post.njk'
title: Using cross-domain images in WebGL
description: >
  WebGL specification has an important update on how to request images, cross-domain.
authors:
  - paulkinlan
date: 2011-07-05
updated: 2019-01-16

---

WebGL specification has an important update on how to request images, cross-domain. The feature has already been implemented in Chrome 13 and is coming soon to Firefox 5.

Just use `image.crossOrigin` method on the client side and if you can edit the server just [add support to it](https://enable-cors.org/).

Read all the details in [Using Cross-domain images in WebGL and Chrome 13](https://blog.chromium.org/2011/07/using-cross-domain-images-in-webgl-and.html).
