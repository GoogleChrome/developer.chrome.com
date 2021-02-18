---
layout: "layouts/doc-post.njk"
title: "Network Issues Guide"
authors:
  - kaycebasques
  - jonathangarbee
date: 2016-12-28
updated: 2020-07-10
description: "Learn how to detect network issues in the Network panel of Chrome DevTools."
---

This guide shows you how to detect network issues or optimization opportunities in the Network panel
of Chrome DevTools.

See [Get Started][1] to learn the basics of the Network panel.

## Queued or stalled requests {: #queued-or-stalled-requests }

**Symptoms**

Six requests are downloading simultaneously. After that, a series of requests are queued or stalled.
Once one of the first six requests finishes, one of the requests in the queue starts.

{% Img src="image/admin/FIGst4T9FJY9oekGJ0Sd.png", alt="An example of a queued or stalled series in the Network panel.", width="800", height="531" %}

**Figure 1**. An example of a queued or stalled series of requests in the Network panel. In the
**Waterfall**, you can see that the first six requests for `logo-1024px.png` start simultaneously.
The subsequent requests are stalled until one of the original six finishes.

**Causes**

Too many requests are being made on a single domain. On HTTP/1.0 or HTTP/1.1 connections, Chrome
allows a maximum of six simultaneous TCP connections per host.

**Fixes**

- Implement domain sharding if you must use HTTP/1.0 or HTTP/1.1.
- Use HTTP/2. Don't use domain sharding with HTTP/2.
- Remove or defer unnecessary requests so that critical requests can download earlier.

## Slow Time To First Byte (TTFB) {: #slow-ttfb }

**Symptoms**

A request spends a long time waiting to receive the first byte from the server.

{% Img src="image/admin/gDa7P1zo4oeGFQ0kqSgY.png", alt="An example of a request with a slow Time To First Byte.", width="800", height="434" %}

**Figure 2**. An example of a request with a slow Time To First Byte. The long, green bar in the
**Waterfall** indicates that the `wait` request was waiting a long time.

**Causes**

- The connection between the client and server is slow.
- The server is slow to respond. Host the server locally to determine if it's the connection or
  server that is slow. If you still get a slow TTFB when service locally, then the server is slow.

**Fixes**

- If the connection is slow, consider hosting your content on a CDN or changing hosting providers.
- If the server is slow, consider optimizing database queries, implementing a cache, or modifying
  your server configuration.

## Slow content download {: #long-content-download }

**Symptoms**

A request takes a long time to download.

{% Img src="image/admin/g3d3dKleJfIJsbJDTB5k.png", alt="An example of a request that takes a long time to download.", width="800", height="613" %}

**Figure 3**. An example of a request that takes a long time to download. The long, blue bar in the
**Waterfall** next to `elements-panel.png` means it took a long time to download.

**Causes**

- The connection between the client and server is slow.
- A lot of content is being downloaded.

**Fixes**

- Consider hosting your content on a CDN or changing hosting providers.
- Send fewer bytes by optimizing your requests.

## Contribute knowledge {: #contribute_knowledge }

Got a network issue that should be added to this guide?

- Send a tweet to [@ChromeDevTools][2].
- Start a mailing list thread by emailing `google-chrome-developer-tools@googlegroups.com`.
- [Open an issue][3] on the docs repo.

[1]: https://developers.google.com/web/tools/chrome-devtools/network-performance
[2]:
  https://twitter.com/intent/tweet?text=@ChromeDevTools%20%5BNetwork%20Issues%20Guide%20Suggestion%5D
[3]:
  https://github.com/google/WebFundamentals/issues/new?title=%5BDevTools%20Network%20Issues%20Guide%20Suggestion%5D
