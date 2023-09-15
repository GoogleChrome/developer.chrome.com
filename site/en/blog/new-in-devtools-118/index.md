---
layout: 'layouts/blog-post.njk'
title: "What's New in DevTools (Chrome 118)"
authors:
  - sofiayem
date: 2023-09-07
description: "New section for custom properties in Elements > Styles, more local overrides improvements, enhanced search, streamlined workspace in Sources, and more."
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/r8TZKv9wtqFJvjYbyBeb.png'
alt: 'New section for custom properties in Elements > Styles, more local overrides improvements, enhanced search, streamlined workspace in Sources, and more.'
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

## New section for custom properties in Elements > Styles {: #css }

The **Elements** panel now supports the [@property CSS at-rule](https://web.dev/at-property/). It lets you define [CSS custom properties](https://developer.mozilla.org/docs/Web/CSS/--*) explicitly and register them in a stylesheet without running any JavaScript.

To inspect your registered custom properties, in **Elements** > **Styles**, hover over the property name and see its descriptors in a tooltip. In the tooltip, click the link to view the registered property in the collapsible `@property` section.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/vDfXTULIyNIJXVw6lKvf.mp4", width="800", height="511", autoplay="false", loop="true", muted="true", controls="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b98b663cb79d1cd341efe824d1bc1995d917e385 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/69d1f4a605113e436deb6fa5f2f7dc4316819f57 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1cfe38799440fe5d58d9387a4009cfdae2deced2 #}

Chromium issues: [1471102](https://crbug.com/1471102), [1471103](https://crbug.com/1471103), [1471105](https://crbug.com/1471105).


## More local overrides improvements {: #overrides }

Continuing the stream of improvements in the [previous version](/blog/new-in-devtools-117/#overrides), [local overrides](/docs/devtools/overrides/) now do the following:

- In **Sources** > **Page**, when you right-click a source mapped file and select **Override content**, DevTools will show a dialog that takes to the original source instead. Content overrides of source mapped files can't be overridden.

  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7pgnWI5CLcNBnv2H7aWT.png", alt="The dialog that takes you to the original code instead of the source mapped file.", width="800", height="458" %}

- The **Network** panel get a new **Has overrides** column and a corresponding `has-overrides:[content|headers|yes|no]` filter. To see the **Has overrides** column, [right-click](/docs/devtools/network/reference/#columns) the table header and select it.

  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/8YIC3pobJEwjA6xCdE4I.png", alt="Filtering for 'has-overrides:yes' value in the 'Has overrides' column.", width="800", height="512" %}

- In **Sources** > **Overrides**, the **Delete all overrides** menu option has been replaced with the **Delete** option with precise behavior.

  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/GiuilKK9SD0duIIYK1Ig.png", alt="Before and after replacing 'Delete all overrides' with 'Delete'.", width="800", height="443" %}

The previous **Delete all overrides** was confusing because it deleted only the overrides active in the current session, marked by the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/s81rU6SgdmbseeBDGbPl.png", alt="Saved.", width="17", height="20" %} purple dot icon.

The new **Delete** option, first shows a warning message and prompts confirmation, then deletes the folder you clicked with all its contents.

To bring back the previous option, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable "Delete all overrides temporarily"** in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > **Experiments**.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/77c8346f9025d1430c418bf596ff88f93f6ff2a9 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/fca7018689c03a74041741baee510fd2758b55d3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2b9c9f9d07db75e8b4dda600718384039083f0e5 #}

Chromium issues: [1472952](https://crbug.com/1472952), [1416338](https://crbug.com/1416338), [1472580](https://crbug.com/1472580), [1473681](https://crbug.com/1473681) [1475668](https://crbug.com/1475668).

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

## Improved Sources panel {: #sources }

### Streamlined workspace in the Sources panel {: #workspace }

The [workspace](/docs/devtools/workspaces/) feature in the **Sources** panel is new streamlined:

- **Consistent naming**. Most notably, the **Sources** > **Filesystem** pane was renamed into **Workspace**. Various UI texts in this pane are now clearer and free of redundancy.
- **Improved setup**. See better cues for dragging and dropping folders or click a link to select a folder.

[**Sources** > **Workspace**](/docs/devtools/workspaces/) lets you sync changes you make in DevTools directly to your source files.

See the new setup and workflow in action:

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/1T78X6ldgLhiH6iJgAMk.mp4", width="800", height="436", autoplay="false", loop="true", muted="true", controls="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9e9dd3ac6799946946e5442d5ab52acef6f53746 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f9a46dfec696a73efb8824e1a794155d50a14e7e #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9d4f22fb8fb50085dd0a908c4099e0d275143886 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/49b05f57392ec6294c96ed385f2e91b2900224eb #}

Chromium issues: [1473771](https://crbug.com/1473771), [1473880](https://crbug.com/1473880), [1473963](https://crbug.com/1473963), [1474686](https://crbug.com/1474686), [1474687](https://crbug.com/1474687).

### Reorder panes in Sources {: #reorder-panes }

You can now reorder panes on the left side of the **Sources** panel by dragging and dropping, similar to how you can [reorder other panels, tabs, and panes](/docs/devtools/customize/#reorder).

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/bHYhk8yS881OvomklbjW.mp4", width="800", height="375", autoplay="false", loop="true", muted="true", controls="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/49160d253ecbbcea84586457014947c1fa7e7876 #}

Chromium issues: [1473758](https://crbug.com/1473758).

### Syntax highlighting and pretty-printing for more script types {: #syntax }

The **Sources** panel can now:

- Pretty-print inline JavaScript within the following script types: [`module`](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules), [`importmap`](https://developer.mozilla.org/docs/Web/HTML/Element/script/type/importmap), [`speculationrules`](/blog/debugging-speculation-rules/).
- Highlight the syntax of `importmap` and `speculationrules` script types, both of which hold JSON.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/yZYe1CF5ObuLu7zVjcot.png", alt="Before and after pretty-printing and syntax highlighting of speculation rules script type.", width="800", height="395" %}

For more information on speculation rules, see [Prerender pages in Chrome for instant page navigations](/blog/prerender-pages/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d9f69138dae7d7042d5a964de4a91799029ba63e #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a49a95dd95a964a380334ddfba99b395d645f51a #}

Chromium issue: [1473875](https://crbug.com/1473875).

## Emulate prefers-reduced-transparency media feature {: #reduced-transparency }

[Chrome 118 now supports](/blog/chrome-118-beta/#media-queries-prefers-reduced-transparency-feature) the [`prefers-reduced-transparency` media feature](https://developer.mozilla.org/docs/Web/CSS/@media/prefers-reduced-transparency). This feature lets developers adapt web content to user-selected preference for reduced transparency in the OS, such as the **Reduce transparency** setting on macOS.

To emulate this media feature, open the **Rendering** tab and scroll down to it.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/Xh60t9y0KnAIdwoUnbX5.mp4", autoplay="false", loop="true", muted="true", controls="true", class="screenshot", width="800", height="533" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8f2118f91bab0707949706421727ca423d53e111 #}

Chromium issue: [1424879](https://crbug.com/1424879).

## Lighthouse 11 {: #lighthouse }

The **Lighthouse** panel now runs [Lighthouse 11](/blog/lighthouse-11-0/). Most notably, this version removes legacy navigation and adds new accessibility audits and changes how the accessibility category is scored.

See also the [full list of changes](https://github.com/GoogleChrome/lighthouse/releases/tag/v11.0.0). To learn the basics of using the **Lighthouse** panel in DevTools, see [Lighthouse: Optimize website speed](/docs/devtools/lighthouse/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8b7d433f10fd854784121020b76e29295bf51f84 #}

Chromium issue: [772558](https://crbug.com/772558).

## Accessibility improvements {: #accessibility }

DevTools now supports more navigation keystrokes:

- **CSS Overview**: Use the up and down arrows to navigate sections in the left sidebar.
- **Memory**: In the left sidebar, focus the **Save** button next to snapshots with <kbd>Tab</kbd> and press <kbd>Enter</kbd> to select folder.

Additionally, several screen reader announcement issues have been fixed.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b16ef33f36c694dd67fe07a24b0ff5da98ab9307 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bd7b236205de8c3e7cb3e67d83e8c4f1ada44ad4 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/11ca806035cccb4af046583e8b8d7aa7dc1af0f1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/33964c8dfa442b928c5320a8f82d14287ab06a8e #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c4a2a6833828f4425e5e5add1b7aec6aafb3a451 #}

Chromium issues: [1470401](https://crbug.com/1470401), [1471301](https://crbug.com/1471301), [1474108](https://crbug.com/1474108), [1468631](https://crbug.com/1468631).

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes and improvements in this release:

- **Network**: New icons for popular resources types: `media`, `wasm`, `websocket`, `manifest`, `fetch/xhr`, `json` ([1466298](https://crbug.com/1466298)).
- Color updates to material 3 colors in many UI elements, most notably in the **Elements** and **Performance** panels ([1456690](https://crbug.com/1456690), [1472243](https://crbug.com/1472243)).
- **Issues** now preserves cookie issues across navigations ([1466601](https://crbug.com/1466601)).
- Various [**Application** > **Preloading**](/blog/new-in-devtools-117/#preloading) improvements, most notably sortable grids and revised rule set details ([1410709](https://crbug.com/1410709)).
- Various improvements of the command editor in [**Protocol monitor**](/blog/new-in-devtools-117/#protocol-monitor), most notably warnings on wrong input, editing a sent command, editor for object parameters without predefined keys, support for enums undefined by references, objects without type reference, filter commands by substring matches, and more ([1448050](https://crbug.com/1448050)).
- **Performance** flame chart gets a border around the total box on the pie chart ([1470147](https://crbug.com/1470147)).
- **Sources** now doesn't treat dashes as word characters in CSS ([1471354](https://crbug.com/1471354)).
- Autocomplete now always sorts CSS-wise keywords at the end.
- RegEx filters now support spaces ([1346936](https://crbug.com/1346936)).
- **Elements** fixed media query feature detection ([1472693](https://crbug.com/1472693)).

## [Experimental] New Application > Storage > Storage buckets section {: #storage-buckets }

{% Aside 'note' %}
This is an experimental feature. To turn it on, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable Storage Buckets Tree in Application panel** in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > **Experiments**.
{% endAside %}

In continuation to [storage buckets support in version 116](/blog/new-in-devtools-116/#storage), the **Application** > **Storage** section gets a new **Storage buckets** subsection that contains a list of all the storage buckets for the page, with the following for each bucket:

- A list of supported storage APIs. 
- An IndexedDB tree with the IndexedDB information stored in the bucket.
- A Cache storage tree with cache storage information stored in the bucket.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/HYeHx3xXkyMxiC4rWJoB.png", alt="The storage buckets section in the Application panel.", width="800", height="487" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/136e27d0a695df800c6ff3b56beae7c2d89662aa #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f81354c8c35cea82e3d3a0531260106af6b723ad #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c5c9f2be0de6b57305fb233c1dca6882df13a151 #}

Chromium issue: [1406017](https://crbug.com/1406017).

<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

