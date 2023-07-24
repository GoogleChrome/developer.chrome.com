---
layout: 'layouts/doc-post.njk'
title: 'Match patterns'
seoTitle: 'Chrome Extensions match patterns'
date: 2012-09-18
updated: 2023-07-10
description: Understanding URL match patterns and globs in Chrome extensions.
---

## Overview {: #overview }

Match patterns are used in Chrome extensions to specify a group of URLs. They are mainly used to declare [host permissions][host-permissions] in content scripts. Learn more about other use cases in the [Host permissions][host-permissions] section of Declaring permissions.


## What is a match pattern? {: #what }

A match pattern is a URL that begins with a permitted scheme separated by a `://`, followed by a host and path. It can contain wildcard (`*`) characters. Most match patterns are composed of three parts:

```text
&lt;scheme&gt;://&lt;host&gt;/&lt;path&gt;
```

Each part can use wildcards `*`. Below is a detailed description:

- **scheme**: Must include a valid scheme: `'http'`, `'https'`, `'file'`, `'ftp'`, or `'urn'`. The wildcard `*` only matches `http` or `https`.

- **host**: A hostname (`www.example.com`), a `*` before the hostname to match subdomains (`*.example.com`), or just a wildcard `*`.

- **path**: Must start with `/` and be present. If alone it will always treated as `/*`. For example `/*`, `/foo*`, or `/foo/bar`. Each '`*`' matches 0 or more characters.

## Special cases {: #special }

`<all_urls>`
: It matches any URL that starts with a permitted scheme. This is considered a broad host permission.

`file:///` URLs
: Allows you to run your extension on local files. This scheme has no host and requires the user to allow access. The [Allow Access][permissions] section in the Permission article shows how to guide users in granting the extension access to this scheme.

Port URLs
: Use `http://localhost/*` to match any localhost ports during development. Include the specific address plus a wildcard in the path for IP addresses. For example: `http://127.0.0.1/*`

Top Level domains
: [Top Level domain][mdn-tld] match patterns like `http://google.*/*` are not supported. They should be listed individually. For example: `http://google.es` and `http://google.fr`.

## Examples {: #examples }

### ✅ Valid pattern examples {: #match-examples }

<table class="fixed-table width-full">
   <tbody>
      <tr>
         <th style="margin-left:0; padding-left:0">Pattern</th>
         <th style="margin-left:0; padding-left:0">What it does</th>
         <th style="margin-left:0; padding-left:0">Examples of matching URLs</th>
      </tr>
      <tr>
         <td><code>https://*/*</code></td>
         <td>Matches any URL that uses the <code>https</code> scheme</td>
         <td><code>https://www.google.com/</code> <br><code>https://example.org/foo/bar.html</code></li></ul></td>
      </tr>
      <tr>
         <td><code>https://*/foo*</code></td>
         <td>Matches any URL that uses the <code>https</code> scheme, on any host, as long as the path starts with <code>/foo</code></td>
         <td>https://example.com/foo/bar.html https://www.google.com/foo</li></ul></td>
      </tr>
      <tr>
         <td><code>https://*.google.com/foo*bar</code></td>
         <td>Matches any URL that uses the <code>https</code> scheme, is on a google.com host (such as www.google.com, docs.google.com, or google.com), as long as the path starts with <code>/foo</code> and ends with <code>bar</code></td>
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
         <td>http://127.0.0.1/<br>http://127.0.0.1/foo/bar.html</td>
      </tr>
      <tr>
         <td><code>http://localhost/*</code></td>
         <td>Matches any port</td>
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
      <tr>
         <td><code>&lt;all_urls&gt;</code></td>
         <td>Matches any URL that uses a permitted scheme.</td>
         <td>http://example.org/foo/bar.html<br>file:///bar/baz.html</td>
      </tr>
   </tbody>
</table>

### ❌ Invalid examples {: #invalid-patterns }

Here are some examples of _invalid_ match patterns:

<table class="fixed-table width-full">
   <tbody>
      <tr>
         <th style="margin-left:0; padding-left:0">Bad pattern</th>
         <th style="margin-left:0; padding-left:0">Why it's bad</th>
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
         <td>Unsupported <em>scheme</em></td>
      </tr>
   </tbody>
</table>

## Globs properties in Content Scripts {: #globs }

Glob properties are used to refine the URLs already specified by the [match patterns](#what). Acceptable glob
strings are URLs that may contain "wildcard" and question marks. The asterisk **\***
matches any string of any length, including the empty string, while the question mark **?** matches
any single character.

For example, the glob **https://???.example.com/foo/\*** matches any of the following:

| ✅ Matches                        | ❌ Doesn't match                 |
| --------------------------------- | -------------------------------- |
| `https://www.example.com/foo/bar` | `https://my.example.com/foo/bar` |
| `https://the.example.com/foo/`    | `https://example.com/foo/`       |
| `xx`                              | `https://www.example.com/foo`    |

### Include_globs {: #include-globs }

This extension injects the content script into **https://www.nytimes.com/arts/index.html** and
**https://www.nytimes.com/jobs/index.html**, but not into
**https://www.nytimes.com/sports/index.html**:

{% Label %}manifest.json{% endLabel %}

```json/6
{
  "name": "My extension",
  ...
  "content_scripts": [
    {
      "matches": ["https://*.nytimes.com/*"],
      "include_globs": ["*nytimes.com/???s/*"],
      "js": ["contentScript.js"]
    }
  ],
  ...
}
```

### Exclude_globs {: #exclude-globs }

This extension injects the content script into **https://history.nytimes.com** and
**https://.nytimes.com/history**, but not into **https://science.nytimes.com** or
**https://www.nytimes.com/science**:

{% Label %}manifest.json{% endLabel %}

```json/6
{
  "name": "My extension",
  ...
  "content_scripts": [
    {
      "matches": ["https://*.nytimes.com/*"],
      "exclude_globs": ["*science*"],
      "js": ["contentScript.js"]
    }
  ],
  ...
}
```

### Narrowing scope {: #narrow }

One, all, or some of these can be included to achieve the correct scope.

{% Label %}manifest.json{% endLabel %}

```json/6-8
{
  "name": "My extension",
  ...
  "content_scripts": [
    {
      "matches": ["https://*.nytimes.com/*"],
      "exclude_matches": ["*://*/*business*"],
      "include_globs": ["*nytimes.com/???s/*"],
      "exclude_globs": ["*science*"],
      "js": ["contentScript.js"]
    }
  ],
  ...
}
```

[content-scripts]: /docs/extensions/mv3/content_scripts
[permissions]: /docs/extensions/mv3/declare_permissions/
[host-permissions]: /docs/extensions/mv3/declare_permissions/#host-permissions
[mdn-tld]: https://developer.mozilla.org/docs/Glossary/TLD