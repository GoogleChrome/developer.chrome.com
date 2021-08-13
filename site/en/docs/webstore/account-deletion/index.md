---
layout: "layouts/doc-post.njk"
title: "Deleting Chrome Web Store developer accounts"
date: 2020-07-06
updated: 2021-08-11
description: How to delete a developer or group publisher account on the Chrome Web Store.
---

This page describes how to delete a CWS account—either a developer or group publisher account.

## About account deletion {: #about-account-deletion }

Items in the Chrome Web Store are associated with developer and publisher accounts. There are a few
things you need to understand before you delete an account:

- Account deletion is permanent. There is no "undo" for this action.
- You can't delete an account that still has published items. If you have published items, make sure
  to [unpublish][unpublish] them before you try and delete the account.
- Group publisher accounts can only be deleted by the owner or manager of the associated Google
  Group.

## How to delete a developer account {: #how-to-delete-a-developer-account }

To delete a developer account, first make sure you've [unpublished][unpublish] any published items. Then, go to
your account page on the Chrome Web Store [Developer Dashboard][dev-dashboard]. Scroll down to the **Developer
Account** section:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/D6j5hOCsx4GmL3rbkEbK.png", alt="image showing the account deletion field", height="348", width="800" %}

Click on **Delete developer account** to permanently delete the developer account.

## How to delete a group publisher account {: #how-to-delete-a-group-publisher-account }

To delete a [group publisher][group-publisher] account, select it using the "Publisher" pulldown at the top of the
account page, then proceed as described above. Make sure that you have [unpublished][unpublish] any items
associated with the group publisher account.

With the group publisher account selected, you'll see a **Group publisher account** section:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/XHb5NK5htbNct2ATTg7R.png", alt="image showing the group publisher deletion field", height="158", width="800" %}

Click on **Delete group publisher account** to permanently delete the group publisher account.

[dev-dashboard]: https://chrome.google.com/webstore/devconsole
[group-publisher]: /docs/webstore/group-publishers/
[unpublish]: /docs/webstore/faq/#faq-listing-03

