---
layout: 'layouts/blog-post.njk'
title: 'FedCM updates: origin trial starts for "auto reauthentication"'
description: >
  FedCM origin trial will now be available until the release of Chrome 108, scheduled for November 23, 2022.
subhead: >
  FedCM origin trial will now be available until the release of Chrome 108, scheduled for November 23, 2022.
date: 2023-03-09
authors:
  - agektmr
origin_trial:
  url: /origintrials/#/view_trial/2426314299245854721
tags:
  - privacy
  - identity
  - origin-trials
---

[Federated Credential Management API (FedCM)](/docs/privacy-sandbox/fedcm/) is a web API for privacy-preserving identity federation. With identity federation, an RP (relying party) relies on an IdP (identity provider) to provide the user an account without requiring a new username and password.

FedCM is a purpose-built API that allows the browser to understand the context in which the RP and IdP exchange information, inform the user as to the information and privilege levels being shared and prevent unintended abuse.

## Updates

We have a few updates to the Chrome's FedCM implementation recently:

- For the [ID assertion endpoint](/docs/privacy-sandbox/fedcm/#id-assertion-endpoint), IdPs need to check the Origin header (instead of the Referer header) to see if the value matches the origin of the client ID.
- Added a new Chrome flag `chrome://flags/#fedcm-without-third-party-cookies`. With this flag, [you can test FedCM functionality in Chrome by blocking third-party cookies](/docs/privacy-sandbox/fedcm/#block-third-party-cookies).

Check all the past updates to the API and our [FedCM documentation](/docs/privacy-sandbox/fedcm/) at [Federated Credential Management API updates](/docs/privacy-sandbox/fedcm-updates/).

Additionally, we are starting FedCM's new feature as an origin trial — "auto reauthentication" — starting in Chrome 112.

## Auto-reauthentication

FedCM auto-reauthentication ("auto-reauthn" in short) literally reauthenticates users automatically, when they come back after their initial authentication using FedCM. "The initial authentication" here means the user signs in to the relying party's (RP's) website by tapping on the **"Continue as..."** button on FedCM's sign-in dialog. "Reauthentication" here means the user can sign back into the RP's website just by visiting it without any actions.

<figure style="width: 300px; margin: auto; margin-top: 2em;">
  {% Img
    src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/jQvYTB6sHw5jGshyRxn6.png",
    alt="A dialog the user taps on to create an account or to authenticate.", width="800", height="566", class="screenshot"
  %}
  <figcaption>A dialog the user taps on to create an account or to authenticate.</figcaption>
</figure>

The RP can auto-reauthn the user by calling `navigator.credentials.get()` with `autoReauthn: true`.

```js
const cred = await navigator.credentials.get({
  identity: {
    providers: [{
      configURL: "https://idp.example/fedcm.json",
      clientId: "1234",
    }],
    autoReauthn: true, // default to false
  },
});
```

With this call, auto-reauthn happens under the following conditions:
* Only one FedCM account has been used to sign into this website in this browser.
* The user is signed into the identity provider with that account.
* The auto-reauthn didn't happen within the last 10 minutes.
* FedCM is available to use. For example, the user has not disabled FedCM either globally or for the RP.

When the above conditions meet, the user is automatically reauthenticated as soon as the FedCM `navigator.credentials.get()` is successfully invoked.

<figure style="width: 300px; margin: auto; margin-top: 2em;">
  {% Video
    src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/eYnQxoDMNh4rpsyjcsQI.mp4",
    autoplay="true", loop="true", class="screenshot"
  %}
  <figcaption>A user is auto-reauthenticating to an RP using FedCM</figcaption>
</figure>

It would be annoying if the user is auto reauthenticated immediately after the user signs out.  Developers are recommended to design the sign-out flow not to make this happen.

{% Aside %}

As alluded earlier, FedCM has a 10-minute quiet period after an auto-reauthn to prevent this behavior. We are also exploring other approaches to achieve this such as using `CredentialsContainer.preventSilentAccess()`.

{% endAside %}


## Try it yourself

You can try FedCM auto-reauthn locally by turning on `chrome://flags#fedcm-auto-re-authn` on Chrome 112 or later.

For testing purposes, you can reset this 10-minute cooldown period by removing browser data.

1. Navigate to `chrome://history`
2. Click **"Clear Browsing History"**  (under the main menu)
3. Clear **"Cookies & Other Site Data"** for the time range **"All time"**
4. Restart Chrome

{% Aside 'caution' %}

Be careful that by doing this, you will lose cookies and storage data from all websites on the Chrome instance.

{% endAside %}

## Origin trial

You can also enable the feature on your website by joining the origin trial between Chrome 112 through Chrome 114.

{% Partial 'origin-trials.md' %}

Third-party origin trials make it possible for providers of embedded content to try out a new feature across multiple sites by providing [a token using JavaScript](/docs/web-platform/third-party-origin-trials/#provide-token).

{% Partial 'origin-trial-3p-register.md' %}

{% Aside %}

If FedCM is executed directly by an RP without loading an IdP's scripts, the
RP must register their origin for the origin trial separately.

{% endAside %}

We are waiting for your testing and feedback at [crbug.com](https://crbug.com).
