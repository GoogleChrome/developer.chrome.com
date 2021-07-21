---
layout: "layouts/doc-post.njk"
title: "Using the Chrome Web Store Publish API"
#date: TODO
#updated: TODO
description: How to programmatically create, update, and publish items in the Chrome Web Store.
---

## Overview {: #overview }

The Chrome Web Store Publish API provides a set of REST endpoints for programmatically creating,
updating, and publishing items in the Chrome Web Store. Using this API, you can automate the process
of uploading and publishing items into the store.

## Before you begin {: #beforeyoubegin }

To use the Chrome Web Store Publish API, you need to enable the API for your project in the [Google
Developers Console][1].

1.  Visit the [Google Developers Console][1].
2.  Create a new project or select an existing one.
3.  In the sidebar on the left, select **APIs & auth**.
4.  In the displayed list of available APIs, set the status of the Chrome Web Store API to **ON**.
5.  Accept the Terms of Service.
6.  In the sidebar on the left, select **Credentials**.
7.  Find the lines labeled **Client ID** and **Client secret**. Note that there may be a client ID
    without a client secret for use with Compute Engine and App Engine. In that case, create a new
    client ID and client secret.
8.  To create the client ID and client secret, click on **CREATE CREDENTIALS**, select **OAuth client ID** and select **Desktop app** under **Application type**.
9.  Get an access token:

Once you have the client ID and client secret, you can retrieve an access token to work with the
API. For example, enter this URL in your browser, replacing the \$CLIENT_ID with the one for your
app:

```text
https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&client_id=$CLIENT_ID&redirect_uri=urn:ietf:wg:oauth:2.0:oob
```

You will see a page asking you to accept permission for the requested scope.

{% Aside %}

**Note**: Make sure you are requesting the token using the Google Account which owns the Chrome Web
Store apps you want to manage. This account can be different from the account you create the Google
Developers Console project with. For example, you can create an application for other developers to
manage their apps, in which case you only need to register a Google Developers Console project.

{% endAside %}

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/vkcDhH8uyPOODVrKTpKH.png",
       alt="A screenshot of the permission request UI.", height="310", width="481" %}

Click the Accept button and you will see a code that looks something like this:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/oCXSDgT7JuB3yvD8V1CJ.png", alt="A screenshot of the UI for copying code.", height="173", width="414" %}

Use this value to request an access token. For example, using `curl`, you can get an access token by
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
  "token_type" : "Bearer",
  "expires_in" : 3600,
  "refresh_token" : "1/rwn..."
}
```

You can now use the access_token to call the API. You can also use the refresh token to get future
access tokens. Note that tokens expire after 40 minutes.

{% Aside %}

**Note**: For more information about getting OAuth 2.0 access tokens, see [Using OAuth 2.0 to Access
Google APIs][3].

{% endAside %}

## Using the API {: #usingtheapi }

Once you have an access token, your app can then use the Chrome Web Store Publish API. There are
endpoints for creating items, updating items, and publishing items.

{% Aside %}

**Note**: Currently, there is no API for setting an item's metadata, such as description. This has
to be done manually in the [Chrome Web Store Developer Dashboard.][4] More detail about the Web
Store API can be found [here][5].

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

**Note**: For a full description of the insert method, see [Items:Insert][6].

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

**Note**: For a full description of the update method, see [Items:Update][7].

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

**Note**: For a full description of publish method, see [Items:Publish][8].

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

**Note**: For a full description of the publish method, see [Items:Publish][9].

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

**Note**: For a full description of the get method, see [Items:Get][10].

{% endAside %}

[1]: https://console.developers.google.com
[3]: https://developers.google.com/accounts/docs/OAuth2
[4]: https://chrome.google.com/webstore/developer/dashboard
[5]: /docs/webstore/api_index
[6]: /docs/webstore/webstore_api/items/insert
[7]: /docs/webstore/webstore_api/items/update
[8]: /docs/webstore/webstore_api/items/publish
[9]: /docs/webstore/webstore_api/items/publish
[10]: /docs/webstore/webstore_api/items/get
