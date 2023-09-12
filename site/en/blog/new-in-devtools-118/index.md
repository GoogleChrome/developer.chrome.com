---
layout: 'layouts/blog-post.njk'
title: "What's New in DevTools (Chrome 118)"
authors:
  - sofiayem
date: 2023-09-07
description: ""
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/oM7ywmnxgVDuegxueVbK.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-118
---
<!--image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gctGASDKBFTUtOQqVq2H.png  -->

{% Partial 'devtools/banner.md' %}

*There is no 'What's new in DevTools' video for this release, but you can watch this quick recap of the recent features.*

{% YouTube id='e8tl_yp5BQg' %}

<!-- $contentStart -->

## Enhanced search {: #search }

[**Search**](/docs/devtools/search/) results now show an entry per all the matches it found in a line of code. Previously, it showed only the first match per line of code. The new behavior is especially useful when you search across minified files. When you click a search result, it opens the file in the editor and now scrolls the match into view not only vertically but also horizontally.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/f5Yu4fSECIVDllWkpEZs.png", alt="The before and after making search show all the matches per line.", width="800", height="424" %}

Additionally, **Search** got a speed boost. See the before (left) and after (right) comparison in the next video.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/FyExrp5BLiGRHAT3OK4C.mp4", width="800", height="481", autoplay="false", loop="true", muted="true", controls="true", class="screenshot" %}

Finally, **Search** now supports [ignore listing](/docs/devtools/settings/ignore-list/) and won't show you results from ignored files.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8bede301d455d921e66ba4052e8d3512e01d34bf #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2da188c6a7b519a30f2f43e114e78ac4c818e0cb #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1cfe38799440fe5d58d9387a4009cfdae2deced2 #}

Chromium issues: [1468875](https://crbug.com/1468875), [1472019](https://crbug.com/1472019).

## New section for custom properties in Elements > Styles {: #css }

The **Elements** panel now supports the [@property CSS at-rule](https://developer.mozilla.org/docs/Web/CSS/@property). It lets you define [CSS custom properties](https://developer.mozilla.org/docs/Web/CSS/--*) explicitly and register them in a stylesheet without running any JavaScript.

To inspect your registered custom properties, in **Elements** > **Styles**, hover over the property name and see its descriptors in a tooltip. In the tooltip, click the link to view the registered property in the collapsible `@property` section.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/vDfXTULIyNIJXVw6lKvf.mp4", width="800", height="511", autoplay="false", loop="true", muted="true", controls="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b98b663cb79d1cd341efe824d1bc1995d917e385 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/69d1f4a605113e436deb6fa5f2f7dc4316819f57 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1cfe38799440fe5d58d9387a4009cfdae2deced2 #}

Chromium issues: [1471102](https://crbug.com/1471102), [1471103](https://crbug.com/1471103), [1471105](https://crbug.com/1471105).

## Streamlined workspace in the Sources panel {: #sources }

The [workspace](/docs/devtools/workspaces/) feature in the **Sources** panel is new streamlined:

- **Consistent naming**. Most notably, the **Sources** > **Filesystem** pane was renamed into **Workspace**. Various UI texts in this pane are now clearer and free of redundancy.
- **Imropoved setup**. See better cues for dragging and dropping folders or click a link to select a folder.

[**Sources** > **Workspace**](/docs/devtools/workspaces/) lets you sync changes you make in DevTools directly to your source files.

See the new setup and workflow in action:

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/1T78X6ldgLhiH6iJgAMk.mp4", width="800", height="436", autoplay="false", loop="true", muted="true", controls="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9e9dd3ac6799946946e5442d5ab52acef6f53746 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f9a46dfec696a73efb8824e1a794155d50a14e7e #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9d4f22fb8fb50085dd0a908c4099e0d275143886 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/49b05f57392ec6294c96ed385f2e91b2900224eb #}

Chromium issues: [1473771](https://crbug.com/1473771), [1473880](https://crbug.com/1473880), [1473963](https://crbug.com/1473963), [1474686](https://crbug.com/1474686), [1474687](https://crbug.com/1474687).

## Lighthouse 11 {: #lighthouse }

The **Lighthouse** panel now runs [Lighthouse 11](/blog/lighthouse-11-0/). Most notably, this version:

- Removes legacy navigation. 
- Adds new `DevtoolsLog` and `Trace` artifacts
- Adds a few new accessibility audits

See also the [full list of changes](https://github.com/GoogleChrome/lighthouse/releases/tag/v11.0.0). To learn the basics of using the **Lighthouse** panel in DevTools, see [Lighthouse: Optimize website speed](/docs/devtools/lighthouse/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8b7d433f10fd854784121020b76e29295bf51f84 #}

Chromium issue: [772558](https://crbug.com/772558).

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes and improvements in this release:



<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

