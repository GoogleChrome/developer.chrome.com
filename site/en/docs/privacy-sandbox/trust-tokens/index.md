---
layout: 'layouts/doc-post.njk'
title: 'Private State Tokens'
subhead: >
  An API to convey a limited amount of information from one browsing context to another (for example, across sites) to help combat fraud, without passive tracking.
description: >
  An API to convey a limited amount of information from one browsing context to another (for example, across sites) to help combat fraud, without passive tracking.
date: 2021-05-18
updated: 2023-03-14
authors:
  - samdutton
---

{% Aside %}
This article previously referred to Private State Tokens as "Trust Tokens". The
Trust Token API has been renamed to the Private State Token API to better
showcase its privacy and utility benefits.

Read [Trust Tokens renamed Private State Tokens](/blog/rename-trust-tokens)
for more information.
{% endAside %}

## Implementation status

{% Partial 'privacy-sandbox/timeline/private-state-tokens.njk' %}

## What are Private State Tokens?

{% YouTube
  id='bXB1Iwq6Eq4'
%}

Private State Tokens enable trust in a user's authenticity to be conveyed from one context to another, to
help sites combat fraud and distinguish bots from real humans—without passive tracking.

* An **issuer** website can issue tokens to the web browser of a user who shows that they're
trustworthy, for example through continued account usage, by completing a transaction, or by getting
an acceptable [reCAPTCHA score](https://developers.google.com/recaptcha).
* A **redeemer** website can confirm that a user is not fake by checking if they have tokens from an
issuer the redeemer trusts, and then redeeming tokens as necessary.

Private State Tokens are encrypted, so it isn't possible to identify an individual or connect trusted and
untrusted instances to discover user identity.

{% Aside 'caution' %}
Private State Tokens are not a replacement for reCAPTCHA or other mechanisms for determining whether or not
a user is who they say they are.

Private State Tokens are a way to **convey** trust in a user, not **establish** trust in a user.
{% endAside %}


## Why do we need Private State Tokens?

The web needs ways to establish and convey trust signals which show that a user is who they say
they are, and not a bot pretending to be a human or a malicious third-party defrauding a real person
or service. Fraud protection is particularly important for advertisers, ad providers, and
[CDNs](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/).

Unfortunately, many existing mechanisms to gauge and propagate trustworthiness—to work out if an
interaction with a site is from a real human, for example—take advantage of techniques that can also
be used for fingerprinting. Mechanisms to convey trust must preserve privacy, enabling trust to be
propagated across sites without individual user tracking.

With the Private State Token API, a website can issue cryptographic tokens to a user it trusts, which can
later be used elsewhere. The tokens are stored securely by the user's browser, and can then be
redeemed in other contexts to confirm the user's authenticity. This allows trust of a user on one
website (such as a social media site or email service) to be conveyed to another website (such as a
publisher or online store) without identifying the user or linking identities across sites.

{% Aside 'key-term' %}
[Fingerprinting](https://w3c.github.io/fingerprinting-guidance/#passive) enables sites to identify
and track individual users by getting data about their device, operating system, and browser setup
(such as language preferences, [user agent](https://developer.mozilla.org/docs/Web/API/NavigatorID/userAgent), and available fonts) or changes in device state. This may be done on the server by
checking request headers or on the client with JavaScript.

Fingerprinting uses mechanisms that users aren't aware of and can't control. Sites such as
[Panopticlick](https://panopticlick.eff.org/) and [amiunique.org](https://amiunique.org/) show how
fingerprint data can be combined to identify you as an individual.
{% endAside %}


## How do Private State Tokens work?

In this example a publisher website wants to check if a user is a real human, and not a bot, before displaying an ad.


1. A user visits a website (known as an **issuer**) and performs actions that lead the site to
believe that the user is a real human, such as making purchases, using an email account or
successfully completing reCAPTCHA.
1. The issuer site uses the Private State Token JavaScript API to trigger a request for trust tokens for
the user's browser.
1. The issuer site responds with token data.
1. The user's browser securely stores data for the trust token.
1. The user visits a different website (such as a news publisher) that wants to verify if the user
is a real human: for example, when displaying ads.
1. The site uses the Private State Token API to check if the user's browser has trust tokens stored for
issuers that the site trusts.
1. Private state tokens are found for the issuer the user visited previously.
1. The publisher site makes a request to the issuer to redeem the trust tokens.
1. The issuer site responds with a Redemption Record.
1. The publisher site makes a request to an ad platform, including the Redemption Record to show
that the user is trusted by the issuer to be a real human.
1. The ad platform provides the data required to display an ad.
1. The publisher site displays the ad.
1. An ad view impression is counted.

{% Aside %}
For more detail about the JavaScript calls in this example, see [Sample API usage](https://web.dev/trust-tokens/#sample-api-usage).
{% endAside %}

## Is tooling available for Privacy State Tokens?

Chrome DevTools turns on inspection from the Network and Application tabs. Read more about this [DevTools integration](/blog/new-in-devtools-89/#trust-token) and about [Private State Tokens](/docs/privacy-sandbox/trust-tokens/).

## How do publishers handle tokens from multiple trusted issuers?

The publisher can check a user's browser for valid tokens with `document.hasTrustToken()` for one issuer at a time. If this returns `true` and a token is available, the publisher can redeem the token and stop looking for other tokens.

The publisher must decide which token issuers to check and in what order.

---

## Engage and share feedback

* **Origin trial**: Now [closed](/origintrials/#/view_trial/2479231594867458049).
* **Demo**: The Trust Tokens origin trial has closed, but you can still check out the [demo](https://private-state-token-demo.glitch.me/).
* **GitHub**: Read the [proposal](https://github.com/WICG/trust-token-api), [raise questions and
follow discussion](https://github.com/WICG/trust-token-api/issues).
* **W3C**: Discuss industry use cases in the [Improving Web Advertising Business&nbsp;Group](https://www.w3.org/community/web-adv/participants).
* **IETF**: Provide technical input for the underlying protocol in the IETF
[Privacy&nbsp;Pass&nbsp;working group](https://datatracker.ietf.org/wg/privacypass/about/).
* **Developer support**: Ask questions and join discussions on the
[Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
* **Origin trial questions**: [file a Chromium bug](https://bugs.chromium.org/p/chromium/issues/list?q=trust%20tokens) or respond to the feedback form that is sent to you as an origin trial participant. 


## Find out more

* [Private State Token API technical explainer](https://github.com/dvorak42/trust-token-api)
* [Getting started with Private State Tokens](https://web.dev/trust-tokens/): an overview for web developers
* [Getting started with Chrome's origin trials](https://web.dev/origin-trials)
* [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
