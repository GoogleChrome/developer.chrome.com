---
layout: "layouts/doc-post.njk"
title: "Manifest - Requirements"
seoTitle: "Chrome Extensions Manifest: requirements"
date: 2013-05-12
updated: 2023-06-19
description: Reference documentation for the requirements property of manifest.json.
---

Technologies required by the extension. Hosting sites such as the Chrome Web Store may use this list
to dissuade users from installing extensions that will not work on their computer. Additional requirements checks may be added in
the future.

The `"3D"` requirement denotes GPU hardware acceleration and takes either `"webgl"` or `"css3d"` as valid values. The `"webgl"` requirement refers to the [WebGL
API][1]. For more information on Chrome 3D graphics support, see the help article on [WebGL and 3D
graphics][2]. You can list the 3D-related features your extension requires, as demonstrated in the
following example:

```json
"requirements": {
  "3D": {
    "features": ["webgl"]
  }
}
```

NPAPI Plugin support for extensions has been [discontinued][3] as of Chrome version 45. As part of this, the **"plugins"**
requirement has been deprecated, and can no longer be used in a manifest file.



[1]: https://www.khronos.org/webgl/
[2]: https://support.google.com/chrome/answer/1220892
[3]: https://blog.chromium.org/2013/09/saying-goodbye-to-our-old-friend-npapi.html
[4]: /docs/extensions/npapi
