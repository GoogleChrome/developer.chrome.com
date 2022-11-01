---
layout: 'layouts/doc-post.njk'
title: showPopUp()
description: Shows a pop-up.
subhead: Shows a pop-up.
authors:
  - chrisdavidmills
date: 2022-10-19
updated: 2022-10-19
---

The **`showPopUp()`** instance method of the [`Element`](https://developer.mozilla.org/docs/Web/API/Element) interface shows a [pop-up](/docs/web-platform/popup-api/) element.

## Syntax

```js
showPopUp()
```

### Parameters

None.

### Return value

Void.

### Exceptions

`NotSupportedError` [`DOMException`](https://developer.mozilla.org/docs/Web/API/DOMException)
: Thrown if `showPopUp()` is called on an element that does not have a valid value of the [`popup`](/docs/web-platform/popup-api/popup-attribute) attribute set on it.

`InvalidStateError` [`DOMException`](https://developer.mozilla.org/docs/Web/API/DOMException)
: Thrown if `showPopUp()` is called on a valid pop-up that is already shown.

`InvalidStateError` [`DOMException`](https://developer.mozilla.org/docs/Web/API/DOMException)
: Thrown if `showPopUp()` is called on a valid pop-up that is not connected to a document.

## Example

```js
const popup = document.getElementById('my-popup');
popup.showPopUp();
```

## Browser compatibility

* The Pop-Up API is planned for launch in Chrome 110, available in stable in early February 2023 (check the [Chrome Roadmap](https://chromestatus.com/roadmap) for updates).
* It is enabled by default in [Chrome Canary](https://www.google.com/chrome/canary/) for local testing.  
* Register for the [Origin Trial](/origintrials/#/view_trial/4500221927649968129) if you want to test it in a production environment. Read [Getting started with Chrome's origin trials](/docs/web-platform/origin-trials/) for more information.
* There is a polyfill available at [https://github.com/oddbird/popup-polyfill](https://github.com/oddbird/popup-polyfill).

## See also

* [The Pop-Up API](/docs/web-platform/popup-api/)
* [Pop-ups: They're making a resurgence!](/blog/pop-ups-theyre-making-a-resurgence/), by Jhey Tompkins
* [Chrome Platform Status: The Pop-Up API](https://chromestatus.com/feature/5463833265045504) 
* [Open UI: Pop Up API Explainer](https://open-ui.org/components/popup.research.explainer)