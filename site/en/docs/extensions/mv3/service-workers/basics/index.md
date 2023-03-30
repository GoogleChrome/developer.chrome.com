---
layout: 'layouts/doc-post.njk'
title: Extension service worker basics
subhead: TBD
description: Extension service workers are installed and updated differently from web service workers.
date: 2023-03-29
---

Extension service workers are installed and updated differently from web service workers. This page explains those differences.

## Registering service workers

To register an extension service worker, specify it in the `"background"` field of the `manifest.json` file. Use the `"service_worker"` key, which specifies a single JavaScript file.

```json
{
  "name": "Awesome Test Extension",
  ...
  "background": {
    "service_worker": "serice-worker.js"
  },
  ...
}

```

Service workers in web pages or web apps register service workers by first feature-detecting for `serviceWorker` in `navigator` then calling `register()` inside feature detection. This does not work for Extensions.

## Importing scripts

If you want to use ecmascript modules with a service worker, add the `"type" field to your manifest and specify `"module"`. For example:

```json/2
  "background": {
    "service_worker": "background.js",
    "type": "module"
  }
```

Then use `import` as you normally would. Note that [import assertions](https://v8.dev/features/import-assertions) are not supported.

```javascript
import { tldLocales } from './locales.js';
```
## Updating

To update the service worker, [publish a new version](/docs/webstore/publish/) of your extension to the Chrome Web Store. You cannot get around this by loading your extension from a server. For security reasons Manifest V3 [does not support](/docs/extensions/migrating/improve-security/#remove-remote-code) remotely-hosted code. Your service worker must be part of the extension package.

## Event differences

There are differences between how service workers events function on a web page versus how they function in an extension. These differences are covered in the next two sections, [The service worker lifecycle](/docs/extensions/service_workers/lifecycle) and [Supported extension events](/docs/extensions/service_workers/events).
