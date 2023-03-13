---
layout: 'layouts/doc-post.njk'
title: "View and change Private State Tokens"
subhead: How to view and change Private State Tokens with the Local Storage pane and the Console.
description: How to view and change Private State Tokens with the Local Storage pane and the Console.
authors:
  - sofiayem
  - aaronforinton
date: 2023-03-14
#updated: YYYY-MM-DD
tags:
  - storage
---

This guide shows you how to use [Chrome DevTools](/docs/devtools/) to inspect [Private State Token](/docs/privacy-sandbox/trust-tokens/)
data. The [Private State Token API](https://wicg.github.io/trust-token-api/) was previously known as the [Trust Token API](/blog/rename-trust-tokens/).

API to convey a limited amount of information from one browsing context to another (for example, across sites) to help combat fraud, without passive tracking.

Private State Tokens are encrypted, so it isn't possible to identify an individual or connect trusted and untrusted instances to discover user identity.

With the Private State Token API, a website can issue cryptographic tokens to a user it trusts, which can later be used elsewhere. The tokens are stored securely by the user's browser, and can then be redeemed in other contexts to confirm the user's authenticity. This allows trust of a user on one website (such as a social media site or email service) to be conveyed to another website (such as a publisher or online store) without identifying the user or linking identities across sites.

## View Private State Token data

1. [Open DevTools](/docs/devtools/open/) > **Application** > **Storage**.
