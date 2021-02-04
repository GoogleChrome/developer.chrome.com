---
layout: 'layouts/doc-post.njk'
title: 'What are Trust Tokens?'
subhead: 'Trust Tokens is a new API to help combat fraud and distinguish bots from real humans, without passive tracking.'
description: 'Trust Tokens enable an origin to issue cryptographic tokens to a user it trusts. The tokens are stored by the user's browser. The browser can then use the tokens in other contexts to evaluate the user's authenticity. The Trust Token API enables trust of a user in one context to be conveyed to another context without identifying the user or linking the two identities.'
date: 2021-01-04
updated: 2021-01-04
authors:
  - samdutton
---

## What are Trust Tokens?

Trust Tokens enable trust in a user's authenticity to be conveyed from one context to another, to help sites combat fraud and distinguish bots from real humans, without passive tracking. Tokens can be issued by a website to a user once the user has shown that they're trustworthy, for example through continued account usage or by completing a transaction. Another website can later confirm that the user is not fake, by checking if they have tokens from an issuer the site trusts. 

{% Aside 'caution' %}
Trust Tokens are a way to **convey** trust in a user, not **establish** trust in a user. Trust Tokens are not a replacement for reCAPTCHA or other mechanisms for determining whether or not a user is who they say they are. 
{% endAside %}

### Today
Blah

### Future
Blah

## How do Trust Tokens work?

1. A user visits a website (known as an issuer) and performs actions that lead the site to believe that the user is a real human, such as making purchases, using an email account or successfully completing reCAPTCHA.
1. The Trust Tokens JavaScript API is used to request trust tokens from the issuer site.
1. The issuer site responds with token data.
1. The user's browser securely stores data for the trust token. 
1. The user visits a website (such as a news publisher) that wants to verify if the user is a real human: for example, when displaying ads.  
1. The site uses the Trust Tokens API to check if the user's browser has trust tokens stored for issuers that the site trusts. 
1. Trust tokens are found for the issuer the user visited previously. 
1. The publisher site makes a request to the issuer to redeem the trust tokens.
1. The issuer site responds with a "Signed Redemption Record" (SRR). 
1. The publisher site makes a request to an ad platform, including the SRR to show that the user is trusted by the issuer to be a real human.
1. The ad platform provides the data required to display an ad.
1. The publisher site displays the ad.
1. An ad view impression is counted. 

The web needs ways to convey trust, to show that a user is who they say they are, and not a bot pretending to be a human, or a malicious third-party defrauding a real person or service. Fraud protection is particularly important for advertisers, ad providers, and [CDNs](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/).

Unfortunately, many existing mechanisms to gauge and propagate trustworthiness—to work out if an interaction with a site is from a real human, for example—take advantage of techniques that can also be used for fingerprinting. Mechanisms to convey trust must preserve privacy, enabling trust to be propagated across sites without individual user tracking.

With the Trust Tokens API, a website can issue cryptographic tokens to a user it trusts that can later be used elsewhere. The tokens are stored securely by the user's browser, and can then be redeemed in other contexts to confirm the user's authenticity. This allows trust of a user on one website (such as a social media site or email service) to be conveyed to another website (such as a publisher or online store) without identifying the user or linking identities across sites.
