---
layout: "layouts/doc-post.njk"
title: Using workbox-window
date: 2021-12-07
description: >
  Sometimes users go offline. Learn how to adapt, and help them resume requests when they eventually go back online. 
---

One Workbox module that hasn't gotten much coverage yet in this documentation is [`workbox-window`](/docs/workbox/reference/workbox-window/), which is a set of modules intended to run in the [`window`](https://developer.mozilla.org/docs/Web/API/Window). The goals of this module are:

- To simplify service worker registration and updates by helping developers identify critical moments of the [service worker lifecycle](/docs/workbox/service-worker-lifecycle/), making it easier to respond in those moments.
- To prevent developers from making common mistakes, such as registering a service worker in the wrong scope.
- To simplify messaging between the `window` and the [service worker scope](#communicating-between-the-window-and-the-service-worker-scope).

## Importing and using `workbox-window`

The export you'll use most often from `workbox-window` is the `Workbox` class, which you can either import in Node, or from the CDN in a webpage.

### Creating a local bundle

If your toolchain includes a bundler like [webpack](https://webpack.js.org/) or [Rollup](https://rollupjs.org/), you can bundle `workbox-window` locally.

{% Aside %}
Using a bundler is the recommended approach for using `workbox-window`, as bundlers can remove unused portions of code through tree-shaking.
{% endAside %}

First, install `workbox-window` as a production dependency of your application:

```shell
npm install workbox-window --save
```

Then, in your application JavaScript, you can `import` the `Workbox` class from `workbox-window`:

```html
<script type="module">
import {Workbox} from 'workbox-window';

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');

  wb.register();
}
</script>  
```

Though `workbox-window` is quite small, you _could_ split it from your website's core application logic using [dynamic `import`](https://web.dev/reduce-javascript-payloads-with-code-splitting/), which can reduce the size of your page's main bundle:

```html
<script type="module">
if ('serviceWorker' in navigator) {
  const {Workbox} = await import('workbox-window');

  const wb = new Workbox('/sw.js');
  wb.register();
}
</script>  
```

### Using the CDN

While not the recommended approach, an easier way to use `workbox-window` is to import it from a CDN:

```html
<script type="module">
  import {Workbox} from 'https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-window.prod.mjs';

  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js');

    wb.register();
  }
</script>
```

You'll note that the [`<script>` element](https://developer.mozilla.org/docs/Web/HTML/Element/script) in the above example uses the `type="module"` attribute. This is required if you want to use static `import` statements in the browser without a build step. All major browsers that support service workers also support JavaScript modules, so it's fine to serve this code to any browser, as older browsers will ignore `<script>` elements with a `type` attribute value of `"module"`.

## Registering a service worker

Registering a service worker with `workbox-window` is done with the `Workbox` class's `register` method like so:

```js
import {Workbox} from 'workbox-window';

const wb = new Workbox('/sw.js');
wb.register();
```

It may seem that this is the same as registering a service worker yourself using [`navigator.serviceWorker.register`](https://developer.mozilla.org/docs/Web/API/ServiceWorkerContainer/register). However,  `Workbox.register` takes care of waiting until the [`window` `load`](https://developer.mozilla.org/docs/Web/API/Window/load_event) event before registering the service worker. This is desirable in situations where precaching is involved so bandwidth contention that may delay page startup can be avoided.

{% Aside %}
The `Workbox` class offers numerous other convenience methods that make working with the service worker API easier. For more information, check out [the reference documentation](/docs/workbox/reference/workbox-window/).
{% endAside %}

## Communicating between the `window` and the service worker scope

Service workers have their own scope separate from the `window`, and have access to only a subset of the APIs available in the `window`. However, it's possible to communicate between the `window` and the service worker. `workbox-window` allows easier communication between the two scopes with `workbox-window` module's `messageSW` method.

Workbox uses a specific format for messages is an object with the following properties:

- `type` is a required unique string identifying the message. The format should be in uppercase with underscores separating words (for example, `CACHE_URLS`).
- `meta` is an optional string representing the name of the Workbox package sending the message, and is usually omitted.
- `payload` is an optional parameter representing the data you want to send. It can be any data type.

Below is an example of how `messageSW` works, starting with the code in your service worker:

```js
// sw.js
const SW_VERSION = '1.0.0';

self.addEventListener('message', (event) => {
  if (event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage(SW_VERSION);
  }
});
```

And then the following code in your webpage:

```js
const wb = new Workbox('/sw.js');
wb.register();

const swVersion = await wb.messageSW({type: 'GET_VERSION'});
console.log('Service Worker version:', swVersion);
```

There are many instances in which communicating between a service worker and the `window` can be useful, such as [notifying the user when a service worker update is available](/docs/workbox/handling-service-worker-updates/). That recipe relies on a special helper method for `self.skipWaiting` called `messageSkipWaiting`, which sends a message with a `type` value of `SKIP_WAITING`.
