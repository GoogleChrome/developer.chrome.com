---
layout: "layouts/doc-post.njk"
title: "Protect user privacy"
date: 2018-03-18
updated: 2018-04-26
description: Guidlines for ensuring that your Chrome Extension protects user privacy.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

Users will not install an extension if it compromises their privacy or asks for more permissions
that it seems to need. Permission requests should make sense to users and be limited to the critical
information necessary to implement the extension. Extensions that collect or transmit any user data
must comply with the [user data privacy policies][1] .

Protect and respect extension users by including these precautions to keep their identity safe.
Remember: the less data an extension can access, the less data it can accidentally leak.

## Reduce required permissions {: #required_permissions }

The APIs an extension can access is specified in the permissions field of the [manifest][2]. The
more permissions granted, the more avenues an attacker has to intercept information. Only the APIs
an extension depends on should be listed, and consideration should be given to less invasive
options. The less permissions an extension requests, the less permission warnings will be shown to a
user. Users are more likely to install an extension with limited warnings.

Extensions should not "future proof" access to user data by requesting permissions that they do not
currently need, but may implement in the future. Include new permissions with extension updates and
consider making them [optional][3].

### activeTab {: #activeTab }

Extensions using host permissions to inject scripts can often substitute [`activeTab`][4] instead.
The `activeTab` permission will grant an extension temporary access to the currently active tab,
only when the user _invokes_ the extension. Access is cut off when the user navigates away from or
closes the current tab. It serves as an alternative for many uses of `<all_urls>`.

```json/4
{
  "name": "Very Secure Extension",
  "version": "1.0",
  "description": "Example of a Secure Extension",
  "permissions": ["activeTab"],
  "manifest_version": 2
}
```

The activeTab permission displays no warning messages during installation.

## Opt for optional permissions {: #optional_permissions }

Empower users to choose which features and permissions they need from an extension by including
[optional permissions][5]. If a feature is not essential to the core functionality of an extension,
make it optional and move the API or domain into the `optional_permissions` field.

```json/3
{
  "name": "Very Secure Extension",
  ...
  "optional_permissions": [ "tabs", "https://www.google.com/" ],
  ...
}
```

Including optional permissions allows an extension to explain why it needs a particular permission
when the user enables the relevant feature. The extension can offer the user an option to enable
features.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/5hIYQFOiYTl4EwyaYMLx.png",
       alt="A screenshot of a popup asking to enable permissions", height="248", width="258" %}

Clicking **Okay!** will trigger the following event in the background script.

```js
document.querySelector('#button').addEventListener('click', function(event) {
  // Permissions must be requested from inside a user gesture, like a button's
  // click handler.
  chrome.permissions.request({
    permissions: ['tabs'],
    origins: ['https://www.google.com/']
  }, function(granted) {
    // The callback argument will be true if the user granted the permissions.
    if (granted) {
      // doSomething();
    } else {
      // doSomethingElse();
    }
  });
});
```

The user will then be prompted with the following request.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/HPfMXx3PsqYcdFjlZ2iz.png",
       alt="A screenshot of optional permissions request.", height="323", width="800" %}

Optional permissions can also be implemented in an extension update. Doing so will make the new
feature available to users without disabling the extension, as may happen if updating with new
required permissions.

## Limit and secure user information {: #data_collection }

Only request the minimum [user data][6] an extension needs. The less information an extension asks
from a user means less exposure if the extension is compromised.

All requested user data should be treated with care. Store and retrieve data in a secure server with
a registered domain. Always use HTTPS to connect and avoid keeping sensitive user data in the client
side of an extension as extension storage is not encrypted.

[1]: /docs/webstore/program_policies#userdata
[2]: /docs/extensions/mv2/manifest
[3]: #optional_permissions
[4]: /docs/extensions/mv2/manifest/activeTab
[5]: /docs/extensions/reference/permissions#manifest
[6]: /webstore/user_data
