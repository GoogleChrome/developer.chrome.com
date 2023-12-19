---
layout: "layouts/doc-post.njk"
title: "externally_connectable"
seoTitle: "Chrome Extensions Manifest: externally_connectable"
date: 2013-08-21
updated: 2014-10-31
description: Reference documentation for the externally_connectable property of manifest.json.
---

The `"externally_connectable"` manifest property declares which extensions and web pages can
connect to your extension via [runtime.connect][runtime-connect] and [runtime.sendMessage][runtime-sendmessage].

For a tutorial on message passing, see [cross-extension messaging][messages-other-exts] and [sending messages
from web pages][messages-webpage].

## Connecting without externally_connectable {: #without-externally-connectable }

If the `externally_connectable` key is **_not_** declared in your extension's manifest, all extensions can connect, but no web pages can connect. As a consequence, when updating your manifest to use
`externally_connectable`, if `"ids": ["*"]` is not specified, then other extensions will
lose the ability to connect to your extension. This may be an unintended consequence, so keep it in
mind.

## Manifest {: #manifest }

```json
{
  "name": "My externally connectable extension",
  "externally_connectable": {
    "ids": [
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      ...
    ],
    // If this field is not specified, no web pages can connect.
    "matches": [
      "https://*.google.com/*",
      "*://*.chromium.org/*",
      ...
    ],
    "accepts_tls_channel_id": false
  },
  ...
}
```

## Reference {: #reference }

The `"externally_connectable"` manifest key includes the following _optional_ properties:

`"ids"`
: The IDs of extensions that are allowed to connect. If left empty or unspecified, no extensions or apps can connect. The wildcard `"*"` will allow all extensions and apps to connect.

`"matches"`
: The URL patterns for _web pages_ that are allowed to connect. If left empty or unspecified, no web pages can connect. Patterns cannot include wildcard domains nor subdomains of [(effective) top-level domains][public-suffix], for example:

| ✅ Valid URLs              | ❌ Invalid URLs        |
|---------------------------|-----------------------|
| `*://example.com/`       | `*://example.com/one/` |
| `http://*.example.org/*` | `<all_urls>`          |
| `https://example.com/*`  | `http://*/*`          |

`"accepts_tls_channel_id"`
: Enables the extension to use the TLS channel ID of the web page connecting to it. The web page must also opt to send the [TLS channel ID][runtime-tls-channel] to the extension by setting
`includeTlsChannelId` to `true` in runtime.connect's [connectInfo][connect-include-tls] or runtime.sendMessage's [options][options-include-tls]. If set to `false`,
[runtime.MessageSender.tlsChannelId][runtime-tls-channel] will never be set under any circumstance.

This does not affect content scripts.

[connect-include-tls]: /docs/extensions/reference/runtime/#type-connect-connectInfo
[messages-other-exts]: /docs/extensions/mv3/messaging#external
[messages-webpage]: /docs/extensions/mv3/messaging#external-webpage
[options-include-tls]: /docs/extensions/reference/runtime/#property-sendMessage-options-includeTlsChannelId
[public-suffix]: http://publicsuffix.org/list/
[runtime-connect]: /docs/extensions/reference/runtime#method-connect
[runtime-sendmessage]: /docs/extensions/reference/runtime#method-sendMessage
[runtime-tls-channel]: /docs/extensions/runtime#property-MessageSender-tlsChannelId
