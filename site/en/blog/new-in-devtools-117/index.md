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

### Enhanced local overrides of web content and network request headers {: #overrides }

The [local overrides](/docs/devtools/overrides/) feature gets an enhanced UX, so you can locally mock both web content and network response headers faster and easier.

To override web content or response headers, open the **Network** panel, right-click a request, and select **Override headers** or **Override content**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/d5GbGiXuVdTCqsMbENL4.png", alt="The override options in the drop-down menu of a request.", width="800", height="700" %}

If you have local overrides set up but disabled, DevTools enables them. If you haven't set them up yet, DevTools prompts you in the action bar at the top. Select a folder to store the overrides in and allow DevTools access to it.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/cuNvCVUAVtICozqgThQi.png", alt="Select a folder and allow access to it in the action bar at the top.", width="800", height="507" %}

Depending on what you are overriding, DevTools then takes you to:

- **Sources** > **Overrides** > **Editor** to let you [override web content](/docs/devtools/overrides/#make-changes).
- **Network** > **Headers** > **Response Headers** to let you [override headers](/docs/devtools/overrides/#override-headers).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/3O7qVeRllJdq7usBfZ7I.png", alt="Overriding web content in Sources or response headers in Network.", width="800", height="481" %}

Note that the overridden resources are indicated with {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/s81rU6SgdmbseeBDGbPl.png", alt="Saved.", width="17", height="20" %} in the **Network** panel. Hover over the icon to see what's overridden.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hekOD6lUKKXipZ6qFT3D.png", alt="An override icon next to a request in the Network panel.", width="800", height="493" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5cc23747aef9bf9380fc09e45897f49295026801 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3755eef346c32ef537e66a7ee13efe9a0c4ab84a #}


Chromium issues: [1465785](https://crbug.com/1465785), [1470532](https://crbug.com/1470532), [1469359](https://crbug.com/1469359).

### Override the content of XHR and fetch requests {: #xhr-fetch }

You can now override the content of XHR and fetch requests in addition to their response headers.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/VNWoow5lA0HgGq9Zc5Od.mp4", autoplay="false", loop="true", muted="true", controls="true", width="800", height="704", class="screenshot" %}

DevTools currently supports content overrides for the following request types: images (for example, avif, png), fonts, fetch and XHR, scripts (css and js), and documents (html). DevTools now greys out the **Override content** option for unsupported types.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/s2SjYkIiDyjzzR8vxORA.png", alt="The override content option unavailable for the media request type.", width="800", height="651" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/67b8ebb822a32dd187c3963d108645e25015c0e8 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4465f5220d3a58242c8ed6f697a8d575448d9553 #}

Chromium issues: [792101](https://crbug.com/792101), [1469776](https://crbug.com/1469776).

### Hide Chrome extension requests {: #hide-extension-requests }

To help you focus on the code you author and filter out irrelevant requests sent by extensions you might have installed in Chrome, the **Network** panel gets a new filter. This filter is disabled by default.

To filter out all the requests sent to `chrome-extension://` URLs, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Hide extension URLs**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/07CwNEuofVPa8jp3LFfm.png", alt="Extension URLs hidden from the requests table.", width="800", height="478" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/45b4415d1599864a73cab4138ecd3135d8ee79ba #}

Chromium issue: [1257885](https://crbug.com/1257885).

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes and improvements in this release:



<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

