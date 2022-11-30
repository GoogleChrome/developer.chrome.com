---
layout: 'layouts/blog-post.njk'
title: Passwordless sign-in on forms with WebAuthn passkey autofill
subhead: WebAuthn conditional UI leverages browser's form autofill functionality to let users sign in with a passkey seamlessly in the traditional password based flow.
authors:
  - agektmr
date: 2022-11-30
hero: image/YLflGBAPWecgtKJLqCJHSzHqe2J2/xMIoePcEqw5uHCkxY3nP.jpg
alt: A man filling a form
description: WebAuthn conditional UI leverages browser's form autofill functionality to let users sign in with a passkey seamlessly in the traditional password based flow.
tags:
  - webauthn
  - identity
  - security
  - passkeys
---

Chrome 108 supports passkeys, including autofill suggestions. This allows sites
to build easy sign-in experiences that are more secure.

## What is a passkey?

A [passkey](https://developers.google.com/identity/passkeys) is a digital credential, tied to a user account and a website or application. Passkeys are more secure than
passwords because they enable users to sign in to apps and websites with a
biometric sensor (such as a fingerprint or facial recognition), PIN, or pattern,
freeing them from having to remember and manage passwords. Because they are
[WebAuthn](https://www.w3.org/TR/webauthn-2/) credentials, they include the
following security features:

* Passkeys use public-key cryptography so sites don't have to store passwords or secrets.
* Users can't be phished because a passkey can only be used with the website or app that created it.

Websites could create and use WebAuthn credentials on devices and
security keys via a modal UI in the browser. To do so, websites had to
redesign their sign-in flow to let users select the WebAuthn flow using a
separate button. By allowing passkeys to enable autofill, websites can now
provide the same experience for both password and passkey users.

## Conditional UI

Allowing websites to make a WebAuthn request without triggering the modal UI is 
called "conditional mediation". This autofill integration is often referred to 
as a [conditional 
UI](https://github.com/w3c/webauthn/wiki/Explainer:-WebAuthn-Conditional-UI).

<figure class="screenshot" style="max-width:300px; margin:auto;">
  {%
    Video src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/ZaxgMtkOh5CX2B1ZT9gd.mp4",
    autoplay="true", loop="true"
  %}
  <figcaption>A user signing in with a condtional UI</figcaption>
</figure>

### How it works

As soon as the user taps on the username input field, an autofill suggestion
dialog pops up with the stored passkeys and password autofill suggestions. The
user can then choose an account and use the device screen lock to sign in. This
enables users to sign in to the website with the existing password form as if
nothing has changed, but with [the added security benefit of
passkeys](https://developers.google.com/identity/passkeys#security-considerations).

### How to use conditional UI

To use the WebAuthn conditional UI, learn how to [Create a passkey for 
passwordless logins](https://web.dev/passkey-registration/) and [Sign in with a 
passkey through form autofill](https://web.dev/passkey-form-autofill/).

Photo by <a href="https://unsplash.com/@homajob?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Scott Graham</a> on <a href="https://unsplash.com/s/photos/form?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
