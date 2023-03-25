---
layout: 'layouts/doc-post.njk'
title: Current page does not respond with a 200 when offline
description: |
  Learn how to make your Progressive Web App work offline.
date: 2019-05-04
updated: 2020-06-04
codelabs:
  - codelab-service-workers
---

The [Core Progressive Web App checklist](https://web.dev/pwa-checklist/#core) says that a PWA
should provide a custom offline page. The [Optimial Progressive Web App checklist](https://web.dev/pwa-checklist/#optimal)
says that a PWA should provide an offline experience where the PWA works the same offline as
it does online (wherever network connectivity isn't strictly required).

Learn more in the [What is network reliability and how do you measure it?](https://web.dev/network-connections-unreliable/) post.

## How the Lighthouse offline audit fails

[Lighthouse](/docs/lighthouse/overview/)
flags pages that don't respond with an
[HTTP 200 response](https://developer.mozilla.org/docs/Web/HTTP/Status#Successful_responses)
when offline:

<figure>
  {% Img src="image/tcFciHGuF3MxnTr1y5ue01OGLBn2/kpkiosw2MD8u8wfq4AJU.png", alt="Lighthouse audit showing page doesn't respond with a 200 when offline", width="800", height="95" %}
</figure>

Lighthouse emulates an offline connection using the [Chrome Remote Debugging Protocol](https://github.com/ChromeDevTools/devtools-protocol)
and then attempts to retrieve the page using [`XMLHttpRequest`](https://developer.mozilla.org/docs/Web/API/XMLHttpRequest).

{% Partial 'lighthouse-pwa/scoring.njk' %}

## How to make your PWA work offline

{% Partial 'reliable/workbox.njk' %}

1. Add a [service worker](/docs/workbox/service-worker-overview/) to your app.
2. Use the service worker to cache files locally.
3. When offline, use the service worker as a network proxy to return the
   locally cached version of the file.

{% Aside 'codelab' %}
Learn how to add a service worker to your app
with the [Working with service workers](https://web.dev/codelab-service-workers) codelab.
{% endAside %}

## Resources

- [What is network reliability and how do you measure it?](https://web.dev/network-connections-unreliable/)
- [Service Workers: an Introduction](/docs/workbox/service-worker-overview/)
