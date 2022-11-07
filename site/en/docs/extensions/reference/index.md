---
title: 'API reference'
description: 'The complete reference to all APIs made available to Chrome Extensions. This includes APIs for the deprecated Chrome Apps platform as well as APIs still in beta and dev.'
layout: 'layouts/reference-landing.njk'
---

Chrome provides extensions with many special-purpose interfaces such as `chrome.runtime` and `chrome.alarms`.

## API conventions

Unless stated otherwise, methods in the `chrome.*` APIs are **asynchronous**: they return immediately, without waiting for the operation to finish. If you need to know the result of calling such methods, use the returned promise or pass a callback function into the method. For more information, see [Asynchronous methods](/docs/extensions/mv3/architecture-overview/#async-sync).
