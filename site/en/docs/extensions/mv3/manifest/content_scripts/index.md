---
layout: 'layouts/doc-post.njk'
title: 'Manifest - content scripts'
seoTitle: 'Chrome Extensions Manifest: "content_scripts"'
date: 2023-08-10
updated: 2023-10-26
description: Reference documentation for the "content_scripts" property of manifest.json.
---

## Overview {: #overview }

The `"content_scripts"` key specifies a statically loaded JavaScript or CSS file to be used every time a page is opened that matches a certain [URL pattern][doc-match]. Extensions can also inject content scripts programmatically, see [Injecting Scripts][doc-cs] for details.

## Manifest {: #manifest }

These are the supported keys for `"content_scripts"`. Only the `"matches"` key and either `"js"` or `"css"` are required.

{% Label %}manifest.json{% endLabel %}

```json
{
 "name": "My extension",
 ...
 "content_scripts": [
   {
     "matches": ["https://*.example.com/*"],
     "css": ["my-styles.css"],
     "js": ["content-script.js"],
     "exclude_matches": ["*://*/*foo*"],
     "include_globs": ["*example.com/???s/*"],
     "exclude_globs": ["*bar*"],     
     "all_frames": false,
     "match_origin_as_fallback": false,
     "match_about_blank": false,
     "run_at": "document_idle",
     "world": "ISOLATED",
   }
 ],
 ...
}
```

## Files {: #files }

Each file must contain a relative path to a resource in the extension's root directory. Leading slashes (`/`) are automatically trimmed. The [`"run_at"`](#world-timings) key specifies when each file will be injected.  

`"css"` - Array
: _Optional_. An array of CSS file paths, injected in the order of this array, and before any DOM construction or page rendering occurs.
      
`"js"` - Array,
: _Optional_. An array of JavaScript file paths, injected in the order they appear in this array, after css files are injected. Each string in the array must be a relative path to a resource in the extension's root directory. Leading slashes ('/') are automatically trimmed.

## Matching URLs {: #match-urls }

Only the `"matches"` property is required. Then you can use `"exclude_matches"`, `"include_globs"`, and `"exclude_globs"` to customize which URLs to inject code into. The `"matches"` key will [trigger a warning][perm-warn]. 

`"matches"` - Array
: _Required_. Specifies which URL patterns to inject the content scripts into. See [Match Patterns][doc-match] for syntax.

`"exclude_matches"` - Array
: _Optional_. Excludes the URL patterns to inject the content scripts into. See [Match Patterns][doc-match] for syntax.

`"include_globs"` - Array
: _Optional_. Applied after matches to include only those URLs that also match this glob. Intended to emulate the [@include][grease-include] Greasemonkey keyword.
        
`"exclude_globs"` - Array
: _Optional_. Applied after matches to exclude URLs that match this glob. Intended to emulate the [@exclude][grease-exclude] Greasemonkey keyword.

Glob URLs are those that contain "wildcards" **\*** and question marks. The wildcard **\*** matches any string of any length, including an empty string, while the question mark **?** matches any single character. 

The content script is injected into a page if:
- Its URL matches any `"matches"` and `"include_globs"` patterns.
- And the URL doesn't match `"exclude_matches"` or `"exclude_globs"` patterns.

{% Details %}
{% DetailsSummary %}
### Globs and URL matching examples {: #matching-samples }
{% endDetailsSummary %}

#### `"include_globs"` {: #incl-globs }

{% Label %}manifest.json{% endLabel %}

```json/5
{
  ...
  "content_scripts": [
    {
      "matches": ["https://*.example.com/*"],
      "include_globs": ["https://???.example.com/foo/"],
      "js": ["content-script.js"]
    }
  ],
  ...
}
```

<div class="switcher">
{% Compare 'better', 'Matches' %}
```text
https://www.example.com/foo/bar
https://the.example.com/foo/
```
{% endCompare %}

{% Compare "worse", "Does not match" %}
```text
https://my.example.com/foo/bar
https://example.com/foo/
https://www.example.com/foo
```
{% endCompare %}
</div>

{% Label %}manifest.json{% endLabel %}

```json/5
{
  ...
  "content_scripts": [
    {
      "matches": ["https://*.example.com/*"],
      "include_globs": ["*example.com/???s/*"],
      "js": ["content-script.js"]
    }
  ],
  ...
}
```

<div class="switcher">
{% Compare 'better', 'Matches' %}
```text
https://www.example.com/arts/index.html
https://www.example.com/jobs/index.html
```
{% endCompare %}

{% Compare "worse", "Does not match" %}
```text
https://www.example.com/sports/index.html
https://www.example.com/music/index.html
```
{% endCompare %}
</div>

#### `"exclude_globs"` {: #excl-globs }

{% Label %}manifest.json{% endLabel %}

```json/5
{
  ...
  "content_scripts": [
    {
      "matches": ["https://*.example.com/*"],
      "exclude_globs": ["*science*"],
      "js": ["content-script.js"]
    }
  ],
  ...
}
```

<div class="switcher">
{% Compare 'better', 'Matches' %}
```text
https://history.example.com
https://.example.com/music
```
{% endCompare %}

{% Compare "worse", "Does not match" %}
```text
https://science.example.com
https://www.example.com/science
```
{% endCompare %}
</div>

#### Advanced customization example {: #all-custom }

{% Label %}manifest.json{% endLabel %}

```json/5-7
{
  ...
  "content_scripts": [
    {
      "matches": ["https://*.example.com/*"],
      "exclude_matches": ["*://*/*business*"],
      "include_globs": ["*example.com/???s/*"],
      "exclude_globs": ["*science*"],
      "js": ["content-script.js"]
    }
  ],
  ...
}
```

<div class="switcher">
{% Compare 'better', 'Matches' %}
```text
https://www.example.com/arts/index.html
https://.example.com/jobs/index.html
```
{% endCompare %}

{% Compare "worse", "Does not match" %}
```text
https://science.example.com
https://www.example.com/jobs/business
https://www.example.com/science
```
{% endCompare %}
</div>

{% endDetails %}

## Frames {: #frames }

The `"all_frames"` key specifies if the content script should be injected into all frames matching the specified URL requirements. If set to `false` it will only inject into the topmost frame. It can be used along with `"match_about_blank"` to inject into an `about:blank` frame. 

To inject into other frames like `data:`, `blob:`, and `filesystem:`, set the `"match_origin_as_fallback"` to `true`. For details, see [Injecting in related frames][cs-inject-frames]

`"all_frames"` Boolean
: _Optional_. Defaults to `false`, meaning that only the top frame is matched. If set to true, it will inject into all frames, even if the frame is not the topmost frame in the tab. Each frame is checked independently for URL requirements, it won't inject into child frames if the URL requirements are not met.

`"match_about_blank"`- Boolean
: _Optional_. Defaults to `false`. Whether the script should inject into an `about:blank` frame where the parent URL matches one of the patterns declared in `"matches"`.

`"match_origin_as_fallback"` - Boolean
: _Optional_. Defaults to `false`. Whether the script should inject in frames that were created by a matching origin, but whose URL or origin may not directly match the pattern. These include frames with different schemes, such as `about:`, `data:`, `blob:`, and `filesystem:`.

## Run time and execution environment {: #world-timings }

By default, content scripts are injected when the document and all resources are finished loading, and live in a private isolated execution environment that isn't accessible to the page or other extensions. You can change these defaults in the following keys:

[`"run_at"`][scripting-runat] - `document_start` | `document_end` | `document_idle`
: _Optional_. Specifies when the script should be injected into the page. It corresponds with the loading states of [Document.readyState][mdn-ready-state]:
    - `"document_start"`: the DOM is still loading.
    - `"document_end"`: the page's resources are still loading
    - `"document_idle"`: the DOM and resources have finished loading. This is the default.

[`"world"`][scripting-world] - `ISOLATED` | `MAIN`
: _Optional_. The JavaScript world for a script to execute within. Defaults to `"ISOLATED"`, which is the execution environment unique to the content script. Choosing the `"MAIN"` world means the script will share the execution environment with the host page's JavaScript. See [Work in isolated worlds][cs-worlds] to learn more.

{% Aside 'warning' %}
There are risks involved when using the `"MAIN"` world. The host page can access and interfere with the injected script. See [Work in isolated worlds][cs-worlds] to learn more.
{% endAside %}

## Example

See the [Run on every page][tut-every-page] tutorial to build an extension that injects a content script in the manifest.

[doc-match]: /docs/extensions/mv3/match_patterns
[doc-cs]: /docs/extensions/mv3/content_scripts
[tut-every-page]: /docs/extensions/mv3/getstarted/tut-reading-time/
[mdn-ready-state]: https://developer.mozilla.org/docs/Web/API/Document/readyState
[cs-inject-frames]: /docs/extensions/mv3/content_scripts#injecting-in-related-frames
[cs-worlds]: /docs/extensions/mv3/content_scripts#isolated_world
[scripting-runat]: /docs/extensions/reference/extensionTypes/#type-RunAt
[scripting-world]: /docs/extensions/reference/scripting/#type-ExecutionWorld
[perm-warn]: /docs/extensions/mv3/permission_warnings/
[grease-include]: https://wiki.greasespot.net/Metadata_Block#.40include
[grease-exclude]: https://wiki.greasespot.net/Metadata_Block#.40exclude
