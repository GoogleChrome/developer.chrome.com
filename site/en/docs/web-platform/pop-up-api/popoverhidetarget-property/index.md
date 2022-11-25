---
layout: 'layouts/doc-post.njk'
title: popOverHideTarget
description: Creates a trigger element that dismisses an associated shown pop-up.
subhead: Creates a trigger element that dismisses an associated shown pop-up.
authors:
  - chrisdavidmills
  - jheyy
date: 2022-10-19
updated: 2022-11-04
---

The `popOverHideTarget` property of the [`HTMLInputElement`](https://developer.mozilla.org/docs/Web/API/HTMLInputElement) and [`HTMLButtonElement`](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement) interfaces creates a trigger element that dismisses an associated shown [pop-up](/docs/web-platform/pop-up-api/). It is the DOM definition of the HTML [`popoverhidetarget`](/docs/web-platform/pop-up-api/popoverhidetarget-attribute) attribute.

## Value

A string value equal to the ID of the pop-up element that you want to show, to associate the two.

## Example

```js
const popup = document.getElementById('my-popup-btn');

// get
popup.popOverHideTarget;

// set
popup.popOverHideTarget = 'my-popup';
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