---
# Required
layout: 'layouts/blog-post.njk'

# Required
title: API Deprecations and Removals in Chrome 55

# Required
description: >
  A round up of the deprecations and removals in Chrome 56 to help you plan.

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
authors:
  - joemedley

# Required
date: 2016-10-20

# Optional
# Include an updated date when you update your post
updated: 2018-01-08

# Optional
# How to add a new tag
# https://developer.chrome.com/docs/handbook/how-to/add-a-tag/
tags:
  - deprecations-removals
  - chrome55



---


In nearly every version of Chrome, we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the Web
Platform. This article describes the deprecations and removals in Chrome 55,
which is in beta as of October 21. This list is subject to change at any time.

## Resources with non-script MIME types can no longer be executed

Previous versions of Chrome allowed content to with several non-script 
[MIME types](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
to be executed as script. In addition to the obvious security vulnerability,
this problem also reduces the value of
[content security policy](https://developer.mozilla.org/docs/Web/Security/CSP)
settings like `script-src 'self'`.

For example, a site might lock down same-origin JavaScript, yet still allow
users to upload images that are served from that origin. Malicious users might
upload JavaScript embedded within a specially-crafted image file, and that
JavaScript had the potential to be served from that origin and executed. As of
Chrome 55 will no longer execute content loaded with the following MIME types:

* `audio/*`
* `image/*`
* `video/*`
* `text/csv` 

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/AHsFvhHzh1o/discussion)&#124;
[Chromestatus Tracker](https://www.chromestatus.com/features/6031053726679040) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=433049)

## Remove SVGSVGElement.viewPort

The implementation of `SVGSVGElement.viewPort` [has not worked in
Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=395838)
since 2012. The attribute is not present at all in other browsers and
it has been removed from the specification. For these reasons the property was
deprecated in Chrome 54 and has now been removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/bFqDvZK2LVY/discussion)&#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5686865248124928)&#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=395838)

