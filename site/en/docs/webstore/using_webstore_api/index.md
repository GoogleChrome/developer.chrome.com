---
layout: "layouts/doc-post.njk"
title: "Using the Chrome Web Store Publish API"
#date: TODO
updated: 2021-12-21
description: How to programmatically create, update, and publish items in the Chrome Web Store.
---

## Overview {: #overview }

The Chrome Web Store Publish API provides a set of REST endpoints for programmatically creating,
updating, and publishing items in the Chrome Web Store. Use this API to automate the process
of uploading and publishing items into the store.

## Before you begin {: #beforeyoubegin }

Take the following steps to use the Chrome Web Store Publish API:

**Enable the Chrome Web Store API**.

1. Go to the [Google Cloud Console][google-dev-console].
2. Create a new project or select an existing one.
3. In the **search bar** type in “Chrome Web Store API”.
4. Enable the **Chrome Web Store API**.

**Customize a consent screen**.

1. Go to **Credentials**.
2. Click on **Configure consent screen**
3. Select **External** > **Create**
4. Fill out the **App information** required fields > **Save and Continue**
    - App name.
    - User Support email.
    - Developer contact email.
5. Skip Scopes, click **Save** > **Continue**.
6. Add your email to **Test users**, then **Save** > **Continue**

**Get the access keys**.

1. Go to **Credentials**.
2. Click **Create Credentials** > **OAuth client ID**.
4. For **Application type**, choose **Desktop App**.
5. Fill out the name, then click **Create**

The console will provide the client ID and client secret. You can retrieve an access token to work with the API. For example, enter this URL in your browser, replacing the $CLIENT_ID with the one for your app:


```text
https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&client_id=$CLIENT_ID&redirect_uri=urn:ietf:wg:oauth:2.0:oob
```

You will see a page asking you to accept permission for the requested scope.

{% Aside %}

Make sure you are requesting the token using the Google developer Account which owns the Chrome Web
Store items you want to manage. This account can be different from the account you created the Google
Developers Console project. For example, you can create an application for other developers to
manage their apps, in which case you only need to register a Google Developers Console project.

{% endAside %}

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/ZwxRj8SD3Ld40BsjZnsX.png", alt="Permission request UI", width="308", height="249" %}

Click **Accept** and copy the code. It should look something like this:

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/KHtQ9uzphdR4oOsJQLVj.png", alt="UI for copying code", width="348", height="155" %}

Use this value to request an **access token**. For example, using `curl`, you can get an access token by
executing the following command (replacing the values of $CLIENT\_ID, $CLIENT_SECRET, and \$CODE
with the values from above):

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

For more information about getting OAuth 2.0 access tokens, see [Using OAuth 2.0 to Access
Google APIs][oauth2].

{% endAside %}

## Using the API {: #usingtheapi }

Once you have an access token, your app can then use the Chrome Web Store Publish API. There are
endpoints for creating items, updating items, and publishing items.

{% Aside 'gotchas' %}

After creating your item for the first time, you must fill out the [Store Listing][store-listing] and [Privacy practices][privacy] in the [Chrome Web Store Developer
Dashboard.][cws-dashboard].

More detail about the Web
Store API can be found [here][cws-api].

{% endAside %}

### Uploading a package to create a new store item {: #uploadnew }

```text
Endpoint: https://www.googleapis.com/upload/chromewebstore/v1.1/items
Type: POST
Header Parameters: $TOKEN: the access token
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
Endpoint: https://www.googleapis.com/upload/chromewebstore/v1.1/items/$APP_ID
Type: PUT
Header Parameters: $TOKEN: the access token
Body content: the package file to upload
```

\$APP_ID is the ID of the existing Web Store item.

```bash
> curl \
-H "Authorization: Bearer $TOKEN"  \
-H "x-goog-api-version: 2" \
-X PUT \
-T $FILE_NAME \
-v \
https://www.googleapis.com/upload/chromewebstore/v1.1/items/$APP_ID
```

{% Aside %}

For a full description of the update method, see [Items:Update][cws-api-update].

{% endAside %}

### Publishing an item to the public {: #publishpublic }

```text
Endpoint: https://www.googleapis.com/chromewebstore/v1.1/items/$APP_ID/publish
Type: POST
Header Parameters: $TOKEN: the access token
```

```bash
> curl \
-H "Authorization: Bearer $TOKEN"  \
-H "x-goog-api-version: 2" \
-H "Content-Length: 0" \
-X POST \
-v \
https://www.googleapis.com/chromewebstore/v1.1/items/$APP_ID/publish
```

{% Aside %}

For a full description of publish method, see [Items:Publish][cws-api-publish].

{% endAside %}

### Publishing an item to trusted testers {: #trustedtesters }

```text
Endpoint: https://www.googleapis.com/chromewebstore/v1.1/items/$APP_ID/publish?publishTarget=trustedTesters
Type: POST
Header Parameters: $TOKEN: the access token
```

```bash
> curl \
-H "Authorization: Bearer $TOKEN"  \
-H "x-goog-api-version: 2" \
-H "Content-Length: 0" \
-X POST \
-v \
https://www.googleapis.com/chromewebstore/v1.1/items/$APP_ID/publish?publishTarget=trustedTesters
```

{% Aside %}

For a full description of the publish method, see [Items:Publish][cws-api-publish].

{% endAside %}


### Checking the upload status of an item {: #checkstatus }

```text
Endpoint: https://www.googleapis.com/chromewebstore/v1.1/items/$APP_ID?projection=draft
Type: GET
Header Parameters: $TOKEN: the access token
```

```bash
curl \
-H "Authorization: Bearer $TOKEN"  \
-H "x-goog-api-version: 2" \
-H "Content-Length: 0" \
-H "Expect:" \
-X GET \
-v \
https://www.googleapis.com/chromewebstore/v1.1/items/$APP_ID?projection=draft
```

{% Aside %}

Only "DRAFT" is supported at this time. For a full description of the get method, see [Items:Get][cws-api-get].

{% endAside %}

[google-dev-console]: https://console.developers.google.com
[oauth2]: https://developers.google.com/accounts/docs/OAuth2
[cws-dashboard]: https://chrome.google.com/webstore/developer/dashboard
[cws-api]: /docs/webstore/api_index
[cws-api-insert]: /docs/webstore/webstore_api/items/insert
[cws-api-update]: /docs/webstore/webstore_api/items/update
[cws-api-publish]: /docs/webstore/webstore_api/items/publish
[cws-api-get]: /docs/webstore/webstore_api/items/get
[store-listing]: /docs/webstore/cws-dashboard-listing/
[privacy]: /docs/webstore/cws-dashboard-privacy/
