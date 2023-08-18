---
layout: 'layouts/doc-post.njk'
title: Reduce server response times
description: |
  Learn about the server-response-time audit.
date: 2019-05-02
updated: 2023-06-14
---

The Opportunities section of your Lighthouse report reports **server response time**—the time that it takes for a user's browser to receive the first byte of page content, after making the request:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/Nc4yOYetwgmU6y6Ovcrx.png", alt="A screenshot of the Lighthouse Server response times are low audit", width="800", height="118" %}
</figure>

## Slow server response times affect performance

This audit fails when the browser waits more than 600&nbsp;ms for the server to respond to the main document request. Users dislike when pages take a long time to load. Slow server response times are one possible cause for long page loads.

When users navigate to a URL in their web browser, the browser makes a network request to fetch that content. Your server receives the request and returns the page content.

{% Aside 'important' %}
Server response time is only part of the full [Time to First Byte (TTFB)](https://web.dev/ttfb/). As well as including the server response time, TTFB can often include DNS lookups and redirects (for example, if the final slash or the www subdomain or https protocol is omitted then the server might redirect to the correct URL, or for URL shorteners or Ads that redirect via several domains). Many Lighthouse tests will test the end URL, missing the redirect time, but even when this is not the case, the server response time will exclude these parts.

For this reason, Lighthouse has a smaller limit (600&nbsp;ms) to the [Core Web Vitals TTFB recommended time](https://web.dev/ttfb/#what-is-a-good-ttfb-score) (800&nbsp;ms).
{% endAside %}

The server may need to do a lot of work in order to return a page with all of the content that users want. For example, if users are looking at their order history, the server needs to fetch each user's history from a database, and then insert that content into the page. Optimizing the server to do work like this as quickly as possible is one way to reduce the time that users spend waiting for pages to load.

Even when the server does not need to do a lot of work, the network latency between the client and the server can result in a slow server response times.

## How to improve server response times

The first step to improving server response times is to identify the core conceptual tasks that your server must complete in order to return page content, and then measure how long each of these tasks takes. Once you've identified the longest tasks, search for ways to speed them up.

There are many possible causes of slow server responses, and therefore many possible ways to improve:

- Optimize the server's application logic to prepare pages faster. If you use a server framework, the framework may have recommendations on how to do this.
- Optimize how your server queries databases, or migrate to faster database systems.
- Upgrade your server hardware to have more memory or CPU.

Use a CDN to reduce network latency. This is particularly effective if the document can be cached at the CDN edge node.

See the [Optimize TTFB](https://web.dev/optimize-ttfb/) guide for more details.

## Stack-specific guidance

### Drupal

Themes, modules, and server specifications all contribute to server response time. Consider finding a more optimized theme, carefully selecting an optimization module, or upgrading your server. Your hosting servers should make use of PHP opcode caching, memory caching systems like memcached or Redis to reduce database query times, as well as optimized application logic to prepare pages faster.

### Magento

Use Magento's [Varnish integration](https://devdocs.magento.com/guides/v2.3/config-guide/varnish/config-varnish.html).

### React

If you are server-side rendering any React components, consider using [`renderToNodeStream()`](https://reactjs.org/docs/react-dom-server.html#rendertonodestream) or `renderToStaticNodeStream()` to allow the client to receive and hydrate different parts of the markup instead of all at once.

### WordPress

Themes, plugins, and server specifications all contribute to server response time. Consider finding a more optimized theme, carefully selecting an optimization plugin, and/or upgrading your server.

## Resources

- [Source code for **Reduce server response times (TTFB)** audit](https://github.com/GoogleChrome/lighthouse/blob/main/core/audits/server-response-time.js)
- [Time to First Byte documentation](https://web.dev/ttfb/)
- [Optimizing TTFB guide](https://web.dev/optimize-ttfb/)
