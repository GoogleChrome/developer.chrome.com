---
layout: "layouts/doc-post.njk"
title: "Manifest version"
date: 2012-09-18
updated: 2019-08-12
description: >
  The manifest_version property of manifest.json indicates which version
  of the manifest specification a Chrome Extension targets.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

Extensions, themes, and applications are simply bundles of resources, wrapped up with a
[`manifest.json`][1] file that describes the package's contents. The format of this file is
generally stable, but occasionally breaking changes must be made to address important issues.
Developers should specify which version of the manifest specification their package targets by
setting a `manifest_version` key in their manifests.

## Current version {: #current-version }

Developers should currently specify **`'manifest_version': 2`**:

```json
{
  ...,
  "manifest_version": 2,
  ...
}
```

Manifest version 1 was _deprecated_ in Chrome 18, and support will be phased out according to the
following schedule.

## Manifest version 1 support schedule {: #manifest-v1-support-schedule }

### August 2012 {: #manifest-v1-august2012 }

- The Web Store will block creation of new manifest version 1 extensions.
- The Web Store will allow updates to existing manifest version 1 extensions.

### March 2013 {: #manifest-v1-march2013 }

- The Web Store will block updates to manifest version 1 extensions on March 4th, 2013.

### April 2013 {: #manifest-v1-april2013 }

- Chrome 27 Beta will stop packaging manifest version 1 extensions (or loading them for
  development).

### June 2013 {: #manifest-v1-june2013 }

- The Web Store will remove manifest version 1 extensions from the wall, search results, and
  category pages.
- Notice emails will be sent to all developers with manifest version 1 extensions still in the store
  reminding them that these extensions will be unpublished and providing update instructions.

### September 2013 {: #manifest-v1-september2013 }

- The Web Store will unpublish all manifest version 1 extensions.
- Final notice emails will be sent to developers with manifest version 1 extensions still in the Web
  Store.
- Chrome will continue to load and run installed manifest version 1 extensions.

### January 2014 {: #manifest-v1-january2014 }

- Chrome will stop loading or running manifest version 1 extensions.

## Changes between version 1 and 2 {: #manifest-v1-changes }

- A content security policy is set to `` `script-src 'self'; object-src 'self';`` by default. This
  has a variety of impacts on developers, described at length in the [`content_security_policy`][2]
  documentation.
- A package's resources are no longer available by default to external websites (as the `src` of an
  image, or a `script` tag). If you want a website to be able to load a resource contained in your
  package, you'll need to explicitly allowlist it via the [`web_accessible_resources`][3] manifest
  attribute. This is particularly relevant for extensions that build up an interface on a website
  via injected content scripts.
- The `background_page` property has been replaced with a `background` property that contains
  _either_ a `scripts` or `page` property. Details are available in the [Event Pages][4]
  documentation.
- Browser action changes:

  - The `browser_actions` key in the manifest, and the `chrome.browserActions` API are gone. Use the
    singular [`browser_action` and `chrome.browserAction`][5] instead.
  - The `icons` property of `browser_action` has been removed. Use [the `default_icon` property][6]
    or [browserAction.setIcon][7] instead.
  - The `name` property of `browser_action` has been removed. Use [the `default_title` property][8]
    or [browserAction.setTitle][9] instead.
  - The `popup` property of `browser_action` has been removed. Use [the `default_popup`
    property][10] or [browserAction.setPopup][11] instead.
  - The `default_popup` property of `browser_action` can no longer be specified as an object. It
    must be a string.

- Page action changes:

  - The `page_actions` key in the manifest, and the `chrome.pageActions` API are gone. Use the
    singular [`page_action` and `chrome.pageAction`][12] instead.
  - The `icons` property of `page_action` has been removed. Use [the `default_icon` property][13] or
    [pageAction.setIcon][14] instead.
  - The `name` property of `page_action` has been removed. Use [the `default_title` property][15] or
    [pageAction.setTitle][16] instead.
  - The `popup` property of `page_action` has been removed. Use [the `default_popup` property][17]
    or [pageAction.setPopup][18] instead.
  - The `default_popup` property of `page_action` can no longer be specified as an object. It must
    be a string.

- The `chrome.self` API has been removed. Use [`chrome.extension`][19] instead.
- `chrome.extension.getTabContentses` (!!!) and `chrome.extension.getExtensionTabs` are gone. Use
  [extension.getViews][20] instead.
- `Port.tab` is gone. Use [runtime.Port][21] instead.

[1]: /docs/extensions/mv2/tabs
[2]: /docs/extensions/mv2/contentSecurityPolicy
[3]: /docs/extensions/mv2/manifest/web_accessible_resources
[4]: /docs/extensions/mv2/event_pages
[5]: /docs/extensions/browserAction
[6]: /docs/extensions/browserAction#manifest
[7]: /docs/extensions/browserAction#method-setIcon
[8]: /docs/extensions/browserAction#manifest
[9]: /docs/extensions/browserAction#method-setTitle
[10]: /docs/extensions/browserAction#manifest
[11]: /docs/extensions/browserAction#method-setPopup
[12]: /docs/extensions/pageAction
[13]: /docs/extensions/pageAction#manifest
[14]: /docs/extensions/pageAction#method-setIcon
[15]: /docs/extensions/pageAction#manifest
[16]: /docs/extensions/pageAction#method-setTitle
[17]: /docs/extensions/pageAction#manifest
[18]: /docs/extensions/pageAction#method-setPopup
[19]: /docs/extensions
[20]: /docs/extensions/extension#method-getViews
[21]: /docs/extensions/runtime#type-Port
