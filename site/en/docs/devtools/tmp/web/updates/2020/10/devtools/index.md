---
layout: "layouts/doc-post.njk"
title: "What's New In DevTools (Chrome 87)"
authors:
  - jecelynyeen
date: 2020-10-01
updated: 2021-01-19
description:
  "New CSS Grid debugging tools, Web Authn tab, moveable tools and Computed sidebar pane."
---

!!!.aside.aside--note

Interested in helping improve DevTools? Sign up to participate in [Google User Research here][1].

!!!

{% youtube id="bE3O6EhLjPc" %}

## New CSS Grid debugging tools {: #css-grid }

DevTools now has better support for CSS grid debugging!

![CSS grid debugging](/web/updates/images/2020/10/devtools/01-css-grid.png)

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

![WebAuthn tab](/web/updates/images/2020/10/devtools/02-webauthn.png)

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

![Move to bottom](/web/updates/images/2020/10/devtools/03-move-to-bottom.png)

Similarly, you can move any bottom tab to the top by right clicking on a tab and select **Move to
top**.

![Move to top](/web/updates/images/2020/10/devtools/04-move-to-top.png)

Chromium issue: [1075732][8]

## Elements panel updates {: #elements-panel }

### View the Computed sidebar pane in the Styles pane {: #computed-sidebar-pane }

You can now toggle the **Computed sidebar** pane in the Styles pane.

The **Computed sidebar** pane in the **Styles** pane is collapsed by default. Click on the button to
toggle it.

![Computed sidebar pane](/web/updates/images/2020/10/devtools/05-computed-sidebar-pane.png)

Chromium issue: [1073899][9]

### Grouping CSS properties in the Computed pane {: #grouping-css-prop }

You can now group the CSS properties by categories in the **Computed** pane.

With this new grouping feature, it will be easier to navigate in the **Computed** pane (less
scrolling) and selectively focus on a set of related properties for CSS inspection.

On the **Elements** panel, select an element. Toggle the **Group** checkbox to group/ungroup the CSS
properties.

![Grouping CSS properties](/web/updates/images/2020/10/devtools/06-grouping-css-prop.png)

Chromium issues: [1096230][10], [1084673][11], [1106251][12]

## Lighthouse 6.4 in the Lighthouse panel {: #lighthouse }

The **Lighthouse** panel is now running Lighthouse 6.4. Check out the [release notes][13] for a full
list of changes.

![Lighthouse](/web/updates/images/2020/10/devtools/07-lighthouse.png)

New audits in Lighthouse 6.4:

- **Preload fonts**. Validates if all fonts that use`font-display: optional` were preloaded.
- **Valid sourcemaps**. Audits if a page has valid sourcemaps for large, first-party JavaScript.
- **\[Experimental\] Large JavaScript library**. Large JavaScript libraries can lead to poor
  performance. This audit suggests cheaper alternatives to common, large JavaScript libraries like
  `moment.js`.

Chromium issue: [772558][14]

## `performance.mark()` events in the Timings section {: #perf-mark }

The [Timings section][15] of a Performance recording now marks `performance.mark()` events.

![Performance.mark events](/web/updates/images/2020/10/devtools/08-perf-mark.png)

## New `resource-type` and `url` filters in the Network panel {: #network-filters }

Use the new `resource-type` and `url` keywords in the **Network panel** to filter network requests.

For example, use `resource-type:image` to focus on the network requests that are images.

![resource-type filter](/web/updates/images/2020/10/devtools/09-filter.png)

Check out [filter requests by properties][16] to discover more special keywords like `resource-type`
and `url`.

Chromium issues: [1121141][17], [1104188][18]

## Frame details view updates {: #frame-details }

### Display COEP and COOP `reporting to` endpoint {: #reporting-to }

You can now view the Cross-Origin Embedder Policy (COEP) and Cross-Origin Opener Policy
(COOP)`reporting to` endpoint under the **Security & Isolation** section.

The [Reporting API][19] defines a new HTTP header, `Report-To`, that gives web developers a way to
specify server endpoints for the browser to send warnings and errors to.

![reporting to endpoint](/web/updates/images/2020/10/devtools/10-reporting-endpoint.png)

Read this [article][20] to learn more about how to enable COEP and COOP and make your website
"cross-origin isolated".

Chromium issue: [1051466][21]

### Display COEP and COOP `report-only` mode {: #report-only }

DevTools now displays `report-only` label for COEP and COOP that are set to `report-only` mode.

![report-only label](/web/updates/images/2020/10/devtools/11-report-only.png)

Watch this [video][22] to learn about how to prevent information leaks and enable COOP and COEP in
your website.

Chromium issue: [1051466][23]

## Deprecation of `Settings` in the More tools menu {: #deprecate-settings }

The `Settings` in the More tools menu has been deprecated. Open the **Settings** from the main panel
instead.

![Settings in the main panel](/web/updates/images/2020/10/devtools/12-settings.png)

Chromium issue: [1121312][24]

## Experimental features {: #experimental }

!!!.aside.aside--caution

Caution: Experimental features are still under development and subject to change.

!!!

### View and fix color contrast issues in the CSS Overview panel {: #css-overview }

!!!.aside.aside--note

To enable this experiment, check the **CSS Overview** checkbox under **Settings** > **Experiments**.

!!!

**CSS Overview** panel now displays a list of low color contrast texts of your page.

In this example, the [demo page][25] has a low color contrast issue. Click on the issue, you can
view a list of elements that have the issue.

![Low color contrast issues](/web/updates/images/2020/10/devtools/13-css-overview.png)

Click on an element in the list to open the element in **Elements** panel. DevTools [provides auto
color suggestion][26] to help you fix the low contrast text.

Chromium issue: [1120316][27]

### Customize keyboard shortcuts in DevTools {: #customize }

!!!.aside.aside--note

To enable this experiment, check the **Enable keyboard shortcut editor** checkbox under
**Settings** > **Experiments**.

!!!

You can now customize the keyboard shortcuts for your favourite commands in DevTools.

Go to **Settings** > **Shortcuts**, hovering on a command and click the **Edit** button (pen icon)
to customize the keyboard shortcut.

![Customize keyboard shortcuts](/web/updates/images/2020/10/devtools/14-keyboard-shortcut.png)

To reset all shortcuts, click on **Restore default shortcuts**.

Chromium issue: [174309][28]

[1]:
  https://google.qualtrics.com/jfe/form/SV_3NMIMtX0F2zkakR?reserved=1&utm_source=Website%20feature&Q_Language=en&utm_medium=own_web&utm_campaign=Q4&productTag=chrm&campaignDate=November2020&referral_code=UXbl384838
[2]: /web/tools/chrome-devtools/css/grid
[3]: https://crbug.com/1047356
[4]: https://w3c.github.io/webauthn/
[5]: /web/tools/chrome-devtools/webauthn
[6]: /web/tools/chrome-devtools/webauthn
[7]: https://crbug.com/1034663
[8]: https://crbug.com/1075732
[9]: https://crbug.com/1073899
[10]: https://crbug.com/1096230
[11]: https://crbug.com/1084673
[12]: https://crbug.com/1106251
[13]: https://github.com/GoogleChrome/lighthouse/releases
[14]: https://crbug.com/772558
[15]: /web/updates/2018/11/devtools#metrics
[16]: /web/tools/chrome-devtools/network/reference#filter-by-property
[17]: https://crbug.com/1121141
[18]: https://crbug.com/1104188
[19]: /web/updates/2018/09/reportingapi
[20]: https://web.dev/coop-coep/
[21]: https://crbug.com/1051466
[22]: https://youtu.be/XLNJYhjA-0c
[23]: https://crbug.com/1051466
[24]: https://crbug.com/1121312
[25]: https://jec.fyi/demo/accessible-color-multi
[26]: /web/updates/2020/08/devtools#accessible-color
[27]: https://crbug.com/1120316
[28]: https://crbug.com/174309
