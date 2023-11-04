---
layout: "layouts/doc-post.njk"
title: "Manifest - File Handlers"
seoTitle: "Chrome Apps Manifest - File Handlers [Deprecated]"
date: 2013-05-11
updated: 2016-04-19
description: Reference documentation for the file_handlers property of manifest.json.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

Used by [packaged apps][3] to specify what types of files the app can handle. An app can have
multiple `file_handlers`, with each one having an identifier, a list of MIME types and/or a list of
file extensions that can be handled. The app can handle a file if it either has a matching file
extension or has a matching MIME type. The app can also handle directories if `include_directories`
is set. You can use a wildcard `"*"` in `types` or `extensions` to indicate that the app can handle
any file type or `"_type_/*"` in `types` to indicate that the app can handle any file with a MIME
type of `_type_`. Here's an example of specifying file handlers:

```json
"file_handlers": {
  "text": {
    "types": [
      "text/*"
    ],
  },
  "image": {
    "types": [
      "image/png",
      "image/jpeg"
    ],
    "extensions": [
      "tiff"
    ],
  },
  "any": {
    "extensions": [
      "*",
      "include_directories": true
    ],
  }
}
```

To handle files or directories, apps also need to declare the [fileSystem][4] permission. Apps can
then be passed files or directories in the [app.runtime.onLaunched][5] event - either from the
system file manager (currently supported on ChromeOS only) or by providing a path on the [command
line][6].

[1]: https://blog.chromium.org/2020/08/changes-to-chrome-app-support-timeline.html
[2]: /apps/migration
[3]: ../app_lifecycle#eventpage
[4]: /apps/fileSystem
[5]: /apps/app.runtime#event-onLaunched
[6]: ../first_app#open
