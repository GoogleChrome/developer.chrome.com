---
layout: "layouts/doc-post.njk"
title: "Manifest - Nacl Modules"
seoTitle: "Chrome Apps Manifest - Nacl Modules [Deprecated]"
#date: TODO
#updated: TODO
#description: TODO
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

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
Overview][3].

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

{% Aside %}

**Note:** You can use Native Client modules in extensions without specifying "nacl_modules". Use
"nacl_modules" only if you want the browser to use your Native Client module to display a particular
type of content.

{% endAside %}

[1]: https://blog.chromium.org/2020/08/changes-to-chrome-app-support-timeline.html
[2]: /apps/migration
[3]: /native-client/overview?csw=1
