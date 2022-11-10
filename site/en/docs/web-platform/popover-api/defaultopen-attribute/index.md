---
layout: 'layouts/doc-post.njk'
title: defaultopen
description: Causes a popover to automatically open on page load.
subhead: Causes a popover to automatically open on page load.
authors:
  - chrisdavidmills
  - jheyy
date: 2022-10-19
updated: 2022-11-10
---

The **`defaultopen`** [global attribute](https://developer.mozilla.org/docs/Web/HTML/Global_attributes) is a [boolean](https://developer.mozilla.org/docs/Glossary/Boolean) attribute that causes a [popover](/docs/web-platform/popover-api/) to automatically open on page load.

It can be used on any HTML element that has been turned into a popover using the [`popover`](/docs/web-platform/popover-api/popover-attribute) attribute.

## Values

The attribute can have any of the following values:

`false` (default value)
: The popover does not open on page load.
    
none or `true`
: The popover opens on page load.

## Example

```html
<p id="my-popover" popover="auto" defaultopen>Hello!</p>
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