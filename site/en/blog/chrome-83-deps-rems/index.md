---
# Required
layout: 'layouts/blog-post.njk'

# Required
title: Deprecations and removals in Chrome 83

# Required
description: >
  A round up of the deprecations and removals in Chrome 83 to help you plan.

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
authors:
  - joemedley

# Required
date: 2020-04-10 

# Optional
# Include an updated date when you update your post
updated: 2020-04-10 

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

## Disallow downloads in Sandboxed iframes

Chrome now prevents downloads in sandboxed iframes, though this restriction can
be lifted via an 'allow-downloads' keyword in the sandbox attribute list. This
allows content providers to restrict malicious or abusive downloads. Downloads
can bring security vulnerabilities to a system. Even though additional security
checks are done in Chrome and the operating system, we feel blocking downloads
in sandboxed iframes also fits the purpose of the sandbox.

[Intent to Remove](https://groups.google.com/a/chromium.org/g/blink-dev/c/JdAQ6HNoZvk/m/WQZfXIMADgAJ) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/5706745674465280)


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
