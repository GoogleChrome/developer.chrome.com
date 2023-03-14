---
layout: "layouts/doc-post.njk"
title: The ways of Workbox
date: 2021-11-04
description: >
  Get familiar with some of the ways you can use Workbox.
---

Workbox is flexible enough to accommodate just about any project's build process. This means there's more than one way to use Workbox, allowing you to choose the right integration for your project. Regardless of how you integrate with Workbox, the various tools offer a similar API.

## `generateSW` vs `injectManifest`

You'll rely on one of two core methods of Workbox's build tools: `generateSW` or `injectManifest`. Which one you should use depends on how much flexibility you need. `generateSW` prioritizes ease of use and simplicity at the cost of flexibility, allowing you to declare a set of configuration options and giving you a fully functional service worker in return.

`injectManifest` favors greater flexibility at the cost of some simplicity, since you'll end up writing the code for your service worker yourself, with `injectManifest` providing a precache manifest that can be used by Workbox's precaching methods.

### When to use `generateSW`

You should use `generateSW` if:

- You want to precache files associated with your build process, including files whose URLs contain hashes that you might not know ahead of time.
- You have simple runtime caching needs that can be configured via [`generateSW`'s options](/docs/workbox/reference/workbox-build/#method-generateSW).

### When _not_ to use `generateSW`

On the other hand, you should _not_ use `generateSW` if:

- You want to use other service worker features (such as [Web Push](https://web.dev/push-notifications-overview/)).
- You need additional flexibility to import additional scripts or use specific Workbox modules to fine-tune your service worker to your application's needs.

### When to use `injectManifest`

You should use `injectManifest` if:

- You want to precache files, but want to write your own service worker.
- You have complex caching or routing needs that can't be expressed via `generateSW`'s configuration options
- You would like to use other APIs in your service worker (such as Web Push).

`injectManifest` differs from `generateSW` in that it requires you to specify a source service worker file. In this workflow, the source service worker file needs to have a special `self.__WB_MANIFEST` string in it so that `injectManifest` can [replace it with the precache manifest](/docs/workbox/precaching-with-workbox/).

### When _not_ to use `injectManifest`

You shouldn't use `injectManifest` if:

- You don't want to use precaching in your service worker.
- our service worker requirements are simple enough to be covered by what `generateSW` and its configuration options can provide.
- You prioritize ease of use over flexibility.

## Using Workbox's Build Tools

If you're looking for a framework-agnostic way to use Workbox in your build process, you have three options:

1. [`workbox-cli`](/docs/workbox/modules/workbox-cli)
2. [`workbox-build`](/docs/workbox/modules/workbox-build).
command line tool.
3. Using a bundler (e.g., [`workbox-webpack-plugin`](/docs/workbox/modules/workbox-webpack-plugin)).

Each of these build tools offers both the `generateSW` and `injectManifest` modes, with a similar set of options. These are all fine choices when you don't want to tie your Workbox-powered service worker to a particular framework. In order to know which of these options is the best fit, let's take a quick look at each one.

### `workbox-cli`

If you're looking for the lowest possible barrier to entry with Workbox, the CLI is for you:

```shell
npm install workbox-cli --save-dev
```

To start using the CLI, run the wizard with `npx workbox wizard`. The wizard will ask a few questions, and the answers to those questions will be used to set up a project with a `workbox-config.js` file that you can customize to suit your needs. It will look something like:

```js
// A config for `generateSW`
export default {
  globDirectory: 'dist/',
  globPatterns: [
    '**/*.{css,woff2,png,svg,jpg,js}'
  ],
  swDest: 'dist/sw.js'
};
```

Once your configuration file has been created, the CLI can run either `generateSW` or `injectManifest` methods for you. The CLI's [help text](https://raw.githubusercontent.com/GoogleChrome/workbox/main/packages/workbox-cli/src/lib/help-text.js) has more information and examples of usage.

### `workbox-build`

`workbox-cli` is a wrapper around the `workbox-build` module, and an alternative is to use `workbox-build`directly. When using `workbox-build`, instead of specifying options via a `workbox-config.js` file, you'll use the `generateSW` or `injectManifest` methods directly as part of a Node script, passing in a similar set of options:

```js
// build-sw.mjs
import {generateSW} from 'workbox-build';

generateSW({
  globDirectory: 'dist/',
  globPatterns: [
    '**/*.{css,woff2,png,svg,jpg,js}'
  ],
  swDest: 'dist/sw.js'
});
```

In the above example, `workbox-build` will write the generated service worker to the `dist` directory when the `node build-sw.mjs` command is run.

### Using a bundler

Various bundlers have their own Workbox plugins, but the only bundler officially supported by the Workbox team is webpack, via `workbox-webpack-plugin`. Like `workbox-cli` and `workbox-build`, `workbox-webpack-plugin` will run the `generateSW` or `injectManifest` methods, except the plugin capitalizes those method names as `GenerateSW` or `InjectManifest`. Otherwise, the usage is similar to `workbox-build`:

```js
// webpack.config.js
import {GenerateSW} from 'workbox-webpack-plugin';

export default {
  // Other webpack config options omitted for brevity...
  plugins: [
    new GenerateSW({
      swDest: './dist/sw.js'
    })
  ]
};
```

The options you pass to either `GenerateSW` or `InjectManifest` aren't the same as `generateSW` or `injectManifest`, but there's significant overlap. In particular, you don't need to&mdash;nor _can_ you&mdash;specify a `globDirectory` option for `GenerateSW` as webpack already knows where your production assets are bundled.

## Using a framework

Everything covered up this point focuses on using Workbox regardless of one's framework preferences. However, it's possible to use Workbox within a specific framework if it makes development easier. For example, [`create-react-app` ships with Workbox by default](https://web.dev/precache-with-workbox-react/). Different framework integrations with Workbox [are covered later in a later article](/docs/workbox/framework-integrations/).

It's worth noting that these framework-specific integrations of Workbox may restrict your ability to configure Workbox in the way you want. In cases like these, you can always fall back to the methods discussed in this article.

## What if I don't have a build process?

This article assumes your project has a build process, but your project, in fact, may not. If that describes your situation, it's still possible to use Workbox with the [`workbox-sw` module](/docs/workbox/modules/workbox-sw). With `workbox-sw`, you can load the Workbox runtime from a CDN or locally, and compose your own service worker.

## Conclusion

Workbox's flexibility ensures that you can use it in just about any project, regardless of its framework or toolchain preferences. All of these avenues will allow you to accomplish precaching and runtime caching using a couple of methods, while allowing greater flexibility to build service workers with more advanced functionality when needed.
