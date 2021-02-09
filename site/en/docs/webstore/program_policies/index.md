---
layout: "layouts/doc-post.njk"
title: "Developer Program Policies"
date: 2014-02-28
updated: 2020-11-17
description: Chrome Web Store developer program policies.
---

<div class="aside aside--caution"><b>Important:</b> As of 06/12/2018, inline installation is deprecated. For more information, read our <a href="https://blog.chromium.org/2018/06/improving-extension-transparency-for.html">Chromium Blog post</a> and <a href="/extensions/inline_faq">Migration FAQ</a>.</div>

[Branding Guidelines][3] | [Rating Guidelines][4] | **Program Policies** | [User Data FAQ][5] |
[Developer Agreement][6]

The developer program policies listed below play an important role in maintaining a positive
experience for everyone using Chrome Web Store. These policies apply to the entire user experience
of your application/extension/theme, unless otherwise noted.

Please be aware that these policies pertain to your software, content, and digital materials created
for use in connection with Google Chrome and distributed via the Chrome Web Store, including
applications, extensions, and themes, as well as any ads bundled or made available through the
product. These policies have the same meaning as in the [Google Chrome Web Store Developer
Agreement][7]. There are additional quality guidelines that apply to [Chrome Apps][8] and [Chrome
Extensions][9]. Be sure to check back from time to time, as these policies may change.

## Content Policies {: #content_policies }

Our content policies apply to your Product's content, including any ads it shows to users and any
user-generated content it hosts or links to. Further, they apply to any content from your developer
account that is publicly displayed in Chrome Web Store, including your developer name and the
landing page of your listed developer website. Products that include content that may not be
suitable for all ages should be marked "Mature" on the Developer Dashboard.

Sexually Explicit Material:

: We don't allow content that contains nudity, graphic sex acts, sexually explicit material, or
  content that drives traffic to commercial pornography sites. We also don't allow content that
  promotes incest, bestiality, necrophilia, or non-consensual sexual acts. Google has a zero-tolerance
  policy against child pornography. If we become aware of content with child pornography, we will
  report it to the appropriate authorities and delete the Google Accounts of those involved with the
  distribution.
  Content which contains non-sexual nudity - such as artistic, educational, scientific, or cultural
  nudity - is generally allowed, but may impact the visibility of your Product.

Violent or Bullying Behavior:

: Depictions of gratuitous violence are not allowed. Products should not contain materials that
  threaten, harass, or bully other users. For example, Products should not contain:

  - Content which makes a specific threat of serious harm against an individual person or a defined
    group of people.
  - Content whose predominant purpose is to single out another person for abuse, malicious attack, or
    ridicule. Content that results in the unwanted sexualization of a person, including malicious
    claims about a person's sexual activities, sexual orientation, or gender identity.\* A series of
    posts/comments/photos that, taken together, clearly have the primary intention of harassment, even
    if each individual piece of content is not severe.

Hate Speech:

: We don't allow content advocating against or inciting hatred towards groups of people based on their
  race or ethnic origin, religion, disability, gender, age, veteran status, nationality, sexual
  orientation, gender, gender identity, or any other characteristic that is associated with systematic
  discrimination or marginalization.

  Additionally, the visibility of your Product may be impacted if it contains generally hateful
  content not covered by the above definition.

Violent Extremism:

: We remove content that recruits, fundraises, or promotes violence on behalf of extremist groups
  defined by the US State Department and other international organizations. Violent extremism is
  defined as the use of violence and intimidation in the pursuit of political aims or goals outside of
  societal norms.

Impersonation or Deceptive Behavior:

: Don't pretend to be someone else, and don't represent that your product is authorized by, endorsed
  by, or produced by another company or organization, if that is not the case. Developers should not
  divert users or provide links to any other site that mimics Chrome Web Store or passes itself off as
  Chrome Web Store. Your Product and its user experience also must not mimic functionality or warnings
  from a user's operating system or browser. Any changes to device settings must be made with the
  user's knowledge and consent and be easily reversible by the user.

  We do not allow products which deceive or mislead users, including in the content, title,
  description, or screenshots.

: Don't misrepresent the functionality of your product or include non-obvious functionality that
  doesn't serve the primary purpose of the product. Descriptions of your product must directly state
  the functionality so that users have a clear understanding of the product they are adding. For
  example, products should not contain:

  - Claimed functionalities which are not possible to implement (e.g. "Who has viewed your IG
    account")
  - Developer or product names which misrepresent their current status or performance on the Chrome
    Web Store (e.g. "Editor's Choice" or "Number One")

  If your product has a blank description field or is missing an icon or screenshots, it will be
  rejected. If any of your product's content, title, icon, description or screenshots contains false
  or misleading information, we may remove it.

Featured Products:

: The Chrome Web Store features products that align with our standards, values, and that we believe
  will produce valuable user experiences. Certain products that don't meet these standards, but which
  do not explicitly violate CWS policies - such as VPN extensions and Video Downloaders - may be
  restricted from feature in the Store, but will still be available to users. For example, the
  following products are currently not featured in the CWS Store:

  - Religious or political content
  - VPNs
  - Video Downloaders
  - Anti-Virus tools
  - Content deemed not family friendly
  - Bots
  - Cryptocurrency
  - Non-production builds
  - Prohibited products
  - Gambling content
  - Extensions whose developers have questionable reputations, such as historically misleading or
    malicious extensions.

Intellectual Property:

: Don't infringe on the intellectual property rights of others, including patent, trademark, trade
  secret, copyright, and other proprietary rights. We will respond to clear notices of alleged
  copyright infringement. For more information or to file a DMCA request, use [this tool][10].
  Additionally, the visibility of your Product may be impacted if we believe it potentially infringes
  on intellectual property rights.

Illegal Activities:

: Keep it legal. Don't engage in or promote unlawful activities in your product, such as rape, illegal
  sex work, or the sale of prescription drugs without a prescription.. We will remove content which
  promotes, glorifies, or encourages dangerous or illegal activity that may result in physical harm to
  those involved.

Gambling:

: We don't allow content or services that facilitate online gambling, including but not limited to
  online casinos, sports betting, lotteries, or games of skill that offer prizes of cash or other
  value.

Regulated Goods and Services

: We do not allow the facilitation of the sale of regulated Products or services. Regulated goods
  include pharmaceuticals, alcohol, tobacco, fireworks, weapons, gambling or health/medical devices.

Malicious Products:

: Don't transmit viruses, worms, defects, Trojan horses, malware, or any other products of a
  destructive nature. We don't allow content that harms or interferes with the operation of the
  networks, servers, or other infrastructure of Google or any third-parties. Spyware, malicious
  scripts, and phishing scams are also prohibited in the Chrome Web Store.

Code Readability Requirements:

: Developers must not obfuscate code or conceal functionality of their extension. This also applies to
  any external code or resource fetched by the extension package. Minification is allowed, including
  the following forms:

  - Removal of whitespace, newlines, code comments, and block delimiters
  - Shortening of variable and function names
  - Collapsing files together

Additional Requirements for Manifest V3:

: Extensions using Manifest V3 must meet additional requirements related to the
  extension's code. Specifically, the full functionality of an extension must be
  easily discernible from its submitted code. This means that the logic of how
  each extension operates should be self contained. The extension may reference
  and load data and other information sources that are external to the extension,
  but these external resources must not contain any logic.

  Some common violations include:

  * Including a &lt;script> tag that points to a resource that is not within the
    extension's package

  * Using JavaScript's
    [eval()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)
    method or other mechanisms to execute a string fetched from a remote source

  * Building an interpreter to run complex commands fetched from a remote source,
    even if those commands are fetched as data

  Communicating with remote servers for certain purposes is still allowed.  For instance,

  * Syncing user account data with a remote server

  * Fetching a remote configuration file for A/B testing or determining enabled
    features, where all logic for the functionality is contained within the
    extension package

  * Fetching remote resources that are not used to evaluate logic, such as images

  * Performing server-side operations with data (such as for the purposes of
    encryption with a private key)

  If our reviewers are unable to determine the full functionality of your
  extension during the review process, we may reject your submission or remove it
  from the store.

Prohibited Products:

: We don't allow products or services that:

  - Facilitate unauthorized access to content on websites, such as circumventing paywalls or login
    restrictions
  - Encourage, facilitate, or enable the unauthorized access, download, or streaming of copyrighted
    content or media
  - Mine cryptocurrency

## Security Vulnerabilities {: #security }

If your product is associated with a security vulnerability that could be exploited to compromise
another application, service, browser, or system, we may remove your product from the Chrome Web
Store and take other measures to protect users. In such an event, you may be contacted about
remediation steps required to restore the product.

## Deceptive Installation Tactics {: #deceptive_installation_tactics }

Extensions must be marketed responsibly. Extensions that use or benefit from deceptive installation
tactics will be removed from the Chrome Web Store.

Deceptive installation tactics include:

- Unclear or inconspicuous disclosures on marketing collateral preceding the Chrome Web Store
  product listing.
- Misleading interactive elements as part of your distribution flow. This includes misleading
  call-to-action buttons or forms that imply an outcome other than the installation of an extension.
- Adjusting the Chrome Web Store product listing window with the effect of withholding or hiding
  extension metadata from the user.

For more information about this policy, please see the [Developer FAQ][11].

## Spam & Placement in the Store {: #spam }

Developers are important partners in maintaining a great user experience in the Chrome Web Store.

**Repetitive Content:** We don't allow any developer, related developer accounts, or their
affiliates to submit multiple extensions that provide duplicate experiences or functionality on the
Chrome Web Store. Extensions should provide value to users through the creation of unique content or
services.

**Keyword Spam:** We don't allow extensions with misleading, improperly formatted, non-descriptive,
irrelevant, excessive, or inappropriate metadata, including but not limited to the extension's
description, developer name, title, icon, screenshots, and promotional images. Developers must
provide a clear and well-written description. We also don't allow unattributed or anonymous user
testimonials in the product's description.

**User Ratings, Reviews, and Installs:** Developers must not attempt to manipulate the placement of
any extensions in the Chrome Web Store. This includes, but is not limited to, inflating product
ratings, reviews, or install counts by illegitimate means, such as fraudulent or incentivized
downloads, reviews and ratings.

**Functionality:** Do not post an extension with a single purpose of installing or launching another
app, theme, webpage, or extension. Extensions with broken functionality—such as dead sites or
non-functioning features—are not allowed.

**Notification Abuse:** We do not allow extensions that abuse, or are associated with abuse, of
notifications by sending spam, ads, promotions, phishing attempts, or unwanted messages that harm
the user's browsing experience.

**Message Spam:** We don't allow extensions that send messages on behalf of the user without giving
the user the ability to confirm the content and intended recipients.

In addition to these requirements, all extensions must comply with [Google's Webmaster Quality
Guidelines][12].

For additional information about the spam policy, see the [Spam FAQ][13].

For information about Product ranking, please see [these FAQs][14].

## User Data Privacy {: #userdata }

You must be transparent in how you handle user data (e.g., information provided by a user or
collected about a user or a user's use of the Product or Chrome Browser), including by disclosing
the collection, use, and sharing of the data. You must limit your use of the data to the practices
you disclosed. This policy establishes the Chrome Web Store's minimum user data privacy
requirements; you or your Product must comply with applicable laws.

Please see this [FAQ][15].

### Personal or Sensitive User Data {: #userdata_psud }

Posting a Privacy Policy & Secure Transmission

: If your Product handles personal or sensitive user data (including personally identifiable
  information, financial and payment information, health information, authentication information,
  website content and resources, form data, web browsing activity, user-provided content and personal
  communications), then your Product must:

  - Post a privacy policy, and
  - Handle the user data securely, including transmitting it via modern cryptography.

Privacy Policy Requirements

: The privacy policy must, together with any in-Product disclosures, comprehensively disclose how your
  Product collects, uses and shares user data, including the types of parties with whom it's shared.
  You must make the the policy accessible by providing a link:

  - In the designated field in the Chrome Web Store Developer Dashboard, and
  - In the Product's inline installation page (if applicable).

Prominent Disclosure Requirement

: If your Product handles personal or sensitive user data that is not closely related to functionality
  described prominently in the Product's Chrome Web Store page and user interface, then prior to the
  collection, it must:

  - Prominently disclose how the user data will be used, and
  - Obtain the user's affirmative consent for such use.

Other Requirements

: The following types of personal or sensitive user data are also subject to additional requirements:

  <table><tbody><tr><td><strong>Type of User Data</strong></td><td><strong>Requirement</strong></td></tr><tr><td>Financial or Payment Information</td><td>Don't publicly disclose financial or payment information</td></tr><tr><td>Authentication Information</td><td>Don't publicly disclose authentication information</td></tr><tr><td>Web Browsing Activity</td><td>Collection and use of web browsing activity is prohibited except to the extent required for a user-facing feature described prominently in the Product's Chrome Web Store page and in the Product's user interface.</td></tr></tbody></table>

  If your Product uses inline installation pages, then any reference to the Product's Chrome Web Store
  page also includes its inline installation pages.

### Limited Uses of User Data {: #limited_use }

Upon accessing personal and sensitive user data for a single purpose, your use of the user data
obtained must comply with the below requirements. The requirements apply to both the raw data
obtained and the data aggregated, anonymized, de-identified, or derived from the raw data. They also
apply to scraped content or otherwise automatically gathered user data.

1.  Limit your use of user data to providing or improving your single purpose
2.  Only transfer user data to third parties
    1.  If necessary to providing or improving your single purpose;
    2.  to comply with applicable laws;
    3.  to protect against malware, spam, phishing, or other fraud or abuse; or,
    4.  as part of a merger, acquisition or sale of assets of the developer after obtaining explicit
        prior consent from the user.
3.  Do not allow humans to read user data, unless:
    1.  the user's explicit consent to read specific data for example, helping a user re-access the
        product or a service after having lost their password) is obtained;
    2.  the data is aggregated and anonymized and used for internal operations in accordance with
        applicable privacy and other jurisdictional legal requirements;
    3.  it's necessary for security purposes (e.g., investigating abuse); or,
    4.  to comply with applicable laws.

**All other transfers, uses, or sale of user data is completely prohibited, including:**

1.  Transferring, using, or selling data for personalized advertisements.
2.  Transferring or selling user data to third parties like advertising platforms, data brokers, or
    other information resellers.
3.  Transferring, using, or selling user data to determine credit-worthiness or for lending
    purposes.

An affirmative statement that your use of the data complies with the Limited Use restrictions must
be disclosed on a website belonging to your extension; e.g., A link on a homepage to a dedicated
page or privacy policy noting: "The use of information received from Google APIs will adhere to the
[Chrome Web Store User Data Policy][16], including the [Limited Use][17] requirements."

### Use of Permissions {: #permissions }

Request access to the narrowest permissions necessary to implement your Product's features or
services. If more than one permission could be used to implement a feature, you must request those
with the least access to data or functionality.

Don't attempt to "future proof" your Product by requesting a permission that might benefit services
or features that have not yet been implemented.

## Ads in Products {: #ads }

Ads are considered part of your Product for purposes of content review and compliance with developer
terms, and therefore must comply with the above content policies. Ads which are inconsistent with
the [content rating][18] of your products or extension are also in violation of our developer terms.

Ads Context and Attribution:

: Ads must be presented in context or clearly state which product they are bundled with. Ads must also
  be easily removable by either adjusting the settings or uninstalling the product altogether. Ads may
  not simulate or impersonate system notifications or warnings.

Ad Walls:

: Forcing the user to click on ads or submit personal information for advertising purposes in order to
  fully use an app or extension provides a poor user experience and is prohibited.

Interfering with Third-party Ads and Websites:

: Ads associated with your product may not interfere with any ads on a third-party website or
  application. You may show ads alongside a third-party website only if all of the following criteria
  are met:

  - This behavior is clearly disclosed to the user.
  - There is clear attribution of the ads' source wherever those ads appear.
  - The ads do not interfere with any native ads or functionality of the website.
  - The ads do not mimic or impersonate the native ads or content on the third-party website, and the
    ads adhere to the content policy on [impersonation and deceptive behavior][19].

<div class="aside aside--note">Currently, AdSense may not be used to serve ads in Products, per <a href="https://support.google.com/adsense/bin/answer.py?hl=en&amp;answer=48182">AdSense policies</a>.</div>

## Extensions Quality Guidelines {: #extensions }

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
- PDF converters which also aim to change a users default search engine.

Please see this [FAQ][21] for more information.

API Use:

Extensions must use existing Chrome APIs for their designated use case. Use of any other method, for
which an API exists, would be considered a violation. For example, overriding the Chrome New Tab
Page through any means other than the URL Overrides API is not permitted.

## Chrome Apps Quality Guidelines {: #chrome_apps }

To ensure a great user experience, Chrome Apps distributed through the Chrome Web Store must follow
the additional quality guidelines listed below. The guidelines in this section apply only to Chrome
Apps.

Packaged Apps should:

- Take advantage of the capabilities of the platform and not wrap around existing websites or simply
  launch a webpage without providing additional functionality.
- Detect an offline state and clearly message that state to the user.
- Recover automatically from loss of Internet connectivity, and should resume normal functioning
  when connectivity is restored without the user having to restart the app.

Packaged and Hosted apps should not:

- Require a local executable, other than the Chrome runtime, to run.
- Provide a webview of a website that is not owned or administered by you.
- Download or execute scripts dynamically outside a sandboxed environment such as a webview or a
  sandboxed iframe.
- Misuse notifications by sending spam, ads, promotions of any kind, phishing attempts, or unwanted
  messages in general.

## Accepting Payment from Users {: #accepting_payment }

If you collect sensitive personal information through your Product for sales, you must follow these
requirements:

- You must securely collect, store and transmit all credit card and other sensitive personal
  information in accordance with privacy and data security laws and payment card industry rules.
- You must avoid misleading users. For example, clearly and honestly describe the products or
  services that you are selling and conspicuously post your terms of sale (including any refund and
  return policies).
- If your Product requires the user to pay to obtain basic functionality, you must make that clear
  in the description that the user sees when choosing whether to install it.
- You must clearly identify that you, not Google, are the seller of the products or services.
- Regardless of the method of payment, you may not process payment transactions that are prohibited
  for Google Checkout under the [Google Checkout Seller Terms of Service][22]. This includes any
  illegal transaction or the sale or exchange of any illegal or prohibited goods or services,
  including the prohibited products set forth in the [Content Policies for Google Checkout][23].

## Policy Enforcement {: #policy_enforcement }

Serious or repeated violations of the Chrome Web Store Distribution Agreement or these Program
Policies will result in the suspension of your developer account, and possibly related developer
accounts. Additionally, you may be banned from using the Chrome Web Store. In extreme cases, this
may also result in the suspension of related Google services associated with your Google account.
Repeated infringement of intellectual property rights, including copyright, will also result in
account termination. For more information on Google's copyright policies, please use [this
tool][24].

In the event that your Product is removed from Chrome Web Store, you will receive an email
notification to that effect, with further instructions if applicable. Please verify that the
associated publisher account with your Product can receive emails from external parties and not get
flagged as Spam to ensure that you receive all communications in a timely manner.

[1]: https://blog.chromium.org/2018/06/improving-extension-transparency-for.html
[2]: /docs/extensions/mv2/inline_faq
[3]: /docs/webstore/branding
[4]: /docs/webstore/rating
[5]: /docs/webstore/user_data
[6]: /docs/webstore/terms
[7]: /docs/webstore/terms
[8]: #chrome_apps
[9]: #extensions
[10]: http://www.google.com/support/bin/static.py?page=ts.cs&ts=1114905
[11]: /docs/webstore/deceptive_installation_tactics
[12]: https://support.google.com/webmasters/answer/35769#3
[13]: /docs/webstore/spam-faq
[14]: /docs/webstore/faq#faq-gen-24
[15]: /docs/webstore/user_data
[16]: /docs/webstore/program_policies
[17]: /docs/webstore/program_policies#limited_use
[18]: /docs/webstore/rating
[19]: #impersonation
[20]: https://support.google.com/adsense/bin/answer.py?hl=en&answer=48182
[21]: /docs/extensions/mv2/single_purpose
[22]: http://checkout.google.com/termsOfService?type=Seller
[23]: http://checkout.google.com/seller/content_policies.html
[24]: http://www.google.com/support/bin/static.py?page=ts.cs&ts=1114905
