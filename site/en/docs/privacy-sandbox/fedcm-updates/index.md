---
layout: 'layouts/blog-post.njk'
title: Federated Credential Management API updates
subtitle: >
   Overview of the latest changes to the FedCM.
description: >
   Overview of the latest changes to the FedCM.
authors:
 - agektmr
date: 2022-11-09
updated: 2023-07-10
---

The Federated Credential Management API is
[shipping in Chrome 108](/blog/fedcm-shipping),
but it's expected to continue evolving until Q4 2023 at least to stabilize.

## Who are these updates for?

These updates are for you if:

-   You are an IdP using the Federated Credential Management API—for
    example,
    [you have run an origin trial](/blog/fedcm-origin-trial/).
-   You are an IdP or RP and interested in extending the API to fit your use
    case – e.g. you've been observing or participating in
    [the discussions on the FedID CG repository](https://github.com/fedidcg/FedCM/issues)
    and want to understand the changes made to the API.
-   You are a browser vendor and you want to catch up on the implementation
    status of the API.

If you're new to this API or have not experimented with it yet, read the
[introduction to the Federated Credential Management API](/docs/privacy-sandbox/fedcm/).

## Changelog

To stay updated on the FedCM API changes, please subscribe to [our
newsletter](https://groups.google.com/g/fedcm-developer-newsletter).

### Chrome 115 (June 2023)

- Added support for auto-reauthentication which let users reauthenticate automatically when they come back after their initial authentication using FedCM. This improves the user experiences and enables a more streamlined reauthentication to the RP after the initial consent. Learn more about [FedCM auto-reauthentication](/blog/fedcm-auto-reauthn/). 

### Chrome 110 (February 2023)

- For the ID assertion endpoint, IdPs need to check the `Origin` header (instead of the `Referer` header) to see if the value matches the origin of the client ID.
- Cross-origin iframe support for FedCM is now available. The
  embedder should specify the
  [Permissions-Policy](https://github.com/w3c/webappsec-permissions-policy/blob/main/permissions-policy-explainer.md#how-is-a-policy-specified)
  `identity-credentials-get` to allow FedCM API in the embedded cross-origin
  iframe. You can check out an [example](https://fedcm-top-frame.glitch.me/) of
  the cross-origin iframe.
- Added a new Chrome flag `chrome://flags/#fedcm-without-third-party-cookies`. With this flag, you can test FedCM functionality in Chrome
  by blocking third-party cookies. Learn more from [the FedCM documentation](/docs/privacy-sandbox/fedcm/#block-third-party-cookies).

### Chrome 108 (October 2022)

-   "top-level manifest" is now called "well-known file" in the document.
    No implementation changes are required.
-   "IdP manifest" is now called "config file" in the document. No
    implementation changes are required.
-   The `id_token_endpoint` in the "config file" is renamed to
    [`id_assertion_endpoint`](https://fedidcg.github.io/FedCM/#dom-manifest-id_assertion_endpoint).
-   The requests to IdP now include a
    [`Sec-Fetch-Dest: webidentity`](https://fedidcg.github.io/FedCM/#sec-fetch-dest-header)
    header instead of a `Sec-FedCM-CSRF: ?1` header.

### Chrome 105 (August 2022)

-   Added important security information to the document. The identity
    provider (IdP) needs to check if the `Referer` header matches the origin
    the RP registered in advance on
    [the ID token endpoint](/docs/privacy-sandbox/fedcm/#id-assertion-endpoint).
-   The top-level manifest is renamed from `/.well-known/fedcm.json` to
    `/.well-known/web-identity` and the URL specified in `provider_urls` should
    include the file name.
-   Methods `login()`, `logout()` and `revoke()` on `FederatedCredential`
    instances are no longer available.
-   The Federated Credential Management API now uses a new type
    `IdentityCredential` instead of `FederatedCredential`. This can be used for
    feature detection but is otherwise a largely invisible change.
-   Move login functionality from a combination of
    ``navigator.credentials.get()`` and
    ``FederatedCredential.prototype.login()`` to `navigator.credentials.get()`.
-   The revocation endpoint in the manifest is no longer in effect.
-   Use an `identity` field instead of a `federated` field for
    `navigator.credentials.get()` calls.
-   `url` is now
    [`configURL`](https://fedidcg.github.io/FedCM/#dom-identityproviderconfig-configurl)
    and must be the full URL for the manifest JSON file instead of the path for
    a `navigator.credentials.get()` call.
-   [`nonce`](https://fedidcg.github.io/FedCM/#dom-identityproviderconfig-nonce)
    is now an optional parameter for `navigator.credentials.get()`.
-   `hint` is no longer available as an option for
`navigator.credentials.get()`.

```js
const credential = await navigator.credentials.get({
  identity: {
    providers: [{
      configURL: 'https://idp.example/anything.json',
      clientId: '********',
      nonce: '******'
    }]
  }
});
const { token } = credential;
```

### Chrome 104 (June 2022)

-   `consent_acquired` parameter sent to the ID token endpoint is now
    [`disclosure_text_shown`](https://fedidcg.github.io/FedCM/#dom-id_assertion_endpoint_request-disclosure_text_shown).
    The value is unchanged.
-   branding icons in
    [the IdP manifest](/docs/privacy-sandbox/fedcm-updates/#idp-config-file)
    have stopped supporting SVG images, but no longer need to be allowed by the
    RP's
    [Content Security Policy](https://developer.mozilla.org/docs/Web/HTTP/CSP).

### Chrome 103 (May 2022)

-   Supports desktop environments.
-   Supports per-RP settings on desktop.
-   The
    [client metadata endpoint](/docs/privacy-sandbox/fedcm-updates/#client-metadata-endpoint)
    is now optional. In this endpoint, the privacy policy URL is also optional.
-   Added a caveat about using CSP `connect-src` in the document.

## Resources

-   [Introduction to Federated Credential Management](/docs/privacy-sandbox/fedcm/)
-   [Federated Credential Management API: developer guide](/docs/privacy-sandbox/fedcm-developer-guide/)

