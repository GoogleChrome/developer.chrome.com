---
# Required
layout: 'layouts/blog-post.njk'

# Required
title: Deprecations and removals in Chrome 84

# Required
description: >
  A round up of the deprecations and removals in Chrome 84 to help you plan.

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
authors:
  - joemedley

# Required
date: 2020-05-27 

# Optional
# Include an updated date when you update your post
updated: 2020-05-27

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

{% Aside %}
Chrome expects to start the spec-mandated turn down of AppCache in Chrome
85. For details and instructions for managing the transition gracefully, see
[Preparing for AppCache removal](https://web.dev/appcache-removal/). For
information on a feature that will help you identify uses of this and other
deprecated APIs, see [Know your code
health](https://web.dev/reporting-observer/)
{% endAside %}

## @import rules in CSSStyleSheet.replace() removed

The original spec for constructable stylesheets allowed for calls to:

```js
sheet.replace("@import('some.css');")
```

This use case is being removed. Calls to `replace()` now throw an exception if
`@import` rules are found in the replaced content.

[Intent to Remove](https://groups.google.com/a/chromium.org/g/blink-dev/c/RKG8oxp22RY/m/fdFnG1rGCgAJ) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/4735925877735424) &#124;
[Chromium Bug](https://crbug.com/1055943)

## Remove TLS 1.0 and TLS 1.1


TLS (Transport Layer Security) is the protocol which secures HTTPS. It has a
long history stretching back to the nearly twenty-year-old TLS 1.0 and its even
older predecessor, SSL. Both TLS 1.0 and 1.1 have a number of weaknesses.

* TLS 1.0 and 1.1 use MD5 and SHA-1, both weak hashes, in the transcript hash
  for the Finished message.
* TLS 1.0 and 1.1 use MD5 and SHA-1 in the server signature. (Note: this is not
  the signature in the certificate.)
* TLS 1.0 and 1.1 only support RC4 and CBC ciphers. RC4 is broken and has since
  been removed. TLS’s CBC mode construction is flawed and is vulnerable to
  attacks.
* TLS 1.0’s CBC ciphers additionally construct their initialization vectors
  incorrectly.
* TLS 1.0 is no longer PCI-DSS compliant.

Supporting TLS 1.2 is a prerequisite to avoiding the above problems. The TLS
working group has deprecated TLS 1.0 and 1.1. Chrome has now also deprecated
these protocols.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/EHSnAn2rucg/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5654791610957824) &#124;
[Chromium Bug](https://crbug.com/896013)


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
