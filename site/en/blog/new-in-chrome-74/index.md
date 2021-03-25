---
title: New in Chrome 74
description: >
  Just in time for Google I/O, Chrome 74 is landing now! It adds support for
  private class fields; allows you to detect when the user has requested a
  reduced motion experience; adds support for CSS transition events, and
  plenty more. Let's dive in and see what's new for developers in Chrome 74!
layout: 'layouts/blog-post.njk'
date: 2019-04-23
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/HFZ8vPVlnY7StZ7DUOOB.png'
alt: 'Cropped Chrome logo on the left, version number on the right.'
tags:
  - new-in-chrome
  - chrome-74
---

{% YouTube id='zBlItTR8BsY' %}

In Chrome 74, we've added support for:

* Creating [private class fields](#private-class-fields) in JavaScript is now
  much cleaner.
* You can detect when the user has requested a
  [reduced motion experience](#prefers-reduced-motion) experience.
* CSS [transition events](#transition-events)
* Adds new [feature policy APIs](#feature-policy-api) to check if features are
  enabled or not.

And there's [plenty more](#more)!

I'm [Pete LePage](https://twitter.com/petele). Let's dive in and see
what's new for developers in Chrome 74!

## Change log

This covers only some of the key highlights, check the links below for
additional changes in Chrome 74.

* [What's new in Chrome DevTools (74)](/blog/new-in-devtools-74)
* [Chrome 74 deprecations & removals](https://developers.google.com/web/updates/2019/03/chrome-74-deps-rems)
* [ChromeStatus.com updates for Chrome 74](https://www.chromestatus.com/features#milestone%3D74)
* [What's new in JavaScript in Chrome 74](https://v8.dev/blog/v8-release-74)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/73.0.3683.74..74.0.3729.108)

## Private class fields {: #private-class-fields }

Class fields simplify class syntax by avoiding the need for constructor
functions just to define instance properties. In Chrome 72, we added support for
[public class fields](/blog/new-in-chrome-72/#public-class-fields).

```js
class IncreasingCounter {
  // Public class field
  _publicValue = 0;
  get value() {
    return this._publicValue;
  }
  increment() {
    this._publicValue++;
  }
}
```

And I said private class fields were in the works. I'm happy to say that
private class fields have landed in Chrome 74. The new private fields syntax is
similar to public fields, except you mark the field as being private by using a
`#` (pound sign). Think of the `#` as being part of the field name.

```js
class IncreasingCounter {
  // Private class field
  #privateValue = 0;
  get value() {
    return this.#privateValue;
  }
  increment() {
    this.#privateValue++;
  }
}
```

Remember, `private` fields are just that, **private**. They're accessible
inside the class, but not available outside the class body.

```js
class SimpleClass {
  _iAmPublic = 'shared';
  #iAmPrivate = 'secret';
  doSomething() {
    ...
  }
}
```

To read more about public and private classes, check out Mathias's post on
[class fields](https://developers.google.com/web/updates/2018/12/class-fields).

## `prefers-reduced-motion` {: #prefers-reduced-motion }

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/nUa8d2JtpVfYhsWBCXPf.png", alt="", className="float-right", height="493", width="472" %}

Some users have reported getting motion sick when viewing parallax scrolling,
zooming, and other motion effects. To address this, many operating systems
provide an option to reduce motion whenever possible.

Chrome now provides a media query, `prefers-reduced-motion` - part of
[Media Queries Level 5 spec][mq-spec], that allows you to detect when this
option is turned on.

<br style="clear:both;">

```css
@media (prefers-reduced-motion: reduce)
```

Imagine I have a sign-up button that draws attention to itself with a slight
motion. The new query lets me shut off the motion for just the button.

```css
button {
  animation: vibrate 0.3s linear infinite both;
}

@media (prefers-reduced-motion: reduce) {
  button {
    animation: none;
  }
}
```

Check out Tom's article
[Move Ya! Or maybe, don't, if the user prefers-reduced-motion!][p-r-m-a] for
more details.

[mq-spec]: https://drafts.csswg.org/mediaqueries-5/#descdef-media-prefers-reduced-motion
[p-r-m-a]: https://developers.google.com/web/updates/2019/03/prefers-reduced-motion

## CSS `transition` events {: #transition-events }

The CSS Transitions specification requires that
[transition events][transition-events] are sent when a transition is enqueued,
starts, ends, or is canceled. These events have been supported in other
browsers for a while…

But, until now, they weren't supported in Chrome. In Chrome 74 you can now
listen for:

* `transitionrun`
* `transitionstart`
* `transitionend`
* `transitioncancel`

By listening for these events, its possible to track or change behavior when a
transition is run.

[transition-events]: https://www.w3.org/TR/css-transitions-1/#transition-events

## Feature policy API updates {: #feature-policy-api }

Feature policies, allow you to selectively enable, disable, and modify the
behavior of APIs and other web features. This is done either through the
Feature-Policy header or through the allow attribute on an iframe.

```http
Feature-Policy: geolocation 'self'
```

```html
<iframe ... allow="geolocation self">
</iframe>
```

Chrome 74 introduces a new set of APIs to check which features are enabled:

* You can get a list of features allowed with
  `document.featurePolicy.allowedFeatures()`.
* You can check if a specific feature is allowed with
  `document.featurePolicy.allowsFeature(...)`.
* And, you can get a list of domains used on the current page that allow a
  specified feature with `document.featurePolicy.getAllowlistForFeature()`.

Check out the
[Introduction to Feature Policy post](https://developers.google.com/web/updates/2018/06/feature-policy)
for more details.

## And more! {: #more }

These are just a few of the changes in Chrome 74 for developers, of course,
there's plenty more. Personally, I'm pretty excited about
[KV Storage](https://developers.google.com/web/updates/2019/03/kv-storage),
a super fast, async, key/value storage service, available as an origin trial.

### Google I/O is happening soon!

And don't forget - [Google I/O](https://events.google.com/io/) is just a few
weeks away (May 7th to 9th) and we'll have lots of great new stuff for you.
If you can't make it, all of the sessions will be live streamed, and will be
available on our
[Chrome Developers YouTube channel](https://youtube.com/user/ChromeDevelopers/)
afterwards.

### Subscribe

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I'm Pete LePage, and as soon as Chrome 75 is released, I'll be right
here to tell you -- what's new in Chrome!
