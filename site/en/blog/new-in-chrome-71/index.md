---
title: New in Chrome 71
description: >
  Chrome 71 makes displaying relative time values easier with the new
  Intl.RelativeTimeFormat() API. You can specify which side of the text the
  underline should appear on for text that flows vertically. And using the
  speech synthesis API now requires user activation before your computer
  starts talking to you! Let's dive in and see what's new for developers in
  Chrome 71!
layout: 'layouts/blog-post.njk'
date: 2018-12-04
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/0u3CGnUcBnHBpIeYr0d2.png'
alt: 'Cropped Chrome logo on the left, version number on the right.'
tags:
  - new-in-chrome
  - chrome-71
---

{% youtube id='SkIgtVvAR6w' %}

In Chrome 71, we've added support for:

* Displaying [relative times](#relative-times) is now part of the `Intl` API.
* Specifying [which side of the text the underline should appear](#underline)
  on for text that flows vertically.
* Requiring [user activation](#speech-activation) before using the speech
  synthesis API.

And there's [plenty more](#more)!

I'm [Pete LePage](https://twitter.com/petele). Let's dive in and see
what's new for developers in Chrome 71!

## Change log

This covers only some of the key highlights, check the links below for
additional changes in Chrome 71.

* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/70.0.3538.66..71.0.3578.82)
* [ChromeStatus.com updates for Chrome 71](https://www.chromestatus.com/features#milestone%3D71)
* [Chrome 71 deprecations & removals](https://developers.google.com/web/updates/2018/10/chrome-71-deps-rems)

## Display relative times with `Intl.RelativeTimeFormat()` {: #relative-times }

<figure class="float-right">
  {% img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/FVgovCvB89Sbz4csuwhM.jpg", alt="" %}
  <figcaption>
    Twitter showing relative time for latest post
  </figcaption>
</figure>

Many web apps use phrases like "yesterday", "in two days", or "an hour ago" to
indicate when something happened - or is going to happen, instead of displaying
the full date and time.

Displaying relative times has become so common that most of the common
date/time libraries provide localized functions to handle this for us. In fact,
almost every web app I build, [Moment JS](https://momentjs.com/) is one of the
first libraries I add, expressly for this purpose.

Chrome 71 introduces [`Intl.RelativeTimeFormat()`][mdn-reltimefmt], which
shifts the work to the JavaScript engine, and enables localized formatting of
relative times. This gives us a small performance boost, and means we only
need those libraries as a polyfill when a browser doesn't support the new APIs
yet.

```js
const rtf = new Intl.RelativeTimeFormat('en');

rtf.format(3.14, 'second');
// → 'in 3.14 seconds'

rtf.format(-15, 'minute');
// → '15 minutes ago'
```

Using it is simple, create a new instance and specify the locale,
then just call format with the relative time. Check out Mathias'
[The `Intl.RelativeTimeFormat API`](https://developers.google.com/web/updates/2018/10/intl-relativetimeformat)
post for full details.

## Specifying underline location for vertical text {: #underline }

<figure class="float-right">
  {% img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/jboAMumW8Pu2fdCF3FRk.png", alt="" %}
  <figcaption>
    Vertical text with inconsistent underlines
  </figcaption>
</figure>

When Chinese or Japanese text is displayed in a
[vertical flow](https://underlined-vertical-text.glitch.me), browsers are
inconsistent with where the underline is placed, it may be on the left, or
on the right.

In Chrome 71, the `text-underline-position` property now accepts `left` or
`right` as part of the CSS3 text decoration spec. The
[CSS3 text decoration spec][css3-td-spec] adds several new properties that
allow use to specify things like what kind of [line][css3-td-line] to use,
the [style][css3-td-style], [color][css3-td-color], and
[position][css3-td-position].

<br style="clear: both;">

```css
.left {
  text-underline-position: left;
}

.right {
  text-underline-position: right;
}
```

## Speech synthesis requires user activation {: #named-workers }

We've all been surprised when we hit a site and it suddenly starts talking
to us. [Autoplay policies](https://developers.google.com/web/updates/2018/11/web-audio-autoplay)
prevent sites from automatically playing playing audio, or video files with
audio. Some sites have tried to get around this by using the
[speech synthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
instead.

Starting in Chrome 71, the speech synthesis API now requires some kind of user
activation on the page before it'll work. This brings it in line with other
[autoplay policies](https://developers.google.com/web/updates/2018/11/web-audio-autoplay).
If you try to use it before the user has interacted with the page, it will
fire an error.

```js
const utterance = new window.SpeechSynthesisUtterance('Hello');
utterance.lang = lang || 'en-US';
try {
  window.speechSynthesis.speak(utterance);
} catch (ex) {
  console.log('speechSynthesis not available', ex);
}
```

!!!.aside
To make sure your code works, I recommend wrapping your speech
synthesis call in a `try`/`catch` block, so if the page isn't activated, it
won't break the rest of your app.
!!!

There's nothing worse than going to a site and having it surprise you,
and the co-workers sitting around you.

## And more! {: #more }

These are just a few of the changes in Chrome 71 for developers, of course,
there's plenty more.

* The `Element.requestFullscreen()` method can now be
  [customized on Android](https://www.chromestatus.com/feature/5188650908254208)
  and allows you to choose between making the navigation bar visible versus a
  completely immersive mode where no user agent controls are shown until a
  user gesture is performed.
* The [default credentials mode for module script requests](https://www.chromestatus.com/feature/6710957388595200),
  has changed from `omit` to `same-origin`.
* And bringing Chrome inline with the
  [Shadow DOM v1 spec](https://w3c.github.io/webcomponents/spec/shadow/),
  Chrome 71 now calculates the specificity for the `:host()` and
  `:host-context()` pseudo classes as well as for the arguments for
  `::slotted()`.

## Chrome DevSummit Videos

If you didn't make it to Chrome Dev Summit, or maybe you did, but didn't
see all the talks, check out the
[Chrome Dev Summit 2018 playlist](https://www.youtube.com/playlist?list=PLNYkxOF6rcIDjlCx1PcphPpmf43aKOAdF)
on our YouTube channel.

{% youtube id="25aCD5XL1Jk"%}

Eva and Phil went into some neat techniques for using service workers in
[Building Faster, More Resilient Apps with Service Workers](https://www.youtube.com/watch?v=25aCD5XL1Jk&t=0s&index=9&list=PLNYkxOF6rcIDjlCx1PcphPpmf43aKOAdF).

{% youtube id="ipNW6lJHVEs"%}

Mariko and Jake talked about how they build [Squoosh](https://squoosh.app/) in
[Complex JS-heavy Web Apps, Avoiding the Slow](https://www.youtube.com/watch?v=ipNW6lJHVEs&t=104s&index=11&list=PLNYkxOF6rcIDjlCx1PcphPpmf43aKOAdF).

{% youtube id="reztLS3vomE"%}

Katie and Houssein covered some great techniques to maximize the performance
of your site in
[Speed Essentials: Key Techniques for Fast Websites](https://www.youtube.com/watch?v=reztLS3vomE&t=1s&index=8&list=PLNYkxOF6rcIDjlCx1PcphPpmf43aKOAdF).

{% youtube id="CbU9GzgS0HY" %}

Jake **dropped** the cake. And there are plenty of other great videos in the
[Chrome DevSummit 2018 playlist](https://www.youtube.com/playlist?list=PLNYkxOF6rcIDjlCx1PcphPpmf43aKOAdF),
so check them out.

### Subscribe

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I'm Pete LePage, and as soon as Chrome 72 is released, I'll be right
here to tell you -- what's new in Chrome!

[mdn-reltimefmt]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl.RelativeTimeFormat
[css3-td-spec]: https://www.w3.org/TR/css-text-decor-3/
[css3-td-line]: https://www.w3.org/TR/css-text-decor-3/#text-decoration-style-property
[css3-td-style]: https://www.w3.org/TR/css-text-decor-3/#text-decoration-style-property
[css3-td-color]: https://www.w3.org/TR/css-text-decor-3/#text-decoration-color-property
[css3-td-position]: https://www.w3.org/TR/css-text-decor-3/#text-underline-position-property
