---
layout: 'layouts/blog-post.njk'
title: Deprecations and Removals in Chrome 70
description: >
  A round up of the deprecations and removals in Chrome 68 to help you plan.
authors:
  - joemedley
date: 2018-09-14
updated: 2019-06-26
---

{% Aside %}
Visit ChromeStatus.com for lists of 
<a href="https://www.chromestatus.com/features#browsers.chrome.status%3A%22Deprecated%22">current deprecations</a>
and <a href="https://www.chromestatus.com/features#browsers.chrome.status:%22Removed%22">previous removals</a>.  
{% endAside %}

## Removals

### Remove AppCache from insecure contexts

When used over insecure contexts, AppCache potentially allows _persistent_
online and offline cross-site scripting attacks. This is a serious escalation
from regular cross-site scripting.

To mitigate this threat, AppCache is now only supported on origins that serve
over HTTPS.

Developers looking for an alternative to AppCache are encouraged to use service
workers. An experimental
[library is available](https://www.npmjs.com/package/sw-appcache-behavior)
to ease that transition.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/UKF8cK0EwMI/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5714236168732672) &#124;
[Chromium Bug](https://crbug.com/588931)

### Remove anonymous getter for HTMLFrameSetElement

The anonymous getter for `HTMLFrameSetElement` is non-standard and therefore
being removed. This feature was [added 13 years
ago](https://trac.webkit.org/changeset/8717/webkit) to resolve a compatibility
issue that then existed, but now does not. Because this is a non-standard
feature no alternatives are available. Usage is low enough that we do not
expect this to be a problem.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/7jBHd71Yf0s/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5235521668251648) &#124;
[Chromium Bug](https://crbug.com/695891)

### Deprecate and remove Gamepads.item()

The legacy `item()` accessor is removed from the `Gamepads` array. This change
improves compatibility with Firefox which is so far the only browser to
implement `GamepadList`.

[Chromestatus Tracker](https://www.chromestatus.com/feature/4507242028072960) &#124;
[Chromium Bug](https://crbug.com/865642)

## Deprecations

### Deprecate Custom Elements v0

Custom Elements are a Web Components technology that lets you create new HTML
tags, beef up existing tags, or extend components authored by other developers.
Custom Elements v1 have been [implemented in
Chrome](https://www.chromestatus.com/feature/4696261944934400) since version
54, which shipped in October 2016. Custom Elements v0 was an experimental
version not implemented in other browsers. As such it is now deprecated with
removal expected in Chrome 80, around February 2020.

[Intent to Deprecate](https://groups.google.com/a/chromium.org/d/topic/blink-dev/h-JwMiPUnuU/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/4642138092470272) &#124;
[Chromium Bug](https://crbug.com/180965)

### Deprecate HTML Imports

HTML Imports allow HTML to be imported from one document to another. This
feature was part of the early experimental version of Web Components not
implemented in other browsers. As such it is now deprecated with removal
expected in Chrome 73, around April 2019. Sites depending on HTML imports
already require a polyfill on non-Chromium browsers. When HTML imports is
removed, sites that have the polyfill should continue to work on Chrome.

[Intent to Deprecate](https://groups.google.com/a/chromium.org/d/topic/blink-dev/h-JwMiPUnuU/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5144752345317376) &#124;
[Chromium Bug](https://crbug.com/240592)

### Deprecate Shadow DOM v0

Shadow DOM is a Web Components technology that uses scoped subtrees inside
elements. Shadow DOM v1 has been [implemented in
Chrome](https://www.chromestatus.com/feature/4667415417847808) since version
53, which shipped in August of 2016. Shadow DOM v0 was an experimental version
not implemented in other browsers. As such it is now deprecated with removal
expected in Chrome 73, around April 2019. Sites depending on Shadow DOM v0
already require a polyfill on non-Chromium browsers. When HTML imports is removed,
sites that have the polyfill should continue to work on Chrome.

[Intent to Deprecate](https://groups.google.com/a/chromium.org/d/topic/blink-dev/h-JwMiPUnuU/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5135093320384512) &#124;
[Chromium Bug](https://crbug.com/336121)

### Deprecate SpeechSynthesis.speak() without user activation

The [`SpeechSynthesis`](https://developer.mozilla.org/docs/Web/API/SpeechSynthesis)
interface is actively being abused on the web. There's anecdotal evidences that
because other autoplay avenues are being closed, abuse is moving to the [Web
Speech API](https://developer.mozilla.org/docs/Web/API/Web_Speech_API),
which doesn't follow autoplay rules.

The `speechSynthesis.speak()` function now throws an error if the document has
not received a user activation. Removal is expected in Chrome 71, some time in
late November.

[Intent to Deprecate](https://groups.google.com/a/chromium.org/d/topic/blink-dev/XpkevOngqUs/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5687444770914304) &#124;
[Chromium Bug](https://crbug.com/812767)

## Deprecation policy


To keep the platform healthy, we sometimes remove APIs from the Web Platform which have run their course. There can be many reasons why we would remove an
API, such as:

- They are superseded by newer APIs.
- They are updated to reflect changes to specifications to bring alignment and consistency with other browsers.
- They are early experiments that never came to fruition in other browsers and thus can increase the burden of support for web developers.


Some of these changes will have an effect on a very small number of sites. To mitigate issues ahead of time, we try to give developers advanced notice so they can make the required changes to keep their sites running.

Chrome currently has a <a href="http://www.chromium.org/blink#TOC-Launch-Process:-Deprecation"> process for deprecations and removals of API's</a>, essentially:


- Announce on the <a href="https://groups.google.com/a/chromium.org/forum/#!forum/blink-dev">blink-dev</a> mailing list.
- Set warnings and give time scales in the Chrome DevTools Console when usage is detected on the page.
- Wait, monitor, and then remove the feature as usage drops.
 


You can find a list of all deprecated features on chromestatus.com using the <a href="https://www.chromestatus.com/features#deprecated"> deprecated filter </a> and removed features by applying the <a href="https://www.chromestatus.com/features#removed">removed filter</a>. We will also try to summarize some of the changes, reasoning, and migration paths in these posts.
