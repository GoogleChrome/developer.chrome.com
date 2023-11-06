---
layout: "layouts/doc-post.njk"
title: "Check on your review status"
date: 2021-08-17
updated: 2023-03-27
description: >
  How to check the review status of your Chrome Web Store item.
---

After [publishing][publish] your extension for the first time or [uploading][update] a new version, your item will go
through a [review process][cws-review]. This page describes the how to check the status of your item .

## The lifecycle of a Chrome Web Store item

All Chrome Web Store items go through an automated [review process][cws-review]. In some instances, a manual review
is required, especially when sensitive permissions are requested. For this reason, review times
and/or approval times can take longer. Since a Chrome Web Store item goes through several stages,
it's important to keep track of your item's status. See the lifecycle diagram below:

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/yakIoAzWEchO8urosQLs.png", alt="Diagram of the lifecycle of a Chrome Web Store item", width="800", height="177" %}

## Check your item's status

The review status of your item appears in the [developer dashboard][dev-dashboard] next to each item. The
status can be Published, Pending, Rejected, or Taken Down.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/bUbtISU01bab8WyWqonX.png", alt="Developer dashboard
status types", width="800", height="221" %}

To stay informed of your item's status, you can:

-  **Enable email notifications**. There are mandatory emails like take down or rejection
   notifications that are enabled by default. To receive notification when your item is published or
   staged, you can enable email notifications on the Account page.

    {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/FgPIwRl3QEbNowNV1zRn.png", alt="How to enable
    email notifications", width="658", height="219" %}

-  **Check your publisher email**. After enabling email notifications check your inbox often. To
   ensure that CWS emails don't get flagged as Spam, add **chromewebstore-noreply@google.com** to
   your contacts so that you receive all communications in a timely manner.

{% Aside %}
The "pending review" status of your item means that it is now in the queue awaiting to be reviewed. Your item will not be visible in the store until it has been reviewed and approved.
{% endAside %}

## Follow-up on rejections and takedowns

If your extension has been determined to violate one or more terms or policies, you will receive an
email notification that contains the violation description and instructions on how to rectify it. 

If you did not receive an email within a week, check the status of your item (described above). If your item has
been rejected, you can see the details on the **Status tab** of your item.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/C4wpnEeMriI9YeDAMDIr.png", alt="The Chrome Web Store
Status Tab", width="700", height="276" %}

If you have been informed about a violation and you do not rectify it, your item will be taken down. See
[Violation enforcement][enforcement] for more details.

{% Aside %}

To request further clarification on the reasons for the takedown or to appeal the decision,
contact [Chrome Web Store Developer Support][cws-support]. For more examples and instructions on how
you can remedy the problem check the [Troubleshooting guide][troubleshooting].

{% endAside %}

[cws-review]: /docs/webstore/review-process/
[cws-support]: https://support.google.com/chrome_webstore/contact/dev_account_transfer
[dev-dashboard]: https://chrome.google.com/webstore/devconsole
[dev-policies]: /docs/webstore/program-policies
[publish]: /docs/webstore/publish
[update]: /docs/webstore/update
[enforcement]: /docs/webstore/review-process/#enforcement
[troubleshooting]: /docs/webstore/troubleshooting/
[whats-new]: /docs/extensions/whatsnew/
