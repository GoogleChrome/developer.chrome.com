---
api: debugger
has_warning: This permission <a href="/docs/extensions/mv3/permission_warnings/#permissions_with_warnings">triggers a warning</a>.
---

## Note

For security reasons, the `chrome.debugger` API does not provide access to all Chrome DevTools
Protocol Domains. The available domains are: [Audits][1], [DOM][2], [Emulation][3], [Fetch][4],
[IO][5], [Input][6], [Inspector][7], [Log][8], [Network][9], [Overlay][10], [Page][11],
[Storage][12], [Target][13], [Tracing][14] and [WebAuthn][15].


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

You can find samples of this API in [Samples][16].

[1]: https://chromedevtools.github.io/devtools-protocol/tot/Audits
[2]: https://chromedevtools.github.io/devtools-protocol/tot/DOM
[3]: https://chromedevtools.github.io/devtools-protocol/tot/Emulation
[4]: https://chromedevtools.github.io/devtools-protocol/tot/Fetch
[5]: https://chromedevtools.github.io/devtools-protocol/tot/IO
[6]: https://chromedevtools.github.io/devtools-protocol/tot/Input
[7]: https://chromedevtools.github.io/devtools-protocol/tot/Inspector
[8]: https://chromedevtools.github.io/devtools-protocol/tot/Log
[9]: https://chromedevtools.github.io/devtools-protocol/tot/Network
[10]: https://chromedevtools.github.io/devtools-protocol/tot/Overlay
[11]: https://chromedevtools.github.io/devtools-protocol/tot/Page
[12]: https://chromedevtools.github.io/devtools-protocol/tot/Storage
[13]: https://chromedevtools.github.io/devtools-protocol/tot/Target
[14]: https://chromedevtools.github.io/devtools-protocol/tot/Tracing
[15]: https://chromedevtools.github.io/devtools-protocol/tot/WebAuthn
[16]: /docs/extensions/mv2/samples#search:debugger
