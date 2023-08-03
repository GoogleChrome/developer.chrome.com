---
layout: 'layouts/blog-post.njk'
title: Improved font fallbacks
description: >
  The new `size-adjust` and font metric overrides allow developers to create font fallbacks that closely match web fonts. This reduces layout shifts.
authors:
  - katiehempenius
date: 2023-02-10
updated: 2023-02-24
hero: image/j2RDdG43oidUy6AL6LovThjeX9c2/TrmUi4o0TLMxhZQTwhmO.png
alt: A web font and its fallback font.
tags:
  - performance
  - aurora-project
---

## Summary

This article is a deep dive into font fallbacks and the [`size-adjust`](https://developer.mozilla.org/docs/Web/CSS/@font-face/size-adjust), [`ascent-override`](https://developer.mozilla.org/docs/Web/CSS/@font-face/ascent-override), [`descent-override`](https://developer.mozilla.org/docs/Web/CSS/@font-face/descent-override), and [`line-gap-override`](https://developer.mozilla.org/docs/Web/CSS/@font-face/line-gap-override) APIs. These APIs make it possible to use local fonts to create fallback font faces that closely or exactly match the dimensions of a web font. This reduces or eliminates layout shifts caused by font swapping.

If you’d prefer to skip reading this article, these are some of the tools that you can use to start using these APIs immediately:

**Framework tools:**

*   [@next/font](https://nextjs.org/docs/basic-features/font-optimization): Starting in Next 13, `next/font` automatically uses font metric overrides and `size-adjust` to provide matching font fallbacks.
*   [@nuxtjs/fontaine](https://github.com/nuxt-modules/fontaine): Starting in Nuxt 3, you can use `nuxt/fontaine` to automatically generate and insert matching font fallbacks into the stylesheets used by your Nuxt app.

**Non-framework tools:**

*   [Fontaine](https://github.com/unjs/fontaine): Fontaine is a library that automatically generates and inserts font fallbacks that use font metric overrides.
*   This [repo](https://github.com/khempenius/font-fallbacks-dataset) contains the font metric overrides for all fonts hosted by Google Fonts. These values can be copied and pasted into your stylesheets.

## Background

A fallback font is a font face that is used when the primary font face is not loaded yet, or is missing [glyphs](https://fonts.google.com/knowledge/glossary/glyph) necessary to render page content. For example, the CSS below indicates that the `sans-serif` font family should be used as the font fallback for `"Roboto"`.

```css
font-family: "Roboto" , sans-serif;
```

Fallback fonts can be used to render text more quickly (that is, by using `font-display: swap`). As a result, page content is readable and useful earlier—however, historically, this has come at the cost of layout instability: layout shifts commonly occur when a fallback font is swapped out for the web font. However, the new APIs discussed below can reduce or eliminate this issue by making it possible to create fallback font faces that take up the same amount of space as their web font counterpart.


## Improved font fallbacks

There are two possible approaches to generating "improved" font fallbacks. The simpler approach uses only the font metric overrides API. The more complicated (but more powerful) approach uses both the font metric overrides API and `size-adjust`. This article explains both of these approaches.


### How font metric overrides work


#### Intro

Font metric overrides provide a way to override the ascent, descent, and line-gap of a font:



*   **Ascent** measures the furthest distance that a font’s glyphs extend above the baseline.
*   **Descent** measures the furthest distance that a font’s glyphs extend below the baseline.
*   **Line gap**, also called "leading", measures the distance between successive lines of text.



{% Img src="image/j2RDdG43oidUy6AL6LovThjeX9c2/YremslBbpRVzbUwdOgQl.png", alt="Diagram depicting a font’s ascent, descent, and line gap.", width="800", height="516" %}


Font metric overrides can be used to override the ascent, descent, and line-gap of a fallback font to match the ascent, descent, and line-gap of the web font. As a result, the web font and the adjusted fallback font will always have the same vertical dimensions.


{% Glitch
  id='overrides-only-demo'
%}

Font metric overrides are used in a stylesheet like this:

```css/7-9
body {
	font-family: Poppins, "fallback for poppins";
}

@font-face {
	font-family: "fallback for poppins";
	src: local("Times New Roman");
	ascent-override: 105%;
	descent-override: 35%;
	line-gap-override: 10%;
}
```

The tools listed at the beginning of this article can generate the correct font metric override values. However, you can also calculate these values yourself.


#### Calculating font metric overrides

The following equations yield the font metric overrides for a given web font. The values of font metric overrides should be written as percentages (for example, `105%`) rather than decimals.

```html
ascent-override = ascent/unitsPerEm
descent-override = descent/unitsPerEm
line-gap-override = line-gap/unitsPerEm
```

{% Aside %}

[Units per em (UPM)](https://help.fontlab.com/fontlab-vi/Font-Sizes-and-the-Coordinate-System/) refers to the grid size that was used when designing the font. Although there are other grid sizes, `1000` (a 1000x1000 grid) or `2048` (a 2048x2048 grid) are by far the most popular. It’s important to know UPM in order to put other metrics into perspective. For example, an ascent of `900` means very different things depending on whether a font has an UPM of `1000` or `2048`.

{% endAside %}

For example, these are the font metric overrides for the [Poppins](https://fonts.google.com/specimen/Poppins) font:

```css
/*
Poppins font metrics:
ascent = 1050
descent = 350
line-gap = 100
UPM: 1000
*/

ascent-override: 105%;	/* = 1050/1000 */
descent-override: 35%;	/* = 350/1000 */
line-gap-override: 10%;	/* = 100/1000 */
```

The values of `ascent`, `descent`, `line-gap`, and `unitsPerEm` all come from the metadata of the web font. The next section of this article explains how to obtain these values.


#### Reading font tables

A font’s metadata (specifically, its [font tables](https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6.html)) contains all the information that at you’ll need to calculate its font metric overrides.


<figure>
{% Img src="image/j2RDdG43oidUy6AL6LovThjeX9c2/ReNLDLDcMWeS5w3ykMB3.png", alt="Screenshot of the Font Information dialog box in FontForge. The dialog box displays font metrics like 'Typo Ascent', 'Typo Descent', and 'Typo Line Gap'.", width="800", height="618" %}
  <figcaption>Using FontForge to view font metadata</figcaption>
</figure>


Here are some tools you can use to read a font’s metadata:



*   [fontkit](https://github.com/foliojs/fontkit) is a font engine built for Node.js. This [code snippet](https://glitch.com/edit/#!/fontkit-font-metrics-demo?path=font-metrics.js) shows how to use fontkit to calculate font metric overrides.
*   [Capsize](https://github.com/seek-oss/capsize) is a font sizing and layout library. Capsize provides an API for getting information about various font metrics.
*   [fontdrop.info](https://fontdrop.info/) is a website that allows you to view font tables and other font-related information from the browser.
*   [Font Forge](https://fontforge.org/) is a popular desktop font editor. To view `ascent`, `descent`, and `line-gap`: open the [`Font Info`](https://fontforge.org/docs/ui/dialogs/fontinfo.html) dialog, select the `OS/2` menu, then select the `Metrics` tab. To view `UPM`: open the `Font Info` dialog, then select the `General` menu.



{% Aside %}

Some font-related JavaScript libraries approximate ascent, descent, and line-gap by drawing glyphs to canvas and measuring the result. However, this approach is less accurate than reading the font metrics directly from the font table.

{% endAside %}


#### Understanding font tables

You may notice that concepts like "ascent" are referred to by multiple metrics—for example, there are `hheaAscent`, `typoAscent`, and `winAscent` metrics. This is the result of different operating systems taking different approaches to font rendering: programs on OSX devices generally use `hhea*` font metrics—while programs on Windows devices generally use `typo*` (also referred to as `sTypo*`) or `win*` font metrics.

{% Aside %}

More specifically, programs on Windows devices typically follow the convention of using `typo*` metrics if a font has set [`USE_TYPO_METRICS`](https://learn.microsoft.com/typography/opentype/spec/os2#fss) and using `win*` metrics if not. `USE_TYPO_METRICS` is a boolean parameter that was introduced to allow designers to set a preference between using `typo*` and `win*` metrics.

{% endAside %}

Depending on the font, browser, and operating system, a font will be rendered using either `hhea`, `typo`, or `win` metrics.



<table>
  <tr>
   <td>
   </td>
   <td>Mac
   </td>
   <td>Windows
   </td>
  </tr>
  <tr>
   <td>Chromium
   </td>
   <td>Uses metrics from "hhea" table.
   </td>
   <td>Uses metrics from "typo" table if "USE_TYPO_METRICS" has been set, otherwise uses metrics from "win" table.
   </td>
  </tr>
  <tr>
   <td>Firefox
   </td>
   <td>Uses metrics from "typo" table if "USE_TYPO_METRICS" has been set, otherwise uses metrics from "hhea" table.
   </td>
   <td>Uses metrics from "typo" table if "USE_TYPO_METRICS" has been set, otherwise uses metrics from "win" table.
   </td>
  </tr>
  <tr>
   <td>Safari
   </td>
   <td>Uses metrics from "hhea" table.
   </td>
   <td>Uses metrics from "typo" table if "USE_TYPO_METRICS" has been set, otherwise uses metrics from "win" table.
   </td>
  </tr>
</table>


For more information on how font metrics work across operating systems, see [this article on vertical metrics](https://glyphsapp.com/learn/vertical-metrics).


#### Cross-device compatibility

For the vast majority of fonts (for example, ~90% of the fonts hosted by Google Fonts) font metrics overrides can be safely used without knowing the user’s operating system: in other words, for these fonts the values of `ascent-override`, `descent-override`, and `linegap-override` remain exactly the same regardless of whether `hhea`, `typo`, or `win` metrics apply. This [repo](https://github.com/khempenius/font-fallbacks-dataset) provides information on which fonts this does and does not apply to.

If you are using a font that requires using separate sets of font metric overrides for OSX and Windows devices, using font metric overrides and `size-adjust` is only recommended if you have the ability to vary your stylesheets based on the user’s operating system.

{% Aside %}

This section explains how to determine whether a font uses the same font metric overrides on both OSX and Windows devices.

First, determine if the font has enabled `USE_TYPO_METRICS`.



*   If `USE_TYPO_METRICS` is enabled, the font will be rendered using `hhea` metrics on OSX devices and `typo` metrics on Windows devices.
    *   To calculate normal line height on OSX, use the following equation: `(hheaAscent + hheaDescent + hheaLineGap)/unitsPerEm`.
    *   To calculate normal line height on Windows, use the following equation: `(typoAscent + typoDescent + typoLineGap)/unitsPerEm`.
    *   If the line height on OSX and Windows are the same, you can use the same font metric overrides for both operating systems.
*   If `USE_TYPO_METRICS` is not enabled, the font will be rendered using `hhea` metrics on OSX devices and `win` metrics on Windows devices.
    *   To calculate normal line height on OSX, use the following equation: `(hheaAscent + hheaDescent + hheaLineGap)/unitsPerEm`.
    *   To calculate normal line height on Windows, use the following equation: `(winAscent + winDescent)/unitsPerEm`. (Note: there is no such thing as `winLineGap`).
    *   If both of the following conditions are true, you can use the same font metric overrides on OSX and Windows: a) `hheaLineGap == 0`, b) line height on OSX and Windows are the same.

{% endAside %}

 


#### Using font metric overrides

Because font metric overrides are calculated using measurements that come from the metadata of the web font (and not the fallback font), they stay the same regardless of which font is used as the fallback font. For example:

```css/5,13
body {
  font-family: "Poppins", "fallback for Poppins", "another fallback for Poppins";
}

@font-face {
  font-family: "fallback for Poppins";
  src: local("Arial");
  ascent-override: 105%;
  descent-override: 35%;
  line-gap-override: 10%;
}

@font-face {
  font-family: "another fallback for Poppins";
  src: local("Roboto");
  ascent-override: 105%;
  descent-override: 35%;
  line-gap-override: 10%;
}
```


### How size-adjust works


#### Intro

The [`size-adjust`](https://developer.mozilla.org/docs/Web/CSS/@font-face/size-adjust) CSS descriptor proportionally scales the width and height of font glyphs. For example, `size-adjust: 200%` scales font glyphs to twice their original size; `size-adjust: 50%` scales font glyphs to half their original size.



{% Img src="image/j2RDdG43oidUy6AL6LovThjeX9c2/VmKhigrTQzc14pmLYndx.png", alt="Diagram showing the results of using 'size-adjust: 50%' and 'size-adjust: 200%'.", width="800", height="506" %}


By itself, `size-adjust` has limited applications for improving font fallbacks: in most cases, a fallback font needs to be narrowed or widened slightly (rather than scaled proportionally) in order to match a web font. However, combining `size-adjust` with font metric overrides makes it possible to make any two fonts match each other both horizontally and vertically.

{% Glitch
  id='overrides-and-size-adjust-demo'
%}

This is how `size-adjust` is used in stylesheets:

```css/3
@font-face {
  font-family: "fallback for poppins";
  src: local("Arial");
  size-adjust: 60.85099821%;
  ascent-override: 164.3358416%;
  descent-override: 57.51754455%;
  line-gap-override: 16.43358416%;
}
```

Because of how `size-adjust` is calculated (which is explained in the next section), the value of `size-adjust` (and the corresponding font metric overrides) changes depending on which fallback font is used:

```css/7-10,16-19
body {
  font-family: "Poppins", "fallback for Poppins", "another fallback for Poppins";
}

@font-face {
  font-family: poppins-fallback;
  src: local("Arial");
  size-adjust: 60.85099821%;
  ascent-override: 164.3358416%;
  descent-override: 57.51754455%;
  line-gap-override: 16.43358416%;
}

@font-face {
  font-family: poppins-fallback-android;
  src: local("Roboto");
  size-adjust: 55.5193474%:
  ascent-override: 180.1173909%;
  descent-override: 63.04108683%;
  line-gap-override: 18.01173909%;
}

```

{% Aside %}

Font metric overrides and `size-adjust` are both declared using percentages—but these percentages are defined differently: for example, `size-adjust: 10%` scales a font to 1/10th its original size; whereas `ascent-override: 10%` wouldn’t necessarily make a font smaller—rather, it changes the proportions of the font (that is, the size of the ascent would be equal to 10% of the UPM).

{% endAside %}


#### Calculating size-adjust and font metric overrides

These are the equations for calculating `size-adjust` and font metric overrides:

```html
size-adjust = avgCharacterWidth of web font / avgCharacterWidth of fallback font
ascent-override = web font ascent / (web font UPM * size-adjust)
descent-override = web font descent / (web font UPM * size-adjust)
line-gap-override = web font line-gap / (web font UPM * size-adjust)
```

Most of these inputs (that is, ascent, descent, and line-gap) can be read directly from the web font’s metadata. However, `avgCharacterWidth` needs to be approximated.


#### Approximating average character width

In general, average character width can only be approximated—but there are some scenarios where this can be calculated exactly: for example, when using a [monospaced font](https://fonts.google.com/knowledge/glossary/monospaced) or when the contents of a text string are known in advance.

{% Aside %}

Fonts can either be monospaced or fixed-width: in monospaced fonts, all characters take up the same amount of horizontal space; in fixed-width fonts, characters have different widths. Monospaced fonts are commonly used in IDEs—but on the web they are typically less common than fixed-width fonts.

{% endAside %}

{% Aside %}

For the sake of simplicity, this article refers to the "width" of a glyph. Although this terminology is not wrong per se—"advance", ["advance width"](https://simoncozens.github.io/fonts-and-layout/concepts.html#advance-widths), or "horizontal advance" are the terminology typically used in the typography field.

{% endAside %}

An example of a naive approach to calculating `avgCharacterWidth` is to take the average width of all `[a-z\s]` characters.


<figure>
{% Img src="image/j2RDdG43oidUy6AL6LovThjeX9c2/Il6FTkosGbTb8mJgjqi1.png", alt=" Graph comparing the width of individual Roboto [a-z\s] glyphs.
", width="800", height="495" %}
<figcaption>Width of Roboto glyphs</figcaption>
</figure>


However, weighting all characters equally will likely underweight the width of frequently used letters (for example, `e`) and overweight the width of infrequently used letters (for example, `z`).

A more complex approach that improves accuracy is to take [letter frequency](https://en.wikipedia.org/wiki/Letter_frequency)into account and instead calculate the frequency-weighted average width of `[a-z\s]` characters. This [article](https://norvig.com/mayzner.html) is a good reference for the letter frequency and average word length of English texts.


<figure>
{% Img src="image/j2RDdG43oidUy6AL6LovThjeX9c2/qzdfLueMLMrBgVWUuT5u.png", alt="A graph showing letter frequency for English.", width="800", height="495" %}
<figcaption>Letter frequency in English<figcaption>
</figure>


{% Aside %}

This article discusses how to calculate `avgCharacterWidth` for font fallbacks that will be used with English text—however these same concepts can be applied to other languages and character sets as well. We would be very interested in hearing about your experiences using this technique with content that is not in English.

{% endAside %}

{% Aside %}

Another possible approach to approximating `avgCharacterWidth` is to use [`xAvgCharWidth`](https://learn.microsoft.com/typography/opentype/spec/os2#xavgcharwidth). `xAvgCharWidth` is a pre-populated value that exists within a font’s [OS/2 table](https://learn.microsoft.com/typography/opentype/spec/os2). However, be aware that this metric isn’t always correct—for example, many font subsetting tools don’t update `xAvgCharWidth` when glyphs are added or removed from a font. In addition, even if `xAvgCharWidth` is calculated correctly, the methodology for calculating `xAvgcharWidth` has [changed](https://learn.microsoft.com/typography/opentype/spec/os2#xavgcharwidth) over the years: you can expect the value of `xAvgCharWidth` to vary depending on which [version of the OS/2 table](https://learn.microsoft.com/typography/opentype/spec/os2#version-5) is used by the font.

{% endAside %}


### Choosing an approach

The two approaches discussed in this article each have their advantages and disadvantages:

* Using font metric overrides by themselves is a good approach to use if you are getting started with optimizing your font fallbacks. Although this is the simpler of the two approaches—it is typically powerful enough to noticeably reduce the magnitude of font-related layout shifts.

* On the other hand, if you want greater precision and are willing to do a bit more work and testing, incorporating `size-adjust` is a good approach to use. When implemented correctly, this approach can effectively eliminate font-related layout-shifts.

{% Aside %}

You may be wondering why you can’t just set a fixed [`line-height`](https://developer.mozilla.org/docs/Web/CSS/line-height) instead of using font metric overrides or `size-adjust`. Although `line-height` can sometimes be successfully used to reduce or eliminate font-related layout shifts—this practice is not recommended. Font metric overrides and `size-adjust` address the root issue behind web font/fallback font mismatches—`line-height` does not (`line-height` sets the height of the CSS [line box](https://hacks.mozilla.org/2015/03/understanding-inline-box-model/)). In addition, you are likely to find that using `line-height` for this purpose is more confusing than you originally anticipated. This [article](https://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align) is a good overview of things to be aware of when working with `line-height`.

{% endAside %}


### Choosing fallback fonts

The techniques described in this article rely on using font metric overrides and `size-adjust` to transform widely available local fonts—rather than attempting to find a local font that closely approximates the web font. When choosing local fonts it’s important to keep in mind that very few fonts have widespread local availability and no single font will exist on all devices.

`Arial` is the recommended fallback font for sans-serif fonts and `Times New Roman` is the recommended fallback font for serif fonts. However, neither of these fonts is available on Android (`Roboto` is the only system font on Android).

The example below uses three fallback fonts to ensure widespead device coverage: a fallback font that targets Windows/Mac devices, a fallback font that targets Android devices, and a fallback font that uses a [generic font family](https://developer.mozilla.org/docs/Web/CSS/font-family#values).

```css/1
body {
  font-family: "Poppins", poppins-fallback, poppins-fallback-android, sans-serif;
}

/*
Poppins font metrics:
- ascent = 1050
- descent = 350
- line-gap = 100
- UPM: 1000
AvgCharWidth:
- Poppins: 538.0103768
- Arial: 884.1438804
- Roboto: 969.0502537
*/

@font-face {
  font-family: poppins-fallback;
  src: local("Arial");
  size-adjust: 60.85099821%;
  ascent-override: 164.3358416%;
  descent-override: 57.51754455%;
  line-gap-override: 16.43358416%;
}

@font-face {
  font-family: poppins-fallback-android;
  src: local("Roboto");
  size-adjust: 55.5193474%:
  ascent-override: 180.1173909%;
  descent-override: 63.04108683%;
  line-gap-override: 18.01173909%;
}
```

{% Aside %}
There are other local fonts that can be used as font fallbacks—but doing so requires knowing a user’s operating system. For example, `"Calibri"`, `"Lucinda Sans"`, and `"Impact"` are fonts that are all widely available on Windows—but not on other operating systems.
{% endAside %}

## Request for feedback

Please reach out if you have any feedback on your experience using font metric overrides and `size-adjust`.
