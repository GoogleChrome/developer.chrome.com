---
layout: "layouts/doc-post.njk"
title: "externally_connectable"
seoTitle: "MV2 - externally_connectable [deprecated]"
date: 2013-08-21
updated: 2014-10-31
description: Reference documentation for the externally_connectable property of manifest.json.
---

{% Aside 'warning' %}
You're viewing the deprecated Manifest V2 version of this article. See [Manifest V3 - Manifest externally_connectable](/docs/extensions/mv3/manifest/externally_connectable) for the MV3 equivalent.

The Chrome Web Store no longer accepts Manifest V2 extensions. Follow the [Manifest V3 Migration guide](/docs/extensions/migrating) to convert your extension to Manifest V3.
{% endAside %}

The `externally_connectable` manifest property declares which extensions, apps, and web pages can
connect to your extension via [runtime.connect][1] and [runtime.sendMessage][2].

For a tutorial on message passing see [cross-extension and app messaging][3] and [sending messages
from web pages][4].

## Connecting without externally_connectable {: #without-externally-connectable }

If `externally_connectable` is not declared in your extension's manifest, all extensions and apps
can connect, but no webpages can connect. As a consequence, when updating your manifest to use
`externally_connectable`, if `"ids": ["*"]` is not specified then other extensions and apps will
lose the ability to connect to your extension. This may be an unintended consequence, so keep it in
mind.

## Sample manifest.json {: #manifest }

```json
{
  "name": "My externally connectable extension",
  "externally_connectable": {
    // Extension and app IDs. If this field is not specified, no
    // extensions or apps can connect.
    "ids": [
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      ...
      // Alternatively, to match all extensions and apps, specify only
      // "*".
      "*"
    ],
    // Match patterns for web pages. Does not affect content scripts.
    // If this field is not specified, no webpages can connect.
    "matches": [
      "https://*.google.com/*",
      "*://*.chromium.org/*",
      ...
    ],
    // Indicates that the extension would like to make use of the TLS
    // channel ID of the web page connecting to it. The web page must
    // also opt to send the TLS channel ID to the extension via setting
    // includeTlsChannelId to true in runtime.connect's connectInfo
    // or runtime.sendMessage's options.
    "accepts_tls_channel_id": false
  },
  ...
}
```

## Reference {: #reference }

The externally_connectable manifest key can have the following properties:

- **`ids` (array of string)** - optional

  The IDs of extensions or apps that are allowed to connect. If left empty or unspecified, no
  extensions or apps can connect.

  The wildcard `"*"` will allow all extensions and apps to connect.

- **`matches` (array of string)** - optional

  The URL patterns for _web pages_ that are allowed to connect. _This does not affect content
  scripts._ If left empty or unspecified, no web pages can connect.

  Patterns cannot include wildcard domains nor subdomains of [(effective) top level domains][7];
  `*://google.com/*` and `http://*.chromium.org/*` are valid, while `<all_urls>`, `http://*/*`,
  `*://*.com/*`, and even `http://*.appspot.com/*` are not.

- **`accepts_tls_channel_id` (boolean)** - optional

  If `true`, messages sent via [runtime.connect][8] or [runtime.sendMessage][9] will set
  [runtime.MessageSender.tlsChannelId][10] if those methods request it to be. If `false`,
  [runtime.MessageSender.tlsChannelId][11] will never be set under any circumstance.

[1]: /docs/extensions/runtime#method-connect
[2]: /docs/extensions/runtime#method-sendMessage
[3]: /docs/extensions/mv2/messaging#external
[4]: /docs/extensions/mv2/messaging#external-webpage
[5]: /docs/extensions/runtime#method-connect
[6]: /docs/extensions/runtime#method-sendMessage
[7]: http://publicsuffix.org/list/
[8]: /docs/extensions/runtime#method-connect
[9]: /docs/extensions/runtime#method-sendMessage
[10]: /docs/extensions/runtime#property-MessageSender-tlsChannelId
[11]: /docs/extensions/runtime#property-MessageSender-tlsChannelId
