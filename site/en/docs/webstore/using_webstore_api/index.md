---
layout: "layouts/doc-post.njk"
title: "Using the Chrome Web Store Publish API"
#date: TODO
updated: 2022-01-18
description: How to programmatically create, update, and publish items in the Chrome Web Store.
---

## Overview {: #overview }

The Chrome Web Store Publish API provides a set of REST endpoints for programmatically creating,
updating, and publishing items in the Chrome Web Store.

## Initial setup {: #setup }

Before you can begin making REST calls against the Chrome Web Store, you will need to enable the
Chrome Web Store API, configure your OAuth consent screen, and retrieve your API access keys. The
following sections walk through this process.

### Enable the Chrome Web Store API {: #enable-cws-api }

1. Go to the [Google Cloud Console][google-dev-console].
1. Create a new project or select an existing one.
   {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/g5o7qpsDv5kKiQmlCwkv.png", alt="Create a new
   project in the Google Console", width="600", height="149" %}
1. In the **search bar** type “Chrome Web Store API”.
1. Enable the **Chrome Web Store API**.

### Configure the OAuth consent screen  {: #oauth-setup }

1. Go to **OAuth consent screen**.
1. Select **External** then **Create**.
   {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/epcr782dUmXvZwaL5jid.png", alt="Create an Oauth
   consent screen", width="547", height="573" %}
1. Fill out the required **App information** fields (listed below) then click **Save and Continue**.
    - App name.
    - User Support email.
    - Developer contact email.
1. Skip Scopes. click **Save** then **Continue**.
1. Add your email address to **Test users**, then click **Save** then **Continue**.

### Get the access keys {: #get-keys }

1. Go to **Credentials**.
1. Click **Create Credentials** then **OAuth client ID**.
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/vZdPhBUnJytNg5W9TG0I.png", alt="Create credentials", width="657", height="106" %}
1. For **Application type**, choose **Desktop App**.
1. Fill out the name, then click **Create**.

The console will provide the client ID and client secret. 

## Testing your OAuth application {: #test-oauth }

You can retrieve an access token to work
with the API. For example, enter this URL in your browser, replacing the $CLIENT_ID with the one for
your app:

```text
https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&client_id=$CLIENT_ID&redirect_uri=urn:ietf:wg:oauth:2.0:oob
```

You will see a page asking you to accept permission for the requested scope.

{% Aside %}

Make sure you are requesting the token using the Google developer Account which owns the Chrome Web
Store items you want to manage. This account can be different from the account you created the
Google Developers Console project with. For example, you can create an application for other
developers to manage their apps, in which case you only need to register a Google Developers Console
project.

{% endAside %}

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/ZwxRj8SD3Ld40BsjZnsX.png", alt="Permission request
UI", width="308", height="249" %}

Click **Accept** and copy the code. It should look something like this:

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/KHtQ9uzphdR4oOsJQLVj.png", alt="UI for copying code",
width="348", height="155" %}

Use this value to request an **access token**. For example, using `curl`, you can get an access
token by executing the following command (replacing the values of $CLIENT\_ID, $CLIENT_SECRET, and
\$CODE with the values from above):

```bash
> curl "https://accounts.google.com/o/oauth2/token" -d \
"client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&code=$CODE&grant_type=authorization_code&redirect_uri=urn:ietf:wg:oauth:2.0:oob"
```

This will return a result such as:

```json
{
  "access_token" : "ya29...",
  "expires_in" : 3600,
  "refresh_token" : "1/rwn...",
  "scope": "https://www.googleapis.com/auth/chromewebstore",
  "token_type" : "Bearer",
}
```

You can now use the `access_token` to call the API. You can also use the refresh token to get future
access tokens. Note that tokens expire after an hour.

{% Aside %}

For more information about getting OAuth 2.0 access tokens, see [Using OAuth 2.0 to Access Google
APIs][oauth2].

{% endAside %}

## Using the API {: #usingtheapi }

Once you have an access token, your extension can then use the Chrome Web Store Publish API. There
are endpoints for creating a new item, updating an existing item, and publishing an item.

Below is a list of considerations for using the Publish API:

- Developers are required to enable [2-Step Verification][two-factor] for their Google account to publish or
  update an existing extension.
- Before you can publish a new item, you have to fill out the [Store Listing][store-listing] and
  [Privacy practices][privacy] tabs in the [Developer Dashboard][cws-dashboard].
- After publishing a new or existing item, it will undergo a review process. See [Review
  Process][review-process] to learn more.
- To release an update, increase the number in the [version][version] field of the manifest.

Learn more about the Chrome Web Store Publish API [here][cws-api].

### Uploading a package to create a new store item {: #uploadnew }

```text
Endpoint: https://www.googleapis.com/upload/chromewebstore/v1.1/items
Type: POST
Header Parameters: 
  $TOKEN: the access token
Body content: the package file to upload
```

Type the following example on the command line:

```bash
> curl \
-H "Authorization: Bearer $TOKEN"  \
-H "x-goog-api-version: 2" \
-X POST \
-T $FILE_NAME \
-v \
https://www.googleapis.com/upload/chromewebstore/v1.1/items
```

{% Aside %}

For a full description of the insert method, see [Items:Insert][cws-api-insert].

{% endAside %}

### Uploading a package to update an existing store item {: #uploadexisitng }

```text
Endpoint: https://www.googleapis.com/upload/chromewebstore/v1.1/items/$ITEM_ID
Type: PUT
Header Parameters: 
  $TOKEN: the access token
Body content: the package file to upload
```

\$ITEM_ID is the ID of the existing Web Store item.

```bash
> curl \
-H "Authorization: Bearer $TOKEN"  \
-H "x-goog-api-version: 2" \
-X PUT \
-T $FILE_NAME \
-v \
https://www.googleapis.com/upload/chromewebstore/v1.1/items/$ITEM_ID
```

{% Aside %}

For a full description of the update method, see [Items:Update][cws-api-update].

{% endAside %}

### Publishing an item to the public {: #publishpublic }

```text
Endpoint: https://www.googleapis.com/chromewebstore/v1.1/items/$ITEM_ID/publish
Type: POST
Header Parameters: 
  $TOKEN: the access token
```

```bash
> curl \
-H "Authorization: Bearer $TOKEN"  \
-H "x-goog-api-version: 2" \
-H "Content-Length: 0" \
-X POST \
-v \
https://www.googleapis.com/chromewebstore/v1.1/items/$ITEM_ID/publish
```

{% Aside %}

For a full description of publish method, see [Items:Publish][cws-api-publish].

{% endAside %}

### Publishing an item to trusted testers {: #trustedtesters }

```text
Endpoint: https://www.googleapis.com/chromewebstore/v1.1/items/$ITEM_ID/publish?publishTarget=trustedTesters
Type: POST
Header Parameters: 
  $TOKEN: the access token
```

```bash
> curl \
-H "Authorization: Bearer $TOKEN"  \
-H "x-goog-api-version: 2" \
-H "Content-Length: 0" \
-X POST \
-v \
https://www.googleapis.com/chromewebstore/v1.1/items/$ITEM_ID/publish?publishTarget=trustedTesters
```

{% Aside %}

For a full description of the publish method, see [Items:Publish][cws-api-publish].

{% endAside %}


### Checking the upload status of an item {: #checkstatus }

```text
Endpoint: https://www.googleapis.com/chromewebstore/v1.1/items/$ITEM_ID?projection=DRAFT
Type: GET
Header Parameters: 
  $TOKEN: the access token
```

```bash
curl \
-H "Authorization: Bearer $TOKEN"  \
-H "x-goog-api-version: 2" \
-H "Content-Length: 0" \
-H "Expect:" \
-X GET \
-v \
https://www.googleapis.com/chromewebstore/v1.1/items/$ITEM_ID?projection=DRAFT
```

{% Aside %}

Only **projection=DRAFT** is supported at this time.

For a full description of the get method, see [Items:Get][cws-api-get].

{% endAside %}

[cws-api-get]: /docs/webstore/webstore_api/items/get
[cws-api-insert]: /docs/webstore/webstore_api/items/insert
[cws-api-publish]: /docs/webstore/webstore_api/items/publish
[cws-api-update]: /docs/webstore/webstore_api/items/update
[cws-api]: /docs/webstore/api_index
[cws-dashboard]: https://chrome.google.com/webstore/developer/dashboard
[google-dev-console]: https://console.developers.google.com
[oauth2]: https://developers.google.com/accounts/docs/OAuth2
[privacy]: /docs/webstore/cws-dashboard-privacy/
[review-process]: /docs/webstore/review-process/
[store-listing]: /docs/webstore/cws-dashboard-listing/
[two-factor]: https://support.google.com/accounts/answer/185839?hl=en&ref_topic=2954345
[version]: /docs/extensions/mv3/manifest/version/
