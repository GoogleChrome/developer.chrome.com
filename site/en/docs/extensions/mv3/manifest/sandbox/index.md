---
layout: "layouts/doc-post.njk"
title: "Manifest - Sandbox"
seoTitle: "Chrome Extensions Manifest: sandbox"
date: 2013-05-12
updated: 2022-04-28
description: Reference documentation for the sandbox property of manifest.json.
---

Defines a collection of extension pages that are to be served in a sandboxed unique origin. The
Content Security Policy used by an extension's sandboxed pages is specified in the
`content_security_policy` key.

Being in a sandbox has two implications:

1.  A sandboxed page will not have access to extension APIs, or direct access to
    non-sandboxed pages (it may communicate with them via `postMessage()`).
2.  A sandboxed page is not subject to the [Content Security Policy (CSP)][doc-csp] used by the rest of
    the extension (it has its own separate CSP value). This means that, for example, it can
    use inline script and `eval`.

For example, here's how to specify that two extension pages are to be served in a sandbox with a
custom CSP:

```json
{
  ...
  "content_security_policy": {
    "sandbox": "sandbox allow-scripts; script-src 'self' https://example.com"
  },
  "sandbox": {
    "pages": [
      "page1.html",
      "directory/page2.html"
    ]
  },
  ...
}
```

If not specified, the default `content_security_policy` value is `sandbox allow-scripts allow-forms
allow-popups allow-modals; script-src 'self' 'unsafe-inline' 'unsafe-eval'; child-src 'self';`.

You can specify your CSP value to restrict the sandbox even further, but it MUST include the
`sandbox` directive and MUST NOT have the `allow-same-origin` token (see [the HTML5
specification][3] for possible sandbox tokens).

Note that you only need to list pages that you expect to be loaded in windows or frames. Resources
used by sandboxed pages (e.g. stylesheets or JavaScript source files) do not need to appear in the
`pages` list because they will use the sandbox of the frame that embeds them.

["Using eval in Chrome Extensions"][4] goes into more detail about implementing a
sandboxing workflow that enables the use of libraries that would otherwise have issues executing under
extension's [default Content Security Policy][doc-csp].

[1]: /docs/apps/webview_tag
[3]: https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-sandbox
[4]: /docs/extensions/mv3/sandboxingEval
[6]: /docs/extensions/mv3/tabs#manifest_version
[doc-csp]: /docs/extensions/mv3/manifest/content_security_policy/
