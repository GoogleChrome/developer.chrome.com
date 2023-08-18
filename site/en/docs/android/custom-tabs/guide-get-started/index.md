---
layout: "layouts/doc-post.njk"
title: Getting started 
seoTitle: "Guide: getting started with Custom Tabs"
date: 2023-04-21
description: How to launch a Custom Tab from your Android app.
authors:
  - sebastianbenz
---

The first step for a Custom Tabs integration is adding the [AndroidX Browser Library](https://developer.android.com/jetpack/androidx/releases/browser#declaring_dependencies) to your project. Open the app/build.gradle file and add the browser library to the dependencies section.

```java
dependencies {
   …
   implementation 'androidx.browser:browser:1.5.0'
}
```

{% Aside %}
Checkout the [Android Custom Tab Sample app on Github](https://github.com/GoogleChrome/android-browser-helper/tree/dc788207822576f6c867ff28d470ec51ad06d178/demos/custom-tabs-example-app) for a working example.
{% endAside %}

## Open a link in a Custom Tab

With the `androidx.browser/browser` library  installed, you can use the [`CustomTabsIntent.Builder`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent.Builder) to create a [`CustomTabsIntent`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent) and launch the Custom Tab by calling [`launchUrl()`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent#launchUrl(android.content.Context,android.net.Uri)) and passing an [Uri](https://developer.android.com/reference/android/net/Uri):

```java
String url = "https://developers.android.com";
CustomTabsIntent intent = new CustomTabsIntent.Builder()
        .build();
intent.launchUrl(MainActivity.this, Uri.parse(url));
```

This will open a fullscreen Custom Tab activity as seen on the following screenshot.

{% Img src="image/6hHqS5auVgWhN0cQNQztaJx5w4M2/slw7FNNob6P1zwEkJMZa.png", alt="The default Custom Tabs experience.", width="400", height="866", class="screenshot screenshot--filled" %}

{% Aside 'gotchas' %}
What happens if the user's default browser does not support Custom Tabs? Custom Tabs are supported by most Android browsers, but if no browser that supports Custom Tabs is installed, the `CustomTabIntent` will open the user's default browser instead. This works, as the `CustomTabsIntent` uses the [`ACTION\_VIEW` Intent](https://developer.android.com/reference/android/content/Intent#ACTION_VIEW) with `Extras` key to customize the UI.
{% endAside %}

## Supporting Android App Links 

By default, Custom Tabs support [Android App Links](https://developer.android.com/training/app-links/verify-android-applinks). This means, if the YouTube app is installed, launching a `CustomTabsIntent` with a YouTube video URL will open the YouTube app instead of the browser.

However, [passing a `CustomTabsSession` to a `CustomTabIntent`](/docs/android/custom-tabs/guide-warmup-prefetch/) will force open the link in a Custom Tab, even if the corresponding native app is installed. If you want to keep the default behavior of opening web links in native apps, you need to additionally follow our [guide on how to check if a link can be handled by an installed native app](/docs/android/custom-tabs/howto-custom-tab-native-apps/).

Next up: [learn how to customize the look and feel of your Custom Tab.](/docs/android/custom-tabs/guide-ui-customization/).
