---
layout: "layouts/doc-post.njk"
title: "Manifest - Incognito"
seoTitle: "Chrome Extensions Manifest: incognito"
date: 2013-05-12
updated: 2015-09-25
description: Reference documentation for the incognito property of manifest.json.
---

Use the `"incognito"` manifest key with either `"spanning"` or `"split"` to specify how this
extension will behave if allowed to run in incognito mode. Using `"not_allowed"` to prevent this
extension from being enabled in incognito mode.

## Spanning mode {: #spanning }

The default mode is `"spanning"`, which means that the extension will run in a single
shared process. Any events or messages from an incognito tab will be sent to the shared process,
with an _incognito_ flag indicating where it came from. Because incognito tabs cannot use this
shared process, an extension using the `"spanning"` incognito mode will not be able to load pages
from its extension package into the main frame of an incognito tab.

## Split mode {: #split }

The `"split"` mode means that all pages in an incognito window will run in their own incognito
process. If the extension contains a background page, that will also run in the incognito process.
This incognito process runs along side the regular process, but has a separate memory-only cookie
store. Each process sees events and messages only from its own context (for example, the incognito
process will see only incognito tab updates). The processes are unable to communicate with each
other.

## Not allowed {: #not_allowed }

The extension cannot be enabled in incognito mode. Available from Chrome 47.

## How to choose {: #how-to-choose }

As a rule of thumb, if your extension needs to load a tab in an incognito browser, use
_split_ incognito behavior. If your extension needs to be logged into a remote server use
_spanning_ incognito behavior.

[chrome.storage.sync][1] and [chrome.storage.local][2] are _always_ shared between regular and
incognito processes. It is recommended to use them for persisting your extension's settings.

[1]: /docs/extensions/reference/storage#property-sync
[2]: /docs/extensions/reference/storage#property-local
