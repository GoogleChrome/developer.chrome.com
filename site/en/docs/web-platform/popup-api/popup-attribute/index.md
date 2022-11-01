---
layout: 'layouts/doc-post.njk'
title: popup
description: Turns an element into a pop-up.
subhead: Turns an element into a pop-up.
authors:
  - chrisdavidmills
date: 2022-10-19
updated: 2022-10-19
---

The **`popup`** [global attribute](https://developer.mozilla.org/docs/Web/HTML/Global_attributes) is an [emumerated](https://developer.mozilla.org/docs/Glossary/Enumerated) attribute that turns an element into a [pop-up](/docs/web-platform/popup-api/).

It can be used on any HTML element that makes sense as a pop-up.

## Values

The attribute can have any of the following values:

`auto` (default value)
: The pop-up exhibits the standard behavior explained at [The Pop-up API: concepts and usage](/docs/web-platform/popup-api/#concepts-and-usage).
    
`hint`
: You can only show a single `hint` type popup at a time. They can be light dismissed, but they can't be shown by default using [`defaultopen`](/docs/web-platform/popup-api/defaultopen-attribute).

`manual`
: Manual pop-ups cannot be light dismissed, they can only be dismissed by an explicit trigger element (created for example using [`popuptoggletarget`](/docs/web-platform/popup-api/popuptoggletarget-attribute)) or by JavaScript (using [`hidePopUp()`](/docs/web-platform/popup-api/hidepopup-method)), and they don't automatically dismiss previously-shown pop-ups.

## Example

```html
<p id="my-popup" popup>Hello!</p>
<p id="my-popup" popup="auto">Hello!</p>
<p id="my-popup" popup="hint">Hello!</p>
<p id="my-popup" popup="manual">Hello!</p>
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