---
layout: 'layouts/doc-post.njk'
title: "View and change Private State Tokens"
subhead: How to view and change Private State Tokens with the Local Storage pane.
description: How to view and change Private State Tokens with the Local Storage pane.
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

Private State Tokens enable a website to convey a limited amount of information from one browsing context to another
(for example, across sites) to help combat fraud, without passive tracking. From the proposal [**explainer**](https://github.com/WICG/trust-token-api#overview):

{% Blockquote 'WICG', 'pullquote' %}
<p>These
tokens are non-personalized and cannot be used to track users, but are
cryptographically signed so they cannot be forged.</p>
{% endBlockquote %}

## View Private State Token data

1. [Open DevTools](/docs/devtools/open/) > **Application** > **Storage**.
