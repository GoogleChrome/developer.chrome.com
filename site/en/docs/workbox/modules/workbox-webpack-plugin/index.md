---
layout: 'layouts/doc-post.njk'
title: workbox-webpack-plugin
date: 2017-12-15
updated: 2022-03-03
description: >
  Generate a service worker or inject a precache manifest, using the webpack build tool.
---

Workbox provides two [webpack](https://webpack.js.org/) plugins: one that
generates a complete service worker for you and one that generates a list
of assets to precache that is injected into a service worker file.

The plugins are implemented as two classes in the `workbox-webpack-plugin` module, named
`GenerateSW` and `InjectManifest`. The answers to the following questions can help you choose the
right plugin and configuration to use.

## Which Plugin to Use

### `GenerateSW`

The `GenerateSW` plugin will create a service worker file for you and
add it to the webpack asset pipeline.

#### When to use `GenerateSW`

- You want to precache files.
- You have simple runtime caching needs.

#### When NOT to use `GenerateSW`

- You want to use other Service Worker features (i.e. [Web Push](https://developer.mozilla.org/docs/Web/API/Push_API)).
- You want to import additional scripts, or add additional logic for custom caching strategies.

### `InjectManifest`

The `InjectManifest` plugin will generate a list of URLs to precache and
add that precache manifest to an existing service worker
file. It will otherwise leave the file as-is.

#### When to use `InjectManifest`

- You want more control over your service worker.
- You want to precache files.
- You need to customize routing and strategies.
- You would like to use your service worker with other platform features (e.g. [Web Push](https://developer.mozilla.org/docs/Web/API/Push_API)).

#### When NOT to use `InjectManifest`

- You want the easiest path to adding a service worker to your site.

## GenerateSW Plugin

You can add the `GenerateSW` plugin to your webpack config like so:

```js
// Inside of webpack.config.js:
const {GenerateSW} = require('workbox-webpack-plugin');

module.exports = {
  // Other webpack config...
  plugins: [
    // Other plugins...
    new GenerateSW({
      // These are some common options, and not all are required.
      // Consult the docs for more info.
      exclude: [/.../, '...'],
      maximumFileSizeToCacheInBytes: ...,
      navigateFallback: '...',
      runtimeCaching: [{
        // Routing via a matchCallback function:
        urlPattern: ({request, url}) => ...,
        handler: '...',
        options: {
          cacheName: '...',
          expiration: {
            maxEntries: ...,
          },
        },
      }, {
        // Routing via a RegExp:
        urlPattern: new RegExp('...'),
        handler: '...',
        options: {
          cacheName: '...',
          plugins: [..., ...],
        },
      }],
      skipWaiting: ...,
    }),
  ],
};
```

This will generate a service worker with precaching setup for all of the webpack assets picked up by your configuration, and the runtime caching rules provided.

A full set of configuration options can be found [in the reference documentation](/docs/workbox/reference/workbox-build/#type-WebpackGenerateSWOptions).

## `InjectManifest` Plugin

You can add the `InjectManifest` plugin to your webpack config like so:

```js
// Inside of webpack.config.js:
const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
  // Other webpack config...
  plugins: [
    // Other plugins...
    new InjectManifest({
      // These are some common options, and not all are required.
      // Consult the docs for more info.
      exclude: [/.../, '...'],
      maximumFileSizeToCacheInBytes: ...,
      swSrc: '...',
    }),
  ],
};
```

This will create a precache manifest based on the webpack assets picked up by your configuration and inject it into your bundled and compiled service worker file.

A full set of configuration options can be found [in the reference documentation](/docs/workbox/reference/workbox-build/#type-WebpackInjectManifestOptions).

## Extra Info

Guidance on using the plugins within the context of a larger webpack build can be found in the
"[Progressive Web Application](https://webpack.js.org/guides/progressive-web-application/)" section
of the webpack documentation.
