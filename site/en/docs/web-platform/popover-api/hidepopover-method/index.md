---
layout: 'layouts/doc-post.njk'
title: hidePopover()
description: Dismisses a popover.
subhead: Dismisses a popover.
authors:
  - chrisdavidmills
  - jheyy
date: 2022-10-19
updated: 2023-01-25
---

The **`hidePopover()`** instance method of the [`Element`](https://developer.mozilla.org/docs/Web/API/Element) interface dismisses a [popover](/docs/web-platform/popover-api/) element.

## Syntax

```js
hidePopover()
```

### Parameters

None.

### Return value

Void.

### Exceptions

`NotSupportedError` [`DOMException`](https://developer.mozilla.org/docs/Web/API/DOMException)
: Thrown if `hidePopover()` is called on an element that does not have a valid value of the [`popover`](/docs/web-platform/popover-api/popover-attribute) attribute set on it.

`InvalidStateError` [`DOMException`](https://developer.mozilla.org/docs/Web/API/DOMException)
: Thrown if `hidePopover()` is called on a valid popover that is not currently showing.

## Example

```js
const popover = document.getElementById('my-popover');
popover.showPopOver(); // needs to be shown first

  ...

popover.hidePopover();
```

## Browser compatibility

* The Popover API is planned for launch in Chrome 110, available in stable in early February 2023 (check the [Chrome Roadmap](https://chromestatus.com/roadmap) for updates).
* It is enabled by default in [Chrome Canary](https://www.google.com/chrome/canary/) for local testing.  
* Register for the [Origin Trial](/origintrials/#/view_trial/4500221927649968129) if you want to test it in a production environment. Read [Getting started with Chrome's origin trials](/docs/web-platform/origin-trials/) for more information.
* There is a polyfill available at [https://github.com/oddbird/popup-polyfill](https://github.com/oddbird/popup-polyfill).

## See also

* [The Popover API](/docs/web-platform/popover-api/)
* [Pop-ups: They're making a resurgence!](/blog/pop-ups-theyre-making-a-resurgence/), by Jhey Tompkins
* [Chrome Platform Status: The Popover API](https://chromestatus.com/feature/5463833265045504) 
* [Open UI: Popover API Explainer](https://open-ui.org/components/popover.research.explainer)