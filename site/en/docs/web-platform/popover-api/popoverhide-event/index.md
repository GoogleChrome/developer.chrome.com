---
layout: 'layouts/doc-post.njk'
title: "Element: popoverhide event"
description: Fired on the popover when it is dismissed.
subhead: Fired on the popover when it is dismissed.
authors:
  - chrisdavidmills
  - jheyy
date: 2022-10-19
updated: 2023-01-25
---

The `popoverhide` event of the [`Element`](https://developer.mozilla.org/docs/Web/API/Element) interface fires on a [popover](/docs/web-platform/popover-api/) element when it is dismissed.

## Syntax

Use the event name in methods like [`addEventListener()`](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener), or set the equivalent event handler property.

```js
addEventListener("popoverhide", (event) => {});
onpopuphide = (event) => {};
```

## Example

```js
const popover = document.getElementById('my-popover');
const popoverToggleBtn = document.getElementById('my-popover-btn');

// Event listener version
popover.addEventListener('popoverhide', () => {
  popoverToggleBtn.textContent = 'Show popover';
})

// Event handler property version
popover.onpopoverhide = () => {
  popoverToggleBtn.textContent = 'Show popover';
}
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
