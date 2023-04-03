---
layout: "layouts/doc-post.njk"
title: "Debugging extensions"
seoTitle: "Chrome Extensions Tutorial: Debugging extensions"
date: 2012-09-18
updated: 2022-04-03
description: Step-by-step instructions on how to debug Chrome Extensions.
---

## Overview {: #overview }

Extensions can access the same debugging tools as web pages in [Chrome DevTools][chrome-devtools]. However, to become an expert in debugging extensions, you need to know how the different parts of an extension work together and where to find logs and errors for each component. This tutorial provides developers with basic concepts and techniques to debug their extensions.

## Before you begin {: #prereq }

This guide assumes that you have basic web development experience. We recommend checking out
[Development Basics][doc-dev-basics] for an introduction to the extension development workflow and [Architecture overview][doc-arch] to learn about the different extension components.

## Debugging extensions {: #locate_logs }

Start by downloading the [Broken Background Color][gh-broken-color]. The following sections break one component of the extension at a time. Remember to correct these errors before moving on to the next section.

### Debug the manifest {: #debug-manifest}

Open the manifest file and change the `"version"` key to `"versions"`

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

Follow the instructions to [Load an unpacked extension][dev-basic-unpacked]. When a manifest key is invalid, the extension will fail to load. You will see a message pointing to the problem: 

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/acjM7iQ73yXZJO90eeuR.png", alt="TBD", width="600", height="347", class="screenshot" %}
  <figcaption>
    TBD
  </figcaption>
</figure>

After correcting the previous error, change the `"activeTab"` permission to `"activetab"`:

{% Label %}manifest.json:{% endLabel %}

```json/3/2
{
  ...
  "permissions": ["activeTab", "scripting", "storage"],
  "permissions": ["activetab", "scripting", "storage"],
  ...
}
```

Save the extension and load it again. After the extension is loaded, it should have three buttons: **Details**, **Remove** and **Errors** in red letters. Click on the **Errors** button to locate the error.

<figure>
  {% Video src="video/BhuKGJaIeLNPW9ehns59NfwqKxF2/MklSHq3NqtDYvvXHLTmk.mp4", width="800", height="714", autoplay="true", loop="true", muted="true" %}
  <figcaption>
    TBD
  </figcaption>
</figure>

Before moving on, change the permission back, click the **Clear all** button in the upper right-hand corner, then reload the extension.

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/8U43Q83u7Tr8fRR6TFHv.png", alt="ALT_TEXT_HERE", width="600", height="574", class="screenshot" %}
  <figcaption>
    TBD
  </figcaption>
</figure>

{% Aside 'success' %}

Using a [manifest schema][manifest-schema] in your code editor is a way to ensure that the manifest has the proper formatting and required fields.

{% endAside %}

## Debug the service worker {: #debug-bg } 

The service worker initializes the default color to storage and logs it to the console.

### Locating logs {: #sw-logs }

To view service worker logs, open the Chrome DevTools panel for the service worker by selecting the
blue link next to **Inspect views**.

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/H48asatrNaKDVVBluWTT.png", alt="ALT_TEXT_HERE", width="650", height="333", class='screenshot' %}
  <figcaption>
    TBD
  </figcaption>
</figure>

{% Aside 'important' %}

Inspecting the service worker this way will keep it active. To make sure that your extension behaves correctly when your service worker is terminated, remember to close the DevTools. 

{% endAside %}

### Locating errors {: #sw-errors }

Let's break the extension by changing `onInstalled` to lowercase `oninstalled`.

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

Refresh and click the **Errors** button to view the error log. The first error will let you know that the service worker failed to register. This means something went wrong during the initiation. 

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/5Vq0jbo4AGUp1P9MoU3v.png", alt="ALT_TEXT_HERE", width="800", height="418" %}
  <figcaption>
  TBD  
  </figcaption>
</figure>

When the service worker fails to register, you can't access the devTools until you fix the registration bugs. 

Another way it fails to register is if there is an error when importing other modules. See [SW tutorial TDB](TDB) for an example. 

The second is the following TypeError:

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/LauDnPFrNyExahWz3RF1.png", alt="ALT_TEXT_HERE", width="800", height="528" %}
  <figcaption>
    TBD
  </figcaption>
</figure>

Update the code to reflect the correct call, click the **Clear all** button in the upper right-hand corner, then reload the extension.

### Check the service worker status {: #sw-stats }

1. Open your manifest file in the browser. For example:
  ```text
  chrome-extension://EXTENSION_ID/manifest.json
  ``` 
2. Inspect the file.
3. Navigate to the **Application panel**.
4. Go to the **Service worker** side panel.
5. Select the extension's service worker.




### Popup {: #debug_popup }

Now that the extension initializes correctly, other components can be tested. Refresh this page, or
open a new tab and navigate to any page on developer.chrome.com, open the popup and click the green
square. And... nothing happens.

Navigate back to the Extensions Management Page, the **Errors** button has reappeared. Click it to
view the new log.

`Uncaught ReferenceError: tabs is not defined`

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ygCnLz4Dst4mktOQhj4S.png",
       alt="Extensions Management Page displaying popup error", height="559", width="642" %}

Popup errors can also be viewed by inspecting the popup.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/PTfS6FEsE6vkbtDVMcsM.png",
       alt="DevTools displaying popup error", height="189", width="499" %}

The error, `tabs is undefined`, says the extension doesn't know where to inject the content script.
This can be corrected by calling the [`tabs.query()`][tabs-query] method, then selecting the active tab.

```js/8-12
  let changeColor = document.getElementById('changeColor');

  chrome.storage.sync.get(['color'], ({color}) => {
    changeColor.style.backgroundColor = color;
    changeColor.setAttribute('value', color);
  });

  changeColor.addEventListener('click', () =>
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript(
          tabs[0].id,
          { function: setColor });
    });
  );
  
  async function setColor() {
    let {color} = await chrome.storage.sync.get(['color']);
    document.body.style.backgroundColor = color;
  };

```

Update the code, click the **Clear all** button in the upper right-hand corner, and then reload the
extension.

### Content script {: #debug_cs }

Refresh the page, open the popup and click the green box. And... nope, the background still hasn't
changed colors! Navigate back to the Extensions Management Page and... there is no **Errors**
button. The likely culprit is the content script, which runs inside the web page.

Open the DevTools panel of the web page the extension is trying to alter.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/q6cdFK0h7JEfaQKUMDg0.png",
       alt="Extension error displayed in web page console", height="292", width="515" %}

Only runtime errors, `console.warning` and `console.error` will be recorded on the Extensions
Management Page.

To use DevTools from within the content script, click the dropdown arrow next to **top** and select
the extension.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/uo8osbvVkG5HcJS00bAR.png",
       alt="Uncaught ReferenceError: tabs is not defined", height="129", width="521" %}

The error says `color` is not defined. The extension must not be passing the variable correctly.
Correct the injected script to pass the color variable into the code.

```js
  document.body.style.backgroundColor = "' + color + '";
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
[doc-chrome-apis]: /docs/extensions/reference
[doc-manifest]: /docs/extensions/mv3/manifest
[doc-options]: /docs/extensions/mv3/options#full_page
[doc-override]: /docs/extensions/mv3/override
[doc-perms]: /docs/extensions/mv3/declare_permissions/
[doc-xhr]: /docs/extensions/mv3/xhr
[gh-broken-color]: https://github.com/GoogleChrome/chrome-extensions-samples/
[runtime-oninstalled]: /docs/extensions/reference/runtime#event-onInstalled
[tabs-query]: /docs/extensions/reference/tabs#method-query
