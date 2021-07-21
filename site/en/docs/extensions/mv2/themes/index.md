---
layout: "layouts/doc-post.njk"
title: "What are themes?"
date: 2012-09-18
updated: 2018-09-18
description: Guidelines on how to create a theme.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

A _theme_ is a special kind of extension that changes the way the browser looks. Themes are
[packaged][1] like regular extensions, but they don't contain JavaScript or HTML code.

You can find and try a bunch of themes at the [Chrome Web Store][2].

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/FKXt2rwf5OUMDbS5jOt1.png",
       alt="green plants theme", height="125", width="200" %}

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/caHFxSZ3Kuvp2v3NTQr0.png",
       alt="love smoke theme", height="125", width="200" %}

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/zNZx64SGMhM7X1u68OCH.png",
       alt="jus d'orange theme", height="125", width="200" %}

## Manifest {: #manifest }

Here is an example [`manifest.json`][3] file for a theme:

```json
{
  "version": "2.6",
  "name": "camo theme",
  "theme": {
    "images" : {
      "theme_frame" : "images/theme_frame_camo.png",
      "theme_frame_overlay" : "images/theme_frame_stripe.png",
      "theme_toolbar" : "images/theme_toolbar_camo.png",
      "theme_ntp_background" : "images/theme_ntp_background_norepeat.png",
      "theme_ntp_attribution" : "images/attribution.png"
    },
    "colors" : {
      "frame" : [71, 105, 91],
      "toolbar" : [207, 221, 192],
      "ntp_text" : [20, 40, 0],
      "ntp_link" : [36, 70, 0],
      "ntp_section" : [207, 221, 192],
      "button_background" : [255, 255, 255]
    },
    "tints" : {
      "buttons" : [0.33, 0.5, 0.47]
    },
    "properties" : {
      "ntp_background_alignment" : "bottom"
    }
  }
}
```

### colors {: #colors }

Colors are in RGB format. To find the strings you can use within the "colors" field, see
[`kOverwritableColorTable`][4].

### images {: #images }

Image resources use paths relative to the root of the extension. You can override any of the images
that are specified by the strings in [`kPersistingImages`][5].

### properties {: #properties }

This field lets you specify properties such as background alignment, background repeat, and an
alternate logo. To see the properties and the values they can have, see [`kDisplayProperties`][6].

### tints {: #tints }

You can specify tints to be applied to parts of the UI such as buttons, the frame, and the
background tab. Google Chrome supports tints, not images, because images don't work across platforms
and are brittle in the case of adding new buttons. To find the strings you can use within the
"tints" field, see [`kTintTable`][7].

Tints are in Hue-Saturation-Lightness (HSL) format, using floating-point numbers in the range 0 -
1.0:

- **Hue** is an absolute value, with 0 and 1 being red.
- **Saturation** is relative to the currently provided image. 0.5 is _no change_, 0 is _totally
  desaturated_, and 1 is _full saturation_.
- **Lightness** is also relative, with 0.5 being _no change_, 0 as _all pixels black_, and 1 as _all
  pixels white_.

You can alternatively use `-1.0` for any of the HSL values to specify _no change_.

[1]: /docs/extensions/packaging
[2]: https://chrome.google.com/webstore/category/themes
[3]: /docs/extensions/mv2/tabs
[4]: https://cs.chromium.org/search/?q=file:chrome/browser/themes%20symbol:kOverwritableColorTable
[5]: https://cs.chromium.org/search/?q=file:chrome/browser/themes%20symbol:kPersistingImages$
[6]: https://cs.chromium.org/search/?q=file:chrome/browser/themes%20symbol:kDisplayProperties$
[7]: https://cs.chromium.org/search/?q=file:chrome/browser/themes%20symbol:kTintTable$
