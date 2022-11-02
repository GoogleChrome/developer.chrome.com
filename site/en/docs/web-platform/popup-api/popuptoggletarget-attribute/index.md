---
layout: 'layouts/doc-post.njk'
title: popuptoggletarget
description: Creates a trigger element that toggles an associated pop-up between shown and hidden states.
subhead: Creates a trigger element that toggles an associated pop-up between shown and hidden states.
authors:
  - chrisdavidmills
date: 2022-10-19
updated: 2022-10-19
---

The **`popuptoggletarget`** attribute creates a trigger element that toggles an associated [pop-up](/docs/web-platform/popup-api/) between shown and hidden states.

It can be used on the [`<button>`](https://developer.mozilla.org/docs/Web/HTML/Element/button) and [`<input>`](https://developer.mozilla.org/docs/Web/HTML/Element/input) elements.

## Values

The attribute takes a string value equal to the ID of the pop-up element that you want to toggle, to associate the two.

## Example

```html
<button popuptoggletarget="my-popup">Show pop-up</button>
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