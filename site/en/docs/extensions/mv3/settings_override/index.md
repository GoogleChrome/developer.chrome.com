---
layout: "layouts/doc-post.njk"
title: "Overriding Chrome settings"
seoTitle: "Overriding Chrome settings in Chrome Extensions"
date: 2014-02-14
updated: 2023-02-06
description: How to override Chrome settings from a Chrome Extension.
---


Settings overrides are a way for extensions to override selected Chrome settings. The API is
available on Windows and Mac in all current versions of Chrome.

## Homepage, search provider, and startup pages {: #others }

Here is an example of how [homepage][1], [search provider][2], and [startup pages][3] can be modified 
in the [extension manifest][4]. Any domain used in the settings API must be [verified][5] (via 
Google Search Console) by the same developer account publishing the extension. Note that if you 
verify ownership for a domain (for example, https://example.com) you can use any subdomain or page 
(for example, https://app.example.com or https://example.com/page.html) within your extension.

Using the settings override permission while also requesting any additional capabilities or permissions is inconsistent with our single purpose policy. When Chrome detects that an item is potentially violating our single purpose policy, a confirmation dialog is shown to the user. Extensions that limit themselves to only modifying a single setting without seeking additional capabilities or permissions do not get a confirmation dialog.

This applies to Chrome 107 and later.

```json
{
  "name": "My extension",
  ...
  "chrome_settings_overrides": {
    "homepage": "https://www.homepage.com",
    "search_provider": {
        "name": "name.__MSG_url_domain__",
        "keyword": "keyword.__MSG_url_domain__",
        "search_url": "https://www.foo.__MSG_url_domain__/s?q={searchTerms}",
        "favicon_url": "https://www.foo.__MSG_url_domain__/favicon.ico",
        "suggest_url": "https://www.foo.__MSG_url_domain__/suggest?q={searchTerms}",
        "instant_url": "https://www.foo.__MSG_url_domain__/instant?q={searchTerms}",
        "image_url": "https://www.foo.__MSG_url_domain__/image?q={searchTerms}",
        "search_url_post_params": "search_lang=__MSG_url_domain__",
        "suggest_url_post_params": "suggest_lang=__MSG_url_domain__",
        "instant_url_post_params": "instant_lang=__MSG_url_domain__",
        "image_url_post_params": "image_lang=__MSG_url_domain__",
        "alternate_urls": [
          "https://www.moo.__MSG_url_domain__/s?q={searchTerms}",
          "https://www.noo.__MSG_url_domain__/s?q={searchTerms}"
        ],
        "encoding": "UTF-8",
        "is_default": true
    },
    "startup_pages": ["https://www.startup.com"]
   },
   "default_locale": "de",
   ...
}
```

## Customizing values {: #customizing }

Values in the manifest can be customized in the following ways:

- All values of the `search_provider`, `homepage`, and `startup_pages` properties can be localized
  using the [`chrome.i18n` API][6].
- For [external extensions][7], the `search_provider`, `homepage` and `startup_pages` URL values can
  be parametrized using a registry key. Create a new registry entry next to the
  `"update_url"` key (see instructions [here][8]). The key name is `"install_parameter"`, the value
  is an arbitrary string:

  ```json
  {
    "update_url": "https://clients2.google.com/service/update2/crx",
    "install_parameter": "Value"
  }
  ```

  All occurrences of the substring `"__PARAM__"` in the manifest URLs will be substituted with the
  `"install_parameter"` value. If `"install_parameter"` is absent, occurrences of `"__PARAM__"` are
  removed. Note that `"__PARAM__"` cannot be part of the hostname. It needs to occur after the
  first '/' in the URL.

## Reference {: #reference }

An extension can override one or more of the following properties in the manifest:

`alternate_urls` (array of strings, optional)
: A list of URL patterns that can be used in addition to `search_url.`

`encoding` (string, optional)
: The encoding used for search terms. This is required if you don't set `prepopulated_id`.

`favicon_url` (string, optional)
: An icon URL for the search engine. This is required if you don't set `prepopulated_id`.

`homepage` (string, optional)
: The new value for the homepage.

`image_url` (string, optional)
: The URL the search engine uses for image search. If this isn't used, the engine doesn't support image search.

`image_url_post_params` (string, optional)
: The post parameters for `image_url`.

`is_default` (boolean, required)
: Specifies whether the search provider should be default. <!--Does this mean whether it replaces the built-in Chrome search?-->

`keyword` (string, optional)
: An omnibox keyword for the search engine. This is required if you don't set `prepopulated_id`.

`name` (string, optional)
: Name of the search engine displayed to user. This is required if you don't set `prepopulated_id`.

`prepopulated_id` (integer, optional)
: An ID for Chrome's built-in search engine. <!--Is this the same every time?-->

`search_provider` (object, optional)
: A search engine.

`search_url` (string, required)
: The search URL the search engine uses.

`search_url_post_params` (string, optional)
: The post parameters for `search_url`.

`startup_pages` (array of strings, optional)
: An array of length one containing a URL to be used as the startup page.

`suggest_url` (string, optional)
: The URL the search engine uses for suggestions. If this isn't used, the engine doesn't support suggestions.

`suggest_url_post_params` (string, optional)
: The post parameters for `suggest_url`.

[1]: #homepage
[2]: #search_provider
[3]: #startup_pages
[4]: /docs/extensions/mv3/manifest/
[5]: https://support.google.com/webmasters/answer/35179
[6]: /docs/extensions/reference/i18n
[7]: /docs/extensions/mv3/external_extensions/
[8]: /docs/extensions/mv3/external_extensions/#registry
