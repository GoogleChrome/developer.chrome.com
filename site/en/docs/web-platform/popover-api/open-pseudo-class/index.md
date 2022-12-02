---
layout: 'layouts/doc-post.njk'
title: :open
description: Allows a popover to be styled, but only when it is being shown.
subhead: Allows a popover to be styled, but only when it is being shown.
authors:
  - chrisdavidmills
  - jheyy
date: 2022-10-19
updated: 2022-11-10
---

The **`:open`** [CSS](https://developer.mozilla.org/docs/Web/CSS) [pseudo-class](https://developer.mozilla.org/docs/Web/CSS/Pseudo-classes) allows a [popover](/docs/web-platform/popover-api/) to be styled, but only when it is being shown.

## Syntax

```css
:open
```

## Example

The following example transitions the popover in from the bottom of the viewport, rather than have it appear in the center:

```css
p[popover] {
  transform: translateY(60vh);
  transition: transform 0.6s;
}

p[popover]:open {
  transform: translateY(0vh);
}
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
* [Open UI: Popover API Explainer](https://open-ui.org/components/popup.research.explainer)