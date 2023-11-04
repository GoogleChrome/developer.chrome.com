---
layout: "layouts/doc-post.njk"
title: "View and change CSS"
authors:
  - kaycebasques
  - sofiayem
date: 2017-06-08
updated: 2022-08-04
description: "Learn how to use Chrome DevTools to view and change a page's CSS."
tags:
  - get-started
  - prototype-fixes
  - css
---

Complete these interactive tutorials to learn the basics of viewing and changing a page's CSS using
Chrome DevTools.

## View an element's CSS {: #view }

1. Right-click the `Inspect me!` text below and select **Inspect**. The **Elements** panel of DevTools opens.

    <p class="aloha" data-message="wackadoo!">Inspect me!</p>


1. Observe the `Inspect me!` element highlighted blue in the **DOM Tree**.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/q2kmu1Pzg7oS9osr2PbU.png", alt="Highlighted element.", width="800", height="526" %}

2. In the **DOM Tree**, find the value of the `data-message` attribute for the `Inspect me!`
    element.
3. Enter the attribute's value in the text box below.

    <div class="devtools-css-check">
      <input type="text" required pattern="wackadoo!" />
      <span></span>
    </div>

4. In the **Elements** > **Styles** pane, find the `aloha` class rule.

   The **Styles** pane lists the CSS rules being applied to whatever element is currently selected in the **DOM Tree**, which should still be the `Inspect me!` element.
5. The `aloha` class is declaring a value for `padding`. Enter this value and its unit without spaces in the text box below.

    <div class="devtools-css-check">
      <input type="text" required pattern="1em" />
      <span></span>
    </div>

If you'd like to dock your DevTools window to the right of your viewport, like on the screenshot in step one, see [Change DevTools placement][1].

## Add a CSS declaration to an element {: #declarations }

Use the **Styles** pane when you want to change or add CSS declarations to an element.

1.  Right-click the `Add a background color to me!` text below and select **Inspect**.

    <p class="aloha">Add a background color to me!</p>

2.  Click `element.style` near the top of the **Styles** pane.
3.  Type `background-color` and press <kbd>Enter</kbd>.
4.  Type `honeydew` and press <kbd>Enter</kbd>. In the **DOM tree**, you can see that an inline style declaration was applied to the element.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XjtBwPAxcmTa2ySqhkbw.png", alt="Adding a CSS declaration to the element via the Styles pane.", width="800", height="517" %}

## Add a CSS class to an element {: #classes }

Use the **Styles** pane to see how an element looks when a CSS class is applied to or removed from an
element.

1.  Right-click the `Add a class to me!` element below and select **Inspect**.

    <p class="aloha">Add a class to me!</p>
    <div hidden class="color_me"><!-- Forces color_me to be kept on this page --></div>

2.  Click **.cls**. DevTools reveals a text box where you can add classes to the selected element.
3.  Type `color_me` in the **Add new class** text box and then press Enter. A checkbox appears below
    the **Add new class** text box, where you can toggle the class on and off. If the
    `Add a class to me!` element had any other classes applied to it, you'd also be able to toggle
    them from here.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/b6nNzrHO2bnFlyCMiSYK.png", alt="Applying the color_me class to the element.", width="800", height="487" %}

## Add a pseudostate to a class {: #pseudostates }

Use the **Styles** pane to permanently apply a CSS pseudostate to an element. DevTools supports
`:active`, `:focus`, `:hover`, `:visited`, and others.

1.  Hover over the `Hover over me!` text below. The background color changes.

    <p class="aloha hover">Hover over me!</p>

2.  Right-click the `Hover over me!` text and select **Inspect**.
3.  In the **Styles** pane, click **:hov**.
4.  Check the **:hover** checkbox. The background color changes like before, even though you're not
    actually hovering over the element.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Tpu0KZakPrbC89KoYNBs.png", alt="Toggling the hover pseudostate on an element.", width="800", height="505" %}

## Change the dimensions of an element {: #box-model }

Use the **Box Model** interactive diagram in the **Styles** pane to change the width, height, padding, margin, or border length of an element.

1. Right-click the `Change my margin!` element below and select **Inspect**.

    <p class="aloha">Change my margin!</p>

1. To see the **Box Model**, click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ARurwNZrSDIYQwsVPuUC.png", alt="Show sidebar.", width="22", height="20" %} **Show sidebar** button in the action bar on the **Styles** pane.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/NmA9uvEiL4FomR0uR0Iv.png", alt="The Show sidebar button.", width="800", height="505" %}
2. In the **Box Model** diagram in the **Styles** pane, hover over **padding**. The element's padding is highlighted in the viewport.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/KD7ACAlsDcmOnfVjCOaT.png", alt="Element's padding.", width="800", height="471" %}
3. Double-click the left margin in the **Box Model**. The element currently doesn't have margins, so the `left-margin` has a value of `-`.
4. Type `100` and press <kbd>Enter</kbd>.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/TT6rajB5zknYMXXjg9gu.png", alt="Changing the element's left-margin,", width="800", height="458" %}

The **Box Model** defaults to pixels, but it also accepts other values, such as `25%`, or `10vw`.

{% Aside 'gotchas' %}
Alternatively, in rule declarations in the **Styles** pane, you can change [length properties and their units with your pointer](/docs/devtools/css/reference/#change-length-value).
{% endAside %}

[1]: /docs/devtools/customize/#placement
