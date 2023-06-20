---
layout: 'layouts/blog-post.njk'
title: "What's New in DevTools (Chrome 116)"
authors:
  - sofiayem
date: 2023-06-20
description: ""
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/s7ZpM4wjhbRf5K6Vspk3.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-116
---
<!--image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gctGASDKBFTUtOQqVq2H.png  -->

{% Partial 'devtools/banner.md' %}

*There is no 'What's new in DevTools' video for this release, but you can watch this quick recap of the recent features.*

{% YouTube id='CrSmjooOEiE' %}

<!-- $contentStart -->

## Improved debugging of missing stylesheets {: #stylesheets }

DevTools gets a number of improvements to help you identify and debug issues with missing stylesheets faster:

- The **Sources** > **Page** tree now shows only the successfully deployed and loaded stylesheets to minimize confusion.
- The **Sources** > **Editor** now underlines and shows inline error tooltips next to failed `@import`, `url()`, and `href` statements.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/uv386cOgFWeWnf6ItxOS.png", alt="Underlined statements with tooltips in the Sources panel.", width="800", height="446" %}

- The **Console**, in addition to links to failed requests, now provides links to the exact line that references a stylesheet that failed to load.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/acQGKJmqR7JtA4e9UaIq.png", alt="The Console provides links to the exact lines with problematic statements.", width="800", height="574" %}

- The **Network** panel consistently populates the **Initiator** column with links to the exact line that references a stylesheet that failed to load.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/yLxplrnFZTGYMpkdoppC.png", alt="The Initiator column with links in the Network panel.", width="800", height="560" %}

- The **Issues** panel lists all stylesheets loading issues, including broken URLs, failed requests, and misplaced `@import` statements.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JlcKWWo8z99LqXiHFk53.png", alt="The Issues panel with links to to sources and requests.", width="800", height="668" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0fa569ef9d924d6437669b03d0764c9e1831efeb #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/21b1170ca95161cdedf94879104a67ce09f62eed #}

Chromium issues: [1440626](https://crbug.com/1440626), [1442198](https://crbug.com/1442198), [1453611](https://crbug.com/1453611).

## Linear timing support in Elements > Styles > Easing Editor {: #linear }

The {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/U0vVF9a5jrj948Gegu6o.png", alt="Easing Editor.", width="22", height="22" %} [**Easing Editor**](/docs/devtools/css/reference/#edit-easing) in **Elements** > **Styles** lets you adjust [`transition-timing-function`](https://developer.mozilla.org/docs/Web/CSS/transition-timing-function) and [`animation-timing-function`](https://developer.mozilla.org/docs/Web/CSS/animation-timing-function) values with a click. In this version, the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/U0vVF9a5jrj948Gegu6o.png", alt="Easing Editor.", width="22", height="22" %} **Easing Editor** gets the linear timing function support.

To configure linear timings, click the linear picker button. To add a control point, click anywhere on the line. To remove a control point, double-click it. You can also choose one of the presets: `linear`, `elastic`, `bounce`, or `emphasized`. Watch the video to see the linear adjustment in action.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/2KQ2gCmcR6mGKO29wCJH.mp4", width="800", height="529", loop="false", muted="true", controls="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/670222516a187b5102ad78828cff1e2d5861aeec #}

Chromium issue: [1421241](https://crbug.com/1421241).

## Storage buckets support and metadata view {: #storage }

The **Application** > **Storage** section gets [storage buckets](/blog/storage-buckets/) support. Storage buckets are independent from each other, so you can specify eviction prioritization for slices of data and make sure the most valuable data doesn't get deleted. Each storage bucket can store data associated with established storage APIs such as [IndexedDB](/docs/devtools/storage/indexeddb/) and [CacheStorage](/docs/devtools/storage/cache/).

Check out [this fiddle](https://jsfiddle.net/5tmpfuzv/) to test the feature. Open DevTools, navigate to **Application** > **Storage** > **Indexed DB**, and run the code. DevTools now shows you the buckets and their contents. Select a bucket to view its metadata.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/oHC4ZiwP7korWtj7uzVB.png", alt="Viewing the metadata of a bucket.", width="800", height="675" %}

The unified metadata view is now also available for local, session, and cache storage sections.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/v62NRakc7Rg3g0PGqmCH.png", alt="The new unified metadata view.", width="800", height="462" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/18653a84ceedd0db16ad1872c14f412dc7013eab #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9215bd9a9bdff053660d7ebdd5a8a5bdcb8157e5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ca51bbf258c6a314b6435849135b0e020ac35041 #}

Chromium issues: [1448011](https://crbug.com/1448011), [1406017](https://crbug.com/1406017).

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes and improvements in this release:


<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
