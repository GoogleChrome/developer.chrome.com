---
layout: "layouts/doc-post.njk"
title: "Use geolocation"
seoTitle: "Use geolocation in Chrome Extensions"
date: 2023-06-20
description: How to use geolocation in Chrome Extension service workers, popups, side panels or content scripts.
---

If you want to get geolocation information in your Chrome extension, use the same [`navigator.geolocation`](geolocation) DOM API that any website normally would. This article exists because Chrome extensions handle permission to sensitive data differently than websites. Geolocation is very sensitive data, and as such browsers ensure that users are fully aware and in control of when and where their exact location is shared.

## Use geolocation in MV3 extensions

On the web, browsers safeguard user's geolocation data by showing them a prompt, asking the user to grant that specific origin access to their location. The same permission model is not always appropriate for extensions.


{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/nYRDFWbb280yEp90XDTI.png", alt="A screenshot of the permission prompt you see when a website requests access to the geolocation api", width="800", height="419" %}

Permissions are not the only difference. As mentioned above, `navigator.geolocation` is a \_\_DOM\_\_ API, that is, something that is a part of the APIs that make up web sites. As a result, it is not accessible inside Worker contexts, like the [extension service worker](sw) that is the backbone of manifest v3 extensions. You can absolutely still use `geolocation`, though. There are just nuances with how and where you use it.


### Using geolocation in Service Workers

There is no `navigator` object inside of service workers. It is only available inside of contexts that have access to a page's `document` object. To get access inside of a service worker, use an [`Offscreen Document`](offscreen). This is a feature of extensions that gives you access to an html file you can bundle with our extension. You can read more about Offscreen Documents in the [documentation](offscreen). 

To get started add `offscreen` to the `permissions` section of our manifest.

{% Label %}manifest.json:{% endLabel %}

```js
{
  "name": "My extension",
    ...
  "permissions": [
    ...
   "offscreen"
  ],
  ...
}
```

After adding the `offscreen` permission, add an html file to our extension that will include your offscreen document. In this case, we are not using any of the content of the page, and so this can be a nearly blank file, it just needs to be a smal, html file that loads in our script.

{% Label %}offscreen.html:{% endLabel %}

```html
<!doctype html>
<title>offscreenDocument</title>
<script src="offscreen.js"></script>
```

This file can be saved in the root of our project, as `offscreen.html`.

As mentioned we are including a script called [offscreen.js`, this will be another file we need to bundle with our extension. It will be where we are actually getting geolocation information, and sending that information back to our service worker. We can send and receive messages between it and our service worker.

{% Label %}offscreen.js:{% endLabel %}

```js
chrome.runtime.onMessage.addListener(handleMessages);
function handleMessages(message, sender, sendResponse) {
  // Return early if this message isn't meant for the offscreen document.
  if (message.target !== 'offscreen') {
    return;
  }

  if (message.type !== 'get-geolocation') {
    console.warn(`Unexpected message type received: '${message.type}'.`);
    return;
  }

  // we can directly respond to the message from out service_worker with the
  // provided `sendResponse` callback. But in order to be able to send an async
  // response, we need to explictly return `true` in our onMessage handler
  // As a result, we can't use async/await here - we'd implictly return a Promise.
  getLocation().then((loc) => sendResponse(loc));

  return true;
}

// getCurrentPosition returns a prototype based object, so the properties
// end up being stripped off when sent over to our service worker. To get
// around this, we deeply clone it
function clone(obj) {
  const copy = {};
  // Return the value of any non true object (typeof(null) is "object") directly.
  // null will throw an error if you try to for/in it. We can just return
  // the value early.
  if (obj === null || !(obj instanceof Object)) {
    return obj;
  } else {
    for (const p in obj) {
      copy[p] = clone(obj[p]);
    }
  }
  return copy;
}

async function getLocation() {
  // we use a raw Promise here so we can pass `resolve` and `reject` into the
  // callbacks for getCurrentPosition
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (loc) => resolve(clone(loc)),
      // in case the user doesnt have/is blocking `geolocation`
      (err) => reject(err)
    );
  });
}
```


With that in place, we are now ready to access the Offscreen Document in our service worker!

```js
chrome.offscreen.createDocument({
  url: 'offscreen.html',
  reasons: [chrome.offscreen.Reason.GEOLOCATION || chrome.offscreen.Reason.DOM_SCRAPING],
  justification: 'geolocation access',
});
```

Note that when you access an offscreen document, you need to include a `reason`. The `geolocation` reason was not originally available, so specify a fallback of `DOM_SCRAPING`, and explain in the `justification` section what the code is actually doing. This information is used by the Chrome Web Store's review process to ensure offscreen documents are being used for a valid purpose.

Once you have a reference to the Offscreen Document, you can send it a message to ask for it to give you updated geolocation information.

{% Label %}service\_worker.js:{% endLabel %}

```js
const OFFSCREEN_DOCUMENT_PATH = '/offscreen.html';
let creating; // A global promise to avoid concurrency issues

chrome.runtime.onMessage.addListener(handleMessages);

async function getGeolocation() {
  await setupOffscreenDocument(OFFSCREEN_DOCUMENT_PATH);
  const geolocation = await chrome.runtime.sendMessage({
    type: 'get-geolocation',
    target: 'offscreen'
  });
  await closeOffscreenDocument();
  return geolocation;
}

async function hasDocument() {
  // Check all windows controlled by the service worker to see if one
  // of them is the offscreen document with the given path
  const offscreenUrl = chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH);
  const matchedClients = await clients.matchAll();

  return matchedClients.some(c => c.url === offscreenUrl)
}

async function setupOffscreenDocument(path) {
  //if we do not have a document, we are already setup and can skip
  if (!(await hasDocument())) {
    // create offscreen document
    if (creating) {
      await creating;
    } else {
      creating = chrome.offscreen.createDocument({
        url: path,
        reasons: [chrome.offscreen.Reason.GEOLOCATION || chrome.offscreen.Reason.DOM_SCRAPING],
        justification: 'add justification for geolocation use here',
      });

      await creating;
      creating = null;
    }
  }
}

async function closeOffscreenDocument() {
  if (!(await hasDocument())) {
    return;
  }
  await chrome.offscreen.closeDocument();
}
```

So now whenever you want to get the geolocation from your service worker, you just need to call:

```js
const location = await getGeolocation()
```

### Use geolocation in popup or side panel

If you want to use geolocation within a [popup](popup) or [side panel](sidepanel), it is very straightforward. Popups and side panels are just web documents, and therefore have access to the normal DOM APIs. You can access `navigator.geolocation` directly. The only difference from standard web sites would be that you need to use the `manifest.json` `"permission"` field to request the `geolocation` permission. If you do not include the permission, you _will_ still have access to `navigator.geolocation`. However, any attempt to use it will cause an immediate error, the same as if the user rejected the request. You can see this in the [popup sample](popup-sample).

### Using geolocation in a content script

Just like a popup, a [content script](content) has full access to the DOM API; however you will go through the normal user permission flow. That means that adding `geolocation` to your `permissions` _will not_ automatically give you access to the users' geolocation information. You can see this in the [content script sample](contentscript-sample)

[content]: docs/extensions/mv3/content\_scripts/
[contentscript-sample]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.geolocation-contentscript
[crbug]: https://bugs.chromium.org/p/chromium/issues/list?q=component%3APlatform%3EExtensions%20geolocation
[geolocation]: https://developer.mozilla.org/docs/Web/API/Navigator/geolocation
[manifest]: docs/extensions/mv3/manifest/
[offscreen]: docs/extensions/reference/offscreen/
[popup-sample]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.geolocation-popup
[popup]: docs/extensions/reference/action/#popup
[sidepanel]: docs/extensions/reference/sidePanel/
[sw]: docs/extensions/mv3/service\_workers/
