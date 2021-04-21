---
layout: 'layouts/blog-post.njk'
title: Extension Manifest Converter
description: >
  Open source tool to convert extensions to Manifest V3. You’ll still need to manually update any service worker code that relies on a DOM, in addition to updating chrome.scripts.
subhead: >
  Easily convert an entire directory, extension zip file, or manifest.json file.
date: 2021-04-19
updated: 2021-04-19
authors:
  - solomonkinard
  - dotproto
tags:
  - extensions
draft: true
---

Extension Manifest Converter for Manifest V3

## Summary

Open source tool to convert extensions to Manifest V3. Easily convert an entire directory, extension zip file, or manifest.json file. All expected changes are applied to manifest.json. Only search and replace changes are applied to .js files. You’ll still need to manually update any service worker code that relies on a DOM, in addition to updating chrome.scripts.

## Examples

Converting files can be done one of the following ways.

```bash
git clone https://github.com/GoogleChromeLabs/extension-manifest-converter
```

manifest.json

```bash
python3 extension.py manifest.json
```

.zip file

```bash
python3 extension.py extension.zip
```

directory

```bash
python3 extension.py dir/
```

help

```bash
python3 extension.py
```
