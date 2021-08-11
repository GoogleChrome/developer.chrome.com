---
title: 'Compat2021: Improving CSS Grid compatibility with GridNG'
description: --
  GridNG
layout: 'layouts/blog-post.njk'
date: 2021-08-12
authors:
  - unakravets
hero: 'image/HodOHWjMnbNw56hvNASHWSgZyAf2/yv0QmoNsBeyaCUdSx3xk.jpg'
alt: --
  A geometric grid
tags:
  - chrome-93
---

*This article is a crosspost from the [Microsoft Edge Blog](https://blogs.windows.com/msedgedev/2021/08/10/compat2021-css-grid-gridng/) by Daniel Libby  on August 10, 2021.*

With next month's release of Microsoft Edge 93, we'll be releasing a rewrite of CSS Grid 1 module ("GridNG"), which substantially improves compatibility with other implementations of CSS Grid and addresses one of the top compatibility pain points for web developers. In this post, we'll share more about the rewrite and what you can expect to see in Edge and other Chromium browsers.

You can try the updated implementation today–just install the latest Microsoft Edge Beta build, and please report any issues you find in [Chromium's bug tracker](https://bugs.chromium.org/p/chromium/issues/entry)!

[LayoutNG](https://developers.google.com/web/updates/2019/06/layoutNG) has been a multi-year rewrite of the layout engine in Blink, Chromium's underlying rendering engine. Since its inception, it has improved performance and fixed longstanding issues from the legacy layout engine. Since LayoutNG's initial launch with support for inline and block layout in Chrome and Microsoft Edge 76, other layout primitives (CSS Table Layout, CSS Flexbox) have been incrementally rewritten, stabilized, and launched.

When we announced our switch to the Chromium project, we emphasized our commitment to improving the web for everyone. The rewrite of Blink's implementation of the [CSS Grid 1 module](https://www.w3.org/TR/css-grid-1/#changes-20180904) (GridNG) which will be launching in the M93 release of Microsoft Edge and Chrome is a great example of this. To provide some background, CSS Grid is a layout primitive that allows web developers to align elements in rows and columns, providing a more intuitive model than CSS tables for creating two dimensional layouts. CSS Grid also incorporates popular concepts from CSS Flexbox as well as terminology from well-established graphic design principles.

The usage of CSS Grid on the Web has been slowly but [steadily growing](https://chromestatus.com/metrics/feature/timeline/popularity/1693) over the past few years:


<figure>
  {% Img src="image/HodOHWjMnbNw56hvNASHWSgZyAf2/ikDCaUFvpzjevSjb3UDr.png", alt="", width="568", height="298" %}
  <figcaption>Line chart showing the increase in CSS Grid usage from less than 2% of page loads in January 2019 to almost 10% in July 2021.</figcaption>
</figure>

However, Web developers have given consistent feedback that differences in grid layout between browser engines have been a source of pain. These difficulties have been exacerbated as CSS Grid adoption increases and a larger breadth of scenarios are exercised. As this has been a theme in [multiple](https://insights.developer.mozilla.org/) [Web developer](https://insights.developer.mozilla.org/reports/mdn-browser-compatibility-report-2020.html) surveys, CSS Grid was identified as a key area of the Web Platform to invest in during 2021. Microsoft happily took this on as a focus area as part of a broader commitment with Google to work together to improve browser compatibility as part of the [Compat2021 effort](https://wpt.fyi/compat2021?feature=summary).

GridNG fixes many long standing issues reported by web developers using Grid on their sites, along with Web Platform Tests that measure an implementation's conformance to the spec. Those same WPT tests are the basis for the Compat2021 score, which [increased from 94.3% to 96.5%](https://wpt.fyi/compat2021?feature=css-grid) when GridNG was enabled. Overall, launching GridNG addresses [38 issues](https://bugs.chromium.org/p/chromium/issues/list?q=label%3ATarget-GridNG&can=1) from Chromium's bug tracker.

Using images and other replaced content within Grid was an example of interoperability issues that developers encountered with Grid. Previously, there was limited compatibility between implementations, but that is now solved by GridNG. For the following examples, Gecko (the rendering engine for Firefox) and Blink now both produce the correct results, as specified.

<figure>
  {% Img src="image/HodOHWjMnbNw56hvNASHWSgZyAf2/6uBqCwwl4YzJdowchHqp.png", alt="", width="485", height="477" %}
  <figcaption>A Grid layout rendering incorrectly prior to GridNG fixes.	A Grid layout rendering correctly following GridNG fixes.</figcaption>
</figure>


Here, the previous layout on the left shows misaligned icons due to grid items with images producing incorrect track sizing.

SVG content embedded in grids showed similar issues, where the aspect ratio was not correctly preserved.

<figure>
  {% Img src="image/HodOHWjMnbNw56hvNASHWSgZyAf2/Jk4KSumFCQfYahs1xzNK.png", alt="", width="505", height="182" %}
  <figcaption>An SVG illustration that appears stretched horizontally	An SVG illustration that appears displayed correctly</figcaption>
</figure>

On the left is the legacy layout–the SVG content is stretched instead of preserved as expected and specified, as seen on the right.

GridNG took advantage of other advances in LayoutNG, (specifically the improved layout of replaced elements) along with adhering to the spec when rewriting the component, to fix this class of issues.

Besides compatibility, performance was another consistent issue reported by developers. Because of the primitives that LayoutNG operates on, along with improved caching mechanisms, GridNG has better performance in key scenarios, while avoiding the invalidation issues that were reported against the legacy architecture. The most prominent example is the layout of nested grids, which had exponential complexity, which you can see in [this demo site](https://exponential-layout.glitch.me/).

This performance cliff was easily hit by developers and affects live sites (you can see instances of this in [this Firefox bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1591366) and its duplicates). Thanks to our improvements in GridNG, web developers will no longer face these performance issues–which have long affected multiple browser engines–in Chromium. There is still some remaining work to be done to get back to parity or better with the legacy implementation for all Blink's perf regression microbenchmarks, but we are happy to address one of the major issues preventing developers from employing complex nested grid layouts.

One final benefit of finishing off GridNG is that it opens the door to implement subgrid ([CSS Grid level 2](https://www.w3.org/TR/css-grid-2/)). This has been a feature request of Blink for a long time, with [almost 600 stars](https://bugs.chromium.org/p/chromium/issues/detail?id=618969) in Chromium's bug tracker at the time of writing. Since the constraints of the legacy layout engine, and the NG conversion effort are no longer factors, we're excited to start work to help developers achieve the layouts that subgrid unlocks.

If you are a Web Developer using grid layouts, please install the latest Microsoft Edge Beta build and report any issues you find in Chromium's bug tracker.

The development of GridNG was only possible due to close collaboration with our counterparts at Google. A huge thanks to Ian Kilpatrick and Christian Biesinger for explaining concepts, providing design feedback, detailed code reviews, and contributing key patches!

– Daniel Libby, Principal Software Engineering Manager, Microsoft Edge