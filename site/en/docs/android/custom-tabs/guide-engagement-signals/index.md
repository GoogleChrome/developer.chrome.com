---
layout: "layouts/doc-post.njk"
title: Measuring user engagement
seoTitle: "Guide: measuring user engagement in Android Custom Tabs"
date: 2023-04-21
description: How to measure user engagement in Custom Tabs.
authors:
  - sebastianbenz
---

{% Video src="video/6hHqS5auVgWhN0cQNQztaJx5w4M2/m3WWGlZ2fFVZLgYjX9QV.mp4", controls="true", width="400", height="866", class="screenshot screenshot--filled" %}

{% Aside "caution" %}
This feature requires the latest version of Chrome. You also need to install the latest alpha version of the `androidx.browser/browser` library:

```groovy
dependencies {
   …
   implementation 'androidx.browser:browser:1.6.0-alpha01'
}
```
{% endAside %}

Custom Tabs support two ways to measure user engagement: 

1. [CustomTabsCallback](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsCallback) for tracking basic navigation events, such as `NAVIGATION_STARTED` or `NAVIGATION_FINISHED`.
1. [EngagementSignalsCallback](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsCallback) for tracking page specific user engagement, such as scroll direction or scroll percentage.

Both require an active [CustomTabsServiceConnection](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsServiceConnection). See the [previous `CustomTabsService` guide](/docs/android/custom-tabs/guide-warmup-prefetch/) for details on how to connect to a `CustomTabsService`.

First you need to create a `CustomTabsCallback` and an `EngagementSignalsCallback`. The `CustomTabsCallback` receives a `navigationEvent` constant describing which kind of navigation happened:

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

The `EngagementSignalsCallback` receives three different events:

1. `onVerticalScrollEvent`: the Custom Tab fires this event every time the user changes the scroll direction, where `isDirectionUp` indicates the direction.
1. `onGreatestScrollPercentageIncreased`: the Custom Tab fires the current scroll depth in 5% intervals whenever the user stop scrolling. The value is reset with every new navigation. 
1. `onSessionEnded`: the Custom Tab fires this event when it stops sending engagement signals (for example, after the user has closed the Custom Tab). `didUserInteract` will be true if the user interacted with the page in any way (scrolling, button click, ...).

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
For the `onGreatestScrollPercentageIncreased` event to reset, a new navigation needs to happen on the main frame and to a new document. For example, scroll depth will **not** be reset for navigations inside a single page application. 
{% endAside %}

Both `CustomTabsCallback` and `EngagementSignalsCallback` require an active Custom Tab service connection. Once the service is connected, you can create a new `CustomTabsSession` by calling [CustomTabsClient#newSession](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsClient#newSession(androidx.browser.customtabs.CustomTabsCallback)) and passing the `CustomTabsCallback`.

Afterwards, you should call `isEngagementSignalsApiAvailable` to check if engagement signals are supported by the current browser. If they are supported, you can register your `EngagementSignalsCallback` via `CustomTabsSession.setEngagementSignalsCallback`.

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
private void bindCustomTabsService() {
    String packageName = CustomTabsHelper.getPackageNameToUse(this);
    if (packageName == null) return;
    CustomTabsClient.bindCustomTabsService(this, packageName, mConnection);
}
```


