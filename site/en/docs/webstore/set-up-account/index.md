---
layout: "layouts/doc-post.njk"
title: "Set up your developer account"
seoTitle: "Set up your Chrome Web Store developer account"
date: 2023-10-16
description: How to set up your Chrome Web Store developer account.
---

After [registering your developer account][register], you can proceed to fill out additional information about your account. 

## Fill out your account information

To set up your account go to the **Account page** in the developer dashboard, located on the left menu.

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/pSgZrafhiuoLlHJqkBde.png", alt="Chrome Web Store account page", width="800", height="675" %}
  <figcaption>
    Chrome Web Store Account page
  </figcaption>
</figure>

Here you can provide your developer profile information, configure management settings and enable email notifications, among other things. The page itself provides instructions; however, there are a few fields worth calling out.

Publisher name (Required)
: Appears under the title of each of your extensions. If you are a [verified publisher][verified-publisher], you can display an official publisher URL instead.

Verify your email (Required)
: Only displayed under your extensions' contact information. Any notifications will be sent to your Chrome Web Store developer account email. See [Verify your email address](#verify-contact-email) for details

Physical address (Required in some circumstances)
: Only items that offer functionality to purchase items, additional features, or subscriptions must include a physical address.

Trusted tester accounts (Optional)
: A comma-separated list of individuals' email addresses to make your extension available to them for testing.

{% Aside 'important' %}
The Trusted tester accounts field does *not* support using group email addresses such as those used for posting to Google groups or other forums. If you need to test with a group, do so using the item level visibility setting. Click **Items** in the menu at left. Scroll to **Visibility**. Then select **Private** and **Only trusted testers from the current publisher settings**.
{% endAside %}

## Verify your email address {: #verify-contact-email }

Verifying your contact email address is required when you set up a new developer account. When
you click **Add email** on your account page, you can enter an email address and then request
verification. The Chrome Web Store then sends a verification link to that address; use that link to
verify your address.

{% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/KZbN4VNG8mEFEDsiWglX.png", alt="Contact email field
showing as unverified", width="250", height="98", class="screenshot screenshot--filled" %}

Click the **Verify email** link to send the verification link to your email.

## Next steps

- [Prepare your extension][prepare]. 
- [Publish your extension][publish].

[group-publishers]: /docs/webstore/group-publishers
[listing]: /docs/webstore/cws-dashboard-listing
[name]: /docs/extensions/mv3/manifest/name
[prepare]: /docs/webstore/prepare
[privacy]: /docs/webstore/cws-dashboard-privacy
[publish]: /docs/webstore/publish
[register]: /docs/webstore/register
[review-times]: /docs/webstore/review-process/#review-time
[update]: /docs/webstore/update
[user-data]: /docs/webstore/program-policies/user-data-faq/
[verified-publisher]: /docs/webstore/cws-dashboard-listing/#displaying-your-verified-publisher-status
[version]: /docs/extensions/mv3/manifest/version



