---
layout: "layouts/doc-post.njk"
title: "CSS Overview: Identify potential CSS improvements"
authors:
  - jecelynyeen
date: 2021-10-21
#updated: YYYY-MM-DD
description: "Identify potential CSS improvements with the CSS Overview panel."
tags:
  - find-issues
---

{% YouTube id="OAP_Sr0zb5I" %}

Use the **CSS Overview** panel to better understand your page's CSS and identify potential improvements.

{% Aside %}
This is a preview feature in Chrome 96. Our team is actively working on this feature and we are looking for your [feedback](https://goo.gle/css-overview-feedback) for further enhancements.
{% endAside %}

## Open the CSS Overview panel {: #open }

1.  Open any web page, such as [this page](/tags/devtools).
2.  [Open DevTools](/docs/devtools/open).
3.  Select {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N7wEDmtW9lnrSxPRupMa.svg", alt="More.", width="24", height="24" %} **Customize and control DevTools** > **More tools** > **CSS Overview**.

    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZgANax148j47ZtV9VRj3.png", alt="CSS Overview in the menu.", width="800", height="509" %}

    Alternatively, use the [Command Menu](/docs/devtools/command-menu/) to open the **CSS Overview** panel.

    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/YmnjqTZFqJOrk9TCwLbo.png", alt="Show CSS Overview command in the Command menu.", width="800", height="509" %}


## Run and re-run a CSS Overview report {: #run }

1.  Click the **Capture overview** button to generate a CSS Overview report of your page.

    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GbwczkM8mkUWINxxA01j.png", alt="Capture CSS Overview.", width="800", height="509" %}

2.  To re-run a CSS Overview, click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/MadqZsIZpo1sj3qQ3GsZ.svg", alt="Clear.", width="24", height="24" %} **Clear overview** icon and repeat the first step.

    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4A5jqlRP2nuWeWHDgWZ8.png", alt="Clear overview.", width="800", height="509" %}


## Understand the CSS Overview report {: #report }

The report consists of five sections:

1. **Overview summary**. A high level summary of your page's CSS.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4A5jqlRP2nuWeWHDgWZ8.png", alt="Overview summary.", width="800", height="509" %}
2. **Colors**. All the colors on your page. The colors are grouped by types, such as background colors, text colors, etc. This sections also shows you texts that have low contrast issues.
    
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/eisnLKYHntSVjiGXQr67.png", alt="Colors.", width="800", height="509" %}
  
    Each color is clickable. For example, suppose the `#DADCE0` border color doesn't match the color scheme of your site. To get a list of elements that use this color, click the color. 
  
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4aRfPegsy9VipGUlfwLf.png", alt="A list of elements that use the color.", width="800", height="509" %}
  
    To highlight the element on the page, hover over the element in the list.
  
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/FLqbl8u59606CoksXQtI.png", alt="Hover over an element to highlight the element on the page.", width="800", height="592" %}

    To open the element in the **Elements** panel, click the element in the list.

3. **Font info**. All the fonts on your page and their occurrences, grouped by different font size, font weight, and line height. Similar to the **Colors** section, to view the list of affected elements, click their occurrences.

    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5PtqMQtV7WRe6NFEZKRR.png", alt="Font info.", width="800", height="509" %}

4. **Unused declarations**. All the styles that have no effect, grouped by reason. 

    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LJ2oxJ9C037v66BSWhQ1.png", alt="Unused declarations.", width="800", height="509" %}

    For example, the two declarations above are unused because the content determines the height and width of an inline element. To view the corresponding elements, click the occurrences.

5. **Media queries**. All the media queries defined on your page, sorted by number of occurrences in descending order. To view the list of affected elements, click their occurrences.

    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/aXZMYB5ceeklWzs53fcg.png", alt="Media queries.", width="800", height="509" %}

