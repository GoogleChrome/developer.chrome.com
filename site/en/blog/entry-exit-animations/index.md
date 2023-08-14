---
layout: "layouts/blog-post.njk"
title: "Four new CSS features to enable smooth entry and exit animations"
description: "Learn about new capabilities that enable smooth transitioning of discrete animations and between the top layer"
authors:
  - unakravets
tags:
  - css
  - chrome-116
  - chrome-117
date: 2023-08-15
---

Motion is a core part of any digital experience, guiding your user from one interaction to the next. But there are a few gaps in smooth animations on the web platform. These include the ability to to easily animate entry and exit animations, and smoothly animate to and from the top layer for dismissible elements such as dialogs and popovers.

To fill these gaps, Chrome 116 and 117 includes four new web platform features, which enable smooth animations and transitions for discrete properties.

These four new features include:

- The ability to animate `display` and `content-visibility` on a keyframe timeline (From Chrome 116).
- The `transition-behavior` property with the `allow-discrete` keyword to enable transitions of discrete properties like `display` (From Chrome 117).
- The `@starting-style` rule to animate entry effects from `display: none` and into the top-layer (From Chrome 117).
- The `overlay` property to control top-layer behavior during an animation (From Chrome 117).
## Display animations in keyframes

From Chrome 116, you can use `display` and `content-visibility` in keyframe rules. These will then swap at the time the keyframe occurs. No additional new values are required to support this:

```css
.card {
  animation: fade-out 0.5s forwards;
}

@keyframes fade-out {
  100% {
    opacity: 0;
    display: none;
  }
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'qBQeojK',
  tab: 'result'
} %}

<figure>
  {% Video
    src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/obFN6Pkd7Ty0dX6P9DmU.mp4",
    autoplay="true",
    loop="true",
    muted="true",
    controls="true"
  %}
</figure>

{% Aside %}
Other discrete properties switch states at the 50% mark of the transition’s easing function over the course of its duration. However, `display` and `content-visibility`  switch at the beginning of the transition (if you are animating in) or end of the transition (if you are animating out).
{% endAside %}

The preceding example animates the opacity to 0 over the 0.5s duration and then set display to none. Additionally, the `forwards` keyword  ensures that the animation remains at its end state, so that the element it is applied to remains `display: none` and `opacity: 0`.

This is a simple example that mimics what you can do with a transition. Transitions, however, are unable to create more complex animations, such as the following example:

```css
.card {
  animation: spin-and-delete 1s ease-in forwards;
}

@keyframes spin-and-delete {
  0% {
    transform: rotateY(0);
    filter: hue-rotate(0);
  }
  80% {
    transform: rotateY(360deg);
    filter: hue-rotate(180deg);
    opacity: 1;
  }
  100% {
    opacity: 0;
    display: none;
  }
}
```

The `spin-and-delete` animation is an exit animation. First, the card will spin on the y-axis, run through a hue-rotation, and then at `80%` through the timeline, transitions its opacity from 1 to 0. Finally, the card swaps from `display: block` to `display: none`. 

For these exit animations, instead of applying them directly to an element, you can set up a trigger for the animations. For example by attaching an event listener to a button that triggers a class to apply the animation, like so:

```css
.spin-out {
   animation: spin-and-delete 1s ease-in forwards;
}
```

```js 
document.querySelector('.delete-btn').addEventListener('click', () => {
 document.querySelector('.card').classList.add('spin-out');
})
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'GRwVxEa',
  tab: 'result'
} %}

<figure>
  {% Video
    src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/Ts6F4ogBjgHDJngriVQC.mp4",
    autoplay="true",
    loop="true",
    muted="true",
    controls="true"
  %}
</figure>

The example above now has an end-state of `display:none`. There are many cases where you’ll want to take it further and remove the DOM node with a timeout to allow for the animation to finish first.

## Transitioning discrete animations

Unlike when animating discrete properties with keyframes, to transition discrete properties you’ll need to use the `allow-discrete` transition behavior mode.

### The `transition-behavior` property

The `allow-discrete` mode is what makes discrete transitions possible, and is a value of the `transition-behavior` property. `transition-behavior` accepts two values: `normal` and `allow-discrete`. 

```css
.card {
  transition: opacity 0.25s, display 0.25s;
  transition-behavior: allow-discrete; /* Note: be sure to write this after the shorthand */
}

.card.fade-out {
  opacity: 0;
  display: none;
}
```

{% Aside %}
If you are using the transition shorthand, make sure to use `transition-behavior` after the shorthand so that it applies due to specificity.
{% endAside %}

{% Codepen {
  user: 'web-dot-dev',
  id: 'poQMLrN',
  tab: 'result'
} %}

<figure>
  {% Video
    src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/obFN6Pkd7Ty0dX6P9DmU.mp4",
    autoplay="true",
    loop="true",
    muted="true",
    controls="true"
  %}
  <figcaption>Note: This transition demo shows a different technique than the first animation demo but visually looks similar.</figcaption>
</figure>

The `transition` shorthand also sets this value, so you can omit the property and  use the `allow-discrete` keyword at the end of the `transition` shorthand for each transition instead. 

```css
.card {
  transition: opacity 0.5s, display 0.5s allow-discrete;
}

.card.fade-out {
  opacity: 0;
  display: none;
}
```

If you are animating multiple discrete properties, you will need to include `allow-discrete` after each property you would like to animate. For example:

```css
.card {
  transition: opacity 0.5s, display 0.5s allow-discrete, overlay 0.5s allow-discrete;
}

.card.fade-out {
  opacity: 0;
  display: none;
}
```

{% Aside %}
Tip: you can always turn on discrete animations with `* {transition-behavior: allow-discrete}`, but make sure this is at the *end* of your CSS to prevent specificity conflicts with the `transition` shorthand.
{% endAside %}

### The `@starting-style` rule for entry animations

So far, this article has covered exit animations, to create entry animations you need to use the `@starting-style` rule.

Use `@starting-style` to apply a style that the browser can look up before the element is open on the page. This is the “before-open” state (where you are animating in from).

```css
/*  0. BEFORE-OPEN STATE   */
/*  Starting point for the transition */
@starting-style {
  .item {
    opacity: 0;
    height: 0;
  }
}

/*  1. IS-OPEN STATE   */
/*  The state at which the element is open + transition logic */
.item {
  height: 3rem;
  display: grid;
  overflow: hidden;
  transition: opacity 0.5s, transform 0.5s, height 0.5s, display 0.5s allow-discrete;
}

/*  2. EXITING STATE   */
/*  While it is deleting, before DOM removal in JS, apply this
    transformation for height, opacity, and a transform which
    skews the element and moves it to the left before setting
    it to display: none */
.is-deleting {
  opacity: 0;
  height: 0;
  display: none;
  transform: skewX(50deg) translateX(-25vw);
}
```

Now you have both an entry and exit state for these TODO list items:

{% Codepen {
  user: 'web-dot-dev',
  id: 'xxQvWLW',
  tab: 'result'
} %}

<figure>
  {% Video
    src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/wNHNtQ1EzOZViFFHQUvG.mp4",
    autoplay="true",
    loop="true",
    muted="true",
    controls="true"
  %}
</figure>

## Animating elements to and from the top-layer 
To animate elements to and from the top-layer, specify the `@starting-style` on the “open” state to tell the browser where to animate in from. For a dialog, the open state is defined with the `[open]` attribute. For a popover, use the `:popover-open` pseudo class.

 A simple example of a dialog could look like this:

```css
/*   0. BEFORE-OPEN STATE   */
@starting-style {
  dialog[open] {
    translate: 0 100vh;
  }
}

/*   1. IS-OPEN STATE   */
dialog[open] {
  translate: 0 0;
}

/*   2. EXIT STATE   */
dialog {
  transition: translate 0.7s ease-out, overlay 0.7s ease-out allow-discrete, display 0.7s ease-out allow-discrete;
  translate: 0 100vh;
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'dyQxmzg',
  tab: 'result'
} %}

<figure>
  {% Video
    src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/5SEKhWe8XTTRvNkjbZrM.mp4",
    autoplay="true",
    loop="true",
    muted="true",
    controls="true"
  %}
</figure>

With a more complex example, it is neater to write this in a nested style. When animating a popover, use the `:popover-open` pseudo class instead of the `open` attribute used previously.

In this example, the entry and exit effects are different. Enter by animating up from the bottom of the viewport, exit the effect to the top of the viewport.

```css
.settings-popover {
  &:popover-open {
    /*  0. BEFORE-OPEN STATE  */
    /*  Initial state for what we're animating *in* from, 
        in this case: goes from lower (y + 20px) to center  */
    @starting-style {
      transform: translateY(20px);
      opacity: 0;
    }
    
    /*  1. IS-OPEN STATE  */
    /*  state when popover is open, BOTH:
        what we're transitioning *in* to 
        and transitioning *out* from */
    transform: translateY(0);
    opacity: 1;
  }
  
  /*  2. EXIT STATE  */
  /*  Initial state for what we're animating *out* to , 
      in this case: goes from center to (y - 50px) higher */
  transform: translateY(-50px);
  opacity: 0;
  
  /*  Enumerate transitioning properties, 
      including display and allow-discrete mode */
  transition: transform 0.5s, opacity 0.5s, display 0.5s allow-discrete;
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'RwqXMZd',
  height: 500,
  tab: 'result'
} %}

<figure>
  {% Video
    src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/5lJvfe7ViBRFS5TDH242.mp4",
    autoplay="true",
    loop="true",
    muted="true",
    controls="true"
  %}
</figure>

### `overlay` property

Finally, to fade out a `popover` or `dialog` from the top layer, add the `overlay` property to your list of transitions. `popover` and `dialog` escape ancestor clips and transforms, and also put the content in the top layer. If you don't transition `overlay`, your element will immediately go back to being clipped, transformed, and covered up, and you won't see the transition happen.

```css
[open] {
  transition: opacity 1s, display 1s allow-discrete;
}
```

<figure>
  {% Video
    src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/MQjhaebAGteFkYfJryII.mp4",
    autoplay="true",
    loop="true",
    muted="true",
    controls="true"
  %}
</figure>

Instead, include `overlay` in the transition or animation to animate `overlay` along with the rest of the features and ensure it stays in the top layer when animating. This will look much smoother.

```css
[open] {
  transition: opacity 1s, display 1s allow-discrete, overlay 1s allow-discrete;
}
```

<figure>
  {% Video
    src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/EdV4yeOX9mfbwpDQrfkz.mp4",
    autoplay="true",
    loop="true",
    muted="true",
    controls="true"
  %}
</figure>


{% Codepen {
  user: 'web-dot-dev',
  id: 'NWEQYaG',
  tab: 'result'
} %}


Additionally, when you have multiple elements open in the top-layer, overlay helps you control the smooth transition in and out of the top layer. You can see the difference in [this simple example](https://jsfiddle.net/jarhar/r6a5bvnt/). If you are not applying `overlay` to the second popover when transitioning it out, it will first move out of the top layer, jumping behind the other popover, before starting the transition. This isn’t a very smooth effect.

## Conclusion

These four features bring us one step closer to smooth entry and exit animations on the web platform. To learn more, check out these links:

- [Introducing the popover API](/introducing-popover-api/)
- [css-transitions-2 spec](https://drafts.csswg.org/css-transitions-2/#defining-before-change-style-the-starting-style-rule)
- [css-position-4 spec](https://drafts.csswg.org/css-position-4/#overlay)