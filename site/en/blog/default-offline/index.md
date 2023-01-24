---
title: Basic offline page for web apps on Chrome Android
description: >
  For installed web apps on Android that do not have their own offline experience,  starting on Chrome 109, the browser will automatically generate a default page to indicate that the app is currently offline.
layout: 'layouts/blog-post.njk'
date: 2023-01-19
authors:
  - ajara
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/yLlcnEsQXWUZrBYExA6k.jpg'
alt: >

tags:
  - progressive-web-apps
---

Even while offline, installed platform apps can, at least, be launched. Frequently they include a page letting the user know internet access is not available, and some developers even create a full set of features that can be used while offline.

With web apps, the capability to work offline is more recent; it became possible with the launch of the [Service Worker API](/docs/workbox/service-worker-overview/). Also, when websites became installable, PWA added a [requirement](https://web.dev/install-criteria/) to register a service worker and implement its `fetch()` method in order for a web app to be installable.
The idea was to incentivize developers to provide their users at least a notice that the app couldn’t be used at the moment.

Now developers won’t need to do anything to get a default offline page, starting on Chrome 109 on Android, the browser will automatically generate a page that lets the user know when they are offline.

If the app doesn’t implement a custom offline experience, when the user is offline, the default offline page uses the app’s icon and simple ‘You are offline’ message. Like the example below.


{% Img src="image/SeARmcA1EicLXagFnVOe0ou9cqK2/uhTEeFoAp98gTxlA5kr7.png", alt="The default offline page for an example web app, where the logo is a pink circle and two plus signs, and it includes the message 'you are offline'", width="400", height="866" %}

Visit this [glitch](https://glitch.com/~default-offline-count) to see the example above in action.

The option to create your own custom offline page is still available, you can follow this video to serve your custom page, using Workbox, with a single line of code.

{% YouTube id='M7gQg9JojGE' %}

Even though the feature is available on Android only at the moment, we are working to bring it to desktop as well. If you have any feedback send it our way via [this form](https://forms.gle/PnrpAtgGgvQ2jVof6)

Photo by [Sten Ritterfeld](https://unsplash.com/@stenslens) on [Unsplash](https://unsplash.com/s/photos/airplane-phone)