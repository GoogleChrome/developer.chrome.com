---
layout: 'layouts/blog-post.njk'
title: Aligning timers with cross origin isolation restrictions
authors:
  - yoavweiss
  - agektmr
description: Starting in Chrome 91, the resolution of explicit timers will be restricted to 100 microseconds across platforms without cross-origin isolation.
date: 2021-04-21
hero: 'image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/mnoYgEv2E9L6eSThY9G4.jpg'
alt: A stopwatch
---

Before version 91,
[timer resolutions](https://www.w3.org/TR/hr-time/)
in Chrome were restricted to 5 microseconds on desktop,
where [site-isolation](https://www.chromium.org/Home/chromium-security/site-isolation) is enabled,
and to 100 microseconds on Android, where it's not.

Starting from version 91, following a [specification change](https://github.com/w3c/hr-time/pull/93),
Chrome will be restricting the resolution of explicit [timers](https://www.w3.org/TR/hr-time/)
(`performance.now()`, `performance.timeOrigin()`,
and other performance APIs that expose `DOMHighResTimestamps`) to 100 microseconds across platforms.
By enabling [cross-origin isolation](https://web.dev/coop-coep/),
websites can relax the restriction to 5 microseconds regardless of platform.

{% Aside %}
A microsecond is one millionth of a second (0.000001 seconds). Therefore, 5 microseconds is 0.000005 seconds.
{% endAside %}

Gaining more powerful capabilities by enabling cross-origin isolation is
[a similar approach posed on `SharedArrayBuffer`](/blog/enabling-shared-array-buffer/).
Cross-origin isolation is a state where a web page is isolated from other origins except ones that opted-in.

## Do I need to do something about it?

Probably not. `performance.now()` has been limited to significantly more coarse resolutions in other browsers
(for example, 1 millisecond = 0.001 seconds),
so you shouldn't have relied on the current resolution anyway.

At the same time,
if you wish to benefit from higher resolution for your timers,
for example for more accurate performance measurements,
you would need to make sure your site is
[cross-origin isolated](https://web.dev/coop-coep).
That would provide you with better resolution both in Chrome and other Chromium based browsers,
[as well as Firefox](https://github.com/mozilla/standards-positions/issues/502#issuecomment-801003513).

## What do timers have to do with cross-origin isolation?

Browser vendors decided to limit the timers to more coarse resolutions
(as well as the availability of SharedArrayBuffers which can be used as implicit timers)
when [Spectre](https://en.wikipedia.org/wiki/Spectre_(security_vulnerability)) was discovered.
This is because Spectre,
and similar speculative execution attacks,
rely on timers to measure the time certain operations take,
then guess the contents of the process' memory.

While speculative execution attacks can be executed with coarse timers,
high-resolution timers can speed them up.
Chrome used its
[site-isolation](https://www.chromium.org/Home/chromium-security/site-isolation)
architecture, as well as other [mechanisms](https://www.chromium.org/Home/chromium-security/corb-for-developers),
to mitigate the risk and re-enabled those functionalities,
but it is limited to desktop platforms and Chromium browsers only.
Having APIs relying on the underlying browser architecture isn't really ideal.

Cross-origin isolation provides the standard baseline for browsers to run pages in an isolated environment
such that they are unable to load unwilling cross-origin resources,
and therefore, are not at risk for Spectre.
With cross-origin isolation,
we can now allow pages to access high-resolution timers,
`SharedArrayBuffer`,
and other APIs that are unsafe to expose in processes that can read arbitrary cross-origin data.

To learn more about the background behind this change, read
[Why you need "cross-origin isolated" for powerful features](https://web.dev/why-coop-coep/).

Cover photo by [Linda Perez Johannessen](https://unsplash.com/@linper?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
on [Unsplash](https://unsplash.com/s/photos/stopwatch?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).
