---
layout: 'layouts/doc-post.njk'
title: popover
description: Turns an element into a popover.
subhead: Turns an element into a popover.
authors:
  - chrisdavidmills
  - jheyy
date: 2022-10-19
updated: 2022-11-10
---

The **`popover`** [global attribute](https://developer.mozilla.org/docs/Web/HTML/Global_attributes) is an [emumerated](https://developer.mozilla.org/docs/Glossary/Enumerated) attribute that turns an element into a [popover](/docs/web-platform/popover-api/).

It can be used on any HTML element that makes sense as a popover.

## Values

The attribute can have any of the following values:

`auto` (default value)
: The popover exhibits the standard behavior explained at [The Popover API: concepts and usage](/docs/web-platform/popover-api/#concepts-and-usage).
    
`manual`
: Manual popovers cannot be light dismissed, they can only be dismissed by an explicit trigger element (created for example using [`popovertoggletarget`](/docs/web-platform/popover-api/popovertoggletarget-attribute)) or by JavaScript (using [`hidePopOver()`](/docs/web-platform/popover-api/hidepopover-method)), and they don't automatically dismiss previously-shown popovers.

## Example

```html
<p id="my-popover" popover>Hello!</p>
<p id="my-popover" popover="auto">Hello!</p>
<p id="my-popover" popover="manual">Hello!</p>
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