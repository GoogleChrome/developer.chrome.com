---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 84)"
authors:
  - kaycebasques
date: 2020-05-12
#updated: YYYY-MM-DD
description: "The new Issues tab, accessibility information in the Inspect Mode tooltip, and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/OW8UpZGnXiuvi6WbhRku.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-84
---

{% YouTube id="dgYAlcJonxo" %}

## Fix site issues with the new Issues tab {: #issues }

The new **Issues** tab in the Drawer aims to help reduce the notification fatigue and clutter of the
**Console**. Currently, the Console is the central place for website developers, libraries,
frameworks, and Chrome itself to log messages, warnings, and errors. The Issues tab presents
warnings from the browser in a structured, aggregated, and actionable way, links to affected
resources within DevTools, and provides guidance on how to fix the issues. Over time, more and more
of Chrome's warnings will be surfaced in the Issues tab rather than the Console, which should help
reduce the Console's clutter.

Check out [Find And Fix Problems With The Chrome DevTools Issues Tab][1] to get started.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/lTX2GUfZbWyGzYj5oWcY.png", alt="The Issues tab.", width="800", height="657" %}

Chromium Bug: [#1068116][2]

## View accessibility information in the Inspect Mode tooltip {: #a11y }

The [Inspect Mode tooltip][3] now indicates whether the element has an accessible [name and role][4]
and is [keyboard-focusable][5].

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/b28GyTVPSuYcdkoFOy7W.jpg", alt="The Inspect Mode tooltip with accessibility information.", width="800", height="959" %}

Chromium Bug: [#1040025][6]

## Performance panel updates {: #performance }

### View Total Blocking Time (TBT) information in the footer {: #tbt }

After recording your load performance, the Performance panel now shows [Total Blocking Time][7]
(TBT) information in the footer. TBT is a load performance metric that helps quantify how long it
takes a page to become usable. It essentially measures how long a page _appears_ to be usable
(because its content has been rendered to the screen) but _isn't actually usable_ because JavaScript
is blocking the main thread and therefore the page can't respond to user input. TBT is the main [lab
metric][8] for approximating First Input Delay, which is one of Google's new [Core Web Vitals][9].

To get Total Blocking Time information, **do not** use the **Reload Page**
<img alt="Reload page" src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/zlk9ZgF58Mm6U7AYWxxE.png" style="max-height: 1em; vertical-align: middle; display: inline;">
workflow for recording page load performance. Instead, click **Record**
<img alt="Record" src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/FhPgza4ynfJ6ZrDK6U51.png" style="max-height: 1em; vertical-align: middle; display: inline;">,
manually reload the page, wait for the page to load, and then stop recording. If you see
`Total Blocking Time: Unavailable` it means that DevTools did not get the information it needs from
Chrome's internal profiling data.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Lu1vDJIZYiW8AFYtLrjQ.jpg", alt="Total Blocking Time information in the footer of a Performance panel recording.", width="800", height="561" %}

Chromium Bug: [#1054381][10]

### Layout Shift events in the new Experience section {: #cls }

The new **Experience** section of the Performance panel can help you detect [layout shifts][11].
Cumulative Layout Shift (CLS) is a metric that can help you quantify unwanted visual instability and
is one of Google's new [Core Web Vitals][12].

Click a **Layout Shift** event to see the details of the layout shift in the **Summary** tab. Hover
over the **Moved from** and **Moved to** fields to visualize where the layout shift occurred.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/2zfTTParTELog75y1VOb.jpg", alt="The details of a layout shift.", width="800", height="597" %}

## More accurate promise terminology in the Console {: #promises }

When logging a `Promise` the Console used to incorrectly describe the state of the `Promise` as
`resolved`:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/hNbVxm5vTgdv0m5YeO0C.jpg", alt="An example of the Console using the old 'resolved' terminology.", width="800", height="449" %}

The Console now uses the term `fulfilled`, which [aligns with the `Promise` spec][13]:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/SrAp9fORCU1KlMPNieJe.jpg", alt="An example of the Console using the new 'fulfilled' terminology.", width="800", height="395" %}

V8 Bug: [#6751][14]

## Styles pane updates {: #styles }

### Support for the `revert` keyword {: #revert }

The Styles pane's autocomplete UI now detects the [`revert`][15] CSS keyword, which reverts the
cascaded value of a property to what the value would have been if no changes had been made to the
element's styling.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/tdN17h8oUDCaSGv61aj8.jpg", alt="Setting the value of a property to revert.", width="800", height="436" %}

Chromium Bug: [#1075437][16]

### Image previews {: #image-previews }

Hover over a `background-image` value in the Styles pane to see a preview of the image in a tooltip.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/bbiH4yXniXJiTdFNGzqg.jpg", alt="Hovering over a background-image value.", width="800", height="460" %}

Chromium Bug: [#1040019][17]

### Color Picker now uses space-separated functional color notation {: #color }

[CSS Color Module Level 4][18] specifies that color functions like `rgb()` should support
space-separated arguments. For example, `rgb(0, 0, 0)` is equivalent to `rgb(0 0 0)`.

When you choose colors with the [Color Picker][19] or alternate between color representations in the
Styles pane by holding Shift and then clicking the color value, you'll now see the space-separated
argument syntax.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/q9EdwDsytfd3LrKE5ddN.jpg", alt="Using space-separated arguments in the Styles pane.", width="800", height="499" %}

You'll also see the syntax in the Computed pane and the Inspect Mode tooltip.

DevTools is using the new syntax because [upcoming CSS features like `color()` do not support the
deprecated comma-separated argument syntax][20].

The space-separated argument syntax has been supported in most browsers for a while. See [Can I use
Space-separated functional color notations?][21]

Chromium Bug: [#1072952][22]

## Deprecation of the **Properties** pane in the Elements panel {: #properties }

The **Properties** pane in the **Elements** panel has been deprecated. Run `console.dir($0)` in the
**Console** instead.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/baxJpoi3vt3HzEqf9Oy3.jpg", alt="The deprecated Properties pane.", width="800", height="590" %}

References:

- [`console.dir()`][23]
- [`$0`][24]

## App shortcuts support in the Manifest pane {: #app-shortcuts }

App shortcuts help users quickly start common or recommended tasks within a web app. The app
shortcuts menu is shown only for Progressive Web Apps that are installed on the user's desktop or
mobile device.

Check out [Get things done quickly with app shortcuts][25] to learn more.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1KUD1snHJ1sVaaZo3BRK.png", alt="App shortcuts in the Manifest pane.", width="800", height="534" %}

[1]: /docs/devtools/issues
[2]: https://crbug.com/1068116
[3]: /blog/new-in-devtools-73#inspect
[4]: https://web.dev/labels-and-text-alternatives/
[5]: https://web.dev/control-focus-with-tabindex/
[6]: https://crbug.com/1040025
[7]: https://web.dev/tbt/
[8]: https://web.dev/how-to-measure-speed/#lab-data-vs-field-data
[9]: https://web.dev/vitals/#core-web-vitals
[10]: https://crbug.com/1054381
[11]: https://web.dev/cls/
[12]: https://web.dev/vitals/#core-web-vitals
[13]: https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md
[14]: https://bugs.chromium.org/p/v8/issues/detail?id=6751
[15]: https://developer.mozilla.org/en-US/docs/Web/CSS/revert
[16]: https://crbug.com/1075437
[17]: https://crbug.com/1040019
[18]: https://drafts.csswg.org/css-color/#changes-from-3
[19]: /docs/devtools/css/reference#color-picker
[20]: https://twitter.com/mathias/status/1253242715304857601
[21]: https://caniuse.com/#feat=mdn-css_types_color_space_separated_functional_notation
[22]: https://crbug.com/1072952
[23]: /docs/devtools/console/api#dir
[24]: /docs/devtools/console/utilities#dom
[25]: https://web.dev/app-shortcuts
