---
layout: "layouts/doc-post.njk"
title: "Troubleshooting Chrome Web Store violations"
date: 2020-11-16
updated: 2023-04-21
description: >
  Guidelines for understanding why an item was rejected or removed from the Chrome Web Store
  and how to fix the problem.
---

This page is provided to help you understand why your extension was rejected or removed from the
Chrome Web Store and how you can fix the violation.

Each section in this document describes the issues that correspond to a particular category of
violation. In order to make it easier to reference specific violations, the Chrome Web Store assigns
each violation a human-readable ID. These IDs are composed of two words: a color and an element. For
example, Yellow Magnesium corresponds to the general class of errors where the extension does not
behave as expected.

## Functionality not working {: #does-not-work }

Corresponds to notification ID: `Yellow Magnesium`

The intent of this policy is to ensure a minimum quality level for all items published in the Chrome
Web Store. Extensions should provide the functionality described in their listings and, if they
cannot, communicate that to the user.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_18 }

- Your item has packaging errors. Examples:
    - There are files mentioned in your manifest that are not present in your package. This is most
      commonly seen with image files.
    - The path or name of the files mentioned in your package are incorrect
- A functionality in your item is not working due to a server side issue at the time of reviewing.
- Your item is just not functioning as it expected based on the item's listing.

### How can you rectify this? {: #how-can-you-rectify-this_18 }

- Test the code that you submit to the web store locally.
    - Test the exact files that you submit to the web store, not just a local development version of
      your extension. This may mean extracting resources from the package that you submitted.
    - Unpacked and packed extensions can have different behaviors. Make sure that Chrome loads a
      packed version of your extension as expected by manually [packing your
      extension][docs-pack-extension] and dragging the generated .crx file onto the
      chrome://extensions page.
- Verify that your submission contains the files you expect at the paths you expect.
    - Ensure that all the files mentioned in your `manifest.json` are present in the package and
      their names and paths are correct.
    - Check for [case sensitivity][wiki-case-sensitivity] bugs. For example, say your background
      script was named  `Background.js`, but your manifest.json references  `background.js`. Some
      file systems will treat these as the same file while others will treat them as two distinct
      files, causing Chrome to error when loading the extension.
- Make sure that your extensions clearly communicate error conditions to the user.
    - It should be as obvious as possible for new users to understand how your extension works and
      verify it's behaving correctly.
    - If your extension requires an account or special network environment, make sure that
      requirement is communicated to the user. If these conditions are not met, consider ways that
      you can make the user aware that the extension will not work as expected.
    - Test your experience on an unreliable internet connection (e.g. [lie-fi][lie-fi]). The
      extension's UI should gracefully handle request timeouts, HTTP 400 and 500 errors, certificate
      timeouts, and other such error conditions.
- If you cannot determine why the reviewer thought that your extension was not working as expected,
  [contact developer support][dev-support] to request more information about the rejection.
    - In some cases, reviewers may encounter issues you cannot reproduce. Use the [developer support
      contact form][dev-support] to request clarification about what features or user flows did not
      behave as expected.

### Relevant policy {: #does-not-work-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-functionality]:

{% Aside %}

**Spam & Placement in the Store**

**Functionality:** Do not post an extension with a single purpose of installing or launching another
app, theme, webpage, or extension. Extensions with broken functionality—such as dead sites or
non-functioning features—are not allowed.

{% endAside %}

## Excessive permissions {: #excessive-permissions }

Corresponds to notification ID: `Purple Potassium`

The intent of this policy is to prevent excessive and unnecessary access to user data by extensions.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection }

- The extension is requesting a permission but not using it.
- The extension is requesting a permission that is not required to implement the functionality the
  extension provides.

### Commonly misunderstood permissions {: #misunderstood-perms }

#### activeTab {: #misunderstood-perms-activetab }

This permission grants temporary access to a tab in response to a user invoking your extension. It
DOES NOT grant passive access to the user's currently focused tab.

- **When is it required?**
    - When you need temporary access to a tab after the user invokes your extension.
- **When is it NOT required?**
    - When the extension has access to broad host permissions or host permissions for the specific
      domains that are relevant to the extension's operations.
    - When using methods on the [action][api-action], [browserAction][api-browser-action],
      [pageAction][api-page-action] APIs. These APIs can use activeTab to grant temporary host
      permissions for the currently focused tab, but they do not need activeTab to function.
    - When using [tabs.sendMessage][api-tabs-sendmessage] to send a message to a specific tab.
    - For basic use of [tabs.query][api-tabs-query], such as querying [the user's current
      tab][api-tabs-get-current-tab].

#### tabs {: #misunderstood-perms-tabs }

This permission ONLY grants access to the `url`, `pendingUrl`, `title`, or `favIconUrl` properties
of Tab objects.

- **When is it required?**
    - When an extension does not have broad host access, but needs to be able to read sensitive data
      like the URL of an arbitrary tab.
- **When is it NOT required?**
    - When using methods on the [tabs][api-tabs] API.
    - When the extension has access to broad host permissions. Host permissions grant the extension
      access to the same data as well as other capabilities.

#### cookies {: #misunderstood-perms-cookies }

This exposes the [chrome.cookies][api-cookies] API and allows the extension to modify cookies on
origins that it has host permissions to access.

- **When is it required?**
    - When accessing [chrome.cookies][api-cookies] from the extension's [background
      context][docs-service-workers] or in another context using the extension's origin such as an
      extension's popup.
    - When using [chrome.cookies][api-cookies] to interact with detailed cookie data, such as
      [SameSite][mdn-samesite-cookie] values.
- **When is it NOT required?**
    - When using [`document.cookie`][mdn-document-cookie] or the [Cookie Store
      API][mdn-cookie-store].

#### storage {: #misunderstood-perms-storage }

The storage permission exposes the [chrome.storage][api-storage] API to the extension.

- **When is it required?**
    - When using the [chrome.storage][api-storage] API.
- **When is it NOT required?**
    - When using the [Web Storage API][mdn-web-storage] (`document.localStorage`,
      `document.sessionStorage`) or [IndexedDB][mdn-indexeddb].

### How can you rectify this? {: #how-can-you-rectify-this }

- Review the list of [commonly misunderstood permissions][section-misunderstood-perms] to see if you
  have committed one of the mistakes listed there.
- Request only the narrowest permission required to implement your extension's functionality.
- Remove all unused permissions from your manifests.json's `permissions`, `optional_permissions`,
  and `host_permissions` arrays.
- If the message from review does not contain enough information to determine which permissions were
  considered excessive, [contact developer support][dev-support] to request more information about
  the rejection.
- If the reviewer indicated that your extension did not use a given permission but you believe it
  does, [contact developer support][dev-support] to appeal the decision and to provide a detailed
  explanation of why the permission is necessary and how it is used.

### Relevant policy {: #excessive-permissions-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-permissions]:

{% Aside %}

**Use of Permissions**

Request access to the narrowest permissions necessary to implement your Product's features or
services. If more than one permission could be used to implement a feature, you must request those
with the least access to data or functionality.

Don't attempt to "future proof" your Product by requesting a permission that might benefit services
or features that have not yet been implemented.

{% endAside %}

## Missing or insufficient metadata {: #no-metadata }

Corresponds to notification ID: `Yellow Zinc`

The intent of this policy is to ensure a basic quality level of all items in the Chrome Web Store.
Users should be able to understand what features and functionality an item provides based on its
listing before they choose to install it. Items that misrepresent their capabilities or fail to
disclose important information may be subject to enforcement action.

### Common reasons for removal/rejection

- The extension is missing an icon, title, screenshot, or description.
- The extension's title is not meaningful or is misleading.
- The extension's screenshots or description is not meaningful or doesn't adequately explain the
  functionality it provides.

### How can you rectify this?

- Ensure the extension has a meaningful icon, title, screenshots, and description.
- Clearly explain the extension's functionality in the description and screenshots.
    - List all major features the extension provides.
- Review the rectification guidance in the [Functionality not working][section-does-not-work]
  section.

### Relevant policy

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-impersonation]:

{% Aside %}

**Content Policies**

Impersonation or Deceptive Behavior:

: If your product has a blank description field or is missing an icon or screenshots, it will be
  rejected. If any of your product's content, title, icon, description, or screenshots contains
  false or misleading information, we may remove it.

{% endAside %}

## Deceptive behavior {: #deceptive-behavior }

Corresponds to notification IDs: `Red Nickel`, `Red Potassium`, and `Red Silicon`

The intent of this policy is to prevent extensions from deceiving or misleading the users.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_2 }

- The extension does not provide the functionality described in the metadata<sup>1</sup>.
- The extension provides different functionality than what is described in the metadata<sup>1</sup>.
- The extension performs actions not mentioned in the metadata<sup>1</sup>.
- The extension impersonates another entity<sup>2</sup>.
- The extension copies or is copied from another entity<sup>2</sup>.
- The extension pretends to be authorized by another entity<sup>2</sup>.

<sup>1</sup> Metadata means the title, icon, description, screenshots, and other developer-provided
information specified in the developer dashboard.

<sup>2</sup> An entity here means any company, organization, or extension.

### How can you rectify this? {: #how-can-you-rectify-this_2 }

- Ensure the functionality promised by your extension is working as intended.
- Clearly state the functionality of your extension in the metadata.
- Do not perform actions not mentioned in the metadata.
- Do not pretend to be another entity.
- Do not copy another extension. You may offer the same functionality as another extension but do
  not copy from other extensions.
- Do not pretend that your extension was endorsed, authorized or produced by another entity.

### Relevant policy {: #deceptive-behavior-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-impersonation]:

{% Aside %}

**Content Policies**

Impersonation or Deceptive Behavior:

: Don't pretend to be someone else, and don't represent that your product is authorized by, endorsed
  by, or produced by another company or organization, if that is not the case.

: Developers should not divert users or provide links to any other site that mimics the Chrome Web
  Store or passes itself off as the Chrome Web Store. Your Product and its user experience also must
  not mimic functionality or warnings from a user's operating system or browser.

: Any changes to device settings must be made with the user's knowledge and consent and be easily
  reversible by the user.

: We do not allow products that deceive or mislead users, including in the content, title,
  description, or screenshots.

: Don't misrepresent the functionality of your product or include non-obvious functionality that
  doesn't serve the primary purpose of the product. Descriptions of your product must directly state
  the functionality so that users have a clear understanding of the product they are adding. For
  example, products should not contain:

  - Claimed functionalities that are not possible to implement (e.g. "Who has viewed your social
    media account") or which are not directly provided by the extension (e.g. file converters which
    only link to other file conversion services)
  - Any metadata that misrepresents the extension's or developer's current status or performance on
    the Chrome Web Store (e.g. "Editor's Choice" or "Number One")

: If your product has a blank description field or is missing an icon or screenshots, it will be
  rejected. If any of your product's content, title, icon, description, or screenshots contains
  false or misleading information, we may remove it.

{% endAside %}

## User data policy - disclosure policy {: #udp-disclosure-policy }

Corresponds to notification ID: `Purple Lithium`

The User Data Privacy policy is a broad category under which several other policies are gathered.
All of these policies have to do with the handling and transmission of sensitive information about
the user.

This policy applies to all extensions that collect user data. This particular section is to ensure
that users are aware of what data is collected, and how it is collected, used, and shared.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_3 }

- The extension is collecting user data but has not provided a privacy policy.
- The privacy policy is not provided in the designated field—a common mistake here is providing the
  privacy policy in the description.
- The privacy policy URL is not working.
- The privacy policy is not accessible.
- The privacy policy URL is not leading to privacy policy.
- The privacy policy does not talk about user data collection, usage, handling or sharing.

### How can you rectify this? {: #how-can-you-rectify-this_3 }

- Add a valid, working and accessible link to your privacy policy [in the designated
  field][docs-publish-setup].
    - Visit the Chrome Web Store item listing for your extension to verify that a privacy policy
      link appears in the "Additional Information" box and that the link works as expected.
- Ensure the privacy policy talks about data collection, usage, handling, and sharing.
- If you have done the above but are still encountering review issues, [contact developer
  support][dev-support] to request clarification or appeal the verdict.

### Relevant policy {: #udp-disclosure-policy-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-privacy-policy]:

{% Aside %}

**Personal or Sensitive User Data**

Posting a Privacy Policy & Secure Transmission

: If your Product handles personal or sensitive user data (including personally identifiable
  information, financial and payment information, health information, authentication information,
  website content and resources, form data, web browsing activity, user-provided content and
  personal communications), then your Product must:

  - Post a privacy policy, and
  - Handle the user data securely, including transmitting it via modern cryptography.

{% endAside %}

## Illegal activities {: #illegal-activities }

Corresponds to notification ID: `Grey Zinc`

The intent of this policy is to prevent the use of extensions and the Chrome Web Store to promote or
participate in illegal activities.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_4 }

The extension is doing anything illegal. See the policy extract for specific examples.

### How can you rectify this? {: #how-can-you-rectify-this_4 }

- If this is the primary functionality of your extension, there is no direct rectification. You
  should unpublish your extension.
- If this was an unintended functionality, then remove the content or services that are in violation
  and resubmit your extension.
- If you would like more information about why this verdict was applied to your extension,
  [developer support][dev-support] may be able to provide you with further details.

### Relevant policy {: #illegal-activities-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-illegal-activities]:

{% Aside %}

**Content Policies**

Illegal Activities:

: Keep it legal. Don't engage in or promote unlawful activities in your product, such as rape,
  illegal sex work, or the sale of prescription drugs without a prescription.. We will remove
  content which promotes, glorifies, or encourages dangerous or illegal activity that may result in
  physical harm to those involved.

{% endAside %}

## Online gambling {: #gambling }

Corresponds to notification ID: `Grey Copper`

Do not post content or provide services that facilitate online gambling.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_5 }

- Providing online gambling within an extension.
- Facilitating online gambling on other sites through the extension.
    - For example, providing functionality to calculate the odds of a bet on a gambling site. While
      this extension does not directly allow the user to gamble, it does facilitate online gambling.
- Directing users to an online gambling site.
- Providing games of skill that offer prizes of cash or other value.

### How can you rectify this? {: #how-can-you-rectify-this_5 }

- If this is the primary functionality of your extension, then it is recommended to unpublish your
  extension.
- If this was an unintended functionality, then remove the content or services that are in violation
  and resubmit your extension.

### Relevant policy {: #gambling-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-gambling]:

{% Aside %}

**Content Policies**

Gambling:

: We don't allow content or services that facilitate online gambling, including but not limited to
  online casinos, sports betting, lotteries, or games of skill that offer prizes of cash or other
  value.

{% endAside %}

## Pornographic content {: #pornography }

Corresponds to notification ID: `Grey Lithium`

The intent of this policy is to prevent the use of extensions and the Chrome Web Store as a platform
for pornography.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_6 }

- The extension itself contains sexually explicit material.
- The extension is displaying or providing sexually explicit material.
- The extension is directing users to pornographic sites.
- The extension is primarily meant to enhance sites that provide sexually explicit material.

### How can you rectify this? {: #how-can-you-rectify-this_6 }

- If the primary purpose of your extension is to provide access to sexually explicit material or
  enhance pornographic sites, you should unpublish your extension; such extensions are not allowed
  on the Chrome Web Store.
- If this was an unintended functionality, then remove the content or services that are in violation
  and resubmit your extension.
- Make sure that your extension does not contain sexually explicit images, video, text, etc.
- If your extension provides integrations with adult-oriented sites, make sure that the "Mature
  content" flag is enabled for your extension in the [developer dashboard][mature-content].

### Relevant policy {: #pornography-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-sexually-explicit]:

{% Aside %}

**Content Policies**

Sexually Explicit Material:

: We don't allow content that contains nudity, graphic sex acts, sexually explicit material, or
  content that drives traffic to commercial pornography sites. We also don't allow content that
  promotes incest, bestiality, necrophilia, or non-consensual sexual acts. Google has a
  zero-tolerance policy against child pornography. If we become aware of content with child
  pornography, we will report it to the appropriate authorities and delete the Google Accounts of
  those involved with the distribution. Content which contains non-sexual nudity - such as artistic,
  educational, scientific, or cultural nudity - is generally allowed, but may impact the visibility
  of your Product.

{% endAside %}

## Hate content {: #hate }

Corresponds to notification ID: `Grey Magnesium`

The intent of this policy is to prevent the use of extensions and the Chrome Web Store as a platform
to spread hateful content.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_7 }

- Providing content or directing users to content that is considered hate speech. See the policy
  text for additional details.

### How can you rectify this? {: #how-can-you-rectify-this_7 }

- If promotion or distribution of hate speech is a primary feature  of your extension, then you
  should unpublish the extension as such content is not permitted in the Chrome Web Store.
- If your extension provides access to user-generated content, you must ensure that you have content
  moderation in place to prevent users from sharing hate speech.
- If your extension contains functionality intended to draw negative attention to an individual's
  membership in one of the groups outlined in the policy text, you should remove this functionality
  from your extension.

### Relevant policy {: #hate-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-hate-speech]:

{% Aside %}

**Content Policies**

Hate Speech:

: We don't allow content advocating against or inciting hatred towards groups of people based on
  their race or ethnic origin, religion, disability, gender, age, veteran status, nationality,
  sexual orientation, gender, gender identity, or any other characteristic that is associated with
  systematic discrimination or marginalization.

  Additionally, the visibility of your Product may be impacted if it contains generally hateful
  content not covered by the above definition.

{% endAside %}

## Not family safe {: #not-family-safe }

Corresponds to notification ID: `Grey Nickel`

The intent of this policy is to prevent non-family-safe content from reaching an inappropriate
audience.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_8 }

- The extension has content that is not suitable for audiences of all ages and the extension has not
  been marked 'Mature'.

### How can you rectify this? {: #how-can-you-rectify-this_8 }

- Either remove the violating content or mark the extension as containing "Mature content" in your
  [developer dashboard][mature-content] and resubmit the extension.

### Relevant policy {: #not-family-safe-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-content-policies]:

{% Aside %}

**Content Policies:**

Our content policies apply to your Product's content, including any ads it shows to users and any
user-generated content it hosts or links to. Further, they apply to any content from your developer
account that is publicly displayed in Chrome Web Store, including your developer name and the
landing page of your listed developer website. Products that include content that may not be
suitable for all ages should be marked "Mature" on the [Developer Dashboard][mature-content].

{% endAside %}

## Violent content {: #violence }

Corresponds to notification ID: `Grey Potassium`

The intent of this policy is to prevent the use of extensions and the Chrome Web Store as a platform
to spread the content mentioned in the relevant policy text.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_9 }

- The extension contains content or is directing users to content mentioned in the policy text,

### How can you rectify this? {: #how-can-you-rectify-this_9 }

- If providing access to violent or bullying content is one of the primary features of your
  extension, unpublish the extension; such extensions are not permitted in the Chrome Web Store.
- If this was an unintended functionality, then remove the content or services that are in violation
  and resubmit your extension.

### Relevant policy {: #violence-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-bullying]:

{% Aside %}

**Content Policies**

Violent or Bullying Behavior:

: Depictions of gratuitous violence are not allowed. Products should not contain materials that
  threaten, harass, or bully other users. For example, Products should not contain:

  - Content which makes a specific threat of serious harm against an individual person or a defined
    group of people.
  - Content whose predominant purpose is to single out another person for abuse, malicious attack,
    or ridicule. Content that results in the unwanted sexualization of a person, including malicious
    claims about a person's sexual activities, sexual orientation, or gender identity.
  - A series of posts/comments/photos that, taken together, clearly have the primary intention of
    harassment, even if each individual piece of content is not severe.

{% endAside %}

## Single purpose {: #single-use }

Corresponds to notification IDs: `Red Magnesium`, `Red Copper`, and `Red Lithium`

This policy is aimed at maintaining the quality of extensions on the Chrome Web Store. As mentioned
in the policy text, if there are multiple unrelated functionalities, they should be provided in
separate extensions.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_10 }

- The extension provides two or more purposes in the same extension (for example an extension
  providing image format conversion and bibliography generation).
- The extension provides one or more unrelated additional functionalities using the extension's
  action icon.
- The following are considered distinct purposes. Extensions that provide any of the features listed
  below may not provide any other functionality.
    - Replacing any single [override page][docs-override-page].
    - Using [override settings][docs-override-settings] to replace the default search provider.
    - Injecting ads into web pages.

See the [Single Purpose FAQ][docs-single-purpose-faq] for additional information.

### How can you rectify this? {: #how-can-you-rectify-this_10 }

- Narrow the functionality of your extension to clearly fit within one well-defined purpose and
  ensure that purpose is clearly described in your extension's metadata.
- If your extension is offering some functionality and also injecting ads, then either stop
  injecting ads or remove all other functionality besides ad injection.
- Chrome does not support optional new tab pages. If you wish to provide some functionality and an
  optional new tab page, you should separate the new tab page into a standalone extension.
- Don't offer another unrelated functionality in the extension's action icon.

### Relevant policy {: #single-purpose-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-single-purpose]:

{% Aside %}

**Extensions Quality Guidelines**

Single Purpose:

An extension must have a single purpose that is narrow and easy-to-understand. Do not create an
extension that requires users to accept bundles of unrelated functionality. If two pieces of
functionality are clearly separate, they should be put into two different extensions, and users
should have the ability to install and uninstall them separately.

Common violations include:

- Functionality that displays product ratings and reviews, but also injects ads into web pages.
- Toolbars that provide a broad array of functionality or entry points into services are better
  delivered as separate extensions, so that users can select the services they want.
- Email notifiers combined with a news aggregator.
- PDF converters which also aim to change a user's default search engine.

{% endAside %}

## User data policy - prominent disclosure {: #udp-prominent-disclosure }

Corresponds to notification ID: `Purple Nickel`

The User Data Privacy policy is a broad category under which several other policies are gathered.
All of these policies have to do with the handling and transmission of sensitive information about
the user.

This section of the policy aims to ensure that users are aware of the data that is being collected
and that user consent is obtained before data collection. Be aware that extensions may only collect
data in direct support of their single purpose. See the [Limited Use of User
Data][docs-dpp-limited-use] policy for additional information.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_11 }

- The extension is not prominently disclosing how the user data is being used.
- User consent is not obtained before data collection

### How can you rectify this? {: #how-can-you-rectify-this_11 }

- Prominently disclose to the user what data is being collected and how it will be handled. This
  information must be provided in the extension's Privacy Policy and may be provided elsewhere.
- Ensure data is collected only if the user consents to it.
    - Prominent disclosure of data collection in the extension's Chrome Web Store listing is
      sufficient.
    - Collecting data that is not prominently disclosed in the Chrome Web Store listing is allowed
      so long as this data collection is consistent with the extension's single purpose, the user is
      informed of the data collection before it begins, and the user consents to the data
      collection.
- Consider providing the user with ways to opt out of data collection from within the extension's
  [options page][docs-options].
- Consider providing users with an "offline mode" that only stores user data locally.

### Relevant policy {: #udp-prominent-disclosure-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-prominent-disclosure]:

{% Aside %}

**Personal or Sensitive User Data**

Prominent Disclosure Requirement

: If your Product handles personal or sensitive user data that is not closely related to
  functionality described prominently in the Product's Chrome Web Store page and user interface,
  then prior to the collection, it must:

  - Prominently disclose how the user data will be used, and
  - Obtain the user's affirmative consent for such use.

{% endAside %}

## User data policy - secure transmission {: #udp-secure }

Corresponds to notification ID: `Purple Copper`

The User Data Privacy policy is a broad category under which several other policies are gathered.
All of these policies have to do with the handling and transmission of sensitive information about
the user.

This particular section is to ensure that user data is being handled securely.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_12 }

- The extension is not transmitting user data securely.
- The data is being transmitted to an unsecure domain

### How can you rectify this? {: #how-can-you-rectify-this_12 }

- Ensure data is securely transmitted.
    - Don't transmit user data over HTTP. If possible, use secure protocols for all requests.
    - Don't encode data in request headers or query parameters, even over HTTPS. Headers and request
      URLs often appear in server logs, which can unintentionally leak this information.
    - See [Safe HTTP methods][mdn-safe-http] for additional information.

Tip: Use the Chrome DevTools or other network monitoring tools to watch the network requests the
extension makes.

### Relevant policy {: #udp-secure-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-privacy-policy]:

{% Aside %}

**Personal or Sensitive User Data**

Posting a Privacy Policy & Secure Transmission

: If your Product handles personal or sensitive user data (including personally identifiable
  information, financial and payment information, health information, authentication information,
  website content and resources, form data, web browsing activity, user-provided content and
  personal communications), then your Product must:

  - Post a privacy policy, and
  - Handle the user data securely, including transmitting it via modern cryptography.

{% endAside %}

## User data policy - other requirements {: #udp-other-requirements }

Corresponds to notification ID: `Purple Magnesium`

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

### Relevant policy {: #udp-other-requirements-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-other-userdata]:

{% Aside %}

**Personal or Sensitive User Data**

Other Requirements

: The following types of personal or sensitive user data are also subject to additional
  requirements:

  <table>
    <tbody>
      <tr>
        <td><strong>Type of User Data</strong></td>
        <td><strong>Requirement</strong></td>
      </tr>
      <tr>
        <td>Financial or Payment Information</td>
        <td>Don't publicly disclose financial or payment information</td>
      </tr>
      <tr>
        <td>Authentication Information</td>
        <td>Don't publicly disclose authentication information</td>
      </tr>
      <tr>
        <td>Web Browsing Activity</td>
        <td>Collection and use of web browsing activity is prohibited except to the extent required
          for a user-facing feature described prominently in the Product's Chrome Web Store page and
          in the Product's user interface.</td>
      </tr>
    </tbody>
  </table>

{% endAside %}

## Cryptocurrency mining {: #cryptocurrency-mining }

Corresponds to notification ID: `Grey Silicon`

The intent of this policy is to prevent the use of extensions and the Chrome Web Store as a platform
to mine cryptocurrencies.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_14 }

- The extension is mining cryptocurrencies on user machines.
- The extension is providing the functionality to mine cryptocurrencies

### How can you rectify this? {: #how-can-you-rectify-this_14 }

- If this is the primary functionality of your extension, then it is recommended to unpublish your
  extension.
- If this was an unintended functionality, then remove the content or services that are in violation
  and resubmit your extension.

### Relevant policy {: #cryptocurrency-mining-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-prohibited-products]:

{% Aside %}

**Content Policies**

Prohibited Products:

: We don't allow products or services that:

  - Facilitate unauthorized access to content on websites, such as circumventing paywalls or login
    restrictions
  - Encourage, facilitate, or enable the unauthorized access, download, or streaming of copyrighted
    content or media
  - Mine cryptocurrency

{% endAside %}

## Prohibited products {: #prohibited-products }

Corresponds to notification IDs: `Blue Zinc`, `Blue Copper`, `Blue Lithium`, and `Blue Magnesium`

The intent of this policy is to prevent the use of extensions and the Chrome Web Store as a platform
to provide access to content protected by paywalls, login restrictions or intellectual property
rights.

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

### Relevant policy {: #prohibited-products-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-prohibited-products]:

{% Aside %}

**Content Policies**

Prohibited Products:

: We don't allow products or services that:

  - Facilitate unauthorized access to content on websites, such as circumventing paywalls or login
    restrictions
  - Encourage, facilitate, or enable the unauthorized access, download, or streaming of copyrighted
    content or media
  - Mine cryptocurrency

{% endAside %}

## Keyword stuffing {: #keyword-stuffing }

Corresponds to notification ID: `Yellow Argon`

The intent of this policy is to ensure quality of items published to the Chrome Web Store and
prevent developers from manipulating their placement in the Store.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_16 }

- The extension is having excessive, irrelevant or inappropriate keywords in the metadata, more
  commonly, the description.

### How can you rectify this? {: #how-can-you-rectify-this_16 }

- Remove the content (keywords) that are in violation of the policy.

### Examples {: #keyword-stuffing-examples }

The following are examples of this type of violation:

- Including in an extension's metadata a long list of the different sites on which the extension
  works.

### Relevant policy {: #keyword-stuffing-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-keyword-spam]:

{% Aside %}

**Spam & Placement in the Store**

**Keyword Spam:** Keyword Spam is the practice of including irrelevant or excessive keywords in an
extensions description in an attempt to manipulate its ranking, resulting in a spammy, negative user
experience. We don't allow extensions with misleading, improperly formatted, non-descriptive,
irrelevant, excessive, or inappropriate metadata, including but not limited to the extension's
description, developer name, title, icon, screenshots, and promotional images. Developers should
focus on providing a clear and well-written description that uses keywords appropriately and in
context.

Some examples of Keyword Spam include:

* Lists of sites/brands/keywords without substantial added value
* Lists of regional locations
* Unnatural repetition of the same keyword more than 5 times
* Unattributed or anonymous user testimonials in the product's description.

{% endAside %}

## Redirection {: #redirection }

Corresponds to notification ID: `Yellow Lithium`

The intent of this policy is to ensure quality of the products on the Chrome Web Store and prevent
products from manipulating their placement in the Store

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_17 }

- The only functionality of the extension is to launch another app, theme, webpage, or extension.
- Examples of violations include
    - Extensions that display a website in a new tab or in a popup when the extension's action is
      clicked.
    - Extensions that display a promotional page for another product immediately upon installation.

### How can you rectify this? {: #how-can-you-rectify-this_17 }

- As mentioned in the policy, such extensions are not allowed on the Store and it is recommended to
  unpublish them.

### Relevant policy {: #redirection-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-functionality]:

{% Aside %}

**Spam & Placement in the Store**

**Functionality:** Do not post an extension with a single purpose of installing or launching another
app, theme, webpage, or extension. Extensions with broken functionality—such as dead sites or
non-functioning features—are not allowed.

{% endAside %}

## Spam {: #spam }

Corresponds to notification ID: `Yellow Nickel`

The intent of this policy is to ensure quality of the products on the Chrome Web Store. The Spam
policy is to prevent extensions that are harmful for the user's browsing experience and extensions
that manipulate their placement on the Chrome Web Store.

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

### Relevant policy {: #spam-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-repetitive-content]:

{% Aside %}

**Spam & Placement in the Store**

**Repetitive Content:** We don't allow any developer, related developer accounts, or their
affiliates to submit multiple extensions that provide duplicate experiences or functionality on the
Chrome Web Store. Extensions should provide value to users through the creation of unique content or
services.

**User Ratings, Reviews, and Installs:** Developers must not attempt to manipulate the placement of
any extensions in the Chrome Web Store. This includes, but is not limited to, inflating product
ratings, reviews, or install counts by illegitimate means, such as fraudulent or incentivized
downloads, reviews and ratings.

**Notification Abuse:** We do not allow extensions that abuse, or are associated with abuse, of
notifications by sending spam, ads, promotions, phishing attempts, or unwanted messages that harm
the user's browsing experience.

**Message Spam:** We don't allow extensions that send messages on behalf of the user without giving
the user the ability to confirm the content and intended recipients.

In addition to these requirements, all extensions must comply with [Google's Webmaster Quality
Guidelines][webmaster-quality].

{% endAside %}

## Circumvents the overrides API {: #circumvents-api-ntp }

Corresponds to notification IDs: `Blue Nickel` and `Blue Potassium`

The intent of this policy is to ensure quality of the products on the Chrome Web Store.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_20 }

- The extension is modifying the Chrome New Tab Page but not using the Overrides API.
- The extension is modifying the Omnibox Search but not using the Overrides API.

### How can you rectify this? {: #how-can-you-rectify-this_20 }

- Do not modify the Chrome New Tab Page or do so using the Overrides API.
- Do not modify the Omnibox Search or do so using the Overrides API.

### Relevant policy {: #circumvents-api-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-api-use]:

{% Aside %}

**Extensions Quality Guidelines**

API Use:

Extensions must use existing Chrome APIs for their designated use case. Use of any other method, for
which an API exists, would be considered a violation. For example, overriding the Chrome New Tab
Page through any means other than the URL Overrides API is not permitted.

{% endAside %}

## Deceptive installation {: #uws-distribution }

Corresponds to notification ID: `Red Zinc`

The intent of this policy is to ensure users are not deceived into installing extensions.

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

### Relevant policy {: #uws-distribution-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-deceptive-installation]:

{% Aside %}

**Deceptive Installation Tactics**

Extensions must be marketed responsibly. The set of functionalities promised by the extension must
be stated clearly and in a transparent manner. The outcome of any user interaction should match the
reasonable expectations that were set with the user. Extensions that use or benefit from deceptive
installation tactics will be removed from the Chrome Web Store.

Deceptive installation tactics include:

- Unclear or inconspicuous disclosures on marketing collateral preceding the Chrome Web Store
  product listing.

- Misleading interactive elements as part of your distribution flow. This includes misleading
  call-to-action buttons or forms that imply an outcome other than the installation of an extension.

- Adjusting the Chrome Web Store product listing window with the effect of withholding or hiding
  extension metadata from the user.

- Bundling other extensions or offers within the same installation flow.

- Requiring unrelated user action to access advertised functionality.

{% endAside %}

## Obfuscation {: #obfuscation }

Corresponds to notification ID: `Red Titanium`

The intent of this policy is to ensure the quality of the extensions and code submitted to the
Chrome Web Store.

### Common reasons for removal/rejection {: #common-reasons-for-removalrejection_22 }

Using obfuscated code in the extension package.

### How can you rectify this? {: #how-can-you-rectify-this_22 }

Publish a new extension that does not employ deceptive methods to market to users or to gather a
user base.

### Examples {: #obfuscation-examples }

The following are some examples of violations of this type of policy:

- Base 64 encoding (e.g. `'SSdtIGluIHVyIGJhc2U='`)
- Character encoding (e.g. `'\u{68}a\u0063\u006b\x69ng\u{20}u\u{72}\x20\u0067i\u0062\x73\x6fn'`)

### Relevant policy {: #obfuscation-policy }

This section addresses extensions that are in violation of the following section of the Chrome Web
Store [developer program policies][docs-dpp-code-readability]:

{% Aside %}

**Content Policies**

Code Readability Requirements:

: Developers must not obfuscate code or conceal functionality of their extension. This also applies
  to any external code or resource fetched by the extension package. Minification is allowed,
  including the following forms:

  - Removal of whitespace, newlines, code comments, and block delimiters
  - Shortening of variable and function names
  - Collapsing files together

{% endAside %}

## Minimum Functionality

Corresponds to notification ID: `Yellow Potassium`

The intent of this policy is to ensure all extensions in the Chrome Web Store are providing a basic
degree of functionality and utility for users. Extensions should provide users with benefits and
enrich their browsing experience.

### Common reasons for removal/rejection

- Your submitted extension contained no files other than a manifest.
- The extension did not provide discernable value or utility to its users.
- A feature listed in the item's description was not provided directly by the item and instead
  simply linked to an external service.
- The extension metadata contained click-baity content designed to attract the attention of
  users and entice them to install.

### How can you rectify this?

- Ensure that your extension has a defined functionality which provides value.
- Ensure that any claimed functionality of your item is performed directly by the item itself
  and not achieved by linking users to an external source.

### Relevant policy

This section addresses extensions that are in violation of the following section of the Chrome Web
Store
[developer program policies](/docs/webstore/program-policies/minimum-functionality/):

{% Aside %}
**Building Quality Products - Minimum Functionality**

Extensions must provide a basic degree of functionality and utility that provide value to the
catalog of the Chrome Web Store. Some examples of common violations include:

- Extensions with no functionality or utility.
- Extensions with functionality that is not directly provided by the extension (e.g. file
  converters which only link to other file conversion services).
- Click-baity template extensions that only vary slightly in functionality with negligible
  utility (e.g. a "Word of the Day" extension and a "Daily Inspirational Quotes" extension, 
  which use the same general extension template).
{% endAside %}

## Affiliate Ads

Corresponds to notification ID: `Grey Titanium`

The intent of this policy is to ensure users are aware of extensions using affiliate links or codes
for monetization, and to give them some amount of control by requiring user action before
inclusion.

### Common reasons for removal/rejection

- Your extension uses affiliate marketing links, codes, or cookies without properly
  disclosing their use in the item's description and user interface.
- No related user action is required before inclusion of affiliate codes, links, or cookies.

### How can you rectify this?

- Modify your item's description and UI to properly inform users that you are using affiliate
  programs.
- Inclusion of affiliate codes must be preceded by a relevant action taken by the user. This
  action must be related to the affiliated platform such that a reasonable user would understand
  and consent to the inclusion of said codes.

### Relevant policy

This section addresses extensions that are in violation of the following section of the Chrome Web
Store
[developer program policies](/docs/webstore/program-policies/affiliate-ads/):

{% Aside %}
**Ensuring Responsible Marketing and Monetization - Affiliate Ads**

- Any affiliate program must be described prominently in the product's Chrome Web Store page,
 user interface, and before installation.
- Related user action is required before the inclusion of each affiliate code, link, or
  cookie. Some example violations include:
  - An extension that updates a shopping-related cookie without the user's knowledge
    while the user is browsing shopping sites.
  - An extension that appends an affiliate code to the URL or replaces an existing
    affiliate code in the URL without the user's explicit knowledge or related user action.
  - An extension that applies or replaces affiliate promo codes without the user's
    explicit knowledge or related user action.
{% endAside %}

[api-action]: /docs/extensions/reference/action
[api-browser-action]: /docs/extensions/reference/browserAction/
[api-cookies]: /docs/extensions/reference/cookies/
[api-page-action]: /docs/extensions/reference/pageAction/
[api-storage]: /docs/extensions/reference/storage/
[api-tabs-get-current-tab]: /docs/extensions/reference/tabs/#get-the-current-tab
[api-tabs-query]: /docs/extensions/reference/tabs/#method-query
[api-tabs-sendmessage]: /docs/extensions/reference/tabs/#method-sendMessage
[api-tabs]: /docs/extensions/reference/tabs
[blog-lie-fi]: https://web.dev/performance-poor-connectivity/#lie-fi
[dev-support]: https://support.google.com/chrome_webstore/contact/one_stop_support
[docs-dpp-api-use]: /docs/webstore/program-policies/api-use/
[docs-dpp-bullying]: /docs/webstore/program-policies/hate-and-violence/
[docs-dpp-code-readability]: /docs/webstore/program-policies/code-readability/
[docs-dpp-content-policies]: /docs/webstore/program-policies/explicit-material/
[docs-dpp-deceptive-installation]: /docs/webstore/program-policies/deceptive-installation-tactics/
[docs-dpp-functionality]: /docs/webstore/program-policies/minimum-functionality/
[docs-dpp-gambling]: /docs/webstore/program-policies/regulated-goods-and-services/
[docs-dpp-hate-speech]: /docs/webstore/program-policies/hate-and-violence/
[docs-dpp-illegal-activities]: /docs/webstore/program-policies/regulated-goods-and-services/
[docs-dpp-impersonation]: /docs/webstore/program-policies/impersonation-and-intellectual-property/
[docs-dpp-keyword-spam]: /docs/webstore/program-policies/spam-and-abuse/
[docs-dpp-limited-use]: /docs/webstore/program-policies/limited-use/
[docs-dpp-other-userdata]: /docs/webstore/program-policies/data-handling/
[docs-dpp-permissions]: /docs/webstore/program-policies/permissions/
[docs-dpp-privacy-policy]: /docs/webstore/program-policies/privacy/
[docs-dpp-prohibited-products]: /docs/webstore/program-policies/malicious-and-prohibited/
[docs-dpp-prominent-disclosure]: /docs/webstore/program-policies/disclosure-requirements/
[docs-dpp-repetitive-content]: /docs/webstore/program-policies/spam-and-abuse/
[docs-dpp-sexually-explicit]: /docs/webstore/program-policies/explicit-material/
[docs-dpp-single-purpose]: /docs/webstore/program-policies/quality-guidelines/
[docs-options]: /docs/extensions/mv3/options/
[docs-override-page]: /docs/extensions/mv3/override/
[docs-override-settings]: /docs/extensions/mv3/settings_override/
[docs-pack-extension]: /docs/extensions/mv3/linux_hosting/#create
[docs-publish-setup]: /docs/webstore/publish/#setup-a-developer-account
[docs-service-workers]: /docs/extensions/mv3/service_workers/
[docs-single-purpose-faq]: /docs/extensions/mv3/single_purpose/
[lie-fi]: https://web.dev/performance-poor-connectivity/#what-is-lie-fi
[mature-content]: /docs/webstore/cws-dashboard-listing/#mature-content
[mdn-cookie-store]: https://developer.mozilla.org/docs/Web/API/Cookie_Store_API
[mdn-document-cookie]: https://developer.mozilla.org/docs/Web/API/Document/cookie
[mdn-indexeddb]: https://developer.mozilla.org/docs/Web/API/IndexedDB
[mdn-safe-http]: https://developer.mozilla.org/docs/Glossary/Safe/HTTP
[mdn-samesite-cookie]: https://developer.mozilla.org/docs/Web/HTTP/Headers/Set-Cookie/SameSite
[mdn-web-storage]: https://developer.mozilla.org/docs/Web/API/Web_Storage_API
[section-does-not-work]: #does-not-work
[section-misunderstood-perms]: #misunderstood-perms
[webmaster-quality]: https://support.google.com/webmasters/answer/35769#3
[wiki-case-sensitivity]: https://en.wikipedia.org/wiki/Case_sensitivity
