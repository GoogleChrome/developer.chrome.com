---
layout: 'layouts/blog-post.njk'
title: Debugging websites in Chrome on iOS 16.4+
description: >
  Learn how to use Safari Web Inspector debugging for Chrome on iOS.
authors:
  - mikedougherty
date: 2023-07-18
---

From Chrome 115 you can enable Safari Web Inspector debugging for Chrome on iOS. This post explains how to get started.

Prior to Chrome 115, debugging webpages required building Chrome for iOS from source, as the release version of WKWebView did not support remote Web Inspector debugging. In Chrome 73, we added the [chrome://inspect page](https://blog.chromium.org/2019/03/debugging-websites-in-chrome-for-ios.html) which locally displays JavaScript logs to assist in debugging webpages. Now that WKWebView allows Web Inspector debugging in release (as of iOS 16.4), we have added a setting in Chrome 115 to enable this feature and further improve the developer experience.

## Getting started

On your iOS device you need:

-  iOS 16.4 or greater.
-  Chrome 115 or greater.

On your Mac you need:

-  The Safari **Develop** menu enabled. Enable this from Safari application settings, Advanced Settings tab.

On your iOS device launch the Chrome app and navigate to **Settings**. In **Content Settings**, enable Web Inspector. Relaunch Chrome for iOS after changing this setting.

## Debugging your site

With the setting enabled, you can debug any page running in Chrome for iOS by following these steps.

1. Connect your iOS device to a Mac with a cable.
1. In Chrome for iOS, navigate to the website which you'd like to inspect.
1. On your Mac, launch Safari. From the **Develop** menu, hover over the name of your connected device and select the url of the website which you would like to inspect.

The displayed Web Inspector window will allow debugging of the current web view. For more details about using Safari Developer Tools, refer to Apple's [documentation](https://support.apple.com/guide/safari-developer/safari-developer-tools-overview-dev073038698/mac).
