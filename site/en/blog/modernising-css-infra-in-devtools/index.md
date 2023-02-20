---
title: "Modernising CSS infrastructure in DevTools"
description: >
  How we researched and updated the CSS infrastructure in DevTools.
layout: "layouts/blog-post.njk"
authors:
  - kritisapra
date: 2021-09-14
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/HIzL0marFoFwAQyFHeEC.jpg'
alt: ''
tags:
  - devtools-engineering
  - devtools
  - devtools-architecture
---

{% Partial 'devtools/banner.md' %}

<!-- lint disable no-smart-quotes -->

# DevTools architecture refresh: Modernizing CSS infrastructure in DevTools

This post is part of [a series of blog posts](/tags/devtools-architecture/) describing the changes we are making to DevTools' architecture and how it is built. We will explain how CSS worked in DevTools historically and how we’ve modernized our CSS in DevTools in preparation for (eventually) migrating to a web standard solution for loading CSS in JavaScript files.

## Previous State of CSS in DevTools {: #previous }

DevTools implemented CSS in two different ways: one for CSS files used in the [legacy part](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/ui/legacy/Treeoutline.ts?q=registerRequiredCSS&ss=chromium) of DevTools, one for the [modern web components](/blog/migrating-to-web-components/) that are being used in DevTools.

The CSS implementation in DevTools was defined many years ago and is now outdated. DevTools has stuck to using the [`module.json` pattern](/blog/migrating-to-js-modules/#beginning ) and there has been a huge effort in removing these files. The last blocker for removal of these files is the `resources` section, which is used to load in CSS files.

We wanted to spend time exploring different potential solutions that could eventually morph into [CSS Module Scripts](https://web.dev/css-module-scripts/). The aim was to remove technical debt caused by the legacy system but also make the migration process to CSS Module Scripts easier.

Any CSS files that were in DevTools were considered to be ‘legacy’ as they were loaded using a `module.json` file, which is in the process of being removed. All CSS files had to be listed under `resources` in a `module.json` file in the same directory as the CSS file.

An example of a remaining `module.json` file:

```json
{
  "resources": [
    "serviceWorkersView.css",
    "serviceWorkerUpdateCycleView.css"
  ]
}
```

These CSS files would then populate a global object map called `Root.Runtime.cachedResources` as a mapping from a path to their contents. In order to add styles into DevTools, you would need to call [`registerRequiredCSS`](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/ui/legacy/Widget.ts?q=registerRequiredCSS&ss=chromium) with the exact path to the file you want to load.

Example `registerRequiredCSS` [call](https://source.chromium.org/chromium/chromium/src/+/main:out/Debug/gen/third_party/devtools-frontend/src/front_end/ui/legacy/components/quick_open/FilteredListWidget.js?q=registerRequiredCSS&ss=chromium&start=21):

```js
constructor() {
  …
  this.registerRequiredCSS('ui/legacy/components/quick_open/filteredListWidget.css');
  …
}
```

This would retrieve the contents of the CSS file and insert it as a `<style>` element into the page using the `appendStyle` function:.

[`appendStyle` function](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/ui/legacy/utils/append-style.ts;l=1?q=append-style&sq=&ss=chromium) that adds CSS using an inline style element:

```js
const content = Root.Runtime.cachedResources.get(cssFile) || '';

if (!content) {
  console.error(cssFile + ' not preloaded. Check module.json');
}

const styleElement = document.createElement('style');
styleElement.textContent = content;
node.appendChild(styleElement);
```

When we introduced modern web components (using custom elements), we **decided initially to use CSS via inline `<style>` tags in the component files** themselves. This presented its own challenges:

- **Lack of syntax highlight support.** Plugins that provide syntax highlighting for inline CSS do not tend to be as good as the syntax highlighting and auto complete features for CSS written in `.css` files.
- **Build performance overhead.** Inline CSS also meant that there needed to be two passes for linting: one for CSS files and one for inline CSS. This was a performance overhead we could remove if all CSS was written in standalone CSS files.
- **Challenge in minification.** Inline CSS could not be easily minified, so none of the CSS was minified. The file size of the release build of DevTools was also increased by the duplicated CSS introduced by multiple instances of the same web component.

The goal of my internship project was to find a solution for the CSS infrastructure that works with both the legacy infrastructure and the new web components being used in DevTools.

## Researching potential solutions {: #solutions }

The problem could be split into two different parts:

- Figuring out how the build system deals with CSS files.
- Figuring out how the CSS files are imported and utilised by DevTools.

We looked into different potential solutions for each part and these are outlined below.

### Importing CSS Files {: #importing-css }

The goal with importing and utilising CSS in the TypeScript files was to stick as close to web standards as possible, **enforce consistency throughout DevTools and avoid duplicated CSS** in our HTML. We also wanted to be able to pick a solution that would make it possible to migrate our changes to new web platform standards, such as CSS Module Scripts.

For these reasons the [@import](https://developer.mozilla.org/docs/Web/CSS/@import) statements and [<link>](https://developer.mozilla.org/docs/Web/HTML/Element/link) tags did not seem like the right fit for DevTools. They would not be uniform with imports throughout the rest of DevTools and result in a [Flash Of Unstyled Content (FOUC)](https://en.wikipedia.org/wiki/Flash_of_unstyled_content). The migration to CSS Module Scripts would be harder because the imports would have to be explicitly added and dealt with differently than they would with `<link>` tags.

```js
const output = LitHtml.html`
<style> @import "css/styles.css"; </style>
<button> Hello world </button>`
```

```js
const output = LitHtml.html`
<link rel="stylesheet" href="styles.css">
<button> Hello World </button>`
```
Potential solutions using `@import` or `<link>`.

Instead we opted to find a way to import the CSS file as a [`CSSStyleSheet`](https://developer.mozilla.org/docs/Web/API/CSSStyleSheet) object so that we can add it to the [Shadow Dom](https://web.dev/shadowdom-v1) (DevTools uses Shadow DOM for a couple of years now) using its [`adoptedStyleSheets`](https://web.dev/constructable-stylesheets/#using-constructed-stylesheets) property.

### Bundler options {: #bundler-options }

We needed a way to convert CSS files into a `CSSStyleSheet` object so that we could easily manipulate it in the TypeScript file. We considered both [Rollup](https://rollupjs.org/) and [webpack](https://webpack.js.org/) as potential bundlers to do this transformation for us. DevTools already uses Rollup in its production build, but adding either bundler to the production build could have potential performance issues when working with our current build system. Our integration with the [GN build system of Chromium](https://gn.googlesource.com/gn/) makes bundling more difficult and therefore bundlers tend not to integrate well with the current Chromium build system.


Instead, we explored the option to use the current GN build system to do this transformation for us instead.

### The new infrastructure of using CSS in DevTools {: #new-infra }

The new solution involves using `adoptedStyleSheets` to add styles to a particular Shadow DOM while using the GN build system to generate CSSStyleSheet objects that can be adopted by a `document` or a `ShadowRoot`.

```js
// CustomButton.ts

// Import the CSS style sheet contents from a JS file generated from CSS
import customButtonStyles from './customButton.css.js';
import otherStyles from './otherStyles.css.js';

export class CustomButton extends HTMLElement{
  …
  connectedCallback(): void {
    // Add the styles to the shadow root scope
    this.shadow.adoptedStyleSheets = [customButtonStyles, otherStyles];
  }
}
```

Using `adoptedStyleSheets` has multiple benefits including:

- It is in progress of becoming a modern web standard
- Prevents duplicate CSS
- Applies styles only to a Shadow DOM and this avoids any issues caused by duplicate class names or ID selectors in CSS files
- Easy to migrate to future web standards such as CSS Module Scripts and Import Assertions

The only caveat to the solution was that the `import` statements required the `.css.js` file to be imported. To let GN generate a CSS file during building, we wrote the  `generate_css_js_files.js` script. The build system now processes every CSS file and transforms it to a JavaScript file that by default exports a `CSSStyleSheet` object. This is great as we can import the CSS file and adopt it easily. Furthermore, we can also now minify the production build easily, saving file size:

```js
const styles = new CSSStyleSheet();
styles.replaceSync(
  // In production, we also minify our CSS styles
  /`${isDebug ? output : cleanCSS.minify(output).styles}
  /*# sourceURL=${fileName} */`/
);

export default styles;
```

[Example generated `iconButton.css.js` from the script.](https://source.chromium.org/chromium/chromium/src/+/main:out/Debug/gen/third_party/devtools-frontend/src/front_end/ui/components/icon_button/iconButton.css.js?q=iconButton.css.js&ss=chromium)

### Migrating legacy code using ESLint rules {: #eslint }

While the web components could be easily manually migrated, the process for migrating legacy usages of `registerRequiredCSS` was more involved. The two main functions that registered legacy styles were `registerRequiredCSS` and `createShadowRootWithCoreStyles`. We decided that since the steps to migrate these calls were fairly mechanical, we could use ESLint rules to apply fixes and automatically migrate legacy code. DevTools already uses a number of custom rules specific for the DevTools codebase. This was helpful as [ESLint](https://eslint.org/) already parses the code into an [Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)(abbr. AST) and we could query the particular call nodes that were calls to registering CSS.

The biggest issue we faced when writing the migration ESLint Rules was capturing edge cases. We wanted to make sure we got the right balance between knowing which edge cases were worth capturing and which should be migrated manually. We also wanted to be able to ensure that we could tell a user when an imported `.css.js` file is not being automatically generated by the build system as this prevents any file not found errors on runtime.

One disadvantage of using ESLint rules for the migration was that we could not change the required GN build file in the system. These changes had to be manually done by the user in each directory. While this required more work, it was a good way of confirming that every `.css.js` file being imported is actually generated by the build system.

Overall, using ESLint rules for this migration was really helpful as we were able to rapidly migrate the legacy code to the new infrastructure and having the AST readily available meant we could also handle multiple edge cases in the [rule](https://source.chromium.org/chromium/_/chromium/devtools/devtools-frontend/+/cb586fc6f9eabd9c9fd0e5292491e3646681cf2b:scripts/eslint_rules/lib/migrate_register_required_css.js;l=1;drc=52ffe818db45e37306fbf09696bfc76fa8975e43 ) and reliably automatically fix them using [ESLint’s fixer API](https://eslint.org/docs/developer-guide/working-with-rules#applying-fixes).

### What next? {: #what-next }

So far, all the web components in Chromium DevTools have been migrated to use the new CSS infrastructure instead of using inline styles. Most of the legacy usages of `registerRequiredCSS` have also been migrated to use the new system. All that is left is to remove as many `module.json` files as possible and then migrate this current infrastructure to implement CSS Module Scripts in the future!

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/engineering-blog.md' %}
