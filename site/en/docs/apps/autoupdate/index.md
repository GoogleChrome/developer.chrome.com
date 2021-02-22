---
layout: "layouts/doc-post.njk"
title: "Autoupdating"
date: 2012-09-17
updated: 2018-03-19
description: How to enable auto-updating of your Chrome App.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

We want extensions and apps to be autoupdated for some of the same reasons as Google Chrome itself:
to incorporate bug and security fixes, add new features or performance enhancements, and improve
user interfaces.

If you publish using the [Chrome Developer Dashboard][3], you can _ignore this page_. You can use
the dashboard to release updated versions to users, as well as to the Chrome Web Store.

If you want to host somewhere other than the store, keep reading. You should also read [Hosting][4]
and [Packaging][5].

{% Aside 'warning' %}

**Warning:** As of M33, Windows stable/beta channel users can only download extensions hosted in the
Chrome Web Store (see [Protecting Windows users from malicious extensions][6]).

{% endAside %}

Previously when off-store extensions were supported, it was possible to have the native binaries and
the extension be updated in lock step. However, extensions hosted on the Chrome Web Store are
updated via the Chrome update mechanism which developers do not control. Extension developers should
be careful about updating extensions that have a dependency on the native binary (for example,
legacy extensions using [NPAPI][7]).

## Overview {: #overview }

- A manifest may contain an "update_url" field, pointing to a location for doing update checks.
- The content returned by an update check is an _update manifest_ XML document listing the latest
  version of an extension.

Every few hours, the browser checks whether any installed extensions or apps have an update URL. For
each one, it makes a request to that URL looking for an update manifest XML file. If the update
manifest mentions a version that is more recent than what's installed, the browser downloads and
installs the new version. As with manual updates, the new `.crx` file must be signed with the same
private key as the currently installed version.

{% Aside %}

**Note:** In order to maintain user privacy, Google Chrome does not send any Cookie headers with
autoupdate manifest requests, and ignores any Set-Cookie headers in the responses to those requests.

{% endAside %}

## Update URL {: #update_url }

If you're hosting your own extension or app, you need to add the "update_url" field to your
[`manifest.json`][8] file, like this:

```json
{
  "name": "My extension",
  ...
  "update_url": "http://myhost.com/mytestextension/updates.xml",
  ...
}
```

## Update manifest {: #update_manifest }

The update manifest returned by the server should be an XML document that looks like this
(highlights indicate parts you should modify):

```xml
<?xml version='1.0' encoding='UTF-8'?>
<gupdate xmlns='http://www.google.com/update2/response' protocol='2.0'>
  <app appid='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'>
    <updatecheck codebase='http://myhost.com/mytestextension/mte_v2.crx' version='2.0' />
  </app>
</gupdate>
```

This XML format is borrowed from that used by Omaha, Google's update infrastructure. See
[http://code.google.com/p/omaha/][9] for more details. The extensions system uses the following
attributes for the **<app>** and **<updatecheck>** elements of the update manifest:

**appid**  
The extension or app ID, generated based on a hash of the public key, as described in
[Packaging][10]. You can find the ID of an extension or Chrome App by going to the Extensions page
(**chrome://extensions**).

Hosted apps, however, are not listed on the Extensions page. You can find the ID of any app using
the following steps:

- Open the app. You can do this by clicking its icon on the New Tab page.
- Open the JavaScript console. You can do this by clicking the wrench icon and choosing **Tools >
  JavaScript Console**.
- Enter the following expression into the JavaScript console: `chrome.app.getDetails().id`

  The console shows the app's ID as a quoted string.

**codebase**  
A URL to the `.crx` file.

**version**  
Used by the client to determine whether it should download the `.crx` file specified by `codebase`.
It should match the value of "version" in the `.crx` file's `manifest.json` file.

The update manifest XML file may contain information about multiple extensions by including multiple
<app> elements.

## Testing {: #testing }

The default update check frequency is several hours, but you can force an update using the
Extensions page's **Update extensions now** button.

## Advanced usage: request parameters {: #request_parameters }

The basic autoupdate mechanism is designed to make the server-side work as easy as just dropping a
static XML file onto any plain web server such as Apache, and updating that XML file as you release
new versions of your extensions.

More advanced developers may wish to take advantage of the fact that we add on parameters to the
request for the update manifest to indicate the extension ID and version. Then they can use the same
update URL for all of their extensions, pointing to a URL running dynamic server-side code instead
of a static XML file.

The format of the request parameters is:

`?x=_<extension_data>_`

Where `_<extension_data>_` is a URL-encoded string of the format:

`_id=<id>_&v=_<version>_`

For example, say you have two extensions, both of which point to the same update URL
(`http://test.com/extension_updates.php`):

- Extension 1
  - ID: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  - Version: "1.1"
- Extension 2
  - ID: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
  - Version: "0.4"

The request to update each individual extension would be:

- `http://test.com/extension_updates.php?x=id%3Daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa%26v%3D1.1`
- `http://test.com/extension_updates.php?x=id%3Dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb%26v%3D0.4`

Multiple extensions can be listed in a single request for each unique update URL. For the above
example, if a user has both of the extensions installed, then the two requests are merged into a
single request:

`http://test.com/extension_updates.php?x=id%3Daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa%26v%3D1.1&x=id%3Dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb%26v%3D0.4`

If the number of installed extensions using the same update URL is large enough that a GET request
URL is too long (over 2000 characters or so), the update check issues additional GET requests as
necessary.

{% Aside %}

**Note:** In the future, instead of issuing multiple GET requests, a single POST request might be
issued with the request parameters in the POST body.

{% endAside %}

## Advanced usage: minimum browser version {: #minimum_browser_version }

As we add more APIs to the extensions system, it's possible you will want to release an updated
version of an extension or app that will work only with newer versions of the browser. While Google
Chrome itself is autoupdated, it can take a few days before the majority of the user base has
updated to any given new release. To ensure that a given update will apply only to Google Chrome
versions at or higher than a specific version, you add the "prodversionmin" attribute to the <app>
element in your update manifest. For example:

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

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: https://chrome.google.com/webstore/developer/dashboard
[4]: hosting
[5]: packaging
[6]: http://blog.chromium.org/2013/11/protecting-windows-users-from-malicious.html
[7]: npapi
[8]: manifest
[9]: http://code.google.com/p/omaha/
[10]: packaging
