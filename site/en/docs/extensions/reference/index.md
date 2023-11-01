---
title: 'API reference'
description: 'The complete reference to all APIs made available to Chrome Extensions. This includes APIs for the deprecated Chrome Apps platform as well as APIs still in beta and dev.'
layout: 'layouts/reference-landing.njk'
---

Most extensions need access to one or more Chrome Extensions APIs to function. This API reference describes the APIs available for use in extensions and presents example use cases.

## Common Extensions API features

An Extensions API typically consists of a namespace containing manifest fields that must be included in your extension's `manifest.json` file to use that API. Those fields can include objects within `manifest.json,` such as the action object required by the `chrome.action` API, as well as [permissions](/docs/extensions/mv3/declare_permissions/) declarations for APIs that require permissions.

Methods in `chrome.*` APIs are **asynchronous** unless stated otherwise. Asynchronous methods return immediately, without waiting for the operation that calls them to finish. Use [promises](/docs/extensions/mv3/promises/) to get the results of these methods. For more information, see [Asynchronous methods](/docs/extensions/mv3/architecture-overview/#async-sync).

<!--What else are users likely to need to know about early? Should I bring back the mention of callbacks in the asynchronous methods explanation? And should I be able to edit the table structures in the generated content?-->

{% Partial 'extensions/mv3-support.md' %}
