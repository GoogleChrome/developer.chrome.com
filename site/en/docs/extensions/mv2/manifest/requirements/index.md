---
layout: "layouts/doc-post.njk"
title: "Manifest - Requirements"
seoTitle: "Manifest V2- Requirements [Deprecated]"
date: 2013-05-12
updated: 2018-04-26
description: Reference documentation for the requirements property of manifest.json.
---

{% Partial 'extensions/mv2-legacy-page.md' %}

Technologies required by the app or extension. Hosting sites such as the Chrome Web Store may use
this list to dissuade users from installing apps or extensions that will not work on their computer.
Supported requirements currently include "3D" and "plugins"; additional requirements checks may be
added in the future.

The "3D" requirement denotes GPU hardware acceleration. The "webgl" requirement refers to the [WebGL
API][1]. For more information on Chrome 3D graphics support, see the help article on [WebGL and 3D
graphics][2]. You can list the 3D-related features your app requires, as demonstrated in the
following example:

```json
"requirements": {
  "3D": {
    "features": ["webgl"]
  }
}
```

NPAPI Plugin support for extension has been [discontinued][3]. As part of this, the **"plugins"**
requirement described below has been deprecated.

The "plugins" requirement indicates if an app or extension requires NPAPI to run. This requirement
is enabled by default when the manifest includes the ["plugins" field][4]. For apps and extensions
that still work when plugins aren't available, you can disable this requirement by setting NPAPI to
false. You can also enable this requirement manually, by setting NPAPI to true, as shown in this
example:

```json
"requirements": {
  "plugins": {
    "npapi": true
  }
}
```

[1]: https://www.khronos.org/webgl/
[2]: https://support.google.com/chrome/answer/1220892
[3]: https://blog.chromium.org/2013/09/saying-goodbye-to-our-old-friend-npapi.html
[4]: /docs/extensions/npapi
