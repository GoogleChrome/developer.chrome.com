---
layout: "layouts/doc-post.njk"
title: "Manifest - Action Handlers"
seoTitle: "Chrome Apps Manifest - Action Handlers [Deprecated]"
date: 2017-02-03
#updated: TODO
description: Reference documentation for the action_handlers property of manifest.json.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

The `action_handlers` manifest property declares which user actions or intents the application
supports; these can serve as alternate launch points for your application. This API is only
available on ChromeOS.

This list contains one or more of the `ActionType` values specified in the `ActionType` entry of
[app.runtime.onLaunched][3].

## Sample manifest.json {: #manifest }

```json
{
  "name": "My note app",
  "action_handlers": ["new_note"],
  ...
}
```

[1]: https://blog.chromium.org/2020/08/changes-to-chrome-app-support-timeline.html
[2]: /apps/migration
[3]: ../app_runtime#event-onLaunched
