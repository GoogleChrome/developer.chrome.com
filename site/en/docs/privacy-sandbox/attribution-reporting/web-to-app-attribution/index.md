---
layout: 'layouts/doc-post.njk'
title: 'App-to-web and web-to-app measurement'
subhead: >
  Learn how your Chrome app can pass attributions to your Android app.  
description: >
  Learn how your Chrome app can pass attributions to your Android app.    
date: 2023-08-09
authors:
  - maudn
---

The Privacy Sandbox natively supports cross- web and app attribution, and the Attribution Reporting API allows measurement across mobile browsers and Android apps.



## What is web-to-app attribution?

Web-to-app attribution means if a user clicks an ad in a Chrome mobile browser, and then goes on to later make a purchase in an Android app, the Attribution Reporting API can directly attribute that conversion performed in the Android app to the ads shown in the Chrome mobile browser.

The same is true in the reverse. if a user clicks an ad in an Android app, and then goes on to later make a purchase in a Chrome mobile browser, the Attribution Reporting API can directly attribute that conversion.

Note that the API records web-to-app attributions when they occur on the same device.

## How is this implemented in code?

First, you'll want to make sure that cross-web and app measurement is available in your web code base.
To do this, when you register an event, include the header, `Attribution Reporting Eligible`,
in your request to the reporting origin.

The browser will broadcast if OS-level support is available to the reporting origin server with a dictionary structured request header.

Then you will want to continue to register that the ad was clicked, otherwise known as [registering a source](/docs/privacy-sandbox-attribution-reporting/register-source/).

If OS support is available, the reporting origin should send back a response with the string structured header, Attribution-Reporting-Register-OS-Source`, which includes the URL indicating where to register the source.

The response is similar to how the reporting origin would respond when performing web-to-web measurement. But in this case, it indicates that the Android OS should handle the reporting instead of the Chrome browser.


The response metadata includes both web and app destinations. These destination fields specify the website and app package where attribution will be triggered for the source.

Under the hood, the `Attribution-Reporting-Register-OS-Source` header signals the Android OS to call register web source, which takes the metadata from the header and packages it up to send to the ad-tech URL specified in `Attribution-Reporting-Register-OS-Source`.

The developer does not need to call Register Web Source directly.

More information

[https://github.com/WICG/attribution-reporting-api/blob/main/app_to_web.md](https://github.com/WICG/attribution-reporting-api/blob/main/app_to_web.md)
For more information on app-to-web attribution, refer to [https://developer.android.com/design-for-safety/privacy-sandbox/attribution-app-to-web](https://developer.android.com/design-for-safety/privacy-sandbox/attribution-app-to-web)

     