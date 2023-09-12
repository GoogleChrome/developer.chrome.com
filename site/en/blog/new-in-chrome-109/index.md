---
title: New in Chrome 109
description: >
  Chrome 109 is rolling out now. The Origin Private File System API is now available for Android, there is a set of new properties in CSS, you can easily add math notations in your HTML with the support for MathML core, and there’s plenty more.
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/BTHxmVVBDdz82KtUiJ8A.png'
layout: 'layouts/blog-post.njk'
date: 2023-01-10
authors:
  - ajara
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-109
---

{% YouTube id='B4_vT99pBaM' %}

Here's what you need to know:

* The Origin Private File System API is [now available](#opfs) for Android.
* There is a set of [new properties in CSS](#css-updates).
* You can easily add math notations in your HTML with the [support for MathML Core](#math-ml-core).
* And there’s plenty [more](#more).

I’m Adriana Jara. Let’s dive in and see what’s new for developers in Chrome 109.

## OPFS on Android {: #opfs }

The Origin Private File System (OPFS) is part of the [File System Access API](https://developer.mozilla.org/docs/Web/API/File_System_Access_API), it is a storage endpoint private to the origin of the page.

It was launched on desktop on Chrome 102, Chrome 109 increases its compatibility by making it available on Android.

With a couple of exceptions, it includes all of the File System Access API surfaces, to seamlessly manage files directly from the local file system. The `show*Picker()` methods and the [Drag-and-Drop API integration](/articles/file-system-access/#drag-and-drop-integration) are not available yet.

With the File System Access API on OPFS, sites can access their per-origin, private file system and are able to perform file operations via `FileSystemSyncAccessHandle` which provides improved performance.

Check out [this article](/articles/file-system-access/) to learn how to implement smooth file system access across platforms.

## New in CSS. {: #css-updates }

Now a few new CSS features, starting with a new length unit: `lh`.

The `lh` CSS unit is equal to the computed value of the line-height property on the element on which it is used. This allows a `textarea` to be given a height that is the same as the number of lines of expected text.

Also the CSS Working Group added a new value of `auto` for the descriptors: `font-weight`, `font-style`, and `font-stretch` inside the `@font-face` rule.  `auto` is now the initial value. These descriptors in [variable fonts](https://web.dev/variable-fonts/) provide users the ability to choose how heavy or slanted or wide the typeface should be.

To provide better control over web typography, the [`hyphenate-limit-chars`](https://developer.mozilla.org/docs/Web/CSS/hyphenate-limit-chars#:~:text=The%20hyphenate%2Dlimit%2Dchars%20CSS,control%20over%20hyphenation%20in%20text.) property specifies the minimum number of characters in a hyphenated word.

## MathML Core support. {: #math-ml-core }

If you ever tried to add math formulas to your web page in a styleable and accessible way you’ll be happy to hear that [MathML Core](https://www.w3.org/TR/mathml-core/) is now supported in Chrome.

MathML is a language for describing mathematical notation in a way that can be included in HTML and SVG. It is rendered in a CSS-compatible way with OpenType MATH and exposed via platform accessibility APIs.

MathML styling is enabled by CSS features including those dedicated to math layout. Some examples are the `math-depth`, `math-shift` and `math-style` properties, and the `math` value for the `display` property and more.

Check out [the documentation](https://developer.mozilla.org/docs/Web/MathML) for details and examples to up your mathematical notation game!

## And more! {: #more }

Of course there’s plenty more.

* You can use the property `suppressLocalAudioPlayback` in [`MediaTrackSupportedConstraints`](https://developer.mozilla.org/docs/Web/API/MediaTrackSupportedConstraints) to better control audio playback when using external speakers.
* [Conditional Focus](/docs/web-platform/conditional-focus/) is now available when calling `getDisplayMedia()`.
* [Secure Payment Confirmation](/blog/spc-on-android/) is available for Chrome on Android.

## Further reading

This covers only some key highlights. Check the links below for
additional changes in Chrome 109.

* [What's new in Chrome DevTools (109)](/blog/new-in-devtools-109/)
* [Chrome 109 deprecations and removals](/blog/chrome-109-beta/#deprecations-and-removals)
* [ChromeStatus.com updates for Chrome 109](https://www.chromestatus.com/features#milestone%3D109)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/108.0.5359.70..109.0.5414.91)
* [Chrome release calendar](https://chromiumdash.appspot.com/schedule)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5) to the
[Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I’m Adriana Jara, and as soon as Chrome 110 is released, I'll be right here to
tell you what's new in Chrome!
