---
title: 'API reference'
description: 'The complete reference to all APIs made available to Chrome Extensions. This includes APIs for the deprecated Chrome Apps platform as well as APIs still in beta and dev.'
layout: 'layouts/reference-landing.njk'
---

Chrome provides extensions with many special-purpose APIs such as `chrome.alarms` and `chrome.action`. Many APIs consist of a namespace and its related manifest fields. These fields are frequently permissions, but not always. For example, `chrome.alarms` requires only the `alarms` permission, while `chrome.action` requires an action object in the `manifest.json` file.

{% Partial 'extensions/mv3-support.md' %}

## API conventions

Unless stated otherwise, methods in the `chrome.*` APIs are **asynchronous**: they return immediately, without waiting for the operation to finish. If you need to know the result of calling such methods, use the returned promise or pass a callback function into the method. For more information, see [Asynchronous methods](/docs/extensions/mv3/architecture-overview/#async-sync).
