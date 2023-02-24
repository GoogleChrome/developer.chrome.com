---
layout: "layouts/blog-post.njk"
title: "User-Agent Reduction deprecation trial"
subhead: >
  Register to continue receiving the full User-Agent string.
description: >
  Starting from Chrome 101, the information available in the User-Agent string will be reduced.
  Sites that haven’t had time to migrate away from using the reduced User-Agent string can take
  part in a deprecation trial to continue receiving the full User-Agent string.
authors:
  - abeyad
  - victortan
date: 2022-02-24
tags:
  - privacy
  - origin-trials
  - chrome-101
---


Starting from Chrome 101, the information available in the User-Agent (UA) string will be reduced [using a phased approach](https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html). Sites that haven't had time to migrate away from using the reduced User-Agent string and [move toward User-Agent Client Hints](https://web.dev/migrate-to-ua-ch/) can take part in a deprecation trial to continue receiving the full User-Agent string.

The registration for the deprecation trial will begin with the [Chrome 100](https://chromiumdash.appspot.com/schedule) Beta. It will allow sites to receive the full User-Agent string ahead of the Chrome 101 release, where the minor version string will be reduced. If you would like to test the origin trial on Chrome 100 Beta before it launches to the stable channel, be sure to register and test before the release date for Chrome 100 ([currently scheduled for March 31st, 2022](https://chromiumdash.appspot.com/schedule)).

Below is an overview of the deprecation trial and what to expect. If you have feedback to share or you encounter any issues throughout this trial let us know in the [UA Reduction GitHub repository](https://github.com/miketaylr/user-agent-reduction/issues).

## What does this mean for web developers?

By enrolling in the deprecation trial, sites will continue to receive the full UA string in `navigator.userAgent` and non-reduced values in the related `navigator.platform` and `navigator.appVersion` JavaScript getters:

-   The `User-Agent` HTTP request header
-   The `navigator.userAgent` Javascript getter
-   The `navigator.platform` Javascript getter
-   The `navigator.appVersion` Javascript getter

Sites should still audit their usage of the User-Agent header and related APIs, and if needed prepare to [migrate to User-Agent Client Hints](https://web.dev/migrate-to-ua-ch/) before the deprecation trial expires. The intent is to expire this deprecation trial once the [User-Agent Reduction rollout](https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html) is complete.

## How do I participate in the User-Agent Reduction deprecation  trial?

### Register for the trial

To register for the origin trial and get a token for your domains, visit the [User Agent Reduction deprecation trial page](/origintrials/#/view_trial/2608710084154359809). If you are a third-party registering please check 'Third-party matching'.

### Setup

Once you've registered for the trial, update your HTTP response headers with the following:

1.  Add `Origin-Trial: <ORIGIN TRIAL TOKEN>` to your HTTP response header. <`ORIGIN TRIAL TOKEN`> contains the token you got when registering for the origin trial.
1.  Add `Accept-CH: Sec-CH-UA-Full` to your HTTP response header. Setting `Accept-CH` will only cause the full User-Agent string to be sent on subsequent requests to the origin.
1.  If the full User-Agent string is critical on first request add `Critical-CH: Sec-CH-UA-Full` to your HTTP response header, in addition to the `Accept-CH` and `Origin-Trial` headers.
1.  For participants joining the reduction deprecation trial we suggest allowing all third-party domains access to the full User-Agent string. Failure to extend third-party domains access to the full User-Agent string will block their full User-Agent string access regardless of their own reduction deprecation trial registration. You can allow full User-Agent string access to third-party domains by one of the following two options:
    - Add a `Permissions-Policy` header with the third-party domains that should receive the full User-Agent string.
        -  To allow all third-party domains, add `Permissions-Policy: ch-ua-full=*`.
        -  To allow a named list of third-party domains, add `Permissions-Policy: ch-ua-full=(self "https://thirdparty.example.com")`.
    - Add an `Accept-CH` meta tag with the third-party domains that should receive the full User-Agent string (only in Chrome 100 and above).
        -  To allow a named list of third-party domains, add `<meta http-equiv="delegate-ch" value="sec-ch-ua-full https://thirdparty.example.com">`.
        -  It's not possible to delegate to all third-party domains via `*` in the meta tag.

1. Load your website in Chrome 100 (or later) and continue receiving the full User-Agent string.

Note: a third-party embed can register and opt in to the trial without requiring the top-level site to delegate permission via Permissions Policy or `<meta http-equiv="delegate-ch">`. The [standard advice for third-party origin trials](/docs/web-platform/third-party-origin-trials/) applies.

### Demo

See [https://uard-ot-demo.glitch.me](https://uard-ot-demo.glitch.me) for a demonstration of the trial (along with the source code).

## How do I validate that the trial is working?

To validate that the origin trial is working, examine the request headers and ensure the following:

1.  The User-Agent header contains the full version. It shouldn't contain any of the reduced values (found in the [list of samples of reduced User-Agent strings](https://www.chromium.org/updates/ua-reduction#TOC-Sample-UA-Strings:-Phase-4)). An easy way to tell is that the Chrome minor version string should **not** be `0.0.0`.
1.  The `Sec-CH-UA-Full` header is set to `?1`.

The initial response's headers containing the origin-trial token should look like:

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/AIlPxFBDvO7jQrXuKfWU.png", alt="", width="800", height="175" %}

Subsequent request headers containing the full User-Agent string should look like:

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/Hzi5O1mZQyZEKeokCQSe.png", alt="", width="800", height="191" %}

## How do I stop participating in the User-Agent Reduction deprecation trial?

At any given point in time during the trial, you can stop participating and receive the reduced User-Agent string. To stop participating:

1.  Send an `Accept-CH` header in your HTTP response that does **not** include `Sec-CH-UA-Full`. Note that `Accept-CH` with an empty value is a valid way to accomplish this if your site does not request any other Client Hints.
1.  Remove the `Origin-Trial` header for the User-Agent Reduction deprecation trial from your HTTP response.
1.  If set, remove `Sec-CH-UA-Full` from the `Critical-CH` header in your HTTP response.

## How is this trial different from other User-Agent origin trials?

Chrome is running two origin trials related to User Agent reduction. The first was [User Agent Reduction origin trial](/origintrials/#/view_trial/-7123568710593282047), which allowed sites to receive the reduced user agent string to test their use cases and provide feedback before it becomes the default behavior in Chrome.

The second, referenced here, is a deprecation trial intended for sites that need a little more time to migrate to the [User-Agent Client Hints API](https://developer.mozilla.org/docs/Web/API/User-Agent_Client_Hints_API). It enables sites to continue receiving the full User-Agent string.

## How long will the deprecation trial last?

The User-Agent Reduction deprecation trial will run from Chrome 100 to Chrome 112. Chrome 113 will be the first release where only the completely reduced User-Agent string is sent.

## How do I share feedback for the User-Agent Reduction depreciation trial?

Submit any issues or feedback to the [User-Agent Reduction GitHub repository](https://github.com/miketaylr/user-agent-reduction/issues).
