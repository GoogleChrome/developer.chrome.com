---
layout: "layouts/doc-post.njk"
title: "OAuth2: Authenticate users with Google"
date: 2012-09-18
updated: 2018-05-01
description: >
  Step-by-step instructions on how to build an extension that accesses
  a user's Google contacts via the Google People API, the Chrome Identity API,
  and OAuth2.
---

{% include 'partials/extensions/mv2page-in-mv3.md' %}

[OAuth2][1] is the industry-standard protocol for authorization. It provides a mechanism for users
to grant web and desktop applications access to private information without sharing their username,
password and other private credentials.

This tutorial builds an extension that accesses a user's Google contacts using the [Google People
API][2] and the [Chrome Identity API][3]. Because extensions don't load over HTTPS, can't perform
redirects or set cookies, they rely on the Chrome Identity API to use OAuth2.

## Get started {: #set_up }

Begin by creating a directory and the following starter files.

The full, completed extension can be downloaded [here][4].

### manifest.json {: #manifest }

Add the manifest by creating a file called `manifest.json` and include the following code. Or
download the file [here][5].

```json
{
  "name": "OAuth Tutorial FriendBlock",
  "version": "1.0",
  "description": "Uses OAuth to connect to Google's People API and display contacts photos.",
  "manifest_version": 2,
  "browser_action": {
    "default_title": "FriendBlock, friends face's in a block."
  },
  "background": {
    "scripts": [
      "background.js"
    ],
    "persistent": false
  }
}
```

### background.js {: #background }

Add the background script by creating a file called `background.js` and include the following code.
Or download the file [here][6].

```js
chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.create({url: 'index.html'});
});
```

### index.html {: #index }

Add an HTML file called `index.html` and include the following code. Or download the file [here][7].

```html
<html>
  <head>
    <title>FriendBlock</title>
    <style>
      button {
        padding: 10px;
        background-color: #3C79F8;
        display: inline-block;
      }
    </style>
  </head>
  <body>
    <button>FriendBlock Contacts</button>
    <div id="friendDiv"></div>
  </body>
</html>
```

## Upload to the developer dashboard {: #upload_to_dashboard }

Package the extension directory into a `.zip` file and upload it to the [Chrome Developer
Dashboard][8] without publishing it:

1.  At the Developer Dashboard, click **Add new item**.
2.  Click **Choose file** and select the `.zip` extension directory and upload it.
3.  Without filling in additional fields, select **Save Draft and return to dashboard**.

Find the extension under **Your Listings** and click on **more info**. From the popup, copy the
public key and add it to the manifest inside the unzipped directory under the [`"key"`][9] field.

```json
{
  "name": "OAuth Tutorial FaceBlcok",
...
  "key": "ThisKeyIsGoingToBeVeryLong/go8GGC2u3UD9WI3MkmBgyiDPP2OreImEQhPvwpliioUMJmERZK3zPAx72z8MDvGp7Fx7ZlzuZpL4yyp4zXBI+MUhFGoqEh32oYnm4qkS4JpjWva5Ktn4YpAWxd4pSCVs8I4MZms20+yx5OlnlmWQEwQiiIwPPwG1e1jRw0Ak5duPpE3uysVGZXkGhC5FyOFM+oVXwc1kMqrrKnQiMJ3lgh59LjkX4z1cDNX3MomyUMJ+I+DaWC2VdHggB74BNANSd+zkPQeNKg3o7FetlDJya1bk8ofdNBARxHFMBtMXu/ONfCT3Q2kCY9gZDRktmNRiHG/1cXhkIcN1RWrbsCkwIDAQAB"
}
```

## Compare IDs {: #extension_management }

Open the Extensions Management page at `chrome://extensions`, ensure developer mode is enabled and
upload the unpackaged extension directory. Compare the extension ID on the extensions management
page to the Item ID in the Developer Dashboard. They should match.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/n6jGhPAAxEjOweiTePjP.png",
       alt="The ID of the extension matches in all places", height="438", width="567" %}

The extension will maintain the same ID by including the `"key"` field in the manifest. Preserving a
single ID is essential for API registration.

## Create OAuth client ID {: #oauth_client }

Navigate to the [Google API console][10] and create a new project. Once ready, select
**Credentials** in the sidebar, click **Create credentials** and choose **OAuth client ID**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/iC6LC1PYreTxndYmLEWN.png",
       alt="Create credentials for extension", height="478", width="800" %}

On the Create client ID page, select **Chrome App**. Fill out the name of the extension and place
the extension ID at the end of the URL in the Application ID field.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/CwgbnssSgeRtqHGxRbpd.png",
       alt="Fill out extension information", height="366", width="800" %}

Finish by clicking create. The console will provide an OAuth client ID.

## Register OAuth in manifest {: #oauth_registration }

Include the `"oauth2"` field in the extension manifest. Place the generated OAuth client ID under
`"client_id"`. Include an empty string in `"scopes"` for now.

```json
{
  "name": "OAuth Tutorial FriendBlock",
  ...
  "oauth2": {
    "client_id": "yourExtensionOAuthClientIDWillGoHere.apps.googleusercontent.com",
    "scopes":[""]
  },
  ...
}
```

## Initiate first OAuth flow {: #identity_permission }

Register the [`identity`][11] permission in the manifest.

```json
{
  "name": "OAuth Tutorial FaceBlcok",
  ...
  "permissions": [
    "identity"
  ],
  ...
}
```

Create a file to manage the OAuth flow called `oauth.js` and include the following code. Or download
it [here][12].

```js
window.onload = function() {
  document.querySelector('button').addEventListener('click', function() {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      console.log(token);
    });
  });
};
```

Place a script tag for `oauth.js` in the head of `index.html`.

```html
...
  <head>
    <title>FriendBlock</title>
    ...
    <script type="text/javascript" src="oauth.js"></script>
  </head>
...
```

Reload the extension and click on the browser icon to open `index.html`. Open the console and click
on the "FriendBlock Contacts" button. An OAuth token will appear in the console.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/aXVIN7YRfBnDc3ItHVJ2.png",
       alt="View the token in the console", height="227", width="800" %}

## Enable the Google People API {: #enable_people }

Return to the Google API console and select **Library** from the sidebar. Search for "Google People
API", click on the correct result and enable it.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/AQbJX735qIGEJUephhXf.png",
       alt="Enable the People API", height="319", width="693" %}

Add the [Google People API][13] client library to `"scopes"` in the extension manifest.

```json
{
  "name": "OAuth Tutorial FaceBlcok",
  ...
  "oauth2": {
    "client_id": "yourExtensionOAuthClientIDWillGoHere.apps.googleusercontent.com",
    "scopes": [
      "https://www.googleapis.com/auth/contacts.readonly"
    ]
  },
  ...
}
```

Return to the Google API console and navigate back to credentials. Click "Create credentials" and
select "API key" from the dropdown.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/c8Fpzw5f3fihBgx1RbIr.png",
       alt="Create People API credentials", height="369", width="699" %}

Keep the generated API key for later use.

## Create first API request {: #create_call }

Now that the extension has proper permissions, credentials, and can authorize a Google user, it can
request data through the People API. Update the code in `oauth.js` to match below.

```js
window.onload = function() {
  document.querySelector('button').addEventListener('click', function() {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      let init = {
        method: 'GET',
        async: true,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        'contentType': 'json'
      };
      fetch(
          'https://people.googleapis.com/v1/contactGroups/all?maxMembers=20&key=<API_Key_Here>',
          init)
          .then((response) => response.json())
          .then(function(data) {
            console.log(data)
          });
    });
  });
};
```

Replace `<API_Key_Here>` with the API key generated from the Google API console. The extension
should log a JSON object that includes an array of `people/account_id`s under the
`memberResourceNames` field.

## Block faces {: #block_faces }

Now that the extension is returning a list of the user's contacts, it can make additional requests
to [retrieve those contact's profiles and information][14] . The extension will use the
`memberResourceNames` to retrieve the photo information of user contacts. Update `oauth.js` to
include the following code.

```js/22
window.onload = function() {
  document.querySelector('button').addEventListener('click', function() {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      let init = {
        method: 'GET',
        async: true,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        'contentType': 'json'
      };
      fetch(
          'https://people.googleapis.com/v1/contactGroups/all?maxMembers=20&key=<API_Key_Here>',
          init)
          .then((response) => response.json())
          .then(function(data) {
            let photoDiv = document.querySelector('#friendDiv');
            let returnedContacts = data.memberResourceNames;
            for (let i = 0; i < returnedContacts.length; i++) {
              fetch(
                  'https://people.googleapis.com/v1/' + returnedContacts[i] +
                      '?personFields=photos&key=<API_Key_Here>',
                  init)
                  .then((response) => response.json())
                  .then(function(data) {
                    let profileImg = document.createElement('img');
                    profileImg.src = data.photos[0].url;
                    photoDiv.appendChild(profileImg);
                  });
            };
          });
    });
  });
};
```

Reload and return to the extension. Click the FriendBlock button and ta-da! Enjoy contact's faces in
a block.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/EQkrpv2o5kKIWPYHVhXn.png", 
       alt="Contact faces in a block", height="359", width="397" %}

[1]: https://oauth.net/2/
[2]: https://developers.google.com/people/
[3]: /identity
[4]: examples/tutorials/oauth_tutorial_complete.zip
[5]: examples/tutorials/oauth_starter/manifest.json
[6]: examples/tutorials/oauth_starter/background.js
[7]: examples/tutorials/oauth_starter/index.html
[8]: https://chrome.google.com/webstore/developer/dashboard
[9]: /key
[10]: https://console.developers.google.com/apis
[11]: /identity
[12]: examples/tutorials/oauth_starter/oauth.js
[13]: https://developers.google.com/people/
[14]: https://developers.google.com/people/v1/read-people
