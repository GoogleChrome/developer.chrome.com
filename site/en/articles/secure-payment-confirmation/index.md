---
layout: 'layouts/blog-post.njk'
title: Secure Payment Confirmation
description: >
   High-level overview of a proposed web standard to allow for secure authentication with payment service providers.
authors:
  - agektmr
date: 2022-05-27
tags:
  - payments
  - webauthn
  - chrome-stable
  - spc
---

Secure Payment Confirmation (SPC) is a
[proposed web standard](https://www.w3.org/TR/secure-payment-confirmation/)
that allows customers to authenticate with a credit card issuer, bank, or
other payment service provider using a platform authenticator:

*  Unlock feature including Touch ID on a macOS device
*  Windows Hello on a Windows device

With SPC, merchants can allow customers to quickly and seamlessly authenticate
their purchases, while issuing banks protect their customers from fraud.

<figure class="float-right screenshot">
{% Img
  src="image/VbsHyyQopiec0718rMq2kTE1hke2/idZVP2qnYqcYVhmfElma.png",
  alt="", width="458", height="434"
%}
</figure>

SPC has two stages: registration and authentication.

*  **Registration**: the payer links their device to a relying party (RP). The
   relying party may be a credit card issuer, bank, or other payment service
   provider.
*  **Authentication**: the payer uses the registered device to confirm their
   identity with the RP directly from the merchant's platform before
   confirming payments.

## Authentication for fraud prevention

Authentication plays an important role in payment fraud prevention. However,
this verification process often relies on weak mechanisms, such as a
combination of the credit card number and the card owner's name, or an
additional CVC code that is written on the back of the card. These mechanisms
are easily compromised and impersonated if the card information is leaked due
to data security breaches such as account hijacks or phishing attacks.

Additional fraud-prevention mechanisms have been introduced, such as
[EMV® 3-D Secure](https://www.emvco.com/emv-technologies/3d-secure/), where
the payer may be asked to authenticate against the card issuer or the bank. To
authenticate, the user signs in with a username and password, or a
one-time-password (OTP) delivered to the payer's phone via SMS. This works to
protect customers from fraud, but can become a barrier for some valid
customers to complete payment. SPC aims to reduce authentication friction,
therefore reducing cart abandonment.

Meanwhile, there is a new authentication standard on the rise called WebAuthn.

### What is WebAuthn? {: #what-is-webauthn }

[Web Authentication](https://webauthn.guide/) (WebAuthn in short) is a
[web standard](https://www.w3.org/TR/webauthn-2/) that allows relying party
(RP) servers to register and authenticate users in the browser using public key
cryptography, instead of a password.

RPs rely on physical authenticators, such as a security key. RPs request the
security key to generate a private-public key pair and then store the public
key on the server (_registration_). These generated keys are unique to the
device, which prevents attackers from impersonating the user. This standard is
phishing-resistant because the key pair is bound to the origin.

[The FIDO Alliance](https://fidoalliance.org/specifications/download/)
standardizes authenticator behavior. Some authenticators support local user
verification with a biometric factor (such as a fingerprint or facial
recognition) or a knowledge factor (such as a PIN code). Many are integrated
into computing devices, such as laptops or smartphones, known as
_platform authenticators_. WebAuthn is supported on
[all major browsers (desktop and mobile)](https://caniuse.com/webauthn), and
authenticators are available on [billions of devices](https://lists.w3.org/Archives/Public/public-webauthn-adoption/2021Feb/0001.html).
Users can register and authenticate themselves by verifying their identity
locally on the platform.

{% Aside %}
The FIDO standard mandates the device not to transmit the biometric data outside of itself, so that the user verification only happens locally.
{% endAside %}

SPC is designed to work with User Verifying Platform Authenticators (UVPA).

<figure class="screenshot">
   {% Img
      src="image/VbsHyyQopiec0718rMq2kTE1hke2/byYdb1HUukKGr0X07MUg.png", alt="Example UVPAs include Apple Touch ID and a mobile phone camera",
      width="587", height="261"
   %}
   <figcaption>
      Many devices integrate a biometric sensor. Those authenticators are
      called user verifying platform authenticator (UVPA).
   </figcaption>
</figure>


### How does Secure Payment Confirmation work? {: #how-spc-work }

Secure Payment Confirmation (SPC) is built upon WebAuthn and designed
specifically for payment purposes. As WebAuthn credentials are registered for
specific domains, these credentials can't be used to authenticate on
unregistered sites that may be impersonating a merchant. This feature makes
WebAuthn effective against phishing attacks.

SPC adds a payment information layer on top of WebAuthn so that the card
issuer or the bank can provide a consistent payment experience. Once a payer
registers an authenticator with the relying party, it can be used to
authenticate on different merchant sites. The relying party can also choose to
use the payment credential as a regular WebAuthn credential.

[Stripe](https://stripe.com/) ran an experiment with SPC on their production
environment, as part of [Chrome's origin trials](/blog/origin-trials/). In
this experiment, Stripe achieved an 8% better conversion rate and the checkout
rate was three times faster. Read about their results in the
[SPC report in the W3C Web Payments Working Group](https://www.w3.org/2021/Talks/spc-pilot-202103.pdf).

## How do users experience SPC? {: #user-experience }

The SPC front-end consists of two stages: registration and authentication.

The customer must first register their device using the user-verifying
platform authenticator (UVPA). Once the device is registered, it can be used
to authenticate the user and confirm payments whenever SPC is performed on a
merchant's site.

{% Aside 'gotchas' %}
The customer will need to register for each device they use.
{% endAside %}

### Registration {: #registration }

Users can register for SPC in two ways:

* Register directly on the RP website.
* Register indirectly at a merchant website.

#### Registration on the RP website {: #registration-on-rp }

On the RP's website, SPC registration is no different than WebAuthn registration. Our recommendation is that the RP asks the customer to register their UVPA as part of a sign-in flow.

A typical scenario may look like this:

1. A customer signs in to your bank website using a username, password, and an additional verification step (typically a one-time password or OTP).
2. After a successful authentication, display a request for permission which asks the customer to register their device (UVPA).
3. Once permission is granted, the browser shows a WebAuthn registration dialog.
4. The customer consents to register the device by doing a biometric authentication.
5. The customer can now login and pay securely using their device.

With _reauthentication_, a user is already logged in but is asked to
authenticate again to ensure the same user is still present. This design is
typically seen in a security-critical operation, such as a request to change a
password or when making a payment. With a WebAuthn UVPA, reauthentication is
much quicker and stronger than using passwords.

{% Video src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/8oKo5F2Gl0GN7HBPDQAp.mov", autoplay=true, loop=true %}

Learn how to build a WebAuthn registration and authentication flow for
reauthentication at [Build your first WebAuthn app](https://developers.google.com/codelabs/webauthn-reauth).

#### Registration on a merchant website during payment {: #registration-on-merchant }

If your customer doesn't register their device on the payment issuer's
website, they could do so directly on a merchant website. The interface looks
the same, but the user's registration is initiated by the RP's code.

This is ideal when customers don't visit the RP website frequently but the RP would still like to offer the authentication option.

{% Video src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/CFq2q2ib59ZEjuBey6Mu.mov", autoplay=true, loop=true %}

### Authentication (Payment Confirmation) {: #authentication }

Authentication is required when a payer provides a payment credential during a payment transaction.

1. The payer provides a payment credential (such as credit card information).
2. The merchant checks whether the browser supports Secure Payment
   Confirmation.
3. If the browser supports SPC, call the Payment Request API with SPC as a
   payment method. Otherwise, fall back to the existing authentication method.
4. The payer confirms the transaction details and completes authentication
   (such as by touching their biometric platform authenticator).

{% Video src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/Ifnl5iGvDFs20BdoUTRo.mov", autoplay=true, loop=true %}

## Supported platforms

Secure Payment Confirmation is currently supported by Google Chrome on macOS
and Windows. Other platforms, including Android, iOS, and ChromeOS, are not
supported as of May 2022.

## Next steps

* [Registering a Secure Payment Confirmation](/articles/register-secure-payment-confirmation)
* [Authenticating with a Secure Payment Confirmation](/articles/authenticate-secure-payment-confirmation)
