---
layout: 'layouts/blog-post.njk'
title: "Federated Credential Management API is shipping"
description: >
  The Federated Credential Management API is shipping in Chrome 108.
subhead: >
  FedCM is shipping. This is an announcement article for it.
hero: image/cGQxYFGJrUUaUZyWhyt9yo5gHhs1/g8fPm75gsSKFpu8F0mkk.jpg
alt: The individual hands of four people, each gripping the wrist of another
date: 2022-11-09
authors:
  - agektmr
  - goto
tags:
  - privacy
---

The Federated Credential Management API (FedCM) is shipping in Chrome 108 (currently on the Beta channel). When it ships
in Chrome Stable at the end of November 2022, the FedCM API will work in Chrome without requiring a flag or an origin trial token.

Check the final API changes in [the accumulated update page](https://docs.google.com/document/u/0/d/1jmFge4GOoiR8UcHbJIfEzV7gusVv8OfHsh3wK0VvfvY/edit?resourcekey=0-UQ748omNCkSI3_xR4p11SQ).

{% Aside %} If you are participating in the [FedCM origin trial](/origintrials/#/register_trial/3977804370874990593),
please note that the trial is scheduled to end on November 22nd, which is slightly earlier than Chrome 108 ships. {% endAside %}

Moving forward, we plan to introduce [a number of new features](https://docs.google.com/document/d/1grPkCEnICF2mtdMq_EZCWCwvl6J0UJ5CbzgbQ1fJAL4/edit?resourcekey=0-gRHs8wAbeqq7ybuPLAeSvQ#heading=h.hd4vvssat3s0)
based on the feedback we received from identity providers (IdP), relying parties (RP) and browser vendors. While we hope
identity providers will adopt FedCM, please be aware that FedCM is still an API under active development and that backward incompatible
changes are expected until Q4 2023.

To minimize the challenges of deploying backwards incompatible changes, we currently have two recommendations for identity providers:

- Subscribe to our [newsletter](https://groups.google.com/g/fedcm-developer-newsletter) where we will provide updates as the API evolves.
- We strongly encourage IdPs to distribute the FedCM API via JavaScript SDKs while the API is maturing, and to discourage RPs from self-hosting SDKs. This will ensure IdPs can make changes as the API evolves, without having to ask all of their relying parties to redeploy.

### Background

Over the last decade, identity federation has played a central role in raising the bar for authentication on the web, in
terms of trustworthiness, ease-of-use (for example, passwordless single sign-in) and security (for example, improved resistance
to phishing and credential stuffing attacks) compared to per-site usernames and passwords.

Unfortunately, the mechanisms that identity federation has relied on (iframes, redirects and cookies) are actively being
abused to track users across the web. As the user agent isn't able to differentiate between identity federation and tracking,
the mitigations for the various types of abuse make the deployment of identity federation more difficult.

[The Federated Credential Management API (FedCM)](https://fedidcg.github.io/FedCM/) provides a use-case-specific abstraction
for federated identity flows on the web, by exposing a browser mediated dialog that allows users to choose accounts from IdPs
to login to websites.

FedCM is a multi-step journey to make identity on the web better, and in its first step we are focused on reducing the impact
of third-party cookie phase-out on federated identity (see below for a few [steps further](https://docs.google.com/document/d/1grPkCEnICF2mtdMq_EZCWCwvl6J0UJ5CbzgbQ1fJAL4/edit?resourcekey=0-gRHs8wAbeqq7ybuPLAeSvQ#heading=h.hd4vvssat3s0)).

TODO: [embed a video](https://photos.app.goo.gl/fDgnzSd1MVWqQc58A)

Chrome has been [experimenting with FedCM since Chrome 101](/blog/fedcm-origin-trial/).

The [Google Identity Services](https://developers.google.com/identity/gsi/web/guides/overview) team participated in
[the origin trial](/docs/web-platform/origin-trials/) and demonstrated that switching to a
more private and secure sign-in process that does not rely on third-party cookies can occur transparently through backward-compatible
updates to their existing library. They enabled FedCM across 20 different relying parties and more than 300K users signed in to
them during origin trials. Learn more about how they are [planning to remove their dependence on third-party cookies](https://developers.google.com/identity/gsi/web/guides/supported-browsers#third-party_cookies).

We are also excited to find a lot of common ground with Mozilla, who have been actively engaged in
[design discussions](https://github.com/fedidcg/FedCM/issues) and [started prototyping FedCM in Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1782066).
Apple has indicated [their general support for the specification](https://lists.webkit.org/pipermail/webkit-dev/2022-March/032162.html) and is
starting to participate in discussions at the [FedID CG](https://www.w3.org/community/fed-id/).

### What's next

We are working on landing a number of changes to FedCM.

There are a few things we know that still need to be done, including issues we heard about from IdPs, RPs and browser vendors.
We believe we know how to resolve these issues:

- Cross-origin iframe support: IdPs can call FedCM from within a cross-origin iframe.
- Personalized button: IdPs can display a returning user's identity on the sign-in button from within a cross-origin iframe.
- Metrics endpoint: Provides performance metrics to IdPs.

Additionally, there are unresolved issues we are actively exploring including specific proposals that we are evaluating or prototyping:

- CORS: We are [working with Apple and Mozilla](https://github.com/fedidcg/FedCM/issues/320) to ensure to improve the specification of FedCM fetches, but for now we don't anticipate backwards incompatible changes as a result of this.
- Multiple-IdP API: We are exploring ways to support [multiple IdPs](https://github.com/fedidcg/FedCM/issues/319) to coexist cooperatively in the FedCM account chooser.
- IdP Sign-in Status API: Mozilla has identified a [timing attack issue](https://github.com/fedidcg/FedCM/issues/230), and we are exploring ways for an IdP to proactively [notify the browser of the user's sign-in status](https://fedidcg.github.io/FedCM/#the-idp-sign-in-status-api) to mitigate the issue.
- Sign in to IdP API: To support [various scenarios](https://github.com/fedidcg/FedCM/issues/348), when a user is not signed in to the IdP, the browser provides a UI for the user to sign in without leaving the RP.

Finally, there are things we believe still need to be done, based on feedback from [Mozilla](https://github.com/mozilla/standards-positions/issues/618#issuecomment-1221964677), [Apple](https://lists.webkit.org/pipermail/webkit-dev/2022-March/032162.html) and [TAG reviewers](https://github.com/w3ctag/design-reviews/issues/718#issue-1165654549). We are working to evaluate the best solution for these open questions:

-   Improving user comprehension and matching intent: As [Mozilla noted](https://github.com/mozilla/standards-positions/issues/618#issuecomment-1221964677), we'd like to continue exploring different UX formulations and surface areas, as well as triggering criteria.
-   Identity Attributes and Selective Disclosure: As our [TAG Reviewers noted](https://github.com/w3ctag/design-reviews/issues/718#issuecomment-1171733526), we'd like to provide a mechanism to selectively share more or less identity attributes (such as emails, age brackets, phone numbers, and so on).
-   Raising the Privacy Properties: As Mozilla suggested [here](https://github.com/mozilla/standards-positions/issues/618#issuecomment-1221964677), we'd like to continue exploring  mechanisms to offer better privacy guarantees, such as IdP blindness and directed identifiers.
-   Relationship with WebAuthn: As suggested by [Apple](https://lists.webkit.org/pipermail/webkit-dev/2022-March/032162.html), we are super excited to see the progress on [passkeys](http://goo.gle/passkeys) and to work on providing a coherent and cohesive experience between FedCM, Passwords, WebAuthn and WebOTP.
-   Login Status: As Apple suggested with the Privacy CG's [Login Status API](https://github.com/privacycg/is-logged-in), we share the intuition that the user's login status is a useful bit of information that can help browsers make informed decisions, and we are excited to see what opportunities arise from that.
-   Enterprises and Education: As is clear at the FedID CG, there are still [a lot of use cases](https://github.com/fedidcg/use-case-library/blob/main/decision_tree_flows/login/Federated%20Login%20OIDC%20Oauth2%20Auth%20Code%20Flow.png) that are not well served by FedCM that we'd like to work on, such as front-channel logout (the ability for an IdP to send a signal to RPs to logout) and support for SAML.
-   Relationship with mDLs/VCs/etc.: continue working to understand how these fit within FedCM, for example with the [Mobile Document Request API](https://github.com/WICG/mobile-document-request-api).

### Resources

-   Try the [FedCM demo](https://fedcm-rp-demo.glitch.me/).
-   If you are an IdP and interested to learn how to implement FedCM, read [the developer guide](/docs/privacy-sandbox/fedcm/). If you are a relying party, ask your IdP if they plan to implement FedCM.
-   We've also accumulated FedCM API updates at the [Federated Credential Management API updates](/docs/privacy-sandbox/fedcm-updates/).

If you have feature requests, feedback or issues, file them against [the FedCM public repository on GitHub](https://github.com/fedidcg/FedCM/).
