---
layout: "layouts/doc-post.njk"
title: "Publish in the Chrome Web Store"
date: 2014-02-28
updated: 2020-07-15
description: >
  How to publish a new extension or theme to the Chrome Web Store.
---

This page describes how you publish a new extension or theme ("item") to the Chrome Web Store.

<div class="aside aside--note">To publish updates to an existing item, or to update the percent rollout, see <a href="/webstore/update">Updating your Chrome Web Store item</a>. To learn about group publishers, see <a href="/webstore/group-publishers">Set up group publishing</a>.</div>

Before you publish an extension, you need to load it locally and test that it works, as described in
[Hello extensions][3]. Make sure that it runs correctly and that all its functionality works as you
intend.

To publish your item to the Chrome Web Store, follow these steps:

1.  Create your item's zip file
2.  Create a developer account
3.  Upload your item
4.  Add assets for your listing
5.  Submit your item for publishing

We'll go into detail about each step below.

## Create your item's zip file {: #create-your-items-zip-file }

To upload your item, you need to create a ZIP file that contains the [files for your extension][4].
The item's manifest file must be included, and it must specify at least the following fields:

- `"name":`—Displayed in the Chrome Web Store and in the Chrome browser
- `"version":`—The version of the metadata, incremented
- `"icons":`—An array specifying the [icons][5] your item uses

Your zip file may also include other images and any files that the item requires. The contents of
the ZIP file and manifest depend on the specifics of your item; see [Extension files][6] for more
details.

**Tips:**

- Set the initial [version number][7] in the manifest to a low value, such as 0.0.0.1. That way, you
  have room to increase the version number when you upload new versions of your item. Each new
  version that you upload to the Chrome Web Store must have a larger version number than the
  previous version.
- If your item uses [Native Client][8], you can structure your application directory hierarchy and
  ZIP file in a way that reduces the size of the user download package. For details, see [Reducing
  the size of the user download package][9].

Before you upload your item, you'll be asked to pick a developer account to own your items. Instead
of your personal account, we suggest using a dedicated account.

## Create a developer account {: #create-a-developer-account }

Before you can publish on the Chrome Web Store, you need to [register as a Chrome Web Store
developer][10]. We suggest using a new account just for your item instead of your personal account.

<div class="aside aside--note">On your developer account, the <strong>email address</strong> field is required. You cannot publish items if this field is blank.</div>

If you already host your item in Google Play and you want your Chrome Web Store listing to show an
"Available for Android" link, your item must have the same name as your Google Play listing, and
both items must be owned by the same developer account. To transfer your Chrome Web Store item to a
different developer, submit this [form][11].

## Upload your item {: #upload-your-item }

To upload your item, use the Chrome Developer Dashboard.

If you need the item ID to complete your item's code, then you need to upload the item while you're
still writing its code. Otherwise, you can wait until the item is finished. You can upload your item
many times before submitting it for review.

When your item, its Chrome Web Store listing, and all the sites it relies on are ready, you can
publish your item.

<div class="aside aside--note">You cannot have more than 20 <em>extensions</em> published on the Chrome Web Store. There is no such limit on the number of themes.</div>

Here's how to upload your item:

1.  Go to the [Chrome Developer Dashboard][12].
2.  Sign into the developer account you chose in Step 1.
3.  Click the **Add new item** button.
4.  Click **Choose file** > your zip file > **Upload**. If your item's manifest and ZIP file are
    valid, you can edit your item on the next page.

## Submit your item for publishing {: #submit-your-item-for-publishing }

Once you've uploaded your extension, you will see it as an item in the dashboard.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/g06GNVoineSSnxt4N6Fy.png",
       alt="Screenshot of the Chrome Web Store item listing page", height="472", width="800" %}

You need to fill out additional listing information before you can publish, as contained in the
left-hand tabs. Here is a quick summary of the information on these tabs; click through for more
detail about how to fill in each tab.

- The Package tab displays details of your uploaded item. This page isn't editable when you first
  create an item.
- The [Listing][13] tab contains details of your listing and how it should display in the Chrome Web
  Store.
- The [Privacy][14] tab is where you include declarations about how your item uses privacy and
  security related features.
- The [Pricing and Distribution][15] tab lets you control which countries will list your item and
  which set of users will see it.

To publish your item:

1.  Make sure you've completed the details on all the tabs described above.
2.  Click the **Submit for Review** button.
3.  The following dialog appears, letting you confirm that you want to submit the item for review.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/BiZituXHHZ74SIkwc3q7.png",
       alt="Screenshot of the Chrome Web Store confirm submission dialog",
       height="388", width="800" %}

### Deferred publishing option {: #deferred-publishing }

The confirmation dialog shown above also lets you control the timing of your item's publishing. If
you uncheck the checkbox, your item will **not** be published immediately after its review is
complete. Instead, you'll be able to manually publish it at a time of your choosing once the review
is complete.

### Review of submitted items {: #review-of-submitted-items }

After you submit the item for review, it will undergo a review process. The time for this review
depends on the nature of your item. See the [FAQ on review times][16] for more details.

[1]: /docs/webstore/update
[2]: /docs/webstore/group-publishers
[3]: /docs/extensions/mv2/overview/#hello-extensions
[4]: /docs/extensions/mv2/overview#files
[5]: /docs/extensions/mv2/manifest/icons
[6]: /docs/extensions/mv2/overview#files
[7]: /docs/extensions/reference/tabs#version
[8]: https://developers.google.com/native-client/
[9]:
  /native-client/devguide/distributing#reducing-the-size-of-the-user-download-package
[10]: /docs/webstore/register
[11]: https://support.google.com/chrome_webstore/contact/dev_account_transfer
[12]: https://chrome.google.com/webstore/devconsole
[13]: /docs/webstore/cws-dashboard-listing
[14]: /docs/webstore/cws-dashboard-privacy
[15]: /docs/webstore/cws-dashboard-distribution
[16]: /docs/webstore/faq#faq-listing-108
