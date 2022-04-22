---
layout: 'layouts/blog-post.njk'
title: Verify a phone number on desktop using WebOTP API
description: Starting from Chrome 93, websites can verify phone numbers from desktop Chrome.
subhead: Starting from Chrome 93, websites can verify phone numbers from desktop Chrome.
date: 2021-07-28
updated: 2021-08-03
authors:
  - yigu
  - agektmr
tags:
  - identity
  - security
hero: 'image/YLflGBAPWecgtKJLqCJHSzHqe2J2/sx5olO6RBqttqsX9Zzgm.jpeg'
alt: A laptop computer and a mobile device.
---

WebOTP helps users enter a phone number verification code on a mobile website in
one tap without switching between apps. Chrome 93 extends this functionality to
desktop as well. Read on to learn more.

## Introduction

SMS OTPs (one-time passwords) are commonly used to verify a phone number, for
example as a second step in authentication, or to verify payments on the web.
However, the entire flow of switching from desktop to mobile, opening the SMS
app, memorizing and entering the OTP on the original website back on desktop
adds friction. It's easy to make mistakes this way and it's vulnerable to
phishing attacks.

The [WebOTP API](https://web.dev/web-otp) gives websites the ability to
programmatically obtain the one-time password from a SMS message and
automatically fill the form for users with just one tap without switching apps.
The SMS has a specific format and it's bound to the origin, so it mitigates the
risk of phishing websites stealing the OTP as well.

<figure class="w-figure" style="width:300px; margin:auto;">
  <video controls autoplay loop muted class="w-screenshot">
    <source src="https://storage.googleapis.com/web-dev-assets/sms-otp-form/android-chrome.webm" type="video/webm">
    <source src="https://storage.googleapis.com/web-dev-assets/sms-otp-form/android-chrome.mp4" type="video/mp4">
  </video>
  <figcaption class="w-figcaption">
    WebOTP API in action.
  </figcaption>
</figure>

One use case that has yet to be supported in WebOTP is targeting phone number
verification requests from a remote desktop device or a laptop—the
API only works on devices that have telephony capabilities. The API now
supports listening for SMSes received on other devices to assist users in
completing phone number verification on desktop in Chrome 93.

<figure class="w-figure">
  {% Video class="screenshot", src="video/vgdbNJBYHma2o62ZqYmcnkq3j0o1/iUUGcawm8LJpGH3PFxNZ.mp4", autoplay=true, controls=true, loop=true, muted=true %}
  <figcaption class="w-figcaption">
    WebOTP API on desktop.
  </figcaption>
</figure>

## Try it out

### Prerequisites {: #prerequisites}

* A desktop or a laptop computer (Windows, Mac, Linux or ChromeOS).
* An Android phone with [Google Play Services version
  20.30.12 or higher](https://support.google.com/googleplay/answer/9037938).
* Chrome 93 or later, both on desktop or laptop and mobile. [Chrome 93
  Beta](https://www.google.com/chrome/beta/) is available as of late July 2021.
* You need to sign-in to the same Google account on both desktop Chrome and
  mobile Chrome. For example, via
  [https://myaccount.google.com/](https://myaccount.google.com/) or
  [https://mail.google.com](https://mail.google.com). No need to turn on sync.
* On your Android device, you need to sign-in to Android via "Settings->Google".
* [Chrome 93 must be the default
  browser](https://support.google.com/chrome/answer/95417/?co=GENIE.Platform%3DAndroid&oco=1)
  on the Android device.
* Chrome 93 must be running either in foreground or background on the Android
  device.

### Demo

To try this seamless phone number verification flow on desktop yourself, follow
these steps:

1. Go to [https://web-otp-demo.glitch.me/](https://web-otp-demo.glitch.me/) on
   desktop. Click the **Verify** button.
2. Send the exact text message that was on the screen from a second phone to the
   Android device.
3. When the SMS is delivered to the Android device, a dialog appears asking if
   you want to verify the phone number on the desktop. Press **Submit** to
   approve.
4. On the desktop, the verification code sent to the Android device should be
   autofilled in the input field.

## How WebOTP API works

Let's look at how WebOTP API works:

```javascript
…
  const otp = await navigator.credentials.get({
    otp: { transport:['sms'] }
  });
  if (otp.code) input.value = otp.code;
…
```

The SMS message must be [formatted with the origin-bound one-time
codes](https://web.dev/web-otp/#format).

```text
Your OTP is: 123456.

@web-otp-demo.glitch.me #123456
```

Notice that the last line contains the origin to be bound to preceded with a `@`
followed by the OTP preceded with a `#`.

When the text message arrives, an info bar pops up and prompts the user to
verify their phone number. After the user clicks the `Verify` button, the
browser automatically forwards the OTP to the site and resolves the
`navigator.credentials.get()`. The website can then extract the OTP and complete
the verification process.

Learn more at [Verify phone numbers on the web with the WebOTP
API](https://web.dev/web-otp/).

{% Aside 'gotchas' %}

If the demo doesn't work for you, please check the following:

1. Double check that [all the prerequisites meet](#prerequisites).
2. If the sender's phone number is in the receiver's contact list, the SMS won't
   trigger the WebOTP dialog because [it's by
   design](https://developers.google.com/identity/sms-retriever/user-consent/request#2_start_listening_for_incoming_messages).
   Please try with another phone number.
3. If the problem still persists, open `chrome://sync-internals` on Android
   Chrome that receives the SMS and press **Stop Sync** then **Request Start**
   to restart the sync.

{% endAside %}

## How to use WebOTP API on desktop

Phone number verification via SMS is widely used and platform agnostic. Any use
cases on mobile devices should be applicable to desktop devices.

Using WebOTP API on desktop is the same as on mobile,
so websites can deploy the same code across platforms.

## Browser support and interoperability

This feature is powered by Chrome Sync so it works Chrome only at the moment.
Receiving and transmitting SMS on iOS or iPad OS in Chrome is not supported.

While browser engines other than Chromium do not implement the WebOTP API,
Safari shares the same [SMS format](https://wicg.github.io/sms-one-time-codes/)
with its `input[autocomplete="one-time-code"]` support. In Safari, as long as a
user has turned on iMessage auto-sync, when an SMS that contains an origin-bound
one-time code format arrives with the matched origin on iOS or iPadOS, the
message gets forwarded to macOS. If the user focuses on the input field, Safari
will suggest the OTP for the user to enter.

## Feedback

Your feedback is invaluable in making WebOTP API better. Try it out
and [let us know](https://bugs.chromium.org/p/chromium/issues/detail?id=1136506)
what you think.

Photo by [Luis
Villasmil](https://unsplash.com/@luisviol?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
on
[Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
