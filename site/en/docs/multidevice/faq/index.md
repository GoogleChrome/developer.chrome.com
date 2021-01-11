---
layout: "layouts/doc-post.njk"
title: FAQ
date: 2014-02-28 
description: Frequently asked questions about Chrome for Android.
---

## Chrome for Android

### Is Chrome for Android open source?

Chrome for Android is derived from Chromium. Since the launch of the first version, we have steadily
open sourced all the critical components. You can build various Chromium components for Android as
used in Chrome for Android using the instructions [here][1].

### Does Chrome for Android follow the same release cycles as desktop Chrome?

They share the same release cycle and release numbering. Not2 all features in desktop Chrome are
available in the corresponding version of Chrome for Android, however.

### Can I make Chrome for Android auto-update?

You can make it auto-update by checking either the per-app or global auto-update setting in Android
Market.

### What are the differences between Android Browser and Chrome for Android?

Chrome for Android provides the same fast, secure, and stable web browsing experience you've come to
enjoy when using Chrome on desktop. We've taken a different approach to tabs and overall navigation.
By signing in to Chrome on Android, users can have a unified, personalized Chrome experience across
all their devices.

From a developer perspective, Chrome for Android supports powerful features like Chrome Developer
Tools, Indexed DB, requestAnimationFrame, WebSockets and Web Workers.

### How do I add a bookmark in Chrome to my home screen?

Create a bookmark via the menu, find it in the bookmark list, long-press on it, and tap "Add to home
screen".

### I've written my mobile web app to use feature X, but Chrome for Android doesn't support it

Please see if this is already a [known issue][2] and star it if it is. Otherwise, please log a bug.
Also, see [chromestatus.com][3] to track new and upcoming features in Chrome.

### Does Chrome for Android now support the embedded WebView for a hybrid native/web app?

A Chrome-based WebView is included in Android 4.4 (KitKat) and later. See the [WebView overview][4]
for details.

### Does Chrome for Android support apps and extensions?

Chrome apps and extensions are currently not supported on Chrome for Android. We have no plans to
announce at this time.

### Can I write and deploy web apps on Chrome for Android?

Though Chrome apps are not currently supported, we would love to see great interactive web sites
accessible by URL.

### What version of Flash is supported on Chrome for Android?

Chrome for Android will not be supporting Flash. As you may have seen in November, 2011, Adobe
[announced][5] it has stopped investing in Flash for mobile browsing. Google has long been committed
to making the web platform more powerful through open web technologies like HTML5 and is working
with Adobe and other partners to further advance the web standard.

### What HTML5 features does Chrome for Android support?

See this [overview][6].

### How do I debug my mobile web page?

Chrome Developer Tools are available for remote debugging with Chrome for Android. See the article
on [Remote Debugging][7] for more information.

### Can I hide the address bar?

The address bar hides automatically when you scroll down. Web apps that are installed using the [Add
to Homescreen][8] feature don't display the address bar.

### How similar is Chrome for Android with the desktop/laptop version of Chrome?

Chrome for Android is based on the same source as Chrome for desktop. Chrome for Android brings
desktop-class browsing to mobile devices. We plan to continually evaluate applicability of other
features from desktop to the mobile platform.

### Is Canvas hardware accelerated?

Yes.

### What about WebGL support?

WebGL is supported in Chrome for Android 30 and later.

### Does Native Client work on Chrome for Android?

It does not, and we have no plans to announce at this time.

### What is Chrome for Android's User Agent string?

See the [user agent article][9] for an in-depth discussion.

### Will Chrome Web Store be available on Android?

We have no plans to announce at this time.

### Are you still working on the Android browser, or are you dropping support in favor of Chrome?

Android Browser and Chrome for Android are both derived from Chromium and already share a lot of
code. We will continue to evaluate where it makes sense to harmonize our efforts; for instance,
Google now has just one port of WebKit to maintain.

### Will Chrome for Android work on my Android device?

Chrome for Android is supported only on Android 4.0 and higher.

### Is Chrome for Android hardware accelerated?

Yes, hardware acceleration is an essential capability in Android 4.0 and is heavily utilized by
Chrome for Android as well.

### When will Chrome for Android launch in my country?

We are launching in a large [set of countries][10] and hope to expand it to other countries in the
future.

[1]: http://code.google.com/p/chromium/wiki/AndroidBuildInstructions
[2]: http://code.google.com/p/chromium/issues/list?q=label%3AOS-Android
[3]: https://chromestatus.com
[4]: /docs/multidevice/webview/overview/
[5]: http://blogs.adobe.com/conversations/2011/11/flash-focus.html
[6]: /docs/multidevice/android/overview/
[7]: /devtools/docs/remote-debugging
[8]: /multidevice/android/installtohomescreen.html
[9]: /docs/multidevice/user-agent/
[10]: http://goo.gl/6ARvc
