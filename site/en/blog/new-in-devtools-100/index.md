---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 100)"
authors:
  - jecelynyeen
date: 2022-03-08
updated: 2022-03-08
description: "View and edit @supports at rules, rename and customize recording’s selector, and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dzxqvpHgEBlwfnfW0osP.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-100
---

<!-- image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dzxqvpHgEBlwfnfW0osP.jpg -->

{% Partial 'devtools/banner.md' %}

{% YouTube id='DAD72grzDDc' %}

## Chrome 100  {: #m100 }

Here’s to the 100th Chrome version! Chrome DevTools will continue to provide reliable tools for developers to build on the web. Take a moment to click around in the **What’s New** tab to celebrate the milestones.

As usual, you can watch the latest [What’s New in DevTools video](https://goo.gle/devtools-youtube) by clicking on the image.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/u8sn7ubuxjJoyPgbfNJs.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}


## View and edit @supports at rules in the Styles pane {: #supports }

You can now view and edit the CSS `@supports` at-rules in the **Styles** pane. These changes make it easier to experiment with the at-rules in real time.
Open this [demo page](https://jec.fish/demo/at-support), [inspect](/docs/devtools/dom/#inspect) the `<div class=”box”>` element, view the `@supports` at-rules in the **Styles** pane. Click on the rule’s declaration to edit it.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vnokX5Hswmbvlb5weusO.png", alt="View and edit @supports at rules", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5c17e46caa5be1d8c769146baecc91e0d740f7fd #}

Chromium issues: [1222574](https://crbug.com/1222574), [1222573](https://crbug.com/1222573)


## Recorder panel improvements {: #recorder }

### Support common selectors by default {: #selector }

When determining an unique selector during recording, the [Recorder](/docs/devtools/recorder/) panel now automatically prefers elements with the following attributes:

- data-testid
- data-test
- data-qa
- data-cy
- data-test-id
- data-qa-id
- data-testing

The attributes above are common selectors used in test automation.

For example, [start a new recording](/docs/devtools/recorder/#record) with this [demo page](https://jec.fish/demo/recorder). Fill in an email address and observe the selector value.

Since the email element has `data-testid` defined, it’s used as the selector automatically instead of the `id` or `class` attributes.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4diI81kpscXznWLrB6a9.png", alt="Support common selectors by default", width="800", height="585" %}


### Customize the recording’s selector {: #customize-selector }

You can customize the selector of a recording if you are not using the [common selectors](/docs/devtools/recorder/#selector).

For example, this [demo page](https://jec.fish/demo/recorder) uses the `data-automate` attribute as the selector. [start a new recording](/docs/devtools/recorder/#record) and enter the `data-automate` as the selector attribute. Fill in an email address and observe the selector value (`[data-automate=email-address]`).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2PPPt9tOC2ZEz1l9F9AK.png", alt="Customize the recording’s selector", width="800", height="524" %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/X8r52vWEu6aC8QHFuknp.png", alt="The result of custom selector selection", width="800", height="579" %}


### Rename a recording {: #recorder-rename }

You can now rename a recording in the [Recorder](/docs/devtools/recorder/) panel with the edit button (pencil icon) next to the recording’s title.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Pn9Xsrq9lnStmtjpe0jt.png", alt="Rename a recording", width="800", height="502" %}


## Preview class/function properties on hover {: #properties }

You can now hover over a class or function in the **Sources** panel during debugging to preview its properties. Previously, it only showed the function name and a link to its location in the source code.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/BZzL6QMheyd31VGqhA8W.png", alt="Preview class/function properties on hover", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0a585b3883ad39f2f83fa5ab9c7731270d3a2974 ​#}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/96fb7872ce01eb3fde267e39987a82ce3d3f3e21 #}

Chromium issue: [1049947](https://crbug.com/1049947)


## Partially presented frames in the Performance panel {: #perf }

Performance recording now displays a new frame category "Partially presented frames" in the **Frames** timeline.

Previously, the **Frames** timeline visualizes any frames with delayed main-thread work as "dropped frames". However, there are cases where some frames may still produce visual updates (e.g. scrolling) driven by the compositor thread.

This leads to user confusion because the screenshots of these “Dropped frames” are still reflecting visual updates.

The new "Partially presented frames" aims to indicate more intuitively that although some content is not presented timely in the frame, but the issue is not so severe as to block visual updates altogether.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QcqjnFhMz1Bxd5dkmduj.png", alt="Partially presented frames in the Performance panel", width="800", height="531" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a06c2e7c1abeb92be9cfc6b3bf9d6edf6d742e01 #}

Chromium issue: [1261130](https://crbug.com/1261130)


## Miscellaneous highlights {: #misc }

These are some noteworthy fixes in this release:

- Updated iPhone user agent strings for [emulated devices](/docs/devtools/device-mode/#device). All iPhone versions after 5 have a user-agent string with iPhone OS 13_2_3. ([1289553](https://crbug.com/1289553))
- You can now save [snippet](/docs/devtools/javascript/snippets/) as a JavaScript file directly. Previously, you needed to append `.js` file extension manually. ([1137218](https://crbug.com/1137218))
- The **Sources** panel now correctly displays scope variable names when debugging with source map. Previously, the **Sources** panel displays minified scope variable names despite source map being provided. ([1294682](https://crbug.com/1294682))
- The **Sources** panel now restores scroll position correctly on page load. Previously, the position was not restored correctly causing inconvenience in debugging. ([1294422](https://crbug.com/1294422))


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
