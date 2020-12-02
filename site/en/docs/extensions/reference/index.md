---
title: 'API Reference'
description: 'The complete reference to all APIs made available to Chrome Extensions. This includes APIs for the deprecated Chrome Apps platform as well as APIs still in beta and dev.'
layout: 'layouts/reference-landing.njk'
---

Chrome provides extensions with many special-purpose APIs like `chrome.runtime` and `chrome.alarms`.

## API conventions

Unless the doc says otherwise, methods in the `chrome.*` APIs are **asynchronous**: they return immediately, without waiting for the operation to finish.
If you need to know the outcome of an operation, then you pass a callback function into the method.
For more information, [watch this video](https://www.youtube.com/watch?v=bmxr75CV36A).
