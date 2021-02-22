---
layout: "layouts/doc-post.njk"
title: "User Authentication"
date: 2012-09-17
updated: 2018-05-14
description: How to authenticate users in your Chrome App.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

Web authentication protocols utilize HTTP features, but Chrome Apps run inside the app container;
they don't load over HTTP and can't perform redirects or set cookies.

Use the [Chrome Identity API][3] to authenticate users: the `getAuthToken` for users logged into
their Google Account and the `launchWebAuthFlow` for users logged into a non-Google account. If your
app uses its own server to authenticate users, you will need to use the latter.

{% Aside %}

**API Samples:** Want to play with the code? Check out [these samples][4], in particular the
[identity sample][5].

{% endAside %}

## How it works {: #how }

Chrome Apps users have a Google account associated with their profile. Apps can get OAuth2 tokens
for these users using the `getAuthToken` API.

Apps that want to perform authentication with non-Google identity providers must call
`launchWebAuthFlow`. This method uses a browser pop-up to show the provider pages and captures
redirects to the specific URL patterns. The redirect URLs are passed to the app and the app extracts
the token from the URL.

## Google account authentication {: #google }

Here are the five steps you need to complete:

1.  Add permissions to your manifest and upload your app.
2.  Copy key in the installed `manifest.json` to your source manifest, so that your application ID
    will stay constant during development.
3.  Get an OAuth2 client ID for your Chrome App.
4.  Update your manifest to include the client ID and scopes.
5.  Get the authentication token.

### Add permissions and upload app {: #add_permissions }

You need to make sure the identity permission is in your manifest. You can then upload your app to
the apps and extensions management page (see [Publish][6]).

```json
"permissions": [
  "identity"
]
```

### Copy key to your manifest {: #copy_key }

When you register your application in the Google OAuth console, you'll provide your application's
ID, which will be checked during token requests. Therefore it's important to have a consistent
application ID during development.

To keep your application ID constant, you need to copy the key in the installed `manifest.json` to
your source manifest. It's not the most graceful task, but here's how it goes:

1.  Go to your [user data directory][7]. Example on MacOs:
    `~/Library/Application\ Support/Google/Chrome/Default/Extensions`
2.  List the installed apps and extensions and match your app ID on the apps and extensions
    management page to the same ID here.
3.  Go to the installed app directory (this will be a version within the app ID). Open the installed
    `manifest.json` (pico is a quick way to open the file).
4.  Copy the "key" in the installed `manifest.json` and paste it into your app's source manifest
    file.

### Get your OAuth2 client ID {: #client_id }

You need to register your app in the Google APIs Console to get the client ID:

1.  Login to the [Google APIs Console][8] using the same Google account used to upload your app to
    the Chrome Web Store.
2.  Create a new project by expanding the drop-down menu in the top-left corner and selecting the
    **Create...** menu item.
3.  Once created and named, go to the "Services" navigation menu item and turn on any Google
    services your app needs.
4.  Go to the "API Access" navigation menu item and click on the **Create an OAuth 2.0 client
    ID...** blue button.
5.  Enter the requested branding information, select the **Installed application** type.
6.  Select **Chrome Application** and enter your application ID (same ID displayed in the apps and
    extensions management page).

{% Aside 'warning' %}

**Warning:** If the app ID here does not match your app ID, an error will occur when your app calls
[getAuthToken()][9].

{% endAside %}

### Update your manifest with OAuth2 client ID and scopes {: #update_manifest }

You need to update your manifest to include the client ID and scopes. Here's the sample "oauth2" for
the [gdrive sample][10]:

```json
"oauth2": {
    "client_id": "665859454684.apps.googleusercontent.com",
    "scopes": [
      "https://www.googleapis.com/auth/drive"
    ]
  }
```

### Get access tokens {: #token }

You are now ready to get the auth token by calling [identity.getAuthToken][11].

```js
chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  // Use the token.
});
```

#### User interaction {: #getAuthToken-prompts }

When calling `getAuthToken`, you can pass a flag (`'interactive': true` in the example above)
indicating whether you want the API to be called in interactive mode or silent mode. If you invoke
the API in interactive mode, the user is shown a sign in and/or approval UI when necessary, as shown
in the screenshot below:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/4ssCBdcz1KciXq4NOSVm.png",
       alt="screenshot showing UI when an app uses the Identity API to authenticate a Google account", height="482", width="800" %}

If you invoke the API in silent mode, the API will only return a token if it's possible to produce
one without showing any UI. This is useful in cases when an app is doing the flow at app startup,
for example, or in general in cases where there is no user gesture involved.

The best practice we suggest is to use silent mode when there is no user gesture involved and use
interactive mode if there is a user gesture (for example, the user clicked the Sign In button in
your app). Note that we do not enforce any gesture requirement.

#### Caching {: #getAuthToken-caching }

Chrome has an in-memory cache of access tokens, so you can call `getAuthToken` any time you need to
use a token. Token expiration is handled automatically by the cache.

You can see the current state of the token cache on `chrome://identity-internals`.

There are some cases, such as when the user changes their password, when non-expired access tokens
will stop working. API calls using the token will start returning with an HTTP status code 401. If
you detect that this has happened, you can remove the invalid token from Chrome's cache by calling
[identity.removeCachedAuthToken][12].

Example of `removeCachedAuthToken` usage:

```js
// callback = function (error, httpStatus, responseText);
function authenticatedXhr(method, url, callback) {
  var retry = true;
  function getTokenAndXhr() {
    chrome.identity.getAuthToken({/* details */},
                                 function (access_token) {
      if (chrome.runtime.lastError) {
        callback(chrome.runtime.lastError);
        return;
      }

      var xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Authorization',
                           'Bearer ' + access_token);

      xhr.onload = function () {
        if (this.status === 401 && retry) {
          // This status may indicate that the cached
          // access token was invalid. Retry once with
          // a fresh token.
          retry = false;
          chrome.identity.removeCachedAuthToken(
              { 'token': access_token },
              getTokenAndXhr);
          return;
        }

        callback(null, this.status, this.responseText);
      }
    });
  }
}
```

## Non-Google account authentication {: #non }

Here are the three steps you need to complete:

1.  Register with the provider.
2.  Add permissions for provider resources that your app will access.
3.  Get the authentication token.

### Register with the provider {: #register_provider }

You need to register an OAuth2 client ID with the provider and configure the client ID as a website.
For the redirect URI to be entered during registration, use the URL of the form:
`https://<extension-id>.chromiumapp.org/<anything-here>`

For example, if you app ID is `abcdefghijklmnopqrstuvwxyzabcdef` and you want `provider_cb` to be
the path, to distinguish it with redirect URIs from other providers, you should use:
`https://abcdefghijklmnopqrstuvwxyzabcdef.chromiumapp.org/provider_cb`

### Add permissions for provider {: #permissions_provider }

To make cross-origin XHRs to the provider API endpoints, you need to allowlist the appropriate
patterns in the permissions:

```json
"permissions": [
  ...
  "https://www.website-of-provider-with-user-photos.com/photos/*"
]
```

### Get the token {: #token2 }

To get the token:

```js
chrome.identity.launchWebAuthFlow(
  {'url': '<url-to-do-auth>', 'interactive': true},
  function(redirect_url) { /* Extract token from redirect_url */ });
```

The <url-to-do-auth> is whatever the URL is to do auth to the provider from a website. For example,
let us say that you are performing OAuth2 flow with a provider and have registered your app with
client id 123456789012345 and you want access to user's photos on the provider's website:
`https://www.website-of-provider-with-user-photos.com/dialog/oauth?client_id=123456789012345& redirect_uri=https://abcdefghijklmnopqrstuvwxyzabcdef.chromiumapp.org/provider_cb&response_type=token&scope=user_photos`

The provider will perform authentication and if appropriate, will show login and/or approval UI to
the user. It will then redirect to
`https://abcdefghijklmnopqrstuvwxyzabcdef.chromiumapp.org/provider_cb#authToken=<auth-token>`

Chrome will capture that and invoke the callback of the app with the full redirect URL. The app
should extract the token out of the URL.

### Interactive versus silent mode {: #launchWebAuthFlow-interactive }

When calling `launchWebAuthFlow`, you can pass a flag (`'interactive': true` in the example above)
indicating whether you want the API to be called in interactive mode or not (aka silent mode). If
you invoke the API in interactive mode, the user is shown UI, if necessary, to get the token (signin
UI and/or approval UI; or for that matter any provider specific UI).

If you invoke the API in silent mode, the API will only return a token if the provider is able to
provide a token without showing any UI. This is useful in cases when an app is doing the flow at app
startup, for example, or in general in cases where there is no user gesture involved.

The best practice we suggest is to use silent mode when there is no user gesture involved and use
interactive mode if there is a user gesture (for example, the user clicked the Sign In button in
your app). Note that we do not enforce gesture requirement.

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: identity
[4]: https://github.com/GoogleChrome/chrome-app-samples#_feature_identity
[5]: https://github.com/GoogleChrome/chrome-app-samples/tree/master/samples/identity#readme
[6]: publish_app
[7]: http://www.chromium.org/user-experience/user-data-directory
[8]: https://code.google.com/apis/console/
[9]: #token
[10]: https://github.com/GoogleChrome/chrome-app-samples/tree/master/samples/gdrive
[11]: /apps/identity#method-getAuthToken
[12]: /apps/identity#method-removeCachedAuthToken
