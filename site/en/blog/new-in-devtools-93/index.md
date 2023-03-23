---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 93)"
authors:
  - jecelynyeen
date: 2021-07-28
updated: 2021-07-28
description:
  "Editable CSS container queries, web bundle preview, better string handling in the Console and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xFq1Fb2KOrQfq1RG6x5e.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-93
---

{% Partial 'devtools/banner.md' %}

{% YouTube id="1VaPAnUGRz8" %}

## Editable CSS container queries in the Styles pane {: #container-queries }
You can now view and edit [CSS container queries](https://web.dev/new-responsive/#responsive-to-the-container) in the **Styles** pane.

Container queries provide a much more dynamic approach to responsive design. The `@container` at-rule works in a similar way to a media query with `@media`. However, instead of querying the viewport and user agent for information, `@container` queries the ancestor container that matches certain criteria.

In the **Elements** panel, click on a DOM element with `@container` at-rule, DevTools now displays the `@container` information in the **Styles** pane. Click on it to edit the size. The **Styles** pane displays the corresponding container information too. Hover on it to highlight the container element on the page and check the container size. Click on it to select the container element.

The container queries feature is experimental currently. Please turn on the `#enable-container-queries` flag under `chrome://flags` to test it.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3NzGBpukHQfUZUKUpUgf.png", alt="Editable CSS container queries in the Styles pane", width="800", height="554" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/46cdd9cd019f088e1134abe84dbc7d53ac60585a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a7e1eac63bee3728b41ae440f2ec250559e9c667 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef157dab2ccf321941548a51d350f9383a78d283 #}

Chromium issue: [1146422](https://crbug.com/1146422)


## Web bundle preview in the Network panel {: #web-bundle }
[Web bundle](https://web.dev/web-bundles/) is a file format for encapsulating one or more HTTP resources in a single file. You can now preview the web bundle content in the **Network** panel.

The web bundle feature is experimental currently. Please enable `#enable-experimental-web-platform-features` flag under `chrome://flags` to test it.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PEv1mNA14K18t5P3N6Yj.png", alt="web bundle preview", width="800", height="492" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e7672c40f2febc80786632c188b6029b2f2ac7b7 #}

Chromium issue: [1182537](https://crbug.com/1182537)


## Attribution Reporting API debugging {: #attribution-reporting }
Attribution Reporting API errors are now reported in the **Issues** tab.

[Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/) is a new API to help you measure when a user action (such as an ad click or view) leads to a conversion, without using cross-site identifiers.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bkEGVEv5kKc9M6qBUmLz.png", alt="Attribution Reporting API errors in the Issues tab", width="800", height="501" %}

Chromium issue: [1190735](https://crbug.com/1190735)


## Better string handling in the Console {: #string }
New context menu in the **Console** allows you to copy any string in as content, JavaScript literal or JSON literal.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/O5uMSgkHrQ2mQDSjmg3A.png", alt="New context menu in the Console", width="800", height="477" %}

In Chrome 90, DevTools updated the **Console** to always [format string outputs as valid JSON literals](/blog/new-in-devtools-90/#double-quotes). We received feedback from the developers that this change could be confusing, some feel that the amount of escaping is excessive and makes the output unreadable.

The **Console** now formats string outputs as valid JavaScript literals, and furthermore provides you 3 copy string options. The **Copy as JavaScript literal** option will escape appropriate special characters and wrap the string in either single quotes, double quotes, or backticks depending on the string content. The **Copy string contents** instead copies the raw string contents (including new lines and other special characters) verbatim to the clipboard. Finally, **Copy as JSON literal** formats the string as a valid JSON literal and copies it to the clipboard.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9242d13569e9fe67ac01e75d28fa2b6e6bf310d2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5715a7b9800532d8b28e2c9fa2d3c1e220ba54a8 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/29236e333a856ae5a952fe4182545b1e2bde5539 #}

Chromium issue: [1208389](https://crbug.com/1208389)


## Improved CORS debugging {: #cors }
CORS-related TypeErrors in the **Console** are now linked to the Network panel and Issues tab.

Click on the two new icons next to the CORS-related error message to view the network request, or understand the error message further and get potential solutions in the Issues tab.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VzoUggSoM0FnkDlIFPhq.png", alt="Icons next to the CORS-related error message", width="800", height="485" %}

Chromium issue: [1213393](https://crbug.com/1213393)


## Lighthouse 8.1 {: #lighthouse }
The **Lighthouse** panel is now running Lighthouse 8.1.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wENi9RXYMxdhm3zI4NVu.png", alt="Lighthouse", width="800", height="628" %}

If your site exposes source maps to Lighthouse, look for the **View Treemap** button to see a breakdown of your shipped JavaScript, filterable by size and coverage on load.

The report also includes a new metric filter (Refer to the **Show audits relevant to** filter in the screenshot). Pick a metric to focus on the opportunities and diagnostics most relevant to improving just that metric.

The **Performance Category** had a number of scoring changes to align with other performance tools and to better reflect the state of the web.

Check out the [release notes](https://github.com/GoogleChrome/lighthouse/releases) for a full list of changes.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/62b16561e433f4aa1645826923222699ac4bad38 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/16d96a25f24c934ef4dcbbc7b827015abdd228a1 #}

Chromium issue: [772558](https://crbug.com/772558)


## Display new note URL in the Manifest pane {: #new-note-url }
The Manifest pane now displays the the [new note URL](https://wicg.github.io/manifest-incubations/index.html#dfn-note_taking).

Currently on ChromeOS (CrOS), Chrome Apps and Android Apps that declare a "new-note" capability may be selected as a note-taking app in the Stylus settings (shows up if the CrOS device has been used with a stylus). When selected as a note-taking app, the app can be launched from the stylus palette's "Create Note" button. Adding `new-note-url` field in the application manifest is part of the effort to add equivalent functionality to web apps.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2Cwggroar7pNesfAQi4K.png", alt="New note URL in the Manifest pane", width="800", height="477" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/51f8aaf568db256f3390c37393d294c82017565e #}

Chromium issue: [1185678](https://crbug.com/1185678)


## Fixed CSS matching selectors {: #matching-selectors }
DevTools fixed the CSS matching selectors, it was not working in the last release.

The comma separated selectors in the **Styles** pane are colored differently depending on whether they match the selected DOM node:

- An unmatched portion is shown in a light grey.
- A matching selector portion is shown in black.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/O7CoHBrKA9cVKci1SM0M.png", alt="CSS matching selectors", width="800", height="477" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/123eac3c8ceeb2e788aa4756d3104db0265f9ad3 #}

Chromium issue: [1219153](https://crbug.com/1219153)


## Pretty-printing JSON responses in the Network panel {: #pretty-print-json }
You can now pretty print JSON responses in the **Network** panel.

Open a JSON response in the **Network** panel, click on the `{}` icon to pretty-print it.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/x2NKXwJPzjycjeD7cLH6.png", alt=" Pretty-printing JSON responses in the Network panel", width="800", height="523" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/250c88b4d02da283cd0a96204b1592f59fda2fcb #}

Chromium bug: [998674](https://crbug.com/998674)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}