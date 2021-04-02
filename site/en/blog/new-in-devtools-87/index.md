---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 87)"
authors:
  - jecelynyeen
date: 2020-10-01
#updated: YYYY-MM-DD
description:
  "New CSS Grid debugging tools, Web Authn tab, moveable tools and Computed sidebar pane."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Eg1jG2rZWv9Mc4UOhwvs.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-87
---

{% Aside %}

Interested in helping improve DevTools? Sign up to participate in [Google User Research here][1].

{% endAside %}

{% YouTube id="bE3O6EhLjPc" %}

## New CSS Grid debugging tools {: #css-grid }

DevTools now has better support for CSS grid debugging!

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/eY07EGjmEvoS8stHYsB1.png", alt="CSS grid debugging", width="800", height="524" %}

When an HTML element on your page has `display: grid` or `display: inline-grid` applied to it, you
can see a `grid` badge next to it in the **Elements** panel. Click the badge to toggle the display
of a grid overlay on the page.

The new **Layout** pane has a **Grid** section offering you a number of options for viewing the
grids.

Check out the [documentation][2] to learn more.

Chromium issue: [1047356][3]

## New WebAuthn tab {: #webauthn }

You can now emulate authenticators and debug the [Web Authentication API][4] with the new [WebAuthn
tab][5].

Select **More options** > **More tools** > **WebAuthn** to open the WebAuthn tab.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/5FjbhXHqEKYflSyEhWon.png", alt="WebAuthn tab", width="800", height="512" %}

Prior to the new **WebAuthn** tab, there was no native WebAuthn debugging support on Chrome.
Developers needed physical authenticators to test their web application with Web Authentication API.

With the new **WebAuthn** tab, web developers can now emulate these authenticators, customize their
capabilities, and inspect their states, without the need of any physical authenticators. This makes
the debugging experience much easier.

Check out our [documentation][6] to learn more about the WebAuthn feature.

Chromium issue: [1034663][7]

## Move tools between top and bottom panel {: #moveable-tools }

DevTools now support moving tools in DevTools between the top and bottom panel. This way, you can
view any two tools at once.

For example, if you would like to view **Elements** and **Sources** panel at once, you can right
click on the **Sources** panel, and select **Move to bottom** to move it to the bottom.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/DQGr4zX238Doo49X41xz.png", alt="Move to bottom", width="800", height="524" %}

Similarly, you can move any bottom tab to the top by right clicking on a tab and select **Move to
top**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/gyWUnfer6FYewfNbjoXl.png", alt="Move to top", width="800", height="524" %}

Chromium issue: [1075732][8]

## Elements panel updates {: #elements-panel }

### View the Computed sidebar pane in the Styles pane {: #computed-sidebar-pane }

You can now toggle the **Computed sidebar** pane in the Styles pane.

The **Computed sidebar** pane in the **Styles** pane is collapsed by default. Click on the button to
toggle it.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/vvGnNg7t4aVqbjB6w3nl.png", alt="Computed sidebar pane", width="800", height="522" %}

Chromium issue: [1073899][9]

### Grouping CSS properties in the Computed pane {: #grouping-css-prop }

You can now group the CSS properties by categories in the **Computed** pane.

With this new grouping feature, it will be easier to navigate in the **Computed** pane (less
scrolling) and selectively focus on a set of related properties for CSS inspection.

On the **Elements** panel, select an element. Toggle the **Group** checkbox to group/ungroup the CSS
properties.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/JjL1F5FYRjTVnhudSJBC.png", alt="Grouping CSS properties", width="800", height="522" %}

Chromium issues: [1096230][10], [1084673][11], [1106251][12]

## Lighthouse 6.4 in the Lighthouse panel {: #lighthouse }

The **Lighthouse** panel is now running Lighthouse 6.4. Check out the [release notes][13] for a full
list of changes.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/SU7fhHwII5BDUNTPwMwh.png", alt="Lighthouse", width="800", height="524" %}

New audits in Lighthouse 6.4:

- **Preload fonts**. Validates if all fonts that use`font-display: optional` were preloaded.
- **Valid sourcemaps**. Audits if a page has valid sourcemaps for large, first-party JavaScript.
- **\[Experimental\] Large JavaScript library**. Large JavaScript libraries can lead to poor
  performance. This audit suggests cheaper alternatives to common, large JavaScript libraries like
  `moment.js`.

Chromium issue: [772558][14]

## `performance.mark()` events in the Timings section {: #perf-mark }

The [Timings section][15] of a Performance recording now marks `performance.mark()` events.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/viBrya85v25YsfDogDjk.png", alt="Performance.mark events", width="800", height="521" %}

## New `resource-type` and `url` filters in the Network panel {: #network-filters }

Use the new `resource-type` and `url` keywords in the **Network panel** to filter network requests.

For example, use `resource-type:image` to focus on the network requests that are images.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/D3KPJsvmvwvR3wauVpQl.png", alt="resource-type filter", width="800", height="522" %}

Check out [filter requests by properties][16] to discover more special keywords like `resource-type`
and `url`.

Chromium issues: [1121141][17], [1104188][18]

## Frame details view updates {: #frame-details }

### Display COEP and COOP `reporting to` endpoint {: #reporting-to }

You can now view the Cross-Origin Embedder Policy (COEP) and Cross-Origin Opener Policy
(COOP)`reporting to` endpoint under the **Security & Isolation** section.

The [Reporting API][19] defines a new HTTP header, `Report-To`, that gives web developers a way to
specify server endpoints for the browser to send warnings and errors to.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ouxjUfRZuORirRiXs7PL.png", alt="reporting to endpoint", width="800", height="524" %}

Read this [article][20] to learn more about how to enable COEP and COOP and make your website
"cross-origin isolated".

Chromium issue: [1051466][21]

### Display COEP and COOP `report-only` mode {: #report-only }

DevTools now displays `report-only` label for COEP and COOP that are set to `report-only` mode.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/q0t3pw0ALUIBUx0K63bK.png", alt="report-only label", width="800", height="524" %}

Watch this [video][22] to learn about how to prevent information leaks and enable COOP and COEP in
your website.

Chromium issue: [1051466][23]

## Deprecation of `Settings` in the More tools menu {: #deprecate-settings }

The `Settings` in the More tools menu has been deprecated. Open the **Settings** from the main panel
instead.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/PSirLdDNbFF4WD21jS5Y.png", alt="Settings in the main panel", width="800", height="522" %}

Chromium issue: [1121312][24]

## Experimental features {: #experimental }

{% Aside "caution" %}

Caution: Experimental features are still under development and subject to change.

{% endAside %}

### View and fix color contrast issues in the CSS Overview panel {: #css-overview }

{% Aside %}

To enable this experiment, check the **CSS Overview** checkbox under **Settings** > **Experiments**.

{% endAside %}

**CSS Overview** panel now displays a list of low color contrast texts of your page.

In this example, the [demo page][25] has a low color contrast issue. Click on the issue, you can
view a list of elements that have the issue.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/nPm8RBrXiJdotyN9uptQ.png", alt="Low color contrast issues", width="800", height="521" %}

Click on an element in the list to open the element in **Elements** panel. DevTools [provides auto
color suggestion][26] to help you fix the low contrast text.

Chromium issue: [1120316][27]

### Customize keyboard shortcuts in DevTools {: #customize }

{% Aside %}

To enable this experiment, check the **Enable keyboard shortcut editor** checkbox under
**Settings** > **Experiments**.

{% endAside %}

You can now customize the keyboard shortcuts for your favourite commands in DevTools.

Go to **Settings** > **Shortcuts**, hovering on a command and click the **Edit** button (pen icon)
to customize the keyboard shortcut.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/FDXOHeck0BGR4FrPR2pk.png", alt="Customize keyboard shortcuts", width="800", height="522" %}

To reset all shortcuts, click on **Restore default shortcuts**.

Chromium issue: [174309][28]

[1]:
  https://google.qualtrics.com/jfe/form/SV_3NMIMtX0F2zkakR?reserved=1&utm_source=Website%20feature&Q_Language=en&utm_medium=own_web&utm_campaign=Q4&productTag=chrm&campaignDate=November2020&referral_code=UXbl384838
[2]: /docs/devtools/css/grid
[3]: https://crbug.com/1047356
[4]: https://w3c.github.io/webauthn/
[5]: /docs/devtools/webauthn
[6]: /docs/devtools/webauthn
[7]: https://crbug.com/1034663
[8]: https://crbug.com/1075732
[9]: https://crbug.com/1073899
[10]: https://crbug.com/1096230
[11]: https://crbug.com/1084673
[12]: https://crbug.com/1106251
[13]: https://github.com/GoogleChrome/lighthouse/releases
[14]: https://crbug.com/772558
[15]: /blog/new-in-devtools-72#metrics
[16]: /docs/devtools/network/reference#filter-by-property
[17]: https://crbug.com/1121141
[18]: https://crbug.com/1104188
[19]: https://developers.google.com/web/updates/2018/09/reportingapi
[20]: https://web.dev/coop-coep/
[21]: https://crbug.com/1051466
[22]: https://youtu.be/XLNJYhjA-0c
[23]: https://crbug.com/1051466
[24]: https://crbug.com/1121312
[25]: https://jec.fyi/demo/accessible-color-multi
[26]: /blog/new-in-devtools-86#accessible-color
[27]: https://crbug.com/1120316
[28]: https://crbug.com/174309
