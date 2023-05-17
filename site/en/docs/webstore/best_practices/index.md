---
layout: "layouts/doc-post.njk"
title: Best Practices
date: 2017-08-30
updated: 2023-05-10
description: >
  Best practices for a high-quality extension and Chrome Web store listing.
---

This page has guidelines on how you should implement your extension and Chrome Store listing. As the
store matures and we learn from developers' experiences, these recommendations will be updated. 

We encourage you to develop [high-quality extensions][hq-guidelines] that conform to standards of
performance, security, and user experience, as summarized by the following guidelines:

## Compliance {: #compliance }

Extensions hosted in the Chrome Web Store must comply with our [developer program policies][program policies]. Some examples are the single-purpose policy, spam, deceptive instalation,

To explore common reasons for policy violations and how to rectify them, see [Troubleshooting Chrome Web Store violations][cws-violations].

## Manifest V3 {: #mv3 }

Manifest V3 is the current version of the Chrome extension platform and all high-quality extensions should use it. See the [Manifest V3 overview][mv3-overview] and [Migrate to Manifest V3][mv3-migration] for more details.

## Security {: #security }

Is the extension safe for users? Make sure your extension does not pose security threats and does
not use deceptive installation tactics (see [Stay secure][stay-secure] for a more in-depth
discussion.)

## Privacy {: #privacy }

Make sure that your extension handles user data appropriately and conforms to [Chrome Web Store's
data privacy](/docs/webstore/program-policies/privacy) requirements. (See this [FAQ][user-data-faq]
for further details.)

[Privacy information][dashboard-privacy] (permissions justifications, the extension's privacy
policy, data use disclosures, etc.) must be accurate and up to date.

## Performance {: #performance }
<!-- Make sure you test your extension well before posting -->
Does the extension function at an outstanding level? High-quality extensions don't
just perform their intended action, they do so while using as few system resources as possible.

## User experience {: #user-experience }

Is the extension a joy to use? The extension itself should provide a good-looking,
intuitive, and seamless user experience while also respecting the end user's privacy.

### Persistent UI {: #persistent-ui }

When designing a side panel for your extension, make sure it enhances the user's browsing experience
by providing relevant information and useful functionality. A side panel should help users
accomplish tasks with as little distraction as possible.

### Support Google Accounts {: #support-google-accounts }

If your extension requires user login, we recommend that you support Google Accounts. Google
Accounts can help you provide a better user experience; since Chrome Web Store users are
likely to be logged in already, they won't have to set up and remember yet another username and
password. Reducing the number of logins improves the user's experience.

If you already have a login system, consider correlating the Google Account ID to the user account
in your system. You can use the [Chrome Identity API][identity-api] to support Google accounts in
the following ways:

- Google OAuth2/OpenID: See [Identifying the User][identify-user].
- OAuth2: See [Authenticate users with Google][oauth2-tutorial].

### Keep ex-users' data for 30 days or more

You should keep users' data for at least 30 days after they cancel their subscription or uninstall
your extension. Users might be unsubscribed for reasons beyond their control, and even if they do
intentionally unsubscribe or uninstall the extension, they might come back.

### Cache license data

If you use a payment processor or other licensing manager, you may also want to cache the results so
that **(a)** your user can still use the extension when they are offline, and **(b)** you reduce the
number of queries to the license server, reducing quota usage and traffic.

## Store listing {: #store-listing } 

The purpose of an extension's [Chrome Web Store store listing][completing-listing] is to set the user's
expectations. It should be clearly communicate what the extension does. See [Listing Requirements](/docs/webstore/program-policies/listing-requirements/) for store listing polocy violations.

### Create a compelling store listing {: #great-listing}

The better your extension's listing in the store, the more users will discover and try your extension.
[Creating a great listing page][great-listing-page] provides in-depth guidelines to design the best
store listing experience. When choosing your extension's name, writing its description, and
designing its logo, keep in mind Google's [Branding Guidelines][cws-branding].

### Provide great images {: #images }

All image assets (icon, tile, marquee, and screenshots) [should be provided][supplying-images].
Images should not be blurry or too busy, as described in [Images of a high-quality listing](/docs/webstore/best_listing/#images). 

### Choose your extension's category well {: #categories }

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
[cws-violations]: /docs/webstore/troubleshooting/
[dashboard-privacy]: /docs/webstore/cws-dashboard-privacy/
[great-listing-page]: /docs/webstore/best_listing/
[identity-api]: /docs/extensions/reference/identity/
[identify-user]: /docs/webstore/identify_user
[mv3-overview]: /docs/extensions/mv3/intro/mv3-overview/
[program policies]: /docs/webstore/program-policies/
[stay-secure]: /docs/extensions/mv3/security/
[supplying-images]: /docs/webstore/images/
[user-data-faq]: /docs/webstore/user_data/
[hq-guidelines]: /docs/webstore/program-policies/quality-guidelines/
[mv3-migration]: https://developer.chrome.com/docs/extensions/migrating/
