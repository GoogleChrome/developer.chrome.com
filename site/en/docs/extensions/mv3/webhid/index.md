---
layout: "layouts/doc-post.njk"
title: "WebHID in extensions"
seoTitle: "Chrome Extensions: WebHID"
date: 2023-11-02
description: A Human Interface Device (HID), which takes input from or provides output to humans, is available in extensions.
---

A Human Interface Device (HID) takes input from or provides output to humans. It also refers to the HID protocol, a standard for bi-directional communication between a host and a device that is designed to simplify the installation procedure.

This page describes aspects of the API that are particular to extensions. Refer to MDN for complete details of the [WebHID API](https://developer.mozilla.org/docs/Web/API/WebHID_API).

You can find a [sample app for WebHID](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.co2meter) in our samples repo.

## Availability in extensions

Chrome 117 or later.

## Permissions

No manifest file permissions are required; however WebHID triggers the browser's user permission flow.

## Manifest

No manifest keys are needed for this API.

## Supporting contexts

This API may be used in any extension component. Although this API cannot be used in web service workers, it can be used in extension service workers.