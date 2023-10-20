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
    .setTranslateLanguage(true)
    .setTranslateLocale(Locale locale)
    .build();
```

The intent builder takes the user's [`Locale`](https://developer.android.com/reference/java/util/Locale.html) as input. For best user experience, we recommend using the full
language code (such as `pt-BR` or `sr-latn-RS`).

<!--Note from Kevin: Check whether this auto-translates, or asks the user whether they want it translated. Test
in sample code, see what Jinsuk knows.-->
