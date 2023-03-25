---
layout: "layouts/doc-post.njk"
title: "Alternative extension installation methods"
seoTitle: "Alternative Chrome extension installation methods"
date: 2012-09-17
updated: 2022-01-28
description: How to install Chrome Extensions via preferences JSON or Windows registry.
---

Typically Chrome users install extensions by visiting an extension's listing in the Chrome Web Store
and installing the extension directly from that page. In some cases, though, other installation
flows may be more appropriate. For example:

- An extension is associated with some other software, and the extension should be installed
  whenever the user installs that other software.
- A network admin wants to install the same extensions throughout their organization.

{% Aside %}

Administrators can also use enterprise policies to manage extension installation. To learn more, see
[Extension Enterprise policies](https://support.google.com/chrome/a/answer/7666985).

{% endAside %}

For the previous cases, Google Chrome supports the following extension installation methods:

- Using a [preferences JSON][section-preferences] file (for macOS X and Linux only)
- Using the [Windows registry][section-registry] (for Windows only)

Both ways support installing an extension hosted at an `update_URL`. On Windows and macOS, the
`update_URL` must point to the Chrome Web Store. When an extension is installed via these methods,
Windows and macOS users will have to enable the extension using the following confirmation dialog:

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/JccWJKfl22SMXSE712oz.png", 
alt="External extension warning", width="441", height="146" %}

On Linux, the preferences file can point to a Chrome Web Store extension, an [externally hosted
extension][linux-hosting] or a CRX extension file on the user's computer. Linux users will not be
prompted to enable the extension; it is installed automatically. 

{% Aside 'warning' %}

**Windows and Mac installs must come from Chrome Web Store:** As of Chrome 33, no external installs
are allowed from a path to a local CRX file on Windows (see [Protecting Windows users from malicious
extensions][malicious-windows]). As of Chrome 44, no external installs are allowed from a path to a
local CRX file on Mac OS (see [Continuing to protect Chrome users from malicious
extensions][malicious-mac]).

{% endAside %}

## Before you begin {: #prereqs }

### Installing from the Chrome Web Store {: #prereq-cws }

If you are distributing an extension hosted in the Chrome Web Store, you must first [publish the
extension][publish]. Then, make a note of the following:

- The **update URL**— `https://clients2.google.com/service/update2/crx`. This url points to the
  Chrome Web Store.
- The **extension's ID**— This can be found in the Chrome Web Store URL of the extension.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/85JMcIqgG9TLiJCZnAXE.png", alt="Chrome Web Store item
id", width="800", height="165" %}

<!-- Add screenshot -->

### Installing from Local CRX file {: #prereq-crx }

If you are distributing to Linux users from a local file, you will need to [package a CRX
file][packing] and note the following information:

- The **extension ID**— This can be found in the extension management page `chrome://extensions`.

- The **extension version**— This appears in the extension management page `chrome://extensions` or
  in the manifest JSON file.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/HC0GSBfirjLtbB7nFhPH.png", alt="How to find extension
id and version", width="500", height="258" %}

- The **location of the CRX file**— This can either be a local directory or a network share. Make
  sure the file is available to the machine you want to install the extension on.

### Installing from a personal server {: #prereq-server }

If you are distributing an extension hosted on a personal server for Linux users, you will need to
follow the instructions for [Installing extensions on Linux][linux-hosting] and note the following
information:

- The **extension ID**— This can be found in the extension management page `chrome://extensions`.

- The **update_url XML file path**— This has to match the file path of the
  [`update_url`][xml-update-url] field declared in the manifest JSON file.

The following examples assume the version is 1.0 and the extension ID is aaabbbcccdddeeefff.

## Using a preferences file {: #preferences }

{% Aside %}

**MacOS X and Linux only:** Do not use the preferences file for Windows. Use [Windows
registry][section-registry] instead.

{% endAside %}

### macOS {: #preference-mac }

1. Create a JSON file with the name of the extension ID. For example: `aaabbbcccdddeeefff.json`
2. Place it in one of the folders listed below:

    For a specific user

    : `~USERNAME/Library/Application Support/Google/Chrome/External
    Extensions/`

    For all users

    : `/Library/Application Support/Google/Chrome/External Extensions/`

3. Specify the update URL with the field name "external_update_url". For example:
    ```json
    {
      "external_update_url": "https://clients2.google.com/service/update2/crx"
    }
    ```
4.  Save the JSON file.
5.  Launch Google Chrome and go to **chrome://extensions**; you should see the extension listed.

{% Aside %}

The external extension file for all users is read only if every directory in the path is owned by
the user `root`, has the group `admin` or `wheel`, and is not world writable. The path must also be
free of symbolic links. These restrictions prevent an unprivileged user from causing extensions to
be installed for all users. See [Troubleshooting permission problems][section-mac-troubleshooting].

{% endAside %}

{% Details %} {% DetailsSummary %}

#### Troubleshooting Mac OS permissions problems {: #troubleshooting }

{% endDetailsSummary %}

On macOS, the external extensions files for all users are only read if file system permissions
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

{% endDetails %}

### Linux {: #preference-linux }

1. Create a JSON file with the name of the extension ID. For example: `aaabbbcccdddeeefff.json`.
1. Place it in one of the folders listed below:
    - `/opt/google/chrome/extensions/`
    - `/usr/share/google-chrome/extensions/`

1. The following list describes extension installation from the Chrome Web Store, a CRX file or a
   personal server:

    - To install a **Chrome Web Store** extension, specify the update URL with the field name
      "external_update_url". For example:
      ```json
      {
        "external_update_url": "https://clients2.google.com/service/update2/crx"
      }
      ```
    - To install the extension from a **CRX file**, specify the location in "external_crx" and the
      version in "external_version". For example:
      ```json
      {
        "external_crx": "/home/share/extension.crx",
        "external_version": "1.0"
      }
      ```
    - To install the extension **[hosted on a personal server][xml-update-url]**, the
      "external_update_url" field has to point to the xml file, like in the following example:
      ```json
      {
        "external_update_url": "http://myhost.com/mytestextension/updates.xml"
      }
      ```
1.  Save the JSON file.
1.  Launch Google Chrome and go to **chrome://extensions**; you should see the extension listed.

{% Aside %}

Use `chmod` if necessary to make sure that the `aaabbbcccdddeeefff.json` files are world-readable.
Check the [preference file common mistakes FAQ][section-faq-preference] for additional help.

{% endAside %}

### Supported Locales {: #preference-locales }

If you would like to install extension only for some browser locales, you can list supported locales
in field name "supported_locales". Locale may specify parent locale like "en", in this case the
extension will be installed for all English locales like "en-US", "en-GB", etc. If another browser
locale is selected that is not supported by the extension, the external extensions will be
uninstalled. If "supported_locales" list is missing, the extension will be installed for any locale.
For example:

```json
{
  "external_update_url": "https://clients2.google.com/service/update2/crx",
  "supported_locales": [ "en", "fr", "de" ]
}
```

## Using the Windows registry {: #registry }

1. Find or create the following key in the registry:

    32-bit Windows

    : `HKEY_LOCAL_MACHINE\Software\Google\Chrome\Extensions`

    64-bit Windows

    : `HKEY_LOCAL_MACHINE\Software\Wow6432Node\Google\Chrome\Extensions`

2. Create a new key (folder) under the **Extensions** key with the same name as the ID of your
   extension. For example: `aaabbbcccdddeeefff`.
3. In your extension key, create an "update_url" property and set it to the following value:
    ```json
    {
      "update_url": "https://clients2.google.com/service/update2/crx"
    }
    ```
4. Launch Chrome.
5. Go to **chrome://extensions**; you should see the extension listed.

{% Aside %}

Check the [Windows registry common mistakes][section-faq-registry] for additional help.

{% endAside %}

## Updating and uninstalling {: #updating }

Google Chrome scans the metadata entries in the preferences and registry each time the browser
starts, and makes any necessary changes to the installed external extensions hosted in the Chrome
Web Store.

To update a local CRX file extension to a new version, update the file, and then update the version
in the preferences json file.

To uninstall your extension (for example, if your software is uninstalled), remove your preference
file (for example, `aaabbbcccdddeeefff.json`) or the metadata from the registry.

## FAQ {: #faq }

This section answers common questions about external extensions.

### Is "pre-install" still supported by Google Chrome?

Yes, but only as an install from a Chrome Web Store `update_url`, not from a local CRX file path. For more information, see [App and Extension policies][extension-policies].

### What are some common mistakes when installing with the preferences file? {: #faq-preference }

- Not specifying the same id/version as the one listed in the CRX file.
- The JSON file (for example, `aaabbbcccdddeeefff.json`) is in the wrong location or the ID
  specified does not match the extension ID.
- Syntax error in JSON file (forgetting to separate entries with comma or leaving a trailing comma
  somewhere).
- JSON file entry points to the wrong path to the CRX file (or path specified but no filename)
- Backslashes in UNC path are not escaped. For example, `"\\server\share\file"` is wrong; it should
  be `"\\\\server\\share\\extension"`.
- Permissions problems on a network share.

### What are some common mistakes when installing with the registry? {: #faq-registry }

- Not specifying the same id as the one listed in the Chrome Web Store.
- Key created in the wrong location in the registry.
- Registry entry points to the wrong path to the CRX file in the Chrome Web Store.
- Permissions problems on a network share.
- Not all instances of Chrome are closed. Try rebooting your computer after setting the registry.

### What if the user uninstalls the extension? {: #faq-uninstalls }

If the user uninstalls the extension through the UI, it will no longer be installed or updated on
each startup. In other words, the external extension is blocklisted.

### How do I get off the blocklist? {: #faq-blocklist }

If the user uninstalls your extension, you should respect that decision. However, if you (the
developer) accidentally uninstalled your extension through the UI, you can remove the blocklist tag
by installing the extension normally through the UI, and then uninstalling it.

[extension-policies]: https://support.google.com/chrome/a/answer/7666985?hl=en
[hosting]: /docs/extensions/mv3/hosting
[linux-hosting]: /docs/extensions/mv3/linux_hosting/
[malicious-mac]: http://blog.chromium.org/2015/05/continuing-to-protect-chrome-users-from.html
[malicious-windows]: http://blog.chromium.org/2013/11/protecting-windows-users-from-malicious.html
[packing]: /docs/extensions/mv3/linux_hosting/#packaging
[publish]: /docs/webstore/publish
[section-faq-preference]: #faq-preference
[section-faq-registry]: #faq-registry
[section-faq]: #faq
[section-mac-troubleshooting]: #troubleshooting
[section-preferences]: #preferences
[section-registry]: #registry
[xml-update-url]: /docs/extensions/mv3/linux_hosting/#update_url
