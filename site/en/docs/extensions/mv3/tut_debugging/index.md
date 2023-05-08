---
layout: "layouts/doc-post.njk"
title: "Debugging extensions"
seoTitle: "Chrome Extensions Tutorial: Debugging extensions"
date: 2012-09-18
updated: 2023-04-28
description: Step-by-step instructions on how to debug Chrome Extensions.
---

## Overview {: #overview }

Extensions can access the same [Chrome DevTools][chrome-devtools] as web pages. To become an expert in debugging extensions, you will need to know how to locate logs and errors of the different extension components. This tutorial provides fundamental techniques to debug your extension.

## Before you begin {: #prereq }

This guide assumes that you have basic web development experience. We recommend checking out
[Development Basics][doc-dev-basics] for an introduction to the extension development workflow and [Architecture overview][doc-arch] to learn about the different extension components.

## Breaking the extension {: #locate_logs }

This tutorial will break one extension component at a time and then demonstrate how to fix it. Remember to undo the bugs we introduce before continuing to the next section. Start by downloading the [Broken Color sample][gh-broken-color] on Github.

### Debug the manifest {: #debug-manifest}
First, let's break the manifest file by changing the `"version"` key to `"versions"`:

{% Label %}manifest.json:{% endLabel %}

```json/3/2
{
  "name": "Broken Background Color",
  "version": "1.0",
  "versions": "1.0",
  "description": "Fix an Extension!",
  ...
}
```

Now let's try [loading the extension locally][dev-basic-unpacked]. You will see a error dialog pointing to the problem: 

```text
Failed to load extension
Required value version is missing or invalid. It must be between 1-4 dot-separated integers each between 0 and 65536.
Could not load manifest.
```

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/acjM7iQ73yXZJO90eeuR.png", alt="An extension with an invalid manifest key triggering an error dialog when attempting to load.", width="500", height="347", class="screenshot" %}
  <figcaption>
    An invalid manifest key error dialog.
  </figcaption>
</figure>

When a manifest key is invalid the extension will fail to load, but Chrome will give you a hint of
how to fix the problem. 

Undo that change and let's enter an invalid permission to see what happens.
Change the `"activeTab"` permission to lowercase `"activetab"`:

{% Label %}manifest.json:{% endLabel %}

```json/3/2
{
  ...
  "permissions": ["activeTab", "scripting", "storage"],
  "permissions": ["activetab", "scripting", "storage"],
  ...
}
```

Save the extension and try loading it again. It should load successfully this time. In the extension
Management page you will see three buttons: **Details**, **Remove** and **Errors**. The **Errors**
button letters will turn red if there's an error. Click on the **Errors** button to see the
following error:

```text
Permission 'activetab' is unknown or URL pattern is malformed.
```

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/Kpp5AWbtXMmTj8AOpMMe.gif", alt="Error button is clicked and displays an error", width="700", height="360" %}
  <figcaption>
    Finding an error message by clicking on the Errors button
  </figcaption>
</figure>

Before moving on, change the permission back, click the **Clear all** button in the upper right-hand corner to clear the logs, and reload the extension.

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/8U43Q83u7Tr8fRR6TFHv.png", alt="Clear all button", width="600", height="574", class="screenshot" %}
  <figcaption>
    How to clear extension errors.
  </figcaption>
</figure>

{% Aside 'important' %}

Using a [manifest schema][manifest-schema] in your code editor is a way to ensure that the manifest has the proper formatting and required fields.

{% endAside %}

### Debug the service worker {: #debug-bg } 

#### Locating logs {: #sw-logs }

The service worker sets the default color to storage and logs it to the console. To view this log, open the Chrome DevTools panel by selecting the blue link next to **Inspect views**.

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/H48asatrNaKDVVBluWTT.png", alt="Opening the DevTools for the extension service worker.", width="650", height="333", class='screenshot' %}
  <figcaption>
    Service worker logs in the Chrome DevTools panel.
  </figcaption>
</figure>

{% Aside 'caution' %}

Inspecting the service worker will keep it **active**. To ensure your extension behaves correctly when your service worker is terminated, remember to close the DevTools. 

{% endAside %}

#### Locating errors {: #sw-errors }

Let's break the service worker by changing `onInstalled` to lowercase `oninstalled`:

{% Label %}service-worker.js:{% endLabel %}

```js/3/2
// There's a typo in the line below;
// ❌ oninstalled should be ✅ onInstalled.
chrome.runtime.onInstalled.addListener(() => {
chrome.runtime.oninstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757' }, () => {
    console.log('The background color is green.');
  });
});
```

Refresh and click the **Errors** button to view the error log. The first error will let you know that the service worker failed to register. This means something went wrong during initiation: 

```text
Service worker registration failed. Status code: 15.
```

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/5Vq0jbo4AGUp1P9MoU3v.png", alt="Service worker registration failed. Status code: 15 error message", width="800", height="418" %}
  <figcaption>
  Service worker registration error message.  
  </figcaption>
</figure>

{% Aside %}

If the service worker fails to register, you will not be able to access the Chrome DevTools until you fix the registration bug. 

{% endAside %}

The actual error comes after:
```text
Uncaught TypeError: Cannot read properties of undefined (reading 'addListener')
```

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/LauDnPFrNyExahWz3RF1.png", alt="Uncaught TypeError: Cannot read properties of undefined error message", width="800", height="528" %}
  <figcaption>
  Uncaught TypeError message.
  </figcaption>
</figure>

Undo the bug we introduced, click the **Clear all** button in the upper right-hand corner, and reload the extension.

#### Check the service worker status {: #sw-status }

You can identify when the service worker wakes up to perform tasks by following these steps:

1. Copy your extension ID located above "Inspect views"
    <figure>
      {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/ISfNxTUOrO6IGEyHt1m0.png", alt="Extension ID in the Extensions Management page", width="459", height="251" %}
      <figcaption>
        Extension ID
      </figcaption>
    </figure>
1. Open your manifest file in the browser. For example:
    ```text
    chrome-extension://YOUR_EXTENSION_ID/manifest.json
    ``` 
1. Inspect the file.
1. Navigate to the **Application** panel.
1. Go to the **Service Workers** pane.

You can start or stop the service worker using the links next to the **Status** to test
your code.

<figure>
    <a href="https://wd.imgix.net/image/BhuKGJaIeLNPW9ehns59NfwqKxF2/i1w015KXe7EzN3chRojv.png"><img src="https://wd.imgix.net/image/BhuKGJaIeLNPW9ehns59NfwqKxF2/i1w015KXe7EzN3chRojv.png?auto=format&w=845" alt="Service worker status in the Application panel"></a>
  <figcaption>
  Service worker status in the Application panel (Click to see enlarged image)
  </figcaption>
</figure>

Also, if you have made changes to the service worker code, you can use the **Update** button and **skipWaiting** to apply the changes immediately.

<figure>
    <a href="https://wd.imgix.net/image/BhuKGJaIeLNPW9ehns59NfwqKxF2/mJISZTRN34bmSbENQpVq.png"><img src="https://wd.imgix.net/image/BhuKGJaIeLNPW9ehns59NfwqKxF2/mJISZTRN34bmSbENQpVq.png?auto=format&w=845" alt="Service worker status in the Application panel"></a>
  <figcaption>
  Refreshing the service worker in the Application panel (Click to see enlarged image)
  </figcaption>
</figure>

{% Aside %}
Note that this will not reload any other extension components.
{% endAside %}

### Debug the popup {: #debug_popup }

Now that the extension initializes correctly, let's break the popup by commenting out the highlighted lines below:

{% Label %}popup.js:{% endLabel %}

```js/5,12
...
changeColorButton.addEventListener('click', (event) => {
  const color = event.target.value;

  // Query the active tab before injecting the content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // Use the Scripting API to execute a script
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      args: [color],
      func: setColor
    });
  });
});
```

Navigate back to the Extensions Management page, the **Errors** button has reappeared. Click it to
view the new log. It will show the following error message:

```text
Uncaught ReferenceError: tabs is not defined
```

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/M9gIgE8AgIIDYkN2BF58.png", 
alt="Extensions Management page displaying popup error", width="800", height="588" %}

You can open the popup's DevTools by inspecting the popup.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/bnigtWyfrWdtIhNnwQ8r.png", 
alt="DevTools displaying popup error.", width="800", height="207" %}

The error, `tabs is undefined`, says the extension doesn't know where to inject the content script.
This can be corrected by calling the [`tabs.query()`][tabs-query] method, then selecting the active tab.

Update the code, click the **Clear all** button in the upper right-hand corner, and then reload the
extension.

{% Aside %}

For other extension pages displayed as a tab, such as [override pages][doc-override] and [full-page options][doc-options],
you can find logs by inspecting the page or on the Extensions Management page.  
  
{% endAside %}

### Debug content scripts {: #debug_cs }

Now let's break the content script by changing the variable "color" to "colors":

{% Label %}content.js:{% endLabel %}

```js/4/5
...
function setColor(color) {
  // There's a typo in the line below;
  // ❌ colors should be ✅ color.
  document.body.style.backgroundColor = color;
  document.body.style.backgroundColor = colors;
}  
```

Refresh the page, open the popup and click the green box. Nothing happens... 

If you go to the Extensions Management page the **Errors** button will not appear. This is because only runtime errors, `console.warning` and, 
`console.error` are recorded on the Extensions Management page.

[Content scripts][doc-cs] run inside a website, so to find these error we must inspect the web page the extension is trying to alter:

```text
Uncaught ReferenceError: colors is not defined
```

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/xdbCjXTm5wWv3Yaa2jM9.png", alt="Extension error displayed in web page console", width="600", height="207", class="screenshot" %}
  <figcaption>
    Extension error displayed in web page console
  </figcaption>
</figure>

To use DevTools from within the content script, click the dropdown arrow next to **top** and select the extension.

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/T3fBKwpznjRBEpXOrkzT.png", alt="Uncaught ReferenceError: colors is not defined", width="600", height="362", class="screenshot"%}
  <figcaption>
    Uncaught ReferenceError: colors is not defined
  </figcaption>
</figure>

The error says `colors` is not defined. The extension must not be passing the variable correctly.
Correct the injected script to pass the color variable into the code.

## Monitor network requests {: #network_requests }

The popup will often make all of the required network requests before even the speediest of
developers can open DevTools. To view these requests, refresh from inside the network panel. It will
reload the popup without closing the DevTools panel.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/x8knWvTA11f4j1wVoNY8.gif",
       alt="Refresh inside the network panel to view popup network requests", height="520", width="566" %}

## Declare permissions {: #declare_permission }

What makes extensions more powerful than a web app is their access to Chrome APIs. Some of the APIs
require permissions. Refer to the [permissions][doc-perms] article and the available [Chrome
APIs][doc-chrome-apis] to ensure an extension is requesting the correct permissions in the [manifest][doc-manifest].

```json/4-6
  {
    "name": "Broken Background Color",
    ...
    "permissions": [
      "activeTab",
      "declarativeContent",
      "storage"
    ],
  ...
  }
```

{% Aside 'important' %}
To make fetch calls to an external server, you must declare the URL as a [host permission][doc-match-patt].  
{% endAside %}

## Further reading {: #next }

Learn more about [Chrome Devtools][chrome-devtools] by reading the documentation.

[api-cookies]: /docs/extensions/reference/cookies
[api-storage]: /docs/extensions/reference/storage
[api-tabs]: /docs/extensions/reference/tabs
[chrome-devtools]: https://developers.google.com/web/tools/chrome-devtools/
[dev-basic-unpacked]: /docs/extensions/mv3/getstarted/development-basics/#load-unpacked
[doc-arch]: /docs/extensions/mv3/architecture-overview/
[doc-chrome-apis]: /docs/extensions/reference
[doc-cs]: /docs/extensions/mv3/content_scripts
[doc-dev-basics]: /docs/extensions/mv3/getstarted/development-basics/
[doc-manifest]: /docs/extensions/mv3/manifest
[doc-match-patt]: /docs/extensions/mv3/match_patterns
[doc-options]: /docs/extensions/mv3/options#full_page
[doc-override]: /docs/extensions/mv3/override
[doc-perms]: /docs/extensions/mv3/declare_permissions/
[gh-broken-color]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.broken-color
[manifest-schema]: https://json.schemastore.org/chrome-manifest
[runtime-oninstalled]: /docs/extensions/reference/runtime#event-onInstalled
[tabs-query]: /docs/extensions/reference/tabs#method-query
