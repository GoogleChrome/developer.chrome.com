---
layout: "layouts/doc-post.njk"
title: "Manifest - Version"
seoTitle: "Chrome Extensions Manifest: version"
date: 2013-05-12
updated: 2022-07-13
description: Reference documentation for the version property of manifest.json.
---

One to four dot-separated integers identifying the version of this extension. A couple of rules
apply to the integers:

- The integers must be between 0 and 65535, inclusive.
- Non-zero integers can't start with 0. For example, 032 is invalid because it begins with a zero.
- They must not be all zero. For example, 0 and 0.0.0.0 are invalid while 0.1.0.0 is valid.

Here are some examples of valid versions:

- `"version": "1"`
- `"version": "1.0"`
- `"version": "2.10.2"`
- `"version": "3.1.2.4567"`

If the published extension has a newer version string than the installed extension, then
the extension is automatically updated.

The comparison starts with the leftmost integers. Then, if those integers are equal, the integers to
the right are compared, and so on. For example, 1.2.0 is a newer version than 1.1.9.9999.

A missing integer is equal to zero. For example, 1.1.9.9999 is newer than 1.1, and 1.1.9.9999 is
older than 1.2.

## Version name {: #version_name }

In addition to the `"version"` field, which is used for update purposes, `"version_name"` can be set to a
descriptive version string and will be used for display purposes if present.

Here are some examples of version names:

- `"version_name": "1.0 beta"`
- `"version_name": "build rc2"`
- `"version_name": "3.1.2.4567"`

If no version_name is present, the version field will be used for display purposes as well.
