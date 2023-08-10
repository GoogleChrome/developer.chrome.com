---
layout: 'layouts/blog-post.njk'
title: "What's New in DevTools (Chrome 117)"
authors:
  - sofiayem
date: 2023-08-10
description: ""
hero: ''
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-117
---
<!--image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gctGASDKBFTUtOQqVq2H.png  -->

{% Partial 'devtools/banner.md' %}

*There is no 'What's new in DevTools' video for this release, but you can watch this quick recap of the recent features.*

{% YouTube id='e8tl_yp5BQg' %}

<!-- $contentStart -->

## Network panel improvements {: #network }

### Override web content locally {: #overrides }

The [local overrides](/docs/devtools/overrides/) feature now lets you locally override web content, in addition to [network response headers](/docs/devtools/overrides/#override-headers) and has a better UX, so you can easily mock remote resources without access to them.

To override web content, open the **Network** panel, right-click a request, and select **Override content**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/BRExqF6iUJioa9YkiUeV.png", alt="The override options in the drop-down menu of a request.", width="800", height="685" %}

If you have local overrides set up but disabled, DevTools enables them. If you haven't set them up yet, DevTools prompts you in the action bar at the top. Select a folder to store the overrides in and allow DevTools access to it.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/cuNvCVUAVtICozqgThQi.png", alt="Select a folder and allow access to it in the action bar at the top.", width="800", height="507" %}

Once the overrides are set up, DevTools then takes you to **Sources** > **Overrides** > **Editor** to let you [override web content](/docs/devtools/overrides/#make-changes).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/jkXb9Wznaob6tutUTjeJ.png", alt="Overriding web content in Sources.", width="800", height="484" %}

Note that the overridden resources are indicated with {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/s81rU6SgdmbseeBDGbPl.png", alt="Saved.", width="17", height="20" %} in the **Network** panel. Hover over the icon to see what's overridden.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hekOD6lUKKXipZ6qFT3D.png", alt="An override icon next to a request in the Network panel.", width="800", height="493" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5cc23747aef9bf9380fc09e45897f49295026801 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3755eef346c32ef537e66a7ee13efe9a0c4ab84a #}

Chromium issues: [1465785](https://crbug.com/1465785), [1470532](https://crbug.com/1470532), [1469359](https://crbug.com/1469359).

### Override the content of XHR and fetch requests {: #xhr-fetch }

You can now override the content of XHR and fetch requests in addition to their response headers. With such overrides, you can mock the API responses to debug your web page even if your backend and API aren't ready yet.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/TNcd8DCxoK6OmHQqJjKT.mp4", autoplay="false", loop="true", muted="true", controls="true", width="800", height="704", class="screenshot" %}

DevTools currently supports content overrides for the following request types: images (for example, avif, png), fonts, fetch and XHR, scripts (css and js), and documents (html). DevTools now grays out the **Override content** option for unsupported types.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/67b8ebb822a32dd187c3963d108645e25015c0e8 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4465f5220d3a58242c8ed6f697a8d575448d9553 #}

Chromium issues: [792101](https://crbug.com/792101), [1469776](https://crbug.com/1469776).

### Hide Chrome extension requests {: #hide-extension-requests }

To help you focus on the code you author and filter out irrelevant requests sent by extensions you might have installed in Chrome, the **Network** panel gets a new filter. This filter is disabled by default.

To filter out all the requests sent to `chrome-extension://` URLs, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Hide extension URLs**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/07CwNEuofVPa8jp3LFfm.png", alt="Extension URLs hidden from the requests table.", width="800", height="478" %}

Moreover, to stop seeing confusing and irrelevant error messages from extensions in the **Console**, for example, about failing to load [source maps](https://web.dev/source-maps/), check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} [**Enable Ignore Listing**](/docs/devtools/settings/ignore-list/#skip-extensions) > **General exclusion rules** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Content scripts injected by extensions**.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/45b4415d1599864a73cab4138ecd3135d8ee79ba #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/dffee77bf9253cfb926ea96ff07c09d9649f4b14 #}

Chromium issues: [1257885](https://crbug.com/1257885), [1458803](https://crbug.com/1458803).

### Human-readable HTTP status codes {: #status-codes }

The **Status Code** in the request's header now shows human-readable text next to the HTTP status codes, so you can figure out what happened to the request quicker.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZaKyHIWya3xO6jFqyFlB.png", alt="The before and after displaying human-readable HTTP status codes.", width="800", height="437" %}

You can also hover over the status code in the request table to see the same text.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/39e9d691bf22c254bdecb9d735d3725d1d3c50b4 #}

Chromium issue: [1153956](https://crbug.com/1153956).

### Pretty-print responses with JSON subtypes {: #pretty-json-response }

The **Response** tab of for a request with a `application/[subtype]+json` [MIME subtype](https://www.iana.org/assignments/media-types/media-types.xhtml#application) (for example, `ld+json`, `hal+json`, and others) now parses the response correctly and lets you prettify it.
 
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Na2g2Ba9ihx4P5BH9ZYW.png", alt="The before and after parsing an application/json subtype in a network response preview.", width="800", height="446" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2d0a199d6b50cc3cb6b8ca6539859045b52fb5e1 #}

Chromium issue: [406900](https://crbug.com/406900).

## Performance panel improvements {: #performance }

### See the changes in fetch priority for network events {: #fetch-priority }

The **Performance** panel now shows two priority fields in the **Summary** of an event in the **Network** track: **Initial Priority** and (final) **Priority**, instead of just the singe **Priority**. With this additional field you can now see if the event's fetch priority changes and tweak the order of downloads. For more information, see [Optimizing resource loading with the Fetch Priority API](https://web.dev/fetch-priority/).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/IzdOpZvv0KSQNdtGLfhL.png", alt="Before and after displaying changes in fetch priority.", width="800", height="521" %}

Additionally, you can find the same information in the **Priority** column of the **Network** panel, with the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Big request rows** setting enabled.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XDOh7qRquDu5joKZ9srg.png", alt="The Priority column in the Network panel.", width="800", height="610" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9b0b36187f7bb3b74497fcb6bfec20394cc6c0c6 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c56ddbbaaf87a3136bcca7191e7012aba8de7931 #}

Chromium issues: [1463901](https://crbug.com/1463901), [1380964](https://crbug.com/1380964).

### Find the total blocking time (TBT) in Lighthouse instead of the Performance panel {: #tbt }

The **Total blocking time** status bar has been removed from the **Performance** panel to maximize space. You can still find this metric in a [Lighthouse report](/docs/lighthouse/performance/lighthouse-total-blocking-time/). For more information on the importance of this performance metric, see [Total Blocking Time (TBT)](https://web.dev/tbt/).

For the same reason of maximizing space, the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Capture Settings**](/docs/devtools/performance/reference/#settings) now hides when you start the recording because they set up the recording and aren't useful once it's started.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1061a013745d1f638b1f989204886232fd5a835a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/92972cb03ef67a87fa803017b118cdaa596e975e #}

Chromium issues: [1455498](https://crbug.com/1455498), [1455498](https://crbug.com/1455498).

## New colors {: #colors }

You might have already noticed that DevTools now has a refreshed look that better aligns with Chrome. One contributing factor is the new color scheme.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/jYcGH36O81Qb7GvuJhd6.png", alt="The before and after applying new colors.", width="800", height="382" %}

This version (117) brings more UX improvements to DevTools, both already mentioned and listed further, including a number of improved UI texts.

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes and improvements in this release:



<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

