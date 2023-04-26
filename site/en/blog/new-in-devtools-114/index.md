---
layout: 'layouts/blog-post.njk'
title: "What's New in DevTools (Chrome 114)"
authors:
  - sofiayem
  - jecelynyeen
date: 2023-04-26
description: ""
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/X0Yn0Nb5tjoK3cdWcmHy.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-114
---
<!--image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gctGASDKBFTUtOQqVq2H.png  -->

{% Partial 'devtools/banner.md' %}

*There is no 'What's new in DevTools' video for this release, but you can watch this quick recap of the recent features.*

{% YouTube id='...' %}

<!-- $contentStart -->

## Assertions in Recorder {: #recorder }

The **Recorder** panel now lets you add assertions right during recording, with all the runtime data available to you.

To add an assertion, start a new recording, interact with your page, and click **Add assertion**. The **Recorder** inserts a step with the [`waitForElement` type](/docs/devtools/recorder/reference/#step-properties) that you can customize on the fly. Watch the video to see assertions in action on the [coffee cart demo](https://coffee-cart.app/).

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/oSTbA1gmxW9EIzZjma1W.mp4", controls="true", muted="true", class="screenshot" %}

This video shows you how to assert:

- HTML attributes, for example, an element's `class`
- JavaScript properties, for example, `.innerText`

Both are specified in JSON. You can also configure steps to assert, for example, conditional statements in JavaScript, number of node's children (`count`), element visibility, and more. For more information, see [Configure steps](/docs/devtools/recorder/reference/#configure-steps).

Additionally, the **Recorder** now remembers your preferred script format in the [side-by-side code view](/docs/devtools/recorder/reference/#inspect-code) and right-click step menu.

Chromium issue: [1423624](https://crbug.com/1423624).
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/67b9e72b50d50c5e959ccfebe202b486a3417736 #}

## Lighthouse 10.1.1 {: #lighthouse }

The **Lighthouse** panel now runs Lighthouse 10.1.1, with a notable change introduced in [10.1.0](https://github.com/GoogleChrome/lighthouse/releases/tag/v10.1.0). All audits that deal with URLs are now grouped by entity and aggregate numerical statistics such as size or duration.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/mKXh4UJb8OBM9rCNQv5M.png", alt="Grouped audits by entity.", width="800", height="736" %}

To learn the basics of using the **Lighthouse** panel in DevTools, see [Lighthouse: Optimize website speed](/docs/devtools/lighthouse/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9ba6ed7f9e83373c5395aa30c66dd6c81f0efec0 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c2fc9fa0d279c8ed597688032a015063fa894b36 #}

Chromium issue: [772558](https://crbug.com/772558).

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes in this release:


<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
