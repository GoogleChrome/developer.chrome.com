---
layout: "layouts/doc-post.njk"
title: "Kiosk Apps"
seoTitle: "Kiosk Chrome Apps [Deprecated]"
date: 2013-05-11
updated: 2014-07-18
description: Reference documentation for the kiosk_enabled property of manifest.json.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

Kiosk Apps are Chrome Apps that are designed to always run fullscreen using [Single App Kiosk
Mode][3] on ChromeOS and do not allow the user to exit the app. They're great for a purpose-built
Chrome device, such as a guest registration desk, a library catalog station, or a point-of-sale
system in a store.

A Kiosk App can be launched manually or set to automatically launch when the device boots up. You
can use a Chrome device as a kiosk by turning on Single App Kiosk mode [manually for each
device][4], or across multiple devices using the [Chrome management console][5].

## How they look {: #Look }

Once the Kiosk App starts, the user experience is dedicated to the tasks defined by the app. The app
does not look like the traditional Chrome browser: there is no window frame, no Omnibox (address
bar), no tab strip, and no other browser interface elements. So as a developer, every pixel of the
screen is yours to use as you wish.

## How they behave {: #Behavior }

When a Kiosk App is configured to run on ChromeOS using [Single App Kiosk Mode][6], the user has no
control over the app's lifecycle. The user cannot exit the app or switch to another task. However,
as an app developer, you can offer a "logout" or "exit" button within the app to close all its
windows, which terminates the session and returns the user to the login screen.

Single App Kiosk Mode optimizes bandwidth use and speed by downloading and installing the app so it
can launch each time without installation delays. Each time a Kiosk App launches, the system checks
for updates in the Chrome Web Store to ensure that the latest app version is installed, unless the
app is set to be [enabled offline][7]. Thereafter, the system checks for updates every five hours
and installs the update if available. If the device is offline, the update is rescheduled to a later
time when the app is back online.

Any data the app stores using the [FileSystem][8] API persists across executions of the app,
allowing you to download and cache any assets your app may need while offline. As a developer, you
need to ensure that user data is stored locally while offline, then synced to your data server once
online (see [Offline First][9]).

Once the app is installed, it is available to anyone who walks up to the ChromeOS device. There is
no need for users to log in before using Single App Kiosk Mode.

## How to develop a Kiosk App {: #Develop }

If you know how to build a [Chrome App][10], then you know how to build a Kiosk App because they use
the same [app architecture][11]. All you have to do is set `"kiosk_enabled"` to `true` in your app's
[manifest file][12]. Your app can then run in either a regular session or Single App Kiosk Mode. If
you want your app to run in Single App Kiosk Mode only, then also set `"kiosk_only"` to `true`. This
prevents the app from being launched in a regular session. For example:

```json
{
  "app" : {
    "background" : {
      "scripts" : ["background.js"]
    }
  },
  "manifest_version" : 2,
  "name" : "My Kiosk App",
  "version" : "1.0",
  ...

  // Set as Kiosk App
  "kiosk_enabled" : true,
  "kiosk_only" : true
}
```

To determine whether the app is being run in a regular session or Single App Kiosk Mode, you can
inspect the `isKioskSession` boolean that's included in the `launchData` object from the
[app.runtime.onLaunched][13] event.

If you want to monetize your app, your app must handle all payment logic. You cannot monetize a
Kiosk App through the [Chrome web store payment flow][14].

### Sample apps {: #Samples }

- [LiveStream/Interactive display app][15]
- [Point of sale app][16]
- [Movie theater app][17]
- [Kiosk apps in the Chrome Web Store][18]

[1]: https://blog.chromium.org/2020/08/changes-to-chrome-app-support-timeline.html
[2]: /apps/migration
[3]: https://support.google.com/chromebook/answer/3134673
[4]: https://support.google.com/chromebook/answer/3134673
[5]: https://support.google.com/chrome/a/answer/3017014
[6]: https://support.google.com/chromebook/answer/3134673
[7]: /apps/manifest/offline_enabled
[8]: /apps/fileSystem
[9]: /docs/apps/offline_apps
[10]: /apps/about_apps
[11]: /apps/app_architecture
[12]: /apps/manifest
[13]: /apps/app_runtime#event-onLaunched
[14]: /webstore/money
[15]: https://github.com/KioskApps/InfoHub
[16]: https://github.com/KioskApps/SalesPoint
[17]: https://github.com/KioskApps/QuickTicket
[18]: https://chrome.google.com/webstore/category/collection/kiosk-apps
