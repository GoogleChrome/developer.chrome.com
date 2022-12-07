---
layout: 'layouts/doc-post.njk'
title: 'Federated Credential Management API'
subhead: >
  A web API for privacy-preserving identity federation.
description: >
  A web platform API that allows users to login to websites with their federated accounts in a manner compatible with improvements to browser privacy.
date: 2022-04-25
updated: 2022-11-28
authors:
  - agektmr
---

## Implementation status

This document outlines a new proposal for identity federation: the Federated
Credential Management API (FedCM).

*  The [FedCM proposal](https://github.com/fedidcg/FedCM) is open for [public
   discussion](https://github.com/fedidcg/FedCM/issues).
*  FedCM is shipped in Chrome 108.
*  FedCM isn't supported in other browsers yet, but Mozilla is [implementing a
   prototype](https://bugzilla.mozilla.org/show_bug.cgi?id=1782066) to Firefox,
   while the [Apple has expressed general
   support](https://lists.webkit.org/pipermail/webkit-dev/2022-March/032162.html)
   and interest in working together on the FedCM proposal.
*  [Chrome Platform Status](https://chromestatus.com/feature/6438627087220736)

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

<figure class="float-right">
{%
   Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/GMv2zAgNt8dG62JnoSEC.png", alt="Simulate third-party cookie phase-out by configuring Chrome to block them", width="800", height="908"
%}
   <figcaption>Simulate third-party cookie phase-out by configuring Chrome to block them</figcaption>
</figure>

You should only use FedCM if your current integration is affected by the
third-party cookie phase out.

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

## How can you develop FedCM?

You need a secure context (HTTPS or localhost) both on the IdP and RP in Chrome
to use the FedCM.

### Debug code on Chrome on Android {: #remote-debug-android}

Set up and run a server locally to debug your FedCM code. You can [access this
server in Chrome on an Android device connected using a USB cable with port
forwarding](/docs/devtools/remote-debugging/local-server/).

You can use DevTools on desktop to debug Chrome on Android by following the
instructions at [Remote debug Android
devices](/docs/devtools/remote-debugging/).

## Use the FedCM API {: #use-api }

You integrate with FedCM by creating [a well-known file](#well-known-file),
[config file and endpoints](#idp-config-file) for [accounts
list](#accounts-list-endpoint), [assertion issuance](#id-assertion-endpoint) and
optionally [client metadata](#client-metadata-endpoint).

From there, FedCM exposes JavaScript APIs that RPs can use to [sign
in](#sign-into-rp) with the IdP.

### Create a well-known file {: #well-known-file }

To prevent [trackers from abusing the
API](https://github.com/fedidcg/FedCM/issues/230), a well-known file must be
served from `/.well-known/web-identity` of
[eTLD+1](https://web.dev/same-site-same-origin/#same-site-cross-site) of the
IdP.

For example, if the IdP endpoints are served under
`https://accounts.idp.example/`, they must serve a well-known file at
`https://idp.example/.well-known/web-identity` as well as [an IdP config
file](#idp-config-file). Here's an example well-known file content:

```json
{
  "provider_urls": ["https://accounts.idp.example/config.json"]
}
```

The JSON file must contain the `provider_urls` property with an array of [IdP
config file](#idp-config-file) URLs that can be [specified as a path part of
`configURL` in `navigator.credentials.get` by RPs](#sign-into-rp). The number of
URL strings in the array is limited to one, but this may change with [your
feedback](#next-steps) in the future.

### Create an IdP config file and endpoints {: #idp-config-file }

The IdP config file provides a list of required endpoints for the browser. IdPs
will host this config file and the required endpoints. All JSON response must be
served with `application/json` content type.

The config file's URL is determined by the values provided to the
[`navigator.credentials.get` call executed on an RP](#sign-into-rp).

```javascript
const credential = await navigator.credentials.get({
  identity: {
    providers: [{
      configURL: 'https://accounts.idp.example/config.json',
      clientId: '********',
      nonce: '******'
    }]
  }
});
const { token } = credential;
```

Specify a full URL of the IdP config file location as a `configURL`. When
[`navigator.credentials.get()` is called](#sign-into-rp) on the RP, the browser
fetches the config file with a `GET` request without the `Referer` header. The
request doesn't have cookies and doesn't follow redirects. This effectively
prevents the IdP from learning who made the request and which RP is attempting
to connect. For example:

```http
GET /config.json HTTP/1.1
Host: accounts.idp.example
Accept: application/json
Sec-Fetch-Dest: webidentity
```

{% Aside 'caution' %}

All requests sent from the browser via FedCM include a `Sec-Fetch-Dest:
webidentity` header to prevent [CSRF
attacks](https://portswigger.net/web-security/csrf). All IdP endpoints must
confirm this header is included.

{% endAside %}

The browser expects a JSON response from the IdP which includes the
following properties:

<table class="with-heading-tint with-borders">
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td><code>accounts_endpoint</code> (required)</td>
    <td>URL for the <a href="#accounts-list-endpoint">accounts list endpoint</a>.</td>
  </tr>
  <tr>
     <td><code>client_metadata_endpoint</code> (optional)</td>
     <td>URL for the <a href="#client-metadata-endpoint">client metadata endpoint</a>.</td>
  </tr>
  <tr>
     <td><code>id_assertion_endpoint</code> (required)</td>
     <td>URL for the <a href="#id-assertion-endpoint">ID assertion endpoint</a>.</td>
  </tr>
  <tr>
     <td><code>branding</code> (optional)</td>
     <td>Object which contains various branding options.</td>
  </tr>
  <tr>
     <td><code>branding.background_color</code> (optional)</td>
     <td>Branding option which sets the background color of the "Continue as..." button. Use the relevant CSS syntax, namely
<a href="https://drafts.csswg.org/css-color-4/#typedef-hex-color"><code>hex-color</code></a>,
<a href="https://drafts.csswg.org/css-color-5/#funcdef-hsl"><code>hsl()</code></a>,
<a href="https://drafts.csswg.org/css-color-5/#funcdef-rgb"><code>rgb()</code></a>, or
<a href="https://drafts.csswg.org/css-color-4/#typedef-named-color"><code>named-color</code></a>.</td>
  </tr>
  <tr>
     <td><code>branding.color</code> (optional)</td>
     <td>Branding option which sets the text color of the "Continue as..." button. Use the relevant CSS syntax, namely
<a href="https://drafts.csswg.org/css-color-4/#typedef-hex-color"><code>hex-color</code></a>,
<a href="https://drafts.csswg.org/css-color-5/#funcdef-hsl"><code>hsl()</code></a>,
<a href="https://drafts.csswg.org/css-color-5/#funcdef-rgb"><code>rgb()</code></a>, or
<a href="https://drafts.csswg.org/css-color-4/#typedef-named-color"><code>named-color</code></a>.</td>
  </tr>
  <tr>
     <td><code>branding.icons</code> (optional)</td>
     <td>Branding option which sets the icon object, displayed in the sign-in dialog. The icon object is an array with two parameters:
        <ul>
           <li><code>url</code> (required): URL of the icon image. This does not support SVG images.<li>
           <li><code>size</code> (optional): icon dimensions, assumed by the application to be square and single resolution. This number must be greater than or equal to 25.</li>
         </ul>
      </td>
  </tr>
</table>

{% Img
   src="image/VbsHyyQopiec0718rMq2kTE1hke2/rFrfrCL0awt5zmyqvaM9.jpg", alt="How branding is applied to the FedCM dialog", width="600", height="332", class="screenshot"
%}

Here's an example response body from the IdP:

```json
{
  "accounts_endpoint": "/accounts.php",
  "client_metadata_endpoint": "/client_metadata.php",
  "id_assertion_endpoint": "/assertion.php",
  "branding": {
    "background_color": "green",
    "color": "0xFFEEAA",
    "icons": [{
      "url": "https://idp.example/icon.ico",
      "size": 25
    }]
  }
}
```

Once the browser fetches the config file, it sends subsequent requests to the
IdP endpoints:

{%
  Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/3tkfSwwLSUnVrbesKX2K.png", alt="IdP endpoints", width="800", height="1085", class="type--full-bleed"
%}

{% Aside 'caution' %}

If the RP deploys [Content Security Policy
(CSP)](https://developer.mozilla.org/docs/Web/HTTP/CSP) on the page FedCM is
called and enforce `connect-src` directive, they must explicitly allow endpoints
described in the config file.

{% endAside %}

#### Accounts list endpoint {: #accounts-list-endpoint }

The IdP's accounts list endpoint returns a list of accounts that the user is
currently signed in on the IdP. If the IdP supports multiple accounts, this
endpoint will return all signed in accounts.

The browser sends a `GET` request with cookies, but without a `client_id`
parameter or the `Referer` header. This effectively prevents the IdP from
learning which RP the user is trying to sign in to. For example:

```http
GET /accounts.php HTTP/1.1
Host: accounts.idp.example
Accept: application/json
Cookie: 0x23223
Sec-Fetch-Dest: webidentity
```

The browser expects a JSON response that includes an `accounts` property
with an array of account information with following properties:

<table class="with-heading-tint with-borders">
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td><code>id</code> (required)</td>
    <td>Unique ID of the user.</td>
  </tr>
  <tr>
    <td><code>name</code> (required)</td>
    <td>Given and family name of the user.</td>
  </tr>
  <tr>
    <td><code>email</code> (required)</td>
    <td>Email address of the user.</td>
  </tr>
  <tr>
    <td><code>given_name</code> (optional)</td>
    <td>Given name of the user.</td>
  </tr>
  <tr>
    <td><code>picture</code> (optional)</td>
    <td>URL of the user avatar image.</td>
  </tr>
  <tr>
    <td><code>approved_clients</code> (optional)</td>
    <td>An array of RP client IDs which the user has registered with.</td>
  </tr>
</table>

Example response body:

```json
{
 "accounts": [{
   "id": "1234",
   "given_name": "John",
   "name": "John Doe",
   "email": "john_doe@idp.example",
   "picture": "https://idp.example/profile/123",
   "approved_clients": ["123", "456", "789"],
  }, {
   "id": "5678",
   "given_name": "Johnny",
   "name": "Johnny",
   "email": "johnny@idp.example",
   "picture": "https://idp.example/profile/456"
   "approved_clients": ["abc", "def", "ghi"],
  }]
}
```

If the user is not signed in, respond with HTTP 401 (Unauthorized).

The returned accounts list is consumed by the browser and will not be
available to the RP.

#### Client metadata endpoint {: #client-metadata-endpoint }

The IdP's client metadata endpoint returns the relying party's metadata such as
the RP's privacy policy and terms of service. RPs should provide links to their
privacy policy and terms of service to the IdP in advance. These links are
displayed in the sign-in dialog when the user hasn't registered on the RP with
the IdP yet.

The browser sends a `GET` request using the `client_id`
[`navigator.credentials.get`](#sign-into-rp) without cookies. For example:

```http
GET /client_metadata.php?client_id=1234 HTTP/1.1
Host: accounts.idp.example
Referer: https://rp.example/
Accept: application/json
Sec-Fetch-Dest: webidentity
```

The properties for the client metadata endpoint include:

<table class="with-heading-tint with-borders">
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td><code>privacy_policy_url</code> (optional)</td>
    <td>RP privacy policy URL.</td>
  </tr>
  <tr>
     <td><code>terms_of_service_url</code> (optional)</td>
     <td>RP terms of service URL.</td>
  </tr>
</table>

The browser expects a JSON response from the endpoint:

```json
{
  "privacy_policy_url": "https://rp.example/privacy_policy.html",
  "terms_of_service_url": "https://rp.example/terms_of_service.html",
}
```

The returned client metadata is consumed by the browser and will not be
available to the RP.

#### ID assertion endpoint {: #id-assertion-endpoint }

The IdP's ID assertion endpoint returns an assertion for their signed-in user.
When the user signs in to an RP website using [`navigator.credentials.get()`
call](#sign-into-rp), the browser sends a `POST` request with cookies and a
content type of `application/x-www-form-urlencoded` to this endpoint with the
following information:

<table class="with-heading-tint with-borders">
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td><code>client_id</code> (required)</td>
    <td>The RP's client identifier.</td>
  </tr>
  <tr>
     <td><code>account_id</code> (required)</td>
     <td>The unique ID of the signing in user.</td>
  </tr>
  <tr>
     <td><code>nonce</code> (optional)</td>
     <td>The request nonce, provided by the RP.</td>
  </tr>
  <tr>
     <td><code>disclosure_text_shown</code></td>
     <td>Results in a string of <code>"true"</code> or <code>"false"</code> (rather than a boolean). The result is <code>"false"</code> if the disclosure text was not shown. This happens when the RP's client ID was included in the <code>approved_clients</code> property list of the response from the <a href="#accounts-list-endpoint">accounts list endpoint</a> or if the browser has observed a sign-up moment in the past in the absence of <code>approved_clients</code>.</td>
  </tr>
</table>

Example HTTP header:

```http
POST /assertion.php HTTP/1.1
Host: accounts.idp.example
Referer: https://rp.example/
Content-Type: application/x-www-form-urlencoded
Cookie: 0x23223
Sec-Fetch-Dest: webidentity
account_id=123&client_id=client1234&nonce=Ct60bD&disclosure_text_shown=true
```

On the server, the IdP should confirm that:

1. The claimed account ID matches the ID for the account that is already
   signed in. 
2. The `Referer` header matches the origin the RP, registered in advance
   for the given client ID.

{% Aside 'warning' %}

Since the domain verification on OAuth or OpenID Connect relies on a browser
redirect, it's critical in FedCM that the IdP server checks a `Referer` header value
matches the RP's registered origin.

{% endAside %}

The browser expects a JSON response that includes the following property:

<table class="with-heading-tint with-borders">
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td><code>token</code> (required)</td>
    <td>A token is a string that contains claims about the authentication.</td>
  </tr>
</table>

```json
{
  "token": "***********"
}
```

The returned token is passed to the RP by the browser, so that the RP can
validate the authentication.

### Sign in to the relying party with the identity provider {: #sign-into-rp }

Once the IdP's configuration and endpoints are available, RPs can call
`navigator.credentials.get()` to request allowing users to sign in to the RP
with the IdP.

<a name="feature-detection"></a>

Before calling the API, you need to confirm that [FedCM is available on the
user's browser]. To check if FedCM is available, wrap this code around your
FedCM implementation:

```javascript
if ('IdentityCredential' in window) {
  // If the feature is available, take action
}
```

To request allowing users to sign in to the IdP from the RP, do the following,
for example:

```javascript
const credential = await navigator.credentials.get({
  identity: {
    providers: [{
      configURL: 'https://accounts.idp.example/config.json',
      clientId: '********',
      nonce: '******'
    }]
  }
});
const { token } = credential;
```

The `providers` property takes an array of [`IdentityProvider`
objects](https://fedidcg.github.io/FedCM/#dictdef-identityprovider) that have
the following properties:

<table class="with-heading-tint with-borders">
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td><code>configURL</code> (required)</td>
    <td>A full path of the IdP config file.</td>
  </tr>
  <tr>
     <td><code>clientId</code> (required)</td>
     <td>The RP's client identifier, issued by the IdP.</td>
  </tr>
  <tr>
    <td><code>nonce</code> (optional)</td>
    <td>A random string to ensure the response is issued for this specific request. Prevents replay attacks.</td>
  </tr>
</table>

The browser handles sign-up and sign-in use cases differently depending on the
existence of `approved_clients` in the response from [the accounts list
endpoint](#accounts-list-endpoint). The browser will not display a disclosure
text **"To continue with ...."** if the user has already signed up to the RP.

The sign-up state is determined based on whether the following conditions are
fulfilled or not:

* If `approved_clients` includes the RP's `clientId`.
* If the browser remembers that the user has already signed up to the RP.

<figure class="float-right screenshot" style="max-width:300px">
{% Video
   src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/Qx48SEGIEqi5OtPE9ogn.mp4",
   width="280", autoplay="true", loop="true"
%}
  <figcaption>A user signs into an RP using FedCM</figcaption>
</figure>

When the RP calls `navigator.credentials.get()`, the following activities take
place:

1. The browser sends requests and fetches several documents:
    1. [The well-known file](#well-known-file) and [an IdP config
       file](#idp-config-file) which declare endpoints.
    2. [An accounts list](#accounts-list-endpoint).
    3. Optional: URLs for the RP's privacy policy and terms of service,
       retrieved from the [client metadata endpoint](#client-metadata-endpoint).
2. The browser displays the list of accounts that the user can use to sign-in,
   as well as the terms of service and privacy policy if available.
3. Once the user chooses an account to sign in with, a request to [the ID
   assertion endpoint](#id-assertion-endpoint) is sent to the IdP to retrieve a
   token.
4. The RP can validate the token to authenticate the user.

{%
  Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/3tkfSwwLSUnVrbesKX2K.png", alt="login API call", width="800", height="1085", class="type--full-bleed"
%}

{% Aside 'caution' %}

FedCM is designed to not inform the RP of the user's IdP sign-in state until the
user explicitly confirms to **Continue as** and signs in. This means RPs aren't
informed of connection to the FedCM API if: the user isn't signed into the IdP,
the accounts list endpoint returns an empty list, or the endpoint returns an
error.

RPs are expected to support browsers which don't support FedCM, therefore
users should be able to use an existing, non-FedCM sign-in process. Until
third-party cookies are phased out completely, this should remain
non-problematic.

{% endAside %}

Once the token is validated by the RP server, the RP may register the user or
let them sign-in and start a new session.

## Engage and share feedback {: #share-feedback}

*  **GitHub**: Read the
   [proposal](https://github.com/fedidcg/FedCM/blob/main/explainer.md), [raise
   issues and follow discussion](https://github.com/fedidcg/FedCM/issues).
*  **Developer support**: Ask questions and join discussions on the [Privacy
   Sandbox Developer Support
   repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
