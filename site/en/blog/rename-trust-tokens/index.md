---
layout: 'layouts/blog-post.njk'
title: 'Trust Tokens renamed Private State Tokens'
subhead: >
   Trust Token API will be renamed Private State Token API to better describe its privacy and utility benefits.
description: >
   Trust Token API will be renamed Private State Token API to better describe its privacy and utility benefits.
authors:
  - anusmitaray
date: 2022-10-19
---

{% Aside %}
The [origin trial](/origintrials/#/view_trial/2479231594867458049) for Private State Tokens (previously known as Trust Tokens) is now closed.

API status updates will be provided on this page and on [Chrome Platform Status](https://www.chromestatus.com/feature/5078049450098688).
{% endAside %}

## Name change

What you may have seen described as Trust Tokens will now be referred to as [Private State Tokens](/docs/privacy-sandbox/trust-tokens/).  
 
Private State Tokens enable trust in a user's authenticity to be conveyed from one context to another, to help sites combat fraud and distinguish bots from real humans without passive tracking.

## Why do we need this renaming?

The name "Trust Token API" was originally chosen to indicate that by using the API, websites could issue tokens to demonstrate their level of trust in the user. The tokens could then be redeemed for activity on other websites. Since then, we've received feedback that the name led to a misunderstanding that the API provided a signal of trust determined by the browser. The word "trust" has different meanings for different sites, and the website issuing the token determines the signal of trust.

We're renaming the Trust Token API to Private State Token API to better showcase its privacy and utility benefits. 

The API provides a small amount of storage to allow organizations to convey information from one context (token issuance) to another (token redemption)  in a privacy-preserving manner. The tokens are designed to help protect the user's identity by using techniques such as cryptographic  [blind signatures](https://en.wikipedia.org/wiki/Blind_signature). 

## Engage and share feedback

-  **Demo**: The Trust Tokens origin trial has closed, so the [demo](https://trust-token-demo.glitch.me/) won't work, but you can still view code for trust token issuance and redemption.
-  **GitHub**: Read the [proposal](https://github.com/WICG/trust-token-api), [raise questions and follow discussion](https://github.com/WICG/trust-token-api/issues).
-  **W3C**: Discuss industry use cases in the [Antifraud Community Group](https://www.w3.org/community/antifraud/).