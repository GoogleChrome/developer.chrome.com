---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 74)"
authors:
  - kaycebasques
date: 2019-03-07
#updated: YYYY-MM-DD
description:
  "Highlight nodes affected by a CSS property, Lighthouse v4, WebSocket binary message viewer, and
  more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/i5guj1H6YCTNka6y0tub.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-74
---

Welcome back! Here's what's new.

## Video version of this page {: #video }

{% YouTube id="I14fXc7sXdU" %}

## Highlight all nodes affected by CSS property {: #highlight }

Hover over a CSS property that affects a node's box model, such as `padding` or `margin`, to
highlight all nodes affected by that declaration.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/lN0g4Mq7YE1dgfeMueMT.png", alt="Hovering over a margin property highlights all nodes affected by that declaration", width="800", height="557" %}

**Figure 1**. Hovering over a `margin` property highlights the margins of all nodes affected by that
declaration

## Lighthouse v4 in the Audits panel {: #lighthouse }

The new [Tap targets are not sized appropriately][1] audit checks that interactive elements like
buttons and links are appropriately large and spaced apart on mobile devices.

The PWA category of a report now uses a badge scoring system.

{% Img src="image/admin/CWKa8x2Fiyn1D5Az2Igg.png", alt="The new badge scoring system for the PWA category", width="800", height="495" %}

**Figure 3**. The new badge scoring system for the PWA category

{% Aside %}

**What's Lighthouse?** [Lighthouse][2] is the auditing engine that powers the Audits panel. It also
powers [web.dev/measure][3] and [PageSpeed Insights][4]. You can also run Lighthouse as a Node
module, a Chrome Extension, or from the command line. See [Run Lighthouse in Chrome DevTools][5] to
get started.

{% endAside %}

## WebSocket binary message viewer {: #binary }

To view the contents of a binary WebSocket message:

1.  Open the **Network** panel. See [Inspect Network Activity][6] to learn the basics of analyzing
    network activity.

    {% Img src="image/admin/ItvTp9UEpfriUqQ2Iiek.png", alt="The Network panel", width="800", height="488" %}

    **Figure 4**. The Network panel

2.  Click **WS** to filter out all resources that aren't WebSocket connections.

    {% Img src="image/admin/a7Cc8FzrUI4cKpql2HdG.png", alt="After clicking WS only WebSockety connections are shown", width="800", height="488" %}

    **Figure 5**. After clicking WS only WebSockety connections are shown

3.  Click the **Name** of a WebSocket connection to inspect it.

    {% Img src="image/admin/rQ3LpboH9hN1ftk1Zk2f.png", alt="Inspecting a WebSocket connection", width="800", height="548" %}

    **Figure 6**. Inspecting a WebSocket connection

4.  Click the **Messages** tab.

    {% Img src="image/admin/XwMXuCkT5MrV1iEXodAd.png", alt="The Messages tab", width="800", height="543" %}

    **Figure 7**. The Messages tab

5.  Click one of the **Binary Message** entries to inspect it.

    {% Img src="image/admin/WTOJHsZCu8q5GYPReSIC.png", alt="Inspecting a binary message", width="800", height="543" %}

    **Figure 8**. Inspecting a binary message

Use the dropdown menu at the bottom of the viewer to convert the message into Base64 or UTF-8. Click
**Copy to clipboard**
{% Img src="image/admin/gBH78tAXh6tCgg0aexWN.png", alt="Copy to clipboard", width="22", height="25" %} to copy the
binary message to your clipboard.

{% Img src="image/admin/VlsTdr4jWE1pkNbR9tYw.png", alt="Viewing a binary message as Base64", width="800", height="543" %}

**Figure 9**. Viewing a binary message as Base64

## Capture area screenshot in the Command Menu {: #screenshot }

Area screenshots let you capture a screenshot of a portion of the viewport. This feature has been
around for a while, but the workflow for accessing it was quite hidden. Area screenshots are now
available from the Command Menu.

1.  Focus DevTools and then press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or
    <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the Command Menu.

    {% Img src="image/admin/mPvCSc2zWKnCKJQUgdjM.png", alt="The Command Menu", width="800", height="632" %}

    **Figure 10**. The Command Menu

2.  Start typing `area`, select **Capture area screenshots**, then press <kbd>Enter</kbd>.
3.  Drag your mouse over the section of the viewport that you want to screenshot.

    {% Img src="image/admin/cHoN1cib7Eo1rv4hjby3.png", alt="Selecting the portion of viewport to screenshot", width="800", height="642" %}

    **Figure 11**. Selecting the portion of viewport to screenshot

## Service worker filters in the Network panel {: #swfilters }

Type `is:service-worker-initiated` or `is:service-worker-intercepted` in the Network panel filter
text box to view requests that were caused (`initiated`) or potentially modified (`intercepted`) by
a service worker.

{% Img src="image/admin/ZTE1UXxZ5nkSl5W2TNby.png", alt="Filtering by is:service-worker-initiated", width="800", height="467" %}

**Figure 12**. Filtering by `is:service-worker-initiated`

{% Img src="image/admin/lZ4MvirVdsd6VAtsr7sZ.png", alt="Filtering by is:service-worker-intercepted", width="800", height="467" %}

**Figure 13**. Filtering by `is:service-worker-intercepted`

See [Filter resources][7] for more on filtering network logs.

## Performance panel updates {: #perf }

Performance recordings now mark up long tasks and First Paint.

Check out [Do less main thread work][8] for an example of using the Performance panel to analyze
page load performance.

## Long tasks in Performance recordings {: #longtasks }

Performance recordings now show long [tasks][9].

{% Img src="image/admin/1d6YMcJfXMwnH1cAPW53.png", alt="Hovering over a long task in a Performance recording", width="800", height="605" %}

**Figure 14**. Hovering over a long task in a Performance recording

## First Paint in the Timings section {: #FP }

The [Timings section][10] of a Performance recording now marks First Paint.

{% Img src="image/admin/fyJuaDg84kGGyfvAmKxC.png", alt="First Paint in the Timings section", width="800", height="426" %}

**Figure 15**. First Paint in the Timings section

## New DOM tutorial {: #dom }

Check out [Get Started With Viewing And Changing The DOM][11] for a hands-on tour of DOM-related
features.

[1]: https://web.dev/tap-targets
[2]: https://developers.google.com/web/tools/lighthouse
[3]: https://web.dev/measure
[4]: https://developers.google.com/speed/pagespeed/insights
[5]: https://developers.google.com/web/tools/lighthouse#devtools
[6]: /docs/devtools/network
[7]: /docs/devtools/network#filter
[8]: /docs/devtools/speed/get-started#main
[9]: https://w3c.github.io/longtasks/#sec-terminology
[10]: /blog/new-in-devtools-72#metrics
[11]: /docs/devtools/dom
