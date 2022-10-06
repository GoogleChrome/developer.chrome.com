---
layout: 'layouts/doc-post.njk'
title: 'Federated Credential Management API'
subhead: >
  A web API for privacy-preserving identity federation.
description: >
  A web platform API that allows users to login to websites with their federated accounts in a manner compatible with improvements to browser privacy.
date: 2022-04-25
updated: 2022-09-12
authors:
  - agektmr
---

## Implementation status

This document outlines a new proposal for identity federation: the Federated
Credential Management API (FedCM).

*  The [FedCM proposal](https://github.com/fedidcg/FedCM) has entered [public
   discussion](https://github.com/fedidcg/FedCM/issues).
*  [FedCM's origin trial](/blog/fedcm-origin-trial) begins in Chrome 101 to 107
   on Android. Chrome on desktop support starts in Chrome 103. Other browsers
   don't support it yet.
*  [The Privacy Sandbox timeline](http://privacysandbox.com/timeline) provides
   implementation timings for FedCM and other Privacy Sandbox proposals.
*  [Chrome Platform Status](https://chromestatus.com/feature/6438627087220736)

## Why do we need FedCM?

Over the last decade, identity federation has played a central role in
raising the bar for authentication on the web, in terms of ease-of-use (such
as password-less single sign-in), security (such as improved resistance to
phishing and credential stuffing attacks) and trustworthiness compared to
per-site usernames and passwords.

With identity federation, a RP (relying party) relies on an IDP (identity
provider) to provide the user an account without requiring a new username
and password.


{% Aside 'key-term' %}
_Identity federation_ delegates authentication or authorization of an
individual (user or entity) to a trusted external party (an _identity
provider_ or IdP). The identity provider then allows the individual to
sign in to a website (a _relying party_ or RP). 
{% endAside %}

Unfortunately, the mechanisms that identity federation was designed on
(iframes, redirects and cookies) can also track users across the web. As the
user agent isn't able to differentiate between identity federation and
tracking, this makes it difficult to determine when these mechanisms are 
being used to support identity federation

The Federated Credential Management API (FedCM) provides a use case specific
abstraction for federated identity flows on the web. This purpose-built API
allows the browser to understand the context in which the RP and IdP
exchange information, inform the user as to the information and privilege
levels being shared and prevent unintended abuse.

### What do we expect will be affected?

{% Aside 'caution' %}
We aim to mitigate all tracking vectors on Chrome with the [Privacy
Sandbox initiative](https://privacysandbox.com/). Our first step is to 
reduce the impact of third-party cookie phase-out which is already happening 
on other browsers, and is [planned in Chrome for
2023](https://blog.google/products/chrome/updated-timeline-privacy-sandbox-milestones/).
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
  widgets](https://github.com/fedidcg/use-case-library/issues/12) (for example,
  [Facebook's personalized login
  button](https://developers.facebook.com/docs/facebook-login/web/login-button/))

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

FedCM requires support from an indentity provider. A relying party cannot use
FedCM independently. If you are a RP, you can ask your IdP to provide
instructions.

### You're affected by the third-party cookie phase out {: #unaffected-by-3p-cookies }

<figure class="float-right">
{%
   Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/GMv2zAgNt8dG62JnoSEC.png", alt="Simulate third-party cookie phase-out by configuring Chrome to block them", width="800", height="908"
%}
   <figcaption>Simulate third-party cookie phase-out by configuring Chrome to block them</figcaption>
</figure>

You should only use FedCM if your current integration is affected by the
third-party cookie phase out. If you're not affected, you should not use FedCM.

If you're unsure if your identity federation will continue to work after
Chrome's third-party cookie phase out, you can test the effect on a website
with your integration in [Incognito
mode](https://support.google.com/chrome/answer/95464). Alternatively, you
can block third-party cookies on desktop at `chrome://settings/cookies` or
on mobile by navigating to **Settings** > **Site settings** > **Cookies**.

If there is no discoverable impact on your identity federation without
third-party cookies, you can continue using your current integration without
FedCM.

If you aren't sure what to check for, read more about the [known
features](https://github.com/fedidcg/use-case-library/wiki/Primitives-by-Use-Case)
that the phase-out is expected to affect.

### Your RPs are third-party

If you're an identity provider whose RPs are within the [same
party](/blog/first-party-sets-sameparty/#first-party-sets-policy) as your IdP, we expect [First-Party Sets](/docs/privacy-sandbox/first-party-sets/)
may be a better option. First-Party Sets allow related domain names owned and operated by the same entity to declare themselves as belonging to the same first-party. This allows the same party’s third-party cookies to work, even after third-party cookie phase-out.

First-Party Sets can't always be used. However, if your RPs are
[SameParty](/blog/first-party-sets-sameparty/#first-party-sets-policy),
consider using First-Party Sets.

## How will users interact with FedCM? {: #use-cases}

In the first origin trial, FedCM's primary focus is to mitigate the impact
of third-party cookie phase-out. Users can enable or disable FedCM in
[Chrome's user sttings](#user-settings).

FedCM is designed to be protocol-agnostic and offers the following
authentication-related functionalities.

* [Use an identity provider to sign-in to a relying party](#sign-in)

[Check out our demo](https://fedcm-rp-demo.glitch.me) to see how it works.

In the future, we hope to support more features, including:

*  Automatic sign-in
*  Authorization prompt
*  Access and refresh tokens
*  Front-channel logout: sign-out from the relying party (RP) initiated by
   the identity provider (IdP)
*  OpenID Connect (OIDC) session management
*  Cross-origin iframes
*  Personalized buttons

### Sign in to a relying party {: #sign-in}

<figure class="float-right screenshot">
{% Video
   src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/Qx48SEGIEqi5OtPE9ogn.mp4",
   width="280", autoplay="true"
%}
  <figcaption>A user is signing to an RP using FedCM</figcaption>
</figure>

When the user lands on the relying party (RP) website, a FedCM sign-in dialog will appear if the user is signed in to the IdP. 

If the user hasn't signed in to the RP, a sign-up dialog appears with additional disclosure text such as the RP's terms of service (which is required) and a privacy policy (if provided).

The user can complete sign in by tapping **Continue as...**. If successful,
the user's account status and the sign-in status is stored in the browser.

{% Aside 'caution' %}

**There is a known issue**. If the user doesn't sign in with an IdP or if the
session has expired, the FedCM dialog won't be displayed. [Share
feedback](#share-feedback) if you need this to be fixed.

{% endAside %}

RPs are expected to support browsers which don't support FedCM. Users should
be able to use an existing, non-FedCM sign-in process. Learn more about [how
sign-in works in the FedCM origin trial](/blog/fedcm-origin-trial#sign-into-rp).

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

## How can IdPs support FedCM? {: #support-fedcm}

Read detailed instructions on how to implement and [participate in the
third-party origin trial](/blog/fedcm-origin-trial) for FedCM for support details.

## Engage and share feedback {: #share-feedback}

*  **Origin trial**: an [origin trial for
   FedCM](/origintrials/#/view_trial/3977804370874990593) is available in Chrome from version 101 to 107. Learn more about [the origin trial](/blog/fedcm-origin-trial).
*  **GitHub**: Read the
   [proposal](https://github.com/fedidcg/FedCM/blob/main/explorations/proposal.md),
   [raise issues and follow discussion](https://github.com/fedidcg/FedCM/issues).
*  **Developer support**: Ask questions and join discussions on the [Privacy
   Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## Find out more

*  Read more about API implementation in [Participate in an origin trial for
   FedCM](/blog/fedcm-origin-trial)
*  Read the [Federated Credential Management technical
   explainer](https://github.com/fedidcg/FedCM/)
*  Review FedCM's [Chrome Platform
   Status](https://chromestatus.com/feature/6438627087220736)
