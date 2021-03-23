---
layout: "layouts/doc-post.njk"
title: "Accessibility features reference"
authors:
  - kaycebasques
date: 2018-07-13
#updated: YYYY-MM-DD
description: "A comprehensive reference of accessibility features in Chrome DevTools."
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

In general, use the Audits panel to determine if:

- A page is properly marked up for screen readers.
- The text elements on a page have sufficient contrast ratios. See also [View the contrast ratio of
  a text element in the Color Picker][5].

To audit a page:

1.  Go to the URL that you want to audit.
2.  In DevTools, click the **Audits** tab. DevTools shows you various configuration options.

    {% Img src="image/admin/2O9SByfzzLWTPQAcPlgN.png", alt="Configuring audits.", width="800", height="1053" %}

    **Figure 1**. Configuring audits

    {% Aside %}

    **Note**: The screenshots in this section were taken with version 69 of Chrome. You can check
    what version you're running at `chrome://version`. The Audits panel UI looks different in
    earlier versions of Chrome, but the general workflow is the same.

    {% endAside %}

3.  For **Device**, select **Mobile** if you want to simulate a mobile device. This option changes
    differently your user agent string and resizes the viewport. If the mobile version of the page
    displays differently than the desktop version, this option could have a significant effect on
    the results of your audit.
4.  In the **Audits** section, make sure that **Accessibility** is enabled. Disable the other
    categories if you want to exclude them from your report. Leave them enabled if you want to
    discover other ways to improve the quality of your page.
5.  The **Throttling** section lets you throttle the network and CPU, which is useful when analyzing
    load performance. This option should be irrelevant to your accessibility score, so you can use
    whatever you prefer.
6.  The **Clear Storage** checkbox lets you clear all storage before loading the page, or preserve
    storage between page loads. This option is also probably irrelevant to your accessibility score,
    so you can use whatever you prefer.
7.  Click **Run Audits**. After 10 to 30 seconds, DevTools provides a report. Your report gives you
    various tips on how to improve the page's accessibility.

    {% Img src="image/admin/62KIEtieXbeJl36cN0kQ.png", alt="A report.", width="800", height="983" %}

    **Figure 2**. A report

8.  Click an audit to learn more about it.

    {% Img src="image/admin/rlUAzlrnHlt2dAfTtsAL.png", alt="More information about an audit.", width="800", height="586" %}

    **Figure 3**. More information about an audit

9.  Click **Learn More** to view that audit's documentation.

    {% Img src="image/admin/uLnvFFpu1Aqksuh5JxdJ.png", alt="Viewing an audit's documentation.", width="800", height="728" %}

    **Figure 4**. Viewing an audit's documentation

### See also: aXe extension {: #axe }

You may prefer to use the [aXe extension][6] rather than the Audits panel. They generally provide
the same information, since aXe is the underlying engine that powers the Audits panel. The aXe
extension has a different UI and describes audits slightly differently. One advantage that the aXe
extension has over the Audits panel is that it lets you inspect and highlight failing nodes.

{% Img src="image/admin/XUIvZ0Hmn8stW6KxQCF3.png", alt="The aXe extension.", width="800", height="626" %}

**Figure 5**. The aXe extension

## The Accessibility pane {: #pane }

The Accessibility pane is where you can view the accessibility tree, ARIA attributes, and computed
accessibility properties of DOM nodes.

To open the Accessibility pane:

1.  Click the **Elements** tab.
2.  In the **DOM Tree**, select the element which you want to inspect.
3.  Click the **Accessibility** tab. This tab may be hidden behind the **More Tabs**
    {% Img src="image/admin/K91DZQf9MTMExVz8NZ3w.png", alt="More Tabs", width="18", height="16" %} button.

{% Img src="image/admin/i38qmp8kPpiHCepwqkAg.png", alt="Inspecting the h1 element of the DevTools homepage in the Accessibility pane.", width="800", height="464" %}

**Figure 6**. Inspecting the `h1` element of the DevTools homepage in the Accessibility pane

### View an element's position in the accessibility tree {: #tree }

[The accessibility tree][7] is a subset of the DOM tree. It only contains elements from the DOM tree
that are relevant and useful for displaying the page's contents in a screen reader.

Inspect an element's position in the accessibility tree from [the Accessibility pane][8].

{% Img src="image/admin/IGM9xYMSTugsmo7sxIjk.png", alt="The Accessibility Tree section", width="800", height="506" %}

**Figure 7**. The Accessibility Tree section

### View an element's ARIA attributes {: #aria }

ARIA attributes ensure that screen readers have all of the information that they need in order to
properly represent a page's contents.

View an element's ARIA attributes in [the Accessibility pane][9].

{% Img src="image/admin/5gOS8Kz2Qdxu3FbaKZ6W.png", alt="The ARIA Attributes section", width="800", height="506" %}

**Figure 8**. The ARIA Attributes section

### View an element's computed accessibility properties {: #computed }

{% Aside %}

**Note:** If you're looking for computed CSS properties, see [the Computed tab][10].

{% endAside %}

Some accessibility properties are dynamically calculated by the browser. These properties can be
viewed in the **Computed Properties** section of the **Accessibility** pane.

View an element's computed accessibility properties in [the Accessibility pane][11].

{% Img src="image/admin/KhrNElIocLRywp4Na7x7.png", alt="The Computed (Accessibility) Properties section.", width="800", height="506" %}

**Figure 9**. The Computed (Accessibility) Properties section

## View the contrast ratio of a text element in the Color Picker {: #contrast }

Some people with low vision don't see areas as very bright or very dark. Everything tends to appear
at about the same brightness, which makes it hard to distinguish outlines and edges. Contrast ratio
measures the difference in brightness between the foreground and background of text. If your text
has a low contrast ratio, then these low vision users may literally experience your site as a blank
screen.

The Color Picker can help you make sure that your text meets recommended contrast ratio levels:

1.  Click the **Elements** tab.
2.  In the **DOM Tree**, select the text element that you want to inspect.

    {% Img src="image/admin/I2op86IuFtozDrACGUYb.png", alt="Inspecting a paragraph in the DOM Tree.", width="800", height="516" %}

    **Figure 10**. Inspecting a paragraph in the DOM Tree

3.  In the **Styles** pane, click the color square next to the element's `color` value.

    {% Img src="image/admin/FspNZHSagZlSOAOqtCqG.png", alt="The color property of the element.", width="800", height="516" %}

    **Figure 11**. The `color` property of the element

4.  Check the **Contrast Ratio** section of the Color Picker. One checkmark means that the element
    meets the [minimum recommendation][12]. Two checkmarks means that it meets the [enhanced
    recommendation][13].

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/mwC8fcpEcDQoDO0ZqJ4G.png", alt="The Contrast Ratio section of the Color Picker shows 2 checkmarks and a value of 16.10.", width="800", height="516" %}

    **Figure 12**. The Contrast Ratio section of the Color Picker shows 2 checkmarks and a value of
    `16.10`

5.  Click the **Contrast Ratio** section to see more information. A line appears in the visual
    picker at the top of the Color Picker. If the current color meets recommendations, then anything
    on the same side of the line also meets recommendations. If the current color does not meet
    recommendations, then anything on the same side also does not meet recommendations.

    {% Img src="image/admin/Jw8dX2kSVDdPUtfDHT5F.png", alt="The Contrast Ratio Line in the visual picker.", width="800", height="516" %}

    **Figure 13**. The Contrast Ratio Line in the visual picker

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
