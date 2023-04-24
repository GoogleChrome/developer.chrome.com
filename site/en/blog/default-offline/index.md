---
title: Basic offline page for web apps on Chrome Android
description: >
  From Chrome 109, the browser will automatically generate a default page to indicate that the app is currently offline when an installed web app on Android does not have its own offline experience.
layout: 'layouts/blog-post.njk'
date: 2023-01-25
updated: 2023-03-03
authors:
  - ajara
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/yLlcnEsQXWUZrBYExA6k.jpg'
alt: >

tags:
  - progressive-web-apps
---

Installed platform apps can be launched even when offline. In this situation they often include a page letting the user know internet access is not available. Some developers even create a full set of features that can be used while offline.

With web apps, the capability to work offline is more recent; it became possible with the launch of the [Service Worker API](/docs/workbox/service-worker-overview/). Also, when websites became installable, PWA added a [requirement](https://web.dev/install-criteria/) to register a service worker and implement its `fetch()` method in order for a web app to be installable.
The idea was to incentivize developers to provide their users at least a notice that the app couldn’t be used at the moment.

Now developers won’t need to do anything to get a default offline page. From Chrome 109 on Android, the browser will automatically generate a page that lets the user know when they are offline.

If the app doesn’t implement a custom offline experience, when the user is offline, the default offline page uses the app’s icon and simple **You are offline** message. Like the example below.


{% Img src="image/SeARmcA1EicLXagFnVOe0ou9cqK2/uhTEeFoAp98gTxlA5kr7.png", alt="The default offline page for an example web app, where the logo is a pink circle and two plus signs, and it includes the message 'you are offline'.", width="400", height="866" %}

Visit this [glitch](https://glitch.com/~default-offline-count) to see the previous example in action.

The option to create your own custom offline page is still available. The following video demonstrates how to serve your custom page, using Workbox, with a single line of code.

{% YouTube id='M7gQg9JojGE' %}

This feature is available on Android (Chrome 109) and desktop environments (Chrome 110). If you have any feedback send it our way via [this form](https://forms.gle/PnrpAtgGgvQ2jVof6)

Photo by [Sten Ritterfeld](https://unsplash.com/@stenslens) on [Unsplash](https://unsplash.com/s/photos/airplane-phone)
