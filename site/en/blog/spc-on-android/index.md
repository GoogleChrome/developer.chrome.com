---
layout: 'layouts/blog-post.njk'
title: Secure Payment Confirmation on Chrome Android
subtitle: Secure Payment Confirmation on Chrome Android is shipping in Chrome 109.
description: >
  Secure Payment Confirmation brings a phishing resistant payment confirmation with the power of passkeys to the web. It will be available in Chrome Android from Chrome 109.
hero: image/YLflGBAPWecgtKJLqCJHSzHqe2J2/0uN2JSfRTgF90W89BzMX.jpg
alt: Phone/Lock/Safe.
authors:
  - smcgruer
date: 2022-12-01
updated: 2023-03-09
---

{% Aside %}

**Update, March 2023**

As of Chrome 112, [the technical limitation](https://crbug.com/1393662) that led
`authenticatorSelection.residentKey` to be `preferred` instead of `required` has
been lifted. Documents have been updated following the change.

{% endAside %}

## Overview

Secure Payment Confirmation (SPC) is a [proposed web
standard](https://www.w3.org/TR/secure-payment-confirmation/) that allows
customers to authenticate with a credit card issuer, bank, or other payment
service provider using a platform authenticator—typically activated with a
device's screen unlock feature such as a fingerprint sensor. This usually
happens during a payments authentication protocol such as [EMV 3-D
Secure](https://www.emvco.com/emv-technologies/3d-secure/) or [Open
Banking](https://standards.openbanking.org.uk/). EMV 3-D Secure, for example,
has support for SPC in its [v2.3 spec
release](https://www.emvco.com/emv_insights_post/what-is-new-with-emv-3ds-v2-3/).
We [previously announced](/articles/secure-payment-confirmation/) that SPC was
launched for Google Chrome on macOS and Windows and provided developer guides
for both [registration](/articles/register-secure-payment-confirmation/) and
[authentication](/articles/authenticate-secure-payment-confirmation/).

As of M109 (currently on the Beta channel), SPC will also be available on Google 
Chrome on Android. Users will be able to use their device's screen lock to 
complete the payment verification process on merchant sites that use SPC.

<figure class="screenshot" style="max-width:300px; margin:auto;">
  {%  
    Video src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/M1yhlVlS27eBDM25XYSt.mp4",  
    autoplay="true", loop="true"  
  %}
  <figcaption>A user is paying on Chrome using the Secure Payment Confirmation.</figcaption>
 </figure>

If you are interested in experimenting with SPC, feel free to try it out on [our
demo website](https://spc-merchant.glitch.me/), or ask your Payment Service
Provider if they plan to support it for authenticating user payments.

{% Aside %}

As SPC is specialised in payment authentication, you can use this API directly
only if you are a credit card issuer, bank, or other payment service provider.
Otherwise, please reach out to your credit card issuer, bank or payment service
provider if you are interested in using this feature.

{% endAside %}

## Strong authentication for payments

Authentication plays an important role in payment fraud prevention. However, 
payment authentication today often uses either weak (for example, CVC code) or 
frictionful (for example, SMS OTP) verification methods. These authentication 
methods can either leave users vulnerable to fraud, or cause cart abandonment 
due to friction.

SPC builds on top of [Web Authentication](https://w3c.github.io/webauthn/) 
(WebAuthn) to bring strong authentication to payment transactions, using 
_platform authenticators_ that are built into users' devices. The authenticating 
party (known as the relying party in WebAuthn), such as the issuing bank or a 
payment service provider, 
[registers](/articles/register-secure-payment-confirmation/) 
the user in a one-time process either on their website or during a 
traditionally-authenticated transaction. They may then use the registration to 
[authenticate](/articles/authenticate-secure-payment-confirmation/) 
the user in subsequent payment flows.

{% Aside %}

The FIDO standard mandates the device not to transmit any biometric data outside
of itself, so that the user verification only happens locally

{% endAside %}

As long as the relying party is the same (for example, the same issuing bank), 
the user should be able to use one registration for all future payments with 
that relying party across any merchant that integrates SPC.

## API changes

Developers can follow [the existing implementation
guide](/articles/secure-payment-confirmation/) written for desktop integration
to learn how the API works.

```js
navigator.credentials.create({  
  publicKey: {  
    ...,  
    authenticatorSelection: {  
      residentKey: 'preferred',  
      ...,  
    },
    extensions: {
      payment: {  
        isPayment: true,  
      } 
    },
  }  
});
```

The `payment` property indicates that this is an SPC credential. See the
previous [registration
guide](/articles/register-secure-payment-confirmation/#register-an-authenticator)
to learn how to use it.

Currently this code creates non-discoverable credentials which work for SPC.
Once discoverable credentials are supported by SPC for Google Chrome on Android,
this code will automatically switch to creating discoverable credentials
instead.

{% Aside %}

[The SPC specification](https://w3c.github.io/secure-payment-confirmation/) does 
not allow passing \`discouraged\` for the residentKey parameter - this is still 
the case for SPC for Google Chrome on Android.

{% endAside %}

## Resources

Learn how to implement Secure Payment Confirmation

* [Secure Payment Confirmation - Chrome 
  Developers](/articles/secure-payment-confirmation/)
* [Register a Secure Payment Confirmation - Chrome 
  Developers](/articles/register-secure-payment-confirmation/)
* [Authenticate with Secure Payment Confirmation - Chrome 
  Developers](/articles/authenticate-secure-payment-confirmation/)

Photo by <a href="https://unsplash.com/es/@franckinjapan?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Franck</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  
