---
layout: "layouts/doc-post.njk"
title: Access caches from the window
date: 2021-12-07
description: >
  Accessing Cache instances isn't just restricted to the service worker scope. You can also access them from the window context, and in this article, you'll learn how.
---

With all of this work we've been doing outside of the `window`, you might think that [`Cache` instances](https://developer.mozilla.org/docs/Web/API/Cache) can only be accessed in the service worker scope. The fact is that you can access `Cache` instances in _both_ the service worker scope _and_ in your web app's traditional code, running  in the `window`. This makes it easier for the user to directly interact with a service worker cache, or update the user interface based on cache state.

One potential use case is to offer a "save for offline" feature for pages the user may want to read later, but know they may be offline at that time. The Glitch embed below shows how to do this with Workbox.

{% Glitch {
  id: 'save-for-offline-test',
  path: 'index.html'
} %}

In the above embed, you can see that the `app.js` script writes to the offline cache from the `window` context when the "save for offline" button is clicked. In the service worker, the page's static assets are precached for offline access. A [`NetworkOnly` strategy](/docs/workbox/reference/workbox-strategies/#type-NetworkOnly) is used with a special handler that manages offline access for cached pages, and is passed to a [`NavigationRoute`](/docs/workbox/reference/workbox-routing/#type-NavigationRoute).

To test the functionality in the Glitch embed, do the following:

1. Open a new browser window and navigate to https://save-for-offline-test.glitch.me/
2. Click the button that reads **Add to offline reading list**.
3. Open your browser's developer tools in either Firefox or Chrome. If you're using Chrome, go to the application panel. In Firefox, go to the storage panel.
4. In either browser's developer tools, you'll see a **Cache Storage** item in the left-hand pane. Click to expand it. In the **offline-cache** entry, you should see the page URL you just added in the right-hand pane.
5. Click on any other page link at the bottom of the page.
6. Toggle offline mode in either browser to simulate an offline connection.
7. Click on the link for the page you added to the offline cache. It should appear even though you're offline.
8. Click on a link for a page you didn't add to the offline cache. The request will fail.

{% Aside 'caution' %}
It's been said before in this documentation, but it bears repeating in this context: [be mindful of storage quotas](/docs/workbox/caching-resources-during-runtime/#setting-an-expiry-for-cache-entries). When users have direct control over what's put in a cache, you may want to enforce a maximum age or number of entries in your service worker cache(s).
{% endAside %}

This isn't the only use case for working with `Cache` instances in the `window`. For example, you could predictively prefetch and cache assets you know the user will need to perform a specific action. This would reduce or avoid the latency of downloading those assets on demand.

There are other potentially beneficial use cases&mdash;and, since you can interact with `Cache` instances in the absence of a service worker, not all of them may require one to be installed.
