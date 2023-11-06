---
layout: "layouts/doc-post.njk"
title: "Publish in the Chrome Web Store"
date: 2014-02-28
updated: 2023-10-05
description: How to publish a new extension or theme to the Chrome Web Store.
---

After [registering][register] your developer account, [setting it up][setup-account], and [preparing your extension][prepare] follow the steps in this article to publish your extension for the first time.

## Upload your item {: #upload-your-item }

Use the following steps to upload your item:

1. Go to the [Chrome Developer Dashboard][dev-dashboard].
1. Sign in to the developer account.
1. Click the **Add new item** button.
1. Click **Choose file** > your zip file > **Upload**. If your item's manifest and ZIP file are valid, you can edit your item on the next page.

Once you've uploaded your extension, you will see it as an item in the dashboard.

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/xky1FZXklZRMH4UUB1az.png", alt="Screenshot of the Developer dashboard item listing page", width="800", height="499" %}
  <figcaption>
    Developer dashboard item listing page
  </figcaption>
</figure>

{% Aside %}
You cannot have more than 20 _extensions_ published on the Chrome Web Store. There is no such limit on the number of themes. If you reach this limit, [you may request a limit increase][cws-support]. The Chrome Web Store staff will review your existing items and your developer account history, and if approved, you will be granted an increase. Please note that if your developer account has been suspended in the past, or you have had items taken down previously
for policy violations, or your items consistently receive low quality ratings, your request may be
denied.

{% endAside %}

## Fill out information about your item {: #info }

Now you can fill out additional listing details in the left-hand menu. Here is a quick summary of the information you will need to fill out on each of these tabs. The links provided include detailed instructions on how to fill out each section.

- The Package tab displays details of your uploaded item. This page isn't editable when you first
  create an item.
- The [Store Listing][listing] tab contains details of your listing and how it will be displayed in the Chrome Web Store.
- The [Privacy][privacy] tab is where you declare your extension's single purpose and how your extension is handling user data.
- The [Distribution][distribution] tab lets declare if your extension is a paid item, which countries will list your item and the set of users that will see it.

## Submit your item {: #publish-item }

After [filling out the information](#info) about your item, you are ready to submit your item. When you click the **Submit for Review** button the following dialog appears, letting you confirm that you want to submit the item for review.


<figure>
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/BiZituXHHZ74SIkwc3q7.png",
       alt="Screenshot of the Chrome Web Store confirm submission dialog",
       height="388", width="800" %}
  <figcaption>
    Screenshot of the Chrome Web Store confirm submission dialog
  </figcaption>
</figure>


### Deferred publishing option {: #deferred-publishing }

The confirmation dialog shown above also lets you control the timing of your item's publishing. If
you uncheck the checkbox, your item will **not** be published immediately after its review is
complete. Instead, you'll be able to manually publish it at a time of your choosing once the review
is complete.

If you submit your item to publish automatically after review, you can still choose deferred publishing by selecting the **Defer publish** option located in the item's menu.

<figure>
{% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/yoMNFt1ht6qSLXzFyrWj.png",
       alt="Screenshot showing the 'more' menu's defer publish option", width="286", height="184", class='screenshot' %}
   <figcaption>
    Deferred publishing option in the items menu 
  </figcaption>
</figure>

This lets you pause the release of a submitted item if you discover an error after submitting it or
if you simply want to change your release time.

{% Aside 'important' %}
Once the review is complete, you will have up to **30 days** to publish. After that
period expires, the staged submission will revert to a draft which will have to be submitted again for
review.
{% endAside %}

You can check when your staged submission will expire under the status of your item.

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/sYCH3lvreW0bUWznlOsE.png", alt="Chrome Web Store staged item status", width="700", height="84", class='screenshot' %}
  <figcaption>
    Chrome Web Store staged item status
  </figcaption>
</figure>

## The review process {: #review-of-submitted-items }

After you submit the item for review, it will undergo a review process. The time for this review depends on the nature of your item. See [Understanding the review process][cws-review] for more details.

There are important emails like take down or rejection notifications that are enabled by default. To receive an email notification when your item is published or staged, you can enable notifications on the **Account page**.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/l27aRFGCN4MJURmpoCQN.png", alt="Screenshot of enable
staged and reviewed items", width="709", height="238" %}

## Additional resources

- [Update your Chrome Web Store Item][update].
- Understand the [Chrome Web Store Review Process][cws-review].

[cws-review]: /docs/webstore/review-process/
[cws-support]: https://support.google.com/chrome_webstore/contact/one_stop_support
[dev-dashboard]: https://chrome.google.com/webstore/devconsole
[distribution]: /docs/webstore/cws-dashboard-distribution
[group-publishers]: /docs/webstore/group-publishers
[listing]: /docs/webstore/cws-dashboard-listing
[prepare]: /docs/webstore/prepare
[privacy]: /docs/webstore/cws-dashboard-privacy
[register]: /docs/webstore/register
[review-times]: /docs/webstore/review-process/#review-time
[setup-account]: /docs/webstore/set-up-account
[update]: /docs/webstore/update
[verified-publisher]: /docs/webstore/cws-dashboard-listing/#displaying-your-verified-publisher-status



