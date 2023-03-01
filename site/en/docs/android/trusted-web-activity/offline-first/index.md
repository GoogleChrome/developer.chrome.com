---
layout: "layouts/doc-post.njk" 
title: Offline-First Trusted Web Activities 
date: 2021-05-11 
description: How to display a fallback offline screen, if the first time the user opens the app, there's no connectivity. 
authors:
    - demianrenzulli
---

The first time a user launches a Progressive Web App (PWA) via Trusted Web
Activity, the service worker won't yet be available since [the registration
process](https://developers.google.com/web/fundamentals/primers/service-workers/registration)
hasn't taken place yet. Additionally, if the user doesn't have connectivity during the first app
launch, instead of the custom offline experience, the network error page is
shown.

An example of this scenario might take place after the user downloads the PWA
from the Play Store. If the user doesn't have connectivity when trying to open
the app for the first time, the service worker won't yet be available to show
the offline fallback page, therefore. The standard error page will be shown,
leading to a bad experience.

{% Img src="image/26V1DWN36MZr3mUo8ChSBlCpzp43/SixNJuHH01eY6u96Owo1.png",
alt="TWA offline: the standard offline page", width="533", height="372" %}

This guide explains how to display your own activity in this situation by
checking the status of the network before launching the Trusted Web Activity.

{% Aside %} 
A prerequisite of this guide is to have a Trusted Web Activity app
running. Follow the steps in the [Integration
Guide][1]
to create a basic Trusted Web Activity project. 
{% endAside%}

## Create a custom LauncherActivity

The first step is to create a custom launcher activity. This `Activity`
that will contain the offline screen to show if there's no connectivity
the first time a user opens the app.

Call the Activity `OfflineFirstTWALauncherActivity`, and make it extend:
`com.google.androidbrowserhelper.trusted.LauncherActivity`.

```java
import com.google.androidbrowserhelper.trusted.LauncherActivity;

public class OfflineFirstTWALauncherActivity extends LauncherActivity {

}
```

Next, register the Activity in `AndroidManifest.xml`:

```xml
<activity android:name=".OfflineFirstTWALauncherActivity" android:theme="@style/Theme.Design.NoActionBar">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
    <!-- Edit android:value to change the url opened by the Trusted Web Activity -->
    <meta-data android:name="android.support.customtabs.trusted.DEFAULT_URL" android:value="https://airhorner.com" />
    <!-- This intent-filter adds the Trusted Web Activity to the Android Launcher -->
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <!-- Edit android:host to handle links to the target URL -->
        <data android:host="airhorner.com" android:scheme="https" />
    </intent-filter>
</activity>
```

The previous code registers `OfflineFirstTWALauncherActivity` as a launcher
activity and defines [https://airhorner.com](https://airhorner.com) as the URL
to open when the TWA launches. 

## Handle offline scenarios

First, inside the Activity, override the `shouldLaunchImmediately()` method and
make it return `false`, so that the Trusted Web Activity won't launch
immediately. You can also add extra checks before the initial launch:

```java
@Override
protected boolean shouldLaunchImmediately() {
    // launchImmediately() returns `false` so we can check connection
    // and then render a fallback page or launch the Trusted Web Activity with `launchTwa()`.
    return false;
}
```

Override the `onCreate()` method to check the network status before the TWA
launches. Add a call to `tryLaunchTwa()`, a helper method that will contain that
logic:

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    tryLaunchTwa();
}
```

Next, implement `tryLaunchTwa()`:

```java
private void tryLaunchTwa() {
    // If TWA has already launched successfully, launch TWA immediately.
    // Otherwise, check connection status. If online, launch the Trusted Web Activity with `launchTwa()`.
    // Otherwise, if offline, render the offline fallback screen.
    if (hasTwaLaunchedSuccessfully()) {
        launchTwa();
    } else if (isOnline()) {
        firstTimeLaunchTwa();
    } else {
        renderOfflineFallback();
    }
}
```

The previous code handles three scenarios:

- If the TWA has launched previously, the service worker has
  been registered, and the PWA will be able to respond offline. In that case,
  call `launchTwa()`, defined in the parent class, to launch the
  Trusted Web Activity directly.
- If the TWA hasn't launched previously and the user is online, launch the
  Trusted Web Activity for the first time using the `firstTimeLaunchTwa()`
  method that you'll implement later.
- If the TWA hasn't already launched and the user is offline, render the native
  offline fallback screen.

## Implement helper methods

The final step is to implement the helper methods called by the previous code.
Here's the code for checking offline state `isOnline()`:

```java
private boolean isOnline() {
    ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
    NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
    return activeNetworkInfo != null && activeNetworkInfo.isConnected();
}
```

Next, implement `hasTwaLaunchedSuccessfully()`, which checks if the TWA has
launched at least once:

```java
private boolean hasTwaLaunchedSuccessfully() {
    // Return `true` if the preference "twa_launched_successfully" has already been set.
    SharedPreferences sharedPref = getSharedPreferences(getString(R.string.twa_offline_first_preferences_file_key), Context.MODE_PRIVATE);
    return sharedPref.getBoolean(getString(R.string.twa_launched_successfully), false);
}
```

The previous code calls the `launchTWA()` from the parent class, and saves the
`twa_launched_successfully` flag in shared preferences. This indicates that the TWA
has launched successfully, at least once.

The remaining helper method, `renderOfflineFallback()` renders an Android
offline screen. 

```java
private void renderOfflineFallback() {
    setContentView(R.layout.activity_offline_first_twa);

    Button retryBtn = this.findViewById(R.id.retry_btn);
    retryBtn.setOnClickListener(new View.OnClickListener() {
        public void onClick(View v) {
            // Check connection status. If online, launch the Trusted Web Activity for the first time.
            if (isOnline()) firstTimeLaunchTwa();
        }
    });
}
```

Fort his demo, we have defined the `activity_offline_first_twa` layout, which
contains a button to retry, which will, in time, to execute
`firstTimeLaunchTwa()` after checking the connection.

{% Img src="image/26V1DWN36MZr3mUo8ChSBlCpzp43/pzkHBtYxsTXIdsfjFfYF.png",
alt="twa offline - custom offline screen", width="533", height="394" %}

## Conclusion

- The first time a user launches a Progressive Web App (PWA) via Trusted Web
  Activity, the service worker won't yet be available.
- To avoid showing the standard offline screen if the user has no connectivity,
  you can detect the offline condition and show a fallback offline screen
  instead.
- In this guide you learned how to implement that strategy. If you are
  interested in checking the code we used throughout this guide, you can find
  the complete solution in the [Offline First TWA
  Demo](https://github.com/GoogleChrome/android-browser-helper/tree/main/demos/twa-offline-first).

[1]: /docs/android/trusted-web-activity/integration-guide/