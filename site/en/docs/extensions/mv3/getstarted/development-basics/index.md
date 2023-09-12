---
layout: 'layouts/doc-post.njk'
title: 'Development basics'
seoTitle: 'Chrome Extension development basics'
subhead: 'Learn the basics of Chrome extension development.'
description: 'What to expect during the development of a Chrome extension.'
date: 2022-10-04
# updated: 2022-06-13
---

## Overview {: #overview }

This page describes the extension development workflow. We will create a "Hello, Extensions"
example, load the extension locally, locate logs, and explore other recommendations.

## Hello Extensions {: #build }

This extension will display “Hello Extensions” when the user clicks on the extension toolbar icon.

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/xjKRmWMgwMm7Kdf72bkj.png", 
alt="Hello extension", width="206", height="130", class="screenshot" %}
  <figcaption>
  Hello Extension popup
  </figcaption>
</figure>

Start by creating a new directory to store extension files. If you prefer, you can download the full
source code from [GitHub][sample-hello-world].

Next, create a new file in this directory called `manifest.json` and add the following code:

```json
{
  "manifest_version": 3,
  "name": "Hello Extensions",
  "description": "Base Level Extension",
  "version": "1.0",
  "action": {
    "default_popup": "hello.html",
    "default_icon": "hello_extensions.png"
  }
}
```

This JSON object describes the extension's capabilities and configuration. For example, the `"action"` key 
declares the image Chrome should use as the extension's action icon and the HTML page to show in a popup when the extension's action icon is clicked. [Download the icon][hello-icon] to your directory, and be sure to change its name to match what's in the `"default_icon"` key. 

For the popup, create a file named `hello.html`, and add the following code:

``` html
<html>
  <body>
    <h1>Hello Extensions</h1>
  </body>
</html>
```

The extension now displays a popup when the extension's action icon (toolbar icon) is clicked. Let's test
it in Chrome by loading it locally. Ensure all files are saved.

## Loading an unpacked extension {: #load-unpacked }

To load an unpacked extension in developer mode:

1. Go to the Extensions page by entering `chrome://extensions` in a new tab. (By design `chrome://` URLs are not linkable.)
    - Alternatively, click on the Extensions menu puzzle button and select **Manage Extensions** at the bottom of the menu.
    - Or, click the Chrome menu, hover over **More Tools,** then select **Extensions**.
2. Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
3. Click the **Load unpacked** button and select the extension directory.
    <figure>
    {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/BzVElZpUtNE4dueVPSp3.png", alt="Extensions page", 
    width="400", height="183",  class="screenshot" %}

      <figcaption>
      Extensions page (chrome://extensions)
      </figcaption>
    </figure>

Ta-da! The extension has been successfully installed. If no extension icons were included in
the manifest, a generic icon will be created for the extension.

## Pinning the extension {: #pin }

By default, when you load your extension locally, it will appear in the extensions menu {% Img
src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/f5i7AgfauCfoQJxnn3kU.png", alt="Puzzle", width="24",
height="24" %}. Pin your extension to the toolbar to quickly access your extension during
development.

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/LahIugYHQW3QpHM0z1qZ.png", 
alt="Pinning the extension", width="358", height="248", class="screenshot" %}
  <figcaption>
  Pinning the extension
  </figcaption>
</figure>

Click on the extension’s action icon (toolbar icon); you should see a popup.

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/xjKRmWMgwMm7Kdf72bkj.png", 
alt="hello world extension", width="206", height="130", class="screenshot" %}
  <figcaption>
  Hello World extension
  </figcaption>
</figure>

## Reloading the extension {: #reload }

Let’s go back to the code and change the name of the extension to "Hello Extensions of the world!" in the manifest.

```json
{
  "manifest_version": 3,
  "name": "Hello Extensions of the world!",
  ...
}
```

After saving the file, to see this change in the browser you also have to refresh the extension. Go
to the Extensions page and click the refresh icon next to the **on/off** toggle:

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/4Ph3qL9aUyswxmhauRFB.png", alt="Reload an extension", width="500", height="544", class="screenshot" %}

{% Details %}
{% DetailsSummary %}
💡 **Do I always have to refresh the extension to see my changes?**
{% endDetailsSummary %}

Not all components need to be reloaded to see changes made, as shown in the following table:

| Extension component        | Requires extension reload |
|----------------------------|:-------------------------:|
| The manifest               |            Yes            |
| Service worker             |            Yes            |
| Content Scripts            | Yes (plus the host page)  |
| The popup                  |            No             |
| Options page               |            No             |
| Other extension HTML pages |            No             |

{% endDetails %}

## Finding console logs and errors {: #logs }

### Console logs {: #console }

During development, you can debug your code by accessing the browser console logs. In this case, we
will locate the logs for the popup. Start by adding a script tag to `hello.html`.

```html
<html>
  <body>
    <h1>Hello Extensions</h1>
    <script src="popup.js"></script>
  </body>
</html>
```

Create a `popup.js` file and add the following code:

```js
console.log("This is a popup!")
```

To see this message logged in the Console:

  1. Open the popup.
  2. Right-click on the popup.
  3. Select **Inspect**. 
      <figure> 
      {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/vHGHW1o4J0kZgUkAteRQ.png", 
      alt="Inspecting the popup.", width="322", height="262", class="screenshot" %}
        <figcaption>
        Inspecting a popup. 
        </figcaption>
      </figure>
  4. In the [DevTools][dev-tools], navigate to the **Console** panel.
    <figure>
    {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/1ZrcBEYcbMxW1c9UvBy9.png", 
    alt="DevTools Code Panel", width="400", height="374", class="screenshot" %}
      <figcaption>
      Inspecting a popup 
      </figcaption>
    </figure>   

### Error logs {: #errors }

Now let's break the extension. We can do so by removing the closing quote in `popup.js`:

```js
console.log("This is a popup!) // ❌ broken code
```

Go to the Extensions page and open the popup. An **Errors** button will appear.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/a9lAHCJZZrebOSKrkPRD.png", 
alt="Extensions page with error button", width="300", height="226", class="screenshot" %}

Click the **Errors** button to learn more about the error:

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/GrorLyaC6nRAyqc1qULC.png", 
alt="Extension error details", width="400", height="281", class="screenshot" %}

To learn more about debugging the service worker, options page, and content scripts, see [Debugging
extensions][doc-debug].

## Structuring an extension project {: #structure }

There are many ways to structure an extension project; however, you must place the
manifest.json file in the extension's **root directory**. The following is a structure example:

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/hjccQNanPjTDpIajkhPU.png", alt="The contents of an extension folder: manifest.json, background.js, scripts folder, popup folder, and images folder.", width="700", height="468" %}

## Using TypeScript {: #types }

If you are developing using a [code editor][mdn-ide] such as VSCode or Atom, you can use the npm
package [chrome-types][npm-chrome-types] to take advantage of auto-completion for the [Chrome
API][doc-apis]. This npm package is updated automatically when the Chromium source code
changes.

{% Aside  'important' %}

Update this npm package frequently to work with the latest Chromium version.

{% endAside %}

## 🚀 Ready to start building? {: #building }

Choose any of the following tutorials to begin your extension learning journey. 

| Extension                        | What you will learn                                                     |
|----------------------------------|-------------------------------------------------------------------------|
| [Reading time][tut-reading-time] | To insert an element on every page automatically.                       |
| [Focus Mode][tut-focus-mode]     | To run code on the current page after clicking on the extension action. |
| [Tabs Manager][tut-tabs-manager] | To create a popup that manages browser tabs.                            |

As a bonus, these tutorials were designed to improve your experience when reading the Chrome
extension and Chrome Web store documentation:

- Reading time adds the expected reading time to each documentation articles.
- Focus mode changes the style of the page to help you concentrate on the documentation content.
- Tabs manager allows you to organize your extension documentation tabs.


[api-action]: /docs/extensions/reference/action/
[dev-tools]: /docs/devtools
[doc-apis]: /docs/extensions/reference/
[doc-debug]: /docs/extensions/mv3/tut_debugging/
[hello-icon]: https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/gmKIT88Ha1z8VBMJFOOH.png
[mdn-ide]: https://developer.mozilla.org/docs/Glossary/IDE
[npm-chrome-types]: https://www.npmjs.com/package/chrome-types
[sample-hello-world]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.hello-world
[tut-focus-mode]: /docs/extensions/mv3/getstarted/tut-focus-mode
[tut-reading-time]: /docs/extensions/mv3/getstarted/tut-reading-time
[tut-tabs-manager]: /docs/extensions/mv3/getstarted/tut-tabs-manager
