---
layout: 'layouts/blog-post.njk'
title: Participate in a Federated Credential Management API origin trial for IdPs
authors:
  - agektmr
description: >
  A Web Platform API that allows users to login to websites with their federated accounts in a privacy preserving manner.
date: 2022-04-25
updated: 2022-08-10
tags:
  - privacy
  - security
  - origin-trials
  - identity
---

{% Aside %}

**Update, August 2022**

* Added an important security information. The identity provider (IdP) needs to check if the
  `Referer` header matches the origin the RP registered in advance on [the ID
  token endpoint](#id-token-endpoint).

Starting from Chrome 105:
* The top-level manifest is renamed from `/.well-known/fedcm.json` to
  `/.well-known/web-identity` and the URL specified in `provider_urls` should
  be full manifest URLs rather than paths.
* APIs `login()`, `logout()` and `revoke()` on `FederatedCredential` instance
  are no longer available.
* Use `IdentityCredential` instead of `FederatedCredential`.
* Move login functionality to `navigator.credentials.get()`.
* Revocation endpoint in the manifest is no longer in effect.
* Use `identity` type instead of `federated` type for
  `navigator.credentials.get()` call.
* `url` is now `configURL` and must be a full URL of the manifest JSON file
  instead of a path for `navigator.credentials.get()` call.
* `nonce` is now an optional parameter for `navigator.credentials.get()` call.
* `hint` is no longer available as an option for `navigator.credentials.get()`
  call.

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

**Update, June 2022**

Starting Chrome 104:
* `consent_acquired` parameter sent to the ID token endpoint is now
  `disclosure_text_shown`. The value is unchanged.
* branding icons stop supporting SVG images.

**Update, May 2022**

Starting Chrome 103, FedCM:
* Supports desktop environments.
* Supports per RP settings on desktop.
* The [client metadata endpoint](#client-metadata-endpoint) is
   now optional.
   *  In this endpoint, the privacy policy URL is also optional.
* No longer supports SVG images as an icon in [the IdP manifest](#manifest-endpoints).

Also added a caveat about using CSP `connect-src`.

{% endAside %}

Over the last decade, identity federation has played a central role in
raising the bar for authentication on the web, in terms of ease-of-use (such
as password-less single sign-in), security (such as improved resistance to
phishing and credential stuffing attacks) and trustworthiness compared to
per-site usernames and passwords. With identity federation, a RP (relying
party) relies on an IDP (identity provider) to provide the user an account
without requiring a new username and password.

{% Aside 'key-term' %}

_Identity federation_ delegates authentication or authorization of an
individual (user or entity) to a trusted external party (an _identity
provider_ or IdP). The identity provider then allows the individual to sign in
to a website (a _relying party_ or RP). 

{% endAside %}

Unfortunately, the mechanisms that identity federation was designed on
(iframes, redirects and cookies) can also track users across the web. As the
user agent can't differentiate between identity federation and tracking,
this makes it difficult to determine when these mechanisms are being used to
support identity federation.

The Federated Credential Management API (FedCM) provides a use case specific
abstraction for federated identity flows on the web. This purpose-built API
allows the browser to understand the context in which the RP and IdP
exchange information, inform the user as to the information and privilege
levels being shared and prevent unintended abuse.

This proposal is now available to test in [the FedCM origin
trial](/origintrials/#/view_trial/3977804370874990593). To learn about
high-level FedCM user journeys, read [Federated Credential
Management API](/docs/privacy-sandbox/fedcm).

## Support and compatibility {: #compatibility }
  
FedCM is supported in:
*  **Android**: Google Chrome 101 and above
*  **Desktop**: Google Chrome 103 and above

FedCM isn't supported by other browsers yet, but the [WebKit team has
expressed general
support](https://lists.webkit.org/pipermail/webkit-dev/2022-March/032162.html)
and interest in working together on the FedCM proposal.

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
FedCM independently. If you are a RP, you can ask your IdP to provide
instructions.

### You're affected by the third-party cookie phase out {: #affected-by-3p-cookies }

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

### Your RPs are third-parties {: #first-party-sets}

If you're an identity provider whose RPs are within the [same
party](/blog/first-party-sets-sameparty/#first-party-sets-policy) as your IdP, we expect [First-Party Sets](/docs/privacy-sandbox/first-party-sets/)
may be a better option. First-Party Sets allow related domain names owned and operated by the same entity to declare themselves as belonging to the same first-party. This allows the same party’s third-party cookies to work, even after third-party cookie phase-out.

First-Party Sets can't always be used. However, if your RPs are
[SameParty](/blog/first-party-sets-sameparty/#first-party-sets-policy),
consider using First-Party Sets.

## How can identity providers test FedCM?

You need a secure context (HTTPS or localhost) on Chrome to use the Federated
Credential Management API. FedCM is currently disabled by default on Chrome.
Start with:

1. Local development and tests by flipping a flag at
   [`chrome://flags`](#set-flag).
2. Once you're ready to test in production, you can [sign up for the
   FedCM origin trial](#origin-trial).

### Develop and test locally with a flag {: #set-flag}

Set a [browser flag](/blog/browser-flags/) to develop locally, here is
how:

1.  Open Google Chrome. In the address bar, enter `chrome://version`. Confirm
    the browser version is 101 or higher.
2.  Go to `chrome://flags#fedcm` to enable FedCM.
3.  Restart your browser.

### Detect whether FedCM is available {: #feature-detection}

Once the flag is turned on, you can try the FedCM API.

{% Aside %}
FedCM on `localhost` doesn't require a secure context (HTTPS).
{% endAside %}

First, you need to confirm that FedCM is available before actually using it.
To check if FedCM is available, wrap this code around your FedCM
implementation:

```javascript
if ('IdentityCredential' in window) {
  // If the feature is available, take action
}
```

### Debug code on Chrome on Android {: #remote-debug-android}

Set up and run a server locally to debug your FedCM code. You can [access this
server in Chrome on an Android device connected using a USB cable with port
forwarding](/docs/devtools/remote-debugging/local-server/).

You can use DevTools on desktop to debug Chrome on Android by following the
instructions at [Remote debug Android
devices](/docs/devtools/remote-debugging/).

## Use the FedCM API {: #use-api }

You integrate with FedCM by creating a [manifest and
endpoints](#manifest-endpoints) for [client
metadata](#client-metadata-endpoint), [accounts list](#accounts-list-endpoint),
and [token issuance](#id-token-endpoint).

From there, FedCM exposes JavaScript APIs that RPs can use to [sign
in](#sign-into-rp) from the IdP.

### Create an IdP manifest and endpoints {: #manifest-endpoints }

The IdP manifest provides a list of required endpoints for the browser. IdPs
will host this manifest and the required endpoints.

The manifest file's URL is determined by the values provided to the
[`navigator.credentials.get` call executed on an RP](#sign-into-rp).

```javascript
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

Specify a full URL of the IdP manifest file location as a `configURL`. When
[`navigator.credentials.get()` is called](#sign-into-rp) on the RP, the browser
fetches the manifest file with a `GET` request without the `Referer` header. The
request doesn’t have cookies and doesn’t follow redirects. This effectively
prevents the IdP from learning who made the request and which RP is attempting
to connect. For example:

```http
GET /anything.json HTTP/1.1
Host: idp.example
Accept: application/json
Sec-FedCM-CSRF: ?1
```

{% Aside 'caution' %}

All requests sent from the browser via FedCM include a `Sec-FedCM-CSRF`
header to prevent [CSRF attacks](https://portswigger.net/web-security/csrf).
All IdP endpoints must confirm this header exists with  `Sec-FedCM-CSRF: ?1`.
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
     <td><code>id_token_endpoint</code> (required)</td>
     <td>URL for the <a href="#id-token-endpoint">ID token endpoint</a>.</td>
  </tr>
  <tr>
     <td><code>branding</code> (optional)</td>
     <td>Object which contains various branding options.</td>
  </tr>
  <tr>
     <td><code>branding.background_color</code> (optional)</td>
     <td>Background color of the "Continue as..." button. Use the relevant CSS syntax, namely
<a href="https://drafts.csswg.org/css-color-4/#typedef-hex-color"><code>hex-color</code></a>,
<a href="https://drafts.csswg.org/css-color-5/#funcdef-hsl"><code>hsl()</code></a>,
<a href="https://drafts.csswg.org/css-color-5/#funcdef-rgb"><code>rgb()</code></a>, or
<a href="https://drafts.csswg.org/css-color-4/#typedef-named-color"><code>named-color</code></a>.</td>
  </tr>
  <tr>
     <td><code>branding.color</code> (optional)</td>
     <td>Branding option which sets the background color of the "Continue as..." button. Use the relevant CSS syntax, namely
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
           <li><code>size</code> (optional): icon dimensions, assumed by the application to be square and single resolution. This number must be greater or equal to 25.</li>
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
  "client_metadata_endpoint": "/metadata.php",
  "id_token_endpoint": "/idtokens.php",
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

Once the browser fetches the manifest, it sends subsequent requests to the IdP endpoints:

{%
  Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/bAAYmwYIG1OSteRQ2Tzu.png", alt="IdP endpoints", width="800", height="419", class="type--full-bleed"
%}

{% Aside 'caution' %}

If the RP deploys [Content Security Policy
(CSP)](https://developer.mozilla.org/docs/Web/HTTP/CSP) on the page FedCM is
called and enforce `connect-src` directive, they must explicitly allow endpoints
and icon image URLs described in the manifest.

{% endAside %}

#### Top level domain manifest {: #top-level-domain-manifest }

To prevent [trackers from abusing the
API](https://github.com/fedidcg/FedCM/issues/230), an additional manifest
file must be served from `/.well-known/web-identity` of
[eTLD+1](https://web.dev/same-site-same-origin/#same-site-cross-site) of the
IdP.

For example, if an IdP serves [an IdP Manifest](#manifest-endpoints) at
`https://accounts.idp.example/sub/anything.json`, they must also serve a
top-level domain manifest at `https://idp.example/.well-known/web-identity`
with the following content:

```json
{
  "provider_urls": ["https://accounts.idp.example/sub/anything.json"]
}
```

The JSON file must contain the `provider_urls` property with an array of URL
strings that can be [specified as a path part of `configURL` in
`navigator.credentials.get` by RPs](#sign-into-rp). The number of URL strings
in the array is limited to one, but this may change with [your
feedback](#next-steps) in the future.

#### Client metadata endpoint {: #client-metadata-endpoint }

The IdP's client metadata endpoint returns the relying party’s metadata such as
the RP's privacy policy and terms of service. RPs should provide links to their
privacy policy and terms of service to the IdP in advance. These links are
displayed in the sign-in dialog when the user hasn't registered with the RP yet.

The browser sends a `GET` request using the `client_id`
[`navigator.credentials.get`](#sign-into-rp) without cookies. For example:

```http
GET /metadata.php?client_id=1234 HTTP/1.1
Host: idp.example
Referer: https://rp.example/
Accept: application/json
Sec-FedCM-CSRF: ?1
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

#### Accounts list endpoint {: #accounts-list-endpoint }

The IdP's accounts list endpoint returns a list of accounts that the user is
currently signed in on the IdP. If the IdP supports multiple accounts, this
endpoint will return all signed in accounts.

The browser sends a `GET` request with cookies, but without a `client_id`
parameter and the `Referer` header. This effectively prevents the IdP from
learning which RP the user is trying to sign in to. For example:

```http
GET /accounts.php HTTP/1.1
Host: idp.example
Accept: application/json
Cookie: 0x23223
Sec-FedCM-CSRF: ?1
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
    <td>Email address of the user</td>
  </tr>
  <tr>
    <td><code>given_name</code> (optional)</td>
    <td>Given name of the user.</td>
  </tr>
  <tr>
    <td><code>picture</code> (optional)</td>
    <td>URL of the user avatar image</td>
  </tr>
  <tr>
    <td><code>approved_clients</code> (optional)</td>
    <td>An array of RP client IDs which the user has registered with</td>
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

#### ID token endpoint {: #id-token-endpoint }

The IdP's ID token endpoint returns a token for their signed-in user. When the
user signs in to an RP website using [`navigator.credentials.get()`
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
     <td>Results in a string of <code>true</code> or <code>false</code> (rather than a boolean). The result is <code>false</code> if the RP's client ID was included in the <code>approved_clients</code> property list and the sign-in dialog displayed both the privacy policy and the terms of service.</td>
  </tr>
</table>

Example HTTP header:

```http
POST /idtokens.php HTTP/1.1
Host: idp.example
Referer: https://rp.example/
Content-Type: application/x-www-form-urlencoded
Cookie: 0x23223
Sec-FedCM-CSRF: ?1
account_id=123&client_id=client1234&nonce=Ct60bD&disclosure_text_shown=true
```

On the server, the IdP should confirm that:

1. The claimed account ID matches the ID for the account that is already
   signed in. 
2. The `Referer` header matches the origin the RP, registered in advance
   for the given client ID.

{% Aside 'caution' %}

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
  "token": "eyJ********"
}
```

The returned token is passed to the RP by the browser, so that the RP can
validate the authentication.

### Sign in to the identity provider from the relying party {: #sign-into-rp }

Once the IdP’s configuration and endpoints are available, RPs can call
`navigator.credentials.get()` to request allowing users to sign in to the IdP
from the RP.

For example:

```javascript
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

The `providers` property takes an array of [`IdentityProvider`
objects](https://fedidcg.github.io/FedCM/#dictdef-identityprovider) that must
have the following properties:

<table class="with-heading-tint with-borders">
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td><code>configURL</code> (required)</td>
    <td>A full path of the IdP manifest file.</td>
  </tr>
  <tr>
     <td><code>clientId</code> (required)</td>
     <td>The RP's client identifier, issued by the IdP.</td>
  </tr>
  <tr>
    <td><code>nonce</code> (optional)</td>
    <td>A random string to ensure the response is issued for this specific request. Prevents replay attacks.</td>
  </tr>
  <tr>
     <td><code>signal</code> (optional)</td>
     <td>An <a href="https://developer.mozilla.org/docs/Web/API/AbortSignal"><code>AbortSignal</code></a> for the RP to terminate the request arbitrarily.</td>
  </tr>
</table>

The browser handles sign-up and sign-in use cases differently depending on the
existence of `approved_clients` in the response from [the accounts list
endpoint](#accounts-list-endpoint). The browser will only display [the RP's
privacy policy and terms of service](#client-metadata-endpoint) in the dialog if
`approved_clients` isn't provided or does not include the RP's `clientId` and
the user hasn't previously signed p for the RP in this browser.

<figure class="float-right screenshot" style="max-width:300px">
{% Video
   src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/Qx48SEGIEqi5OtPE9ogn.mp4",
   width="280", autoplay="true"
%}
  <figcaption>A user signs into an RP using FedCM</figcaption>
</figure>

When the RP calls `navigator.credentials.get()`, the following activities take
place:

1. The browser sends requests and fetches several documents:
    1. [An IdP manifest](#manifest-endpoints) which stores declared endpoints.
    2. URLs for the RP's privacy policy and terms of service, retrieved from the
       [client metadata endpoint](#client-metadata-endpoint).
    3. [An accounts list](#accounts-list-endpoint).
2. The browser displays the list of accounts that the user can use to sign-in,
   as well as the terms of service and privacy policy.
3. Once the user chooses an account to sign in with, a request to [the ID token
   endpoint](#id-token-endpoint) is sent to the IdP to retrieve a token.
4. The RP can validate the token to authenticate the user.

{%
  Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/bAAYmwYIG1OSteRQ2Tzu.png",
alt="login API call", width="800", height="419", class="type--full-bleed"
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

## Test in production with the origin trial {: #origin-trial}

Once you are satisfied with the API locally, the FedCM [origin
trial](/blog/origin-trials/) allows you to test and work with experimental
features in production environments, with end users. You can activate FedCM
without flags on a specified origin by participating in the FedCM origin
trial.

### Participate in a third-party OT to use FedCM on RPs {: #third-party-origin-trial}

If your RPs are loading a JavaScript file or an SDK served from your IdP
domain to orchestrate an identity federation, [third-party origin
trials](/blog/third-party-origin-trials/) offer you a scalable solution.

<figure>
{%
  Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/zlNizQdTJ04EAkaAc7ZA.png", alt="Check 'Third-party matching. The token will be injected by script on other origins.' checkbox.", width="800", height="616", class="screenshot"
%}
  <figcaption>Check <strong>Third-party matching. The token will be injected by script on other origins.</strong> checkbox.</figcaption>
</figure>

To register for the third-party origin trial and activate FedCM on RPs:

1.  Go to the [FedCM origin trial registration
    page](/origintrials/#/view_trial/3977804370874990593).
1.  Click the **Register** button and fill out the form to request a token
1.  Enter the IdP's origin as **Web Origin**.
1.  Check **Third-party matching**  to inject the token with JavaScript on other origins.
1.  Click **Submit**.
1.  Embed the issued token on the RP.

To embed the token to the RP, add the following code to your JavaScript
library or SDK served from the registered IdP's origin.

```javascript
const tokenElement = document.createElement('meta');
tokenElement.httpEquiv = 'origin-trial';
tokenElement.content = 'TOKEN_GOES_HERE';
document.head.appendChild(tokenElement);
```

Replace `TOKEN_GOES_HERE` with your own token.

The origin trial meta tag must be added before you add [feature
detection](#feature-detection). Otherwise, the feature won't be available.

{% Aside %}
If FedCM is executed directly by an RP without loading an IdP's scripts, the
RP must register their origin for the origin trial separately.
{% endAside %}

## Next steps

*  [Send us feedback and follow
   discussion](https://github.com/fedidcg/FedCM/issues) for the FedCM proposal.

## Find out more

*  Learn more about [FedCM](/docs/privacy-sandbox/fedcm).
*  Read the [Federated Credential Management technical
   explainer](https://github.com/fedidcg/FedCM/).
*  Review FedCM's [Chrome Platform
   Status](https://chromestatus.com/feature/6438627087220736).
