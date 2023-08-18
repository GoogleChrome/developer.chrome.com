---
layout: "layouts/doc-post.njk"
title: "sockets"
seoTitle: "Chrome Apps - sockets [Deprecated]"
date: 2014-01-08
updated: 2014-10-31
description: Reference documentation for the sockets property of manifest.json.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

The `sockets` manifest property declares which permissions are available for the [sockets.udp][3],
[sockets.tcp][4] and [sockets.tcpServer][5] APIs.

## Sample manifest.json {: #manifest }

```json
{
  "name": "My Sockets app",
  "sockets": {
    "udp": {
      // Permission for chrome.sockets.udp.send:
      // The application is allowed to send udp packets
      // to any host:port combination.
      "send": "*"
    },
    "tcp": {
      // Permission for chrome.sockets.tcp.connect:
      // The application is allowed to connect only to the
      // tcp server on 127.0.0.1 port 80.
      "connect": "127.0.0.1:80"
    },
    "tcpServer": {
      // Permission for chrome.sockets.tcpServer.listen:
      // The application is allowed to accept new client
      // connections on the local address at port 80.
      "listen": "127.0.0.1:80"
    }
  },
  ...
}
```

## Reference {: #reference }

- **`udp` (object)** - optional

  The `udp` manifest property declares which sockets.udp operations an app can issue.

  <table><tbody><tr><th>Type</th><th>Attribute</th><th>Description</th></tr><tr id="property-udp-bind"><td>string or array of string</td><td><span class="optional">(optional)</span> bind</td><td><p></p><p>The host:port pattern for <code>bind</code> operations.</p><p></p></td></tr><tr id="property-udp-send"><td>string or array of string</td><td><span class="optional">(optional)</span> send</td><td><p></p><p>The host:port pattern for <code>send</code> operations.</p><p></p></td></tr><tr id="property-udp-multicastMembership"><td>string or array of string</td><td><span class="optional">(optional)</span> multicastMembership</td><td><p></p><p>The host:port pattern for <code>joinGroup</code> operations.</p><p></p></td></tr></tbody></table>

- **`tcp` (object)** - optional

  The `tcp` manifest property declares which sockets.tcp operations an app can issue.

  <table><tbody><tr><th>Type</th><th>Attribute</th><th>Description</th></tr><tr id="property-tcp-connect"><td>string or array of string</td><td><span class="optional">(optional)</span> connect</td><td><p></p><p>The host:port pattern for <code>connect</code> operations.</p><p></p></td></tr></tbody></table>

- **`tcpServer` (object)** - optional

  The `tcpServer` manifest property declares which sockets.tcpServer operations an app can issue.

  <table><tbody><tr><th>Type</th><th>Attribute</th><th>Description</th></tr><tr id="property-tcpServer-listen"><td>string or array of string</td><td><span class="optional">(optional)</span> listen</td><td><p></p><p>The host:port pattern for <code>listen</code> operations.</p><p></p></td></tr></tbody></table>

[1]: https://blog.chromium.org/2020/08/changes-to-chrome-app-support-timeline.html
[2]: /apps/migration
[3]: /apps/sockets.udp
[4]: /apps/sockets.tcp
[5]: /apps/sockets.tcpServer
