---
layout: "layouts/doc-post.njk"
title: "Badges reference"
date: 2022-08-02
#updated: YYYY-MM-DD
description: "Toogle various overlays and speed up DOM tree navigation with badges."
authors:
  - sofiayem
tags:
  - html
  - dom
  - css
---

Toogle various overlays and speed up DOM tree navigation with this comprehensive reference of badges in the **Elements** panel.

## Show or hide badges

To show or hide badges:

1. [Open DevTools](/docs/devtools/open/#elements).
1. Right-click an element in the DOM tree and select **Badge settings...**.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/xpRsrsvl9BxxANM4Xuiy.png", alt="Badge settings.", width="800", height="337" %}
1. Select or clear checkboxes next to the desired badges. The **Elements** panel shows the selected badges next to the corresponding elements in the DOM tree.

The next section explain what every badge does.

## Grid

Toggle the grid overlay with the `grid` badge on the following preview:

{% Codepen {
 user: 'sofiayem',
 id: 'YzarzKV',
 height: 270,
 allow: ['geolocation']
} %}

1. [Inspect the element in the preview][1].
1. In the DOM tree, click the `grid` badge next to the element and observe the overlay.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/pGJNxibLKoaTmkgAqsyR.png", alt="Grid overlay.", width="800", height="657" %}

The overlay shows columns, rows, their numbers, and gaps.

To learn how to debug grid layout, see [Inspect CSS grid](/docs/devtools/css/grid/).

## Flex

Toggle the flex overlay with the `flex` badge on the following preview:

{% Codepen {
  user: 'sofiayem',
  id: 'XWEeWdb',
  height: 200,
  allow: ['geolocation']
} %}

1. [Inspect the element in the preview][1].
1. In the DOM tree, click the `flex` badge next to the element and observe the overlay.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/IgxIyFsXTjEPvTEStsMj.png", alt="Flex overlay.", width="800", height="613" %}

The overlay shows child element positions. 

To learn how to debug flex laylouts, see [Inspect and debug CSS flexbox](/docs/devtools/css/flexbox/).

## Ad

Discover ads with the `ad` badge:

{% Codepen {
  user: 'sofiayem',
  id: 'rNdGNYx',
  height: 200,
  allow: ['geolocation']
} %}

1. [Inspect the element in the preview][1].
1. In the DOM tree, find an element with the `ad` badge next to it.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/EqJVqe8nqFApED6q1udz.png", alt="Ad badge.", width="800", height="659" %}

The `ad` badge is not clickable but you can use the **Rendering** tab to [highlight ad frames](/docs/devtools/rendering/apply-effects/#highlight-ad-frames) in red.

## Scroll-snap

Toggle the scroll-snap overlay with the `scroll-snap` badge on the following preview:

{% Codepen {
  user: 'sofiayem',
  id: 'eYMGYLz',
  height: 200,
  allow: ['geolocation']
} %}

1. [Inspect the element in the preview][1].
1. In the DOM tree, click the `scroll-snap` badge next to the element.
1. Try scrolling to the right and ovserve the overlay.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2rK1YxBm1ycHBCnEbvkG.png", alt="Scroll-snap overlay.", width="800", height="656" %}

The overlay shows element positions and align points.

## Container

Toggle the container overlay with the `container` badge on the following preview:

{% Codepen {
  user: 'sofiayem',
  id: 'mdxByda',
  height: 350,
  allow: ['geolocation']
} %}

1. [Inspect the element in the preview][1].
1. In the DOM tree, click the `container` badge next to the element.
1. Try resizing the element by dragging its bottom-right corner and observe the layout change and overlay.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/D1fMidi9ihzOANGjP51J.png", alt="Container overlay.", width="800", height="583" %}

The overlay shows child element positions.

To learn how to debug container queries, see [Inspect and debug CSS container queries](/docs/devtools/css/container-queries/).

## Slot


{% Codepen {
  user: 'sofiayem',
  id: 'OJvxyzB',
  height: 150,
  allow: ['geolocation']
} %}

[1]: /docs/devtools/open/#elements
