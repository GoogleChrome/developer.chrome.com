---
layout: 'layouts/blog-post.njk'
title: "What's New in DevTools (Chrome 115)"
authors:
  - sofiayem
date: 2023-05-29
description: ""
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/fy7JKyzJt0EPZd1g8hwl.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-115
---
<!--image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gctGASDKBFTUtOQqVq2H.png  -->

{% Partial 'devtools/banner.md' %}

*There is no 'What's new in DevTools' video for this release, but you can watch this quick recap of the recent features.*

{% YouTube id='CrSmjooOEiE' %}

<!-- $contentStart -->

##  New CSS subgrid badge in the Elements panel {: #subgrid }

The **Elements** panel gets a new `subgrid` badge for [nested grids](https://developer.mozilla.org/docs/Web/CSS/CSS_Grid_Layout/Subgrid).

To inspect and debug a nested grid, click the badge. It toggles an overlay that shows columns, rows, and their numbers on top of the element in the viewport.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YdYYo1t21cwTUVEW2bgS.png", alt="The subgrid badge and the overlay in the viewport.", width="800", height="549" %}

For the list of all badges in the **Elements** panel, see the [Badges reference](/docs/devtools/elements/badges/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b64a1595f831021d41a4849376ef16d4a4ddf201 #}

Chromium issue: [1442536](https://crbug.com/1442536).

## Linear timing support in Elements > Styles > Easing Editor {: #linear }

The {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/U0vVF9a5jrj948Gegu6o.png", alt="Easing Editor.", width="22", height="22" %} [**Easing Editor**](/docs/devtools/css/reference/#edit-easing) in **Elements** > **Styles** lets you adjust [`transition-timing-function`](https://developer.mozilla.org/docs/Web/CSS/transition-timing-function) and [`animation-timing-function`](https://developer.mozilla.org/docs/Web/CSS/animation-timing-function) values with a click. In this version, the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/U0vVF9a5jrj948Gegu6o.png", alt="Easing Editor.", width="22", height="22" %} **Easing Editor** gets the linear timing function support.

To configure linear timings, click the linear picker button. To add a control point, click anywhere on the line. To remove a control point, double-click it. You can also choose one of the presets: `linear`, `elastic`, `bounce`, or `emphasized`. Watch the video to see the linear adjustment in action.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/tUHt5e5XAzZZhEjMC0fr.mp4", width="800", height="782", loop="false", muted="true", controls="true" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/670222516a187b5102ad78828cff1e2d5861aeec #}

Chromium issue: [1421241](https://crbug.com/1421241).

## Application > Bounce Tracking Mitigations {: #bounce-tracking }

[Bounce Tracking Mitigations](https://privacycg.github.io/nav-tracking-mitigations/#bounce-tracking-mitigations) experiment in Chrome lets you identify and delete the state of sites that appear to perform cross-site tracking using the bounce tracking technique. The **Application** > **Background Services** pane gets a new **Bounce Tracking Mitigations** tab that lets you manually force tracking mitigations and lists the sites whose states were deleted.

Check out this security feature:

1. [Block third-party cookies in Chrome](https://support.google.com/chrome/answer/95647?hl=en&co=GENIE.Platform%3DAndroid&sjid=2048967673261319866-EU#zippy=%2Callow-or-block-cookies). Navigate to and enable {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N7wEDmtW9lnrSxPRupMa.svg", alt="Three-dot menu.", width="24", height="24" %} > **Settings** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JbhmMshze0QJJVcmDr30.svg", alt="Security.", width="24", height="24" %} **Privacy and security** > **Cookies and other site data** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gV2vW2PQXfBqvQEJ4sF0.svg", alt="Radio button checked.", width="24", height="24" %} **Block third-party cookies**.
1. In `chrome://flags`, set the **Bounce Tracking Mitigations** experiment to **Enabled With Deletion**.
1. Inspect this [demo page](https://bounce-tracking-demo.glitch.me/), open **Application** > **Background Services** > **Bounce Tracking Mitigations**, click a bounce link on the page, wait (10 seconds) for Chrome to record the bounce, and click **Force run** to delete the state immediately.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/PJ8FUFF64ogdBNyFNPuB.png", alt="Bounce Tracking Mitigations lists a state deletion.", width="800", height="701" %}

Additionally, the **Issues** tab warns you about the upcoming state deletion.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ace8e94508b6f0f63aa25fe40f65d675d3c98f81 #}

Chromium issue: [1432303](https://crbug.com/1432303).

## Lighthouse 10.2.0 {: #lighthouse }

The **Lighthouse** panel now runs Lighthouse 10.2.0. Most notably, the [Largest Contentful Paint](/docs/lighthouse/performance/lighthouse-largest-contentful-paint/#how-to-improve-your-lcp-score) check gets a table with phase calculations for simulated and DevTools throttling. See also the [full list of changes](https://github.com/GoogleChrome/lighthouse/releases/tag/v10.2.0).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/R0Bm7iyxXQ4d67YVTqtK.png", alt="The LCP phase table.", width="800", height="607" %}

To learn the basics of using the **Lighthouse** panel in DevTools, see [Lighthouse: Optimize website speed](/docs/devtools/lighthouse/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/def91af01dd6dcc5c61524bb2a5962983067868e #}

Chromium issue: [772558](https://crbug.com/772558).

## Ignore content scripts by default {: #content-script }

The {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Ignore List**](/docs/devtools/settings/ignore-list/) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Content scripts injected by extensions** is now enabled by default.

With this setting enabled:

- The **Debugger** ignores such scripts and doesn't stop on exceptions thrown by them.
- The **Sources** > **Call Stack** pane skips ignored frames. To turn the skipping off here, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} [**Show ignore-listed frames**](/docs/devtools/javascript/reference/#show-ignore-listed-frames).
- The **Console** [collapses ignored frames](/docs/devtools/console/reference/#show-third-party) in stack traces. Click **Show N more frames** to expand, and **Show less** to collapse again.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bQYJDFHrl0bi28jsBEmW.png", alt="The Settings > Ignore List > Content scripts injected by extensions enabled by default.", width="800", height="611" %}

Additionally, the checkboxes in **Ignore List** got clearer text.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e434ba21ef503af0f5b303a2ba7b2058dd21869c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/88fd441c2f7e483db02f4ab5e78a401fcf97cf8d #}

Chromium issues: [1440958](https://crbug.com/1440958), [1364501](https://crbug.com/1364501).

## Shortcut to set conditional breakpoints {: #breakpoint }

You can now set [conditional breakpoints](/docs/devtools/javascript/breakpoints/#conditional-loc) faster with a shortcut. To open the breakpoint dialog, hold <kbd>Command</kbd> (MacOS) or <kbd>Control</kbd> (Windows / Linux) and click the line number in the left column of the **Sources** > **Editor**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7bRF2xDUGpwfvY6HIkgo.png", alt="The line number in the left column and the breakpoint dialog.", width="800", height="611" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3d8f4d718804e1bc7b1d7916014c8c5b6a62c0b3 #}

Chromium issue: [1405767](https://crbug.com/1405767).

## Network > Response improvements {: #network }

The **Network** > **Response** pane now pretty-prints minified response bodies by default, similar to [the **Sources** panel](/blog/new-in-devtools-110/#pretty-print).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/6v8sGp3FbOJF2hoWj0YB.png", alt="Enabled pretty-printing in Network > Response.", width="800", height="446" %}

Additionally, SVG files get syntax highlighting.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/zNnzIWvccp8Ndz2AOy8P.png", alt="SVG syntax highlighting.", width="800", height="379" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f7eb6fdc4c780d046fd73e0182efbddec4f0535b #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/00bca2313807f054bede3febf6dd37e1519ba084  #}

Chromium issues: [1382752](https://crbug.com/1382752), [1385374](https://crbug.com/1385374).

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes in this release:


<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
