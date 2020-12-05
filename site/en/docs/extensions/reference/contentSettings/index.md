---
api: contentSettings
---

## Manifest

You must declare the "contentSettings" permission in your extension's manifest to use the API. For
example:

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "contentSettings"
  ],
  ...
}
```

## Content setting patterns

You can use patterns to specify the websites that each content setting affects. For example,
`http://*.youtube.com/*` specifies youtube.com and all of its subdomains. The syntax for content
setting patterns is the same as for [match patterns][1], with a few differences:

- For `http`, `https`, and `ftp` URLs, the path must be a wildcard (`/*`). For `file` URLs, the path
  must be completely specified and **must not** contain wildcards.
- In contrast to match patterns, content setting patterns can specify a port number. If a port
  number is specified, the pattern only matches websites with that port. If no port number is
  specified, the pattern matches all ports.

### Pattern precedence

When more than one content setting rule applies for a given site, the rule with the more specific
pattern takes precedence.

For example, the following patterns are ordered by precedence:

1.  `http://www.example.com/*`
2.  `http://*.example.com/*` (matching example.com and all subdomains)
3.  `<all_urls>` (matching every URL)

Three kinds of wildcards affect how specific a pattern is:

- Wildcards in the port (for example `http://www.example.com:*/*`)
- Wildcards in the scheme (for example `*://www.example.com:123/*`)
- Wildcards in the hostname (for example `http://*.example.com:123/*`)

If a pattern is more specific than another pattern in one part but less specific in another part,
the different parts are checked in the following order: hostname, scheme, port. For example, the
following patterns are ordered by precedence:

1.  `http://www.example.com:*/*`
    Specifies the hostname and scheme.
2.  `*:/www.example.com:123/*`
    Not as high, because although it specifies the hostname, it doesn't specify the scheme.
3.  `http://*.example.com:123/*`
    Lower because although it specifies the port and scheme, it has a wildcard in the hostname.

## Primary and secondary patterns

The URL taken into account when deciding which content setting to apply depends on the content type.
For example, for [`contentSettings.notifications`][2] settings are based on the URL shown in the
omnibox. This URL is called the "primary" URL.

Some content types can take additional URLs into account. For example, whether a site is allowed to
set a [`contentSettings.cookies`][3] is decided based on the URL of the HTTP request (which is the
primary URL in this case) as well as the URL shown in the omnibox (which is called the "secondary"
URL).

If multiple rules have primary and secondary patterns, the rule with the more specific primary
pattern takes precedence. If there multiple rules have the same primary pattern, the rule with the
more specific secondary pattern takes precedence. For example, the following list of
primary/secondary pattern pairs is ordered by precedence:

<table><tbody><tr><th>Precedence</th><th>Primary pattern</th><th>Secondary pattern</th></tr><tr><td>1</td><td><code>http://www.moose.com/*</code>,</td><td><code>http://www.wombat.com/*</code></td></tr><tr><td>2</td><td><code>http://www.moose.com/*</code>,</td><td><code>&lt;all_urls&gt;</code></td></tr><tr><td>3</td><td><code>&lt;all_urls&gt;</code>,</td><td><code>http://www.wombat.com/*</code></td></tr><tr><td>4</td><td><code>&lt;all_urls&gt;</code>,</td><td><code>&lt;all_urls&gt;</code></td></tr></tbody></table>

## Resource identifiers

Resource identifiers allow you to specify content settings for specific subtypes of a content type.
Currently, the only content type that supports resource identifiers is [`contentSettings.plugins`][4],
where a resource identifier identifies a specific plugin. When applying content settings, first the
settings for the specific plugin are checked. If there are no settings found for the specific
plugin, the general content settings for plugins are checked.

For example, if a content setting rule has the resource identifier `adobe-flash-player` and the
pattern `<all_urls>`, it takes precedence over a rule without a resource identifier and the pattern
`http://www.example.com/*`, even if that pattern is more specific.

You can get a list of resource identifiers for a content type by calling the
[`contentSettings.ContentSetting.getResourceIdentifiers`][5] method. The returned list can change with
the set of installed plugins on the user's machine, but Chrome tries to keep the identifiers stable
across plugin updates.

## Examples

You can find samples of this API on the [sample page][6].

[1]: /docs/extensions/mv2/match_patterns
[2]: #property-notifications
[3]: #property-cookies
[4]: #property-plugins
[5]: #method-ContentSetting-getResourceIdentifiers
[6]: /docs/extensions/mv2/samples#search:contentSettings
