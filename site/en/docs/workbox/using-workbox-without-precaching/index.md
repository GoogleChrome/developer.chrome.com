---
layout: "layouts/doc-post.njk"
title: Using Workbox without precaching
date: 2021-11-04
description: >
  How to build a service worker in Workbox without workbox-build.
---

So far, this documentation has been big on precaching, often touching on the `generateSW` and `injectManifest` build tools. While there are plenty of good reasons to include precaching logic in your service worker, you don't have to use precaching to use Workbox.

Perhaps your project only needs runtime caching, or maybe you want a cleaner way to integrate service worker APIs, such as [web push](https://web.dev/notifications/). These are cases when you won't want to use Workbox's build tools, and that's what is covered in this article.

## When using a bundler

Bundlers are prominent in the web development landscape, and there's a good chance your project is using one. If this is the case, it's important to know that you don't need to use a bundler plugin (like `workbox-webpack-plugin`) if you aren't precaching anything. You'll be treating your service worker as a separate entry point in your application.

{% Aside 'caution' %}
You'll need to make sure your chosen bundler [supports the static `import` syntax](https://bundlers.tooling.report/importing-modules/). If you're using webpack, Rollup, Parcel, or esbuild, you're good to go!
{% endAside %}

In the root of your project's source directory, you'll create a service worker and use whatever Workbox modules your application requires. Here's an example without precaching, that sets up caching strategies for navigation and image asset requests in separate `Cache` instances instead:

```js
// sw.js
import {NetworkFirst, CacheFirst} from 'workbox-strategies';
import {registerRoute, NavigationRoute, Route} from 'workbox-routing';

const navigationRoute = new NavigationRoute(new NetworkFirst({
  cacheName: 'navigations'
}));

const imageAssetRoute = new Route(({request}) => {
  return request.destination === 'image';
}, new CacheFirst({
  cacheName: 'image-assets'
}));

registerRoute(navigationRoute);
registerRoute(imageAssetRoute);
```

From here, it's a matter of specifying this service worker as an entry point in your bundler of choice. Below are a few examples of how to do that in a few popular bundlers.

### webpack

[webpack](https://webpack.js.org/) accepts entry points in its [`entry` configuration](https://webpack.js.org/configuration/entry-context/#entry). There's a couple things to be aware of when using this approach:

1. To ensure your service worker has the broadest possible scope, you'll want it to be output to the root of your output directory.
2. You don't want the service worker to be versioned, as updates to it will generate new hashes that may result in multiple service workers being deployed on your website.

To satisfy the above conditions, a function can be passed to [`output.filename`](https://webpack.js.org/configuration/output/#outputfilename) which examines if the current entry point being processed is the service worker entry point. Otherwise, versioned files are written to their normal destinations.

```js
// webpack.config.js
import process from 'process';

const isProd = process.env.NODE_ENV === 'production';

export default {
  mode: isProd ? 'production' : 'development',
  context: process.cwd(),
  entry: {
    // Service worker entry point:
    sw: './src/sw.js',
    // Application entry point:
    app: './src/index.js'
  },
  output: {
    filename: ({runtime}) => {
      // Check if the current filename is for the service worker:
      if (runtime === 'sw') {
        // Output a service worker in the root of the dist directory
        // Also, ensure the output file name doesn't have a hash in it
        return '[name].js';
      }

      // Otherwise, output files as normal
      return 'js/[name].[contenthash:8].js';
    },
    path: './dist',
    publicPath: '/',
    clean: true
  }
};
```

{% Aside 'caution' %}
The above webpack configuration assumes you're using a recent version of Node that supports JavaScript modules, and [has `"type": "module"` specified in your `package.json` file](https://nodejs.org/api/packages.html#packages_type). Otherwise, you'll need to use [CommonJS](https://en.wikipedia.org/wiki/CommonJS) semantics.
{% endAside %}

### rollup

[Rollup](https://rollupjs.org/) is a similar situation to webpack, except multiple entry points are specified as separate configuration objects exported in an array:

```js
// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

// Plugins common to both entry points
const plugins = [
  nodeResolve(),
];

export default [
  // Application entry point
  {
    input: './src/index.js',
    output: {
      dir: './dist/js',
      format: 'esm'
    },
    plugins
  },
  // Service worker entry point
  {
    input: './src/sw.js',
    output: {
      file: './dist/sw.js',
      format: 'iife'
    },
    plugins: [
      ...plugins,
      // This @rollup/plugin-replace instance replaces process.env.NODE_ENV
      // statements in the Workbox libraries to match your current environment.
      // This changes whether logging is enabled ('development') or disabled ('production').
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
      })
    ]
  }
];
```

{% Aside 'warning' %}
Unlike webpack, Rollup doesn't have a `mode` configuration option that handles minification. You'll need to install and use [`rollup-plugin-terser`](https://www.npmjs.com/package/rollup-plugin-terser) to achieve this.
{% endAside %}

### esbuild

[esbuild](https://esbuild.github.io/) offers a straightforward command line interface:

```shell
npx esbuild ./src/sw.js --bundle --minify --outfile=./dist/sw.js
```

esbuild will take care of replacing process.env.NODE_ENV with 'development' by default, or 'production' if minification is enabled.

## Without a bundler using `workbox-sw`

Your project may not even use a bundler. `workbox-sw` can load the Workbox runtime for you from a CDN within your service worker and without a build step if you import it with [`importScripts`](https://developer.mozilla.org/docs/Web/API/WorkerGlobalScope/importScripts):

```js
// sw.js

// Imports Workbox from the CDN. Note that "6.2.0" of the URL
// is the version of the Workbox runtime.
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

const navigationRoute = new workbox.routing.NavigationRoute(new workbox.strategies.NetworkFirst({
  cacheName: 'navigations'
}));

const imageAssetRoute = new workbox.routing.Route(({request}) => {
  return request.destination === 'image';
}, new workbox.strategies.CacheFirst({
  cacheName: 'image-assets'
}));

workbox.routing.registerRoute(navigationRoute);
workbox.routing.registerRoute(staticAssetRoute);
```

{% Aside 'caution' %}
Using `workbox-sw` this way is convenient, but it involves a request to a third-party web server, and will load code that might go unused. Whenever possible, rely on a bundler, as bundlers will drop unused parts of the runtime for better loading performance and avoid potentially costly cross-origin requests.
{% endAside %}

If the prospect of loading the Workbox runtime from a CDN doesn't seem great, it is possible to [use `workbox-sw` with local  URLs](/docs/workbox/modules/workbox-sw#using_local_workbox_files_instead_of_cdn).

## Conclusion

Now that you know how to use Workbox without precaching, you're no longer tied to a particular bundler or build tool. This gives you the flexibility to handcraft a service worker using just the bits of Workbox's runtime caching code that you're interested in.
