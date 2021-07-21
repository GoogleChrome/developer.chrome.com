---
title: New in Chrome 76
description: >
  Chrome 76 is rolling out now! It adds support for the prefers-color-scheme
  media query, bringing dark mode to websites. An install button in the
  omnibox to make installation of Progressive Web Apps on desktop easier.
  A way to prevent the mini-infobar from appearing on mobile. Increases the
  frequency with which WebAPKs are updated. And plenty more. Let's dive in
  and see what's new for developers in Chrome 76!
layout: 'layouts/blog-post.njk'
date: 2019-07-30
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/kS8fRQ4HauGHQ7n4dIJp.png'
alt: 'Cropped Chrome logo on the left, version number on the right.'
tags:
  - new-in-chrome
  - chrome-76
---

{% YouTube id='I1nosVzVbB4' %}

In Chrome 76, we've added support for:

* [`prefers-color-scheme`](#dark-mode) media query, bringing dark mode to
  websites.
* An [install button in the omnibox](#pwa-install) to make installation of
  Progressive Web Apps on desktop easier.
* [Preventing the mini-infobar from appearing](#prevent-mini-infobar) on
  Progressive Web Apps on mobile.
* More frequent [updates of WebAPKs](#update-webapk).
* And plenty [more](#more).

I'm [Pete LePage](https://twitter.com/petele), let's dive in and see
what's new for developers in Chrome 76!

## PWA Omnibox Install Button {: #pwa-install }

{# TODO(petele): video element, float-right, auto-play #}
<figure class="float-right">
{% Video src=[
  "video/0g2WvpbGRGdVs0aAPc6ObG7gkud2/PK7Qq8FyeMg2DDRL3XQT.webm",
  "video/0g2WvpbGRGdVs0aAPc6ObG7gkud2/bh7RkIIECjmXkIdToJdq.mp4"
]%}
</figure>

In Chrome 76, we're making it easier for users to install Progressive Web Apps
on the desktop, by adding an install button to the address bar, sometimes
called the omnibox.

If your site meets the
[Progressive Web App installability criteria][pwa-install-criteria], Chrome
will show an install button in the omnibox indicating to the user that your
PWA can be installed. If the user clicks the install button, it's essentially
the same as calling `prompt()` on the `beforeinstallprompt` event;
it shows the install dialog, making it easy for the user to install your PWA.

See [Address Bar Install for Progressive Web Apps on the Desktop][pwa-install]
for complete details.

[pwa-install-criteria]: https://developers.google.com/web/fundamentals/app-install-banners/#criteria
[pwa-install]: https://developers.google.com/web/updates/2019/06/pwa-install-addressbar

<br style="clear:both;">

## More control over the PWA mini-infobar {: #prevent-mini-infobar }

<figure class="float-right">
  {% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/e8QdF96TkOMv3pzLAVYN.png", alt="", height="417", width="800" %}
  <figcaption>
    Example of the Add to Home screen mini-infobar for AirHorner
  </figcaption>
</figure>

On mobile, Chrome shows the [mini-infobar][mini-infobar] the first time a user visits your
site if it meets the [Progressive Web App installability criteria][pwa-install-criteria].
We heard from you that you want to be able to prevent the mini-infobar from
appearing, and provide your own install promotion instead.

Starting in Chrome 76, calling `preventDefault()` on the `beforeinstallprompt`
event will stop the mini-infobar from appearing.

```js
window.addEventListener('beforeinstallprompt', (e) => {
  // Don't show mini-infobar
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to promote PWA installation
  pwaInstallAvailable(true);
});
```

Be sure to update your UI - to let users know your PWA can be installed.
Check out [Patterns for Promoting PWA Installation][patterns-mobile] for
our recommend best practices for promoting the installation of your
Progressive Web Apps.

[patterns-mobile]: https://developers.google.com/web/fundamentals/app-install-banners/promoting-install-mobile
[mini-infobar]: https://developers.google.com/web/fundamentals/app-install-banners/#mini-info-bar

## Faster updates to WebAPKs {: #update-webapk }

When a Progressive Web App is installed on Android, Chrome automatically
requests and installs a [Web APK][web-apk]. After it's been installed,
Chrome periodically checks if the web app manifest has changed,
maybe you've updated the icons, colors, or changed the app name, to see if
a new WebAPK is required.

Starting in Chrome 76, Chrome will check the manifest more frequently;
checking every day, instead of every three days. If any of the key properties
have changed, Chrome will request and install a new WebAPK, ensuring the
title, icons and other properties are up to date.

See [Updating WebAPKs More Frequently][updating-webapk] for complete details.

[web-apk]: https://developers.google.com/web/fundamentals/integration/webapks
[updating-webapk]: https://developers.google.com/web/updates/2019/06/webapk-update-frequency

## Dark mode {: #dark-mode }

Many operating systems now support a dark mode, or dark theme.

The `prefers-color-scheme` media query, allows you to adjust the look and feel
of your site to match the user's preferred mode.

```css
@media (prefers-color-scheme: dark) {
  body {
    background-color: black;
    color: white;
  }
}
```

Tom has a great article [Hello darkness, my old friend][dark-article] on
[web.dev](https://web.dev/blog/) with everything you need to know, plus tips
for architecting your style sheets to support both a light,
and a dark mode.

[dark-article]: https://web.dev/prefers-color-scheme/

## And more! {: #more }

These are just a few of the changes in Chrome 76 for developers, of course,
there's plenty more.

### `Promise.allSettled()`

Personally, I'm really excited about `Promise.allSettled()`. It's similar to
`Promise.all()`, except it waits until all of the promises are settled before
returning.

```js
const promises = [
  fetch('/api-call-1'),
  fetch('/api-call-2'),
  fetch('/api-call-3'),
];
// Imagine some of these requests fail, and some succeed.

await Promise.allSettled(promises);
// All API calls have finished (either failed or succeeded).
```

### Reading blobs is easier

`Blob`s are easier to read with three new methods: `text()`, `arrayBuffer()`,
and `stream()`; this means we don't have to create a wrapper around file
reader any more!

```js
// New easier way
const text = await blob.text();
const aBuff = await blob.arrayBuffer();
const stream = await blob.stream();

// Old, wrapped reader
return new Promise((resolve) => {
  const reader = new FileReader();
  reader.addEventListener('loadend', (e) => {
    const text = e.srcElement.result;
    resolve(text);
  });
  reader.readAsText(file);
});
```

### Image support in the async clipboard API

And, we've added support for
[images to the Asynchronous Clipboard API][img-async-clipboard], making it
easy to programmatically copy and paste images.

[img-async-clipboard]: https://developers.google.com/web/updates/2019/07/image-support-for-async-clipboard

## Further reading

This covers only some of the key highlights, check the links below for
additional changes in Chrome 76.

* [What's new in Chrome DevTools (76)](/blog/new-in-devtools-76)
* [Chrome 76 deprecations & removals](https://developers.google.com/web/updates/2019/06/chrome-76-deps-rems)
* [ChromeStatus.com updates for Chrome 76](https://www.chromestatus.com/features#milestone%3D76)
* [What's new in JavaScript in Chrome 76](https://v8.dev/blog/v8-release-76)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/75.0.3770.67..76.0.3809.88)

## Subscribe

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I'm Pete LePage, and as soon as Chrome 77 is released, I'll be right
here to tell you -- what's new in Chrome!
