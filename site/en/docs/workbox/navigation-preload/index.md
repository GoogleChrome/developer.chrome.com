---
layout: "layouts/doc-post.njk"
title: Navigation Preload for Network-first HTML
date: 2021-11-04
description: >
  What Navigation Preload is, how it can make navigations faster, and how to use it in Workbox.
---

{% YouTube id='25aCD5XL1Jk' %}

When a service worker handles `fetch` events, the browser waits for the service worker to provide a response. While the latency of the network request is a big part of the wait, the browser may also have to wait for the service worker to boot up and fire `fetch` event callbacks.

Bootup time varies based on the device and its capabilities, but the time involved can be substantial, sometimes up to a half a second when a CPU is slow, or is working in a throttled state due to ambient conditions. The performance gain of avoiding the network is likely to outweigh this startup time when your navigation responses are served from a `Cache` instance. For navigation requests that go to the network, introducing a service worker can create a perceptible delay.

## Enter navigation preload

Navigation preload is a service worker feature that solves the delay caused by service worker bootup time. Without navigation preload enabled, both the service worker's bootup and the navigation request it handles will occur consecutively:

{% Img src="image/jL3OLOhcWUQDnR4XjewLBx4e3PC3/CTNErfdUeDyTeYUvT5tF.png", alt="A yellow and blue bar, with two segments showing consecutive actions. The first segment, in yellow, reads 'SW boot' and a blue segment reading 'Navigation request'.", width="800", height="68" %}

This isn't ideal, but you can fix it by enabling navigation preload, which ensures that service worker bootup and the navigation request occurs concurrently:

{% Img src="image/jL3OLOhcWUQDnR4XjewLBx4e3PC3/dmuAkLpqiB8AkvIgcRm2.png", alt="Two bars stacked upon one another and left-aligned, representing two concurrent actions. The yellow bar is labeled 'SW boot', and the blue one is labeled 'Navigation request'.", width="800", height="171" %}

While navigation preload is a great performance optimization for sites that use service workers, it's not a feature you should enable in all situations. In particular, sites that use a precached app shell don't need navigation preload, as the cache serves the navigation request for the app shell markup without any navigation latency. In these cases, the preloaded response will go to waste, which isn't great.

The best time to use navigation preload is when a website can't precache HTML. Think of websites where markup responses are dynamic and vary with stuff like authentication state. Navigation requests for these may use a network-first (or even a network-only) strategy, and that's where navigation preload can make a big difference.

## Using navigation preload in Workbox

Using navigation preload directly in a service worker not powered by Workbox is tricky. First, [it's not supported in all browsers](https://caniuse.com/mdn-api_navigationpreloadmanager). Secondly, it can be difficult to get right. You can learn how to use it directly in [this great explainer by Jake Archibald](https://web.dev/navigation-preload/).

Workbox simplifies using navigation preload, because the `workbox-navigation-preload` module's [`enable` method](/docs/workbox/reference/workbox-navigation-preload/#method-enable) does the necessary feature support checks, as well as creating the `activate` event listener to enable it for you.

From here, the benefits of navigation preload are realized in supporting browsers by using Workbox to handle navigation requests using a network-first strategy handler:

```js
import * as navigationPreload from 'workbox-navigation-preload';
import {NetworkFirst, StaleWhileRevalidate} from 'workbox-strategies';
import {registerRoute, NavigationRoute, Route} from 'workbox-routing';
import {precacheAndRoute} from 'workbox-precaching';

// Precache the manifest
precacheAndRoute(self.__WB_MANIFEST);

// Enable navigation preload
navigationPreload.enable();

// Create a new navigation route that uses the Network-first, falling back to
// cache strategy for navigation requests with its own cache. This route will be
// handled by navigation preload. The NetworkOnly strategy will work as well.
const navigationRoute = new NavigationRoute(new NetworkFirst({
  cacheName: 'navigations'
}));

// Register the navigation route
registerRoute(navigationRoute);

// Create a route for image, script, or style requests that use a
// stale-while-revalidate strategy. This route will be unaffected
// by navigation preload.
const staticAssetsRoute = new Route(({request}) => {
  return ['image', 'script', 'style'].includes(request.destination);
}, new StaleWhileRevalidate({
  cacheName: 'static-assets'
}));

// Register the route handling static assets
registerRoute(staticAssetsRoute);
```

When navigation preload is enabled, Workbox will respond to navigation requests that use the `NetworkFirst` or `NetworkOnly` strategies with the preloaded response.

{% Aside 'warning' %}
If you don't register a route to handle the preloaded response using a network-first (or even a network only) strategy, the preloaded response will go unused.
{% endAside %}

## How can I tell if navigation preload is working?

In [development builds](/docs/workbox/troubleshooting-and-logging/), Workbox logs a _lot_ about what it does. If you want to check if navigation preload is working in Workbox, open the console in a supporting browser during a navigation request and you'll see a log message saying as much:

{% Img src="image/jL3OLOhcWUQDnR4XjewLBx4e3PC3/1TbMFuUG7c1OZp4zAOJH.png", alt="A screenshot of Workbox logs in the console of Chrome's DevTools. The messages read, from top to bottom: 'Router is responding to /', 'Using a preloaded navigation request for /', and 'Using NetworkFirst to respond to /'", width="800", height="89" %}

This logging won't be visible in production builds by default, so you won't see this when you deploy your service worker to production, but it's a great way to verify that navigation preload is working (among other things).

## Customizing preloaded responses

When using navigation preload, there may be scenarios where it's necessary to customize preloaded responses in an application backend. Service workers [that stream partial content from the network](https://alistapart.com/article/now-thats-what-i-call-service-worker/#section6) is one scenario where this might be handy.

In cases like these, it pays to know that preload requests are sent with a `Service-Worker-Navigation-Preload` header set with a default value of `true`:

```http
Service-Worker-Navigation-Preload: true
```

Then, in your application backend of choice, you can check for this header and modify the response to suit your needs. If the header's default value is problematic for any reason, [you can change it in the window context](https://web.dev/navigation-preload/#changing-the-header). Just know that any work you do on the server to read this header is up to you, and outside the scope of Workbox.

## Conclusion

Navigation preload is hard to get right when used directly, but that hard work is worth it to ensure that a service worker doesn't hold the browser up from making navigation requests. Thanks to Workbox, you can benefit from navigation preload with a lot less work. To get more details on the `workbox-navigation-preload` module, [check out its reference documentation](/docs/workbox/reference/workbox-navigation-preload/).
