---
layout: 'layouts/doc-post.njk'
title: 'Federated Credential Management API: developer guide'
subhead: >
  Learn how to use FedCM for for privacy-preserving identity federation.
date: 2022-04-25
updated: 2023-07-10
authors:
  - agektmr
---

[FedCM (Federated Credential Management)](docs/privacy-sandbox/fedcm) is a proposal for a privacy-preserving
approach to federated identity services (such as "Sign in with...")  where
users can log into sites without sharing their personal information with the
identity service or the site.

To learn more about FedCM use cases, user flows, and API roadmap check out [the introduction to FedCM API](docs/privacy-sandbox/fedcm).

## FedCM development environment

You need a secure context (HTTPS or localhost) both on the IdP and RP in Chrome
to use the FedCM.

### Debug code on Chrome on Android {: #remote-debug-android}

Set up and run a server locally to debug your FedCM code. You can [access this
server in Chrome on an Android device connected using a USB cable with port
forwarding](/docs/devtools/remote-debugging/local-server/).

You can use DevTools on desktop to debug Chrome on Android by following the
instructions at [Remote debug Android
devices](/docs/devtools/remote-debugging/).

### Block third-party cookies on Chrome {: #block-third-party-cookies}

<figure class="float-right">
{%
   Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/GMv2zAgNt8dG62JnoSEC.png", alt="Simulate third-party cookie phase-out by configuring Chrome to block them", width="800", height="908"
%}
   <figcaption>Simulate third-party cookie phase-out by configuring Chrome to block them</figcaption>
</figure>

You can test how FedCM works without third-party cookies on Chrome before it's
actually enforced.

To block third-party cookies, use [Incognito
mode](https://support.google.com/chrome/answer/95464), or choose "Block
third-party cookies" in your desktop settings at `chrome://settings/cookies` or on
mobile by navigating to **Settings** > **Site settings** > **Cookies**.

{% Aside 'caution' %}

FedCM is temperarily disabled when third-party cookies are blocked. Starting
from Chrome 110, you can force enable it with the Chrome flag:
`chrome://flags/#fedcm-without-third-party-cookies`.

{% endAside %}

## Using the FedCM API {: #use-api }

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
fetches the config file with a `GET` request without the `Origin` header or the
`Referer` header. The request doesn't have cookies and doesn't follow redirects.
This effectively prevents the IdP from learning who made the request and which
RP is attempting to connect. For example:

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
    "color": "#FFEEAA",
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
parameter, the `Origin` header or the `Referer` header. This effectively
prevents the IdP from learning which RP the user is trying to sign in to. For
example:

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
Origin: https://rp.example/
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
Origin: https://rp.example/
Content-Type: application/x-www-form-urlencoded
Cookie: 0x23223
Sec-Fetch-Dest: webidentity
account_id=123&client_id=client1234&nonce=Ct60bD&disclosure_text_shown=true
```

On the server, the IdP should confirm that:

1. The claimed account ID matches the ID for the account that is already
   signed in. 
2. The `Origin` header matches the origin the RP, registered in advance for the
   given client ID.

{% Aside 'warning' %}

Since the domain verification on OAuth or OpenID Connect relies on a browser
redirect, it's critical in FedCM that the IdP server checks an `Origin` header
value matches the RP's registered origin.

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

### Auto-reauthenticate users after the initial consent {: #auto-reauthn }

[FedCM auto-reauthentication](https://github.com/fedidcg/FedCM/issues/429) 
("auto-reauthn" in short) can let users reauthenticate automatically, when they 
come back after their initial authentication using FedCM. "The initial 
authentication" here means the user creates an account or signs into the RP's 
website by tapping on the **"Continue as..."** button on FedCM's sign-in dialog 
for the first time on the same browser instance.

While the explicit user experience makes sense before the user has created the 
federated account to prevent tracking (which is one of the main goals of FedCM), 
it is unnecessarily cumbersome after the user has gone through it once: after 
the user grants permission to allow communication between the RP and the IdP,  
there's no privacy or security benefit for enforcing another explicit user 
confirmation for something that they have already previously acknowledged. 


With auto-reauthentication, the browser changes its behavior depending on the option you specify for the `mediation` when calling `navigator.credentials.get()`.

```js
const cred = await navigator.credentials.get({
  identity: {
    providers: [{
      configURL: "https://idp.example/fedcm.json",
      clientId: "1234",
    }],
  },
  mediation: 'optional', // this is the default
});
```

The `mediation` is [a property in the Credential Management 
API](https://developer.mozilla.org/docs/Web/API/CredentialsContainer/get#:~:text=mediation), 
it behaves in [the same 
way](https://web.dev/security-credential-management-retrieve-credentials/) as it 
does for 
[PasswordCredential](https://developer.mozilla.org/docs/Web/API/PasswordCredential) 
and 
[FederatedCredential](https://developer.mozilla.org/docs/Web/API/FederatedCredential) 
and it's partially supported by 
[PublicKeyCredential](https://developer.mozilla.org/docs/Web/API/PublicKeyCredential) 
as well. The property accepts the following four values:

* `'optional'`(default): Auto-reauthn if possible, requires a mediation if not. We 
  recommend choosing this option on the sign-in page.
* `'required'`: Always requires a mediation to proceed, for example, clicking the 
  "Continue" button on the UI. Choose this option if your users are expected to 
  grant permission explicitly every time they need to be authenticated.
* `'silent'`: Auto-reauthn if possible, silently fail without requiring a
  mediation if not. We recommend choosing this option on the pages other than
  the dedicated sign-in page but where you want to keep users signed in—for
  example, an item page on a shipping website or an article page on a news
  website.
* `'conditional'`: Used for WebAuthn and not available for FedCM at the moment.

With this call, auto-reauthn happens under the following conditions:

* FedCM is available to use. For example, the user has not [disabled FedCM 
  either globally](#settings) or for the RP in the settings.
* The user used only one account with FedCM API to sign into the website on this 
  browser.
* The user is signed into the IdP with that account.
* The auto-reauthn didn't happen within the last 10 minutes.
* The RP hasn't called
  [`navigator.credentials.preventSilentAccess()`](#prevent-silent-access) after
  the previous sign in.

When the above conditions are met, an attempt to automatically reauthenticate
the user starts as soon as the FedCM `navigator.credentials.get()` is invoked.

<figure style="width: 300px; margin: auto; margin-top: 2em;">
  {% Video
    src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/Q2ARmaZAVx2ShnKpPQNj.mp4",
    width="486",
    height="1080"
  %}
  <figcaption>A user auto-reauthenticating through FedCM.</figcaption>
</figure>

#### Enforce mediation with `preventSilentAccess()` {: #prevent-silent-access }

Auto-reauthenticating users immediately after they sign out would not make for a 
very good user experience. That's why FedCM has a 10-minute quiet period after 
an auto-reauthn to prevent this behavior. This means that auto-reauthn happens 
at most once in every 10-minutes unless the user signs back in within 
10-minutes. The RP should call `navigator.credentials.preventSilentAccess()` to 
explicitly request the browser to disable auto-reauthn when a user signs out of 
the RP explicitly, for example, by clicking a sign-out button.

```js
function signout() {
  navigator.credentials.preventSilentAccess();
  location.href = '/signout';
}
```

#### Users can opt-out of auto-reauthn in settings {: #settings }

Users can opt-out from auto-reauth from the settings menu:

* On desktop Chrome, go to `chrome://password-manager/settings` > Sign in
  automatically.
* On Android Chrome, open **Settings** > **Password Manager** > Tap on a 
  cog at the top right corner > Auto sign-in.

By disabling the toggle, the user can opt-out from auto-reauthn behavior all 
together. This setting is stored and synchronized across devices, if the user is 
signed into a Google account on the Chrome instance and synchronization is 
enabled.

{% Aside %}

Users can also [opt-out from FedCM per
domain](/docs/privacy-sandbox/fedcm/#user-settings).

{% endAside %}

### Call FedCM from within a cross-origin iframe

FedCM can be invoked from within a cross-origin iframe using an `identity-credentials-get` permissions policy, if the parent frame allows it. To do so, append the `allow="identity-credentials-get"` attribute to the iframe tag as follows:

```html
<iframe src="https://fedcm-cross-origin-iframe.glitch.me" allow="identity-credentials-get"></iframe>
```

You can see it in action in [an example](https://fedcm-top-frame.glitch.me/).

Optionally, if the parent frame wants to restrict the origins to call FedCM,
send a `Permissions-Policy` header with a list of allowed origins.

```http
Permissions-Policy: identity-credentials-get=(self "https://fedcm-cross-origin-iframe.glitch.me")
```

You can learn more about how the Permissions Policy works at [Controlling
browser features with Permissions
Policy](/docs/privacy-sandbox/permissions-policy/).

