---
layout: "layouts/doc-post.njk"
title: Serving cached audio and video
date: 2021-12-07
description: >
  Dealing with audio and video resource requests in a service worker is hard. Learn how to use workbox-range-request to deal with such requests in a predictable way.
---

There are some wrinkles in how some browsers handle requests for media assets&mdash;that is, the URL specified in the `src` attribute of `<video>` and `<audio>` elements&mdash;which can lead to incorrect serving behavior unless you take specific steps when configuring Workbox.

## The problem

The intricacies of the problem browsers have around serving audio and video assets are explained in detail in [this GitHub issue discussion](https://github.com/GoogleChrome/workbox/issues/1663#issuecomment-448755945). The full picture is complicated, but the key points are:

- Workbox must be told to respect [`Range` request headers](https://developer.mozilla.org/docs/Web/HTTP/Range_requests) by using the [`workbox-range-requests` module](/docs/workbox/modules/workbox-range-request/) to the strategy used as the handler.
- `<video>` or `<audio>` elements need to opt into CORS mode with the [`crossorigin` attribute](https://developer.mozilla.org/docs/Web/HTML/Attributes/crossorigin).
- If you want to serve media from the cache, you should explicitly add it to the cache ahead of time. You can do this by precaching, or with [`cache.add()`](https://developer.mozilla.org/docs/Web/API/Cache/add), or by using the warmStrategyCache method in workbox-recipes. Caching the media asset as it's streamed at runtime won't work, as only partial content is fetched from the network during playback.

Here's how to accommodate these requirements in Workbox, starting with the proper markup for a media asset:

```html
<!-- In your page: -->

<!-- You need to set `crossorigin`, even for same-origin URLs! -->
<video src="movie.mp4" crossorigin="anonymous"></video>
<audio src="song.mp3" crossorigin="anonymous"></audio>
```

Then in your service worker, use the `workbox-range-request` plugin to handle the media assets accordingly:

```javascript
// sw.js
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {RangeRequestsPlugin} from 'workbox-range-requests';

// In your service worker:
// It's up to you to either precache, use warmRuntimeCache, or
// explicitly call cache.add() to populate the cache with media assets.
// If you choose to cache media assets up front, do so with care,
// as they can be quite large and exceed storage quotas.
//
// This route will go to the network if there isn't a cache match,
// but it won't populate the cache at runtime because the response for
// the media asset will be a partial 206 response. If there is a cache
// match, then it will properly serve partial responses.
registerRoute(
  ({request}) => {
    const {destination} = request;

    return destination === 'video' || destination === 'audio'
  },
  new CacheFirst({
    cacheName: 'your-cache-name-here',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200]
      }),
      new RangeRequestsPlugin(),
    ],
  }),
);
```

With this approach, you can ensure that your website's media assets are properly fetched and cached by your service worker, while taking range requests and other potential pitfalls related to media requests into account.
