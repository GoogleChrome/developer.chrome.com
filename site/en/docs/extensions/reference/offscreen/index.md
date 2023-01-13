---
api: offscreen
---

## Manifest
You must declare the "offscreen" permission in the [extension manifest][1] to use the Offscreen API. For example:

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
Offscreen documents are treated as web pages, and do not share the same permissions as service workers. Offscreen Windows cannot be focused, and cannot have their opener set using the [chrome.windows API](docs/extensions/reference/windows/) method `windows.setSelfAsOpener`.

## Examples
The following methods create and close an offscreen document. Only a single Document can be open at a time. 

```js
     chrome.offscreen.createDocument(
            {
              url: chrome.runtime.getURL('off_screen.html'),
              reasons: ['CLIPBOARD'],
              justification: 'ignored',
            });

chrome.offscreen.closeDocument()
```