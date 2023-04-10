---
layout: 'layouts/doc-post.njk'
title: ::backdrop
description: Allows styling of content behind the popover while the popover is open.
subhead: Allows styling of content behind the popover while the popover is open.
authors:
  - chrisdavidmills
  - jheyy
date: 2022-10-19
updated: 2023-01-25
---

The **`::backdrop`** [CSS](https://developer.mozilla.org/docs/Web/CSS) [pseudo-element](https://developer.mozilla.org/docs/Web/CSS/Pseudo-elements) sits behind an open [popover](/docs/web-platform/popover-api/) in the stacking order, but in front of the rest of the document, and spans the entire width and height of the viewport. It allows the rest of the content to be styled while the popover is open—for example you might want to blur or darken it.

`::backdrop` neither inherits from nor is inherited by any other elements.

## Syntax

```css
::backdrop
```

## Example

In the following example the rest of the content is darkened while the popover is shown:

```css
p[popover]::backdrop {
  background-color: rgba(0,0,0,0.5);
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
