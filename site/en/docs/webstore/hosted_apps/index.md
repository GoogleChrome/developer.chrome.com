---
layout: "layouts/doc-post.njk"
title: "Hosted Apps"
#date: TODO
#updated: TODO
description: How to create a hosted app.
---

Read this page to learn how to create and load a **hosted app**—a regular web app, plus some
metadata.

If you're interested in creating a **packaged app**—a web app that's bundled up as an extension, so
that the user downloads all of its content—see [Packaged Apps][1] in the [extensions
documentation][2].

## Creating hosted apps {: #creating }

A hosted app requires a _`.crx` file_ that contains metadata describing the app. (The `.crx` file
format is just a variation of ZIP that's used by Google Chrome.) An app's `.crx` file can be hosted
on your own server or, more typically, by the Chrome Web Store.

The `.crx` file for a hosted app must contain an icon and a manifest that has details about how the
app should function.

{% Aside %}

**Note:** Unlike extensions and packaged apps, a hosted app has no access to the files inside its
`.crx` file.

{% endAside %}

### Making a web app installable {: #live }

You can easily make any existing web app installable, letting you publish it as a hosted app.
There's no need to rewrite the web app or change technologies. All you need to provide are an icon
and a manifest.

Here is a typical manifest for a hosted app:

```json
{
  "name": "Google Mail",
  "description": "Read your gmail",
  "version": "1",
  "app": {
    "urls": [
      "*://mail.google.com/mail/",
      "*://www.google.com/mail/"
    ],
    "launch": {
      "web_url": "http://mail.google.com/mail/"
    }
  },
  "icons": {
    "128": "icon_128.png"
  },
  "permissions": [
    "unlimitedStorage",
    "notifications"
  ]
}
```

This manifest and the icon it points to (`icon_128.png`) make the Google Mail web app installable as
a hosted app. When someone installs this app, the specified icon appears on Chrome's New Tab page.
Clicking that icon launches the app by bringing up the page specified by the "web_url" field.

The "permissions" field lets you specify HTML5 permissions that the app requires. By specifying
"unlimitedStorage" and "notifications", this app is able to use those HTML5 features without having
to repeatedly ask the user for permission. During app installation, the user is told which
permissions the app needs; installing the app implicitly grants those permissions for all pages
whose URLs match those in the "apps" field of the manifest.

### Details: The manifest {: #manifest }

The manifest is a file named `manifest.json` that can have the following fields:


name:

: _Required._ The name of the application. This is displayed in the store and in Chrome's launcher.

description:

: _Recommended._ A brief description of the app.

version:

: _Required._ The version of this metadata. Each time you update the metadata this number must be
 incremented. Up to four dot-separated integers are allowed.

app:

: _Required._ The URLs that the app uses, including the _launch page_ for the app—the page that the
  browser goes to when the user clicks the app's icon in the New Tab page. If your hosted app is
  listed in the Chrome Web Store, you must prove that you control each domain specified in this field.
  For help in proving your ownership, see the [Chrome Developer Dashboard][3].

app.urls: <!-- TODO: remark doesn't like nested dl, so we denest it -->

: The URLs for the pages in the hosted app, not necessarily including the launch page. Once the app is
  installed, these pages and the launch page have the permissions requested in the manifest.

  {% Aside %}
  **Note:** You don't need to specify the URLs for included files or for assets such as images.
  {% endAside %}

  Each URL must begin with `http`, `https`, or `*` (which matches both `http` and `https`). You can
  use wildcards for subdomains—for example, "\*://\*.example.com/".

  {% Aside 'caution' %}

  **Important:** _Do not_ put port numbers in the value of "urls". Port numbers aren't necessary there
  (all ports are valid), and values with port numbers are silently ignored, leaving the corresponding
  pages without the requested permissions.

  {% endAside %}

  You need to specify only the start of the app's URLs. For example,
  "https://www.google.com/accounts/" matches every URL that starts with that string, such as
  https://www.google.com/accounts/ and https://www.google.com/accounts/b/0/ManageAccount.

  {% Aside 'caution' %}

  **Important:** If you provide multiple apps, **avoid overlapping URLs**. If a user tries to install
  an app whose "web_url" or "urls" values overlap with those of an already installed app, the second
  installation will fail due to URL conflict errors. For example, an app that specifies a "urls" value
  of "http://mail.example.com/" would conflict with an app that specifies
  "http://mail.example.com/mail/".

  {% endAside %}

  If the user downloads the app's `.crx` file from a server that's not the Chrome Web Store, only one
  domain is allowed, and it must be the same as the domain that serves the `.crx` file. For more
  information on hosting options, see the extensions documentation for [Hosting][4].

app.launch:

: _Required._ Specifies what happens when the user launches the app.

web_url:

: _Required._ Specifies the launch page as an absolute URL.

container:

: The value "panel" makes the app appear in an app panel. By default, or when you specify "tab", the
  app appears in a tab.

height:

: If the container is set to "panel", this integer specifies the height of the panel in pixels. For
  example, you might specify `"height":400`. Note that you don't use quotation marks in the value.
  This field specifies the height of the area to display contents in; window decorations add a few
  more pixels to the total height. If the container isn't a panel, this field is ignored.

width:

: Similar to "height", but specifies the width of the panel.

background_page:

: Specifies an HTTPS URL to load in a background window. If you use this, you must also specify the
  "background" permission.

icons:

: _Recommended._ Specifies the icon shown in the launcher.

128:

: The 128x128 icon shown in the app launcher. Only about a 96x96 area should be visible; the rest
  should be transparent. For details, see the Chrome Web Store [image guidelines][5].

key:

: The public key value for your app. Usually, you don't need to specify this field; it's set
  automatically when the `.crx` file is created, such as when you upload your app to the Chrome Web
  Store. For more information, see [Packaging][6] and [key field details][7] in the extensions
  documentation.

minimum_chrome_version:

: The version of Chrome that your app requires.

offline_enabled:

: Whether the app is expected to work offline. When Chrome detects that it is offline, apps with this
  field set to true are highlighted on the New Tab page. For help on enabling offline access for your
  app, see [these articles][8].

  {% Aside %}

  **Version note:** Before Chrome 15, this flag is valid but ignored.

  {% endAside %}

permissions:

: Any combination of "[background][9]", "clipboardRead", "clipboardWrite", "geolocation",
  "notifications", and "unlimitedStorage".

update_url:

: The URL of the XML file used to autoupdate your app. Don't specify this field unless you host your
  own autoupdates. See [Autoupdating][10] for details.

The format of the app manifest file is based on the manifest files for Chrome extensions, and most
of the fields are the same. For more details on manifest files and their fields, see the [extension
manifest documentation][11].

## Loading hosted apps {: #installing }

The following instructions tell you how to load an installable web app that isn't yet packaged in a
`.crx` file—a handy technique while you're working on an app.

1.  Create a folder (you might name it `maps_app`) and put the following files into it:

    - [manifest.json][12]
    - [128.png][13]

    You've just created the metadata for a hosted app. Now you can load the app.

2.  In Chrome, bring up the extensions management page by clicking the wrench icon and choosing
    **Tools > Extensions**.
3.  If **Developer mode** has a + by it, click the +.  
    The + changes to a -, and more buttons and information appear.
4.  Click the **Load unpacked extension** button.  
    A file dialog appears.
5.  In the file dialog, navigate to the folder where you put the app's files, and click **OK**.  
    You've now installed the app.
6.  Create a new tab.  
    The icon for the newly installed app appears in Chrome's launcher on the New Tab page.
7.  Click the icon for the app.  
    You've now launched the app.

For a full tutorial on converting your existing web app into a hosted app (and publishing it), see
the Chrome Web Store [Getting Started tutorial][14].

## Hosted apps and the Chrome Web Store {: #webstore }

The [Chrome Web Store][15] is an open marketplace for web apps that enables you to reach millions of
users with your apps. The store is integrated with Chrome, making it easy for Chrome users to
discover apps and install them directly from the store. For details, see the developer documentation
for the store, especially the [Overview][16] and [Getting Started tutorial][17].

[1]: /docs/extensions/mv2/apps/
[2]: /docs/extensions/
[3]: https://chrome.google.com/webstore/devconsole
[4]: /docs/extensions/mv2/hosting
[5]: /webstore/images
[6]: /docs/extensions/mv2/packaging
[7]: /docs/extensions/mv2/manifest/key
[8]: http://www.html5rocks.com/en/tutorials/#offline
[9]: /docs/extensions/mv2/declare_permissions#background
[10]: /docs/extensions/mv2/autoupdate
[11]: /docs/extensions/mv2/manifest
[12]:
  http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/extensions/maps_app/manifest.json?content-type=text/plain
[13]:
  http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/extensions/maps_app/128.png
[14]: get_started_simple
[15]: http://chrome.google.com/webstore
[16]: /docs/webstore/
[17]: /docs/webstore/get_started_simple
