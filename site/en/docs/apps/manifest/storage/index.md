---
layout: "layouts/doc-post.njk"
title: "Manifest for storage areas"
seoTitle: "Chrome Apps Manifest for storage areas [Deprecated]"
#date: TODO
#updated: TODO
#description: TODO
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

Unlike the `local` and `sync` storage areas, the `managed` storage area requires its structure to be
declared as [JSON Schema][3] and is strictly validated by Chrome. This schema must be stored in a
file indicated by the `"managed_schema"` property of the `"storage"` manifest key and declares the
enterprise policies supported by the app.

Policies are analogous to options but are configured by a system administrator instead of the user,
allowing the app to be preconfigured for all users of an organization. See [how Chrome handles
policies][4] for examples from Chrome itself.

After declaring the policies they can be read from the [storage.managed][5] API. It's up to the app
to enforce the policies configured by the administrator.

## Sample manifest.json {: #manifest }

The `storage.managed_schema` property indicates a file within the app that contains the policy
schema.

```json
{
  "name": "My enterprise app",
  "storage": {
    "managed_schema": "schema.json"
  },
  ...
}
```

Chrome will then load these policies from the underlying operating system and from Google Apps for
signed-in users. The [storage.onChanged][6] event is fired whenever a policy change is detected,
including while the browser wasn't running if the app uses [event pages][7]. You can verify the
policies that Chrome loaded at [chrome://policy][8].

## Schema format {: #format }

The JSON Schema format has some additional requirements from Chrome:

- The top-level schema must have type `object`.
- The top-level `object` can't have `additionalProperties`. The `properties` declared are the
  policies for this app.
- Each schema must have either a `$ref` value or exactly one `type`.

If the schema is invalid then Chrome won't load the extension and will indicate the reason why the
schema wasn't validated. If a policy value does not conform to the schema then it will not be
published by the `storage.managed` API.

## Sample schema {: #sample }

```json
{
  "type": "object",

  // "properties" maps an optional key of this object to its schema. At the
  // top-level object, these keys are the policy names supported.
  "properties": {

    // The policy name "AutoSave" is mapped to its schema, which in this case
    // declares it as a simple boolean value.
    // "title" and "description" are optional and are used to show a
    // user-friendly name and documentation to the administrator.
    "AutoSave": {
      "title": "Automatically save changes.",
      "description": "If set to true then changes will be automatically saved.",
      "type": "boolean"
    },

    // Other simple types supported include "integer", "string" and "number".
    "PollRefreshRate": {
      "type": "integer"
    },

    "DefaultServiceUrl": {
      "type": "string"
    },

    // "array" is a list of items that conform to another schema, described
    // in "items". An example to this schema is [ "one", "two" ].
    "ServiceUrls": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },

    // A more complex example that describes a list of bookmarks. Each bookmark
    // has a "title", and can have a "url" or a list of "children" bookmarks.
    // The "id" attribute is used to name a schema, and other schemas can reuse
    // it using the "$ref" attribute.
    "Bookmarks": {
      "type": "array",
      "id": "ListOfBookmarks",
      "items": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "url": { "type": "string" },
          "children": { "$ref": "ListOfBookmarks" }
        }
      }
    },

    // An "object" can have known properties listed as "properties", and can
    // optionally have "additionalProperties" indicating a schema to apply to
    // keys that aren't found in "properties".
    // This example policy could map a URL to its settings. An example value:
    // {
    //   "youtube.com": {
    //     "blocklisted": true
    //   },
    //   "google.com": {
    //     "bypass_proxy": true
    //   }
    // }
    "SettingsForUrls": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "properties": {
          "blocklisted": { "type": "boolean" },
          "bypass_proxy": { "type": "boolean" }
        }
      }
    }
  }
}
```

[1]: https://blog.chromium.org/2020/08/changes-to-chrome-app-support-timeline.html
[2]: /apps/migration
[3]: https://tools.ietf.org/html/draft-zyp-json-schema-03
[4]: https://www.chromium.org/administrators/
[5]: ../storage#property-managed
[6]: ../storage#event-onChanged
[7]: ../event_pages
[8]: chrome://policy
