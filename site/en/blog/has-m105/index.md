---
layout: "layouts/blog-post.njk"
title: ":has(): the family selector"
description: "With :has() landing in Chromium 105. Let's take a look at some of the awesome opportunities it brings to our CSS!"
authors:
  - jheyy
hero: "image/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/SLbZGkpDT3AG1E11MMFy.jpg"
alt: "Image of a neon sign displaying the words Good times"
tags:
  - css
  - chrome-105
date: 2022-08-03
---

Since time began (In CSS terms), we've worked with a cascade in various senses. Our styles compose a "Cascading Style Sheet". And our selectors cascade too. They can go sideways. In most cases they go downwards. But never upwards. For years, we've fantasized about a "Parent selector". And now it's finally coming! In the shape of a `:has()` pseudo selector.

The `:has()` CSS pseudo-class represents an element if any of the selectors passed as parameters match at least one element.

But, it's more than a "parent" selector. That's a nice way to market it. The not so appealing way might be the "conditional environment" selector. But that doesn't have quite the same ring to it. How about the "family" selector?


## Browser Support

Before we go any further, it's worth mentioning browser support. It's not quite there yet. But, it's getting closer. No Firefox support yet, it’s on the roadmap. But it's already in Safari and due for release in Chromium 105. All the demos in this article will tell you if they aren't supported in the browser used.

{% Codepen {
    user: 'web-dot-dev',
    id: 'RwMgZpw',
    height: 450,
    tab: 'result'
  }
%}

## How to use :has

So what does it look like? Consider the following HTML with two sibling elements with the class `everybody`. How would you select the one that has a descendant with the class `a-good-time`?

```html
<div class="everybody">
  <div>
    <div class="a-good-time"></div>
  </div>
</div>

<div class="everybody"></div>
```

With `:has()`, you can do that with the following CSS.

```css
.everybody:has(.a-good-time) {
  animation: party 21600s forwards;
}
```

This selects the first instance of `.everybody` and applies an `animation`.

In this example, the element with the class `everybody` is the target. The condition is having a descendant with the class `a-good-time`.

```css
<target>:has(<condition>) { <styles> }
```

But, you can take it much further than that because `:has()` opens up a lot of opportunities. Even ones likely not discovered yet. Consider some of these.

Select `figure` elements that have a direct `figcaption`.
```css
figure:has(> figcaption) { ... }
```
Select `anchor`s that don’t have a direct SVG descendant
```css
a:not(:has(> svg)) { ... }
```
Select `label`s that have a direct `input` sibling. Going sideways!
```css
label:has(+ input) { … }
```
Select `article`s where a descendant `img` doesn’t have `alt` text
```css
article:has(img:not([alt])) { … }
```
Select the `documentElement` where some state is present in the DOM
```css
:root:has(.menu-toggle[aria-pressed=”true”]) { … }
```
Select the layout container with an odd number of children
```css
.container:has(> .container__item:last-of-type:nth-of-type(odd)) { ... }
```
Select all items in a grid that are not hovered
```css
.grid:has(.grid__item:hover) .grid__item:not(:hover) { ... }
```
Select the container that contains a custom element `<todo-list>`
```css
main:has(todo-list) { ... }
```
Select every solo `a` within a paragraph that has a direct sibling `hr` element
```css
p:has(+ hr) a:only-child { … }
```
Select an `article` where multiple conditions are met
```css
article:has(>h1):has(>h2) { … }
```
Mix that up. Select an `article` where a title is followed by a subtitle
```css
article:has(> h1 + h2) { … }
```
Select the `:root` when interactive states are triggered
```css
:root:has(a:hover) { … }
```
Select the paragraph that follows a `figure` that doesn’t have a `figcaption`
```css
figure:not(:has(figcaption)) + p { … }
```

What interesting use cases can you think of for `:has()`? The fascinating thing here is that has encourages you to break your mental model. It makes you think "Could I approach these styles in a different way?".


## Examples

Let's go through some examples of how we could use it.


### Cards

Take a classic card demo. We could display any information in our card, for example: a title, subtitle, or some media. Here's the basic card.

```html
<li class="card">
  <h2 class="card__title">
      <a href="#">Some Awesome Article</a>
  </h2>
  <p class="card__blurb">Here's a description for this awesome article.</p>
  <small class="card__author">Chrome DevRel</small>
</li>
```

{% Codepen {
    user: 'web-dot-dev',
    id: 'yLKXoMP',
    height: 450,
    tab: 'result'
  }
%}

What happens when you want to introduce some media? For this design the card could split into two columns. Before, you might create a new class to represent this behavior, for example `card--with-media` or `card--two-columns`. These class names not only become hard to conjure up, but also become hard to maintain and remember.

With `:has()`, you can detect that the card has some media and do the appropriate thing. No need for modifier class names.

```html
<li class="card">
  <h2 class="card__title">
    <a href="/article.html">Some Awesome Article</a>
  </h2>
  <p class="card__blurb">Here's a description for this awesome article.</p>
  <small class="card__author">Chrome DevRel</small>
  <img
    class="card__media"
    alt=""
    width="400"
    height="400"
    src="./team-awesome.png"
  />
</li>
```

{% Codepen {
    user: 'web-dot-dev',
    id: 'rNdwzyK',
    height: 450,
    tab: 'result'
  }
%}


And you don't need to leave it there. You could get creative with it. How might a card showing “featured” content adapt within a layout? This CSS would make a featured card the full width of the layout and place it at the start of a grid.


```css
.card:has(.card__banner) {
  grid-row: 1;
  grid-column: 1 / -1;
  max-inline-size: 100%;
  grid-template-columns: 1fr 1fr;
  border-left-width: var(--size-4);
}

```

{% Codepen {
    user: 'web-dot-dev',
    id: 'JjLJyWx',
    height: 450,
    tab: 'result'
  }
%}

What if a featured card with a banner wiggles for attention?

```html
<li class="card">
  <h2 class="card__title">
    <a href="#">Some Awesome Article</a>
  </h2>
  <p class="card__blurb">Here's a description for this awesome article.</p>
  <small class="card__author">Chrome DevRel</small>
  <img
    class="card__media"
    alt=""
    width="400"
    height="400"
    src="./team-awesome.png"
  />
  <div class="card__banner"></div>
</li>

```

```css
.card:has(.card__banner) {
  --color: var(--green-3-hsl);
  animation: wiggle 6s infinite;
}

```

{% Codepen {
    user: 'web-dot-dev',
    id: 'dymRzvB',
    height: 450,
    tab: 'result'
  }
%}

So many possibilities.


### Forms

How about forms? They're known for being tricky to style. One such example of this is styling inputs and their labels. How do we signal that a field is valid for example? With `:has()`, this gets much easier. We can hook into the relevant form pseudo-classes, for example  `:valid` and `:invalid`.

```html
<div class="form-group">
  <label for="email" class="form-label">Email</label>
  <input
    required
    type="email"
    id="email"
    class="form-input"
    title="Enter valid email address"
    placeholder="Enter valid email address"
  />   
</div
```
```css
label {
  color: var(--color);
}
input {
  border: 4px solid var(--color);
}

.form-group:has(:invalid) {
  --color: var(--invalid);
}

.form-group:has(:focus) {
  --color: var(--focus);
}

.form-group:has(:valid) {
  --color: var(--valid);
}

.form-group:has(:placeholder-shown) {
  --color: var(--blur);
}

```

Try it out in this example: Try entering valid and invalid values and taking the focus on and off.

{% Codepen {
    user: 'web-dot-dev',
    id: 'OJvgjmX',
    height: 450,
    tab: 'result'
  }
%}

You could also use `:has()` to show and hide the error message for a field. Take our “email” field group and add an error message to it.

```html
<div class="form-group">
  <label for="email" class="form-label">
    Email
  </label>
  <div class="form-group__input">
    <input
      required
      type="email"
      id="email"
      class="form-input"
      title="Enter valid email address"
      placeholder="Enter valid email address"
    />   
    <div class="form-group__error">Enter a valid email address</div>
  </div>
</div>

```

By default, you hide the error message.

```css
.form-group__error {
  display: none;
}
```

But when the field becomes `:invalid` and isn’t focussed, you can show the message without the need for extra class names.

```css
.form-group:has(:invalid:not(:focus)) .form-group__error {
  display: block;
}
```

{% Codepen {
    user: 'web-dot-dev',
    id: 'WNzOEjj',
    height: 450,
    tab: 'result'
  }
%}

No reason you couldn't add a tasteful dash of whimsy for when your users interact with your form. Consider this example. Watch when you enter a valid value for the micro-interaction. An `:invalid` value will cause the form group to shake. But, only if the user has no motion preferences.

{% Codepen {
    user: 'web-dot-dev',
    id: 'ZExyJKx',
    height: 450,
    tab: 'result'
  }
%}


### Content

We touched upon this in the code examples. But, how could you use `:has()` in your document flow? It throws up ideas about how we could style typography around media for example. 

```css
figure:not(:has(figcaption)) {
  float: left;
  margin: var(--size-fluid-2) var(--size-fluid-2) var(--size-fluid-2) 0;
}

figure:has(figcaption) {
  width: 100%;
  margin: var(--size-fluid-4) 0;
}

figure:has(figcaption) img {
  width: 100%;
}

```

This example contains figures. When they have no `figcaption`, they float within the content. When a `figcaption` is present, they occupy full width and get extra margin.

{% Codepen {
    user: 'web-dot-dev',
    id: 'abYwyWQ',
    height: 450,
    tab: 'result'
  }
%}


### Reacting to State

How about making your styles reactive to some state in our markup. Consider an example with the "classic" sliding nav bar. If you have a button that toggles opening the nav, it may use the `aria-expanded` attribute. JavaScript could be used to update the appropriate attributes. When `aria-expanded` is `true`, use `:has()` to detect this and update the styles for the sliding nav. JavaScript does its part and CSS can do what it wants with that information. No need to shuffle the markup around or add extra class names, etc. (Note: This isn’t a production ready example).

```css
:root:has([aria-expanded="true"]) {
    --open: 1;
}
body {
    transform: translateX(calc(var(--open, 0) * -200px));
}
```

{% Codepen {
    user: 'web-dot-dev',
    id: 'YzaQxQK',
    height: 450,
    tab: 'result'
  }
%}


{% Aside %}
We aren't adding a "Light dismiss" for the menu here. This would need implementing. But, with `popup`, we will get features like this for free. Check [this demo](https://codepen.io/web-dot-dev/pen/KKoQRmY) out in Chrome Canary to see how the new "popup" attribute could help simplify things.
{% endAside %}


## Can :has help to avoid user error?

What do all these examples have in common? Aside from the fact they show ways to use `:has()`, none of them required modifying class names. They each inserted new content and updated an attribute. This is a great benefit of `:has()`, in that it can help mitigate user error. With `:has()` CSS is able to take on the responsibility of adjusting to modifications in the DOM. You don't need to juggle class names in JavaScript, creating less potential for developer error. We've all been there when we typo a class name and have to resort to keeping them in `Object` lookups.

It's an interesting thought and does it lead us towards cleaner markup and less code? Less JavaScript as we aren't doing as many JavaScript adjustments. Less HTML as you no longer need classes like `card card--has-media`, etc.


## Thinking outside the box

As mentioned above, `:has()` encourages you to break the mental model. It's an opportunity to try different things. One such way to try and push the boundaries is by making game mechanics with CSS alone. You could create a step based mechanic with forms and CSS for example.

```html
<div class="step">
  <label for="step--1">1</label>
  <input id="step--1" type="checkbox" />
</div>
<div class="step">
  <label for="step--2">2</label>
  <input id="step--2" type="checkbox" />
</div>
```

```css
.step:has(:checked), .step:first-of-type:has(:checked) {
  --hue: 10;
  opacity: 0.2;
}


.step:has(:checked) + .step:not(.step:has(:checked)) {
  --hue: 210;
  opacity: 1;
}

```

{% Codepen {
    user: 'web-dot-dev',
    id: 'BarZdZL',
    height: 450,
    tab: 'result'
  }
%}

And that opens up interesting possibilities. You could use that to traverse a form with transforms. Note, this demo is best viewed in a separate browser tab.

{% Codepen {
    user: 'web-dot-dev',
    id: 'QWmgMgg',
    height: 450,
    tab: 'result'
  }
%}

And for fun, how about the classic buzz wire game? The mechanic is easier to create with `:has()`. If the wire gets hovered over, the game is over. Yes, we can create some of these game mechanics with things like the sibling [combinators](https://web.dev/learn/css/selectors/#combinators) (`+` and `~`). But, `:has()` is a way to achieve those same results without having to use interesting markup "tricks". Note, this demo is best viewed in a separate browser tab.

{% Codepen {
    user: 'web-dot-dev',
    id: 'rNdwzwK',
    height: 450,
    tab: 'result'
  }
%}

Although you won’t be dropping these into production any time soon, they highlight ways in which you can use the primitive. Such as being able to chain a `:has()`.

```css
:root:has(#start:checked):has(.game__success:hover, .screen--win:hover)
.screen--win {
  --display-win: 1;
}

```
{% Aside %}
These examples show some interesting things enabled by `:has()`. However, any new feature of the platform needs careful assessment in terms of potential accessibility issues, especially where interaction is concerned.
{% endAside %}


## Performance and limitations

Before we go, what can't you do with `:has()`? There are some restrictions with `:has()`. The main ones arise due to the performance hits.

- You can't `:has()` a `:has()`. But you can chain a `:has()`.
```css
:has(.a:has(.b)) { … }
```
- No pseudo element usage within `:has()`
```css
:has(::after) { … }
:has(::first-letter) { … }
```
- Restrict use of `:has()` inside pseudos accepting only compound selectors
```css
::slotted(:has(.a)) { … }
:host(:has(.a)) { … }
:host-context(:has(.a)) { … }
::cue(:has(.a)) { … }
```
- Restrict use of `:has()` after pseudo element
```css
 ::part(foo):has(:focus) { … }
```
- Use of `:visited` will always be false
```css
:has(:visited) { … }
```

For actual performance metrics related to `:has()`, check out this [Glitch](https://has-pseudo-class-performance.glitch.me/). Credit to Byungwoo for sharing these insights and details around the implementation.


## That’s it!

Get ready for `:has()`. Tell your friends about it and share this post, it’s going to be a game changer for how we approach CSS.

All the demos are available in this [CodePen colllection](https://codepen.io/collection/xKzYaq).


