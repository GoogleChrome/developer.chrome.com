---
layout: "layouts/doc-post.njk"
title: Translate your content
seoTitle: "Guide: Localize Content in a Custom Tab"
date: 2023-04-21
description: How to translate content in a Custom Tab.
authors:
  - alexmkatz
---

This guide explains how to specify a target locale for the Translate UI in your Custom Tab to trigger with.

## Implementation

Use the following code to add translation to your Custom Tabs intent builder:

```
Locale userLocale = new Builder().setLanguage("pt").setRegion("BR").build();

CustomTabsIntent customTabsIntent = new CustomTabsIntent.Builder()
    .setTranslateLocale(userLocale)
    .build();
```

`Locale` can take any of the values [listed here](https://developer.chrome.com/docs/webstore/i18n/#supported-locales).
