---
layout: "layouts/doc-post.njk"
title: "Updating your Chrome Web Store item"
description: >
  How to update an extension or theme ("item") that you previously
  published on the Chrome Web Store.
---

This page describes how to update an extension or theme ("item") that you previously published on
the Chrome Web Store.

There are two key ways in which you can update your item:

- [Upgrade the item][1], publishing a new version of the item on the Chrome Web Store and pushing it
  to the user base.
- [Update the % rollout][2] for items that were previously published with partial rollout.
  (Available to very popular items.)

These update options are described in the following sections.

## Upgrade your item {: #upgrade-your-item }

To upgrade an existing Chrome Web Store item, you need to upload a new zip file for your item,
including all changed and unchanged files; update any changed metadata for your listing; and submit
the item for a new review.

<div class="aside aside--note">Your upgrade will be published to the same channel (for example public or trusted testers) as previous versions. Publishing to a different channel may require special steps, as described below.</div>

There are several ways to publish to a different channel:

- To move an item from testing to production: change your visibility from Private to Public or to
  Unlisted and then republish.
- To move a published item back to private (e.g. from production back to testing), you must
  unpublish, change the visibility to Private, and then republish. The unpublishing step is
  necessary to move an item "backwards" from production to testing.
- You can create a separate Chrome Web Store item for your testing program— this is an option if you
  want to continue a testing program in parallel with a published version.

### Uploading an updated zip file {: #uploading-an-updated-zip-file }

If you're changing any code, the manifest, or other assets packaged with your extension, you must
make a new zip file and upload the new package. In the developer dashboard entry for your item, on
the Package tab, use the Upload New Package button to upload the zip file:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/MXJosZfPAB5V2AcGfYSy.png", 
       alt="Screenshot of the Chrome Web Store developer dashboard package tab for an item",
       height="368", width="800" %}

### Uploading new listing metadata {: #uploading-new-listing-metadata }

If you're changing anything about the Chrome Web Store listing for your item, its distribution, or
details of your privacy policy, you must update the information on the developer dashboard. You
update this information on the same tabs used for creating a new item:

- The [Listing][3] tab contains details of your listing and how it should display in the Chrome Web
  Store.
- The [Privacy][4] tab is where you include declarations about how your item uses privacy and
  security related features.
- The [Pricing and Distribution][5] tab lets you control which countries will list your item and
  which set of users will see it.

### Partial rollout {: #partial-rollout }

If your item has a large user base, its distribution tab will include a **Percentage rollout**
option to restrict the update to just a fraction of the user base:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/oZxWW5oMsh7fUSzwvRNp.png",
       alt="Screenshot of the Chrome Web Store fractional rollout field",
       height="488", width="800" %}

This allows you to gradually roll out your item to ensure that any unexpected problems will have
minimal impact.

<div class="aside aside--note">This is only available for new versions of an <strong>already-published</strong> item with over <strong>10,000 7-day active users</strong>.</div>

Once an item with partial rollout has been published, you can later [increase the percent
rollout][6] without needing to resubmit the item for review, until you eventually reach 100% of
users.

### Submitting the update {: #submitting-the-update }

When you submit an update for review, it doesn't yet affect your published item. Existing users will
see no change and new users can continue to install the previously published, current version. Only
when the item is later published will these users be affected.

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

### Review process {: #review-process }

After you submit the item for review, it will undergo a review process. This is essentially the same
review as new items receive; the time for this review depends on the nature of your item and the
extent of your changes. See the [FAQ on review times][7] for more details.

## Update your percent rollout {: #update-rollout }

For items that you previously published with [partial rollout][8], you can update the percent
rollout using the Package tab:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Dy8HD5xF4NiboQxgUtNt.png",
       alt="Screenshot of the Chrome Web Store update percent rollout field", height="395", width="800" %}

To increase the rollout fraction for your item, enter the increased percentage target and then click
**Update**.

<div class="aside aside--note">Changing the %rollout does <em>not</em> trigger a new review.</div>

[1]: #upgrade-your-package
[2]: #update-rollout
[3]: /docs/webstore/cws-dashboard-listing
[4]: /docs/webstore/cws-dashboard-privacy
[5]: /docs/webstore/cws-dashboard-distribution
[6]: #update-your-percent-rollout
[7]: /docs/webstore/faq#faq-listing-108
[8]: #partial-rollout
