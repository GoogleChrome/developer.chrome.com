---
layout: "layouts/doc-post.njk"
title: "Debugging extensions"
date: 2012-09-18
updated: 2020-07-21
description: Step-by-step instructions on how to debug Chrome Extensions.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

Extensions are able to leverage the same debugging benefits [Chrome DevTools][1] provides for web
pages, but they carry unique behavior properties. Becoming a master extension debugger requires an
understanding of these behaviors, how extension components work with each other, and where to corner
bugs. This tutorial gives developers a basic understanding of debugging extensions.

## Locate the logs {: #locate_logs }

Extensions are made of many different components, and these components have individual
responsibilities. Download a broken extension [here][2] to begin locating error logs for different
extension components.

### Background script {: #debug_bg }

Navigate to the chrome extensions management page at `chrome://extensions` and ensure developer mode
is on. Click the **Load Unpacked** button and select the broken extension directory. After the
extension is loaded, it should have three buttons: **Details**, **Remove** and **Errors** in red
letters.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/NPUXnZrLSG6T6zTCmbxj.png",
       alt="Image displaying error button on extension management page", height="220", width="412" %}

Click the **Errors** button to view the error log. The extensions system has found an issue in the
background script.

`Uncaught TypeError: Cannot read property 'addListener' of undefined`

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/5UNQ4gp40qQZIwOLTzxA.png",
       alt="Extensions Management Page displaying background script error", height="556", width="646" %}

Additionally, the Chrome DevTools panel can be opened for the background script by selecting the
blue link next to **Inspect views**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/GvIXA3o7JvOxUg9BV12z.png",
       alt="DevTools displaying background script error", height="222", width="743" %}

Return to the code.

```js/0
chrome.runtime.oninstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
```

The background script is attempting to listen for the [`onInstalled`][3] event, but the property
name requires an upper case "I". Update the code to reflect the correct call, click the **Clear
all** button in the upper right hand corner, then reload the extension.

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
This can be corrected by calling the [`tabs.query()`][4] method, then selecting the active tab.

```js/9-13
  let changeColor = document.getElementById('changeColor');

  chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
  });

  changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = color;'});
    });
  };
```

Update the code, click the **Clear all** button in the upper right hand corner, and then reload the
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
  {code: 'document.body.style.backgroundColor = "' + color + '";'});
```

### Extension tabs {: #extension_tabs }

Logs for extension pages displayed as a tab, such as [override pages][5] and [full-page options][6],
can be found in the web page console and on the extensions management page.

## Monitor network requests {: #network_requests }

The popup will often make all of the required network requests before even the speediest of
developers can open DevTools. To view these requests, refresh from inside the network panel. It will
reload the popup without closing the DevTools panel.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/x8knWvTA11f4j1wVoNY8.gif",
       alt="Refresh inside the network panel to view popup network requests", height="520", width="566" %}

## Declare permissions {: #declare_permission }

While extensions have similar capabilities as web pages they often need permission to use certain
features, such as [cookies][7], [storage][8] and [Cross-Origin XMLHttpRequsts][9]. Refer to the
[permissions article][10] and the available [Chrome APIs][11] to ensure an extension is requesting
the correct permissions in its [manifest][12].

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
      "scripts": ["background.js"],
      "persistent": false
    },
    "page_action": {
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
    "manifest_version": 2
  }
```

## Next steps {: #next }

For further information on debugging extensions, watch [Developing and Debugging][13]. Learn more
about [Chrome Devtools][14] by reading the documentation.

[1]: https://developers.google.com/web/tools/chrome-devtools/
[2]: https://storage.googleapis.com/chrome-gcs-uploader.appspot.com/file/WlD8wC6g8khYWPJUsQceQkhXSlv1/KZdyzIighjOsDUPaibEn.zip "broken_background_color.zip"
[3]: /docs/extensions/reference/runtime#event-onInstalled
[4]: /docs/extensions/reference/tabs#method-query
[5]: /docs/extensions/mv2/override
[6]: /docs/extensions/mv2/options#full_page
[7]: /docs/extensions/reference/cookies
[8]: /docs/extensions/reference/storage
[9]: /docs/extensions/mv2/xhr
[10]: /docs/extensions/mv2/permission_warnings
[11]: /docs/extensions/reference
[12]: /docs/extensions/reference/tabs
[13]: http://www.youtube.com/watch?v=IP0nMv_NI1s&feature=PlayList&p=CA101D6A85FE9D4B&index=5
[14]: https://developers.google.com/web/tools/chrome-devtools/
