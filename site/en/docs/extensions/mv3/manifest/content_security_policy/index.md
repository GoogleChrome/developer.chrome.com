---
layout: "layouts/doc-post.njk"
title: "Manifest - Content Security Policy"
date: 2022-10-03
updated: 2022-10-03
description: Reference documentation for the content security policy properties of manifest.json.
---

An optional manifest key defining restrictions on the scripts, styles, and other resources an extension can use. Within this manifest key, separate optional policies can be defined for both extension pages and sandboxed extension pages.

The "extension pages" policy applies to page and worker contexts in the extension. This would include the extension popup, background worker, and tabs with HTML pages or iframes that were opened by the extension. The sandbox policy applies to all pages specified as a [sandbox page](/docs/extensions/mv3/manifest/sandbox/) in the manifest.

## Default Policy

If the [content security policy](https://developer.mozilla.org/docs/Web/HTTP/CSP) is not defined by the user in the manifest, the default properties will be used for both extension pages and sandboxed extension pages.   

These defaults are equivalent to specifying the following policies in your manifest:

{# This is statically defined in Chromium source. 
- https://source.chromium.org/chromium/chromium/src/+/main:extensions/common/manifest_handlers/csp_info.cc?q=kDefaultMV3CSP
-https://source.chromium.org/chromium/chromium/src/+/main:extensions/common/manifest_handlers/csp_info.cc?q=kDefaultSandboxedPageContentSecurityPolicy
#}
```json
{
  // ...
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self';",
    "sandbox": "sandbox allow-scripts allow-forms allow-popups allow-modals; script-src 'self' 'unsafe-inline' 'unsafe-eval'; child-src 'self';"
  }
  // ...
}
```

In this case, the extension will only load local scripts and objects from its own packaged resources. WebAssembly will be disabled, and the extension will not run in-line Javascript or be able to evaluate strings as executable code. If a sandbox page is added, it will have more relaxed permissions for evaluating scripts from outside the extension.

## Minimum and customized Content Security Policies

Developers may add or remove rules for their extension, or use the minimum required content  security policy, to fit the needs of their project. 

### Extension Pages Policy

Chrome enforces a minimum content security policy for extension pages. It is equivalent to specifying the following policy in your manifest:

{# This is statically defined in Chromium source. 
- https://source.chromium.org/chromium/chromium/src/+/main:extensions/common/manifest_handlers/csp_info.cc?q=kMinimumMV3CSP
#}
```json
{
  // ...
  "content_security_policy": {
    "extension_pages": "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';"
  }
  // ...
}
```

The `extension_pages` policy cannot be relaxed beyond this minimum value. In other words, you cannot add other script sources to directives, such as adding `'unsafe-eval'` to `script-src`. If you add a disallowed source to your extension's policy, Chrome will throw an error like this at install time:

```json
'content_security_policy.extension_pages': Insecure CSP value "'unsafe-eval'" in directive 'script-src'.
```
### Sandbox Pages Policy

The default policy for sandboxed pages is much more lenient than with extension pages, as the sandbox page does not have access to extension APIs, or direct access to non-sandboxed pages. The sandbox content security policy can be customized as desired.