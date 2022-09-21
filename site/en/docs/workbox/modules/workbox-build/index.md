---
layout: 'layouts/doc-post.njk'
title: workbox-build
date: 2018-01-31
updated: 2022-03-13
description: >
  A module that can generate a service worker, inject a precache manifest into existing code, or create a precache manifest.
---

The `workbox-build` module integrates into a node-based build process and can generate an entire service worker, or just generate a list of assets to precache that could be used within an existing service worker.

The two modes that most developers will use are `generateSW` and `injectManifest`. The answers to the following questions can help you choose the right mode and configuration to use.

## Which Mode to Use

### `generateSW`

The `generateSW` mode creates a service worker file for you, customized via configuration options, and writes it out to disk.

#### When to use `generateSW`

- You want to precache files.
- You have simple runtime caching needs.

#### When NOT to use `generateSW`

- You want to use other Service Worker features (i.e. [Web Push](https://developer.mozilla.org/docs/Web/API/Push_API)).
- You want to import additional scripts, or add additional logic for custom caching strategies.

### `injectManifest`

The `injectManifest` mode will generate a list of URLs to precache, and add that precache manifest to an existing service worker file. It will otherwise leave the file as-is.

#### When to use `injectManifest`

- You want more control over your service worker.
- You want to precache files.
- You need to customize routing and strategies.
- You would like to use your service worker with other platform features (e.g. [Web Push](https://developer.mozilla.org/docs/Web/API/Push_API)).

#### When NOT to use `injectManifest`

- You want the easiest path to adding a service worker to your site.

## `generateSW` Mode

You can use the `generateSW` mode within a node-based build script, using the most common [configuration options](/docs/workbox/reference/workbox-build/#type-GenerateSWOptions), like so:

```js
// Inside of build.js:
const {generateSW} = require('workbox-build');

// These are some common options, and not all are required.
// Consult the docs for more info.
generateSW({
  dontCacheBustURLsMatching: [new RegExp('...')],
  globDirectory: '...',
  globPatterns: ['...', '...'],
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
  swDest: '...',
}).then(({count, size, warnings}) => {
  if (warnings.length > 0) {
    console.warn(
      'Warnings encountered while generating a service worker:',
      warnings.join('\n')
    );
  }

  console.log(`Generated a service worker, which will precache ${count} files, totaling ${size} bytes.`);
});
```

This will generate a service worker with precaching setup for all of the files picked up by your configuration, and the runtime caching rules provided.

A full set of configuration options can be found [in the reference documentation](/docs/workbox/reference/workbox-build/#type-GenerateSWOptions).

## `injectManifest` Mode

You can use the `injectManifest` mode within a node-based build script, using the most common [configuration options](/docs/workbox/reference/workbox-build/#type-InjectManifestOptions), like so:

```js
// Inside of build.js:
const {injectManifest} = require('workbox-build');

// These are some common options, and not all are required.
// Consult the docs for more info.
injectManifest({
  dontCacheBustURLsMatching: [new RegExp('...')],
  globDirectory: '...',
  globPatterns: ['...', '...'],
  maximumFileSizeToCacheInBytes: ...,
  swDest: '...',
  swSrc: '...',
}).then(({count, size, warnings}) => {
  if (warnings.length > 0) {
    console.warn(
      'Warnings encountered while injecting the manifest:',
      warnings.join('\n')
    );
  }

  console.log(`Injected a manifest which will precache ${count} files, totaling ${size} bytes.`);
});
```

This will create a precache manifest based on the files picked up by your configuration and inject it into your existing service worker file.

A full set of configuration options can be found [in the reference documentation](/docs/workbox/reference/workbox-build/#type-InjectManifestOptions).

## Additional modes

We expect that `generateSW` or `injectManifest` will suit most developers' needs. However, there is one other mode supported by `workbox-build` that might be appropriate for certain use cases.

### `getManifest` Mode

This is conceptually similar to the `injectManifest` mode, but instead of adding the manifest into the source service worker file, it returns the array of manifest entries, along with information about the number of entries and total size.

You can use the `injectManifest` mode within a node-based build script, using the most common [configuration options](/docs/workbox/reference/workbox-build/#type-GetManifestOptions), like so:

```js
// Inside of build.js:
const {getManifest} = require('workbox-build');

// These are some common options, and not all are required.
// Consult the docs for more info.
getManifest({
  dontCacheBustURLsMatching: [new RegExp('...')],
  globDirectory: '...',
  globPatterns: ['...', '...'],
  maximumFileSizeToCacheInBytes: ...,
}).then(({manifestEntries, count, size, warnings}) => {
  if (warnings.length > 0) {
    console.warn(
      'Warnings encountered while getting the manifest:',
      warnings.join('\n')
    );
  }

  // Do something with the manifestEntries, and potentially log count and size.
});
```

A full set of configuration options can be found [in the reference documentation](/docs/workbox/reference/workbox-build/#type-GetManifestOptions).
