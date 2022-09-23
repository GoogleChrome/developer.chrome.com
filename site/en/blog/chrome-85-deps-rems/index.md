---
# Required
layout: 'layouts/blog-post.njk'

# Required
title: Deprecations and removals in Chrome 85

# Required
description: >
  A round up of the deprecations and removals in Chrome 85 to help you plan.

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
authors:
  - joemedley

# Required
date: 2020-07-22  

# Optional
# Include an updated date when you update your post
updated: 2020-07-22

# Optional
# How to add a new tag
# https://developer.chrome.com/docs/handbook/how-to/add-a-tag/
tags:
  - deprecations-removals




---

{% Aside %}
Visit ChromeStatus.com for lists of 
<a href="https://www.chromestatus.com/features#browsers.chrome.status%3A%22Deprecated%22">current deprecations</a>
and <a href="https://www.chromestatus.com/features#browsers.chrome.status:%22Removed%22">previous removals</a>.  
{% endAside %}

## AppCache Removal Begins

Chrome 85 starts a spec-mandated turn down of AppCache in Chrome. For details
and instructions for managing the transition gracefully, see [Preparing for
AppCache removal](https://web.dev/appcache-removal/). For information on a
feature that will help you identify uses of this and other deprecated APIs, see
[Know your code health](https://web.dev/reporting-observer/)

[Intent to Remove](https://groups.google.com/a/chromium.org/g/blink-dev/c/FvM-qo7BfkI/m/0daqyD8kCQAJ) &#124;
[Chrome Platform Status](https://www.chromestatus.com/features/6192449487634432) &#124;
[Chromium Bug](https://crbug.com/582750)


## Reject insecure SameSite=None cookies

Use of cookies with SameSite set to None without the Secure attribute is no
longer supported. Any cookie that requests SameSite=None but is not marked
Secure will be rejected. This feature started rolling out to users of Stable
Chrome on July 14, 2020. See [SameSite
Updates](https://www.chromium.org/updates/same-site) for a full timeline and
details. Cookies delivered over plaintext channels may be cataloged or modified
by network attackers. Requiring secure transport for cookies intended for
cross-site usage reduces this risk.

[Intent to Remove](https://groups.google.com/a/chromium.org/g/blink-dev/c/6KhRNH3PrvU/m/Xz6YyNXbAQAJ) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/5633521622188032) &#124;
[Chromium Bug](https://crbug.com/954551)


## -webkit-box quirks from -webkit-line-clamp

[Intent to Remove]() &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/5680142707851264) &#124;
[Chromium Bug](https://crbug.com/305376)


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
