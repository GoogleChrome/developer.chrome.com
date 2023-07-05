---
layout: "layouts/doc-post.njk"
title: Adding custom interactivity
seoTitle: "Guide: Adding custom interactivity to a Custom Tab"
date: 2023-04-21
description: How to add custom actions to a Custom Tabs.
authors:
  - sebastianbenz
---

This guide explains how to add custom interactivity to Custom Tabs.

## Enable the default share action

If you don't provide a custom share action, it is a good idea to enable the browser's default share action in the overflow menu to make it easier for users to share a link to the content they are seeing:

```java
    CustomTabsIntent.Builder intentBuilder = new CustomTabsIntent.Builder();
    intentBuilder.setShareState(CustomTabsIntent.SHARE_STATE_ON);
```

## Add a custom action button

For important actions, the Custom Tab toolbar lets you integrate a custom action button, which can either have a text label or a custom icon. The icon should be 24dp in height and 24-48 dp in width.

{% Img src="image/6hHqS5auVgWhN0cQNQztaJx5w4M2/9eJW75CRW22UVx7FYnqs.png", alt="Custom Tab with a custom share action", width="320", height="184", class="screenshot screenshot--filled" %}

For example, you can add a custom share action to the toolbar. To do this, create a [`BroadcastReceiver`](https://developer.android.com/guide/components/broadcasts#receiving-broadcasts) which gets called when the user clicks on the share action in the Custom Tab.

Register the `BroadCastReceiver` in the `AndroidManifest.xml` file:

```xml
<application …>
  <receiver android:name=".ShareBroadcastReceiver" />
</application>
```

Then add a new class, `ShareBroadcastReceiver`. In the `onReceive()` method, extract the currently displayed URL from the intent and trigger a send intent.

```java
public class ShareBroadcastReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        String url = intent.getDataString();
        Intent sendIntent = new Intent();
        sendIntent.setAction(Intent.ACTION_SEND);
        sendIntent.putExtra(Intent.EXTRA_TEXT, url);
        sendIntent.setType("text/plain");
        Intent shareIntent = Intent.createChooser(sendIntent, null);
        context.startActivity(shareIntent);
    }
}
```

Now, create a `PendingIntent` for `ShareBroadcast` and register it via [`setActionButton()`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent.Builder#setActionButton(android.graphics.Bitmap,java.lang.String,android.app.PendingIntent)). Pass the pending intent together with the icon and the description.

```java
String shareDescription = getString(R.string.label_action_share);
Bitmap shareIcon = BitmapFactory.decodeResource(getResources(),
       android.R.drawable.ic_menu_share);

// Create a PendingIntent to your BroadCastReceiver implementation
Intent actionIntent = new Intent(
       this.getApplicationContext(), ShareBroadcastReceiver.class);
PendingIntent pendingIntent =
       PendingIntent.getBroadcast(getApplicationContext(), 0 /* request code */, actionIntent, PendingIntent.FLAG_MUTABLE);          

//Set the pendingIntent as the action to be performed when the button is clicked.
CustomTabsIntent intentBuilder = new CustomTabsIntent.Builder()
    …
    .setActionButton(shareIcon, shareDescription, pendingIntent)
    .build();
```

## Add custom menu items

Custom tabs has as many as five default actions provided by the browser: "Forward", "Page Info", "Refresh", "Find in Page" and "Open in Browser". Additionally, you can add up to five more, which will be inserted between the icon row and the browser-provided items. (See the image below.)

You can access your custom actions via the three dot menu in the top right corner:

{% Img src="image/6hHqS5auVgWhN0cQNQztaJx5w4M2/3WXYfUUMRMqzNwgIT1Ao.png", alt="Custom Tab with five custom menu items.", width="320", height="693", class="screenshot screenshot--filled" %}

To add a menu item, call [`CustomTabsIntent.Builder.addMenuItem()`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent.Builder#addMenuItem(java.lang.String,android.app.PendingIntent)) with title and a [`PendingIntent`](https://developer.android.com/reference/android/app/PendingIntent). When the user taps on a menu item, the browser will fire the `PendingIntent`.


```java
CustomTabsIntent intent = new CustomTabsIntent.Builder()
        ...
        .addMenuItem("Menu item 1", pendingIntent)
        .addMenuItem("Menu item 2", pendingIntent)
        .addMenuItem("Menu item 3", pendingIntent)
        .addMenuItem("Menu item 4", pendingIntent)
        .addMenuItem("Menu item 5", pendingIntent)
        .build();
```

## Customize the close button

To better fit a Custom Tab into the flow of your app, customize the close button. If you want the user to feel like Custom Tabs is a modal dialog, use the default `“X”` button. If you want the user to feel the Custom Tab is part of the application flow, use the back arrow.

```java
CustomTabsIntent.Builder intentBuilder = new CustomTabsIntent.Builder();
intentBuilder.setCloseButtonIcon(BitmapFactory.decodeResource(
    getResources(), R.drawable.ic_arrow_back));
```

## Add a bottom toolbar

The bottom toolbar is a very flexible way to add more functionality to a Custom Tab.

{% Img src="image/6hHqS5auVgWhN0cQNQztaJx5w4M2/e0evUtBxkP0uI7kVj8PS.png", alt="Custom Tab with a bottom toolbar", width="320", height="693", class="screenshot screenshot--filled" %}

By passing a [`RemoteViews`](https://developer.android.com/reference/android/widget/RemoteViews?cmdf=android+remoteviews) object to [CustomTabIntent.Builder.setSecondaryToolbarViews()](https://developer.android.com/reference/android/support/customtabs/CustomTabsIntent.Builder.html#setSecondaryToolbarViews(android.widget.RemoteViews,%20int[],%20android.app.PendingIntent)), the bottom toolbar can be fully customized and dynamically updated.

First, declare a toolbar layout by creating a new layout file, `res/layout/custom_tab_toolbar.xml`:

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal"
    android:gravity="center">

    <Button xmlns:android="http://schemas.android.com/apk/res/android"
        android:id="@+id/ct_toolbar_next"
        android:layout_width="wrap_content"
        android:layout_height="48dp"
        android:layout_margin="8dp"
        android:padding="8dp"
        android:paddingStart="16dp"
        android:paddingEnd="16dp"
        android:text="Next" />

    <Button xmlns:android="http://schemas.android.com/apk/res/android"
        android:id="@+id/ct_toolbar_previous"
        android:layout_width="wrap_content"
        android:layout_height="48dp"
        android:layout_margin="8dp"
        android:padding="8dp"
        android:text="Previous" />
</LinearLayout>
```

{% Aside 'gotchas' %}
The [Custom Tab's color scheme](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent.Builder?cmdf=custom%20tabs%20intent%20builder#setDefaultColorSchemeParams(androidx.browser.customtabs.CustomTabColorSchemeParams)) does not apply here. You need to manually style the toolbar. If your app provides a light and a dark scheme, you need to configure two different toolbars, one for each color scheme.
{% endAside %}

The next step is to register a [`BroadcastReceiver`](https://developer.android.com/guide/components/broadcasts#receiving-broadcasts), which handles toolbar interactions, in the `AndroidManifest.xml` file:

```xml
<application …>
  <receiver android:name=".CustomTabBottomToolbarBroadcastReceiver" />
</application>
```

Then implement the `BroadcastReceiver`, which will handle all interactions with the bottom toolbar:

```java
public class BottomToolbarBroadcastReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        String url = intent.getDataString();
        int remoteViewId = intent.getIntExtra(EXTRA_REMOTEVIEWS_CLICKED_ID, -1);
        if (remoteViewId == R.id.ct_toolbar_previous) {
          // handle previous
        } else if (remoteViewId == R.id.ct_toolbar_next) {
          // handle next
        }
    }
}
```

Finally, register the toolbar:

```java
// Create the pending intent
Intent actionIntent = new Intent(
       this.getApplicationContext(), BottomToolbarBroadcastReceiver.class);

PendingIntent pendingIntent =
       PendingIntent.getBroadcast(getApplicationContext(), 0 /* request code */, actionIntent, PendingIntent.FLAG_MUTABLE);          

// Pass the toolbar layout to the RemoteViews instance
RemoteViews secondaryToolbarViews = new RemoteViews(getPackageName(), R.layout.custom_tab_toolbar);
// All toolbar buttons
int[] clickableIds = {R.id.ct_toolbar_next, R.id.ct_toolbar_previous};

// Register the bottom toolbar when creating a new custom tab intent
CustomTabsIntent intent = new CustomTabsIntent.Builder()
    .setSecondaryToolbarViews(secondaryToolbarViews, clickableIds, toolbarPendingIntent)
    .build();
```


Next up: [Learn how to speed up loading web content in a Custom Tab](/docs/android/custom-tabs/guide-warmup-prefetch/).
