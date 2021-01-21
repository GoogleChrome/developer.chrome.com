---
layout: "layouts/doc-post.njk"
title: "Tutorial: Migrate to Manifest V2"
date: 2014-02-28
updated: 2018-09-20
description: Guidelines on how to migrate from manifest v1 to manifest v2.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

Manifest version 1 was deprecated in Chrome 18, and support will be phased out according to the
[manifest version 1 support schedule][1]. The changes from version 1 to version 2 fall under two
broad categories: API changes and Security changes.

This document provides checklists for migrating your Chrome extensions from manifest version 1 to
version 2, followed by more detailed summaries of what these changes mean and why they were made.

## API changes checklist {: #api-checklist }

- Are you using the `browser_actions` property or the `chrome.browserActions` API?

- Replace `browser_actions` with the singular `browser_action` property.
- Replace `chrome.browserActions` with `chrome.browserAction`.
- Replace the `icons` property with `default_icon`.
- Replace the `name` property with `default_title`.
- Replace the `popup` property with `default_popup` (and it now must be a string).

- Are you using the `page_actions` property or the `chrome.pageActions` API?

- Replace `page_actions` with `page_action`.
- Replace `chrome.pageActions` with `chrome.pageAction`.
- Replace the `icons` property with `default_icon`.
- Replace the `name` property with `default_title`.
- Replace the `popup` property with `default_popup` (and it now must be a string).

- Are you using the `chrome.self` property?

- Replace with `chrome.extension`.

- Are you using the `Port.tab` property?

- Replace with `Port.sender`.

- Are you using the `chrome.extension.getTabContentses()` or the
  `chrome.extension.getExtensionTabs()` APIs?

- Replace with `chrome.extension.getViews( { "type" : "tab" } )`.

- Does your extension use a background page?

- Replace the `background_page` property with a `background` property.
- Add a `scripts` or `page` property that contains the code for the page.
- Add a `persistent` property and set it to `false` to convert your background page to an [event
  page][2]

## Security changes checklist {: #security-checklist }

- Are you using inline script blocks in HTML pages?

- Remove JS code contained within `<script>` tags and place it within an external JS file.

- Are you using inline event handlers (like onclick, etc)?

- Remove them from the HTML code, move them into an external JS file and use `addEventListener()`
  instead.

- Does your extension inject content scripts into Web pages that need to access resources (like
  images and scripts) that are contained in the extension's package?

- Define the [web_accessible_resources][3] property and list the resources (and optionally a
  separate Content Security Policy for those resources).

- Does your extension embed external Web pages?

- Define the [sandbox][4] property.

- Is your code or library using `eval()`, new `Function()`, `innerHTML`, `setTimeout()`, or
  otherwise passing strings of JS code that are dynamically evaluated?

- Use `JSON.parse()` if you're parsing JSON code into an object.
- Use a CSP-friendly library, for example, [AngularJS][5].
- Create a sandbox entry in your manifest and run the affected code in the sandbox, using
  `postMessage()` to communicate with the sandboxed page.

- Are you loading external code, such as jQuery or Google Analytics?

- Consider downloading the library and packaging it in your extension, then loading it from the
  local package.
- Allowlist the HTTPS domain that serves the resource in the "content_security_policy" part of your
  manifest.

## Summary of API changes {: #api-summary }

Manifest version 2 introduces a few changes to the browser action and page action APIs, and replaces
a few old APIs with newer ones.

### Changes to browser actions {: #browser_actions }

The browser actions API introduces some naming changes:

- The `browser_actions` and `chrome.browserActions` properties have been replaced with their
  singular counterparts `browser_action` and `chrome.browserAction`.
- Under the old `browser_actions` property, there were `icons`, `name`, and `popup` properties.
  These have been replaced with:

- `default_icon` for the browser action badge icon
- `default_name` for the text that appears in the tooltip when you hover over the badge
- `default_popup` for the HTML page that represents the UI for the browser action (and this must now
  be a string, it cannot be an object)

### Changes to page actions {: #page_actions }

Similar to the changes for browser actions, the page actions API has also changed:

- The `page_actions` and `chrome.pageActions` properties have been replaced with their singular
  counterparts `page_action` and `chrome.pageAction`.
- Under the old `page_actions` property, there were `icons`, `name`, and `popup` properties. These
  have been replaced with:

- `default_icon` for the page action badge icon
- `default_name` for the text that appears in the tooltip when you hover over the badge
- `default_popup` for the HTML page that represents the UI for the page action (and this must now be
  a string, it cannot be an object)

### Removed and changed APIs {: #removed_and_changed }

A few extension APIs have been removed and replaced with new counterparts:

- The `background_page` property has been replaced by [background][6].
- The `chrome.self` property has been removed, use `chrome.extension`.
- The `Port.tab` property has been replaced with `Port.sender`.
- The `chrome.extension.getTabContentses()` and the `chrome.extension.getExtensionTabs()` APIs have
  been replaced by `chrome.extension.getViews( { "type" : "tab" } )`.

## Summary of security changes {: #security-summary }

There are a number of security-related changes that accompany the move from manifest version 1 to
version 2. Many of these changes stem from Chrome's adoption of [Content Security Policy][7]; you
should read more about this policy to understand its implications.

### Inline scripts and event handlers disallowed {: #inline_scripts }

Due to the use of [Content Security Policy][8], you can no longer use `<script>` tags that are inline
with the HTML content. These must be moved to external JS files. In addition, inline event handlers
are also not supported. For example, suppose you had the following code in your extension:

```html
<html>
<head>
  <script>
    function myFunc() { ... }
  </script>
</head>
</html>
```

This code would cause an error at runtime. To fix this, move `<script>` tag contents to external files
and reference them with a `src='path_to_file.js'` attribute.

Similarly, inline event handlers, which are a common occurrence and convenience feature used by many
Web developers, will not execute. For example, consider common instances such as:

```html
<body onload="initialize()">
<button onclick="handleClick()" id="button1">
```

These will not work in manifest V2 extensions. Remove the inline event handlers, place them in your
external JS file and use `addEventListener()` to register event handlers for them instead. For
example, in your JS code, use:

```html
window.addEventListener("load", initialize);
...
document.getElementById("button1").addEventListener("click",handleClick);
```

This is a much cleaner way of separating your extension's behavior from its user interface markup.

### Embedding content {: #embedding }

There are some scenarios where your extension might embed content that can be used externally or
come from an external source.

**Extension content in web pages:**
If your extension embeds resources (like images, script, CSS styles, etc) that are used in content
scripts that are injected into web pages, you need to use the [web_accessible_resources][9] property
to allowlist these resources so that external Web pages can use them:

```json
{
...
  "web_accessible_resources": [
    "images/image1.png",
    "script/myscript.js"
  ],
...
}
```

**Embedding external content:**
The Content Security Policy only allows local script and objects to loaded from your package, which
prevents external attackers from introducing unknown code to your extension. However, there are
times when you want to load externally served resources, such as jQuery or Google Analytics code.
There are two ways to do this:

1.  Download the relevant library locally (like jQuery) and package it with your extension.
2.  You can relax the CSP in a limited way by allowlisting HTTPS origins in the
    "content_security_policy" section of your manifest. To include a library like Google Analytics,
    this is the approach to take:

    ```json
    {
      ...,
      "content_security_policy": "script-src 'self'
      https://ssl.google-analytics.com; object-src 'self'",
      ...
    }
    ```

### Using dynamic script evaluation {: #using }

Perhaps one of the biggest changes in the new manifest v2 scheme is that extensions can no longer
use dynamic script evaluation techniques like `eval()` or new `Function()`, or pass strings of JS
code to functions that will cause an `eval()` to be used, like `setTimeout()`. In addition, certain
commonly used JavaScript libraries, such as Google Maps and certain templating libraries, are known
to use some of these techniques.

Chrome provides a sandbox for pages to run in their own origin, which are denied access to chrome.\*
APIs. In order to use `eval()` and the like under the new Content Security Policy:

1.  Create a sandbox entry in your manifest file.
2.  In the sandbox entry, list the pages you want to run in the sandbox.
3.  Use message passing via `postMessage()` to communicate with the sandboxed page.

For more details on how to do this, see the [Sandboxing Eval][10] documentation.

## Further reading {: #further-reading }

The changes in manifest version 2 are designed to guide developers toward building more secure and
robustly-architected extensions and apps. To see a complete list of changes from manifest version 1
to version 2, see the [manifest file][11] documentation. For more information about using sandboxing
to isolate unsafe code, read the [sandboxing eval][12] article. You can learn more about Content
Security Policy by visiting our extensions-related tutorial and a [good introduction on
HTML5Rocks][13].

[1]: /docs/extensions/mv2/manifestVersion#manifest-v1-support-schedule
[2]: /docs/extensions/mv2/event_pages
[3]: /docs/extensions/mv2/manifest/web_accessible_resources
[4]: /docs/extensions/mv2/manifest/sandbox
[5]: http://angularjs.org/
[6]: /docs/extensions/mv2/background_pages
[7]: /docs/extensions/mv2/contentSecurityPolicy
[8]: /docs/extensions/mv2/contentSecurityPolicy
[9]: /docs/extensions/mv2/manifest/web_accessible_resources
[10]: /docs/extensions/mv2/sandboxingEval
[11]: /docs/extensions/mv2/manifestVersion
[12]: /docs/extensions/mv2/sandboxingEval
[13]: http://www.html5rocks.com/en/tutorials/security/content-security-policy/
