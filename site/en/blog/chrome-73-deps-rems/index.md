---
layout: 'layouts/blog-post.njk'
title: Deprecations and removals in Chrome 73
description: >
  A round up of the deprecations and removals in Chrome 73 to help you plan.
authors:
  - joemedley
date: 2019-02-07
updated: 2019-10-23

---

{% Aside %}
Visit ChromeStatus.com for lists of 
<a href="https://www.chromestatus.com/features#browsers.chrome.status%3A%22Deprecated%22">current deprecations</a>
and <a href="https://www.chromestatus.com/features#browsers.chrome.status:%22Removed%22">previous removals</a>.  
{% endAside %}


## Removals

### Remove EXPLAIN and REINDEX support in WebSQL

EXPLAIN's output is not guaranteed to be stable over SQLite versions, so
developers cannot rely on it. REINDEX is only useful when collation sequence
definitions change, and Chrome only uses the built-in collation sequences. Both
features are now removed.

[Chrome Platform Status](https://www.chromestatus.com/feature/5874817249050624) &#124;

### Remove isomorphic decoding of URL fragment identifier

When Chrome opens a URL with a fragment id, it decodes %xx and applies
[isomorphic-decode](https://infra.spec.whatwg.org/#isomorphic-decode) to it,
then tries to find an element with the decoding result as an ID in some cases.
For example, if a user opens example.com/#%F8%C0, Chrome does the following:

1. It searches the page for an element with id="%F8%C0".
1. If it’s not found, it searches the page for an element with id="&amp;#xF8;&amp;#xC0;".
   No other browsers do this, and it's not defined by the standard. Starting in
   version 73, Chrome no longer does this either.

[Chrome Platform Status](https://www.chromestatus.com/feature/4885685374812160) &#124;
[Chromium Bug](http://crbug.com/845824)

## Deprecations

### Deprecate 'drive-by downloads' in sandboxed iframes

Chrome has deprecated downloads in sandboxed iframes that lack a user gesture
('drive-by downloads'), though this restriction could be lifted via an
allow-downloads-without-user-activation keyword in the sandbox attribute list.
This allows content providers to restrict malicious or abusive downloads.

Downloads can bring security vulnerabilities to a system. Even though
additional security checks are done in Chrome and the operating system, we feel
blocking downloads in sandboxed iframes also fits the general thought behind
the sandbox. Apart from security concerns, it would be a more pleasant user
experience for a click to trigger a download on the same page, compared with
downloads started automatically when landing at a new page, or started non
spontaneously after the click.

Removal is expected in Chrome 81.

[Chrome Platform Status](https://www.chromestatus.com/feature/5706745674465280) &#124;

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

