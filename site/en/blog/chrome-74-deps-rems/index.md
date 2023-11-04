---
layout: 'layouts/blog-post.njk'
title: Deprecations and removals in Chrome 74
description: >
  A round up of the deprecations and removals in Chrome 74 to help you plan.
authors:
  - joemedley
date: 2019-03-22
updated: 2020-03-11

---

{% Aside %}
Visit ChromeStatus.com for lists of 
<a href="https://www.chromestatus.com/features#browsers.chrome.status%3A%22Deprecated%22">current deprecations</a>
and <a href="https://www.chromestatus.com/features#browsers.chrome.status:%22Removed%22">previous removals</a>.  
{% endAside %}


## Removals

### Disallow opener navigation downloads from cross origin popups

If a popup navigates its opener to a URL which results in a download, the
download will be blocked and the navigation cancelled, if the popup is
cross-origin to its opener. This resolves a long standing security issue.

[Chrome Platform Status](https://www.chromestatus.com/feature/5742188281462784) &#124;
[Chromium Bug](http://crbug.com/932209)

### Remove PaymentAddress's languageCode property

The `PaymentAddress.languageCode` property has been removed from the Payment
Request API. This property is the browser's best guess for the language of the
text in the shipping, billing, delivery, or pickup address in the Payment
Request API. The `languageCode` property is marked at risk in the specification
and has already been removed from Firefox and Safari. Usage in Chrome is small
enough for safe removal.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-reviews/aBGjyKqok50/discussion) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/4992562146312192) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=877521)

## Deprecations

### Deprecate drive-by downloads in sandboxed iframes

Chrome will soon prevent downloads in sandboxed `iframes` that lack a user
gesture, though this restriction could be lifted via an
`allow-downloads-without-user-activation` keyword in the sandbox attribute list.
This allows content providers to restrict malicious or abusive downloads.

Downloads can bring security vulnerabilities to a system. Even though
additional security checks are done in Chrome and the operating system, we feel
blocking downloads in sandboxed `iframes` also fits the general thought behind
the sandbox. Apart from security concerns, it would be a more pleasant user
experience for a click to trigger a download on the same page, compared with
downloads starting automatically when a user lands on a new page, or started
non-spontaneously after the click.

Removal is expected in Chrome 74.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/JdAQ6HNoZvk/discussion) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/5706745674465280) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=539938)

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

