---
layout: 'layouts/doc-post.njk'
title: 'Match patterns'
seoTitle: 'Chrome Extensions match patterns'
date: 2012-09-18
updated: 2023-08-31
description: Understanding URL match patterns in Chrome extensions.
---

A match pattern is a URL with the following structure, used to specify a group of URLs:

```text
&lt;scheme&gt;://&lt;host&gt;/&lt;path&gt;
```

**scheme**: Must be one of the following, separated from the rest of the pattern using a double slash (`//`):

- `http`
- `https`
- A wildcard `*`, which matches only `http` or `https`
- `file`

For information on injecting content scripts into unsupported schemes, such as `about:` and `data:`, see [Injecting in related frames][cs-frames].

**host**: A hostname (`www.example.com`). A `*` before the hostname to match subdomains (`*.example.com`), or just a wildcard `*`.
  - If you use a wildcard in the host pattern, it must be the first or only character, and it must be followed by a period (`.`) or forward slash (`/`).

**path**: Must contain at least a forward slash. The slash by itself matches any path, as if it were followed by a wildcard (`/*`).

Extensions use match patterns in a variety of use cases, including the following:

* Injecting [content script][content-scripts].
* [Declaring host permissions][host-permissions] that some Chrome APIs require in addition to their own permissions.
* Granting access to [web-accessible resources][war].
* Allowing message sending and receiving using ["externally_connectable.matches"][ext-connect].

## Special cases {: #special }

`"<all_urls>"`
: Matches any URL that starts with a permitted scheme, including any pattern listed under [valid patterns](#valid-examples). Because it affects all hosts, Chrome web store reviews for extensions that use it [may take longer](/docs/webstore/review-process/#review-time-factors).

`"file:///"`
: Allows your extension to run on local files. This pattern requires the user to manually [grant access][permissions]. Note that this case requires three slashes, not two.

Localhost URLs and IP addresses
: To match any localhost port during development, use `http://localhost/*`. For IP addresses, specify the address plus a wildcard in the path, as in `http://127.0.0.1/*`. You can also use `http://*:*/*` to match localhost, IP addresses, and any port.

Top Level domain match patterns
: Chrome doesn't support match patterns for [top Level domains (TLD)][mdn-tld]. Specify your match patterns within individual TLDs, as in `http://google.es/*` and `http://google.fr/*`.

## Example patterns {: #examples }

`https://*/*` or `https://*/`
: Matches any URL using the `https` scheme.

`https://*/foo*`
: Matches any URL using the `https` scheme, on any host, with a path that starts with `foo`. Examples of matches include `https://example.com/foo/bar.html` and `https://www.google.com/foo`.

`https://*.google.com/foo*bar`
: Matches any URL using the `https` scheme, on a google.com host, with a path that starts with `foo` and ends with `bar`. Examples of matches include `https://www.google.com/foo/baz/bar` and `https://docs.google.com/foobar`.

`file:///foo*`
: Matches any local file whose path starts with `foo`. Examples of matches include `file:///foo/bar.html` and `file:///foo`.

`http://127.0.0.1/*` or `http://127.0.0.1/`
: Matches any URL that uses the `http` scheme and is on the host 127.0.0.1. Examples of matches include `http://127.0.0.1/` and `http://127.0.0.1/foo/bar.html`.

`http://localhost/*`
: Matches any localhost port.

`*://mail.google.com/` or `*://mail.google.com/*`
: Matches any URL that starts with `http://mail.google.com` or `https://mail.google.com`.

[content-scripts]: /docs/extensions/mv3/content_scripts
[cs-frames]: /docs/extensions/mv3/content_scripts/#injecting-in-related-frames
[ext-connect]: /docs/extensions/mv3/manifest/externally_connectable/#manifest
[mdn-tld]: https://developer.mozilla.org/docs/Glossary/TLD
[permissions]: /docs/extensions/mv3/declare_permissions/#allow_access
[host-permissions]: /docs/extensions/mv3/declare_permissions/#host-permissions
[war]: /docs/extensions/mv3/manifest/web_accessible_resources/#manifest-declaration
