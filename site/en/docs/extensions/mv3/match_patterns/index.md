---
layout: "layouts/doc-post.njk"
title: "Match patterns"
date: 2012-09-18
updated: 2017-10-28
description: How host permission and content script pattern matching works, with examples.
---

[Host permissions][1] and [content script][2] matching are based on a set of URLs defined by match
patterns. A match pattern is essentially a URL that begins with a permitted scheme (`http`, `https`,
`file`, or `ftp`, and that can contain '`*`' characters. The special pattern `<all_urls>` matches
any URL that starts with a permitted scheme. Each match pattern has 3 parts:

- _scheme_—for example, `http` or `file` or `*`

  <div class="aside aside--note">Access to <code>file</code> URLs isn't automatic. The user must visit the extensions management page and opt in to <code>file</code> access for each extension that requests it.</div>

- _host_—for example, `www.google.com` or `*.google.com` or `*`; if the scheme is `file`, there is
  no _host_ part
- _path_—for example, `/*`, `/foo*`, or `/foo/bar`. The path must be present in a host permission,
  but is always treated as `/*`.

Here's the basic syntax:

```text
<url-pattern> := <scheme>://<host><path>
<scheme> := '*' | 'http' | 'https' | 'file' | 'ftp' | 'urn'
<host> := '*' | '*.' <any char except '/' and '*'>+
<path> := '/' <any chars>
```

The meaning of '`*`' depends on whether it's in the _scheme_, _host_, or _path_ part. If the
_scheme_ is `*`, then it matches either `http` or `https`, and **not** `file`, `ftp`, or `urn`. If the
_host_ is just `*`, then it matches any host. If the _host_ is `*._hostname_`, then it matches the
specified host or any of its subdomains. In the _path_ section, each '`*`' matches 0 or more
characters. The following table shows some valid patterns.

Note: `urn` scheme is available since Chrome 91.

<table class="fixed-table width-full"><tbody><tr><th style="margin-left:0; padding-left:0">Pattern</th><th style="margin-left:0; padding-left:0">What it does</th><th style="margin-left:0; padding-left:0">Examples of matching URLs</th></tr><tr><td><code>http://*/*</code></td><td>Matches any URL that uses the <code>http</code> scheme</td><td>http://www.google.com/<br>http://example.org/foo/bar.html</td></tr><tr><td><code>http://*/foo*</code></td><td>Matches any URL that uses the <code>http</code> scheme, on any host, as long as the path starts with <code>/foo</code></td><td>http://example.com/foo/bar.html<br>http://www.google.com/foo<b></b></td></tr><tr><td><code>https://*.google.com/foo*bar</code></td><td>Matches any URL that uses the <code>https</code> scheme, is on a google.com host (such as www.google.com, docs.google.com, or google.com), as long as the path starts with <code>/foo</code> and ends with <code>bar</code></td><td>https://www.google.com/foo/baz/bar<br>https://docs.google.com/foobar</td></tr><tr><td><code>http://example.org/foo/bar.html</code></td><td>Matches the specified URL</td><td>http://example.org/foo/bar.html</td></tr><tr><td><code>file:///foo*</code></td><td>Matches any local file whose path starts with <code>/foo</code></td><td>file:///foo/bar.html<br>file:///foo</td></tr><tr><td><code>http://127.0.0.1/*</code></td><td>Matches any URL that uses the <code>http</code> scheme and is on the host 127.0.0.1</td><td>http://127.0.0.1/<br>http://127.0.0.1/foo/bar.html</td></tr><tr><td><code>*://mail.google.com/*</code></td><td>Matches any URL that starts with <code>http://mail.google.com</code> or <code>https://mail.google.com</code>.</td><td>http://mail.google.com/foo/baz/bar<br>https://mail.google.com/foobar</td></tr><tr><td><code>urn:*</code></td><td>Matches any URL that starts with <code>urn:</code>.</td><td>urn:uuid:54723bea-c94e-480e-80c8-a69846c3f582<br>urn:uuid:cfa40aff-07df-45b2-9f95-e023bcf4a6da</td></tr><tr><td><code>&lt;all_urls&gt;</code></td><td>Matches any URL that uses a permitted scheme. (See the beginning of this section for the list of permitted schemes.)</td><td>http://example.org/foo/bar.html<br>file:///bar/baz.html</td></tr></tbody></table>

Here are some examples of _invalid_ pattern matches:

<table class="fixed-table width-full"><tbody><tr><th style="margin-left:0; padding-left:0">Bad pattern</th><th style="margin-left:0; padding-left:0">Why it's bad</th></tr><tr><td><code>http://www.google.com</code></td><td>No <em>path</em></td></tr><tr><td><code>http://*foo/bar</code></td><td>'*' in the <em>host</em> can be followed only by a '.' or '/'</td></tr><tr><td><code>http://foo.*.bar/baz&nbsp;</code></td><td>If '*' is in the <em>host</em>, it must be the first character</td></tr><tr><td><code>http:/bar</code></td><td>Missing <em>scheme</em> separator ("/" should be "//")</td></tr><tr><td><code>foo://*</code></td><td>Invalid <em>scheme</em></td></tr></tbody></table>

Some schemes are not supported in all contexts.

[1]: /docs/extensions/mv3/declare_permissions#host-permissions
[2]: /docs/extensions/mv3/content_scripts
