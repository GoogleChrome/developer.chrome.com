---
layout: 'layouts/blog-post.njk'
title: What’s new for web on Android 2023
description: Updates to tools that bring the web to Android. Privacy enhancements and better support for large screens in WebView, partial custom tabs in Custom Tabs, easier installation and integrated features for PWA, Play Store billing management for TWA and more.
date: 2023-05-10
authors:
  - ajara
  - sebastianbenz
tags:
  - capabilities
  - progressive-web-apps
  - android
hero_youtube_id: 'sLn3wszcnGU'
thumbnail: image/6hHqS5auVgWhN0cQNQztaJx5w4M2/FC4a4vxoHf1XTuMYCvrc.jpg
alt: ''
---

There are many reasons for developers to [bring the web to Android](https://developer.android.com/develop/ui/views/layout/webapps): maybe reusing a web widget in an Android app, incorporating first-party or third-party content, even bringing their entire web app to the platform. Whatever the use case, Android has many tools to make it possible. 

Here are the latest updates to these tools. For example:
* Privacy improvements and better support for large screens, such as support for image drag and drop in [WebView](#web-view). 
* [Custom Tabs](#custom-tabs) now supports partial custom tabs.
* Integrated features for [PWA](#pwa), like Richer Install UI and Play billing API in [Trusted Web Activities](#twa).

Let’s dive in and learn more.

## WebView {: #web-view}
WebView is the most commonly used way to embed web content into Android apps, as the vast majority of Android apps use WebView. It is a great way to seamlessly integrate Web UI in native Android app experiences. For example, you can embed different Web UI into your app such as ads, widgets, or even in-app browsers. One of WebView’s biggest strengths is its powerful API for controlling and modifying the web content that is being loaded. So what’s new in WebView?

### X-Requested-With header{: #x-requested-with}
Let’s start with privacy and the [X-Requested-With header deprecation](https://android-developers.googleblog.com/2023/02/improving-user-privacy-by-requiring-opt-in-to-send-x-requested-wih-header-from-webview.html). When a user installs and runs an application that uses a WebView to embed web content, the WebView will add the X-Requested-With header to every request sent to servers. The value of this header is the application's APK name. This means every request includes specific information about the context in which the user is consuming web content, and leaks the identity of the app to the online service. To protect user privacy, the WebView team started a deprecation trial which removes this header from all WebView requests.

But what if your app relies on X-Requested-With header? Our recommended method is to use the [new opt-in API](https://developer.android.com/jetpack/androidx/releases/webkit#1.6.0-alpha03) that enables you to selectively send the request header to specific origins. This means you get the best of both worlds: you can continue to support existing features built on top of this header, while making sure that the user’s privacy is preserved in all other cases. If you want to keep the existing behavior, you can also sign up for the [X-Requested-With Deprecation](/origintrials/#/view_trial/1390486384950640641) origin trial. 

```java
WebSettingsCompat.setRequestedWithHeaderOriginAllowList(
    demoWebview.getSettings(), Collections.singleton("https://example.com")
);
```

### WebView testing{: #webview-testing}
The next topic is testing. If you are a web developer, and your websites receive a lot traffic from WebViews, there are two updates for you:

1. WebView now supports [Chrome origin trials](/docs/web-platform/origin-trials/). Origin trials give you access to new or experimental features in Chrome. You can use these to try out a new feature before the feature is made available to everyone. Until now, origin trials have only been available on desktop and mobile Chrome, but starting with Chrome M110, origin trials also work in WebView. 

2. It is now much easier to install WebView Beta. We highly recommend testing your website using the WebView Beta channel to make sure that your website works well in upcoming WebView versions. To do this, join the [WebView Beta testing program on the Google Play Store](https://play.google.com/apps/testing/com.google.android.webview), and your device will automatically be enrolled.

{% Img src="image/6hHqS5auVgWhN0cQNQztaJx5w4M2/63KraC4Xb1iOtm0hpcm3.png", alt="Screenshot of the website for joining the WebView beta program.", width="393", height="851" %}

### Large screen device support{: #large-screen-device}
Our goal is to make WebView work well on large screen devices. One step in this direction is that WebView now supports image drag and drop. For example, in split screen view mode, you can drag an image from a WebView into a different app. 

{% Video src="video/6hHqS5auVgWhN0cQNQztaJx5w4M2/HMPM2vSc16CupdVuxGH9.mp4", width="800", height="500", autoplay="true", loop="true" %}

It’s very easy to add drag and drop to your WebViews: you just need to declare a DropDataProvider in your AndroidManifest.

```xml
<application...>
     ...
     <provider
         android:authorities="com.example.webviewdemo.DropDataProvider"
         android:name="androidx.webkit.DropDataContentProvider"
         android:exported="false"
         android:grantUriPermissions="true"/>
 </application>
```

Talking of large screen devices, Chrome and WebView on Android U will come with full support for handwriting in HTML text input fields, and with input gestures for deleting text or adding spaces. Handwriting support is already available for all Samsung devices with One UI 5.1, like the S23 Ultra. For other devices using Android T, you can enable handwriting in HTML inputs under Developer options.
### Jetpack JavaScript Engine{: #jetpack-javascript-engine}
Sometimes you might need to run JavaScript in your app without having to display any web content; for example, when sharing business logic across web and mobile apps. To make this easier, we launched the [alpha release of the new JetPack JavaScript engine](https://developer.android.com/develop/ui/views/layout/webapps/jsengine) last year. This library uses the V8, Chrome’s JavaScript engine, and lets your application evaluate JavaScript or WebAssembly code without creating a WebView instance. The great thing about the new JavaScript engine is that it executes your JavaScript in a different process, making it a secure and stable way to run JavaScript in your app. It also requires fewer resources than a WebView instance.

```java
ListenableFuture<JavaScriptSandbox> jsSandboxFuture =
JavaScriptSandbox.createConnectedInstanceAsync(JavaScriptEngineActivity.this);
JavaScriptIsolate jsIsolate = jsSandboxFuture.get().createIsolate();
final String code = 
"function sum(a, b) { let r = a + b; return r.toString(); }; sum(3, 4)";
ListenableFuture<String> resultFuture = jsIsolate.evaluateJavaScriptAsync(code);
…
```

## Custom Tabs{: #custom-tabs}

{% Img src="image/6hHqS5auVgWhN0cQNQztaJx5w4M2/cRV98kXB7fYtITSTCmlM.png", alt="Android Custom Tab with the default styling.", width="400", height="866" %}

WebView is great for integrating Web UI into your app. But what about letting users browse web content in your app? 

This is a great use case for Custom Tabs. They are a secure and user-friendly way to let users view web content in your app. Their big advantage is that users don't need to re-log in to their favorite websites. This is because they are an instance of the user's default browser and cookies being shared, and they offer all web platform features and APIs supported by the browser powering it.

This also means that if your default browser is Chrome, a custom tab is opened in Chrome; if your default browser is Firefox, a Custom Tab will be opened in Firefox. Most of the major browsers on Android support Custom Tabs, and if the default browser does not support Custom Tabs, the browser app will open instead. 

What’s great about Custom Tabs is that you can style them to match the look and feel of your app, add custom interactivity via actions, and your own toolbars. 

{% Img src="image/6hHqS5auVgWhN0cQNQztaJx5w4M2/th39X3MtXNrt8JfLV6J3.png", alt="Android Custom Tab with custom color theme and toolbars.", width="400", height="866" %}

### Partial Custom Tabs{: #partial-custom-tabs}
Custom Tab customizations got a major upgrade with support for [Partial Custom Tabs](/docs/android/custom-tabs/integration-guide/#specify-the-launch-height-of-a-custom-tab). They let users multi-task between apps and the web. Until now, when using Custom Tabs, the browser tab overlay would cover the whole screen. Now you can control the height of the Custom Tab overlay. This way, users can interact with your app and web content at the same time. If your user’s browser does not support Partial Custom Tabs, the user will simply see the supported full-screen Custom Tab.

All you need to do is to connect to the Custom Tabs Service, pass the session to the CustomTabsBuilder, and call setActivityHeight. 

```java
CustomTabsSession customTabsSession;

// ...

CustomTabsIntent customTabsIntent = new CustomTabsIntent.Builder(customTabsSession)
  .setInitialActivityHeightPx(500)
  .setCloseButtonPosition(CustomTabsIntent.CLOSE_BUTTON_POSITION_END)
  // ...
  .build();

customTabsIntent.launchUrl(context, Uri.parse(url))
```

YouTube successfully launched resizable inline Custom Tabs on direct response ads. This way, they’ve been able to implement a new way of interacting with ads and web content without interrupting the organic experience on the app. 

{% Img src="image/6hHqS5auVgWhN0cQNQztaJx5w4M2/9uaSzKcUuo3Z6gNoGpfe.gif", alt="YouTube DirectResponse Ad experience using Partial Custom Tabs.", width="400", height="868" %}

But what about tablets and other large screen devices? The Chrome team is currently working on a new side-by-side Custom Tabs experience for landscape mode and large screen devices. By defining a maximum tab width, together with a breakpoint, the Custom Tab experience will automatically switch between the bottom sheet overlay and the side-by-side experience. The feature is already available in Canary and will launch around July 2003. If you want to try it out, check out the source code of the Chromium Custom Tabs example app.

{% Img src="image/6hHqS5auVgWhN0cQNQztaJx5w4M2/qqWt1oWif6pHbomJXvts.png", alt="A Custom Tabs displayed side-by-side with the main app content.", width="800", height="500" %}

### Measuring engagement signals{: #ct-engagement-signals}
The second big update to Custom Tabs is measuring session-specific user engagement. If your app regularly shows content to your users including links, for example, in a news feed, wouldn’t it be great if you could tell which links a user finds valuable and which not? This information can be really helpful when it comes to prioritizing which links to show to your users.

The Chrome team added session-specific metric visibility to Chrome Custom Tabs. In addition to how long a user stays on a page, you can now also get visibility into scroll distance, scroll direction, and overall engagement with web content. 

Engagement signals are available starting with Chrome 114 and require the `androidx.browser:browser:1.6.0-alpha01` support library or higher. To learn more, check out the engagement signals getting started guide.

## PWA {: #pwa}
There also are updates in PWA— a set of technologies that make it possible to create app-like experiences, built and deployed on the web. 

Using PWA on Android, your web app could be installable: it will live along the other platform apps, on the home screen, launcher, settings, and other surfaces. 

PWA features are built based on web standards; they focus on cross-platform compatibility, giving developers the tools to build a web app once, and allowing users to install it on whichever device they choose. Building an installable web app doesn’t mean you can’t or shouldn’t have a native Android app, but it is another option to bring the web to Android.

Let’s check a couple of features that make your installable web app feel at home in Android.

We wanted to empower users to install the websites they care about most. The first step was removing the service worker fetch handler as a requirement for installation on Android and Chrome. In addition, Chrome will skip starting the service worker if the [fetch handler is empty](/blog/new-in-chrome-112/#no-op-sw). Chrome will be running experiments to expand access to installation for users. Keep an eye out for those and please provide feedback.

The service worker requirement existed for developers to create a user experience that was consistent with other Android apps. It could be used to create a page informing the user that they couldn’t use the app while offline.

We realized that we could ease the workload for developers, and ensure that these apps provide a good installed experience right from the beginning. That's why Chrome added a [default offline experience](/blog/default-offline/) which shows users a screen with the app’s icon, letting them know they are offline, without requiring additional work by developers.

Of course, the service worker API is still available to build custom offline experiences and implement other features like caching to improve performance.

Some other features that can bring a polished web app experience to Android include the [Richer Install UI](/blog/richer-install-ui-desktop/). By adding the fields `description` and `screenshots` to your web manifest, your users will get an install experience that is closer to what app stores show to describe your app.

We also have [shortcuts](https://web.dev/app-shortcuts/).  By adding an array called `shortcuts` which describes a set of quick actions that your users frequently make in your app, they will be able to access these actions by long pressing on the app’s icon.

Using [Web Share](https://web.dev/web-share/) and [Web Share Target](/articles/web-share-target/) APIs, your app can interact with other apps, like any other platform app. Your app will be an option in the sharing sheets, and can share and receive photos, texts, and other files.

You can check out the I/O talk “The Web: Your platform for growth” for more information on how businesses are leveraging these technologies.

## Trusted Web Activity{: #twa}

Another way to bring the web to Android is using [Trusted Web Activity (TWA)](/docs/android/trusted-web-activity/). 

TWA is the best way to display full screen first-party web content in your app. It is the ideal solution for developers who want to wrap their web app as an Android application, or use their website as part of one.

Note that TWA sounds like it is strictly related to PWA, but it is not. Yes, by using TWA you can publish your installable web app to  Google Play, but you could also build a single activity on the web and include it on your Android app. 

A Trusted Web Activity is rendered by the user’s browser in exactly the same way as a user would see it in their browser, except they are run full screen and do not display a URL bar. This means that  they support all web platform features and APIs supported by the browser powering it. 

A couple of advantages of wrapping your web app using TWA are:

[Publishing to Google Play](https://developers.google.com/codelabs/pwa-in-play#0), which gives your app access to Google Play’s visibility and distribution.
Having access to the [Play Billing API](/docs/android/trusted-web-activity/play-billing/), which allows developers to manage digital goods sales in their apps, making it easier to set up products, sales, subscriptions, and more.
Delegating notifications and geolocation permissions to the Android app instead of the website.

Check [this article](https://www.thinkwithgoogle.com/intl/it-it/futuro-del-marketing/digital-transformation/essilorluxottica-velocita-siti-web/) to learn more about how ContactsDirect has used TWA to benefit their users and tripled their conversion rates.

## Conclusion

As you’ve seen, there are many different options available for embedding web content into your app and all these options are continuously being improved. 


