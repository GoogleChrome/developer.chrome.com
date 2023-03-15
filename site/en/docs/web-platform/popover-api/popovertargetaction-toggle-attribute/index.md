---
layout: 'layouts/doc-post.njk'
title: popovertargetaction="toggle"
description: Creates a trigger element that toggles an associated popover between shown and hidden states.
subhead: Creates a trigger element that toggles an associated popover between shown and hidden states.
authors:
  - chrisdavidmills
  - jheyy
date: 2022-10-19
updated: 2023-01-25
---

The **`popovertargetaction="toggle"`** attribute creates a trigger element that toggles an associated [popover](/docs/web-platform/popover-api/) between shown and hidden states.

It can be used on the [`<button>`](https://developer.mozilla.org/docs/Web/HTML/Element/button) and [`<input>`](https://developer.mozilla.org/docs/Web/HTML/Element/input) elements.

## Values

The attribute takes a string value equal to the ID of the popover element that you want to toggle, to associate the two.

## Example

```html
<button popovertarget="my-popover" popovertargetaction="toggle">Show popover</button>
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
