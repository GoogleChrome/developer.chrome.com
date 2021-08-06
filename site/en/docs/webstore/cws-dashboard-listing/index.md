---
layout: "layouts/doc-post.njk"
title: "Complete your listing information"
#date: TODO
updated: 2021-08-06
description: How to add listing information for your Chrome Web Store item.
---

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/4RwZvdR4eACU46OCy7rm.png",
       alt="Screenshot of the Chrome Web Store developer dashboard item listing tab", height="472", width="800" %}

Add the store listing information for your item that isn't in the ZIP file, such as a long
description, screenshots, videos and links to related sites. 

## Product details 
You'll need to fill out the following details about your item:

- A **detailed description** of your item. Write your description to entice users to download your
  item. Make sure to start your description with a concise statement of what your item does, so
  users can understand the main idea and features at a glance. Your description can then go on to
  provide more detail, promotional copy, update logs, and so forth.
  
{% Aside 'caution' %}
Be detailed but make sure your description complies with the [Keyword Spam][1] policy.
{% endAside %}

- The **primary [category][5]** where your item should be listed.
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

See [Supplying Images][2] for help on designing the images for your item, and [Branding
Guidelines][3] for information on how you can use Google brands. 

## Additional fields {: #additional-fields }

You can include any of these optional links related to your item. 

### Displaying your verified publisher status

The Chrome Web Store highlights verified publishers by placing a linked, official URL in the
"Offered by:" line of the store listing. This official URL appears under the listing title and is
linked to the website, as shown in the following example:

{% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/Vkm8Uhstw2NFVSSt87Vl.png", alt="Offered by:
cecerduino.com example", width="351", height="143" %}

{% Aside %}
If you are not a verified publisher, you can't display this official URL: instead, the "Offered by:"
displays your publisher name instead.
{% endAside %}

To display your verified status, choose an official URL for your item from the **Official URL**
pull-down as shown below:

{% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/m6b3XFmEakmH1ZqVhTwf.png", alt="Screenshot of
official URL pulldown", width="800", height="184" %}

The pull-down for this field contains only those sites that have been verified as belonging to you.
To add a verified site that you own, click on **Add a new site**. This opens the Google Search
Console, where you can add and verify a site. See [Verify your site ownership][4] for
more details.

### Adding a homepage URL {: #home-url }

If you want to explain how your extension works in more detail, you can provide a direct link to your extension's website in the **Homepage URL**. It will be located under the Additional information of your item.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/j71L391YIhEAIZTVUuBw.png", alt="Homepage URL in Chrome Web Store item page", width="306", height="106" %}

### Providing a support URL {: #support-url }

The CWS provides a built in user support system under your items' "Support tab", but you can use your own support page by including a link in the **Support URL**. Note that first you must activate "Enable User Feedback" in the Account settings page. 

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/ArMfJztL1OlP6UektUwb.png", alt="Enable User Feedback Support tab", width="800", height="185" %}

## You are almost ready to publish this item! 
If you haven't done so yet, complete your listing by 
-  Filling out your [privacy practices][6] 
-  Providing your [distribution preferences][7].


[1]: /docs/webstore/spam-faq/#keyword-spam
[2]: /docs/webstore/images
[3]: /docs/webstore/branding
[4]: https://support.google.com/webmasters/answer/9008080
[5]: /docs/webstore/best_practices/#choose-your-apps-category-well
[6]: /docs/webstore/cws-dashboard-privacy
[7]: /docs/webstore/cws-dashboard-distribution