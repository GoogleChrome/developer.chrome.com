---
layout: 'layouts/blog-post.njk'
title: 'FedCM updates: Login Status API, Error API, and Auto-selected Flag API'
description: >
  The LoginStatus API enables FedCM API without third-party cookies. The Error API and Auto-Selected Flag API bring more capabilities to FedCM API.
subhead: >
  The LoginStatus API enables FedCM API without third-party cookies. The Error API and Auto-Selected Flag API bring more capabilities to FedCM API.
date: 2023-11-01
hero: 'image/YLflGBAPWecgtKJLqCJHSzHqe2J2/KG2D0nQ3epKsOdbb9B5e.jpg'
alt: 'Series of tools.'
authors:
  - yigu
  - agektmr
origin_trial:
  url: /origintrials/#/view_trial/3196429835526209537
tags:
  - privacy
  - identity
---

Chrome 120 is shipping the [**Login Status API**](#login-status-api) for FedCM.
The Login Status API (formerly known as IdP Sign-in Status API) allows websites,
particularly identity providers, to signal to the browser when their users are
logging in and out. This signal is used by FedCM to address a silent timing attack
problem, and in doing so, allows FedCM to operate *[without third-party
cookies](/docs/privacy-sandbox/third-party-cookie-phase-out/) altogether*. This
update addresses the last remaining backwards-incompatible changes we previously
identified in the [original Intent to Ship of
FedCM](https://groups.google.com/a/chromium.org/g/blink-dev/c/URpYPPH-YQ4/m/E9pgS7GEBAAJ),
as part of our [scope of
work](/docs/privacy-sandbox/fedcm/#roadmap).

While the Login Status API improves the privacy property and usability, it's a
backward-incompatible change once shipped. If you have an existing
implementation of FedCM, make sure to update it using the following
instructions.

Additionally, Chrome is shipping two new [Federated Credential Management
(FedCM)](/docs/privacy-sandbox/fedcm/) features:

* [**Error API**](#error-api): Notify users when their sign-in attempt fails with a native UI
  based on the server response from the id assertion endpoint, if any.
* [**Auto-Selected Flag API**](#auto-selected-flag-api): Notify the identity provider (IdP)
  and relying party (RP) if a credential was automatically selected in the flow.

## Login Status API {: #login-status-api}

{% Aside 'important' %}

The Login Status API is a requirement for FedCM. If you have an existing
implementation of FedCM, make sure the Login Status API is implemented,
otherwise the FedCM dialog may not show up, even if a user is signed in to the
IdP.

{% endAside %}

The [Login Status
API](https://github.com/fedidcg/FedCM/blob/main/proposals/idp-sign-in-status-api.md)
is a mechanism where a website, especially an IdP, informs the browser the
user's login status on the IdP. With this API, the browser can reduce
unnecessary requests to the IdP and mitigate potential timing attacks.

{% Aside %}

FedCM introduces a credentialed request to the [accounts list
endpoint](/docs/privacy-sandbox/fedcm-developer-guide/#accounts-list-endpoint).
This request doesn't send data that identifies the requestor and doesn't allow
passing-through data provided by the RP. Separately, the browser
performs an uncredentialed request containing the RP information to the
`client_metadata_endpoint`, so the IdP server can correlate the uncredentialed
request with the credentialed request (stochastically) using timestamps or other
fingerprinting data. Read more details on
[GitHub](https://github.com/fedidcg/FedCM/issues/447).

{% endAside %}

### Inform the browser about the user's login status

IdPs can signal the user's login status to the browser by sending an HTTP header
or by calling a JavaScript API when the user is signed in on the IdP or when the
user is signed out from all their IdP accounts. For each IdP (identified by its
config URL) the browser keeps a tri-state variable representing the login state
with possible values "logged-in", "logged-out", and "unknown. The default state
is "unknown".

To signal that the user is signed in, send an `Set-Login: logged-in` HTTP header
in a top-level navigation or a same-origin subresource request:

```http
Set-Login: logged-in
```

Alternatively, call the JavaScript API `navigator.login.setStatus("logged-in")`
from the IdP origin:

```js
navigator.login.setStatus("logged-in")
```

These calls record the user's login status as logged-in. When the user's login
status is set to logged-in, the RP calling FedCM makes requests to the IdP's
accounts list endpoint and displays available accounts to the user in the FedCM
dialog.

To signal that the user is signed out from all their accounts, send `Set-Login:
logged-out` HTTP header in a top-level navigation or a same-origin subresource
request:

```http
Set-Login: logged-out
```

Alternatively, call the JavaScript API `navigator.login.setStatus("logged-out")` from the IdP
origin:

```js
navigator.login.setStatus("logged-out")
```

These calls record the user's login status as "signed-out." When the user's login
status is "logged-out," calling the FedCM silently fails without making a
request to the IdP's accounts list endpoint.

The "unknown" status is set before the IdP sends a signal using the Login
Status API. We introduced this status for a better transition, because a user may
have already signed into the IdP when we ship this API. The IdP may not have
a chance to signal this to the browser by the time FedCM is first invoked. In
this case, we make a request to the IdP's accounts list endpoint and update the
status based on the response from the accounts list endpoint:

* If the endpoint returns a list of active accounts, update the status to
  "logged-in" and open the FedCM dialog to show those accounts.
* If the endpoint returns no accounts, update the status to "logged-out" and
  fail the FedCM call.

### What if the user session expires? Let the user sign in through a dynamic login flow!

Even though the IdP keeps informing the user's login status to the browser, it
could be out of sync, such as when the session expires. The browser tries to
send a credentialed request to the accounts list endpoint when the login status
is "logged-in", but the server returns no accounts because the session is no
longer available. In such a scenario, the browser can dynamically let the user
sign in to the IdP through a popup window.

The FedCM dialog displays a message suggesting a sign in, as shown in the following image.

<figure>
  {% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/rUIpGicYbAJHdtLMsxui.png", alt="A FedCM dialog suggesting to sign in to the IdP.", width="800", height="449" %}
   <figcaption>A FedCM dialog suggesting to sign in to the IdP.</figcaption>
</figure>

When the user clicks the **Continue** button, the browser opens a dialog for the
IdP's login page.

<figure>
  {% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/i6MeleMIoTotaF3SIhk1.png", alt="An example dialog.", width="800", height="516" %}
   <figcaption>An example dialog shown after clicking on the sign in to the IdP button.</figcaption>
</figure>

{% Aside %}

The website can't control the size of the dialog before it's opened. By default,
the size is set to 500 px in width and 600 px in height.

{% endAside %}

The login page URL is specified with `login_url` as part of the [IdP config
file](/docs/privacy-sandbox/fedcm-developer-guide/#idp-config-file).

```json
{
  "accounts_endpoint": "/auth/accounts",
  "client_metadata_endpoint": "/auth/metadata",
  "id_assertion_endpoint": "/auth/idtokens",
  "login_url": "/login"
  }
}
```

The dialog is a regular browser window that has first-party cookies. Whatever
happens within the dialog is up to the IdP, and no window handles are available
to make a cross-origin communication request to the RP page. After the user is
signed in, the IdP should:

* Send the `Set-Login: logged-in` header or call the
  `navigator.login.setStatus("logged-in")` API to inform the browser that the
  user has been signed in.
* Call `IdentityProvider.close()` to close the dialog.

<figure class="screenshot">
  {% Video
    src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/Dyf5PXQDwD3u0mLsKFBS.mp4",
    width="800",
    height="559",
    autoplay="true",
    loop="true"
  %}
  <figcaption>A user signs into an RP after signing in to the IdP using FedCM</figcaption>
</figure>

{% Aside %}

This dynamic login experience is intended for when an IdP session has expired
without an explicit sign-out, causing the browser's login state to contradict
the user's actual state. This isn't triggered for users who haven't signed
in to the IdP yet. This new flow is designed to cover the cases where the user's
IdP login status on the browser is "logged-in" but the IdP's accounts list
endpoint returns no accounts.

Assuming the Login Status API is called promptly, when FedCM is invoked, any
of the following scenarios can occur:

* If the user's login status is set to unknown, the status is updated
  (either "logged-in" or "logged-out") depending on the IdP's response
  from the accounts list endpoint. A dynamic login flow won't be triggered.
* If a user has signed in to the IdP in the browser and then explicitly signed
  out from the IdP, the dynamic login flow won't be triggered.
* If a user has signed in to the IdP in the browser, but the session expires
  without an explicit update to "logged-out," the dynamic login flow is
  triggered.

The Login Status API does not provide the ability for the RP to display a
"Sign-in to the IdP" dialog to users who are not signed in to the IdP. This is a
separate feature which may be added in the future.

{% endAside %}

You can try the Login Status API behavior in [our
demo](https://fedcm-rp-demo.glitch.me).

1. Tap the **Go to the IdP and sign in** button.
2. Sign in with an arbitrary account.
3. Select **Session Expired** from **Account Status** dropdown.
4. Press the **Update personal info** button.
5. Tap the **Visit the RP to try FedCM** button.

You should be able to observe the login to the IdP through the module behavior.

## Error API {: #error-api}

When Chrome sends a request to the ID assertion endpoint (for example, when a
user clicks the **Continue as** button on the FedCM UI or auto-reauthentication
is triggered), the IdP may not be able to issue a token for legitimate reasons.
For example, if the client is unauthorized, the server is temporarily
unavailable, and so on. Currently, Chrome fails the request silently in case of
such errors and only notifies the RP by rejecting the promise.

With the [Error API](https://github.com/fedidcg/FedCM/issues/488), Chrome
notifies the user by showing a native UI with the error information provided by
the IdP.

<figure>
  {% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/JWiFDo0TCB5IZSEw9GwN.png", alt="A FedCM dialog showing the error message after the user's sign-in attempt fails. The string is associated with the error type.", width="800", height="511" %}
   <figcaption>A FedCM dialog showing the error message after the user's sign-in attempt fails. The string is associated with the error type.</figcaption>
</figure>

### IdP HTTP API

In the `id_assertion_endpoint`, currently the IdP can return a token to the
browser if it can be issued upon request. In this proposal, in case a token
cannot be issued, the IdP can return an "error" response, which has two new
optional fields:

1. `code`
2. `url`

```js
// id_assertion_endpoint response
{
  "error" : {
     "code": "access_denied",
     "url" : "https://idp.example/error?type=access_denied"
  }
}
```

For code, the IdP can choose one of the known errors from the [OAuth 2.0
specified error
list](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1)
[`invalid_request`, `unauthorized_client`, `access_denied`, `server_error` and
`temporarily_unavailable`] or use any arbitrary string. If the latter, Chrome
renders the error UI with a generic error message and pass the code to the
RP.

For `url`, it identifies a human-readable web page with information about the
error to provide additional information about the error to users. This field is
useful to users because browsers cannot provide rich error messages in a native
UI. For example, links for next steps, customer service contact information and
so on. If a user wants to learn more about the error details and how to fix it,
they could visit the provided page from the browser UI for more details. The URL
must be of the same-site as the IdP `configURL`. 

{% Aside %}

While we believe that implementing the Error API could bring the best user
experience to keep users informed and potentially help users to fix the issue,
implementing the Error API is optional. If an IdP doesn't notify the browser
about the error type when it occurs, Chrome will show an error UI with a generic
message. If the `url` field is not provided, Chrome doesn't include the **More
details** button. 

{% endAside %}

```js
try {
  const cred = await navigator.credentials.get({
    identity: {
      providers: [
        {
          configURL: "https://idp.example/manifest.json",
          clientId: "1234",
        },
      ],
    }
  });
} catch (e) {
  const code = e.code;
  const url = e.url;
}
```

## Auto-Selected Flag API {: #auto-selected-flag-api}

`mediation:optional` is the [default user mediation
behavior](https://w3c.github.io/webappsec-credential-management/#dom-credentialmediationrequirement-optional)
in the Credential Management API and it triggers automatic re-authentication when
possible. However, auto reauthentication may be
[unavailable](/blog/fedcm-auto-reauthn/#mediation-options) due to reasons that
only the browser knows; when it's unavailable the user may be prompted to sign
in with explicit user mediation, which is a flow with different properties.

* From an API caller's perspective, when they receive an ID token, they don't
  have visibility over whether it was an outcome of an auto reauthentication
  flow. That makes it hard for them to evaluate the API performance and improve
  UX accordingly.
* From the IdP's perspective, they are equally unable to tell whether an auto
  reauthentication occurred or not for performance evaluation. In addition,
  whether an explicit user mediation was involved could help them support more
  security related features. For example, some users may prefer a higher
  security tier which requires explicit user mediation in authentication. If an
  IdP receives a token request without such mediation, they could handle the
  request differently. For example, return an error code such that the RP can
  call the FedCM API again with `mediation: required`.

Therefore, providing visibility of the auto reauthentication flow would be
beneficial to developers.

With the [Auto-selected Flag API](https://github.com/fedidcg/FedCM/issues/497),
Chrome shares whether an explicit user permission was acquired by tapping on the
**Continue as** button with both the IdP and RP, whenever auto reauthentication
occurred or an explicit mediation occurred. Sharing only happens after user
permission is granted for IdP/RP communication.

### IdP sharing

To share the information to the IdP post user permission, Chrome includes
`is_auto_selected=true` in the `POST` request sent to the
`id_assertion_endpoint`:

```http
POST /fedcm_assertion_endpoint HTTP/1.1
Host: idp.example
Origin: https://rp.example/
Content-Type: application/x-www-form-urlencoded
Cookie: 0x23223
Sec-Fetch-Dest: webidentity

account_id=123&client_id=client1234&nonce=Ct0D&disclosure_text_shown=true&is_auto_selected=true
```

### RP sharing

The browser can share the information to the RP in `isAutoSelected` via
`IdentityCredential`:

```js
const cred = await navigator.credentials.get({
  identity: {
    providers: [{
      configURL: "https://idp.example/manifest.json",
      clientId: "1234"
    }]
  }
});

if (cred.isIdentityCredentialAutoSelected !== undefined) {
  const isAutoSelected = cred.isAutoSelected;
}
```

## Engage and share feedback

If you have feedback or encounter any issues during testing, you can share them
at
[crbug.com](https://bugs.chromium.org/p/chromium/issues/entry?components=Blink%3EIdentity%3EFedCM).

Photo by <a
href="https://unsplash.com/@girlwithredhat?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Girl
with red hat</a> on <a
href="https://unsplash.com/photos/orange-and-black-plastic-hair-clip-fb4bnBzPLTA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
