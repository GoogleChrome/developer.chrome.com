---
layout: 'layouts/doc-post.njk'
title: 'Web-to-app and app-to-web measurement'
subhead: >
  Learn how your Chrome web app can pass attributions to your Android app.  
description: >
  Learn how your Chrome web app can pass attributions to your Android app.    
date: 2023-08-09
authors:
  - maudn
  - nmichell
---

The Privacy Sandbox natively supports web-to-app and app-to-web attribution, and the Attribution Reporting API allows measurement across mobile browsers and Android apps.

## What is web-to-app attribution?

If a user clicks an ad in a Chrome mobile browser, and then goes on to later make a purchase in an Android app, the Attribution Reporting API can directly attribute that conversion performed in the Android app to the ads shown in the Chrome mobile browser. That's web-to-app attribution.

Similarly, if a user clicks an ad in an Android app, and then goes on to later make a purchase in a Chrome mobile browser, the Attribution Reporting API can directly attribute that conversion. That's app-to-web attribution.

Note that the API records web-to-app attributions when they occur on the same device.

## How is web-to-app attribution implemented?

To implement web-to-app attribution, first make sure that web-to-app and app-to-web measurement is available in your web code base.
To do this, when you register an event, include the `Attribution-Reporting-Eligible` header
in your request to the reporting origin.

The browser will broadcast if OS-level support is available to the reporting origin server with a dictionary-structured request header.

Then continue to register that the ad was clicked by [registering a source](/docs/privacy-sandbox-attribution-reporting/register-source/).

If OS support is available, the reporting origin should send back a response with the string structured header, `Attribution-Reporting-Register-OS-Source`, which includes the URL indicating where to register the source.

The response is similar to how the reporting origin would respond when performing web-to-web measurement, but in this case, it indicates that the Android OS should handle the reporting instead of the Chrome browser.

The response metadata includes both web and app destinations. These destination fields specify the website and app package where attribution will be triggered for the source.

Under the hood, the `Attribution-Reporting-Register-OS-Source` header signals the Android OS to call register web source, which takes the metadata from the header and packages it up to send to the ad-tech URL specified in `Attribution-Reporting-Register-OS-Source`. You don't need to call `registerWebSource()` directly.

## Next steps

- Read more about web-to-app attribution in [Cross App and Web Attribution Measurement](https://github.com/WICG/attribution-reporting-api/blob/main/app_to_web.md).
- Also check out [Attribution reporting: cross app and web measurement](https://developer.android.com/design-for-safety/privacy-sandbox/attribution-app-to-web).
