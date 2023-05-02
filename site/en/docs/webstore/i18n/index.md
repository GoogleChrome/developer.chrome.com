---
layout: "layouts/doc-post.njk"
title: Internationalize your extension
date: 2017-08-30
updated: 2023-05-01
description: How to internationalize your Chrome Web Store extension.
---

This page describes how to support multiple languages of an extension in the Chrome Web Store.

Unless your extension is strictly local in scope, you should _internationalize_ it, making it easy
to adapt to various languages and regions. You can then _localize_ it—translate and otherwise adapt
it so that it works well in a particular locale.

{% Aside %}

The word _internationalization_ is often abbreviated to _i18n_, referring to the 18 letters between
the letters _i_ and _n_. _Localization_ is sometimes abbreviated to _l10n_.

{% endAside %}

## Overview {: #overview }

You can follow these steps to internationalize and localize an extension to be published
in the Chrome Web Store:

1. Decide which [locales][supported-locales] you want to support.
1. Internationalize and localize the extension's UI using the [extension platform i18n
   support][i18n].
1. Localize your extension's [name and description][name-description].
1. [Upload your extension][publish] using the Chrome Developer Dashboard.
1. Edit your listing, providing localized versions of the [detailed description][cws-description], a
   YouTube video URL and [screenshots][cws-screenshots].
1. Specify which [regions][regions] you want to support.

{% Aside %}

You can significantly **increase your extension's ranking** in the locales that you support by
localizing the name, description, and detailed description.

{% endAside %}


## Choose locales to support {: #choosing-locales-to-support }

You can localize your extension to any of the following locales.

| Locale code | Language (region)                     |
| :---------- | :------------------------------------ |
| ar          | Arabic                                |
| am          | Amharic                               |
| bg          | Bulgarian                             |
| bn          | Bengali                               |
| ca          | Catalan                               |
| cs          | Czech                                 |
| da          | Danish                                |
| de          | German                                |
| el          | Greek                                 |
| en          | English                               |
| en_GB       | English (Great Britain)               |
| en_US       | English (USA)                         |
| es          | Spanish                               |
| es_419      | Spanish (Latin America and Caribbean) |
| et          | Estonian                              |
| fa          | Persian                               |
| fi          | Finnish                               |
| fil         | Filipino                              |
| fr          | French                                |
| gu          | Gujarati                              |
| he          | Hebrew                                |
| hi          | Hindi                                 |
| hr          | Croatian                              |
| hu          | Hungarian                             |
| id          | Indonesian                            |
| it          | Italian                               |
| ja          | Japanese                              |
| kn          | Kannada                               |
| ko          | Korean                                |
| lt          | Lithuanian                            |
| lv          | Latvian                               |
| ml          | Malayalam                             |
| mr          | Marathi                               |
| ms          | Malay                                 |
| nl          | Dutch                                 |
| no          | Norwegian                             |
| pl          | Polish                                |
| pt_BR       | Portuguese (Brazil)                   |
| pt_PT       | Portuguese (Portugal)                 |
| ro          | Romanian                              |
| ru          | Russian                               |
| sk          | Slovak                                |
| sl          | Slovenian                             |
| sr          | Serbian                               |
| sv          | Swedish                               |
| sw          | Swahili                               |
| ta          | Tamil                                 |
| te          | Telugu                                |
| th          | Thai                                  |
| tr          | Turkish                               |
| uk          | Ukrainian                             |
| vi          | Vietnamese                            |
| zh_CN       | Chinese (China)                       |
| zh_TW       | Chinese (Taiwan)                      |

## Localize your extension listing

To localize your extension's listing, you first localize the name and description. Then, after
uploading your localized extension, you can edit your extension's listing to specify localized
versions of your extension's detailed description and screenshots.

### Name and description {: #name-and-description }

You localize the name and description by modifying [`manifest.json`][manifest] and providing a
`_locales` directory in your extension's ZIP file. Specifically, you need to:

- Modify the [`"name"`][name] and [`"description"`][description] manifest fields.
- Add a [`"default_locale"`][default-locale] field.
- Provide at least one `_locales/LOCALE_CODE/messages.json` file. Replace
  [*LOCALE_CODE*][supported-locales] with a supported locale; each `messages.json` file contains the strings for one
  locale.

{% Aside %}

The name should not exceed 45 characters and the description should not exceed 132 characters.

{% endAside %}

Here's an example of how you might specify the name and description of an internationalized
extension that has English as its default language and British English as its secondary language:

```json
//in manifest.json:
  "name": "__MSG_appName__",
  "description": "__MSG_appDesc__",
  "default_locale": "en",

//in _locales/en/messages.json:
{
  "appName": {
    "message": "My extension",
    "description": "The description of the extension, displayed in the web store."
  },
  "appDesc": {
    "message": "This extension does something awesome.",
    "description": "The description of the extension, displayed in the web store."
  }
}

//in _locales/en_GB/messages.json:
{
  "appName": {
    "message": "My Application"
  },
  "appDesc": {
    "message": "This application does something brilliant."
  }
}
```

If you add a locale later, you just need to add a `_locales/LOCALE_CODE/messages.json` file for that
new locale in order for the Chrome Web Store to pick up the localized `"name"` and `"description"`.
For example, if you add support for French and Arabic, you'll need to add two files:
`_locales/fr/messages.json` and `_locales/ar/messages.json`. Each of those files can be a copy of
`_locales/en_GB/messages.json`, but with translated versions of the `message` values.


For details, see the extension [Internationalization][i18n] documentation:
- The [How extensions find strings][searching-messages] section shows how you can sometimes omit
  message strings. For example, if the extension's name isn't translated, you can leave it out for
  non-default locales.
- The [How to set your browser's locale][set-browser-locale] section is helpful when you test your
  translations.

Once you've completed this step, upload your extension using the Developer Dashboard, as described
in [Publishing Your extension][publish].

{% Aside %}

Before publishing your extension, you must remove comments from all JSON files.

{% endAside %}

### Detailed description {: #detailed-description }

You can provide a [detailed description][item-description] for each locale your extension supports.

In the [developer dashboard][dev-console], go to the **Store Listing** tab of your item. As the
following figure shows, if you support multiple locales a pull-down list appears at the top store
listing details. Each item in the list corresponds to one of the `_locales/LOCALE_CODE` directories
that you uploaded.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/GNIhOrJH6k6x4rM6iZyg.png",
alt="Choose language in store listing", width="800", height="162" %}

Next, choose the locale that you want to edit. Skip this if your extension supports only one locale.

Now edit the detailed description, providing text for the currently selected locale.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/70mdctbPy8hIIHPFxvZF.png",
alt="Detailed description of the Store Listing", width="483", height="140" %}

If you support multiple locales, repeat the previous two steps until you've provided a detailed
description for each supported locale.

### Screenshots {: #screenshots }

As the [screenshot guidelines][screenshot-guidelines] say, you should provide screenshots for your
extension. You can tailor these screenshots for each locale.

Go to the top of the **Store Listing** tab to choose the locale.

To add a screenshot, drop your screenshots in the **Localized screenshots** section. If you have a
YouTube video in the target language, you can add the URL in the **Localized promo video** field.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/y792ypc5Zy3AGyh0HwhE.png",
alt="localize screenshots and video", width="414", height="256" %}

To provide screenshots for another locale, use the pull-down list at the top of the page and select
the next language.

## Specify where to publish your extension {: #specify-where-to-publish-your-extension }

By default, your extension is listed in all regions that can use the Chrome Web Store. If you don't
want your extension to be listed in a particular region, unselect that region from the following
list in the **Regions** section of the [Distribution][distribution] tab.

- Australia
- Austria
- Belgium
- Brazil
- Bulgaria
- Canada
- Chile
- China
- Colombia
- Cuba
- Czechia
- Denmark
- Ecuador
- Egypt
- Estonia
- Finland
- France
- Germany
- Greece
- Hong Kong
- Hungary
- India
- Indonesia
- Ireland
- Israel
- Italy
- Japan
- Lithuania
- Malaysia
- Mexico
- Morocco
- Netherlands
- New Zealand
- Norway
- Panama
- Peru
- Philippines
- Poland
- Portugal
- Romania
- Russia
- Saudi Arabia
- Singapore
- Slovakia
- South Africa
- Spain
- Sweden
- Switzerland
- Taiwan
- Thailand
- Turkey
- Ukraine
- United Arab Emirates
- United Kingdom
- United States
- Venezuela
- Vietnam

{% Aside %}

Unselecting a region prevents your extension from being listed in that region.

{% endAside %}

## Switch languages in the Chrome Web Store {: #cws-switch-languages }

To see your store listing in each locale, you can choose the Chrome Web Store language in the
**Settings** icon located at the top right corner of your store listing.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/xVFiHOU8OUfAdgvVvlCP.PNG",
alt="Chrome Web Store language setting", width="488", height="227" %}

[cws-description]: #detailed-description
[cws-screenshots]: #screenshots
[default-locale]: /docs/extensions/mv3/manifest/default_locale
[description]: /docs/extensions/mv3/manifest/description/
[dev-console]: https://chrome.google.com/webstore/devconsole
[distribution]: /docs/webstore/cws-dashboard-distribution/#setting-the-geographic-distribution
[i18n]: /docs/extensions/reference/i18n/
[item-description]: /docs/webstore/cws-dashboard-listing/#product-details
[name-description]: #name-and-description
[manifest]:  /docs/extensions/mv3/manifest/
[name]: /docs/extensions/mv3/manifest/name/
[publish]: /docs/webstore/publish#upload-your-item
[regions]: #specify-where-to-publish-your-extension
[screenshot-guidelines]: /docs/webstore/images#screenshots
[searching-messages]: /docs/extensions/reference/i18n/#searching-for-messages
[set-browser-locale]: /docs/extensions/reference/i18n/#set-browser-locale
[supported-locales]: #choosing-locales-to-support
