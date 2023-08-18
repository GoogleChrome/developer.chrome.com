---
layout: "layouts/doc-post.njk"
title: "Prepare to publish: set up payment and distribution"
date: 2020-12-07
updated: 2023-05-01
description: >
  How to choose which countries will list your item and who will see it in the Chrome Web Store.
---

In the Distribution tab you can declare if your extension is free or contains in-app purchases. You can also choose who will see it on the Chrome Web Store.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/QQZihsAu4qF7vKH7n648.png", alt="Screenshot of the Chrome Web Store payment and distribution page", width="800", height="388" %}

## Declaring in-app purchases {: #in-app-purchases }

If you plan to use a third party service to offer additional paid features or subscriptions, choose **Contains in-app purchases**. This option will display an "in-app purchases" badge on your extension's detail page.

## Setting the visibility {: #setting-the-visibility }

Use the **Visibility** settings to configure who can see your item in the Chrome Web Store:

- **Public**—This option lists your item on the Chrome Web Store for all users to see and install.
- **Unlisted**—This option does not create a listing on the Chrome Web Store, but does allows
  anyone to install your item if they know its Chrome Web Store URL.
- **Private**—This option limits installation of your item to specified users only. This is
  typically used for testing before public launch of an item.

{% Aside 'gotchas' %}
All visibility settings have the same policy requirements and will go through the same [review process][cws-review].
{% endAside %}

### Private visibility: Trusted testers {: #private-visibility-trusted-testers }

Private allows your trusted testers to install the item. You designate trusted testers by listing
them in your account settings in the developer dashboard. Each email should be associated with a
Google account which will be able to view and install your item on the Chrome Web Store.

{% Aside %}

The trusted testers list is associated with your _account_, and not an individual item. To create
multiple trusted tester accounts, you must use separate accounts. However, you can also [add
groups][private-google-groups] to your private listing, on a per-item basis.

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

### Private visibility: domain publishing {: #private-visibility-domain-publish }

{% Aside %}

This feature is only available for Google Workspace domains where it has been enable by the domain
administrator.

{% endAside %}

If domain publishing is enabled for your organization, an additional option appears in the
distribution page of the developer console:

{% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/zpV6tBHuf3HLBpRjGsNA.png", alt="Screenshot showing
the domain publishing option in the developer console", width="643", height="200", class="screenshot" %}

See [Enterprise publishing options][enterprise] for an overview of this and other
enterprise extension topics, along with links to other enterprise extension documentation.

## Setting the geographic distribution {: #setting-the-geographic-distribution }

The **Distribution** setting lets you specify which geographic areas will see your item listing in
the Chrome Web Store. You can either:

- Select **All regions** to display your item to the entire world.
- Select individual countries to publish to—this is useful for items with a regional focus or
  relevance.

When you publish to the world, your item will be immediately visible to the region(s) you select,
and it'll be visible in the store's search results.

## Publishing a test version

You can publish a "BETA" or "TESTING" version to the Chrome Web Store in parallel with a
production version. It can be listed private, unlisted or public. After addressing issues and bugs based on user
feedback, you can publish a revised version of your extension to the rest of your users. 

Before you submit a testing
  version to the Chrome Web Store, follow these steps:

  1.  Add the label "DEVELOPMENT BUILD" or “BETA” at the end of the name of your extension. 
  2.  Declare the
  purpose of your extension in the description: "THIS EXTENSION IS FOR BETA TESTING".

{% Aside 'warning' %}

Make sure to add these labels. If you don't, then both extensions may be taken down. For more information,
see [Repetitive Content Spam Policy][repetitive-content].

{% endAside %}


## You are ready to submit this item! 

After filling out the [Listing][listing] tab and the [Privacy][privacy] tab, you can now [publish your item][publish].

[cws-review]: /docs/webstore/review-process/
[enterprise]: /docs/webstore/cws-enterprise/
[listing]: /docs/webstore/cws-dashboard-listing/
[privacy]: /docs/webstore/cws-dashboard-privacy/
[private-google-groups]: #private-visibility-google-groups
[publish]: /docs/webstore/publish/#publish-item
[repetitive-content]: /docs/webstore/spam-faq/#repetitive-content
