---
# Required
layout: 'layouts/blog-post.njk'
title: Speeding up LCP with cross-site prefetching
description: >
  An introduction to readily available technologies.
subhead: >
  An introduction to readily available technologies.
date: 2022-05-11
authors:
  - kenjibaheux
  - buettner
  - twifkak
tags:
  - performance
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/USMEAsMfpMbiOQD4SbQa.jpg'
alt: >
  Light trails from cars on a highway at night.
---

## Why does page load speed matter?

Most users routinely identify slow page loads as a major source of frustration (54% in a user study conducted by Google). So, it should not come as a surprise that faster page loads result in better outcomes for a business. Indeed, if visitors get frustrated even before they interact with a website, it's very unlikely that they will stay long enough to appreciate its value. In fact, another Google study across 254 eCommerce, finance, and travel sites showed that sites which load in two seconds or less had 15% higher conversion rates.

## Speeding up Largest Contentful Paint (LCP)

As the saying goes, you can't improve what you don't measure. For user experiences on the web, we believe that [Core Web Vitals](https://web.dev/vitals/#core-web-vitals) constitute a solid set of user-centric metrics designed to capture fundamental aspects of the user experience. In particular, [Largest Contentful Paint (LCP)](https://web.dev/lcp/) measures your pages' loading performance by reporting the time it takes to display the largest text or image block that the user sees. To provide a good user experience, LCP should occur within 2.5 seconds of when the page first starts loading (namely, the good LCP threshold).

Let's look at what contributes to the LCP of a typical page. 

<figure>
  {% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/v5Fl8GPalSO3brhBWGds.png", alt="Page loading waterfall.", width="800", height="450" %}
  <figcaption>A typical waterfall required to load a web page</figcaption>
</figure>

When a user visits a page, the browser requests the HTML from the server. The server responds with the HTML, which gives the browser more hints on what to fetch next, including CSS, JavaScript, fonts, and images. As these responses come back, the browser must also do some work to evaluate them, and eventually lay out and paint components on the page. But the majority of time is spent waiting for those packets to travel from the device to the server and then back to the device. In fact, our data (Chrome for Android; median) show that about 40% of user-visible latency is typically spent by the browser waiting for [the very first byte](https://web.dev/ttfb/) to come back from the server.

## The power of prefetching

If one could prefetch all these files—that is, fetch them before the user visits the page—then this would provide a massive speed boost, only leaving a few tasks before displaying the page: evaluating, calculating the layout, and painting.

<figure>
  {% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/9UOE4fsPHr7SYLkmO2zZ.png", alt="Streamlined waterfall.", width="800", height="450" %}
  <figcaption>With all resources preloaded, the waterfall is perfectly streamlined.</figcaption>
</figure>

Given the data shared earlier, one could also just prefetch the main resource and still achieve a significantly faster page load. In the same-site case, this type of technique is readily available with primitives such as [`rel=prefetch`](https://web.dev/link-prefetch/). However, with cross-site scenarios, it's not as straightforward.

## Cross-site navigations

While prefetching has been around for a while, an additional consideration is warranted when prefetching pages from one site while the user is on another. 

Suppose that a referrer site were to instruct the browser to prefetch a page from a different site. Obviously, when the user clicks on the link to this prefetched page, they would enjoy a better user experience with a much faster page load. However, what if the user never clicks on this link? They wouldn't expect a linked website to learn that they might have been interested in a topic while they were browsing for it on the referrer site. And, yet this is a substantial risk because the prefetching requests would carry the user's IP address, and cookies if any, as any other regular request.

## Solutions

To enable privacy-safe cross-site prefetching, we've developed two solutions over the last 3 years: [Private Prefetch Proxy](/blog/private-prefetch-proxy) and [Signed Exchanges (SXG)](http://goo.gle/sxg-info). We also ran a large-scale experiment to confirm that cross-origin prefetch delivers significant speed benefits. Concretely, when we looked at instances where Google was able to safely prefetch the main HTML for the user's next navigation, we saw that the fraction of page loads with "good" LCP increased by 14 percentage points!

## Key considerations

While Private Prefetch Proxy and Signed Exchange solve the same use case, each technology presents a different set of trade-offs. So, the best choice really depends on your site's specific needs. To help you get a sense of the trade-offs involved, the following sections cover two key considerations for enabling cross-site prefetching and choosing between the two technologies available. You will also find more details in the deep dive articles for each technology.

### Repeat visitors

Cross-site prefetching is easy to enable for users who visit your site for the first time. For repeat visitors, it depends on how much personalization goes on your site. This comes down to the fact that cross-site prefetch requests can't include cookies for privacy reasons.

-  For first-time visitors, this restriction does not introduce any challenge because these visitors have no cookies to begin with. Consequently, you can enable cross-site prefetching for these users without any changes to your site.
-  If you'd like to enable cross-site prefetching for repeat visitors and your site is personalized based on cookies, you will need to lazy-load these personalized elements after the user navigates. This works because upon navigation, the restriction on cookies is no longer needed since  the user explicitly chose to visit your website. So, at navigation time, your site has access to its cookies as usual. For concrete guidance, see these [best practices for lazy-loading](https://web.dev/lazy-loading/). 
    -  If you currently encode personalization directly into your HTML, you can still continue to do so when cookies are present, and use lazy-loading as a fallback strategy for prefetched pages.
    -  If your site is not personalized based on cookies, or if the personalization isn't critical, you can choose to serve the same content to your repeat visitors as you would to first-time visitors.

At the moment, Private Prefetch Proxy is only enabled for first-time visitors (links without cookies) with on-going work to expand coverage to repeat visitors (links with cookies). On the other hand, Signed Exchange already supports cross-site prefetching for both first-time and repeat visitors (with the approaches outlined above).

### Extra data serving from prefetch

Enabling cross-site prefetching can result in extra data serving. Indeed, if a referrer prefetches your page but the user doesn't click on the link, this would represent additional traffic for you.

-  To mitigate this, one could request that the referrer be less aggressive with their prefetch requests. Similarly, the referrer, or the browser, can mitigate this by focusing on relatively lightweight, yet critical, resources (for example, main resource, critical CSS, or JavaScript sub-resources). This is essentially a trade-off between speed benefits and extra traffic.
-  Alternatively, one could offset this traffic by opting into additional caching (see [this section on Signed Exchange](https://web.dev/signed-exchanges/#:~:text=The%20expires%20parameter%20in%20the%20signature%20indicates%20a%20SXG%27s%20expiration%20date.%20A%20SXG%20may%20be%20valid%20for%20at%20most%207%20days.%20Find%20more%20information%20on%20the%20signature%20header%20in%20the%20Signed%20HTTP%20Exchanges%20spec)  for more details). The downside here would be that caching content for too long can result in showing older information to your users. This is essentially a trade-off between extra data serving and content freshness.

To make the best decision here, ask yourself where your site is on the sliding scale between maximum freshness and minimal additional requests. The answer to this question ultimately depends on the specific needs of your business and your users.

## Getting started

These technologies have been integrated on Google Search so that sites may begin improving their LCP immediately. We hope that this will also encourage other popular referrers to follow suit and help make the web a lot faster across the board!

While these technologies both solve the same use case, they offer different trade-offs on the key considerations explained earlier. You may even decide to start with one technology and graduate to the other as your needs, or appreciation of the benefits, evolve. See these deep dives to find out which technology is the best path forward for your particular situation:

-  [Deep dive on Private Prefetch Proxy](/blog/private-prefetch-proxy)
-  [Deep dive on Signed Exchange](http://goo.gle/sxg-info)