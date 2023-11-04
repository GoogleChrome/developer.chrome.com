---
title: New in Chrome 100
description: >
  Chrome 100 is rolling out now with a three digit version number. Take a
  stroll down memory lane and celebrate #100CoolWebMoments since Chrome's
  first release. There are some important changes to the user agent string.
  The Multi-Screen Window Placement API makes it possible to enumerate the
  displays connected to a user's machine, and place windows on specific
  screens. And there's plenty more!
layout: 'layouts/blog-post.njk'
date: 2022-03-29
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/yezj4CV8NRdONDSUmpWr.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-100
---

{% YouTube id='VK7oR5vLluk' %}

Here's what you need to know:

* Chrome 100 has a [three digit version](#chrome100) number
* Take a stroll down memory lane and celebrate
  [#100CoolWebMoments](#100coolwebmoments) since Chrome's first release.
* There are some important changes to the [user agent string](#reduced-ua).
* The [Multi-Screen Window Placement API](#multi-screen-window-placement)
  makes it possible to enumerate the displays connected to a user's machine,
  and place windows on specific screens.
* And there's plenty [more](#more).

I'm [Pete LePage](https://petelepage.com). Let's dive in and
see what's new for developers in Chrome 100.

## Chrome 100 {: #chrome100 }

When browsers first reached version 10, there were a few
issues as the major version number went from one digit to two. Hopefully,
we learned a few things that'll ease the transition from two digits to three.

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/oQI7f3mgM9NGOJPDnaaa.jpeg", alt="Chrome and Firefox logo", class="float-right", width="800", height="420" %}

Chrome 100 is available now, and Firefox 100 ships very soon. These three
digit version numbers have the potential to cause issues on sites that rely
on identifying the browser version in some way. Over the last few months, the
Firefox team, and the Chrome team, ran experiments in which the browser
reported version number 100, even though it wasn't.

This led to a few reported issues, many of which have already been fixed. But,
we still need your help.

* If you are a website maintainer, test your website with Chrome and
  Firefox 100.
* If you develop a User-Agent parsing library, add tests to parse versions
  greater than and equal to 100.

Check out [Chrome and Firefox soon to reach major version 100][cr-ff-100] on
[web.dev][wdev] for more details.

<div style="clear:both;"></div>

## 100 Cool Web Moments {: #100coolwebmoments }

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/xoRkeaLxlVNuvX1DrI0F.png", alt="100 Cool Web Moments promo image", class="float-right", width="656", height="369" %}

It's been exciting to watch the web grow, and see all the amazing stuff you've
built over the last 100 Chrome releases. We thought it would be fun to take a
stroll down memory lane and celebrate [#100CoolWebMoments][100moments] that
have happened in the last 14 years.

Tell us which moments you loved the most. If we've missed anything (and we're
sure we have), tweet us [@Chromiumdev][tw-crdev] with
[#100CoolWebMoments][tw-100mom]. Enjoy!

<div style="clear:both;"></div>

## Reduced User-Agent string {: #reduced-ua }

Speaking of the user agent, Chrome 100 will be the last version to support an
unreduced User-Agent string by default. This is part of a strategy to replace
use of the User-Agent string, with the new
[User-Agent Client Hints API][ua-cli-hints].

Starting in Chrome 101, the user agent will be gradually reduced.

Check out [User Agent Reduction Origin Trial and Dates][ua-r-ot-d] on the
[Chromium blog][crblog], to learn more about what will be removed, and when.

## Multi-screen window placement API {: #multi-screen-window-placement }

For some apps, opening new windows and putting them in specific places, or
specific displays is an important feature. For example, when using Slides to
present, I want the slides to appear full screen on the primary display,
and my speaker notes to appear on the other display.

The Multi-Screen Window Placement API makes it possible to enumerate the
displays connected to the user's machine, and place windows on specific screens.

You can quickly check if there's more than one screen connected to the
device with `window.screen.isExtended`.

```js
const isExtended = window.screen.isExtended;
// returns true/false
```

But, the key functionality is in `window.getScreenDetails()`, which provides
details about the attached displays.

```js
const x = await window.getScreenDetails();
// returns
// {
//    currentScreen: {...}
//    oncurrentscreenchange: null
//    onscreenschange: null
//    screens: [{...}, {...}]
// }
```

For example, you can determine the primary screen, then use
`requestFullscreen()` to make an element full screen on that display.

```js
try {
  const screens = await window.getScreenDetails();
  const primary = screens
         .filter((screen) => screen.primary)[0]
  await elem.requestFullscreen({ screen: primary });
} catch (err) {
  console.error(err);
}
```

And it provides a way to listen for changes, for example if a new display is plugged in or removed, the resolution changes, and so on.

```js
const screens = await window.getScreenDetails();
let numScreens = screens.screens.length;
screens.addEventListener('screenschange', (event) => {
  if (screens.screens.length !== numScreens) {
    console.log('Screen count changed');
    numScreens = screens.screens.length;
  }
});
```

Check out Tom's updated article
[Managing several displays with the Multi-Screen Window Placement API][wd-mswp]
on [web.dev][wdev] for a deeper dive.

## And more! {: #more }

Of course there's plenty more.

There's a new `forget()` method for HID Devices that allow you to revoke a
permission to an HID Device that was granted by a user.

```js
// Request an HID device.
const [device] = await navigator.hid.requestDevice(opts);


// Then later, revoke permission to the device.
await device.forget();
```

And for WebNFC, the `makeReadOnly()` method allows you to make NFC tags
permanently read-only.

```js
const ndef = new NDEFReader();
await ndef.makeReadOnly();
```

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 100.

* [What's new in Chrome DevTools (100)](/blog/new-in-devtools-100/)
* [Chrome 100 deprecations and removals](/blog/deps-rems-100/)
* [ChromeStatus.com updates for Chrome 100](https://www.chromestatus.com/features#milestone%3D100)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/99.0.4844.48..100.0.4896.63.48)
* [Chrome release calendar](https://chromiumdash.appspot.com/schedule)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5) to the
[Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I'm Pete LePage, and as soon as Chrome 101 is released, I'll be right here to
tell you what's new in Chrome!

[dcc]: /blog/
[cr-ff-100]: https://web.dev/chrome-firefox-100/
[wdev]: https://web.dev/
[100moments]: /100
[tw-crdev]: https://twitter.com/ChromiumDev
[tw-100mom]: https://twitter.com/hashtag/100CoolWebMoments
[ua-r-ot-d]: https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html
[ua-cli-hints]: https://web.dev/user-agent-client-hints/
[cr-blog]: https://blog.chromium.org/
[wd-mswp]: https://web.dev/multi-screen-window-placement/
