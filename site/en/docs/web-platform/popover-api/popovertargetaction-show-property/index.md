---
layout: 'layouts/doc-post.njk'
title: popovertargetaction="show"
description: Creates a trigger element that shows an associated hidden popover.
subhead: Creates a trigger element that shows an associated hidden popover.
authors:
  - chrisdavidmills
  - jheyy
date: 2022-10-19
updated: 2023-01-25
---

The **`popovertargetaction="show"`** property of the [`HTMLInputElement`](https://developer.mozilla.org/docs/Web/API/HTMLInputElement) and [`HTMLButtonElement`](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement) interfaces creates a trigger element that shows an associated hidden [popover](/docs/web-platform/popover-api/). It is the DOM definition of the HTML [`popovershowtarget`](/docs/web-platform/popover-api/popovershowtarget-attribute) attribute.

## Value

A string value equal to the ID of the popover element that you want to show, to associate the two.

## Example

```js
const popover = document.getElementById('my-popover-btn');

// get
popover.popoverShowTarget;

// set
popover.popoverShowTarget = 'my-popover';
```

## Browser compatibility

* The Popover API is planned for launch in Chrome 114, available in stable in early May 2023 (check the [Chrome Roadmap](https://chromestatus.com/roadmap) for updates).
* It is enabled by default in [Chrome Canary](https://www.google.com/chrome/canary/) for local testing.
* Register for the [Origin Trial](/origintrials/#/view_trial/4500221927649968129) if you want to test it in a production environment. Read [Getting started with Chrome's origin trials](/docs/web-platform/origin-trials/) for more information.
* There is a polyfill available at [https://github.com/oddbird/popup-polyfill](https://github.com/oddbird/popup-polyfill).

## See also

* [The Popover API](/docs/web-platform/popover-api/)
* [Pop-ups: They're making a resurgence!](/blog/pop-ups-theyre-making-a-resurgence/), by Jhey Tompkins
* [Chrome Platform Status: The Popover API](https://chromestatus.com/feature/5463833265045504)
* [Open UI: Popover API Explainer](https://open-ui.org/components/popover.research.explainer)
