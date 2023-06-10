---
title: "Getting Started with Style Queries"
description: >
  Style queries allow developers to query a parent element's style values using the @container rule. In Chrome 111, style queries for CSS custom properties are landing stable. Learn how to get started with them.
layout: 'layouts/blog-post.njk'
date: 2023-02-24
hero: 'image/HodOHWjMnbNw56hvNASHWSgZyAf2/N8vx7PDIeyMNI2wzWnax.jpg'
alt: >
  Two-tone pink and blue background with opposite colored purses on each background.
tags:
  - chrome-111
  - css
authors:
  - unakravets
---

The ability to query a parent’s inline size, and container query unit values recently reached stable support in all [modern browser engines](https://web.dev/cq-stable).

{% BrowserCompat 'css.at-rules.container' %}

However, the [containment spec](https://www.w3.org/TR/css-contain-3/) includes more than just size queries; it also enables querying a parent's style values. From Chromium 111, you’ll be able to apply style containment for custom property values and query a parent element for the value of a custom property. 

{% BrowserCompat 'css.at-rules.container.style_queries_for_custom_properties' %}

This means that we have even more logical control of styles in CSS, and enables  better separation of an application’s logic and data layer from its styles.

The CSS Containment Module Level 3 spec, which covers size and style queries, allows for any styles to be queried from a parent, including property and value pairs such as `font-weight: 800`. However, in the rollout of this feature, style queries currently only work with CSS custom property values. This is still very useful for combining styles and separating data from design. Let’s take a look at how you use style queries with CSS custom properties:

## Getting started with style queries

Say we have the following HTML:

```html
<ul class="card-list">
  <li class="card-container">
    <div class="card">
      ...
    </div>
  </li>
</ul>
```

To use style queries, you must first set up a container element. This requires a slightly different approach dependent on if you are querying a direct or indirect parent.

### Querying direct parents
 
{% Img src="image/HodOHWjMnbNw56hvNASHWSgZyAf2/GY3AdNySYRu6knWtPbTs.png", alt="Diagram of a style query.", width="800", height="549" %}

Unlike with style queries, you don’t need to apply containment using the `container-type` or `container` property to `.card-container` in order for `.card` to be able to query the styles of its direct parent. However, we do need to apply the styles (custom property values in this case) to a container (`.card-container` in this case) or any element *containing* the element we’re styling in the DOM. We can’t apply styles we’re querying on the direct element we’re styling using that query because this could cause infinite loops.

To directly query a parent, you can write:

```css
/* styling .card based on the value of --theme on .card-container */
@container style(--theme: warm) {
  .card {
    background-color: wheat;
    border-color: brown; 
    ...
  }
}
```

You may have noticed that the style query wraps the query with  `style()`. This is to disambiguate size values from styles. For example, you can write a query for the width of the container as `@container (min-width: 200px) { … }`. This would apply styles if the parent container was at least 200px wide. However, `min-width` can also be a CSS property, and you could query for the CSS value of `min-width` using style queries. That’s why you’d use the `style()` wrapper to make the difference clear: `@container style(min-width: 200px) { … }`.

### Styling non-direct parents

If you want to query styles for any element that isn’t a direct parent, you need to give that element a `container-name`. For example, we can apply styles to `.card` based on the styles of `.card-list` by giving `.card-list` a `container-name`, and referencing it in the style query.

```css
/* styling .card based on the value of --moreGlobalVar on .card-list */
@container cards style(--moreGlobalVar: value) {
  .card {
    ...
  }
}
```

It’s generally a best practice to give your containers names to make it clear what you are querying and unlock the ability to access those containers more easily. One example of where this comes in handy is if you want to style elements within `.card` directly. Without a named container on `.card-container`, they can’t query it directly.

But all of this makes a lot more sense in practice. Let’s take a look at some examples:
## Style queries in action


{% Img src="image/HodOHWjMnbNw56hvNASHWSgZyAf2/oKtluVGgWpuYyEn8Zd6W.png", alt="Demo image with multiple product cards, some with ‘new’ or ‘low stock’ tags and the ‘low stock’ card with a red background.", width="800", height="355" %}

Style queries are particularly useful when you either have a reusable component with multiple variations, or when you don’t have control over all of your styles but need to apply changes in certain cases. This example shows a set of product cards which share the same card component. Some product cards have additional details/notes such as “New” or “Low Stock”, triggered by a custom property named `--detail`. Additionally, if a product is in “Low Stock”, it gets a deep red border background. This type of information is likely server rendered, and can be applied to the cards through inline styles like so:

```html
 <div class="product-list">
  <div class="product-card-container" style="--detail: new">
    <div class="product-card">
      <div class="media">
        <img .../>
      <div class="comment-block"></div>
    </div>
  </div>
  <div class="meta">
    ...
  </div>
  </div>
  <div class="product-card-container" style="--detail: low-stock">
    ...
  </div>
  <div class="product-card-container">
    ...
  </div>
  ...
</div>

```

Given this structured data, you can pass values to `--detail`, and use this CSS custom property to apply the styles:

```css
@container style(--detail: new) {
  .comment-block {
    display: block;
  }
  
  .comment-block::after {
    content: 'New';
    border: 1px solid currentColor;
    background: white;
    ...
  }
}

@container style(--detail: low-stock) {
  .comment-block {
    display: block;
  }
  
  .comment-block::after {
    content: 'Low Stock';
    border: 1px solid currentColor;
    background: white;
    ...
  }
  
  .media-img {
    border: 2px solid brickred;
  }
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'zYJqXWg',
  height: 650,
  tab: 'result'
} %}

The above code allows us to apply a chip for `--detail: low-stock` and `--detail: new`, but you may have noticed some redundancy in the code block. Currently, there’s no way to query for just the presence of `--detail` with `@container style(--detail)`, which would allow for better sharing of styles and less repetition. This capability is currently [in discussion](https://github.com/w3c/csswg-drafts/issues/8127) in the working group.

### Weather cards

The previous example used a single custom property with multiple possible values to apply styles. But you can mix it up by using and querying for multiple custom properties too. Take this weather card example:

{% Img src="image/HodOHWjMnbNw56hvNASHWSgZyAf2/VCk15tNjkP3Emrrw2Xkl.png", alt="Weather cards demo.", width="800", height="255" %}

To style the background gradients and icons for these cards, look for weather characteristics, such as “cloudy”, “rainy”, or “sunny”:

```css
@container style(--sunny: true) {
  .weather-card {
    background: linear-gradient(-30deg, yellow, orange);
  }
  
  .weather-card:after {
    content: url(<data-uri-for-demo-brevity>);
    background: gold;
  }
}
```

This way, you can style each card based on its unique characteristics. But you can also style for characteristic (custom property) combinations, using the `and` combinator in the same way as for [media queries](https://developer.mozilla.org//docs/Web/CSS/Media_Queries/Using_media_queries#combining_multiple_types_or_features). For example, a day that is both cloudy and sunny would look like:

```css
@container style(--sunny: true) and style(--cloudy: true) {
    .weather-card {
      background: linear-gradient(24deg, pink, violet);
    }
  
  .weather-card:after {
      content: url(<data-uri-for-demo-brevity>);
      background: violet;
  }
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'KKxzYQx',
  height: 550,
  tab: 'result'
} %}

{% Aside 'note' %}
What would be even more useful for style container queries would be the ability to query range values. For example, you would be able to send data such as `--chanceOfRain: 50%`, and then use a range, such as `@container style(30% <= --chanceOfRain < 60%)` to apply the styles, This way, you could get a lot more granular with the design and its various combinations. This is another feature that is actively [being discussed](https://github.com/w3c/csswg-drafts/issues/8376) in the working group for container queries.
{% endAside %}

## Separating data from design

In both of these demos, there’s a structural benefit of separating the data layer (DOM that would be rendered on the page) from the styles applied. The styles are written as possible variants that live within the components style, while an endpoint could send the data that it would then use to style the component by. You can use a single value, such as in the first case, updating the `--detail` value, or multiple variables, such as in the second case (setting either `--rainy` or `--cloudy` or `--sunny`. And the best part is that you can combine these values as well, checking for both `--sunny` and `--cloudy` could show a partly cloudy style.

Updating custom property values through JavaScript can be done seamlessly, either while setting up the DOM model (i.e. while building the component in a framework), or updated at any time using `<parentElem>.style.setProperty('--myProperty’, <value>)`. I

Here’s a demo that in a few lines of code, updates the `--theme` of a button, and applies styles using style queries and that custom property (`--theme`):


{% Video src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/mxE8At7l4Ii0O8meY5Zo.mp4", autoplay="true", muted="true", loop="true", controls="true", alt="Demo cycling through themes", width="800", height="243" %}

{% Codepen {
  user: 'web-dot-dev',
  id: 'GRXZLvW',
  height: 350,
  tab: 'result'
} %}

Style the card using style queries, the JavaScript used to update the custom property values is:

```js
const themePicker = document.querySelector('#theme-picker')
const btnParent = document.querySelector('.btn-section');

themePicker.addEventListener('input', (e) => {
  btnParent.style.setProperty('--theme', e.target.value);
})
```

The features detailed in this article are just the start. You can expect more things from container queries to help you build dynamic, responsive interfaces. As for style queries specifically, there are still a few open issues. One is the implementation of style queries for CSS styles beyond custom properties. This is already a part of the current spec level, but not yet implemented in any browsers. The boolean context evaluation is expected to be added to the current spec level when the outstanding [issue](https://github.com/w3c/csswg-drafts/issues/8127) is resolved, while [range querying](https://github.com/w3c/csswg-drafts/issues/8376) is planned for the next level of the spec. 

