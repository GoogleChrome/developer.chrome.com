---
layout: 'layouts/blog-post.njk'
title: What's new in Lighthouse 8.4
authors:
  - brendankenny
date: 2021-09-09
description: >
  Lighthouse 8.4 now guards against lazily-loading LCP images and failing FID without a mobile viewport.
tags:
  - new-in-lighthouse
  - lighthouse
  - chrome-95
---
Lighthouse is an automated website auditing tool that helps developers with opportunities and diagnostics to improve the user experience of their sites. It's available in Chrome DevTools, npm (as a Node module and a CLI), or as a browser extension (in [Chrome](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/google-lighthouse/)). It powers many Google services, including [web.dev/measure](https://web.dev/measure/) and [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights).

Lighthouse 8.4 is available immediately on the command line and in [Chrome Canary](https://www.google.com/chrome/canary/).
It will land in Chrome Stable in Chrome 95 and be available in [PageSpeed Insights](https://web.dev/whats-new-pagespeed-insights/) within a week.

To try the Lighthouse Node CLI, use the following commands:

```text
npm install -g lighthouse
lighthouse https://www.example.com --view
```

See the full list of changes in the [8.4 changelog](https://github.com/GoogleChrome/lighthouse/releases/tag/v8.4.0).

## New audits

### Don't lazy-load Largest Contentful Paint images {: #new-audit-lazy-lcp }

Lazy-loading images can be an effective way to defer offscreen images so they don't interfere with loading the content that is [above the fold](https://web-dev.imgix.net/image/admin/t3Kkvh265zi6naTBga41.png?auto=format&w=845).

However, if a page's [LCP](https://web.dev/lcp/) element is an image, lazy-loading it can have a significant negative effect on the LCP. The browser may put the image in the queue and fetch other resources first, instead of prioritizing the image for immediate download. A [recent study of lazy-loading in WordPress](https://web.dev/lcp-lazy-loading/) found that LCP can improve by as much as 15% for some sites if images in the initial viewport are not lazy-loaded.

{% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/u9nepJj3wgpMgoNxSaDZ.png", alt="The lazy-loaded LCP audit in a Lighthouse report", width="800", height="502", class="screenshot" %}

Lighthouse will now detect if the LCP element was a lazy-loaded image and recommend removing the `loading` attribute from it.

For more information, see the [initial proposal](https://github.com/GoogleChrome/lighthouse/issues/12785) and the [implementation pull request](https://github.com/GoogleChrome/lighthouse/pull/12838).

### Set a mobile viewport for a better First Input Delay  {: #new-audit-viewport }

The `viewport` audit has been a part of the Best Practices category for years, but 8.4 welcomes this advice to the Performance category as well.

Many mobile browsers support "double tap to zoom" to allow users to easily magnify content not designed for a mobile screen, that is, content without an explicit mobile `<meta name="viewport">`. In practice, this means the browser [needs to wait as much as 300&nbsp;ms after a user tap](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away) to see if a second tap will follow, and during that time the page can't respond to the initial tap. This translates to a [failing FID](https://web.dev/fid/) of several hundred milliseconds.

{% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/FN6XOPqkFfZ8Ii9fIQOm.png", alt="The mobile-viewport audit in a Lighthouse report", width="800", height="344", class="screenshot" %}

In a recent study of data from the [HTTP Archive](https://httparchive.org/), over half of the sites that received a score of 90 or higher in Lighthouse, but failed at least one Core Web Vital, did not have a mobile viewport set and were failing FID. As a result, the Lighthouse performance section will now recommend adding a viewport like the following if none is found:

```html
<meta name="viewport" content="width=device-width">
```

For more details, see the [proposal issue](https://github.com/GoogleChrome/lighthouse/issues/12884) and [implementation pull request](https://github.com/GoogleChrome/lighthouse/pull/12972).

## Getting in touch with the Lighthouse team {: #contact-us }

To discuss the new features, changes in the version 8.4, or anything else related to Lighthouse:

- Report an issue or submit feedback via the [Lighthouse GitHub repo](https://github.com/GoogleChrome/lighthouse).
- Reach out to the Lighthouse team on Twitter <a href="https://twitter.com/intent/tweet?text=@____lighthouse" target="_blank">@____lighthouse</a>.
