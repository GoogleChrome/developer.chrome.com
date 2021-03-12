---
layout: "layouts/doc-post.njk"
title: "View and change CSS"
authors:
  - kaycebasques
date: 2017-06-08
#updated: YYYY-MM-DD
description: "Learn how to use Chrome DevTools to view and change a page's CSS."
---

Complete these interactive tutorials to learn the basics of viewing and changing a page's CSS using
Chrome DevTools.

## View an element's CSS {: #view }

1.  Right-click the `Inspect Me!` text below and select **Inspect**. The **Elements** panel of
    DevTools opens. The `Inspect Me!` element is highlighted in the **DOM Tree**.
2.  In the **DOM Tree**, find the value of the `data-message` attribute for the `Inspect Me!`
    element.
3.  Enter the value in the text box below.
4.  The **Styles** tab on the **Elements** panel lists the CSS rules being applied to whatever
    element is currently selected in the **DOM Tree**, which should still be the `Inspect Me!`
    element in this case. Find the `aloha` class rule. The fact that you see this rule means that
    it's being applied to the `Inspect Me!` element.
5.  The `aloha` class is declaring a value for `padding`. Enter that value in the text box below.

{% Img src="image/admin/wYBJBK3aGW4fvklHISIH.png", alt="The inspected element is highlighted in the DOM Tree", width="800", height="562" %}

**Figure 1**. The inspected element is highlighted blue in the **DOM Tree**

If you'd like to dock your DevTools window to the right of your viewport, like you see in **Figure
1**, see [Change DevTools placement][1].

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/dPkDHB9qgSHjLL6mc6GY.png", alt="CSS classes being applied to the inspected element are highlighted in the Styles tab", width="800", height="562" %}

**Figure 2**. CSS classes being applied to the selected element, such as `aloha`, are displayed in
the **Styles** tab

## Add a CSS declaration to an element {: #declarations }

Use the **Styles** tab when you want to change or add CSS declarations to an element.

{% Aside %}

**Note:** Complete the [View an element's CSS][2] tutorial before doing this one.

{% endAside %}

1.  Right-click the `Add A Background Color To Me!` text below and select **Inspect**.
2.  Click `element.style` near the top of the **Styles** tab.
3.  Type `background-color` and press Enter.
4.  Type `honeydew` and press Enter. In the **DOM Tree** you can see that an inline style
    declaration was applied to the element.

{% Img src="image/admin/dGNv5Vp8kUqnFM2DPAv5.png", alt="Adding a CSS declaration to the element via the Styles tab", width="800", height="562" %}

**Figure 3**. The `background-color:honeydew` declaration has been applied to the element via the
`element.style` section of the **Styles** tab

## Add a CSS class to an element {: #classes }

Use the **Styles** tab to see how an element looks when a CSS class is applied to or removed from an
element.

{% Aside %}

**Note:** Complete the [View an element's CSS][3] tutorial before doing this one.

{% endAside %}

1.  Right-click the `Add A Class To Me!` element below and select **Inspect**.
2.  Click **.cls**. DevTools reveals a text box where you can add classes to the selected element.
3.  Type `color_me` in the **Add new class** text box and then press Enter. A checkbox appears below
    the **Add new class** text box, where you can toggle the class on and off. If the
    `Add A Class To Me!` element had any other classes applied to it, you'd also be able to toggle
    them from here.

{% Img src="image/admin/4rq2npTbnE7mnd8SLKVV.png", alt="Applying the color_me class to the element", width="800", height="562" %}

**Figure 4**. The `color_me` class has been applied to the element via the **.cls** section of the
**Styles** tab

## Add a pseudostate to a class {: #pseudostates }

Use the **Styles** tab to permanently apply a CSS pseudostate to an element. DevTools supports
`:active`, `:focus`, `:hover`, and `:visited`.

{% Aside %}

**Note:** Complete the [View an element's CSS][4] tutorial before doing this one.

{% endAside %}

1.  Hover over the `Hover Over Me!` text below. The background color changes.
2.  Right-click the `Hover Over Me!` text and select **Inspect**.
3.  In the **Styles** tab, click **:hov**.
4.  Check the **:hover** checkbox. The background color changes like before, even though you're not
    actually hovering over the element.

{% Img src="image/admin/7kiJfW9nNzN6khU33oQP.png", alt="Toggling the hover pseudostate on an element", width="800", height="527" %}

**Figure 5**. Toggling the `:hover` pseudostate on an element

## Change the dimensions of an element {: #box-model }

Use the **Box Model** interactive diagram in the **Styles** tab to change the width, height,
padding, margin, or border length of an element.

{% Aside %}

**Note:** Complete the [View an element's CSS][5] tutorial before doing this one.

{% endAside %}

1.  Right-click the `Change My Margin!` element below and select **Inspect**.
2.  In the **Box Model** diagram in the **Styles** tab, hover over **padding**. The element's
    padding is highlighted in the viewport.

    {% Aside %}

    **Note**: Depending on the size of your DevTools window, you may need to scroll to the bottom of
    the **Styles** tab to see the **Box Model**.

    {% endAside %}

3.  Double-click the left margin in the **Box Model**, which currently has a value of `-` meaning
    that the element doesn't have a left-margin.
4.  Type `100` and press Enter. The **Box Model** defaults to pixels, but it also accepts other
    values, such as `25%`, or `10vw`.

{% Img src="image/admin/LINZPIE7bhIZyp9BnT7l.png", alt="Hovering over the element's padding", width="800", height="508" %}

**Figure 6**. Hovering over the element's padding

{% Img src="image/admin/hOUK9PWTmPgaw9ffE8tK.png", alt="Changing the element's left-margin", width="800", height="502" %}

**Figure 7**. Changing the element's left-margin

[1]: /docs/devtools/customize/#placement
[2]: #view
[3]: #view
[4]: #view
[5]: #view
