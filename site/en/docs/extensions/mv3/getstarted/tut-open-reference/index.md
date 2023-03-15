---
layout: 'layouts/doc-post.njk'
title: 'Focus Mode'
seoTitle: 'Chrome Extensions Tutorial: Focus Mode'
subhead: 'This will be added later.'
description: 'This will also be added later.'
date: 2023-04-02
# updated: 2022-06-13
---

## Overview {: #overview }

This tutorial builds an extension that allows users to open the Chrome API reference page using the omnibox. It also provides a daily extension tip.

<!-- TODO: Add video {% Video src='video/tcFciHGuF3MxnTr1y5ue01OGLBn2/1601081394086.mp4' %} -->

This tutorial explains how to do the following in an extension service worker:

- Register a service worker.
- Import multiple files.
- Debug the extension service worker.
- Manage state and handle events.
- Trigger periodic events.
- Communicate with content scripts.

## Before you start {: #prereq }

This guide assumes that you have basic web development experience. We recommend reviewing [Extensions 101][doc-ext-101] and [Development Basics][doc-dev-basics] for an introduction to extension development.

## Build the extension {: #build }

Start by creating a new directory called `open-api-reference` to hold the extension files, or download the source code from our [GitHub samples][github-open-api] repo.

### Step 1: Register the service worker {: #step-1 }

Extensions register their service worker in the manifest, which only takes a single JavaScript file.  There's no need to use `navigator.serviceWorker.register()`, like you would in a web app. See [Differences between extension and web service workers](tbd) to learn more.

Create the manifest file in the root of the project and add the following code:

{% Label %}manifest.json:{% endLabel %}

```json/8-10
{
  "manifest_version": 3,
  "name": "Open extension API reference",
  "version": "1.0.0",
  "icons": {
    "16": "icon-16.png",
    "128": "icon-128.png"
  },
  "background": {
    "service_worker": "service-worker.js",
  },
}
```

To learn more about these manifest keys, check out the Reading time tutorial that explains the extension's [metadata][tut-reading-time-step1] and [icons][tut-reading-time-step2] in more detail.

You can download the icons located on the [Github repo][github-open-api].

