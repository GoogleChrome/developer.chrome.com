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

The [local overrides](/docs/devtools/overrides/) feature now lets you locally override web content, in addition to [network response headers](/docs/devtools/overrides/#override-headers), so you can easily mock remote resources without access to them.

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

### Filter out Chrome extension requests {: #hide-extension-requests }

To help you focus on the code you author and filter out irrelevant requests sent by extensions you might have installed in Chrome, the **Network** panel gets a new filter. This filter is disabled by default.

To filter out all the requests sent to `chrome-extension://` URLs, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Hide extension URLs**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/07CwNEuofVPa8jp3LFfm.png", alt="Extension URLs hidden from the requests table.", width="800", height="478" %}

Moreover, to stop seeing confusing and irrelevant error messages from extensions in the **Console**, for example, about failing to load [source maps](https://web.dev/source-maps/), check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} [**Enable Ignore Listing**](/docs/devtools/settings/ignore-list/#skip-extensions) > **General exclusion rules** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Content scripts injected by extensions**.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/45b4415d1599864a73cab4138ecd3135d8ee79ba #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/dffee77bf9253cfb926ea96ff07c09d9649f4b14 #}

Chromium issues: [1257885](https://crbug.com/1257885), [1458803](https://crbug.com/1458803).

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes and improvements in this release:



<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

