---
layout: "layouts/doc-post.njk"
title: Customizing the UI
seoTitle: "Guide: customizing the Custom Tab UI"
date: 2023-04-21
description: How to make a Custom Tab match the look and feel of your app.
authors:
  - sebastianbenz
---

One advantage of Custom Tabs is that it can be seamlessly integrated into your app. In this part of the Custom Tabs guide, you will learn how to change the appearance and behavior of a Custom Tab to match your app.

## Set the color of the toolbar

{% Columns %}

{% Column %}
{% Img src="image/6hHqS5auVgWhN0cQNQztaJx5w4M2/OEyGhy3ea1pZfqOYVFcA.png", alt="Custom Tab with a custom light color scheme", width="300", height="577", class="screenshot screenshot--filled" %}
Light mode
{% endColumn %}

{% Column %}
{% Img src="image/6hHqS5auVgWhN0cQNQztaJx5w4M2/1K0VdsxhR76P5UXBNc2I.png", alt="Custom Tab with a custom dark color scheme", width="300", height="577", class="screenshot screenshot--filled" %}
Dark mode
{% endColumn %}

{% endColumns %}

First, customizing the Custom Tab’s address bar to be consistent with your app's theme. The snippet below changes the default toolbar color by setting [setDefaultColorSchemeParams](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent.Builder?cmdf=setDefaultColorSchemeParams%20custom%20tabs#setDefaultColorSchemeParams(androidx.browser.customtabs.CustomTabColorSchemeParams)). If your app also supports a dark color scheme, set it via [.setColorSchemeParams(CustomTabsIntent.COLOR_SCHEME_DARK, …)](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent.Builder#setColorSchemeParams(int,androidx.browser.customtabs.CustomTabColorSchemeParams)).

```java
// get the current toolbar background color (this might work differently in your app)
@ColorInt int colorPrimaryLight = ContextCompat.getColor(MainActivity.this, R.color.md_theme_light_primary);
@ColorInt int colorPrimaryDark = ContextCompat.getColor(MainActivity.this, R.color.md_theme_dark_primary);

CustomTabsIntent intent = new CustomTabsIntent.Builder()
        // set the default color scheme
        .setDefaultColorSchemeParams(new CustomTabColorSchemeParams.Builder()
                .setToolbarColor(colorPrimaryLight)
                .build())
        // set the alternative dark color scheme
        .setColorSchemeParams(CustomTabsIntent.COLOR_SCHEME_DARK, new CustomTabColorSchemeParams.Builder()
                .setToolbarColor(colorPrimaryDark)
                .build())
        .build();
```

The toolbar now has custom background and foreground colors.

{% Aside 'gotchas' %}
The Custom Tab protocol does [not support changing the color of the status bar](https://b.corp.google.com/issues/37083468).
{% endAside %}

## Configure custom enter and exit animation

{% Video src="video/6hHqS5auVgWhN0cQNQztaJx5w4M2/GzQ4Bl5U3ssDtS8W6C7G.mp4", width="320", height="692", controls="true", class="screenshot screenshot--filled" %}
Next, you can make launching (and leaving) a Custom Tab experience in your app more seamless, by defining  custom start and exit animations using <code>[setStartAnimation](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent.Builder#setStartAnimations(android.content.Context,int,int))</code> and <code>[setExitAnimation](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent.Builder#setExitAnimations(android.content.Context,int,int))</code>:

```java
CustomTabsIntent intent = new CustomTabsIntent.Builder()
…
.setStartAnimations(MainActivity.this, R.anim.slide_in_right, R.anim.slide_out_left)
.setExitAnimations(MainActivity.this, android.R.anim.slide_in_left, android.R.anim.slide_out_right)
.build();
```

## Further customizations: Title, Autohide AppBar, custom close icon, and Referrer

{% Video src="video/6hHqS5auVgWhN0cQNQztaJx5w4M2/6VwbdckaWUVq9sNZAosC.mp4", width="320", height="692", class="screenshot screenshot--filled" %}

There are a few more things you can do to adjust the UI of a Custom Tab to your needs.

1. Hide the URL bar on scroll to give the user more space to explore web content using <code>[setUrlBarHidingEnabled](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent.Builder#setUrlBarHidingEnabled(boolean))(true)</code>
2. Show the document title instead of the URL via <code>[setShowTitle](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent.Builder#setShowTitle(boolean))(true)</code>.
3. Customize the close button to match the user flow in your app, for example, by showing a back arrow instead of the default <code>X</code> icon):   <code>[setCloseButtonIcon](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent.Builder#setCloseButtonIcon(android.graphics.Bitmap))(myCustomCloseIcon)</code>.

These are all optional, but they can improve the Custom Tab experience in your app.

```java
Bitmap myCustomCloseIcon = getDrawable(R.drawable.ic_baseline_arrow_back_24));
CustomTabsIntent intent = new CustomTabsIntent.Builder()
  …
  .setUrlBarHidingEnabled(true)
  .setShowTitle(true)
  .setCloseButtonIcon(toBitmap(myCustomCloseIcon))
  .build();
```

## Optional: setting a custom referrer

You can set your app as the referrer when launching your Custom Tab. This way you can let websites know where their traffic is coming from.

```java
CustomTabsIntent customTabsIntent = new CustomTabsIntent.Builder().build()
customTabsIntent.intent.putExtra(Intent.EXTRA_REFERRER,
       Uri.parse("android-app://" + context.getPackageName()));
```

Next up: [learn how to add custom action to your Custom Tab](/docs/android/custom-tabs/guide-interactivity/).
