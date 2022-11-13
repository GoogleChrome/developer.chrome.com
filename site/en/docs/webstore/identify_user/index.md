---
layout: "layouts/doc-post.njk"
title: Identifying the User
date: 2017-08-30
updated: 2021-12-03
description: How to get the Google Account identity of a Chrome Web Store user.
---

Supporting Google account sign-in can help provide a better user experience. Users of the Chrome Web Store are likely to be logged in to their Google account already, so they won't have to set up and remember yet another username and password.

This tutorial builds an extension using the [Google OAuth2/OpenID][google-openid] endpoint and the [Chrome
Identity API][identity-api]. When the user clicks the [action][action], the extension will launch a consent
screen. After the user signs in to their Google account, the background will log their
information in the console.

To identify the user with Google OAuth2/OpenId, follow these steps:

1. [Create your extension files][create-files].
2. [Keep a consistent extension ID][consistent-id].
3. [Get the OAuth client ID][client-id].
4. [Launch the Authorization flow][auth-flow].
5. [View the user information][view-user-info].

We'll explain each step below.

## Create your extension files {: #create-extension-files}

Begin by creating a directory and the following starter files.

### manifest.json {: #manifest}

Add the manifest by creating a file called `manifest.json` and include the following code:

```json
{
  "name": "Google OpenID Connect Example",
  "version": "1.0",
  "description": "Use OpenID Connect to identify the user",
  "manifest_version": 3,
  "action": {
    "default_title": "Sign In with Google Accounts"
  },
  "background": {
    "service_worker": "background.js"
  }
}
```

### background.js {: #background}

Add the background service worker by creating a file called `background.js`. Include the following
code:

```javascript
// background.js

chrome.action.onClicked.addListener(function() {
  console.log('action clicked');
});
```

{% Partial 'extensions/reusing-prod-extension-id.md' %}

## Get the OAuth client ID {: #get-client-id}

Navigate to the [Google API Console][google-console] and create a new project. To get a OAuth client
ID, follow these steps:

**1. Customize the consent screen and select scope.**
   - Click the **OAuth consent screen** menu item.
   - Fill out the required consent screen information.
   - Add the **openid** scope.
   - Add **Test users**.
   - Click **Save > Continue**.

**2. Create credentials.**
   - Click the **Credentials** menu item.
   - Click **Create new credentials > Auth Client ID**.
   - Select Application type **Web application**.
   - Enter the **Name** of the OAuth2 client
   - Add `https://YOUR_EXTENSION_ID.chromiumapp.org/` as the **Authorized redirect URI**.
     - Replace <code><var>YOUR_EXTENSION_ID</var></code> with your extension's ID.
   - Finish by clicking **Create**.

The console will provide an OAuth client ID. Keep this ID for later use.

## Launch the Authorization flow {: #auth-flow}

### Request the "identity" permission {: #identity-permission}

To use the [Chrome Identity API][identity-api], declare the `"identity"` permission in the
`manifest.json`.

```json
{
  "name": "Google OpenID Connect example",
  ...
  "permissions": [
    "identity"
  ],
  ...
}
```

### Construct the authorization URL {: #auth-url}

Before the extension can make a request to Google’s OAuth2 endpoint using the Identity API, you need
to construct an [authorization URL][auth-url]. It must contain several request parameters including
the client ID and redirect URI. In addition to the `openid` [scope][openid-scopes], you can request
`profile` information and/or `email`. Update `background.js` to match the following code:

```javascript
// background.js

let clientId = 'CLIENT_ID'
let redirectUri = `https://${chrome.runtime.id}.chromiumapp.org/`
let nonce = Math.random().toString(36).substring(2, 15)

chrome.action.onClicked.addListener(function() {
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');

  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('response_type', 'id_token');
  authUrl.searchParams.set('redirect_uri', redirectUri);
  // Add the OpenID scope. Scopes allow you to access the user’s information.
  authUrl.searchParams.set('scope', 'openid profile email');
  authUrl.searchParams.set('nonce', nonce);
  // Show the consent screen after login.
  authUrl.searchParams.set('prompt', 'consent');
});
```

Replace <code><var>CLIENT_ID</var></code> with the API key generated from the Google console.

### Retrieve a redirect URL {: #redirect-url}

Now that the extension has the client ID, redirect URI, and OAuth URL, it can initiate Google's
authentication flow. Call [`identity.launchWebAuthFlow()`][identity-webauthflow] to launch the web
auth flow and retrieve a redirect URL.

The redirect URL contains a JSON Web Token (JWT) that identifies the user. To view the requested
user identity information, you'll need to parse the JWT into a plain JavaScript object. Update
`background.js` to match the following code:

```javascript
// background.js

...

chrome.action.onClicked.addListener(function() {

  ...

  chrome.identity.launchWebAuthFlow(
      {
        url: authUrl.href,
        interactive: true,
      },
      (redirectUrl) => {
        if (redirectUrl) {
          // The ID token is in the URL hash
          const urlHash = redirectUrl.split('#')[1];
          const params = new URLSearchParams(urlHash);
          const jwt = params.get('id_token');

          // Parse the JSON Web Token
          const base64Url = jwt.split('.')[1];
          const base64 = base64Url.replace('-', '+').replace('_', '/');
          const token = JSON.parse(atob(base64));

          console.log('token', token);
        }
      },
    );
});
```

{% Aside %}

The above code is **not** production ready. We strongly encourage validating and decoding the JWT
before the information it contains is trusted. For more information, see [how to handle credential
responses][credential-responses].

{% endAside %}

## View the user information {: #user-info}

Reload and return to the extension. Click the extension action button to start the web
authentication flow. Sign in with your Google Account, then press Enter.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/CETlvMvFpe23QyIAq8Lx.png", alt="ALT_TEXT_HERE",
width="358", height="428" %}

Go to the extension management page. Select the **service worker** blue link next to
Inspect views. The extension should log the token containing the user information.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/450NKaekvVNpnAUXz7QJ.png", alt="ALT_TEXT_HERE",
width="800", height="162" %}

## Additional resources {: #additional-resources }

- See [OAuth2: Authenticate users with Google][oauth-google-contacts] for a guided tutorial on how
  to access a user's Google contacts.
- See [Google OpenID Connect][google-openid] to learn more about OAuth 2.0 implementation for
  authentication.

[action]: /docs/extensions/reference/action/
[auth-flow]: #auth-flow
[auth-url]: https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest
[client-id]: #get-client-id
[consistent-id]: #keep-consistent-id
[create-files]: #create-extension-files
[credential-responses]: https://developers.google.com/identity/gsi/web/guides/handle-credential-responses-js-functions
[google-console]: https://console.developers.google.com
[google-openid]: https://developers.google.com/identity/protocols/oauth2/openid-connect
[identity-api]: /docs/extensions/reference/identity/
[identity-webauthflow]: /docs/extensions/reference/identity/#method-launchWebAuthFlow
[oauth-google-contacts]: /docs/extensions/mv3/tut_oauth/
[openid-scopes]: https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
[view-user-info]: #user-info
