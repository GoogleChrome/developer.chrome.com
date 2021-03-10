---
layout: "layouts/doc-post.njk"
title: "Find overriding CSS declarations"
authors:
  - kaycebasques
date: 2019-07-11
#updated: YYYY-MM-DD
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

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/VmAsW0AeQ5mRyBeAM6mI.png", alt="A 'max-height: 512px' declaration is crossed out in the Styles pane of Chrome DevTools.", width="800", height="435" %}

**Figure 1**. The `max-height: 512px` declaration is crossed out.

## Find overrides in the Computed pane {: #computed }

1.  From the **Elements** panel, open the **Computed** pane.

    {% Img src="image/admin/t1c3gz5FCBdbp7itsWGE.png", alt="The Computed pane.", width="800", height="509" %}

    **Figure 2**. The Computed pane.

2.  Scroll through the list of properties and expand the one that you want to investigate further.

    {% Img src="image/admin/6Ylg9XlaprgHHkWieYws.png", alt="Investigating the 'max-height' property in the Computed pane.", width="800", height="509" %}

    **Figure 3**. Investigating the `max-height` property in the Computed pane.

3.  Click the blue link next to a declaration to jump to open the **Sources** panel and jump to that
    declaration's source code. See [Make a minified file readable][4] if the code is minified.

    {% Img src="image/admin/kOMUgtZ1X4Cq18HODUkH.png", alt="Viewing the 'max-height' declaration's source code in the Sources panel.", width="800", height="626" %}

    **Figure 4**. Viewing the `max-height` declaration's source code in the Sources panel.

## Filter properties {: #filter }

If you want to focus on a specific property, type that property name in the **Filter** textbox.

{% Img src="image/admin/DugXTWwvIHP6wPlHE2z7.png", alt="Filtering out properties that do not contain 'max' in the Computed pane.", width="800", height="509" %}

**Figure 5**. Filtering out properties that do not contain `max` in the Computed pane.

## Show all properties {: #all }

If you want to see all properties that are being applied to the element, including [user-agent
stylesheets][5], enable the **Show All** checkbox (next to the [**Filter**](#filter) textbox).

[1]: /docs/devtools/css
[2]: /docs/devtools/css/reference#select
[3]: https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity
[4]: /docs/devtools/javascript/reference#format
[5]: https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade#User-agent_stylesheets
