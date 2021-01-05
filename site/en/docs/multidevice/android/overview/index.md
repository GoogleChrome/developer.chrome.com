---
layout: "layouts/doc-post.njk"
title: Google Chrome for Android
date: 2014-02-28
description: An overview of Chrome for Android's end user and developer features.
---

Google Chrome is available on Android devices with Android 4.0 (Ice Cream Sandwich) and later
versions. You can also download it from [Google Play][1].

For a complete list of developer features in Chrome, see [chromestatus.com][2].

## A first-class browsing experience

When the user signs into Chrome on one device, the tabs and browsing history of that session are
available to the user when she signs into Chrome on another device. Note, it's the entire page
content that gets synchronized between Chrome instances, not just the URL, so the user doesn't have
to resubmit credentials to see a boarding pass or an article on a site that requires a login.

The address bar uses prefetching to fill in URLs and performs search queries with suggestions based
on browsing history and local bookmarks. To save bandwidth, this feature only runs when the user is
connected to a wifi network.

Highlights of this user experience include:

- Smooth scrolling of independent elements on the same page
- Fixed-position elements that hold their spot while the user scrolls through the page
- Native inertial scrolling by default
- A much improved [multi-touch][3] implementation
- HTML date/time pickers
- [Text auto-sizing][4], also known as font boosting

With these improvements, Chrome for Android enables interactive mobile web experiences.

See all the [Chrome for Android features][5] such as tabs, incognito mode, and sync across devices
for the user's Google account.

## Performance

Chrome for Android brings to small devices the same multi-process architecture, GPU-accelerated
rendering, and the V8 JavaScript engine - all optimized for mobile architectures. Chrome for Android
delivers fast graphics performance through:

- GPU acceleration for the [`canvas` element][6]
- Fluid CSS3 transforms and transitions
- Support for `requestAnimationFrame` for more efficient animations

## Use Developer Tools to find problems—and fix them

Debugging web pages on the small screen is difficult. There's just not enough real estate to inspect
elements and resources on the device. Now you can debug mobile web sites with the full suite of
[Chrome Developer Tools][7] running on a desktop browser that's connected to your phone via USB. See
[Remote Debugging][8] for further details.

In addition to the powerful Chrome Developer Tools, Chrome for Android provides more advanced
developer features for very specific use cases:

- GPU diagnostics: `chrome://gpu`
- AppCache debugging: `chrome://appcache-internals`
- Net stack debugging: `chrome://net-internals`

You can also use the [Resource Timing][9] and [User Timing][10] APIs to analyze application
performance.

## Working offline

Working online is convenient, but connections sometimes fail when the signal is blocked or
nonexistent. Chrome for Android supports the latest open web HTML5 features that address this
concern, including:

- [AppCache][11] or application cache.
- [FileSystem][12] and [File APIs][13] (File, FileList, FileReader, Blob)
- [localStorage][14] for storing simple key-value pairs
- [WebSQL][15] for relational data (deprecated)
- [IndexedDB][16], a standard indexed data store

For more about off-line storage, see [these articles][17].

## Standards and APIs

Chrome for Android supports modern web standards. This section presents a sampling of features; for
an updated view of features per Chrome release, see [chromestatus.com][18].

### CSS and presentation

New CSS3 artifacts are available:

- Support for the standard [CSS calc][19] function (prefixed as -webkit-calc)
- [CSS Filters][20] are supported (prefixed as -webkit-filter)
- The [Flexbox][21] layout model is fully supported (prefixed as -webkit-flex)
- [Viewport units][22], `vh`, `vmin`, and `vw` for responsive design
- [@supports][23] conditional blocks to test whether Chromium supports certain property/value pairs
- The [:unresolved CSS pseudo-class][24] that lets you style a custom element that hasn't been
  registered in the browser yet (custom elements are part of the [Web Components][25] standard in
  development)

### Elements

Newer standard HTML5 elements supported include the following:

- [iframe][26] elements with seamless, srcdoc, and sandbox attributes
- [Shadow DOM][27] is now exposed via `element.webkitCreateShadowRoot()`.
- The [track][28] element, for use with the audio and video tags, lets you set metadata, subtitles,
  and so forth
- The [viewport][29] element that provides for a better presentation of web pages on mobile devices

### Device APIs

In a mobile world, it's important to be able to access your user's contextual surroundings, from
location and device orientation to camera access. Chrome for Android provides:

- [Geolocation API][30] for accessing location
- [HTML media capture][31] for camera access
- [Device orientation][32] for portrait vs. landscape orientation
- [Android Intent URIs][33] such as `tel:` and `geo:` that give access to the dialer and Google maps

### Standard APIs

Chrome for Android supports many HTML5 APIs that are ready to use in your apps.

- [requestAnimationFrame][34] to achieve optimum animation performance
- Interactive communication between server and client with [WebSockets][35].
- Multi-threading with [Web Workers][36] (dedicated only)
- [requestFullscreen][37] method (presently via the prefixed call, `webkitRequestFullScreen()`) to
  allow you to hide the browser UI (chrome)
- [WebRTC][38] for real-time communication without a plug-in
- [WebAudio][39] to process and synthesize audio signals
- Experimental support (via `chrome://flags` in the Chrome address bar) for the following APIs:
  - [WebGL][40] for creating three-dimensional graphics for web browsers

### Security

Chrome for Android supports [Content Security Policy][41] to significantly reduce the risk and
impact of XSS attacks, using the standard (non-prefixed) HTTP header, `Content-Security-Policy`.

## More resources

For a complete list of developer features in Chrome, see [chromestatus.com][42].

Find more information about open web platform APIs and technologies for mobile on
[WebPlatform.org][43].

## Known issues

Development is still underway, and there are many additional features being added to Google Chrome
for Android. For current status, see the issues list at [mcrbug.com][44] and star the ones you need
the most. If you find a new issue, log it using [new.mcrbug.com][45].

## Share your thoughts

If you run into a mobile web development problem and would like help, please post it to [Stack
Overflow][46] using the `[google-chrome]` and `[android]` tags.

[1]: https://play.google.com/store/apps/details?id=com.android.chrome
[2]: http://chromestatus.com/
[3]: http://www.html5rocks.com/mobile/touch.html
[4]: https://bugs.webkit.org/show_bug.cgi?id=84186
[5]: http://www.google.com/intl/en/chrome/android/features.html
[6]: http://www.html5rocks.com/tutorials/canvas/performance
[7]: /devtools/index.html
[8]: /devtools/docs/remote-debugging
[9]: https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API
[10]: http://www.html5rocks.com/en/tutorials/webperformance/usertiming/
[11]: https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache
[12]: https://developer.mozilla.org/en-US/docs/Web/API/FileSystem
[13]: https://developer.mozilla.org/en-US/docs/Web/API/File
[14]: https://web.dev/storage-for-the-web/
[15]: https://web.dev/storage-for-the-web/
[16]: https://developer.mozilla.org/en-US/docs/IndexedDB
[17]: https://web.dev/storage-for-the-web/
[18]: https://chromestatus.com
[19]: https://developer.mozilla.org/en-US/docs/Web/CSS/calc()
[20]: https://developer.mozilla.org/en-US/docs/Web/CSS/filter
[21]: https://developer.mozilla.org/en-US/docs/CSS/Using_CSS_flexible_boxes
[22]: https://developer.mozilla.org/en-US/docs/CSS/length
[23]: https://developer.mozilla.org/en-US/docs/Web/CSS/@supports
[24]: http://www.html5rocks.com/en/tutorials/webcomponents/customelements/#fouc
[25]: https://developers.google.com/web/fundamentals/web-components/customelements
[26]: https://developer.mozilla.org/en-US/docs/HTML/Element/iframe
[27]: http://www.html5rocks.com/tutorials/webcomponents/shadowdom/
[28]: https://developer.mozilla.org/en-US/docs/HTML/Element/track
[29]: https://web.dev/responsive-web-design-basics/#viewport
[30]: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
[31]: http://www.w3.org/TR/2010/WD-html-media-capture-20100928/
[32]: http://www.html5rocks.com/tutorials/device/orientation/
[33]: http://developer.android.com/guide/appendix/g-app-intents.html
[34]: http://www.html5rocks.com/en/tutorials/speed/animations/
[35]: https://developer.mozilla.org/en-US/docs/WebSockets
[36]: http://www.html5rocks.com/en/tutorials/workers/basics/
[37]: http://www.html5rocks.com/en/mobile/fullscreen/#toc-request
[38]: https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API
[39]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
[40]: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API
[41]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
[42]: http://chromestatus.com/
[43]: https://web.dev/responsive-web-design-basics/
[44]: http://mcrbug.com
[45]: http://new.mcrbug.com
[46]: http://stackoverflow.com/questions/tagged/google-chrome+android
