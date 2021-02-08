---
title: New in Chrome 57
description: >
  With Chrome 57, you can now use display: grid for grid based layouts, use
  the media session API to customize the lock screen and notifications with
  information about the media being played, and more. Pete LePage has all
  the details and how you can use these new developer features in Chrome 57!
layout: 'layouts/blog-post.njk'
date: 2017-03-08
updated: 2017-04-19
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/3ISvS8m03zhH24iy9TKv.png'
alt: 'Cropped Chrome logo on the left, version number on the right.'
tags:
  - new-in-chrome
  - chrome-57
---

{% YouTube id='57Scec2XPd0' %}

* Chrome 57 adds support for [`display: grid`](#gridlayout) - the new
  CSS Grid Layout specification.
* You can now customize and respond to user input on the lock screen and
  notifications using the new [Media Session API](#mediasession).
* And there are plenty [more](#andmore)!

I'm Pete LePage, let's dive in and see what's new for developers in Chrome 57!

## CSS grid layout {: #gridlayout }

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/U0lsMmYyKqvglQi6H5Kt.png", alt="", className="float-right", height="516", width="800" %}

Flexbox is a powerful layout tool. It makes many complex layouts possible,
but it can only do layout in one dimension. Chrome 57 adds support for
[`display: grid`](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids) -
the new [CSS Grid Layout specification](https://www.w3.org/TR/css3-grid-layout/),
adding a powerful new tool for creating two-dimensional grid-based layout
systems, optimized for responsive user interface design.

Elements within the grid can span multiple columns or rows. Regions in a
CSS grid can also be named, making layout code easier to understand.

Surma has an [Updates post](https://developers.google.com/web/updates/2017/01/css-grid)
about it, and when you're ready to dive in deeper, check out
[Rachel Andrew's](https://twitter.com/rachelandrew) site:
[GridByExample.com](http://gridbyexample.com/).

## Media Session API {: #mediasession }

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/VAKU1oILMIgkAZQyFxNZ.png", alt="", className="float-left", height="532", width="800" %}

One of the missing features from web media applications has been the
ability to deeply integrate with the core media experience on mobile devices.
In Chrome for Android, you can now customize the lock screen and notifications
with media content using the new [Media Session API](https://wicg.github.io/mediasession/).

By providing [metadata](https://developers.google.com/web/updates/2017/02/media-session#set_metadata)
to the browser about the content being played, you can create rich lock screen
messaging that includes information such as title, artist, album name, and
artwork. You can also listen for and
[respond to user actions](https://developers.google.com/web/updates/2017/02/media-session#previous_track_next_track)
taken on the notification itself, such as seeking or skipping.

If you want to get started quickly, Francois has a great
[Updates post](https://developers.google.com/web/updates/2017/02/media-session),
or check out the official
[Chrome media sessions samples repo](https://googlechrome.github.io/samples/media-session/)
on GitHub.

## And more! {: #andmore }

And there's lots more!

* There are [some](https://developers.google.com/web/updates/2017/01/payment-request-updates)
  [improvements](https://developers.google.com/web/updates/2017/01/payment-request-updates#paymentmethoddata_supports_basic-card)
  to the Payment Request API.
* You can specify the color of the text input cursor with the
  [`caret-color`](https://www.chromestatus.com/feature/5720917787279360)
  property.
* Visual effects such as line color and style can be specified with new
  [`text-decoration`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration)
  properties.
* The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  [Response class](https://developer.mozilla.org/en-US/docs/Web/API/Response)
  now supports the
  [`.redirected`](https://developer.mozilla.org/en-US/docs/Web/API/Response/redirected)
  attribute to help avoid untrustworthy responses and reduce the risk of open
  redirectors.
* All `-webkit-` prefixed [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
  global aliases have been removed, after
  their deprecation in M38.
* And one of my favorites &mdash; new
  [`padStart`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)
  and
  [`padEnd`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd)
  formatting methods that simplify string padding when aligning console output
  or printing numbers with a fixed number of digits.

These are just a few of the changes in Chrome 57 for developers.

## Shout out to Igalia

Finally, a big shout out to the engineers and team at
[Igalia](https://www.igalia.com/) for their awesome work on Blink. They
were instrumental on landing the new CSS Grid and `caret-color` features.

## Stay up to date

If you want to stay up to date with Chrome and know what's coming, be sure to
[subscribe](https://goo.gl/6FP1a5) to our channel, or follow
[@ChromiumDev](//twitter.com/chromiumdev) on Twitter. And be sure to check out the
[videos from the Chrome Dev Summit](https://www.youtube.com/playlist?list=PLNYkxOF6rcIBTs2KPy1E6tIYaWoFcG3uj)
for a deeper dive into some of the awesome things the Chrome team is working on.

I'm Pete LePage, and as soon as Chrome 58 is released, I'll be right here
to tell you -- what's new in Chrome!
