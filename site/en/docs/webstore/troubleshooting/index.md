---
layout: "layouts/doc-post.njk"
title: "Troubleshooting Chrome Web Store violations"
#date: TODO
#updated: TODO
description: >
  Guidelines for understanding why an item was rejected or removed from the Chrome Web Store
  and how to fix the problem.
---

This page is provided to help you understand why an item was rejected or removed from the Chrome Web
Store, and to understand how you can rectify the problem.

Each section describes the issues that correspond to a particular category of violation.

## Excessive permissions {: #excessive-permissions }

Corresponds to notification ID: Purple Potassium

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][1]:

```text
Use of Permissions

Request access to the narrowest permissions necessary to implement your Product's features or
services. If more than one permission could be used to implement a feature, you must request those
with the least access to data or functionality.

Don't attempt to "future proof" your Product by requesting a permission that might benefit
services or features that have not yet been implemented.
```

This policy is to prevent excessive and unnecessary access to user data by extensions.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection }

- The extension is requesting a permission but not using it.
- The extension is requesting a permission that is not required to implement the functionality.

### How can you rectify this? {: #how-can-you-rectify-this }

- Remove any permission that is not being used.
- Request only the narrowest permission required to implement your extension's functionality.

## Missing or insufficient metadata {: #no-metadata }

Corresponds to notification ID: Yellow Zinc

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][2]:

```text
Content Policies

⋮

If your Product has a blank description field or is missing an icon or screenshots, it will be
rejected. If any of your Product's content, title, icon, description or screenshots contains false
or misleading information, we may remove it.
```

This policy is to ensure quality of the products on the Chrome Web Store and for users to know about
the product that they are downloading before they download.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_1 }

- The extension is missing an icon, title, screenshot or description.
- The extension's title is not meaningful.
- The extension's screenshots or description is not meaningful or doesn't explain the functionality
  adequately.

### How can you rectify this? {: #how-can-you-rectify-this_1 }

- Ensure the extension has a meaningful icon, title, screenshot and description.
- Clearly explain the extension's functionality through the screenshots and description.

## Deceptive behavior {: #deceptive-behavior }

Corresponds to notification ID: Red Nickel/Red Potassium/Red Silicon

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][3]:

```text
Impersonation or Deceptive Behavior:

Don't pretend to be someone else, and don't represent that your product is authorized by, endorsed
by, or produced by another company or organization, if that is not the case. Developers should not
divert users or provide links to any other site that mimics Chrome Web Store or passes itself off
as Chrome Web Store. Your Product and its user experience also must not mimic functionality or
warnings from a user's operating system or browser. Any changes to device settings must be made
with the user's knowledge and consent and be easily reversible by the user.

We do not allow Products which deceive or mislead users, including in the content, title,
description, or screenshots. Don't misrepresent the functionality of your Product or include
non-obvious functionality that doesn't serve the primary purpose of the product. Descriptions of
your Product must directly state the functionality so that users have a clear understanding of the
Product they are adding. For example, Products should not contain:

- Claimed functionalities which are not possible to implement (E.g. "Who has viewed your IG
  account")
- Developer or Product names which misrepresent their current status or performance on the Chrome
  Web Store (E.g. "Editor's Choice" or "Number One")

If your Product has a blank description field or is missing an icon or screenshots, it will be
rejected. If any of your Product's content, title, icon, description or screenshots contains false
or misleading information, we may remove it.
```

This policy is to prevent extensions that are deceiving or misleading the users.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_2 }

- The extension is not providing the functionality mentioned in the metadata (1)
- The extension a different functionality than what is mentioned in the metadata
- The extension is performing actions not mentioned in the metadata
- The extension is impersonating another entity (2)
- The extension is copying or copied from another entity
- The extension is pretending to be authorized by another entity

(1) Metadata means the title, icon description, or screenshot that is presented in the item's
information.

(2) An entity here means any company, organization, or extension.

### How can you rectify this? {: #how-can-you-rectify-this_2 }

- Ensure the functionality promised by your extension is working as intended.
- Clearly state the functionality of your extension in the metadata.
- Don't perform actions not mentioned in the metadata
- Don't pretend to be another entity
- Don't copy another extension. You may offer the same functionality as another extension but do not
  copy from other extensions.
- Don't pretend that your extension was endorsed, authorized or produced by another entity.

## User data policy - disclosure policy {: #udp-disclosure-policy }

Corresponds to notification ID: Purple Lithium

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][4]:

```text
Posting a Privacy Policy & Secure Transmission

If your Product handles personal or sensitive user data (including personally identifiable
information, financial and payment information, health information, authentication information,
website content and resources, form data, web browsing activity, user-provided content and
personal communications), then your Product must:

- Post a privacy policy, and
- Handle the user data securely, including transmitting it via modern cryptography.
```

The User Data Privacy policy is a broad category under which several other policies are gathered.
All of these policies have to do with the handling and transmission of sensitive information about
the user.

This policy applies to all extensions that collect user data. This particular section is to ensure
that users are aware of what data is collected, and how it is collected, used and shared.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_3 }

- The extension is collecting user data but has not provided a privacy policy.
- The privacy policy is not provided in the designated field—a common mistake here is providing
  the privacy policy in the description.
- The privacy policy URL is not working.
- The privacy policy is not accessible.
- The privacy policy URL is not leading to privacy policy.
- The privacy policy does not talk about user data collection, usage, handling or sharing.

### How can you rectify this? {: #how-can-you-rectify-this_3 }

- Add a valid, working and accessible link to your privacy policy in the designated field.
- Ensure the privacy policy talks about data collection, usage, handling and sharing.

## Illegal activities {: #illegal-activities }

Corresponds to notification ID: Grey Zinc

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][5]:

```text
Illegal Activities:

Keep it legal. Don't engage or promote unlawful activities in your Product, such as rape, illegal
sex work, or the sale of prescription drugs without a prescription. We will remove content which
promotes, glorifies, or encourages dangerous or illegal activity that may result in physical harm
to those involved.
```

This policy is to prevent the use of extensions and the Chrome Web Store as a platform for illegally
selling drugs

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_4 }

The extension is doing anything illegal. See the policy extract above for examples.

### How can you rectify this? {: #how-can-you-rectify-this_4 }

- If this is the primary functionality of your extension, there is no direct rectification. You
  should unpublish your extension.
- If this was an unintended functionality, then remove the content or services that are in violation
  and resubmit your extension.

## Online gambling {: #gambling }

Corresponds to notification ID: Grey Copper

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][6]:

```text
Gambling:

We don't allow content or services that facilitate online gambling, including but not limited to
online casinos, sports betting, lotteries, or games of skill that offer prizes of cash or other
value.
```

Do not post content or provide services that facilitate online gambling.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_5 }

- Providing online gambling on the extension
- Facilitating online gambling on other sites through the extension
- Directing users to an online gambling site
- Providing games of skill that offer prizes of cash or other value.

### How can you rectify this? {: #how-can-you-rectify-this_5 }

- If this is the primary functionality of your extension, then it is recommended to unpublish your
  extension.
- If this was an unintended functionality, then remove the content or services that are in violation
  and resubmit your extension.

## Pornographic content {: #pornography }

Corresponds to notification ID: Grey Lithium

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][7]:

```text
Sexually Explicit Material:

We don't allow content that contains nudity, graphic sex acts, sexually explicit material, or
content that drives traffic to commercial pornography sites. We also don't allow content that
promotes incest, bestiality, necrophilia, or non-concensual sexual acts. Google has a
zero-tolerance policy against child pornography. If we become aware of content with child
pornography, we will report it to the appropriate authorities and delete the Google Accounts of
those involved with the distribution.

Content which contains non-sexual nudity - such as artistic, educational, scientific, or cultural
nudity - is generally allowed, but may impact the visibility of your Product.
```

This policy is to prevent the use of extensions and the Chrome Web Store as a platform for
pornography.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_6 }

- The extension is displaying/providing the content mentioned in the policy.
- The extension is directing users to pornographic sites.

### How can you rectify this? {: #how-can-you-rectify-this_6 }

- If this is the primary functionality of your extension, then it is recommended to unpublish your
  extension.
- If this was an unintended functionality, then remove the content or services that are in violation
  and resubmit your extension.

## Hate content {: #hate }

Corresponds to notification ID: Grey Magnesium

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][8]:

```text
Hate Speech:

We don't allow content advocating against or inciting hatred towards groups of people based on
their race or ethnic origin, religion, disability, gender, age, veteran status, nationality,
sexual orientation, gender, gender identity, or any other characteristic that is associated with
systematic discrimination or marginalization.

Additionally, the visibility of your Product may be impacted if it contains generally hateful
content not covered by the above definition.
```

This policy is to prevent the use of extensions and the Chrome Web Store as a platform to spread
hateful content.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_7 }

Providing content or directing users to content that is hateful. You can find the definition of
hateful content in the policy text above

### How can you rectify this? {: #how-can-you-rectify-this_7 }

- If this is the primary functionality of your extension, then it is recommended to unpublish your
  extension.
- If this was an unintended functionality, then remove the content or services that are in violation
  and resubmit your extension.

## Not family safe {: #not-family-safe }

Corresponds to notification ID: Grey Nickel

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][9]:

```text
Content Policies:

Our content policies apply to your Product's content, including any ads it shows to users and any
user-generated content it hosts or links to. Further, they apply to any content from your
developer account that is publicly displayed in Chrome Web Store, including your developer name
and the landing page of your listed developer website. Products that include content that may not
be suitable for all ages should be marked "Mature" on the Developer Dashboard.
```

This policy is to prevent non-family-safe content from reaching an inappropriate audience.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_8 }

The extension has content that is not suitable for audience of all ages and the extension has not
been marked 'Mature'.

### How can you rectify this? {: #how-can-you-rectify-this_8 }

Remove the content that is in violation or mark the extension as 'Mature' in your developer
dashboard and resubmit the extension.

## Violent content {: #violence }

Corresponds to notification ID: Grey Potassium

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][10]:

```text
Violent or Bullying Behavior:

Depictions of gratuitous violence are not allowed. Products should not contain materials that
threaten, harass, or bully other users. For example, Products should not contain:

- Content which makes a specific threat of serious harm against an individual person or a defined
  group of people.
- Content whose predominant purpose is to single out another person for abuse, malicious attack,
  or ridicule.
- Content that results in the unwanted sexualization of a person, including malicious claims about
  a person's sexual activities, sexual orientation, or gender identity.
- A series of posts/comments/photos that, taken together, clearly have the primary intention of
  harassment, even if each individual piece of content is not severe.
```

This policy is to prevent the use of extensions and the Chrome Web Store as a platform to spread the
content mentioned in the policy text above

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_9 }

The extension contains content or is directing users to content mentioned in the policy text above

### How can you rectify this? {: #how-can-you-rectify-this_9 }

- If this is the primary functionality of your extension, then it is recommended to unpublish your
  extension.
- If this was an unintended functionality, then remove the content or services that are in violation
  and resubmit your extension.

## Single purpose {: #single-use }

Corresponds to notification ID: Red Magnesium/Red Copper/Red Lithium

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][11]:

```text
Extensions Quality Guidelines

An extension must have a single purpose that is narrow and easy-to-understand. Do not create an
extension that requires users to accept bundles of unrelated functionality. If two pieces of
functionality are clearly separate, they should be put into two different extensions, and users
should have the ability to install and uninstall them separately. Common violations include:

- Functionality that displays product ratings and reviews, but also injects ads into web pages.
- Toolbars that provide a broad array of functionality or entry points into services are better
  delivered as separate extensions, so that users can select the services they want.
- Email notifiers combined with a news aggregator.
- PDF converters which also aim to change a users default search engine.
```

This policy is aimed at maintaining the quality of extensions on the Chrome Web Store. As mentioned
in the policy text, if there are multiple unrelated functionalities, they should be provided in
separate extensions.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_10 }

- The extension is providing 2 or more functionalities in the same extension
- Injecting ads is also considered as a separate functionality.
- The extension is providing one or more unrelated additional functionalities using the browser
  action icon.

### How can you rectify this? {: #how-can-you-rectify-this_10 }

- Narrow the functionality of your extension to just one and ensure it is clearly described in your
  extension's metadata.
- If your extension is offering a primary functionality and also injecting ads, then remove the
  primary functionality or stop injecting ads.
- Don't offer another unrelated functionality in the browser action icon.

## User data policy - prominent disclosure {: #udp-prominent-disclosure }

Corresponds to notification ID: Purple Nickel

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][12]:

```text
Prominent Disclosure Requirement

If your Product handles personal or sensitive user data that is not closely related to
functionality described prominently in the Product's Chrome Web Store page and user interface,
then prior to the collection, it must:

- Prominently disclose how the user data will be used, and
- Obtain the user's affirmative consent for such use
```

The User Data Privacy policy is a broad category under which several other policies are gathered.
All of these policies have to do with the handling and transmission of sensitive information about
the user.This policy applies to extensions that collect data that is not closely related to
functionality described prominently in the Product's Chrome Web Store page. This particular section
is to ensure that users are aware of the data that is being collected and that user consent is
obtained before data collection.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_11 }

- The extension is not prominently disclosing how the user data is being used.
- User consent is not obtained before data collection

### How can you rectify this? {: #how-can-you-rectify-this_11 }

- Prominently disclose to the user what data is being collected and how it will be handled.
- Ensure data is collected only if the user consents to it.

## User data policy - secure transmission {: #udp-secure }

Corresponds to notification ID: Purple Copper

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][13]:

```text
Posting a Privacy Policy & Secure Transmission

If your Product handles personal or sensitive user data (including personally identifiable
information, financial and payment information, health information, authentication information,
website content and resources, form data, web browsing activity, user-provided content and
personal communications), then your Product must:

- Post a privacy policy, and
- Handle the user data securely, including transmitting it via modern cryptography.
```

The User Data Privacy policy is a broad category under which several other policies are gathered.
All of these policies have to do with the handling and transmission of sensitive information about
the user.This particular section is to ensure that user data is being handled securely.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_12 }

- The extension is not transmitting user data securely.
- The data is being transmitted to an unsecure domain

### How can you rectify this? {: #how-can-you-rectify-this_12 }

Simple. Ensure secure transmission of data: _Don't transmit data over HTTP_ Don't encode data in
headers, query parameters, or message bodies even over HTTPS.Tip: Use the Chrome DevTools or any
other Dev Tool to watch the network requests the extension makes.

## User data policy - other requirements {: #udp-other-requirements }

Corresponds to notification ID: Purple Magnesium

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][14]:

```text
Other Requirements

The following types of personal or sensitive user data are also subject to additional
requirements:

- Financial or Payment Information—Don't publicly disclose financial or payment information
- Authentication Information—Don't publicly disclose authentication information
- Web Browsing Activity—Collection and use of web browsing activity is prohibited except to the
  extent required for a user-facing feature described prominently in the Product's Chrome Web
  Store page and in the Product's user interface.
```

The User Data Privacy policy is a broad category under which several other policies are gathered.
All of these policies have to do with the handling and transmission of sensitive information about
the user.

This particular section is to ensure that no sensitive information is being collected unnecessarily
and is not disclosed publicly.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_13 }

- The extension is collecting Web Browsing Activity when it is not needed for a user facing feature.
- Sensitive user information collected using the extension is being disclosed publicly.

### How can you rectify this? {: #how-can-you-rectify-this_13 }

- Don't collect Web Browsing Activity unless it is required for a user-facing feature.
- Ensure user information is not being disclosed publicly

## Cryptocurrency mining {: #cryptocurrency-mining }

Corresponds to notification ID: Grey Silicon

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][15]:

```text
Prohibited Products:

We don't allow Products or services that:

- Facilitate unauthorized access to content on websites, such as circumventing paywalls or login
  restrictions
- Encourage, facilitate, or enable the unauthorized access, download, or streaming of copyrighted
  content or media
- Mine cryptocurrency
```

This policy is to prevent the use of extensions and the Chrome Web Store as a platform to mine
cryptocurrencies.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_14 }

- The extension is mining cryptocurrencies on user machines.
- The extension is providing the functionality to mine cryptocurrencies

### How can you rectify this? {: #how-can-you-rectify-this_14 }

- If this is the primary functionality of your extension, then it is recommended to unpublish your
  extension.
- If this was an unintended functionality, then remove the content or services that are in violation
  and resubmit your extension.

## Prohibited products {: #prohibited-products }

Corresponds to notification ID: Blue Zinc/Blue Copper/Blue Lithium/Blue Magnesium

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][16]:

```text
Prohibited Products:

We don't allow Products or services that:

- Facilitate unauthorized access to content on websites, such as circumventing paywalls or login
  restrictions
- Encourage, facilitate, or enable the unauthorized access, download, or streaming of copyrighted
  content or media
- Mine cryptocurrency
```

This policy is to prevent the use of extensions and the Chrome Web Store as a platform to provide
access to content protected by paywalls, login restrictions or intellectual property rights.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_15 }

- The extension is providing access to content behind a paywall.
- The extension is providing access to content behind login restrictions.
- The extension is facilitating download of YouTube videos.
- The extension is facilitating download of content that is in violation of the content owner's
  intellectual property rights.

### How can you rectify this? {: #how-can-you-rectify-this_15 }

- If this is the primary functionality of your extension, then it is recommended to unpublish your
  extension.
- If this was an unintended functionality, then remove the content or services that are in violation
  and resubmit your extension.

## Keyword stuffing {: #keyword-stuffing }

Corresponds to notification ID: Yellow Argon

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][17]:

```text
Spam & Placement in the Store

Keyword Spam: We don't allow extensions with misleading, improperly formatted, non-descriptive,
irrelevant, excessive, or inappropriate metadata, including but not limited to the extension's
description, developer name, title, icon, screenshots, and promotional images. Developers must
provide a clear and well-written description. We also don't allow unattributed or anonymous user
testimonials in the app's description.
```

This policy is to ensure quality of the products on the Chrome Web Store and prevent products from
manipulating their placement in the Store

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_16 }

The extension is having excessive, irrelevant or inappropriate keywords in the metadata, more
commonly, the description.

### How can you rectify this? {: #how-can-you-rectify-this_16 }

Remove the content (keywords) that are in violation of the policy.

### Examples {: #examples }

The following are examples of this type of violation:

- Including in an extension's metadata a long list of the different sites on which the extension
  works.

## Redirection {: #redirection }

Corresponds to notification ID: Yellow Lithium

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][18]:

```text
Spam & Placement in the Store

Functionality: Do not post an extension with a single purpose of installing or launching another
app, theme, webpage, or extension.
```

This policy is to ensure quality of the products on the Chrome Web Store and prevent products from
manipulating their placement in the Store

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_17 }

The only functionality of the extension is to launch another app, theme, webpage, or extension.

### How can you rectify this? {: #how-can-you-rectify-this_17 }

As mentioned in the policy, such extensions are not allowed on the Store and it is recommended to
unpublish them.

## Functionality not working {: #does-not-work }

Corresponds to notification ID: Yellow Magnesium

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][19]:

```text
Spam & Placement in the Store

Functionality: Do not post an extension with a single purpose of installing or launching another
app, theme, webpage, or extension. Extensions with broken functionality - such as dead sites or
non-functioning features - are not allowed.
```

This policy is to ensure quality of the products on the Chrome Web Store.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_18 }

The extension is not providing the promised functionality.

### How can you rectify this? {: #how-can-you-rectify-this_18 }

Ensure all components of the extension are working as intended and as mentioned in the extension
listing.

## Spam {: #spam }

Corresponds to notification ID: Yellow Nickel

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][20]:

```text
Spam & Placement in the Store

Repetitive Content: We don't allow any developer or their affiliates to submit multiple extensions
that provide duplicate experiences or functionality on the Chrome Web Store.

User Ratings, Reviews, and Installs: Developers must not attempt to manipulate the placement of
any extensions in the Chrome Web Store. This includes, but is not limited to, inflating product
ratings, reviews, or install counts by illegitimate means, such as fraudulent or incentivized
downloads, reviews and ratings.

Notification Abuse: We do not allow extensions that abuse, or are associated with abuse, of
notifications by sending spam, ads, promotions, phishing attempts, or unwanted messages that harm
the user's browsing experience.

Message Spam: We don't allow extensions that send messages on behalf of the user without giving
the user the ability to confirm the content and intended recipients.

In addition to these requirements, all extensions must comply with Google's Webmaster Quality
Guidelines.
```

This policy is to ensure quality of the products on the Chrome Web Store. The Spam policy is to
prevent extensions that are harmful for the user's browsing experience and extensions that
manipulate their placement on the Chrome Web Store.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_19 }

- You or your affiliates are submitting multiple extensions that provide duplicate experiences or
  functionality.
- You are manipulating the extension's reviews, ratings or installs data.
- The extension is showing notifications to the user in a way that is disruptive or harmful to the
  user's browsing experience.
- The extension is sending messages on behalf of the user without the user's consent.

### How can you rectify this? {: #how-can-you-rectify-this_19 }

- Don't submit multiple extensions with duplicate experiences or functionality.
- Don't try to manipulate the user generated content on your extension's Web Store listing
- Don't harm the user's browsing experience in any way.

## Circumvents the overrides API {: #circumvents-api-ntp }

Corresponds to notification ID: Blue Nickel/Blue Potassium

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][21]:

```text
API Use

Extensions must use existing Chrome APIs for their designated use case. Use of any other method,
for which an API currently exists, would be considered a violation. For example, overriding the
Chrome New Tab Page through any means other than the URL Overrides API is not permitted.
```

This policy is to ensure quality of the products on the Chrome Web Store.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_20 }

- The extension is modifying the Chrome New Tab Page but not using the Overrides API.
- The extension is modifying the Omnibox Search but not using the Overrides API.

### How can you rectify this? {: #how-can-you-rectify-this_20 }

- Do not modify the Chrome New Tab Page or do so using the Overrides API.
- Do not modify the Omnibox Search or do so using the Overrides API.

## Deceptive installation {: #uws-distribution }

Corresponds to notification ID: Red Zinc

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][22]:

```text
Deceptive Installation Tactics

Extensions must be marketed responsibly. Extensions that use or benefit from deceptive
installation tactics will be removed from the Chrome Web Store.

- Deceptive installation tactics include:
- Unclear or inconspicuous disclosures on marketing collateral preceding the Chrome Web Store
  Product listing.
- Misleading interactive elements as part of your distribution flow. This includes misleading
  call-to-action buttons or forms that imply an outcome other than the installation of an
  extension.
- Adjusting the Chrome Web Store Product listing window with the effect of withholding or hiding
  extension metadata from the user.
```

This policy is to ensure users are not deceived into installing extensions.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_21 }

- Unclear or inconspicuous disclosures on marketing collateral preceding the Chrome Web Store
  Product listing.
- Misleading interactive elements as part of your distribution flow. This includes misleading
  call-to-action buttons or forms that imply an outcome other than the installation of an extension.
- Adjusting the Chrome Web Store Product listing window with the effect of withholding or hiding
  extension metadata from the user.

### How can you rectify this? {: #how-can-you-rectify-this_21 }

Publish a new extension that does not employ deceptive methods to market to users or to gather a
user base.

## Obfuscation {: #obfuscation }

Corresponds to notification ID: Red Titanium

This section explains discusses extensions that are in violation of the following section of the
Chrome Web Store [developer program policies][23]:

```text
Code Readability Requirements:

Developers must not obfuscate code or conceal functionality of their extension. This also applies
to any external code or resource fetched by the extension package.
```

This policy is to ensure the quality of the extensions and code submitted to the Chrome Web Store.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_22 }

Using obfuscated code in the extension package.

### How can you rectify this? {: #how-can-you-rectify-this_22 }

Publish a new extension that does not employ deceptive methods to market to users or to gather a
user base.

### Examples {: #examples_1 }

The following are some examples of violations of this type of policy:

- Base 64 encoding
- Character encoding

[1]: /docs/webstore/program_policies
[2]: /docs/webstore/program_policies
[3]: /docs/webstore/program_policies
[4]: /docs/webstore/program_policies
[5]: /docs/webstore/program_policies
[6]: /docs/webstore/program_policies
[7]: /docs/webstore/program_policies
[8]: /docs/webstore/program_policies
[9]: /docs/webstore/program_policies
[10]: /docs/webstore/program_policies
[11]: /docs/webstore/program_policies
[12]: /docs/webstore/program_policies
[13]: /docs/webstore/program_policies
[14]: /docs/webstore/program_policies
[15]: /docs/webstore/program_policies
[16]: /docs/webstore/program_policies
[17]: /docs/webstore/program_policies
[18]: /docs/webstore/program_policies
[19]: /docs/webstore/program_policies
[20]: /docs/webstore/program_policies
[21]: /docs/webstore/program_policies
[22]: /docs/webstore/program_policies
[23]: /docs/webstore/program_policies
