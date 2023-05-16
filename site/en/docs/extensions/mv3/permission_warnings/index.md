---
layout: 'layouts/doc-post.njk'
title: 'Permission warning guidelines'
seoTitle: 'Declare permissions and warn users in Chrome extensions'
date: 2012-09-18
updated: 2023-05-19
description: >
  How permission warnings work in Chrome extensions.
anchorRedirects:
  activeTab_permission: /docs/extensions/mv3/manifest/activeTab/,
  optional_events: /docs/extensions/reference/permissions#step-2-declare-optional-permissions-in-the-manifest,
  declare_manifest: /docs/extensions/mv3/declare_permissions#manifest
  required_permissions: /docs/extensions/mv3/declare_permissions#best-practices
  understanding_permissions: /docs/extensions/mv3/declare_permissions
---

## Overview {: overview }

Chrome extensions enhance the user's browser experience. To do this extensions use [Chrome APIs][chrome-apis] that require certain permissions. Some permissions are less intrusive and do not display a warning. Other permissions trigger a warning that users have to allow. When a new permission that [triggers a warning](#permissions_with_warnings) is added, the extension will be disabled until the user accepts the new permission. Learn more about [Updating permissions](#update_permissions).

## Best practices {: #best-practices }

Permission warnings exist to describe the capabilities granted by an API, but some warnings can be harder to understand than others. Users are more likely to install an extension that follows these best practices:

Limit permissions to support core functionality
: Extensions are required to fulfill a [single purpose](www.tba.com). Request only the permissions that support the extension's main functionality. This also allows your extension to comply with the [Use of permissions][cws-perms] policy.

Use optional permissions to offer additional features
: Declaring optional permissions improves the user onboarding experience by explaining why a particular permission is required. It also allows users to further customize their experience. See [Permissions API][api-optional-perms] for instructions on implementing optional permissions.

Use the `"activeTab"` permission
: This permission does **_not_** display a permission warning. It grants temporary host permission to the site the user is on. For more details, see [Understanding the activeTab permission][doc-activetab].

## Viewing warnings {: #view_warnings }

During development, when you [load an extension locally][doc-load-unpacked], no permission warnings are displayed. To view an extension's permission warnings, you have the following options:

{% Details 'open' %}
{% DetailsSummary %}

### Use the {: #view-library }

{% endDetailsSummary %}

The blah blah allows developers to

{% endDetails %}

{% Details 'open' %}
{% DetailsSummary %}

### Pack your extension {: #view-packing }

{% endDetailsSummary %}

Navigate to `chrome://extensions`, ensure developer mode is enabled
and click **PACK EXTENSION**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Jvm8mGpe3j0j0aydcRnR.png",
       alt="Developer Mode is Checked then Click Pack Extension", height="120", width="642" %}

Specify the path to the extension's folder in the Extension root directory field then click the
**Pack Extension** button. Ignore the **Private key** field for a first-time package.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/vVw89rdJOdXFYxvgM9Sj.png",
       alt="Specify Extension Path then Click Pack Extension", height="307", width="524" %}

Chrome will create two files, a `.crx` file and a `.pem` file. The `.pem` file contain the private key used to sign the extension.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/GLrVd51VTUF86K8gUxu8.png",
       alt="Packaged Extension Files", height="288", width="521" %}

**Do not lose the private key!** Keep the `.pem` file in a secret and secure place; it will be
needed to [update](#update_permissions) the extension.

Install the `.crx` file by dropping it into the Chrome Extension's Management page.

<figure>
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/KXm9vTnv5VRNZJ9e2AJt.png",
       alt="Drop File to Install", height="420", width="427" %}
  <figcaption>
    Drop file to install
  </figcaption>
</figure>

After dropping the `.crx` file the browser will ask if the extension can be added and display
warnings.

<figure>
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/4vOB4X8ZNbdk321eAzKS.png",
       alt="Warning for New Tab Extension", height="150", width="481" %}
  <figcaption>
    Warning for New Tab extension
  </figcaption>
</figure>

{% endDetails %}

## Updating permissions {: #update_permissions }

When an extension updates an extension that includes a new permission that [triggers a warning][section-warnings] it may temporarily disable it. The user will have to
re-enable it after agreeing to any new warnings.

If the user manually updates an extension that now includes the [tabs][api-tabs] permission, they will get
a warning on the management page.

<figure>
{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/usZSh31pGiJxhhuKmM8B.png",
  alt="Extension has been disabled", height="398", width="297" %}
  
  <figcaption>
    Disabled extension warning
  </figcaption>
</figure>

<figure>
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ZxRaaibQJSuZ6MZBvmmo.png",
       alt="Agree to permissions", height="159", width="286" %}
  <figcaption>
    Requesting new permission dialog
  </figcaption>
</figure>

To check if your extension will be disabled, you have the following options:


{% Details 'open' %}
{% DetailsSummary %}

### Use the {: #view-library }

{% endDetailsSummary %}

The blah blah allows developers to

{% endDetails %}


{% Details 'open' %}
{% DetailsSummary %}

### Pack your extension {: #view-packing }

{% endDetailsSummary %}

Navigate to `chrome://extensions`, ensure developer mode is enabled
and click **PACK EXTENSION**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Jvm8mGpe3j0j0aydcRnR.png",
       alt="Developer Mode is Checked then Click Pack Extension", height="120", width="642" %}

Specify the path to the extension's folder in the Extension root directory field then click the
**Pack Extension** button. Ignore the **Private key** field for a first-time package.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/vVw89rdJOdXFYxvgM9Sj.png",
       alt="Specify Extension Path then Click Pack Extension", height="307", width="524" %}

Chrome will create two files, a `.crx` file and a `.pem` file. The `.pem` file contain the private key used to sign the extension.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/GLrVd51VTUF86K8gUxu8.png",
       alt="Packaged Extension Files", height="288", width="521" %}

**Do not lose the private key!** Keep the `.pem` file in a secret and secure place; it will be
needed to [update](#update_permissions) the extension.

Install the `.crx` file by dropping it into the Chrome Extension's Management page.

<figure>
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/KXm9vTnv5VRNZJ9e2AJt.png",
       alt="Drop File to Install", height="420", width="427" %}
  <figcaption>
    Drop file to install
  </figcaption>
</figure>

After dropping the `.crx` file the browser will ask if the extension can be added and display
warnings.

<figure>
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/4vOB4X8ZNbdk321eAzKS.png",
       alt="Warning for New Tab Extension", height="150", width="481" %}
  <figcaption>
    Warning for New Tab extension
  </figcaption>
</figure>

{% endDetails %}



## Permissions warnings list {: #permissions_with_warnings }

Some permissions may not display warnings when paired
with other permissions. For example, the `"tabs"` warning will not show if the extension also
requests `"<all_urls>"`.

The permissions warning table is updated on a best-effort basis and may contain slight discrepancies
with the [current warnings][chromium-perms]. To verify the most recent warnings shown for extension permissions, follow
the steps in [Viewing Warnings](#view_warnings).

<table>
  <tbody>
    <tr>
      <th>Permission</th>
      <th>Description</th>
      <th>Warning</th>
    </tr>
    <tr id="match_patterns">
      <td>
        <ul>
          <li><code>"http://*/*"</code></li>
          <li><code>"https://*/*"</code></li>
          <li><code>"*://*/*"</code></li>
          <li><code>"&lt;all_urls&gt;"</code></li>
        </ul>
      </td>
      <td>Grants access to all hosts. Consider using
        the <a href="/docs/extensions/mv3/manifest/activeTab/">activeTab</a> permission instead.</td>
      <td><strong>Read and change all your data on all websites</strong></td>
    </tr>
    <tr id="host">
      <td><code>"https://HostName.com/"</code></td>
      <td>Grants access to <code>"https://HostName.com/"</code>. Consider using the <a href="/docs/extensions/mv3/manifest/activeTab/">activeTab</a> permission instead.</td>
      <td><strong>Read and change your data on <code>HostName.com</code></strong></td>
    </tr>
    <tr id="accessibilityFeatures.modify">
      <td><code>"accessibilityFeatures.modify"</code></td>
      <td>Allows the extension to modify individual accessibility feature states. See the <a href="/docs/extensions/reference/accessibilityFeatures/">chrome.accessibilityFeatures</a> API for details.</td>
      <td><strong>Change your accessibility settings</strong></td>
    </tr>
    <tr id="accessibilityFeatures.read">
      <td><code>"accessibilityFeatures.read"</code></td>
      <td>Allows the extension to read individual accessibility feature states. See the <a href="/docs/extensions/reference/accessibilityFeatures/">chrome.accessibilityFeatures</a> API for details.</td>
      <td><strong>Read your accessibility settings</strong></td>
    </tr>
    <tr id="bookmarks">
      <td><code>"bookmarks"</code></td>
      <td>Grants access to the <a href="/docs/extensions/reference/bookmarks">chrome.bookmarks</a> API.</td>
      <td><strong>Read and change your bookmarks</strong></td>
    </tr>
    <tr id="clipboardRead">
      <td><code>"clipboardRead"</code></td>
      <td>Required if the extension uses <code>document.execCommand('paste')</code>.</td>
      <td><strong>Read data you copy and paste</strong></td>
    </tr>
    <tr id="clipboardWrite">
      <td><code>"clipboardWrite"</code></td>
      <td>Indicates the extension uses <code>document.execCommand('copy')</code> or
        <code>document.execCommand('cut')</code>.</td>
      <td><strong>Modify data you copy and paste</strong></td>
    </tr>
    <tr id="contentSettings">
      <td><code>"contentSettings"</code></td>
      <td>Grants access to the <a href="/docs/extensions/reference/contentSettings">chrome.contentSettings</a> API.</td>
      <td><strong>Change your settings that control websites' access to features such as cookies, JavaScript, plugins,
          geolocation, microphone, camera etc.</strong></td>
    </tr>
    <tr id="debugger">
      <td><code>"debugger"</code></td>
      <td>Grants access to the <a href="/docs/extensions/reference/debugger">chrome.debugger</a> API.</td>
      <td>
        <ul>
          <li><strong>Access the page debugger backend</strong></li>
          <li><strong>Read and change all your data on all websites</strong></li>
        </ul>
      </td>
    </tr>
    <tr id="declarativeNetRequest">
      <td><code>"declarativeNetRequest"</code></td>
      <td>Grants access to the <a href="/docs/extensions/reference/declarativeNetRequest">chrome.declarativeNetRequest</a> API.</td>
      <td><strong>Block content on any page</strong></td>
    </tr>
    <tr id="declarativeNetRequestFeedback">
      <td><code>"declarativeNetRequestFeedback"</code></td>
      <td>Grants access to functions and events which return information on declarative rules matched. See the <a href="/docs/extensions/reference/declarativeNetRequest">chrome.declarativeNetRequest</a> API for details.</td>
      <td><strong>Read your browsing history</strong></td>
    </tr>
    <tr id="desktopCapture">
      <td><code>"desktopCapture"</code></td>
      <td>Grants access to the <a href="/docs/extensions/reference/desktopCapture">chrome.desktopCapture</a> API.</td>
      <td><strong>Capture content of your screen</strong></td>
    </tr>
    <tr id="downloads">
      <td><code>"downloads"</code></td>
      <td>Grants access to the <a href="/docs/extensions/reference/downloads">chrome.downloads</a> API.</td>
      <td><strong>Manage your downloads</strong></td>
    </tr>
    <tr id="favicon">
      <td><code>"favicon"</code></td>
      <td>Allows the extension to use the Favicon API.</td>
      <td><strong>Read the icons of the websites you visit</strong></td>
    </tr>
    <tr id="geolocation">
      <td><code>"geolocation"</code></td>
      <td>Allows the extension to use the HTML5 <a href="https://dev.w3.org/geo/api/spec-source.html">geolocation API</a>
        without prompting the user for permission.</td>
      <td><strong>Detect your physical location</strong></td>
    </tr>
    <tr id="history">
      <td><code>"history"</code></td>
      <td>Grants access to the <a href="/docs/extensions/reference/history">chrome.history</a> API.</td>
      <td><strong>Read and change your browsing history</strong></td>
    </tr>
    <tr id="identity.email">
      <td><code>"identity.email"</code></td>
      <td> Grants access to the email address through the <a href="/docs/extensions/reference/identity">chrome.identity</a> API.</td>
      <td><strong>Know your email address</strong></td>
    </tr>
    <tr id="management">
      <td><code>"management"</code></td>
      <td>Grants access to the <a href="/docs/extensions/reference/management">chrome.management</a> API.</td>
      <td><strong>Manage your apps, extensions, and themes</strong></td>
    </tr>
    <tr id="nativeMessaging">
      <td><code>"nativeMessaging"</code></td>
      <td>Grants access to the <a href="/docs/extensions/mv3/messaging#native-messaging">native messaging API</a>.</td>
      <td><strong>Communicate with cooperating native applications</strong></td>
    </tr>
    <tr id="notifications">
      <td><code>"notifications"</code></td>
      <td>Grants access to the <a href="/docs/extensions/reference/notifications">chrome.notifications</a> API.</td>
      <td><strong>Display notifications</strong></td>
    </tr>
    <tr id="pageCapture">
      <td><code>"pageCapture"</code></td>
      <td>Grants access to the <a href="/docs/extensions/reference/pageCapture">chrome.pageCapture</a> API.</td>
      <td><strong>Read and change all your data on all websites</strong></td>
    </tr>
    <tr id="privacy">
      <td><code>"privacy"</code></td>
      <td>Grants access to the <a href="/docs/extensions/reference/privacy">chrome.privacy</a> API.</td>
      <td><strong>Change your privacy-related settings</strong></td>
    </tr>
    <tr id="proxy">
      <td><code>"proxy"</code></td>
      <td>Grants access to the <a href="/docs/extensions/reference/proxy">chrome.proxy</a> API.</td>
      <td><strong>Read and change all your data on all websites</strong></td>
    </tr>
    <tr id="system.storage">
      <td><code>"system.storage"</code></td>
      <td>Grants access to the <a href="/docs/extensions/reference/system.storage">chrome.system.storage</a> API.</td>
      <td><strong>Identify and eject storage devices</strong></td>
    </tr>
    <tr id="tabCapture">
      <td><code>"tabCapture"</code></td>
      <td>Grants the extensions access to the <a href="/docs/extensions/reference/tabCapture">chrome.tabCapture</a> API.</td>
      <td><strong>Read and change all your data on all websites</strong></td>
    </tr>
    <tr id="tabGroups">
      <td><code>"tabGroups"</code></td>
      <td>Grants access to the <a href="/docs/extensions/reference/tabGroups">chrome.tabGroups</a> API.</td>
      <td><strong>View and manage your tab groups</strong></td>
    </tr>
    <tr id="tabs">
      <td><code>"tabs"</code></td>
      <td>Grants access to privileged fields of the <a
          href="/extensions/tabs#type-Tab"><code>Tab</code></a> objects used by several APIs
        including <a href="/docs/extensions/reference/tabs/#perms">chrome.tabs</a> and <a href="/docs/extensions/reference/windows">chrome.windows</a>.</td>
      <td><strong>Read your browsing history</strong></td>
    </tr>
    <tr id="topSites">
      <td><code>"topSites"</code></td>
      <td>Grants access to the <a href="/docs/extensions/reference/topSites">chrome.topSites</a> API.</td>
      <td><strong>Read a list of your most frequently visited websites</strong></td>
    </tr>
    <tr id="ttsEngine">
      <td><code>"ttsEngine"</code></td>
      <td>Grants access to the <a href="/docs/extensions/reference/ttsEngine">chrome.ttsEngine</a> API.</td>
      <td><strong>Read all text spoken using synthesized speech</strong></td>
    </tr>
    <tr id="webNavigation">
      <td><code>"webNavigation"</code></td>
      <td>Grants access to the <a href="/docs/extensions/reference/webNavigation">chrome.webNavigation</a> API.</td>
      <td><strong>Read your browsing history</strong></td>
    </tr>
  </tbody>
</table>

## Allowing access {: #allow_access }

If your extension needs to access `file://` URLs or operate in incognito mode, you will need to show your users how to enable access for those features inside the extension's detail page at chrome://extensions.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/CXSHPxG4giUkzfGR67mY.png",
       alt="Allow file URLs and incognito mode on the extension detail page", height="137", width="674" %}

You can detect if the user has enabled incognito mode by calling
[`extension.isAllowedIncognitoAccess()`][incognito-allow] or able run on `file://` URLs with
[`extension.isAllowedFileSchemeAccess()`][file-scheme-allow].

[api-optional-perms]: /docs/extensions/reference/permissions#step-2-declare-optional-permissions-in-the-manifest
[api-storage]: /docs/extensions/reference/storage
[api-tabs]: /docs/extensions/reference/tabs
[api-top-sites]: /docs/extensions/reference/topSites
[chromium-perms]: https://chromium.googlesource.com/chromium/src/+/main/chrome/common/extensions/permissions/chrome_permission_message_rules.cc#:~:text=chromepermissionmessagerule%3A%3Agetallrules()
[chromium-perms]: https://chromium.googlesource.com/chromium/src/+/main/chrome/common/extensions/permissions/chrome_permission_message_rules.cc#:~:text=chromepermissionmessagerule%3A%3Agetallrules()
[cws-perm]: /docs/webstore/program-policies/permissions/
[doc-activetab]: /docs/extensions/mv3/manifest/activeTab/
[doc-apis]: /docs/extensions/reference/
[doc-load-unpacked]: /docs/extensions/mv3/getstarted/development-basics/#load-unpacked
[doc-manifest]: /docs/extensions/mv3/manifest
[doc-match-patterns]: /docs/extensions/mv3/match_patterns
[doc-perms]: /docs/extensions/mv3/declare_permissions
[file-scheme-allow]: /docs/extensions/reference/extension#method-isAllowedFileSchemeAccess
[gh-opt-perms]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/examples/optional-permissions
[incognito-allow]: /docs/extensions/reference/extension#method-isAllowedIncognitoAccess
[section-update]: #update_permissions
[section-view-warnings]: #view_warnings
[section-warnings]: #permissions_with_warnings
[cws-perm]: /docs/webstore/program-policies/permissions/
[doc-activetab]: /docs/extensions/mv3/manifest/activeTab/
