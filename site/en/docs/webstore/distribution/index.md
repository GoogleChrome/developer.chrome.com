---
layout: "layouts/doc-post.njk"
title: "Distributing Products Built for Chrome"
date: 2014-05-27
updated: 2018-06-12
description: >
  An overview of the types of products you can distribute on Chrome,
  your distribution options, and your monetization options.
---

On Chrome, you can build and distribute the following kinds of products:

<table><tbody><tr><th>Websites</th><td>With just an extra bit of metadata, you can integrate your website into the Chrome browser, making your content more accessible to users.</td></tr><tr><th>Extensions</th><td><a href="/extensions/overview">Extensions</a> are small browser add-ons that add new and useful features to Chrome.</td></tr><tr><th>Chrome Apps</th><td><a href="/apps/about_apps">Chrome apps</a> are designed specifically for Chrome and only work in the Chrome browser. They allow you to take advantage of cutting-edge technology that is not available to traditional websites.<div class="aside aside--caution"><b>Important:</b> Chrome will be removing support for Chrome Apps on Windows, Mac, and Linux. Chrome OS will continue to support Chrome Apps. <a href="http://blog.chromium.org/2016/08/from-chrome-apps-to-web.html">Read the announcement</a> and learn more about <a href="/apps/migration">migrating your app</a>.</div></td></tr><tr><th>Themes</th><td><a href="/extensions/themes">Themes</a> change the way the Chrome browser looks, adding style to your users' browsing experience.</td></tr></tbody></table>

## Distribution Options {: #distribution-options }

While the Chrome Web Store is the primary hub for distributing Chrome products, several other
distribution options are available.

<table><tbody><tr><th>Chrome Web Store</th><td>The <a href="https://chrome.google.com/webstore">Chrome Web Store</a> is an online marketplace where users can browse for Chrome-integrated websites, Chrome apps, extensions, and themes. The store helps users find, purchase, and install your content in the Chrome browser.<div class="aside aside--note"><b>Note</b>: Chrome supports <a href="/native-client/devguide/distributing">Native Client (NaCl) and Portable Native Client (PNaCl)</a> technologies. Products using NaCl must be distributed through the Chrome Web Store.</div></td></tr><tr><th>External Installation</th><td>In certain cases, you might want your product to be installed automatically. <a href="/extensions/external_extensions">External installation</a> allows you to do this.</td></tr><tr><th>Mobile</th><td>For mobile users, you can easily <a href="/apps/chrome_apps_on_mobile">convert your products</a> into native apps for Android and iOS using <a href="http://cordova.apache.org/">Apache Cordova</a>.</td></tr></tbody></table>

## Monetization Options {: #monetization-options }

The Chrome platform supports a variety of [payment systems and monetization models][11]. Chrome Web
Store Payments powered by Google Wallet for Digital Goods is especially well-integrated with the
store. Alternatively, you are free to choose whichever payment service provider you prefer.

The following table covers a few ways to monetize your product.

<table><tbody><tr><th>Freemium</th><td>A free trial version of your product that prompts users for payment to unlock advanced features or regain access after a time-limit.</td></tr><tr><th>One-time Payment</th><td>Users buy your product by providing a one-time payment upfront.<div class="aside aside--note"><b>Note</b>: This is the only monetization option for themes.</div></td></tr><tr><th>Subscription</th><td>Users purchase access to your product on a subscription basis.</td></tr><tr><th>Custom</th><td>You are free to implement a custom model that works best for you. For in-app payments, consider using the <a href="/webstore/payments-iap">Chrome Web Store API</a>.</td></tr></tbody></table>

<div class="aside aside--note"><strong>Note: </strong>Chrome Web Store payment methods are not available for websites.</div>

[1]: /docs/extensions/mv2/overview
[2]: /docs/apps/about_apps
[3]: http://blog.chromium.org/2016/08/from-chrome-apps-to-web.html
[4]: /apps/migration
[5]: /docs/extensions/mv2/themes
[6]: https://chrome.google.com/webstore
[7]: /docs/native-client/devguide/distributing
[8]: /docs/extensions/mv2/external_extensions
[9]: /docs/apps/chrome_apps_on_mobile
[10]: http://cordova.apache.org/
[11]: /docs/webstore/money
[12]: /docs/webstore/payments-iap
