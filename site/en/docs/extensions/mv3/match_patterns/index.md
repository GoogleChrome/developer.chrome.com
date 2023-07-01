---
layout: 'layouts/doc-post.njk'
title: 'Match patterns'
seoTitle: 'Chrome Extensions match patterns'
date: 2012-09-18
updated: 2017-10-28
description: Understanding URL match patterns and globs in Chrome extensions.
---

## Overview

Match patterns are used in Chrome extensions to specify a group of URLs. They are mainly found when choosing which sites to inject content scripts into, but can also be used to specify XYZ in externally-connectable, and XYZ in the webRequest API. These API's accept an array of match patterns.

## What is a match pattern? {: #what }

A match pattern is essentially a URL that begins with a permitted scheme separated by a `://`, followed by a host and path. It can contain wildcard (`*`) characters. Most match pattern are composed of three parts:

```text
&lt;scheme&gt;://&lt;host&gt;/&lt;path&gt;
```

Each part can use wildcards `*`,. Below is a detailed description:

- **scheme**: Must include a valid scheme: `'http'`, `'https'`, `'file'`, `'ftp'`, or `'urn'`. The wildcard `*` only matches `http` or `https`.

- **host**: A hostname (`www.example.com`), a `*` before the hostname to match subdomains (`*.example.com`), or just a wildcard `*`. 

- **path**: Must start with `/` and be present. If alone it will always treated as `/*`. For example `/*`, `/foo*`, or `/foo/bar`. Each '`*`' matches 0 or more characters.

### Special use cases {: #special }

`<all_urls>`
: It matches any URL that starts with a permitted scheme. This is considered a broad host permission. 

`file:///` URLs
: Allows you to run your extension on local files. This scheme has no host and requires the user to allow access. The [Allow Access][doc-perms] section in the Permission article shows how to guide users in granting the extension access to this scheme.

Port URLs
: Use `http://localhost/*` to match any localhost ports during development. For IP addresses, include the specific address plus a wildcard in the path. For example: `http://127.0.0.1/*`

Top Level domains


### Examples {: #match-examples}


## Globs patterns

## Top level domains {: #top }

You cannot use wildcard match patterns like `http://google.*/*` to match TLDs (like
`http://google.es` and `http://google.fr`) due to the complexity of actually restricting such a
match to only the desired domains.

For the example of `http://google.*/*`, the Google domains would be matched, but so would
`http://google.someotherdomain.com`. Additionally, many sites do not own all of the TLDs for their
domain. For an example, assume you want to use `http://example.*/*` to match `http://example.com`
and `http://example.es`, but `http://example.net` is a hostile site. If your extension has a bug,
the hostile site could potentially attack your extension in order to get access to your extension's
increased privileges.

You should explicitly enumerate the TLDs that you wish to run your extension on.


Note: `urn` scheme is available since Chrome 91.


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


### Invalid examples

Here are some examples of *invalid* pattern matches:

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
   </tbody>
</table>

Some schemes are not supported in all contexts.

Extensions are unable to run on the following URLs:

- `chrome://`
- `chrome-extension://`
- `about:`
- ``

## Others patterns in extensions

You will also encounter other use of patterns in extensions. The following are a few examples:

Web-accessible resources
: Define a group of extension resources available to web sites or any content script injected on the tab.

Declarative Net Request rules
:

WebRequest URLs

## Declarative Net Requests rules patterns

[1]: /docs/extensions/mv3/declare_permissions#host-permissions
[content-scripts]: /docs/extensions/mv3/content_scripts
[permissions]: /docs/extensions/mv3/declare_permissions/#allow_access
