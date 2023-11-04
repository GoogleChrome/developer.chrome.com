---
layout: 'layouts/blog-post.njk'
title: WebSockets updated to latest version in Chrome Canary
description: >
  The WebSocket API has been rev'd to the latest version (13) in Chrome Canary
authors:
  - ericbidelman
date: 2011-10-13
updated: 2019-01-21

---


The WebSocket API has been rev'd to the latest version (13) in Chrome Canary. The developer-facing changes are very small, but are incompatible with the older version.

Here's the scoop:

* Change the origin header name: `Sec-WebSocket-Origin` -> `Origin`
* `Sec-WebSocket-Version` header value: 8 -> 13


