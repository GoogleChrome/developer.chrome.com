---
layout: "layouts/doc-post.njk"
title: Create a great listing page
date: 2017-08-30
updated: 2021-06-21
description: >
  Best practices on how to make a high-quality, engaging listing page for your item in the Chrome
  Web Store.
---

Chrome Web Store's focus on surfacing quality items to users encompases the entire user experience,
including the store listing page. Build trust with users and make a strong first impression with a
compelling and accurate store listing page.  Learn how to create a quality store listing page that
clearly communicates what your item will offer from the description, images, and other metadata
provided. You can build and maintain your store listing page through the developer dashboard.


## Text


### Item Summary

Your summary is used to give an overview of your item in a concise phrase (132 characters or less).
This is the main description of your item users see from the homepage, category pages and in search
results. Ensure the most important text is included in your summary to help users understand what
they can expect from your item in a quick glance. 

{% Compare 'better' %}
Highlight features of your item that resonate with your audience's main use cases.
{% endCompare %}

{% Compare 'worse' %}
Include generic descriptions like "best extension ever".
{% endCompare %}

{% Aside %}
The summary is plain text string (no HTML or other formatting) that describes the extension.
The description should be suitable for both the browser's extension management UI and the Chrome
Web Store. You can specify locale-specific strings for this
field; see [Internationalization](/docs/extensions/i18n/) for details.
{% endAside %}


### Item Description

Your item description is intended to give users a more in-depth overview of the main features and
functionalities of your item. Item descriptions appear on the item listing page, underneath the
screenshots. Descriptions should be concise, informative, and accurate, and should contain more than
just one sentence. The ideal format is a paragraph followed by a short list of main features. Let
users know why they'll love it. Avoid typos and symbols that commonly distract the user.

{% Compare 'better' %}
Focus on the keywords that represent the most important features of your extension.
{% endCompare %}

{% Compare 'worse' %}
Add unnecessary keywords to your description in an attempt to improve search results.
Repetitive or irrelevant use of keywords can create an unpleasant user experience and result in an
item being suspended on Chrome Web Store.
{% endCompare %}


## Images


### Store Icon

Your item's icon is one of the first elements of your item that users see when they are on your
store listing page. Use an icon that is simple and recognizable to your brand. Most often, this will
simply be the brand or developer logo. Ensure your icon follows our [extension icon best
practices].

{% Compare 'better' %}
Keep it simple, and use colors and design elements that are consistent with the branding of
your other assets. 
{% endCompare %}

{% Compare 'worse' %}
Include screenshots or UI elements. These details can be very hard to see in small sizes.
{% endCompare %}

See more examples of icons that follow the correct guidelines on the [extension icon best practices]
page.


### Screenshots

Use screenshots (or videos) to convey capabilities, the look and feel, and experience of your item
to users. You must provide at least 1—and preferably the maximum allowed 5—screenshots of your item
to be displayed in the store. Screenshots should demonstrate the actual user experience, focusing on
the core features and content so users can anticipate what the extension's experience will be like.
Screenshots should reflect the most up-to-date functionalities according to the latest version of
the extension.  Here are some rules of thumb for screenshots:



* Do not include screenshots that are blurry, distorted, or pixelated in a way that is not an intentional aspect of your brand or user experience
* Do not include images that are stretched or compressed
* Rotate screenshots appropriately. Do not upload images upside down, sideways, or otherwise skewed
* Branding on screenshots/videos should be consistent with other branding elements on the store listing page (icon, promotional images, etc), so users can immediately associate them with your extension and brand
* Include visual aids like infographics, images and videos to explain the onboarding flow, user experience, and/or main functionalities of the item
* Images should not use too much text to avoid overwhelming the user
* Use square corners, no padding (full bleed)
* 1280x800 or 640x400 pixels

{% Aside %}
Tip: If your extension supports multiple locales, you can provide locale-specific screenshots as
described in Internationalizing Your App.
{% endAside %}

{% Aside %}
Note: 1280x800 screenshots are preferable, as larger screenshots look better on high-resolution
displays. Currently, all screenshots are downscaled to 640x400 pixels. If your screenshots do not
look good when downscaled (for example, they have a lot of text) or if 1280x800 is too big for your
extension (for example, screenshots for a low-resolution game), you can upload 640x400 screenshots.
{% endAside %}


### Promotional images (small promo tile, large promo tile, and marquee images)

Promotional images are your chance to capture users' attention and entice them to learn more. Don't
just use a screenshot; your images should communicate the brand and appear professional. Here are
specifics about each promotional image:

Small promo tile (440x280 pixels): appears on the homepage, category pages, and in search results.

Large promo tile (920x680 pixels):

Marquee images (1400x560 pixels): the image that is used if your item is chosen for the marquee
feature (the rotating carousel on the top of the Chrome Web Store homepage). To increase your
chances of being featured, ensure your marquee image is uncluttered, high-resolution, and has
consistent branding elements to your other assets so users can immediately associate it with your
extension and brand.

Here are some rules of thumb for designing your promotional images:

* Avoid too much text
* Avoid an image that is too "busy"
* Make sure your image works even when shrunk to half size
* Use saturated colors if possible; they tend to work well
* Avoid using a lot of white and light gray
* Fill the entire region
* Make sure the edges are well defined
* Avoid claims that misrepresents the extension's or developer's current status or performance on the Chrome Web Store (e.g. "Editor's Choice" or "Number One")
* Branding on promotional images should be consistent with other branding elements on the store listing page (icon, screenshots, etc)

{% Compare 'better' %}
Keep the image simple and clean, using colors and branding that matches your other assets.
{% endCompare %}

{% Compare 'worse' %}
Include too much text that makes the image look overly "busy".
{% endCompare %}

## Additional Fields

Including a website for your item and URLs for support pages can help build trust with users. Ensure
these fields are filled out in the developer dashboard so users know where they can find more
information about your item.


[extension icon best practices]: /docs/webstore/images/#extension-icon

