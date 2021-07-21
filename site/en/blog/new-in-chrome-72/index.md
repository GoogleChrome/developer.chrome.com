---
title: New in Chrome 72
description: >
  In Chrome 72, creating public class fields in JavaScript is now much
  cleaner, you can see if a page has been activated with the new User
  Activation API, localizing lists becomes way easier, and there's plenty
  more. Let's dive in and see what's new for developers in Chrome 72!
layout: 'layouts/blog-post.njk'
date: 2019-01-29
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/sYYui5SaqQZI9nZDBepb.png'
alt: 'Cropped Chrome logo on the left, version number on the right.'
tags:
  - new-in-chrome
  - chrome-72
---

{% YouTube id='coh1k7TY1P0' %}

In Chrome 72, we've added support for:

* Creating [public class fields](#public-class-fields) in JavaScript is now
  much cleaner.
* You can see if a page has been activated with the new
  [User Activation API](#user-activation)
* Localizing lists becomes way easier with the [`Intl.format()`](#intl-format) API.

And there's [plenty more](#more)!

I'm [Pete LePage](https://twitter.com/petele). Let's dive in and see
what's new for developers in Chrome 72!

## Change log

This covers only some of the key highlights, check the links below for
additional changes in Chrome 72.

* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/71.0.3578.82..72.0.3626.82)
* [ChromeStatus.com updates for Chrome 72](https://www.chromestatus.com/features#milestone%3D72)
* [Chrome 72 deprecations & removals](https://developers.google.com/web/updates/2018/12/chrome-72-deps-rems)

## Public class fields {: #public-class-fields }

My first language was Java, and learning JavaScript threw me for a bit of a
loop. How did I create a class? Or inheritance?  What about public and private
properties and methods? Many of the recent updates to JavaScript that make
object oriented programming much easier.

I can now create [classes][mdn-classes], that work like I expect them
to, complete with constructors, getters and setters, static methods and public
properties.

Thanks to V8 7.2, which ships with Chrome 72, you can now declare public class
fields directly in the class definition, eliminating the need to do it in the
constructor.

```js
class Counter {
  _value = 0;
  get value() {
    return this._value;
  }
  increment() {
    this._value++;
  }
}

const counter = new Counter();
console.log(counter.value);
// → 0
counter.increment();
console.log(counter.value);
// → 1
```

Support for private class fields is in the works!

More details are in Mathias's article on
[class fields](https://developers.google.com/web/updates/2018/12/class-fields)
for more details.

[mdn-classes]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

## User Activation API {: #user-activation }

Remember when sites could automatically play sound as soon as the page loaded?
You scramble to hit the mute key, or figure out which tab it was, and close it.
That's why some APIs require activation via a user gesture before they'll work.
Unfortunately, browsers handle activation in different ways.

<figure class="float-right">
  {% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/nxkCXLWEz4O6H8mXdanT.png", alt="", height="603", width="800" %}
  <figcaption>
    User activation API before and after user has interacted with the page.
  </figcaption>
</figure>

Chrome 72 introduces User Activation v2, which simplifies user activation for
all gated APIs. It's based on a new [specification][ua-spec] that aims to
standardize how activation works across all browsers.

There's a new `userActivation` property on both `navigator` and `MessageEvent`,
that has two properties: `hasBeenActive` and `isActive`:

* `hasBeenActive` indicates if the associated window has ever seen a user
  activation in its lifecycle.
* `isActive` indicates if the associated window currently has a user
  activation in its lifecycle.

More details are in [Making user activation consistent across APIs][ua-doc]

[ua-doc]: https://developers.google.com/web/updates/2019/01/user-activation
[ua-spec]: https://html.spec.whatwg.org/multipage/interaction.html#activation

## Localizing lists of things with `Intl.format` {: #intl-format }

I love the `Intl` APIs, they're super helpful for localizing content into
other languages! In Chrome 72, there's a new `.format()` method that makes
rendering lists easier. Like other `Intl` APIs, it shifts the burden to the
JavaScript engine, without sacrificing performance.

Initialize it with the locale you want, then call `format`, and it'll use the
correct words and syntax. It can do conjunctions - which adds the localized
equivalent of *and* (and look at those beautiful oxford commas). It can do
disjunctions - adding the local equivalent of *or*. And by providing some
additional options, you can do even more.

```js
const opts = {type: 'disjunction'};
const lf = new Intl.ListFormat('fr', opts);
lf.format(['chien', 'chat', 'oiseau']);
// → 'chien, chat ou oiseau'
lf.format(['chien', 'chat', 'oiseau', 'lapin']);
// → 'chien, chat, oiseau ou lapin'
```

Check out the [Intl.ListFormat API](https://developers.google.com/web/updates/2018/12/intl-listformat)
post for more details!

## And more! {: #more }

These are just a few of the changes in Chrome 72 for developers, of course,
there's plenty more.

* Chrome 72 changes the behavior of `Cache.addAll()` to better match the spec.
  Previously, if there were duplicate entries in the same call, later requests
  would simply overwrite the first. To match the spec, [if there are duplicate
  entries, it will reject with an `InvalidStateError`][add-all-change].
* Requests for favicons are now handled by the service worker, as long as the
  request URL is on the same origin as the service worker.

[add-all-change]: https://developers.google.com/web/updates/2018/10/tweaks-to-addAll-importScripts#deprecating_repeated_urls_passed_to_cacheaddall

### Subscribe

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I'm Pete LePage, and as soon as Chrome 73 is released, I'll be right
here to tell you -- what's new in Chrome!
