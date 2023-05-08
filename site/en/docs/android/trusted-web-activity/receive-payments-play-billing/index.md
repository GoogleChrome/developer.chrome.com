---
layout: "layouts/doc-post.njk"
title: Receive Payments via Google Play Billing with the Digital Goods API and the Payment Request API
date: 2021-01-26
updated: 2023-03-22
description: Receive Payments via Google Play Billing in your PWA with the Digital Goods API, the Payment Request API and Trusted Web Activity
authors:
  - andreban
---

If your app is distributed through Google Play, and you want to sell digital goods or offer
subscriptions, you must use [Google Play Billing][1]. Google Play Billing offers tools for managing
your catalog, prices and subscriptions, useful reports, and a checkout flow powered by the Play
Store that is already familiar to your users.

For apps built using [Trusted Web Activities][2], and delivered through the Google Play Store, you
can now use the [Payment Request API][3] and the [Digital Goods API][4] to integrate with
Google Play Billing. It's available on Chrome 101 and above for Android and ChromeOS.

In this guide, you will learn how to add Google Play Billing support to your PWA and package it for
distribution on the Google Play Store for both ChromeOS and Play Store.

You will use two web platform APIs to add Play Billing support to your PWA. The
[Digital Goods API][4] is used to gather SKU information and check for purchases and entitlements
from the Play Store. The [Payment Request API][3] is used to configure the Google Play Store as the
payment method and to complete the purchase flow.

## How to monetize applications on the Play Store

There are two ways your application can monetize with Google Play Billing on the Play Store:

- [In-app purchases][7] allow selling both durable and consumable virtual goods, like additional
features, or removing ads.
- [Subscriptions][8], offer your users ongoing access to content or services for a recurring fee,
like news subscriptions or memberships.

Note: The Play Store allows selling applications on the store and users can only download the
application after purchasing it. We don't recommend this for PWAs as the web application needs to
be freely accessible to the open web and it is not possible to limit access in the same way
platform-specific applications would do. A better alternative is to provide the application for
free on the store and enable features via in-app purchases.

## Requirements

In order to setup Google Play Billing, you will need:

- A [Google Play Developer account][9] and a [Google Payment merchant account][10] that are
[linked to each other][11].
- A [Play Store listing][12] with a
[release on the public, closed testing or internal testing track][13].
- To [create and configure][14] your app's products and subscriptions on the Play Store.
- A [Bubblewrap generated project][15] with a working [Digital Asset Links configuration][16].

## Update the Bubblewrap project

If you don't have Bubblewrap installed, you will need to install it. See the
[Quick Start Guide][18] for details on how to get started. If you already have Bubblewrap, make
sure to update to version 1.8.2 or above.

Bubblewrap also has the feature behind a flag. In
order to enable it, you will need to modify the project configuration in the `twa-manifest.json`,
located at the root of the project and enable both `alphaDependencies` and the `playBilling`
feature:

```json
  ...,
  "enableNotifications": true,
  "features": {
    "playBilling": {
      "enabled": true
    }
  },
  "alphaDependencies": {
    "enabled": true
  },
  ...
```
With the configuration file updated, run `bubblewrap update` to apply the configuration to the
project, followed by `bubblewrap build`, to generate a new Android package and upload this
package to the Play Store.

Note: If you are building the Trusted Web Activity using Android Studio,
[check out the documentation][19] on how to modify your Android application and enable Trusted Web
Activity.

## Feature detecting the Digital Goods API and Google Play Billing availability

The Digital Goods API is currently only supported by Chrome when the PWA is being executed inside a
Trusted Web Activity, and it is possible to detect if it is available by checking for
`getDigitalGoodsService` on the `window` object:

```js
if ('getDigitalGoodsService' in window) {
 // Digital Goods API is supported!
}
```

The Digital Goods API may be available in any browser and support different stores. In order to
check if a particular store backend is supported, you will need to invoke
`getDigitalGoodsService()` passing the store ID as a parameter. The Google Play Store is identified
by the string `https://play.google.com/billing`:

```js
if ('getDigitalGoodsService' in window) {
  // Digital Goods API is supported!
  try {
    const service =
        await window.getDigitalGoodsService('https://play.google.com/billing');
    // Google Play Billing is supported!
   
  } catch (error) {
    // Google Play Billing is not available. Use another payment flow.
    return;
  }
}
```

## Retrieve details for a SKU

The Digital Goods API provides `getDetails()`, which allows retrieving the information like the
product title, description, and most importantly, the price, from the payments backend.

You can then use this information in your use interface and provide more details to the user:

```js
const skuDetails = await service.getDetails(['shiny_sword', 'gem']);
for (item of skuDetails) {
  // Format the price according to the user locale.
  const localizedPrice = new Intl.NumberFormat(
      navigator.language,
      {style: 'currency', currency: item.price.currency}
    ).format(item.price.value);

  // Render the price to the UI.
  renderProductDetails(
        item.itemId, item.title, localizedPrice, item.description);
}
```

Note: The product SKUs are defined by you, when
[creating your products and subscriptions on the Play Store interface][14]. The Digital Goods API
doesn't have methods to query SKUs, but the Play Store does provide
[an API that can be used to query SKUs from a backend][20].

## Build the purchase flow

The constructor for a PaymentRequest takes two parameters: a list of payment methods and a list of
payment details.

When inside the Trusted Web Activity, you must use the Google Play billing payment method, by
setting `https://play.google.com/billing` as the identifier, and adding the product SKU in as a
data member:

```js
async function makePurchase(service, sku) {
   // Define the preferred payment method and item ID
   const paymentMethods = [{
       supportedMethods: "https://play.google.com/billing",
       data: {
           sku: sku,
       }
   }];

   ...
}
```

Even though the payment details are required, the Play Billing will ignore those values and use the
values set when creating the SKU  in the Play Console, so they  can be filled with bogus values:

```js
const paymentDetails = {
    total: {
        label: `Total`,
        amount: {currency: `USD`, value: `0`}
    }
};

const request = new PaymentRequest(paymentMethods, paymentDetails);
```

Call the `show()` on the payment request object to start the payment flow. If the Promise succeeds
that will may be payment was successful. If it fails, the user likely aborted the payment.

If the promise succeeds, you will need to verify and acknowledge the purchase.
In order to protect against fraud, this step must be implemented using your backend. Check out the
[Play Billing documentation to learn how to implement the verification in your backend][21].
If you do not acknowledge the purchase,
[after three days, the user will receive a refund and Google Play will revoke the purchase][22].

```js
...
const request = new PaymentRequest(paymentMethods, paymentDetails);
try {
    const paymentResponse = await request.show();
    const {purchaseToken} = paymentResponse.details;

    // Call backend to validate and acknowledge the purchase.
    if (await acknowledgePurchaseOnBackend(purchaseToken, sku)) {
        // Optional: tell the PaymentRequest API the validation was
        // successful. The user-agent may show a "payment successful"
        // message to the user.
        const paymentComplete = await paymentResponse.complete('success');
    } else {
        // Optional: tell the PaymentRequest API the validation failed. The
        // user agent may show a message to the user.
        const paymentComplete = await paymentResponse.complete('fail');
    }
} catch(e) {
    // The purchase failed, and we can handle the failure here. AbortError
    // usually means a user cancellation
}
...
```

Optionally, `consume()` may be called on a purchaseToken to mark the purchase as used up and
allow it to be purchased again.

Putting everything together, a purchase method looks like the following:

```js
async function makePurchase(service, sku) {
    // Define the preferred payment method and item ID
    const paymentMethods = [{
        supportedMethods: "https://play.google.com/billing",
        data: {
            sku: sku,
        }
    }];

    // The "total" member of the paymentDetails is required by the Payment
    // Request API, but is not used when using Google Play Billing. We can
    // set it up with bogus details.
    const paymentDetails = {
        total: {
            label: `Total`,
            amount: {currency: `USD`, value: `0`}
        }
    };

    const request = new PaymentRequest(paymentMethods, paymentDetails);
    try {
        const paymentResponse = await request.show();
        const {purchaseToken} = paymentResponse.details;

        // Call backend to validate and acknowledge the purchase.
        if (await acknowledgePurchaseOnBackend(purchaseToken, sku)) {
            // Optional: consume the purchase, allowing the user to purchase
            // the same item again.
            service.consume(purchaseToken);

            // Optional: tell the PaymentRequest API the validation was
            // successful. The user-agent may show a "payment successful"
            // message to the user.
            const paymentComplete =
                    await paymentResponse.complete('success');
        } else {
            // Optional: tell the PaymentRequest API the validation failed.
            // The user agent may show a message to the user.
            const paymentComplete = await paymentResponse.complete('fail');
        }
    } catch(e) {
        // The purchase failed, and we can handle the failure here.
        // AbortError usually means a user cancellation
    }
}
```

## Check the status of existing purchases

The Digital Goods API allows you to check if the user has any existing entitlements (in-app
purchases that haven't been consumed yet or on-going subscriptions) from previous purchases they've
already made, whether on another device, from a previous install, redeemed from a promo code, or
just the last time they opened the app.

```js

const service =
     await window.getDigitalGoodsService('https://play.google.com/billing');
...
const existingPurchases = await service.listPurchases();
for (const p of existingPurchases) {
    // Update the UI with items the user is already entitled to.
    console.log(`Users has entitlement for ${p.itemId}`);
}
```

This is also a good time to check for purchases that were previously made but weren't acknowledged.
It is recommended to acknowledge purchases as soon as possible to ensure your users' entitlements
are properly reflected in your app.

```js
const service =
     await window.getDigitalGoodsService("https://play.google.com/billing");
...
const existingPurchases = await service.listPurchases();
for (const p of existingPurchases) {
    await verifyOrAcknowledgePurchaseOnBackend(p.purchaseToken, p.itemId);
    
    // Update the UI with items the user is already entitled to.
    console.log(`Users has entitlement for ${p.itemId}`);
}
```

## Test your integration

### On a Development Android device

It is possible to enable the Digital Goods API on an development Android device for testing:

 - Ensure you are on Android 9 or greater with [developer mode enabled][23].
 - Install Chrome 101 or newer.
 - Enable the following flags in Chrome by navigating to `chrome://flags` and searching for the
   flag by name:
     - `#enable-debug-for-store-billing`
 - Ensure that the site is hosted using a https protocol. Using http will cause the API to be `undefined`

Note: The `#enable-debug-for-store-billing` flag is not required when the application is downloaded
from the Play Store.

### On a ChromeOS device

The Digital Goods API will be available on ChromeOS stable starting with version 89. In the
meantime, it is possible to test the Digital Goods API:

 - Install your app from the Play Store on the device.
 - Ensure that the site is hosted using a https protocol. Using http will cause the API to be `undefined`

## With test users and QA teams

The Play Store provides affordances for testing, including user test accounts and test SKUs.
Checkout the [Google Play Billing test documentation][25] for more information.

## Where to go next?

As discussed in this document, the Play Billing API has client-side components, which are managed
by the Digital Goods API, and server-side components.

 - Take a look at Peter Conn's sample at [https://github.com/PEConn/beer][26]
 - Check out the Play documentation on [purchase verification][21].
 - Consider using one of the [Google Play Developer API client libraries][27], which are available
 in [multiple languages][28].
 - If implementing a subscriptions model in your application, check out the
 [Play Billing subscriptions documentation][29].
 - Implement [Real-Time developer notifications][30] (RTDN) and subscribe for notifications so your
 backend is notified  when the state of a subscription changes instead of polling their status on
 Play.
 - Implement `linkedPurchaseToken` to prevent duplicate subscriptions. Read [this blog post][31] on
 how to implement it correctly.

[1]: https://developer.android.com/google/play/billing
[2]: /docs/android/trusted-web-activity/
[3]: https://developers.google.com/web/fundamentals/payments
[4]: https://github.com/WICG/digital-goods/blob/master/explainer.md
[5]: https://web.dev/origin-trials/
[6]: https://github.com/WICG/digital-goods/issues
[7]: https://developer.android.com/distribute/best-practices/earn/in-app-purchases
[8]: https://developer.android.com/distribute/best-practices/earn/subscriptions
[9]: https://support.google.com/googleplay/android-developer/answer/6112435
[10]: https://support.google.com/paymentscenter/answer/7161426
[11]: https://support.google.com/googleplay/android-developer/answer/3092739
[12]: https://support.google.com/googleplay/android-developer/answer/9859152
[13]: https://support.google.com/googleplay/android-developer/answer/9845334
[14]: https://developer.android.com/google/play/billing/getting-ready#products
[15]: /docs/android/trusted-web-activity/quick-start
[16]: /docs/android/trusted-web-activity/quick-start#creating-your-asset-link-file
[17]: https://developers.chrome.com/origintrials/#/view_trial/-5451607348931985407
[18]: /docs/android/trusted-web-activity/quick-start
[19]: /docs/android/trusted-web-activity/play-billing
[20]: https://developers.google.com/android-publisher/api-ref/rest/v3/inappproducts/list
[21]: https://developer.android.com/google/play/billing/security#verify
[22]: https://developer.android.com/google/play/billing/integrate#process
[23]: https://developer.android.com/studio/debug/dev-options
[24]: https://support.google.com/chromebook/answer/1086915
[25]: https://developer.android.com/google/play/billing/test
[26]: https://github.com/PEConn/beer
[27]: https://developers.google.com/android-publisher/libraries
[28]: https://developers.google.com/api-client-library
[29]: https://developer.android.com/google/play/billing/billing_subscriptions#Allow-upgrade
[30]: https://developer.android.com/google/play/billing/getting-ready#configure-rtdn
[31]: https://medium.com/androiddevelopers/implementing-linkedpurchasetoken-correctly-to-prevent-duplicate-subscriptions-82dfbf7167da

