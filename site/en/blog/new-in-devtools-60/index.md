---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 60)"
authors:
  - kaycebasques
date: 2017-05-23
#updated: YYYY-MM-DD
description: "New features and changes coming to DevTools in Chrome 60."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/EOSOQXLWBQ5la6UyCCT6.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-60
---

Welcome! New features and major changes coming to DevTools in Chrome 60 include:

- [A new Audits panel][1], including tests for progressive web apps, performance, accessibility, and
  best practices.
- [Third-party badges][2]. Find out which third-parties are making network requests, logging to the
  Console, and executing JavaScript.
- [Continue To Here][3]. A new gesture that can speed up your JavaScript debugging workflow.
- [Predictable debugging for asynchronous JavaScript][4].
- [Object previews in the Console][5].
- [Real-time updates in the Coverage tab][6].
- [A new menu for selecting contexts in the Console][7].
- [Simpler network throttling options][8].
- [Async stack traces on by default][9].

{% Aside %}

**Note:** You can check what version of Chrome you're running at `chrome://version`. Chrome
auto-updates to a new major version about every 6 weeks.

{% endAside %}

Check out the video version of these release notes below or read on to learn more.

{% YouTube id="Qnmb2YhkQmQ" %}

## New features {: #features }

### New Audits panel, powered by Lighthouse {: #lighthouse }

The Audits panel is now powered by [Lighthouse][10]. Lighthouse provides a comprehensive set of
tests for measuring the quality of your web pages.

The scores at the top for [**Progressive Web App**][11], [**Performance**][12],
[**Accessibility**][13], and [**Best Practices**][14] are your aggregate scores for each of those
categories. The rest of the report is a breakdown of each of the tests that determined your scores.
Improve the quality of your web page by fixing the failing tests.

{% Img src="image/admin/RtdnYvpJE9vdzc9PnsFW.png", alt="A Lighthouse report", width="800", height="990" %}

**Figure 1**. A Lighthouse report

To audit a page:

1.  Click the **Audits** tab.
2.  Click **Perform an audit**.
3.  Click **Run audit**. Lighthouse sets up DevTools to emulate a mobile device, runs a bunch of
    tests against the page, and then displays the results in the **Audits** panel.

#### Lighthouse at Google I/O '17 {: #lighthouse-at-io }

Check out the DevTools talk from Google I/O '17 below to learn more about Lighthouse's integration
in DevTools.

{% Aside %}

**Note:** The video should start playing at 32:30, which is when Paul discusses Lighthouse.

{% endAside %}

{% YouTube id="PjjlwAvV8Jg" %}

#### Contribute to Lighthouse {: #contribute-to-lighthouse }

Lighthouse is an open-source project. To learn lots more about how it works and how to contribute to
it, check out the Lighthouse talk from Google I/O '17 below.

[Got an idea for a Lighthouse audit? Post it here!][15]

{% YouTube id="NoRYn6gOtVo" %}

### Third-party badges {: #badges }

Use third-party badges to get more insight into the entities that are making network requests on a
page, logging to the Console, and executing JavaScript.

{% Img src="image/admin/tFrUy2jX0liKvxcI9jih.png", alt="Hovering over a third-party badge in the Network panel", width="800", height="502" %}

**Figure 2**. Hovering over a third-party badge in the Network panel

{% Img src="image/admin/a9t406jRFjz0ZGTfjxvn.png", alt="Hovering over a third-party badge in the Console", width="800", height="500" %}

**Figure 3**. Hovering over a third-party badge in the Console

To enable third-party badges:

1.  Open the [Command Menu][16].
2.  Run the `Show third party badges` command.

Use the **Group by product** option in the **Call Tree** and **Bottom-Up** tabs to group performance
recording activity by the third-party entities that caused the activities. See [Get Started With
Analyzing Runtime Performance][17] to learn how to analyze performance with DevTools.

{% Img src="image/admin/g3d8MPeAz9Jz7yfBmSsG.png", alt="Grouping by product in the Bottom-Up tab", width="800", height="744" %}

**Figure 4**. Grouping by product in the **Bottom-Up** tab

### A new gesture for Continue to Here {: #continue }

Say you're paused on line 25 of a script, and you want to jump to line 50. In the past, you could
set a breakpoint on line 50, or right-click the line and select **Continue to here**. But now,
there's a faster gesture for handling this workflow.

When stepping through code, hold <kbd>Command</kbd> (Mac) or <kbd>Control</kbd> (Windows, Linux) and
then click to continue to that line of code. DevTools highlights the jumpable destinations in blue.

{% Img src="image/admin/LfbHzjLqb2AVIqGgXBzL.gif", alt="Continue to Here", width="519", height="540" %}

**Figure 5**. Continue To Here

See [Get Started With Debugging JavaScript][18] to learn the basics of debugging in DevTools.

### Step into async {: #step-into-async }

A big theme for the DevTools team in the near future is to make debugging asynchronous code
predictable, and to provide you a complete history of asynchronous execution.

The [new gesture for Continue to Here][19] also works with asynchronous code. When you hold
<kbd>Command</kbd> (Mac) or <kbd>Control</kbd> (Windows, Linux), DevTools highlights jumpable
asynchronous destinations in green.

Check out the demo below from the DevTools talk at I/O for an example.

{% Aside %}

**Note:** The video should start playing at 17:40, which is when Paul discusses the feature.

{% endAside %}

{% YouTube id="PjjlwAvV8Jg" %}

## Changes {: #changes }

### More informative object previews in the Console {: #object-previews }

Previously, when you logged or evaluated an object in the Console, the Console would only display
`Object`, which is not particularly helpful. Now, the Console provides more information about the
contents of the object.

{% Img src="image/admin/PBFrubv1bsDfv2Af2iFM.png", alt="How the Console used to preview objects", width="800", height="565" %}

**Figure 6**. How the Console used to preview objects

{% Img src="image/admin/wL18zM2tEWKszNgiEow5.png", alt="How the Console now previews objects", width="800", height="521" %}

**Figure 7**. How the Console now previews objects

### More informative context selection menu in the Console {: #context }

The Console's Context Selection menu now provides more information about available contexts.

- The title describes what each item is.
- The subtitle below the title describes the domain where the item came from.
- Hover over an iframe context to highlight it in the viewport.

{% Img src="image/admin/yrUG7X95mXw3rjkI0p8a.png", alt="The new Context Selection menu", width="800", height="508" %}

**Figure 8**. Hovering over an iframe in the new Context Selection menu highlights it in the
viewport

### Real-time updates in the Coverage tab {: #coverage }

When recording code coverage in Chrome 59, the **Coverage** tab would just display "Recording...",
with no visibility into what code was being used. Now, the **Coverage** tab shows you in real-time
what code is being used.

{% Img src="image/admin/n1gxt0EFkoLCl06B6v4b.gif", alt="Loading and interacting with a page using the old Coverage tab", width="694", height="540" %}

**Figure 9**. Loading and interacting with a page using the old **Coverage** tab

{% Img src="image/admin/o61xWys7PyEpdjK0OxNt.gif", alt="Loading and interacting with a page using the new Coverage tab", width="649", height="540" %}

**Figure 10**. Loading and interacting with a page using the new **Coverage** tab

### Simpler network throttling options {: #network-throttling }

The network throttling menus in the **Network** and **Performance** panels have been simplified to
include only three options: **Offline**, **Slow 3G**, which is common in places like India, and
**Fast 3G**, which is common in places like the United States.

{% Img src="image/admin/RklbREBsnfsJxpj1sbui.png", alt="The new network throttling options", width="800", height="629" %}

**Figure 11**. The new network throttling options

The throttling options have been tweaked to match other, kernel-level throttling tools. DevTools no
longer shows the latency, download, and upload metrics next to each option, because those values
were misleading. The goal is to match the true experience of each option.

### Async stacks on by default {: #async-stacks }

The **Async** checkbox has been removed from the **Sources** panel. Async stack traces are now on by
default. In the past, this option was opt-in, because of performance overhead. The overhead is now
minimal enough to enable the feature by default. If you prefer to have async stack traces disabled,
you can turn them off in [Settings][20] or by running the `Do not capture async stack traces`
command in the [Command Menu][21].

## DevTools at Google I/O '17 {: #io }

Check out the talk by the mythical Paul Irish below to learn more about what the DevTools team has
been working on over the past year and the big themes that they're tackling in the near future.

{% YouTube id="PjjlwAvV8Jg" %}

[1]: #lighthouse
[2]: #badges
[3]: #continue
[4]: #step-into-async
[5]: #object-previews
[6]: #coverage
[7]: #context
[8]: #network-throttling
[9]: #async-stacks
[10]: https://developers.google.comhttps://developers.google.com/web/tools/lighthouse
[11]: /web/progressive-web-apps
[12]: https://developers.google.com/web/fundamentals/performance
[13]: https://developers.google.com/web/fundamentals/accessibility
[14]: https://developers.google.com/web/fundamentals
[15]: https://groups.google.com/d/msg/google-chrome-developer-tools/Wb76dhsEll4/W8Ab2WICBAAJ
[16]: /docs/devtools/command-menu/
[17]: /docs/devtools/evaluate-performance
[18]: /docs/devtools/javascript
[19]: #continue
[20]: /docs/devtools/customize/#settings
[21]: /docs/devtools/command-menu/
[22]: /blog/new-in-devtools-59#coverage
[23]: /blog/new-in-devtools-59#screenshots
[24]: /blog/new-in-devtools-59#block-requests
[25]: /blog/new-in-devtools-59#async
[26]: /blog/new-in-devtools-59#command-menu
