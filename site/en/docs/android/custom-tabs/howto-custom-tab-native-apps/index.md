---
layout: "layouts/doc-post.njk"
title: Let native applications handle the content
seoTitle: How to let native applications handle content 
date: 2020-02-04
updated: 2023-05-03
description: Learn how to open links in either a native app or a Custom Tab.
---

On Android, URLs can be handled by native applications. If the user has the Twitter app installed and
clicks on a link to a tweet, they usually prefer that the Twitter application will be opened instead of the browser.
When using Custom Tabs, you can support this use case by checking if a native app can handle a link, before opening a Custom Tab.

## On Android 11 and above

Android 11 introduces a new intent flag, [`Intent.FLAG_ACTIVITY_REQUIRE_NON_BROWSER`][1], which is the
recommended way to try opening a native app, as it doesn't require the app to declare any package
manager queries.

The approach is to try to launch an intent and use `Intent.FLAG_ACTIVITY_REQUIRE_NON_BROWSER` to ask
Android to avoid browsers when launching. If a native app that is capable of handling this Intent is not found, an
`ActivityNotFoundException` will be thrown.

```java
static boolean launchNativeApi30(Context context, Uri uri) {
    Intent nativeAppIntent = new Intent(Intent.ACTION_VIEW, uri)
            .addCategory(Intent.CATEGORY_BROWSABLE)
            .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK |
                    Intent.FLAG_ACTIVITY_REQUIRE_NON_BROWSER);
    try {
        context.startActivity(nativeAppIntent);
        return true;
    } catch (ActivityNotFoundException ex) {
        return false;
    }
}
```

## Before Android 11

Even though the application may target Android 11, or API level 30, previous Android versions will
not understand the `FLAG_ACTIVITY_REQUIRE_NON_BROWSER` flag. To support those devices:

1. Use the [PackageManager](https://developer.android.com/reference/android/content/pm/PackageManager?cmdf=android+packagemanager) to query for applications supporting a generic "http" intent. Those applications are likely browsers.
2. Then, query for applications that handle intents for the specific URL you want to launch. This will
return both browsers and native applications set up to handle that URL.
3. Now, remove all browsers found on the first list from the second list. The resulting list only includes native apps.
4. If the list is empty, there are no native handlers and return false. Otherwise, launch
the intent for the native handler.

```java
private static boolean launchNativeBeforeApi30(Context context, Uri uri) {
    PackageManager pm = context.getPackageManager();

    // Get all Apps that resolve a generic url
    Intent browserActivityIntent = new Intent()
            .setAction(Intent.ACTION_VIEW)
            .addCategory(Intent.CATEGORY_BROWSABLE)
            .setData(Uri.fromParts("http", "", null));
    Set<String> genericResolvedList = extractPackageNames(
            pm.queryIntentActivities(browserActivityIntent, 0));

    // Get all apps that resolve the specific Url
    Intent specializedActivityIntent = new Intent(Intent.ACTION_VIEW, uri)
            .addCategory(Intent.CATEGORY_BROWSABLE);
    Set<String> resolvedSpecializedList = extractPackageNames(
            pm.queryIntentActivities(specializedActivityIntent, 0));

    // Keep only the Urls that resolve the specific, but not the generic
    // urls.
    resolvedSpecializedList.removeAll(genericResolvedList);

    // If the list is empty, no native app handlers were found.
    if (resolvedSpecializedList.isEmpty()) {
        return false;
    }

    // We found native handlers. Launch the Intent.
    specializedActivityIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    context.startActivity(specializedActivityIntent);
    return true;
}
```


### Putting it all together

We need to ensure we are using the right method for each occasion: 

```java
static void launchUri(Context context, Uri uri) {
    boolean launched = Build.VERSION.SDK_INT >= 30 ?
            launchNativeApi30(context, uri) :
            launchNativeBeforeApi30(context, uri);

    if (!launched) {
        new CustomTabsIntent.Builder()
                .build()
                .launchUrl(context, uri);
    }
}
```

`Build.VERSION.SDK_INT` provides the information we need. If it's equal or larger than 30, Android
knows the `FLAG_ACTIVITY_REQUIRE_NON_BROWSER` and we can try launching a native app with the new
approach. Otherwise, we try launching with the old approach.

If launching a native app fails, we then launch a Custom Tab.

[1]: https://developer.android.com/reference/android/content/Intent#FLAG_ACTIVITY_REQUIRE_NON_BROWSER
