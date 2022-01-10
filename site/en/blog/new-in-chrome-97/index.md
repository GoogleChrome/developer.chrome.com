---
title: New in Chrome 97
description: >
  Chrome 97 is rolling out now! There's a new option for sending real time
  messages between the client and server using Web Transport. You can use
  feature detection to see what types of scripts a browser supports.
  JavaScript gets better, and there's plenty more.
layout: 'layouts/blog-post.njk'
date: 2022-01-04
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/wyAp9LdqGcmrwhShT0Yv.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-97
---

{% YouTube id='eXaog4gUIXI' %}

Here's what you need to know:

* [`WebTransport`](#webtransport) is a new option for sending real time messages
  between the client and server.
* You can use [feature detection](#script-type-feature-detection) to see what
  types of scripts a browser supports.
* [Searching arrays from the end](#new-array-prototypes) becomes a little
  easier.
* And there's plenty [more](#more).

Happy New Year! I'm [Pete LePage](https://petelepage.com). Let's dive in and
see what's new for developers in Chrome 97.

## Web Transport {: #webtransport }

If you're using Web Sockets or the WebRTC Data Channel API to send messages
between your server and the page, there's a new option for you. `WebTransport`
is a new API offering low-latency, bidirectional, client-server messaging.

It has lower latency than WebSockets, and unlike the RTC Data Channel API,
which is designed for peer-to-peer messaging, the Web Transport API is
specifically designed for client-server messaging.

It supports sending data, reliably with its streams APIs, and unreliably with
its datagram APIs. It's supported in web workers. And because it exposes a
Streams compliant interface, it supports optimizations around backpressure.

To use it, you'll need a server that supports HTTP/3, which is generally
easier than setting up and maintaining a WebRTC server. Open a new
`WebTransport` instance, wait for it to connect, and you can start sending
data.

```js
const url = 'https://example.com:4999/foo/bar';
const transport = new WebTransport(url);
await transport.ready;

const writer = transport.datagrams.writable.getWriter();
const data1 = new Uint8Array([65, 66, 67]);
writer.write(data1);
```

Check out the article [Experimenting with WebTransport][wd-webtransport] on
web.dev for complete details.

## Script type feature detection {: #script-type-feature-detection }

Today, we can use the [`nomodule` attribute][mdn-nomodule] to detect support
for JavaScript modules in the browser. But there are several new feature
proposals in the pipeline, like import maps, speculation rules, and bundle
preloading. We need a way to know what a browser supports.

Enter [`HTMLScriptElement.supports()`][crs-supports]. You can use it to
determine what types of scripts you can use, and send the browser the best
option.

```js
if (HTMLScriptElement.supports('importmap')) {
  // Use <script type="importmap" ...>
} else if (HTMLScriptElement.supports('module')) {
  // Use <script type="module" ...>
} else {
  // Use classic method...
}
```

## New array prototypes {: #new-array-prototypes }

I love it when JavaScript gets easier. `Array` and `TypedArray` now support
the `findLast()` and `findLastIndex()` static methods.

These functions are effectively the same as [`find()`][mdn-array-find] and
[`findIndex()`][mdn-array-find-index], but search from the end of an array
instead of the beginning.

For example, to find the last number in an array that is larger than ten,
call `findLast()` with a test function that checks if the value is greater
than ten, and you're good to go.

```js
const array1 = [5, 12, 8, 130, 44, 3, 6];

function greaterThanTen(val) {
  return val > 10;
}

const last = array1.findLast(greaterThanTen);
// 44

const lIdx = array1.findLastIndex(greaterThanTen);
// 4
```

## Emulate Chrome 100 in the UA string {: #chrome-100 }

In just a few months, we'll hit Chrome 100, a **three** digit version number.
Any code that checks version numbers, or parses the UA string, should be
checked to make sure it handles three digits.

There's a flag called [`#force-major-version-to-100`][cr-100-flag] that
will change the current version number to 100, so you can make sure
everything works as expected.

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/4drS8JxKXgtzSAxyM6WF.png", alt="Chrome flags page highlighting new #force-major-version-to-100 option", width="800", height="533" %}

## And more! {: #more }

Of course there's plenty more.

New lines in form entries are now [normalized][crs-normalized] in the same
way as Gecko and WebKit, improving interoperability between browsers.

We're standardizing client hint names by prefixing them with `sec-ch`.
For example, `dpr` becomes `sec-ch-dpr`. We'll continue to support existing
versions of these hints, but you should plan for their eventual deprecation
and removal.

Closed [`<details>` elements are now searchable][crs-details] and can be
linked to. These hidden elements will automatically expand when find in page,
`ScrollToTextFragment`, and element fragment navigation are used.

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 97.

* [What's new in Chrome DevTools (97)](/blog/new-in-devtools-97/)
* [Chrome 97 deprecations and removals](/blog/deps-rems-97/)
* [ChromeStatus.com updates for Chrome 97](https://www.chromestatus.com/features#milestone%3D97)
* [What's new in JavaScript in Chrome 97](https://v8.dev/blog/v8-release-97)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/96.0.4664.50..97.0.4692.71)
* [Chrome release calendar](https://chromiumdash.appspot.com/schedule)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5)
to [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I'm Pete LePage, and as soon as Chrome 98 is released, I'll be right here to
tell you what's new in Chrome!

[dcc]: /blog/
[cr-100-flag]: https://developer.chrome.com/blog/force-major-version-to-100/
[mdn-array-find]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
[mdn-array-find-index]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
[mdn-nomodule]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-nomodule
[wd-webtransport]: https://web.dev/webtransport/
[crs-supports]: https://chromestatus.com/feature/5712146835963904
[crs-normalized]: https://chromestatus.com/feature/5654547184746496
[crs-details]: https://chromestatus.com/feature/5032469667512320
