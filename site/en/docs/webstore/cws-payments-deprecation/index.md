---
layout: "layouts/doc-post.njk"
title: "Chrome Web Store payments deprecation"
date: 2020-09-20
#updated: TODO
description: Why the payments is deprecated, details about the deprecation timeline, and more.
---

The Chrome Web Store payments system is now deprecated and will be shut down over the coming months.
There are many other ways to monetize your extensions, and if you currently use Chrome Web Store
payments, you'll need to migrate to one of them.

## Why this is changing {: #why-this-is-changing }

The web has come a long way in the 11 years since we launched the Chrome Web Store. Back then, we
wanted to provide a way for developers to monetize their Web Store items. But in the years since,
the ecosystem has grown and developers now have many payment-handling options available to them.

## What it means for developers {: #what-it-means-for-developers }

If you don't use Chrome Web Store payments to monetize your extension, then this does not affect you
and you don't have to do anything.

If you use Chrome Web Store payments to charge for your extension or in-app purchases, you'll need
to migrate to another payments processor in the near future. If you use the licensing API to keep
track of who has paid, you'll need to implement another way of tracking user licenses.

## Details of what's happening {: #details-of-whats-happening }

You will need to migrate your billing if you are affected by this change. Specifically, you'll need
to make changes if you monetize your extensions in any of the following ways:

1.  If you have configured a one-time purchase for your extension [using the developer
    dashboard][1].
2.  If you use any of the following resources in the [Chrome Web Store API][2]:
    - InAppProducts
    - UserLicenses
    - Payments
3.  If you use the following helper methods provided by buy.js:
    - google.payments.inapp.getSkuDetails
    - google.payments.inapp.buy
    - google.payments.inapp.getPurchases
    - google.payments.inapp.consumePurchase

## Milestone dates {: #milestone-dates }

The deprecation timeline began with the temporary disabling of new paid items because of resource
constraints due to Covid-19. We have since decided to make this change permanent, and over the
coming months payments for existing items will be phased out.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/iqFt5YpdIgBp1EyKixKP.png", alt="Deprecation timeline", height="217", width="800" %}

- **March 27, 2020** Publishing of paid items temporarily disabled.
- **September 21, 2020** You can no longer create new paid extensions or in-app items. This change,
  in effect since March 2020, is now permanent.
- **December 1, 2020** Free trials are disabled. The "Try Now" button in CWS will no longer be
  visible, and in-app free trials requests will result in an error.
- **Feb 1, 2021** Your existing items and in-app purchases can no longer charge money with Chrome
  Web Store payments. You can still query license information for previously paid purchases and
  subscriptions. (The licensing API will accurately reflect the status of active subscriptions, but
  these subscriptions won't auto-renew.)
- **At some future time** The licensing API will no longer allow you to determine license status for
  your users.

After payments is disabled, you can still use the Licensing API to determine if users are currently
licensed. However, this is also deprecated and will be shut down at some point, so you should begin
migrating your license tracking to a different implementation.

## Exporting user licenses {: #exporting-user-licenses }

If you're using the Chrome Web Store or the [Licensing API][3], you'll need to do the following:

- Migrate to another payments processor
- Migrate your licensing tracking

There is no way to bulk export your existing user licenses, so you need to have your users help with
this part of the migration.

We recommend that you handle license migration in your back-end system, using the Chrome Web Store
API. You'll need to use OAuth 2.0 with your users' consent to access these APIs. The general
sequence is:

1.  Implement your replacement payment/licensing scheme.
2.  Prepare a license migration app that runs on your site, which accesses the Chrome Web Store API.
    This app needs to use OAuth 2.0 to authenticate, with user consent, and fetch the user's
    subscription details.
3.  Create and publish a new version of your extension that directs users to your site to perform
    the migration.

[1]: /docs/webstore/one_time_payments/#using-otps
[2]: /docs/webstore/api_index/
[3]: /docs/webstore/api_index/
