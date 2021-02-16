---
layout: "layouts/doc-post.njk"
title: "What's New In DevTools (Chrome 74)"
authors:
  - kaycebasques
date: 2019-03-07
updated: 2019-03-07
description:
  "Highlight nodes affected by a CSS property, Lighthouse v4, WebSocket binary message viewer, and
  more."
---

Welcome back! Here's what's new.

## Video version of this page {: #video }

{% youtube id="I14fXc7sXdU" %}

## Highlight all nodes affected by CSS property {: #highlight }

Hover over a CSS property that affects a node's box model, such as `padding` or `margin`, to
highlight all nodes affected by that declaration.

![Hovering over a margin property highlights all nodes affected by that
            declaration](/web/updates/images/2019/03/highlight.png)

**Figure 1**. Hovering over a `margin` property highlights the margins of all nodes affected by that
declaration

## Lighthouse v4 in the Audits panel {: #lighthouse }

The new [Tap targets are not sized appropriately][1] audit checks that interactive elements like
buttons and links are appropriately large and spaced apart on mobile devices.

![The tap targets audit](/web/tools/lighthouse/audits/images/tap-targets.png)

**Figure 2**. The tap targets audit

The PWA category of a report now uses a badge scoring system.

![The new badge scoring system for the PWA category](/web/updates/images/2019/03/lighthouse1.png)

**Figure 3**. The new badge scoring system for the PWA category

!!!.aside.aside--note

**What's Lighthouse?** [Lighthouse][2] is the auditing engine that powers the Audits panel. It also
powers [web.dev/measure][3] and [PageSpeed Insights][4]. You can also run Lighthouse as a Node
module, a Chrome Extension, or from the command line. See [Run Lighthouse in Chrome DevTools][5] to
get started.

!!!

## WebSocket binary message viewer {: #binary }

To view the contents of a binary WebSocket message:

1.  Open the **Network** panel. See [Inspect Network Activity][6] to learn the basics of analyzing
    network activity.

    ![The Network panel](/web/updates/images/2019/03/binary1.png)

    **Figure 4**. The Network panel

2.  Click **WS** to filter out all resources that aren't WebSocket connections.

    ![After clicking WS only WebSockety connections are shown](/web/updates/images/2019/03/binary2.png)

    **Figure 5**. After clicking WS only WebSockety connections are shown

3.  Click the **Name** of a WebSocket connection to inspect it.

    ![Inspecting a WebSocket connection](/web/updates/images/2019/03/binary3.png)

    **Figure 6**. Inspecting a WebSocket connection

4.  Click the **Messages** tab.

    ![The Messages tab](/web/updates/images/2019/03/binary6.png)

    **Figure 7**. The Messages tab

5.  Click one of the **Binary Message** entries to inspect it.

    ![Inspecting a binary message](/web/updates/images/2019/03/binary4.png)

    **Figure 8**. Inspecting a binary message

Use the dropdown menu at the bottom of the viewer to convert the message into Base64 or UTF-8. Click
**Copy to clipboard**
![Copy to clipboard](/web/tools/chrome-devtools/images/shared/copy-to-clipboard.png) to copy the
binary message to your clipboard.

![Viewing a binary message as Base64](/web/updates/images/2019/03/binary5.png)

**Figure 9**. Viewing a binary message as Base64

## Capture area screenshot in the Command Menu {: #screenshot }

Area screenshots let you capture a screenshot of a portion of the viewport. This feature has been
around for a while, but the workflow for accessing it was quite hidden. Area screenshots are now
available from the Command Menu.

1.  Focus DevTools and then press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or
    <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the Command Menu.

    ![The Command Menu](/web/tools/chrome-devtools/images/shared/command-menu.png)

    **Figure 10**. The Command Menu

2.  Start typing `area`, select **Capture area screenshots**, then press <kbd>Enter</kbd>.
3.  Drag your mouse over the section of the viewport that you want to screenshot.

    ![Selecting the portion of viewport to screenshot](/web/updates/images/2019/03/screenshot1.png)

    **Figure 11**. Selecting the portion of viewport to screenshot

## Service worker filters in the Network panel {: #swfilters }

Type `is:service-worker-initiated` or `is:service-worker-intercepted` in the Network panel filter
text box to view requests that were caused (`initiated`) or potentially modified (`intercepted`) by
a service worker.

![Filtering by is:service-worker-initiated](/web/updates/images/2019/03/swfilters1.png)

**Figure 12**. Filtering by `is:service-worker-initiated`

![Filtering by is:service-worker-intercepted](/web/updates/images/2019/03/swfilters2.png)

**Figure 13**. Filtering by `is:service-worker-intercepted`

See [Filter resources][7] for more on filtering network logs.

## Performance panel updates {: #perf }

Performance recordings now mark up long tasks and First Paint.

Check out [Do less main thread work][8] for an example of using the Performance panel to analyze
page load performance.

## Long tasks in Performance recordings {: #longtasks }

Performance recordings now show long [tasks][9].

![Hovering over a long task in a Performance recording](/web/updates/images/2019/03/longtasks1.png)

**Figure 14**. Hovering over a long task in a Performance recording

## First Paint in the Timings section {: #FP }

The [Timings section][10] of a Performance recording now marks First Paint.

![First Paint in the Timings section](/web/updates/images/2019/03/fp.png)

**Figure 15**. First Paint in the Timings section

## New DOM tutorial {: #dom }

Check out [Get Started With Viewing And Changing The DOM][11] for a hands-on tour of DOM-related
features.

[1]: /web/tools/lighthouse/audits/tap-targets
[2]: /web/tools/lighthouse
[3]: https://web.dev/measure
[4]: /speed/pagespeed/insights
[5]: /web/tools/lighthouse#devtools
[6]: /web/tools/chrome-devtools/network
[7]: /web/tools/chrome-devtools/network#filter
[8]: /web/tools/chrome-devtools/speed/get-started#main
[9]: https://w3c.github.io/longtasks/#sec-terminology
[10]: /web/updates/2018/11/devtools#metrics
[11]: /web/tools/chrome-devtools/dom
