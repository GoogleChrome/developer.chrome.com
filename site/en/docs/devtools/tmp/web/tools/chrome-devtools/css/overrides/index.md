---
layout: "layouts/doc-post.njk"
title: "Find Overriding CSS Declarations In Chrome DevTools"
authors:
  - kaycebasques
date: 2019-07-11
updated: 2020-07-10
description: "How to figure out what old CSS is causing your new CSS to not be applied properly."
---

This guide assumes that you're familiar with inspecting CSS in Chrome DevTools. See [Get Started
With Viewing And Changing CSS][1] to learn the basics.

## Overview {: #overview }

Suppose that you just added some CSS to your nav and want to make sure the new styles are being
applied properly. When you refresh the page the nav looks the same as before. Something is wrong.
The first thing to do is [inspect the element][2] and make sure that your new CSS is actually being
applied to the nav. If you can see your new CSS in the Styles pane, but your new CSS is crossed out,
it means that there's some other CSS that is overriding your new CSS. In CSS terminology this
concept is called [Specificity][3]. Chrome DevTools can help you find the old CSS that is causing
your new CSS to not be applied.

![A 'max-height: 512px' declaration is crossed out in the Styles pane of 
            Chrome DevTools.](/web/tools/chrome-devtools/css/imgs/override.png)

**Figure 1**. The `max-height: 512px` declaration is crossed out.

## Find overrides in the Computed pane {: #computed }

1.  From the **Elements** panel, open the **Computed** pane.

    ![The Computed pane.](/web/tools/chrome-devtools/css/imgs/computed.png)

    **Figure 2**. The Computed pane.

2.  Scroll through the list of properties and expand the one that you want to investigate further.

    ![Investigating the 'max-height' property in the Computed pane.](/web/tools/chrome-devtools/css/imgs/computedexpanded.png)

    **Figure 3**. Investigating the `max-height` property in the Computed pane.

3.  Click the blue link next to a declaration to jump to open the **Sources** panel and jump to that
    declaration's source code. See [Make a minified file readable][4] if the code is minified.

    ![Viewing the 'max-height' declaration's source code in the Sources panel.](/web/tools/chrome-devtools/css/imgs/computedsource.png)

    **Figure 4**. Viewing the `max-height` declaration's source code in the Sources panel.

## Filter properties {: #filter }

If you want to focus on a specific property, type that property name in the **Filter** textbox.

![Filtering out properties that do not contain 'max' in the Computed pane.](/web/tools/chrome-devtools/css/imgs/computedfilter.png)

**Figure 5**. Filtering out properties that do not contain `max` in the Computed pane.

## Show all properties {: #all }

If you want to see all properties that are being applied to the element, including [user-agent
stylesheets][5], enable the **Show All** checkbox.

![Showing all properties in the Computed pane.](/web/tools/chrome-devtools/css/imgs/computedfilter.png)

**Figure 6**. Showing all properties in the Computed pane.

[1]: /web/tools/chrome-devtools/css
[2]: /web/tools/chrome-devtools/css/reference#select
[3]: https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity
[4]: /web/tools/chrome-devtools/javascript/reference#format
[5]: https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade#User-agent_stylesheets
