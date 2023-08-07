---
layout: layouts/doc-post.njk
title: Storage Access API
subhead: >
  A way for cross-site content loaded in a third-party context.
description: ''
date: 2023-07-26
updated: 2023-07-26
authors:
  - albertomedina
---

## Storage Access API

Browsers may block third-party resources from accessing cookies and other storage for privacy and security reasons. The most popular reason is cross-site tracking prevention. Such blocking breaks authenticated cross-site embeds such as commenting widgets, embedded payment providers, and subscribed video services. The [explainer](https://github.com/privacycg/storage-access#readme) provides more information.

The Storage Access API provides a way for cross-site content loaded in a third-party context (i.e. embedded in an _iframe_) to gain access to unpartitioned cookies, which would normally be accessible in a first-party context (i.e. when loaded directly in a browser tab).

{% Aside 'key-term' %}
The term "unpartitioned cookies" refers to cookies stored in the traditional way they have historically been stored since the early web — all cookies set on the same site are stored in the same cookie jar. This is in contrast to partitioned cookies, where embedded resources under each top-level origin are given a unique cookie storage space.
{% endAside %}

## Shared Storage API

{% Aside 'update' %}
[ToDo: Check] Difference between Storage Access API and Shared Storage API.
{% endAside %}

Shared Storage provides a general purpose privacy primitive for use cases where a small amount of cross-site data is required. It is comprised of a storage API (writes available from anywhere, reads only in isolated javascript environments called worklets) and a set of output gates which significantly limit the amount of cross-site information that can be read externally.
