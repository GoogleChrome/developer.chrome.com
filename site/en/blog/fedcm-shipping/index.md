---
layout: 'layouts/blog-post.njk'
title: Federated Credential Management API is shipping
subtitle: >
   The Federated Credential Management API is shipping in Chrome 108.
description: >
   The Federated Credential Management API is shipping in Chrome 108.
hero: image/jxu1OdD7LKOGIDU7jURMpSH2lyK2/hffBwKwv3jmbHSYCsjfQ.png
alt: "Four people holding and crossing hands."
authors:
 - agektmr
 - samuelgoto
date: 2022-11-09
updated: 2022-11-28
tags:
  - privacy
  - identity
---

The [Federated Credential Management API](/docs/privacy-sandbox/fedcm/) (FedCM) is shipping in Chrome 108 (currently on the Beta channel). When it ships in Chrome Stable at the end of November 2022, the FedCM API will work in Chrome without requiring a flag or an origin trial token.

FedCM is a [Privacy Sandbox API](/docs/privacy-sandbox/overview/) that provides a use-case-specific abstraction for federated identity flows on the web. FedCM exposes browser-mediated dialogs that allows users to choose accounts from identity providers to login to websites.

Review the latest API changes in the [accumulated update page](/docs/privacy-sandbox/fedcm-updates).

{% Aside %}

The [FedCM origin trial](/origintrials/#/view_trial/3977804370874990593), is
ended on November 22nd.

{% endAside %}

We plan to introduce [a number of new features](#whats-next) based on the
feedback we received from identity providers (IdP), relying parties (RP) and
browser vendors. While we hope identity providers will adopt FedCM, please be
aware that FedCM is still an API under active development and that backward
incompatible changes are expected until Q4 2023.

To minimize the challenges of deploying backwards incompatible changes, we
currently have two recommendations for identity providers:

-   Subscribe to our
    [newsletter](https://groups.google.com/g/fedcm-developer-newsletter) where
    we will provide updates as the API evolves.
-   We strongly encourage IdPs to distribute the FedCM API via JavaScript
    SDKs while the API is maturing, and to discourage RPs from self-hosting
    SDKs. This will ensure IdPs can make changes as the API evolves, without
    having to ask all of their relying parties to redeploy.

## Background

Over the last decade, identity federation has played a central role in raising
the bar for authentication on the web, in terms of trustworthiness, ease-of-use
(for example, passwordless single sign-in) and security (for example, improved
resistance to phishing and credential stuffing attacks) compared to per-site
usernames and passwords.

Unfortunately, the mechanisms that identity federation has relied on (iframes,
redirects and cookies) are actively being abused to track users across the web.
As the user agent isn't able to differentiate between identity federation and
tracking, the mitigations for the various types of abuse make the deployment of
identity federation more difficult.

[FedCM](https://fedidcg.github.io/FedCM) is a multi-step journey to make
identity on the web better, and in its
first step we are focused on reducing the impact of third-party cookie phase-out
on federated identity (see below for [what's next](#whats-next)).

<figure class="screenshot">
  {% Video
    src="video/vgdbNJBYHma2o62ZqYmcnkq3j0o1/TJLjWp1nVLlDMMCK2ugQ.mov",
    autoplay="true",
    loop="true"
  %}
  <figcaption>A user is signing to an RP using FedCM</figcaption>
</figure>

Chrome has been
[experimenting with FedCM since Chrome 101](/origintrials/#/view_trial/3977804370874990593).

The
[Google Identity Services](https://developers.google.com/identity/gsi/web/guides/overview)
team participated in
[the origin trial](/docs/web-platform/origin-trials/)
and demonstrated that switching to a more private and secure sign-in process
that does not rely on third-party cookies can occur transparently through
backward-compatible updates to their existing library. They enabled FedCM across
20 different relying parties and more than 300K users signed in to them during
origin trials. Learn more about how they are
[planning to remove their dependence on third-party cookies](https://developers.google.com/identity/gsi/web/guides/supported-browsers#third-party_cookies).

We're excited to find a lot of common ground with Mozilla, who have been
actively engaged in [design
discussions](https://github.com/fedidcg/FedCM/issues) and
[started prototyping FedCM in Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1782066).
Apple has indicated
[their general support for the specification](https://lists.webkit.org/pipermail/webkit-dev/2022-March/032162.html)
and is starting to participate in discussions at the [FedID
CG](https://www.w3.org/community/fed-id/).

## What's next {: #whats-next}

We are working on landing a number of changes to FedCM.

There are a few things we know that still need to be done, including issues we
heard about from IdPs, RPs and browser vendors. We believe we know how to
resolve these issues:

-   **Cross-origin iframe support**: IdPs can call FedCM from within a
    cross-origin iframe.
-   **Personalized button**: IdPs can display a returning user's identity on
    the sign-in button from within a cross-origin iframe.
-   **Metrics endpoint**: Provides performance metrics to IdPs.

Additionally, there are unresolved issues we are actively exploring including
specific proposals that we are evaluating or prototyping:

-   **CORS**: We are [discussing with Apple and
    Mozilla](https://github.com/fedidcg/FedCM/issues/320) to ensure to improve
    the specification of FedCM fetches.
-   **Multiple-IdP API**: We are exploring ways to support [multiple
    IdPs](https://github.com/fedidcg/FedCM/issues/319) to coexist cooperatively
    in the FedCM account chooser.
-   **IdP Sign-in Status API**: Mozilla has identified a [timing attack
    issue](https://github.com/fedidcg/FedCM/issues/230), and we are exploring
    ways for an IdP to proactively
    [notify the browser of the user's sign-in status](https://fedidcg.github.io/FedCM/#the-idp-sign-in-status-api)
    to mitigate the issue.
-   **Sign in to IdP API**: To support [various
    scenarios](https://github.com/fedidcg/FedCM/issues/348), when a user is not
    signed in to the IdP, the browser provides a UI for the user to sign in
    without leaving the RP.

Finally, there are things we believe still need to be done, based on feedback
from
[Mozilla](https://github.com/mozilla/standards-positions/issues/618#issuecomment-1221964677),
[Apple](https://lists.webkit.org/pipermail/webkit-dev/2022-March/032162.html)
and
[TAG reviewers](https://github.com/w3ctag/design-reviews/issues/718#issue-1165654549).
We are working to evaluate the best solution for these open questions:

-   **Improving user comprehension and matching intent**: As
    [Mozilla noted](https://github.com/mozilla/standards-positions/issues/618#issuecomment-1221964677),
    we'd like to continue exploring different UX formulations and surface
    areas, as well as triggering criteria.
-   **Identity Attributes and Selective Disclosure**: As our
    [TAG Reviewers noted](https://github.com/w3ctag/design-reviews/issues/718#issuecomment-1171733526),
    we'd like to provide a mechanism to selectively share more or less identity
    attributes (such as emails, age brackets, phone numbers, and so on).
-   **Raising the Privacy Properties**: As Mozilla suggested
    [here](https://github.com/mozilla/standards-positions/issues/618#issuecomment-1221964677),
    we'd like to continue exploring mechanisms to offer better privacy
    guarantees, such as  IdP blindness and directed identifiers.
-   **Relationship with WebAuthn**: As suggested by
    [Apple](https://lists.webkit.org/pipermail/webkit-dev/2022-March/032162.html),
    we are super excited to see the progress on
    [passkeys](http://goo.gle/passkeys) and to work on providing a coherent and
    cohesive experience between FedCM, Passwords, WebAuthn and WebOTP.
-   **Login Status**: As Apple suggested with the Privacy CG's [Login Status
    API](https://github.com/privacycg/is-logged-in), we share the intuition
    that the user's login status is a useful bit of information that can help
    browsers make informed decisions, and we are excited to see what
    opportunities arise from that.
-   **Enterprises and Education**: As is clear at the FedID CG, there are
    still
    [a lot of use cases](https://github.com/fedidcg/use-case-library/blob/main/decision_tree_flows/login/Federated%20Login%20OIDC%20Oauth2%20Auth%20Code%20Flow.png)
    that are not well served by FedCM that we'd like to work on, such as
    front-channel logout (the ability for an IdP to send a signal to RPs to
    logout) and support for SAML.
-   **Relationship with mDLs, VCs, and others**: Continue working to understand how
    these fit within FedCM, for example with the
    [Mobile Document Request API](https://github.com/WICG/mobile-document-request-api).

## Resources

-   Try the [FedCM demo](https://fedcm-rp-demo.glitch.me/).
-   If you're an IdP interested in implementing FedCM, read
    [the developer guide](/docs/privacy-sandbox/fedcm/).
    If you're an RP, ask your IdP if they plan to implement FedCM.
-   Review the [FedCM API updates](/docs/privacy-sandbox/fedcm-updates/).
-   If you have feature requests, feedback or issues, file them against [the
    FedCM public repository on GitHub](https://github.com/fedidcg/FedCM/).
