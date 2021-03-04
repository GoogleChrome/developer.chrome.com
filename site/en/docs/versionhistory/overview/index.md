---
layout: "layouts/doc-post.njk"
title: VersionHistory API overview
date: 2021-01-28
description: TODO
---

VersionHistory is an API that exposes various details about Chrome's version
history.



There are 5 main resources that live in a hiearchy in the VersionHistory API. \
They are **Product**, **Platform**, **Channel**, **Version**, and **Release**.

Most of the information lives in Versions and Releases while Products,
Platforms, and Channels exist to make the organization and navigation easier.

All URL paths alternate between the resource name (platforms, channels,
versions) and resource identifier (win, beta, 81.1.1.1), with the corresponding
resource name preceding the resource identifier except for the product
identifier.

You can query to list a resource by not providing a resource identifier after
the name of the resource you wish to list. For example, to list all valid
channels for the win platform, you can query: \
https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/