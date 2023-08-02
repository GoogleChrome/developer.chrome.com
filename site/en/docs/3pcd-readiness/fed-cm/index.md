---
layout: layouts/doc-post.njk
title: Federated Credentials Management
subhead: >
  A web API for privacy-preserving identity federation.
description: ''
date: 2023-07-26
updated: 2023-07-26
authors:
  - albertomedina
---

Federated Credentials Management API aims to fill the specific hole left by the removal of third-party cookies on federated login. Historically this has relied on third-party cookies or navigational redirects in order to function as they were the primitives provided by the web.

Chrome [shipped](https://groups.google.com/a/chromium.org/g/blink-dev/c/IGvFrHYMH7A) cross-origin iframe support for FedCM in version 110 (stable release on Feb 7, 2023). The embedder should specify the [Permissions-Policy](https://github.com/w3c/webappsec-permissions-policy/blob/main/permissions-policy-explainer.md#how-is-a-policy-specified) identity-credentials-get to allow FedCM API in the embedded cross-origin iframe. You can check out an [example](https://fedcm-top-frame.glitch.me/) of the cross-origin iframe.

## FedCM on cross-origin iframes

Adds support for calling the FedCM API inside cross-origin iframes via a permissions policy which sites are opted out of by default. It enables websites to sandbox the scripts from identity providers which trigger the FedCM API in an iframe.

## Debuggability

You can block third-party cookies in Chrome by following the [instructions in the FedCM API documentation](/docs/privacy-sandbox/fedcm/#block-third-party-cookies). However, FedCM is temporarily disabled if third-party cookies are blocked. To help developers test whether their websites are affected by Chrome phasing out third-party cookies and check how FedCM can help with fixing the breakage, Chrome added a new flag #fedcm-without-third-party-cookies in version 110. By enabling the flag, you can test FedCM with third-party cookies blocked.

Should you have any feedback on the API, please file them at https://new.crbug.com and set Components to Blink>Identity>FedCM.
