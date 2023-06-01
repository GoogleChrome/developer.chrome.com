---
layout: "layouts/doc-post.njk"
title: "Update your Chrome Web Store item"
description: >
  How to update an extension or theme ("item") that you previously
  published on the Chrome Web Store.
date: 2020-12-03
updated: 2023-05-01
---

This page describes how to update an extension or theme ("item") that you previously published on
the Chrome Web Store.

There are two key ways in which you can update your item:

- [Upgrade the item][upgrade-item], publishing a new version of the item on the Chrome Web Store and pushing it
  to the user base.
- [Update the % rollout][update-rollout] for items that were previously published with partial rollout.
  (Available to items with over 10,000 seven-day active users)

These update options are described in the following sections.

## Upgrade your item {: #upgrade-your-item }

To upgrade your item, use the [Chrome Developer Dashboard][dev-console].

To upgrade an existing Chrome Web Store item, you need to upload a new zip file for your item,
including all changed and unchanged files; update any changed metadata for your listing; and submit
the item for a new review.

{% Aside %}

Your upgrade will be published to the same channel (for example public or trusted testers) as
previous versions. Publishing to a different channel may require special steps, as described below.

{% endAside %}

Use the [Distribution tab][visibility] to publish to a different channel.

- To move an item from testing to production, change your visibility from Private to Public or to
  Unlisted and then republish.
- To move a published item back to private (e.g. from production back to testing), you must
  [unpublish][unpublish], change the visibility to Private, and then republish. The unpublishing step is
  necessary to move an item "backwards" from production to testing.
- To continue a testing program in parallel with a published version, you can create a separate Chrome Web Store item for your [testing program][visibility-private].

{% Aside 'gotchas' %}

The Chrome Web Store allows the publication of testing and production versions. Make sure you [follow these guidelines][test-production-extension] 
to avoid
being flagged as Repetitive Content.

{% endAside %}

### Upload an updated zip file {: #uploading-an-updated-zip-file }

If you're changing any code, the manifest, or other assets packaged with your extension, you must
make a new zip file and upload the new package. Make sure you increment the **version number**. Each
new version must have a larger version number than the previous version.

In the developer dashboard entry for your item, on
the Package tab, use the Upload New Package button to upload the zip file:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/MXJosZfPAB5V2AcGfYSy.png", 
       alt="Screenshot of the Chrome Web Store developer dashboard package tab for an item",
       height="368", width="800" %}

### Update the listing metadata {: #uploading-new-listing-metadata }

If you're changing anything about the Chrome Web Store listing for your item, its distribution, or
details of your privacy policy, you must update the information on the developer dashboard. You
update this information on the same tabs used for creating a new item:

- The [Store listing][cws-listing] tab contains details of your listing and how it should display in the Chrome Web
  Store.
- The [Privacy practices][cws-privacy] tab is where you include declarations about how your item uses privacy and
  security related features.
- The [Distribution][cws-distribution] tab lets you declare in-app purchases and control which countries will list your item and
  which set of users will see it.

### Set partial rollout percentage {: #partial-rollout }

If your item has a large user base (over 10,000), the distribution tab will include a **Percentage rollout**
option to restrict the update only to a fraction of the user base:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/oZxWW5oMsh7fUSzwvRNp.png",
       alt="Screenshot of the Chrome Web Store fractional rollout field",
       height="488", width="800" %}

This allows you to gradually roll out your item to ensure that any unexpected problems will have
minimal impact.

{% Aside %}

This is only available for new versions of an **already-published** item with over **10,000 seven-day
active users**

{% endAside %}

Once an item with partial rollout has been published, you can later [increase the percent rollout][update-rollout] 
without resubmitting the item for review, until you eventually reach 100% of
users.

### Submit the update {: #submitting-the-update }

When you submit an update for review, it doesn't yet affect your published item. Existing users will
see no change and new users can continue to install the previously published, current version. Only
when the item is later published will these users be affected.

{% Aside 'gotchas' %}

When an update requires additional permissions, users will be prompted to accept them or disable
the extension.

{% endAside %}

To submit your update for review:

1.  Make sure you've completed the details on all the tabs described above.
2.  Click the **Submit for Review** button.
3.  The following dialog appears, letting you confirm that you want to submit the item for review.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/OkIWdcXXkYFTU322j9Vs.png",
       alt="Screenshot of the Chrome Web Store confirm submission dialog", height="388", width="800" %}

### Deferred publishing option {: #deferred-publishing-option }

This dialog also lets you control the timing of your item's publishing. If you uncheck the checkbox,
your item will **not** be published immediately after its review is complete. Instead, after it
passes the review your item will become ready for you to publish. This lets you wait until you are
ready (for example, with marketing announcements) and then manually publish it at a time of your
choosing.

Once the review is complete, you will have up to **30 days** to publish. After that
period expires, the staged submission will revert to a draft which will have to be submitted again for
review. You can check when your staged submission will expire under the status of your item. 

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/sYCH3lvreW0bUWznlOsE.png", alt="Chrome Web Store
staged item
status", width="700", height="84" %}

### Review process {: #review-process }

After you submit the item for review, it will undergo a review process. This is essentially the same
review as new items receive; the time for this review depends on the nature of your item and the
extent of your changes. See [review times][review-times] for more details.

## Update your percent rollout {: #update-rollout }

For items that you previously published with [partial rollout][partial-rollout], you can update the percent
rollout using the Package tab:

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/UA8vDp8aG89exqqjzY55.png", alt="Screenshot of the Chrome Web Store update percent rollout field", width="800", height="395" %}

The **Published** item information appears in the right column. To increase the rollout fraction,
enter the increased percentage target in the **Published to a percentage of users** field, and then
click **Update**.

{% Aside %}

Changing the %rollout does *not* trigger a new review.

{% endAside %}

## Additional resources

- Learn how to [Manage your Chrome Web Store Item][cws-manage].
- Understand the [Chrome Web Store Review Process][cws-review].

[cws-manage]: /docs/webstore/manage/
[cws-review]: /docs/webstore/review-process/
[cws-distribution]: /docs/webstore/cws-dashboard-distribution
[cws-listing]: /docs/webstore/cws-dashboard-listing
[cws-privacy]: /docs/webstore/cws-dashboard-privacy
[dev-console]: https://chrome.google.com/webstore/devconsole
[review-times]: /docs/webstore/review-process/#review-time
[partial-rollout]: #partial-rollout
[unpublish]: /docs/webstore/faq/#faq-listing-03
[update-rollout]: #update-rollout
[upgrade-item]: #upgrade-your-item
[visibility]: /docs/webstore/cws-dashboard-distribution#setting-the-visibility
[visibility-private]: /docs/webstore/cws-dashboard-distribution/#private-visibility-trusted-testers
[test-production-extension]: /docs/webstore/spam-faq/#test-version

