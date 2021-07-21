---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 78)"
authors:
  - kaycebasques
date: 2019-09-03
#updated: YYYY-MM-DD
description:
  "Lighthouse 5.2 in the Audits panel, and Largest Contentful Paint in the Performance panel."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/F9JYjkwY0iWr3tA3Y66T.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-78
---

{% YouTube id="VNkctDLYP6o" %}

## Multi-client support in the Audits panel {: #multiclient }

You can now use the **Audits** panel in combination with other DevTools features like [Request
Blocking][1] and [Local Overrides][2].

For example, suppose that your **Audits** panel report says that your page's performance score is 70
and one of your biggest performance opportunities is [eliminating render-blocking resources][3].

{% Img src="image/admin/o4iVZaYzQHnLmhY5mfvJ.png", alt="The initial Performance score is 70.", width="800", height="374" %}

Figure 1. The initial **Performance** score.

{% Img src="image/admin/wTxTsDf0ECKzHUGFKaIG.png", alt="The initial report says that 3 render-blocking scripts are an issue.", width="800", height="388" %}

Figure 2. The initial report says that 3 render-blocking scripts are an issue.

Now that the **Audits** panel can be used in combination with request blocking, you can quickly
measure how much the render-blocking scripts affect your load performance by first [blocking the
requests for the render-blocking scripts][4]:

{% Img src="image/admin/MfH1naJRKqJkvmbm96f7.png", alt="Using the Request Blocking tab to block the problematic scripts.", width="800", height="469" %}

Figure 3. Using the **Request Blocking** tab to block the problematic scripts.

And then auditing the page again:

{% Img src="image/admin/JQ8BQA9xwYKj7qViJq18.png", alt="The Performance score improved to 97 after enabling request blocking.", width="800", height="469" %}

Figure 4. The **Performance** score improved to 97 after blocking the problematic scripts.

You could alternatively use [Local Overrides][5] to add `async` attributes to each of the script
tags, but "we'll leave that as an exercise for the reader." Go to [Multi-client demo][6] to try it
out. Or check out [this tweet][7] for a video demonstration.

[Chromium issue #991906][8]

## Payment Handler debugging {: #payments }

The **Background Services** section of the **Application** panel now supports [Payment Handler][9]
events.

1.  Go the the **Application** panel.
2.  Open the **Payment Handler** pane.
3.  Click **Record**. DevTools records Payment Handler events for 3 days, even when DevTools is
    closed.

    {% Img src="image/admin/IHG8hmoGVoAmH0TXEuuD.png", alt="Recording Payment Handler events.", width="800", height="436" %}

    Figure 5. Recording Payment Handler events.

4.  Enable **Show events from other domains** if your Payment Handler events occur on a different
    origin.
5.  After triggering a Payment Handler event, click the event's row to learn more about the event.

    {% Img src="image/admin/HsrxAv97G0pyDdpCevCr.png", alt="Viewing a Payment Handler event.", width="800", height="366" %}

    Figure 6. Viewing a Payment Handler event.

[Chromium issue #980291][10]

## Lighthouse 5.2 in the Audits panel {: #audits }

{% Aside %}

**Note:** This actually launched in Chrome 77, but we missed it in the last release notes so we're
covering it now.

{% endAside %}

The **Audits** panel is now running [Lighthouse 5.2][11]. The new **Third-Party Usage** diagnostic
audit tells you how much third-party code was requested and how long that third-party code blocked
the main thread while the page loaded. See [Optimize your third-party resources][12] to learn more
about how third-party code can degrade load performance.

{% Img src="image/admin/pfc7cTFPWHSlhxFQnpJH.png", alt="A screenshot of the 'Third-Party Usage' audit in the Lighthouse report UI.", width="800", height="571" %}

Figure 7. The **Third-party usage** audit.

[Chromium issue #772558][13]

## Largest Contentful Paint in the Performance panel {: #LCP }

When [analyzing load performance in the **Performance** panel][14], the **Timings** section now
includes a marker for [Largest Contentful Paint][15] (LCP). LCP reports the render time of the
largest content element visible in the viewport.

{% Img src="image/admin/YZcYowM2zmEuRXogL8FX.png", alt="The LCP marker in the Timings section.", width="800", height="620" %}

Figure 8. The **LCP** marker in the **Timings** section.

To highlight the DOM node associated with LCP:

1.  Click the **LCP** marker in the **Timings** section.
2.  Hover over the **Related Node** in the **Summary** tab to highlight the node in the viewport.

    {% Img src="image/admin/T2Aa5RiWuVWQONplTOSx.png", alt="The Related Node section of the Summary tab.", width="800", height="620" %}

    Figure 9. The **Related Node** section of the **Summary** tab.

3.  Click the **Related Node** to select it in the [**DOM Tree**][16].

## File DevTools issues from the Main Menu {: #issues }

If you ever encounter a bug in DevTools and want to file an issue, or if you ever get an idea on how
to improve DevTools and want to request a new feature, go to **Main Menu** > **Help** > **Report a
DevTools issue** to create an issue in the DevTools engineering team's tracker. Providing a
[minimal, reproducible example][17] on [Glitch][18] dramatically increases the team's ability to fix
your bug or implement your feature request!

{% Img src="image/admin/GzHzYN4ayQXslwllhVxO.png", alt="Main Menu > Help > Report a DevTools issue.", width="800", height="604" %}

Figure 10. **Main Menu** > **Help** > **Report a DevTools issue**.

[1]: /blog/new-in-devtools-59#block-requests
[2]: /blog/new-in-devtools-65#overrides
[3]: https://web.dev/render-blocking-resources
[4]: /blog/new-in-devtools-59#block-requests
[5]: /blog/new-in-devtools-65#overrides
[6]: https://devtools.glitch.me/wndt78/multiclient.html
[7]: https://twitter.com/cjamcl/status/1167602064584671234
[8]: https://crbug.com/991906
[9]: https://developers.google.com/web/updates/2018/06/payment-handler-api
[10]: https://crbug.com/980291
[11]: https://github.com/GoogleChrome/lighthouse/releases/tag/v5.2.0
[12]: https://web.dev/fast#optimize-your-third-party-resources
[13]: https://crbug.com/772558
[14]: /docs/devtools/evaluate-performance/reference#record-load
[15]: https://web.dev/largest-contentful-paint
[16]: /docs/devtools/dom
[17]: https://stackoverflow.com/help/minimal-reproducible-example
[18]: https://glitch.com/
