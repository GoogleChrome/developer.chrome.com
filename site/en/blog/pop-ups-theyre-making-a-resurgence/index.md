---
layout: "layouts/blog-post.njk"
title: "Pop-ups: They're making a resurgence!"
description: "A problematic pattern made much easier with new built-in APIs coming to the platform."
authors:
  - jheyy
hero: "image/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/IHKBRzh99EIGik54PRhu.jpg"
alt: "Low angle photo of pink and orange balloons"
tags:
  - css
  - html
date: 2022-09-13
last_updated: 2023-01-25
is_outdated: true
---

{% Aside 'caution' %}
The Open UI initiative resolved to change the attribute from `popup` to `popover` for the Popover API on [October 27, 2022](https://github.com/openui/open-ui/issues/627).
This [change request](https://chromium-review.googlesource.com/c/chromium/src/+/3991667) was merged into Chromium on [November 3, 2022](https://chromium-review.googlesource.com/c/chromium/src/+/3991667). References have been updated to make use of the new `popover` naming convention.
{% endAside %}

The goal of the [Open UI initiative](https://open-ui.org/) is to make it easier for developers to make great user experiences. To do this, we are trying to tackle the more problematic patterns that developers face. We can do this by providing better platform built-in APIs and components.

One such problem area is pop-ups, described in Open UI as "Popovers".

Popovers have had a rather polarizing reputation for a long time. This is, in part, due to the way they get both built and deployed. They're not an easy pattern to build well, but they can yield a lot of value by directing users to certain things, or making them aware of the content on your site—especially when used in a tasteful manner.

There are often two major concerns when building popovers:

- How to make sure it gets placed above the rest of your content in an appropriate place.
- How to make it accessible (keyboard friendly, focusable, and so on).

The built-in Popover API has a [variety of goals](https://open-ui.org/components/popover.research.explainer#goals), all with the same overarching goal of making it easy for developers to build this pattern. Notable of those goals are:

- Make it easy to display an element and its descendants above the rest of the document.
- Make it accessible.
- Not require JavaScript for most common behaviors  (light dismiss, singleton, stacking, and so on).

You can check out the full spec for pop-ups on the [OpenUI site](https://open-ui.org/components/popover.research.explainer).

## Browser compatibility

Where can you use the built-in Popover API now? It's supported in Chrome Canary behind the "Experimental web platform features" flag at the time of writing.

To enable that flag, open Chrome Canary and visit `chrome://flags`. Then enable the "Experimental web platform features" flag.

There is an [Origin Trial](/origintrials/#/view_trial/4500221927649968129) too for developers that would like to test this out in a production environment.

Lastly, there is a [polyfill](https://github.com/oddbird/popup-polyfill) under development for the API. Be sure to check out the repo at [github.com/oddbird/popup-polyfill](https://github.com/oddbird/popup-polyfill).

You can check for pop-up support with:

```js
const supported = HTMLElement.prototype.hasOwnProperty("popover");
```

## Current solutions

What can you currently do to promote your content above everything else? If it's supported in your browser, you could use the [HTML Dialog element](https://developer.mozilla.org/docs/Web/HTML/Element/dialog). You'd need to use it in "Modal" form. And this requires JavaScript to use.

```js
Dialog.showModal();
```

There are some accessibility considerations. It's advised to use [a11y-dialog](https://a11y-dialog.netlify.app/) for example if catering for users of Safari below version 15.4.

You could also use one of the many popover, alert, or tooltip based libraries out there. Many of these tend to work in a similar way.

- Append some container to the body for showing popovers.
- Style it so that it sits above everything else.
- Create an element and append it to the container to show a popover.
- Hide it by removing the popover element from the DOM.

This requires an extra dependency and more decisions for developers. It also requires research to find an offering that provides everything you need. The Popover API aims to cater for many scenarios including tooltips. The goal being to cover all those common scenarios, saving developers from having to make yet another decision so they can focus on building their experiences.

## Your first pop-up

This is all you need.

```js
<div id="my-first-popover" popover>Popover Content!</div>
<button popovertoggletarget="my-first-popover">Toggle Popover</button>
```

{% Codepen {
    user: 'web-dot-dev',
    id: 'qBowZXP',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/9v0oPLhQUYkitHgE2Ns0.mp4"
  }
%}

But, what is happening here?

- You don’t have to put the popover element into a container or anything—it's hidden by default.
- You don’t have to write any JavaScript to make it appear. That gets handled by the `popovertoggletarget` attribute.
- When it appears, it gets promoted to the top layer. That means it gets promoted above the `document` in the viewport. You don’t have to manage `z-index` or worry about where your popover is in the DOM. It could be deep down nested in the DOM, with clipping ancestors. You can also see which elements are currently in the top layer through DevTools. For more on the top layer, [check out this article](/blog/what-is-the-top-layer/).

![GIF of DevTools top layer support being demonstrated](https://wd.imgix.net/image/1D9D0Ls1ATa2ZPA9x2ZWrGFyZzT2/36Yck7O77zDipSNGNNbB.gif?auto=format&w=1600
)

- You get "Light Dismiss" out of the box. By that, we mean you can close the popover with a close signal, such as clicking outside the popover, keyboard-navigating to another element, or pressing the **Esc** key. Open it up again and try it out!

What else do you get with popover? Let's take the example further. Consider this demo with some content on the page.

{% Codepen {
    user: 'web-dot-dev',
    id: 'GRxLZYe',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/aZtRNylbFkLDkLr3PiLs.mp4"
  }
%}

That floating action button has fixed positioning with a high `z-index`.

```css
.fab {
  position: fixed;
  z-index: 99999;
}
```

{% Aside %}
The floating action button could also be a popover. But, here we are showing off the power of having access to the top layer. More on floating action buttons as popovers later.
{% endAside %}

The popover content is nested in the DOM, but when you open the popover, it gets promoted above that fixed position element. You don’t need to set any styles.

You may also notice that the popover now has a `::backdrop` pseudo-element. All elements that are in the top layer get a styleable `::backdrop` pseudo-element. This example  styles `::backdrop` with a reduced alpha background color and a backdrop filter, which  blurs out the underlying content.

{% Aside %}
By default, the `::backdrop` on a popover has `pointer-events: none` set.
{% endAside %}


## Styling a popover

Let's turn our attention to styling the popover. By default, a popover has a fixed position and some applied padding. It also has `display: none`. You could override this to show a popover. But, that wouldn't promote it to the top layer.

```css
[popover] { display: block; }
```

{% Codepen {
    user: 'web-dot-dev',
    id: 'ZExZOpX',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/u2i7C6POVKE67wdjoZBK.mp4"
  }
%}

<!-- Removed until v2 of the Popover API -->
<!-- If you want a popover to be shown on load, you can use the `defaultopen` attribute.

```html
<div popover defaultopen id=”pop”>Popover content!</div>
```

{% Codepen {
    user: 'web-dot-dev',
    id: 'KKoYMmm',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/IuseCtWYY3PzX1KJJRaZ.mp4"
  }
%} -->

Regardless of how you promote your popover, once you promote a popover to the top layer, you may need to lay it out or position it. You can't target the top layer and do something like

```css
:open {
  display: grid;
  place-items: center;
}
```

By default, a popover will lay out in the center of the viewport using `margin: auto`. But, in some cases, you may want to be explicit about positioning. For example:

```css
[popover] {
  top: 50%;
  left: 50%;
  translate: -50%;
}
```

If you want to lay out content inside your popover using CSS grid or flexbox, it might be wise to wrap this in an element. Otherwise, you'll need to declare a separate rule that changes the `display` once the popover is in the top layer. Setting it by default would have it shown by default overriding `display: none`.

```css
[popover]:open {
 display: flex;
}
```

{% Aside %}
You could also use your root popover element as a container that fills the viewport too. Then use that to lay out content inside the top layer.
{% endAside %}

{% Codepen {
    user: 'web-dot-dev',
    id: 'LYdvRGE',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/xEH6wMbhZyvwUXE4y06l.mp4"
  }
%}

If you tried that demo out, you'll notice that the popover is now transitioning in and out. You can transition popovers in and out by using the `:open` pseudo-selector. The `:open` pseudo-selector matches popovers that are showing (and therefore in the top layer).

{% Aside %}
To check whether an element is open with JavaScript, use:
`element.matches(':open')`. Note that this may change as the spec evolves.
{% endAside %}

This example uses a custom property to drive the transition. And you can apply a transition to the popover’s `::backdrop` too.

```css
[popover] {
  --hide: 1;
  transition: transform 0.2s;
  transform: translateY(calc(var(--hide) * -100vh))
            scale(calc(1 - var(--hide)));
}

[popover]::backdrop {
  transition: opacity 0.2s;
  opacity: calc(1 - var(--hide, 1));
}

[popover]:open,
[popover]:open::backdrop  {
  --hide: 0;
}
```

A tip here is to group transitions and animations under a media query for motion. This can help to maintain your timings too. This is because you can't share values between the `popover` and the `::backdrop` via custom property.

```css
@media(prefers-reduced-motion: no-preference) {
  [popover] { transition: transform 0.2s; }
  [popover]::backdrop { transition: opacity 0.2s; }
}
```

Up until this point, you've seen the use of `popovertoggletarget` to show a popover. To dismiss it, we're using "Light dismiss". But, you also get `popovershowtarget` and `popoverhidetarget` attributes you can use. Let's add a button to a popover that hides it and change the toggle button to use `popovershowtarget`.

```html
<div id="code-popover" popover>
  <button popoverhidetarget="code-popover">Hide Code</button>
</div>
<button popovershowtarget="code-popover">Reveal Code</button>
```

{% Codepen {
    user: 'web-dot-dev',
    id: 'mdxgEqy',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/NbC6trJxnq3VeCetns8x.mp4"
  }
%}


{% Aside %}
You may also notice that the transition in and out has changed. It's now powered by separate animations to enter from one side and exit on the other. This means you can do things like enter on one axis and exit on another. Make sure you set `animation-fill-mode` if your `::backdrop` and `[popover]` timings are different.
{% endAside %}

As mentioned earlier, the Popover API covers more than only our historical notion of pop-ups. You could build for all types of scenarios such as notifications, menus, tooltips etc.

Some of those scenarios need different interaction patterns. Interactions like hover. The use of a `popoverhovertarget` attribute was experimented with but isn't currently implemented.

{% Aside %}
You can get involved with the discussion about hover interactions for pop-ups [here](https://github.com/openui/open-ui/issues/526).
{% endAside %}


```html
<div popoverhovertarget="hover-popover">Hover for Code</div>
```

The idea being that you hover an element to show the target. This behavior could get configured via CSS properties. These CSS properties would define the window of time for hovering on and off an element that a popover reacts to. The default behavior experimented with had a popover show after an explicit `0.5s` of `:hover`. Then it would need a light dismiss or the opening of another popover to dismiss (More on this coming up). This was due to the popover hide duration being set to `Infinity`.

{% Aside ‘warning' %}
The use of `popoverhovertarget` is something __not__ standardized or currently implemented.
{% endAside %}


In the meantime, you could use JavaScript to polyfill that functionality.

```js
let hoverTimer;
const HOVER_TRIGGERS = document.querySelectorAll("[popoverhovertarget]");
const tearDown = () => {
  if (hoverTimer) clearTimeout(hoverTimer);
};
HOVER_TRIGGERS.forEach((trigger) => {
  const popover = document.querySelector(
    `#${trigger.getAttribute("popoverhovertarget")}`
  );
  trigger.addEventListener("pointerenter", () => {
    hoverTimer = setTimeout(() => {
      if (!popover.matches(":open")) popover.showPopOver();
    }, 500);
    trigger.addEventListener("pointerleave", tearDown);
  });
});
```

The benefit of setting something an explicit hover window is that it ensures the user’s action is intentional (for example, a user passes their pointer over a target). We don't want to show the pop-up unless that is their intention.

Try out this demo where you can hover the target with the window set to `0.5s`.

{% Codepen {
    user: 'web-dot-dev',
    id: 'jOzRMVK',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/OrK7xnTNTnVgxDhyMdlL.mp4"
  }
%}

---

Before exploring some common use cases and examples, let’s go over a few things.

---


## Types of popover

We've covered non-JavaScript interaction behavior. But what about popover behavior as a whole. What if you don't want "Light dismiss"? Or you want to apply a singleton pattern to your popovers?

The Popover API allows you to specify three types of popover which differ in behavior.

`[popover=auto]/[popover]`:
- Nesting support. This doesn't only mean nested in the DOM either. The definition of an ancestral popover is one that is:
  - related by DOM position (child).
  - related by triggering attributes on child elements such as `popovertoggletarget`, `popovershowtarget`, and so on.
  - related by the `anchor` attribute (Under development CSS Anchoring API).
- Light dismiss.
- Opening dismisses other popovers that are not [ancestral popovers](https://open-ui.org/components/popover.research.explainer#nearest-open-ancestral-popover). Have a play with the demo below that highlights how nesting with ancestral popovers works. See how changing some of the `popoverhidetarget`/`popovershowtarget` instances to `popovertoggletarget` changes things.
- Light dismissing one dismisses all, but dismissing one in the stack only dismisses those above it in the stack.

{% Codepen {
    user: 'web-dot-dev',
    id: 'XWEQjRL',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/fNTiTFOzvNCnyrndJXPf.mp4"
  }
%}

{% Aside 'caution' %}
A third type of popover using `popover=hint` was previously implemented for use cases such as tool tips. It was resolved on [October 13, 2022](https://github.com/openui/open-ui/issues/617), to move this to a second version of the implementation.
{% endAside %}

<!-- Removed until v2 of the Popover API -->
<!-- `[popup=hint]`
- Singleton. Can only show one pop-up of type hint at a time. Other pop-up types remain open. Check out the demo below. Even though there are ancestral pop-ups, they’re dismissed when a different pop-up gets shown.
- Light dismiss.
- Can’t be shown by default with `defaultopen`.

{% Codepen {
    user: 'web-dot-dev',
    id: 'ExEJgvY',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/JOhSvvJKY3J0YYrQHNq0.mp4"
  }
%} -->

`[popover=manual]`
- Doesn't close other popovers.
- No light dismiss.
- Requires explicit dismiss via trigger element or JavaScript.

{% Codepen {
    user: 'web-dot-dev',
    id: 'OJvGRxO',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/tm4gE8y7VggCVZNKVlHb.mp4"
  }
%}

## JavaScript API

When you need more control over your popovers, you can approach things with JavaScript. You get both a `showPopover` and `hidePopover` method. You also have `popovershow` and `popoverhide` events to listen for:

Show a popover
```js
popoverElement.showPopover()
```
Hide a popover:

```js
popoverElement.hidePopover()
```
Listen for a popover being shown:

```js
popoverElement.addEventListener('popovershow', doSomethingWhenPopoverShows)
```
Listen for a popover being shown and cancel it being shown:

```js
popoverElement.addEventListener('popovershow',event => {
  event.preventDefault();
  console.warn(‘We blocked a popover from being shown’);
})
```
Listen for a popover being hidden:

```js
popoverElement.addEventListener('popoverhide', doSomethingWhenPopoverHides)
```
You can't cancel a popover being hidden:

```js
popoverElement.addEventListener('popoverhide',event => {
  event.preventDefault();
  console.warn("You aren't allowed to cancel the hiding of a popover");
})
```
Check whether a popover is in the top layer:

```js
popoverElement.matches(':open')
```
This provides extra power for some less common scenarios. For example, show a popover after a period of inactivity.

This demo has popovers with audible pops, so we'll need JavaScript to play the audio. On click, we are hiding the popover, playing the audio, and then showing it again.

{% Codepen {
    user: 'web-dot-dev',
    id: 'OJvGRzz',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/ktev8qjvfHh7OftQ2kY9.mp4"
  }
%}

## Accessibility

Accessibility is at the forefront of thinking with the Popover API. Accessibility mappings associate the popover with its trigger element, as needed. This means you don't need to declare `aria-*` attributes such as `aria-haspopup`, assuming you use one of the triggering attributes like `popovertoggletarget`.

For focus management, you can use the autofocus attribute to move focus to an element inside a popover. This is the same as for a Dialog, but the difference comes when returning focus, and that's because of light dismiss. In most cases, closing a popover returns focus to the previously focused element. But focus gets moved to a clicked element on light dismiss, if it can get focus. Check out the [section about focus management](https://open-ui.org/components/popover.research.explainer#focus-management) in the explainer.


{% Codepen {
    user: 'web-dot-dev',
    id: 'GRxLjxM',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/PFRetrvfpKIzamADSxGN.mp4"
  }
%}

You'll need to open the "[full screen version](https://codepen.io/web-dot-dev/full/GRxLjxM)" of this demo to see it work.

In this demo, the focussed element gets a green outline. Try tabbing around the interface with your keyboard. Note where the focus gets returned when a popover gets closed. You may also notice that if you tabbed about, the popover closed. That's by design. Although popovers have focus management, they don't trap focus. And keyboard navigation identifies a close signal when the focus moves out of the popover.


## Anchoring (under development)

When it comes to popovers, a tricky pattern to cater for is anchoring the element to its trigger. For example, if a tooltip is set to show above its trigger but the document gets scrolled. That tooltip could get cut off by the viewport. There are current JavaScript offerings to deal with this such as "[Floating UI](https://floating-ui.com/)". They will reposition the tooltip for you to stop this happening and rely on a desired position order.


But, we want you to be able to define this with your styles. There is a companion API under development alongside the Popover API to tackle this. The "[CSS Anchor Positioning](https://drafts.csswg.org/css-anchor-1/)" API will allow you to tether elements to other elements, and it will do this in a manner that re-positions elements so that they aren't cut off by the viewport.

This demo uses the Anchoring API in its current state. The position of the boat responds to the anchor's position in the viewport.

{% Codepen {
    user: 'web-dot-dev',
    id: 'RwywJJr',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/IDGKq82jfm205AB3gAhR.mp4"
  }
%}

Here's a snippet of the CSS making this demo work. No JavaScript required.

```css
.anchor {
  --anchor-name: --anchor;
}
.anchored {
  position: absolute;
  position-fallback: --compass;
}
@position-fallback --compass {
  @try {
    bottom: anchor(--anchor top);
    left: anchor(--anchor right);
  }
  @try {
    top: anchor(--anchor bottom);
    left: anchor(--anchor right);
  }
}
```

You can check out the [spec here](https://drafts.csswg.org/css-anchor-1/). There will also be a polyfill for this API.


## Examples

Now you’re familiar with what popover has to offer and how, let’s dig into some examples.

### Notifications

This demo shows a "Copy to clipboard" notification.

- Uses `[popover=manual]`.
- On action show popover with `showPopover`.
- After a `2000ms` timeout, hide it with `hidePopover`.

{% Codepen {
    user: 'web-dot-dev',
    id: 'JjLVvJj',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/mAzX3rXnYGQcEZ8pMJ0a.mp4"
  }
%}

### Toasts

This demo uses the top layer to show toast style notifications.

- One popover with type `manual` acts as the container.
- New notifications are appended to the popover and the popover is shown.
- They're removed with the web animations API on click and removed from the DOM.
- If there are no toasts to show, the popover is hidden.

{% Codepen {
    user: 'web-dot-dev',
    id: 'xxWeQjy',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/NAWYyeoxfx8ZYaP6Ra19.mp4"
  }
%}

### Nested menu

This demo shows how a nested navigation menu could work.

- Use `[popover=auto]` as it allows nested popovers.
- Use `autofocus` on the first link of each dropdown in order to keyboard navigate.
- This is a perfect candidate for the CSS Anchoring API. But, for this demo you can use a small amount of JavaScript to update the positions using custom properties.

```js
const ANCHOR = (anchor, anchored) => () => {
  const { top, bottom, left, right } = anchor.getBoundingClientRect();
  anchored.style.setProperty("--top", top);
  anchored.style.setProperty("--right", right);
  anchored.style.setProperty("--bottom", bottom);
  anchored.style.setProperty("--left", left);
};

PRODUCTS_MENU.addEventListener("popovershow", ANCHOR(PRODUCT_TARGET, PRODUCTS_MENU));
````

Remember, because this demo uses `autofocus`, it will need to be opened in "[full screen view](https://codepen.io/web-dot-dev/full/WNJNVBr)" for keyboard navigation.

{% Codepen {
    user: 'web-dot-dev',
    id: 'WNJNVBr',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/37R1rw2Q36JYPHDzeg0u.mp4"
  }
%}

### Media popover

This demo shows how you might pop media up.

- Uses `[popover=auto]` for light dismiss.
- JavaScript listens for the video's `play` event and pops the video up.
- The popovers `popoverhide` event pauses the video.

{% Codepen {
    user: 'web-dot-dev',
    id: 'VwxYZZg',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/00J6agKtb6F0hQHqzT1h.mp4"
  }
%}

### Wiki style popovers

This demos shows how you might create inline content tooltips that contain media.

- Uses `[popover=auto]`. Showing one hides the others because they are not ancestral.
- Shown on `pointerenter` with JavaScript.
- Another perfect candidate for the CSS Anchoring API.

{% Codepen {
    user: 'web-dot-dev',
    id: 'GRdgKgV',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/a02RVUTQIzTt8IzAFQU5.mp4"
  }
%}


### Navigation Drawer

This demo creates a navigation drawer using a popover.

- Uses `[popover=auto]` for light dismiss.
- Uses `autofocus` to focus the first navigation item.

{% Codepen {
    user: 'web-dot-dev',
    id: 'dyePbXr',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/Jt1a8npf9LSo6SGSvhgv.mp4"
  }
%}

### Managing backdrops

This demo shows how you might manage backdrops for mutliple popovers where you only want one `::backdrop` to be visible.

- Use JavaScript to maintain a list of the popovers that are visible.
- Apply a class name to the lowest popover in the top layer.

{% Codepen {
    user: 'web-dot-dev',
    id: 'QWrwLdp',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/ftbCjSLOjAJ669qJK9ur.mp4"
  }
%}

### Custom cursor popover

This demo shows how to use `popover` to promote a `canvas` to the top layer and use it to show a custom cursor.

- Promote `canvas` to top layer with `showPopover` and `[popover=manual]`.
- When other popovers are opened, hide and show the `canvas` popover to make sure it's on top.

{% Codepen {
    user: 'web-dot-dev',
    id: 'poVvzer',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/puMGGAKrwQkbpeBxOj4d.mp4"
  }
%}

### Actionsheet popover

This demo shows how you could use a popover as an actionsheet.

- Have the popover shown by default overriding `display`.
- Actionsheet is opened with the popover trigger.
- When the popover is shown, it is promoted to the top layer and translated into view.
- Light dismiss can be used to return it.

{% Codepen {
    user: 'web-dot-dev',
    id: 'yLjyBbz',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/Aj5p20t8eUdBq0LpAUzl.mp4"
  }
%}

### Keyboard activated popover

This demo shows how you could use popover for command palette style UI.

- Use **cmd + j** to show the popover.
- The `input` is focused with `autofocus`.
- The combo box is a second `popover` positioned under the main input.
- Light dismiss closes the palette if the dropdown is not present.
- Another candidate for the Anchoring API

{% Codepen {
    user: 'web-dot-dev',
    id: 'jOxENww',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/YZYZwDE0PQB9Qte16F7R.mp4"
  }
%}

### Timed popover

This demo shows an inactivity popover after four seconds. A UI pattern often used in apps that hold secure information about a user to show a logout modal.

- Use JavaScript to show the popover after a period of inactivity.
- On popover show, reset the timer.

{% Codepen {
    user: 'web-dot-dev',
    id: 'QWrwLMv',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/64Y6icmuQmhGebvG4UtF.mp4"
  }
%}

### Screensaver

Similar to the previous demo, you could add a dash of whimsy to your site and add a screensaver.

- Use JavaScript to show the popover after a period of inactivity.
- Light dismiss to hide and reset the timer.

{% Codepen {
    user: 'web-dot-dev',
    id: 'JjvoPrx',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/p0s3yxsRWfIiSM33IBuG.mp4"
  }
%}

### Caret follow

This demo shows how you could have a popover follow an input caret.

- Show the popover based on selection, key event, or special character input.
- Use JavaScript to update the popover position with scoped custom properties.
- This pattern would require considerate thought towards content being shown and accessibility.
- It's often seen in text editing UI and apps where you can tag.

{% Codepen {
    user: 'web-dot-dev',
    id: 'oNdgvoR',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/7OiDVe9iMuc3b9hmihWQ.mp4"
  }
%}

### Floating action button menu

This demo shows how you could use popover to implement a floating action button menu without JavaScript.

- Promote a `manual` type popover with the `showPopover` method. This is the main button.
- The menu is another popover that is the target of the main button.
- Menu is opened with `popovertoggletarget`.
- Use `autofocus` to focus the first menu item on show.
- Light dismiss closes the menu.
- The icon twist uses `:has()`. You can read more about `:has()` in [this article](/blog/has-m105/).

{% Codepen {
    user: 'web-dot-dev',
    id: 'PoewYRz',
    height: 450,
    tab: 'result'
  }
%}

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/aHLaTobx48u08uA5NU4E.mp4"
  }
%}

## That's it!

So, that’s an intro to popover, coming down the road as part of the Open UI initiative. Used sensibly, it’s going to be a fantastic addition to the web platform.

Be sure to check out [Open UI](https://open-ui.org). The [popover explainer](https://open-ui.org/components/popover.research.explainer/) is kept up to date as the API evolves. And here's [the collection](https://codepen.io/collection/vBJmGx) for all the demos.

Thanks for “popping” by!

---

_Photo by [Madison Oren](https://unsplash.com/ja/@artbyhybrid) on [Unsplash](https://unsplash.com/s/photos/balloons)_
