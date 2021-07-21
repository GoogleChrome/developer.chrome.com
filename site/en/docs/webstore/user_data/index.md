---
layout: "layouts/doc-post.njk"
title: "Updated Privacy Policy & Secure Handling Requirements"
date: 2016-04-23
updated: 2020-11-19
description: Frequently asked questions about Chrome Web Store's user data policy.
---

<div class="aside aside--caution"><b>Important:</b> Chrome will be removing support for Chrome Apps on Windows, Mac, and Linux. Chrome OS will continue to support Chrome Apps. Additionally, Chrome and the Web Store will continue to support extensions on all platforms. <a href="http://blog.chromium.org/2016/08/from-chrome-apps-to-web.html">Read the announcement</a> and learn more about <a href="/apps/migration">migrating your app</a>.</div>

<div class="aside aside--caution"><b>Important:</b> The new requirements for Minimum Permission and updated User Data policy will be enforced starting <strong>10/15/2019</strong>.</div>

[Branding Guidelines][3] | [Rating Guidelines][4] | [Program Policies][5] | **User Data FAQ** |
[Developer Agreement][6]

## 1\. How do I determine if my Product is compliant with the User Data Policy or if I need to make any changes? {: #ques_1 }

Read these frequently asked questions in order (from top to bottom) and they will lead you through a
series of steps to help determine whether any changes are needed.

## 2\. What does "handle" mean in the User Data Policy? What are some common ways a Product handles personal or sensitive user data? {: #ques_2 }

Generally, by "handle" we mean collecting, transmitting, using, or sharing user data. Here are some
examples of functionality that handle personal or sensitive user data:

- Having login functionality (even if you use a third-party system, like Google authentication)
- Having a form that collects any type of personally identifiable information (see the answer to
  question #3 for more information)
- Clipping or scraping content from a website that the user visits, such as taking screenshots or
  capturing data from a web page
- Collecting data obtained from web requests, such as a background activity that accesses contacts,
  emails, files, or other data from a user's cloud service
- Collecting web browsing activity and any information about the website content or resources a user
  requests or interacts with, including the domains or URLs the browser interacts with, the content
  of the HTTP requests and responses, and data in a website's browser storage (like cookies)

## 3\. What are examples of personal or sensitive user data? {: #ques_3 }

personal or sensitive user data may include:

- Personally identifiable information (including a person's name, address, telephone number, email
  address, and username. It also includes any type of identification number, such as a government
  issued number, driver's license number, or account number),
- Financial and payment information,
- Health information, Authentication information (such as logins, password, and authentication
  cookies),
- Website content and resources,
- Form data,
- Web browsing activity (which is any information about the websites or other web resources a user
  requests or interacts with, including the domains or URLs the browser interacts with).
- Personal communications, and
- User-generated content.

## 4\. My Product DOES NOT handle personal or sensitive user data. What do I need to do? {: #ques_4 }

You have no special or new obligations under the User Data Policy. Please state in your privacy
policy that you are not handling user data.

## 5\. My Product DOES handle personal or sensitive user data. What do I need to do? {: #ques_5 }

Products that handle personal or sensitive user data must, at a minimum:

- Post a privacy policy in the Chrome Web Store Developer Dashboard, and
- Handle the user data securely, including transmitting it via modern cryptography.

Read the policy and the answers to the other FAQs because certain uses of personal or sensitive user
data are subject to additional requirements or are prohibited.

## 6\. What does my Product's privacy policy need to say? {: #ques_6 }

At a minimum, a privacy policy will typically state how a developer collects, uses, and discloses
data. Privacy policies frequently address additional topics, such as information security practices;
how users can access, change, or delete their data; and how long users' data is retained. While we
can't give legal advice on how to draft a privacy policy, we've suggested some points below to guide
your thinking:

- What information do you collect?
  - Explain all the information your extension collects. This includes information that you may
    collect automatically, such as server and HTTP logs, data transmitted by the extension to you,
    and usage information. This also includes information that you get from the user, either
    directly or via the permissions API, including persistent identifiers.
- How do you use the information?
  - Disclose how you use the information you collect. For example, you may use the information to
    provide certain services to users, to recognize them the next time they use your extension, or
    to send them promotional emails.
- What information do you share?
  - Describe the circumstances when you share information.

## 7\. Does all user data need to be encrypted? {: #ques_7 }

This policy establishes a minimum requirement of encrypting transmissions of all personal or
sensitive user data: we strongly recommend that you encrypt all transmissions facilitated by your
Product (see our [I/O 2014 talk on HTTPS Everywhere][7]).

## 8\. What type of encryption does the User Data Policy require? {: #ques_8 }

Extensions must transmit "personal and sensitive user data" over a secure connection (e.g. HTTPS,
WSS) and stored at rest using a strong encryption method such as RSA or AES. You should not use any
cipher suite that is blacklisted by IETF. Our requirements may change over time.

## 9\. Does my Product's handling of personal or sensitive user data require a prominent disclosure and affirmative consent? {: #ques_9 }

These requirements only apply when both:

- The Product handles personal or sensitive user data AND
- The handling of that personal or sensitive user data is not closely related to functionality
  described prominently in the Product's Chrome Web Store page and user interface.

Here are a few examples:

<table><tbody><tr><th>Description</th><th>Prominent Disclosure Required?</th></tr><tr><td>An extension whose sole marketed purpose is to sync a user's browser history to a central service.</td><td><strong>Prominent Disclosure not Required</strong><p>(a) Sensitive Data? Sensitive (web browsing activity)</p><p>(b) Relation to Described Functionality? Related (the marketed purpose was to sync the history)</p></td></tr><tr><td>An extension, app, or hosted app collects and transmits anonymous usage information about how frequently users click on or see various user interface elements of the Product.</td><td><strong>Prominent Disclosure not Required</strong><p>(a) Sensitive Data? Not Sensitive (this type of anonymous usage data is not personal or sensitive)</p><p>(b) Relation to Described Functionality? Unrelated (usage collection statistics aren't usually disclosed so prominently and aren't closely related to user functionality)</p></td></tr><tr><td>An extension whose sole marketed purpose is add themes to popular social media sites, but also anonymously scrapes the number of friends a user has, for sale or research purposes.</td><td><strong>Prominent Disclosure Required</strong><p>(a) Sensitive Data? Sensitive (website content or resources)</p><p>(b) Relation to Described Functionality? Unrelated (not closely related to a described functionality)</p></td></tr><tr><td>An extension, app, or hosted app that handles an email address for login purposes and also provides that email address to others for the others' marketing purposes.</td><td><strong>Prominent Disclosure Required</strong><p>(a) Sensitive Data? Sensitive (personally identifiable information)</p><p>(b) Relation to Described Functionality? Unrelated (while the use for authentication is closely related to the user functionality, the transfer to others for marketing purposes is not)</p></td></tr></tbody></table>

## 10\. How do I satisfy the prominent disclosure requirement? {: #ques_10 }

You must describe the types of personal or sensitive user data to be collected and how they will be
used, and obtain the user's consent to that collection and use. You must present the disclosure in a
prominent way, so that the user sees it prior to agreeing. The disclosure, however, must not be
located only in a privacy policy, terms of service, or similar document.

To obtain consent, the Product must ask the user to agree to the prominent disclosure in a manner
that requires them to take a specific action clearly agreeing to the disclosure before collecting or
using the personal or sensitive user data.

The prominent disclosure and consent must occur within the Product's user interface. Disclosures in
the Chrome Web Store description or inline installation page do not satisfy this requirement.

## 11\. Can my Product publicly disclose authentication, payment or financial Information? {: #ques_11 }

No. The Other Requirements section prohibits publicly disclosing authentication, payment, or
financial information; therefore this product would be in violation of our policies.

## 12\. Can my extension collect web browsing activity not necessary for a user-facing feature, such as collecting behavioral ad-targeting data or other monetization purposes? {: #ques_12 }

No. The Limited Uses of User Data section states that an extension can only collect and transmit web
browsing activity to the extent required for a user-facing feature that is prominently described in
the Chrome Web Store page and user interface. Ad targeting or other monetization of this data isn't
for a user-facing feature. And, even if a user-facing feature required collection of this data, its
use for ad targeting or any other monetization of the data wouldn't be permitted because the Product
is only permitted to use the data for the user-facing feature.

## 13\. What are examples of "user-facing features" for the purposes of the restriction on collecting and using web browsing activity in the [Other Requirements][8] section? {: #ques_13 }

A "user-facing feature" means functionality provided by the extension via a user interface element
(including interactive buttons, text, forms, and images). Compliance with the policy requires that
the extension have some type of user interface element and that the element provide some type of
functionality needing the web browsing data.

Examples of user-facing features include:

- A browser action button whose popup shows the WHOIS information for the current domain
- A dialog box added to websites by content script that allows users to view others' and add their
  own annotations to any web page
- A new tab page that includes a list of recently browsed websites

Examples of features that aren't user-facing include:

- A dialog box disclosing the collection of web browsing history
- An extension that has no interactive UI elements exposed to the user, but collects web browsing
  activity in the background for another purpose, including providing rewards to the user

## 14\. My extension or app handles personal or sensitive user data, but only stores information locally (or only uses Chrome Storage Sync API). Do I still need to post a privacy policy? {: #ques_14 }

Yes. This policy requires all Products that handle sensitive user information to post a privacy
policy. Users may not easily be able to tell which apps or extensions save information locally or
transmit it back to their servers. Your privacy policy, however, may not need to be long or
complicated. It just needs to describe how the Product collects, uses, and shares user data.

## 15\. How does the User Data Policy apply to client applications, such as FTP or IRC clients? {: #ques_15 }

When the Product is a client for an internet protocol with user-specified servers, like an FTP or
IRC client, the [Personal or Sensitive User Data][9] section does not apply to the Product's
collection of data for, or transmission of data with, the user-specified server.

For example, if an FTP client only connects to user-specified servers and does not send any data to
servers specified by the developer, the policy would not require the developer to post a privacy
policy or transmit the data securely (which would be impossible for FTP, because it's an unencrypted
protocol).

The User Data Policy still applies, however, to user data handled for other purposes. For example,
if the Product required users to enter an email address for registration, then the Product would
need to comply with the [Personal or Sensitive User Data section][10] of the policy.

## 16\. Does data transmitted between a Chrome app or extension and native programs on the same computer need to be encrypted? {: #ques_16 }

No. The requirement to handle the user data securely (under the [Posting a Privacy Policy & Secure
Transmission section][11]) does not apply to transmissions between a Chrome extension or app and a
native program on the same computer.

## Minimum Permission

### 1\. Why did Google create a "minimum permission" policy for Chrome extensions? {: #min_ques_1 }

Chrome Web Store provides a platform for users to access a wide variety of useful apps, and we want
extension users to be confident that their data is secure. We want to support the use of extension
permissions that directly benefit the user. In the past we've tried to ensure end-user safety and
security by recommending that extensions only use the minimum set of permissions necessary, but to
promote safe data use practices, we are now making that recommendation a requirement for all
extensions.

Extensions must require only the narrowest set of permissions necessary to provide their existing
services or features. Developers may use minimally-scoped optional permissions to further enhance
the capabilities of the extension, but must not require users to agree to additional permissions.
When an update requires additional permissions, end users will be prompted to accept them or disable
the extension. This prompt notifies users that something has changed and gives them control over
whether or not to accept this new use.

### 2\. Does the "minimum permission" policy also apply to optional permissions? {: #min_ques_2 }

Yes. The policy applies to both required and optional permissions.

### 3\. What does "minimum permission" mean here? {: #min_ques_3 }

Extensions must only require access to the narrowest set of permissions necessary to implement the
existing services or features of your product. If there is more than one permission that can be used
to implement a feature, you must choose the one that accesses the least amount of data.

### 4\. Will the "minimum permission" policy affect my extension? {: #min_ques_4 }

The exact impact will depend on what permissions you request and how they are used. You should
inventory your extensions' current permissions and, where possible, switch to alternatives that are
more narrowly scoped. Additionally, you should include a list of permissions used and the reasons
you require them in your Chrome Web Store listing or in an "about page" in your extension.

### 5\. My extension is currently using more permissions than needed so I can future-proof future versions of my extension. Is this ok under the "minimum permission" policy? {: #min_ques_5 }

No, extensions may not require permissions they do not need for their current functionality,
regardless of future plans. Extensions must only require permissions that enable their existing
services or features. Extensions may request additional capabilities via minimally-scoped optional
permissions. If you expand the features of your extension and require a new permission, you may only
request the permission in the updated version of the extension.

## Google Policies For User and Developer Data

### 1\. How does Google handle user data?

User data collected and processed by Google, including user comments and reviews, are governed by
the Google Privacy Policy. Unless Developers explicitly share extension user data with Google,
Google does not retain access to such data.

### 2\. How does Google handle Developer Data?

Google collects and processes several types of data from developers in order to provide the Chrome
Web Store services to the developer. This data includes the following:

- Information and metadata related to extensions and publication of those extensions on the Chrome
  Web Store for the purpose of listing such extensions
- Developer registration information
- Operational information such as developer actions to publish/remove extensions and revenue stats
- Information that enables CWS to communicate with developers, e.g., through the developer dashboard
  and through notifications

This data is governed by the Google Privacy Policy.

### 3\. What happens to developer data upon account termination by developers?

All developer data is deleted after termination of a developer account. Certain metadata needed to
continue to serve existing installed extensions, such as item ID, item type, and date of publication
are maintained.

## Data Access

### What information do developers have access to?

Developers have access to the following information:

- Aggregated data regarding installs, number of users, and average ratings.
- Extension statistics for extensions published through a publisher group that the developer is a
  member of.
- Support questions and suggestions.
- If the developers have published paid for extensions, access to the payment transactions through
  the
- rchant center as well as total payments.
- Information owned by groups to which the developer is a member, such as item stats.

## Limited uses of personal or sensitive user data {: #limited-use }

### 1\. What disclosures do I need to display on my project home page?

All extensions that request personal or sensitive user data must show a [][12]Limited Use disclosure
on your project's homepage or on a page one click away from the homepage; for example, in your
privacy policy. This Limited Use disclosure should be written by you, the developer, and should
clearly describe the app's compliance with the Chrome Web Store User Data Policy, including the
Limited Use requirements.

### 2\. What are the limited use requirements?

The limited use requirements have four elements:

- Allowed use
- Allowed transfer
- Prohibited advertising
- Prohibited human interaction

See the following entries for the policy limitations in each of these areas.

### 3\. What is the "allowed use" element of the limited use requirements?

Developers are only allowed to use permissions, which collect personal or sensitive user data, to
provide or improve your single purpose or user-facing features. It should be clear to your users why
and how you use the personal or sensitive user data they've chosen to share with you.

### 4\. What is the "allowed transfer" element of the limited use requirements?

Developers are only allowed to transfer user data to others if that transfer is (a) necessary to
provide or improve the single purpose of the extension, (b) to comply with applicable laws, (c) if
necessary for security purposes (for example, investigating abuse); or, (d) as part of a merger,
acquisition or sale of assets of the developer. All other transfers of personal or sensitive user
data are completely prohibited.

### 5\. What is the "prohibited advertising" element of the limited use requirements?

Developers are never allowed to use or transfer user data to serve users personalized, re-targeted,
or interest-based advertisements.

### 6\. What is the "prohibited human interaction" element of the limited use requirements?

Developers cannot allow humans to read user data. For example, a developer with access to a user's
data is not allowed to have one of its employees read through a user's emails. There are four
limited exceptions to this rule:

- The developer obtains a user's consent to read specific messages (for example, for tech support)
- It's necessary for security purposes (for example, investigating abuse)
- To comply with applicable laws
- The developer aggregates and anonymizes the data and only uses it for internal operations (for
  example, reporting aggregate statistics in an internal dashboard)

## Simplifying privacy practices for our users {: #simplify-privacy }

### 1\. What is required from developers to publish/update a Chrome Web Store item?

We have updated the privacy tab of the developer dashboard to allow developers to easily provide
information about their data collection and data usage in a simple and standardized way.

Every item will need to provide these data collection disclosures and limited use certification in
order to be updated or published.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/0XaRnPCCq1fB8eLzwu8w.png",
       alt="Screenshot of the data collection privacy field set", height="599", width="800" %}

### 2\. What happens if I don't fill out the limited use form?

There is a section on the developer dashboard that you need to fill out to communicate how your
extension uses personal or sensitive user data. If you don't complete this section, then your
extension will be displayed to users as not having provided this information.

Starting March 2021, the Chrome Web Store team will reach out to developers with a warning to
complete the disclosure requirement. Inaction after 30 days of the warning will result in the
suspension of affected items and the deactivation of the existing user-base.

### 3\. What happens if there are inconsistencies between my item's privacy policy, the disclosures provided through the developer dashboard, and the behavior of my item?

We take our users' privacy very seriously and so should every publisher of the Chrome Web Store. As
a publisher it is your responsibility to be transparent when handling Chrome users' data. Any
discrepancies between the developer dashboard disclosures, your privacy policy, and the behavior of
your item would be a violation of the [Chrome Web Store developer program policies][13]. This can
result in the suspension of all the items owned by the publisher, deactivation of the existing
user-base, and ban of the entire publisher entity (including related accounts).

[1]: http://blog.chromium.org/2016/08/from-chrome-apps-to-web.html
[2]: /apps/migration
[3]: /docs/extensions/branding
[4]: /docs/extensions/rating
[5]: /docs/extensions/program_policies
[6]: /docs/extensions/terms
[7]: https://www.youtube.com/watch?v=cBhZ6S0PFCY
[8]: /docs/webstore/program_policies#userdata_psud
[9]: /docs/webstore/program_policies#userdata_psud
[10]: /docs/webstore/program_policies#userdata_psud
[11]: /docs/webstore/program_policies#userdata_psud
[12]: /docs/webstore/program_policies#limited_use
[13]: /docs/webstore/program_policies
