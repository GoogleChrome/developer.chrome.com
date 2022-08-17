---
layout: "layouts/doc-post.njk"
title: "Badges reference"
date: 2022-08-02
#updated: YYYY-MM-DD
description: "Toggle various overlays and speed up DOM tree navigation with badges."
authors:
  - sofiayem
tags:
  - dom
  - css
  - html
---

Toggle various overlays and speed up DOM tree navigation with this comprehensive reference of badges in the **Elements** panel.

## Show or hide badges

To show or hide badges:

1. [Open DevTools](/docs/devtools/open/#elements).
1. Right-click an element in the DOM tree and select **Badge settings...**.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/xpRsrsvl9BxxANM4Xuiy.png", alt="Badge settings.", width="800", height="337" %}
1. Select or clear checkboxes next to the desired badges.

The **Elements** panel shows the selected badges next to the appropriate elements in the DOM tree. The next sections explain every badge.

## Grid

An HTML element is a [grid container](https://developer.mozilla.org/docs/Web/CSS/CSS_Grid_Layout) if its `display` CSS property is set to `grid` or `inline-grid`. Such elements have `grid` badges next to them that toggle the corresponding overlays.

Toggle the overlay on the following preview:

{% Codepen {
 user: 'sofiayem',
 id: 'YzarzKV',
 height: 270,
 allow: ['geolocation']
} %}

1. [Inspect the element][1] in the preview.
1. In the DOM tree, click the `grid` badge next to the element and observe the overlay.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/WMZrfd1AVdMjkgCDqSK8.png", alt="Grid overlay.", width="800", height="674" %}

The overlay shows columns, rows, their numbers, and gaps.

To learn how to debug grid layout, see [Inspect CSS grid](/docs/devtools/css/grid/).

## Flex

An HTML element is a [flex container](https://developer.mozilla.org/docs/Web/CSS/CSS_Flexible_Box_Layout) if its `display` CSS property is set to `flex` or `inline-flex`. Such elements have `flex` badges next to them that toggle the corresponding overlays.

Toggle the overlay on the following preview:

{% Codepen {
  user: 'sofiayem',
  id: 'XWEeWdb',
  height: 200,
  allow: ['geolocation']
} %}

1. [Inspect the element][1] in the preview.
1. In the DOM tree, click the `flex` badge next to the element and observe the overlay.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/MmkJORNp3sOKHHK1CI4h.png", alt="Flex overlay.", width="800", height="646" %}

The overlay shows child element positions. 

To learn how to debug flex layouts, see [Inspect and debug CSS flexbox](/docs/devtools/css/flexbox/).

## Ad

DevTools can detect some [ad frames and tag them](https://chromium.googlesource.com/chromium/src/+/master/docs/ad_tagging.md). Such frames have `ad` badges next to them. 

Discover an ad in the following preview:

{% Codepen {
  user: 'sofiayem',
  id: 'rNdGNYx',
  height: 200,
  allow: ['geolocation']
} %}

1. [Inspect the element][1] in the preview.
1. In the DOM tree, find an element with the `ad` badge next to it.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/EqJVqe8nqFApED6q1udz.png", alt="Ad badge.", width="800", height="659" %}

The `ad` badge is not clickable but you can use the **Rendering** tab to [highlight ad frames](/docs/devtools/rendering/apply-effects/#highlight-ad-frames) in red.

## Scroll-snap

An HTML element is a [scroll container](https://developer.mozilla.org/docs/Glossary/Scroll_container) if its `overflow` CSS property is set to `scroll`, or `auto` when there's enough content to cause overflow. Scroll containers can have [CSS properties that configure snap points](https://developer.mozilla.org/docs/Web/CSS/CSS_Scroll_Snap). Such elements have `scroll-snap` badges next to them that toggle the corresponding overlays.

Toggle the overlay on the following preview:

{% Codepen {
  user: 'sofiayem',
  id: 'eYMGYLz',
  height: 200,
  allow: ['geolocation']
} %}

1. [Inspect the element][1] in the preview.
1. In the DOM tree, click the `scroll-snap` badge next to the element.
1. Try scrolling the element to the right and observe the overlay.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/r3qAHP29BF4Gjeacn7cN.png", alt="Scroll-snap overlay.", width="800", height="646" %}

The overlay shows element positions and snap points.

## Container

An HTML element is a [container](https://developer.mozilla.org/docs/Web/CSS/CSS_Container_Queries) if it has the `container-type` CSS property. Such elements have `container` badges next to them that toggle the corresponding overlays.

{% Aside %}
CSS container queries is an experimental feature. To enable its support in DevTools, under [`chrome://flags`](chrome://flags), set the `Enable CSS Container Queries` experiment to `Enabled`.
Otherwise, the preview below doesn't work.
{% endAside %}

Toggle the overlay on the following preview:

{% Codepen {
  user: 'sofiayem',
  id: 'mdxByda',
  height: 350,
  allow: ['geolocation']
} %}

1. [Inspect the element][1] in the preview.
1. In the DOM tree, click the `container` badge next to the element.
1. Try resizing the element by dragging its bottom-right corner and observe the layout change and overlay.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/zT2tNGGCrQDDBgGJEdLd.png", alt="Container overlay.", width="800", height="646" %}

The overlay shows child element positions.

To learn how to debug container queries, see [Inspect and debug CSS container queries](/docs/devtools/css/container-queries/).

## Slot

The [`<slot>` HTML element](https://developer.mozilla.org/docs/Web/HTML/Element/slot) is a placeholder that you can fill with your own content. Together with the `<template>` element,  `<slot>` lets you create separate DOM trees and present them together. Slot content elements have {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Zml4roc9tWR2DU1Yb9ix.svg", alt="Slot.", width="20", height="20" %}`slot` badges next to them that serve as links to the corresponding slots.

{% Aside %}
The slot badge is a new DevTools feature available from Chrome version 104. In earlier versions, the preview below doesn't work.
{% endAside %}

Discover the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Zml4roc9tWR2DU1Yb9ix.svg", alt="Slot.", width="20", height="20" %}`slot` badge in the following preview:

{% Codepen {
  user: 'sofiayem',
  id: 'OJvxyzB',
  height: 250,
  allow: ['geolocation']
} %}

1. [Inspect the element][1] in the preview.
1. In the DOM tree, click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Zml4roc9tWR2DU1Yb9ix.svg", alt="Slot.", width="20", height="20" %}`slot` badge next to the element to locate the corresponding slot.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/xO7HvYKsDgYjQ2xbO8jL.png", alt="Slot and reveal badges.", width="800", height="699" %}
   {% Aside 'gotchas' %}
   The {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Zml4roc9tWR2DU1Yb9ix.svg", alt="Slot.", width="20", height="20" %}`slot` badge has a paired {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Zml4roc9tWR2DU1Yb9ix.svg", alt="Reveal.", width="20", height="20" %}`reveal` badge that takes you back.
   {% endAside %}
1. Get back to the slot's content by clicking the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Zml4roc9tWR2DU1Yb9ix.svg", alt="Reveal.", width="20", height="20" %}`reveal` badge.

[1]: /docs/devtools/open/#elements
