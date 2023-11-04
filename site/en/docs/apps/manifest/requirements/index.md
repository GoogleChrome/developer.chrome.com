---
layout: "layouts/doc-post.njk"
title: "Manifest - Requirements"
seoTitle: "Chrome Apps Manifest - Requirements [Deprecated]"
#date: TODO
#updated: TODO
#description: TODO
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

Technologies required by the app or extension. Hosting sites such as the Chrome Web Store may use
this list to dissuade users from installing apps or extensions that will not work on their computer.
Supported requirements currently include "3D" and "plugins"; additional requirements checks may be
added in the future.

The "3D" requirement denotes GPU hardware acceleration. The "webgl" requirement refers to the [WebGL
API][3]. For more information on Chrome 3D graphics support, see the help article on [WebGL and 3D
graphics][4]. You can list the 3D-related features your app requires, as demonstrated in the
following example:

```json
"requirements": {
  "3D": {
    "features": ["webgl"]
  }
}
```

{% Aside 'warning' %}

NPAPI Plugin support for extension has been [discontinued][5]. As part of this, the **"plugins"**
requirement described below has been deprecated.

{% endAside %}

The "plugins" requirement indicates if an app or extension requires NPAPI to run. This requirement
is enabled by default when the manifest includes the ["plugins" field][6]. For apps and extensions
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

[1]: https://blog.chromium.org/2020/08/changes-to-chrome-app-support-timeline.html
[2]: /apps/migration
[3]: https://www.khronos.org/webgl/
[4]: https://support.google.com/chrome/answer/1220892
[5]: https://blog.chromium.org/2013/09/saying-goodbye-to-our-old-friend-npapi.html
[6]: /extensions/npapi
