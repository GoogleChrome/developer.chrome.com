---
layout: "layouts/doc-post.njk"
title: Frequently Asked Questions
date: 2020-06-09
updated: 2021-09-09
description: Frequently asked questions about the Chrome Web Store.
---

This FAQ answers some common questions about the [Chrome Web Store][webstore]. If you don't find your
answer here, check the [general extension FAQs][extension-faq], how to [troubleshoot Chrome Web Store
violations][troubleshoot-violations], or the
[chromium-extension group][chromium-extensions]. For additional technical questions and discussion, we recommend [Stack Overflow][stackoverflow-extensions].

{% Aside %}

Please expand the _Table of Contents_ to quickly navigate this page.

{% endAside %}

## General Questions

### What is the Chrome Web Store? {: #faq-gen-01 }

The Chrome Web Store is an open marketplace for [Google Chrome
Extensions][ext] and [Google Chrome Themes][themes], where consumers may browse, install, and
purchase items and install them in their browser. These items are built with web technologies and
run inside of web browsers.

### Why would someone install an extension instead of just using a bookmark or typing in a URL? {: #faq-gen-07 }

Users can use extensions to add new features to existing web apps, get relevant information on pages and get timely notifications about certain events.
Installing an extension also allows you to grant it privileges such as unlimited local storage and
background pages.

### How will users find my extension? {: #faq-gen-09 }

The Chrome Web Store will surface extensions in a variety of ways. Of course, each extension gets a page in
the store, which will be searchable via the store and other search engines. There will be category
lists in the store, as well as a variety of curated and algorithmically generated lists. We
recommend that you broadly promote your extension, through marketing websites and other means, so that
users will find your extension even outside of the store.

### Why am I being asked to pay a registration fee? {: #faq-gen-11 }

The registration fee helps to prevent fraud in the Chrome Web Store. You need to pay this one-time
fee before you can access the Chrome Web Store Developer Dashboard.

{% Aside %}
If you are already using the developer dashboard but haven't paid this fee yet, you must
now pay it in order to continue accessing your developer dashboard. This one-time fee is now part of
the standard [developer registration process][cws-register].
{% endAside %}

### Is there an approval process for extensions in the store? {: #faq-gen-08 }

All extensions go through an automated review process and in some cases, an extension will be published without
further manual review. There may be some instances in which a manual review will be required before
the extension is published based on our [program policies][program-policies]. In some cases, where sensitive permissions
are requested, review times and/or [approval times may be longer][cws-review-times].

### What types of extensions are not allowed in the store? {: #faq-gen-22 }

While we try to allow most extensions, a small number of extensions are explicitly
disallowed in our [Developer Terms of Service][terms-of-services] and [Program Policies][program-policies]. Such
extensions will be removed when they are brought to our attention.

### How do I report an abusive extension? {: #faq-gen-23 }

To report an extension which violates our Terms of Service, locate the corresponding listing
in the store and use the "Report abuse" link.

### How are items ranked in the store? {: #faq-gen-24 }

Items in the store are ranked or featured in order to make it easier for users to find high quality
content. Ranking is performed by a heuristic that takes into account ratings from users as well as
usage statistics, such as the number of downloads vs. uninstalls over time.

Other factors include the following:

- The design is pleasant to the eye.
- The item provides a clear purpose and fills a real user need.
- The setup and onboarding flow are intuitive.
- The item is easy to use.

### What are "By Google" extensions?

Certain extensions on the Chrome Web Store are marked as "By Google". These extensions have been
developed by Google and go through a rigorous review process. You may also search specifically for
these extensions by checking the "By Google" checkbox on the search pages.

### How are "Featured" items selected? {: #faq-gen-25 }

The Chrome Web Store team occasionally selects interesting listings as "Featured" listings. We're
not accepting requests to be featured at this point, since that would quickly become unmanageable.
Here are a few tips to increase the likelihood that we'll feature your listing:

- Write a great piece of software
- Make sure your listing looks really nice (nice icon, good descriptions, crisp screenshots and/or
  videos)
- Promote your listing independently so that it starts to rise in the rankings

### How can my extension be selected for a collection? {: #faq-gen-26 }

The collections are curated, and are not intended to be comprehensive. A collection is curated using
the ranking criteria already listed and may be selected to provide helpful results for certain
circumstantial situations, such as work-from-home extensions. Solicitations to be placed in a
collection are not accepted.

### How can I provide support for users of my extension? {: #faq-gen-27 }

First you must "Enable User Feedback" in your developer dashboard Account settings.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/ArMfJztL1OlP6UektUwb.png", alt="Enable User Feedback Support tab", width="700", height="85" %}

You can manage user feedback using the User Support tab of your dashboard item or you can add a
discussion group link like [Google Groups][google-groups] to the [Support URL][support-url] field.

### Can I remove comments from my listing if I believe they are unfair? {: #faq-gen-28 }

No, you can't remove user comments. However, we encourage you to respond to user feedback in the
comments to show that you are addressing their concerns.

You may also report fake reviews via the Developer [Support Form][cws-support].

### Is there a limit to the number of items I can have on the Chrome Web Store? {: #faq-gen-29 }

You can upload as many items to the Chrome Web Store as you like, but by default, you are limited to
having a total of 20 published items at any one time. This limit applies to the sum of your Themes and Chrome Extensions as a total—it is not 20 of each item. If you reach this limit, [you may
request a limit increase][cws-support]. The Chrome Web Store staff will review your existing items and your
developer account history, and if approved, you will be granted an increase. Please note that if
your developer account has been suspended in the past, or you have had items taken down previously
for policy violations, or your items consistently receive low quality ratings, your request may be
denied.


## Development

### Can I obfuscate my code? {: #faq-gen-30 }

As of October 1st 2018, developers must not obfuscate code or conceal functionality of their
extensions. This also applies to any external code or resource fetched by the extension package. For
more information, please review our [program policies][program-policies].

The following are some examples of code obfuscation:

- Base 64 encoding
- Character encoding

### How do I write an extension? {: #faq-dev-01 }

You can find all the information you need to develop extensions in the [Documentation for Chrome extensions developers][ext].

### How can I push an update of my code to my users? {: #faq-dev-02 }

To [Update your Chrome Web Store item][update-item], visit the [developer dashboard][dev-dashboard] and click on the listing you wish to
update. Once you upload a new version and click **Publish**, your update will automatically be
pushed out to users over the next few hours.

### Can I host my own extension? {: #faq-dev-03 }

You can host your own extensions in limited cases, such as for Linux or ChromeOS users. Consider [enterprise publishing][cws-enterprise] or developer mode.

## Creating a listing

### In what format should I upload my code? {: #faq-listing-01 }

To upload an item to the Chrome Web Store, submit a ZIP file containing the files used in your
extension. Do not upload a .crx file; the submission will fail.

### How long will it take for my listing to appear in the store? {: #faq-listing-02 }

The item won't appear in the web store until it has successfully completed the review process.
(Although the item's unique ID is generated as soon as you upload your first zip file.) For further
details, see [Chrome Web Store Review Times][cws-review-times].

Extensions which are published to the same domain as the publisher address may be approved more
quickly. Learn more about [enterprise publishing][cws-enterprise].

### How can I remove my listing from the store? {: #faq-listing-03 }

Visit the [developer dashboard][dev-dashboard]. Click the item you want to
remove from the store, so that the edit page for that item appears. Then click the "more options"
icon in the top right-hand corner and select **Unpublish**. Your listing will no longer be visible
in the store.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/GdnJe3SsuL84LFkLODZl.png", alt="Screenshot of how to unpublish an item", width="299", height="205" %}

### What are the screenshot and text requirements for the store? {: #faq-listing-04 }

See [Supplying Images][cws-images] for guidelines on supplying images for the store. Read more on [how to create a great listing][great-listing].

### How can I export an extension from the store? {: #faq-listing-06 }

Currently we do not support exporting a listing's sources or private key from the store.

### Why did I receive a "Cannot parse the manifest" error when uploading my extension? {: #faq-listing-07 }

The manifest file needs to be in JSON format. Most likely, you've included a comment in the manifest
file that is not recognized by the Chrome Web Store's JSON parser. Try removing any comments from
the manifest file and try re-uploading.

### I've verified my domain, and I have a wildcard URL like \*://example.com, but the Chrome Web Store is still asking me to verify my domain. What gives? {: #faq-gen-15 }

If you use a wildcard like \*://example.com, make sure you have verified both http://example.com and
https://example.com.

### When I try to upload to the Chrome Web Store, I get this error: "(Server rejected) An error occurred: please try again later." What gives? {: #faq-gen-16 }

This error occasionally occurs if you've been logged into the Chrome Web Store for a long time. If
you sign out of your Google Account and then sign back in, you should be able to upload your
extension.

### Can I control the regions where my extension is listed? {: #faq-gen-18 }

Yes, in the [Distribution
Tab][cws-distribution] you can specify which countries will see your item listing in the Chrome Web Store.

### How do I localize my listing in the store? {: #faq-gen-19 }

There are three points where you need to localize your extension for listing in a region that isn't your
home market.

1.  Your extension package. See [Internationalizing Your Extension][internationalize] for information on localizing your
    extension's presence inside Chrome.
2.  Your [detailed description][faq-localize-description]
3.  Your [screenshots][faq-localize-screenshots]

### How do I localize my detailed description? {: #faq-gen-20 }

You first need to [internationalize][internationalize] your extension and specify a "default_locale" attribute in your
manifest. Once you upload your internationalized extension, a selection box will appear at the top of your
extension listing, allowing you to switch between languages that you support and change the detailed
description.

### How do I show different screenshot images per region? {: #faq-gen-21 }

Visit your extension page in the [Chrome Web Store Developer Dashboard][dev-dashboard], change the currently
selected language to your desired choice (for example "en-GB") and upload a screenshot as normal.
Once the image is uploaded you will be presented with an option to "Show this item in **all**
locales" or "Show this item **only** in the 'en-GB' locale". Select the latter to show the screenshot
to only users of the "en-GB" Chrome Web Store.

### My item's status says "pending review." What does this mean? {: #faq-listing-08 }

This means that you've submitted your item for publishing and it is currently in the queue to be
[reviewed][cws-review]. The item will not appear in the store until it passes this review.

### How long will it take to review my item? {: #faq-listing-108 }

Review times vary; some reviews complete in a few hours, others take many days, and in some cases a
review can take several weeks. Some reasons that an item could require more extensive review
include:

- The item is suspected to contain or to be distributed by [malware or unwanted software][malware-policy].
- The item is suspected to violate one of the [developer program policies][program-policies].
- The item may have already been previously removed for a legal or policy violation, and has been
  resubmitted.
- The item requests powerful permissions that require in-depth review.

{% Aside %}

Note that all item submissions—whether for a new item or an update to an existing one—are
subject to the same [review process][cws-review].

{% endAside %}

If your item's status says "pending review" for more than three weeks, you should [contact
support][cws-support].

### Why isn't my extension showing up on search? {: #faq-listing-09 }

It depends. There are several reasons why your item may not be showing up in search.

- You just published your extension. It might take a few hours before we index it.
- Your extension manifest version is out of date. Upgrade your item to a current [valid manifest version][manifest-version].
- Your extension is not listed in the region you are searching in. Check your [geographical distribution][region-distribution] in the Distribution Tab.

### My extension has been removed from the Chrome Web Store. What should I do? {: #faq-listing-10 }

Extension removals count as strikes against the good standing of your developer account. Multiple
or egregious policy violations may result in [termination of your developer account][account-suspended].

- For all policy violation extension removals, you will receive a removal notification email with more
  details in the developer account listed as the owner of the extension. You can also find
  this information in the [Status Tab][comply-policies] of your item.
- Please make the appropriate
  changes so your extension complies with all [Developer Program Policies][program-policies], [Branding
  Guidelines][branding] and [Terms of Services][terms-of-services]. For additional help, see the
  [Troubleshooting violations FAQ][troubleshoot-violations].
- Once you have remedied the violation you can
  resubmit via your developer dashboard.
- Please do not re-publish a removed extension until the policy violation has been remedied. If
  you have additional questions, follow the instructions in the [CWS Complaint Handling FAQ][complaint-handling].

### My Chrome Web Store account has been suspended. What should I do? {: #faq-listing-12 }

If you believe your developer account was wrongly terminated, you can appeal [here][cws-support]. We will
  only reinstate accounts if an error was made, and a re-review finds that your account does not
  violate the developer terms. For more information, check the [CWS Complaint Handling FAQ][complaint-handling].

### How do I link my Play and Chrome Web Store item so that the "Available for Android" link appears on my item detail page? {: #faq-listing-11 }

We regularly run a script that looks for exact matches between the item name and the developer email
address in Play and CWS. If there is an exact match, the "Available for Android" link will
automatically show up on your item detail page the next time the script runs. At this point, there
is no way to enter the information into your listing.

## Additional Troubleshooting

If you continue experiencing issues with your Chrome Web Store item, please [contact
us][cws-support] with any additional details regarding the problem.

### How can I raise P2B concerns?

European developers can raise concerns about clarity of terms, policies, or other Platform To
Business related issues by contacting [CWS support][cws-support].

[account-suspended]: #faq-listing-12
[apps]: /docs/apps/
[branding]: /docs/webstore/branding
[bug-tracker]: https://crbug.com
[chrome-release-blog]: https://chromereleases.googleblog.com/
[chromium-extensions]: https://groups.google.com/a/chromium.org/g/chromium-extensions
[complaint-handling]: /docs/webstore/complaint-faq
[comply-policies]: /docs/webstore/manage/#comply-with-chrome-web-store-policies
[cws-distribution]: /docs/webstore/cws-dashboard-distribution/
[cws-enterprise]: /docs/webstore/cws-enterprise/
[cws-images]: /docs/webstore/images/
[cws-register]: /docs/webstore/register
[cws-review]: /docs/webstore/review-process/
[cws-review-times]: /docs/webstore/review-process/#review-time
[cws-support]: https://support.google.com/chrome_webstore/contact/developer_support/
[dev-channel-build]: https://www.chromium.org/getting-involved/dev-channel
[dev-dashboard]: https://chrome.google.com/webstore/developer/dashboard
[faq-localize-description]: #faq-gen-20
[faq-localize-screenshots]: #faq-gen-21
[ext]: /docs/extensions/
[extension-faq]: /docs/extensions/mv3/faq
[google-groups]: https://groups.google.com
[great-listing]: /docs/webstore/best_listing/
[internationalize]: /docs/webstore/i18n
[malware-policy]: https://www.google.com/about/company/unwanted-software-policy.html
[manifest-version]: /docs/extensions/mv3/manifestVersion
[program-policies]: /docs/webstore/program-policies
[region-distribution]: /docs/webstore/cws-dashboard-distribution/#setting-the-geographic-distribution
[stackoverflow-extensions]: https://stackoverflow.com/questions/tagged/google-chrome-extension
[support-url]: /docs/webstore/cws-dashboard-listing/#support-url
[terms-of-services]: /docs/webstore/terms
[themes]: /docs/extensions/mv3/themes/
[troubleshoot-violations]: /docs/webstore/troubleshooting/
[update-item]: /docs/webstore/update
[webstore]: https://chrome.google.com/webstore
