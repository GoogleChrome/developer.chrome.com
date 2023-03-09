---
title: New in Chrome 111
description: >
  Chrome 111 is rolling out now! Create polished transitions in your single page app with the View Transitions API, and bring colors to the next level with support for CSS color level 4. Discover new tools in the style panel to make the most of the new color functionality, and there’s plenty more.
layout: 'layouts/blog-post.njk'
date: 2023-03-07
authors:
  - ajara
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/djvT3JKbPBugDOsCUsFY.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-111
---

{% YouTube id='cscwgzz85Og' %}

Here's what you need to know:

* Create polished transitions in your single page app with the [View Transitions API](#view-transitions-api).
* Bring colors to the next level with support for [CSS Color Level 4](#css-color-level4).
* Discover [new tools](#devtools-color) in the style panel to make the most of new color functionality.
* And there’s plenty [more](#more).

I’m Adriana Jara. Let’s dive in and see what’s new for developers in Chrome 111.
## View Transitions API. {: #view-transitions-api}
Creating smooth transitions on the web is a complex task.
The View Transitions API is here to make the creation of polished transitions simpler by snapshotting views and allowing the DOM to change without any overlap between states.

<figure>
  {% Video
    playsinline="true",
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/hgnJfPFUbGlucFegEEtl.mp4",
    class="video-full-demo",
    loop="true",
    autoplay="true",
    muted="true",
    controls="true"
  %}
  <figcaption>Transitions created with the View Transition API. <a href="https://http203-playlist.netlify.app/">Try the demo site</a>–Requires Chrome 111+.</figcaption>
</figure>

The default view transition is a cross fade, the following snippet implements this experience.

```js
function spaNavigate(data) {
  // Fallback for browsers that don't support this API:
  if (!document.startViewTransition) {
    updateTheDOMSomehow(data);
    return;
  }

  // With a transition:
  document.startViewTransition(() => updateTheDOMSomehow(data));
}
```


When `.startViewTransition()` is called, the API captures the current state of the page.

Once that's complete, the `callback` passed to `.startViewTransition()` is called. That's where the DOM is changed. Then, the API captures the new state of the page.

Note that the API is launched for Single-Page Apps (SPAs) but support for other models is being implemented too.

There are many details to this API, learn more [in our article containing samples and details](/docs/web-platform/view-transitions/), or explore the [View Transitions documentation on MDN](https://developer.mozilla.org/docs/Web/API/View_Transitions_API).

## CSS Color Level 4. {: #css-color-level4 }

With CSS color level 4, CSS now supports high definition displays, specifying colors from HD gamuts while also offering color spaces with specializations.

In a nutshell it means 50% more colors to pick from! You thought 16 million colors sounded like a lot. I thought so too.

<figure>
  {% Video
    src="video/vS06HQ1YTsbMKSFTIPl2iogUQP73/swYaLIEXuDRZ2VO8SCLH.mp4",
    autoplay="true",
    loop="true",
    muted="true",
    controls="true"
  %}

  <figcaption>
    A series of images are shown transitioning between wide and narrow color
    gamuts, illustrating color vividness and its effects.<br>
    <a href="https://ciechanow.ski/color-spaces/#:~:text=you%20can%20drag%20the%20slider%20to%20see%20how%20the%20extent%20of%20the%20chromaticity%20triangle%20corresponds%20to%20the%20representable%20colors.">Try it for yourself</a>
  </figcaption>
</figure>

The implementation includes the [`color()`](https://developer.mozilla.org/docs/Web/CSS/color_value/color) function; it can be used for any color space that specifies colors with R, G, and B channels. `color()` takes a color space parameter first, then a series of channel values for RGB and optionally some alpha.

Here are some examples of using the color function with different color spaces.

```css
.valid-css-color-function-colors {
  --srgb: color(srgb 1 1 1);
  --srgb-linear: color(srgb-linear 100% 100% 100% / 50%);
  --display-p3: color(display-p3 1 1 1);
  --rec2020: color(rec2020 0 0 0);
  --a98-rgb: color(a98-rgb 1 1 1 / 25%);
  --prophoto: color(prophoto-rgb 0% 0% 0%);
  --xyz: color(xyz 1 1 1);
}
```

Checkout [this article](/articles/high-definition-css-color-guide/) for more documentation to take full advantage of high definition colors using CSS.

## New color devtools. {: #devtools-color }

Devtools has new features to support the css color level 4 specification.

The **Styles** pane now supports the 12 new color spaces and 7 new gamuts outlined in the spec. Here are examples of CSS color definitions with color(), lch(), oklab() and color-mix().

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dA8VCKaSZhNb9gzlAUT9.png", alt="Examples of CSS color definitions.", width="800", height="509" %}

When using `color-mix()`,  which enables mixing a percentage of one color into another, you can view the final color output in the **Computed** pane
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3VkOGbbb5qLVvo1A1qSa.png", alt="color-mix result in the Computed pane.", width="800", height="487" %}

Also the color picker supports all the new color spaces with more features. For example, click on the color swatch of color(display-p3 1 0 1). A gamut boundary line has also been added, distinguishing between the sRGB and display-p3 gamuts for a clearer understanding of your selected color's gamut.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bL6uw8VV4cGuDd9hmAjX.png", alt="A gamut boundary line.", width="800", height="657" %}

The color picker also  supports converting colors between color formats.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uoz3yaPPdVs6T2ASnQ62.png", alt="Converting colors between color formats.", width="800", height="460" %}

Checkout [this post](/blog/new-in-devtools-111/) for more information on debugging color and other new features in devtools.


## And more! {: #more }

Of course there’s plenty more.

* CSS added trigonometric functions, additional root font units and [extended the n-th child](/articles/css-nth-child-of-s/) pseudo selector.
* The [Document Picture in Picture API](/docs/web-platform/document-picture-in-picture/) is in origin trial
* `previousslide` and `nextslide` actions are now part of the [Media Session API](https://web.dev/media-session). Checkout the demo [here](https://googlechrome.github.io/samples/media-session/slides.html).

## Further reading

This covers only some key highlights. Check the links below for
additional changes in Chrome 111.

* [What's new in Chrome DevTools (111)](/blog/new-in-devtools-111/)
* [Chrome 111 deprecations and removals](/blog/deps-rems-111/)
* [ChromeStatus.com updates for Chrome 111](https://www.chromestatus.com/features#milestone%3D111)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/110.0.5481.186..111.0.5563.53)
* [Chrome release calendar](https://chromiumdash.appspot.com/schedule)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5) to the
[Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I’m Adriana Jara, and as soon as Chrome 112 is released, I'll be right here to
tell you what's new in Chrome!
