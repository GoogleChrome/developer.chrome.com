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

- **`homepage` (string)** - optional

  New value for the homepage.

- **`search_provider` (object)** - optional

  A search engine

  <table>
    <tbody>
      <tr>
        <th>Type</th>
        <th>Attribute</th>
        <th>Description</th>
      </tr>
      <tr id="property-search_provider-name">
        <td>string</td>
        <td><span class="optional">(optional)</span> name</td>
        <td>
          <p>Name of the search engine displayed to user. This may only be omitted if
            <em>prepopulated_id</em> is set.</p>
        </td>
      </tr>
      <tr id="property-search_provider-keyword">
        <td>string</td>
        <td><span class="optional">(optional)</span> keyword</td>
        <td>
          <p>Omnibox keyword for the search engine. This may only be omitted if
            <em>prepopulated_id</em> is set.</p>
        </td>
      </tr>
      <tr id="property-search_provider-favicon_url">
        <td>string</td>
        <td><span class="optional">(optional)</span> favicon_url</td>
        <td>
          <p>An icon URL for the search engine. This may only be omitted if <em>prepopulated_id</em>
            is set.</p>
        </td>
      </tr>
      <tr id="property-search_provider-search_url">
        <td>string</td>
        <td>search_url</td>
        <td>
          <p>A search URL used by the search engine.</p>
        </td>
      </tr>
      <tr id="property-search_provider-encoding">
        <td>string</td>
        <td><span class="optional">(optional)</span> encoding</td>
        <td>
          <p>Encoding of the search term. This may only be omitted if <em>prepopulated_id</em> is
            set.</p>
        </td>
      </tr>
      <tr id="property-search_provider-suggest_url">
        <td>string</td>
        <td><span class="optional">(optional)</span> suggest_url</td>
        <td>
          <p>If omitted, this engine does not support suggestions.</p>
        </td>
      </tr>
      <tr id="property-search_provider-image_url">
        <td>string</td>
        <td><span class="optional">(optional)</span> image_url</td>
        <td>
          <p>If omitted, this engine does not support image search.</p>
        </td>
      </tr>
      <tr id="property-search_provider-search_url_post_params">
        <td>string</td>
        <td><span class="optional">(optional)</span> search_url_post_params</td>
        <td>
          <p>The string of post parameters to search_url</p>
        </td>
      </tr>
      <tr id="property-search_provider-suggest_url_post_params">
        <td>string</td>
        <td><span class="optional">(optional)</span> suggest_url_post_params</td>
        <td>
          <p>The string of post parameters to suggest_url</p>
        </td>
      </tr>
      <tr id="property-search_provider-image_url_post_params">
        <td>string</td>
        <td><span class="optional">(optional)</span> image_url_post_params</td>
        <td>
          <p>The string of post parameters to image_url</p>
        </td>
      </tr>
      <tr id="property-search_provider-alternate_urls">
        <td>array of string</td>
        <td><span class="optional">(optional)</span> alternate_urls</td>
        <td>
          <p>A list of URL patterns that can be used, in addition to <em>search_url</em>.</p>
        </td>
      </tr>
      <tr id="property-search_provider-prepopulated_id">
        <td>integer</td>
        <td><span class="optional">(optional)</span> prepopulated_id</td>
        <td>
          <p>An ID of the built-in search engine in Chrome.</p>
        </td>
      </tr>
      <tr id="property-search_provider-is_default">
        <td>boolean</td>
        <td>is_default</td>
        <td>
          <p>Specifies if the search provider should be default.</p>
        </td>
      </tr>
    </tbody>
  </table>

- **`startup_pages` (array of string)** - optional

An array of length one containing a URL to be used as the startup page.

[1]: #homepage
[2]: #search_provider
[3]: #startup_pages
[4]: /docs/extensions/mv3/manifest/
[5]: https://support.google.com/webmasters/answer/35179
[6]: /docs/extensions/reference/i18n
[7]: /docs/extensions/mv3/external_extensions/
[8]: /docs/extensions/mv3/external_extensions/#registry
