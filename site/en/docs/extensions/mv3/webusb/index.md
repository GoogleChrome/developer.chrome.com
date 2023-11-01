---
layout: "layouts/doc-post.njk"
title: "WebUSB on ChromeOS"
seoTitle: "Chrome Extensions: on ChromeOS"
date: 2023-11-01
description: The WebUSB API, which exposes non-standard Universal Serial Bus (USB) compatible devices to the web, is available in extensions.
---

The WebUSB API exposes non-standard Universal Serial Bus (USB) compatible devices to the web. This page describes aspects of the API that are particular to extensions. Refer to MDN for complete details of the [WebUSB](https://developer.mozilla.org/docs/Web/API/WebUSB_API).

## Availability in extensions

ChromeOS 117 or later.

## Permissions

No manifest file permissions are required; however WebUSB triggers the browser's user permission flow.

## Manifest

No manifest keys are needed for this API.

## Supporting contexts

This API may be used in any extension component. Although this API cannot be used in web service workers, it can be used in extension service workers.