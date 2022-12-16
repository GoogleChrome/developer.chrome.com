---
layout: "layouts/doc-post.njk"
title: "Issues: Find and fix problems"
authors:
  - samdutton
  - sofiayem
date: 2020-05-14
updated: 2022-10-18
description: "Use the Issues Tab to find and fix problems with your website."
tags:
  - find-issues
---

The **Issues** tab in Chrome DevTools reduces the notification fatigue and clutter of the **Console**.
Use it to find solutions to problems detected by the browser, such as cookie issues and mixed
content.

{% YouTube id='1TbkSxQb4bI' %}

{% Aside %}

Starting from Chrome 92, the **Issues** tab supports the following types of issues:

- [Cookie problems][1]
- [Mixed content][2]
- [COEP issues][3]
- [CORS errors][6]
- [Quirks mode issues][7]
- (Preview) [Low-contrast issues][8]
- [Trusted Web Activity issues][9]

Future versions of Chrome will support more issue types.

{% endAside %}

## Open the Issues tab {: #open }

1.  Visit a page with issues to fix, such as [samesite-sandbox.glitch.me][4].
1.  [Open DevTools][5].
1.  Click the **Open Issues** button next to {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** in the right corner of the action bar at the top. Depending on issue severity, the button can have a red {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/OBuCXn9tp80NwQhjgW1A.png", alt="Error.", width="20", height="20" %}, yellow {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/p5xfRZVMMOJdRLcntKn4.png", alt="Warning.", width="20", height="20" %}, or blue {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Qv8hM734naJTUchdUN1P.png", alt="Information.", width="20", height="20" %} icon.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/LNXwL7mNrQJ6vrWxE7EO.png", alt="The Open Issues button with a red icon.", width="800", height="514" %}

    Alternatively, select **Issues** from the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="More tools menu.", width="24", height="24" %} **More tools** menu.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/PPFYdVjZGxOWUliKyewL.png", alt="The Issues tab in More tools menu.", width="800", height="514" %}

1.  Once you're on the **Issues** tab, you might want to reload the page to catch even more issues, this time occurring during page load.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/flsQZhbMxK2nCosFjvPC.png", alt="The Issues tab with one more issues found after reloading the page.", width="800", height="443" %}

The **Console** might also show you [issues reported by the browser](/docs/devtools/console/log/#browser). However, you'll notice that such issues (like the cookie warning in the screenshot below) are hard to understand. It's not clear what you need to do to fix it.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VIYVuoLscTkbIZ8Nko7o.png", alt="The Console with an obscure cookie warning.", width="800", height="443" %}

On the other hand, the **Issues** tab provides you with actionable insights.

## View items in the Issues tab {: #view-issues }

The **Issues** tab presents warnings from the browser in a structured, aggregated, and actionable
way.

1.  Click an item in the **Issues** tab to expand the issue and get guidance on how to fix it and find affected resources.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/3J588AXoubJbr2llFYmc.png", alt="The Issues tab with a cross-site cookie issue expanded.", width="800", height="747" %}

    Each item has four components:

    - A headline describing the issue.
    - A description providing the context and the solution.
    - An **AFFECTED RESOURCES** section that links to resources within the appropriate DevTools
      context, such as the **Network**, **Sources**, **Elements**, and other panels.
    - Links to further guidance.

1.  Click on the items in **AFFECTED RESOURCES** to [view issues in context](#issues-devtools).

### Group issues by kind {: #group-by-kind }

{% Aside %}
**Note**: This is a preview feature disabled by default. To enable it, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings** > **Experiments** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Allow grouping and hiding of issues by issue kind**.
{% endAside %}

The **Issues** tab counts the number of affected resources for each issue and shows it next to their headlines. Additionally, you can organize the issues by their severity in three group kinds:

- {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/OBuCXn9tp80NwQhjgW1A.png", alt="Error.", width="20", height="20" %} **Page Errors** that Chrome reports.
- {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/p5xfRZVMMOJdRLcntKn4.png", alt="Warning.", width="20", height="20" %} **Breaking Changes** such as deprecations.
- {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Qv8hM734naJTUchdUN1P.png", alt="Information.", width="20", height="20" %} **Improvements** that DevTools suggests.

To group issues, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Group by kind** in the action bar at the top of the **Issues** tab.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/OOGt5WUOjWFpfkdwA40J.png", alt="Issues grouped in three kinds: Page errors, Breaking changes, and Improvements.", width="800", height="543" %}

### Include third-party issues {: #include-third-party }

Third-party cookie issues are hidden by default.

To view such issues, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Include third-party cookie issues** in the action bar at the top of the **Issues** tab. You can find third-party cookie issues in the **AFFECTED RESOURCES** section missing a link.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hPAEUH4LTwDFyPoQoPQ0.png", alt="Third-party cookie without a linked resource in the Affected Resources section.", width="800", height="654" %}

### Hide issues {: #hide-issues }

To hide an issue, select **Hide issues like this** from the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Three-dot menu.", width="24", height="24" %} three-dot menu next to the issue.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/H8aKDRUmwCw6mqCUi7xD.png", alt="The Hide issues like this option in the three-dot menu next to an issue.", width="800", height="543" %}

To see the list of hidden issues, scroll down to the **Hidden issues** section and expand it.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/5DbdsJGfwLLMGdyjvFCb.png", alt="The Hidden issues section.", width="800", height="537" %}

To reveal all issues, click **Unhide all**. To reveal a specific issue, select **Unhide issues like this** from the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Three-dot menu.", width="24", height="24" %} three-dot menu next to the issue.

Additionally, with [grouping enabled](#group-by-kind), you can hide entire groups of issues using the same three-dot menu next to a group.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/6mgixqWs0Q45Wd6C8bo0.png", alt="The three-dot menu with an option to hide the Improvements group.", width="800", height="537" %}

## View issues in context {: #issues-devtools }

To investigate an issue:

1.  In the **AFFECTED RESOURCES** section, click on a resource link to view the item in the appropriate context within DevTools. In this
    example, click `samesite-sandbox.glitch.me` to show the cookies attached to that request. The link takes you to the **Network** panel.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/IMSsZiOfHVBumJ6JSGIr.png", alt="The Affected Resources section with a link to the affected request.", width="800", height="709" %}

1.  Scroll to view the item with a problem: in this case, the cookie `ck02`. Hover over the
    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2OyGRodvgk9neTIEAH4g.svg", alt="Information.", width="24", height="24" %} information icon on the right to see the problem and how to fix it.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Lsz9HyD4YSKs23rdGmMC.png", alt="The Network panel shows a tooltip when you hover over the information icon.", width="800", height="548" %}

[1]: https://web.dev/samesite-cookies-explained
[2]: https://web.dev/what-is-mixed-content/
[3]: https://web.dev/coop-coep/
[4]: https://samesite-sandbox.glitch.me/
[5]: /docs/devtools/open
[6]: https://developer.mozilla.org/docs/Web/HTTP/CORS/Errors
[7]: https://quirks.spec.whatwg.org/
[8]: /blog/new-in-devtools-90/#low-contrast
[9]: /docs/android/trusted-web-activity/
