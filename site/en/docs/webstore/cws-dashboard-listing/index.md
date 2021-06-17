---
layout: "layouts/doc-post.njk"
title: "Complete your listing information"
#date: TODO
#updated: TODO
description: How to add listing information for your Chrome Web Store item.
---

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/4RwZvdR4eACU46OCy7rm.png",
       alt="Screenshot of the Chrome Web Store developer dashboard item listing tab", height="472", width="800" %}

Add the store listing information for your item that isn't in the ZIP file, such as a long
description, screenshots, videos, and links to related sites. You'll need the following to finish
your item's store listing:

- A **detailed description** of your item. Write your description to entice users to download your
  item. Make sure to start your description with a concise statement of what your item does, so
  users can understand the main idea and features at a glance. Your description can then go on to
  provide more detail, promotional copy, update logs, and so forth.
- At least one 1280x800 or 640x400 **screenshot** or YouTube **video** to show off what your item
  does. These are displayed in your item's Chrome Web Store listing in the following order:
  1.  Any localized video that you provide.
  2.  Any localized screenshots that you provide.
  3.  Any global (non-localized) video.
  4.  Global screenshots.
- A 440x280 **small tile icon** that will be displayed on the Chrome Web Store wall.
- The **primary category** where your item should be listed.
- Your item's **language** to help users find it.

## Learning more about images and branding

See [Supplying Images][cws-images] for help on designing the images for your item, and [Branding
Guidelines][cws-branding] for information on how you can use Google brands.

## Displaying your verified publisher status

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
Console, where you can add and verify a site. See [Verify your site ownership][verify-owner] for
more details.

[cws-branding]: /docs/webstore/branding
[cws-images]: /docs/webstore/images
[verify-owner]: https://support.google.com/webmasters/answer/9008080
