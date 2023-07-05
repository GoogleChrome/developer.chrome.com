---
layout: "layouts/doc-post.njk"
title: "Manifest - Version"
seoTitle: "Chrome Apps Manifest - Version [Deprecated]"
#date: TODO
#updated: TODO
#description: TODO
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

One to four dot-separated integers identifying the version of this extension. A couple of rules
apply to the integers: they must be between 0 and 65535, inclusive, and non-zero integers can't
start with 0. For example, 99999 and 032 are both invalid.

Here are some examples of valid versions:

- `"version": "1"`
- `"version": "1.0"`
- `"version": "2.10.2"`
- `"version": "3.1.2.4567"`

The autoupdate system compares versions to determine whether an installed extension needs to be
updated. If the published extension has a newer version string than the installed extension, then
the extension is automatically updated.

The comparison starts with the leftmost integers. If those integers are equal, the integers to the
right are compared, and so on. For example, 1.2.0 is a newer version than 1.1.9.9999.

A missing integer is equal to zero. For example, 1.1.9.9999 is newer than 1.1.

For more information, see [Autoupdating][3].

## Version Name {: #version_name }

In addition to the version field, which is used for update purposes, version_name can be set to a
descriptive version string and will be used for display purposes if present.

Here are some examples of version names:

- `"version_name": "1.0 beta"`
- `"version_name": "build rc2"`
- `"version_name": "3.1.2.4567"`

If no version_name is present, the version field will be used for display purposes as well.

[1]: https://blog.chromium.org/2020/08/changes-to-chrome-app-support-timeline.html
[2]: /apps/migration
[3]: /extensions/autoupdate
