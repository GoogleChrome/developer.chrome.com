---
layout: "layouts/doc-post.njk"
title: "Remote Debugging WebViews"
# authors:
#   - megginkearney
date: 2015-04-13
updated: 2020-07-10
description: "Debug WebViews in your native Android apps using Chrome Developer Tools."
---

Debug WebViews in your native Android apps using Chrome Developer Tools.

On Android 4.4 (KitKat) or later, use DevTools to debug WebView content in native Android
applications.

### TL;DR {: #tldr }

- Enable WebView debugging in your native Android app; debug WebViews in Chrome DevTools.
- Access list of debug-enabled WebViews via **chrome://inspect**.
- Debugging WebViews is the same as debugging a web page through [remote debugging][1].

## Configure WebViews for debugging {: #configure_webviews_for_debugging }

WebView debugging must be enabled from within your application. To enable WebView debugging, call
the static method [setWebContentsDebuggingEnabled][2] on the WebView class.

```
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
    WebView.setWebContentsDebuggingEnabled(true);
}
```

This setting applies to all of the application's WebViews.

**Tip**: WebView debugging is **not** affected by the state of the `debuggable` flag in the
application's manifest. If you want to enable WebView debugging only when `debuggable` is `true`,
test the flag at runtime.

```
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
    if (0 != (getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE))
    { WebView.setWebContentsDebuggingEnabled(true); }
}
```

## Open a WebView in DevTools {: #open_a_webview_in_devtools }

The **chrome://inspect** page displays a list of debug-enabled WebViews on your device.

To start debugging, click **inspect** below the WebView you want to debug. Use DevTools as you would
for a remote browser tab.

![Inspecting elements in a WebView](/web/tools/chrome-devtools/remote-debugging/imgs/webview-debugging.png)

The gray graphics listed with the WebView represent its size and position relative to the device's
screen. If your WebViews have titles set, the titles are listed as well.

## Troubleshooting {: #troubleshooting }

Can't see your WebViews on the **chrome://inspect page**?

- Verify that WebView debugging is enabled for your app.
- On your device, open the app with the WebView you want to debug. Then, refresh the
  **chrome://inspect** page.

[1]: /web/tools/chrome-devtools/debug/remote-debugging
[2]:
  https://developer.android.com/reference/android/webkit/WebView.html#setWebContentsDebuggingEnabled(boolean)
