---
layout: "layouts/doc-post.njk"
title: Check if an Android device has a browser that supports Custom Tabs?
date: 2020-02-04
updated: 2023-05-03
description: Learn how to check whether an Android device has a browser that supports Custom Tab.
---

If you want to know whether the default browser or any browser on a device supports Custom Tabs, use the [`getPackageName`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsClient#getPackageName(android.content.Context,java.util.List%3Cjava.lang.String%3E,boolean)) helper in `CustomTabsClient`:

```java
String packageName = CustomTabsClient.getPackageName(
        context, 
        Collections.emptyList()
);
if (packageName == null) {
    // Custom Tabs are not supported by the default browser
}
```

You can also check if any browser on the device supports Custom Tabs:

```java
// Get all apps that can handle VIEW intents and Custom Tab service connections.
Intent activityIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://www.example.com"));
PackageManager packageManager = context.getPackageManager();
List<ResolveInfo> viewIntentHandlers = packageManager.queryIntentActivities(activityIntent, 0);
// Get a package that supports Custom Tabs
String packageName = CustomTabsClient.getPackageName(
        context, 
        viewIntentHandlers,
        true /* ignore default */
);
if (packageName == null) {
    // Custom Tabs are not supported by any browser on the device
}
```

Android 11 has introduced package visibility changes. If your Android app is targeting API level 30 or above, adding the following queries section to `AndroidManifest.xml` is needed, otherwise the code snippet above won't return results:

```xml
<queries>
    <intent>
        <action android:name=
            "android.support.customtabs.action.CustomTabsService" />
    </intent>
</queries>
```

