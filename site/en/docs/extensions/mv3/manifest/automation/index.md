---
layout: "layouts/doc-post.njk"
title: "Manifest - automation"
date: 2022-10-28
updated: 
description: Reference documentation for the automation property of manifest.json.
---

An optional manifest key only publicly accessible on the Chrome 109 canary [dev channel](www.chromium.org/getting-involved/dev-channel/#how-do-i-choose-which-channel-to-use). Including this manifest key allows access to the [chrome.automation API](/docs/extensions/reference/automation/), exposing access to the automation (accessibility) tree for the browser, which can be used to programmatically interact with a page by examining names, roles, and states, listening for events, and performing actions on nodes. You can specify a list of URL patterns for which this extension may request an automation tree. If not specified, automation permission will be granted for the sites for which the extension has a [host permission](/extensions/declare_permissions#host-permissions) or [activeTab permission](/extensions/declare_permissions#activeTab).

```json
{
  // ...
         "automation": ["https://www.exampleurl.com"],
  // ...
}
```