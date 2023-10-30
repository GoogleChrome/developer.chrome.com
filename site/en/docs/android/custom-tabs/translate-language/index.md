---
layout: "layouts/doc-post.njk"
title: Translate your content
seoTitle: "Guide: Localize Content in a Custom Tab"
date: 2023-04-21
description: How to translate content in a Custom Tab.
authors:
  - alexmkatz
---

When a user opens a Custom Tab, the content in that tab can be translated for their locale. This guide
explains how to implement automatic translation of Custom Tab content.

## Implementation

Use the following code to add translation to your Custom Tabs intent builder:

```
CustomTabsIntent customTabsIntent = new CustomTabsIntent.Builder()
    .setTranslateLocale(Locale locale)
    .build();
```

The intent builder takes the user's [`Locale`](https://developer.android.com/reference/java/util/Locale.html) as input. This value can be any of the supported locales [listed here](https://developer.chrome.com/docs/webstore/i18n/#choosing-locales-to-support).
