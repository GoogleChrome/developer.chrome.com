---
layout: "layouts/doc-post.njk"
title: "Alternative extension distribution options"
date: 2012-09-17
updated: 2018-06-12
description: How to distibute Chrome Extensions outside of the Chrome Web Store.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

All Chrome extensions must be distributed either directly from the Chrome Web Store or by using the
mechanisms described below. Failure to comply with one of these distribution methods constitutes a
violation of the [Chrome extension policy][1] and may result in the extension and/or the software
distributing it to be flagged as [unwanted software][2].

Usually, users install extensions from the Chrome Web Store, but sometimes you might want an
extension to be installed via other means. Here are two typical cases:

- An extension is associated with some other software, and the extension should be installed
  whenever the user installs that other software.
- A network admin wants to install the same extensions throughout their organization.

An extension that is not installed from the Chrome Web Store is known as an _external extension_.
For developers who want to distribute an extension as part of the installation process for other
software, or for network admins that want to distribute an extension throughout their organization,
Google Chrome supports the following extension installation methods:

- Using a preferences JSON file (for Mac OS X and Linux only)
- Using the Windows registry (for Windows only)

Both ways support installing an extension hosted at an `update_URL`. On Windows and Mac, the
`update_URL` must point to the Chrome Web Store where the extension must be hosted.

The preferences file on [Linux can point to your own server where you are hosting the extension][3].
The preferences JSON file also supports installing an extension from a `.crx` extension file on the
user's Linux computer.

## Before you begin {: #prereqs }

First, [publish][4] the extension in the Chrome Web Store, or package a [`.crx` file][5] and make
sure that it installs successfully.

{% Aside 'warning' %}

**Windows and Mac installs must come from Chrome Web Store:**
As of Chrome 33, no external installs are allowed from a path to a local `.crx` on Windows (see
[Protecting Windows users from malicious extensions][6]). As of Chrome 44, no external installs are
allowed from a path to a local .crx on Mac (see [Continuing to protect Chrome users from malicious
extensions][7]).

{% endAside %}

If installing from an [update URL][8], ensure that the extension is properly [hosted][9].

Before you edit the preferences file or the registry, make a note of the following:

- The intended **location** of the extension's `.crx` file, or the update URL from which it is
  served
- The extension's **version** (from the manifest file or the **chrome://extensions** page)
- The extension's **ID** (from the **chrome://extensions** page when you've loaded the packed
  extension)

The following examples assume the version is `1.0` and the ID is `aaaaaaaaaabbbbbbbbbbcccccccccc`.

## Using a preferences file {: #preferences }

{% Aside %}

**Mac OS X and Linux only:** Do not use the preferences file for Windows. Use [Windows registry][10]
instead.

{% endAside %}

1.  If you are installing from a file on Linux, make the `.crx` extension file available to the
    machine you want to install the extension on. (Copy it to a local directory or to a network
    share for example, `\\server\share\extension.crx` or `/home/share/extension.crx`.)
2.  Create a file with the following name in one of the folders listed below:
    `aaaaaaaaaabbbbbbbbbbcccccccccc.json` where the file name (without the extension) corresponds to
    your extension's ID. The location depends on the operating system.

    Mac OS X:

    : For a specific user:
      `~USERNAME/Library/Application Support/Google/Chrome/External Extensions/`
      For all users: `/Library/Application Support/Google/Chrome/External Extensions/`

      The external extension file for all users is read only if every directory in the path is owned
      by the user `root`, has the group `admin` or `wheel`, and is not world writable. The path must
      also be free of symbolic links. These restrictions prevent an unprivileged user from causing
      extensions to be installed for all users. See [troubleshooting][11] for details.

      {% Aside %}

      **Note:** The above path for all users was added in Chrome 16. Prior versions used a different
      path:
      `/Applications/Google Chrome.app/Contents/Extensions/` This path was deprecated in version 17.
      Support was removed in version 20. Use one of the paths above instead.

      {% endAside %}

    Linux:

    : `/opt/google/chrome/extensions/`

      `/usr/share/google-chrome/extensions/`

      **Note:** Use `chmod` if necessary to make sure that the `aaaaaaaaaabbbbbbbbbbcccccccccc.json`
      files are world-readable.

3.  Linux only: If you are installing from a file, specify the extension's location and version with
    fields named "external_crx" and "external_version" in the file created above.
    - Example:
    - ```json
        {
          "external_crx": "/home/share/extension.crx",
          "external_version": "1.0"
        }
      ```
    - **Note:** You need to escape each `\` character in the location. For example,
      `\\server\share\extension.crx` would be `"\\\\server\\share\\extension.crx"`.
4.  If you are installing from an update URL, specify the extension's update URL with field name
    "external_update_url".
5.  Example of installation from local .crx file (Linux only):
    1.  ```json
          {
            "external_update_url": "http://myhost.com/mytestextension/updates.xml"
          }
        ```
6.  Example of installation from the Chrome Webstore (Mac and Linux):
    1.  ```json
          {
            "external_update_url": "https://clients2.google.com/service/update2/crx"
          }
        ```
7.  If you would like to install extension only for some browser locales, you can list supported
    locales in field name "supported_locale". Locale may specify parent locale like "en", in this
    case the extension will be installed for all English locales like "en-US", "en-GB", etc. If
    another browser locale is selected that is not supported by the extension, the external
    extensions will be uninstalled. If "supported_locales" list is missing, the extension will be
    installed for any locale.
    - Example:
    - ```json
        {
          "external_update_url": "https://clients2.google.com/service/update2/crx",
          "supported_locales": [ "en", "fr", "de" ]
        }
      ```
8.  Save the JSON file.
9.  Launch Google Chrome and go to **chrome://extensions**; you should see the extension listed.

{% Aside %}

**Note:** Previous versions of Google Chrome used an `external_extensions.json` file to specify
which extensions to install. This file has been deprecated in favor of individual `.json` files, one
per extension.

{% endAside %}

### Troubleshooting Mac OS permissions problems {: #troubleshooting }

On Mac OS, the external extensions files for all users are only read if file system permissions
prevent unprivileged users from changing it. If you do not see external extensions installed when
Chrome is launched, there may be a permissions problem with the external extensions preferences
files. To see if this is the problem, follow these steps:

1.  Launch the Console program. You can find it under /Applications/Utilities/Console.
2.  If the leftmost icon in the Console says "Show Log List", click that icon. A second column
    appears at the left.
3.  Click "Console Messages" in the left pane.
4.  Search for the string **Can not read external extensions**. If there is a problem reading the
    external extensions files, you will see an error message. Look for another error message
    directly above it, which should explain the issue. For example, if you see the following error:
    "Path /Library/Application Support/Google/Chrome is owned by the wrong group", you need to use
    `chgrp` or the Finder's Get Info dialog to change the directory's group owner to the
    Administrator group.
5.  After fixing the issue, relaunch Chrome. Test that the external extension is now installed. It
    is possible that one permissions error keeps Chrome from detecting a second error. If the
    external extension was not installed, repeat these steps until you do not see an error in the
    Console application.

## Using the Windows registry {: #registry }

1.  Find or create the following key in the registry:
    - 32-bit Windows: `HKEY_LOCAL_MACHINE\Software\Google\Chrome\Extensions`
    - 64-bit Windows: `HKEY_LOCAL_MACHINE\Software\Wow6432Node\Google\Chrome\Extensions`
2.  Create a new key (folder) under the **Extensions** key with the same name as the ID of your
    extension (for example, `aaaaaaaaaabbbbbbbbbbcccccccccc`).
3.  In your extension key, create a property, "update_url", and set it to the value:
    "https://clients2.google.com/service/update2/crx" (this points to your extension's crx in the
    Chrome Web Store):

    ```json
    {
      "update_url": "https://clients2.google.com/service/update2/crx"
    }
    ```

4.  Launch the browser and go to **chrome://extensions**; you should see the extension listed.

## Updating and uninstalling {: #updating }

Google Chrome scans the metadata entries in the preferences and registry each time the browser
starts, and makes any necessary changes to the installed external extensions.

To update your extension to a new version, update the file, and then update the version in the
preferences or registry.

To uninstall your extension (for example, if your software is uninstalled), remove your preference
file (aaaaaaaaaabbbbbbbbbbcccccccccc.json) or the metadata from the registry.

## FAQ {: #faq }

This section answers common questions about external extensions.

**Will the methodology for allowing a "pre-install" still be supported by Google Chrome from M33
onwards?**

Yes, but only as an install from a Chrome Web Store `update_URL`, not from a local file path.

**Can I specify a URL as a path to the external extension?**

Yes, use the [preferences JSON][12] file for Mac OS X and Linux; the [registry][13] for Windows. The
extension must be hosted as explained in [hosting][14]. In the preferences file, use the
"external_update_url" property to point to an [update manifest][15] that has the URL for your
extension. In the Windows registry, use the "update_url" property.

**What are some common mistakes when installing with the preferences file?**

- Not specifying the same id/version as the one listed in the `.crx`
- The .json file (`aaaaaaaaaabbbbbbbbbbcccccccccc.json`) is in the wrong location or the ID
  specified does not match the extension ID.
- Syntax error in JSON file (forgetting to separate entries with comma or leaving a trailing comma
  somewhere)
- JSON file entry points to the wrong path to the `.crx` (or path specified but no filename)
- Backslashes in UNC path not escaped (for example, `"\\server\share\file"` is wrong; it should be
  `"\\\\server\\share\\extension"`)
- Permissions problems on a network share

**What are some common mistakes when installing with the registry?**

- Not specifying the same id/version as the one listed in the Chrome Web Store
- Key created in the wrong location in the registry
- Registry entry points to the wrong path to the `.crx` file in the Chrome Web Store
- Permissions problems on a network share

**How do I update my native binaries and extension in-step?**

Previously when off-store extensions were supported, it was possible to have the native binaries and
the extension be updated in lock step. However, extensions hosted on the Chrome Web Store are
updated via the Chrome update mechanism which developers do not control. Extension developers should
be careful about updating extensions that have a dependency on the native binary (for example,
legacy extensions using [NPAPI][16]).

**What if the user uninstalls the extension?**

If the user uninstalls the extension through the UI, it will no longer be installed or updated on
each startup. In other words, the external extension is blocklisted.

**How do I get off the blocklist?**

If the user uninstalls your extension, you should respect that decision. However, if you (the
developer) accidentally uninstalled your extension through the UI, you can remove the blocklist tag
by installing the extension normally through the UI, and then uninstalling it.

[1]: /docs/extensions/mv2/single_purpose
[2]: https://www.google.com/about/company/unwanted-software-policy.html
[3]: /docs/extensions/mv2/linux_hosting
[4]: /webstore/publish
[5]: /docs/extensions/mv2/hosting
[6]: http://blog.chromium.org/2013/11/protecting-windows-users-from-malicious.html
[7]: http://blog.chromium.org/2015/05/continuing-to-protect-chrome-users-from.html
[8]: /docs/apps/autoupdate#update_url
[9]: /docs/extensions/mv2/hosting
[10]: #registry
[11]: #troubleshooting
[12]: #preferences
[13]: #registry
[14]: /docs/extensions/mv2/hosting
[15]: /docs/apps/autoupdate#update_manifest
[16]: /docs/apps/npapi
