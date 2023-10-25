---
layout: "layouts/doc-post.njk"
title: "Complete your listing information"
date: 2020-12-07
updated: 2023-05-01
description: How to add listing information for your Chrome Web Store item.
---

This page describes the fields you must fill out to complete your store listing. To learn how to
make your listing more compelling, be sure to read [Creating a great listing page][best-listing].

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/4RwZvdR4eACU46OCy7rm.png",
       alt="Screenshot of the Chrome Web Store developer dashboard Store listing tab", height="472", width="800" %}

Add the store listing information for your item that isn't in the ZIP file, such as a long
description, screenshots, videos and links to related sites. 

## Product details

You'll need to fill out the following details about your item:

- A **detailed description** of your item. Write your description to entice users to download your
  item. Make sure to start your description with a concise statement of what your item does, so
  users can understand the main idea and features at a glance. Your description can then go on to
  provide more detail, promotional copy, update logs, and so forth.
  
{% Aside 'caution' %}
Be detailed but make sure your description complies with the [Keyword Spam][keyword-spam] policy.
{% endAside %}

- The **primary [category][categories]** where your item should be listed.
- Your item's **language** to help users find it.

## Graphic assets {: #graphic-assets }

At a minimum, you should provide the following promotional images:

- A 128x128 **store icon**.
- At least one 1280x800 or 640x400 **screenshot** or YouTube **video** to show off what your item
  does. These are displayed in your item's Chrome Web Store listing in the following order:
  1.  Any localized video that you provide.
  1.  Any localized screenshots that you provide.
  1.  Any global (non-localized) video.
  1.  Global screenshots.
- A 440x280 **small tile icon** that will be displayed on the Chrome Web Store wall.

### Learning more about images and branding

See [Supplying Images][cws-images] for help designing the images for your item, and [Branding
Guidelines][cws-branding] for information on how you can use Google brands. 

{% Aside %}
The quality of the images you supply can affect your item's prominence on the Chrome Web Store. Be
sure and read [Creating a great listing page][best-listing] for more details.
{% endAside %}

## Additional fields {: #additional-fields }

You can include any of these optional links related to your item. 

### Displaying your verified publisher status

The Chrome Web Store highlights verified publishers by placing a linked, official URL under the listing title and is
linked to the website, as shown in the following example:

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/YEoohoq7YjMrpmkLtGMD.pn", alt="Official URL in Chrome Web Store item page", width="348", height="230" %}
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

### Adding a homepage URL {: #home-url }

To explain how your extension works in more detail, you can provide a direct link to your extension's website in the **Homepage URL**. This link appears under the **Details** section of your item.

### Providing a support URL {: #support-url }

You can direct users to a dedicated support site by including a link in the **Support URL**. 

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/KsZdITw3oTNYnaoa4M8b.png", alt="Chrome Web Store listing support section linking to external support site", width="500", height="140" %}
  <figcaption>
   Store listing support section linking to an external support site.
  </figcaption>
</figure>

The Chrome Web Store also provides a built-in user support experience under your items' **Support hub**. See [Manage user feedback][user-support] to learn more. 

### Enabling Mature Content {: #mature-content}

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
[distribution]: /docs/webstore/cws-dashboard-distribution
[keyword-spam]: /docs/webstore/spam-faq/#keyword-spam
[mature-guidelines]: /docs/webstore/rating/
[privacy]: /docs/webstore/cws-dashboard-privacy
[user-support]: /docs/webstore/support-users/#provide-user-support
[verify-owner]: https://support.google.com/webmasters/answer/9008080
