---
layout: "layouts/doc-post.njk"
title: "Find And Fix Problems With The Chrome DevTools Issues Tab"
authors:
  - samdutton
date: 2020-05-14
updated: 2020-07-10
description: "Use the Issues Tab to find and fix problems with your website."
---

The **Issues** tab in Chrome DevTools reduces the notification fatigue and clutter of the Console.
Use it to find solutions to problems detected by the browser, such as cookie issues and mixed
content.

!!!.aside.aside--note

In Chrome 84, the Issues tab supports three types of issue:

- [Cookie problems][1]
- [Mixed content][2]
- [COEP issues][3]

Future versions of Chrome will support more issue types.

!!!

## Open the Issues tab {: #open }

1.  Visit a page with issues to fix, such as [samesite-sandbox.glitch.me][4].
2.  [Open DevTools][5].
3.  Click the **Go to Issues** button in the yellow warning bar.

    ![Chrome DevTools screenshot showing yellow warning bar for Issues 
    detected.](/web/tools/chrome-devtools/issues/images/issues-detected.png)

    Alternatively, select **Issues** from the **More tools** menu.

    ![Chrome DevTools screenshot showing Issues tab in More tools menu.](/web/tools/chrome-devtools/issues/images/more-tools-menu.png)

4.  Once you're on the Issues tab, click the **Reload page** button if necessary.

    ![Chrome DevTools screenshot showing Issues tab with 'Reload page' button.](/web/tools/chrome-devtools/issues/images/issues-tab-before-reload.png)

    You'll notice that issues reported in the Console (such as the cookie warnings here) are quite
    hard to understand. It's not clear what needs to be done to fix the issues reported.

    ![Chrome DevTools screenshot showing Issues tab with two 
       cookie issues.](/web/tools/chrome-devtools/issues/images/issues-tab-after-reload.png)

## View items in the Issues tab {: #view-issues }

The **Issues** tab presents warnings from the browser in a structured, aggregated, and actionable
way.

1.  Click an item in the **Issues** tab to get guidance on how to fix the issue and find affected
    resources.

    ![Chrome DevTools screenshot showing a cookie issue open in the Issues tab.](/web/tools/chrome-devtools/issues/images/issues-tab-issue-open.png)

    Each item has four components:

    - A headline describing the issue.
    - A description providing the context and the solution.
    - An **AFFECTED RESOURCES** section that links to resources within the appropriate DevTools
      context, such as the Network panel.
    - Links to further guidance.

2.  Click on **AFFECTED RESOURCES** items to view details. In this example, there is one cookie and
    one request affected.

    ![Chrome DevTools screenshot showing affected resources open in the Issues tab.](/web/tools/chrome-devtools/issues/images/issues-tab-affected-resources.png)

## View issues in context {: #issues-devtools }

1.  Click on a resource link to view the item in the appropriate context within DevTools. In this
    example, click `samesite-sandbox.glitch.me` to show the cookies attached to that request.

    ![Chrome DevTools screenshot showing affected resources open in the Issues tab.](/web/tools/chrome-devtools/issues/images/issues-tab-view-request.png)

2.  Scroll to view the item with a problem: in this case, the cookie `ck02`. Hover over the
    information icon on the right to see the problem and how to fix it.

    ![Chrome DevTools screenshot showing issue with a resource opened from the Issues tab.](/web/tools/chrome-devtools/issues/images/issues-tab-view-issue.png)

[1]: https://web.dev/samesite-cookies-explained
[2]: /web/fundamentals/security/prevent-mixed-content/what-is-mixed-content
[3]: https://web.dev/coop-coep/
[4]: https://samesite-sandbox.glitch.me/
[5]: /web/tools/chrome-devtools/open
