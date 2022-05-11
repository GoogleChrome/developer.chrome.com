---
# Required
layout: 'layouts/blog-post.njk'
title: Private prefetch proxy in Chrome
description: >
  Speeding up Largest Contentful Paint (LCP) with cross-site prefetching.
subhead: >
  Speeding up Largest Contentful Paint (LCP) with cross-site prefetching.
date: 2022-05-11
authors:
  - katiehempenius
  - kenjibaheux
  - buettner
tags:
  - privacy
  - security
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/MKR7llxWeUvVif0CDGPM.jpg'
alt: >
  A gate with a sign reading private.
---

Since Chrome 92, we've been running an Early Access Program (EAP) for a feature called Private Prefetch Proxy, which speeds up outgoing navigations from Google Search by 30% at the median. Private Prefetch Proxy allows the prefetching of cross-origin content without exposing user information to the destination website until the user navigates. We expect that the feature will graduate from this EAP as early as Chrome 103, thereby no longer requiring websites to opt-in, and allowing other referrer websites to safely speed up cross-site navigations.

Read on to learn about [how this feature works](#how), 
[how it can help significantly improve your sites' Largest Contentful Paint (LCP)](#owners), 
or [how referrer websites can help their users](#referrers) achieve their goals by speeding up cross-site navigations.

## How Private Prefetch Proxy works {: #how }

### Secure communication channel

This feature uses a [`CONNECT`](https://tools.ietf.org/html/rfc7231#section-4.3.6) proxy to establish a secure communication channel between Chrome and the server hosting the content to be prefetched. This secure communication channel prevents the proxy from inspecting any data transfer. Notably, while Private Prefetch Proxy necessarily sees the host name in order to establish a secure communication channel, it does not see the full URLs, nor the resources themselves.

<figure>
{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/UF6dpd6QvSzGXXlM9YWE.gif", alt="Animation showing flow of data through proxy.", width="600", height="365" %}
  <figcaption>Prefetching websites via a <code>CONNECT</code> proxy prevents leaking user information.</figcaption>
</figure>

In addition, because the secure communication channel is encrypted end-to-end, intermediaries can neither observe the host names, nor the content of the prefetched sites. Finally, the proxy inherently prevents the destination server from seeing the user's IP address.

### Preventing user identification

Beyond the network aspects detailed earlier, we also need to prevent servers from identifying a user at prefetch time, via information previously stored on their device. To that end, Chrome currently restricts the usage of Private Prefetch Proxy to websites for which the user has no cookies or other local state. Here are the restrictions for prefetch requests made via Private Prefetch Proxy:

- **Cookies:** Prefetch requests are not allowed to carry cookies.
  - If there is a cookie for a resource, Chrome will make an uncredentialed fetch but will not use the response (see later [Caching](#caching) section). 
  - Although responses to a prefetch request can include cookies, these cookies will only be saved if the user navigates to the prefetched page.
- **Fingerprinting:** Other surfaces which could be used for fingerprinting are also adjusted. For example, the `User-Agent` header sent by prefetch proxy only carries limited information.

In the future, we hope to expand Private Prefetch Proxy to links with cookies or local state while maintaining the same privacy characteristics. See the [What's next](#next) section for more details.

### Caching {: #caching }

Chrome will prefetch resources even if they are already in the cache, but they will not carry any conditional headers such as `ETag` or `If-Modified-Since` (these contain server-set values which could be used for tracking even without cookies). This prefetching is done to prevent leaking a client's cache state to the prefetched website. In addition, Chrome will only commit a prefetched resource to the cache if the user decides to navigate to the prefetched website.

## Getting started with private prefetch proxy

### For website owners {: #owners }

For the duration of the Early Access Program, website owners interested in Private Prefetch Proxy will need to deploy a traffic advice file on their server with the following content: 

```json
[{
  "user_agent": "prefetch-proxy",
  "google_prefetch_proxy_eap": {
    "fraction": 1.0
  }
}]
```

- The `google_prefetch_proxy_eap` section allows you to opt into the EAP.
- The `fraction` field gives you control over the prefetch traffic by specifying how much Private Prefetch Proxy should let through. See the [traffic control](#traffic) section for more details.

This `traffic-advice` file should be placed under the `/.well-known/` path of your website (i.e. `/.well-known/traffic-advice`), and served with a MIME type of `application/trafficadvice+json`. Doing so will allow Chrome to speed up navigations to your website from participating referrers on links for which the user has no cookies or local state. From past experiments, we've seen between 20% to 30% faster [LCP](https://web.dev/lcp/) on prefetched navigations.

In the future, we hope to expand this feature to links with cookies or local state while maintaining its privacy characteristics. The challenge with cookies is that they might be used to alter the user experience in hard to predict ways. So, website owners will most likely have to opt in or adjust their site to benefit from Private Prefetch Proxy for links with cookies.

Concretely, while the prefetch requests will remain uncredentialed, the web page will gain access to cookies, and other local state, when the user navigates to it. Developers could take advantage of this to add back the personalization and changes based on cookies or local state. Or perhaps, developers might also be interested in declaring certain resources as perfectly fine to prefetch and use as is, without cookies (that is, resources that don't depend on any cookies). Please have a look at the [What's next](#next) section to learn more and inform our plan.

### Geo-dependent content or services

If your website behaves differently (for example, different content, or selective access) across markets based on the user's IP address, you may wonder how to handle Private Prefetch Proxy's prefetch requests. It's important to know that Private Prefetch Proxy is powered by several servers spread across the globe, and that the IP of the proxy will geolocate to the country from which the user initiated a prefetch.

So, with that in mind, here is what we recommend:

1. Identify prefetch requests from Private Prefetch Proxy by the presence of a `Sec-Purpose: Prefetch; anonymous-client-ip` HTTP header.
1. Lookup the geolocation of the Private Prefetch Proxy that issued the request via its IP address. See [this resource](https://www.gstatic.com/chrome/prefetchproxy/prefetch_proxy_geofeed) for an up-to-date list of rolled-out geographies and the corresponding IP addresses.
1. Serve resources in accordance with the market attached to this particular geolocation.

### Traffic control {: #traffic }

From past experiments, we know that this feature typically results in less than 2% extra requests for main resources (for example HTML documents). That said, if you are the cautious kind, you can use the traffic advice's fraction field to control how much Private Prefetch Proxy should let through. You can start with a small fraction such as 0.3 (that is, 30%), and gradually increase it to 1.0 (that is, 100%).

```json
[{
  "user_agent": "prefetch-proxy",
  "google_prefetch_proxy_eap": {
    "fraction": 0.3
  }
}]
```

The `fraction` field gives you control over the prefetch traffic by specifying how much Private Prefetch Proxy should let through. The value is a float between 0.0 (no prefetch at all) and 1.0 (100% of the prefetch requests get through).

For more flexibility (for example, a sudden peak of heavy access), you may want to temporarily reject prefetch requests (`Sec-Purpose: Prefetch; anonymous-client-ip`) with a 503 status code, and by setting the `Cache-control: no-store` header on the response. You may also add the [`Retry-After`](https://tools.ietf.org/html/rfc7231#section-6.6.4) header to tell Chrome how long to wait before retrying prefetch requests.

## For referrer website owners {: #referrers }

If you operate a website with lots of links to other websites, you may be interested in using the Private Prefetch Proxy feature to speed up these cross-origin navigations. You will need to add [speculation rules](https://web.dev/speculative-prerendering/#in-browser-speculation-rules-for-prefetch-and-prerender) to your pages for Chrome to know which page you believe it should prefetch via Private Prefetch Proxy. Here is a simple example:

```html
<script type="speculationrules">
{
  "prefetch": [
    "source": "list",
    "urls": ["https://example.com/index.html"],
    "requires": ["anonymous-client-ip-when-cross-origin"]
  ]
}
</script>
```

{% Aside %}
At this moment, to allow other sites to preload navigations through Google servers, users need to select the "Extended preloading" mode in Chrome's preload settings. We are [looking for interested parties](https://github.com/WICG/nav-speculation/issues/) as a catalyst for further improvements to this initial approach.
{% endAside %}

## What's next? {: #next }

This launch is only a first step. We hope to expand and improve this feature based on the community's interest and [feedback](https://github.com/WICG/nav-speculation/issues/). For instance, we would love feedback on how to expand to links with cookies and local state in a way that minimizes developer friction, or ways to make this feature more useful for referrer websites.

## Read more

- [Prefetch proxy for network administrators](/multidevice/private-prefetch-proxy-for-network-admins).
- [WICG github repository for efforts related to navigation speculation](https://github.com/WICG/nav-speculation/).
- [Chromium blog in which the private prefetch proxy concept was originally introduced](https://blog.chromium.org/2020/12/continuing-our-journey-to-bring-instant.html).