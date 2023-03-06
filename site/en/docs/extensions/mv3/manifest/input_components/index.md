---
layout: "layouts/doc-post.njk"
title: "Manifest - input_components"
date: 2022-10-28
updated: 
description: Reference documentation for the input_components property of manifest.json.
---

An optional Manifest key enabling the use of the  [`input.ime` API](/docs/extensions/reference/input_ime/) (Input Method Editor) for use with ChromeOS. This allows your extension to handle keystrokes, set the composition, and open assistive windows. Developers must also declare the `"input"` permission in the extension's `"permissions"` array. 
The key accepts an array of objects: ```name```, ```id```, ```language```, ```layouts```, ```input_view```, and ```options_page``` (Refer to the table below).

| Property | Type | Description | 
| --- | --- | :-- | 
| `name` | string | Required name of the input component object.  |
| `id` | string | Optional component object id. |
| `language` | string (or array of strings)| Optional specified language or list of applicable languages. Examples: "en", ["en", "pt"] |
| `layouts` | string (or array of strings)| Optional list of input methods. Note that ChromeOS only supports one layout per input method. If multiple layouts are specified, selection order is undefined. Extensions are therefore strongly encouraged to only specify one layout per input method. For keyboard layouts, a `xkb:` prefix indicates that this is a keyboard layout extension.
Example: ["us::eng"]|
| `input_view` | string| Optional string specifying an extension resource.|
| `options_page` | string| Optional string specifying an extension resource. If not provided, the default extension's options page will be used.|

```json
{
  // ...
   "input_components": [{
     "name": "ToUpperIME",
    "id": "ToUpperIME",
    "language": "en",
    "layouts": ["us::eng"]
  }]
  // ...
}
```
