---
title: New in Chrome 120
description: >
  Chrome 120 is rolling out now! With the CloseWatcher API to enable a consistent experience when handling close requests, an easy implementation of an accordion pattern using the <details> element, permission policy violation reports are now available and there’s plenty more.
layout: 'layouts/blog-post.njk'
date: 2023-12-05
authors:
  - ajara
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/x1r942xIGh8P7YqRffrj.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-120
---

{% YouTube id='oqCsXbsuvM0' %}

Here's what you need to know:

* The [CloseWatcher API](#close-watcher) enables a consistent experience when handling close requests.
*  Easily implement an accordion pattern using the [`<details>` element](#details-name).
*  [Permission policy violation reports](#policy-violation-reports) are now available.
*  And there’s plenty [more](#more).

I’m Adriana Jara. Let’s dive in and see what’s new for developers in Chrome 120.

## CloseWatcher API. {: #close-watcher}

An important feature of modal or popup components is that they are easy to close,with a consistent mechanism for doing so. Those mechanisms are called close requests, they are typically the `ESC` key on desktop platforms, and the back gesture or button on Android.

Web developers had no good way to handle close requests for their own components. This is especially problematic on Android devices, where providing the simple closing behavior for the back gesture is quite complex.

Chrome 120 brings the solution with CloseWatcher, a new API for directly listening and responding to close requests. It also includes upgrades to [`<dialog>`](https://developer.mozilla.org/docs/Web/HTML/Element/dialog)  and [`popover=""`](https://developer.mozilla.org/docs/Web/API/Popover_API) to use the new close request framework, so that they respond to the Android back button.

Checkout [the CloseWatcher API demo](https://close-watcher-demo.glitch.me/) to give it a try.

## `<details>` name attribute {: #details-name }

The `name` attribute for the [`<details>`](https://developer.mozilla.org/docs/Web/HTML/Element/details) element makes it easy to implement the accordion pattern using a sequence of `<details>` HTML elements.

Multiple `<details>` elements that have the same `name` form a group. With this setup at most one element in that group can be opened at once.

Here is an example with a group that shares the name `cookies`:

```html
<details>
  <summary>Chocolate chip</summary>
  Yum yum chocolate chip.
</details>
<details>
  <summary>Snickerdoodle</summary>
   Yum yum snickerdoodle.
</details>
<details>
  <summary>Maicenitas</summary>
   Yum yum maicenitas.
</details>
<details>
  <summary>Sugar cookies</summary>
   Yum yum sugar cookies.
</details>

```

## Permission policy violation reports {: #policy-violation-reports }

Permissions policy violation reports are now available, these reports integrate the [Permissions policy API](https://developer.mozilla.org/docs/Web/HTTP/Permissions_Policy) that allows developers to control the browser features available to a page, its iframes, and subresources, by declaring a set of policies for the browser to enforce with the [Reporting API](https://developer.mozilla.org/docs/Web/API/Reporting_API). The Reporting API provides a generic reporting mechanism for web applications to use to make reports available based on several platform features.

This Permissions Policy API and Reporting API integration allows web developers to configure endpoints, to which permissions policy violation reports will be sent, allowing site owners to see when disallowed features are being requested for their pages in the field.

[Controlling browser features with Permissions Policy](/articles/permissions-policy/) includes more implementation details.


## And more! {: #more }

Of course there’s plenty more.

* The [relaxed CSS nesting implementation](/blog/css-nesting-relaxed-syntax-update/) allows nested style rules to begin with an element, rather than being wrapped with is() or requiring an ampersand in front.

* With the [`enterpictureinpicture`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement/enterpictureinpicture_event) action in the Media Session API, websites can register an action handler which can be used to open a Picture-in-Picture or Document Picture-in-Picture window.

* And a reminder that Chrome is working towards deprecating third party cookies. In January an experiment begins that could affect your website, so it's important that you check [Preparing for the end of third-party cookies](/blog/cookie-countdown-2023oct/) for auditing and mitigating steps.

## Further reading

This covers only some key highlights. Check the links below for
additional changes in Chrome 120.

* [What's new in Chrome DevTools (120)](/blog/new-in-devtools-120/)
* [Chrome 120 deprecations and removals](/blog/deps-rems-120/)
* [ChromeStatus.com updates for Chrome 120](https://chromestatus.com/features#milestone%3D120)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/119.0.6045.203..120.0.6099.63)
* [Chrome release calendar](https://chromiumdash.appspot.com/schedule)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5) to the
[Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

Yo soy Adriana Jara, our team wishes you happy holidays and as soon as Chrome 121 is released, I'll be right here to tell you what's new in Chrome!