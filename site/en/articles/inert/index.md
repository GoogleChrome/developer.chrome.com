---
layout: 'layouts/blog-post.njk'
title: 'Introducing inert'
authors:
  - emmatwersky
description: >
  The inert property is a global HTML attribute that simplifies how to remove and restore user input events for an element, including focus events and events from assistive technologies. In Chromium 102, inert is available by default for developers.
date: 2022-04-28
hero: image/dQwiPAoChjTYzXYCNg6U6Tsnr3x1/1LbX307KtYGNK9lthN5V.jpg
alt: A sloth hanging out in a tree.
---

The `inert` property is a global HTML attribute that simplifies how to remove and restore user input events for an element, including focus events and events from assistive technologies. 

Inert is a default behavior in [dialog](https://developer.mozilla.org/docs/Web/HTML/Element/dialog) elements, such as when you use `showModal` to open a dialog for users to make a selection and then dismiss it from the screen. In new browser versions, the `inert` attribute is available to bring similar accessible experiences to custom UI elements and interactions more granularly.

In Chromium 102, `inert` is available by default for developers.

_Inert_ means lacking the ability to move, so when you mark something inert, you remove movement or interaction from those DOM elements.

```html
<div>
  <label for="button1">Button 1</label>
  <button id="button1">I am not inert</button>
</div>
<div inert>
  <label for="button2">Button 2</label>
  <button id="button2">I am inert</button>
</div>
```

Here, `inert` has been declared on the second `<div>` element containing “button2”, so all content contained within this `<div>`, including the button and label, cannot receive focus or be clicked. 

The introduction of `inert` is especially useful for focus trapping and accessibility considerations.

## Better accessibility

The Web Content Accessibility Guidelines require focus management and a sensible, usable [focus order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html). This includes both discoverability and interactivity. Previously, discoverability could be suppressed with `aria-hidden="true"`, but interactivity is more difficult.

`inert` gives developers the ability to remove an element from the tab order, and from the accessibility tree. This allows you to control both discoverability and interactivity, and enables the ability to build more usable and accessible patterns.

There are two major use cases for applying `inert` to an element to enable better accessibility:

- When an element is a part of the DOM tree, but offscreen or hidden.
- When an element is a part of the DOM tree, but should be non-interactive.

### Addressing offscreen or hidden DOM elements

One common accessibility concern is with elements like a drawer, which add elements to the DOM that are not always visible to the user. With `inert` you can ensure that while the drawer sub elements are offscreen, a keyboard user cannot accidentally interact with it.

{% Codepen {
  user: 'web-dot-dev',
  id: 'popXQye',
  tab: 'result'
} %}

### Addressing non-interactive DOM elements

Another common accessibility concern is when a UI design is visible or partially visible, but clearly non-interactive. This could be during page load, while a form is submitting, or if a dialog overlay is open, for example.

To provide the best experience for users, indicate the state of the UI and "trap" the focus to the part of the page that is interactive.

#### Focus trapping

Focus trapping is a central concept of good UI accessibility. You should ensure that screen reader focus is on interactive UI elements and aware when an element is blocking interactivity. This also helps limit rogue screen readers from reaching behind a page overlay, or accidentally submitting a form while the first submission is still processing.

Using `inert`, you can ensure that the only discoverable content is reachable. This is helpful for:

- Blocking elements such as a modal dialog, focus-trapping menu, or side nav.
- A carousel with non-active items.
- Non-applicable form content (for example, fading out and disabling the "Shipping address" fields when the "Same as billing address" checkbox has been checked).
- Disabling the entire UI while in an inconsistent state.

In a dialog, we can mark the page `inert` except for the open dialog to ensure that screen readers and interactions are limited to the open modal. 

{% Codepen {
  user: 'web-dot-dev',
  id: 'oNprQMR',
  tab: 'result'
} %}

## Visually indicate `inert` elements

By default, there is no visual indication of a subtree being inert. It is recommended that you clearly mark what parts of the DOM are active and which are inert. 

```css
[inert], [inert] * {
  opacity: 0.5;
  pointer-events: none;
  cursor: default;
  user-select: none;
}
```

Not all users can see all parts of a page at once. For example, users of screen readers, small devices, or with magnifiers, and even users just using particularly small windows might not be able to see the active part of a page, and may get frustrated if inert sections are not obviously inert. For individual controls, the disabled attribute is probably more appropriate.

{% Codepen {
  user: 'web-dot-dev',
  id: 'ZEvdmmo',
  tab: 'result'
} %}

## What interactions and movement are blocked?

By default, `inert` blocks focus and click events. For assistive technologies, this also blocks tabbing and discoverability. The browser may also ignore page search and text selection in the element. 

The default value of `inert` is false.
