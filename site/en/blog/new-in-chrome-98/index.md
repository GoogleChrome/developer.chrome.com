---
title: New in Chrome 98
description: >
  Chrome 98 is rolling out now! If you’ve signed up
  for the Auto Dark Theme origin trial, there’s a new way to opt out at a per
  element level. There’s now support for COLRv1, an evolution of the COLRv0
  font format. And there’s plenty more.
layout: 'layouts/blog-post.njk'
date: 2022-02-01
updated: 2022-02-08
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/Eme4o8bSchfthB5p9g2R.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-98
---

{% YouTube id='VLjOIiOt7Do' %}

Here's what you need to know:

* If you’ve tried the Auto Dark Theme origin trial, there’s a new way to
  [opt out at a per element level](#autodark-opt-out).
* There’s now support for [COLRv1](#colrv1), an evolution of the COLRv0 font
  format.
* And there's plenty [more](#more).

I'm [Pete LePage](https://petelepage.com). Let's dive in and
see what's new for developers in Chrome 98.

## Opting out of auto-dark themes on Android {: #autodark-opt-out }

In Chrome 96, we started an origin trial for
[Auto Dark Themes on Android][dcc-autodark].

With this feature, if your site is light themed and the user’s OS is in dark
mode, the browser applies an automatically generated dark theme to your site.

If you've signed up for the origin trial, and you want to opt out of the
automatically generated dark theme for a specific page, you can use a meta tag.

```html
<meta name="color-scheme" content="only light">
```

Or you can opt-out by setting `color-scheme: only light` on the `:root`
element.

```css
:root {
  color-scheme: only light;
}
```

But the main advantage of this method, is that you can opt out on a
per-element basis by applying a specific style to that element.

```css
.only-light,
#my-element {
  color-scheme: only light;
}
```

Check out the [How to opt-out of Auto Dark Theme][dcc-autodark-optout] section
in [Auto Dark Themes on Android][dcc-autodark] for complete details.

## COLRv1 font support {: #colrv1 }

In Chrome 98, there’s now [support for COLRv1][dcc-colrv1], an evolution of
the COLRv0 font format. It adds gradients, compositing and blending, and
improved shape reuse for crisp and compact font files that compress well.

A color font makes visual highlights, headlines, and banners really pop out.

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/qTY5GIw3dMKnQARZZeGx.png", alt="Headline using COLRv1 fonts", width="800", height="661" %}

One of my favorite use cases for COLRv1 means consistent emojis across all
platforms. You don't need to replace emojis with image files, because font
files become smaller, and easier to include on your page.

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/1UL0zMDpXPEQnKNlXk3U.png", alt="Font file using consistent emoji", width="640", height="612" %}

We’re working on ways to improve feature detection, since it’s not as easy as
it should be yet. But this is something to keep an eye on.

Check out [COLRv1 Color Gradient Vector Fonts in Chrome 98][dcc-colrv1] for
more details and how you can create your own fonts.

## Emulate Chrome 100 in the UA string {: #chrome-100 }

In just a few months, we'll hit Chrome 100, a **three** digit version number.
Any code that checks version numbers, or parses the UA string, should be
checked to make sure it handles three digits.

There's a flag called [`#force-major-version-to-100`][cr-100-flag] that
will change the current version number to 100, so you can make sure
everything works as expected.

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/4drS8JxKXgtzSAxyM6WF.png", alt="Chrome flags page highlighting the new #force-major-version-to-100 option", width="800", height="533" %}

## And more! {: #more }

Of course there's plenty more.

[CORS preflight requests][cs-preflight] are now sent ahead of private
network requests for subresources, asking for explicit permission from the
target server.

There’s a new origin trial for [Region Capture][ot-region-capture], an API for
cropping a self-capture video track. Ideal for screen sharing in video
conferencing apps so you don’t create a hall of mirror effect!

Window overlay controls had been planned for Chrome 98, but due to issues found
at the last minute, did not make it in. We are still working on it, and
expect to see it land in the next few releases.

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 98.

* [What's new in Chrome DevTools (98)](/blog/new-in-devtools-98/)
* [Chrome 98 deprecations and removals](/blog/deps-rems-98/)
* [ChromeStatus.com updates for Chrome 98](https://www.chromestatus.com/features#milestone%3D98)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/97.0.4692.71..98.0.4758.88)
* [Chrome release calendar](https://chromiumdash.appspot.com/schedule)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5)
to [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I'm Pete LePage, and as soon as Chrome 99 is released, I'll be right here to
tell you what's new in Chrome!

[dcc]: /blog/
[cr-100-flag]: https://developer.chrome.com/blog/force-major-version-to-100/
[wd-wco]: https://web.dev/window-controls-overlay/
[dcc-autodark]: https://developer.chrome.com/blog/auto-dark-theme/
[dcc-autodark-optout]: https://developer.chrome.com/blog/auto-dark-theme/#per-element-opt-out
[dcc-colrv1]: https://developer.chrome.com/blog/colrv1-fonts/
[ot-region-capture]: https://developer.chrome.com/origintrials/#/view_trial/2257429313219461121
[cs-preflight]: https://chromestatus.com/feature/5737414355058688
