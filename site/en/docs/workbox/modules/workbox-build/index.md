---
layout: 'layouts/doc-post.njk'
title: workbox-build
date: 2018-01-31
updated: 2020-01-17
description: >
  A module that can generate a service worker, inject a precache manifest, or create a local copy the Workbox libraries.
---

The `workbox-build` module integrates into a node-based build process and can generate an entire service worker, or just generate a list of assets to precache that could be used within an existing service worker.

The two modes that most developers will use are `generateSW` and `injectManifest`. The answers to the following questions can help you choose the right mode and configuration to use.

## Which Mode to Use

### `generateSW`

The `generateSW` mode creates a service worker file for you, and writes it out to disk.

#### When to use `generateSW`

- You want to precache files.
- You have simple runtime configuration needs (e.g. the configuration allows you to define routes and strategies).

#### When NOT to use `generateSW`

- You want to use other Service Worker features (i.e. Web Push).
- You want to import additional scripts or add additional logic.

### `injectManifest`

The `injectManifest` mode will generate a list of URLs to precache, and add that precache manifest to an existing service worker file. It will otherwise leave the file as-is.

#### When to use `injectManifest`

- You want more control over your service worker.
- You want to precache files.
- You have more complex needs in terms of routing.
- You would like to use your service worker with other API's (e.g. Web Push).

#### When NOT to use `injectManifest`

- You want the easiest path to adding a service worker to your site.

## `generateSW` Mode

You can use the `generateSW` mode within a node-based build script like so:

```js
// Inside of build.js:
const {generateSW} = require('workbox-build');

const swDest = 'build/sw.js';
generateSW({
  swDest,
  // Other configuration options...
}).then(({count, size}) => {
  console.log(
    `Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`
  );
});
```

This will generate a service worker with precaching setup for all of the files picked up by your configuration.

### Full `generateSW` Config

A full set of configuration options can be found on [this reference page](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW).

## `injectManifest` Mode

You can use the `injectManifest` mode within a node-based build script like so:

```js
// Inside of build.js:
const {injectManifest} = require('workbox-build');

const swSrc = 'src/sw.js';
const swDest = 'build/sw.js';
injectManifest({
  swSrc,
  swDest,
  // Other configuration options...
}).then(({count, size}) => {
  console.log(
    `Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`
  );
});
```

This will create a precache manifest based on the files picked up by your configuration and inject it into your existing service worker file.

### Full `injectManifest` Config

A full set of configuration options can be found on [this reference page](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.injectManifest).

## Additional modes

We expect that `generateSW` or `injectManifest` will suit most developers' needs. However, there is one other mode supported by `workbox-build` that might be appropriate for certain use cases.

### `getManifest` Mode

This is conceptually similar to the `injectManifest` mode, but instead of adding the manifest into the source service worker file, it returns the array of manifest entries, along with information about the number of entries and total size.

You can use the `getManifest` mode within a node-based build script like so:

```js
// Inside of build.js:
const {getManifest} = require('workbox-build');

getManifest({
  // Configuration options...
}).then(({manifestEntries, count, size}) => {
  // Do something with the manifestEntries, and potentially log count and size.
});
```

A full set of configuration options can be found on
[this reference page](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.getManifest).
