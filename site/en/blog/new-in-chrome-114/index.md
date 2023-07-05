---
title: New in Chrome 114
description: >
  Chrome 114 is rolling out now! Chrome 114 is rolling out now! With text-wrap: balance to improve text layouts, Cookies Having Independent Partitioned State are here, the new Popover API makes popovers easier than ever, and there’s plenty more.
layout: 'layouts/blog-post.njk'
date: 2023-05-30
authors:
  - ajara
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/hY1Jhm9rglpkrvoegKyu.jpg'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-114
---

{% YouTube id='qqTnAWL7-v0' %}

Here's what you need to know:

* CSS [`text-wrap: balance`] (#text-wrap-balance) is available to improve text layouts.
* Cookies partitioned by top level site ([CHIPS](#chips)) are here.
* Popovers are easier than ever with the [Popover API](#popover-api).
* And there’s plenty [more](#more).

I’m Adriana Jara. Let’s dive in and see what’s new for developers in Chrome 114.

## `text-wrap:balance`. {: #text-wrap-balance}

Use `text-wrap: balance` to improve text layouts. The animation below shows the difference you can make with this one line.

<figure>
  {% Video
    src="video/vS06HQ1YTsbMKSFTIPl2iogUQP73/qJKWQGssebOIDGVBtLpo.mp4",
    autoplay="true",
    loop="true",
    muted="true",
    controls="true"
  %}

  <figcaption>
    <a href="https://codepen.io/web-dot-dev/pen/KKxjpQm">
      Try a demo
    </a>
  </figcaption>
</figure>

As a developer, you don’t know the final size, font size, or even language of text. All variables are needed for an effective treatment of text wrapping. Since the browser does know all the factors, with text-wrap:balance you can request the browser to figure out the best balanced line wrapping solution.

{% Img src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/lnGFtchLIPk9RnHSurHg.png", alt="The two previous examples are shown together, one is marked as unbalanced and the other as balanced.", width="800", height="371" %}

The balanced text block is more pleasing to the eye of a reader. It grabs attention better and is overall easier to read.

Balancing headlines will and should be the primary use case for `text-wrap: balance`. There is a performance cost to balance the text, so to mitigate the cost it only works for up to four lines.

Check out [this article](/blog/css-text-wrap-balance/) with samples and more details to improve your text layouts.

## CHIPS: Cookies Having Independent Partitioned State. {: #chips }

[CHIPS (Cookies Having Independent Partitioned State)](/docs/privacy-sandbox/chips/), enables opting-in to third-party cookies being partitioned by top-level site using the new cookie attribute `Partitioned`.

Before CHIPS, when a user visits site A, embedded site C could set a cookie on the user's machine. If the user then visits site B which also embeds site C, site C could access the same cookie that was set on site A. This allows site C to compile a user's browsing activity across site A,  B, and every site that it is embedded on.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/4eKoilhldt8qdmiEvEDo.jpg", alt="Diagram showing sites and storage with unpartitioned cookies.", width="800", height="450" %}

While cross-site tracking is an issue, there are valid cross-site cookie needs which can be achieved in a privacy-preserving way with cookie partitioning.

With CHIPS when a user visits site A and embedded content from site C sets a cookie with the Partitioned attribute, the cookie is saved in a partitioned jar only for cookies that site C sets when it's embedded on site A. The browser would only send that cookie when the top-level site is A.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/Myb2Km4gEVROgCi5NZFQ.png", alt="Diagram showing sites and paritioned storage with cookies.", width="800", height="393" %}

When the user visits a new site, for example site B, site C would not receive the cookie that was set when C was embedded in site A.

Checkout [this article](/docs/privacy-sandbox/third-party-cookie-phase-out/)  for more details about the process to phase out third party cookies.

## The Popover API. {: #popover-api }

With the [Popover API](https://developer.mozilla.org/docs/Web/API/Popover_API) it is easier to  build transient user interface (UI) elements that are displayed on top of all other web app UI.

These include user-interactive elements like action menus, form element suggestions, content pickers, and teaching UI.

The new popover attribute enables any element to be displayed in the [top layer](/blog/top-layer-devtools/) automatically. This means no more worrying about positioning, stacking elements, focus or keyboard interactions for the developer.

This is similar to the [`<dialog>`](https://developer.mozilla.org/docs/Web/HTML/Element/dialog) element, but has several important differences, including light-dismiss behavior, popover interaction management, and event support, and the lack of a "modal" mode.

Checkout [this article](/blog/introducing-popover-api) for more information.

## And more! {: #more }

Of course there’s plenty more.

* DevTools lets you pause and debug C and C++ code in WebAssembly apps with [DWARF support](/blog/new-in-devtools-114/#wasm).
* The `exclusionFilters` option in [`navigator.bluetooth.requestDevice()`](https://developer.mozilla.org/docs/Web/API/Bluetooth/requestDevice) allows web developers to exclude some devices from the browser picker..
* There is an origin trial for [Background Blur](/origintrials/#/view_trial/2228155915641552897).

## Further reading

This covers only some key highlights. Check the links below for
additional changes in Chrome 114.

* [What's new in Chrome DevTools (114)](/blog/new-in-devtools-114/)
* [Chrome 114 deprecations and removals](/blog/deps-rems-114/)
* [ChromeStatus.com updates for Chrome 114](https://chromestatus.com/features#milestone%3D114)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/113.0.5672.177..114.0.5735.53)
* [Chrome release calendar](https://chromiumdash.appspot.com/schedule)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5) to the
[Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

Yo soy Adriana Jara, and as soon as Chrome 115 is released, I'll be right here to
tell you what's new in Chrome!
