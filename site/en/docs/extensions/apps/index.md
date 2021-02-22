---
layout: "layouts/doc-post.njk"
title: "Packaged Apps"
date: 2012-09-17
updated: 2014-11-17
description: Legacy packaged apps are deprecated.
---

{% Aside 'warning' %}

**Warning:** All content in this doc refers to the legacy version of packaged apps. Legacy packaged
apps are discontinued, and Chrome will **stop loading them** in June 2015. Check out the new version
of [Chrome Apps][1] or read the [migration tutorial for legacy packaged apps][2].

{% endAside %}

This page talks about legacy packaged apps—how you implement them, and how they're different from
extensions and ordinary web apps.

## Overview {: #overview }

A legacy packaged app is a web app that's bundled into a `.crx` file. In the past, legacy packaged
apps could use most of the extension APIs, but [since November 2012][3], the feature set of legacy
packaged apps was reduced. And in June 2014, discontinuation of legacy packaged apps [was
announced][4]; support for them will be removed from Chrome in June 2015.

The term "packaged app" used to refer to the "legacy packaged app" as described in this document,
but [since the introduction of Chrome Apps in August 2012][5], the term "packaged app" is also used
to refer to [Chrome Apps][6]. Keep this in mind when you read about "packaged apps" in online
resources.

A close alternative to legacy packaged apps are [hosted apps][7], which are ordinary web apps with a
bit of additional metadata. To learn more about extensions, packaged apps, and hosted apps, read
[Choosing an App Type][8].

## The manifest {: #manifest }

A packaged app's manifest can have any field that's available to extensions, except for
"browser_action" and "page_action". In addition, a packaged app's manifest **must** have an "app"
field. Here is a typical manifest for a packaged app:

```json
{
  "name": "My Awesome Racing Game",
  "description": "Enter a world where a Vanagon can beat a Maserati",
  "version": "1",
  "app": {
    "launch": {
      "local_path": "main.html"
    }
  },
  "icons": {
    "16": "icon_16.png",
    "128": "icon_128.png"
  }
}
```

The "app" field has one subfield, "launch", which specifies the _launch page_ for the app—the page
(HTML file bundled into the `.crx` file) that the browser goes to when the user clicks the app's
icon in the New Tab page. The "launch" field can contain the following:

local_path:

: _Required._ Specifies the launch page as a relative path referring to a file in the `.crx` package.

container:

: The value "panel" makes the app appear in an app panel. By default, or when you specify "tab", the
  app appears in a tab.

height:

: If the container is set to "panel", this integer specifies the height of the panel in pixels. For
  example, you might specify `"height":400`. Note that you don't use quotation marks in the value.
  This field specifies the height of the area to display contents in; window decorations add a few
  more pixels to the total height. If the container isn't a panel, this field is ignored.

width:

: Similar to "height", but specifies the width of the panel.

Packaged apps usually provide a 16x16 icon to be used as the favicon for tabs that contain app's
pages. They also should provide a 128x128 icon, but not a 48x48 icon. See the manifest documentation
for the ["icons" field][9] for more information.

For further details on what a packaged app's manifest can contain, see the [manifest
documentation][10].

## What next? {: #next }

Read the [Overview][11] to learn basic concepts about extensions.

[1]: /docs/apps/about_apps
[2]: /docs/webstore/migrating
[3]: https://blog.chromium.org/2012/11/restricting-extension-apis-in-legacy.html
[4]: https://blog.chromium.org/2014/06/migrate-your-legacy-packaged-apps-to.html
[5]: https://blog.chromium.org/2012/08/the-evolution-of-chrome-packaged-apps.html
[6]: /docs/apps/about_apps
[7]: https://developers.google.com/chrome/apps/docs/developers_guide
[8]: /docs/webstore/choosing
[9]: /docs/extensions/mv2/manifest/icons
[10]: /docs/extensions/mv2/tabs
[11]: /docs/extensions/mv2/overview
