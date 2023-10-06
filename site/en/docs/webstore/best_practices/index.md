---
layout: "layouts/doc-post.njk"
title: Best Practices
seoTitle: Best Practices for Chrome extensions
date: 2017-08-30
updated: 2023-08-24
description: >
  How to create a high-quality extension and Chrome Web store listing.
---

## Overview {: #design-a-high-quality-extension}

This page provides guidelines for designing a [high-quality extension][hq-guidelines] and Chrome Web Store listing. These recommendations may be updated as the store continues to grow and we learn from developers' experiences. We strongly encourage you to create extensions that meet standards for compliance, performance, security, and user experience, as described in the following sections.

## Compliance {: #compliance}

Extensions that are available in the Chrome Web Store are required to adhere to the [developer program policies][program-policies]. If you've received a policy violation warning or want to learn about common violations pitfalls, see [Troubleshooting Chrome Web Store violations][cws-violations].

## Manifest Version 3

Manifest V3 is the most recent version of the Chrome extension platform and is the required version for submitting new items to the Chrome Web Store. See the [Manifest V3 overview][mv3-overview] to learn about the platform changes. Existing extensions should consider migrating to Manifest V3, see [Migrate to Manifest V3][mv3-migration] for instructions on how to migrate.

## Security

Your extension should be safe for your users. For example, send user data securely via HTTPS or web services security. Check that your extension does not pose security threats and does not use [deceptive installation tactics][deceptive-install]. See [Stay secure][stay-secure] for a more information.

## Privacy

An extension is required to disclose in the [Privacy tab][privacy-tab] what user data it will collect and how it will handle user data. This information must be accurate, up-to-date, and match the extension's [privacy policy][privacy-policy]. For more guidance on privacy, see [Protecting User Privacy policies][user-privacy] and the [User Data FAQs][user-data].

## Performance and functionality {: #performance}

Add end-to-end tests using testing libraries like [Puppeteer][puppeteer] to make sure your extension is performing as intended from start to finish. In addition, consider conducting thorough manual testing across different browser versions, OSs, and network conditions to ensure smooth functionality.

## User experience {: #user-experience }

Design your extension with the user in mind by providing a simple, intuitive, and seamless user interface while also respecting user privacy.

### Onboarding experience

Start onboarding your users as soon as they reach your store listing by providing screenshots and a video of how the extension works. We recommend following the [permission warning guidelines][doc-perm-warn] to increase the chances of users installing your extension.

### Designing a persistent UI

Avoid distracting users when implementing a persistent UI. For example, when designing a [side panel][api-sidepanel] for your extension, make sure it enhances the user's browsing experience by providing relevant information and useful functionality. A side panel should help users accomplish tasks with as little distraction as possible.

### Sign in with Google {: #support-google-accounts }

If your extension requires user login, we recommend that you support [Sign in with Google][google-signin], which provides a good user experience for Chrome Web Store users as they are likely to be logged in already. If you already have a login system, consider correlating the Google Account ID to the user account in your system. You can use the [Chrome Identity API][identity-api] to support Google accounts in the following ways:


- Google OAuth2/OpenID: See [Identifying the User][identify-user].
- OAuth2: See [Authenticate users with Google][oauth2-tutorial].

## Store listing

The purpose of an extension's [Chrome Web Store store listing][completing-listing] is to set the user's expectations. It should explicitly communicate what the extension does. See [Listing requirements][cws-listing] for a complete list of requirements.

### Create a compelling store listing {: #create-a-compelling-store-listing }

The better your extension's store listing, the more users will discover and try your extension. [Creating a great listing page][great-listing-page] provides guidelines for designing the best store listing experience. When choosing your extension's name, writing its description, and designing its logo, keep in mind Google's [Branding guidelines][cws-branding].

### Provide great images {: #provide-great-images}

Include all the [required images][cws-images] (icon, tile, marquee, and screenshots). Images should not be blurry or too busy, as described in [Images of a high-quality listing][hq-listing-images].

### Choose your extension's category well {: #choose-category-well}

The developer console lets you specify a category for each extension. Choose the most appropriate category:

Accessibility
: Extensions designed to enhance the browsing experience for individuals with visual impairments, hearing loss, limited dexterity, and other disabilities. This may include tools like screen readers, dark mode extensions, or utilities that help with navigation, using keyboard shortcuts, voice commands, among others.

Art & Design
: These extensions provide tools for viewing, editing, organizing, and sharing images and photos. They may also offer features for capturing screenshots, image searching, and integrating with popular image hosting or editing services.

Communication
: Extensions that enable communications. This category covers a wide variety of things: composing and templating emails, email management, screen sharing, video conferencing apps and enhancements, and much more.

Developer Tools
: Extensions that help web developers perform tasks like debugging, performance analysis, code linting, and tools that enhance the browser's Dev Tools. For example, real-time HTML/CSS/JavaScript editing, API testing, and CSS inspection.

Education
: Extensions that teach or aid in teaching, including language learning, note-taking, teaching aids, and sign-language instruction, among others.

Entertainment
: These extensions are designed for fans of sports, music, television, and cinema.

Functionality & UI
: Extensions that enhance the Chrome user interface, such as tab managers, shortcut managers, and app launchers.

Games
: Extensions providing a wide array of desktop and arcade-style games.

Household
: Extensions for helping you around the house. This category includes recipe savers and managers, budgeting, product research, and more.

Just for Fun
: These extensions are designed for entertainment. They can include games, interesting new tab backgrounds, quirky widgets, jokes, trivia, and more.

News & Weather
: These extensions keep users informed about current events and weather conditions. They can collect news from multiple sources, present real-time weather updates, notify breaking news, and more.

Privacy & Security
: Extensions such as VPNs, password safes, and phishing deterrence.

Shopping
: These extensions aim to enhance the online shopping experience. They might offer features like price comparison, coupon finders, reviews and ratings, wish list management, and more.

Social Media & Networking
: These extensions are designed to enhance social media platforms. They can integrate with services and offer features like easy sharing, notifications, status updates, and more.

Tools
: Tools that don't fit into other categories

Travel
: Extensions for planning trips.

Well-being
: Extensions for self-help, mindfulness, and personal development.

Workflow & Planning
: Extensions to help users perform their tasks more efficiently. They could range from time trackers, tools to stay focused, to-do list managers, email organizers, document editors, and calendar utilities, among others.

### Category revisions {: #category-revisions }

In mid 2023 the categories changed. Most of the new categories match previous ones. Several were
replaced by multiple categories. If you previously used one of the replaced categories, use the
table below to decide which new category best suits your extension.

Fun
: * Entertainment
  * Games
  * Just for Fun

Photos
: * Art & Design

Productivity
: * Education
  * Functionality & UI
  * Household
  * Privacy & Security
  * Tools
  * Workflow & Planning

Social & Communications
: * Communication
  * Social Media & Networking
  * Travel
  * Well-being

[api-sidepanel]: /docs/extensions/reference/sidePanel/
[completing-listing]: /docs/webstore/cws-dashboard-listing/
[cws-branding]: /docs/webstore/branding
[cws-images]: /docs/webstore/images
[cws-listing]: /docs/webstore/program-policies/listing-requirements/
[cws-violations]: /docs/webstore/troubleshooting/
[dashboard-privacy]: /docs/webstore/cws-dashboard-privacy/
[deceptive-install]: /docs/webstore/program-policies/deceptive-installation-tactics/
[doc-perm-warn]: /docs/extensions/mv3/permission_warnings/
[google-signin]: https://developers.google.com/identity/gsi/web/guides/overview
[great-listing-page]: /docs/webstore/best_listing/
[hq-guidelines]: /docs/webstore/program-policies/quality-guidelines/
[hq-listing-images]: /docs/webstore/best_listing/#images
[identify-user]: /docs/webstore/identify_user
[identity-api]: /docs/extensions/reference/identity/
[mv3-migration]: https://developer.chrome.com/docs/extensions/migrating/
[mv3-overview]: /docs/extensions/mv3/intro/mv3-overview/
[oauth2-tutorial]: /docs/extensions/mv3/tut_oauth/
[privacy-policy]: /docs/webstore/publish/#setup-a-developer-account
[privacy-tab]: /docs/webstore/cws-dashboard-privacy/#certify-your-data-use-practices
[program-policies]: /docs/webstore/program-policies/
[puppeteer]: https://pptr.dev/guides/chrome-extensions
[stay-secure]: /docs/extensions/mv3/security/
[supplying-images]: /docs/webstore/images/
[user-data]: /docs/webstore/user_data/
[user-privacy]: /docs/webstore/program-policies/#protecting-user-privacy