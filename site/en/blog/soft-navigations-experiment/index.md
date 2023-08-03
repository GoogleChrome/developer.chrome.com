---
# Required
layout: 'layouts/blog-post.njk'
title: Experimenting with measuring soft navigations
description: |
 The Chrome team is working on better measuring so-called soft navigations used by Single Page Applications and a new API is now available behind a flag to allow sites to experiment with this too.
authors:
 - tunetheweb
 - yoavweiss
date: 2023-02-01
updated: 2023-07-04
hero: image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/ZJLD5QJvoFcWXkqF8m5P.jpg
alt: A compass on top of some booklets labeled Field Notes
tags:
 - performance
 - chrome-110
 - origin-trials
---

Since its launch, the [Core Web Vitals initiative](https://web.dev/vitals/) has sought to measure the actual user experience of a website, rather than technical details behind how a website is created or loaded. The three Core Web Vitals metrics were created as [user-centric metrics](https://web.dev/user-centric-performance-metrics/)—an evolution over existing technical metrics such as[`DOMContentLoaded`](https://developer.mozilla.org/docs/Web/API/Document/DOMContentLoaded_event) or [`load`](https://developer.mozilla.org/docs/Web/API/Window/load_event) that measured timings that were often unrelated to how users perceived the performance of the page. Because of this, the technology used to build the site should not impact the scoring providing the site performs well.

The reality is always a little trickier than the ideal, and the popular Single Page Application architecture has [never been fully supported by the Core Web Vitals metrics](https://web.dev/vitals-spa-faq/). Rather than loading distinct, individual web pages as the user navigates about the site, these web applications use so-called “soft navigations”, where the page content is instead changed by JavaScript. In these applications, the illusion of a traditional webpage architecture is maintained by altering the URL and pushing previous URLs in the browser’s history to allow the back and forward buttons to work as the user would expect.

Many JavaScript frameworks use this model, but each in a different way. Since this is outside of what the browser traditionally understands as a “page”, measuring this has always been difficult: where is the line to be drawn between an interaction on the _current_ page, versus considering this as a _new_ page?

The Chrome team has been been considering this challenge for some time now, and is looking to standardize a definition of what is a “soft-navigation”, and how the Core Web Vitals can be measured for this—in a similar way that websites implemented in the traditional multi-page architecture (MPA) is currently measured. While still in early stages, the team is now ready to make what has already been implemented more widely available for sites to experiment with. This will allow sites to provide feedback on the approach so far.

## What is a soft navigation?

We have come up with the following definition of a _soft navigation_:

- The navigation is initiated by a user action.
- The navigation results in a visible URL change to the user, and a history change.
- The navigation results in a DOM change.

For some sites, these heuristics may lead to false positives (that users would not really consider a "navigation" to have happened) or false negatives (where the user does consider a “navigation” to have happened despite not meeting the above criteria). We welcome feedback at [the soft navigation specification repository](https://github.com/WICG/soft-navigations/issues) on the heuristics.

### How does Chrome implement soft navigations?

Once the soft navigation heuristics are enabled (more on this in the next section), Chrome will change the way it reports some performance metrics:

- A `soft-navigation` [`PerformanceTiming`](https://developer.mozilla.org/docs/Web/API/PerformanceTiming) event will be emitted after each soft navigation is detected.
- The performance API will provide access to a `soft-navigation` timing entry, as emitted by the above `PerformanceTiming` event.
- The [First Paint (FP)](https://developer.mozilla.org/docs/Glossary/First_paint), [First Contentful Paint (FCP)](https://web.dev/fcp/), [Largest Contentful Paint (LCP)](https://web.dev/lcp/) metrics will be reset, and re-emitted on the next appropriate occurrences of these.
- The [First Input Delay (FID)](https://web.dev/fcp/) will be reset, and re-emitted on the first input (note: this is not yet implemented).
- A `navigationId` attribute will be added to each of performance timings (`first-paint`, `first-contentful-paint`, `largest-contentful-paint`, `first-input-delay`, `event`, `layout-shift`) corresponding to the navigation entry the event was related to, allowing [Cumulative Layout Shift (CLS)](https://web.dev/cls/) and [Interaction to Next Paint (INP)](https://web.dev/inp/) to be calculated. _Note: this is [subject to change](#reporting-the-metrics-against-the-appropriate-url)._

These changes will allow the Core Web Vitals—and some of the associated diagnostic metrics—to be measured per page navigation, though there are some nuances that need to be considered.

### What are the implications of enabling soft navigations in Chrome?

The following are some of the changes that sites owners need to consider after enabling this feature:

- Additional FP, FCP, LCP, and FID events may be re-emitted for soft navigations. The [Chrome User Experience Report (CrUX)](/docs/crux/) will ignore these additional values, but this may affect any Real User Measurement (RUM) monitoring on your site. Check with your RUM provider if you have any concerns if this will impact those measurements. See [the section below on measuring Core Web Vitals for soft navigations](#how-can-i-measure-core-web-vitals-per-soft-navigation).
- The new (and optional) `navigationID` attribute on your performance entries may need to be considered in your application code using these entries.
- Only Chromium-based browsers will support this new mode. While many of the newer metrics are only available in Chromium-based browsers, some (FCP, FID) are available in the other browsers, and not everyone may have upgraded to the latest version of Chromium-based browsers. So be aware that some users may not report soft-navigation metrics.
- As an experimental new feature that is not enabled by default, sites should test this functionality to ensure there are not any other unintended side-effects.

For more information on how to measure the metrics for soft navigations, see [below](#how-can-i-measure-core-web-vitals-per-soft-navigation).

### How do I enable soft navigations in Chrome?

Soft navigations are not enabled by default in Chrome, but are available for experimentation from Chrome 110 by explicitly enabling this functionality.

For developers, this can be enabled by turning on the _Experimental Web Platform features_ flag at `chrome://flags/#enable-experimental-web-platform-features` or by using the `--enable-experimental-web-platform-features` command line argument when launching Chrome.

For a website that wishes to enable this for all their visitors to see the impact, there is an origin trial running from Chrome 110 to Chrome 114 which can be enabled by signing up for the trial and including a meta element with the origin trial token in the HTML or HTTP header. See the [Get started with origin trials](/docs/web-platform/origin-trials/) post for more information.

Site owners can choose to include the origin trial on their pages for all, or for just a subset of users. Be aware of the [implications section](#what-are-the-implications-of-enabling-soft-navigations-in-chrome) above as to how this changes how your metrics may be reported, especially if enabling this origin trial for a large proportion of your users. Note that CrUX will continue to report the metrics in the existing manner regardless of this soft navigation setting so is not impacted by those implications. It should also be noted that origin trials are also limited to enabling experimental features on a maximum of 0.5% of all Chrome page loads as a median over 14 days, but this should only be an issue for very large sites.

{% Aside 'important' %}
The Soft Navigations origin trial has now ended. The Chrome team are taking onboard the feedback received and will be making some adjustments and are aiming to relaunch a second origin trial from Chrome 117 (due for release in September 2023) for further feedback.
{% endAside %}

## How can I measure Core Web Vitals per soft navigation?

To includes soft navigations you need to include `includeSoftNavigationObservations: true` in your performance observer's `observe` call:

```js
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log('LCP candidate:', entry.startTime, entry);
  }
}).observe({type: 'largest-contentful-paint', buffered: true, includeSoftNavigationObservations: true});
```

This extra flag on the `observe` method is needed in addition to [enabling the soft navigation functionality in Chrome](#how-do-i-enable-soft-navigations-in-chrome). This explicit opt-in at the performance observer level is to [ensure existing performance observers aren't surprised by these extra entries](https://github.com/WICG/soft-navigations/issues/11) as some considerations need to be taken into account when attempting to measure Core Web Vitals for soft navigations.

Some metrics have traditionally been measured throughout the life of the page: LCP, for example, can change until an interaction occurs. CLS, FID and INP can be updated until the page is navigated away from. Therefore each “navigation” (including the original navigation) will need to finalize these metrics as each new soft navigation occurs.

Similarly, when starting to measure the metrics for the new soft navigation of these long-lived metrics, metrics will need to be “reset” or “reinitialized” and treated as new metrics, with no memory of the values that were set for previous “pages”.

Timings will still be returned in respect of the original “hard” navigation start time. So to calculate LCP for a soft navigation for example, you will need to take the LCP timing and subtract the appropriate soft navigation start time to get a timing relative to the soft navigation. This has been done to keep all timings consistent so other performance timings (such as event timings) that are not measured from the “navigation” time can be treated the same.

### Reporting soft navigations

Once the soft navigations experiment is enabled, the metrics will be reporting via the [`PerformanceObserver`](https://developer.mozilla.org/docs/Web/API/PerformanceObserver) API as usual, but with an additional `navigationId` added to each metric, corresponding to the navigation entry the metric was emitted for.

{% Aside 'note' %}
Note: [FID is not currently reported](https://bugs.chromium.org/p/chromium/issues/detail?id=1407656) for soft navigations.
{% endAside %}

You can use a `PerformanceObserver` to observe soft navigations. Below is an example code snippet that logs soft navigation entries to the console—including previous soft navigations on this page via the `buffered` option:

```js
const observer = new PerformanceObserver(console.log);
observer.observe({ type: "soft-navigation", buffered: true, includeSoftNavigationObservations: true });
```

This can be used to finalize full-life page metrics for the previous navigation.

### Reporting the metrics against the appropriate URL

As soft navigations can only be seen after they have occurred, some metrics will need to be finalized upon this event, and then reported for the previous URL, as the current URL will now reflect the updated URL for the new page.

The `navigationID` attribute of the appropriate `PerformanceEntry` can be used to tie the event back to the correct URL. This can be looked up with the [`PerformanceEntry` API](https://developer.mozilla.org/docs/Web/API/PerformanceEntry):

```js
pageUrl =
  performance.getEntriesByType('soft-navigation')[navigationId - 2]?.name
  || performance.getEntriesByType('navigation')[0]?.name
```

Here we are subtracting `2` as the first soft navigation is `2` and `getEntriesByType` returns an array, which like all JavaScript arrays, is zero-indexed.

{% Aside 'warning' %}
There are discussions on [whether there are better ways to link event entries to the navigation entries](https://github.com/WICG/soft-navigations/issues/12), so this may change.
{% endAside %}

This `pageUrl` should be used to report the metrics against the correct URL, rather than the current URL that they may have used in the past.

### Getting the `startTime` of soft navigations

The navigation start time can be obtained in a similar manner:

```js
startTime =
  performance.getEntriesByType('soft-navigation')[navigationId - 2]?.startTime
  || performance.getEntriesByType('navigation')[0]?.startTime
```

The `startTime` is the time of the initial interaction (for example, a button click) that initiated the soft navigation. Again, this is subject to change as noted above.

### How should content that remains the same between navigations be treated?

FP, FCP, and LCP for soft navigations will measure new paints only. This can result in a different LCP, for example, from a cold load of that soft navigation to a soft load.

For example, take a page that includes a large banner image that is the LCP element, but the text beneath it changes with each soft navigation. The initial page load will flag the banner image as the LCP element and base the LCP timing on that. For subsequent soft navigations, the text beneath will be the largest element painted after the soft navigation and will be the new LCP element. However, if a new page is loaded with a deep link into the soft navigation URL, the banner image will be a new paint and therefore will be eligible to be considered as the LCP element.

As this example shows, the LCP element for the soft navigation can be reported differently depending on how the page is loaded—in the same way as loading a page with an anchor link further down the page can result in a different LCP element.

### How to measure TTFB?

[Time to First Byte (TTFB)](https://web.dev/ttfb/) for a traditional page load represents the time that the first bytes of the original request are returned.

For a soft navigation this is a more tricky question. Should we measure the first request made for the new page? What if all the content already exists in the app and there are no additional requests? What if that request is made in advance with a prefetch? What if a request unrelated to the soft navigation from a user perspective (for example, it’s an analytics request)?

A simpler method is to report TTFB of 0 for soft navigations—in a similar manner as we recommend for [back/forward cache](https://web.dev/bfcache/) restores. This is the method the [`web-vitals` library](#using-the-web-vitals-library-to-measure-core-web-vitals-for-soft-navigations) currently uses for soft navigations.

In the future, we may support more precise ways of knowing which request is the soft navigation’s “navigation request” and will be able to have more precise TTFB measurements. But that’s not part of the current experiment.

### How to measure both old and new?

During this experiment, it is recommended to continue to measure your Core Web Vitals in the current manner, based on “hard” page navigations to match what CrUX will measure and report on as the official dataset of the Core Web Vitals initiative.

Soft navigations should be measured in addition to these to allow you to see how these might be measured in the future, and to give you the opportunity to provide feedback to the Chrome team about how this implementation works in practice. This will help you and the Chrome team to shape the API going forward.

To measure both, you need to be aware of the new events that may be issued while in soft navigation mode (for example, multiple FCP and additional LCP events) and handle these appropriately by finalizing these metrics at the appropriate time, while also ignoring future events that only apply to soft navigations.

### Using the `web-vitals` library to measure Core Web Vitals for soft navigations

The easiest way to take account of all the above nuances, is to use the [`web-vitals`](https://github.com/GoogleChrome/web-vitals) JavaScript library which has [experimental support for soft navigations](https://github.com/GoogleChrome/web-vitals/tree/soft-navs#report-metrics-for-soft-navigations-experimental) in a separate [`soft-navs branch`](https://github.com/GoogleChrome/web-vitals/tree/soft-navs) (which is also available on [npm](https://www.npmjs.com/package/web-vitals/v/soft-navs) and [unpkg](https://unpkg.com/web-vitals@soft-navs/dist/web-vitals.js?module)). This can be measured in the following way (replacing `doTraditionalProcessing` and `doSoftNavProcessing` as appropriate):

```js
import {
  onTTFB,
  onFCP,
  onLCP,
  onCLS,
  onFID,
  onINP,
} from 'https://unpkg.com/web-vitals@soft-navs/dist/web-vitals.js?module';

onTTFB(doTraditionalProcessing);
onFCP(doTraditionalProcessing);
onLCP(doTraditionalProcessing);
onCLS(doTraditionalProcessing);
onFID(doTraditionalProcessing);
onINP(doTraditionalProcessing);

onTTFB(doSoftNavProcessing, {reportSoftNavs: true});
onFCP(doSoftNavProcessing, {reportSoftNavs: true});
onLCP(doSoftNavProcessing, {reportSoftNavs: true});
onCLS(doSoftNavProcessing, {reportSoftNavs: true});
onFID(doSoftNavProcessing, {reportSoftNavs: true});
onINP(doSoftNavProcessing, {reportSoftNavs: true});
```

Ensure the metrics are reported against the correct URL [as noted above](#reporting-the-metrics-against-the-appropriate-url).

The `web-vitals` library currently reports the following metrics for soft navigations:

<table>
  <thead>
    <tr>
      <th>Metric</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TTFB</td>
      <td>Reported as 0.</td>
    </tr>
    <tr>
      <td>FCP</td>
      <td>The time of the next contentful paint, relative to the soft navigation start time. Existing paints present from the previous navigation are not considered. Therefore, the FCP will be >= 0.</td>
    </tr>
    <tr>
      <td>LCP</td>
      <td>The time of the next largest contentful paint, relative to the soft navigation start time. Existing paints present from the previous navigation are not considered. Therefore, the LCP will be >= 0. As usual, this will be reported upon an interaction, or when the page is backgrounded, as only then can the LCP be finalized.</td>
    </tr>
    <tr>
      <td>CLS</td>
      <td>The largest window of shifts between the navigation times. As usual, this when the page is backgrounded as only then can the CLS be finalized. A 0 value is reported.</td>
    </tr>
    <tr>
      <td>FID</td>
      <td>Currently only the first FID for the page is reported by the <code>web-vitals</code> library.</td>
    </tr>
    <tr>
      <td>INP</td>
      <td>The INP between the navigation times. As usual this will be reported upon an interaction, or when the page is backgrounded as only then can the INP be finalized. A 0 value is not reported.</td>
    </tr>
  </tbody>
</table>

{% Aside 'warning' %}
The `web-vitals` implementation is under active development and is subject to change with new changes being published to that branch. At present, it does not support FID on soft navigations, as that requires [more underlying work in Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=1407656) or polyfilling FID-based on events.

Those using the `web-vitals` JavaScript library should be aware of this if looking to use this library on production sites, and should take a local copy and test that version, and monitor the branch for changes.
{% endAside %}

## Will these changes become part of the Core Web Vitals measurements?

At present, this soft navigation experiment is exactly that—an experiment. We wish to evaluate the heuristics and see if they more accurately reflect the user experience before we make any decision on whether this will be integrated in the Core Web Vitals initiative. We are very excited at the possibility of this experiment, but cannot offer guarantees on whether or when this will replace the current measurements.

We value web developers' feedback on the experiment, the heuristics used, and whether you feel it more accurately reflects the experience. The [soft navigation GitHub repository](https://github.com/WICG/soft-navigations/issues) is the best place to provide that feedback, though individual bugs with Chrome’s implementation of that should be raised in the [Chrome issue tracker](https://bugs.chromium.org/p/chromium/issues/list).

### How will soft navigations be reported in CrUX?

How exactly soft navigations will be reported in CrUX, should this experiment be successful, is also still to be determined. It is not necessarily a given that they will be treated the same as current “hard” navigations are treated.

In some web pages, soft navigations are almost identical to full page loads as far as the user is concerned and the use of Single Page Application technology is just an implementation detail. In others, they may be more akin to a partial load of additional content.

Therefore, we may wish to report these soft navigations separately in CrUX, or perhaps weight them when calculating the Core Web Vitals for a given page or group of pages. We may also be able to entirely exclude partial load soft navigation, as the heuristic evolves.

At present, the team is concentrating on the heuristic and technical implementation, which will allow us to judge the success of this experiment, so no decision has been made on these fronts.

## Feedback

We are actively seeking feedback on this experiment at the following places:

- [The soft navigations heuristics and standardization](https://github.com/WICG/soft-navigations/issues).
- [Chrome implementation issues](https://bugs.chromium.org/p/chromium/issues/list) of those heuristics.
- General web vitals feedback at [web-vitals-feedback@googlegrouops.com](mailto:web-vitals-feedback@googlegrouops.com).

## Conclusion

The soft navigations experiment is an exciting approach to how the Core Web Vitals initiative might evolve to measure a common pattern on the modern web that is currently missing from our metrics. While this experiment is in its early days yet—and there is much still to do—making the progress available so far to the broader web community to experiment with is an important step. Gathering the feedback from this experiment is another crucial part of the experiment, so we strongly encourage those interested in this development to use this opportunity to help shape the API to ensure it is representative of what we hope to be able to measure with this.

### Acknowledgements

_Hero image by [Jordan Madrid](https://unsplash.com/@jordanmadrid) on [Unsplash](https://unsplash.com/photos/NqOInJ-ttqM)_
