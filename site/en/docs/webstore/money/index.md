---
layout: "layouts/doc-post.njk"
title: Monetizing Your Chrome Web Store Item
date: 2018-06-11
description: An overview of how you can monetize Chrome Web Store items.
---

{% Aside 'warning' %}
The Chrome Web Store payments system [is now deprecated](/docs/webstore/cws-payments-deprecation/).
You are free to monetize your extensions using other payment platforms.
{% endAside %}

{% Aside 'caution' %}
Chrome no longer supports Chrome Apps on Windows, Mac, and Linux. Chrome OS
will continue to support Chrome Apps. Additionally, Chrome and the Web Store will continue to
support extensions on all platforms. [Read the announcement][1] and learn more about [migrating your	
app][2].
{% endAside %}

You can publish Hosted Apps, Chrome Apps, Chrome Extensions, and Themes in the Chrome Web Store.
Collectively these are called simply "Items". You have many choices when it comes to making money
from items that you publish in the Chrome Web Store. This page covers just a few ways to monetize
your store item:

- In-app payments
- One-time charge
- Subscription
- Offering a limited trial version of your item

Keep in mind that although this page features Google APIs, the store allows you to use any payment
system you like.

<div class="aside aside--note"><strong>Note: </strong>Chrome Web Store payment methods are not available for hosted apps.</div>

Items uploaded to the Web Store are unable to be purchased through the same developer account.
Instead, use a trusted tester account to run a trial purchase flow.

## In-app payments

Items that use [in-app payments][3] are usually free to try. For example, you might provide a free
game that offers additional levels or avatars for a small price.

Generally, Chrome Apps and Extensions can use the Chrome Web Store API to charge for features or
virtual goods. The fee for using this API is just 5% per transaction. For example, if you charge
$1.99, you'll receive $1.89; if you charge $9.99, you'll receive $9.49.

<div class="aside aside--note"><strong>Note:</strong> In-app payments for ARC apps are subject to a 30% transaction fee. For example, if you charge $1.99 for an item offered in an ARC app, you'll receive $1.39. This is to ensure a consistent pricing structure with in-app payments made in apps available on Google Play. ARC does not currently support other purchase models including up-front payments, subscriptions and in-app version upgrades; as these types of purchases require provisioning from Google Play which is not currently enabled. For more information on monetizing ARC apps, see <a href="/apps/getstarted_arc">Get Started with ARC</a>.</div>

## One-time Payments

[Chrome Web Store Payments][5] is a payment system that is especially well integrated with the
store. With it, you can either charge to download the item or provide a [free trial][6] that lets
users try out the item before purchasing it.

The charge for using Chrome Web Store Payments is 5%. For example, if you charge
$1.99, you'll receive $1.89. See [Payments: Regions, Fees, and Tiers][7] for details.

<div class="aside aside--note"><strong>Note:</strong> In-app payments for ARC apps are subject to a 30% transaction fee. For example, if you charge $1.99 for an item offered in an ARC app, you'll receive $1.39. This is to ensure a consistent pricing structure with in-app payments made in apps available on Google Play. ARC does not currently support other purchase models including up-front payments, subscriptions and in-app version upgrades; as these types of purchases require provisioning from Google Play which is not currently enabled. For more information on monetizing ARC apps, see <a href="/apps/getstarted_arc">Get Started with ARC</a>.</div>

## Subscriptions

Chrome Web Store Payments supports both monthly and yearly subscription models. As with one-time
Chrome Web Store payments, you have the option of providing a free trial.

## Free Trials

The Chrome Web Store helps you to easily offer a limited-time trial version of your app to help you
attract new customers.

Whether your item is a Chrome App, Chrome Extension, or Chrome Theme, you can use the Licensing API
to check to see if the user has paid for your item.

You will use a [javascript-based flow][9], that also uses the Licensing API along with functions
built into Chrome to check the status of the downloaded trial item. If the trial is expired, you can
direct the user to the web store listing to purchase the item.

## More information

<table><tbody><tr><th></th><th>Hosted Apps</th><th>Packaged Apps</th><th>Extensions</th><th>Themes</th></tr><tr><th>Free Trial</th><td>x</td><td>✓</td><td>✓</td><td>x</td></tr><tr><th>Paid Up-Front</th><td>x</td><td>✓</td><td>✓</td><td>✓</td></tr><tr><th>Subscription</th><td>x</td><td>✓</td><td>✓</td><td>x</td></tr><tr><th>In-App Payments (IAP)</th><td>x</td><td>CWS Managed IAP</td><td>CWS Managed IAP</td><td>x</td></tr></tbody></table>

For details about app payment options, see [Charging for your app][10] in the Overview.

[1]: http://blog.chromium.org/2016/08/from-chrome-apps-to-web.html
[2]: /apps/migration
[3]: /docs/webstore/payments-iap
[4]: /docs/apps/getstarted_arc
[5]: /docs/webstore/overview#builtin
[6]: /docs/webstore/overview#freevnot
[7]: /docs/webstore/pricing
[8]: /docs/apps/getstarted_arc
[9]: /docs/webstore/one_time_payments#verifying-payment
[10]: /docs/webstore/overview#charging
