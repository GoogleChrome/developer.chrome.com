---
# Required
layout: 'layouts/blog-post.njk'

# Required
title: Deprecations and removals in Chrome 76

# Required
description: >
  A round up of the deprecations and removals in Chrome 76 to help you plan.

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
authors:
  - joemedley

# Required
date: 2019-06-21 

# Optional
# Include an updated date when you update your post
updated: 2019-06-26

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

## Removals

### Remove feature policy: lazyload

The lazyload feature policy was intended to allow developers to selectively
control the `lazyload` attribute on the `<iframe>` and `<img>` tags to provide more
control over loading delay for embedded contents and images on a per origin
basis. 

The policy is removed in favor of a newer feature policy for loading, namely
`loading-frame-default-eager` which is more aligned with how the `loading`
attribute will be used. The removal applies to both the Feature-Policy header
and the `<iframe>` `allow` attribute.

[Chrome Platform Status](https://www.chromestatus.com/feature/5641405942726656) &#124;
[Chromium Bug](https://crbug.com/869492)

### Remove outputs from MediaStreamAudioDestinationNode

According to the specification, the `MediaStreamAudioDestinationNode` in the Web
Audio API should have no outputs. Chrome's implementation has a single output
which has been removed.

[Chrome Platform Status](https://www.chromestatus.com/feature/5702493226926080) &#124;
[Chromium Bug](https://crbug.com/691806)

### Remove insecure usage of DeviceMotionEvent

Chromium has been showing deprecation warnings since 2015 whenever the API is
used in a non-secure browsing context. Chrome now restricts the API to secure
browsing contexts. This change brings Chromium’s implementations in line with
the privacy and security recommendations in the specification, and is aligned
with the overarching effort to deprecate powerful features on insecure origins.

[Chrome Platform Status](https://www.chromestatus.com/feature/5688035094036480) &#124;
[Chromium Bug](https://crbug.com/932078)


### Remove insecure usage of DeviceOrientationEvent

Chromium has been showing deprecation warnings since 2015 whenever the API is
used in a non-secure browsing context. Chrome now restricts the API to secure
browsing contexts. This change brings Chromium’s implementations in line with
the privacy and security recommendations in the specification, and is aligned
with the overarching effort to deprecate powerful features on insecure origins.

[Chrome Platform Status](https://www.chromestatus.com/feature/5468407470227456) &#124;
[Chromium Bug](https://crbug.com/932078)

## Deprecation policy

To keep the platform healthy, we sometimes remove APIs from the Web Platform which have run their course. There can be many reasons why we would remove an API, such as:

- They are superseded by newer APIs.
- They are updated to reflect changes to specifications to bring alignment and consistency with other browsers.
- They are early experiments that never came to fruition in other browsers and thus can increase the burden of support for web developers.

Some of these changes will have an effect on a very small number of sites. To mitigate issues ahead of time, we try to give developers advanced notice so they can make the required changes to keep their sites running.

Chrome currently has a <a href="http://www.chromium.org/blink#TOC-Launch-Process:-Deprecation"> process for deprecations and removals of API's</a>, essentially:

- Announce on the <a href="https://groups.google.com/a/chromium.org/forum/#!forum/blink-dev"> blink-dev</a> mailing list.
- Set warnings and give time scales in the Chrome DevTools Console when usage is detected on the page.
- Wait, monitor, and then remove the feature as usage drops.


You can find a list of all deprecated features on chromestatus.com using the <a href="https://www.chromestatus.com/features#deprecated"> deprecated filter </a> and removed features by applying the <a href="https://www.chromestatus.com/features#removed">removed filter</a>. We will also try to summarize some of the changes, reasoning, and migration paths in these posts.

