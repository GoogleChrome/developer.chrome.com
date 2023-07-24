---
layout: "layouts/doc-post.njk"
title: "Manifest - Incognito"
seoTitle: "Manifest V2 - Incognito [Deprecated]"
date: 2013-05-12
updated: 2015-09-25
description: Reference documentation for the incognito property of manifest.json.
---

{% Aside 'warning' %}
You're viewing the deprecated Manifest V2 version of this article. See [Manifest V3 - Manifest incognito](/docs/extensions/mv3/manifest/incognito) for the MV3 equivalent.

The Chrome Web Store no longer accepts Manifest V2 extensions. Follow the [Manifest V3 Migration guide](/docs/extensions/migrating) to convert your extension to Manifest V3.
{% endAside %}

Use the `"incognito"` manifest key with either `"spanning"` or `"split"` to specify how this
extension will behave if allowed to run in incognito mode. Using `"not_allowed"` to prevent this
extension from being enabled in incognito mode.

Only extensions can choose. Apps will always use the default value for the app type; `"spanning"`
for Chrome apps and `"split"` for installable web and legacy packaged apps.

## Spanning mode {: #spanning }

The default for extensions and Chrome apps is `"spanning"`, which means that it will run in a single
shared process. Any events or messages from an incognito tab will be sent to the shared process,
with an _incognito_ flag indicating where it came from. Because incognito tabs cannot use this
shared process, an extension using the `"spanning"` incognito mode will not be able to load pages
from its extension package into the main frame of an incognito tab.

## Split mode {: #split }

The default for installable web apps and legacy packaged apps is `"split"`, which means that all app
pages in an incognito window will run in their own incognito process. If the app or extension
contains a background page, that will also run in the incognito process. This incognito process runs
along side the regular process, but has a separate memory-only cookie store. Each process sees
events and messages only from its own context (for example, the incognito process will see only
incognito tab updates). The processes are unable to communicate with each other.

## Not allowed {: #not_allowed }

The extension cannot be enabled in incognito mode. Available from Chrome 47.

## How to choose {: #how-to-choose }

As a rule of thumb, if your extension or app needs to load a tab in an incognito browser, use
_split_ incognito behavior. If your extension or app needs to be logged into a remote server use
_spanning_ incognito behavior.

[chrome.storage.sync][1] and [chrome.storage.local][2] are _always_ shared between regular and
incognito processes. It is recommended to use them for persisting your extension's settings.

[1]: /docs/extensions/reference/storage#property-sync
[2]: /docs/extensions/reference/storage#property-local
