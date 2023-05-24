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

[Bounce Tracking Mitigations](https://privacycg.github.io/nav-tracking-mitigations/#bounce-tracking-mitigations) experiment in Chrome lets you identify and delete the states of sites that appear to perform cross-site tracking using the bounce tracking technique. The **Application** > **Background Services** pane gets a new **Bounce Tracking Mitigations** tab that lists the sites with deleted states.

Check out this security feature:

1. [Block third-party cookies in Chrome](https://support.google.com/chrome/answer/95647?hl=en&co=GENIE.Platform%3DAndroid&sjid=2048967673261319866-EU#zippy=%2Callow-or-block-cookies). Navigate to and enable {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N7wEDmtW9lnrSxPRupMa.svg", alt="Three-dot menu.", width="24", height="24" %} > **Settings** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JbhmMshze0QJJVcmDr30.svg", alt="Security.", width="24", height="24" %} **Privacy and security** > **Cookies and other site data** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gV2vW2PQXfBqvQEJ4sF0.svg", alt="Radio button checked.", width="24", height="24" %} **Block third-party cookies**.
1. In `chrome://flags`, set the **Bounce Tracking Mitigations** experiment to **Enabled With Deletion**.
1. Open DevTools on this [demo page](https://bounce-tracking-demo.glitch.me/). In **Application** > **Background Services** > **Bounce Tracking Mitigations**, click a bounce link on the demo page, and wait for Chrome to delete the state. It takes 10 seconds.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/PJ8FUFF64ogdBNyFNPuB.png", alt="Bounce Tracking Mitigations lists a state deletion.", width="800", height="701" %}

Additionally, the **Issues** tab warns you about the upcoming state deletion.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ace8e94508b6f0f63aa25fe40f65d675d3c98f81 #}

Chromium issue: [1432303](https://crbug.com/1432303).

##  {: #content-script }

##  {: #breakpoint }

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes in this release:


<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
