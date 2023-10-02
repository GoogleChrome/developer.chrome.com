---
layout: 'layouts/doc-post.njk'
title: 'Match patterns'
seoTitle: 'Chrome Extensions match patterns'
date: 2012-09-18
updated: 2023-07-28
description: Understanding URL match patterns in Chrome extensions.
---

## Overview {: #overview }

Extensions use match patterns to specify a group of URLs. They are mainly used to declare [host permissions][host-permissions] along with other permissions to use certain Chrome APIs or when injecting [content scripts][content-scripts]. Extensions also use match patterns in:

- [`"web_accessible_resources.matches"`][war]
- [`"externally_connectable.matches"`][ext-connect]

## What is a match pattern? {: #what }

A match pattern is a URL that begins with a permitted scheme, separated by a `://`, followed by a host and path. It can contain wildcard (`*`) characters. Most match patterns are composed of three parts:

```text
&lt;scheme&gt;://&lt;host&gt;/&lt;path&gt;
```

Each part can use wildcards `*`. Below is a detailed description:

- **scheme**: Must include a valid scheme: `'http'`, `'https'`, `'file'`, `'ftp'`, or `'urn'`. The wildcard `*` only matches `http` or `https`.

- **host**: A hostname (`www.example.com`), a `*` before the hostname to match subdomains (`*.example.com`), or just a wildcard `*`.

- **path**: Must start with `/` and be present. If alone, it is treated as `/*`. For example: `/*`, `/foo*`, or `/foo/bar`. Each '`*`' matches 0 or more characters.

## Special cases {: #special }

`<all_urls>`
: It matches any URL that starts with a permitted scheme, including any pattern listed under [valid patterns](#valid-examples). This is a broad host permission, meaning the Chrome web store [review may take longer](/docs/webstore/review-process/#review-time-factors).

`file:///`
: Allows your extension to run on local files. It has no host and requires the user to manually [grant access][permissions-allow-access].

Localhost URLs and IP addresses
: To match any localhost port during development, use `http://localhost/*`. For example, it will match any paths under `http://localhost:8080` or `http://localhost:3000`.  For IP addresses, specify the address plus a wildcard in the path. For example: `http://127.0.0.1/*`. Another approach is to use `http://*:*/*` which will match localhost, IP addresses and any port.

Top Level domain match patterns
: [Top Level domain][mdn-tld] match patterns like `http://google.*/*` are not supported. They should be listed individually. For example: `http://google.es/*` and `http://google.fr/*`.

## Examples {: #examples }

### ✅ Valid patterns {: #valid-examples }

<table class="fixed-table width-full">
   <tbody>
      <tr>
         <th style="margin-left:0; padding-left:0">Pattern</th>
         <th style="margin-left:0; padding-left:0">What it does</th>
         <th style="margin-left:0; padding-left:0">Examples</th>
      </tr>
      <tr>
         <td><code>https://*/*</code></td>
         <td>Matches any URL that uses the <code>https</code> scheme</td>
         <td>https://www.google.com/ <br>https://example.org/foo/bar.html</li></ul></td>
      </tr>
      <tr>
         <td><code>http://*/*</code></td>
         <td>Matches any URL that uses the <code>http</code> scheme</td>
         <td>http://74.125.127.100/search <br>http://example.com/</li></ul></td>
      </tr>
      <tr>
         <td><code>https://*/foo*</code></td>
         <td>Matches any URL that uses the <code>https</code> scheme, on any host, and a path that starts with <code>/foo</code></td>
         <td>https://example.com/foo/bar.html https://www.google.com/foo</li></ul></td>
      </tr>
      <tr>
         <td><code>https://*.google.com/foo*bar</code></td>
         <td>Matches any URL that uses the <code>https</code> scheme, is on a google.com host, and the path starts with <code>/foo</code> and ends with <code>bar</code></td>
         <td>https://www.google.com/foo/baz/bar<br>https://docs.google.com/foobar</td>
      </tr>
      <tr>
         <td><code>file:///foo*</code></td>
         <td>Matches any local file whose path starts with <code>/foo</code></td>
         <td>file:///foo/bar.html<br>file:///foo</td>
      </tr>
      <tr>
         <td><code>http://127.0.0.1/*</code></td>
         <td>Matches any URL that uses the <code>http</code> scheme and is on the host 127.0.0.1</td>
         <td>http://127.0.0.1/<br>http://127.0.0.1:9000/<br>http://127.0.0.1/foo/bar.html</td>
      </tr>
      <tr>
         <td><code>http://localhost/*</code></td>
         <td>Matches any localhost port</td>
         <td>http://localhost:3000<br>http://localhost:8080</td>
      </tr>
      <tr>
         <td><code>*://mail.google.com/*</code></td>
         <td>Matches any URL that starts with <code>http://mail.google.com</code> or <code>https://mail.google.com</code>.</td>
         <td>http://mail.google.com/foo/baz/bar<br>https://mail.google.com/foobar</td>
      </tr>
      <tr>
         <td><code>urn:*</code></td>
         <td>Matches any URL that starts with <code>urn:</code>.</td>
         <td>urn:uuid:54723bea-c94e-480e-80c8-a69846c3f582<br>urn:uuid:cfa40aff-07df-45b2-9f95-e023bcf4a6da</td>
      </tr>
   </tbody>
</table>

### ❌ Invalid patterns {: #invalid-patterns }

Here are some examples of _invalid_ match patterns:

<table class="fixed-table width-full">
   <tbody>
      <tr>
         <th style="margin-left:0; padding-left:0">Invalid pattern</th>
         <th style="margin-left:0; padding-left:0">Why it's invalid</th>
      </tr>
      <tr>
         <td><code>https://www.google.com</code></td>
         <td>No <em>path</em></td>
      </tr>
      <tr>
         <td><code>https://*foo/bar</code></td>
         <td>'*' in the <em>host</em> can be followed only by a '.' or '/'</td>
      </tr>
      <tr>
         <td><code>https://foo.*.bar/baz&nbsp;</code></td>
         <td>If '*' is in the <em>host</em>, it must be the first character</td>
      </tr>
      <tr>
         <td><code>http:/bar</code></td>
         <td>Missing <em>scheme</em> separator ("/" should be "//")</td>
      </tr>
      <tr>
         <td><code>foo://*</code></td>
         <td>Invalid <em>scheme</em></td>
      </tr>
      <tr>
         <td><code>chrome://*</code></td>
         <td>Unsupported <em>scheme</em></td>
      </tr>
      <tr>
         <td><code>chrome-extension://*</code></td>
         <td>Unsupported <em>scheme</em></td>
      </tr>
      <tr>
         <td><code>about:*</code></td>
         <td>Unsupported <em>scheme</em>.</td>
      </tr>
   </tbody>
</table>

{% Aside 'success' %}
Content scripts can be injected into related frames like `about:`, `data:`, etc by setting `"match_origin_as_fallback"` to `"true"` in the manifest. See [Injecting in related frames][cs-frames] for details.
{% endAside %}

[content-scripts]: /docs/extensions/mv3/content_scripts
[cs-frames]: /docs/extensions/mv3/content_scripts/#injecting-in-related-frames
[ext-connect]: /docs/extensions/mv3/manifest/externally_connectable/#manifest
[host-permissions]: /docs/extensions/mv3/declare_permissions/#host-permissions
[mdn-tld]: https://developer.mozilla.org/docs/Glossary/TLD
[permissions]: /docs/extensions/mv3/declare_permissions/
[war]: /docs/extensions/mv3/manifest/web_accessible_resources/#manifest-declaration
