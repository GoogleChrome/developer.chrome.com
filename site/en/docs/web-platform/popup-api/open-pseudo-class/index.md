---
layout: 'layouts/doc-post.njk'
title: :open
description: Allows a pop-up to be styled, but only when it is being shown.
subhead: Allows a pop-up to be styled, but only when it is being shown.
authors:
  - chrisdavidmills
date: 2022-10-19
updated: 2022-10-19
---

The **`:open`** [CSS](https://developer.mozilla.org/docs/Web/CSS) [pseudo-class](https://developer.mozilla.org/docs/Web/CSS/Pseudo-classes) allows a [pop-up](/docs/web-platform/popup-api/) to be styled, but only when it is being shown.

## Syntax

```css
:open
```

## Example

The following example transitions the pop-up in from the bottom of the viewport, rather than have it appear in the center:

```css
p[popup] {
  transform: translateY(60vh);
}

p[popup]:open {
  transition: transform 0.6s;
  transform: translateY(0vh);
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