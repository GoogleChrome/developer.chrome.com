---
layout: 'layouts/doc-post.njk'
title: hidePopOver()
description: Dismisses a pop-up.
subhead: Dismisses a pop-up.
authors:
  - chrisdavidmills
  - jheyy
date: 2022-10-19
updated: 2022-11-04
---

The **`hidePopUp()`** instance method of the [`Element`](https://developer.mozilla.org/docs/Web/API/Element) interface dismisses a [pop-up](/docs/web-platform/pop-up-api/) element.

## Syntax

```js
hidePopOver()
```

### Parameters

None.

### Return value

Void.

### Exceptions

`NotSupportedError` [`DOMException`](https://developer.mozilla.org/docs/Web/API/DOMException)
: Thrown if `hidePopOver()` is called on an element that does not have a valid value of the [`popup`](/docs/web-platform/pop-up-api/popover-attribute) attribute set on it.

`InvalidStateError` [`DOMException`](https://developer.mozilla.org/docs/Web/API/DOMException)
: Thrown if `hidePopOver()` is called on a valid pop-up that is not currently showing.

## Example

```js
const popup = document.getElementById('my-popup');
popup.showPopOver(); // needs to be shown first

  ...

popup.hidePopOver();
```

## Browser compatibility

* The Pop-Up API is planned for launch in Chrome 110, available in stable in early February 2023 (check the [Chrome Roadmap](https://chromestatus.com/roadmap) for updates).
* It is enabled by default in [Chrome Canary](https://www.google.com/chrome/canary/) for local testing.  
* Register for the [Origin Trial](/origintrials/#/view_trial/4500221927649968129) if you want to test it in a production environment. Read [Getting started with Chrome's origin trials](/docs/web-platform/origin-trials/) for more information.
* There is a polyfill available at [https://github.com/oddbird/popup-polyfill](https://github.com/oddbird/popup-polyfill).

## See also

* [The Pop-Up API](/docs/web-platform/pop-up-api/)
* [Pop-ups: They're making a resurgence!](/blog/pop-ups-theyre-making-a-resurgence/), by Jhey Tompkins
* [Chrome Platform Status: The Pop-Up API](https://chromestatus.com/feature/5463833265045504) 
* [Open UI: Pop Up API Explainer](https://open-ui.org/components/popup.research.explainer)