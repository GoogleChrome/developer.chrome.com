---
layout: "layouts/doc-post.njk"
title: "What's New In DevTools (Chrome 72)"
authors:
  - kaycebasques
date: 2018-11-27
updated: 2018-12-03
description:
  "Visualize performance metrics, highlight text nodes, copy the JS path to a DOM node, and Audits
  panel updates."
---

!!!.aside.aside--note

**Note:** We'll publish the video version of this page in early February 2019.

!!!

New features and major changes coming to Chrome DevTools in Chrome 72 include:

- [Visualize performance metrics][1] in the Performance panel.
- [Highlight text nodes][2] in the DOM Tree.
- [Copy the JS path][3] to a DOM node from the DOM Tree.
- [Audits panel updates][4], including a new audit that detects JS libraries and new keywords for
  accessing the Audits panel from the Command Menu.

## Video version of these release notes {: #video }

{% youtube id="XVJxlEdB230" %}

## Visualize performance metrics {: #metrics }

After [recording a page load][5], DevTools now marks performance metrics like `DOMContentLoaded` and
[First Meaningful Paint][6] in the **Timings** section.

![First Meaningful Paint in the Timing section](/web/updates/images/2018/11/metrics.png)

**Figure 1**. First Meaningful Paint in the Timing section

## Highlight text nodes {: #highlight }

When you hover over a text node in the DOM Tree, DevTools now highlights that text node in the
viewport.

![Highlighting a text node](/web/updates/images/2018/11/text.png)

**Figure 2**. Highlighting a text node

## Copy JS path {: #copy }

Suppose you're writing an automation test that involves clicking a node (using Puppeteer's
[`page.click()`][7] function, perhaps) and you want to quickly get a reference to that DOM node. The
usual workflow is to go to the Elements panel, right-click the node in the DOM Tree, select
**Copy** > **Copy selector**, and then pass that CSS selector to `document.querySelector()`. But if
the node is in a [Shadow DOM][8] this approach doesn't work because the selector yields a path from
within the shadow tree.

To quickly get a reference to a DOM node, right-click the DOM node and select **Copy** > **Copy JS
path**. DevTools copies to your clipboard a `document.querySelector()` expression that points to the
node. As mentioned above, this is particularly helpful when working with Shadow DOM, but you can use
it for any DOM node.

![Copy JS path](/web/updates/images/2018/11/copyjs.png)

**Figure 3**. Copy JS path

DevTools copies an expression like the one below to your clipboard:

```
document.querySelector('#demo1').shadowRoot.querySelector('p:nth-child(2)')
```

## Audits panel updates {: #audits }

The Audits panel is now running [Lighthouse 3.2][9]. Version 3.2 includes a new audit called
**Detected JavaScript libraries**. This audit lists out what JS libraries Lighthouse has detected on
the page. You can find this audit in your report under **Best Practices** > **Passed audits**.

![Detected JavaScript libraries](/web/updates/images/2018/11/libs.png)

**Figure 4**. Detected JavaScript libraries

Also, you can now access the Audits panel from the Command Menu by typing `Lighthouse` or `PWA`.

![Typing 'lighthouse' into the Command Menu](/web/updates/images/2018/11/lighthouse.png)

**Figure 5**. Typing `lighthouse` into the Command Menu

[1]: #metrics
[2]: #highlight
[3]: #copy
[4]: #audits
[5]: /web/tools/chrome-devtools/speed/get-started
[6]:
  /web/fundamentals/performance/user-centric-performance-metrics#first_meaningful_paint_and_hero_element_timing
[7]: https://pptr.dev/#?product=Puppeteer&version=v1.9.0&show=api-pageclickselector-options
[8]: /web/fundamentals/web-components/shadowdom
[9]: https://github.com/GoogleChrome/lighthouse/releases/tag/v3.2.0
