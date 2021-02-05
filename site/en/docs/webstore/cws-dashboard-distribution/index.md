---
layout: "layouts/doc-post.njk"
title: "Prepare to publish: set up pricing and distribution"
#date: TODO
#updated: TODO
description: >
  How to use the Pricing & Distribution tab of the Chrome Web Store dashboard
  to control how you charge for your Chrome Web Store item.
---

The pricing and distribution tab lets you control how you charge for your item and who will see it
on the Chrome Web Store.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ko8C7yl0tjGzVaTVDzkV.png", alt="Screenshot of the Chrome Web Store pricing and distribution page", height="474", width="800" %}

## Setting the visibility {: #setting-the-visibility }

Use the **Visibility** settings to configure who can see your item in the Chrome Web Store:

- **Public**—This option lists your item on the Chrome Web Store for all users to see and install.
- **Unlisted**—This option does not create a listing on the Chrome Web Store, but does allows
  anyone to install your item if they know its Chrome Web Store URL.
- **Private**—This option limits installation of your item to specified users only. This is
  typically used for testing before public launch of an item.

### Private visibility: Trusted testers {: #private-visibility-trusted-testers }

Private allows your trusted testers to install the item. You designate trusted testers by listing
them on your Chrome Web Store account home page.

{% Aside %}

The trusted testers list is associated with your _account_, and not an individual item. To create
multiple trusted tester accounts, you must use separate accounts. However, you can also [add
groups][1]to your private listing, on a per-item basis.

{% endAside %}

The following screenshot shows some trusted tester accounts listed in a Chrome Web Store developer
account page:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/SrVxYFc0lmMgXxtN30gA.png",
       alt="Screenshot showing trusted tester accounts listed in a Chrome Web Store developer account page",
       height="395", width="800" %}

### Private visibility: Google Groups {: #private-visibility-google-groups }

In addition to your trusted tester accounts, you can also include any Google Groups that you own or
manage:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/oTlA3I2z8qNRiqSj9T2j.png",
       alt="Screenshot showing groups added to private visibility", height="520", width="800" %}

Any members of the specified groups, along with your trusted testers, will be able to install the
item.

## Setting the geographic distribution {: #setting-the-geographic-distribution }

The **Distribution** setting lets you specify which geographic areas will see your item listing in
the Chrome Web Store. You can either:

- Select **All regions** to display your item to the entire world.
- Select individual countries to publish to—this is useful for items with a regional focus or
  relevance.

When you publish to the world, your item will be immediately visible to the region(s) you select,
and it'll be visible in the store's search results.

[1]: #private-visibility-groups
