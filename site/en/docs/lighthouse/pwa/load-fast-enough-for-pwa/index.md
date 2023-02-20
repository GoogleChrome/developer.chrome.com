---
layout: 'layouts/doc-post.njk'
title: Page load is not fast enough on mobile networks
description: |
  Learn how to make your web page load quickly on mobile networks.
date: 2019-05-04
updated: 2020-06-10
---

Many users of your page visit on a slow cellular network connection.
Making your page load quickly on a mobile network
helps to ensure a positive experience for your mobile users.

{% Aside 'note' %}
A fast page load on a mobile network is a baseline requirement for a site
to be considered a Progressive Web App. See the
[Core Progressive Web App checklist](https://web.dev/pwa-checklist/#core).
{% endAside %}

## How the Lighthouse page load speed audit fails

[Lighthouse](/docs/lighthouse/overview/)
flags pages that don't load fast enough on mobile:

<figure>
  {% Img src="image/tcFciHGuF3MxnTr1y5ue01OGLBn2/Cg0UJ1Lykj672ygYYeXo.png", alt="Lighthouse audit showing page doesn't load fast enough on mobile", width="800", height="98" %}
</figure>

Two main metrics affect how users perceive load time:

- [First Meaningful Paint (FMP)](/docs/lighthouse/performance/first-meaningful-paint), which measures when the primary content of the page appears visually complete
- [Time to Interactive (TTI)](https://web.dev/tti/), which measures when the page is fully interactive

For example, if a page appears visually complete after 1&nbsp;second,
but the user can't interact with it for 10&nbsp;seconds,
users will likely perceive the page load time as 10&nbsp;seconds.

Lighthouse computes what the TTI would be on a slow 4G network connection.
If the time to interactive is more than 10&nbsp;seconds, the audit fails.

{% Partial 'lighthouse-pwa/scoring.njk' %}

{% Partial 'lighthouse-performance/improve.njk' %}

## Resources

- [Source code for **Page load is not fast enough on mobile networks** audit](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/load-fast-enough-for-pwa.js)
- [Baseline Progressive Web App Checklist](https://web.dev/pwa-checklist/#core)
- [Critical Rendering Path](https://web.dev/critical-rendering-path/)
- [Get Started With Analyzing Runtime Performance](/docs/devtools/evaluate-performance/)
- [Record load performance](/docs/devtools/evaluate-performance/reference/#record-load)
- [Optimizing Content Efficiency](https://web.dev/performance-optimizing-content-efficiency/)
- [Rendering Performance](https://web.dev/rendering-performance/)
