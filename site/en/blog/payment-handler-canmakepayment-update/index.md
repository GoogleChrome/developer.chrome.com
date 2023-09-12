---
layout: 'layouts/blog-post.njk'
title: Update to the CanMakePayment event behavior of the Payment Handler API
subtitle: >
   The `canmakepayment` service worker event in the Payment Handler API lets the merchant know whether the user has a card on file in an installed payment app. Chrome is removing properties attached to the event.
description: >
   The `canmakepayment` service worker event in the Payment Handler API lets the merchant know whether the user has a card on file in an installed payment app. Chrome is removing properties attached to the event.
authors:
 - agektmr
date: 2022-10-27
updated: 2023-02-07
---
 
[The Payment Handler API](https://web.dev/web-based-payment-apps-overview/)
allows payment providers to make their custom payment experience available for
merchants, along with [the Payment Request
API](https://web.dev/how-payment-request-api-works/). When [the Payment Request
API](https://web.dev/how-payment-request-api-works/) is initialized via the
`new PaymentRequest()` constructor, it silently fires a `canmakepayment` event with
the merchant's origin and arbitrary data to
[a service worker that is registered for the Payment Handler API](https://web.dev/orchestrating-payment-transactions/).
This cross-origin communication does not require a user gesture and does not
show any user interface.

Chrome is going to remove the identifying fields from `canmakepayment` event
and start the origin trial from Chrome 108.

The information on this page only applies to the payment app providers that use
the Payment Handler API. If you don't use it, you can skip these instructions.

## What's changing?

When a merchant calls `new PaymentRequest()`, a registered service worker
receives a `canmakepayment` event
([`CanMakePaymentEvent`](https://w3c.github.io/payment-handler/#the-canmakepaymentevent))
that contains following information:

-   `topOrigin`
-   `paymentRequestOrigin`
-   `methodData`
-   `modifiers`

These are going to be removed and the service worker will simply receive the
`canmakepayment` event without any additional information.

## Feature detection

To detect whether the `canmakepayment` event is changed in the service worker
code, examine respective properties like so:

```js
self.addEventListener(e => {
  if (e.paymentRequestOrigin) {...}
  if (e.topOrigin) {...}
  if (e.methodData && e.methodData.length > 0) {...}
  if (e.modifiers && e.modifiers.length > 0) {...}
  ...
});
```

## Try out the change locally

To enable the change locally for development purposes:

1. Use Chrome 108, 109, or 110.
2. Enter `chrome://flags/#clear-identity-in-can-make-payment` in the URL bar.
3. Enable the flag.
4. Relaunch Chrome.

By enabling the flag, the identity fields in the `canmakepayment` event will be
emptied-out (and
[the Android `IS_READY_TO_PAY` Intent](https://web.dev/android-payment-apps-developers-guide/#step-2-let-a-merchant-know-if-a-customer-has-an-enrolled-instrument-that-is-ready-to-pay)).

## Enable the change in production

You can also enable the change in production for testing purposes before it
actually lands in Chrome. This mechanism is called an origin trial.

{% Partial 'origin-trials' %}

To register an origin trial:

1. [Request a token](/origintrials/#/view_trial/3462142213541068801)
for your origin.
2. Add the token to your service worker JavaScript file using an `Origin-Trial`
HTTP header. Setting HTTP headers requires access to configuring your server.
The resulting response header should look something like:

```text
Origin-Trial: Auw/tjTQ2eJQ911wiMHi1Bb7i71...
```

To see the origin trial token on the service worker file,
[use the DevTools](/docs/devtools/network/reference/#headers)
or the `curl` command like so:

```shell
$ curl --head <Service Worker JS file URL> | grep -i origin-trial
origin-trial: Auw/tjTQ2eJQ911wiMHi1Bb7i71...
```

## Re-enable the identity fields locally after Chrome 111

If you are using Chrome 111 or later, the identity fields in the
`canmakepayment` event are left empty. To re-enable the
fields locally, you can do the following:

1. Use Chrome 111 or later.
2. Enter `chrome://flags/#add-identity-in-can-make-payment` in the URL bar.
3. Enable the flag.
4. Relaunch Chrome.

## Next steps

This change is planned to be enabled by default from Chrome 111. You can start testing today to be prepared
for the change in time for the launch.

