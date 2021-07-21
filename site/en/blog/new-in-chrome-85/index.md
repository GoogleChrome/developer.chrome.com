---
title: New in Chrome 85
description: >
  Chrome 85 is rolling out now! You can improve rendering performance with
  content-visibility: auto. CSS properties can now be set… in CSS. You can
  now check if your Windows app or PWA is installed with the
  getInstalledRelatedApps() API. App icon shortcuts work on Windows too
  (for real this time). There's an origin trial for fetch upload streaming.
  And lots more. Let's dive in and see what's new for developers in Chrome 85!
layout: 'layouts/blog-post.njk'
date: 2020-08-25
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/Zf7lfxl3DBPw30UdTjbF.jpg'
alt: 'Cropped Chrome logo on the left, version number on the right.'
tags:
  - new-in-chrome
  - chrome-85
---

Chrome 85 is starting to roll out to stable now.

{% YouTube id='htAiPOarIwI' %}

Here's what you need to know:

* You can improve rendering performance with
  [`content-visibility: auto`](#content-visibility).
* [CSS properties](#css-properties) can now be set… **in CSS**.
* You can now check if your Windows app or PWA is installed with
  [`getInstalledRelatedApps()`](#gira).
* [App icon shortcuts](#app-shortcuts) work on Windows too (for real this time).
* An origin trial for [`fetch` upload streaming](#fetch-stream) has started.
* And [more](#more).

I'm [Pete LePage](https://twitter.com/petele), working and shooting from home,
let's dive in and see what's new for developers in Chrome 85!

## Content Visibility {: #content-visibility }

<figure class="float-right">
  {% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/aPo72AQPvTn4s9kdI7Cm.png", alt="", height="408", width="800" %}
  <figcaption>
    Browsers rendering process
  </figcaption>
</figure>

Turning your HTML into something the user can see, requires the browser to go
through a number of steps before it can even paint the first pixel.
And it does it for the whole page, even for content that isn't visible in the
viewport.

Applying `content-visibility: auto` to an element, tells the browser that it
can skip the rendering work for that element until it scrolls into the
viewport, providing a faster initial render.

<br style="clear:both;">

```css
.my-class {
  content-visibility: auto;
}
```

To get the most impact out of `content-visibility`, apply it to parent
sections with more complex layout algorithms, like `flexbox`, and `grid`, or
that have children with contained layouts of their own.

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/liWPW8kNA0dsiJGv28rg.jpg", alt="", height="554", width="800" %}

By chunking content and adding `content-visibility: auto;`, this page went
from a rendering time of 232ms to only 30ms.

Check out the [content visibility](https://web.dev/content-visibility/) to see
how you can use it to improve your rendering performance.

## `@property` and CSS variables {: #css-properties }

CSS variables, technically called custom properties, are awesome. With the
Houdini CSS Properties and Values API, you can define a type and default
fallback value for your custom properties. I previously covered them in
[New in Chrome 78](https://developers.google.com/web/updates/2019/10/nic78),
when we added support for defining them in JavaScript.

Starting in Chrome 85, you can also define and set CSS properties directly
in your CSS. What I love about CSS Properties - is that it gives the property
semantic meaning,  fallback values, and even enables CSS testing.

```css
@property --colorPrimary {
  syntax: '<color>';
  initial-value: magenta;
  inherits: false;
}
```

Una has a great post
[`@property`: giving superpowers to CSS variables](https://web.dev/at-property/)
that shows you how you can use them.

## Get installed related apps {: #gira }

The `getInstalledRelatedApps()` API makes it possible for *you* to check if
*your* app is installed, then, customize the user experience.

For example, show different content to the user on a landing page if your app
is already installed. Centralize overlapping functionality in one app to
prevent confusion. Or, if your native app is already installed, don't promote
the installation of your PWA.

When it first shipped in [Chrome 80](https://developers.google.com/web/updates/2020/02/nic80),
it only worked for Android apps. Now, on Android, it can also check if your
PWA is installed. **And** on Windows, it can check if your Windows UWP app is
installed.

```js
const relatedApps = await navigator.getInstalledRelatedApps();
relatedApps.forEach((app) => {
  console.log(app.id, app.platform, app.url);
});
```

Check out my article
[Is your app installed? `getInstalledRelatedApps()` will tell you!](https://web.dev/get-installed-related-apps/)
on web.dev to see how it works, and how to sign your apps to prove they're
yours.

## App Icon Shortcuts {: #app-shortcuts }

<figure class="float-right">
  {% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/9zcJuaBsNnskaZByurvY.png", alt="", height="420", width="800" %}
  <figcaption>
    App icon shortcut on Windows
  </figcaption>
</figure>

In Chrome 84, we added support for App Icon Shortcuts. I accidentally said
they were available everywhere, but they were only available on Android.
Now, in Chrome 85, they're available on **Android** and **Windows**, and in
both Chrome and Edge.

<br style="clear:both;">

```json
"shortcuts": [
  {
    "name": "Open Play Later",
    "short_name": "Play Later",
    "description": "View the list you saved for later",
    "url": "/play-later",
    "icons": [
      { "src": "//play-later.png", "sizes": "192x192" }
    ]
  }
]
```

Check out the [App Icon Shortcuts](https://web.dev/app-shortcuts/) article on
web.dev for complete details, and I'm sorry for the confusion I caused.

## Origin Trial: Streaming requests with `fetch()` {: #fetch-stream }

Starting in Chrome 85, `fetch` upload streaming is available as an origin
trial. It lets you start a fetch before the request body is ready. Previously,
you could only start a request once you had the whole body ready to go. But
now, you can start sending content, even while you're still generating it.

```javascript
const { readable, writable } = new TransformStream();

const responsePromise = fetch(url, {
  method: 'POST',
  body: readable,
});
```

For example, use it to warm up the server, or stream audio or video as it's
captured from the microphone or camera.

Jake has an in-depth look in
[Streaming requests with the fetch API](https://web.dev/fetch-upload-streaming/)
on web.dev, and also covered it in the latest
[HTTP203 - Streaming requests with fetch](https://www.youtube.com/watch?v=G9PpImUEeUA)
video.

## And more {: #more }

Of course, there's plenty more.

`Promise.any` returns a promise that is fulfilled by the first given promise
to be fulfilled or rejected.

```javascript
try {
  const first = await Promise.any(arrayOfPromises);
  console.log(first);
} catch (error) {
  console.log(error.errors);
}
```

Replacing all instances in a string is easier with `.replaceAll()`, no more
regular expressions!

```javascript
const myName = 'My name is Bond, James Bond.'
    .replaceAll('Bond', 'Powers')
    .replace('James', 'Austin');
console.log(myName);
// My name is Powers, Austin Powers.
```

Chrome 85 adds decode support for [AVIF](https://aomediacodec.github.io/av1-avif/),
an image format encoded with AV1 and standardized by the
[Alliance for Open Media](http://aomedia.org/). AVIF offers significant
compression gains vs. JPEG and WebP, with a recent
[Netflix study](https://netflixtechblog.com/avif-for-next-generation-image-coding-b1d75675fe4)
showing 50% savings vs. standard JPEG and > 60% savings on 4:4:4 content.

And [AppCache removal has begun](https://web.dev/appcache-removal/).

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 85.

* [What's new in Chrome DevTools (85)](/blog/new-in-devtools-85)
* [Chrome 85 deprecations & removals](https://developers.google.com/web/updates/2020/07/chrome-85-deps-rems)
* [ChromeStatus.com updates for Chrome 85](https://www.chromestatus.com/features#milestone%3D85)
* [What's new in JavaScript in Chrome 85](https://v8.dev/blog/v8-release-85)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/84.0.4147.92..85.0.4183.85)

## Subscribe

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I'm Pete LePage, and I finally  **got** a hair cut!

As soon as Chrome 86 is released, I'll be right here to tell you -- what's
new in Chrome!
