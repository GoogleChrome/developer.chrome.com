---
title: New in Chrome 95
description: >
  Chrome 95 is rolling out now! Routing gets easier with URLPattern baked into
  the browser, the Eye Dropper API provides a built in tool for selecting
  colors, there's a new origin trial that allows you to opt into receiving
  the reduced UA string now, and there's plenty more.
layout: 'layouts/blog-post.njk'
date: 2021-10-19
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/ptevTBjXOxAsTIKeZjGD.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-95
---

{% YouTube id='Qq4rRt8BNjM' %}

Here's what you need to know:

* Routing gets easier with [`URLPattern`](#urlpattern) baked into the browser.
* The [Eye Dropper API](#eyedropper) provides a built in tool for selecting
  colors.
* There's a new origin trial that allows you to opt into receiving the
  [reduced UA string](#reduced-ua-ot) now.
* The [PWA Summit](#pwa-summit) videos are all online.
* And there's plenty [more](#more).

I'm [Pete LePage](https://petelepage.com), working, and shooting
from home, let's dive in and see what's new for developers in Chrome 95.

## Routing with `URLPattern` {: #urlpattern }

Nearly all web apps depend on routing in some way whether it's code running
on a server that maps a path to files on disk or logic in a single-page app
that updates the DOM when the URL changes. `URLPattern` is a new web
platform API that standardizes routing pattern syntax.

It builds on the foundation of existing frameworks, making it easier to perform
common routing tasks. For example, matching against full URLs, or a URL
pathname, then returning information about the token and group matches.

If you're already familiar with the routing syntax used in [Express][expr-routing],
Ruby on Rails, or [path-to-regexp][p2r-npm], this will probably look familiar.

To use it, create a new `URLPattern()` and provide the details you want to
pattern match against. Patterns can contain wildcards, named token groups,
regular expression groups, and group modifiers.

```js
const p = new URLPattern({
  protocol: 'https',
  hostname: 'example.com',
  pathname: '/:folder/*/:fileName.jpg',
  search: '*',
  hash: '*',
});
```

For example, let's look at the `URLPattern` that might be used by Google Docs.
We'll specify the `kind` of file, the file `ID`, and what `mode` to open it in.
Then to use the pattern, we can call either `test()`, or `exec()`.

```js
const url = 'https://docs.google.com/document/d/1s...5c/edit#heading=h.8...c';

const pattern = new URLPattern({
  pathname: '/:kind/d/:fileID/:mode',
  hash: '*',
});

const r = pattern.exec(url);
// {
//   "pathname": {"groups": {
//     "fileID": "1s...5c",
//     "kind": "document",
//     "mode": "edit"
//   }, ...},
//   "hash": {"groups": {"0":"heading=h.8...c"}, ...},
//   ...
// }
```

`URLPattern` is enabled by default in Chrome and Edge version 95 and above.
And for browsers or environments like Node, that don't support it yet,
you can use the [urlpattern-polyfill][urlpatt-pf] library.

Check out Jeff's article [URLPattern brings routing to the web platform][wd-urlpatt]
for complete details!

## Picking colors with the Eye Dropper API {: #eyedropper }

Almost every design app I've ever used has an eye dropper tool, making it
easy to figure out what color something is. Some browsers have eyedropper
capability built into `<input type=color>`, but it's not ideal.

The eye dropper API, implemented by some of the folks at Microsoft brings
that functionality to the web. To use it, create a new `EyeDropper()`
instance, then call `open()` on it.

```js
const eyeDropper = new EyeDropper();
const result = await eyeDropper.open();
// result = {sRGBHex: '#160731'}
```

Like many other modern web APIs, it works asynchronously, so that it
doesn't block the main thread. When the user clicks on the color they want,
it'll resolve with the color they clicked on.

You can try out a quick [demo][eyedropper-demo], and see the
[code][eyedropper-code] on Glitch.

## PWA Summit {: #pwa-summit }

Did you catch the PWA Summit earlier this month?

It was great to see so many folks talking about PWAs and sharing their
experiences. If you missed it, the videos are all up, so be sure to check it
out at [PWASummit.org][pwasummit] or the
[PWA Summit YouTube channel][pwasummit-yt].

## User-agent reduction origin trial {: #reduced-ua-ot }

[User-Agent Reduction][reduced-ua-crb] is an effort to reduce passive
finger-printing surfaces, by reducing the information in the User-Agent
string to only the browser's brand and significant version, its desktop or
mobile distinction, and the platform it's running on.

Starting in Chrome 95, there's a new [origin trial][reduced-ua-ot-post] that
allows you to opt into receiving the reduced UA string now. This will enable
you to discover and fix problems before the reduced UA becomes the default
behavior in Chrome.

The changes will be applied incrementally over a number of releases, but
everything you need to prepare and test is ready right now.

All of the details and timeline are in the
[User-Agent Reduction origin trial][reduced-ua-ot-post] post on
[developer.chrome.com][dcc].

## And more! {: #more }

Of course there's plenty more.

* If you've been following the [Storage Foundation API][sfound] work, there's
  a new [origin trial for Access Handles][sfound-ot].
* WebAssembly now provides [exception handling support][wasm-ex-ot], which
  allows code to break control flow when an exception is thrown.
* Chrome *100* is coming next year. Which means it's time to make sure your
  code can handle more than **two** digits!

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 95.

* [What's new in Chrome DevTools (95)](/blog/new-in-devtools-95/)
* [Chrome 95 deprecations & removals](/blog/deps-rems-95/)
* [ChromeStatus.com updates for Chrome 95](https://www.chromestatus.com/features#milestone%3D95)
* [What's new in JavaScript in Chrome 95](https://v8.dev/blog/v8-release-95)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/94.0.4606.56..95.0.4638.56)
* [Chrome release calendar](https://chromiumdash.appspot.com/schedule)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5)
to [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I'm Pete LePage, and as soon as Chrome 96 is released, I'll be right here to
tell you what's new in Chrome!

[dcc]: /blog/
[webdev]: https://web.dev
[p2r-npm]: https://www.npmjs.com/package/path-to-regexp
[expr-routing]: https://expressjs.com/en/guide/routing.html
[urlpatt-pf]: https://github.com/kenchris/urlpattern-polyfill
[wd-urlpatt]: https://web.dev/urlpattern/
[eyedropper-demo]: https://eyedropper-sample.glitch.me/
[eyedropper-code]: https://glitch.com/edit/#!/eyedropper-sample?path=script.js
[pwasummit]: https://pwasummit.org
[pwasummit-yt]: https://www.youtube.com/channel/UC1j3gvdVISAEO1_2MwA5oQw/videos
[reduced-ua-crb]: https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html
[reduced-ua-ot-post]: https://developer.chrome.com/blog/user-agent-reduction-origin-trial/
[sfound]: https://chromestatus.com/feature/5670244905385984
[sfound-ot]: https://developer.chrome.com/origintrials/#/view_trial/3378825620434714625
[wasm-ex-ot]: https://developer.chrome.com/origintrials/#/view_trial/2393663201947418625
