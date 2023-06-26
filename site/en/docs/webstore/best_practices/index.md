---
layout: "layouts/doc-post.njk"
title: Best Practices
date: 2017-08-30
updated: 2023-06-09
description: >
  Best practices on how to implement your extension and list it in the Chrome Web Store.
---

This page has advice on how you should implement your extension and list it in the store. As the store
matures and we learn from developers' experiences, these recommendations will be updated.

## Design a high-quality extension

We encourage you to develop extensions that are of high quality. [High-quality extensions](/docs/webstore/program-policies/quality-guidelines/) conform to
standards of performance, security, and user experience, as summarized by the following guidelines:

Compliance 
: Does the extension comply with our [developer program policies][program policies]? Extensions must not violate any of these policies.

Manifest V3
: Is the extension built on Manifest V3? Manifest V3 is the current version of the
Chrome extension platform and all High Quality extensions should use it. (See the [Manifest V3 overview][mv3-overview].)

Security
: Is the extension safe for users? Make sure your extension does not pose security threats and does not use deceptive installation tactics (see [Stay secure][stay-secure] for a more in-depth
discussion.)

Privacy
: Make sure that your extension handles user data appropriately and conforms to [Chrome
Web Store's data privacy](/docs/webstore/program-policies/privacy) requirements. (See this [FAQ][user-data-faq] for further details.)

Performance
: Does the extension function at an outstanding level? High-quality extensions don't
just perform their intended action, they do so while using as few system resources as possible.

User experience
: Is the extension a joy to use? The extension itself should provide a good-looking,
intuitive, and seamless user experience while also respecting the end user's privacy.

Persistent UI
: When designing a side panel for your extension, make sure it enhances the user's browsing experience by providing relevant information and useful functionality. A side panel should help users accomplish tasks with as little distraction as possible.

Store listing
: The extension's [Chrome Web Store listing][completing-listing] should set the user's
expectations and clearly communicate what the extension does. All image assets (icon, tile, marquee,
and screenshots) [should be provided][supplying-images]. Images should not be blurry or too busy.
[Privacy information][dashboard-privacy] (permissions justifications, the extension's privacy
policy, data use disclosures, etc.) must be accurate and up to date.

## Support Google Accounts

If your extension requires user login, we recommend that you provide at least some support for
Google Accounts. Google Accounts can help you provide a better user experience; since users of the
Chrome Web Store are likely to be logged in already, they won't have to set up and remember yet
another username and password. Reducing the number of logins improves the user's experience.

If you already have a login system, consider correlating the Google Account ID to the user account
in your system. You can use the [Chrome Identity API][identity-api] to support Google accounts in the following
ways:

- Google OAuth2/OpenID: See [Identifying the User][identify-user].
- OAuth2: See [Authenticate users with Google][oauth2-tutorial].

## Keep ex-users' data for 30 days or more

You should keep users' data for at least 30 days after they cancel their subscription or uninstall
your extension. Users might be unsubscribed for reasons beyond their control, and even if they do
intentionally unsubscribe or uninstall the extension, they might come back.

## Cache license data

If you use a payment processor or other licensing manager, you may also want to cache the results so
that **(a)** Your user can still use the extension when they are offline, and **(b)** you reduce the
number of queries to the license server, reducing quota usage and traffic.

## Create a compelling store listing

The better your extension's listing in the store, the more users will find and try your extension.
When choosing your extension's name, writing its description, and designing its logo, keep in mind
Google's [Branding Guidelines][cws-branding].

To learn more, see [Creating a great listing page][great-listing-page].

### Provide great images

See [Supplying Images][cws-images] for guidelines on the images you should supply to the store.

### Choose your extension's category well {: #choose-category-well }

The developer console lets you specify a category for each extension. Choose the most appropriate category:

- Accessibility
- Blogging
- Developer Tools
- Fun
- News & Weather
- Photos
- Productivity
- Search Tools
- Shopping
- Social & Communication
- Sports

[oauth2-tutorial]: /docs/extensions/mv3/tut_oauth/
[completing-listing]: /docs/webstore/cws-dashboard-listing/
[cws-branding]: /docs/webstore/branding
[cws-images]: /docs/webstore/images
[dashboard-privacy]: /docs/webstore/cws-dashboard-privacy/
[great-listing-page]: /docs/webstore/best_listing/
[identity-api]: /docs/extensions/reference/identity/
[identify-user]: /docs/webstore/identify_user
[mv3-overview]: /docs/extensions/mv3/intro/mv3-overview/
[program policies]: /docs/webstore/program-policies/
[stay-secure]: /docs/extensions/mv3/security/
[supplying-images]: /docs/webstore/images/
[user-data-faq]: /docs/webstore/user_data/
