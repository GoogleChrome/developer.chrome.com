---
layout: "layouts/doc-post.njk"
title: Multi-tasking with Partial Custom Tabs
seoTitle: "Guide: Multi-tasking with Partial Custom Tabs"
date: 2023-04-21
description: Learn how to you use partial Custom Tabs to let your users interact with your app while viewing web content. 
authors:
  - sebastianbenz
---

By default, Custom Tabs launch as a full-window activity. Starting in Chrome 107, you can use partial Custom Tabs to specify a different launch height in portrait mode such that users can multitask by interacting with your app while viewing web content. Users can expand the Custom Tab to full-screen by dragging the toolbar handle up and restoring the initial launch height by dragging the handle down.

{% Img src="image/6AZNJBRnkpQUWTKPzig99lQY8jT2/iMTvWNK7aEqqxHEHEXuv.png", alt="Example Partial Tab", width="320", height="640", class="screenshot screenshot--filled" %}

To turn a Custom Tab into a partial Custom Tab, define the initial launch height in pixels by calling the  `CustomTabBuilder` class’s [`setInitialActivityHeightPx()`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent.Builder#setInitialActivityHeightPx(int)) method. By default, the partial Custom Tab is resizable, but you can pass [`ACTIVITY\_HEIGHT\_FIXED`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent#ACTIVITY_HEIGHT_FIXED()) to disable this behavior:

```java
new CustomTabsBuilder().setInitialActivityHeightPx(
    400,
    ACTIVITY_HEIGHT_FIXED
);
```

{% Aside 'gotchas' %}
The minimum partial custom tab height is 50% of the screen height. If the screen height is set to a value less than 50% of the screen height, Chrome automatically adjusts the Custom Tab to 50% of the screen height. 
{% endAside %}

Furthermore, you need to either:

* [start a new browser session via a `CustomTabsServiceConnection`](/docs/android/custom-tabs/integration-guide/#connect-to-the-custom-tabs-service) and pass it to the Custom Tabs intent or

* start the Custom Tab activity via [`startActivityForResult()`](https://developer.android.com/reference/android/app/Activity#startActivityForResult(android.content.Intent,%20int)).

Combine both approaches if you want to guarantee a fast startup in case the service connection has not been established yet. 

{% Aside 'gotchas' %}
* Specifying the initial activity height will not have an effect if the default browser does not support partial Custom Tabs. In this case, the intent extra will be ignored and the Custom Tab will span the complete display height.
* `CustomTabColorScheme.navigationBarColor` and `CustomTabColorScheme.navigationBarDividerColor` properties do not work when building an intent for a partial Custom Tab. This is because they inherit the host app's color scheme for the user interface properties above. You will be responsible for ensuring visual consistency for these properties before launching a Custom Tab.
{% endAside %}

## Launch a partial Custom Tab with an existing session

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

## Launch a partial Custom Tab via startActivityForResult

```java
private ActivityResultLauncher<String> mCustomTabLauncher = registerForActivityResult(new ActivityResultContract<String, Integer>() {
    @Override
    public Integer parseResult(int statusCode, @Nullable Intent intent) {
        return statusCode;
    }

    @NonNull
    @Override
    public Intent createIntent(@NonNull Context context, String url) {
        CustomTabsIntent.Builder builder = new CustomTabsIntent.Builder(customTabsSession)
                .setInitialActivityHeightPx(500)
                .setCloseButtonPosition(CustomTabsIntent.CLOSE_BUTTON_POSITION_END)
                .setToolbarCornerRadiusDp(10);
        Intent customTabsIntent = builder.build().intent;
        customTabsIntent.setData(Uri.parse(url));
        return customTabsIntent;
    }
}, new ActivityResultCallback<Integer>() {
    @Override
    public void onActivityResult(Integer statusCode) {
       // ...
    }
});

@Override
public void onCreate(@Nullable Bundle savedInstanceState) {
    Button selectButton = findViewById(R.id.select_button);
    selectButton.setOnClickListener(new OnClickListener() {
        @Override
        public void onClick(View view) {
            mCustomTabLauncher.launch(customTabsIntent.intent);
        }
    });
}
```

Next up: learn how to [measure user engagement in your Custom Tabs](/docs/android/custom-tabs/guide-engagement-signals/).
