---
api: proxy
---

## Manifest

You must declare the "proxy" permission in the [extension manifest][1] to use the proxy settings
API. For example:

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "proxy"
  ],
  ...
}
```

## Objects and properties

Proxy settings are defined in a [`proxy.ProxyConfig`][2] object. Depending on Chrome's proxy settings,
the settings may contain [`proxy.ProxyRules`][3] or a [`proxy.PacScript`][4].

### Proxy modes

A ProxyConfig object's `mode` attribute determines the overall behavior of Chrome with regards to
proxy usage. It can take the following values:

`direct`

: In `direct` mode all connections are created directly, without any proxy involved. This mode allows
  no further parameters in the `ProxyConfig` object.

`auto_detect`

: In `auto_detect` mode the proxy configuration is determined by a PAC script that can be downloaded
  at [http://wpad/wpad.dat][5]. This mode allows no further parameters in the `ProxyConfig` object.

`pac_script`

: In `pac_script` mode the proxy configuration is determined by a PAC script that is either retrieved
  from the URL specified in the [`proxy.PacScript`][6] object or taken literally from the `data` element
  specified in the [`proxy.PacScript`][7] object. Besides this, this mode allows no further parameters
  in the `ProxyConfig` object.

`fixed_servers`

: In `fixed_servers` mode the proxy configuration is codified in a [`proxy.ProxyRules`][8] object. Its
  structure is described in [Proxy rules][9]. Besides this, the `fixed_servers` mode allows no further
  parameters in the `ProxyConfig` object.

`system`

: In `system` mode the proxy configuration is taken from the operating system. This mode allows no
  further parameters in the `ProxyConfig` object. Note that the `system` mode is different from
  setting no proxy configuration. In the latter case, Chrome falls back to the system settings only if
  no command-line options influence the proxy configuration.

### Proxy rules

The [`proxy.ProxyRules`][10] object can contain either a `singleProxy` attribute or a subset of
`proxyForHttp`, `proxyForHttps`, `proxyForFtp`, and `fallbackProxy`.

In the first case, HTTP, HTTPS and FTP traffic is proxied through the specified proxy server. Other
traffic is sent directly. In the latter case the behavior is slightly more subtle: If a proxy server
is configured for the HTTP, HTTPS or FTP protocol, the respective traffic is proxied through the
specified server. If no such proxy server is specified or traffic uses a different protocol than
HTTP, HTTPS or FTP, the `fallbackProxy` is used. If no `fallbackProxy` is specified, traffic is sent
directly without a proxy server.

### Proxy server objects

A proxy server is configured in a [`proxy.ProxyServer`][11] object. The connection to the proxy server
(defined by the `host` attribute) uses the protocol defined in the `scheme` attribute. If no
`scheme` is specified, the proxy connection defaults to `http`.

If no `port` is defined in a [`proxy.ProxyServer`][12] object, the port is derived from the scheme.
The default ports are:

<table><tbody><tr><th>Scheme</th><th>Port</th></tr><tr><td>http</td><td>80</td></tr><tr><td>https</td><td>443</td></tr><tr><td>socks4</td><td>1080</td></tr><tr><td>socks5</td><td>1080</td></tr></tbody></table>

### Bypass list

Individual servers may be excluded from being proxied with the `bypassList`. This list may contain
the following entries:

`[_<scheme>_://]_<host-pattern>_[:_<port>_]`

: Match all hostnames that match the pattern `_<host-pattern>_`. A leading `"."` is interpreted as a
  `"*."`.
  Examples: `"foobar.com", "*foobar.com", "*.foobar.com", "*foobar.com:99", "https://x.*.y.com:99"`.

  <table><tbody><tr><th>Pattern</th><th>Matches</th><th>Does not match</th></tr><tr><td><code>".foobar.com"</code></td><td><code>"www.foobar.com"</code></td><td><code>"foobar.com"</code></td></tr><tr><td><code>"*.foobar.com"</code></td><td><code>"www.foobar.com"</code></td><td><code>"foobar.com"</code></td></tr><tr><td><code>"foobar.com"</code></td><td><code>"foobar.com"</code></td><td><code>"www.foobar.com"</code></td></tr><tr><td><code>"*foobar.com"</code></td><td><code>"foobar.com"</code>, <code>"www.foobar.com"</code>, <code>"foofoobar.com"</code></td><td></td></tr></tbody></table>

`[_<scheme>_://]_<ip-literal>_[:_<port>_]`

: Match URLs that are IP address literals.
  Conceptually this is the similar to the first case, but with special cases to handle IP literal
  canonicalization. For example, matching on "\[0:0:0::1\]" is the same as matching on "\[::1\]"
  because the IPv6 canonicalization is done internally.
  Examples: `"127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"`

`_<ip-literal>_/_<prefix-length-in-bits>_`

: Match any URL containing an IP literal within the given range. The IP range is specified using CIDR
  notation.
  Examples: `"192.168.1.1/16", "fefe:13::abc/33"`

`<local>`

: Matches simple hostnames. A simple hostname is one that contains no dots and is not an IP literal.
  For instance `example` and `localhost` are simple hostnames, whereas `example.com`, `example.`, and
  `[::1]` are not.
  Example: `"<local>"`

## Examples

The following code sets a SOCKS 5 proxy for HTTP connections to all servers but foobar.com and uses
direct connections for all other protocols. The settings apply to regular and incognito windows, as
incognito windows inherit settings from regular windows. Please also consult the [Types API][13]
documentation.

```js
var config = {
  mode: "fixed_servers",
  rules: {
    proxyForHttp: {
      scheme: "socks5",
      host: "1.2.3.4"
    },
    bypassList: ["foobar.com"]
  }
};
chrome.proxy.settings.set(
  {value: config, scope: 'regular'},
  function() {}
);
```

The following code sets a custom PAC script.

```js
var config = {
  mode: "pac_script",
  pacScript: {
    data: "function FindProxyForURL(url, host) {\n" +
          "  if (host == 'foobar.com')\n" +
          "    return 'PROXY blackhole:80';\n" +
          "  return 'DIRECT';\n" +
          "}"
  }
};
chrome.proxy.settings.set(
  {value: config, scope: 'regular'},
  function() {}
);
```

The next snippet queries the currently effective proxy settings. The effective proxy settings can be
determined by another extension or by a policy. See the [Types API][14] documentation for details.

```js
chrome.proxy.settings.get(
  {'incognito': false},
  function(config) {
    console.log(JSON.stringify(config));
  }
);
```

Note that the `value` object passed to `set()` is not identical to the `value` object passed to
callback function of `get()`. The latter will contain a `rules.proxyForHttp.port` element.

[1]: /docs/extensions/mv2/tabs
[2]: #type-ProxyConfig
[3]: #type-ProxyRules
[4]: #type-PacScript
[5]: http://wpad/wpad.dat
[6]: #type-PacScript
[7]: #type-PacScript
[8]: #type-ProxyRules
[9]: #proxy_rules
[10]: #type-ProxyRules
[11]: #type-ProxyServer
[12]: #type-ProxyServer
[13]: /docs/extensions/types#ChromeSetting
[14]: /docs/extensions/types#ChromeSetting
