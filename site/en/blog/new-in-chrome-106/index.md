---
title: New in Chrome 106
description: >
  Chrome 106 is rolling out now. There are new Intl APIs to give you more control when formatting numbers. There’s an origin trial for the new Pop Up API, making it easy to surface critical content to the user. There are a handful of CSS improvements. And there’s plenty more.
layout: 'layouts/blog-post.njk'
date: 2022-09-27
authors:
  - petelepage
  - ajara
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/DhfrwVF94puVClXOYLYS.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-106
---

{% YouTube id='35mN6UKGEbA' %}

Here's what you need to know:

* There are  [new Intl APIs](#new-intl) to give you more control when formatting numbers.
* There’s an origin trial for the [Pop-up API](#popup-api) to make it easy to surface critical content to the user.
* We’re adding a handful of [CSS features](#css-interop) to improve interop.
* And there's plenty [more](#more).

I'm [Pete LePage](https://petelepage.com), and I’m [Adriana Jara](https://twitter.com/tropicadri). Let's dive in and
see what's new for developers in Chrome 106.

## New Intl APIs {: #new-intl }

The Intl APIs help to display content in a localized format.

Like other Intl APIs, this shifts the burden to the system—so you don’t need to ship or maintain complex localization code to every user.

The API knows where the currency symbol goes, how to format dates and times, or compile a list.

Chrome 106 adds a slew of new number format functionality.

```js
const opts = {
  style: 'currency',
  currency: 'EUR'
};
const x = new Intl.NumberFormat('de-DE', opts);
const r = x.format(number);
// expected output: "123.456,79 €"
```

Need to display a price range? `formatRange` has you covered.

Create a new `numberFormat` object, provide the `style` and other options,
and how many digits to show.

Then call `formatRange()` to get the formatted string.

```js
const opts = {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
};
const nf = new Intl.NumberFormat("en-US", opts);
nf.formatRange(2.9, 3.1);
// expected output: "~€3"
```
Want to round a number to the nearest increment of five with an accuracy of two decimal places?
No problem.

Specify the `minimumFractionDigits`, and `roundingIncrement`, then call `format()`.

```js
const opts = {
  style: 'percent',
  minimumFractionDigits: 2,
  roundingIncrement: 5,
};
const nf = new Intl.NumberFormat("en-US", opts);
nf.format(0.428267);
// expected output: "42.85%"
```

You can even tell the browser to include trailing zeros with `trailingZeroDisplay`, super helpful for prices.

```js
const strip = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  trailingZeroDisplay: 'stripIfInteger',
}).format(0.42);
// 42%

const auto = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  trailingZeroDisplay: 'auto',
}).format(0.42);
// 42.00%

```
Check out the [Intl Number Format docs on MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) for more information.

## Pop-up API {: #popup-api }

The Pop-Up API makes building UIs way easier, for those times when you just need to put information right in front of your user.

{% Columns %}
{% Column %}
The `popup` attribute, automatically brings the element to the site's top layer
and provides easy controls to toggle visibility.
No more worrying about
positioning,
stacking elements,
focus,
or keyboard interactions for you.
Best of all it requires zero JavaScript.
{% endColumn %}

{% Column %}
{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/9v0oPLhQUYkitHgE2Ns0.mp4"
  }
%}
{% endColumn %}
{% endColumns %}


With only the following snippet the API takes care of rendering the element on top of *all other content*,
and handles user input, and focus management.

```html
<div id="my-pop-up" popup>
Pop-up content!
</div>
<button  popuptoggletarget="my-pop-up">
Toggle Pop-up button
</button>
```

By default, users can close the popup with gestures like the ESC key or clicking on other elements.

And developers have full control over the style,positioning and size of the top layer,
but also the flexibility to modify the default behaviors. Using only CSS and HTML.

Check out Jhey’s [article](/blog/pop-ups-theyre-making-a-resurgence/) for more examples and API options.

[Sign up for the origin trial](/en/docs/web-platform/origin-trials/) to easily give your users timely information. Let us know what you think.

## New css features {: #css-interop }

There are two new CSS features that improve interop and hopefully make your life a little easier.

There is a new length unit in town: `ic` is joining the party. `ic` is similar to `ch`.
But `ic` is used specifically for text written in languages that use ideograms,
basically it measures length based on the width or height of this character [point somewhere] which means water.

It is a unit designed to size text, allowing you to limit width to improve readability, and it gives predictable control regardless of the text size.

For example if you set the `max-width` of a container, let's say to 10ic,
you *know* that container will contain at most 10 full width glyphs,
no matter the font-size. Check it out in the following example:

{% Codepen {
    user: 'web-dot-dev',
    id: 'eYrybaj',
    height: 450,
    tab: 'result'
  }
%}

CSS Grid support for interpolation for `grid-template-columns` and `grid-template-rows` is coming, it was planned for 106, but is delayed and will be launched in Chrome 107, you can still try it out in Chrome Beta. Here is Bramus' code as an example:

{% Codepen {
    user: 'web-dot-dev',
    id: 'XWqVowx',
    height: 450,
    tab: 'result'
  }
%}

## And more! {: #more }

Of course there’s plenty more.

* We’re starting phase five of the user agent reduction plan.
* Support for HTTP2 Push and the Persistent quota type are being deprecated.
* And the CSS property `hyphenate-character` is now available unprefixed.

## Further reading

This covers only some key highlights. Check the links below for
additional changes in Chrome 106.

* [What's new in Chrome DevTools (106)](/blog/new-in-devtools-106/)
* [Chrome 106 deprecations and removals](/blog/deps-rems-106/)
* [ChromeStatus.com updates for Chrome 106](https://www.chromestatus.com/features#milestone%3D106)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/105.0.5195.147..106.0.5249.68)
* [Chrome release calendar](https://chromiumdash.appspot.com/schedule)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5) to the
[Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I’m Adriana Jara, and as soon as Chrome 107 is released, I'll be right here to
tell you what's new in Chrome!