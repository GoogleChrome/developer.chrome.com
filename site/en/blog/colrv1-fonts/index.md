---
title: COLRv1 Color Gradient Vector Fonts in Chrome 98
description: >
  In Chrome 98, the Chrome and Fonts teams have added support for COLRv1, an
  evolution of the COLRv0 font format intended to make color fonts widespread by
  adding gradients, compositing and blending, and improved internal shape reuse
  for crisp and compact font files that compress well.
layout:
  'layouts/blog-post.njk'
date: 2022-01-06
authors:
  - drott
  - rsheeter
hero: 'image/roKb5a4ddjOSoIbxRFI9kDeuVvE2/NQGoL7CmejHN0lUntQfz.png'
alt: >
  A sharp vs. a slightly blurry national park emoji and a bar chart highlighting
  the size difference between COLRv1 and a bitmap font: about 9MB vs. 1.85MB.
tags:
  - chrome-98
  - fonts
---

*Compact, compression-friendly, color vector fonts with all your favorite
gradient flavors.*

In Chrome 98, the Chrome and Fonts teams have added support for COLRv1, an
evolution of the COLRv0 font format intended to make color fonts widespread by
adding gradients, compositing and blending, and improved internal shape reuse
for crisp and compact font files that compress well.

{% Aside %}
Examples in this blog post require a browser that supports
COLRv1 fonts. Try viewing this post in Chrome 98 or above.
{% endAside %}

## Color now

On the web, text is generally drawn in a color specified in CSS. The font does
not define any particular color, it just indicates where pixels should be
placed. That's usually a good thing. CSS lets the author flexibly choose a
color. However, sometimes a glyph contains multiple colors that together have
meaning. For example, this flag {% Img
src="image/roKb5a4ddjOSoIbxRFI9kDeuVvE2/8hQhmhh6F8Ff7kquy4mB.png",
alt="Transgender flag consisting of pale blue and pale pink stripes.",
height="16", width="16" %} with light blue, pink, and white stripes would not
convey the same meaning if it was simply drawn in the current text color.

Today, for most users, emojis are the only color fonts they see. Emojis
typically appear on the web via the system emoji font, or by inserting images
(which has its own complications, {% Img
src="image/roKb5a4ddjOSoIbxRFI9kDeuVvE2/uFlyeIll20cgXsyl7npT.png", alt="Panda
emoji with sad facial expression.", height="16", width="16" %}). Large file
sizes especially for bitmap-based color fonts have made it difficult to use web
fonts for emoji. By supporting COLRv1, we hope to see a proliferation of
creative color font use on the web and beyond.

## Show me your colors

We've created a couple of examples for you to play with:

{% Glitch {
  id: 'colrv1-bungee-spice',
  path: 'index.html'
} %}

{% Glitch {
  id: 'colrv1-emoji-vs-cbdt',
  path: 'index.html'
} %}

{% Glitch {
  id: 'colrv1-emoji-grid',
  path: 'index.html'
} %}

The example assets from Google Fonts used in the example are live in the
[Google Fonts web API](https://developers.google.com/fonts/docs/css2). They are
not listed in the directory at [fonts.google.com](https://fonts.google.com) as
they will only work on Chrome 98 or later and showcase experimental work.

You can now make your own COLRv1 fonts using free and open-source tools. Check
out the [nanoemoji font compiler](https://github.com/googlefonts/nanoemoji)
which allows you to build COLRv1 fonts from SVG source images, then try them in
Chrome 98 or later. Try making your own spin on Bungee Spice by changing the
gradient colors using
[these instructions](https://github.com/rsheeter/Bungee/blob/main/README.md#build-your-own-copy).

For example, you might modify the Bungee Spice font to have a blue and red gradient, like this:

{% Img src="image/roKb5a4ddjOSoIbxRFI9kDeuVvE2/xJDHSfqK292j7JmUa94K.png",
alt="The word dune in the Bungee Spice color font, toned in blue and red
gradients.", width="564", height="169" %}

Tweet your results to [@googlefonts](https://twitter.com/googlefonts) 🙂 Why not try a radial or sweep gradient?

## New with COLRv1

The font format supports multiple ways to support color, all with different
tradeoffs – but none have been successful on the web so far. (To learn more
about the tradeoffs,
[take a look at Dominik's BlinkOn 15 conference talk](https://www.youtube.com/watch?v=BmqYm5Wwz8M).)
Chrome 98 brings support for COLRv1, an evolution of COLRv0. We hope that
COLRv1's combination of graphic capabilities and compact files will make it a
good choice for many color font use cases. COLRv1 adds gradients,
[compositing, and blending](https://www.w3.org/TR/compositing-1/), and improves
internal shape reuse to make even more compact files.

COLRv1 has expressive capability roughly equivalent to
[SVG Native](https://svgwg.org/specs/svg-native/) plus
[blending and compositing](https://www.w3.org/TR/compositing-1/) added on
top. There are four types of color fills: solid colors, linear gradients, radial
gradients, and sweep/conic gradients. COLRv1 lets you reposition and transform
glyph elements using a full set of translate, rotate, sheer, and scale
transformations. Plus, it features support for font variations and reuses
existing shape definition formats in the font.

<figure> {% Img
    src="image/roKb5a4ddjOSoIbxRFI9kDeuVvE2/GRJkXpRBl8vdCAWcIjA1.png", alt="Blue
    and purple crystal ball emoji with reused stars on a brown base.",
    width="360", height="360" %} <figcaption>Shape reuse in the crystal ball
    emoji</figcaption> </figure>

Think about the crystal ball emoji as an example: The star-shaped highlights are
the same shape but different sizes, which means just one shape can be
repositioned and reused without duplication inside the file. The format allows
you to reuse a full glyph within a new glyph, without having to redundantly
encode the same shapes for each glyph. Imagine a decorative color font with
floral decorations, where the same flower shapes are placed on different letters
by just referencing existing color glyphs. For the web font use case, COLRv1
compresses well under woff2. For example, a test build of Twemoji using COLRv1
takes about 1.2 MB inflated, but is about 0.6MB in woff2 form. A build of the
full Noto Emoji Glyph set is reduced from 9MB for the bitmap version to 1.85MB
in COLRv1+woff2 form.

<figure>
{% Img src="image/roKb5a4ddjOSoIbxRFI9kDeuVvE2/OULzoVLf1nYWZCaZWhBa.png",
alt="Bar chart comparing Noto Emoji as Bitmap font and COLRv1 font, about 9MB
vs. 1.85MB", width="800", height="495" %}
<figcaption>Noto Emoji font size CBDT/CBLC vs. COLRv1 after WOFF2 compression.
</figcaption>
</figure>

## Color font use cases

### Catchy headlines

A fresh color font makes visual highlights, headlines, and banners really pop
out.

<figure> {% Glitch { id: 'colrv1-underware-plakato', path: 'index.html' } %}
<figcaption><a
href="https://www.underware.nl/blog/2022/01/plakato-color/">Plakato Color Happy
2022</a> featuring energetic sweep gradients, made by the innovative type
foundry <a href="https://underware.nl">Underware</a> (Twitter: <a
href="https://twitter.com/underware">@underware</a>, Instagram: <a
href="https://www.instagram.com/underwarefoundry/">@underwarefoundry</a>). Read
more about Underware’s first COLRv1 release in their <a
href="https://www.underware.nl/blog/2022/01/plakato-color/">blog post</a>.
</figcaption> </figure>


### No more image replacement: emoji fonts

If you support user generated content, your users probably use emojis. Today
it's very common to scan text and replace any emoji encountered with images to
ensure consistent cross-platform rendering and the ability to support newer
emojis than the OS supports. Those images then have to be switched back to text
during clipboard operations. Here's a real example:

<figure>
{% Img src="image/roKb5a4ddjOSoIbxRFI9kDeuVvE2/dgpLYdWxn0G94lH0rVWI.png", alt="A
code snippet showing inline images as img tags and metadata as part of a chat history", width="800", height="88" %}
<figcaption>Image replacement in Google Chat</figcaption>
</figure>

If you have an emoji font you just render the text in the font, like this:

```html
<style>
@import url(https://fonts.googleapis.com/css2?family=Noto+Color+Emoji);

.emoji {
  font-family: "Noto Color Emoji", sans-serif;
}
</style>
<span class="emoji">🙂</span>
```

Similarly, in an emoji reaction component, COLRv1 offers the opportunity to use
a compact font file instead of a catalog of image assets.

<figure> {% Img
src="image/roKb5a4ddjOSoIbxRFI9kDeuVvE2/dgPBLfMKknICwHOyNgrI.png", alt="Emoji
picker UI as used on GitHub", width="320", height="306" %} <figcaption>Emoji
Reaction Picker on GitHub</figcaption> </figure>

Imagine how many images you'd have to fetch for a complete emoji picker!

### Color in icon fonts

Using color in icon fonts adds clarity and makes glyphs easier to understand.

<figure> {% Img
src="image/roKb5a4ddjOSoIbxRFI9kDeuVvE2/MHHhcD15T0j4q0J3jhPW.png", alt="Three
green icons in black outline", width="400", height="354" %} <figcaption>
Material two-tone icons from <a
href="https://fonts.google.com/icons">https://fonts.google.com/icons</a>
</figcaption> </figure>

### Artistic expression

Space-efficient color fonts enable new forms of artistic expression in text on
the web. This example of a Kufi-style Arabic font uses color gradients as an
artistic interpretation of what the ink flow of traditional calligraphy could
look like when applied to the Kufi style of Arabic writing, which originates
from not being written with nib and ink but carved in stone.

<figure>{% Img
src="image/roKb5a4ddjOSoIbxRFI9kDeuVvE2/6jBXnyaHip2elGTHNl0x.png", alt="Arabic
letters with gradients from black to red.", width="600", height="220" %}
<figcaption><a href="https://github.com/aliftype/reem-kufi">Reem Kufi Ink</a>,
an Arabic font by Khaled Hosny</figcaption> </figure>

## Feature detection

At the moment, figuring out whether a browser engine supports a specific color
font format is possible by means of user-agent sniffing or by searching in a
library like [ChromaCheck](https://github.com/RoelN/ChromaCheck) by
[@PixelAmbacht](https://twitter.com/pixelambacht) to test rendering of color
glyphs on Canvas. Both solutions are not optimal. Feature testing should detect
only a specific feature itself and avoid user agent sniffing. The ChromaCheck
library should not need to perform resource-intensive 2D canvas operations for
determining support.

The Chrome team wants to improve that and has started a series of discussions
[[1](https://github.com/w3c/csswg-drafts/issues/6520),
[2](https://github.com/w3c/csswg-drafts/issues/6791)] in the CSS working group
to provide information on browser font technology support in JavaScript and
declaratively in CSS. The team plans to release efficient feature detection for
color font and other font technologies in a future version of Chrome.

If you would like to use color fonts in your project right now when COLRv1
support is limited to Chrome, there are two ways you can do that: Ask your font
vendor for a COLRv1 font that contains monochrome glyphs too. User agents that
don’t support COLRv1 will fall back to rendering monochrome
glyphs. Alternatively, you can use the ChromaCheck library or user agent
sniffing to determine whether COLRv1 support is available. Then you deliver CSS
that loads COLRv1 fonts in supporting user agents and use an alternative font
format such as COLRv0, a bitmap font format or OpenType SVG in other browsers.

## CSS font-palette support

It would be tremendously useful if using a different set of colors would not
require a new font. Thankfully, a mechanism exists: the
[font-palette CSS property](https://www.w3.org/TR/css-fonts-4/#font-palette-prop). The
Chrome team is working on adding
[support for font-palette in Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=1170794).

## COLRv1 fonts & you

If COLRv1 fonts piques your interest, ask your font vendor about a COLRv1 color
font to use in your project, try the [examples and demos](#show-me-your-colors)
above, or why not dive right in and experiment with
[making your own](https://github.com/rsheeter/Bungee/blob/main/README.md#build-your-own-copy)?

If you have feedback on COLRv1 in Chrome, post to the
[blink-dev mailing list](https://groups.google.com/a/chromium.org/g/blink-dev),
or file an issue in our [issue tracker](http://crbug.com/). If you have feedback
on the COLRv1 font format itself, file an issue at the
[COLRv1 specification GitHub repository](https://github.com/googlefonts/colr-gradients-spec/issues).

With Chrome 98, we’re excited about how COLRv1 brings a whole new level of
typographic creativity to the web.

## Learn more

If you're interested in more details, we have a couple more resources for you:

To learn how COLRv1 works and how it's implemented in Chrome, check out Dominik's BlinkOn 15 conference talk.

{% YouTube id="BmqYm5Wwz8M" %}

* International Unicode Conference #45: Vector Color Fonts, talk by Roderick
  Sheeter, Peter Constable, and Dominik Röttsches
  ([video](https://vimeo.com/645566639),
  [talk details](https://www.unicodeconference.org/program.htm#:~:text=Vector%20Color%20Fonts))
* [nanoemoji font compiler](https://github.com/googlefonts/nanoemoji), producing
  COLRv1 fonts from SVG images
* Google Fonts’
  [color-fonts GitHub repository](https://github.com/googlefonts/color-fonts)
  containing current builds of Noto Emoji, Twemoji, and other sample fonts
* DJR's showcase of the [Bradley Initials](https://tools.djr.com/misc/bradley-initials/) font, exploring COLRv1
* [ChromaCheck tool and library](https://pixelambacht.nl/chromacheck/) to
  feature-detect available color font technologies

## Acknowledgements

Many thanks to Behdad Esfahbod, Cosimo Lupo, Peter Constable, Ben Wagner, Werner
Lemberg, Dave Crossland, Vladimir Levantovsky, Jonathan Kew, Laurence Penney,
Chris Lilley, David Jonathan Ross, Underware, Just van Rossum, Roel Nieskens, and
others for their contributions to COLRv1.
