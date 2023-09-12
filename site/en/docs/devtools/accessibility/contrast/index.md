---
layout: "layouts/doc-post.njk"
title: "Make your website more readable"
authors:
  - sofiayem
date: 2022-10-19
#updated: YYYY-MM-DD
description: "Find and fix low contrast text with DevTools."
tags:
  - accessibility
  - find-issues
  - prototype-fixes
---

{% Aside 'gotchas' %}
Low contrast text is the top accessibility issue on the web. In February 2022, 83.9% of the top million home pages had this issue. Check out the [WebAIM Million 2022 report](https://webaim.org/projects/million/#wcag) to learn more.
{% endAside %}

{% YouTube id='t4pDjqhG6fE', startTime=38 %}

Low contrast texts make your website less readable for all users, even more so for users with vision deficiencies. DevTools can automatically find low contrast issues and suggest better colors to help you fix them.

Use DevTools to:

- [**Discover contrast issues**](#discover-low-contrast). Use the **CSS Overview** panel, (preview) **Issues** tab, or a **Lighthouse** report to get a list of all issues.
- [**Fix contrast issues**](#fix-low-contrast). View the issues with a tooltip in inspector mode and select colors that the **Color Picker** suggests to fix the contrast ratio.
- [**Emulate vision deficiencies**](/docs/devtools/rendering/apply-effects/#emulate-vision-deficiencies). Look at your site the way your users see it.

## Discover low contrast text {: #discover-low-contrast }

To discover low contrast text:

1. [Open DevTools](/docs/devtools/open/) on your page. In this tutorial, you can use [this demo page][15].
1. Get a list of all contrast issues using one of the three panels:

   - [**CSS Overview**](#overview-contrast)
   - [(Preview) **Issues**](#issues-contrast)
   - [**Lighthouse**](#lighthouse-contrast)

### Contrast issues in the CSS Overview panel {: #overview-contrast }

To get an overview:

1. Open [CSS Overview](/docs/devtools/css-overview/#open).
1. [Capture an overview](/docs/devtools/css-overview/#run).
1. Open the **Colors** section, scroll to **Contrast issues**, and click an issue, if any.
1. In the **Contrast issues** table, hover over an element and click the link next to it.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/661PL2y4oUm6iS5SMYDO.png", alt="List of contrast issues in CSS Overview.", width="800", height="412" %}

1. Fix the issue as described in the [Fix low contrast text](#fix-low-contrast) section.

### (Preview) Contrast issues in the Issues tab {: #issues-contrast }

{% Aside %}
**Note**: This is a preview feature disabled by default.
{% endAside %}

To get a list of issues:

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

### Contrast issues in a Lighthouse report {: #lighthouse-contrast}

To run a report:

1. [In DevTools](/docs/devtools/open/), open {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XJkvYrQpjC40JNYnoNAw.svg", alt="More tabs.", width="22", height="22" %} **More tabs** > **Lighthouse**.
1. Generate a Lighthouse report with the following settings:
   - **Mode**: Navigation (default)
   - **Categories**: Accessibility
   - **Device**: Desktop
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lLtaKfELxEnRe6OVxDgP.png", alt="Lighthouse report with Navigation, Accessibility, and Desktop settings.", width="800", height="518" %}
1. Click **Analyze page load** and wait for Lighthouse to generate the report.
1. Scroll down to the **Contrast** section and, in the elements list, click a link to an effected element.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/iiyXwoaVaDZvhIAKowBM.png", alt="The Contrast section of the Lighthouse report with a list of elements that have contrast issues.", width="800", height="612" %}
1. Fix the issue as described in the [Fix low contrast text](#fix-low-contrast) section.

## Fix low contrast text {: #fix-low-contrast }

To fix a low contrast issue:

1. [Find a contrast issue](#discover-low-contrast) and click a link to an affected element either on the [**CSS Overview** panel](#overview-contrast), [**Issues** tab](#issues-contrast), or [**Lighthouse** report](#lighthouse-contrast). DevTools takes you to the **Elements** panel and selects the corresponding element.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Fjo8Vju3nixmdNTZ7xYF.png", alt="An element with a contrast issue selected in the Elements panel.", width="800", height="490" %}
   For example, on [this demo page][15], the first affected element is `h1.line1`.
1. Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7s3JQLXmIQmQa4CFXaNv.png", alt="Inspect.", width="22", height="21" %} **Inspect** at the top-right corner of DevTools and hover over the element in the viewport. DevTools shows a tooltip for this element.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Jth5CZ7BXPUKajXhmgFR.png", alt="The tooltip shows a warning sign next to the contrast value.", width="800", height="507" %}

   Notice the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/xk7aqSvZfY5vU66QtCer.svg", alt="Warning.", width="20", height="20" %} warning sign next to the contrast ratio value in the tooltip. The contrast ratio measures the difference in brightness between the foreground (text color) and background colors.

1. [Open the **Color Picker**](/docs/devtools/css/reference/#color-picker) next to the color declaration of the element's text and, in the **Color Picker**, expand the **Contrast ratio** section.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/uiUWw7dczJ6VonjO5Gl3.png", alt="The Contrast ratio section of the Color Picker.", width="800", height="598" %}

   The **Color Picker** tells you the contrast ratio doesn't meet the AA or AAA levels of [WebAIM guidelines](https://webaim.org/standards/wcag/).

1. Click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/5sHRUwsqWoQHF2BiEwlm.png", alt="Use suggested color.", width="23", height="20" %} **Use suggested color** button next to the AAA level. The **Color Picker** applies the text color that complies to the contrast ratio guidelines.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N2ab1ckpXSEELloAbDTE.png", alt="The applied color complies with the guidelines.", width="800", height="598" %}

1. Alternatively, to pick a color manually, you can drag the circle in the shades preview. To stay within the AA or AAA level, pick a color below the top or bottom line respectively.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/t9W5FRI15uPJtnWglCkY.png", alt="Picking a color shade below the bottom line to stay in AAA level.", width="800", height="598" %}

1. Similarly, fix all the contrast issues you found with the [**CSS Overview** panel](#overview-contrast), [**Issues** tab](#issues-contrast), or [**Lighthouse** report](#lighthouse-contrast).

## Save the changes {: #save-changes }

To save the changes you made in DevTools:

- [Copy all CSS changes at once](/docs/devtools/changes/#copy-css-changes) and paste them to your code
- Consider [setting up a Workspace](/docs/devtools/workspaces/) that lets DevTools save files directly to your sources.

## What's next? {: #next }

Learn more:

- [Learn Accessibility](https://web.dev/learn/accessibility/) in general
- [Color and contrast](https://web.dev/learn/accessibility/color-contrast/) accessibility in particular

[1]: https://web.dev/accessibility/
[2]: /docs/devtools/accessibility/navigation
[3]: https://web.dev/semantics-builtin/#screen-readers
[4]: https://web.dev/how-to-review/
[5]: #contrast
[6]: https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd
[7]: https://web.dev/the-accessibility-tree/
[8]: #pane
[9]: #pane
[10]: /docs/devtools/css/reference#computed
[11]: #pane
[12]: https://www.w3.org/WAI/WCAG21/quickref/#contrast-minimum
[13]: https://www.w3.org/WAI/WCAG21/quickref/#contrast-enhanced
[14]: https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk
[15]: https://jec.fish/demo/cds-quest-cvd
