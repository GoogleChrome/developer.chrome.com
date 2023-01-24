---
api: offscreen
---

## Manifest
You must declare the `"offscreen"` permission in the [extension manifest][1] to use the Offscreen API. For example:

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
Pages loaded as offscreen documents are handled differently from other types of extension pages. The extension's permissions carry over to offscreen documents, but extension API access is heavily limited. Currently, an offscreen document can only use the `chrome.runtime` APIs to send and receive messages; all other extension APIs are not exposed. Other notable differences between offscreen documents and normal pages are as follows:

* An offscreen document's URL must be a static HTML file bundled with the extension.
* Offscreen documents cannot be focused.
* Offscreen documents cannot have their `opener` property set using the [`chrome.windows` API](docs/extensions/reference/windows/) method `windows.setSelfAsOpener()`.
* An extension can only have one offscreen document open at a time. If the extension is running in split mode with an active incognito profile, both the normal and incognito profiles can each have one offscreen document. 

## Reasons
Reasons, listed [below](/docs/extensions/reference/offscreen/#type-Reason), are set upon document creation to determine the document's lifespan. Currently, the `AUDIO_PLAYBACK` reason has specialized lifetime enforcement (`CreateAudioLifetimeEnforcer`). All others use generic idle detection (`CreateEmptyEnforcer`).

## Examples
The following methods create and close an offscreen document. Only a single Document can be open at a time. 

```js
chrome.offscreen.createDocument({
  url: chrome.runtime.getURL('off_screen.html'),
  reasons: ['CLIPBOARD'],
  justification: 'reason for needing the document',
});

chrome.offscreen.closeDocument()
```
