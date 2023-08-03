---
api: fontSettings
---

## Manifest

To use the Font Settings API, you must declare the "fontSettings" permission in the [extension
manifest][1]. For example:

```js
{
  "name": "My Font Settings Extension",
  "description": "Customize your fonts",
  "version": "0.2",
  "permissions": [
    "fontSettings"
  ],
  ...
}
```

## Generic Font Families and Scripts

Chrome allows for some font settings to depend on certain generic font families and language
scripts. For example, the font used for sans-serif Simplified Chinese may be different than the font
used for serif Japanese.

The generic font families supported by Chrome are based on [CSS generic font families][2] and are
listed in the API reference below. When a webpage specifies a generic font family, Chrome selects
the font based on the corresponding setting. If no generic font family is specified, Chrome uses the
setting for the "standard" generic font family.

When a webpage specifies a language, Chrome selects the font based on the setting for the
corresponding language script. If no language is specified, Chrome uses the setting for the default,
or global, script.

The supported language scripts are specified by ISO 15924 script code and listed in the API
reference below. Technically, Chrome settings are not strictly per-script but also depend on
language. For example, Chrome chooses the font for Cyrillic (ISO 15924 script code "Cyrl") when a
webpage specifies the Russian language, and uses this font not just for Cyrillic script but for
everything the font covers, such as Latin.

## Examples

The following code gets the standard font for Arabic.

```js
chrome.fontSettings.getFont(
  { genericFamily: 'standard', script: 'Arab' },
  function(details) { console.log(details.fontId); }
);
```

The next snippet sets the sans-serif font for Japanese.

```js
chrome.fontSettings.setFont(
  { genericFamily: 'sansserif', script: 'Jpan', fontId: 'MS PGothic' }
);
```

To try this API, install the [fontSettings API example](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/fontSettings) from the [chrome-extension-samples](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples)
repository.

[1]: /docs/extensions/mv3/manifest
[2]: https://www.w3.org/TR/CSS21/fonts.html#generic-font-families
[3]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/_archive/mv2/api/fontSettings/
[4]: /docs/extensions/mv2/samples
