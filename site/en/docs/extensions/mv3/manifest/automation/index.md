---
layout: "layouts/doc-post.njk"
title: "Manifest - automation"
date: 2022-10-28
updated: 
description: Reference documentation for the automation property of manifest.json.
---

An optional manifest key only publicly accessible on [dev builds](www.chromium.org/getting-involved/dev-channel/#how-do-i-choose-which-channel-to-use). Including this manifest key allows access to the [chrome.automation API](/docs/extensions/reference/automation/), exposing access to the automation (accessibility) tree for the browser, which can be used to programmatically interact with a page by examining names, roles, and states, listening for events, and performing actions on nodes. The key accepts an object with the following properties: ```desktop```, ```interact```, and ```matches```(see the table below). If no matches are specified, automation permission will be granted on sites for which the extension has a [host permission](/extensions/declare_permissions#host-permissions) or [activeTab permission](/extensions/declare_permissions#activeTab).

| Property | Type | Description | 
| --- | --- | :-- | 
| `desktop` | boolean | Used to gate access to `getDesktop()` and accessibility events related to the desktop.  |
| `interact` | boolean | Returns the list of hosts that this extension can request an automation tree from. |
| `matches` | array of string URLs| Determines whether the extension is allowed interactive access (true) or read-only access (false) to the automation tree. |

```json
{
  // ...
   "automation": {
    "desktop": true,
    "interact": true,
    "matches": [
      "www.google.com" 
      ]
  }
  // ...
}
```