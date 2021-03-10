---
layout: "layouts/doc-post.njk"
title: "Find and fix problems with the Issues tab"
authors:
  - samdutton
date: 2020-05-14
#updated: YYYY-MM-DD
description: "Use the Issues Tab to find and fix problems with your website."
---

The **Issues** tab in Chrome DevTools reduces the notification fatigue and clutter of the Console.
Use it to find solutions to problems detected by the browser, such as cookie issues and mixed
content.

{% Aside %}

In Chrome 84, the Issues tab supports three types of issue:

- [Cookie problems][1]
- [Mixed content][2]
- [COEP issues][3]

Future versions of Chrome will support more issue types.

{% endAside %}

## Open the Issues tab {: #open }

1.  Visit a page with issues to fix, such as [samesite-sandbox.glitch.me][4].
2.  [Open DevTools][5].
3.  Click the **Go to Issues** button in the yellow warning bar.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/gCmzHUEJiNXOrvIB0fZg.png", alt="Chrome DevTools screenshot showing yellow warning bar for Issues detected.", width="800", height="350" %}

    Alternatively, select **Issues** from the **More tools** menu.

    {% Img src="image/admin/I1lYj0JQnddws06dscVU.png", alt="Chrome DevTools screenshot showing Issues tab in More tools menu.", width="800", height="350" %}

4.  Once you're on the Issues tab, click the **Reload page** button if necessary.

    {% Img src="image/admin/LeFSmbYEy8cjAmdqNYr9.png", alt="Chrome DevTools screenshot showing Issues tab with 'Reload page' button.", width="800", height="481" %}

    You'll notice that issues reported in the Console (such as the cookie warnings here) are quite
    hard to understand. It's not clear what needs to be done to fix the issues reported.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/TjbgfCTF4wLnhifvpiRc.png", alt="Chrome DevTools screenshot showing Issues tab with two cookie issues.", width="800", height="529" %}

## View items in the Issues tab {: #view-issues }

The **Issues** tab presents warnings from the browser in a structured, aggregated, and actionable
way.

1.  Click an item in the **Issues** tab to get guidance on how to fix the issue and find affected
    resources.

    {% Img src="image/admin/ohxdDJRkjvFGaFHO3i0R.png", alt="Chrome DevTools screenshot showing a cookie issue open in the Issues tab.", width="800", height="657" %}

    Each item has four components:

    - A headline describing the issue.
    - A description providing the context and the solution.
    - An **AFFECTED RESOURCES** section that links to resources within the appropriate DevTools
      context, such as the Network panel.
    - Links to further guidance.

2.  Click on **AFFECTED RESOURCES** items to view details. In this example, there is one cookie and
    one request affected.

    {% Img src="image/admin/6AwuuJhT2Uuxzc395J41.png", alt="Chrome DevTools screenshot showing affected resources open in the Issues tab.", width="800", height="657" %}

## View issues in context {: #issues-devtools }

1.  Click on a resource link to view the item in the appropriate context within DevTools. In this
    example, click `samesite-sandbox.glitch.me` to show the cookies attached to that request.

    {% Img src="image/admin/REHyxZ4gkbfzZgRCp3OG.png", alt="Chrome DevTools screenshot showing affected resources open in the Issues tab.", width="800", height="657" %}

2.  Scroll to view the item with a problem: in this case, the cookie `ck02`. Hover over the
    information icon on the right to see the problem and how to fix it.

    {% Img src="image/admin/CQlNNpB5ISFRD5lCYkKw.png", alt="Chrome DevTools screenshot showing issue with a resource opened from the Issues tab.", width="800", height="679" %}

[1]: https://web.dev/samesite-cookies-explained
[2]: https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content
[3]: https://web.dev/coop-coep/
[4]: https://samesite-sandbox.glitch.me/
[5]: /docs/devtools/open
