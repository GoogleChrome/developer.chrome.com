---
layout: "layouts/doc-post.njk"
title: "Installing extensions on Linux"
date: 2017-12-14
updated: 2018-03-23
description: How to package, host, and update crx files from a personal server.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

Extensions hosted outside of the [Chrome Web Store][1] can only be installed by Linux users. This
article describes how to package, host, and update `.crx` files from a personal server. If
distributing an extension or theme solely through the [Chrome Web Store][2], consult [Webstore
Hosting and Updating][3].

## Packaging {: #packaging }

Extensions and themes are served as `.crx` files. When uploading through the [Chrome Developer
Dashboard][4] , the dashboard creates the `.crx` file automatically. If published on a personal
server, the `.crx` file will need to be created locally or downloaded from the Chrome Web Store.

<!-- TODO this section's ID was previouly #create which is a duplicate of another section -->

### Download .crx from the Chrome Web Store

If an extension is hosted on the Chrome Web Store, the `.crx` file can be downloaded from the
Developer Dashboard. Locate the extension under "Your Listings" and click on "More info". In the
popup window, click the blue `main.crx` link to download it.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ympE762hCQc9EH6ZIB9W.png",
       alt="Download .crx from the Developer Dashboard", height="271", width="484" %}

The downloaded file can be hosted on a personal server. This is the most secure way to host an
extension locally as the contents of the extension will be signed by the Chrome Web Store. This
helps detect potential attacks and tampering.

### Create .crx locally {: #create }

Extension directories are converted to `.crx` files at the Extensions Management Page. Navigate to
`chrome://extensions/` in the ominibox, or click on the Chrome menu, hover over "More Tools" then
select "Extensions".

On the Extensions Management Page, enable Developer Mode by clicking the toggle switch next to
**Developer mode**. Then select the **PACK EXTENSION** button.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/uO9oti7LStDokrnq6d0Q.png",
       alt="Developer Mode is Checked then Click Pack Extension", height="120", width="642" %}

Specify the path to the extension's folder in the Extension root directory field then click the
**PACK EXTENSION** button. Ignore the **Private key** field for a first-time package.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/a0iFUqr8SpjTcIjtXy44.png",
       alt="Specify Extension Path then Click Pack Extension", height="307", width="524" %}

Chrome will create two files, a `.crx` file and a `.pem` file, which contains the extension's
private key.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/sECV1ZYWjipkhNiwwMJv.png",
       alt="Packaged Extension Files", height="210", width="521" %}

**Do not lose the private key!** Keep the `.pem` file in a secret and secure place; it will be
needed to [update][5] the extension.

<!-- TODO duplicate ID (was previously #update) -->

### Update a .crx package

Update an extension's `.crx` file by increasing the version number in `manifest.json`.

```json
{
  ...
  "version": "1.5",
  ...
  }
}
```

```json
{
  ...
  "version": "1.6",
  ...
  }
}
```

Return to the [Extensions Management Page][6] and click the **PACK EXTENSION** button. Specify the
path to the extensions directory and the location of private key.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/gcvNd3qR9hU7Pp0fQvhZ.png",
       alt="Updating Extension Files", height="305", width="521" %}

The page will provide the path for the updated packaged extension.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/sECV1ZYWjipkhNiwwMJv.png",
       alt="Updating Extension Files", height="210", width="521" %}

<!-- TODO(kaycebasques): Had duplicated ID of #packaging -->

### Package through command line

Package extensions in the command line by invoking [`chrome.exe`][7]. Use the `--pack-extension`
flag to specify the location of the extension's folder and the `--pack-extension-key` flag to
specify the location of the extension's private key file.

```shell
chrome.exe --pack-extension=C:\myext --pack-extension-key=C:\myext.pem
```

## Hosting {: #hosting }

A server that hosts `.crx` files must use appropriate HTTP headers to allow users to install the
extension by clicking a link.

Google Chrome considers a file to be installable if **either** of the following is true:

- The file has the content type `application/x-chrome-extension`
- The file suffix is `.crx` and **both** of the following are true:
  - The file **is not** served with the HTTP header `X-Content-Type-Options: nosniff`
  - The file **is** served with one of the following content types:
    - empty string
    - "text/plain"
    - "application/octet-stream"
    - "unknown/unknown"
    - "application/unknown"
    - "\*/\*"

The most common reason for failing to recognize an installable file is that the server sends the
header `X-Content-Type-Options: nosniff`. The second most common reason is that the server sends an
unknown content type—one that isn't in the previous list. To fix an HTTP header issue, either change
the configuration of the server or try hosting the `.crx` file at another server.

## Updating {: #update }

Every few hours, the browser checks installed extensions for an update URL. For each one, it makes a
request to that URL looking for an update manifest XML file.

- The content returned by an update check is an _update manifest_ XML document listing the latest
  version of an extension.

If the update manifest mentions a version that is more recent than what is installed, the browser
downloads and installs the new version. As with manual updates, the new `.crx` file must be signed
with the same private key as the currently installed version.

<div class="aside aside--note"><b>Note:</b> In order to maintain user privacy, Google Chrome does not send any Cookie headers with autoupdate manifest requests, and ignores any Set-Cookie headers in the responses to those requests.</div>

### Update URL {: #update_url }

Extensions hosted on servers outside of the Chrome Webstore must include the `update_url` field in
their [`manifest.json`][8] file.

```json
{
  "name": "My extension",
  ...
  "update_url": "https://myhost.com/mytestextension/updates.xml",
  ...
}
```

### Update manifest {: #update_manifest }

The update manifest returned by the server should be an XML document.

```xml
<?xml version='1.0' encoding='UTF-8'?>
<gupdate xmlns='https://www.google.com/update2/response' protocol='2.0'>
  <app appid='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'>
    <updatecheck codebase='https://myhost.com/mytestextension/mte_v2.crx' version='2.0' />
  </app>
</gupdate>
```

This XML format is borrowed from that used by [Omaha][9], Google's update infrastructure. The
extensions system uses the following attributes for the `<app>` and `<updatecheck>` elements of the
update manifest:

<table><tbody><tr><td>appid</td><td>The extension ID is generated based on a hash of the public key, as described in <a href="/linux_hosting#packaging">packaging</a>. An extension's ID is displayed on the <a href="/linux_hosting#extension_management">Extensions Managment Page</a></td></tr><tr><td>codebase</td><td>An HTTPS URL to the <code>.crx</code> file.</td></tr><tr><td>version</td><td>Used by the client to determine whether it should download the <code>.crx</code> file specified by <code>codebase</code>. It should match the value of "version" in the <code>.crx</code> file's <code>manifest.json</code> file.</td></tr></tbody></table>

The update manifest XML file may contain information about multiple extensions by including multiple
<app> elements.

### Testing {: #testing }

The default update check frequency is several hours, but an update can be forced using the **Update
extensions now** button on the Extensions Management Page.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/VoSOLJm03H8uwWTQJP7w.png",
       alt="Update Extensions Now", height="115", width="773" %}

This will start checks for all installed extensions.

### Advanced usage: request parameters {: #request_parameters }

The basic autoupdate mechanism is designed to make the server-side work as easy as just dropping a
static XML file onto any plain web server, such as Apache, and updating that XML file as new
extension versions are released.

Developers hosting multiple extensions may check request parameters, which indicate the extension ID
and version in the update request. Including these paramaters allow extensions to update from the
same URL running dynamic server-side code instead of a static XML file.

The format of the request parameters is:

`?x=_<extension_data>_`

Where `_<extension_data>_` is a URL-encoded string of the format:

`_id=<id>_&v=_<version>_`

For example, two extensions point to the same update URL (`https://test.com/extension_updates.php`):

- Extension 1
  - ID: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  - Version: "1.1"
- Extension 2
  - ID: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
  - Version: "0.4"

The request to update each individual extension would be,

```http
https://test.com/extension_updates.php?x=id%3Daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa%26v%3D1.1
```

and

```http
https://test.com/extension_updates.php?x=id%3Dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb%26v%3D0.4
```

Multiple extensions can be listed in a single request for each unique update URL. For the above
example, if a user has both of the extensions installed, then the two requests are merged into a
single request:

```http
https://test.com/extension_updates.php?x=id%3Daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa%26v%3D1.1&x=id%3Dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb%26v%3D0.4
```

If the number of installed extensions using the same update URL is large enough that a GET request
URL is too long (over 2000 characters or so), the update check issues additional GET requests as
necessary.

### Advanced usage: minimum browser version {: #minimum_browser_version }

As more APIs are added to the extensions system, an updated version of an extension that will work
only with newer versions of the browser may be released. While Google Chrome itself is autoupdated,
it can take a few days before the majority of the user base has updated to any given new release. To
ensure that a given update will apply only to Google Chrome versions at or higher than a specific
version, add the "prodversionmin" attribute to the <app> element in the update response.

```xml
<?xml version='1.0' encoding='UTF-8'?>
<gupdate xmlns='http://www.google.com/update2/response' protocol='2.0'>
  <app appid='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'>
    <updatecheck codebase='http://myhost.com/mytestextension/mte_v2.crx' version='2.0' prodversionmin='3.0.193.0'/>
  </app>
</gupdate>
```

This would ensure that users would autoupdate to version 2 only if they are running Google Chrome
3.0.193.0 or greater.

[1]: http://chrome.google.com/webstore
[2]: http://chrome.google.com/webstore
[3]: /docs/extensions/mv2/hosting
[4]: https://chrome.google.com/webstore/developer/dashboard
[5]: #update
[6]: /packaging#extension_management
[7]: https://www.chromium.org/developers/how-tos/run-chromium-with-flags
[8]: /docs/extensions/mv2/tabs
[9]: https://github.com/google/omaha
[10]: /linux_hosting#packaging
[11]: /linux_hosting#extension_management
