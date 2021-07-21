---
title: New In Chrome 54
description: >
  With Chrome 54, you can now create your own custom HTML tag with and make
  re-usable web components with <b>Custom Elements v1</b>; it's easier to send
  messages between open windows or tabs on the same origin with the
  BroadcastChannel API; media experience get better on Android and foreign fetch
  is now available as an origin trial.
layout: 'layouts/blog-post.njk'
date: 2016-10-18
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/ZnBf6Txfx1pb3DLfiWt6.png'
alt: 'Cropped Chrome logo on the left, version number on the right.'
tags:
  - new-in-chrome
  - chrome-54
---

Note: I'm trying something new with the latest video release of New In Chrome,
in addition to posting it on YouTube, I've posted a fully annoted version
of the script. It includes all of the relevant links I mentioned, and a few
other helpful links. Leave your thoughts in the comments and let me know
if this is useful to you!

{% YouTube id="qPD2yc8BoDk" %}

[Watch on YouTube](https://www.youtube.com/watch?v=qPD2yc8BoDk)

* You can now create your own custom HTML tag with and make re-usable web
components with [Custom Elements v1](#custom-elements).
* It's easier to send messages between open windows or tabs on the same origin
with the [BroadcastChannel API](#broadcast-channel).
* [Media experience get better](#request-full-screen) on Android and
[foreign fetch](#foreign-fetch) is now available as an origin trial.

I'm Pete LePage, let's dive in and see what's new for developers in Chrome 54!

## Custom elements v1 {: #custom-elements }

Complex user interfaces often require a large amount of HTML. Most
languages allow developers to create their own components built on top
of language primitives to mitigate this kind of verbosity. But until now,
creating reusable components on the web has been difficult.

Custom elements allow you to create your own custom HTML tags, and define
the new element's API and behavior in JavaScript. The result, a
browser-native way to build reusable, interoperable components.

Chrome 54 provides support for the latest custom elements
[V1 spec](https://goo.gl/9luiog), and will continue to support the
[V0 API](https://goo.gl/iJA2rJ) until enough of you have moved to V1.

Check out our [primer on custom elements](https://goo.gl/7MhkyV) to how
you can use it to create reusable web components for your site or application.

## BroadcastChannel API {: #broadcast-channel }

It is not uncommon for desktop users to have multiple windows or tabs
open simultaneously, and some sites even encourage this behavior, such as
web editors that open documents in their own tabs.

Communicating between those tabs can be difficult. The
[`BroadcastChannel` API](https://goo.gl/xDGxJT) is a new one-to-many messaging
API between windows, tabs, iframes, web workers, and service workers. It
allows scripts to establish named channels to send messages between
browsing contexts of the same origin.

### Other `BroadcastChannel` resources

* [Spec](https://goo.gl/Lek3U0)
* [Polyfill](https://developers.google.com/web/updates/2016/09/broadcastchannel#feature_detection_and_browser_support)

## `requestFullScreen` {: #request-full-screen }

Media is an increasingly important part of the browsing experience.

In addition to a user gesture, you can now use
[`Element.requestFullScreen()`](https://goo.gl/7ALaod)
to trigger full screen mode after a
[screen orientation change](https://goo.gl/knihpA) - and allows you to
create richer media experiences that include rotate to full screen.

## Foreign fetch {: #foreign-fetch }

Imagine if a commonly used origin like an API provider, web font service
or other service had the ability to deploy its own service worker.

Instead of always going to the network, the provider could implement
their own custom networking logic, and take advantage of a single,
authoritative cache instance for storing its responses.

Now, thanks to foreign fetch, which is available in Chrome 54 as an
origin trial, it's a reality. Check out
[Jeffrey's post](https://goo.gl/BWt5RA) linked in the comments below!

## Closing

These are just a few of the changes in Chrome 54 for developers.

Check the description for more details and links the documentation and
specifications.

Oh, and don't forget to check out the
[Chrome Dev Summit](/devsummit/), we'll be streaming
it on YouTube on November 10th and 11th.

If you want to stay up to date with Chrome and know what's coming, click
that [Subscribe](https://goo.gl/6FP1a5) button up there.

I'm Pete LePage, and as soon as Chrome 55 is released, I'll be
right here to tell you -- what's new in Chrome!
