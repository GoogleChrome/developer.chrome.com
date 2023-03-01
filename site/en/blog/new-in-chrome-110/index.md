---
title: New in Chrome 110
description: >
  Chrome 110 is rolling out now! Add custom style to your picture-in-picture elements with the new :picture-in-picture pseudo-class, set your web app launch behavior with launch_handler, use the credentialless attribute in iframes to embed third party content that doesn’t set a cross origin embedder policy and there’s plenty more.
layout: 'layouts/blog-post.njk'
date: 2023-02-07
updated: 2023-02-08
authors:
  - ajara
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/jJI6JaytfRglmVkUULRm.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-110
---

{% YouTube id='036w1MUoAa0' %}

Here's what you need to know:

* Add custom style to your picture-in-picture elements with the new `:picture-in-picture` [pseudo class](#pip).
* Set your web app launch behavior with [launch_handler](#launch-handler) in your manifest.
* use the [`credentialless` attribute](#credentialless) in iframes to embed third party content that doesn’t set a Cross Origin Embedder Policy
* And there’s plenty [more](#more).

I’m Adriana Jara. Let’s dive in and see what’s new for developers in Chrome 110.


## :picture-in-picture pseudo class {: #pip }
With the [Picture-in-Picture API](https://developer.mozilla.org/docs/Web/API/Picture-in-Picture_API) websites can create a floating video window, always on top so that users continue consuming media, while interacting with other content.

Now with the [`:picture-in-picture` css pseudo-class](https://developer.mozilla.org/docs/Web/CSS/:picture-in-picture) you can add styles to the elements to improve the experience.

The snippet below shows how to use the picture-in-picture class to add a message to the video container that reminds the user the video is now playing somewhere else.

```css
#video-container:has(video:picture-in-picture)::before {
  bottom: 36px;
  color: #ddd;
  content: 'Video is now playing in a Picture-in-Picture window';
  position: absolute;
  right: 36px;
}
```

Use the pseudo-class again on the video element, to make the element transparent to display the message correctly.

Play with [the example](https://googlechrome.github.io/samples/picture-in-picture/css-pseudo-class) and improve your picture-in-picture video experiences.

## launch_handler manifest member. {: #launch-handler }

The [Launch Handler API](/docs/web-platform/launch-handler/) lets you control how your web app launches For example, whether it uses an existing or a new window, and whether the chosen window is navigated to the launch URL.

Let’s look at an example: in desktop environments, if you install an app and then visit it on the browser, there is a button to move to the standalone app window.
Previously, the only possible behavior was to launch the app in a new window.

Now, using the [`launch_handler` manifest member](/docs/web-platform/launch-handler/#the-launch_handler-manifest-member) web apps can customize their launch behavior.

For example, the snippet below causes all this web app’s launches to focus on an existing app window and navigate to it (if it exists) instead of always launching a new window.

```json
{
 "launch_handler": {
   "client_mode": "navigate-new"
 }
}

```


## `credentialless` iframes. {: #credentialless }
One of the biggest challenges with cross origin isolation is that all cross-origin iframes must deploy [COEP](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy) and [CORP](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy) . An iframe without those headers will not be loaded by the browser.

The `credentialless` attribute helps to embed third-party iframes that don't set these headers.

With `credentialless`, the iframe is loaded from a different, empty context. In particular, it is loaded without cookies. The iframe starts with an empty cookie jar.

Likewise, storage APIs such as LocalStorage, CacheStorage, and so on, load and store data in the new ephemeral partition. All this storage is cleared once the top-level document is unloaded. This allows for removing the COEP restriction.

Find more information in [this article](/blog/iframe-credentialless/) to securely use `credentialless` to load third party content into your iframes.

## And more! {: #more }

And of course there is plenty more.

Web SQL is now removed in non-secure contexts.

The CSS [`initial-letter` property](https://developer.mozilla.org/docs/Web/CSS/initial-letter) provides a way to set the number of lines that an initial-letter should sink into following lines of text.

FileSystemHandle now includes a [`remove()` method](https://developer.mozilla.org/docs/Web/API/FileSystemHandle/remove).

## Further reading

This covers only some key highlights. Check the links below for
additional changes in Chrome 110.

* [What's new in Chrome DevTools (110)](/blog/new-in-devtools-110/)
* [Chrome 110 deprecations and removals](/blog/deps-rems-110/)
* [ChromeStatus.com updates for Chrome 110](https://www.chromestatus.com/features#milestone%3D110)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/109.0.5414.128..110.0.5481.9)
* [Chrome release calendar](https://chromiumdash.appspot.com/schedule)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5) to the
[Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I’m Adriana Jara, and as soon as Chrome 111 is released, I'll be right here to tell you what's new in Chrome!
