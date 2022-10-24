---
layout: 'layouts/doc-post.njk'
title: "Element: popupshow event"
description: Fired on the pop-up when it is shown.
subhead: Fired on the pop-up when it is shown.
authors:
  - chrisdavidmills
date: 2022-10-19
updated: 2022-10-19
---

The `popupshow` event of the [`Element`](https://developer.mozilla.org/docs/Web/API/Element) interface fires on a [pop-up](/docs/web-platform/popup-api/) element when it is shown.

## Syntax

Use the event name in methods like [`addEventListener()`](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener), or set the equivalent event handler property.

```js
addEventListener("popupshow", (event) => {});
onpopupshow = (event) => {};
```

## Example

```js
const popup = document.getElementById('my-popup');
const popupToggleBtn = document.getElementById('my-popup-btn');

// Event listener version
popup.addEventListener('popupshow', () => {
  popupToggleBtn.textContent = 'Dismiss pop-up';
})

// Event handler property version
popup.onpopupshow = () => {
  popupToggleBtn.textContent = 'Dismiss pop-up';
}
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