## Manifest - Content Security Policy 

## 

An optional Manifest key defining restrictions on the sources, scripts, and objects able to be used by an extension. Within this manifest key, separate policies can be defined for both extension pages and sandboxed extension pages.

The "extension pages" policy applies to page and worker contexts in the extension. This would include the extension popup, background worker, and tabs with html pages or iframes that were opened by the extension. The sandbox policy applies to all pages specified as a [sandbox page](/docs/extensions/mv3/manifest/sandbox/) in the manifest.

## Default Policy

If the [content security policy](https://developer.mozilla.org/docs/Web/HTTP/CSP) is not defined by the user in the manifest, the default properties will be used for both extension pages and sandboxed extension pages.   
These defaults are equivalent to specifying the following policies in your manifest:

```json
{
  // ...
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self';",
    "sandbox": "sandbox allow-scripts allow-forms allow-popups allow-modals; script-src 'self' 'unsafe-inline' 'unsafe-eval'; child-src 'self';
"
  }
  // ...
}
```



In this case, the extension will only load local scripts and objects from its own packaged resources. WebAssembly will be disabled, and the extension will not run in-line Javascript or be able to evaluate strings as executable code. If a sandbox page is added, it will have more relaxed permissions for evaluating scripts from outside the extension.

## Minimum and customized Content Security Policies

Developers may add or remove rules for their extension, or use the minimum required content  security policy, to fit the needs of their project. 

### Extension Pages Policy

The minimum allowable content security policy for extension pages is as follows:

```json
...
"content_security_policy": {
    "extension_pages": "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';"
}
...
```

Developers can then add further restrictions as needed, such as disabling WebAssembly, and adding specific security policies to only allow scripts and objects from certain domains and subdomains.  
enable potentially unsafe practices such as the use of eval() to run code.
### Sandbox Pages Policy

The default content security policy for sandbox pages is as follows:

```json
...
"content_security_policy": {
    "sandbox": sandbox allow-scripts allow-forms allow-popups allow-modals; script-src 'self' 'unsafe-inline' 'unsafe-eval'; child-src 'self';
}
...
```

The default policy for sandboxed pages is much more lenient than with extension pages, as the sandbox page does not have access to extension APIs, or direct access to non-sandboxed pages. The sandbox content security policy can only be further restricted from its default state.