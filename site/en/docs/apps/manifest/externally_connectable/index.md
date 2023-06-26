---
layout: "layouts/doc-post.njk"
title: "externally_connectable"
seoTitle: "Chrome Apps externally_connectable [Deprecated]"
#date: TODO
#updated: TODO
#description: TODO
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

The `externally_connectable` manifest property declares which extensions, apps, and web pages can
connect to your app via [`runtime.connect`][3] and [`runtime.sendMessage`][4].

For a tutorial on message passing see [cross-extension and app messaging][5] and [sending messages
from web pages][6].

## Connecting without externally_connectable {: #without-externally-connectable }

If `externally_connectable` is not declared in your app's manifest, all extensions and apps can
connect, but no webpages can connect. As a consequence, when updating your manifest to use
`externally_connectable`, if `"ids": ["*"]` is not specified then other extensions and apps will
lose the ability to connect to your app. This may be an unintended consequence, so keep it in mind.

## Sample manifest.json {: #manifest }

```json
{
  "name": "My externally connectable app",
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

  Patterns cannot include wildcard domains nor subdomains of [(effective) top level domains][9];
  `*://google.com/*` and `https://*.chromium.org/*` are valid, while `<all_urls>`, `https://*/*`,
  `*://*.com/*`, and even `https://*.appspot.com/*` are not.

- **`accepts_tls_channel_id` (boolean)** - optional

  If `true`, messages sent via [`runtime.connect`][10] or [`runtime.sendMessage`][11] will set
  [`runtime.MessageSender.tlsChannelId`][12] if those methods request it to be. If `false`,
  [`runtime.MessageSender.tlsChannelId`][13] will never be set under any circumstance.

[1]: https://blog.chromium.org/2020/08/changes-to-chrome-app-support-timeline.html
[2]: /apps/migration
[3]: ../runtime#method-connect
[4]: ../runtime#method-sendMessage
[5]: ../messaging#external
[6]: ../messaging#external-webpage
[7]: /apps/runtime#method-connect
[8]: /apps/runtime#method-sendMessage
[9]: https://publicsuffix.org/list/
[10]: /apps/runtime#method-connect
[11]: /apps/runtime#method-sendMessage
[12]: /apps/runtime#property-MessageSender-tlsChannelId
[13]: /apps/runtime#property-MessageSender-tlsChannelId
