---
layout: 'layouts/blog-post.njk'
title: "Mutation events will be removed from Chrome"
description: >
  Announcing the deprecation and planned removal of mutation events, and sharing how you can migrate your code before the removal in July 2024.
subhead: >
  Announcing the deprecation and planned removal of mutation events, and sharing how you can migrate your code before the removal in July 2024.
date: 2023-05-31
authors:
  - masonfreed
tags:
  - deprecations-removals
thumbnail: 'image/kheDArv5csY6rvQUJDbWRscckLr1/dKev0j1B3SlHo3yxJhuF.png'
alt: ''
---

Chromium has officially deprecated mutation events, and has a plan to **remove support starting with version 127**, which goes to stable release on [July 30, 2024](https://chromiumdash.appspot.com/schedule). This post explains why we are removing mutation events, and provides a path for migrating before they are removed from the browser.

## What are mutation events?

Mutation events is the name for the following collection of events:  

-  `DOMNodeInserted`
-  `DOMNodeRemoved`
-  `DOMSubtreeModified`
-  `DOMCharacterDataModified`
-  `DOMNodeInsertedIntoDocument`
-  `DOMNodeRemovedFromDocument`
-  (Not supported by any modern browser) `DOMAttrModified`
-  (Not supported by any modern browser) `DOMAttributeNameChanged`
-  (Not supported by any modern browser) `DOMElementNameChanged`

These events are a very old part of the DOM level 2 spec, and they have been [deprecated since 2011](https://w3c.github.io/uievents/#legacy-event-types). They were replaced by the [MutationObserver interface](https://developer.mozilla.org/docs/Web/API/MutationObserver), which has been [supported in all modern browsers since 2013](https://caniuse.com/mutationobserver).

# History of mutation events

Mutation events sounded like a good idea a long ago, but turned out to have [several fatal flaws](https://lists.w3.org/Archives/Public/public-webapps/2011JulSep/0779.html):

-  They are verbose and fire too often. An event is fired for each node that is removed.
-  They are [slow](https://groups.google.com/g/mozilla.dev.platform/c/L0Lx11u5Bvs?pli=1), due to event propagation and because they prevent many UA run-time optimizations.
-  They frequently cause crashes. They have been the source of many crashes and security bugs in browsers, because event listeners can change the entire DOM underneath a running DOM operation.

Because of these flaws, the events were _deprecated_ from the spec in 2011 and a replacement API (`MutationObserver`) was constructed in 2012. The new API has been implemented and functional for over 10 years at this point.

# Why mutation events are being removed

Support for mutation events varies across browsers. Some events, for example `DOMNodeInsertedIntoDocument` and `DOMNodeRemovedFromDocument`, are not supported in all browsers. For the other events, the particular behavior varies due to the lack of any agreed specification. However, a reasonable question might be: why not just leave them there, since they're "done" and they only slow down pages that use them? The answer comes in two parts.

Firstly, these events are holding back the web platform. As the web evolves, and new APIs are added, the existence of these legacy APIs has to be taken into account. Sometimes, just the need to support these events can keep new APIs from being proposed. As one example, there has been a [longstanding request](https://github.com/whatwg/html/issues/5484) to prevent `<iframe>` elements from reloading when they are moved within the DOM. However, partially due to the existence of mutation events, that effort was deemed to be too difficult to achieve, and the request was closed.

These events continue to get in the way of making browsers faster. Even with the optimizations that browsers have, which attempt to avoid the performance penalties on pages that do not use mutation events, things are not perfect. Checks still need to be made in many places for Mutation Event listeners. Code still needs to be written very defensively, since these events can change the DOM in surprising ways.

Since it has been over 10 years since the events were officially deprecated, and the replacement API has similarly been available for over 10 years, the time has come to finally remove the mutation events from browsers once and for all.

## How to migrate

### Use `MutationObserver` instead

The [documentation for `MutationObserver` is located on MDN](https://developer.mozilla.org/docs/Web/API/MutationObserver), and is fairly complete. Replacement for your codebase depends on how these events are being used, but as an example:

```javascript  
// Old mutation event usage:  
target.addEventListener(‘DOMNodeInserted',event => doSomething(event.target));

// Replacement mutation observer code:  
const observer = new MutationObserver(mutationList =>  
  mutationList.filter(m => m.type === 'childList').forEach(m => {  
    m.addedNodes.forEach(doSomething);  
  }));  
observer.observe(target,{childList: true, subtree: true});  
```

While the `MutationObserver` code appears larger than the original `DOMNodeInserted` event listener code, notice that it can handle all mutations that happen over an entire tree in one call, rather than requiring multiple calls to the event handler.

## Polyfill

There is a polyfill that attempts to allow existing code to continue functioning, while being powered by `MutationObserver`. The polyfill is located on GitHub or as an npm package.  

-  [https://github.com/mfreed7/mutation-events-polyfill#readme](https://github.com/mfreed7/mutation-events-polyfill#readme)
-  [https://www.npmjs.com/package/mutation-events](https://www.npmjs.com/package/mutation-events)

## Timeline and deprecation trial information

The current plan is to remove mutation events in Chrome 127 which will be stable on July 30, 2024.

If you need additional time to migrate your code, there will be an [origin trial](/origintrials/#/trials/active)to re-enable the events for a short time on specified sites. There will also be an [Enterprise Policy](https://chromeenterprise.google/policies/) that functions in a similar way for enterprise users. More information on these will be available closer to the removal time.
