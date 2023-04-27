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

## Performance enhancements {: #performance }

### `performance.mark()` shows timing on hover in Performance > Timings {: #mark }

The [performance.mark() method](https://developer.mozilla.org/docs/Web/API/Performance/mark) now shows its timing when you hover over the corresponding mark in **Performance** > **Timings**. The timing here is a timestamp relative to the previous navigation event.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/81B2NfenvYRiUK1uPiz8.png", alt="The pop-up with timing on hover in the Timings section.", width="800", height="782" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7b27d0a56548b9c5adc8bdae13751fae7f658515 #}

Chromium issue: [1426762](https://crbug.com/1426762).

### `profile()` command populates Performance > Main {: #profile }

The [`profile()` and `profileEnd()` commands](/docs/devtools/console/utilities/#profile-function) in the **Console** now start and stop CPU profiling in the [**Main** thread](/docs/devtools/performance/reference/#main) of the **Performance** panel.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/WPSIhGfU4uO1X2t71poK.png", alt="The console() command creates a profile in the Performance panel.", width="800", height="591" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f8fc1cc8b2c26c46e22b7af16b42122acccc13f6 #}

Chromium issue: [1429191](https://crbug.com/1429191).

### Warning for slow user interactions {: #slow-interaction-warning }

User interactions longer than 200 ms get an [Interaction to Next Pain (INP)](https://web.dev/inp/) warning in the **Performance** > **Summary** tab.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/wrFaZ26nYCuprtCSNB5C.png", alt="The INP warning.", width="800", height="685" %}

Additionally, the ID of the interaction has been moved from the tooltip to **Summary**.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e73984213b6dfdc2f858ed1edfe323d7755d757f #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7e33a26c738bcd848aacd140248d285b9db31704 #}

Chromium issues: [1432512](https://crbug.com/1432512), [1432509](https://crbug.com/1432509).

### JavaScript Profiler deprecation: Phase three {: #js-profiler }

As early as [Chrome 58](/blog/devtools-javascript-cpu-profile-migration-2/), the DevTools team planned to eventually deprecate the **JavaScript Profiler** and have Node.js and Deno developers use the **Performance** panel for profiling JavaScript CPU performance.

DevTools version 114 starts *phase three* of the [four-phase **JavaScript Profiler** deprecation](https://github.com/ChromeDevTools/rfcs/discussions/2#discussioncomment-5189668). During this phase, the **JavaScript Profiler** panel is removed from DevTools but you can still temporarily enable it via {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Experiments**](/docs/devtools/settings/experiments/) and open it from the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Three-dot menu.", width="24", height="24" %} three-dot menu.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/iEkxGNsTwKYYMP2nCxfY.png", alt="JavaScript profiler checkbox in Settings > Experiments.", width="800", height="507" %}

To profile CPU performance, use the **Performance** panel.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/fecc2e9a652f3b4cb830555c9d991b66ecf3ddf0 #}

Chromium issue: [1428026](https://crbug.com/1428026).

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes in this release:


<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
