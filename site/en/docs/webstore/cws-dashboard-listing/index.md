---
layout: "layouts/doc-post.njk"
title: "Complete your listing information"
date: 2020-12-07
updated: 2023-05-01
description: How to add listing information for your Chrome Web Store item.
---

This page describes how to fill out the **Store listing** tab in the Developer Dashboard. This is
where you can add information about your item that isn't included in the [metadata of the
manifest][prepare-manifest], such as a long description, screenshots, a promotional video, and links to related
sites. 

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/qppUipFhOmfTuXuAiMDY.png",
       alt="Screenshot of the Chrome Web Store developer dashboard Store listing tab", height="472", width="800" %}

See [Creating a great listing page][best-listing] to learn how to make your listing more compelling.

## Product details

In this section you can include the following information about your item:

- A **detailed description** of your item. This helps users understand why they should install your
  extension. Start your description with a concise statement of what your item does, so
  users can understand the main idea and features at a glance. After that provide additional details, promotional copy, update logs, and so forth. Be detailed but ensure it complies with the [Keyword spam][keyword-spam] policy.
- The **primary [category][categories]** under which your item should be listed on the web store.
- Your item's **language** to allow users to search for extensions in their own language.

## Graphic assets {: #graphic-assets }

In this section, you must provide the following promotional images and video, with the exception of
the Marquee promo tile, which is optional:

- A 128x128 px to use as your **store icon**.
- At least one 1280x800 px **screenshot**, up to 5 total.
- A link to a **YouTube video** that showcases your extension features.
- A PNG or JPEG file that is 440x280 px to use as the **small promo tile**.
- A PNG or JPEG file that is 1400x560 px to use as the **marquee promo tile**.

See [Supplying Images][cws-images] to help design the images for your item, and [Branding
Guidelines][cws-branding] for information on how you can use Google brands. 

{% Aside %}
The quality of the images you supply can affect your item's prominence on the Chrome Web Store. Read [Creating a great listing page][best-listing] and [Discovery in the Chrome Web Store][discovery] for more details.
{% endAside %}

## Localize your listing

If you have [localized your extension][api-i18n], you will be able to provide a description,
screenshots, and promotional video in the locales your extension supports. The small tile and
Marquee promo tile cannot be localized.

Begin by selecting the language from the dropdown list at the top of the store listing details. Each
locale corresponds to one of the [`_locales/LOCALE_CODE`][locale-dir] directories included in the
extension.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/GNIhOrJH6k6x4rM6iZyg.png",
alt="Choose language in store listing", width="500", height="162" %}

{% Aside %}

By default, your extension is listed in all regions supported by the Chrome Web Store. If your extension is aimed for users in a specific country, you can select that region in the [Distribution][distribution] tab.

{% endAside %}


### Localize detailed description {: #detailed-description }

Once you've chosen a locale, provide the detailed description for the current locale.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/70mdctbPy8hIIHPFxvZF.png",
alt="Detailed description of the Store Listing", width="483", height="140" %}

If you support multiple locales, repeat the previous two steps until you've provided a detailed
description for each locale.

### Localize screenshots and promotional video

You can also tailor screenshots and promotional video for each locale. Once you've choose the
locale, add a screenshot by dropping your screenshots in the **Localized screenshots** section. If
you have a YouTube video in the target language, you can add the URL in the **Localized promo
video** field.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/y792ypc5Zy3AGyh0HwhE.png",
alt="localize screenshots and video", width="414", height="256" %}

To provide screenshots for another locale, use the pull-down list at the top of the page and select
the next language.

## Order of graphic assets

Your promotional images and videos are displayed in your listing in the following order:

1.  Any localized video that you provide.
1.  Any localized screenshots that you provide.
1.  Any global (non-localized) video.
1.  Global screenshots.

## Additional fields {: #additional-fields }

The following are optional URLs you can include in your listing. 

### Display your verified publisher status

The Chrome Web Store highlights verified publishers by placing a linked, official URL under the listing title, as shown in the following example:

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/YEoohoq7YjMrpmkLtGMD.png", alt="Official URL in Chrome Web Store item page", width="348", height="230" %}
  <figcaption>
    Official URL in Chrome Web Store item page
  </figcaption>
</figure>

{% Aside %}
If you are not a verified publisher, your publisher name will be displayed under the "Offered by:" in the **Details** section of your store listing.
{% endAside %}

To display your verified status, choose an official URL for your item from the **Official URL**
pull-down as shown below:

{% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/m6b3XFmEakmH1ZqVhTwf.png", alt="Screenshot of
official URL pulldown", width="800", height="184" %}

The pull-down for this field contains only those sites that have been verified as belonging to you.
To add a verified site that you own, click on **Add a new site**. This opens the Google Search
Console, where you can add and verify a site. See [Verify your site ownership][verify-owner] for
more details.

### Add a homepage URL {: #home-url }

The link provided in the **Homepage URL** appears under the **Details** section of your item. This
site should contain information about your extension to help users learn more about your extension
features or service.

### Provide a support URL {: #support-url }

You can direct users to a dedicated support site by including a link in the **Support URL**. 

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/KsZdITw3oTNYnaoa4M8b.png", alt="Store listing support section linking to external support site", width="500", height="140" %}
  <figcaption>
   Store listing support section linking to an external support site.
  </figcaption>
</figure>

The Chrome Web Store also provides a built-in user support experience under your items' **Support hub**. See [Manage user feedback][user-support] to learn more. 

### Declare content rating {: #mature-content }

Content ratings help users know whether your extension and its content are mature in nature.
See [Mature Content Guidelines][mature-guidelines] to determine whether your extension should be rated
"Mature." You can enable **Mature content** under **Additional fields** as shown below: 

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/I7Kp1l2HImElVaHRxy2k.png", alt="Enable Mature Content
in Store Listing", width="126", height="81" %}

{% Aside %}

Extensions with mature content will not appear in Chrome Web Store search for users that are *not* logged in. When logged into an of-age account, search results will contain mature items.

{% endAside %}

## You are almost ready to publish this item! 

If you haven't done so yet, complete your listing by 
-  Filling out your [privacy practices][privacy] 
-  Providing your [distribution preferences][distribution].

[best-listing]: /docs/webstore/best_listing
[categories]: /docs/webstore/best_practices/#choose-your-apps-category-well
[cws-branding]: /docs/webstore/branding
[cws-images]: /docs/webstore/images
[discovery]: /docs/webstore/discovery/
[distribution]: /docs/webstore/cws-dashboard-distribution
[keyword-spam]: /docs/webstore/program-policies/spam-faq/#keyword-spam
[mature-guidelines]: /docs/webstore/rating/
[prepare-manifest]: /docs/webstore/prepare/#manifest
[privacy]: /docs/webstore/cws-dashboard-privacy
[user-support]: /docs/webstore/support-users/#provide-user-support
[verify-owner]: https://support.google.com/webmasters/answer/9008080
[api-i18n]: /docs/extensions/reference/i18n/
[locale-dir]: /docs/extensions/reference/i18n/#how-to-support-multiple-languages
[distribution]: /docs/webstore/cws-dashboard-distribution/#setting-the-geographic-distribution