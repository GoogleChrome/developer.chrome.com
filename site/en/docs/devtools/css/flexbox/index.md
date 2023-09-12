---
layout: "layouts/doc-post.njk"
title: "Inspect and debug CSS flexbox layouts"
authors:
  - jecelynyeen
date: 2022-02-08
#updated: YYYY-MM-DD
description: "Learn how to use Chrome DevTools to inspect, modify and debug CSS flexbox layouts."
tags:
  - prototype-fixes
  - css
---

{% YouTube id='J5n2aS37rpE' %}

This guide shows you how to discover flexbox elements on a page, as well as inspect and modify the flexbox layouts in the **Elements** panel.

The screenshots appearing in this article are from this web page: [Centering a text element with Flexbox][1].


## Discover CSS flexbox {: #discover }

When an HTML element on your page has `display: flex` or `display: inline-flex` applied to it, you
can see a `flex` badge next to it in the [**Elements**][2] panel.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/lfqzSwGMHku5wP4J28Iu.png", alt="Discover flexbox", width="800", height="479", class="screenshot" %}


## Modify layouts with the flexbox editor {: #modify }

You can modify flexbox layouts visually with the **flexbox editor**. For example, here is how you can center the text `<h1>` of this [demo page][1] within its container `<div class="container">`.

1. [Inspect](/docs/devtools/css/reference#select) the container element.
2. In the **Styles** pane, you can see the **flexbox editor** button next to the `display: flex` declaration.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4FSnGdO2MC6OjAIcJhe9.png", alt="flexbox editor button", width="800", height="479", class="screenshot" %}
3. Click on it to open the **flexbox editor**. The editor displays a list of flexbox properties. Each property's value options are displayed as icon buttons.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xiPYlTHn4rwTLhdHCe8L.png", alt="flexbox editor", width="800", height="752", class="screenshot" %}
4. To center the text on the screen, you can click on the `justify-content: center` and `align-items: center` buttons. 
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/8vCt26eBuSASwxuT2jQl.png", alt="Center the text in its container", width="800", height="478", class="screenshot" %}
5. The text are centered now. Notice the `justify-content: center` and `align-items: center` declarations are added in the **Styles** pane.


## Examine the flexbox layout {: #examine }

You can hover over the flexbox element in the **Elements** panel to visualize the layout. The overlay appears over the
element, laid out with dotted lines to show the position of its content and items.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/T5fn0VMAClusOkvKMs9d.png", alt="hover over a flexbox element", width="800", height="479", class="screenshot" %}

Alternatively, you can click on the badge to toggle the display of the flexbox overlay. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7dNi6wFpjtpOAztDUYxf.png", alt="change justify-content to flex-end", width="800", height="479", class="screenshot" %}

Try changing the value to `justify-content: flex-end`. The overlay is changed accordingly.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/v5v7w1E7AaAuTf2RfZhL.png", alt="justify-content: flex-end", width="800", height="477", class="screenshot" %}

The icons in the **flex editor** are context-aware. It will change according to the layout direction. For example, when you change the `flex-direction` to `column`, the icons in the **flex editor** are rotated accordingly. The overlay is updated immediately too.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/yQv7pWSi87eatl5uiJEN.mp4", autoplay="true", muted="true", loop="true", controls="true", class="screenshot" %}

## Adjust the flexbox overlay color {: #layout } 

Open the **Layout** pane and scroll down to the **Flexbox** section. You can view all the flexbox elements of the page here.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/AfHGOOeGR5rs0sc9sK4l.png", alt="Layout pane", width="800", height="477", class="screenshot" %}

You can toggle the overlay of each flexbox element with the checkbox next to it. It is the same as you click on the `badge` in the **DOM tree**.

Apart from that, you can change the color of the overlay by clicking on the color icon next to it. For example, the color of the `container` overlay is changed to black.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GVmS8pvKt9gu51Jh3nAe.png", alt="change overlay color", width="800", height="478", class="screenshot" %}

To navigate to a flexbox element in the DOM tree, you can click on the selector icon next to it. 

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/DskcBFYnUc8zBocvXgdg.mp4", autoplay="true", muted="true", loop="true", controls="true", class="screenshot" %}



[1]: http://jec.fish/demo/css-flexbox
[2]: /docs/devtools/open
