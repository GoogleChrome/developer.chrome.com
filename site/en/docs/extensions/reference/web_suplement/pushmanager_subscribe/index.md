---
layout: "layouts/doc-post.njk"
title: "PushManager.subscribe()"
seoTitle: "PushManager.subscribe() in extensions"
date: 2023-11-29
description: Use PushManager.subscribe() in extensions.
---

The [subscribe()](https://developer.mozilla.org/docs/Web/API/PushManager/subscribe) method of the [PushManager](https://developer.mozilla.org/docs/Web/API/PushManager) interface subscribes to a push service. This page describes aspects of the method that are particular to extensions. Refer to MDN for complete details of the [Push API](https://developer.mozilla.org/docs/Web/API/Push_API).

## Availability in extensions

The Push API is available in any Chrome extension; however, some versions have differences with standard Push API that are specific to extensions. See [Extension differences](https://pr-7188-static-dot-dcc-staging.uc.r.appspot.com/docs/extensions/reference/web/pushmanager-subscribe/#extension-differences) for details.

## Chrome extension differences

For differences that require a specific Chrome version, you must specify a minimum Chrome version using the ["`minimum_chrome_version`"](https://pr-7188-static-dot-dcc-staging.uc.r.appspot.com/docs/extensions/mv3/manifest/minimum_chrome_version/) manifest key.

userVisibleOnly (Chrome 120 or later)
: This argument to PushManager.subscribe() specifies whether push messages from the server must be shown to the user as a notification. Typically, this value is required to be set to true. When used in an extension service worker, this argument may be false in Chrome 120 or later, meaning that no notification will be shown. This allows a push to be used as a Web Push based client-server communication method.

## Permissions

Requires the following in the permissions field of the manifest file:

```json
"notifications"
```

Additionally, PushManager triggers a user permission flow.

## Manifest keys

None are needed for this API.

## Supporting contexts

This API may be used in:

-  Extension service workers

## Example

TBD
