---
layout: 'layouts/doc-post.njk'
title: The Pop-Up API
description: The Pop-Up API provides a standard mechanism for displaying pop-ups on the Web.
subhead: The Pop-Up API provides a standard mechanism for displaying pop-ups on the Web.
authors:
  - chrisdavidmills
date: 2022-10-19
updated: 2022-10-19
---

The Pop-Up API provides developers with a standard, consistent, flexible mechanism for displaying pop-up content on top of other page content. Pop-ups can be closed by clicking out of the pop-up or pressing <kbd>Esc</kbd>, and opening another pop-up should close the previous one. Typical use cases include user-interactive elements like action menus, form element suggestions, content pickers, teaching UI, and the Listbox portion of a `<select>` control.

## Current status

* The Pop-Up API is planned for launch in Chrome 110, available in stable in early February 2023 (check the [Chrome Roadmap](https://chromestatus.com/roadmap) for updates).
* It is enabled by default in [Chrome Canary](https://www.google.com/chrome/canary/) for local testing.  
* Register for the [Origin Trial](/origintrials/#/view_trial/4500221927649968129) if you want to test it in a production environment. Read [Getting started with Chrome's origin trials](/docs/web-platform/origin-trials/) for more information.
* There is a polyfill available at [https://github.com/oddbird/popup-polyfill](https://github.com/oddbird/popup-polyfill).

## Concepts and usage

Pop-ups are used constantly, all over the web. Developers keep having to reimplement pop-up styling, positioning and z-index stacking, focus management, keyboard interactions, and accessibility semantics for each new project. As well as duplication of work, this has also resulted in an inconsistent end-user experience across different apps. In answer to this, the [Open UI group](https://open-ui.org/) published a [proposal for the Pop-Up API](https://open-ui.org/components/popup.research.explainer).

Any HTML element can be turned into a pop-up using the [`popup`](/docs/web-platform/popup-api/popup-attribute) attribute. The Pop-Up API provides the following default behavior:

* Pop-ups are hidden by default (using `display: none`). To display a pop-up by default on page load, you can give it the [`defaultopen`](/docs/web-platform/popup-api/defaultopen-attribute) attribute.
* Pop-ups are also given a default fixed position in the center of the viewport, padding, and a border.
* When shown, pop-ups are promoted to the top layer of the DOM (above `document`).
* You can hide a visible pop-up by pressing <kbd>Esc</kbd>, navigating to another element via the keyboard, or clicking outside the pop-up. This is referred to as **light dismissing**.
* When a new pop-up is shown, previously-shown pop-ups are dismissed automatically.
* Popups are designed to be accessible, with an element defined as a pop-up trigger automatically getting [`aria-haspopup`](https://developer.mozilla.org/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup) semantics. In addition, focus into the pop-up can be controlled using `autofocus` and, when the pop-up is light dismissed, a heuristic determines where focus should go next. For example, focus could go back to the previously-focused element, or an element clicked outside of the pop-up. See [Focus Management](https://open-ui.org/components/popup.research.explainer#focus-management) for more details.

{% Aside 'key-term' %}
A _pop-up trigger_ is an element that causes a change in the state of the pop-up it is associated with, for example a `<button>` that shows and dismisses the pop-up.
{% endAside %}

The [`popup`](/docs/web-platform/popup-api/popup-attribute) attribute can take one of the following values:

* `auto`: The pop-up exhibits the standard behavior explained above.
* `hint`: You can only show a single `hint` type pop-up at a time. They can be light dismissed, but they can't be shown by default using [`defaultopen`](/docs/web-platform/popup-api/defaultopen-attribute).
* `manual`: Manual pop-ups cannot be light dismissed (they can only be dismissed by an explicit trigger element or by JavaScript), and they don't automatically dismiss previously-shown pop-ups.

You can show and dismiss pop-ups in two different ways:

* Declaratively, using HTML attributes. Add the [`popuptoggletarget`](/docs/web-platform/popup-api/popuptoggletarget-attribute), [`popupshowtarget`](/docs/web-platform/popup-api/popupshowtarget-attribute), or [`popuphidetarget`](/docs/web-platform/popup-api/popuphidetarget-attribute) to an `<input>` or `<button>` element to turn it into a pop-up trigger element. In each case, the attribute value must be the `id` of the pop-up, to associate the two.
* Programmatically, using JavaScript. The [`showPopUp()`](/docs/web-platform/popup-api/showpopup-method) and [`hidePopUp()`](/docs/web-platform/popup-api/hidepopup-method) methods are used to show and dismiss pop-ups, respectively, and the [`popupshow`](/docs/web-platform/popup-api/popupshow-event) and [`popuphide`](/docs/web-platform/popup-api/popuphide-event) events can be used to react to pop-ups being shown or hidden.

The Pop-Up API also comes with a couple of handy CSS features, a [`::backdrop`](/docs/web-platform/popup-api/backdrop-pseudo-element) pseudo-element to style the document behind the pop-up when it is shown (for example, you might want to blur or fade the page while showing pop-ups), and an [`:open`](/docs/web-platform/popup-api/open-pseudo-class) pseudo-class to style the pop-up only when it is open.

## HTML attributes

[`defaultopen`](/docs/web-platform/popup-api/defaultopen-attribute)
: Causes a pop-up to automatically open on page load.

[`popup`](/docs/web-platform/popup-api/popup-attribute)
: Turns an element into a pop-up.

[`popuptoggletarget`](/docs/web-platform/popup-api/popuptoggletarget-attribute)
: Creates a trigger element that toggles an associated pop-up between shown and hidden states.

[`popupshowtarget`](/docs/web-platform/popup-api/popupshowtarget-attribute)
: Creates a trigger element that shows an associated hidden pop-up.

[`popuphidetarget`](/docs/web-platform/popup-api/popuphidetarget-attribute)
: Creates a trigger element that dismisses an associated shown pop-up.

## CSS features

[`::backdrop`](/docs/web-platform/popup-api/backdrop-pseudo-element)
: Pseudo-element that sits behind an open pop-up in the stacking order, but in front of the rest of the document, and spans the entire width and height of the viewport. Allows the rest of the content to be styled while the pop-up is open—for example you might want to blur or darken it.

[`:open`](/docs/web-platform/popup-api/open-pseudo-class)
: Pseudo-class allowing a pop-up to be styled, but only when it is being shown.

## Interfaces

### Extensions to `Element`

Properties:

[`defaultOpen`](/docs/web-platform/popup-api/defaultopen-property)
: Causes a pop-up to automatically open on page load. DOM definition of the HTML [`defaultopen`](/docs/web-platform/popup-api/defaultopen-attribute) attribute.

[`popUp`](/docs/web-platform/popup-api/popup-property)
: Turns an element into a pop-up. DOM definition of the HTML [`popup`](/docs/web-platform/popup-api/popup-attribute) attribute.

`onpopupshow`
: Event handler property for the [`popupshow`](/docs/web-platform/popup-api/popupshow-event) event, fired on the pop-up when it is shown.

`onpopuphide`
: Event handler property for the [`popuphide`](/docs/web-platform/popup-api/popuphide-event) event, fired on the pop-up when it is dismissed.

Instance methods:

[`showPopUp()`](/docs/web-platform/popup-api/showpopup-method)
: Shows a pop-up element.

[`hidePopUp()`](/docs/web-platform/popup-api/hidepopup-method)
: Dismisses a pop-up element.

Events:

[`popupshow`](/docs/web-platform/popup-api/popupshow-event)
: Fired on the pop-up when it is shown.

[`popuphide`](/docs/web-platform/popup-api/popuphide-event)
: Fired on the pop-up when it is dismissed.

### Extensions to `HTMLButtonElement` and `HTMLInputElement`

Properties:

[`popUpToggleTarget`](/docs/web-platform/popup-api/popuptoggletarget-property)
: Creates a trigger element that toggles an associated pop-up between shown and hidden states. DOM definition of the HTML [`popuptoggletarget`](/docs/web-platform/popup-api/popuptoggletarget-attribute) attribute.

[`popUpShowTarget`](/docs/web-platform/popup-api/popupshowtarget-property)
: Creates a trigger element that shows an associated hidden pop-up. DOM definition of the HTML [`popupshowtarget`](/docs/web-platform/popup-api/popupshowtarget-attribute) attribute.

[`popUpHideTarget`](/docs/web-platform/popup-api/popuphidetarget-property)
: Creates a trigger element that dismisses an associated shown pop-up. DOM definition of the HTML [`popuphidetarget`](/docs/web-platform/popup-api/popuphidetarget-attribute) attribute.

## Examples

{% Aside %}
This section shows basic usage of the API; for more substantial code including numerous complete examples, check out [Pop-ups: They're making a resurgence!](/blog/pop-ups-theyre-making-a-resurgence/) by Jhey Tompkins.
{% endAside %}

Declaratively create different types of pop-up. The first two are equivalent:

```html
<p id="my-popup" popup>Hello!</p>
<p id="my-popup" popup="auto">Hello!</p>
<p id="my-popup" popup="hint">Hello!</p>
<p id="my-popup" popup="manual">Hello!</p>
```

Specify that a pop-up should open automatically on page load with [`defaultopen`](/docs/web-platform/popup-api/defaultopen-attribute):

```html
<p id="my-popup" popup="auto" defaultopen>Hello!</p>
```

{% Aside 'caution' %}
[`defaultopen`](/docs/web-platform/popup-api/defaultopen-attribute) does not work with pop-ups of type `hint`.
{% endAside %}

Declaratively create buttons to show and hide the pop-up:

```html
<button popupshowtarget="my-popup">Show pop-up</button>
<button popuphidetarget="my-popup">Dismiss pop-up</button>
```

Declaratively create a single button to toggle the pop-up between shown and hidden states:

```html
<button popuptoggletarget="my-popup">Show pop-up</button>
```

Use the [`:open`](/docs/web-platform/popup-api/open-pseudo-class) pseudo-class to style the pop-up when it has been shown. The following example transitions the pop-up in from the bottom of the viewport, rather than have it appear in the center:

```css
p[popup] {
  transform: translateY(60vh);
}

p[popup]:open {
  transition: transform 0.6s;
  transform: translateY(0vh);
}
```

Use the [`::backdrop`](/docs/web-platform/popup-api/backdrop-pseudo-element) pseudo-element to style the document behind the pop-up while it is being shown. The following example darkens the rest of the content:

```css
p[popup]::backdrop {
  background-color: rgba(0,0,0,0.5);
}
```

Use JavaScript to programmatically show and hide pop-ups:

```js
  popup.showPopUp();
  popup.hidePopUp();
```

Use event listeners to respond to pop-ups being shown and hidden. The following example switches the `textContent` of the pop-up trigger button so that it makes sense when the pop-up is in its shown and hidden states:

```js
  popup.addEventListener('popupshow', () => {
    popupToggleBtn.textContent = 'Dismiss pop-up';
  })

  popup.addEventListener('popuphide', () => {
    popupToggleBtn.textContent = 'Show pop-up';
  })
```

## Feedback

Your feedback on the API is welcome. [Send an email](mailto:public-open-ui@w3.org) to the Open UI group, or go to their [Getting Involved](https://open-ui.org/get-involved) page to learn about other ways to ask questions and contribute. 

## See also

* [Pop-ups: They're making a resurgence!](/blog/pop-ups-theyre-making-a-resurgence/), by Jhey Tompkins
* [Chrome Platform Status: The Pop-Up API](https://chromestatus.com/feature/5463833265045504) 
* [Open UI: Pop-Up API Explainer](https://open-ui.org/components/popup.research.explainer)