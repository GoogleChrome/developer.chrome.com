---
layout: "layouts/doc-post.njk"
title: Troubleshooting and logging
date: 2021-11-05
description: >
  A look at Workbox's logging features, and in-browser service worker debugging tools.
---

Debugging a service worker is tough. You're dealing with the lifecycle, updates, caches, and the interaction between all of these things. Fortunately, just as Workbox makes service worker development easier, it also makes debugging easier through its informative logging. This page will touch on some of the available debugging tools, and how Workbox's logging works and how it can be configured.

## Available troubleshooting tools

There are loads of tools available in the browser for debugging and troubleshooting while developing a service worker. Here's a few resources to get you started with your browser of choice.

### Chrome and Edge

Chrome (and [recent versions of Edge based on the Blink engine](https://en.wikipedia.org/wiki/Microsoft_Edge#Anaheim_(2019%E2%80%93present))) have a robust set of developer tools. Some of those tools&mdash;specifically in Chrome's DevTools&mdash;were [touched upon earlier in this documentation](/docs/workbox/improving-development-experience/), but there's more to discover:

- [Debug Progressive Web Apps](/docs/devtools/progressive-web-apps/)
- [Inspect Network Activity in Chrome DevTools](/docs/devtools/network/)
- Video: [Debugging Service Workers in Chrome](https://www.youtube.com/watch?v=tuRPSaSiK_c)
- Codelab: [Debugging Service Workers](https://codelabs.developers.google.com/codelabs/debugging-service-workers/index.html)

### Firefox

Firefox users can refer to the following resources:

- [Debugging service workers using the Firefox Devtools Application Panel](https://developer.mozilla.org/docs/Tools/Application/Service_workers)
- Video: [Debugging Service Workers in Firefox](https://www.youtube.com/watch?v=ranU2qe1JVA)

### Safari

Safari currently has a more limited set of developer tools for debugging service workers. You can learn more about them with these resources:

- [Workers at Your Service](https://webkit.org/blog/8090/workers-at-your-service/#post-8090:%7E:text=Web%20Inspector%20supports%20debugging%20service%20workers.)
- Video: [Debugging Service Workers in Safari](https://www.youtube.com/watch?v=87RU7v6Y-bk).

## Workbox logging

A key developer experience improvement that Workbox offers is in its informative logging. When logging is enabled, Workbox logs nearly all of its activity in a distinctive and functional way.

{% Img src="image/jL3OLOhcWUQDnR4XjewLBx4e3PC3/I2eDOSejbO70fDtbTxrK.png", alt="A screenshot of Workbox logging messages in the console of Chrome's DevTools. The logging messages are distinguished from normal console logs with a Workbox badge. Each message can be expanded to get further debugging information.", width="800", height="259" %}

Development builds of Workbox turn logging on by default, whereas production builds turn it off. There are different steps for switching between the development and production builds, depending on whether you're creating a custom Workbox bundle, or using a pre-bundled copy via `workbox-sw`.

### With or without a bundler

Bundlers are tools that take code from individual modules and create JavaScript output that's ready to run in the browser. When using a bundler, you might also use a bundler-specific Workbox plugin that helps with precaching, like [`workbox-webpack-plugin`](/docs/workbox/modules/workbox-webpack-plugin), or you might just be bundling up Workbox runtime caching logic. Either way, Workbox's logging is influenced by setting a production mode in the bundler's configuration:

- In webpack, the [`mode` configuration option](https://webpack.js.org/configuration/mode/) can be set to `'production'` or `'development'`. `workbox-webpack-plugin` will use the production or development logging in Workbox based on this value.
- For Rollup, [`rollup-plugin-workbox`](https://www.npmjs.com/package/rollup-plugin-workbox) accepts a `mode` configuration option that also affects whether Workbox logs anything to the console. If you're using Rollup without the Workbox-specific plugin, you'll need to configure [`@rollup/plugin-replace`](https://www.npmjs.com/package/@rollup/plugin-replace) to substitute `process.env.NODE_ENV` with `'development'` or `'production'`.

Suppose the default logging behavior must be overridden in development. In that case, the appropriate Workbox plugin for your bundler should allow you to hardcode a preference for debugging logs in its configuration. For example, you could disable logging in Workbox via `workbox-webpack-plugin`'s `mode` option for the [`GenerateSW` method](/docs/workbox/reference/workbox-webpack-plugin/#type-GenerateSW).

### Without a bundler

While bundlers are great, not every project needs them. If you find yourself in a situation where you want to add Workbox to a project that doesn't use a bundler, [`workbox-sw`](/docs/workbox/modules/workbox-sw) is the way to go.

The `workbox-sw` module simplifies loading other Workbox modules (e.g., `workbox-routing`, `workbox-precaching`, etc) from a CDN. Whether it loads the development or production bundles depends on the URL used to access your web app. By default, `workbox-sw` loads the development version of Workbox if your web app is running on `http://localhost`, and the production version at all other times.

You can override the default behavior by calling Workbox's `setConfig` method to set the `debug` option to `true`:

```js
// Load workbox-sw from a CDN
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

// This must come before any other workbox.* methods.
workbox.setConfig({
  debug: true
});

// Now use workbox.routing.*, workbox.precaching.*, etc.
```

### Turn off logging in development builds in any workflow

Whether you use a bundler or not, you can turn off all logging in development builds by assigning `true` to a special `self.__WB_DISABLE_DEV_LOGS` variable into your service worker:

```js
//
self.__WB_DISABLE_DEV_LOGS = true;

// The rest of your Workbox service worker code goes here
```

One advantage of this approach is that it's completely independent of your bundler configuration, and will work whether you use `workbox-sw` directly, or depend on a bundler to package up your Workbox-powered service worker for you.

## Further information

If you're still struggling to figure out what's going on in a buggy service worker and the logging just isn't enough, try posting a question to [Stack Overflow with the `workbox` tag](https://stackoverflow.com/questions/ask?tags=workbox). If you can't find an answer there, [file a GitHub issue](https://github.com/GoogleChrome/workbox/issues) (after reading [the contributing guidelines](https://github.com/GoogleChrome/workbox/blob/v6/CONTRIBUTING.md)). This not only allows a wide audience of developers to read and answer your questions, but the answer to your question may help someone in the same situation later on.
