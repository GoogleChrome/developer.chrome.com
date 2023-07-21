---
layout: "layouts/doc-post.njk"
title: Measuring user engagement
seoTitle: "Guide: measuring user engagement in Android Custom Tabs"
date: 2023-04-21
description: How to measure user engagement in Custom Tabs.
authors:
  - sebastianbenz
---

<style>
video {
  max-width: 400px;
}
</style>

This guide explains how to measure engagement signals for Chrome Custom tabs. If your app regularly surfaces links to web content to its users, for example in a news feed, it can be important to know which links users find valuable and which not. In Custom Tabs, you can measure session specific user engagement via the number of navigations, scroll direction changes and scroll depth. To see engagement signals in action, checkout the [Custom Tabs demo app on GitHub](https://github.com/GoogleChrome/android-browser-helper/blob/main/demos/custom-tabs-example-app/src/main/java/org/chromium/customtabsdemos/EngagementSignalsActivity.java).

<figure>
  {% Video src="video/6hHqS5auVgWhN0cQNQztaJx5w4M2/m3WWGlZ2fFVZLgYjX9QV.mp4", controls="true", width="400", height="866", class="screenshot" %}
  <figcaption>
    Custom Tab engagement signals demo.
  </figcaption>
</figure>

{% Aside "caution" %}
This feature requires `androidx.browser:browser:1.6.0-alpha01` or higher.

```groovy
dependencies {
   …
   implementation 'androidx.browser:browser:1.6.0-alpha02'
}
```
{% endAside %}

Custom Tabs provide two different callbacks for measuring user engagement: 

* [`CustomTabsCallback`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsCallback) for tracking basic navigation events, such as `"NAVIGATION_STARTED"` or `"NAVIGATION_FINISHED"`.
* [`EngagementSignalsCallback`](https://developer.android.com/reference/androidx/browser/customtabs/EngagementSignalsCallback) for tracking page specific user engagement, such as scroll direction or scroll percentage.

Both require an active [`CustomTabsServiceConnection`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsServiceConnection). See the [previous `CustomTabsService` guide](/docs/android/custom-tabs/guide-warmup-prefetch/) for details on how to connect to a `CustomTabsService`.

To measure user engagement, first create a `CustomTabsCallback` and an `EngagementSignalsCallback` instance. The `CustomTabsCallback` receives a `navigationEvent` constant describing which kind of navigation happened:

```java
private CustomTabsCallback mCustomTabsCallback = new CustomTabsCallback() {
    @Override
    public void onNavigationEvent(int navigationEvent, @Nullable Bundle extras) {
        String event;
        switch (navigationEvent) {
            case CustomTabsCallback.NAVIGATION_ABORTED:
                event = "NAVIGATION_ABORTED";
                break;
            case CustomTabsCallback.NAVIGATION_FAILED:
                event = "NAVIGATION_FAILED";
                break;
            case CustomTabsCallback.NAVIGATION_FINISHED:
                event = "NAVIGATION_FINISHED";
                break;
            case CustomTabsCallback.NAVIGATION_STARTED:
                event = "NAVIGATION_STARTED";
                break;
            case CustomTabsCallback.TAB_SHOWN:
                event = "TAB_SHOWN";
                break;
            case CustomTabsCallback.TAB_HIDDEN:
                event = "TAB_HIDDEN";
                break;
            default:
                event = String.valueOf(navigationEvent);
        }
        Log.d(TAG, "onNavigationEvent (navigationEvent=" + event + ')');
        mTextNavigation.setText("onNavigationEvent " + event);
    }
};
```

The `EngagementSignalsCallback` supports three different callbacks:

`onVerticalScrollEvent()`
: Called every time the user changes the scroll direction, where `isDirectionUp` (the first argument) indicates the direction.
1. `onGreatestScrollPercentageIncreased`: the Custom Tab signals scroll depth in 5% intervals up to 100% when the user has reached the bottom of the page. The callback is only invoked once the user stops scrolling. The value is reset to 0% with every new navigation. 
1. `onSessionEnded`: the Custom Tab fires this event when it stops sending engagement signals (for example, after the user has closed the Custom Tab). `didUserInteract` will be true if the user interacted with the page in any way (scrolling, button click, etc.).

```java
private EngagementSignalsCallback mEngagementSignalsCallback = new EngagementSignalsCallback() {
    @Override
    public void onVerticalScrollEvent(boolean isDirectionUp, @NonNull Bundle extras) {
        Log.d(TAG, "onVerticalScrollEvent (isDirectionUp=" + isDirectionUp + ')');
        mTextVerticalScroll.setText("vertical scroll " + (isDirectionUp ? "UP️" : "DOWN"));
    }

    @Override
    public void onGreatestScrollPercentageIncreased(int scrollPercentage, @NonNull Bundle extras) {
        Log.d(TAG, "scroll percentage: " + scrollPercentage + "%");
        mTextGreatestPercentage.setText("scroll percentage: " + scrollPercentage + "%");
    }

    @Override
    public void onSessionEnded(boolean didUserInteract, @NonNull Bundle extras) {
        Log.d(TAG, "onSessionEnded (didUserInteract=" + didUserInteract + ')');
        mTextSessionEnd.setText(didUserInteract ? "session ended with user interaction" : "session ended without user interaction");
    }
};
```

{% Aside "important" %}
For the `onGreatestScrollPercentageIncreased` event to reset, a new navigation needs to happen on the main frame to a new document. In other words, scroll depth will **not** be reset for navigations inside a single page application or on navigation to an anchor.
{% endAside %}

Both `CustomTabsCallback` and `EngagementSignalsCallback` require an active Custom Tab service connection. Once the service is connected, you can create a new `CustomTabsSession` by calling [`CustomTabsClient.newSession()`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsClient#newSession(androidx.browser.customtabs.CustomTabsCallback)) and passing the `CustomTabsCallback`.

Afterwards, you should call `isEngagementSignalsApiAvailable()` to check if engagement signals are supported by the current browser. If they are supported, you can register your `EngagementSignalsCallback` via `CustomTabsSession.setEngagementSignalsCallback()`.

```java
private CustomTabsClient mCustomTabsClient;
private CustomTabsSession mCustomTabsSession;

private final CustomTabsServiceConnection mServiceConnectionCallback = new CustomTabsServiceConnection() {

    @Override
    public void onCustomTabsServiceConnected(@NonNull ComponentName name, @NonNull CustomTabsClient client) {
        mCustomTabsClient = client;
        mCustomTabsSession = mCustomTabsClient.newSession(mCustomTabsCallback);
        try {
            boolean engagementSignalsApiAvailable = mCustomTabsSession.isEngagementSignalsApiAvailable(Bundle.EMPTY);
            if (!engagementSignalsApiAvailable) {
                Log.d(TAG, "CustomTab Engagement signals not available, make sure to use the " +
                        "latest Chrome version and enable via chrome://flags/#cct-real-time-engagement-signals");
                return;
            }
            mCustomTabsSession.setEngagementSignalsCallback(mEngagementSignalsCallback, Bundle.EMPTY);
        } catch (RemoteException e) {
            Log.w(TAG, "The Service died while responding to the request.", e);
        } catch (UnsupportedOperationException e) {
            Log.w(TAG, "Engagement Signals API isn't supported by the browser.", e);
        }
    }

    @Override
    public void onServiceDisconnected(ComponentName name) {
        mCustomTabsClient = null;
        mConnection = null;
        mCustomTabsSession = null;
    }
};
```

The only thing left to do is binding the `CustomTabsService`:


```java
@Override
protected void onStart() {
    super.onStart();
    bindCustomTabsService();
}

private void bindCustomTabsService() {
    String packageName = CustomTabsHelper.getPackageNameToUse(this);
    if (packageName == null) return;
    CustomTabsClient.bindCustomTabsService(this, packageName, mConnection);
}
```


