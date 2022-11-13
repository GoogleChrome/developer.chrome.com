---
layout: 'layouts/doc-post.njk'
title: The Pop-Up API
description: The Pop-Up API provides a standard mechanism for displaying pop-ups on the Web.
subhead: The Pop-Up API provides a standard mechanism for displaying pop-ups on the Web.
authors:
  - chrisdavidmills
  - jheyy
date: 2022-10-19
updated: 2022-11-04
---

The Pop-Up API provides developers with a standard, consistent, flexible mechanism for displaying pop-up content on top of other page content. Pop-ups can be light dismissed with a close signal. Close signals include closing by clicking out of the pop-up or pressing <kbd>Esc</kbd>, and opening other [non-ancestral pop-ups](https://open-ui.org/components/popup.research.explainer#nearest-open-ancestral-pop-up). Typical use cases include user-interactive elements like action menus, form element suggestions, content pickers, teaching UI, and the Listbox portion of a `<select>` control.

## Current status

* The Pop-Up API is planned for launch in Chrome 110, available in stable in early February 2023 (check the [Chrome Roadmap](https://chromestatus.com/roadmap) for updates).
* It is enabled by default in [Chrome Canary](https://www.google.com/chrome/canary/) for local testing.  
* Register for the [Origin Trial](/origintrials/#/view_trial/4500221927649968129) if you want to test it in a production environment. Read [Getting started with Chrome's origin trials](/docs/web-platform/origin-trials/) for more information.
* There is a polyfill available at [https://github.com/oddbird/popup-polyfill](https://github.com/oddbird/popup-polyfill).

## Concepts and usage

Pop-ups are used constantly, all over the web. Developers keep having to reimplement pop-up styling, positioning and z-index stacking, focus management, keyboard interactions, and accessibility semantics for each new project. As well as duplication of work, this has also resulted in an inconsistent end-user experience across different apps. In answer to this, the [Open UI group](https://open-ui.org/) published a [proposal for the Pop-Up API](https://open-ui.org/components/popup.research.explainer).

Any HTML element can be turned into a pop-up using the [`popover`](/docs/web-platform/pop-up-api/popover-attribute) attribute. The Pop-Up API provides the following default behavior:

* Pop-ups are hidden by default (using `display: none`). To display a pop-up by default on page load, you can give it the [`defaultopen`](/docs/web-platform/pop-up-api/defaultopen-attribute) attribute.
* Pop-ups are also given a default fixed position in the center of the viewport, padding, and a border.
* When shown, pop-ups are promoted to the [top layer](/blog/what-is-the-top-layer/) (above `document` and outside of `document` flow).
* Pop-ups have light dismiss. By that, we mean you can close the pop-up with a close signal, such as clicking outside the pop-up, keyboard-navigating to another element, or pressing the Esc key.
* Popups are designed to be accessible, with an element defined as a pop-up trigger automatically getting [`aria-haspopup`](https://developer.mozilla.org/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup) semantics. In addition, focus into the pop-up can be controlled using `autofocus` and, when the pop-up is light dismissed, a heuristic determines where focus should go next. For example, focus could go back to the previously-focused element, or an element clicked outside of the pop-up. See [Focus Management](https://open-ui.org/components/popup.research.explainer#focus-management) for more details.
* Opening a pop-up dismisses other pop-ups that are not [ancestral pop-ups](https://open-ui.org/components/popup.research.explainer#nearest-open-ancestral-pop-up).

{% Aside 'key-term' %}
A _pop-up trigger_ is an element that causes a change in the state of the pop-up it is associated with, for example a `<button>` that shows and dismisses the pop-up.
{% endAside %}

The [`popover`](/docs/web-platform/pop-up-api/popover-attribute) attribute can take one of the following values:

* `auto`: The pop-up exhibits the standard behavior explained above.
* `manual`: Manual pop-ups cannot be light dismissed (they can only be dismissed by an explicit trigger element or by JavaScript), and they don't automatically dismiss previously-shown pop-ups.

You can show and dismiss pop-ups in two different ways:

* Declaratively, using HTML attributes. Add the [`popovertoggletarget`](/docs/web-platform/pop-up-api/popovertoggletarget-attribute), [`popovershowtarget`](/docs/web-platform/pop-up-api/popovershowtarget-attribute), or [`popoverhidetarget`](/docs/web-platform/pop-up-api/popoverhidetarget-attribute) to an `<input>` or `<button>` element to turn it into a pop-up trigger element. In each case, the attribute value must be the `id` of the pop-up, to associate the two.
* Programmatically, using JavaScript. The [`showPopOver()`](/docs/web-platform/pop-up-api/showpopover-method) and [`hidePopOver()`](/docs/web-platform/pop-up-api/hidepopover-method) methods are used to show and dismiss pop-ups, respectively, and the [`popovershow`](/docs/web-platform/pop-up-api/popovershow-event) and [`popoverhide`](/docs/web-platform/pop-up-api/pop-uphide-event) events can be used to react to pop-ups being shown or hidden.

The Pop-Up API also comes with a couple of handy CSS features, a [`::backdrop`](/docs/web-platform/pop-up-api/backdrop-pseudo-element) pseudo-element to style the document behind the pop-up when it is shown (for example, you might want to blur or fade the page while showing pop-ups), and an [`:open`](/docs/web-platform/pop-up-api/open-pseudo-class) pseudo-class to style the pop-up only when it is open.

## HTML attributes

[`defaultopen`](/docs/web-platform/pop-up-api/defaultopen-attribute)
: Causes a pop-up to automatically open on page load.

[`popover`](/docs/web-platform/pop-up-api/popover-attribute)
: Turns an element into a pop-up.

[`popovertoggletarget`](/docs/web-platform/pop-up-api/popovertoggletarget-attribute)
: Creates a trigger element that toggles an associated pop-up between shown and hidden states.

[`popovershowtarget`](/docs/web-platform/pop-up-api/popovershowtarget-attribute)
: Creates a trigger element that shows an associated hidden pop-up.

[`popoverhidetarget`](/docs/web-platform/pop-up-api/popoverhidetarget-attribute)
: Creates a trigger element that dismisses an associated shown pop-up.

## CSS features

[`::backdrop`](/docs/web-platform/pop-up-api/backdrop-pseudo-element)
: Pseudo-element that sits behind an open pop-up in the stacking order, but in front of the rest of the document, and spans the entire width and height of the viewport. Allows the rest of the content to be styled while the pop-up is open—for example you might want to blur or darken it.

[`:open`](/docs/web-platform/pop-up-api/open-pseudo-class)
: Pseudo-class allowing a pop-up to be styled, but only when it is being shown.

## Interfaces

### Extensions to `Element`

Properties:

[`defaultOpen`](/docs/web-platform/pop-up-api/defaultopen-property)
: Causes a pop-up to automatically open on page load. DOM definition of the HTML [`defaultopen`](/docs/web-platform/pop-up-api/defaultopen-attribute) attribute.

[`popOver`](/docs/web-platform/pop-up-api/popover-property)
: Turns an element into a pop-up. DOM definition of the HTML [`popover`](/docs/web-platform/pop-up-api/popover-attribute) attribute.

`onpopovershow`
: Event handler property for the [`popovershow`](/docs/web-platform/pop-up-api/popovershow-event) event, fired on the pop-up when it is shown.

`onpopoverhide`
: Event handler property for the [`popoverhide`](/docs/web-platform/pop-up-api/popoverhide-event) event, fired on the pop-up when it is dismissed.

Instance methods:

[`showPopOver()`](/docs/web-platform/pop-up-api/showpopover-method)
: Shows a pop-up element.

[`hidePopOver()`](/docs/web-platform/pop-up-api/hidepopover-method)
: Dismisses a pop-up element.

Events:

[`popovershow`](/docs/web-platform/pop-up-api/popovershow-event)
: Fired on the pop-up when it is shown.

[`popoverhide`](/docs/web-platform/pop-up-api/popoverhide-event)
: Fired on the pop-up when it is dismissed.

### Extensions to `HTMLButtonElement` and `HTMLInputElement`

Properties:

[`popOverToggleTarget`](/docs/web-platform/pop-up-api/popovertoggletarget-property)
: Creates a trigger element that toggles an associated pop-up between shown and hidden states. DOM definition of the HTML [`popovertoggletarget`](/docs/web-platform/pop-up-api/popovertoggletarget-attribute) attribute.

[`popOverShowTarget`](/docs/web-platform/pop-up-api/popovershowtarget-property)
: Creates a trigger element that shows an associated hidden pop-up. DOM definition of the HTML [`popovershowtarget`](/docs/web-platform/pop-up-api/popovershowtarget-attribute) attribute.

[`popOverHideTarget`](/docs/web-platform/pop-up-api/popoverhidetarget-property)
: Creates a trigger element that dismisses an associated shown pop-up. DOM definition of the HTML [`popoverhidetarget`](/docs/web-platform/pop-up-api/popoverhidetarget-attribute) attribute.

## Examples

{% Aside %}
This section shows basic usage of the API; for more substantial code including numerous complete examples, check out [Pop-ups: They're making a resurgence!](/blog/pop-ups-theyre-making-a-resurgence/) by Jhey Tompkins.
{% endAside %}

Declaratively create different types of pop-up. The first two are equivalent:

```html
<p id="my-popup" popup>Hello!</p>
<p id="my-popup" popup="auto">Hello!</p>
<p id="my-popup" popup="manual">Hello!</p>
```

Specify that a pop-up should open automatically on page load with [`defaultopen`](/docs/web-platform/pop-up-api/defaultopen-attribute):

```html
<p id="my-popup" popover="auto" defaultopen>Hello!</p>
```

Declaratively create buttons to show and hide the pop-up:

```html
<button popovershowtarget="my-popup">Show pop-up</button>
<button popoverhidetarget="my-popup">Dismiss pop-up</button>
```

Declaratively create a single button to toggle the pop-up between shown and hidden states:

```html
<button popovertoggletarget="my-popup">Show pop-up</button>
```

Use the [`:open`](/docs/web-platform/pop-up-api/open-pseudo-class) pseudo-class to style the pop-up when it has been shown. The following example transitions the pop-up in from the bottom of the viewport, rather than have it appear in the center:

```css
p[popover] {
  transform: translateY(60vh);
}

p[popover]:open {
  transition: transform 0.6s;
  transform: translateY(0vh);
}
```

Use the [`::backdrop`](/docs/web-platform/pop-up-api/backdrop-pseudo-element) pseudo-element to style the document behind the pop-up while it is being shown. The following example darkens the rest of the content:

```css
p[popover]::backdrop {
  background-color: rgba(0,0,0,0.5);
}
```

Use JavaScript to programmatically show and hide pop-ups:

```js
  popup.showPopOver();
  popup.hidePopOver();
```

Use event listeners to respond to pop-ups being shown and hidden. The following example switches the `textContent` of the pop-up trigger button so that it makes sense when the pop-up is in its shown and hidden states:

```js
  popup.addEventListener('popovershow', () => {
    popupToggleBtn.textContent = 'Dismiss pop-up';
  })

  popup.addEventListener('popoverhide', () => {
    popupToggleBtn.textContent = 'Show pop-up';
  })
```

## Feedback

Your feedback on the API is welcome. [Send an email](mailto:public-open-ui@w3.org) to the Open UI group, or go to their [Getting Involved](https://open-ui.org/get-involved) page to learn about other ways to ask questions and contribute. 

## See also

* [Pop-ups: They're making a resurgence!](/blog/pop-ups-theyre-making-a-resurgence/), by Jhey Tompkins
* [Chrome Platform Status: The Pop-Up API](https://chromestatus.com/feature/5463833265045504) 
* [Open UI: Pop-Up API Explainer](https://open-ui.org/components/popup.research.explainer)