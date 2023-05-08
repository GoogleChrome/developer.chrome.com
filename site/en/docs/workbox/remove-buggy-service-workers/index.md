---
layout: "layouts/doc-post.njk"
title: Removing buggy service workers
date: 2021-10-20
description: >
  How to fix a service worker that is causing problems.
---

Sometimes a buggy service worker gets deployed,
and then there are problems.
For example, a service worker may be parsed at registration time and complete installation successfully.
Yet, buggy code in a `fetch` event may cause it to not respond to requests,
resulting in a blank page. Another possibility is that page markup is aggressively cached,
and a service worker only returns stale markup responses from a `Cache` instance for subsequent visits.

There are many ways a service worker can backfire,
and that's a scary problem to have on a production website.
Even so, all is not lost. There are ways to fix the situation and get back on track.

## Deploy a no-op service worker

All it usually takes to deal with a buggy service worker is to deploy a basic
[no-op](https://en.wikipedia.org/wiki/NOP_(code)) service worker that installs and activates immediately without a `fetch` event handler:

```js
// sw.js

self.addEventListener('install', () => {
  // Skip over the "waiting" lifecycle state, to ensure that our
  // new service worker is activated immediately, even if there's
  // another tab open controlled by our older service worker code.
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  // Optional: Get a list of all the current open windows/tabs under
  // our service worker's control, and force them to reload.
  // This can "unbreak" any open windows/tabs as soon as the new
  // service worker activates, rather than users having to manually reload.
  self.clients.matchAll({
    type: 'window'
  }).then(windowClients => {
    windowClients.forEach((windowClient) => {
      windowClient.navigate(windowClient.url);
    });
  });
});
```

{% Aside 'caution' %}
Tip: when deploying a no-op service worker,
be certain that the service worker URL remains unchanged!
Otherwise, the no-op service worker will be active along with the buggy service worker, and problems will persist.
{% endAside %}

This service worker will install and activate immediately by calling
[`self.skipWaiting()`](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting) in the `install` event.
Optionally, additional code can be deployed in the `activate` event to forcibly reload any other open tabs with a `WindowClient` that the service worker is controlling.

It's _very important_ that a no-op service worker contains no `fetch` event handler.
When a service worker doesn't handle requests,
those requests pass through to the browser as if no service worker was present.
Once a no-op service worker is deployed, the buggy service worker can be fixed and deployed as an update later.

This approach works in part because browsers [have strong safeguards against placing service workers in the HTTP cache](/blog/fresher-sw/), and because they perform byte-for-byte checks of a service worker's contents for updates.
These defaults make it possible to deploy a no-op replacement for a buggy service worker to fix the problem quickly.

{% Aside %}
As part of your overall service worker roll out,
it's a good idea to keep a no-op service worker on hand that can be swapped in if needed.
Planning ahead, and ensuring that everyone on your team knows how to handle a no-op service worker deployment,
will avoid any post-deployment scrambling.
{% endAside %}

## Additional measures to take

Deploying a no-op service worker should be sufficient to neutralize a buggy one,
but additional measures can be taken if necessary.

### What if you don't know the old service worker's URL?

Sometimes a previously installed service worker's URL is unknown.
This might be because it is versioned (for example contains a hash in its file name).
In this case it can be a challenge to deploy a no-op service worker that matches the URL of each old service worker that might be registered.
[This goes against best practices](https://web.dev/service-worker-lifecycle/#avoid-url-change),
as developers likely won't remember every hash for every service worker version that was deployed.

Fortunately, a helpful HTTP request header is sent with a request for a service worker script:
[`Service-Worker`](https://w3c.github.io/ServiceWorker/#service-worker-script-request).
On the web server, check for this header and intercept the request to serve a no-op service worker instead.
Accomplishing this feat depends on the web server and backend stack used, so consult the relevant language's documentation on how to do this.

As for future service worker deployments, stick with unversioned asset names (for example, `sw.js`).
This will make things a lot less complicated later on.

### Set a `Clear-Site-Data` header

Some browsers will unregister all service workers for an origin if a
[`Clear-Site-Data` response header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Clear-Site-Data) with a value of `'storage'` is set.
However, there are a couple things to be aware of with this approach:

- Be warned that this will clear _all_ storage for the associated origin. That includes `localStorage`, IndexedDB, `sessionStorage`, and other storage (but not the HTTP cache for the origin).
- [This header is not supported in all browsers](https://caniuse.com/mdn-http_headers_clear-site-data_storage).

Because support for this header isn't total, it can't be relied on alone to fix the problem.
It's therefore best to view `Clear-Site-Data` as a measure to take in addition to deploying a no-op service worker.

## The damage isn't permanent

It can be scary when the user experience is disrupted by a buggy service worker&mdash;especially for large and well-known websites&mdash;but the damage is temporary and reversible!

If it's necessary to deploy a no-op service worker to fix the situation,
take time after the fact to figure out exactly what went wrong.
In the future, ensure that a service worker is handling only the requests it's expected to.
Test frequently in staging, and only deploy updates when confident.
