---
api: offscreen
---

Service workers do not have DOM access, and many websites have content security policies that limit the functionality of content scripts. This API allows the extension to use DOM APIs in a hidden document without obtrusively opening new windows or tabs that interrupt the user experience. 

## Manifest

You must declare the `"offscreen"` permission in the [extension manifest][doc-manifest] to use the Offscreen API. For example:

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "offscreen"
  ],
  ...
}
```
Pages loaded as offscreen documents are handled differently from other types of extension pages. The extension's permissions carry over to offscreen documents, but extension API access is heavily limited. Currently, an offscreen document can only use the [`chrome.runtime`][api-runtime] APIs to send and receive messages; all other extension APIs are not exposed. Other notable differences between offscreen documents and normal pages are as follows:

* An offscreen document's URL must be a static HTML file bundled with the extension.
* Offscreen documents cannot be focused.
* Offscreen documents cannot have their `opener` property set using the [`chrome.windows` API][api-windows] method `windows.setSelfAsOpener()`.
* An extension can only have one offscreen document open at a time. If the extension is running in split mode with an active incognito profile, both the normal and incognito profiles can each have one offscreen document. 

## Reasons

Reasons, listed [below][offscreen-reason], are set upon document creation to determine the document's lifespan.

| Reason            | Offscreen Document Lifetime                    |
|-------------------|------------------------------------------------|
| AUDIO_PLAYBACK    | Closed after 30 seconds without audio playing. |
| All other reasons | Not currently limited                          |

## Example

Use `chrome.offscreen.createDocument()` and `chrome.offscreen.closeDocument()` for creating and closing an offscreen document. Only a single Document can be open at a time. 

```js
chrome.offscreen.createDocument({
  url: 'off_screen.html',
  reasons: ['CLIPBOARD'],
  justification: 'reason for needing the document',
});

chrome.offscreen.closeDocument()
```

The following example shows how to ensure that the offscreen document has already been created. The `setupOffscreenDocument()` function calls [`clients.matchAll()`](https://developer.mozilla.org/docs/Web/API/Clients/matchAll) to find the existing offscreen document or creates it if it doesn't already exist. Note that an extension can only have one offscreen document.

```js
let creating; // A global promise to avoid concurrency issues
async function setupOffscreenDocument(path) {
  // Check all windows controlled by the service worker to see if one 
  // of them is the offscreen document with the given path
  const offscreenUrl = chrome.runtime.getURL(path);
  const matchedClients = await clients.matchAll();
  for (const client of matchedClients) {
    if (client.url === offscreenUrl) {
      return;
    }
  }

  // create offscreen document
  if (creating) {
    await creating;
  } else {
    creating = chrome.offscreen.createDocument({
      url: path,
      reasons: ['CLIPBOARD'],
      justification: 'reason for needing the document',
    });
    await creating;
    creating = null;
  }
}
```

Before sending a message to an offscreen document, call `setupOffscreenDocument()` to make sure that there is an existing offscreen document, as demonstrated in the following example. 

```js
chrome.action.onClicked.addListener(async () => {
  await setupOffscreenDocument('off_screen.html');

  // Send message to offscreen document
  chrome.runtime.sendMessage({
    type: '...',
    target: 'offscreen',
    data: '...'
  });
});
```

For complete examples, see the [offscreen-clipboard][gh-offscreen-clipboard] and [offscreen-dom][gh-offscreen-dom] demos on GitHub.

 [api-runtime]: /docs/extensions/reference/runtime/
 [api-windows]: /docs/extensions/reference/windows/
 [doc-manifest]: /docs/extensions/mv3/manifest/
 [gh-offscreen-clipboard]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.offscreen-clipboard-write
 [gh-offscreen-dom]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.offscreen-dom
 [offscreen-reason]: /docs/extensions/reference/offscreen/#type-Reason
