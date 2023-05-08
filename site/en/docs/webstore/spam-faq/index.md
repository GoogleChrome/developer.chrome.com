---
layout: "layouts/doc-post.njk"
title: "Spam policy FAQ"
date: 2020-05-01
updated: 2022-11-30
description: Frequently asked questions about Chrome Web Store's spam policy.
---

This document provides answers to questions about how the Chrome Web Store spam policy may impact
extensions (or any other items) that developers submit to the Chrome Web Store.

## Repetitive content {: #repetitive-content }

### What is a repetitive content violation? {: #definition }

Our developer policy prohibits the [submission of repetitive
content][spam-policy]. In general, this means you cannot submit multiple
extensions that provide the same experience.

More specifically, developers cannot submit content that provides the same user experience, even if
the metadata or code are not identical. Some examples of repetitive content include:

* Multiple extensions with highly similar functionality, content, and user experience. If these
  extensions are each small in content volume, and provide the same single purpose, developers
  should create a single extension that aggregates all the content. For example, multiple extensions
  which merely provide different wallpapers when installed should be aggregated into a single
  extension.
* Template extensions which create a spammy experience in the Chrome Web Store.
* Data or format converters that are listed as multiple extensions (for example, Fahrenheit to
  Celsius, Celsius to Fahrenheit), but which all direct the user to the same multi-format converter
  web page.

Multiple extensions that provide different user experiences are not considered repetitive content.

### Are all extensions subject to the repetitive content policy? {: #breadth }

While all extensions are checked by the CWS review team for violations of this policy, we will allow
certain valid use cases that require repetitive content. These allowed exceptions include:

* Extensions that work only on specific hosts. Specifically, you may create bespoke versions of your
  extension targeted to your customers' hosts. To qualify for the Specific Host exception, each
  version must request, in the manifest, access to permissions that are limited to that host.
* Extensions that are published privately within your domain. Extensions published as unlisted or
  public, even if distributed through a single domain, do not qualify for this Publish to Domain
  (PTD) exemption.
* Enterprise extensions which provide B2B or B2B2C solutions, such as white label resellers, or
  which utilize multiple instances for versioning purposes. These extensions must be unlisted and
  distributed directly to your clients.

In order to qualify for these exceptions, developers must include details regarding the use case
exception in the extension's description and the single purpose field. For example:

* "THIS EXTENSION IS LIMITED TO [HOST NAME] ONLY"
* "THIS EXTENSION IS PUBLISHED TO [DOMAIN NAME] ONLY"
* "THIS IS A WHITE LABEL ENTERPRISE EXTENSION FOR [CUSTOMER NAME]"
* "THIS EXTENSIONS WORKS WITH THE SPECIFIC VERSION [VERSION NAME] OF THE DESKTOP APPLICATION
  [APPLICATION NAME]"

If your enterprise extension works with specific versions of a desktop application, provide the name
and version of that desktop application in the justification field, and include the extension's
version in its title.

Extensions claiming these exceptions will be reviewed to ensure qualification, and may face
enforcement. Developers found to be circumventing enforcement by abusing these exceptions will face
account level suspension.

### Does this apply to affiliated developers? {: #affiliates }

We don't allow any developer or their affiliates to submit repetitive content. If related developers
or publishers submit multiple extensions that provide duplicate experiences or functionality, that
is a repetitive content violation. Competing extensions from unrelated developers or publishers are
not considered repetitive content.

### Can I have both a test version and a production version of my extension? {: #test-version }

We do allow publication of separate test and production variants of an extension. In this case the
test variant of the extension must be clearly labeled:

* The description must clearly identify the purpose of the variant. For example, "THIS EXTENSION IS
  FOR BETA TESTING" or "THIS EXTENSION IS A PRE-DEVELOPMENTAL BUILD FOR TESTING PURPOSES".

* The extension's title should also identify the extension variant. For example, applying the word
  "BETA" or "DEVELOPMENT BUILD" to the title.

* The description of any non-production variants should include the URL of the production variant,
  so that users can find it. You may also wish to link from the production variant to any others so
  that users can find those too. (If you have a version that you want to test without allowing
  general access, you should not list it as public, but instead [publish to test
  accounts][test-accounts].)


### Can developers appeal a repetitive content violation? {: #appeal }

You can appeal a repetitive content violation if you think it was flagged in error. Appeals can be made by using the [CWS Support form][cws-support-form]. To learn more, see the [Complaint handling
process FAQ][complaint-faq].

### How can developers consolidate their user base? {: #consolidation }

Developers can only consolidate their user base before enforcement action is taken against their
extensions, beginning on August 27, 2020. If you do not remove the repetitive extensions before this
policy is enforced against them, you will lose your user base.

If you have repetitively submitted extensions and want to retain your user base:

* Choose one instance to retain
* Update the other instances to tell your users how to migrate to the retained instance
* Publish these updates
* Remove all other instances from the Chrome Web Store in order to avoid enforcement action
  against your extensions.

### Will any of the repetitive extensions be retained?  {: #retention }

No. On August 27, 2020, the Chrome Web Store will begin removing repetitively submitted extensions.
None of them will be retained. This is why you should make sure to bring your listings into
compliance and remove duplicates before August 27, 2020.

### Will extensions that provide duplicate experiences, but that are geo-focused & localised (language specific) be considered a violation of repetitive content policy? {: #localization }

For example:

 - Product ABC - UK
 - Product ABC - Germany

Yes. Extensions that provide duplicate experiences—and which differ only in localization—violate the
policy. Developers should implement any language-specific code within a single extension.

## Keyword spam {: #keyword-spam }

### How many sites/keywords/brands can be listed in the metadata? {: #keyword-repetition }

This depends on how relevant the keywords are in context, however, it's best to keep  instances of a
specific keyword to under 5. Keywords must be relevant to the extension's purpose and not
unnecessarily repeat in an unnatural way. Including more than 5 instances of a single keyword may
result in increased scrutiny of your extensions, but will be allowed if its use is considered
appropriate and relevant.

When listing supported websites or brands in the description, do not list more than five. To provide
a longer list of brands or websites, provide a link that users can refer to or embed the list in one
of the extension's promotional screenshots.

### Can the extension description contain information about additional topics related to the extension? {: #unrelated-information }

No. Don't provide information that is not directly relevant to the extension. For example, sports
team wallpaper should not include team stats and history in the description of the wallpaper
extension. Similarly, an extension targeted at a particular industry should not include general
information about that industry in its description.

### What is the maximum number of times the extension's primary purpose can be mentioned in the description? {: #purpose-repetition }

Do not mention one word or phrase repeatedly in the description even if it is the primary purpose of
the extension, unless its use is critical. For example, an extension that provides puzzles should
not call out the word _puzzle_ more than five times in the description.

### Can the extension's short description be repeated in the extension's description? {: #short-description-repetition }

We advise developers to not repeat the short description included in the extension's
`manifest.json` in its Chrome Web Store's description because the short description is
automatically included above the extension’s description on the Chrome Web Store listing.
However, this would not be considered a violation. 

## User ratings, reviews, and installs {: #ratings-and-reviews }

### What does it mean to manipulate placement? {: #manipulate-placement }

Manipulating placement refers to artificially manipulating how the Chrome Web Store orders and
displays an extension. Such practices are expressly forbidden.

### Can I provide incentives for users to download my extension? {: #download-incentives }

No. The offer of incentives to download a Chrome Web Store extension is not allowed. For example, a
game should not award in-game bonuses for installing an extension. The features of your extension
should be incentive enough.

### Can I review or rate my own extension? {: #self-review }

No. Submitting a rating or review of your own extension, using your own account or other accounts,
may be interpreted as an attempt to manipulate the extension's placement in the Chrome Web Store.
This also includes ratings and reviews coming from other developers or users that are affiliated
with the publisher.

## Extension functionality {: #functionality }

### Can I publish an extension that directs users to my app? {: #app-promotion }

This is allowed only as an auxiliary feature within the overall extension functionality. It cannot
be the single purpose of the extension.

[complaint-faq]: /docs/webstore/complaint-faq
[cws-support-form]: https://support.google.com/chrome_webstore/contact/one_stop_support
[spam-policy]: /docs/webstore/program-policies/spam-and-abuse
[test-accounts]: /docs/webstore/cws-dashboard-distribution#private-visibility-trusted-testers
