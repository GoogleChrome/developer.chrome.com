---
layout: 'layouts/blog-post.njk'
title: Migrate away from data URLs in SVG <use> element
description: >
  Support for data: URLs in SVG <use> element will be removed. We recommended to migrate to alternatives.
date: 2023-05-25
authors:
  - shhnjk
tags:
  - security
---

{% Aside %}
We expect to [remove support for `data:` URLs in SVG `<use>` element](https://chromestatus.com/feature/5128825141198848)
in Chrome 119, scheduled to ship in November 2023.
{% endAside %}

The SVG spec was [recently updated](https://github.com/w3c/svgwg/pull/901) to remove support for `data:` URLs in SVG `<use>` element.
This improves security of the Web platform as well as compatibility between browsers as Webkit does not support `data:` URLs in SVG `<use>` element.

For sites which use `data:` URLs in SVG `<use>` element, there are several alternatives.

## Use same-origin SVG images

You can load same-origin SVG images using `<use>` element.

```html
<div class="icon">
  <svg width="1em" height="1em">
    <use xlink:href="svgicons.svg#user-icon"></use>
  </svg>
</div>
```

## Use inline SVG images

You can reference inline SVG images using `<use>` element.

```html
<svg style="display:none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <symbol id="user-icon" viewBox="0 0 32 32">
      <path d="M25.333 9.335c0 5.153-4.179 9.333-9.333 9.333s-9.333-4.18-9.333-9.333c0-5.156 4.179-9.335 9.333-9.335s9.333 4.179 9.333 9.335zM23.203 18.908c-2.008 1.516-4.499 2.427-7.203 2.427-2.707 0-5.199-0.913-7.209-2.429-5.429 2.391-8.791 9.835-8.791 13.095h32c0-3.231-3.467-10.675-8.797-13.092z">
    </symbol>
    <!-- And potentially many more icons -->
  </defs>
</svg>

<div class="icon">
  <svg width="1em" height="1em">
    <use xlink:href="#user-icon"></use>
  </svg>
</div>
```

## Use SVG images with blob: URLs

If you don't have control on page's HTML or same-origin resources (such as JavaScript libraries), you can load SVG images using `blob:` URLs in `<use>` element.

```js
const svg_content = `<svg style="display:none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <symbol id="user-icon" viewBox="0 0 32 32">
        <path d="M25.333 9.335c0 5.153-4.179 9.333-9.333 9.333s-9.333-4.18-9.333-9.333c0-5.156 4.179-9.335 9.333-9.335s9.333 4.179 9.333 9.335zM23.203 18.908c-2.008 1.516-4.499 2.427-7.203 2.427-2.707 0-5.199-0.913-7.209-2.429-5.429 2.391-8.791 9.835-8.791 13.095h32c0-3.231-3.467-10.675-8.797-13.092z">
      </symbol>
      <!-- And potentially many more icons -->
    </defs>
  </svg>`;
const blob = new Blob([svg_content], {type: 'image/svg+xml'});
const url = URL.createObjectURL(blob);
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
use.setAttribute('href', url + '#user-icon');
svg.appendChild(use);
document.body.appendChild(svg);
```

## Live examples

[This page](https://shhnjk.github.io/svg-use-icons/) has live exmaples for the alternaives explained.

## Reason for the removal
 
SVG `<use>` element can fetch external SVG images and clone it into current document. This is a powerful capability, and therefore it is restricted to same-origin SVG images.
However, `data:` URLs are treated as same-origin resources. Which caused several security bugs, such as bypasses of [Trusted Types](https://github.com/w3c/trusted-types/issues/357) and [Sanitizer API](https://bugs.chromium.org/p/chromium/issues/detail?id=1306450#c10).
This led to a discussion of the best approach to resolve these security bugs. And we came to a concensus among browser vendors and security researchers that the best way forward is to remove support for `data:` URLs in SVG `<use>` element.


I hope these resources will make your migration smooth and easier!
Thank you for your help in making the Web more secure and compatible place!