---
layout: 'layouts/blog-post.njk'
title:  Take control of your scroll - customizing pull-to-refresh and overflow effects
description: >
     Introduction to the CSS overscroll-behavior property.
authors:
    - ericbidelman
    - majidvp
    - sunyunjia
date: 2017-11-14
updated: 2019-08-26
---


## TL;DR 

The [CSS `overscroll-behavior`][spec] property allows developers to override the
browser's default overflow scroll behavior when reaching the top/bottom of
content. Use cases include disabling the pull-to-refresh
feature on mobile, removing overscroll glow and rubberbanding effects,
and preventing page content from scrolling when it's beneath a modal/overlay.

{% Aside 'caution' %}
`overscroll-behavior` requires Chrome 63+. It's in development or being
considered by other browsers. See
[chromestatus.com](https://www.chromestatus.com/feature/5734614437986304) for
more information.
{% endAside %}


## Background

### Scroll boundaries and scroll chaining 

<figure>
    {% Video src="video/T4FyVKpzu4WKF1kBNvXepbi08t52/bzAPS9xrNe1aaGxh7mWe.mp4", autoplay="true", loop="true", muted="true" %}
  <figcaption>Scroll chaining on Chrome Android.</figcaption>
</figure>

Scrolling is one of the most fundamental ways to interact with a page, but
certain UX patterns can be tricky to deal with because of the browser's quirky
default behaviors. As an example, take an app drawer with a large number of
items that the user may have to scroll through. When they reach the bottom, the
overflow container stops scrolling because there's no more content to consume.
In other words, the user
reaches a "scroll boundary". But notice what happens if the user continues to
scroll. **The content *behind* the drawer starts scrolling**! Scrolling is
taken over by the parent container; the main page itself in the example.

Turns out this behavior is called  **scroll chaining**; the browser's default
behavior when scrolling content. Oftentimes the default is pretty nice, but
sometimes it's not desirable or even unexpected. Certain apps may want to
provide a different user experience when the user hits a scroll boundary.

### The pull-to-refresh effect

Pull-to-refresh is an intuitive gesture popularized by mobile apps such as
Facebook and Twitter. Pulling down on a social feed and releasing creates new
space for more recent posts to be loaded. In fact, this particular UX has
become _so popular_ that mobile browsers like Chrome on Android have adopted
the same effect. Swiping down at the top of the page refreshes the entire page:


{% Columns %}

{% Column %}
<figure>
    {% Video src="video/T4FyVKpzu4WKF1kBNvXepbi08t52/TZZBW8YdhuEP7k8aMFrU.mp4", autoplay="true", loop="true", muted="true" %}

<figcaption>
    Twitter's custom pull-to-refresh<br>when refreshing a feed in
    their PWA.
</figcaption>
</figure>
{% endColumn %}

{% Column %}
<figure>
    {% Video src="video/T4FyVKpzu4WKF1kBNvXepbi08t52/e4PXHBeK65xnDtsDMmxB.mp4", autoplay="true", loop="true", muted="true" %}
<figcaption>
    Chrome Android's native pull-to-refresh action<br>refreshes the entire
    page.
</figcaption>
</figure>
{% endColumn %}

{% endColumns %}


For situations like the Twitter [PWA](https://developers.google.com/web/progressive-web-apps/),
it might make sense to disable the native pull-to-refresh action. Why? In this
app, you probably don't want the user accidentally refreshing the page. There's
also the potential to see a double refresh animation! Alternatively, it might
be nicer to customize the browser's action, aligning it more closely to the site's
branding. The unfortunate part is that this type of customization has been
tricky to pull off. Developers end up writing unnecessary JavaScript, add
[non-passive](https://developers.google.com/web/tools/lighthouse/audits/passive-event-listeners)
touch listeners (which block scrolling), or stick the entire page in a 100vw/vh
`<div>` (to prevent the page from overflowing). These workarounds have
[well-documented](https://wicg.github.io/overscroll-behavior/#intro) negative
effects on scrolling performance.

We can do better!

## Introducing `overscroll-behavior`

The `overscroll-behavior` [property][spec] is a new CSS feature that controls
the behavior of what happens when you over-scroll a container (including the
page itself). You can use it to cancel scroll chaining, disable/customize the
pull-to-refresh action, disable rubberbanding effects on iOS (when Safari
implements `overscroll-behavior`), and more.
The best part is that **using `overscroll-behavior` does not adversely affect
page performance** like the hacks mentioned in the intro!

The property takes three possible values:

1. **auto** - Default. Scrolls that originate on the element may propagate to
ancestor elements.
- **contain** - prevents scroll chaining. Scrolls do not propagate to ancestors
but local effects within the node are shown. For example, the overscroll glow
effect on Android or the rubberbanding effect on iOS which notifies the user
when they've hit a scroll boundary. **Note**: using
`overscroll-behavior: contain` on the `html` element prevents overscroll
navigation actions.
- **none** - same as `contain` but it also prevents overscroll effects within
the node itself (e.g. Android overscroll glow or iOS rubberbanding).

{% Aside %}
`overscroll-behavior` also supports shorthands for `overscroll-behavior-x`
and `overscroll-behavior-y` if you only want to define behaviors for a certain
axis.
{% endAside %}

Let's dive into some examples to see how to use `overscroll-behavior`.

## Prevent scrolls from escaping a fixed position element

### The chatbox scenario

<figure>
   {% Video src="video/T4FyVKpzu4WKF1kBNvXepbi08t52/EjhqQ2PZqkvOlxgroNGV.mp4", autoplay="true", loop="true", muted="true" %}
  <figcaption>Content beneath the chat window scrolls too :(</figcaption>
</figure>

Consider a fixed positioned chatbox that sits at the bottom of the page. The
intention is that the chatbox is a self-contained component and that it scrolls
separately from the content behind it. However, because of scroll chaining, the
document starts scrolling as soon as the user hits the last message in the chat
history.

For this app, it's more appropriate to have scrolls that originate within the
chatbox stay within the chat. We can make that happen by adding
`overscroll-behavior: contain` to the element that holds the chat messages:

```css
#chat .msgs {
  overflow: auto;
  overscroll-behavior: contain;
  height: 300px;
}
```

Essentially, we're creating a logical separation between the chatbox's scrolling
context and the main page. The end result is that the main page stays put when
the user reaches the top/bottom of the chat history. Scrolls that start in the
chatbox do not propagate out.

### The page overlay scenario 

Another variation of the "underscroll" scenario is when you see content
scrolling behind a **fixed position overlay**. A dead giveaway
`overscroll-behavior` is in order! The browser is trying to be helpful but
it ends up making the site look buggy.

**Example** - modal with and without `overscroll-behavior: contain`:
{% Columns %}
{% Column %}
<figure>
      {% Video src="video/T4FyVKpzu4WKF1kBNvXepbi08t52/RMKyilF8ijDcZkqWvJjp.mp4", autoplay="true", loop="true", muted="true" %}
    <figcaption>
      <b>Before</b>: page content scrolls beneath overlay.
    </figcaption>
</figure>
{% endColumn %}

{% Column %}
<figure>
  {% Video src="video/T4FyVKpzu4WKF1kBNvXepbi08t52/GiyZQlj25IAZpJN4h2MJ.mp4", autoplay="true", loop="true", muted="true" %}
<figcaption>
    <b>After</b>: page content doesn't scroll beneath overlay.
</figcaption>
</figure>
{% endColumn %}

{% endColumns %}






## Disabling pull-to-refresh 

**Turning off the pull-to-refresh action is a single line of CSS**. Just prevent
scroll chaining on the entire viewport-defining element. In most cases, that's
`<html>` or `<body>`:

```css
body {
  /* Disables pull-to-refresh but allows overscroll glow effects. */
  overscroll-behavior-y: contain;
}
```

With this simple addition, we fix the double pull-to-refresh animations in
the [chatbox demo](https://ebidel.github.io/demos/chatbox.html) and can
instead, implement a custom effect which uses a neater loading animation. The
entire inbox also blurs as the inbox refreshes:
{% Columns %}
{% Column %}
<figure>
   {% Video src="video/T4FyVKpzu4WKF1kBNvXepbi08t52/G8OI677t59aFl0SBOly6.mp4", autoplay="true", loop="true", muted="true" %}
    <figcaption>Before</figcaption>
</figure>
{% endColumn %}

{% Column %}
<figure>
    {% Video src="video/T4FyVKpzu4WKF1kBNvXepbi08t52/AXkYqIa8Px3VGOzECQ5q.mp4", autoplay="true", loop="true", muted="true"  %}
    <figcaption>After</figcaption>
</figure>
{% endColumn %}

{% endColumns %}

Here's a snippet of the
[full code](https://github.com/ebidel/demos/blob/master/chatbox.html):

```html
<style>
  body.refreshing #inbox {
    filter: blur(1px);
    touch-action: none; /* prevent scrolling */
  }
  body.refreshing .refresher {
    transform: translate3d(0,150%,0) scale(1);
    z-index: 1;
  }
  .refresher {
    --refresh-width: 55px;
    pointer-events: none;
    width: var(--refresh-width);
    height: var(--refresh-width);
    border-radius: 50%;
    position: absolute;
    transition: all 300ms cubic-bezier(0,0,0.2,1);
    will-change: transform, opacity;
    ...
  }
</style>

<div class="refresher">
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
</div>

<section id="inbox"><!-- msgs --></section>

<script>
  let _startY;
  const inbox = document.querySelector('#inbox');

  inbox.addEventListener('touchstart', e => {
    _startY = e.touches[0].pageY;
  }, {passive: true});

  inbox.addEventListener('touchmove', e => {
    const y = e.touches[0].pageY;
    // Activate custom pull-to-refresh effects when at the top of the container
    // and user is scrolling up.
    if (document.scrollingElement.scrollTop === 0 && y > _startY &&
        !document.body.classList.contains('refreshing')) {
      // refresh inbox.
    }
  }, {passive: true});
</script>
```

## Disabling overscroll glow and rubberbanding effects

To disable the bounce effect when hitting a scroll boundary, use
`overscroll-behavior-y: none`:

```css
body {
  /* Disables pull-to-refresh and overscroll glow effect.
     Still keeps swipe navigations. */
  overscroll-behavior-y: none;
}
```


{% Columns %}
{% Column %}
<figure>
    {% Video src="video/T4FyVKpzu4WKF1kBNvXepbi08t52/ExCHdCC2Ot07yykjMUjo.mp4", autoplay="true", loop="true", muted="true" %}
    <figcaption>
      <b>Before</b>: hitting scroll boundary shows a glow.
    </figcaption>
</figure>
{% endColumn %}

{% Column %}
<figure>
    {% Video src="video/T4FyVKpzu4WKF1kBNvXepbi08t52/8kB4WKJh5TEYFiA2Ict9.mp4", autoplay="true", loop="true", muted="true" %}
    <figcaption><b>After</b>: glow disabled.</figcaption>
</figure>
{% endColumn %}

{% endColumns %}


{% Aside %}
This will still preserve left/right swipe navigations. To prevent
navigations, you can use `overscroll-behavior-x: none`. However, this is [still
being implemented](https://crbug.com/762023) in Chrome.
{% endAside %}

## Full demo

Putting it all together, the full
[chatbox demo](https://ebidel.github.io/demos/chatbox.html) uses
`overscroll-behavior` to create a custom pull-to-refresh animation
and disable scrolls from escaping the chatbox widget. This provides an optimal
user experience that would have been tricky to achieve without CSS
`overscroll-behavior`.

<figure>
    {% Video src="video/T4FyVKpzu4WKF1kBNvXepbi08t52/4g8jtNsV77BMyEW5f75c.mp4", autoplay="true", loop="true", muted="true" %}
  <figcaption>
    <a href="https://ebidel.github.io/demos/chatbox.html"
       target="_blank">View demo</a> |
    <a href="https://github.com/ebidel/demos/blob/master/chatbox.html"
       target="_blank">Source</a>
  </figcaption>
</figure>


[spec]: https://wicg.github.io/overscroll-behavior/
