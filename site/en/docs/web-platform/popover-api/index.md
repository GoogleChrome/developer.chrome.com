---
layout: 'layouts/doc-post.njk'
title: The Popover API
description: The Popover API provides a standard mechanism for displaying popovers on the Web.
subhead: The Popover API provides a standard mechanism for displaying popovers on the Web.
authors:
  - chrisdavidmills
  - jheyy
date: 2022-10-19
updated: 2023-01-25
---

The Popover API provides developers with a standard, consistent, flexible mechanism for displaying popover content on top of other page content. Popovers can be light dismissed with a close signal. Close signals include closing by clicking out of the popover or pressing <kbd>Esc</kbd>, and opening other [non-ancestral popovers](https://open-ui.org/components/popover.research.explainer#nearest-open-ancestral-popover). Typical use cases include user-interactive elements like action menus, form element suggestions, content pickers, teaching UI, and the Listbox portion of a `<select>` control.

## Current status

* The Popover API is planned for launch in Chrome 114, available in stable in early May 2023 (check the [Chrome Roadmap](https://chromestatus.com/roadmap) for updates).
* It is enabled by default in [Chrome Canary](https://www.google.com/chrome/canary/) for local testing.
* Register for the [Origin Trial](/origintrials/#/view_trial/4500221927649968129) if you want to test it in a production environment. Read [Getting started with Chrome's origin trials](/docs/web-platform/origin-trials/) for more information.
* There is a polyfill available at [https://github.com/oddbird/popup-polyfill](https://github.com/oddbird/popup-polyfill).

## Concepts and usage

Popovers are used constantly, all over the web. Developers keep having to reimplement popover styling, positioning and z-index stacking, focus management, keyboard interactions, and accessibility semantics for each new project. As well as duplication of work, this has also resulted in an inconsistent end-user experience across different apps. In answer to this, the [Open UI group](https://open-ui.org/) published a [proposal for the Popover API](https://open-ui.org/components/popover.research.explainer).

Any HTML element can be turned into a popover using the [`popover`](/docs/web-platform/popover-api/popover-attribute) attribute. The Popover API provides the following default behavior:

* Popovers are hidden by default (using `display: none`).
* Popovers are also given a default fixed position in the center of the viewport, padding, and a border.
* When shown, popovers are promoted to the [top layer](/blog/what-is-the-top-layer/) (above `document` and outside of `document` flow).
* Popovers have light dismiss. By that, we mean you can close the popover with a close signal, such as clicking outside the popover, keyboard-navigating to another element, or pressing the Esc key.
* Popovers are designed to be accessible, with an element defined as a popover trigger automatically getting [`aria-haspopup`](https://developer.mozilla.org/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup) semantics. In addition, focus into the popover can be controlled using `autofocus` and, when the popover is light dismissed, a heuristic determines where focus should go next. For example, focus could go back to the previously-focused element, or an element clicked outside of the popover. See [Focus Management](https://open-ui.org/components/popover.research.explainer#focus-management) for more details.
* Opening a popover dismisses other popovers that are not [ancestral popovers](https://open-ui.org/components/popover.research.explainer#nearest-open-ancestral-popover).

{% Aside 'key-term' %}
A _popover trigger_ is an element that causes a change in the state of the popover it is associated with, for example a `<button>` that shows and dismisses the popover.
{% endAside %}

The [`popover`](/docs/web-platform/popover-api/popover-attribute) attribute can take one of the following values:

* `auto`: The popover exhibits the standard behavior explained above.
* `manual`: Manual popovers cannot be light dismissed (they can only be dismissed by an explicit trigger element or by JavaScript), and they don't automatically dismiss previously-shown popovers.

You can show and dismiss popovers in two different ways:

* Declaratively, using HTML attributes. Add the [`popovertargetaction="toggle"`](/docs/web-platform/popover-api/popovertoggletarget-attribute), [`popovertargetaction="show"`](/docs/web-platform/popover-api/popovershowtarget-attribute), or [`popovertargetaction="hide"`](/docs/web-platform/popover-api/popoverhidetarget-attribute) to an `<input>` or `<button>` element to turn it into a popover trigger element. In each case, the attribute value must be the `id` of the popover, to associate the two.
* Programmatically, using JavaScript. The [`showPopover()`](/docs/web-platform/popover-api/showpopover-method) and [`hidePopover()`](/docs/web-platform/popover-api/hidepopover-method) methods are used to show and dismiss popovers, respectively, and the [`popovershow`](/docs/web-platform/popover-api/popovershow-event) and [`popoverhide`](/docs/web-platform/popover-api/popoverhide-event) events can be used to react to popovers being shown or hidden.

The Popover API also comes with a couple of handy CSS features, a [`::backdrop`](/docs/web-platform/popover-api/backdrop-pseudo-element) pseudo-element to style the document behind the popover when it is shown (for example, you might want to blur or fade the page while showing popovers), and an [`:open`](/docs/web-platform/popover-api/open-pseudo-class) pseudo-class to style the popover only when it is open.

## HTML attributes

[`popover`](/docs/web-platform/popover-api/popover-attribute)
: Turns an element into a popover.

[`popoveretargetaction="hide"`](/docs/web-platform/popover-api/popovertoggletarget-attribute)
: Creates a trigger element that toggles an associated popover between shown and hidden states.

[`popovertargetaction="hide"`](/docs/web-platform/popover-api/popovershowtarget-attribute)
: Creates a trigger element that shows an associated hidden popover.

[`popovertargetaction="hide"`](/docs/web-platform/popover-api/popoverhidetarget-attribute)
: Creates a trigger element that dismisses an associated shown popover.

## CSS features

[`::backdrop`](/docs/web-platform/popover-api/backdrop-pseudo-element)
: Pseudo-element that sits behind an open popover in the stacking order, but in front of the rest of the document, and spans the entire width and height of the viewport. Allows the rest of the content to be styled while the popover is open—for example you might want to blur or darken it.

[`:open`](/docs/web-platform/popover-api/open-pseudo-class)
: Pseudo-class allowing a popover to be styled, but only when it is being shown.

## Interfaces

### Extensions to `HTMLElement`

Properties:

[`popover`](/docs/web-platform/popover-api/popover-property)
: Turns an element into a popover. DOM definition of the HTML [`popover`](/docs/web-platform/popover-api/popover-attribute) attribute.

`onpopovershow`
: Event handler property for the [`popovershow`](/docs/web-platform/popover-api/popovershow-event) event, fired on the popover when it is shown.

`onpopoverhide`
: Event handler property for the [`popoverhide`](/docs/web-platform/popover-api/popoverhide-event) event, fired on the popover when it is dismissed.

Instance methods:

[`showPopover()`](/docs/web-platform/popover-api/showpopover-method)
: Shows a popover element.

[`hidePopover()`](/docs/web-platform/popover-api/hidepopover-method)
: Dismisses a popover element.

Events:

[`popovershow`](/docs/web-platform/popover-api/popovershow-event)
: Fired on the popover when it is shown.

[`popoverhide`](/docs/web-platform/popover-api/popoverhide-event)
: Fired on the popover when it is dismissed.

### Extensions to `HTMLButtonElement` and `HTMLInputElement`

Properties:

[`popovertargetaction="toggle"`](/docs/web-platform/popover-api/popovertoggletarget-property)
: Creates a trigger element that toggles an associated popover between shown and hidden states. DOM definition of the HTML [`popovertargetaction="toggle"`](/docs/web-platform/popover-api/popovertoggletarget-attribute) attribute.

[`popovertargetaction="show"`](/docs/web-platform/popover-api/popovershowtarget-property)
: Creates a trigger element that shows an associated hidden popover. DOM definition of the HTML [`popovertargetaction="show"`](/docs/web-platform/popover-api/popovershowtarget-attribute) attribute.

[`popovertargetaction="hide"`](/docs/web-platform/popover-api/popoverhidetarget-property)
: Creates a trigger element that dismisses an associated shown popover. DOM definition of the HTML [`popovertargetaction="hide"`](/docs/web-platform/popover-api/popoverhidetarget-attribute) attribute.

## Examples

{% Aside %}
This section shows basic usage of the API; for more substantial code including numerous complete examples, check out [Pop-ups: They're making a resurgence!](/blog/pop-ups-theyre-making-a-resurgence/) by Jhey Tompkins.
{% endAside %}

Declaratively create different types of popover. The first two are equivalent:

```html
<p id="my-popover" popover>Hello!</p>
<p id="my-popover" popover="auto">Hello!</p>
<p id="my-popover" popover="manual">Hello!</p>
```

Declaratively create buttons to show and hide the popover:

```html
<button popovershowtarget="my-popover">Show popover</button>
<button popoverhidetarget="my-popover">Dismiss popover</button>
```

Declaratively create a single button to toggle the popover between shown and hidden states:

```html
<button popovertoggletarget="my-popover">Show popover</button>
```

Use the [`:open`](/docs/web-platform/popover-api/open-pseudo-class) pseudo-class to style the popover when it has been shown. The following example transitions the popover in from the bottom of the viewport, rather than have it appear in the center:

```css
p[popover] {
  transform: translateY(60vh);
}

p[popover]:open {
  transition: transform 0.6s;
  transform: translateY(0vh);
}
```

Use the [`::backdrop`](/docs/web-platform/popover-api/backdrop-pseudo-element) pseudo-element to style the document behind the popover while it is being shown. The following example darkens the rest of the content:

```css
p[popover]::backdrop {
  background-color: rgba(0,0,0,0.5);
}
```

Use JavaScript to programmatically show and hide popovers:

```js
  popover.showPopover();
  popover.hidePopover();
```

Use event listeners to respond to popovers being shown and hidden. The following example switches the `textContent` of the popover trigger button so that it makes sense when the popover is in its shown and hidden states:

```js
  popover.addEventListener('popovershow', () => {
    popoverToggleBtn.textContent = 'Dismiss popover';
  })

  popover.addEventListener('popoverhide', () => {
    popoverToggleBtn.textContent = 'Show popover';
  })
```

## Feedback

Your feedback on the API is welcome. [Send an email](mailto:public-open-ui@w3.org) to the Open UI group, or go to their [Getting Involved](https://open-ui.org/get-involved) page to learn about other ways to ask questions and contribute.

## See also

* [Pop-ups: They're making a resurgence!](/blog/pop-ups-theyre-making-a-resurgence/), by Jhey Tompkins
* [Chrome Platform Status: The Popover API](https://chromestatus.com/feature/5463833265045504)
* [Open UI: Popover API Explainer](https://open-ui.org/components/popover.research.explainer)
