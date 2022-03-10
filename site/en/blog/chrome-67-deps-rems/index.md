---
layout: 'layouts/blog-post.njk'
title: Deprecations and Removals in Chrome 67
description: >
  A round up of the deprecations and removals in Chrome 67 to help you plan. In this version, deprecation of public key pinning, removal of AppCache on unsecure contexts, and more prefix removals.
authors:
  - joemedley
date: 2018-04-27
updated: 2018-05-07
---

{% Aside %}
Visit ChromeStatus.com for lists of 
<a href="https://www.chromestatus.com/features#browsers.chrome.status%3A%22Deprecated%22">current deprecations</a>
and <a href="https://www.chromestatus.com/features#browsers.chrome.status:%22Removed%22">previous removals</a>.  
{% endAside %}

## Deprecate HTTP-Based Public Key Pinning

HTTP-Based Public Key Pinning (HPKP) was intended to allow websites to send an
HTTP header that pins one or more of the public keys present in the site's
certificate chain. It has very low adoption, and although it provides security
against certificate mis-issuance, it also creates risks of denial of service and
hostile pinning.

To defend against certificate mis-issuance, web developers should use the
`Expect-CT` header, including its reporting function. `Expect-CT` is safer than HPKP
due to the flexibility it gives site operators to recover from configuration
errors, and due to the built-in support offered by a number of certificate authorities.

We expect to remove this in Chrome 69.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/msg/blink-dev/he9tr7p3rZ8/eNMwKPmUBAAJ)
&#124;
[ChromeStatus](https://www.chromestatus.com/feature/5903385005916160) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=779166)

## Deprecate AppCache on Non-secure Contexts

AppCache over HTTP is deprecated. AppCache is a powerful feature that allows offline and
persistent access to an origin. Allowing AppCache to be used over non-secure contexts
makes it an attack vector for cross-site scripting hacks.

Removal is expected in Chrome 69.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/ANnafFBhReY/discussion) &#124;
[ChromeStatus](https://www.chromestatus.com/feature/5714236168732672) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=588931)

## Layout

Several `-webkit-` prefixed CSS properties will be removed in this release:

- **`-webkit-box-flex-group`**: This property has virtually zero usage based on
  the UseCounter in stable.
- **Percent (%) values for `-webkit-line-clamp`**: There is interest in finding
  a standards-based solution to the number values use case, but we haven't seen
  demand for the %-based values.
- **`-webkit-box-lines`**: This property was never fully implemented. It was
  originally intended such that a "vertical"/"horizontal" `-webkit-box` could
  have multiple rows/columns.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/-e92az54B4I/discussion) &#124;
[ChromeStatus](https://www.chromestatus.com/feature/5393405823680512) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=818691)

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
