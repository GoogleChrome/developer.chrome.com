---
layout: "layouts/doc-post.njk"
title: "Debugging extensions"
seoTitle: "Chrome Extensions Tutorial: Debugging extensions"
date: 2012-09-18
updated: 2022-04-03
description: Step-by-step instructions on how to debug Chrome Extensions.
---

## Overview {: #overview }

Extensions can access the same [Chrome DevTools][chrome-devtools] as web pages. To become an expert in debugging extensions, you will need to know how to locate logs and errors of the different extension components. This tutorial provides fundamental techniques to debug your extension.

## Before you begin {: #prereq }

This guide assumes that you have basic web development experience. We recommend checking out
[Development Basics][doc-dev-basics] for an introduction to the extension development workflow and [Architecture overview][doc-arch] to learn about the different extension components.

## Breaking the extension {: #locate_logs }

This tutorial will break one extension component and then demonstrate how to fix it. Remember to undo the bugs we introduce before continuing to the next section. Start by downloading the [Broken Color sample][gh-broken-color] on Github.

### Debug the manifest {: #debug-manifest}

First let's break the manifest file by changing the `"version"` key to `"versions"` and save.

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

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/acjM7iQ73yXZJO90eeuR.png", alt="An extension with an invalid manifest key triggering an error dialog when attempting to load.", width="500", height="347", class="screenshot" %}
  <figcaption>
    An invalid manifest key error dialog when attempting to load it locally.
  </figcaption>
</figure>

When a manifest key is invalid the extension will fail to load, but Chrome will give you a hint of how to fix the problem. Undo that change and let's ente an invalid permission to see what happens. Change the `"activeTab"` permission to lowercase `"activetab"`:

{% Label %}manifest.json:{% endLabel %}

```json/3/2
{
  ...
  "permissions": ["activeTab", "scripting", "storage"],
  "permissions": ["activetab", "scripting", "storage"],
  ...
}
```

Save the extension and try loading it again. It should load successfully this time. You will see three buttons: **Details**, **Remove** and **Errors**. The **Errors** button letters will turn red if there's an error. Click on the **Errors** button to see the following error:

```text
Permission 'activetab' is unknown or URL pattern is malformed.
```

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/Kpp5AWbtXMmTj8AOpMMe.gif", alt="Error button is clicked and displays an error", width="700", height="360" %}
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

Refresh and click the **Errors** button to view the error log. The first error will let you know that the service worker failed to register. This means something went wrong during initiation. 

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/5Vq0jbo4AGUp1P9MoU3v.png", alt="ALT_TEXT_HERE", width="800", height="418" %}
  <figcaption>
  Service worker registration error message.  
  </figcaption>
</figure>

{% Aside %}

Try inspecting the service worker registration fails, you can't access the Chrome DevTools until you fix the registration bugs. 

{% endAside %}

The second is a is a TypeError:

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/LauDnPFrNyExahWz3RF1.png", alt="ALT_TEXT_HERE", width="800", height="528" %}
  <figcaption>
  Uncaught TypeError message.
  </figcaption>
</figure>

Update the code to reflect the correct call, click the **Clear all** button in the upper right-hand corner, then reload the extension.

#### Check the service worker status {: #sw-status }

Identify when the service worker wakes up to perform tasks

1. Open your manifest file in the browser. For example:
    ```text
    chrome-extension://EXTENSION_ID/manifest.json
    ``` 
2. Inspect the file.
3. Navigate to the **Application** panel.
4. Go to the **Service worker** pane.

You can start or stop the service worker using the links next to the **Status** to test
your code.

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/i1w015KXe7EzN3chRojv.png", alt="ALT_TEXT_HERE", width="800", height="453", class="screenshot" %}
  <figcaption>
    Service worker status in the Application panel
  </figcaption>
</figure>

Also, if you have made changes to the the service worker code, you can use the **Update** button and **skipWaiting** to apply the changes immediately. Note that this will not refresh the other extension components.

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/mJISZTRN34bmSbENQpVq.png", alt="TBD", width="800", height="523", class="screenshot" %}
  <figcaption>
    TBD
  </figcaption>
</figure>

### Popup {: #debug_popup }

Now that the extension initializes correctly, other components can be tested. Start by commenting out the highlighted lines below:

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

Navigate back to the Extensions Management Page, the **Errors** button has reappeared. Click it to
view the new log.

```text
Uncaught ReferenceError: tabs is not defined
```

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/M9gIgE8AgIIDYkN2BF58.png", 
alt="Extensions Management Page displaying popup error", width="800", height="588" %}

You can open the popup's devTools by inspecting the popup.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/bnigtWyfrWdtIhNnwQ8r.png", 
alt="DevTools displaying popup error.", width="800", height="207" %}

The error, `tabs is undefined`, says the extension doesn't know where to inject the content script.
This can be corrected by calling the [`tabs.query()`][tabs-query] method, then selecting the active tab.

Update the code, click the **Clear all** button in the upper right-hand corner, and then reload the
extension.

### Content script {: #debug_cs }

Refresh the page, open the popup and click the green box. And... nope, the background still hasn't
changed colors! Navigate back to the Extensions Management Page and... there is no **Errors**
button. The likely culprit is the content script, which runs inside the web page.

Open the DevTools panel of the web page the extension is trying to alter.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/bnigtWyfrWdtIhNnwQ8r.png", alt="Extension error displayed in web page console", width="800", height="207" %}

Only runtime errors, `console.warning` and `console.error` will be recorded on the Extensions
Management Page.

To use DevTools from within the content script, click the dropdown arrow next to **top** and select
the extension.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/T3fBKwpznjRBEpXOrkzT.png", alt="caught ReferenceError: colors is not defined", width="800", height="362" %}

The error says `color` is not defined. The extension must not be passing the variable correctly.
Correct the injected script to pass the color variable into the code.

```js/4/5
...
function setColor(color) {
  // There's a typo in the line below;
  // ❌ colors should be ✅ color.
  document.body.style.backgroundColor = color;
  document.body.style.backgroundColor = colors;
}  
```

### Extension tabs {: #extension_tabs }

Logs for extension pages displayed as a tab, such as [override pages][doc-override] and [full-page options][doc-options],
can be found in the web page console and on the extensions management page.

## Monitor network requests {: #network_requests }

The popup will often make all of the required network requests before even the speediest of
developers can open DevTools. To view these requests, refresh from inside the network panel. It will
reload the popup without closing the DevTools panel.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/x8knWvTA11f4j1wVoNY8.gif",
       alt="Refresh inside the network panel to view popup network requests", height="520", width="566" %}

## Declare permissions {: #declare_permission }

While extensions have similar capabilities as web pages they often need permission to use certain
features, such as [cookies][api-cookies], [storage][api-storage] and [Fetch][9]. Refer to the
[permissions article][doc-perms] and the available [Chrome APIs][doc-chrome-apis] to ensure an extension is requesting
the correct permissions in its [manifest][doc-manifest].

```json/4-8
  {
    "name": "Broken Background Color",
    "version": "1.0",
    "description": "Fix an Extension!",
    "permissions": [
      "activeTab",
      "declarativeContent",
      "storage"
    ],
    "options_page": "options.html",
    "background": {
      "service_worker": "background.js"
    },
    "action": {
      "default_popup": "popup.html",
      "default_icon": {
        "16": "images/get_started16.png",
        "32": "images/get_started32.png",
        "48": "images/get_started48.png",
        "128": "images/get_started128.png"
      }
    },
    "icons": {
      "16": "images/get_started16.png",
      "32": "images/get_started32.png",
      "48": "images/get_started48.png",
      "128": "images/get_started128.png"
    },
    "manifest_version": 3
  }
```

## Next steps {: #next }

Learn more about [Chrome Devtools][chrome-devtools] by reading the documentation.

[api-cookies]: /docs/extensions/reference/cookies
[api-storage]: /docs/extensions/reference/storage
[api-tabs]: /docs/extensions/reference/tabs
[chrome-devtools]: https://developers.google.com/web/tools/chrome-devtools/
[doc-arch]: /docs/extensions/mv3/architecture-overview/
[doc-chrome-apis]: /docs/extensions/reference
[doc-dev-basics]: /docs/extensions/mv3/getstarted/development-basics/
[dev-basic-unpacked]: /docs/extensions/mv3/getstarted/development-basics/#load-unpacked
[doc-manifest]: /docs/extensions/mv3/manifest
[doc-options]: /docs/extensions/mv3/options#full_page
[doc-override]: /docs/extensions/mv3/override
[doc-perms]: /docs/extensions/mv3/declare_permissions/
[doc-xhr]: /docs/extensions/mv3/xhr
[gh-broken-color]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.broken-color
[runtime-oninstalled]: /docs/extensions/reference/runtime#event-onInstalled
[tabs-query]: /docs/extensions/reference/tabs#method-query
[manifest-schema]: https://json.schemastore.org/chrome-manifest
