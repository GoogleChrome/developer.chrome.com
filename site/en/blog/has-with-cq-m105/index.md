---
title: "@container and :has(): two powerful new responsive APIs landing in Chromium 105"
description: >
  "Container queries and :has() are a match made in responsive heaven. Luckily, both of these features are landing together in Chromium 105. This is a huge release with two highly-requested features for responsive interfaces!"
layout: 'layouts/blog-post.njk'
date: 2022-08-03
hero: 'image/HodOHWjMnbNw56hvNASHWSgZyAf2/KBYS0gF3R7mdhjVBwvbn.jpg'
alt: >
  Image of a rocketship from SpaceX.
tags:
  - chrome-105
  - css
authors:
  - unakravets
---

Container queries and :has() are a match made in responsive heaven. Luckily, both of these features are landing together in Chromium 105. This is a huge release with two highly-requested features for responsive interfaces!

## Container Queries: a quick summary

Container queries enable developers to query a parent selector for its size and styling information, making it possible for a child element to own its responsive styling logic, no matter where it lives on a web page.

Instead of relying on the viewport for styling input such as available space, developers now have the ability to query the size of in-page elements too. This capability means that a component owns its responsive styling logic. This makes the component much more resilient, as the styling logic is attached to it, no matter where it appears on the page.

{% Aside 'caution' %}
Container queries are [currently supported](https://caniuse.com/css-container-queries) in Chromium and Safari TP.
{% endAside %}

## Using container queries

To build with container queries, you must first set containment on a parent element. Do this by setting a `container-type` on the parent container. You might have a card with an image and some text content that looks like this:

{% Img src="image/HodOHWjMnbNw56hvNASHWSgZyAf2/xR7RmgS1TUZmZ9ntOFrV.png", alt="Single two-column card.", width="795", height="182" %}

To create a container query, set `container-type` on the card container:

```css
.card-container {
  container-type: inline-size;
}
```

Setting the `container-type` to `inline-size` queries the inline-direction size of the parent. In latin languages like english, this would be the width of the card, since the text flows inline from left to right.

Now, we can use that container to apply styles to any of its children using `@container`:

```css
.card {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

@container (max-width: 400px) {
  .card {
    grid-template-columns: 1fr;
  }
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'dymdbpg',
  height: 450,
  tab: 'css, result'
} %}

## The :has() parent selector

The CSS `:has()` pseudo-class enables developers to check if a parent element contains children with specific parameters. 

For example, `p:has(span)` indicates a paragraph (`p`) selector, which has a `span` inside of it. You can use this to style the parent paragraph itself, *or* style anything within it. One useful example is `figure:has(figcaption)` to style a `figure` element that contains a caption. You can see much more about `:has()` in [this article by Jhey Tompkins](/blog/has-m105/).

{% Aside 'caution' %}
Current [browser support](https://caniuse.com/css-has) for `:has()` includes Chromium and Safari.
{% endAside %}

## Container queries and `:has()`

You can combine the parent selection powers of `:has()` with the parent querying powers of container queries to create some really dynamic intrinsic styles.

Let’s expand on the first example with the rocket card. What if you had a card without an image? Maybe you want to increase the size of the title and adjust the grid layout to single column so that it looks more intentional without the image.

{% Img src="image/HodOHWjMnbNw56hvNASHWSgZyAf2/ymghfPKOBExwvSFQIdrY.png", alt="Larger text on the card without the image, and it shows in a column.", width="795", height="503" %}

In this example, the card with an image has a two-column grid template, whereas the card without the image has a single-column layout. Additionally, the card without the image has a bigger heading. To write this using `:has()` use the following CSS.

```css
.card:has(.visual) {
  grid-template-columns: 1fr 1fr;
}
```

You’re looking for an element with a class of `visual` to apply the two-column style above. Another neat CSS function is `:not()`. This is a part of the same spec as `:has()` but has been around for much longer and has better [browser support](https://caniuse.com/?search=%3Anot()). You can even combine `:has()` and `:not()`, like so:

```css
.card:not(:has(.visual)) h1 {
  font-size: 4rem;
}
```

In the above code, you are writing a selector that styles an `h1` within a card that does not contain a `visual` class. This is how you can very clearly adjust the font size.

{% Codepen {
  user: 'web-dot-dev',
  id: 'JjLpPKv',
  height: 450,
  tab: 'css, result'
} %}

## Putting it all together

The above demo shows a combination of `:has()`, `:not()`, and `@container`, but container queries really shine when you can see the same element used in multiple places. Let’s add a touch of styling and showcase these cards in a grid alongside each other.

{% Video src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/N2cngWWFNWGLA7HYZiw2.mov", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}


{% Codepen {
  user: 'web-dot-dev',
  id: 'XWEZrje',
  height: 450,
  tab: 'css, result'
} %}

Now you can really see the power of modern CSS. We’re able to write clear styles using targeted styles that build logic on top of logic and create really robust components. With these two powerful features landing in Chromium 105 and gaining cross-browser support momentum, it’s such an exciting time to be a UI developer!
