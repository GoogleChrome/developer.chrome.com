---
title: 'API reference'
description: 'The complete reference to all APIs made available to Chrome Extensions. This includes APIs for the deprecated Chrome Apps platform as well as APIs still in beta and dev.'
layout: 'layouts/reference-landing.njk'
---

Most extensions need access to one or more Chrome Extensions APIs to function. This API reference describes the APIs available
for use in extensions and presents example use cases.

## Common Extensions API features

An Extensions API consists of a namespace containing methods and properties for doing extensions work, and usually, but not
always, manifest fields for the `manifest.json` file. For example, the `chrome.action` namespace requires an `"action"` object
in the manifest. Many APIs also require [permissions](/docs/extensions/mv3/declare_permissions/) in the manifest.

Methods in extension APIs are **asynchronous** unless stated otherwise. Asynchronous methods return immediately, without waiting
for the operation that calls them to finish. Use [promises](/docs/extensions/mv3/promises/) to get the results of these methods.
For more information, see [Asynchronous methods](/docs/extensions/mv3/architecture-overview/#async-sync).

<!--What else are users likely to need to know about early?-->

{% Partial 'extensions/mv3-support.md' %}
