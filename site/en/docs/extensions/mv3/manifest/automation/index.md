---
layout: "layouts/doc-post.njk"
title: "Manifest - automation"
date: 2022-10-28
updated: 
description: Reference documentation for the automation property of manifest.json.
---

An optional manifest key only publicly accessible on the Dev channel. Including this manifest key allows access to the [chrome.automation API](/docs/extensions/reference/automation/), exposing access to the automation (accessibility) tree for the browser, which can be used to programmatically interact with a page by examining names, roles, and states, listening for events, and performing actions on nodes.