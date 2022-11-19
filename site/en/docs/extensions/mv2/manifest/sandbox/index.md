---
layout: "layouts/doc-post.njk"
title: "Manifest - Sandbox"
date: 2013-05-12
updated: 2018-04-26
description: Reference documentation for the sandbox property of manifest.json.
---

{% Partial 'extensions/mv2-legacy-page.md' %}

**_Warning:_** Starting in version 57, Chrome will no longer allow external web content (including
embedded frames and scripts) inside sandboxed pages. Please use a [webview][1] instead.

Defines a collection of app or extension pages that are to be served in a sandboxed unique origin,
and optionally a Content Security Policy to use with them. Being in a sandbox has two implications:

1.  A sandboxed page will not have access to extension or app APIs, or direct access to
    non-sandboxed pages (it may communicate with them via `postMessage()`).
2.  A sandboxed page is not subject to the [Content Security Policy (CSP)][2] used by the rest of
    the app or extension (it has its own separate CSP value). This means that, for example, it can
    use inline script and `eval`.

    For example, here's how to specify that two extension pages are to be served in a sandbox with a
    custom CSP:

    ```json
    {
      ...
      "sandbox": {
        "pages": [
          "page1.html",
          "directory/page2.html"
        ]
        // content_security_policy is optional.
        "content_security_policy":
            "sandbox allow-scripts; script-src 'self'"
      ],
      ...
    }
    ```

    If not specified, the default `content_security_policy` value is
    `sandbox allow-scripts allow-forms allow-popups allow-modals; script-src 'self' 'unsafe-inline' 'unsafe-eval'; child-src 'self';`.
    You can specify your CSP value to restrict the sandbox even further, but it must have the
    `sandbox` directive and may not have the `allow-same-origin` token (see [the HTML5
    specification][3] for possible sandbox tokens). Also, the CSP you specify may not allow loading
    external web content inside sandboxed pages.

Note that you only need to list pages that you expected to be loaded in windows or frames. Resources
used by sandboxed pages (e.g. stylesheets or JavaScript source files) do not need to appear in the
`sandboxed_page` list, they will use the sandbox of the page that embeds them.

["Using eval in Chrome Extensions. Safely."][4] goes into more detail about implementing a
sandboxing workflow that enables use of libraries that would otherwise have issues executing under
extension's [default Content Security Policy][5].

Sandboxed page may only be specified when using [`manifest_version`][6] 2 or above.

[1]: /docs/apps/webview_tag
[2]: /docs/extensions/mv2/contentSecurityPolicy
[3]: https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-sandbox
[4]: /docs/extensions/mv2/sandboxingEval
[5]: /docs/extensions/mv2/contentSecurityPolicy
[6]: /docs/extensions/mv2/tabs#manifest_version
