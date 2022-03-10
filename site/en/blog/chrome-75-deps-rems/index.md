---
layout: 'layouts/blog-post.njk'
title: Deprecations and removals in Chrome 75
description: >
  A round up of the deprecations and removals in Chrome 75 to help you plan.
authors:
  - joemedley
date: 2019-05-02
updated: 2019-06-26

---

{% Aside %}
Visit ChromeStatus.com for lists of 
<a href="https://www.chromestatus.com/features#browsers.chrome.status%3A%22Deprecated%22">current deprecations</a>
and <a href="https://www.chromestatus.com/features#browsers.chrome.status:%22Removed%22">previous removals</a>.  
{% endAside %}


## Remove overflow: -webkit-paged-x and overflow: -webkit-paged-y

These are old webkit-specific properties that allowed developers to fragment
content over columns inside a scrollable region. They are now removed.

Practically speaking these aren't used. Most developers use them accidentally,
and typically when they are they force a new formatting context similar to
setting `overflow: hidden`.

[Chrome Platform Status](https://www.chromestatus.com/feature/5731653806718976) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=940652)

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

