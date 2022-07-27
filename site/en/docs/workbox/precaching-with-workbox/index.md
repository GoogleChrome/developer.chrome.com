---
layout: "layouts/doc-post.njk"
title: Precaching with Workbox
date: 2021-11-04
description: >
  Learn how to precache assets in a service worker with Workbox.
---

{% YouTube id='sOq92prx00w' %}

Precaching is one of the most common things you'll do in a service worker, and Workbox offers lots of flexibility in how you can accomplish this important task, regardless of which one of [Workbox's build tools](/docs/workbox/the-ways-of-workbox/) you choose. In this guide, you'll learn how to precache assets using both `generateSW` and `injectManifest`, as well as which of these methods might be the best fit for your project.

## Precaching with `generateSW`

`generateSW` is the easiest way to precache assets in Workbox. The big thing to remember about `generateSW` is that you are not writing your own service worker&mdash;you're asking Workbox to generate one for you. However, you _can_ influence its behavior through a variety of configuration options.

`generateSW` does different things by default depending on which build tool you use. When using `workbox-webpack-plugin`, you don't have to specify any configuration options. By default, the plugin will precache everything webpack includes in its [dependency graph](https://webpack.js.org/concepts/dependency-graph/) and write a service worker named `service-worker.js` to the directory specified by [`output.path`](https://webpack.js.org/configuration/output/#outputpath)

On the other hand, if you use `workbox-build` or `workbox-cli`, only HTML, CSS and JavaScript assets read from the local filesystem will be precached by default. Configuration-wise, you have to specify `swDest` and the `globDirectory` option in the [`generateSW` config](/docs/workbox/reference/workbox-build/#method-generateSW) for precaching to work. Chances are, you'll want to configure additional options affecting your service worker behavior as well, so take a look through the documentation.

{% Aside 'warning' %}
If too many assets in your project are precached with the default settings, use one of the glob options to exclude resources in the `generateSW` configuration. When using `workbox-webpack-plugin`, consult the plugin's [`GenerateSW` documentation](/docs/workbox/reference/workbox-webpack-plugin/#type-GenerateSW) to find out how to prevent unwanted assets from being precached, as its configuration differs from `generateSW`.
{% endAside %}

## Precaching with `injectManifest`

Using `injectManifest` isn't as easy as using `generateSW`, but you're trading off ease of use for greater flexibility. Where `generateSW` handles the entire service worker generation for you, `injectManifest` takes a service worker you write as its source and injects a list of URLs to precache, while leaving the rest of your service worker as-is.

When you use `injectManifest`, you're responsible for wiring up precaching logic. When `injectManifest` examines your input service worker, it looks for a special `self.__WB_MANIFEST` variable and replaces it with the precache manifest. If this variable isn't present, `injectManifest` will throw an error.

{% Aside %}
If you need to change the string `injectManifest` looks for to something different than `self.__WB_MANIFEST`, you can do so by specifying the `injectionPoint` option in its configuration.
{% endAside %}

The list of entries in the precache manifest can be tweaked with additional [configuration options](/docs/workbox/reference/workbox-build/#method-injectManifest).

{% Aside 'caution' %}
Unlike `generateSW`, `injectManifest` won't automatically bundle the Workbox runtime for you! To see how to manage this in use cases that rely on `injectManifest`, check out the side-by-side comparison below.
{% endAside %}

## Side-by-side comparison

Click on each of the tabs below to compare the usage of the `generateSW` and `injectManifest` methods:

<web-tabs>
  <web-tab title="generateSW">



Since `generateSW` generates a service worker, you only need to specify a configuration. Below is an example using `workbox-build`:

```js
// build-sw.js
import {generateSW} from 'workbox-build';

generateSW({
  swDest: './dist/sw.js',
  globDirectory: './dist',
  globPatterns: [
    '**/*.js',
    '**/*.css',
    '**/*.svg'
  ]
});
```

The service worker can then be built on the command line with Node:

```shell
node build-sw.js
```



  </web-tab>
  <web-tab title="injectManifest">



Since `injectManifest` requires a source service worker, a minimally viable example requires a source service worker file. If all that's needed is precaching, that input service worker might look something like this:

```js
import {precacheAndRoute} from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);
```

Note the `self.__WB_MANIFEST` string. This is a placeholder that Workbox replaces with the precache manifest. Below is a valid configuration for this use case:

```js
// build-sw.js
import {injectManifest} from 'workbox-build';

injectManifest({
  swSrc: './src/sw.js',
  swDest: './dist/sw.js',
  globDirectory: './dist',
  globPatterns: [
    '**/*.js',
    '**/*.css',
    '**/*.svg'
  ]
});
```

`injectManifest` is preferable if you have complex requirements, such as advanced routing, custom caching strategies, or other things that aren't covered by the options `generateSW` provides.



  </web-tab>
</web-tabs>

{% Aside 'caution' %}
The above examples assume that you're in a Node environment that natively supports [ES modules](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules) without a build step. In versions of node prior to version 16, you may have to set a flag to enable ES module support, or rely on CommonJS semantics using `module.exports`.
{% endAside %}

# Conclusion

Precaching in Workbox is much simpler than if you had to manage precaching on your own, especially where versioned assets compiled by bundlers are concerned. However, precaching isn't the only thing you'll likely do in a service worker. As you proceed, you'll learn other techniques, such as runtime caching.
