---
layout: 'layouts/blog-post.njk'
title: Deprecations and Removals in Chrome 68
description: >
  A round up of the deprecations and removals in Chrome 68 to help you plan.
authors:
  - joemedley
date: 2018-06-08
updated: 2019-06-26
---
{% Aside %}
Visit ChromeStatus.com for lists of 
<a href="https://www.chromestatus.com/features#browsers.chrome.status%3A%22Deprecated%22">current deprecations</a>
and <a href="https://www.chromestatus.com/features#browsers.chrome.status:%22Removed%22">previous removals</a>.  
{% endAside %}

## Removals

### Remove document.createTouch

The `document.createTouch()` method is being removed because the `Touch()`
constructor has been supported since Chrome 48. This follows a long-standing
trend in JavaScript APIs of moving away from factory functions and toward
constructors. The closely-related `document.createTouchList()` method [is
expected to be removed in Chrome 69](https://www.chromestatus.com/feature/5185332291043328).

[Intent to Remove]() &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5668612064935936) &#124;
[Chromium Bug]()

### Remove Document.selectedStylesheetSet and Document.preferredStylesheetSet

The Document.selectedStylesheetSet and Document.preferredStylesheetSet
attributes are removed because they are non-standard and only implemented by
Chrome and WebKit. The standard versions of these attributes were removed from
the spec in 2016.

`Document.styleSheets` provides some of the same functionality, thought not
all. Fortunately the risk to websites is low as the use of these items appears
to be in single digits. (See the Intent to Remove for exact numbers.)

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/w1Bv7YZxAco/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/6452340664041472) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=690609)

### WEBGL_compressed_texture_atc

Previously, Chrome provided the `AMD_compressed_ATC_texture_atc` formats. These
formats were widely supported at the time the extension was created. Hardware
support has since dwindled to near-zero, with implementation currently possible
only on Qualcomm devices. This extension has been rejected by the WebGL Working
Group and support for it is now removed from Chrome.

[Chromestatus Tracker](https://www.chromestatus.com/feature/5253912718213120) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=845288)

## Deprecations

### Deprecate and Remove Negative Brightness Values in Filter

For compliance with specification, filter's `brightness()` function no longer
accepts negative values.

[Chromestatus Tracker](https://www.chromestatus.com/feature/5708036203085824) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=776208)

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
