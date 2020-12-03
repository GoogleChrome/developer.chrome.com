---
layout: "layouts/doc-post.njk"
title: WebView for Android
date: 2014-02-28
description: An overview of WebView for Android
---

Since Android 4.4 (KitKat), the WebView component is based on the Chromium open source project.
WebViews now include an updated version of the V8 JavaScript engine and support for modern web
standards previously missing in old WebViews. New Webviews also share the same rendering engine as
Chrome for Android, so rendering should be much more consistent between the WebView and Chrome.

In Android 5.0 (Lollipop), the WebView has moved to an APK so it can be updated seperately to the
Android platform. To see what version of Chrome is currently used on a Lollipop device, simply go to
Settings < Apps < Android System WebView and look at the version.

If you're a web developer looking to start developing a WebView-based Android application, see
[Getting Started: WebView-based Applications for Web Developers][1].

If you're primarily planning to show external web content inside of your app, you should consider
[Custom Tabs][2] instead.

For tips on scaling WebView content for mobile devices, see [Pixel-Perfect UI in the WebView][3].

The new WebView also supports [remote debugging][4] using the Chrome DevTools.

## WebView FAQ

### What version of Chrome is it based on?

The WebView shipped with **Android 4.4 (KitKat)** is based on the same code as Chrome for Android
version 30. This WebView does not have full feature parity with Chrome for Android and is given the
version number **30.0.0.0**.

The updated WebView shipped with **Android 4.4.3** has the version number **33.0.0.0**.

A developer preview WebView is shipping with the [Android L Developer Preview][5]. The developer
preview version number is **36.0.0.0**.

**Caution:** You cannot publish apps using the L Developer Preview to the Google Play store.

The WebView in Android L can be updated via the Play Store, so you need to check the latest version
on the device under App Settings.

### Will the new WebView auto-update?

The WebView will auto-update for mobile devices with Android L and above.

For future proofing you app, you can use the Beta WebView to test versions of the WebView before
it's launched. Checkout this [Android Developer blog post for more
details](http://android-developers.blogspot.com/2015/02/beta-channel-for-android-webview.html).

### What is the default user-agent?

The new WebView adds **Chrome/\_version\_** to the user-agent string. Refer to [Chrome User Agent
Strings][6] for an example.

### How do I set the user-agent of the WebView?

You can set the user-agent by using the Java [setUserAgentString][7] method. This method only
changes the user-agent string for requests sent by the WebView itself.

You can't set the user-agent string used for `XMLHttpRequest`s made from JavaScript. Those requests
always use the default user-agent string.

### Does this mean Chrome for Android is using the WebView?

No, Chrome for Android is separate from WebView. They're both based on the same code, including a
common JavaScript engine and rendering engine.

### Does the new WebView have feature parity with Chrome for Android?

For the most part, features that work in Chrome for Android should work in the new WebView.

Chrome for Android supports a few features which aren't enabled in the WebView, including:

| Feature | WebView v30 | WebView v33 | WebView v36 |
| ------- | ----------- | ----------- | ----------- |
| [WebGL][8] | x | x | ✓ |
| [WebRTC][9] | x | x | ✓ |
| [WebAudio][10] | x | x | ✓ |
| [Fullscreen API][11] | x | x | x |
| [Form validation][12] | x | ✓ | ✓ |
| [Filesystem API][13] | x | x | x |
| [File input type][14] | x | x | x |
| [`<datalist>`][15] | x | ✓ | ✓ |

### What hardware sensor APIs are available to the new WebView?

Some HTML5 APIs can be used to access the hardware sensors on an Android device. Chrome for Android
supports a few of these APIs but not all of them are currently enabled in the WebView.

| API | WebView v30 | WebView v33 |
| --- | ----------- | ----------- |
| [Geolocation API][16] (requires `android.permission.ACCESS_COARSE_LOCATION` and/or `android.permission.ACCESS_FINE_LOCATION` permissions) | ✓ | ✓ |
| [Device Orientation API][17] | x | x |
| [Media Capture and Streams][18] | x | x |
| [Vibration API][19] (requires `android.permission.VIBRATE` permission) | x | ✓ |

### What does the new WebView mean for developers?

This is a big change from the original WebView as it brings a new set of HTML5 feature support,
improved JavaScript performance, and remote debugging of web content using the Chrome DevTools.

There **are** some changes that will affect existing apps.

If you are currently using `content://` URLs to load files from a content provider in your
application, note that these URLs only work when accessed from local content. That is, web content
hosted outside your application is not allowed to access files built into your application.

There are a small number of other changes that might impact your application. Read the [migration
guide][20] for more information.

### How do I enable remote debugging?

See the [remote debugging guide][21].

### Does the WebView support the Chrome Apps APIs?

No. The Chrome Apps platform isn't yet supported on Android.

### Should I enable hardware acceleration?

Hardware acceleration is enabled by default. If you are explicitly disabling it for older versions
of Android you should try enabling it for KitKat based devices and see if it improves performance.

[1]: /docs/multidevice/webview/gettingstarted/
[2]: /docs/multidevice/android/customtabs/#whentouse
[3]: /docs/multidevice/webview/pixelperfect/
[4]: /devtools/docs/remote-debugging
[5]: http://developer.android.com/preview/
[6]: /docs/multidevice/user-agent/#webview_user_agent
[7]:
  http://developer.android.com/reference/android/webkit/WebSettings.html#setUserAgentString(java.lang.String)
[8]: http://www.html5rocks.com/en/tutorials/webgl/webgl_fundamentals/
[9]: http://www.html5rocks.com/en/tutorials/webrtc/basics/
[10]: http://www.html5rocks.com/en/tutorials/webaudio/intro/
[11]: http://www.html5rocks.com/en/mobile/fullscreen/
[12]: http://www.html5rocks.com/en/tutorials/forms/constraintvalidation/
[13]: http://www.html5rocks.com/en/tutorials/file/filesystem/
[14]: http://updates.html5rocks.com/2012/08/Integrating-input-type-file-with-the-Filesystem-API
[15]: http://updates.html5rocks.com/tag/datalist
[16]: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
[17]: https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientation_event
[18]: https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API
[19]: https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API
[20]: http://developer.android.com/guide/webapps/migrating.html
[21]: /devtools/docs/remote-debugging
