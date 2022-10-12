---
layout: "layouts/doc-post.njk"
title: "Accessibility features reference"
authors:
  - kaycebasques
  - sofiayem
date: 2022-06-09
updated: 2022-10-12
description: "A comprehensive reference of accessibility features in Chrome DevTools."
tags:
  - accessibility
  - find-issues
---

This page is a comprehensive reference of accessibility features in Chrome DevTools. It is intended
for web developers who:

- Have a basic understanding of DevTools, such as how to open it.
- Are familiar with [accessibility principles and best practices][1].

The purpose of this reference is to help you discover all of the tools available in DevTools that
can help you examine a page's accessibility.

See [Navigating Chrome DevTools With Assistive Technology][2] if you're looking for help on
navigating DevTools with an assistive technology like a screen reader.

## Overview of accessibility features in Chrome DevTools {: #overview }

This section explains how DevTools fits into your overall accessibility toolkit.

When determining whether a page is accessible, you need to have 2 general questions in mind:

1.  Can I navigate the page with a keyboard or [screen reader][3]?
2.  Are the page's elements properly marked up for screen readers?

In general, DevTools can help you fix errors related to question #2, because these errors are easy
to detect in an automated fashion. Question #1 is just as important, but unfortunately DevTools
can't help you there. The only way to find errors related to question #1 is to try using a page with
a keyboard or screen reader yourself. See [How To Do An Accessibility Review][4] to learn more.

## Audit a page's accessibility {: #audits }

In general, use the accessibility checks under the **Lighthouse** panel to determine if:

- A page is properly marked up for screen readers.
- The text elements on a page have sufficient contrast ratios. See also [Make your website more readable][5].

To audit a page:

1.  Go to the URL that you want to audit.
2.  In DevTools, click the **Lighthouse** tab. DevTools shows you various configuration options.

    {% Img src="image/admin/2O9SByfzzLWTPQAcPlgN.png", alt="Configuring an accessibility scan in Lighthouse panel.", width="800", height="1053" %}

    {% Aside %}

    **Note**: The screenshots in this section were taken with Chrome 69. In the screenshots, the tab
    is still named **Audits** but it was [renamed into Lighthouse in Chrome 83](/blog/new-in-devtools-83/#lighthouse)
    You can check what version you're running at `chrome://version`. The **Audits** panel UI will look different in
    some earlier or later versions of Chrome, but the general workflow is the same.

    {% endAside %}

3.  For **Device**, select **Mobile** if you want to simulate a mobile device. This option changes
    differently your user agent string and resizes the viewport. If the mobile version of the page
    displays differently than the desktop version, this option could have a significant effect on
    the results of your audit.
4.  In the **Lighthouse** section, make sure that **Accessibility** is enabled. Disable the other
    categories if you want to exclude them from your report. Leave them enabled if you want to
    discover other ways to improve the quality of your page.
5.  The **Throttling** section lets you throttle the network and CPU, which is useful when analyzing
    load performance. This option should be irrelevant to your accessibility score, so you can use
    whatever you prefer.
6.  The **Clear Storage** checkbox lets you clear all storage before loading the page, or preserve
    storage between page loads. This option is also probably irrelevant to your accessibility score,
    so you can use whatever you prefer.
7.  Click **Generate Report**. After 10 to 30 seconds, DevTools provides a report. Your report gives you
    various tips on how to improve the page's accessibility.

    {% Img src="image/admin/62KIEtieXbeJl36cN0kQ.png", alt="A report.", width="800", height="983" %}

8.  Click an audit to learn more about it.

    {% Img src="image/admin/rlUAzlrnHlt2dAfTtsAL.png", alt="More information about an audit.", width="800", height="586" %}

9.  Click **Learn More** to view that audit's documentation.

    {% Img src="image/admin/uLnvFFpu1Aqksuh5JxdJ.png", alt="Viewing an audit's documentation.", width="800", height="728" %}

### See also: aXe extension {: #axe }

You may prefer to use the [aXe extension][6] or [Lighthouse extension][14] rather than the Lighthouse panel that is available by default in Chrome.
They generally provide the same information, since aXe is the underlying engine that powers the Lighthouse panel. The aXe
extension has a different UI and describes audits slightly differently.

{% Img src="image/admin/XUIvZ0Hmn8stW6KxQCF3.png", alt="The aXe extension.", width="800", height="626" %}

One advantage that the aXe
extension has over the Audits panel is that it lets you inspect and highlight failing nodes.s

## The Accessibility pane {: #pane }

The Accessibility pane is where you can view the accessibility tree, ARIA attributes, and computed
accessibility properties of DOM nodes.

To open the Accessibility pane:

1.  Click the **Elements** tab.
2.  In the **DOM Tree**, select the element which you want to inspect.
3.  Click the **Accessibility** tab. This tab may be hidden behind the **More Tabs**
    {% Img src="image/admin/K91DZQf9MTMExVz8NZ3w.png", alt="More Tabs", width="18", height="16" %} button.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/SyQG3AhymPvIohoZfizN.png", alt="Inspecting an h1 element of the DevTools homepage in the Accessibility pane.", width="800", height="466" %}

### View an element's position in the accessibility tree {: #tree }

[The accessibility tree][7] is a subset of the DOM tree. It only contains elements from the DOM tree
that are relevant and useful for displaying the page's contents in a screen reader.

Inspect an element's position in the accessibility tree from the [Accessibility pane][8].

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/mTkkFUVuQ64mAY5iXCE3.png", alt="The Accessibility Tree section", width="800", height="524" %}

This view allows you to explore only a single node and its ancestors. To explore the whole accessibility tree, follow the steps below.

### (Preview) Explore the full-page accessibility tree {: #explore-tree}

The full-page view of the accessibility tree allows you to explore the whole tree and helps you better understand how your web content is exposed to assistive technology.

To explore the accessibility tree:

1. Check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/TpySBK8kJoHcLaMtJnKr.svg", alt="Science", width="20", height="20" %} **Enable full-page accessibility tree**.
1. On the action bar at the top, click **Reload DevTools**.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/iPBBTmKOT0EkBLDPNmxi.png", alt="Enable full-page accessibility tree", width="800", height="387" %}

1. In the upper right corner of the **Elements** panel, toggle the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/RDMkRkH8tvYkbOedSZgg.svg", alt="Accessibility", width="20", height="20" %} **Switch to Accessibility Tree view** button.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/w3l7Zbtti7m5NuxuOalR.png", alt="Full-page view of the accessibility tree", width="800", height="444" %}

1. Browse the accessibility tree. You can expand nodes or click to see details under [**Computed properties**](#computed).
1. Select a node and click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/RDMkRkH8tvYkbOedSZgg.svg", alt="Accessibility", width="20", height="20" %} **Switch to DOM tree view** button to toggle back to DOM tree.

   The corresponding DOM node is selected now. This is a great way to understand the mapping between the DOM node and its accessibility tree node.

{% Aside %}
**Note**: Our team is still actively working on this preview feature. We are looking for your [feedback](https://goo.gle/devtools-a11y-tree-feedback) to further improve it!
{% endAside %}

### View an element's ARIA attributes {: #aria }

ARIA attributes ensure that screen readers have all of the information that they need in order to
properly represent a page's contents.

View an element's ARIA attributes in [the Accessibility pane][9].

{% Img src="image/admin/5gOS8Kz2Qdxu3FbaKZ6W.png", alt="The ARIA Attributes section", width="800", height="506" %}

### View an element's computed accessibility properties {: #computed }

{% Aside %}

**Note:** If you're looking for computed CSS properties, see [the Computed tab][10].

{% endAside %}

Some accessibility properties are dynamically calculated by the browser. These properties can be
viewed in the **Computed Properties** section of the **Accessibility** pane.

View an element's computed accessibility properties in [the Accessibility pane][11].

{% Img src="image/admin/KhrNElIocLRywp4Na7x7.png", alt="The Computed (Accessibility) Properties section.", width="800", height="506" %}

## Make your website more readable {: #contrast }

{% YouTube id='t4pDjqhG6fE', startTime=38 %}

{% Aside 'gotchas' %}
Low contrast text is the top accessibility issue on the web. In February 2022, 83.9% of the top million home pages had this issue. Check out the [WebAIM Million 2022 report](https://webaim.org/projects/million/#wcag) to learn more.
{% endAside %}

Low-contrast texts make your website less readable for all users, even more so for users with vision deficiencies.

Chrome DevTools lets you:

- [**Discover contrast issues**](#discover-low-contrast). Use the **CSS Overview** panel and (preview) **Issues** tab to get a list of all issues.
- [**Fix contrast issues**](#fix-low-contrast). View the issues with a tooltip in inspector mode and select the contrast ratio values that the **Color Picker** suggests.
- [**Emulate vision deficiencies**](/docs/devtools/rendering/apply-effects/#emulate-vision-deficiencies). Look at your site the way your users see it.

### Discover low contrast text {: #discover-low-contrast }

To discover low contrast text:

1. [Open DevTools](/docs/devtools/open/) on your page. In this tutorial, you can use [this demo page][15].
1. Get a list of all contrast issues using one of the two panels:

   - [**CSS Overview**](#overview-contrast)
   - [(Preview) **Issues**](#issues-contrast)

#### Contrast issues in the CSS Overview panel {: #overview-contrast }

1. Open [CSS Overview](/docs/devtools/css-overview/#open).
1. [Capture an overview](/docs/devtools/css-overview/#run).
1. Open the **Colors** section, scroll to **Contrast issues**, and click an issue, if any.
1. In the **Contrast issues** table, hover over an element and click the link next to it.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/661PL2y4oUm6iS5SMYDO.png", alt="List of contrast issues in CSS Overview.", width="800", height="412" %}

1. Fix the issue as described in the [Fix low contrast text](#fix-low-contrast) section.

#### (Preview) Contrast issues in the Issues tab {: #issues-contrast }

{% Aside %}
**Note**: This is a preview feature disabled by default.
{% endAside %}

1. Enable contrast issues reporting in the **Issues** tab:
   1. Open **Settings** > **Experimental**.
   1. In the filter bar, search for `contrast issue`.
   1. Check **Enable automatic contrast issue reporting via the Issues panel**.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/rhhy2iyy1p6SbGIH9QB3.png", alt="Enable contrast issue reporting.", width="800", height="461" %}
   1. Click **Reload DevTools** in the prompt at the top.
1. [Open the Issues tab](/docs/devtools/issues/#open).
1. Expand the contrast issues DevTools found, then expand the elements table, and click a link next to the element.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/qKP3NuLPLQhdyMdzA7lA.png", alt="Table of elements with contrast issues in the Issues tab.", width="800", height="556" %}

1. Fix the issue as described in the [Fix low contrast text](#fix-low-contrast) section.

### Fix low contrast text {: #fix-low-contrast }

To fix a low contrast issue:

1. [Find a contrast issue](#discover-low-contrast) and click a link to an affected element either on the [**CSS Overview** panel](#overview-contrast) or [**Issues** tab](#issues-contrast). DevTools takes you to the **Elements** panel and selects the corresponding element.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Fjo8Vju3nixmdNTZ7xYF.png", alt="An element with a contrast issue selected in the Elements panel.", width="800", height="490" %}
   For example, on [this demo page][15], the first affected element is `h1.line1`.
1. Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7s3JQLXmIQmQa4CFXaNv.png", alt="Inspect.", width="22", height="21" %} **Inspect** at the top-right corner of DevTools and hover over the element in the viewport. DevTools shows a tooltip for this element.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Jth5CZ7BXPUKajXhmgFR.png", alt="The tooltip shows a warning sign next to the contrast value.", width="800", height="507" %}

   Notice the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/xk7aqSvZfY5vU66QtCer.svg", alt="Warning.", width="20", height="20" %} warning sign next to the contrast ratio value in the tooltip. The contrast ratio measures the difference in brightness between the foreground (text color) and background colors.

1. [Open the **Color Picker**](/docs/devtools/css/reference/#color-picker) next to the color declaration of the element's text and, in the **Color Picker**, expand the **Contrast ratio** section.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/uiUWw7dczJ6VonjO5Gl3.png", alt="The Contrast ratio section of the Color Picker.", width="800", height="598" %}

   The **Color Picker** tells you the contrast ratio doesn't meet neither AA nor AAA levels of [WebAIM guidelines](https://webaim.org/standards/wcag/).

1. Click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/5sHRUwsqWoQHF2BiEwlm.png", alt="Use suggested color.", width="23", height="20" %} **Use suggested color** button next to the AAA level. The **Color Picker** applies the text color that complies to the contrast ratio guidelines.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N2ab1ckpXSEELloAbDTE.png", alt="The applied color complies with the guidelines.", width="800", height="598" %}

1. Alternatively, to pick a color manually, you can drag the circle in the shades preview. To stay within the AA or AAA level, pick a color below the top or bottom line respectively.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/t9W5FRI15uPJtnWglCkY.png", alt="Picking a color shade below the bottom line to stay in AAA level.", width="800", height="598" %}

1. Similarly, fix all the contrast issues you found with the [**CSS Overview** panel](#overview-contrast) or [**Issues** tab](#issues-contrast).

To save the changes you made in DevTools:

- [Copy all CSS changes at once](/docs/devtools/changes/#copy-css-changes) and paste them to your code
- Consider [setting up a Workspace](/docs/devtools/workspaces/) that lets DevTools save files directly to your sources.

[1]: https://developers.google.com/web/fundamentals/accessibility
[2]: /docs/devtools/accessibility/navigation
[3]: https://developers.google.com/web/fundamentals/accessibility/semantics-builtin#screen_readers
[4]: https://developers.google.com/web/fundamentals/accessibility/how-to-review
[5]: #contrast
[6]: https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd
[7]: https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree
[8]: #pane
[9]: #pane
[10]: /docs/devtools/css/reference#computed
[11]: #pane
[12]: https://www.w3.org/WAI/WCAG21/quickref/#contrast-minimum
[13]: https://www.w3.org/WAI/WCAG21/quickref/#contrast-enhanced
[14]: https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk
[15]: https://jec.fyi/demo/cds-quest-cvd
