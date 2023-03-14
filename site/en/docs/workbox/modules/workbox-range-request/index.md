---
layout: 'layouts/doc-post.njk'
title: workbox-range-requests
date: 2017-11-27
updated: 2020-05-01
description: >
  This modules provides support for responding to a `Range:` request using a slice of previously cached data.
---

When making a request, a `range` header can be set that tells
the server to return only a portion of the full request. This
is useful for certain files like a video file, where a user
might change where to play the video.

## What does this module do?

There may be scenarios where you want to serve a cached file
but the browser has set a `range` header. Normally the header
would be ignored.

This module will read the cached response and return the
specified range of data.

## Basic Usage

You can use Workbox Range Requests by adding the plugin to the
strategy you want to check for range requests against.

```js
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';
import {RangeRequestsPlugin} from 'workbox-range-requests';

registerRoute(
  ({url}) => url.pathname.endsWith('.mp4'),
  new CacheFirst({
    plugins: [
      new RangeRequestsPlugin(),
    ],
  });
);
```

{% Aside %}
There are some additional considerations to take into account when serving
cached media content. Read more in the
["Serve cached audio and video" recipe](/docs/workbox/serving-cached-audio-and-video)
{% endAside %}

## Advanced Usage

If you want to make use of this logic outside of the Plugin you
can use the `createPartialResponse()` function.

```js
import {createPartialResponse} from 'workbox-range-requests';

createPartialResponse(request, cachedResponse);
```

For more info [see the reference docs](/docs/workbox/reference/workbox-range-requests).
