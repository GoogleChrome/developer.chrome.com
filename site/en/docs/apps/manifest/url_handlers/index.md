---
layout: "layouts/doc-post.njk"
title: "url_handlers"
seoTitle: "Chrome Apps url_handlers [Deprecated]"
date: 2013-09-11
updated: 2014-05-21
description: Reference documentation for the url_handlers property of manifest.json.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

Used by [packaged apps][3] to specify URL patterns the app wants to intercept and handle. An app can
define multiple URL handlers under this manifest entry, each having an identifier, a URL pattern,
and a title. Here's an example of how to specify `url_handlers`:

```json
"url_handlers": {
  "view_foo_presentation": {
    "matches": [
      "https://www.foo.com/presentation/view/*"
    ],
    "title": "View Foo presentation"
  },
  "view_bar_presentation": {
    "matches": [
      "https://www.bar.com/view/slideshow/*"
    ],
    "title": "View bar presentation"
  },
  "edit_spreadsheet": {
    "matches": [
      "https://www.foo.com/spreadsheet/edit/*",
      "https://www.bar.com/spreadsheet/edit/*"
    ],
    "title": "Edit spreadsheet"
  }
}
```

Apps can only register to handle URL patterns within domains that they own, that is, can prove
ownership of as determined by the [Chrome Web Store][4]. Apps that violate this requirement and
attempt to register for handling external URLs will be rejected by the Chrome Web Store on upload.

This automatically means that at least a complete domain should always be specified for all the
patterns under `matches`. Otherwise, ownership cannot be verified.

Upon successful registration and installation, an app will be launched for all matching navigations
inside browser tabs as well as other apps. The app will receive a new kind of the
[app.runtime.onLaunched][5] event, with the launchData object containing the matched handler's
identifier (such as "view_foo_presentation" above), the URL being navigated to, and the referrer's
URL.

The `title` field is reserved for future use in all relevant UI elements. It should describe the
action that the app performs when launched with this type of URL handler.

[1]: https://blog.chromium.org/2020/08/changes-to-chrome-app-support-timeline.html
[2]: /apps/migration
[3]:/docs/apps/app_lifecycle#eventpage
[4]: https://chrome.google.com/webstore
[5]: /docs/apps/app_lifecycle/#create_event_page
