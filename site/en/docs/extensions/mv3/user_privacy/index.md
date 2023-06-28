---
layout: "layouts/doc-post.njk"
title: "Protect user privacy"
seoTitle: "Chrome Extensions: Protect user privacy"
date: 2018-03-18
updated: 2023-06-07
description: Guidelines for ensuring that your Chrome Extension protects user privacy.
---

Users will not install an extension if it compromises their privacy or asks for more permissions that it seems to need. Permission requests should make sense to users and be limited to the critical information necessary to implement the extension. Extensions that collect or transmit any user data must comply with the policies under [Protecting User Privacy][user-privacy].

Protect and respect extension users by including these precautions to keep their identity safe.

{% Aside %}
Remember: the less data an extension can access, the less data it can accidentally leak.
{% endAside %}

## Reduce required permissions {: #required_permissions }

The APIs that an extension can access are specified in the `permissions` field of the [manifest][manifest]. The more permissions granted, the more avenues an attacker has to intercept information. Only the APIs an extension depends on should be listed, and consideration should be given to less invasive options. The less permissions an extension requests, the less permission warnings will be shown to a user. Users are more likely to install an extension with limited warnings.

Extensions should not "future proof" access to user data by requesting permissions that they do not currently need, but may implement in the future. Include new permissions with extension updates and consider making them [optional][sec-optional-perms].

### activeTab {: #activeTab }

Extensions using host permissions to inject scripts can often substitute [`activeTab`][activetab] instead. The `activeTab` permission will grant an extension temporary access to the currently active tab, only when the user _invokes_ the extension. Access is cut off when the user navigates away from or closes the current tab. It serves as an alternative for many uses of `<all_urls>`.

```json/4
{
  "name": "Very Secure Extension",
  "version": "1.0",
  "description": "Example of a Secure Extension",
  "permissions": ["activeTab"],
  "manifest_version": 3
}
```

The activeTab permission displays no warning messages during installation.

## Opt for optional permissions {: #optional_permissions }

Empower users to choose which features and permissions they need from an extension by including [optional permissions][optional-perms]. If a feature is not essential to the core functionality of an extension, make it optional and move the API or domain into the `optional_permissions` field.

```json/3
{
  "name": "Very Secure Extension",
  ...
  "optional_permissions": [ "tabs", ],
  "optional_host_permissions": ["https://www.google.com/" ],
  ...
}
```

Including optional permissions allows an extension to explain why it needs a particular permission
when the user enables the relevant feature. The extension can offer the user an option to enable
features.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/5hIYQFOiYTl4EwyaYMLx.png",
       alt="A screenshot of a popup asking to enable permissions", height="248", width="258" %}

Clicking **Okay!** will trigger the following event in the service worker.

```js
chrome.action.onClicked.addListener((event) => {
  // Permissions must be requested from inside a user gesture, like a button's
  // click handler.
  chrome.permissions.request(
    {
      permissions: ["tabs", "scripting"],
      origins: ['https://www.google.com/']
    },
    function (granted) {
      // The callback argument will be true if the user granted the permissions.
      if (granted) {
        // doSomething();
      } else {
        // doSomethingElse();
      }
    }
  );
});
```

The user will then be prompted with the following request.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/HPfMXx3PsqYcdFjlZ2iz.png",
       alt="A screenshot of optional permissions request.", height="323", width="800" %}

Optional permissions can also be implemented in an extension update. Doing so will make the new
feature available to users without disabling the extension, as may happen if updating with new
required permissions.

## Limit and secure user information {: #data_collection }

Only request the [minimum amount of data][perms] an extension needs. The less information an extension asks from a user means less exposure if the extension is compromised.

All requested user data should be treated with care. Store and retrieve data in a secure server with
a registered domain. Always use HTTPS to connect and avoid keeping sensitive user data in the client
side of an extension as extension storage is not encrypted.

## Saving data and incognito mode {: #data-incognito }

Extensions can save data using the [storage][api-storage] API, or by making server requests that
result in saving data. When the extension needs to save something, first consider if it's from an
incognito window. By default, extensions don't run in incognito windows.

_Incognito mode_ promises that the window will leave no tracks. When dealing with data from
incognito windows, extensions should honor this promise. If an extension normally saves browsing
history, don't save history from incognito windows. However, extensions can store setting
preferences from any window, incognito or not.

To detect whether a window is in incognito mode, check the `incognito` property of the relevant
[`tabs.Tab`][api-tab] or [`windows.Window`][api-window] object.

```js
function saveTabData(tab) {
  if (tab.incognito) {
    return;
  } else {
    chrome.storage.local.set({data: tab.url});
  }
}
```

[activetab]: /docs/extensions/mv3/manifest/activeTab
[api-storage]: /docs/extensions/reference/storage
[api-tab]: /docs/extensions/reference/tabs/#type-Tab
[api-window]: /docs/extensions/reference/windows/#type-Window
[handling-reqs]: /docs/webstore/program-policies/data-handling/
[limited-use]: /docs/webstore/program-policies/limited-use/
[manifest]: /docs/extensions/mv3/manifest
[optional-perms]: /docs/extensions/reference/permissions#manifest
[perms]: /docs/webstore/program-policies/permissions/
[sec-optional-perms]: #optional_permissions
[user-privacy]: /docs/webstore/program-policies/#:~:text=protecting%20user%20privacy
