---
layout: 'layouts/blog-post.njk'
title: Deprecations and removals in Chrome 77
description: >
  A round up of the deprecations and removals in Chrome 77 to help you plan.
authors:
  - joemedley
date: 2019-08-08
updated: 2019-08-08
---

{% Aside %}
Visit ChromeStatus.com for lists of 
<a href="https://www.chromestatus.com/features#browsers.chrome.status%3A%22Deprecated%22">current deprecations</a>
and <a href="https://www.chromestatus.com/features#browsers.chrome.status:%22Removed%22">previous removals</a>.  
{% endAside %}


## Removals

### Card issuer networks as payment method names

Removes support for calling PaymentRequest with card issuer networks (e.g.,
"visa", "amex", "mastercard") in the supportedMethods field.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/1udpnrlQK4Q/discussion) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/5725727580225536) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=719526)

### Deprecate Web MIDI use on insecure origins

Web MIDI use is classified into two groups: non-privilege use, and privilege use
with sysex permission. Until Chrome 77, only the latter use prompts users for
permission. To reduce security concerns, permissions will always be requested
regardless of sysex use. This means that using Web MIDI on insecure origins will
no longer be allowed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/_2XZt3yInCI/discussion) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/5138066234671104) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=924471)

## Deprecations

### Deprecate WebVR 1.1 API

This API is now deprecated in Chrome, [being replaced
by](https://www.chromestatus.com/feature/5680169905815552) the WebXR Device API,
which is expected to ship in Chrome 78. The WebVR Origin Trial ended on July 24, 2018.

WebVR was never enabled by default in Chrome, and was never ratified as a web
standard. The [WebXR Device API](https://immersive-web.github.io/webxr/) is the
replacement API for WebVR. Removing WebVR from Chrome allows us to focus on the
future of WebXR and remove the maintenance burden of WebVR, as well as reaffirm
that Chrome is committed to WebXR as the future for building immersive web-based
experiences. Removal is expected in Chrome 79.

[Intent to Remove]() &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/4532810371039232) &#124;
[Chromium Bug](https://www.chromestatus.com/feature/4532810371039232)

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

