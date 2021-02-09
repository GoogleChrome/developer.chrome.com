---
layout: "layouts/doc-post.njk"
title: "What Are Chrome Apps?"
date: 2012-09-17
updated: 2018-04-26
description: An overview of Chrome Apps and why you might want to build them.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

Chrome Apps let you use HTML5, CSS, and JavaScript to deliver an experience comparable to a native
application.

{% YouTube id="lBUGTVIJVfM" %}

## Why build a Chrome App? {: #why-build }

By building a Chrome App, as opposed to going with a traditional web app or a native mobile app, you
expand your potential audience and extend your development capability.

### Expand your potential audience {: #expand }

When you write a Chrome App, as opposed to an app that runs natively on a particular operating
system, you immediately make your app available to a much wider audience.

**To any desktop**

Instead of writing and maintaining separate applications for Windows, OS X and Linux, you can write
a single application that runs anywhere Chrome runs. This includes Windows, Linux, and OS X.

**To mobile devices \[via Cordova\]**

Using [Chrome Apps for Mobile][3] (MCA), you can deploy your applications to mobile and target
hardware features only available on Android and IOS platforms.

**And of course, to a Chromebook**

Writing a Chrome App is the ONLY way to have your app installed on a Chromebook. Chromebooks are
appealing, inexpensive, low maintenance devices that provide a full web experience.

### Extend your development capability {: #extend }

You might be thinking, "If I write a standard web application, I can run it on any platform that has
a web browser." Of course, this is absolutely right, but remember that Chrome Apps extend your
development capacity beyond what you can do with traditional web apps:

- Chrome Apps can integrate seamlessly into the desktop and look more like desktop applications than
  traditional web apps.
- Chrome Apps for Desktop have no omnibox (address bar) and tab strip like normal browser-based
  apps, because like native desktop apps, they don't live in a browser.
- The Chrome App Launcher makes it easy for users to find and start your Chrome App.
- OS X users can use the integrated spotlight search to find and start your app.
- Chrome Apps for Desktop can access the host computer's file system and make use of hardware
  features (like USB, Bluetooth and attached human interface devices).

The best way to see what Chrome Apps look like is to [install some][4].

## Who should build Chrome Apps? {: #who }

Everyone! But some sectors have a special interest in Chrome Apps.

**Device manufacturers**

The cross platform nature of Chrome Apps makes writing device drivers less painful. A device
manufacturer only needs to write one application for configuring their device and it will run on any
device.

**Educators**

Chromebooks are an inexpensive, low-maintenance option for bringing laptops into every classroom.
Chrome Apps make teaching easy with easy to install applications that run natively on Chromebooks.
For example:

- [Google Classroom][5]
- [More Teaching, Less Tech-ing][6]

**Health care providers**

One pediatric service has so far [saved tens of thousands of dollars][7] using Chrome Apps on
Chromebooks.

## Chrome Dev Editor {: #more }

Use the full featured IDE in the [Chrome Dev Editor][8].

{% YouTube id="NNLnTz6yIc4" %}

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: apps/chrome_apps_on_mobile
[4]: https://chrome.google.com/webstore/category/apps?_feature=chromeapp
[5]: https://classroom.google.com/
[6]: https://cloud.googleblog.com/2014/08/more-teaching-less-tech-ing-google.html
[7]: https://cloud.googleblog.com/2013/12/pediatric-home-service-puts-patient.html
[8]: https://github.com/dart-lang/chromedeveditor
