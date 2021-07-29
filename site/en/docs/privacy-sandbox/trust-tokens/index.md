---
layout: 'layouts/doc-post.njk'
title: 'Trust Tokens'
subhead: >
  Trust Tokens is a new API to help combat fraud and distinguish bots from real humans, without passive tracking.
description: >
  The Trust Tokens API enables trust of a user in one context to be conveyed to another context, without identifying the user or linking identities between the two contexts. The API enables an origin to issue cryptographic tokens to a user it trusts. The tokens are stored by the user's browser. The browser can then use the tokens in other contexts to evaluate the user's authenticity.
date: 2021-05-18
updated: 2021-07-29
authors:
  - samdutton
---


## Implementation status

* [In origin trial](https://web.dev/origin-trials/) Chrome 84 to 91.
* [Register for the trial](https://developer.chrome.com/origintrials/#/view_trial/2479231594867458049).
* [Demo](https://trust-token-demo.glitch.me/).
* [Chrome DevTools integration](https://developers.google.com/web/updates/2021/01/devtools?utm_source=devtools#trust-token).
* [Chrome Platform Status](https://www.chromestatus.com/feature/5078049450098688).


## What are Trust Tokens?

{% YouTube
  id='bXB1Iwq6Eq4' 
%}

Trust Tokens enable trust in a user's authenticity to be conveyed from one context to another, to 
help sites combat fraud and distinguish bots from real humans—without passive tracking.

* An **issuer** website can issue tokens to the web browser of a user who shows that they're
trustworthy, for example through continued account usage, by completing a transaction, or by getting
an acceptable [reCAPTCHA score](https://developers.google.com/recaptcha).
* A **redeemer** website can confirm that a user is not fake by checking if they have tokens from an 
issuer the redeemer trusts, and then redeeming tokens as necessary.

Trust tokens are encrypted, so it isn't possible to identify an individual or connect trusted and 
untrusted instances to discover user identity.

{% Aside 'caution' %}
Trust Tokens are not a replacement for reCAPTCHA or other mechanisms for determining whether or not 
a user is who they say they are.

Trust Tokens are a way to **convey** trust in a user, not **establish** trust in a user.
{% endAside %}


## Why do we need Trust Tokens?

The web needs ways to establish and convey trust signals which show that a user is who they say 
they are, and not a bot pretending to be a human or a malicious third-party defrauding a real person
or service. Fraud protection is particularly important for advertisers, ad providers, and 
[CDNs](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/).   

Unfortunately, many existing mechanisms to gauge and propagate trustworthiness—to work out if an 
interaction with a site is from a real human, for example—take advantage of techniques that can also 
be used for fingerprinting. Mechanisms to convey trust must preserve privacy, enabling trust to be 
propagated across sites without individual user tracking.

With the Trust Tokens API, a website can issue cryptographic tokens to a user it trusts, which can 
later be used elsewhere. The tokens are stored securely by the user's browser, and can then be 
redeemed in other contexts to confirm the user's authenticity. This allows trust of a user on one 
website (such as a social media site or email service) to be conveyed to another website (such as a 
publisher or online store) without identifying the user or linking identities across sites.
  
{% Aside 'key-term' %}  
[Fingerprinting](https://w3c.github.io/fingerprinting-guidance/#passive) enables sites to identify 
and track individual users by getting data about their device, operating system, and browser setup 
(such as language preferences, [user agent](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorID/userAgent), and available fonts) or changes in device state. This may be done on the server by 
checking request headers or on the client with JavaScript.

Fingerprinting uses mechanisms that users aren't aware of and can't control. Sites such as 
[Panopticlick](https://panopticlick.eff.org/) and [amiunique.org](https://amiunique.org/) show how
fingerprint data can be combined to identify you as an individual.  
{% endAside %} 


## How do Trust Tokens work?

In this example a publisher website wants to check if a user is a real human, and not a bot, before displaying an ad.


1. A user visits a website (known as an **issuer**) and performs actions that lead the site to 
believe that the user is a real human, such as making purchases, using an email account or 
successfully completing reCAPTCHA.
1. The issuer site uses the Trust Tokens JavaScript API to trigger a request for trust tokens for 
the user's browser.
1. The issuer site responds with token data.
1. The user's browser securely stores data for the trust token.
1. The user visits a different website (such as a news publisher) that wants to verify if the user 
is a real human: for example, when displaying ads.
1. The site uses the Trust Tokens API to check if the user's browser has trust tokens stored for 
issuers that the site trusts.
1. Trust tokens are found for the issuer the user visited previously.
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

---

## Engage and share feedback

* **Origin trial**: Register and take part in the [Chrome origin trial](https://developer.chrome.com/origintrials/#/view_trial/2479231594867458049).
* **Demo**: Try out trust token [issuance and redemption](https://trust-token-demo.glitch.me/).
* **GitHub**: Read the [proposal](https://github.com/WICG/trust-token-api), [raise questions and 
follow discussion](https://github.com/WICG/trust-token-api/issues).
* **W3C**: Discuss industry use cases in the [Improving Web Advertising Business&nbsp;Group](https://www.w3.org/community/web-adv/participants).
* **IETF**: Provide technical input for the underlying protocol in the IETF 
[Privacy&nbsp;Pass&nbsp;working group](https://datatracker.ietf.org/wg/privacypass/about/).
* **Developer support**: Ask questions and join discussions on the 
[Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).


## Find out more

* [Trust Token API technical explainer](https://github.com/dvorak42/trust-token-api)
* [Getting started with Trust Tokens](https://web.dev/trust-tokens/): an overview for web developers
* [Getting started with Chrome's origin trials](https://web.dev/origin-trials)
* [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)


