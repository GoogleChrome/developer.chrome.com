---
# Required
layout: 'layouts/blog-post.njk'
title: Removing HTTP/2 Server Push from Chrome
description: |
  HTTP/2 Server Push will be disabled by default in Chrome 106
authors:
  - tunetheweb
date: 2022-08-18
updated: 2022-10-14
hero: image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/1h03ZSAhmvQcyWzs1LGC.jpg
alt: Dust covered button labeled Push
tags:
  - news
  - performance
  - deprecations-removals
  - chrome-106
---

Following on from [the previous announcement](https://groups.google.com/a/chromium.org/g/blink-dev/c/K3rYLvmQUBY/m/vOWBKZGoAQAJ), support of HTTP/2 Server Push will be disabled by default in Chrome 106 and other Chromium-based browsers in their next releases.

## Why is this being removed?

HTTP/2 Server Push allowed websites to proactively send resources needed by the page instead of waiting for them to be requested. However, it was problematic as Jake Archibald [wrote about previously](https://jakearchibald.com/2017/h2-push-tougher-than-i-thought), and the performance benefits were often difficult to realize. As a result, it was not used much with [only 1.25% of HTTP/2 sites making use of this feature.](https://almanac.httparchive.org/en/2021/http#fig-19)

Analysis of the use of HTTP/2 Server Push has mixed results ([Chrome](https://github.com/httpwg/wg-materials/blob/gh-pages/ietf102/chrome_push.pdf), [Akamai](https://github.com/httpwg/wg-materials/blob/gh-pages/ietf102/akamai-server-push.pdf)), without a clear net performance gain and in many cases performance regressions.

Push was not implemented in many HTTP/3 servers and clients—even though it was included in [the specification](https://www.rfc-editor.org/rfc/rfc9114.html#name-server-push). For much of the web [that is using the newer HTTP/3](https://httparchive.org/reports/state-of-the-web#h3), Push has effectively been retired already. When rerunning that analysis more recently, we see that 1.25% HTTP/2 support by sites dropped to 0.7%.

## Alternatives to HTTP/2 Server Push

[103 Early Hints](/blog/early-hints/) is a much less error-prone alternative with many of the same upsides as Push, and a lot less of the downsides. Rather than the server pushing _resources_, 103 Early Hints sends only _hints_ to the browser of resources that it may benefit from requesting immediately. This leaves the browser in control of deciding whether it needs these or not—for example if it already has those resources in the HTTP cache.

[Preloading critical resources](https://web.dev/preload-critical-assets/) is another alternative that allows the page and the browser to work together to preemptively load critical resources early in the page load. While this does require the page itself to be sent first—so is not quite as fast as either Server Push nor Early Hints—it has the added benefit of not delaying that critical page resource, which can happen with both of those solutions.

{% Aside 'caution' %}
All solutions that attempt to load resources early can cause performance degradation and should be used in moderation. The browser is often very good at making the right choices, but sometimes can benefit from a little help in some cases. With emphasis on "little".
{% endAside %}

## Conclusion

The web needs to be able to try things, and discard them when they are not used. Although the potential for Push sounded great, in reality using it was more problematic than envisaged. However, we learned a lot from Push that went into the design of 103 Early Hints. Now it's time to complete the progression and move away from Push.

## Related links

- [All deprecations and removals in Chromium](/tags/deprecations-removals/)
- ChromeStatus entry: [Remove HTTP/2 push](https://chromestatus.com/feature/6302414934114304)
- Intent to Remove: [HTTP/2 and gQUIC server push](https://groups.google.com/a/chromium.org/g/blink-dev/c/K3rYLvmQUBY/m/vOWBKZGoAQAJ)
- Chromium issue: [Turn HTTP/2 Push off by default](https://bugs.chromium.org/p/chromium/issues/detail?id=1355929)

## Acknowledgements

_Hero image by [Scott Rodgerson](https://unsplash.com/@scottrodgerson) on [Unsplash](https://unsplash.com/photos/AdVK4iQ3-OY)_
