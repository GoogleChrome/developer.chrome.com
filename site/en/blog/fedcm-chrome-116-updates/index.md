---
layout: 'layouts/blog-post.njk'
title: 'FedCM updates: IdP Sign-In Status API, Login Hint, and more'
description: >
  Chrome 116 ships new FedCM capabilities such as Login Hint API, User Info API, and RP Context API, and starts an origin trial for IdP Sign-In Status API.
subhead: >
  Chrome 116 ships FedCM capabilities such as Login Hint API, User Info API, and RP Context API, and starts an origin trial for IdP Sign-In Status API.
date: 2023-07-21
hero: 'image/YLflGBAPWecgtKJLqCJHSzHqe2J2/n09K1iWRmDWNFzb2A2y7.jpg'
alt: 'Series of tools.'
authors:
  - agektmr
origin_trial:
  url: /origintrials/#/view_trial/3196429835526209537
tags:
  - privacy
  - identity
  - origin-trials
---

In Chrome 116, Chrome is shipping the following three new [Federated Credential 
Management (FedCM)](/docs/privacy-sandbox/fedcm/) 
features:

* **[Login Hint API](#login-hint)**: Specify a preferred user account to be
  signed in.
* **[User Info API](#user-info)**: Fetch the information of the returning user
  so that the identity provider (IdP) can render a personalized sign-in button
  within an iframe. 
* **[RP Context API](#rp-context)**: Use a title different from 'Sign in'  in
  the FedCM dialog.

Additionally, Chrome is starting an [origin
trial](/docs/web-platform/origin-trials/) for the **[IdP Sign-In Status
API](#idp-signin-status)**. The IdP Sign-in Status API is a requirement and will be a
breaking change when it's shipped. If you have an existing implementation of
FedCM, make sure to participate in the origin trial.

## Login Hint API {: #login-hint}

When FedCM is invoked, the browser shows the signed-in account from the 
specified identity provider (IdP). When the IdP supports multiple accounts, it 
lists all signed-in accounts.

<figure class="float-right">
  {% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/sNV371fMQRQM0mr8SEl5.png", alt="A FedCM dialog showing multiple user accounts.", width="794", height="470" %}
   <figcaption>A FedCM dialog showing multiple user accounts</figcaption>
</figure>

After the user signs in, sometimes the relying party (RP) asks the user to 
reauthenticate. But the user may not be sure which account they've been using. 
If the RP can specify which account to sign in with, it would be easier for the 
user to pick an account. [Login 
hint](https://fedidcg.github.io/FedCM/#dom-identityproviderconfig-loginhint) is 
shipping in Chrome 116 and with it, the RP can narrow the list down to one.

This extension adds an array of `login_hints` in the [accounts list
endpoint](/docs/privacy-sandbox/fedcm-developer-guide/#accounts-list-endpoint) response from the
IdP, with all possible filter types that the IdP supports. For example, the
accounts response could look like this when an IdP supports filtering by email
and id:

```json
{
  "accounts": [{
    "id": "demo1",
    "email": "demo1@example.com",
    "name": "John Doe",
    "login_hints": ["demo1", "demo1@example.com"],
    ...
  }, {
    "id": "demo2",
    "email": "demo2@example.com",
    "name": "Jane Doe",
    "login_hints": ["demo2", "demo2@example.com"],
    ...
  }, ...]
}
```

By passing `login_hints` in the accounts list, the RP can invoke 
`navigator.credentials.get()` with the `loginHint` property as shown in the 
following code sample to selectively show the specified account:

```js
return await navigator.credentials.get({
  identity: {
    providers: [{
      configURL: "https://idp.example/manifest.json",
      clientId: "123",
      nonce: nonce,
      loginHint : "demo1@example.com"
    }]
  }
});
```

## User Info API {: #user-info}

Sign-in buttons decorated with the IdP's logo that let users sign in with
identity federation is now common. However, decorating the button using the
user's profile icon and their information is even more intuitive to sign in
with, especially when a user has signed up on this website with the IdP before.

{% Columns %}

{% Column %}

<figure>
  {% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/LK2JpVpbo7kuh3uq0ZIc.png", alt="Sign-in with Google button.", width="414", height="118" %}
  <figcaption>Sign-in with Google button</figcaption>
</figure>

{% endColumn %}
{% Column %}

<figure>
  {% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/fDpZXGBZneIqSzUUSCU9.png", alt="Personalized Sign-in with Google button.", width="493", height="121" %}
  <figcaption>Personalized Sign-in with Google button</figcaption>
</figure>

{% endColumn %}

{% endColumns %}

The challenge is, since the personalized button depends on the third-party
cookies on the IdP domain within an iframe to identify the signed-in user to
render the button, it won't available once [third-party cookies are
deprecated](/docs/privacy-sandbox/third-party-cookie-phase-out/).

User Info API, shipping in Chrome 116, provides a way for the IdP to
obtain the information of the returning user from the server without depending
on the third-party cookies.

The API is expected to be called by the IdP from within an iframe embedded on
the RP website so that it can retrieve the user information and render a
personalized button as if it's a part of the RP surface. With the API call, the
browser makes a request to the [accounts list
endpoint](/docs/privacy-sandbox/fedcm-developer-guide/#accounts-list-endpoint),
then returns an array of user information if:

* The user has signed in to the RP with the IdP via FedCM in the past on the 
  same browser instance and the data hasn't been cleared.
* The user is signed in to the IdP on the same browser instance.

```js
// Iframe displaying a page from the https://idp.example origin
const user_info = await IdentityProvider.getUserInfo({
    configUrl: "https://idp.example/fedcm.json",
    clientId: "client1234"
});

// IdentityProvider.getUserInfo returns an array of user information.
if (user_info.length > 0) {
  // Chrome puts returning accounts first, so the first account received is guaranteed to be a returning account.
  const name = user_info[0].name;
  const given_name = user_info[0].given_name;
  const display_name = given_name ? given_name : name;
  const picture = user_info[0].picture;
  const email = user_info[0].email;
  // Renders the personalized sign-in button with the information above.
}
```

Note that to allow calling `IdentityProvider.getUserInfo()` from within an
iframe that is the same origin as the IdP, the embedding HTML must explicitly
allow it with the `identity-credentials-get` [permissions
policy](/docs/privacy-sandbox/permissions-policy/).

```html
<iframe src="https://fedcm-idp-demo.glitch.me" allow="identity-credentials-get"></iframe>
```

You can see it in action at
[https://fedcm-rp-demo.glitch.me/button](https://fedcm-rp-demo.glitch.me/button).

## RP Context API {: #rp-context}

RP Context API, shipping in Chrome 116, allows an RP to modify the string 
in the FedCM dialog UI so that it can accommodate predefined authentication 
contexts. See the following screenshots for different options:

{% Columns %}

{% Column %}

<figure>
  {% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/xBPyPacCJ0zPiRuCMnX3.png", alt="FedCM dialog rendered with \"Sign in to ****\".", width="794", height="398" %}
  <figcaption>FedCM dialog rendered with "Sign in to ****". This is the default option if RP Context is not specified.</figcaption>
</figure>

{% endColumn %}
{% Column %}

<figure>
  {% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/C99AAEKSxzbzCIhoAbUA.png", alt="FedCM dialog rendered with \"Sign up to ****\".", width="796", height="400" %}
  <figcaption>FedCM dialog rendered with "Sign up to ****"</figcaption>
</figure>

{% endColumn %}

{% endColumns %}
{% Columns %}

{% Column %}

<figure>
  {% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/diZHUS6N0nwLB94ofzgs.png", alt="FedCM dialog rendered with \"Continue to ****\".", width="786", height="388" %}
  <figcaption>FedCM dialog rendered with "Continue to ****"</figcaption>
</figure>

{% endColumn %}
{% Column %}

<figure>
  {% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/gQpsjT9xjD8ywGQgYyqV.png", alt="FedCM dialog rendered with \"Use ****\"", width="800", height="408" %}
  <figcaption>FedCM dialog rendered with "Use ****"</figcaption>
</figure>

{% endColumn %}

{% endColumns %}

Usage is simple; provide `identity.context` property one of `"signin"`
(default), `"signup"`, `"use"` or `"continue"`.

```js
const credential = await navigator.credentials.get({
  identity: {
    // "signin" is the default, "signup", "use" and "continue" 
    // can also be used
    context: "signup", 
    providers: [{
      configURL: "https://idp.example/fedcm.json",
      clientId: "1234",
    }],
  }
});
```

## IdP Sign-In Status API origin trial {: #idp-signin-status}

Chrome starts an [IdP Sign-In Status API origin 
trial](/origintrials/#/registration/-7757239251913146367) 
on desktop from Chrome 116, followed by Android Chrome later. [Origin 
trials](/docs/web-platform/origin-trials/) give you 
access to a new or experimental feature to build functionality your users can 
try out for a limited time before the feature is made available to everyone.

{% Aside 'important' %}

IdP Sign-In Status API is a breaking change and will be a requirement for FedCM 
when it's shipped.

{% endAside %}

[IdP Sign-In Status
API](https://github.com/fedidcg/FedCM/blob/main/proposals/idp-sign-in-status-api.md)
is a mechanism where an IdP informs the browser of the user's sign-in status on
the IdP. With this API, the browser can reduce unnecessary requests to the IdP
and mitigate potential timing attacks.

{% Aside %}

FedCM introduces a credentialed request to the [accounts list 
endpoint](/docs/privacy-sandbox/fedcm-developer-guide/#accounts-list-endpoint). 
This request does not send data identifying the requestor and also does not 
allow passing data provided by the RP; however, the browser separately 
performs an uncredentialed request containing the RP information to the 
`client_metadata_endpoint`, then the IdP server can correlate the uncredentialed 
request with the credentialed request (stochastically) using timing, or other 
fingerprinting data. Refer to [these 
slides](https://github.com/fedidcg/FedCM/blob/main/meetings/2022/FedCM_%20Options%20for%20the%20Timing%20Attack%20Problem%202022-08-31.pdf) 
for more details.

{% endAside %}

### Inform the browser of the user's sign-in status

IdPs can signal the user's sign-in status to the browser by sending an HTTP
header or by calling a JavaScript API, when the user is signed in on the IdP, or
when the user is signed out from all their IdP accounts. The browser records the
status as one of the following: "sign-in", "sign-out", or "unknown" (default).

To signal that the user is signed in, send an `IdP-SignIn-Status: action=signin`
HTTP header in a top-level navigation or a same-origin subresource request:

```http
IdP-SignIn-Status: action=signin
```

Alternatively, call the JavaScript API `IdentityProvider.login()` from the IdP
origin:

```http
IdentityProvider.login()
```

These will record the user's sign-in status as "sign-in". When the user's
sign-in status is set to "sign-in", the PR calling FedCM makes requests to the
IdP's accounts list endpoint and displays available accounts to the user in the
FedCM dialog.

To signal that the user is signed out from all their accounts, send the
`IdP-SignIn-Status: action=signout-all` HTTP header in a top-level navigation or
a same-origin subresource request:

```http
IdP-SignIn-Status: action=signout-all
```

Alternatively, call the JavaScript API `IdentityProvider.logout()` from the IdP
origin:

```http
IdentityProvider.logout()
```

These will record the user's sign-in status as "sign-out". When the user's
sign-in status is "sign-out", calling the FedCM silently fails without making a
request to the IdP's accounts list endpoint.

By default, the IdP sign-in status is set to "unknown". This status is used
before the IdP sends a signal using the IdP Sign-In Status API. We introduce
this status for better transition because a user may have already signed in to
the IdP when we ship this API and the IdP may not have a chance to signal this
to the browser by the time FedCM is first invoked. In this case, we make a
request to the IdP's accounts list endpoint and update the status based on the
response from the accounts list endpoint:

* If the endpoint returns a list of active accounts, update the status to 
  "sign-in" and open the FedCM dialog to show those accounts.
* If the endpoint returns no accounts, update the status to "sign-out" and fail 
  the FedCM call.

### What if the user session expires? Let the user sign in through a dynamic sign-in flow

Even though the IdP continues to inform the browser of the user's sign-in
status, it could be out of sync, such as when the session expires. The browser
tries to send a credentialed request to the accounts list endpoint when the
sign-in status is "sign-in", but the server rejects it because the session is no
longer available. In such a scenario, the browser can dynamically let the user
sign in to the IdP through a popup window.

The FedCM dialog will display a message, as shown in the following image:

<figure>
  {% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/hDf8EI5TBAa42umi7kMu.png", alt="A FedCM dialog suggesting to sign in to the IdP.", width="800", height="449" %}
  <figcaption>A FedCM dialog suggesting to sign in to the IdP.</figcaption>
</figure>

By clicking on the **Continue** button, the browser opens a popup window 
sending the user to the IdP's sign-in page.

<figure>
  {% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/Lujgpk77nxF81sl8Ca5S.png", alt="A popup window shown after clicking on the sign in to the IdP button.", width="800", height="516" %}
  <figcaption>A popup window shown after clicking on the sign in to the IdP button.</figcaption>
</figure>

{% Aside %}

The website doesn't have control over the size of the popup window before it's
opened. By default, the size is set to 500 px in width and 600 px in height. The
website may change the size after the window has been opened from within the
content area.

{% endAside %}

The sign-in page URL (which must be the IdP's origin) can be specified with `signin_url` 
as part of the [IdP config 
file](/docs/privacy-sandbox/fedcm-developer-guide/#idp-config-file).

```json
{
  "accounts_endpoint": "/auth/accounts",
  "client_metadata_endpoint": "/auth/metadata",
  "id_assertion_endpoint": "/auth/idtokens",
  "signin_url": "/signin"
  }
}
```

The popup window is a regular browser window that uses first-party cookies. 
Whatever happens within the content window is up to the IdP, but no window 
handles are available to make a cross-origin communication request to the RP 
page. After the user is signed in, the IdP should:

* Send the `IdP-SignIn-Status: action=signin` header or call the
  `IdentityProvider.login()` API to inform the browser that the user has been
  signed in.
* Call `IdentityProvider.close()` to close itself (the popup window).

```js
// User is signed in...
// Don't forget feature detection.
if (IdentityProvider) {
  // Signal to the browser that the user has signed in.
  IdentityProvider.close();
}
```

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

This dynamic sign-in experience is intended for when an IdP session has expired 
without an explicit sign-out, causing the browser's sign-in state to contradict 
the actual state. This will not be triggered for users who haven't signed 
in to the IdP yet. This new flow is designed to cover the cases where the user's 
IdP sign-in status on the browser is "sign-in" but the IdP's accounts list 
endpoint returns no accounts.

Assuming the IdP Sign-In Status API is called promptly, when FedCM is invoked,
any of the following scenarios can occur:

* If the browser doesn't know the user's sign-in status ("unknown"), the status
  is updated (either "sign-in" or "sign-out") depending on the IdP's response
  from the accounts list endpoint. A dynamic sign-in flow won't be triggered.
* If a user has signed in to the IdP on the browser ("sign-in"), and then 
  explicitly signed out from the IdP ("sign-out"), the dynamic sign-in flow 
  won't be triggered.
* If a user has signed in to the IdP on the browser ("sign-in"), but the session 
  expires without an explicit sign-out, the dynamic sign-in flow will be 
  triggered.

The IdP Sign-In Status API does not provide the ability for the RP to display a 
"Sign-in to the IdP" dialog to users who are not signed in to the IdP. This is a 
separate feature which may be added in the future.

{% endAside %}

You can try the IdP Sign-In Status API behavior in [our
demo](https://fedcm-rp-demo.glitch.me). The session expires in three minutes
after you sign in to [the demo IdP](https://fedcm-idp-demo.glitch.me). Then you
can observe the sign-in to the IdP through the popup window behavior. 

## Participate in the origin trial {: #origin-trial}

You can try IdP Sign-In Status API locally by turning on [a Chrome  
flag](/docs/web-platform/chrome-flags/)
`chrome://flags#fedcm-idp-signin-status-api` on  
Chrome 116 or later.

You can also enable the IdP Sign-In Status API by registering an origin trial
twice:

* Register an [origin trial](/docs/web-platform/origin-trials/) for the IdP.
* Register a [third-party origin
  trial](/docs/web-platform/third-party-origin-trials/) for the RP.

Origin trials allow you to try new features and give feedback on their
usability, practicality, and effectiveness to the web standards community. For
more information, check out the [Origin Trials Guide for Web
Developers](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md).

The IdP Sign-In Status API origin trial is available from Chrome 116 through
Chrome 119.

### Register an origin trial for the IdP

1.  Go to the [origin trial registration page]({{origin_trial.url}}).
2.  Click the **Register** button and fill out the form to request a token.
3.  Enter the IdP's origin as **Web Origin**.
4.  Click **Submit**.
5. Add an `origin-trial` `<meta>` tag to the head of the pages that use
  `IdentityProvider.close()`. For example, this may look something like: <br>
  `<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">`.

{% Aside 'warning' %}

Sending an `Origin-Trial` HTTP header won't work for this API.

{% endAside %}

### Register a third-party origin trial for the RP

1.  Go to the [origin trial registration page]({{origin_trial.url}}).
2.  Click the **Register** button and fill out the form to request a token.
3.  Enter the IdP's origin as **Web Origin**.
4.  Check **Third-party matching**  to inject the token with JavaScript on other origins.
5.  Click **Submit**.
6.  Embed the issued token on a third-party website.

To embed the token on a third-party website, add the following code to your
JavaScript library or SDK served from the IdP's origin.

```javascript
const tokenElement = document.createElement('meta');
tokenElement.httpEquiv = 'origin-trial';
tokenElement.content = 'TOKEN_GOES_HERE';
document.head.appendChild(tokenElement);
```

Replace `TOKEN_GOES_HERE` with your own token.

{% Aside %}

If FedCM is executed directly by an RP without loading an IdP's scripts, the RP  
must register their origin themselves for the origin trial.

{% endAside %}

## Engage and share feedback {: #feedback}

If you have feedback or encounter any issues during testing, you can share them 
at 
[crbug.com](https://bugs.chromium.org/p/chromium/issues/entry?components=Blink%3EIdentity%3EFedCM).

Photo by <a href="https://unsplash.com/@dancristianpaduret?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Dan Cristian Pădureț</a> on <a href="https://unsplash.com/photos/noOXRT9gfQ8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
