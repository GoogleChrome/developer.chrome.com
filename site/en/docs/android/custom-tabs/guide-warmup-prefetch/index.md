---
layout: "layouts/doc-post.njk"
title: "Warm-up and pre-fetch: using the Custom Tabs Service"
seoTitle: "Guide: warm-up and pre-fetch - using the Custom Tabs Service"
date: 2023-04-21
description: Learn how to make sure that your Custom Tabs start as quickly as possible.
authors:
  - sebastianbenz
---

The third part of this guide focuses on speeding up the browser startup via [`warmup()`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsClient#warmup(long)) and prefetching web pages via [`mayLaunchUrl`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsSession#mayLaunchUrl(android.net.Uri,android.os.Bundle,java.util.List%3Candroid.os.Bundle%3E))(). Warming up the browser process can save up to 700ms when opening a link. Pre-rendering content via `mayLaunchUrl` will make external content open instantly. Together both APIs can greatly improve the user experience of a Custom Tabs integration and are highly recommended.

The required steps are:

1. Check via [`CustomTabsClient.getPackageName(...)`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsClient#getPackageName(android.content.Context,java.util.List%3Cjava.lang.String%3E)) If the default browser supports Custom Tabs. If yes, bind to the CustomTabsService via [`CustomTabsClient.bindCustomTabsService()`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsClient#bindCustomTabsService(android.content.Context,java.lang.String,androidx.browser.customtabs.CustomTabsServiceConnection)).
2. Once connected to the CustomTabsService, in the [`CustomTabsServiceConnection.onCustomTabsServiceConnected()`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsServiceConnection#onCustomTabsServiceConnected(android.content.ComponentName,androidx.browser.customtabs.CustomTabsClient)) callback, do:

    a. Warmup the browser process via [`CustomTabsClient.warmup()`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsClient#warmup(long)).
    b. Create a new [`CustomTabsSession`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsSession) via [`CustomTabsClient.newSession()`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsClient#newSession(androidx.browser.customtabs.CustomTabsCallback,int)).
3. Optionally, prefetch web pages the user is likely to visit via [`CustomTabsSession.mayLaunchUrl()`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsSession#mayLaunchUrl(android.net.Uri,android.os.Bundle,java.util.List%3Candroid.os.Bundle%3E)).
4. When launching a new Custom Tab, pass the [`CustomTabsSession`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsSession) to the [CustomTabsIntent.Builder](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent.Builder) via the constructor `new CustomTabsIntent.Builder(session)`. 

{% Aside 'important' %}
Passing a session to a `CustomTabIntent` will force open the link in a Custom Tab, even if the corresponding native app is installed. If you want to keep the default behavior of opening web links in native apps, you need to additionally follow our [guide on how to check if a link can be handled by an installed native app](/docs/android/custom-tabs/howto-custom-tab-native-apps/).
{% endAside %}

If your app targets **Android API level 30**, [`CustomTabsClient.getPackageName(...)`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsClient#getPackageName(android.content.Context,java.util.List%3Cjava.lang.String%3E)) requires you to add a queries section to your Android Manifest, declaring an intent-filter that matches browsers with Custom Tabs support.

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">
  …
   <queries>
        <intent>
            <action android:name="android.support.customtabs.action.CustomTabsService" />
        </intent>
    </queries>
</manifest>
```

Here is a full example for how to connect to a Custom Tabs service:


```java
private CustomTabsClient mClient;
private CustomTabsSession mSession;

private CustomTabsServiceConnection mConnection = new CustomTabsServiceConnection() {
    @Override
    public void onCustomTabsServiceConnected(
            @NonNull ComponentName name,
            @NonNull CustomTabsClient client
    ) {
        mClient = client;
        // Warm up the browser process
        mClient.warmup(0 /* placeholder for future use */);
        // Create a new browser session
        mSession = mClient.newSession(new CustomTabsCallback());
        // Pre-render pages the user is likely to visit
        // you can do this any time while the service is connected
        mSession.mayLaunchUrl("https://developers.android.com", null, null);
    }

    @Override
    public void onServiceDisconnected(ComponentName name) {
        mClient = null;
        mSesssion = null;
    }
};

private void bindCustomTabService(Context context) {
    // Check for an existing connection
    if (mClient != null) {
        // Do nothing if there is an existing service connection
        return;
    }

    // Get the default browser package name, this will be null if
    // the default browser does not provide a CustomTabsService
    String packageName = CustomTabsClient.getPackageName(context, null);
    if (packageName == null) {
        // Do nothing as service connection is not supported
        return;
    }
    CustomTabsClient.bindCustomTabsService(context, packageName, mConnection);
}

@Override
protected void onCreate(Bundle savedInstanceState) {
…
    bindCustomTabService(this);
    findViewById(R.id.button).setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View view) {
            String url = "https://developers.android.com";
            CustomTabsIntent intent = new CustomTabsIntent.Builder(mSession)
                    .build();
            intent.launchUrl(MainActivity.this, Uri.parse(url));
        }
    });
}
```

{% Aside "caution" %}
A Custom Tabs service connection might fail while your activity is running. If your app requires an active service connection, there are two strategies to ensure a working service connection:

1. When eagerly connecting to the `CustomTabsService` during `onCreate()`, reconnect to the service  if your activity gets disconnected and the `onServiceDisconnected()` callback gets invoked.
2. Wait until the user triggers a Custom Tab, then establish the service connection and launch the Custom Tab.

{% endAside %}

Next up: [Learn how to resize the Custom Tabs experience](/docs/android/custom-tabs/guide-partial-custom-tabs/).
