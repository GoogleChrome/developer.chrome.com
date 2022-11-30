---
layout: "layouts/blog-post.njk"
title: Prepare for viewport resize behavior changes coming to Chrome on Android
authors:
  - bramus
description: >
  What changes are coming to the viewport resize behavior in Chrome 108, why Chrome is making this change, and what you can do to prepare.
date: 2022-10-28
hero: image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/oCyRN5zefrMn8o68pUln.png
alt: "Viewport visualizations."
tags:
  - css
  - chrome-108
---

In November, with the release of Chrome 108, Chrome will make some changes to how the Layout Viewport behaves when the on-screen keyboard (OSK) gets shown. With this change, Chrome on Android will no longer resize the Layout Viewport, and instead resize only the Visual Viewport. This will bring Chrome on Android’s behavior up to par with that of Chrome on iOS and Safari on iOS.

Here's some background on what's happening, why Chrome is making this change, and what you can do to prepare.

## The Layout Viewport and the Visual Viewport

When visiting a website, you don’t get to see the entire page's contents after it has loaded. Instead, the browser offers you a viewport through which you get to see a portion of the page. This viewport is also known as the _Layout Viewport_. When the content of a page grows too large, the browser offers a scrolling mechanism.

<figure>
  {% Img src="image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/bcOVfktAlpu36m7aIgdZ.png", alt="Visualization of the Layout Viewport (blue outline) in a browser.", width="800", height="450", class="screenshot" %}
  <figcaption>
    Visualization of the Layout Viewport <em>(blue outline)</em> in a desktop browser.
  </figcaption>
</figure>

When positioning elements using [`position: fixed`](https://web.dev/learn/css/layout/#positioning), these will be laid out against that Layout Viewport. As the Layout Viewport remains in place as you scroll down a page, so will elements that use `position: fixed`.

<figure>
  {% Img src="image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/7Z5hUpkIquQHf9TelA9Z.png", alt="Visualization of the Layout Viewport (blue outline) in mobile browsers, each with two elements that are laid out using `position: fixed` (blue boxes).", width="800", height="450", class="screenshot" %}
  <figcaption>
    Visualization of the Layout Viewport <em>(blue outline)</em> in mobile browsers, each with two elements that are laid out using <code>position: fixed</code> <em>(blue boxes)</em>. Shown are (from left to right) Safari on iPhone, Chrome on Android, and Firefox on Android.
  </figcaption>
</figure>

In addition to this Layout Viewport, the browser also offers a _Visual Viewport_. It represents the portion of the viewport that is currently visible. At zoom level 1 this Visual Viewport is as large as the Layout Viewport.

<figure>
  {% Img src="image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/QgNJ9lJ0f4vYurujy4zV.png", alt="Visualization of the Visual Viewport (orange outline).", width="800", height="450", class="screenshot" %}
  <figcaption>
    Visualization of the Visual Viewport <em>(orange outline)</em>.
  </figcaption>
</figure>

When pinch-zooming in, you shrink the size of the Visual Viewport in relation to the Layout Viewport.

<figure>
  {% Img src="image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/izBJq3csr5nhGw9Z8EYt.png", alt="Visualization of the Visual Viewport on a pinch-zoomed page. Note how the Visual Viewport is contained inside the Layout Viewport.", width="800", height="450", class="screenshot" %}
  <figcaption>
    Visualization of the Visual Viewport <em>(orange outline)</em> on a pinch-zoomed page. Note how the Visual Viewport is contained inside the Layout Viewport.
  </figcaption>
</figure>

{% Aside %}
In this episode of HTTP 203, [Bramus](/authors/bramus/) tells you all about the various viewports and related terminologies.

{% YouTube id="xl9R8aTOW_I" %}


{% endAside %}

## Viewport resize behavior

When focussing an input or any other editable area, devices–mostly touchscreen devices–can show an on-screen keyboard. This keyboard, often referred to as a virtual keyboard,allows users to enter content into the editable area.

When doing so, browsers respond in one of the following ways in relation to the various viewports:

- Resize only the Visual Viewport and offset the Layout Viewport.
- Resize both the Visual Viewport and Layout Viewport.
- Do not resize any of the Layout Viewport or Visual Viewport, overlaying the virtual keyboard on top of both.

These three behaviors are visualized as follows:

<figure>
  {% Img src="image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/b531R0BAmxljbdfw3Egn.png", alt="Visualization of all three mentioned behaviors side by side.", width="800", height="450", class="screenshot" %}
  <figcaption>
    Visualization of all three mentioned behaviors side by side. Shown are Safari on iOS (left) and Chrome on Android (center and right).
  </figcaption>
</figure>

Depending on which browser and OS combination a visitor uses, one of the behaviors is used, beyond your control.

## Mapping the various resize behaviors

In the [Viewport Investigation Effort](https://github.com/web-platform-tests/interop-2022-viewport)-part of [Interop 2022](https://web.dev/interop-2022/)-various viewport-related aspects were investigated, for every major browser and OS combination.

One of the tested aspects is the resize behavior when the OSK is shown. This led to the following classification:

### Group one

Browsers that resize the Visual Viewport, leaving Layout Viewport untouched.

- Safari on iOS
- Safari on iPadOS
- Chrome on Chrome OS
- Chrome on iOS
- Chrome on iPadOS
- Edge on iOS
- Edge on iPadOS


### Group two

Browsers that resize both the Visual Viewport and Layout Viewport.

- Chrome on Android
- Firefox on Android
- Edge on Android
- Firefox on iOS

### Group three

Browsers that resize none of the viewports:

- None by default – In Chrome on Android you can opt in to this behavior by means of [the VirtualKeyboard API](/docs/web-platform/virtual-keyboard/)

### Side-effects of each behavior

This difference in how the various viewports get resized when the OSK is shown leads to a non-interoperable layout and sizing behavior of websites.

In the browsers from [group 1](#group-one), with the OSK shown:

  - The computed values for [viewport-relative units](https://web.dev/learn/css/sizing/#viewport-relative-units) remain the same.
  - Elements that were designed to take up the full visual space keep their size.
  - Elements that use `position: fixed` remain in place and can be obscured by the OSK.

In the browsers from [group 2](#group-two), with the OSK shown:

  - The computed values for [viewport-relative units](https://web.dev/learn/css/sizing/#viewport-relative-units) shrink.
  - Elements that were designed to take up the full visual space shrink.
  - Elements that use `position: fixed` can end up elsewhere in the layout.

<figure>
  {% Img src="image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/6ImZDFRlY4pyQoxELETG.png", alt="Visualization of the side-effects in both groups. Note the different position for the elements that use position: fixed (blue boxes).", width="800", height="450", class="screenshot" %}
  <figcaption>
    Visualization of the side-effects in both groups. Note the different positions for the elements that use <code>position: fixed</code> <em>(blue boxes)</em>. Shown are Safari on iOS (left) and Chrome on Android (center and right).
  </figcaption>
</figure>

Unless you resort to User-Agent sniffing or rely on extensive scripting, you cannot know which behavior is used. You also cannot change the behavior, as it is determined by the browser and OS combination the user is visiting from.

## Changing the default behavior in Chrome 108

As of Chrome 108, Chrome on Android will adjust its viewport resize behavior to no longer resize the Layout Viewport when the on-screen keyboard is shown.

This will align the behavior of Chrome on Android with that of Chrome on iOS, iPadOS, Windows, and CrOS, Safari on iOS and iPadOS, and Edge on iOS, iPadOS, and Windows.

Thanks to this change, authors can know which behavior will be used, no matter which OS Chrome is running on. Furthermore it allows for stable viewport-relative units: showing or hiding the OSK does not affect these units.

{% Aside %}
These changes do not affect [WebView](/docs/multidevice/webview/)
{% endAside %}

## Opting in to a different behavior

If you want your website to use the pre-108 resize behavior, fear not. Also shipping in Chrome 108 is an extension to the [viewport meta tag](https://web.dev/viewport/).

Through [the `interactive-widget` key](https://drafts.csswg.org/css-viewport/#interactive-widget-section), you can tell Chrome which resize behavior you want.

Accepted values for `interactive-widget` are:

- `resizes-visual`: Resize only the Visual Viewport but not the Layout Viewport.
- `resizes-content`: Resize both the Visual Viewport and Layout Viewport.
- `overlays-content`: Do not resize any viewport.

To opt back in to the “old” Chrome on Android behavior, set the viewport meta tag to this:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, interactive-widget=resizes-content">
```

If you don’t include `interactive-widget` in the viewport meta tag, Chrome will use the default behavior, which is `resizes-visual`.

Visualized, the settings have this effect on the various viewports:

<figure>
  {% Img src="image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/diU1PJiyjjujrb2XtNWs.png", alt="Visual comparison of all three values in Chrome 108 on Android. From left left to right: resizes-visual, resizes-content, and overlays-content.", width="800", height="450", class="screenshot" %}
  <figcaption>
    Visual comparison of all three values in Chrome 108 on Android. From left to right: <code>resizes-visual</code>, <code>resizes-content</code>, and <code>overlays-content</code>.
  </figcaption>
</figure>

You can try out the effect of each value in your browser on [this demo website](https://viewport-resize-behavior.netlify.app/).

{% Aside %}
Note that this meta tag extension is only supported by Chrome 108 and up at the time of writing. Support excludes Chrome on iOS and iPadOS, as these versions are powered by Apple’s WebKit instead of Chrome’s Blink rendering engine.
{% endAside %}

## Testing and feedback

We expect some minor differences to existing sites, but expect these to be non-blocking as Chrome 108 on Android will now behave similarly to Safari on iOS. Therefore, websites that work fine on Safari on iOS should also work fine on Chrome 108 on Android.

However, we do encourage website authors to actively test their websites in Chrome 108, which is in beta from October 27th 2022. Specifically look out for elements that use `position: fixed` and/or rely on [Viewport-relative units](https://web.dev/learn/css/sizing/#viewport-relative-units).

Feedback can be reported over at [crbug.com](https://crbug.com/). Be sure to include “on-screen keyboard” in the report’s title.

## Additional resources

- [Chrome Status Entry](https://chromestatus.com/feature/6145225857171456)
- [Explainer](https://github.com/bramus/viewport-resize-behavior/blob/main/explainer.md)
- [Demo](https://viewport-resize-behavior.netlify.app/)
