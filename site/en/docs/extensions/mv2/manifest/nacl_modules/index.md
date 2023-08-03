---
layout: "layouts/doc-post.njk"
title: "Manifest - Nacl Modules"
seoTitle: "Manifest V2 - Nacl Modules [Deprecated]"
date: 2013-05-12
updated: 2018-04-26
description: Reference documentation for the nacl_modules property of manifest.json.
---

{% Partial 'extensions/mv2-legacy-page.md' %}

One or more mappings from MIME types to the Native Client module that handles each type. For
example, the bold code in the following snippet registers a Native Client module as the content
handler for the OpenOffice spreadsheet MIME type.

```json
{
  "name": "Native Client OpenOffice Spreadsheet Viewer",
  "version": "0.1",
  "description": "Open OpenOffice spreadsheets, right in your browser.",
  "nacl_modules": [{
    "path": "OpenOfficeViewer.nmf",
    "mime_type": "application/vnd.oasis.opendocument.spreadsheet"
  }]
}
```

The value of "path" is the location of a Native Client manifest (a `.nmf` file) within the extension
directory. For more information on Native Client and `.nmf` files, see the [Native Client Technical
Overview][1].

Each MIME type can be associated with only one `.nmf` file, but a single `.nmf` file might handle
multiple MIME types. The following example shows an extension with two `.nmf` files that handle
three MIME types.

```json
{
  "name": "Spreadsheet Viewer",
  "version": "0.1",
  "description": "Open OpenOffice and Excel spreadsheets, right in your browser.",
  "nacl_modules": [{
    "path": "OpenOfficeViewer.nmf",
    "mime_type": "application/vnd.oasis.opendocument.spreadsheet"
  },
  {
    "path": "OpenOfficeViewer.nmf",
    "mime_type": "application/vnd.oasis.opendocument.spreadsheet-template"
  },
  {
    "path": "ExcelViewer.nmf",
    "mime_type": "application/excel"
  }]
}
```

<div class="aside aside--note"><strong>Note:</strong> You can use Native Client modules in extensions without specifying "nacl_modules". Use "nacl_modules" only if you want the browser to use your Native Client module to display a particular type of content.</div>

[1]: /docs/native-client/overview?csw=1
