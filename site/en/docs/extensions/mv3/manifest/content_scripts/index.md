---
layout: 'layouts/doc-post.njk'
title: 'Manifest - Content Scripts'
seoTitle: 'Chrome Extensions Manifest: content_scripts'
date: 2013-05-12
updated: 2023-07-30
description: Reference documentation for the content_scripts property of manifest.json.
---

## Overview {: #overview}

The `"content_scripts"` field is used to inject scripts or stylesheets at install time on a specific set of pages using [match patterns][doc-match-patterns].

To inject scripts programmatically, see [Injecting Scripts][doc-cs] in the Content Scripts article.

## Manifest {: #manifest }

For example, this extension injects a stylesheet and a JavaScript file into any page in `https://www.example.com/`: 

{% Label %}manifest.json{% endLabel %}

```json
{
 "name": "My extension",
 ...
 "content_scripts": [
   {
     "matches": ["https://www.example.com/*"],
     "css": ["my-styles.css"],
     "js": ["content-script.js"]
   }
 ],
 ...
}
```

## Details

The following sections describe what each object in the array can contain:

### Declaring files {: #files }

Each file must contain a relative path to a resource in the extension's root directory. Leading slashes (`/`) are automatically trimmed. The [`"run_at"`](#world-timings) specifies when each file will be injected.  

<table class="simple">
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr id="css">
      <td><code>css</code></td>
      <td><code>Array</code></td>
      <td>
        <em>Optional.</em> An array of CSS file paths. They are injected in the order of this array, and before any DOM construction or page rendering occurs.
      </td>
    </tr>
    <tr id="js">
      <td><code>js</code></td>
      <td><code>Array</code></td>
      <td>
        <em>Optional.</em> An array of JavaScript file paths. They are injected in the order they appear in this array, after css files are injected.
      </td>
    </tr>
  </tbody>
</table>

### Specifying Matching URLs {: #match-urls }

Only the `"matches"` property is required. Then you can use `"exclude_matches"`, `"include_globs"`, and `"exclude_globs"` to customize which pages code to inject code into.

Glob string URLs can contain "wildcards" **\*** and question marks. The wildcard **\*** matches any string of any length, including an empty string, while the question mark **?** matches any single character.

<table class="simple">
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
       <tr id="matches">
      <td><code>matches</code></td>
      <td><code>Array</code></td>
      <td><em>Required.</em> Specifies which URLs to inject the content script into. See <a
          href="/docs/extensions/mv3/match_patterns/">Match Patterns</a> for syntax details.</td>
    </tr>
    <tr id="exclude_matches">
      <td><code>exclude_matches</code></td>
      <td><code>Array</code></td>
      <td><em>Optional.</em> Excludes pages that this content script would otherwise be injected
        into. See <a href="match_patterns">Match Patterns</a> for syntax details.</td>
    </tr>
    <tr id="include_globs">
      <td><code>include_globs</code></td>
      <td><code>Array</code></td>
      <td><em>Optional.</em> Applied after <code>matches</code> to include only those URLs that also
        match this glob. Intended to emulate the <a
          href="https://wiki.greasespot.net/Metadata_Block#.40include"><code>@include</code></a>
        Greasemonkey keyword.</td>
    </tr>
    <tr id="exclude_globs">
      <td><code>exclude_globs</code></td>
      <td><code>Array</code></td>
      <td><em>Optional.</em> Applied after <code>matches</code> to exclude URLs that match this
        glob. Intended to emulate the <a
          href="https://wiki.greasespot.net/Metadata_Block#.40exclude"><code>@exclude</code></a>
        Greasemonkey keyword.</td>
    </tr>
  </tbody>
</table>

#### `"exclude_matches"` examples
#### `"include_globs"` examples
#### `"exclude_globs"` examples




### Frames {: #frames }

<table class="simple">
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
     <tr id="all_frames">
      <td><code>all_frames</code></td>
      <td>boolean</td>
      <td><em>Optional.</em> Defaults to <code>false</code>, meaning that only the top frame is
        matched.<br><br>If specified <code>true</code>, it will inject into all frames, even if the
        frame is not the topmost frame in the tab. Each frame is checked independently for URL
        requirements, it won't inject into child frames if the URL requirements are not met.</td>
    </tr>
    <tr id="match_about_blank">
      <td><code>match_about_blank</code></td>
      <td>Boolean</td>
      <td><em>Optional.</em> Whether the script should inject into an <code>about:blank</code> frame
        where the parent URL matches one of the patterns declared in
        <code>matches</code>. Defaults to false.</td>
    </tr>
    <tr id="match_origin_as_fallback">
      <td><code>match_origin_as_fallback</code></td>
      <td>Boolean</td>
      <td>
        <em>Optional.</em> Whether the script should inject in frames that were
        created by a matching origin, but whose URL or origin may not directly
        match the pattern. These include frames with different schemes, such as
        <code>about:</code>, <code>data:</code>, <code>blob:</code>, and
        <code>filesystem:</code>. See also
        <a href="#injecting-in-related-frames">Injecting in related frames</a>.
      </td>
    </tr>
  </tbody>
</table>

### World and timings {: #world-timings }

<table class="simple">
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr id="run_at">
      <td><code>run_at</code></td>
      <td><a href="/docs/extensions/reference/scripting/#type-RunAt">RunAt</a></td>
      <td><em>Optional.</em> Specifies when the script should be injected into the page. Defaults to
        <code>document_idle</code>.</td>
    </tr>
    <tr id="world">
      <td><code>world</code></td>
      <td><a href="/docs/extensions/reference/scripting/#type-ExecutionWorld">ExecutionWorld</a></td>
      <td>
        <em>Optional.</em> The JavaScript world for a script to execute within. Defaults to <code>ISOLATED</code>. See also
        <a href="#isolated_world">Work in isolated worlds</a>.
      </td>
    </tr>
  </tbody>
</table>


## Usage

### Customizing matches

### Globs properties {: #globs }

Glob properties are used to refine the URLs already specified by the [match patterns](#what). Acceptable glob
strings are URLs that may contain "wildcard" and question marks. The asterisk **\***
matches any string of any length, including the empty string, while the question mark **?** matches
any single character.

#### Examples {: #examples }

{% Label %}manifest.json{% endLabel %}

```json/6
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

- `https://www.example.com/foo/bar`
- `https://the.example.com/foo/`

{% endCompare %}

{% Compare 'worse', 'No matches' %}

- `https://my.example.com/foo/bar`
- `https://example.com/foo/`
- `https://www.example.com/foo`

{% endCompare %}
</div>

| ✅ Matches                        | ❌ Doesn't match                 |
| --------------------------------- | -------------------------------- |
| `https://www.example.com/foo/bar` | `https://my.example.com/foo/bar` |
| `https://the.example.com/foo/`    | `https://example.com/foo/`       |
| `xx`                              | `https://www.example.com/foo`    |

### `"Include_globs"` {: #include-globs }

{% Label %}manifest.json{% endLabel %}

```json/6
{
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

| ✅ Matches                                | ❌ Doesn't match                            |
| ----------------------------------------- | ------------------------------------------- |
| `https://www.nytimes.com/arts/index.html` | `https://www.nytimes.com/sports/index.html` |
| `https://www.nytimes.com/jobs/index.html` | `https://www.nytimes.com/music/index.html`  |

### Exclude_globs {: #exclude-globs }

{% Label %}manifest.json{% endLabel %}

```json/6
{
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

| ✅ Matches                     | ❌ Doesn't match                  |
| ------------------------------ | --------------------------------- |
| `https://history.nytimes.com`  | `https://science.nytimes.com`     |
| `https://.nytimes.com/history` | `https://www.nytimes.com/science` |

### Narrowing scope {: #narrow }

One, all, or some of these can be included to achieve the correct scope.

{% Label %}manifest.json{% endLabel %}

```json/6-8
{
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

### Injecting in related frames {: #injecting-in-related-frames }

Sometimes, extensions may want to run scripts in related frames that don't match an content script pattern, such as `about:`, `data:`, `blob:`, and `filesystem:` schemes URLs. However, these frames can still be associated with the URLs of the page that created them.

For example, `about:` and
`data:`, do not even include the parent URL or origin in the URL
at all, as in `about:blank` or `data:text/html,<html>Hello, World!</html>`.

To inject into these frames, extensions can set the
`"match_origin_as_fallback"` property to `true`.

{% Label %}manifest.json{% endLabel %}

```json
{
  "name": "My extension",
  ...
  "content_scripts": [
    {
      "matches": ["https://*.google.com/maps/*"],
      "match_origin_as_fallback": true,
      "js": ["content-script.js"]
    }
  ],
  ...
}
```

{% Aside 'important' %}

Because this compares the _origin_ of the frame, the frame could be on at any path from that origin.

So in the example above, the script will also run on any `about:blank`, `data:`, etc frames created with the origin `https://google.com/*`.

{% endAside %}

Chrome will look at the origin of the frame maker to see if it matches, rather than the frame's URL. 
 
Note that this might also be different than the
target frame's _origin_ (e.g., `data:` URLs have a null origin).

The initiator of the frame is the frame that created or navigated the target
frame. While this is commonly the direct parent or opener, it may not be (as in
the case of a frame navigating an iframe within an iframe).

When both `"match_origin_as_fallback"` and `"match_about_blank"` are specified,
`"match_origin_as_fallback"` takes priority.

## Example

The Focus mode tutorial and Read time tutorial demonstrate how to inject.

[doc-match-patterns]: /docs/extensions/reference/
[doc-cs]: /docs/extensions/reference/
