---
api: input.ime
---

## Manifest

You must declare the "input" permission in the [extension manifest][1] to use the input.ime API. For
example:

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "input"
  ],
  ...
}
```

## Examples

The following code creates an IME that converts typed letters to upper case.

```js
var context_id = -1;

chrome.input.ime.onFocus.addListener(function(context) {
  context_id = context.contextID;
});

chrome.input.ime.onKeyEvent.addListener(
  function(engineID, keyData) {
    if (keyData.type == "keydown" && keyData.key.match(/^[a-z]$/)) {
      chrome.input.ime.commitText({"contextID": context_id,
                                    "text": keyData.key.toUpperCase()});
      return true;
    } else {
      return false;
    }
  }
);
```


[1]: /docs/extensions/mv3/manifest
[2]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/_archive/mv2/api/input.ime/basic/
[3]: /docs/extensions/mv2/samples
