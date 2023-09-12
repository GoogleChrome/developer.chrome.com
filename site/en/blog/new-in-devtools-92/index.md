---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 92)"
authors:
  - jecelynyeen
date: 2021-06-02
updated: 2021-06-02
description:
  "CSS grid editor, support for const redeclaration in console, source order viewer and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XtJztwxzQqOWhOHrKmhM.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-92
---

{% Partial 'devtools/banner.md' %}

{% YouTube id="2baY3JpCxpo" %}

## CSS grid editor {: #grid-editor }
A highly requested feature. You can now preview and author CSS Grid with the new CSS Grid editor!

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mV9Ac7QAD8vVPoiqmii6.png", alt="CSS Grid editor", width="800", height="486" %}

When an HTML element on your page has `display: grid` or `display: inline-grid` applied to it, you can see an icon appear next to it in the Styles pane. Click the icon to toggle the CSS grid editor. Here you can preview the potential changes with the on screen icons (e.g. `justify-content: space-around`) and author the grid appearance with just one click.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/dbd631539c7eeac02ea68a37096ce3bc7d9487d9 #}

Chromium issue: [1203241](https://crbug.com/1203241)


## Support for `const` redeclarations in the Console {: #const-redeclaration }
The Console now supports redeclaration of `const` statement, in addition to the existing [`let` and `class` redeclarations](/blog/new-in-devtools-80/#redeclarations). The inability to redeclare was a common annoyance for web developers who use the Console to experiment with new JavaScript code.

This allows developers to copy-paste code into the DevTools console to see how it works or experiment, make small changes to the code, and repeat the process without refreshing the page. Previously, DevTools threw a syntax error if the code redeclared a `const` binding.

Refer to the example below. `const` redeclaration is supported **across separate REPL scripts** (refer to variable `a`). Take note that the following scenarios are not supported by design:

- `const` redeclaration of page scripts is not allowed in REPL scripts
- `const` redeclaration within the same REPL script is not allowed (refer to variable `b`)

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/tJCPlokvxw6OWyCAmocM.png", alt="const redeclarations", width="800", height="496" %}

{# https://chromium.googlesource.com/v8/v8/+/0acdf36510e72d5dac5777d893e77716235b7c39 #}

Chromium issue: [1076427](https://crbug.com/1076427)


## Source order viewer {: #source-order }
You can now view the order of source elements on screen for better accessibility inspection.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2QoBtjGjFxgDAkKaO3y2.png", alt="Source order viewer", width="800", height="515" %}

The order of content in an HTML document is important for search engine optimization and accessibility. The newer CSS features allow developers to create content that looks very different in its on-screen order than what is in the HTML document. This is a big accessibility problem as screen reader users would get a different, most likely confusing experience than sighted users.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7f83e4b0190ed2dbc32feef6d8b0315279ad7d07 #}

Chromium issue: [1094406](https://crbug.com/1094406)

## New shortcut to view frame details {: #frame-details }
View iframe details by right-clicking on the iframe element in the Elements panel, and select **Show frame details**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/YdENg6wjsgPNyMODdOHC.png", alt="Show frame details", width="800", height="486" %}

This takes you to a view of the iframe's details in the Application panel where you can examine document details, security & isolation status, [permissions policy](/docs/privacy-sandbox/permissions-policy/), and more to debug potential issues.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hEsg9Mc95n7w2tPrv6KH.png", alt="Frame details view", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/30ba780ff36307473aee2e2c959287ea8d0b3bd7 #}

Chromium issue: [1192084](https://crbug.com/1192084)


## Enhanced CORS debugging support {: #cors }
Cross-origin resource sharing (CORS) errors are now surfaced in the Issues tab. There are various reasons causing CORS errors. Click to expand each issue to understand the potential causes and solutions.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/UpiZQCNnlENB8ZluzeFt.png", alt="CORS issues in the Issues tab", width="800", height="490" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2ca000670d62477dfb0a6a83e038b6caecc1e322 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2ad8fc07dbe879162b4cb65ca800a2c10e6a73fc #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bec4aa4eb52f9cf75077d165d2ceba12ebf5ab95 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/db2f1f97aa230de89ac5f80ec8e361f90d8efdd1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b9d0e036f6998109673be71a2dc76fb246c8de3b #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1531610a58453da982acaa1d445c0e8952dbf004 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/541a6b4f7d3627296484d1483ef85e1d10a835f1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6b3a0affa984c37720361127a21ff7a936a8b820 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9149c7abd583c45cf0df83bf445c5b0ae7fa65b9 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/80736dbaf8cb5f06215a5843f326a32ac7ca3a99 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0404498fbfe3e99ba69a4e99f09715baceecd99d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/eeb37658907bbc78b70f7712bb48f7a77d152663 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3aa8ba4983bd6cf65673c4c1908992e5ab81d6fc #}

Chromium issue: [1141824](https://crbug.com/1141824)


## Network panel updates {: #network }

### Rename XHR label to Fetch/XHR {: #fetch-xhr }
The XHR label is now renamed to **Fetch/XHR**. This change makes it clearer that this filter includes both [`XMLHttpRequest`](https://xhr.spec.whatwg.org/) and [Fetch API](https://fetch.spec.whatwg.org/) network requests.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/I0QOVTO52JRpl0jJO6Zt.png", alt="Fetch/XHR label", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/274ace4270fd5c3004c6b594e1b009c545318e0e #}

Chromium issue: [1201398](https://crbug.com/1201398)


### Filter Wasm resource type in the Network panel {: #wasm }
You can now click on the new **Wasm** button to filter the Wasm network requests.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vuTMcfCjDWFfVtDN6Dpf.png", alt="Filter by Wasm", width="800", height="515" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/db3b40161aeb0856d33e0e4545b2b5bd8e79fb86 #}

Chromium issue: [1103638](https://crbug.com/1103638)


### User-Agent Client Hints for devices in the Network conditions tab {: #sec-ua-ch }
[User-Agent Client Hints](https://web.dev/user-agent-client-hints) are now applied for devices in the **User agent** field under **Network conditions** tab.

User-Agent Client Hints are a new expansion to the Client Hints API, that enables developers to access information about a user's browser in a privacy-preserving and ergonomic way.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/iMlkTtV9OUdfujSWdHnR.png", alt="User-Agent Client Hints for devices in the Network conditions tab", width="800", height="532" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b2b0c3b6c6e093649c35b6824004284ca4c2bd4a #}

Chromium issue: [1174299](https://crbug.com/1174299)


## Report Quirks mode issues in the Issues tab {: #quirks-mode }

DevTools now reports [Quirks Mode](https://quirks.spec.whatwg.org/) and [Limited-quirks Mode](https://dom.spec.whatwg.org/#concept-document-limited-quirks) issues.

Quirks Mode and Limited-quirks Mode are legacy browser modes from before the web standards were made. These modes emulate pre-standard-era layout behaviors that often cause unexpected visual effects.

When debugging layout issues, developers might think they are caused by user-authored CSS or HTML bugs, while the real problem is the Compat Mode the page is in. DevTools provides suggestions for fixing it.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XqtqSZPa1S1YnmeIt0ee.png", alt="Report Quirks mode issues in the Issues tab", width="800", height="490" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/79d5f4274f21bb78e2ce572d118c2bd5bf1cfa82 #}

Chromium issue: [622660](https://crbug.com/622660)


## Include Compute Intersections in the Performance panel {: #computed-intersections }
DevTools now show the **Compute Intersections** in the flame chart. These changes help you to identify the [intersection observers](https://web.dev/intersectionobserver-v2/) events and debug on its potential performance overheads.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Nx3K0Lpst0lICGbtpzsW.png", alt="Compute Intersections in the Performance panel", width="800", height="496" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/03f91c46e7920e768eba5192b7f902e916b9cac3 #}

Chromium issue: [1199137](https://crbug.com/1199137)


## Lighthouse 7.5 in the Lighthouse panel {: #lighthouse }

The Lighthouse panel is now running Lighthouse 7.5. The "missing explicit width and height" warning is now removed for images with `aspect-ratio` defined in CSS. Previously, Lighthouse showed warnings for images without width and height defined.

Check out the [release notes](https://github.com/GoogleChrome/lighthouse/releases/tag/v7.5.0) for a full list of changes.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4cef9324af0e4560421beb138313458d5ae6fb0b #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d17898e62fe19b9f47b25f1568b57fce951c6d10 #}

Chromium issue: [772558](https://crbug.com/772558)


## Deprecated "Restart frame" context menu in the call stack {: #restart-frame }

The **Restart frame** option is now deprecated. This feature requires further development to work well, it is currently broken and often crashes.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Alvnt4FkoEFoP0SkdKgi.png", alt="Deprecated Restart frame context menu", width="800", height="486" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4494098b6840f608347c1edf3c048691056eada4 #}

Chromium issue: [1203606](https://crbug.com/1203606)


## [Experimental] Protocol monitor {: #protocol-monitor }

{% Aside %}

To enable the experiment, check the **Protocol Monitor** checkbox under **Settings** > **Experiments**.

{% endAside %}

Chrome DevTools uses the [Chrome DevTools Protocol (CDP)](https://chromedevtools.github.io/devtools-protocol/) to instrument, inspect, debug and profile Chrome browsers. The **Protocol monitor** provides you a way to view all the CDP requests and responses made by DevTools.

Two new functions added to facilitate the testing of CDP:

- The new **Save** button allows you to download the recorded messages as a JSON file
- A new field that allows you to send a raw CDP command directly

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mRVrHC9WEet7cwA7QAeV.png", alt="Protocol monitor", width="800", height="496" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/40fcb9a9aae81ac1df2c19dee467ab3a4cf4088b #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/006e20c4226a7b2e5fde4026191b1eaf05bf8b8e #}

Chromium issues: [1204004](https://crbug.com/1204004), [1204466](https://crbug.com/1204466)


## [Experimental] Puppeteer Recorder {: #puppeteer-recorder }

{% Aside %}

To enable the experiment, check the **Recorder** checkbox under **Settings** > **Experiments**.

{% endAside %}

The [Puppeteer recorder](/blog/new-in-devtools-89/#record) now generates a list of steps based on your interaction with the browser, whereas previously DevTools generated a Puppeteer script directly instead. A new **Export** button is added to allow you export the steps as a Puppeteer script.

After recording the steps, you can use the new **Replay** button to replay the steps. Follow the [instructions here](/blog/new-in-devtools-89/#record) to learn how to get started with recording.

Please note that this is an early-stage experiment. We plan to improve and expand the Recorder functionality over time.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/kh1Z4jcWxbO6rYCSoIPn.png", alt="Puppeteer Recorder", width="800", height="557" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b36b600405ef18131b89edf85cca816c955c1590 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a2ffe4a8d202e56d640c2f8744c905354e2bca8e #}

Chromium issue: [1199787](https://crbug.com/1199787)


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
