---
layout: "layouts/doc-post.njk"
title: "PushManager.subscribe()"
seoTitle: "PUshManager.subscribe() in extensions"
date: 2023-08-28
description: Use PushManager.subscribe() in extensions.
---

The [subscribe()](https://developer.mozilla.org/docs/Web/API/PushManager/subscribe) method of the [PushManager](https://developer.mozilla.org/docs/Web/API/PushManager) interface subscribes to a push service. Refer to MDN for complete details of the [Push API](https://developer.mozilla.org/docs/Web/API/Push_API).

This method requires an option named `userVisibleOnly`, which has always been set to `true`. This option specifies that every push message from the server must be shown to the user as a notification. In supported versions of Chrome (see Availability), extensions can set this value to `false` so that no notification will be shown.


## Availability

Chrome 117 or later.

## Permissions

Requires the following in the permissions field of the manifest file:

```json
"notifications"
```

Additionally, PushManager triggers a user permission flow.

## Supporting contexts

This API may be used in:

* Extension service workers

## Example

TBD
