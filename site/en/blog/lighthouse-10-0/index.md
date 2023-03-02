---
layout: 'layouts/blog-post.njk'
title: What's new in Lighthouse 10
authors:
  - brendankenny
date: 2023-02-09
description: >
  Lighthouse 10 is here with new scoring and audits.
hero: 'image/MtjnObpuceYe3ijODN3a79WrxLU2/SM05YIr19Ucx2cUCx5lR.png'
alt: 'Lighthouse category scores, all 100'
tags:
  - new-in-lighthouse
  - lighthouse
  - chrome-112
---

[Lighthouse is a website auditing tool](/docs/lighthouse/overview/) that helps developers with opportunities and diagnostics to improve the user experience of their sites.

Lighthouse 10 is available immediately on the [command line through npm](https://www.npmjs.com/package/lighthouse) and in [Chrome Canary](https://www.google.com/chrome/canary/). It will land in Chrome stable in Chrome 112 and in [PageSpeed Insights](https://pagespeed.web.dev/) in the coming weeks.

## Scoring changes

The venerable [Time To Interactive (TTI)](https://web.dev/tti/) metric is being removed in Lighthouse 10, concluding the [deprecation process started in Lighthouse 8](https://github.com/GoogleChrome/lighthouse/blob/main/docs/v8-perf-faq.md#whats-the-story-with-tti). TTI's 10% score weight is shifting to [Cumulative Layout Shift (CLS)](https://web.dev/cls/), which will now account for 25% of the [overall performance score](/docs/lighthouse/performance/performance-scoring/#lighthouse-10).

TTI marks a point in time, but the way it's defined makes it overly sensitive to outlier network requests and long tasks. [Largest Contentful Paint (LCP)](/docs/lighthouse/performance/lighthouse-largest-contentful-paint/) and [Speed Index](/docs/lighthouse/performance/speed-index/) are usually better heuristics for a page's contents feeling loaded than a count of active network requests. [Total Blocking Time (TBT)](/docs/lighthouse/performance/lighthouse-total-blocking-time/) meanwhile handles long tasks and main-thread availability more robustly, and while not a direct proxy, tends to correlate better with [Core Web Vitals](https://web.dev/vitals/#core-web-vitals) as measured in the field.

CLS's increased weight is incidental to TTI's removal, but better reflects its importance as a Core Web Vital and will ideally increase focus for sites that still make unnecessary layout shifts.

We expect this to improve most pages' performance scores, since most pages tend to score better on CLS than TTI. In an analysis of 13 million page loads in the latest HTTP Archive run, 90% of those pages would see an improvement in their Lighthouse performance score, with 50% of them seeing a performance improvement of more than 5 points.

<figure>
  {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/jHmu88pYXtx1ShAUYgVS.png", alt="A Lighthouse score gauge, broken down by the metrics (FCP, SI, LCP, TBT, and CLS) that make up the total score", width="210", height="190" %}
</figure>

If for some reason you still need the Lighthouse TTI value (in a CI assertion, for example), it's still available unchanged in the Lighthouse JSON output, just with score weight 0 and hidden in the HTML report. Any scripted access of the JSON value should continue to work without changes.

## New audits

Lighthouse 10 brings a brand new performance audit and a significant change to another.

### Back/forward cache {: #bfcache }

The [back/forward cache (bfcache)](https://web.dev/bfcache/) is one of the most powerful tools available for improving a page's performance for real users. Beyond the normal browser cache, a page loaded from the bfcache will restore page layout and execution state nearly instantly, largely skipping all page load activity and getting your page in front of your users immediately as they navigate backward and forward through their history.

There are a few ways that a page can prevent the browser from restoring a page from the bfcache, however. This new Lighthouse audit actually navigates away from the test page and back again to test if it's bfcache-able, and lists the reasons if it fails.

<figure>
  {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/X0KOxBXEWQB0NCqUqvdl.png", alt="An example result from the bfcache audit, listing failures due to an open IndexDB connection and unload handlers in the page", width="800", height="402", class="screenshot" %}
</figure>

Take a look at the [bfcache audit's docs](/docs/lighthouse/performance/bf-cache/) for more information.

### Paste-preventing inputs

The old Best Practices audit "Allows users to paste into password fields" has been expanded to now check that pasting into any (non-readonly) input field will work. For most sites, preventing pasting is a net-negative user experience and prevents legitimate safety and accessibility workflows.

The new audit is now ["Allows users to paste into input fields" (`paste-preventing-inputs`)](/docs/lighthouse/best-practices/paste-preventing-inputs/).

## Node users

If you use Lighthouse as a Node library, there are a few programmatic breaking changes in this release you may need to account for. See the [10.0 changelog](https://github.com/GoogleChrome/lighthouse/releases/tag/v10.0.0) for full details.

Lighthouse 10 also ships with full TypeScript type declarations! Anything imported from `lighthouse` should now be typed, which should be particularly helpful if you're scripting [Lighthouse user flows](https://web.dev/lighthouse-user-flows/).

<figure>
  {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/VlPiDhDRI96PCBWyPm7x.png", alt="A Node script importing Lighthouse as a function, demonstrating that the options object passed into the function is now type checked by TypeScript", width="562", height="199" %}
</figure>

Try out the types and let us know if you run into any issues using them.

## Running Lighthouse {: #running-lighthouse }

Lighthouse is available in [Chrome DevTools](/docs/devtools/overview/), [npm](https://www.npmjs.com/package/lighthouse) (as a Node module and a CLI tool), and as a browser extension (in [Chrome](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/google-lighthouse/)). It also powers several Google services, including [PageSpeed Insights](https://pagespeed.web.dev/).

To try the Lighthouse Node CLI, use the following commands:

```text
npm install -g lighthouse
lighthouse https://www.example.com --view
```

## Get in touch with the Lighthouse team {: #contact-us }

To discuss the new features, changes in the Lighthouse 10 release, or anything else related to Lighthouse:

- Report an issue or submit feedback in the [Lighthouse GitHub issue tracker](https://github.com/GoogleChrome/lighthouse/issues).
- Ask questions in the [Lighthouse GitHub discussion forums](https://github.com/GoogleChrome/lighthouse/discussions).
- Reach out to the Lighthouse team on Twitter <a href="https://twitter.com/intent/tweet?text=@____lighthouse" target="_blank">@____lighthouse</a>.
