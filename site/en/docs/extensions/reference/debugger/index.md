---
api: debugger
has_warning: This permission <a href="/docs/extensions/mv3/permission_warnings/#permissions_with_warnings">triggers a warning</a>.
---

## Note

For security reasons, the `chrome.debugger` API does not provide access to all Chrome DevTools
Protocol Domains. The available domains are: [Accessibility][accessibility],
[Audits][audits], [CacheStorage][cache-storage], [Console][console],
[CSS][css], [Database][database], [Debugger][debugger], [DOM][dom],
[DOMDebugger][dom-debugger], [DOMSnapshot][dom-snapshot],
[Emulation][emulation], [Fetch][fetch], [IO][io], [Input][input],
[Inspector][inspector], [Log][log], [Network][network], [Overlay][overlay],
[Page][page], [Performance][performance], [Profiler][profiler],
[Runtime][runtime], [Storage][storage], [Target][target], [Tracing][tracing],
[WebAudio][web-audio], and [WebAuthn][webauthn].

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

To try this API, install the [debugger API example](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/debugger) from the [chrome-extension-samples](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples)
repository.


[audits]: https://chromedevtools.github.io/devtools-protocol/tot/Audits
[dom]: https://chromedevtools.github.io/devtools-protocol/tot/DOM
[emulation]: https://chromedevtools.github.io/devtools-protocol/tot/Emulation
[fetch]: https://chromedevtools.github.io/devtools-protocol/tot/Fetch
[io]: https://chromedevtools.github.io/devtools-protocol/tot/IO
[input]: https://chromedevtools.github.io/devtools-protocol/tot/Input
[inspector]: https://chromedevtools.github.io/devtools-protocol/tot/Inspector
[log]: https://chromedevtools.github.io/devtools-protocol/tot/Log
[network]: https://chromedevtools.github.io/devtools-protocol/tot/Network
[overlay]: https://chromedevtools.github.io/devtools-protocol/tot/Overlay
[page]: https://chromedevtools.github.io/devtools-protocol/tot/Page
[storage]: https://chromedevtools.github.io/devtools-protocol/tot/Storage
[target]: https://chromedevtools.github.io/devtools-protocol/tot/Target
[tracing]: https://chromedevtools.github.io/devtools-protocol/tot/Tracing
[webauthn]: https://chromedevtools.github.io/devtools-protocol/tot/WebAuthn
[debugger-samples]: /docs/extensions/mv3/samples#search:debugger
[css]: https://chromedevtools.github.io/devtools-protocol/tot/css
[cache-storage]: https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage
[dom-debugger]: https://chromedevtools.github.io/devtools-protocol/tot/DOMDebugger
[dom-snapshot]: https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot
[database]: https://chromedevtools.github.io/devtools-protocol/tot/Database
[performance]: https://chromedevtools.github.io/devtools-protocol/tot/Performance
[web-audio]: https://chromedevtools.github.io/devtools-protocol/tot/WebAudio
[runtime]: https://chromedevtools.github.io/devtools-protocol/tot/Runtime
[debugger]: https://chromedevtools.github.io/devtools-protocol/tot/Debugger
[console]: https://chromedevtools.github.io/devtools-protocol/tot/Console
[profiler]: https://chromedevtools.github.io/devtools-protocol/tot/Profiler
[accessibility]: https://chromedevtools.github.io/devtools-protocol/tot/Accessibility
