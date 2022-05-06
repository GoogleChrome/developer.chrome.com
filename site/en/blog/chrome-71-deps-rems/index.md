---
layout: 'layouts/blog-post.njk'
title: Deprecations and removals in Chrome 71
description: >
  A round up of the deprecations and removals in Chrome 71 to help you plan.
authors:
  - joemedley
date: 2018-10-29
updated: 2019-06-26

---
{% Aside %}
Visit ChromeStatus.com for lists of 
<a href="https://www.chromestatus.com/features#browsers.chrome.status%3A%22Deprecated%22">current deprecations</a>
and <a href="https://www.chromestatus.com/features#browsers.chrome.status:%22Removed%22">previous removals</a>.  
{% endAside %}


Chrome 71 also includes changes to `cache.addAll()` and `importScripts()`. Read
about it in [Tweaks to `cache.addAll()` and `importScripts()` coming in Chrome
71](https://developers.google.com/web/updates/2018/10/tweaks-to-addAll-importScripts) by Jeff Posnick.

## Remove SpeechSynthesis.speak() without user activation

The [`SpeechSynthesis`](https://developer.mozilla.org/docs/Web/API/SpeechSynthesis)
interface is actively being abused on the web. There's anecdotal evidences that
because other autoplay avenues are being closed, abuse is moving to the [Web
Speech API](https://developer.mozilla.org/docs/Web/API/Web_Speech_API),
which doesn't follow autoplay rules.

The `speechSynthesis.speak()` function now throws an error if the document has
not received a user activation. This feature has been deprecated since Chrome 70.

[Intent to Deprecate](https://groups.google.com/a/chromium.org/d/topic/blink-dev/XpkevOngqUs/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5687444770914304) &#124;
[Chromium Bug](https://crbug.com/812767)

## Remove prefixed versions of APIs

Chrome has removed non-standard aliases for two widely supported standard
interfaces.

### WebKitAnimationEvent

`WebKitAnimationEvent` has been fully replaced by
[`AnimationEvent`](https://developer.mozilla.org/docs/Web/API/AnimationEvent)
, the event interface used for events relating to CSS Animations. The prefixed
form is only supported in Safari. Firefox and Edge only support the un-prefixed
`AnimationEvent`.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/EgMUDqySZwE/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/6027726842494976) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=695504&desc=2)

### WebKitTransitionEvent

`WebKitTransitionEvent` has been fully replaced by
[`TransitionEvent`](https://developer.mozilla.org/docs/Web/API/TransitionEvent)
, the event interface used for events relating to CSS Transitions (for example,
`transitionstart`). The prefixed form is only supported in Safari. Firefox and
Edge only support the un-prefixed `TransitionEvent`.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/0Szv8vDQh_c/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/6579769156042752) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=695504&desc=2)

## Remove URL.createObjectURL from MediaStream

The `URL.createObjectURL()` method has been removed from the `MediaStream`
interface. This method has been deprecated in 2013 and superseded by assigning
streams to
[`HTMLMediaElement.srcObject`](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/srcObject).
The old method was removed because it is less safe, requiring a call to
`URL.revokeOjbectURL()` to end the stream. Other user agents have either
deprecated (Firefox) or removed (Safari) this feature feature.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/tWzutytXsqc/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5618491470118912) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=800767&desc=2)

## Remove document.origin

The `document.origin` property has been removed. This property was only ever
implemented in Chromium and WebKit. It is redundant with `self.origin` which
can be used in [both window and worker
contexts](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/origin)
and has wider support.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/0D_37iuh1zc/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5701042356355072) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=692084)

## Deprecations

No features have been deprecated in this version of Chrome. Chrome Platform Status provides a list of deprecated features from previous versions of Chrome.

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
