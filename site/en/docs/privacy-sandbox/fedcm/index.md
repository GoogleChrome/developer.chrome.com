---
layout: 'layouts/doc-post.njk'
title: 'Federated Credential Management API'
subhead: >
  A web API for privacy-preserving identity federation.
description: >
  A web platform API that allows users to login to websites with their federated accounts in a manner compatible with improvements to browser privacy.
date: 2022-04-25
updated: 2023-02-27
authors:
  - agektmr
---

## What is FedCM?

FedCM (Federated Credential Management) is a proposal for a privacy-preserving
approach to federated identity services (such as "Sign in with...")  where
users can log into sites without sharing their personal information with the
identity service or the site.

## Implementation status

{% Partial 'privacy-sandbox/timeline/fedcm.njk' %}

Moving forward, we plan to introduce [a number of new features](#roadmap) based
on the feedback we received from identity providers (IdP), relying parties (RP)
and browser vendors. While we hope identity providers will adopt FedCM, please
be aware that FedCM is still an API under active development and that backward
incompatible changes are expected until Q4 2023.

To minimize the challenges of deploying backwards incompatible changes, we
currently have two recommendations for identity providers:

* Subscribe to our
  [newsletter](https://groups.google.com/g/fedcm-developer-newsletter) where we
  will send updates as the API evolves.
* We encourage IdPs to distribute the FedCM API via JavaScript SDKs while the
  API is maturing, and to discourage RPs from self-hosting SDKs. This will
  ensure IdPs can make changes as the API evolves, without having to ask all of
  their relying parties to redeploy.

## Why do we need FedCM?

Over the last decade, identity federation has played a central role in raising
the bar for authentication on the web, in terms of trustworthiness, ease-of-use
(for example, passwordless single sign-in) and security (for example, improved
resistance to phishing and credential stuffing attacks) compared to per-site
usernames and passwords. 

With identity federation, an RP (relying party) relies on an IdP (identity
provider) to provide the user an account without requiring a new username
and password.

{% Aside 'key-term' %}

_Identity federation_ delegates authentication or authorization of an
individual (user or entity) to a trusted external party (an _identity
provider_ or IdP). The identity provider then allows the individual to
sign in to a website (a _relying party_ or RP). 

{% endAside %}

Unfortunately, the mechanisms that identity federation has relied on (iframes,
redirects and cookies) are actively being abused to track users across the web.
As the user agent isn’t able to differentiate between identity federation and
tracking, the mitigations for the various types of abuse make the deployment of
identity federation more difficult.

[The Federated Credential Management API
(FedCM)](https://fedidcg.github.io/FedCM/) provides a use-case-specific
abstraction for federated identity flows on the web, by exposing a browser
mediated dialog that allows users to choose accounts from IdPs to login to
websites. 

FedCM is a multi-step journey to make identity on the web better, and in its
first step we are focused on reducing the impact of third-party cookie phase-out
on federated identity (see [the Roadmap section](#roadmap) to see a few steps
further).

<figure class="screenshot">
  {% Video
    src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/2ZZ58TQMavJfj047XM5I.mov",
    autoplay="true",
    loop="true"
  %}
  <figcaption>A user is signing to an RP using FedCM</figcaption>
</figure>

### What do we expect will be affected?

{% Aside 'caution' %}

The aim of the [Privacy Sandbox initiative](https://privacysandbox.com/) 
is to mitigate all tracking vectors in Chrome. Our first step is to reduce the impact
of third-party cookie phase-out which is already happening in other browsers,
and is [planned in Chrome for
2024](https://blog.google/products/chrome/update-testing-privacy-sandbox-web/).
While removing these cookies can help reduce third-party tracking, it also
impacts other cross-site use cases.

{% endAside %}

Through [community
effort](https://github.com/fedidcg/use-case-library/wiki/Primitives-by-Use-Case)
and our research, we learned there are a few identity federation related
integrations that are affected by third-party cookie phase-out:

* [OpenID Connect Front-Channel
  Logout](https://openid.net/specs/openid-connect-frontchannel-1_0.html)
* [OpenID Connect Session
  Management](https://openid.net/specs/openid-connect-session-1_0.html)
* [Iframe-based background token
  renewal](https://github.com/fedidcg/use-case-library/issues/10)
* [Iframe-based login
  widgets](https://github.com/fedidcg/use-case-library/issues/12)

FedCM's first goal is to reduce the impact of third-party cookie phase-out on
identity federation and above is a list of areas we expect to be affected. If
there are any additional use cases that we've not listed, we encourage you to
[engage and share feedback](#share-feedback).

## Who should use FedCM? {: #who-uses-fedcm }

We expect FedCM to be useful to you only if **all** these conditions apply:

1. You're an identity provider (IdP).
1. You're affected by the third-party cookie phase out.
1. Your RPs are third-parties. If your RPs are 
   [SameParty](/blog/first-party-sets-sameparty/), you may be better served
   by [First-Party
   Sets](/docs/privacy-sandbox/first-party-sets/).

### You're an IdP {: #idp }

FedCM requires support from an identity provider. A relying party cannot use
FedCM independently. If you are an RP, you can ask your IdP to provide
instructions.

### You're affected by the third-party cookie phase out {: #unaffected-by-3p-cookies }

You should only use FedCM if your current integration is affected by the
third-party cookie phase out.

If you're unsure if your identity federation will continue to work after
Chrome's third-party-cookie phase-out, you can test the effect on a website by
[blocking third-party cookies on Chrome](#block-third-party-cookies).

If there is no discoverable impact on your identity federation without
third-party cookies, you can continue using your current integration without
FedCM.

If you aren't sure what to check for, read more about the [known
features](https://github.com/fedidcg/use-case-library/wiki/Primitives-by-Use-Case)
that the phase-out is expected to affect.

### Your RPs are third-party

If you're an identity provider whose RPs are within the [same
party](/blog/first-party-sets-sameparty/#first-party-sets-policy) as your IdP, we expect [First-Party Sets](/docs/privacy-sandbox/first-party-sets/)
may be a better option. First-Party Sets allow related domain names owned and operated by the same entity to declare themselves as belonging to the same first-party. This allows the same party's third-party cookies to work, even after third-party cookie phase-out.

First-Party Sets can't always be used. However, if your RPs are
[SameParty](/blog/first-party-sets-sameparty/#first-party-sets-policy),
consider using First-Party Sets.

## How will users interact with FedCM? {: #use-cases}

Currently, FedCM's primary focus is to mitigate the impact of third-party cookie
phase-out. Users can enable or disable FedCM in [Chrome's user
settings](#user-settings).

FedCM is designed to be protocol-agnostic and offers the following
authentication-related functionalities.

* [Use an identity provider to sign-in to a relying party](#sign-in)

[Check out our demo](https://fedcm-rp-demo.glitch.me) to see how it works.

### Sign in to a relying party {: #sign-in}

<figure class="float-right screenshot">
{% Video
   src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/Qx48SEGIEqi5OtPE9ogn.mp4",
   width="280", autoplay="true", loop="true"
%}
  <figcaption>A user is signing to an RP using FedCM</figcaption>
</figure>

When the user lands on the relying party (RP) website, a FedCM sign-in dialog
will appear if the user is signed in to the IdP. 

If the user doesn't have an account on the RP with the IdP, a sign-up dialog
appears with additional disclosure text such as the RP's terms of service and a
privacy policy if they are provided.

The user can complete sign in by tapping **Continue as...**. If successful, the
browser stores the fact that the user has created a federated account on the RP
with the IdP.

{% Aside %}

If the user closes the UI manually, an entry would be added to the [settings
UI](#user-settings) and the UI won't be displayed in the same website for a
period of time. The UI will be reenabled after the period, but the duration will
[be exponentially
expanded](https://developers.google.com/identity/gsi/web/guides/features#exponential_cooldown).
Users can reenable FedCM on the RP manually by either going to the [settings
page](#user-settings) or clicking on the PageInfo UI (a lock icon beside the URL
bar) and reset the permission.

{% endAside %}

RPs are expected to work on browsers which don't support FedCM. Users should be
able to use an existing, non-FedCM sign-in process. Learn more about [how
sign-in works in the FedCM](#sign-into-rp).

### Setting to enable or disable FedCM {: #user-settings}

Users can enable or disable FedCM in settings on Chrome on Android. Go to
**Settings** > **Site settings** > **Third-party sign-in**, then change the
toggle.

{% Img
   src="image/VbsHyyQopiec0718rMq2kTE1hke2/ThWp3UvxdbU6TzwxlC1j.jpg", alt="Enable FedCM in Chrome Settings on mobile by toggling on Third-party sign-in",
   width="550", height="257", class="screenshot"
%}

They can do the same for Chrome on desktop by going to
`chrome://settings/content/federatedIdentityApi`.

{% Img
   src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/8zR9MNWyt0c6M5GjWpfw.png", alt="Enable FedCM in Chrome Settings on desktop by toggling on Third-party sign-in",
   width="800", height="678", class="screenshot"
%}

## Roadmap {: #roadmap}

We are working on landing a number of changes on the FedCM.

There are a few things we know that still need to be done, including issues we
heard about from IdPs, RPs and browser vendors. We believe we know how to
resolve these issues:

* **Cross-origin iframe support**: IdPs can call FedCM from within a
  cross-origin iframe.
* **Personalized button**: IdPs can display a returning user's identity on the
  sign-in button from within an IdP owned cross-origin iframe.
* **Metrics endpoint**: Provides performance metrics to IdPs.

Additionally, there are unresolved issues we are actively exploring including
specific proposals that we are evaluating or prototyping:

* **CORS**: We are [discussing with Apple and
  Mozilla](https://github.com/fedidcg/FedCM/issues/320) to ensure to improve the
  specification of FedCM fetches.
* **Multiple-IdP API**: We are exploring ways to support [multiple
  IdPs](https://github.com/fedidcg/FedCM/issues/319) to coexist cooperatively in
  the FedCM account chooser.
* **IdP Sign-in Status API**: Mozilla has identified a [timing attack
  issue](https://github.com/fedidcg/FedCM/issues/230), and we are exploring ways
  for an IdP to proactively [notify the browser of the user's sign-in
  status](https://fedidcg.github.io/FedCM/#the-idp-sign-in-status-api) to
  mitigate the issue.
* **Sign in to IdP API**: To support [various
  scenarios](https://github.com/fedidcg/FedCM/issues/348), when a user is not
  signed in to the IdP, the browser provides a UI for the user to sign in
  without leaving the RP.

Finally, there are things we believe still need to be done, based on feedback
from
[Mozilla](https://github.com/mozilla/standards-positions/issues/618#issuecomment-1221964677),
[Apple](https://lists.webkit.org/pipermail/webkit-dev/2022-March/032162.html)
and [TAG
reviewers](https://github.com/w3ctag/design-reviews/issues/718#issue-1165654549).
We are working to evaluate the best solutions for these open questions:

* **Improving user comprehension and matching intent**: As [Mozilla
  noted](https://github.com/mozilla/standards-positions/issues/618#issuecomment-1221964677),
  we’d like to continue exploring different UX formulations and surface areas,
  as well as triggering criteria.
* **Identity Attributes and Selective Disclosure**: As our [TAG Reviewers
  noted](https://github.com/w3ctag/design-reviews/issues/718#issuecomment-1171733526),
  we’d like to provide a mechanism to selectively share more or less identity
  attributes (such as emails, age brackets, phone numbers, and so on).
* **Raising the Privacy Properties**: As Mozilla suggested
  [here](https://github.com/mozilla/standards-positions/issues/618#issuecomment-1221964677),
  we’d like to continue exploring  mechanisms to offer better privacy
  guarantees, such as IdP blindness, directed identifiers.
* **Relationship with WebAuthn**: As suggested by
  [Apple](https://lists.webkit.org/pipermail/webkit-dev/2022-March/032162.html),
  we are super excited to see the progress on
  [passkeys](http://goo.gle/passkeys) and to work on providing a coherent and
  cohesive experience between FedCM, Passwords, WebAuthn and WebOTP.
* **Login Status**: As Apple suggested with the Privacy CG’s [Login Status
  API](https://github.com/privacycg/is-logged-in), we share the intuition that
  the user’s login status is a useful bit of information that can help browsers
  make informed decisions, and we are excited to see what opportunities arise
  from that.
* **Enterprises and Education**: As is clear at the FedID CG, there are still [a
  lot of use
  cases](https://github.com/fedidcg/use-case-library/blob/main/decision_tree_flows/login/Federated%20Login%20OIDC%20Oauth2%20Auth%20Code%20Flow.png)
  that are not well served by FedCM that we’d like to work on, such as  
  front-channel logout (the ability for an IdP to send a signal to RPs to
  logout) and support for SAML.
* **Relationship with mDLs/VCs/etc**: continue working to understand how these
  fit within FedCM, for example with the [Mobile Document Request
  API](https://github.com/WICG/mobile-document-request-api).

## Using the FedCM API {: #use-api }

You need a secure context (HTTPS or localhost) both on the IdP and RP in Chrome to use the FedCM.

To integrate with FedCM you need to create a well-known file, config file and endpoints for accounts list, assertion issuance and optionally client metadata. From there, FedCM exposes JavaScript APIs that RPs can use to sign in with the IdP.

To learn how to use the FedCM API check out the [FedCM developer guide](docs/privacy-sandbox/fedcm-developer-guide).

## Engage and share feedback {: #share-feedback}

*  **GitHub**: Read the
   [proposal](https://github.com/fedidcg/FedCM/blob/main/explainer.md), [raise
   issues and follow discussion](https://github.com/fedidcg/FedCM/issues).
*  **Developer support**: Ask questions and join discussions on the [Privacy
   Sandbox Developer Support
   repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
