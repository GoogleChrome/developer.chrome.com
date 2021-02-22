---
layout: "layouts/doc-post.njk"
title: One-Time Payments
date: 2017-08-30
description: How to set up one-time payments with Chrome Web Store Payments.
---

If you choose to charge users for your Chrome App, Chrome Extension, or Chrome Theme in the Chrome
Web Store, there are several options available to you. The Chrome Web Store has a built-in one-time
payment system called Chrome Web Store Payments.

Alternatively for Chrome Apps, you have the option of selling virtual goods with [Payments Merchant
Account][1] along with the Chrome Web Store API.

<div class="aside aside--note"><strong>Note: </strong>Chrome Web Store payment methods are not available for hosted apps.</div>

## Offering a free trial {: #offering-free-trial }

For Chrome Apps and Chrome Extensions, you can provide a free trial version that either gives the
user full access for a limited period of time or restricts which features are available. You can
enable the free trial by checking the appropriate box in the Developer Dashboard, then using the
Licensing API to confirm what kind of license the user has and how long they've had it, with an
upgrade path to the paid version.

## Chrome Web Store Licensing API {: #cws-licensing-api }

You can use the Chrome Web Store Licensing API to determine whether the user has paid for your item
or how long they've been using their free trial. The Licensing API is a simple REST-based API that
lets you query the Chrome Web Store license server to find out whether a particular user is using a
free trial or if they have paid for your item.

## Contents

1.  [Before you get started][2]
2.  [Using one-time payments][3]
3.  [Verifying payment and offering free trial][4]
4.  [Migrating from a free to a paid experience][5]
5.  [Sample Chrome App][6]

## Before you get started {: #before-starting }

If you don't have one already, you must [open a Google Payments Merchant account][7], and associate
that account with the store.

<div class="aside aside--note"><b>Note</b>: See <a href="/webstore/pricing#seller">Payments: Regions, fees and tiers</a> for more information about fees and locations where you can sell your app.</div>

## Using one-time payments {: #using-otps }

You can set up the one-time payment and offer a free trial option on the listing page of the [Chrome
Web Store Developer Dashboard][9]. The Chrome Web Store manages the licenses for each user and
exposes that information through a REST API.

To enable one-time payments:

1.  Choose and set the price in the Chrome Web Store listing.
2.  Enable the Chrome Web Store API in the [Google APIs Console][10].
3.  Update the `manifest.json` to add the [necessary scope and permission][11].
4.  Add code to your app to verify the license.

### Update your Chrome Web Store listing {: #update-cws-listing }

Follow the steps below to enable one-time payments for your item:

1.  Click **Change pricing** in the Pricing and payments section of the listing.
2.  Choose **This item uses Chrome Web Store Payments**, and choose **One-time payment** in the drop
    down.
3.  If applicable, check the **This item supports a free trial mode** if you plan to offer a free
    trial for your item.
4.  Finally, click **OK** to return to the dashboard for your item.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/VwqkyI8cJ1YVQR010lzh.png", 
       alt="A screenshot of the change payment UI", height="560", width="795" %}

#### Choosing a price {: #choosing-a-price }

When you use Chrome Web Store Payments, you can choose from 18 tiers or set your own custom price
for each supported region.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/fovAcun6Xbv1izwOcfh8.png", 
       alt="A screenshot of the supported regions UI", height="523", width="652" %}

To change the price of your item, select the tier you'd like in the Pricing and payments section of
the listing. You can also set a custom price for each region, by choosing Mixed, and then select the
price for each region in the Regions section.

<div class="aside aside--note">See <a href="/webstore/pricing#matrix">Payments: Regions, fees and tiers</a> for more information about the different tiers and prices in local currencies.</div>

## Verifying payment and offering free trial {: #verifying-payment }

To verify if the user has a license, you can query the Chrome Web Store Licensing API.

Here's an overview of the process required to use the licensing API

- Get the identity token for the current user.
- Make an authenticated request to the licensing server.
- Verify the response.

### Update the manifest.json {: #update-manifest }

Before you can use the licensing API, you'll need to modify the `manifest.json` file and add a new
scope and potentially a new permission.

1.  If you haven't already, enable the Chrome Identity API, see [User Authentication][13] for more
    information.
2.  If you haven't already, enable the Chrome Web Store API in the [Google APIs Console][14].
3.  In the `manifest.json` file:
    1.  Add `https://www.googleapis.com/` to the `permissions` section.
    2.  Add `https://www.googleapis.com/auth/chromewebstore.readonly` to the `scopes` subsection of
        the `oauth2` section.

```json
{
  "permissions": [
    "storage",
    "identity",
    "https://www.googleapis.com/"
  ],
  "oauth2": {
    "client_id": "665859454684-s6nmohpktccl2srxvc67thbmpclpa36v.apps.googleusercontent.com",
    "scopes": [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/chromewebstore.readonly"
    ]
  }
}
```

### Verifying the license {: #verify-code }

To verify the user has either purchased your Web Store item or are using a free trial, do the
following:

1.  Get the current users authentication token using `chrome.identity.getAuthToken()`.
2.  Make an XHR with the users access token and your app ID to
    `https://www.googleapis.com/chromewebstore/v1.1/userlicenses/<YOUR_APP_ID>`.
3.  Parse the JSON response, verify the license and store the result.

```js
var CWS_LICENSE_API_URL = 'https://www.googleapis.com/chromewebstore/v1.1/userlicenses/';
var req = new XMLHttpRequest();
req.open('GET', CWS_LICENSE_API_URL + chrome.runtime.id);
req.setRequestHeader('Authorization', 'Bearer ' + token);
req.onreadystatechange = function() {
  if (req.readyState == 4) {
    var license = JSON.parse(req.responseText);
    verifyAndSaveLicense(license);
  }
}
req.send();
```

<div class="aside aside--note"><b>Note</b>: You cannot offer free trial experiences for Themes because themes do not execute any JavaScript and cannot verify a license.</div>

### Handling and parsing the response {: #parse-response }

The response you get from the license server tells you three things: whether the user has access,
the level of access the user should have, and how much longer the response is valid. If you just
want to know whether the user has access, check the value of the `result` field. If you want to know
whether the user should get a free trial version, check the value of the `accessLevel` field.

Sample JSON license object

```json
{
  "kind": "chromewebstore#license",
  "itemId": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "createdTime": "1377660091254",
  "result": true,
  "accessLevel": "FULL",
  "maxAgeSecs": "2052"
}
```

<table><thead><tr><th>Field Name</th><th>Description</th></tr></thead><tbody><tr><td>kind</td><td>Identifies a Chrome Web Store license</td></tr><tr><td>itemId</td><td>Your app or extension ID</td></tr><tr><td>createdTime</td><td>The date that the license was created, returned as a Unix timestamp. You can use to limit functionality of a free trial to a specific period of time.</td></tr><tr><td>result</td><td>Whether the user has a license (full or trial), <code>true</code> or <code>false</code></td></tr><tr><td>accessLevel</td><td><code>FREE_TRIAL</code>, <code>FULL</code> or <code>NONE</code></td></tr><tr><td>maxAgeSecs</td><td>The length of time the response is valid for, once that time has passed your app should query the license server again to check whether the user's access has changed.</td></tr></tbody></table>

### Caching the response {: #cache-response }

To improve the performance and avoid running into rate limits, you should cache the license data
locally using the [`chrome.storage.sync`][15] API and only refresh it on a periodic basis. By
storing the license data in the sync data, it will be synced across all machines that the users is
logged into.

In addition, do not block the user interface or lock the user out of your Chrome App or Extension
while waiting for the licensing server to respond, but instead, allow the user to continue for a
limited grace period until a response is received. Providing a grace period of at least a day or two
will ensure that your Chrome App or Extension continues to work properly in an offline situation
where the user may not be connected to the network.

## Handling the free trial experience {: #handling-trial }

If you decide to offer a free trial to users, there are several ways that you can allow users to try
before they make the purchase. The two most common ways are providing full access for a limited
time, or offering a limited feature set. Of course, you can also combine these two, or provide your
own incentives to encourage users to upgrade to the paid version.

### Limited time access {: #trial-limited-time }

The license API makes it easy to provide a limited time trial experience by including the date the
license was first issued to the user. Comparing the `createdDate` to the current date will tell you
how long the user has been using the free trial.

```js
var licenseStatus;
if (license.result && license.accessLevel == "FULL") {
  console.log("Fully paid & properly licensed.");
  licenseStatus = "FULL";
} else if (license.result && license.accessLevel == "FREE_TRIAL") {
  var daysAgoLicenseIssued = Date.now() - parseInt(license.createdTime, 10);
  daysAgoLicenseIssued = daysAgoLicenseIssued / 1000 / 60 / 60 / 24;
  if (daysAgoLicenseIssued <= TRIAL_PERIOD_DAYS) {
    console.log("Free trial, still within trial period");
    licenseStatus = "FREE_TRIAL";
  } else {
    console.log("Free trial, trial period expired.");
    licenseStatus = "FREE_TRIAL_EXPIRED";
  }
} else {
  console.log("No license ever issued.");
  licenseStatus = "NONE";
}
```

<div class="aside aside--note"><b>Note</b>: After major updates or a significant period of time, you may want to allow the user to try your item again so they can try the new features and see how the item has changed.</div>

### Limited feature set {: #trial-limited-feature }

Another way that you can provide a free trial to users is by offering them a limited feature set
until they've upgraded to the paid version. For example, you might limit the number of files open at
any given time, or the total number of files that the user can edit before being prompted for
payment.

## Migrating from a free to a paid experience {: #free2paid }

If you decide to migrate from a free experience to a paid experience, you should consider what
experience you want to provide for any user who installed your item prior to the change. We strongly
recommend grandfathering these users into the full, paid experience though the decision is yours.

Users who installed your item prior to the change will have a `FREE_TRIAL` license. To determine if
a user installed your item prior to the price change, you can check the `createdTime` value in the
license to determine when they first installed it.

## Sample Chrome App {: #sample-app }

For a simple Chrome App that demonstrates how to use the Chrome Web Store Licensing API, see:

- [source code][16]
- [published app][17]

You can install and run the published app from the Chrome Web Store to try out free trial
experience.

[1]: /docs/webstore/payments-iap
[2]: #before-starting
[3]: #using-otps
[4]: #verifying-payment
[5]: #free2paid
[6]: #sample-app
[7]: https://payments.google.com/merchant/signup
[8]: /docs/webstore/pricing#seller
[9]: https://chrome.google.com/webstore/developer/dashboard
[10]: https://cloud.google.com/console
[11]: #update-manifest
[12]: /docs/webstore/pricing#matrix
[13]: /docs/extensions/reference/app_identity
[14]: https://code.google.com/apis/console
[15]: /docs/extensions/reference/storage
[16]: https://github.com/GoogleChrome/chrome-app-samples/tree/master/one-time-payment
[17]: https://chrome.google.com/webstore/detail/one-time-payment-sample/ebcgmmcbgnpoclkoibogeiokfdmjbbob
