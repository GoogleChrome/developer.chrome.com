---
layout: 'layouts/blog-post.njk'
title: Support auto-reauthentication in FedCM
description: >
  In Chrome 115, FedCM supports mediation requirements from Credential Management API which enables users to reauthenticate to the RP in a more streamlined manner after the initial consent.
subhead: >
  Chrome supports auto-reauthentication in FedCM
date: 2023-06-07
authors:
  - agektmr
tags:
  - privacy
  - identity
hero: 'image/YLflGBAPWecgtKJLqCJHSzHqe2J2/nxIH9o6I4KLbuhuV5Tht.jpg'
alt: >
  Glass door with reflections.
---

[Federated Credential Management API (FedCM)](/docs/privacy-sandbox/fedcm/) is a
web API for privacy-preserving identity federation. With identity federation, an
RP (relying party) relies on an IdP (identity provider) to provide the user an
account without requiring a new username and password.

FedCM allows the browser to understand the context in which the RP and IdP 
exchange information. It informs the user about the information and privilege 
levels being shared and prevents unintended abuse. FedCM has been available in 
Chrome since version 108.

In Chrome 115, FedCM is getting support for auto-reauthentication which improves 
the user experiences and enables a more streamlined reauthentication to the RP 
after the initial consent.

## Auto-reauthentication {: #auto-reauthn }

Currently, after [a user has created a federated account on an RP with an IdP
via the FedCM API](/docs/privacy-sandbox/fedcm/#sign-in), the next time they
visit the website they need to go through the same steps in the user interface.
That means the user will need to explicitly and manually re-confirm to
reauthenticate and proceed with the sign-in flow.

While the explicit user experience makes sense before the user has created the 
federated account to prevent tracking (which is one of the main goals of FedCM), 
it is unnecessarily cumbersome after the user has gone through it once: after 
the user grants permission to allow communication between the RP and the IdP,  
there's no privacy or security benefit for enforcing another explicit user 
confirmation for something that they have already previously acknowledged. 
That's why we are introducing a more streamlined UX that RPs can choose for 
their returning users.

[FedCM 
](https://github.com/fedidcg/FedCM/issues/429)[auto-reauthentication](https://github.com/fedidcg/FedCM/issues/429) 
("auto-reauthn" in short) can let users reauthenticate automatically, when they 
come back after their initial authentication using FedCM. "The initial 
authentication" here means the user creates an account or signs into the RP's 
website by tapping on the **"Continue as..."** button on FedCM's sign-in dialog 
for the first time on the same browser instance.

<figure style="width: 300px; margin: auto; margin-top: 2em;">
  {% Img
    src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/RkWJR4q6SHa8D1xIf2G5.png",
    alt="A dialog the user taps on to create an account or to authenticate.",
    width="796",
    height="544"
  %}
<figcaption>A dialog the user taps on to create an account or to authenticate.</figcaption>
</figure>

## Choose an option for auto-reauthn {: #mediation-options }

While we are introducing auto-reauthn to provide better UX and to align with the 
specification, the default user experience will be different without any code 
change. With auto-reauthn available, the browser changes its behavior depending 
on the option you select in the `mediation` option developers provide with 
`navigator.credentials.get()`.

```js
const cred = await navigator.credentials.get({
  identity: {
    providers: [{
      configURL: "https://idp.example/fedcm.json",
      clientId: "1234",
    }],
  },
  mediation: 'optional', // this is the default
});
```

The `mediation` is [a property in the Credential Management 
API](https://developer.mozilla.org/docs/Web/API/CredentialsContainer/get#:~:text=mediation), 
it behaves in [the same 
way](https://web.dev/security-credential-management-retrieve-credentials/) as it 
does for 
[PasswordCredential](https://developer.mozilla.org/docs/Web/API/PasswordCredential) 
and 
[FederatedCredential](https://developer.mozilla.org/docs/Web/API/FederatedCredential) 
and it's partially supported by 
[PublicKeyCredential](https://developer.mozilla.org/docs/Web/API/PublicKeyCredential) 
as well. The property accepts the following four values:

* `'required'`: Always requires a mediation to proceed, for example, clicking the 
  "Continue" button on the UI. Choose this option if your users are expected to 
  grant permission explicitly every time they need to be authenticated.
* `'optional'`(default): Auto-reauthn if possible, requires a mediation if not. We 
  recommend choosing this option on the sign-in page.
* `'silent'`: Auto-reauthn if possible, silently fail without requiring a
  mediation if not. We recommend choosing this option on the pages other than
  the dedicated sign-in page but where you want to keep users signed in—for
  example, an item page on a shipping website or an article page on a news
  website.
* `'conditional'`: Used for WebAuthn and not available for FedCM at the moment.

With this call, auto-reauthn happens under the following conditions:

* FedCM is available to use. For example, the user has not [disabled FedCM 
  either globally](#settings) or for the RP in the settings.
* The user used only one account with FedCM API to sign into the website on this 
  browser.
* The user is signed into the IdP with that account.
* The auto-reauthn didn't happen within the last 10 minutes.
* The RP hasn't called
  [`navigator.credentials.preventSilentAccess()`](#prevent-silent-access) after
  the previous sign in.

When the above conditions are met, an attempt to automatically reauthenticate
the user starts as soon as the FedCM `navigator.credentials.get()` is invoked.

<figure style="width: 300px; margin: auto; margin-top: 2em;">
  {% Video
    src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/Q2ARmaZAVx2ShnKpPQNj.mp4",
    width="486",
    height="1080"
  %}
  <figcaption>A user auto-reauthenticating through FedCM.</figcaption>
</figure>

## Enforce mediation with `preventSilentAccess()` {: #prevent-silent-access }

Auto-reauthenticating users immediately after they sign out would not make for a 
very good user experience. That's why FedCM has a 10-minute quiet period after 
an auto-reauthn to prevent this behavior. This means that auto-reauthn happens 
at most once in every 10-minutes unless the user signs back in within 
10-minutes. The RP should call navigator.credentials.preventSilentAccess() to 
explicitly request the browser to disable auto-reauthn when a user signs out of 
the RP explicitly, for example, by clicking a sign-out button.

```js
function signout() {
  navigator.credentials.preventSilentAccess();
  location.href = '/signout';
}
```

## Users can opt-out of auto-reauthn in settings {: #settings }

Users can opt-out from auto-reauth from the settings menu:

* On desktop Chrome, go to `chrome://password-manager/settings` > Sign in
  automatically.
* On Android Chrome, open **Settings** > **Password Manager** > Tap on a 
  cog at the top right corner > Auto sign-in.

By disabling the toggle, the user can opt-out from auto-reauthn behavior all 
together. This setting is stored and synchronized across devices, if the user is 
signed into a Google account on the Chrome instance and synchronization is 
enabled.

{% Aside %}

Users can also [opt-out from FedCM per
domain](/docs/privacy-sandbox/fedcm/#user-settings).

{% endAside %}

## Share feedback

If you are testing FedCM you can share your feedback or any issues you run into
at [crbug.com](http://crbug.com/) under a component **"Blink>Identity>FedCM"**.

Photo by <a href="https://unsplash.com/@noach?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Noah Samuel Franz</a> on <a href="https://unsplash.com/photos/xR1igblXCeM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
