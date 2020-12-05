---
api: debugger
---

## Notes

As of today, attaching to the tab by means of the debugger API and using embedded Chrome DevTools
with that tab are mutually exclusive. If user invokes Chrome DevTools while extension is attached to
the tab, debugging session is terminated. Extension can re-establish it later.

## Manifest

You must declare the "debugger" permission in your extension's manifest to use this API.

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "debugger",
  ],
  ...
}
```

## Examples

You can find samples of this API in [Samples][1].

[1]: /docs/extensions/mv2/samples#search:debugger
