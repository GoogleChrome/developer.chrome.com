---
layout: "layouts/doc-post.njk"
title: "What are extensions?"
date: 2013-02-21
updated: 2018-02-25
description: An overview of the purpose of Chrome Extensions and how they're developed.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

Extensions are small software programs that customize the browsing experience. They enable users to
tailor Chrome functionality and behavior to individual needs or preferences. They are built on web
technologies such as HTML, JavaScript, and CSS.

An extension must fulfill a [single purpose][1] that is narrowly defined and easy to understand. A
single extension can include multiple components and a range of functionality, as long as everything
contributes towards a common purpose.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/bk1NEBu7WXWCXfNJCsms.png",
       alt="A screenshot of an extension's icon in the browser bar", height="35", width="91" %}

User interfaces should be minimal and have intent. They can range from a simple icon, such as the [Google
Mail Checker extension][2] shown above, to [overriding][3] an entire page.

Extension files are zipped into a single `.crx` package that the user downloads and installs. This
means extensions do not depend on content from the web, unlike ordinary web apps.

Extensions are distributed through the [Chrome Developer Dashboard][4] and published to the [Chrome
Web Store][5]. For more information, see the [store developer documentation][6].

## Hello extensions {: #hello-extensions }

Take a small step into extensions with this quick Hello Extensions example. Start by creating a new
directory to store the extension's files, or download them from the [sample page][7].

Next, add a file called `manifest.json` and include the following code:

```json
{
  "name": "Hello Extensions",
  "description" : "Base Level Extension",
  "version": "1.0",
  "manifest_version": 2
}
```

Every extension requires a manifest, though most extensions will not do much with just the manifest.
For this quick start, the extension has a popup file and icon declared under the
[`browser_action`][8] field:

```json/5-8
{
  "name": "Hello Extensions",
  "description" : "Base Level Extension",
  "version": "1.0",
  "manifest_version": 2,
  "browser_action": {
    "default_popup": "hello.html",
    "default_icon": "hello_extensions.png"
  }
}
```

Download [`hello_extensions.png` here][9] and then create a file titled `hello.html`:

```html
<html>
  <body>
    <h1>Hello Extensions</h1>
  </body>
</html>
```

The extension now displays `hello.html` when the icon is clicked. The next step is to include a
command in the `manifest.json` that enables a keyboard shortcut. This step is fun, but not
necessary:

```json/9-17
{
  "name": "Hello Extensions",
  "description" : "Base Level Extension",
  "version": "1.0",
  "manifest_version": 2,
  "browser_action": {
    "default_popup": "hello.html",
    "default_icon": "hello_extensions.png"
  },
  "commands": {
    "_execute_browser_action": {
      "suggested_key": {
        "default": "Ctrl+Shift+F",
        "mac": "MacCtrl+Shift+F"
      },
      "description": "Opens hello.html"
    }
  }
}
```

The last step is to install the extension on your local machine.

1.  Navigate to `chrome://extensions` in your browser. You can also access this page by clicking on
    the Chrome menu on the top right side of the Omnibox, hovering over **More Tools** and selecting
    **Extensions**.
2.  Check the box next to **Developer Mode**.
3.  Click **Load Unpacked Extension** and select the directory for your "Hello Extensions"
    extension.

Congratulations! You can now use your popup-based extension by clicking the `hello_world.png` icon
or by pressing `Ctrl+Shift+F` on your keyboard.

## What next? {: #How-do-I-start }

1.  Follow the [Getting Started tutorial][10]
2.  Read the [Overview][11]
3.  Keep up to date by reading the [Chromium blog][12]
4.  Subscribe to the [chromium-extensions group][13]

[1]: /docs/extensions/mv2/single_purpose
[2]: /docs/extensions/mv2/samples#google-mail-checker
[3]: /docs/extensions/mv2/override
[4]: https://chrome.google.com/webstore/developer/dashboard
[5]: https://chrome.google.com/webstore
[6]: /docs/webstore
[7]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/mv2-archive/tutorials/hello_extensions
[8]: /docs/extensions/reference/browserAction
[9]: https://storage.googleapis.com/chrome-gcs-uploader.appspot.com/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/gmKIT88Ha1z8VBMJFOOH.png
[10]: /docs/extensions/mv2/getstarted
[11]: /docs/extensions/mv2/overview
[12]: https://blog.chromium.org/
[13]: https://groups.google.com/a/chromium.org/group/chromium-extensions
