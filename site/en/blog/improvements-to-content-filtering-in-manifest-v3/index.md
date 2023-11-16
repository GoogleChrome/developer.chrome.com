---
title: 'Improving content filtering in Manifest V3'
description: >
layout:
  'layouts/blog-post.njk'
date: 2023-11-15
authors:
  - oliverdunk
hero: 'image/wVNVUJS8Z8O04i1tJKSdsp6nkRQ2/foYIvRORtNnUNP0oFJGZ.png'
alt: ""
tags:
  - extensions-news
---

Over the past year, we have been actively involved in discussions with the vendors behind several content blocking extensions around ways to improve the MV3 extensions platform. Based on these discussions, many of which took place in the WebExtensions Community Group ([WECG](https://github.com/w3c/webextensions/tree/main)) in collaboration with other browsers, we have been able to ship significant improvements.


## More static rulesets

Sets of filter rules are usually grouped into lists. For example, a more generic list could contain rules applicable to all users while a more specific list may hide location-specific content that only some users wish to block. Until recently, we allowed each extension to offer users a choice of 50 lists (or “static rulesets”), and for 10 of these to be enabled simultaneously. In discussions with the community, extension developers provided convincing evidence showing this was too low for certain use cases.  After looking at the performance of the API in Chrome with these discussions in mind, we are now allowing up to 50 to be enabled simultaneously. (Notably, this is significantly higher than the limit of 20 requested in the WECG.) We also allow for 100 rulesets in total. This is shipping in Chrome 120 and increasing the limits is supported by both Firefox and Safari who both provided early input on this proposal.


## More dynamic rules

Most rules are “static” and ship with each update to an extension. However, to support more frequent updates and user-defined rules, extensions can add rules dynamically too, without their developers having to upload a new version of the extension to the Chrome Web Store.

When an extension can dynamically modify requests in ways that were not checked during Chrome Web Store review, this exposes users to risks of phishing or data theft. For example a redirect rule could be misused to inject affiliate links without consent. 

Consequently, we only allowed extensions to add up to 5,000 rules which encouraged using this functionality sparingly and made it easier for us to detect abuse.

However, developers from extensions including [AdGuard](https://github.com/w3c/webextensions/issues/319#issue-1443611618) and Adblock Plus performed their own analysis and shared data that a higher limit would allow for more up to date rules and for users with a higher number of custom lists to migrate to Manifest V3. In fact, [AdGuard](https://chrome.google.com/webstore/detail/adguard-adblocker/bgnkhhnnamicmpeenaelnjfhikgbkllg) reported that more than 2600 changes are made to popular lists each week, and of the five percent of users using custom filter lists, one in four of those users have a combined total of more than 5,000 dynamic rules across them ([source](https://github.com/w3c/webextensions/issues/319#issue-1443611618)). AdGuard noted this as a significant challenge for migrating their extension to Manifest V3 and we heard similar feedback from other content blockers.

We determined that some filter rules, such as those with an action of `block` or `allow`, are much safer and are less likely to be abused. They also happen to make up the large majority of ad block filter rules. Based on this, I drafted and [shared a proposal](https://github.com/w3c/webextensions/issues/319#issuecomment-1682073791) in the Web Extensions Community Group to define a set of rules that we consider lower risk and allow up to 30,000 of these. We still keep an upper limit to avoid performance regressions.

This proposal was supported in the Web Extensions Community Group so we implemented it. Starting with Chrome 121, the higher limit of **30,000** rules applies to safe DNR rules, which we are defining as rules with an action of `block`, `allow`, `allowAllRequests` or `upgradeScheme`.

Based on the data shared by AdGuard, between [98 and 99 percent of their rules](https://github.com/w3c/webextensions/issues/319#issuecomment-1664109907) should benefit from this higher limit. Any remaining rules are still supported and can be added within the existing limit.

This is available in Chrome as the [MAX\_NUMBER\_OF\_DYNAMIC\_RULES](/docs/extensions/reference/declarativeNetRequest/#property-MAX\_NUMBER\_OF\_DYNAMIC\_RULES) constant. The rule limit for all other dynamic net request rules stays at 5,000.


## Reduced ruleset size

In Chrome 118, we [changed](/docs/extensions/whatsnew/#118-url-filter-case-sensitive) the default value for the `isUrlFilterCaseSensitive` field to `false` based on feedback from the community. This field controls if a rule that filters by URL is case sensitive, and we learned that most developers had a different default in their extension. Consequently, the value had to be set many times over. By making this change developers are able to achieve significant size reductions on their rulesets.


## What’s next?

We are committed to continuing to invest in the declarativeNetRequest API so we can support as many use cases as possible, and look forward to continuing to work with the community. In particular, we’d like to thank members of the WECG for their engagement, including AdGuard for sharing a significant amount of the data that drove this work, and all browser vendors who have all been a major part of designing this API.

We will continue to review the limits we have in place to make adjustments where needed. To support this, we plan to share some of the data we collected as part of this work in the near future. Additionally, we are working on adding additional capabilities like the ability to match against response headers, which is a common request we’ve seen from PDF viewer extensions. In all cases, we’ll continue to communicate our work, and use the [Web Extensions Community Group](https://github.com/w3c/webextensions) regularly as a place to discuss ideas and align on what we’d like to look at next.
