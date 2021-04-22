---
title: New in Chrome 90
description: >
  Chrome 90 is rolling out now! There's a new value for the CSS overflow property. The Feature Policy API has been renamed to Permissions Policy. And there's a new way to implement and use Shadow DOM directly in HTML. Plus there's plenty more.
layout: 'layouts/blog-post.njk'
date: 2021-04-13
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/FMaoCN3rkw1HtillSRJ1.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-90
---

<style>
  .nic90-box {
    font-size: 64px;
    font-family: arial;
    font-weight: bold;
    border: 4px solid black;
    padding: 0 4px;
    width: 225px;
    overflow-wrap: normal;
    line-height: normal
  }
  .nic90-clip {
    overflow: clip;
  }
</style>

{% Aside %}
Chrome 90 is starting to roll out to stable now, and in honor of Chrome 90,
the video is '90s style. Enjoy!
{% endAside %}


{% YouTube id='h3MONldIoNM' %}

Here's what you need to know:

* There's a new value for the CSS [`overflow`](#overflow-clip) property.
* The Feature Policy API has been renamed to [Permissions Policy](#permission-policy).
* And there's a new way to implement and use [Shadow DOM](#declarative)
  directly in HTML.
* I owned several jackets almost exactly like this in the 1990s.
* And, there's [plenty more](#more).

I'm [Pete LePage](https://twitter.com/petele), and I've got the *411* for
developers in Chrome 90, *doin' it 1990's style!*

## Prevent overflow with `overflow: clip` {: #overflow-clip }

<div class="float-right nic90-box">
CSS IS AWESOME
</div>

CSS is all that and a bag of chips! But, I think every web developer has seen
and experienced something that overflows awkwardly at some point. There's a
great post on CSS Tricks about [different ways to handle the overflow][css-tricks-awesome],
for example, using `overflow: hidden`, or `auto`.

In the [CSS Overflow Spec][css-overflow-spec], there's a new `clip` property
that works similarly to `hidden`.

<div style="clear:both;"></div>

{% Columns %}
{% Column %}

```css
.overflow-clip {
  overflow: clip;
}
```

{% endColumn %}
{% Column %}

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/cpWAwVTCytqgKryptFQh.png", alt="Square box with text CSS is awesome, where awesome overflows out of the box", width="458", height="472" %}

{% endColumn %}
{% endColumns %}

Using `overflow: clip` makes it possible for you to prevent any type of
scrolling for the box, including programmatic scrolling. That means the box
is not considered a scroll container; it does not start a new formatting
context, which gives it better performance than `overflow: hidden`. And if
you need it, you can apply clipping to a single axis via `overflow-x`
and `overflow-y`.

Oh, and FYI - there's also `overflow-clip-margin`, which allows you to expand
the clip border. This is useful for cases where there is ink overflow that should be
visible.

{% Columns %}
{% Column %}

```css
.overflow-clip {
  overflow: clip;
  overflow-clip-margin: 25px;
}
```

{% endColumn %}
{% Column %}

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/GSyCxP6F48a9tJ0U5HAh.png", alt="Square box with text CSS is awesome, where awesome overflows out of the box", width="506", height="488" %}

{% endColumn %}
{% endColumns %}

See `overflow: clip` in action at <https://petele-css-is-awesome.glitch.me/>

## Feature Policy is now Permissions Policy {: #permission-policy}

Back in Chrome 74, we introduced the [Feature Policy API][feature-policy-intro],
which allows you to selectively enable, disable, and modify the behavior of
certain APIs and web features in the browser. These policies are a contract
between you and the browser. They inform the browser about what your intent is.

If your code, or any of the third party libraries you use violate your
preselected rules, the browser overrides the behavior with better UX or
just says, "talk to the hand," blocking the API altogether.

Starting in Chrome 90, the Feature Policy API will be renamed
Permissions Policy, and the HTTP header has been renamed along with it. At
the same time, the community has settled on a new syntax, based on Structured
Field Values for HTTP.

{% Columns %}
{% Column %}

### Chrome 90 and later

```http
Permissions-Policy: geolocation=()
```

{% endColumn %}
{% Column %}

### Chrome 89 and earlier

```http
Feature-Policy: geolocation 'none'
```

{% endColumn %}
{% endColumns %}

If you're interested in how to use this on your site, check out
[Introduction to Feature Policy][feature-policy-intro].

## Declarative Shadow DOM {: #declarative }

[Shadow DOM][shadow-dom], part of the Web Components standard, provides a way
to scope CSS styles to a specific DOM subtree and isolate that subtree from
the rest of the document. Until now, the only way to use Shadow DOM was to
construct a shadow root using JavaScript.

```js
const host = document.getElementById('host');
const opts = {mode: 'open'};
const shadowRoot = host.attachShadow(opts);
const html = '<h1>Hello Shadow DOM</h1>';
shadowRoot.innerHTML = html;
```

This works fine for client-side rendering, but not so well in server side
rendering where there is no built in way to express Shadow Roots in the server
generated HTML. But, starting in Chrome 90, with the Declarative Shadow DOM,
you're good to go. You can create shadow roots using only HTML.

A Declarative Shadow Root is a `<template>` element with a `shadowroot`
attribute. It's detected by the HTML parser and immediately applied as the
shadow root of its parent element.

```html
<host-element>
  <template shadowroot="open">
    <slot></slot>
  </template>
  <h2>Light content</h2>
</host-element>
```

Loading the pure HTML markup results in this DOM tree:

```html
<host-element>
  #shadow-root (open)
  <slot>
    ↳
    <h2>Light content</h2>
  </slot>
</host-element>
```

This gives us the benefits of Shadow DOM's encapsulation and slot projection
in static HTML. No JavaScript is needed to produce the entire tree, including
the Shadow Root.

Check out [Declarative Shadow DOM][dec-sha-dom] on web.dev for more details.

## And more {: #more }

And of course there's plenty more.

To help improve privacy, and even loading speeds for users visiting sites
that support HTTPS, Chrome's [address bar will use `https://` by default][https-by-default].
And if you haven't set up an automatic redirect from HTTP to HTTPS, now would
be a great time to do that.

And an [AV1 encoder][av1-encoder] is shipping in Chrome desktop that is
specifically optimized for video conferencing with WebRTC integration.

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 90.

* [What's new in Chrome DevTools (90)](/blog/new-in-devtools-90/)
* [Chrome 90 deprecations & removals](/blog/deps-rems-90/)
* [ChromeStatus.com updates for Chrome 90](https://www.chromestatus.com/features#milestone%3D90)
* [What's new in JavaScript in Chrome 90](https://v8.dev/blog/v8-release-90)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/89.0.4389.75..90.0.4430.71)

## Subscribe

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I'm Pete LePage, and as soon as Chrome 91 is released, I'll be right here to
tell you what's new in Chrome!

## A special shout out

I had a lot of fun shooting this 1990s themed episode of New in Chrome. Huge
thanks to Sean Meehan for the idea and for bringing together the amazing
folks who helped open the time warp to 1990.

{% Columns %}
{% Column %}

GDS Design

* Fola Akinola
* Derek Bass
* Christopher Bodel
* Nick Krusick
* Chris Walker

{% endColumn %}
{% Column %}

Sound Design & Additional Music

* Bryan Gordon

{% endColumn %}
{% endColumns %}

And of course, Loren Borja, Lee Carruthers, and Lukas Holcek who work on all of
my New in Chrome videos and make me look way better than I actually am.
THANK YOU!

[css-tricks-awesome]: https://css-tricks.com/css-is-awesome/
[css-overflow-spec]: https://www.w3.org/TR/css-overflow-3/
[feature-policy-intro]: https://developers.google.com/web/updates/2018/06/feature-policy
[shadow-dom]: https://developers.google.com/web/fundamentals/web-components/shadowdom
[dec-sha-dom]: https://web.dev/declarative-shadow-dom/
[https-by-default]: https://blog.chromium.org/2021/03/a-safer-default-for-navigation-https.html
[av1-encoder]: https://www.chromestatus.com/feature/6206321818861568
