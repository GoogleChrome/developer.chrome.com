---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 85)"
authors:
  - jecelynyeen
date: 2020-07-01
#updated: YYYY-MM-DD
description:
  "Style editing for CSS-in-JS frameworks, Lighthouse 6.0, new JavaScript features, and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VLstNJeC67163SBU8484.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-85
---

{% YouTube id="NOal2gTzftI" %}

## Style editing for CSS-in-JS frameworks {: #css-in-js }

The Styles pane now has better support for editing styles that were created with the [CSS Object
Model][1] (CSSOM) APIs. Many CSS-in-JS frameworks and libraries use the CSSOM APIs under the hood to
construct styles.

You can also edit styles added in JavaScript using [Constructable Stylesheets][2] now. Constructable
Stylesheets are a new way to create and distribute reusable styles when using [Shadow DOM][3].

For example, the `h1` styles added with `CSSStyleSheet` (CSSOM APIs) are not editable previously.
There are editable now in the Styles pane:

{% Video src="video/BrQidfK9jaQyIHwdw91aVpkPiib2/ejZpFP0QqyhNy7p32goP.mp4" %}

Chromium issue [#946975][4]

## Lighthouse 6 in the Lighthouse panel {: #lighthouse }

The Lighthouse panel is now running Lighthouse 6. Check out [What's New in Lighthouse 6.0][5] for a
summary of all the major changes, or the [v6.0.0 release notes][6] for a full list of all changes.

Lighthouse 6.0 introduces three new metrics to the report: Largest Contentful Paint (LCP),
Cumulative Layout Shift (CLS), and Total Blocking Time (TBT). LCP and CLS are 2 of Google's new
[Core Web Vitals][7], and TBT is a lab measurement proxy for another Core Web Vital, First Input
Delay.

The performance score formula has also been reweighted to better reflect the users' loading
experience.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1Tmmm0bSZ1g2G5LRgt2p.png", alt="New performance metrics in Lighthouse 6.0", width="800", height="455" %}

Chromium issue [#772558][8]

### First Meaningful Paint (FMP) deprecation {: #fmp-deprecation }

First Meaningful Paint (FMP) is deprecated in Lighthouse 6.0. It has also been removed from the
Performance panel. [Largest Contentful Paint][9] is the recommended replacement for FMP. See [First
Meaningful Paint][10] for an explanation of why it was deprecated.

Chromium issue [#1096008][11]

## Support for new JavaScript features {: #javascript }

DevTools now has better support for some of the latest JavaScript language features:

- [Optional chaining][12] syntax autocompletion - property auto-completion in the Console now
  supports optional chaining syntax, e.g. `name?.` now works in addition to `name.` and `name[`.
- Syntax highlighting for [private fields][13] - private class fields are now properly
  syntax-highlighted and pretty-printed in the Sources panel.
- Syntax highlighting for [Nullish coalescing operator][14] - DevTools now properly pretty-prints
  the nullish coalescing operator in the Sources panel.

Chromium issues [#1083214][15], [#1073903][16], [#1083797][17]

## New app shortcut warnings in the Manifest pane {: #app-shortcut-warnings }

[App shortcuts][18] help users quickly start common or recommended tasks within a web app.

The Manifest pane now shows warnings if:

- the app shortcut icons are smaller than 96x96 pixels
- the app shortcut icons and manifest icons are not square (as they will be ignored)

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/2MLhQXnSoZmpTFfuyoWR.png", alt="App shortcut warnings", width="800", height="534" %}

Chromium issue [#955497][19]

## Service worker `respondWith` events in the Timing tab {: #timing-tab }

The Timing tab of the Network panel now includes service worker `respondWith` events. `respondWith`
is the time immediately before the service worker `fetch` event handler runs to the time when the
`fetch` handler's `respondWith` promise is settled.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/MAsxvpqRZLI4SOvwyfSK.png", alt="service worker `respondWith`", width="800", height="502" %}

Chromium issue [#1066579][20]

## Consistent display of the Computed pane {: #computed-pane }

The Computed pane in the Elements panel now displays consistently as a pane across all viewport
sizes. Previously the Computed pane would merge inside the Styles pane when the width of the
DevTools' viewport was narrow.

{% Video src="video/BrQidfK9jaQyIHwdw91aVpkPiib2/AsgYdc0jmYE5M8VzHx2O.mp4" %}

Chromium issue [#1073899][21]

## Bytecode offsets for WebAssembly files {: #wasm }

DevTools now uses bytecode offsets for displaying line numbers of Wasm disassembly. This makes it
clearer that you're looking at binary data, and is more consistent with how the Wasm runtime
references locations.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/qH0jKcKjN8X5cVZqt0SR.png", alt="Bytecode offsets", width="800", height="691" %}

Chromium issue [#1071432][22]

## Line-wise copy and cut in Sources Panel {: #sources-panel }

When performing copy or cut with no selection in the [Sources panel editor][23], DevTools will copy
or cut the current line content. For example, in the video below, the cursor is at the end of
line 1. After pressing the cut keyboard shortcut, the entire line is copied to the clipboard and
deleted.

{% Video src="video/BrQidfK9jaQyIHwdw91aVpkPiib2/gkwPfntrPTxuQkisI1n5.mp4" %}

Chromium issue [#800028][24]

## Console Settings updates {: #console-settings }

### Ungroup same console messages {: #ungroup-messages }

The **Group similar** toggle in Console Settings now applies to duplicate messages. Previously it
just applied to similar messages.

For example, previously, DevTools did not ungroup the messages `hello` even though **Group similar**
is unchecked. Now, the `hello` messages are ungrouped:

Chromium issue [#1082963][25]

### Persisting **Selected context only** settings {: #selected-context }

The **Selected context only** settings in Console Settings is now persisted. Previously the settings
were reset every time you closed and reopened DevTools. This change makes the setting behavior
consistent with other Console Settings options.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/5IOY8x1f61ddnRcdFFrg.png", alt="Selected context only", width="800", height="581" %}

Chromium issue [#1055875][26]

## Performance panel updates {: #perf-panel }

### JavaScript compilation cache information in Performance panel {: #javascript_compilation_cache_information_in_performance_panel }

[JavaScript compilation cache information][27] is now always displayed in the Summary tab of the
Performance panel. Previously, DevTools wouldn't show anything related to code caching if code
caching didn't happen.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ihesnfou0XvBC59T3wfj.png", alt="JavaScript compilation cache information", width="800", height="447" %}

Chromium issue [#912581][28]

### Navigation timing alignment in the Performance panel {: #navigation_timing_alignment_in_the_performance_panel }

The Performance panel used to show times in the rulers based on when the recording started. This has
now changed for recordings where the user navigates, where DevTools now shows ruler times relative
to the navigation instead.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/HURhX5qUI9CnNL09tJvj.png", alt="Align navigation timing in Performance panel", width="800", height="667" %}

We've also updated times for `DOMContentLoaded`, First Paint, First Contentful Paint, and Largest
Contentful Paint events to be relative to the start of the navigation, which means they match the
timings reported by `PerformanceObserver`.

Chromium issue [#974550][29]

## New icons for breakpoints, conditional breakpoints, and logpoints {: #breakpoints }

The **Sources** panel has new designs for breakpoints, conditional breakpoints, and logpoints.
Breakpoints get a refreshed flag design with brighter and friendlier colors. Icons are added to
differentiate conditional breakpoints and logpoints.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/BaH2w6G22IL5BkgQoO2K.png", alt="Breakpoints", width="800", height="809" %}

Chromium issue [#1041830][30]

[1]: https://drafts.csswg.org/cssom/
[2]: https://developers.google.com/web/updates/2019/02/constructable-stylesheets
[3]: https://developers.google.com/web/fundamentals/web-components/shadowdom
[4]: https://crbug.com/946975
[5]: https://web.dev/lighthouse-whats-new-6.0/
[6]: https://github.com/GoogleChrome/lighthouse/releases/tag/v6.0.0
[7]: https://web.dev/vitals/#core-web-vitals
[8]: https://crbug.com/772558
[9]: https://web.dev/lcp/
[10]: https://web.dev/first-meaningful-paint/
[11]: https://crbug.com/1096008
[12]: https://v8.dev/features/optional-chaining
[13]: https://v8.dev/features/class-fields#private-class-fields
[14]: https://v8.dev/features/nullish-coalescing
[15]: https://crbug.com/1083214
[16]: https://crbug.com/1073903
[17]: https://crbug.com/1083797
[18]: https://web.dev/app-shortcuts
[19]: https://crbug.com/955497
[20]: https://crbug.com/1066579
[21]: https://crbug.com/1073899
[22]: https://crbug.com/1071432
[23]: /docs/devtools/sources#edit
[24]: https://crbug.com/800028
[25]: https://crbug.com/1082963
[26]: https://crbug.com/1055875
[27]: https://v8.dev/blog/code-caching-for-devs
[28]: https://crbug.com/912581
[29]: https://crbug.com/974550
[30]: https://crbug.com/1041830
