---
layout: 'layouts/doc-post.njk'
title: 'Development basics'
subhead: 'What to expect during the development of a Chrome Extension.'
description: 'What to expect during the development of a Chrome Extension.'
date: 2022-07-15
# updated: 2022-06-13
---

## Overview {: #overview }

This page describes the process of developing an extension. We will create a demo extension, load it locally and share tips that will help improve your chrome extension development experience. 

## Building the extension {: #build }

Let’s create a “Hello, World” extension. It displays a “Hello, world!” heading on an extension popup.

If you prefer, you can download the files on Github.

Create a directory to store the extension files. Next, add a file called `manifest.json` and include the following code:

{% Label %}manifest.js:{% endLabel %}

```json
{
 "name": "Hello Extensions",
 "description": "Base Level Extension",
 "version": "1.0",
 "manifest_version": 3
}
```

Every extension requires a manifest; above, we defined the extension’s metadata. This extension will only have a popup. Let’s declare it under the [action][api-action] key:

{% Label %}manifest.js:{% endLabel %}

```json
{
 ...
 "action": {
   "default_popup": "hello.html"
 }
}
```

Create a file titled `hello.html`, and add the following code:

{% Label %}hello.html{% endLabel %}

``` html
<html>
 <body>
   <h1>Hello Extensions</h1>
 </body>
</html>
```

The extension now displays `hello.html` when the extension action is clicked. Let’s test it on Chrome by loading it locally.

## Loading your unpacked extension {: #load-unpacked }

To load an unpacked extension in developer mode, follow these steps:

1. Go to the Extension Management page by navigating to `chrome://extensions`.
    * Alternatively, click on the Extensions menu puzzle button and select **Manage Extensions** at the bottom of the menu.
    * Or, click on the Chrome menu, hovering over **More Tools,** then select **Extensions**.
2. Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
3. Click the **Load unpacked** button and select the extension directory.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/vOu7iPbaapkALed96rzN.png", alt="Loading an unpacked extension", width="563", height="355" %}

Ta-da! The extension has been successfully installed. Because no icons were included in the manifest, a generic icon will be created for the extension.


## Pinning your extension {: #pin }

By default, when you load your extension locally, it will appear in the extensions menu (the puzzle piece). To access your extension quickly during development, pin your extension to the toolbar.

<!-- TODO Screenshot -->

Now when you click on the extension’s action (toolbar icon), you should see a popup.

<!-- TODO Screenshot -->

## Reloading your extension {: #reload }

Let’s go back to the code and change the `H1` element in your HTML file.

{% Label %}hello.html{% endLabel %}

```html
<html>
 <body>
   <h1>Hello Extensions of the world! 👋</h1>
 </body>
</html>
```

After saving the file, go to the extension management page. You can see your changes made by clicking on the refresh icon next to the **on/off** toggle:

<!-- SCREENSHOT HERE -->

Remember every time you make any changes, refresh your extension!

## Finding console and error logs {: #logs}

During development, you may want to debug your scripts by accessing the browser console logs. Let’s start by adding a script tag to the hello.html.

{% Label %}hello.html{% endLabel %}

```html
<html>
 <head>
 <script src="popup.js"></script>
 </head>
 <body>
   <h1>Hello Extensions of the world</h1>
 </body>
</html>
```

Create a `popup.js` file and add a console.log():

{% Label %}popup.js{% endLabel %}

```js
console.log("This is a popup!")
```

Refresh the extension. Open the popup and right-click to inspect the popup. You should see the log.

<!-- SCREENSHOT HERE -->

To learn how to debug other extension components like the service worker, option pages, and content scripts, check out [Debugging extensions][doc-debug].

## Structuring your project {: #structure }

There are many ways to structure an extension project, however, you should always place the manifest.json file in the root of the project. Here’s a structure example:


```text
└── my extension/
    ├── manifest.json
    ├── background.js
    ├── scripts/
    │   └── content.js
    │   └── jquery-min.js
    ├── popup/
    │   └── popup.html
    │   └── popup.js
    │   └── popup.css
    └── images/
        ├── icon-16.png
        ├── icon-32.png
        ├── icon-48.png
        └── icon-128.png
```

## Using Typescript {: #types }

If you are developing using an [IDE][mdn-ide] like VSCode, Atom, Sublime, etc... you can use the npm package [chrome-types][npm-chrome-types] to take advantage of autocompletion for the [Chrome API][doc-apis]. This npm package is published automatically and is updated when the Chromium source changes.

Make sure you upgrade this npm package to the latest version frequently.

## Ready to start building? {: #building }

Choose any of the following step-by-step beginner tutorials to begin your Chrome extension development journey. 

| Extension                        | What you will learn                                                    |
|----------------------------------|------------------------------------------------------------------------|
| [Reading time][tut-reading-time] | To insert an element on every page automatically.                      |
| [Focus Mode][tut-focus-mode]     | To run code on the current page when clicking on the extension action. |
| [Tabs Manager][tut-tabs-man]     | To create a popup that manages browser tabs.                           |

As a bonus, these tutorials were designed to improve your experience when reading the Chrome Extension and Chrome Web store documentation.


[api-action]: /docs/extensions/reference/action/
[doc-apis]: /docs/extensions/reference/
[doc-debug]: /docs/extensions/mv3/tut_debugging/
[mdn-ide]: https://developer.mozilla.org/docs/Glossary/IDE
[npm-chrome-types]: https://www.npmjs.com/package/chrome-types