---
layout: "layouts/doc-post.njk"
title: "File handling on Chrome OS"
seoTitle: "Opening files in ChromeOS Extensions"
date: 2023-11-01
description: How to open files in Chrome extension service workers, popups, side panels, or content scripts.
---
File handling lets you configure ChromeOS so that your extension can open files using either the Open menu of the file menu or the Open with menu of the context menu. Once open, you process the file's data using the web platform's [Launch Handler API](https://developer.mozilla.org/docs/Web/API/Launch_Handler_API). You will then user standard web platform APIs to [display or handle the file]().

<figure>
  {% Img src="image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/7GnNUZTtlH7Mohloh8tM.png", alt="A file handler added to the ChromeOS Open menu.", width="800", height="446" %}
  <figcaption>A file handler added to the ChromeOS Open menu.</figcaption>
</figure>

## Availability in extensions

ChromeOS 120 or later.

## Permissions

No permissions are required for file handling.

## Manifest

You need to add the [`"file_handlers"`](/docs/extensions/mv3/manifest/file_handlers/) array to the manifest.json file.

## Supporting contexts

This API may be used in extension service workers, popups, side panels, or content scripts.

## Configure a file handler

Each member of the `"file_handlers"` &mdash;meaning each _file handler_&mdash;specifies a file type or types to be handled by a specific extension page.

The handlers you specify will be added to the ChromeOS Files window, the Open and Open with menus specifically. They will only appear in these menus when the user selects a file with the specific extension. For example, if a file handler specifies `.txt` the ChromeOS menus only show that handler when a file with that extension is selected.

## Process a file

The file handler is an HTML file contained within your extension. When the user selects your handler from a menu, the HTML file opens in a new tab. Processing the file, whether you display it or use it in some other way, is done with JavaScript using appropriate web platform APIs. Processing code must be in a separate JavaScript file and included via a `<script>` tag and must also be in your extension. The script file uses the [`LaunchQueue`](https://developer.mozilla.org/docs/Web/API/LaunchQueue) interface of the Launch Handler API to get a [`FileSystemFileHandle`](https://developer.mozilla.org/docs/Web/API/FileSystemFileHandle) object.

## Example

The following example demonstrates how to get a `FileSystemFileHandle` object using the `LaunchQueue` interface. To see file handling in action, install the [File Handling Demo](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.file_handlers/README.md).

```javascript
if ('launchQueue' in window) {
  launchQueue.setConsumer(async launchParams => {
    if (!launchParams.files || !launchParams.files.length) { return; }
    const fileHandle = launchParams.files[0];
  });
}
``````
