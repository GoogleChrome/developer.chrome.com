---
layout: 'layouts/doc-post.njk'
title: Update your code
subhead: 'Updates that are unrelated to other issues'
description: 'The first of three sections describing changes needed for code that is not part of the extension service worker.'
date: 2023-02-28
---

This is the first of three sections describing changes needed for code that is not part of the extension service worker. This section is for required code changes that are unrelated to other issues. The next two sections cover [blocking web requests](/docs/extensions/upgrading/blocking-web-requests) and [improving security](/docs/extensions/upgrading/improve-security).

## Replace tabs.executeScript() with scripting.executeScript() {: #replace-executescript }

In Manifest V3, `executeScript()` moves from the `tabs` API to the [`scripting` API](/docs/extensions/reference/scripting/). This requires changes to permissions in the manifest file in addition to actual code changes.

For the `executeScript()` method you need:

* The `"scripting"` permission.
* Either host permissions or the `"activeTab"` permission.

You will still need `"host_permissions"` for the sites you inject into, or the `"activeTab"` permission if the code is injected in response to a user gesture.

The `scripting.executeScript()` method is similar to how it worked with `tabs.executeScript()`. There are a few differences:

* While the old method could only take a single file, the new method can take an array of files. 
* You also pass a [`ScriptInjection` object](/docs/extensions/reference/scripting/#type-ScriptInjection) instead of [`InjectDetails`](/docs/extensions/reference/extensionTypes/#type-InjectDetails). There are multiple differences between the two. For example, the `tabId` is now passed as a member of `ScriptInjection.target` instead of as a method argument.

The example shows how to do this.
