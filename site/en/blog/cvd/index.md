---
title: "Simulating color vision deficiencies in the Blink Renderer"
description: >
  Why and how we implemented color vision deficiency simulation in DevTools and the Blink Renderer.
layout: "layouts/blog-post.njk"
authors:
  - mathiasbynens
date: 2020-11-19
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/A4BYzXsym40Ehje2Z7sx.jpg'
alt: ''
tags:
  - devtools-engineering
  - devtools
---

<!-- lint disable no-smart-quotes -->

This article describes why and how we implemented color vision deficiency simulation in DevTools and the Blink Renderer.

{% Aside %}
Note: If you prefer watching a presentation over reading articles, then enjoy the video below! If not, skip the video and read on.
{% endAside %}


{% YouTube id='34iDTeCNTz4' %}

## Background: bad color contrast {: #background }

[Low-contrast text](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) is the most common automatically-detectable accessibility issue on the web.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/taKtfjiS0O1QBNusjScS.svg", alt="A list of common accessibility issues on the web. Low-contrast text is by far the most common issue.", width="800", height="342" %}

According to [WebAIM’s accessibility analysis of the top 1-million websites](https://webaim.org/projects/million/update#wcag:~:text=Low%20contrast%20text%0985.3%25%0986.1%25), over *86%* of home pages have low contrast. On average, each home page has [36 distinct instances](https://webaim.org/projects/million/#contrast:~:text=On%20average%2C%20home%20pages%20had%2036%20distinct%20instances%20of%20low%2Dcontrast%20text.) of low-contrast text.


## Using DevTools to find, understand, and fix contrast issues {: #fix }

Chrome DevTools can help developers and designers to improve contrast and to pick more accessible color schemes for web apps:

- The Inspect Mode tooltip that appears on top of the web page [shows the contrast ratio](/blog/new-in-devtools-84#a11y) for text elements.
- The DevTools color picker [calls out bad contrast ratios](/blog/new-in-devtools-65#contrast) for text elements, [shows the recommended contrast line](/blog/new-in-devtools-73#AAA) to help manually select better colors, and can even [suggest accessible colors](/blog/new-in-devtools-86#accessible-color).
- Both [the CSS Overview panel](/blog/new-in-devtools-87#css-overview) and [the Lighthouse Accessibility audit report](https://web.dev/color-contrast/) lists low-contrast text elements as found on your page.

{% YouTube id='Mje2wYgPYP0' %}

We’ve recently added a new tool to this list, and it’s a bit different from the others. The above tools mainly focus on *surfacing contrast ratio information* and giving you options to *fix* it. We realized that DevTools was still missing a way for developers to get a deeper *understanding* of this problem space. To address this, we implemented [vision deficiency simulation](/blog/new-in-devtools-83/#vision-deficiencies) in the DevTools Rendering tab.

{% YouTube id='mK_XmFb8E_w' %}

In Puppeteer, [the new `page.emulateVisionDeficiency(type)` API](https://github.com/puppeteer/puppeteer/blob/v5.4.1/docs/api.md#pageemulatevisiondeficiencytype) lets you programmatically enable these simulations.

## Color vision deficiencies {: #cvd }

[Roughly 1 in 20 people](http://www.colourblindawareness.org/colour-blindness/) suffer from a color vision deficiency (also known as the less accurate term "color blindness"). Such impairments make it harder to tell different colors apart, which *can amplify contrast issues*.


<figure>
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/nadvaVJvr3dc5ifRV5yS.png", alt="A colorful picture of melted crayons, with no color vision deficiencies simulated", width="800", height="451" %}
  <figcaption>
    A colorful <a href="https://unsplash.com/photos/keMdIzsNzsM">picture of melted crayons</a>, with no color vision deficiencies simulated.
  </figcaption>
</figure>

<figure>
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Brl0sog2ebyMaXl7qIOs.png", alt="ALT_TEXT_HERE", width="800", height="451" %}
  <figcaption>
    The impact of simulating achromatopsia on a colorful picture of melted crayons.
  </figcaption>
</figure>

<figure>
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/MaIhd800TOjTMF7hoXpc.png", alt="The impact of simulating deuteranopia on a colorful picture of melted crayons.", width="800", height="451" %}
  <figcaption>
    The impact of simulating deuteranopia on a colorful picture of melted crayons.
  </figcaption>
</figure>

<figure>
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/F7KjX0TDbfTqilw3HpSP.png", alt="The impact of simulating protanopia on a colorful picture of melted crayons.", width="800", height="451" %}
  <figcaption>
    The impact of simulating protanopia on a colorful picture of melted crayons.
  </figcaption>
</figure>

<figure>
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/SfjAPOPPauuGMTCf2RS4.png", alt="The impact of simulating tritanopia on a colorful picture of melted crayons.", width="800", height="451" %}
  <figcaption>
    The impact of simulating tritanopia on a colorful picture of melted crayons.
  </figcaption>
</figure>

As a developer with regular vision, you might see DevTools display a bad contrast ratio for color pairs that visually look okay to you. This happens because the contrast ratio formulas take into account these color vision deficiencies! _You_ might still be able to read low-contrast text in some cases, but people with vision impairments don’t have that privilege.

By letting designers and developers simulate the effect of these vision deficiencies on their own web apps, we aim to provide the missing piece: not only can DevTools help you *find* and *fix* contrast issues, now you can also *understand* them!

## Simulating color vision deficiencies with HTML, CSS, SVG, and C++

Before we dive into the Blink Renderer implementation of our feature, it helps to understand how you’d implement equivalent functionality using web technology.

You can think of each of these color vision deficiency simulations as an overlay covering the entire page. The Web Platform has a way to do that: CSS filters! With the CSS `filter` property, you can use some predefined filter functions, such as `blur`, `contrast`, `grayscale`, `hue-rotate`, and many more. For even more control, the `filter` property also accepts a URL which can point to a custom SVG filter definition:

```html
<style>
  :root {
    filter: url(#deuteranopia);
  }
</style>
<svg>
  <filter id="deuteranopia">
    <feColorMatrix values="0.367  0.861 -0.228  0.000  0.000
                           0.280  0.673  0.047  0.000  0.000
                          -0.012  0.043  0.969  0.000  0.000
                           0.000  0.000  0.000  1.000  0.000">
    </feColorMatrix>
  </filter>
</svg>
```

The above example uses a custom filter definition based on a color matrix. Conceptually, every pixel’s `[Red, Green, Blue, Alpha]` color value is matrix-multiplied to create a new color `[R′, G′, B′, A′]`.

Each row in the matrix contains 5 values: a multiplier for (from left to right) R, G, B, and A, as well as a fifth value for a constant shift value. There are 4 rows: the first row of the matrix is used to compute the new Red value, the second row Green, the third row Blue, and the last row Alpha.

You might be wondering where the exact numbers in our example come from. What makes this color matrix a good approximation of deuteranopia? The answer is: science! The values are based on [a physiologically accurate color vision deficiency simulation model by Machado, Oliveira, and Fernandes](https://www.inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html ).

Anyway, we have this SVG filter, and we can now apply it to arbitrary elements on the page using CSS. We can repeat the same pattern for other vision deficiencies. Here's a demo of what that looks like:

{% Glitch {
  id: 'color-vision-deficiencies',
  height: 1100
} %}

If we wanted to, we could build our DevTools feature as follows: when the user emulates a vision deficiency in the DevTools UI, we inject the SVG filter into the inspected document, and then we apply the filter style on the root element. However, there are several problems with that approach:

- The page might already have a filter on its root element, which our code might then override.
- The page might already have an element with `id="deuteranopia"`, clashing with our filter definition.
- The page might rely on a certain DOM structure, and by inserting the `<svg>` into the DOM we might violate these assumptions.

Edge cases aside, the main problem with this approach is that *we’d be making programmatically observable changes to the page*. If a DevTools user inspects the DOM, they might suddenly see an `<svg>` element they never added, or a CSS `filter` they never wrote. That would be confusing! To implement this functionality in DevTools, we need a solution that doesn’t have these drawbacks.

Let’s see how we can make this less intrusive. There’s two parts to this solution that we need to hide: 1) the CSS style with the `filter` property, and 2) the SVG filter definition, which is currently part of the DOM.

```html
<!-- Part 1: the CSS style with the filter property -->
<style>
  :root {
    filter: url(#deuteranopia);
  }
</style>
<!-- Part 2: the SVG filter definition -->
<svg>
  <filter id="deuteranopia">
    <feColorMatrix values="0.367  0.861 -0.228  0.000  0.000
                           0.280  0.673  0.047  0.000  0.000
                          -0.012  0.043  0.969  0.000  0.000
                           0.000  0.000  0.000  1.000  0.000">
    </feColorMatrix>
  </filter>
</svg>
```

### Avoiding the in-document SVG dependency

Let’s start with part 2: how can we avoid adding the SVG to the DOM? One idea is to move it to a separate SVG file. We can copy the `<svg>…</svg>` from the above HTML and save it as `filter.svg`—but we need to make some changes first! Inline SVG in HTML follows the HTML parsing rules. That means you can get away with things like [omitting quotes around attribute values in some cases](https://mathiasbynens.be/notes/unquoted-attribute-values). However, SVG in separate files is supposed to be valid XML—and XML parsing is way more strict than HTML. Here’s our SVG-in-HTML snippet again:

```html
<svg>
  <filter id="deuteranopia">
    <feColorMatrix values="0.367  0.861 -0.228  0.000  0.000
                           0.280  0.673  0.047  0.000  0.000
                          -0.012  0.043  0.969  0.000  0.000
                           0.000  0.000  0.000  1.000  0.000">
    </feColorMatrix>
  </filter>
</svg>
```

To make this valid standalone SVG (and thus XML), we need to make some changes. Can you guess which?

<!-- ```xml
<svg xmlns="http://www.w3.org/2000/svg">
  <filter id="deuteranopia">
    <feColorMatrix values="0.367  0.861 -0.228  0.000  0.000
                           0.280  0.673  0.047  0.000  0.000
                          -0.012  0.043  0.969  0.000  0.000
                           0.000  0.000  0.000  1.000  0.000">
    </feColorMatrix>
  </filter>
</svg>
``` -->
<pre class="prettyprint"><code class="html"><span class="tag"><span class="tag">&lt;svg </span></span><mark><span class="atn"><span class="atn">xmlns</span></span><span class="pun"><span class="pun">=</span></span><span class="atv"><span class="atv">"http://www.w3.org/2000/svg"</span></span></mark><span class="tag"><span class="tag">&gt;</span></span><span class="pln"><span class="pln"><br>&nbsp; </span></span><span class="tag"><span class="tag">&lt;filter</span></span><span class="pln"><span class="pln"> </span></span><span class="atn"><span class="atn">id</span></span><span class="pun"><span class="pun">=</span></span><span class="atv"><span class="atv">"deuteranopia"</span></span><span class="tag"><span class="tag">&gt;</span></span><span class="pln"><span class="pln"><br>&nbsp; &nbsp; </span></span><span class="tag"><span class="tag">&lt;feColorMatrix</span></span><span class="pln"><span class="pln"> </span></span><span class="atn"><span class="atn">values</span></span><span class="pun"><span class="pun">=</span></span><span class="atv"><span class="atv">"0.367 &nbsp;0.861 -0.228 &nbsp;0.000 &nbsp;0.000<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0.280 &nbsp;0.673 &nbsp;0.047 &nbsp;0.000 &nbsp;0.000<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -0.012 &nbsp;0.043 &nbsp;0.969 &nbsp;0.000 &nbsp;0.000<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;0.000 &nbsp;0.000 &nbsp;0.000 &nbsp;1.000 &nbsp;0.000"</span></span><mark><span class="tag"><span class="tag"> /&gt;</span></span></mark><span class="pln"><span class="pln"><br>&nbsp; </span></span><span class="tag"><span class="tag">&lt;/filter&gt;</span></span><span class="pln"><span class="pln"><br></span></span><span class="tag"><span class="tag">&lt;/svg&gt;</span></span><span class="pln"><span class="pln"><br></span></span></code></pre>

The first change is the XML namespace declaration at the top. The second addition is the so-called “solidus” — the slash that indicates the `<feColorMatrix>` tag both opens and closes the element. This last change is not actually necessary (we could just stick to the explicit `</feColorMatrix>` closing tag instead), but since both XML and SVG-in-HTML support this `/>` shorthand, we might as well make use of it.

Anyway, with those changes, we can finally save this as a valid SVG file, and point to it from the CSS `filter` property value in our HTML document:

```html
<style>
  :root {
    filter: url(filters.svg#deuteranopia);
  }
</style>
```

Hurrah, we no longer have to inject SVG into the document! That’s already a lot better. But… we now depend on a separate file. That’s still a dependency. Can we somehow get rid of it?

As it turns out, we don’t actually need a file. We can encode the entire file within a URL by using a data URL. To make this happen, we literally take the contents of the SVG file we had before, add the `data:` prefix, configure the proper MIME type, and we’ve got ourselves a valid data URL that represents the very same SVG file:

```html
data:image/svg+xml,
  <svg xmlns="http://www.w3.org/2000/svg">
    <filter id="deuteranopia">
      <feColorMatrix values="0.367  0.861 -0.228  0.000  0.000
                             0.280  0.673  0.047  0.000  0.000
                            -0.012  0.043  0.969  0.000  0.000
                             0.000  0.000  0.000  1.000  0.000" />
    </filter>
  </svg>
```

The benefit is that now, we no longer need to store the file anywhere, or load it from disk or over the network just to use it in our HTML document. So instead of referring to the filename like we did before, we can now point to the data URL:

```html
<style>
  :root {
    filter: url('data:image/svg+xml,\
      <svg xmlns="http://www.w3.org/2000/svg">\
        <filter id="deuteranopia">\
          <feColorMatrix values="0.367  0.861 -0.228  0.000  0.000\
                                 0.280  0.673  0.047  0.000  0.000\
                                -0.012  0.043  0.969  0.000  0.000\
                                 0.000  0.000  0.000  1.000  0.000" />\
        </filter>\
      </svg>#deuteranopia');
  }
</style>
```

At the end of the URL, we still specify the ID of the filter we want to use, just like before. Note that there’s no need to Base64-encode the SVG document in the URL—doing so would only hurt readability and increase file size. We added backslashes at the end of each line to ensure the newline characters in the data URL don’t terminate the CSS string literal.

So far, we’ve only talked about how to simulate vision deficiencies using web technology. Interestingly, our final implementation in the Blink Renderer is actually quite similar. Here’s [a C++ helper utility](https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/css/vision_deficiency.cc;l=16-20;drc=25c9d397f8ece542feaf21ad680b71f161edf47b) we’ve added to create a data URL with a given filter definition, based on the same technique:

```cpp
AtomicString CreateFilterDataUrl(const char* piece) {
  AtomicString url =
      "data:image/svg+xml,"
        "<svg xmlns=\"http://www.w3.org/2000/svg\">"
          "<filter id=\"f\">" +
            StringView(piece) +
          "</filter>"
        "</svg>"
      "#f";
  return url;
}
```

And here’s how we’re using it to [create all the filters we need](https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/css/vision_deficiency.cc;l=24-78;drc=25c9d397f8ece542feaf21ad680b71f161edf47b):

```cpp
AtomicString CreateVisionDeficiencyFilterUrl(VisionDeficiency vision_deficiency) {
  switch (vision_deficiency) {
    case VisionDeficiency::kAchromatopsia:
      return CreateFilterDataUrl("…");
    case VisionDeficiency::kBlurredVision:
      return CreateFilterDataUrl("<feGaussianBlur stdDeviation=\"2\"/>");
    case VisionDeficiency::kDeuteranopia:
      return CreateFilterDataUrl(
          "<feColorMatrix values=\""
          " 0.367  0.861 -0.228  0.000  0.000 "
          " 0.280  0.673  0.047  0.000  0.000 "
          "-0.012  0.043  0.969  0.000  0.000 "
          " 0.000  0.000  0.000  1.000  0.000 "
          "\"/>");
    case VisionDeficiency::kProtanopia:
      return CreateFilterDataUrl("…");
    case VisionDeficiency::kTritanopia:
      return CreateFilterDataUrl("…");
    case VisionDeficiency::kNoVisionDeficiency:
      NOTREACHED();
      return "";
  }
}
```

Note that this technique gives us access to the full power of SVG filters without having to re-implement anything or re-invent any wheels. We’re implementing a Blink Renderer feature, but we’re doing so by leveraging the Web Platform.

Okay, so we’ve figured out how to construct SVG filters and turn them into data URLs that we can use within our CSS `filter` property value. Can you think of a problem with this technique? It turns out, we can’t actually _rely_ on the data URL being loaded in all cases, since the target page might have [a `Content-Security-Policy`](https://developers.google.com/web/fundamentals/security/csp) that blocks data URLs. Our final Blink-level implementation takes special care to bypass CSP for these “internal” data URLs during loading.

Edge cases aside, we’ve made some good progress. Because we no longer depend on inline `<svg>` being present in the same document, we’ve effectively reduced our solution to just a single self-contained CSS `filter` property definition. Great! Now let’s get rid of that too.

### Avoiding the in-document CSS dependency

Just to recap, this is where we’re at so far:

```html
<style>
  :root {
    filter: url('data:…');
  }
</style>
```

We still depend on this CSS `filter` property, which might override a `filter` in the real document and break things. It would also show up when inspecting the computed styles in DevTools, which would be confusing. How can we avoid these issues? We need to find a way to add a filter to the document without it being programmatically observable to developers.

One idea that came up was to create a new Chrome-internal CSS property that behaves like `filter`, but has a different name, like `--internal-devtools-filter`. We could then add special logic to ensure this property never shows up in DevTools or in the computed styles in the DOM. We could even make sure it only works on the one element we need it for: the root element. However, this solution wouldn’t be ideal: we’d be duplicating functionality that already exists with `filter`, and even if we try hard to hide this non-standard property, web developers could still find out about it and start using it, which would be bad for the Web Platform. We need some other way of applying a CSS style without it being observable in the DOM. Any ideas?

The CSS spec has a section introducing the _visual formatting model_ it uses, and one of the key concepts there is [the *viewport*](https://drafts.csswg.org/css2/#viewport). This is the visual view through which users consult the web page. A closely related concept is [the _initial containing block_](https://drafts.csswg.org/css2/#initial-containing-block), which is kind of like a styleable viewport `<div>` that only exists at the spec level. The spec refers to this “viewport” concept all over the place. For example, you know how the browser shows scrollbars when the content doesn’t fit? This is all defined in the CSS spec, based on this “viewport”.

This `viewport` exists within the Blink Renderer as well, as an implementation detail. [Here’s the code](https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/css/resolver/style_resolver.cc;l=785-803;drc=2d1ab18ff3b5a4d3d1b92d75ab3aafedb78c9842) that applies the default viewport styles according to the spec:

```cpp
scoped_refptr<ComputedStyle> StyleResolver::StyleForViewport() {
  scoped_refptr<ComputedStyle> viewport_style =
      InitialStyleForElement(GetDocument());
  viewport_style->SetZIndex(0);
  viewport_style->SetIsStackingContextWithoutContainment(true);
  viewport_style->SetDisplay(EDisplay::kBlock);
  viewport_style->SetPosition(EPosition::kAbsolute);
  viewport_style->SetOverflowX(EOverflow::kAuto);
  viewport_style->SetOverflowY(EOverflow::kAuto);
  // …
  return viewport_style;
}
```

You don’t need to understand C++ or the intricacies of Blink’s Style engine to see that this code handles the viewport’s (or more accurately: the initial containing block’s) `z-index`, `display`, `position`, and `overflow`. Those are all concepts you might be familiar with from CSS! There’s some other magic related to stacking contexts, which doesn’t _directly_ translate to a CSS property, but overall you could think of this `viewport` object as something that can be styled using CSS from within Blink, just like a DOM element—except it’s not part of the DOM.

*This gives us exactly what we want!* We can apply our `filter` styles to the `viewport` object, which visually affects the rendering, without interfering with the observable page styles or the DOM in any way.

## Conclusion {: #conclusion }

To recap our little journey here, we started out by building a prototype using web technology instead of C++, and then started working on moving parts of it to the Blink Renderer.

- We first made our prototype more self-contained by inlining data URLs.
- We then made those internal data URLs CSP-friendly, by special-casing their loading.
- We made our implementation DOM-agnostic and programmatically unobservable by moving styles to the Blink-internal `viewport`.

What’s unique about this implementation is that our HTML/CSS/SVG prototype ended up influencing the final technical design. We found a way to use the Web Platform, even within the Blink Renderer!

For more background, check out [our design proposal](https://goo.gle/devtools-cvd) or [the Chromium tracking bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1003700) which references all related patches.
