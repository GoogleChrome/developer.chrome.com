---
layout: "layouts/doc-post.njk"
title: "Manifest - Name and Short Name"
#date: TODO
#updated: TODO
#description: TODO
---

!!!.aside.aside--caution

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

!!!

The `name` and `short_name` manifest properties are short, plain text strings that identify the app.
You can specify locale-specific strings for both fields; see [Internationalization][3] for details.

## Name {: #name }

The `name` (maximum of 45 characters) is the primary identifier of the app and is a required field.
It is displayed in the following locations:

- Install dialog
- Extension management UI
- [Chrome Web Store][4]

## Short Name {: #short_name }

The `short_name` (maximum of 12 characters recommended) is a short version of the app's name. It is
an optional field and if not specified, the `name` will be used, though it will likely be truncated.
The short name is typically used where there is insufficient space to display the full name, such
as:

- App launcher
- New Tab page

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: /extensions/i18n
[4]: https://chrome.google.com/webstore
