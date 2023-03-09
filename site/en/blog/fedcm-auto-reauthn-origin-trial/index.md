---
layout: 'layouts/blog-post.njk'
title: 'FedCM updates: origin trial starts for "auto reauthentication"'
description: >
  Introducing a few updates for FedCM including a new origin trial "auto reauthentication", which reauthenticates users automatically (when RPs opt-in), when they come back after their initial authentication using FedCM.
subhead: >
  Introducing a few updates for FedCM including a new origin trial "auto reauthentication".
date: 2023-03-09
hero: 'image/YLflGBAPWecgtKJLqCJHSzHqe2J2/9C9Sneo3nkZlqRcsbWff.jpg'
alt: 'an automated door'
authors:
  - agektmr
origin_trial:
  url: /origintrials/#/view_trial/2426314299245854721
tags:
  - privacy
  - identity
  - origin-trials
---

[Federated Credential Management API (FedCM)](/docs/privacy-sandbox/fedcm/) is a
web API for privacy-preserving identity federation. With identity federation, an
RP (relying party) relies on an IdP (identity provider) to provide the user an
account without requiring a new username and password.

FedCM is a purpose-built API that allows the browser to understand the context
in which the RP and IdP exchange information, inform the user as to the
information and privilege levels being shared and prevent unintended abuse.

## Updates

We have a few updates to the Chrome's FedCM implementation recently:

* For the [ID assertion
  endpoint](/docs/privacy-sandbox/fedcm/#id-assertion-endpoint), IdPs need to
  check the `Origin` header (instead of the `Referer` header) to see if the
  value matches the origin of the client ID.
* Added a new [Chrome flag](/docs/web-platform/chrome-flags/)
  `chrome://flags/#fedcm-without-third-party-cookies`. With this flag, [you can
  test FedCM functionality in Chrome by blocking third-party
  cookies](/docs/privacy-sandbox/fedcm/#block-third-party-cookies).

Check all the past updates to the API and our [FedCM
documentation](/docs/privacy-sandbox/fedcm/) at [Federated Credential Management
API updates](/docs/privacy-sandbox/fedcm-updates/).

Additionally, we are starting FedCM's new feature as an origin trial — "auto
reauthentication" — starting in Chrome 112.

## Auto-reauthentication

Currently, after [a user has created a federated account on an RP with an IdP
via the FedCM](/docs/privacy-sandbox/fedcm/#sign-in), the next time they revisit
the website they need to go through the same steps with the same UI affordances.
i.e. they will need to explicitly and manually re-confirm to re-authenticate and
proceed with the sign-in flow. While the explicit UX makes sense before the user
has created the federated account to prevent tracking (which is one of the main
goals of FedCM), it is overly and unnecessarily cumbersome after the user has
gone through it once: after the user grants permission to allow communication
between the RP and the IdP,  there's no privacy or security benefit for
enforcing another explicit user confirmation for something that they have
already previously acknowledged. Therefore we are introducing a more streamlined
UX that RPs can choose for their returning users.

[FedCM auto-reauthentication](https://github.com/fedidcg/FedCM/issues/429)
("auto-reauthn" in short) reauthenticates users automatically (when RPs opt-in),
when they come back after their initial authentication using FedCM. "The initial
authentication" here means the user creates an account or signs into the RP's
website by tapping on the **"Continue as..."** button on FedCM's sign-in dialog
for the first time on the same browser instance.

<figure style="width: 300px; margin: auto; margin-top: 2em;">
  {% Img
    src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/jQvYTB6sHw5jGshyRxn6.png",
    alt="A dialog the user taps on to create an account or to authenticate.", width="800", height="566", class="screenshot"
  %}
  <figcaption>A dialog the user taps on to create an account or to authenticate.</figcaption>
</figure>

The RP can request auto-reauthn by calling `navigator.credentials.get()` with `autoReauthn: true`.

```js
const cred = await navigator.credentials.get({
  identity: {
    providers: [{
      configURL: "https://idp.example/fedcm.json",
      clientId: "1234",
    }],
    // NOTE: We are exploring different API options to expose this
    // functionality here:
    // https://github.com/fedidcg/FedCM/issues/429#issuecomment-1426358523
    // You should expect that, as a result of the origin trial, we'll
    // learn more from developers and browser vendors what works best here.
    autoReauthn: true, // default to false
  },
});

```

With this call, auto-reauthn happens under the following conditions:

* FedCM is available to use. For example, the user has not disabled FedCM either
  globally or for the RP.
* The user used only one FedCM account to sign into the website on this browser.
* The user is signed into the IdP with that account.
* The auto-reauthn didn't happen within the last 10 minutes.

When the above conditions meet, an attempt to automatically reauthenticate the
user starts as soon as the FedCM `navigator.credentials.get()` is invoked.


<figure style="width: 300px; margin: auto; margin-top: 2em;">
  {% Video
    src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/eYnQxoDMNh4rpsyjcsQI.mp4",
    autoplay="true", loop="true", class="screenshot"
  %}
  <figcaption>A user is auto-reauthenticating to an RP using FedCM</figcaption>
</figure>

It would be annoying if the user is auto reauthenticated immediately after the
user signs out.  Developers are recommended to design the sign-out flow not to
make this happen.

{% Aside %}

As alluded earlier, FedCM has a 10-minute quiet period after an auto-reauthn to
prevent this behavior. We are also exploring other approaches to achieve this
such as using
[`CredentialsContainer.preventSilentAccess()`](https://developer.mozilla.org/docs/Web/API/CredentialsContainer/preventSilentAccess).

{% endAside %}

## Try it yourself

You can try FedCM auto-reauthn locally by turning on [a Chrome
flag](/docs/web-platform/chrome-flags/) `chrome://flags#fedcm-auto-re-authn` on
Chrome 112 or later.

For testing purposes, you can reset the 10-minute quiet period by removing
browser data.

1.  Navigate to `chrome://history`
2.  Click **"Clear Browsing History"**  (under the main menu)
3.  Clear **"Cookies & Other Site Data"** for the time range **"All time"**
4.  Restart Chrome

{% Aside 'caution' %}

Be careful that by doing this, you will lose cookies and storage data from all
websites on the Chrome instance.

{% endAside %}

## Origin trial

You can also enable the feature on your website by joining [the third-party
origin trial](/docs/web-platform/third-party-origin-trials/) between Chrome 112
through Chrome 114.

{% Partial 'origin-trials.md' %}

{% Partial 'origin-trial-3p-register.md' %}

{% Aside %}

If FedCM is executed directly by an RP without loading an IdP's scripts, the RP
must register their origin by themselves for the origin trial.

{% endAside %}

We are waiting for your testing and feedback at [crbug.com](http://crbug.com/)
with a component **"Blink>Identity>FedCM"**.

Photo by [Alex
Perz](https://unsplash.com/es/@adventureregistry?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
on
[Unsplash](https://unsplash.com/photos/ysgELOy_t0c?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
