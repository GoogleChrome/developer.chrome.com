---
layout: 'layouts/doc-post.njk'
title: Avoid enormous network payloads
description: |
  Learn how to improve your web page's load time by reducing the total file
  size of resources you serve to your users.
date: 2019-05-02
updated: 2020-05-29
---

Large network payloads are highly correlated with long load times.
They also cost users money;
for example, users may have to pay for more cellular data.
So, reducing the total size of your page's network requests is good
for your users' experience on your site _and_ their wallets.

{% Aside %}
To see what accessing your site costs around the world,
check out WebPageTest's [What Does My Site Cost?](https://whatdoesmysitecost.com/)
You can adjust the results to factor in purchasing power.
{% endAside %}

## How the Lighthouse network payload audit fails

[Lighthouse](/docs/lighthouse/overview/)
shows the total size in [kibibytes (KiB)](https://en.wikipedia.org/wiki/Kibibyte) of all resources requested by your page.
The largest requests are presented first:

<figure>
  {% Img src="image/tcFciHGuF3MxnTr1y5ue01OGLBn2/cCFb8MJkwnYquq3K9UmX.png", alt="A screenshot of the Lighthouse Avoid enormous network payloads audit", width="800", height="518" %}
</figure>

Based on [HTTP Archive data](https://httparchive.org/reports/state-of-the-web?start=latest#bytesTotal),
the median network payload is between 1,700 and 1,900&nbsp;KiB.
To help surface the highest payloads,
Lighthouse flags pages whose total network requests exceed 5,000&nbsp;KiB.

{% Partial 'lighthouse-performance/scoring.njk' %}

## How to reduce payload size

Aim to keep your total byte size below 1,600&nbsp;KiB.
This target is based on the amount of data that can be
theoretically downloaded on a 3G connection
while still achieving a [Time to Interactive](http://web.dev/tti/) of 10&nbsp;seconds or less.

Here are some ways to keep payload size down:

- Defer requests until they're needed.
  See the [PRPL Pattern](https://web.dev/apply-instant-loading-with-prpl/) for one possible approach.
- Optimize requests to be as small as possible. Possible techniques include:
  - [Minify and compress network payloads](https://web.dev/reduce-network-payloads-using-text-compression/).
  - [Use WebP instead of JPEG or PNG for your images](https://web.dev/serve-images-webp/).
  - [Set the compression level of JPEG images to 85](https://web.dev/use-imagemin-to-compress-images/).
- Cache requests so that the page doesn't re-download the resources
  on repeat visits. (See the [Network reliability landing page](https://web.dev/reliable/)
  to learn how caching works and how to implement it.)

## Stack-specific guidance

### Angular

Apply [route-level code splitting](https://web.dev/route-level-code-splitting-in-angular/) to
minimize the size of your JavaScript bundles. Also, consider precaching assets
with the [Angular service
worker](https://web.dev/precaching-with-the-angular-service-worker/).

### Drupal

Consider using [Responsive Image
Styles](https://www.drupal.org/docs/8/mobile-guide/responsive-images-in-drupal-8)
to reduce the size of images loaded on your page. If you are using Views to show
multiple content items on a page, consider implementing pagination to limit the
number of content items shown on a given page.

### Joomla

Consider showing excerpts in your article categories (one popular solution is a "read more"
link), reducing the number of articles shown on a given page, breaking your long
posts into multiple pages, or using a plugin to lazy-load comments.

### WordPress

Consider showing excerpts in your post lists (you can use the "more" tag), reducing
the number of posts shown on a given page, breaking your long posts into
multiple pages, or using a plugin to lazy-load comments.

## Resources

[Source code for **Avoid enormous network payloads** audit](https://github.com/GoogleChrome/lighthouse/blob/main/core/audits/byte-efficiency/total-byte-weight.js)
