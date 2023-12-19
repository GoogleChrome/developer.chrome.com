---
api: offscreen
---

Service workers don't have DOM access, and many websites have content security policies that
limit the functionality of content scripts. The Offscreen API allows the extension to use DOM
APIs in a hidden document without interrupting the user experience by opening new windows or
tabs. The [`runtime`](/docs/extensions/reference/runtime/) API is the only extensions API
supported by offscreen documents.

## Manifest

To use the Offscreen API, declare the `"offscreen"` permission in the [extension manifest][doc-manifest]. For example:

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

## Usage

Pages loaded as offscreen documents are handled differently from other types of extension pages.
The extension's permissions carry over to offscreen documents, but with limits on extension API
access. For example, because the [`chrome.runtime`][api-runtime] API is the only
extensions API supported by offscreen documents, messaging must be handled
using members of that API.

The following are other ways offscreen documents behave differently from normal pages:

* An offscreen document's URL must be a static HTML file bundled with the extension.
* Offscreen documents can't be focused.
* An offscreen document is an instance of [`window`](https://developer.mozilla.org/docs/Web/API/Window), but the value of its `opener` property is always `null`.
* Though an extension package can contain multiple offscreen documents, an installed extension can only
  have one open at a time. If the extension is running
  in split mode with an active incognito profile, the normal and incognito profiles can each
  have one offscreen document. 

Use [`chrome.offscreen.createDocument()`](#method-createDocument) and
[`chrome.offscreen.closeDocument()`](#method-closeDocument) to create and close an offscreen
document. `createDocument()` requires the document's `url`, a reason, and a justification:

```js
chrome.offscreen.createDocument({
  url: 'off_screen.html',
  reasons: ['CLIPBOARD'],
  justification: 'reason for needing the document',
});
```

### Reasons

For a list of valid reasons, see the [Reasons][offscreen-reason] section. Reasons are set during
document creation to determine the document's lifespan. The `AUDIO_PLAYBACK` reason sets the
document to close after 30 seconds without audio playing. All other reasons don't set lifetime limits.

## Examples

### Maintain the lifecycle of an offscreen document

The following example shows how to ensure that an offscreen document exists. The
`setupOffscreenDocument()` function calls [`runtime.getContexts()`][runtime-get-contexts] to find
an existing offscreen document, or creates the document if it doesn't already exist.

```js
let creating; // A global promise to avoid concurrency issues
async function setupOffscreenDocument(path) {
  // Check all windows controlled by the service worker to see if one 
  // of them is the offscreen document with the given path
  const offscreenUrl = chrome.runtime.getURL(path);
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [offscreenUrl]
  });

  if (existingContexts.length > 0) {
    return;
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

Before sending a message to an offscreen document, call `setupOffscreenDocument()` to make sure
the document exists, as demonstrated in the following example. 

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

For complete examples, see the [offscreen-clipboard][gh-offscreen-clipboard] and
[offscreen-dom][gh-offscreen-dom] demos on GitHub.

### Before Chrome 116: check if an offscreen document is open

[`runtime.getContexts()`][runtime-get-contexts] was added in Chrome 116. In earlier versions of
Chrome, use [`clients.matchAll()`](https://developer.mozilla.org/docs/Web/API/Clients/matchAll)
to check for an existing offscreen document:

```js
async function hasOffscreenDocument() {
  if ('getContexts' in chrome.runtime) {
    const contexts = await chrome.runtime.getContexts({
      contextTypes: ['OFFSCREEN_DOCUMENT'],
      documentUrls: [OFFSCREEN_DOCUMENT_PATH]
    });
    return Boolean(contexts.length);
  } else {
    const matchedClients = await clients.matchAll();
    return await matchedClients.some(client => {
        client.url.includes(chrome.runtime.id);
    });
  }
}
```


 [api-runtime]: /docs/extensions/reference/runtime/
 [api-windows]: /docs/extensions/reference/windows/
 [doc-manifest]: /docs/extensions/mv3/manifest/
 [gh-offscreen-clipboard]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.offscreen-clipboard-write
 [gh-offscreen-dom]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.offscreen-dom
 [offscreen-reason]: /docs/extensions/reference/offscreen/#type-Reason
 [runtime-get-contexts]: /docs/extensions/reference/runtime/#method-getContexts
