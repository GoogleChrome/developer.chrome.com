---
layout: "layouts/doc-post.njk"
title: "Manage your Chrome Web Store Item"
date: 2021-08-17
description: >
  How to manage your extension in the Chrome Web Store.
---

This page describes how to manage an extension that was previously submitted on the Chrome Web Store.

## About the lifecycle of an item in the Chrome Web Store 

All extensions go through an automated review process. In some instances a manual review is required, specially when sensitive permissions are requested. For this reason review times and/or approval times can take longer. A Chrome Web Store item goes through several stages, as depicted in the following diagram:

{% Aside %}
Insert diagram here
{% endAside %}

## Check your item's status
 
 The status of your item appears in the [developer dashboard][dev-dashboard] next to each item. The status can be Published, Pending or Rejected.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/bUbtISU01bab8WyWqonX.png", alt="Developer dashboard status types", width="800", height="221" %}

To stay informed of your item's status, you can:

-  **Enable email notifications**. There are mandatory emails like take down or rejection notifications that are enabled by default. To receive notification for published or staged items, you can enable email notifications in the Account page. 
 
    {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/FgPIwRl3QEbNowNV1zRn.png", alt="How to enable email notifications", width="658", height="219" %}

-  **Check your publisher email often**. After enabling email notifications check your inbox and spam folder, just in case.
   
## Comply with Chrome Web Store policies
To ensure a positive experience for your users follow the [developer program policies][dev-policies]. These policies may change, so keep up with [new announcements][whats-new].

If your extension has been determined to violate one or more terms or policies, you will receive an email notification. The email contains a description of the specific violation and provides instructions on next steps. You can also find this information in the Status tab of your item.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/C4wpnEeMriI9YeDAMDIr.png", alt="The Chrome Web Store Status Tab", width="700", height="276" %}

If you have been informed about a violation and you do not rectify within x weeks your item will be taken down. 

{% Aside %}
To request further clarification on the reasons for the take down or appeal the decision contact [Chrome Web Store Developer Support][cws-support]. To understand how you can rectify the problem check the [Troubleshooting guide][troubleshooting].
{% endAside %}

[cws-support]: https://support.google.com/chrome_webstore/contact/dev_account_transfer
[dev-dashboard]: https://chrome.google.com/webstore/devconsole
[dev-policies]: /docs/webstore/program_policies
[troubleshooting]: /docs/webstore/troubleshooting/
[whats-new]: /docs/extensions/whatsnew/
