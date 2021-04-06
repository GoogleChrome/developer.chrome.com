---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 86)"
authors:
  - jecelynyeen
date: 2020-08-20
#updated: YYYY-MM-DD
description:
  "New Media panel, capture node screenshot, Issues tab updates, emulate missing local fonts,
  inactive users and prefers-reduced-data."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VYCJO5yoVwSN3v8f1XSm.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-86
---

{% Aside %}

Interested in helping improve DevTools? Sign up to participate in [Google User Research here][1].

{% endAside %}

{% YouTube id="koUsK58dpNo" %}

## New Media panel {: #media-panel }

DevTools now displays media players information in the [Media panel][2].

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/DmEIPFNcIQcD2f1oVfGC.png", alt="New Media panel", width="800", height="487" %}

Prior to the new media panel in DevTools, logging and debug information about video players could be
found in `chrome://media-internals`.

The new Media panel provides an easier way to view events, logs, properties, and a timeline of frame
decodes in the same browser tab as the video player itself. You can live view and inspect on
potential issues quicker (e.g. why dropped frames are occurring, why JavaScript is interacting with
the player in an unexpected way).

Chromium issue: [1018414][3]

## Capture node screenshots via Elements panel context menu {: #capture-node-screenshot }

You can now capture node screenshots via the context menu in the Elements panel.

For example, you can take a screenshot of the table of content by right clicking the element and
select **Capture node screenshot**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/r1qEVioRv6kTYoSCbAAG.png", alt="Capture node screenshots", width="800", height="377" %}

Chromium issue: [1100253][4]

## Issues tab updates {: #issues-tab }

The Issues warning bar on the Console panel is now replaced with a regular message.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/KTMjp7sZIi82132RbSGD.png", alt="Issues in console message", width="800", height="483" %}

Third-party cookie issues are now hidden by default in the Issues tab. Enable the new **Include
third-party cookie issues** checkbox to view them.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Bf8gnyAN5YX0nX14eqif.png", alt="third-party cookie issues checkbox", width="800", height="535" %}

Chromium issues: [1096481][5], [1068116][6], [1080589][7]

## Emulate missing local fonts {: #emulate-local-fonts }

Open the [Rendering tab][8] and use the new **Disable local fonts** feature to emulate missing
`local()` sources in `@font-face` rules.

For example, when the font "Rubik" is installed on your device and the `@font-face src` rule uses it
as a `local()` font, Chrome uses the local font file from your device.

When **Disable local fonts** is enabled, DevTools ignores the `local()` fonts and fetches them from
the network.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/U9GRJae9v4Mt9uEkz6Ut.png", alt="Emulate missing local fonts", width="800", height="487" %}

Oftentimes, developers and designers use two different copies of the same font during development:

- A local font for your design tools, and
- A web font for your code

Disabling local fonts makes it easier for you to:

- Debug and measure web fonts loading performance and optimization
- Verify correctness of your CSS `@font-face` rules
- Discover any differences between web fonts and their local versions

Chromium issue: [384968][9]

## Emulate inactive users {: #emulate-inactive-users }

The [Idle Detection API][10] allows developers to detect inactive users and react on idle state
changes. You can now use DevTools to emulate idle state changes in the **Sensors** tab for both the
user state and the screen state instead of waiting for the actual idle state to change. You can open
the **Sensors** tab from the [**Drawer**][11].

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/9bZbJYcIzAJx9n9hvAKw.png", alt="Emulate inactive users", width="800", height="487" %}

Chromium issue: [1090802][12]

## Emulate `prefers-reduced-data` {: #emulate-prefers-reduced-data }

{% Aside %}

In Chrome 86, this feature is available behind the
[chrome://flags/#enable-experimental-web-platform-features][13] flag. You can see this emulation
option only if the flag is enabled.

{% endAside %}

The [`prefers-reduced-data`][14] media query detects if the user prefers being served alternate
content that uses less data for the page to be rendered.

You can now use DevTools to emulate the `prefers-reduced-data` media query.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Yl06AtiNkQb0L7fhxdFa.png", alt="Emulate prefers-reduced-data", width="800", height="449" %}

Chromium issue: [1096068][15]

## Support for new JavaScript features {: #javascript }

DevTools now has better support for some of the latest JavaScript language features:

- [Logical assignment operators][16] - DevTools now supports logical assignment with the new
  operators `&&=`, `||=`, and `??=` in the Console and Sources panels.
- Pretty-print [numeric separators][17] - DevTools now properly pretty-prints the numeric separators
  in the Sources panel.

Chromium issues: [1086817][18], [1080569][19]

## Lighthouse 6.2 in the Lighthouse panel {: #lighthouse }

The Lighthouse panel is now running Lighthouse 6.2. Check out the [release notes][20] for a full
list of changes.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/JA6LSMIJs2adZUpKrVic.png", alt="Unsize image", width="800", height="448" %}

New audits in Lighthouse 6.2:

- **Avoid long main thread tasks**. Reports the longest tasks on the main thread, useful for
  identifying worst contributors to input delay.
- **Links are crawlable**. Check if the `href` attribute of anchor elements links to an appropriate
  destination, so the links can be discovered.
- **Unsized image elements** - Check if an explicit `width` and `height` is set on image elements.
  Explicit image size can reduce layout shifts and improve CLS.
- **Avoid non-composited animations**. Reports [non-composited animations][21] that appear janky and
  reduce CLS.
- **Listens for the `unload` events**. Reports the `unload` event. Consider using the `pagehide` or
  `visibilitychange` events instead as the `unload` event does not fire reliably.

Updated audits in Lighthouse 6.2:

- **Remove unused JavaScript**. Lighthouse will now enhance the audit if a page has
  publicly-accessible JavaScript source maps.

Chromium issue: [772558][22]

## Deprecation of "other origins" listing in the Service Workers pane {: #deprecate-sw-other-origins }

DevTools now provides a link to view the full list of service workers from other origins in a new
browser tab - `chrome://serviceworker-internals/?devtools`.

Previously DevTools displayed a list nested under the **Application** panel > **Service workers**
pane.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/NkuzBGAChhAFXGb5hUTj.png", alt="Link to other origins", width="800", height="473" %}

Chromium issue: [807440][23]

## Show coverage summary for filtered items {: #filter-coverage-summary }

DevTools now recalculates and displays a summary of coverage information dynamically when filters
are applied in the [**Coverage**][24] tab. Previously, the **Coverage** tab always displayed a
summary of all coverage information.

In the example below notice how the summary initially says
`446 kB of 2.0 MB (22%) used so far. 1.5 MB unused.` and then says
`57 kB of 604 kB (10%) used so far. 546 kB unused.` after CSS filtering has been applied.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/LL47aWqPhRWssfrS7CG3.png", alt="Coverage summary for filtered items", width="800", height="487" %}

Chromium issue: [1061385][25]

## New frame details view in Application panel {: #frame-detailed-view }

DevTools now show a detailed view for each frame. Access it by clicking a frame under the **Frames**
menu in the **Application** panel.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/mu4AlNhH4ccBxbxD0Iud.png", alt="New frame details view in Application panel", width="800", height="488" %}

Chromium issue: [1093247][26]

### Frame details for opened windows {: #pop-up-frame-details }

DevTools now displays opened windows / pop-ups under the frame tree as well. The frame details view
of the opened windows includes additional security information.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/bjoqstLwlkt4YgI3fPnc.png", alt="Opened window frame details", width="800", height="419" %}

Chromium issue: [1107766][27]

### Security and isolation information (COEP / COOP) {: #security-frame-details }

DevTools now display secure context, [Cross-Origin-Embedder-Policy (COEP) and
Cross-Origin-Opener-Policy (COOP)][28] in the frame details.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/dKR9CacOdSXMaSnQMCoN.png", alt="Security and isolation information", width="800", height="499" %}

More security information will be added to the frame details view soon.

Chromium issue: [1051466][29]

## Elements and Network panel updates {: #elements-network }

### Accessible color suggestion in the Styles pane {: #accessible-color }

DevTools now provides color suggestions for low color contrast text.

In the example below, `h1` has low contrast text. To fix it, open the color picker of the `color`
property in the Styles pane. After you expand the **Contrast ratio** section, DevTools provides AA
and AAA color suggestions. Click on the suggested color to apply the color.

{% Video src="video/BrQidfK9jaQyIHwdw91aVpkPiib2/WOjpk44xMhCtDUpZksQf.mp4" %}

Chromium issue: [1093227][30]

### Reinstate **Properties** pane in the Elements panel {: #properties }

The Properties pane is back, it was [deprecated in Chrome 84][31]. In a future version of DevTools,
we are going to improve the workflow for inspecting properties of elements.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/pH2dORbQtsgbIPLjPdki.png", alt="Properties pane in the Elements panel", width="800", height="448" %}

Chromium issue: [1105205][32], [1116085][33]

### Human-readable `X-Client-Data` header values in the Network panel {: #x-client-data }

When inspecting a network resource in the Network panel, DevTools now formats any `X-Client-Data`
header values in Headers pane as code.

The `X-Client-Data` HTTP header contains a list of experiment IDs and Chrome flags that are enabled
in your browser. The raw header values look like opaque strings since they are base-64-encoded,
serialized [protocol buffers][34]. To make the contents more transparent to developers, DevTools is
now showing the decoded values.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1UGV59FZody02UIJYY9z.png", alt="Human-readable `X-Client-Data` header values", width="800", height="454" %}

Chromium issue: [1103854][35]

### Auto-complete custom fonts in the Styles pane {: #auto-complete-custom-fonts }

Imported font faces are now added to the list of CSS auto-completion when editing the `font-family`
property in the **Styles** pane.

In this example, `'Noto Sans'` is a custom font installed in the local machine. It is displayed in
the CSS completion list. Previously, it was not.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/vGxVqEkbmjCzdrohbrf6.png", alt="Auto-complete custom fonts", width="800", height="440" %}

Chromium issue: [1106221][36]

### Consistently display resource type in Network panel {: #redirect-resource-type }

DevTools now consistently displays the same resource type as the original network request and
appends `/ Redirect` to the **Type** column value when redirection (status 302) happens.

Previously DevTools changed the type to `Other` sometimes.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/PZKRaTCgqsKPIH1Wq4LQ.png", alt="Display redirect resource type", width="800", height="487" %}

Chromium issue: [997694][37]

### Clear buttons in the Elements and Network panels {: #clear-input-button }

The filter text boxes in the **Styles** pane and **Network** panel, as well as the DOM search text
box in the **Elements** panel, now have **Clear** buttons. Clicking **Clear** removes any text that
you have input.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/BKLSpd4HoW62Ql8PbqEp.png", alt="Clear buttons in the Elements and Network panels", width="800", height="454" %}

Chromium issue: [1067184][38]

[1]:
  https://google.qualtrics.com/jfe/form/SV_3NMIMtX0F2zkakR?reserved=1&utm_source=Website%20feature&Q_Language=en&utm_medium=own_web&utm_campaign=Q4&productTag=chrm&campaignDate=November2020&referral_code=UXbl384838
[2]: /docs/devtools/media-panel
[3]: https://crbug.com/1018414
[4]: https://crbug.com/1100253
[5]: https://crbug.com/1096481
[6]: https://crbug.com/1068116
[7]: https://crbug.com/1080589
[8]: /docs/devtools/evaluate-performance/reference#rendering
[9]: https://crbug.com/384968
[10]: https://web.dev/idle-detection
[11]: /docs/devtools/customize#drawer
[12]: https://crbug.com/1090802
[13]: chrome://flags/#enable-experimental-web-platform-features
[14]: https://drafts.csswg.org/mediaqueries-5/#descdef-media-prefers-reduced-data
[15]: https://crbug.com/1096068
[16]: https://v8.dev/features/logical-assignment
[17]: https://v8.dev/features/numeric-separators
[18]: https://crbug.com/1086817
[19]: https://crbug.com/1080569
[20]: https://github.com/GoogleChrome/lighthouse/releases/tag/v6.2.0
[21]: https://web.dev/non-composited-animations/
[22]: https://crbug.com/772558
[23]: https://crbug.com/807440
[24]: /docs/devtools/coverage
[25]: https://crbug.com/1090802
[26]: https://crbug.com/1093247
[27]: https://crbug.com/1107766
[28]: https://web.dev/coop-coep/
[29]: https://crbug.com/1051466
[30]: https://crbug.com/1093227
[31]: /blog/new-in-devtools-84#properties
[32]: https://crbug.com/1105205
[33]: https://crbug.com/1116085
[34]: /protocol-buffers
[35]: https://crbug.com/1103854
[36]: https://crbug.com/1106221
[37]: https://crbug.com/997694
[38]: https://crbug.com/1067184
