---
layout: 'layouts/doc-post.njk'
title: ::backdrop
description: Allows styling of content behind the pop-up while the pop-up is open.
subhead: Allows styling of content behind the pop-up while the pop-up is open.
authors:
  - chrisdavidmills
date: 2022-10-19
updated: 2022-10-19
---

The **`::backdrop`** [CSS](https://developer.mozilla.org/docs/Web/CSS) [pseudo-element](https://developer.mozilla.org/docs/Web/CSS/Pseudo-elements) sits behind an open [pop-up](/docs/web-platform/popup-api/) in the stacking order, but in front of the rest of the document, and spans the entire width and height of the viewport. It allows the rest of the content to be styled while the pop-up is open—for example you might want to blur or darken it.

`::backdrop` neither inherits from nor is inherited by any other elements.

## Syntax

```css
::backdrop
```

## Example

In the following example the rest of the content is darkened while the pop-up is shown:

```css
p[popup]::backdrop {
  background-color: rgba(0,0,0,0.5);
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