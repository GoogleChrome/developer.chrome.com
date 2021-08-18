---
layout: "layouts/doc-post.njk"
title: "Publish in the Chrome Web Store"
date: 2014-02-28
updated: 2021-08-13
description: >
  How to publish a new extension or theme to the Chrome Web Store.
---

This page describes how you publish a new extension or theme ("item") to the Chrome Web Store.

{% Aside 'note' %}

To publish updates to an existing item, or to update the percent rollout, see [Updating your Chrome
Web Store item][update]. To learn about group publishers, see [Set up group
publishing][group-publishers].

{% endAside %}

Before you publish an extension, you need to load it locally and test that it works, as described in
[Hello extensions][hello-extension]. Make sure that it runs correctly and that all its functionality works as you
intend.

To publish your item to the Chrome Web Store, follow these steps:

1.  Create your item's zip file
2.  Create and setup a developer account
3.  Upload your item
4.  Add assets for your listing
5.  Submit your item for publishing

We'll go into detail about each step below.

## Create your item's zip file {: #create-your-items-zip-file }

To upload your item, you need to create a ZIP file that contains the 
manifest file located in the **root directory** and the files for your extension. The manifest file must specify at least the following fields:

- `"name":`—This [name][name] appears in the Chrome Web Store and in the Chrome browser
- `"version":`—The [version][version] of the metadata, incremented
- `"icons":`—An array specifying the [icons][icons] your item uses
- `"description":`—A string of no more than 132 characters [describing][description] your extension

Your zip file may also include other images and any files that the item requires. The contents of
the ZIP file and manifest depend on the specifics of your item.

**Tips:**

- Set the initial [version number][version] in the manifest to a low value, such as 0.0.0.1. That way, you
  have room to increase the version number when you upload new versions of your item. Each new
  version that you upload to the Chrome Web Store must have a larger version number than the
  previous version.

## Create and setup a developer account {: #create-setup-a-developer-account }

Before you can publish your item on the Chrome Web Store, you need to pick a developer account to own your items, then set up your account in the Chrome Web Store.

### Create your account {: #create-a-developer-account }

First you will need to [register as a Chrome Web Store developer][register]. We suggest using a new account just for your item instead of your personal account.

If you already host your item in Google Play and you want your Chrome Web Store listing to show an "Available for Android" link, your item must have the same name as your Google Play listing, and both items must be owned by the same developer account. To transfer your Chrome Web Store item to a different developer, submit this [form][cws-support].

### Setup your account {: #setup-a-developer-account }

Once you've registered, you can finish setting up your developer account in the Account page located on the left menu.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/lBcTQm6QF1FBzOmLEfG1.png", alt="Chrome Web Store Account page", width="800", height="404" %}

Here you can provide your developer profile information, configure management settings and enable email notifications. However, only the name, email and privacy policy link are mandatory.

| Field                | Description                                                                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Publisher name**   | This name appears under the title of each of your items. If you are a [verified publisher][verified-publisher], you can display an official publisher URL instead. |
| **Email Address**    | This email will only be displayed under your items' contact information. Any notifications will be sent to your CWS developer account email.                       |
| **Privacy Policy**   | This privacy policy link is for all your items. It should include how data is collected, used, and disclosed. See the [User Data FAQ][user-data] for more details. |
| **Physical address** | Only items that offer a functionality to purchase items, additional features or subscriptions must include a physical address.                                     |

## Upload your item {: #upload-your-item }

To upload your item, use the [Chrome Developer Dashboard][dev-dashboard].

If you need the item ID to complete your item's code, then you need to upload the item while you're
still writing its code. Otherwise, you can wait until the item is finished. You can upload your item
many times before submitting it for review.

When your item, its Chrome Web Store listing, and all the sites it relies on are ready, you can
publish your item.

{% Aside %}
You cannot have more than 20 _extensions_ published on the Chrome Web Store. There is no such limit on the number of themes.

{% endAside %}

Here's how to upload your item:

1.  Go to the [Chrome Developer Dashboard][dev-dashboard].
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
- The [Listing][listing] tab contains details of your listing and how it should display in the Chrome Web
  Store.
- The [Privacy][privacy] tab is where you include declarations about how your item uses privacy and
  security related features.
- The [Payment and Distribution][distribution] tab lets you control which countries will list your item and
  which set of users will see it.

### To publish your item: {: #publish-item}

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

{% Aside %}

If you submit your item for review with "Publish automatically" set, you can still turn off
automatic publishing using the **Defer publish** option described below.

{% endAside %}

{% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/yoMNFt1ht6qSLXzFyrWj.png",
       alt="Screenshot showing the 'more' menu's defer publish option", width="386", height="284" %}

This lets you pause the rollout of a submitted item if you discover an error after submitting it or
if you simply want to change your rollout time.

### Review of submitted items {: #review-of-submitted-items }

After you submit the item for review, it will undergo a review process. The time for this review
depends on the nature of your item. See the [FAQ on review times][review-times] for more details.

To receive email notifications about your item status or any action required, you can enable them under Account settings. 

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/l27aRFGCN4MJURmpoCQN.png", alt="Screenshot of enable staged and reviewed items", width="709", height="238" %}

[cws-support]: https://support.google.com/chrome_webstore/contact/dev_account_transfer
[description]: /docs/apps/manifest/description/
[dev-dashboard]: https://chrome.google.com/webstore/devconsole
[distribution]: /docs/webstore/cws-dashboard-distribution
[group-publishers]: /docs/webstore/group-publishers
[hello-extension]: /docs/extensions/mv3/overview/#hello-extensions
[icons]: /docs/extensions/mv3/manifest/icons
[listing]: /docs/webstore/cws-dashboard-listing
[name]: /docs/extensions/mv3/manifest/name
[privacy]: /docs/webstore/cws-dashboard-privacy
[register]: /docs/webstore/register
[review-times]: /docs/webstore/faq#faq-listing-108
[user-data]: /docs/webstore/user_data/
[update]: /docs/webstore/update
[verified-publisher]: /docs/webstore/cws-dashboard-listing/#displaying-your-verified-publisher-status
[version]: /docs/extensions/mv3/manifest/version



