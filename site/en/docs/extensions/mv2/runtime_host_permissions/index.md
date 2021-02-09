---
layout: "layouts/doc-post.njk"
title: "User controls for host permissions: transition guide"
date: 2018-10-01
updated: 2020-04-27
description: >
  Guidelines for updating your Extensions to handle the runtime host
  permission changes starting in Chrome 70.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

## Summary {: #summary }

### What's changing? {: #changes }

Beginning in Chrome 70, users have the ability to restrict extension host access to a custom list of
sites, or to configure extensions to require a click to gain access to the current page.

### Which APIs are affected? {: #affected-apis }

This change affects any APIs that are affected by the host permissions specified in your extension's
manifest, as well as content scripts. APIs that require host permissions include [webRequest][1],
[cookies][2], [tabs.executeScript()][3] and [tabs.insertCSS()][4], and performing cross-origin
requests, such as through an `XMLHTTPRequest` or the `fetch()` API.

## Restricting access {: #restricting-access }

### How can the user restrict access? {: #user-restricting-access }

Users can choose to allow your extension to run on click, on a specific set of sites, or on all
requested sites. These options are presented to users on the `chrome://extensions` page as well as
in the extension context menu.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/JSg4nkfMPMfNHum95Otu.png",
       alt="A screenshot of the context menu controls for runtime host permissions,
            including options to run the extension on click, on a specific site, or on all sites.",
       height="346", width="800" %}

### What happens if a user chooses to run my extension "on click"? {: #access-on-click }

The extension essentially behaves as though it used the [activeTab][5] permission. The extension is
granted temporary access to any host the user clicks the extension on, if that host was requested by
the extension (and isn't a restricted site, like chrome://settings). When set to run on click,
Chrome badges your extension with a circle and drop shadow (see below) to indicate that is
requesting access on a particular site.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/FsV4PT4vR8SXb96CLrNc.png",
       alt="A screenshot of the badging Chrome adds to the extension icon in the toolbar", height="174", width="484" %}

### What happens if a user chooses to run my extension on specific sites? {: #access-on-specific-sites }

Your extension is allowed to run automatically on any sites the user has chosen, and can access the
site without further user action. On other sites that your extension requested, but the user did not
grant permission to, the behavior is the same as if the user had set the extension to run on click.

### What happens if a user chooses to run my extension on all sites? {: #access-on-all-sites }

The extension can automatically access any sites requested in the manifest.

## API behaviors {: #api-behaviors }

### Web request API {: #web-request-behavior }

The extension can still intercept, modify, and block any requests from sites it has access to. For
sites the extension does not have access to, Chrome badges the extension to indicate that the
extension requests access to the page. The user can then grant access to the extension; Chrome then
prompts the user to refresh the page to allow your extension to intercept the network requests.

### Content scripts, tabs.executeScript(), tabs.insertCSS() {: #scripts-behavior }

The extension can still inject scripts and style sheets automatically for any sites it has access
to. For sites the extension does not have access to, Chrome badges the extension to indicate that
the extension requests access to the page. The user can then grant access to the extension. If the
content script was set to inject at document_idle, the script will inject immediately. Otherwise,
Chrome prompts the user to refresh the page to allow your extension to inject scripts earlier in
page load (at document_start or document_end). The callbacks for the [tabs.executeScript()][6] and
[tabs.insertCSS()][7] methods are only invoked if the user grants access to the site.

### Cookies and background page XHR {: #background-behavior }

The extension can still read and modify any cookies from and perform a cross-origin XHR to sites it
has access to. Because there is no tab associated with an extension page accessing another origin's
cookies or XHRing to another host, Chrome does not badge the extension to indicate to the user that
the extension is requesting to access a site. Trying to access a cookie for another site or make a
cross-origin XHR will fail with an error as if the extension's manifest did not include the host
permission. For these cases, we encourage you to use optional permissions in order to allow the user
to grant runtime access to different sites.

The example below illustrates how this may work for the cookies API.

Before:

```json
{
  ...
  "permissions": ["cookies", "https://example.com"]
}
```

```js
chrome.cookies.get({url: 'https://example.com', name: 'mycookie'},
                    function(cookie) {
                      // Use the cookie.
                    });
```

After:

```json
{
  ...
  "permissions": ["cookies"],
  "optional_permissions": ["https://example.com"]
}
```

```js
// Note: permissions.request() requires a user gesture, so this
// may only be done in response to a user action.
chrome.permissions.request(
    {origins: ['https://example.com']},
    function(granted) {
      if (granted) {
        chrome.cookies.get({url: 'https://example.com', name: 'mycookie'},
                            function(cookie) {
                              // Use the cookie.
                            });
      } else {
        // Handle grant failure
      }
    });
```

## Migration {: #migration }

### What are best practices to avoid being negatively impacted? {: #best-practices }

Extensions can use the [optional permissions][8], [activeTab][9], and [declarativeContent][10] APIs
to follow best practices. Optional permissions are granted at runtime, and allow the extension to
request specific access to a site. The [activeTab][11] permission is not affected, and extensions
using it continue to work normally. The [declarativeContent][12] API is a substitute for many needs
to inject scripts into every page.

### What happens to my current users' settings? {: #current-settings }

This change will not immediately affect any current permissions granted to your extension. That is,
it will continue to operate as before unless the user takes action to restrict the sites it is
allowed to access. In future releases, Chrome will provide more controls to users to adjust
settings.

### How can I check if my extension has permission to run on a site? {: #checking-access }

You can use the [permissions.contains()][13] API in order to check whether your extension has been
granted access to a given origin.

[1]: /webRequest
[2]: /cookies
[3]: /tabs#method-executeScript
[4]: /tabs#method-insertCSS
[5]: /activeTab
[6]: /tabs#method-executeScript
[7]: /tabs#method-insertCSS
[8]: /permissions
[9]: /activeTab
[10]: /declarativeContent
[11]: /activeTab
[12]: /declarativeContent
[13]: /permissions/#method-contains
