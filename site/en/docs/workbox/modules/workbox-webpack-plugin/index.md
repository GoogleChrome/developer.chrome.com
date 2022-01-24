---
layout: 'layouts/doc-post.njk'
title: workbox-webpack-plugin
date: 2017-12-15
updated: 2020-02-03
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
- You have simple runtime configuration needs (e.g. the configuration allows you to define routes and strategies).

#### When NOT to use `GenerateSW`

- You want to use other Service Worker features (i.e. Web Push).
- You want to import additional scripts or add additional logic.

### `InjectManifest`

The `InjectManifest` plugin will generate a list of URLs to precache and
add that precache manifest to an existing service worker
file. It will otherwise leave the file as-is.

#### When to use `InjectManifest`

- You want more control over your service worker.
- You want to precache files.
- You have more complex needs in terms of routing.
- You would like to use your service worker with other API's (e.g. Web Push).

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
    new GenerateSW(),
  ],
};
```

This will generate a service worker with precaching setup for all of your
webpack assets.

### Full `GenerateSW` Config

If you want to use any of the configuration options for the `GenerateSW` plugin,
you'd just need to add an `Object` to the plugin's constructor.

For example:

```js
// Inside of webpack.config.js:
const {GenerateSW} = require('workbox-webpack-plugin');

module.exports = {
  // Other webpack config...
  plugins: [
    // Other plugins...
    new GenerateSW({
      option: 'value',
    }),
  ],
};
```

A full set of configuration options can be found on
[this reference page](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW.html#GenerateSW).

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
      swSrc: './src/sw.js',
    }),
  ],
};
```

This will create a precache manifest (a list of webpack assets) and inject it into
your service worker file via `importScripts()`.

### Full `InjectManifest` Config

You can pass the appropriate configuration as properties of an `Object` to the plugin's constructor.

For example:

```js
// Inside of webpack.config.js:
const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
  // Other webpack config...
  plugins: [
    // Other plugins...
    new InjectManifest({
      option: 'value',
    }),
  ],
};
```

A full set of configuration options can be found on
[this reference page](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.InjectManifest#InjectManifest).

## Extra Info

Guidance on using the plugins within the context of a larger webpack build can be found in the
"[Progressive Web Application](https://webpack.js.org/guides/progressive-web-application/)" section
of the webpack documentation.
