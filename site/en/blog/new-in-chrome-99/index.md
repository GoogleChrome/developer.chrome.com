---
title: New in Chrome 99
description: >
  Chrome 99 is rolling out now! CSS cascade layers gives you more control over
  your CSS, and helps to prevent style-specificity conflicts. The showPicker()
  method allows you to programmatically show a browser picker for input
  elements like date, color, and datalist. Version 100 of Chrome and Firefox
  is just weeks away. And there's plenty more!
layout: 'layouts/blog-post.njk'
date: 2022-03-01
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/RDOgiI1WbY5WhTh6h702.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-99
---

{% YouTube id='h3mzFraS8CA' %}

Here's what you need to know:

* The count down to [version 100](#v100) of Chrome and Firefox is just
  weeks away.
* [CSS cascade layers](#layers) gives you more control over your CSS, and
  helps to prevent style-specificity conflicts.
* The [`showPicker()`](#showPicker) method allows you to programmatically
  show a browser picker for `<input>` elements like `date`, `color`, and
  `datalist`.
* And there's plenty [more](#more).

I'm [Pete LePage](https://petelepage.com). Let's dive in and
see what's new for developers in Chrome 99.

## Chrome 100 and Firefox 100 {: #v100 }

Chrome 100 ships in late March (2022), and Firefox 100 ships shortly after in
early May. Both of these are a major version number milestone and roll over
to three digits. But, if your code is expecting two digits, the new version
number could cause issues for you.

Any code that checks version numbers, or parses the user agent string
should be checked to make sure it won't have any issues.

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/4drS8JxKXgtzSAxyM6WF.png", class="float-right", alt="Chrome flags page highlighting the new #force-major-version-to-100 option", width="800", height="533" %}

In Chrome, the `#force-major-version-to-100` flag will change the current
version number to 100.

And in Firefox Nightly's Settings menu, you can enable
the "Firefox 100 User-Agent String" option. It's a good idea to test your
site so that you can make sure everything works as expected.

Check out [Chrome and Firefox soon to reach major version 100][cr-ff-100] for
complete details.

<div style="clear:both;"></div>

## CSS Cascade Layers {: #layers }

Support for CSS Cascade Layers and the CSS `@layer` rule is landing in
Chrome 99. They provide more explicit control of your CSS files to prevent
style-specificity conflicts. This is especially useful for large codebases,
design systems, and when  managing third party styles in applications.

They introduce a new layer to the CSS [cascade][cascade]. With layered styles,
the precedence of a layer always beats the specificity of a selector.

{% Img src="image/HodOHWjMnbNw56hvNASHWSgZyAf2/93JCD1oEt33cJdBAdC5g.jpeg", alt="Illustration from project demo of breaking out UI", width="800", height="1145" %}

If you're trying to style a link, inside a `.card`, within a `.post` you will
find that the more specific selector will be applied. By using the `@layer`
rule, you can be more explicit about the style specificity of each, and make
sure that the link style in your card, overrides the link style in your post.

```css
@layer base {
  a {
    font-weight: 800;
    color: red;
  }

  .link {
    color: blue;
  }
}
```

This is because of cascade precedence. Layered styles create new cascade
planes.

Cascade layers using the CSS `@layer` rule are supported in Chrome 99,
Firefox 97, and Safari 15.4 Beta. Check out
[Cascade layers are coming to your browser](/blog/cascade-layers/) for
more information.

## showPicker() for input elements {: #showPicker }

For a long time, we've had to resort to custom widget libraries or hacks to
show a date picker. There's a new `showPicker()` method on HTML `InputElements`.
It's the canonical way to show a browser picker, not only for `date`, but also
`time`, `color`, and other `<input>` elements with pickers.

<figure class="w-figure">
{% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/uh0U2YQnUMato21MzzbR.png", alt="Screenshots of browser pickers", width="800", height="217" %}
  <figcaption class="w-figcaption">Browser date pickers in Chrome desktop, Chrome mobile, Safari desktop, Safari mobile, and Firefox desktop (July 2021).</figcaption>
</figure>

To use it, call `showPicker()` on the `<input>` element. In this example, I
wrapped it in a `try…catch` block. That allows me to provide a fallback,
if the browser doesn't support the API, or can't show the picker. Thus,
ensuring that users still get a good experience.

```js/5
const button = document.querySelector("button");
const dateInput = document.querySelector("input");

button.addEventListener("click", () => {
  try {
    dateInput.showPicker();
    // A date picker is shown.
  } catch (error) {
    // Use an external library when this fails.
  }
});
```

Check out [Show a browser picker for date, time, color, and files](/blog/show-picker/)
for complete details, and all the different `<input>` types you can use
`showPicker()` for.

## And more! {: #more }

Of course there's plenty more.

The Canvas2D API has been [updated][canvas2d], adding new functionality, including:

* Two new events for `ContextLost` and `ContextRestored`
* A `willReadFrequently` option
* More CSS text modifier support
* And more.

There's a new origin trial to allow PWAs to provide alternate colors in the
[web app manifest for dark mode][wam-dark].

And the [handwriting recognition API][cs-hand] has now landed.

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 99.

* [What's new in Chrome DevTools (99)](/blog/new-in-devtools-99/)
* [Chrome 99 deprecations and removals](/blog/deps-rems-99/)
* [ChromeStatus.com updates for Chrome 99](https://www.chromestatus.com/features#milestone%3D99)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/98.0.4758.88..99.0.4844.48)
* [Chrome release calendar](https://chromiumdash.appspot.com/schedule)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5)
to [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I'm Pete LePage, and as soon as Chrome 100 is released, I'll be right here to
tell you what's new in Chrome!

[dcc]: /blog/
[cr-100-flag]: https://developer.chrome.com/blog/force-major-version-to-100/
[cr-ff-100]: https://web.dev/chrome-firefox-100/
[cascade]: https://developer.mozilla.org/docs/Web/CSS/Cascade
[canvas2d]: https://chromestatus.com/feature/6051647656558592
[wam-dark]: https://developer.chrome.com/origintrials/#/view_trial/4239013149262479361
[cs-hand]: https://chromestatus.com/feature/5263213807534080
