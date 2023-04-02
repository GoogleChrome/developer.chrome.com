---
layout: layouts/blog-post.njk
title: The `x_google_ignoreList` source map extension
description: >
  Improve debugging experience in Chrome DevTools with the x_google_ignoreList source map extension.
subhead: >
  Improve debugging experience in Chrome DevTools with the `x_google_ignoreList` source map extension.
date: 2023-03-30
authors:
  - jecelynyeen
tags:
  - devtools
  - sourcemap
  - javascript
hero: image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZNIMcT70jAbqdpvLqVpy.jpg
alt: >
  A map with pins.
---

{% YouTube id='FIYkjjFYvoI', startTime='256' %}

Chrome DevTools parses the `x_google_ignoreList` field in [source maps](https://web.dev/source-maps/) to help improve developer debugging experience. Take a look at the following stack trace in the **Console**. DevTools automatically hides all the third party frames, and shows only the frames that are relevant to your code.

<figure>
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4Q6lH52avZS6Om6UV3Dl.png", alt="A comparison of stack trace results.", width="800", height="439" %}
  <figcaption>
    The image shows the stack traces before and after Chrome DevTools supports <code>x_google_ignoreList</code>. The later hides away irrelevant third-party frames to help you pinpoint issues quicker during debugging.
  </figcaption>
</figure>

## What is `x_google_ignoreList`?

[Source maps extensions](https://bit.ly/sourcemap#heading=h.ghqpj1ytqjbm) are additional fields that store complementary information about the source map. Such fields are prefixed with `x_`.

Chrome DevTools uses the `x_google_ignoreList` field (if provided), to filter out generated code and let web developers focus only on the code they author. For example, let’s look at the following source map.

```js
/* demo.js.map */

{
  "version": 3,
  "mappings": "AAAAA, ..." 
  "sources": [
    "app.js",
    "components/Button.ts",
    "node_modules/.../framework.js",
    "node_modules/.../library.js",
    ...
  ],
  "x_google_ignoreList": [2, 3],
  ...
}
```

The `sources` field shows a list of original sources used by the `mappings` entry. Watch [What are source maps?](https://youtu.be/FIYkjjFYvoI) to learn how the mappings work.

Given that the two files `node_modules/…/frameworks.js` and `node_modules/.../library.js` are third party scripts, you can specify the `x_google_ignoreList` field to indicate their positions in the `sources` field. Chrome DevTools will apply this information to hide frames from those ignored files. 

<figure>
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yw7xc5vBlBrCloYwFioA.png", alt="A comparison of collapsed and expanded stack trace.", width="800", height="467" %}
  <figcaption>
    The image shows the stack traces before and after you expand the stack trace in the Console. The ignored frames are grayed out when expanded.
  </figcaption>
</figure>

This also applies to the [**Call Stack**](/docs/devtools/javascript/reference/#show-ignore-listed-frames) in the **Sources** panel during breakpoint debugging.  

Behind the scenes, DevTools has an extra setting enabled by default: [Automatically add known third-party scripts to ignore list](/docs/devtools/settings/ignore-list/#skip-third-party). You can find it in DevTools > **Settings** > **Ignore List**.

With the `x_google_ignoreList` source map field, you have the option to [hide the ignored files](/docs/devtools/javascript/reference/#hide-ignore-listed) in the **Sources** panel to focus on your code.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Y4KSjl9zJQdnAhTvtnXm.png", alt="Hide ignore-listed sources.", width="800", height="449" %}

## How to populate `x_google_ignoreList`

The good news is frameworks like [Angular](https://angular.io/) and [Nuxt](https://nuxt.com/) already configure `x_google_ignoreList` in their source maps. Upgrade to the latest version and it works out of the box. You get stack trace improvements effortlessly.

On the other hand, build tools like [Vite](https://vitejs.dev/config/server-options.html#server-sourcemapignorelist) and [Rollup](https://rollupjs.org/configuration-options/#output-sourcemapignorelist) provide settings to configure it. There is also a [webpack plugin](https://www.npmjs.com/package/devtools-ignore-webpack-plugin) for that.

If you are a framework or library maintainer, it's essential to understand how to implement these settings to improve your users debugging experience. See the following section to see how Angular and Nuxt did it behind the scenes.

### What if your favorite framework and build tool doesn’t support it yet? 

We actively work with frameworks and build tools to land these new settings. You can also help by notifying maintainers about this feature. For example, you can file an issue in their repository.

Alternatively, you can manually [add irrelevant scripts to the Ignore List](/blog/new-in-devtools-112/#ignore-list) right from the file tree on the DevTools > **Sources** > **Page** pane to achieve similar result.


## Case studies: Nuxt and Angular implementation

### `x_google_ignoreList` in Nuxt

Starting from [Nuxt v3.3.1](https://nuxt.com/blog/v3-3#better-logging-in-browser-devtools), the contents of the `node_modules` and Nuxt `buildDir` have been marked as _“to be ignored by debuggers”_.

This was achieved through [a change in the Nuxt’s build configuration via Vite and Rollup](https://github.com/nuxt/nuxt/pull/19243):

```js
/* vite.config.ts */

const ctx: ViteBuildContext = {
  config: vite.mergeConfig(
  build: {
    rollupOptions: {
      output: {
        sourcemapIgnoreList: (relativeSourcePath) => {
          return relativeSourcePath.includes('/node_modules/') || relativeSourcePath.includes(ctx.nuxt.options.buildDir)
        },
      }
})
```

The DevTools team would like to express gratitude to the Vite and Nuxt teams for making this possible. We appreciate your efforts and collaboration, which were essential to the success of this implementation. Thank you again to the Vite and Nuxt teams for your contributions!

### `x_google_ignoreList` in Angular

Starting from [Angular v14.1.0](https://github.com/angular/angular-cli/releases/tag/14.1.0), the contents of the `node_modules` and `webpack` folders have been marked as _“to ignore”_.

This was achieved through [a change in `angular-cli`](https://github.com/angular/angular-cli/commit/b5f6d862b95afd0ec42d9b3968e963f59b1b1658) by [creating a plugin that hooks into the webpack’s `Compiler` module](https://webpack.js.org/api/compiler-hooks/).

The [webpack plugin](https://github.com/angular/angular-cli/blob/main/packages/angular_devkit/build_angular/src/webpack/plugins/devtools-ignore-plugin.ts) that our engineers created hooks into the `PROCESS_ASSETS_STAGE_DEV_TOOLING` stage and populates the `x_google_ignoreList` field in the source maps with the final assets that webpack generates and the browser loads.

```js
const map = JSON.parse(mapContent) as SourceMap;
const ignoreList = [];

for (const [index, path] of map.sources.entries()) {
  if (path.includes('/node_modules/') || path.startsWith('webpack/')) {
    ignoreList.push(index);
  }
}

map[`x_google_ignoreList`] = ignoreList;
compilation.updateAsset(name, new RawSource(JSON.stringify(map)));
```

To learn more about other Angular debugging improvements in DevTools, see [Case Study: Better Angular Debugging with DevTools](/blog/devtools-better-angular-debugging/).

The Chrome DevTools team would like to extend our gratitude to the Angular team for their invaluable contributions to the success of this implementation. Your efforts and collaboration were essential, and we appreciate your hard work. Thank you, Angular team, for making this possible!

