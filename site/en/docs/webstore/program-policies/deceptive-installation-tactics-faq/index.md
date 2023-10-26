---
layout: "layouts/doc-post.njk"
title: Deceptive Installation Tactics FAQ
date: 2019-06-24
updated: 2021-08-25
description: >
  Frequently asked questions about Chrome Web Store's policies on deceptive
  installation tactics.
---

## Why is Chrome Web Store enforcing on deceptive installation tactics for extensions?

Transparency is critical to ensuring a positive user experience, and developers are accountable for
how they market their extensions. Unfortunately, we have seen instances of developers using ads,
landing pages, bundled offers, and abusive design patterns to mislead users into installing an
extension they may not want or need.

## What does a compliant "disclosure" consist of?

A compliant disclosure explains to the user what they can expect from your Chrome extension.

A disclosure must include two components, along with any additional information the developer
considers necessary for the user.

*   The fact that a user will be installing a Chrome browser extension.

*   What the extension does. Content in both the marketing and installation flow of an extension
    must clearly outline both the principal and significant features of your extension. Burying this
    information in unrelated text is considered a violation of this policy.

In addition to including these components, the disclosure must comply with the following:

*   Disclosures must be in readable text and utilize contrast to ensure the disclosure is legible.
    Disclosures in an image or audio form must be accompanied by a text disclosure.

*   The disclosure must be above and clearly associated with the first link or button that leads to
    the Chrome Web Store.

Additionally, other elements on the referrer page must not mislead the user about the extension's
functionality. Images, audio, text or video that imply a functionality that the extension does not
provide directly will be considered deceptive, even with a compliant text disclosure.

## What is a "misleading interactive element?"

A misleading interaction elicits user engagement (for example, a call-to-action button or form) that
implies any outcome other than the installation of a browser extension. An example might be
requesting that a user input a tracking ID for a package, but the "Track" button leads to either an
extension listing or a landing page for an extension related to package tracking.

Call-to-action buttons (CTA) cannot be affirmations for irrelevant actions ("Play now," "I'm
Human"). General CTA such as "Continue," "Next," or "Add Now," are not prohibited, but must comply
with the disclosure requirements to provide adequate context to the user.

Misleading interactive elements are not limited to those that lead to the Chrome Web Store listing.
Confusing interactions after a user closes the extension listing are subject to our guidelines.

## What is an "unrelated user action"?

Any interactive elements which require user response or participation, which is not closely related
to the primary functionality of the extension, is considered to be an "unrelated user action".

Unrelated user action includes, but is not limited to, requiring users to:

*   Install another app, extension, or other software that is not necessary for the core function of
    the extension

*   Interact with ads

*   Submit reviews

The following are considered to be related user actions and would be considered compliant:

*   Creating or logging into an account associated with the extension

## Can I bundle multiple extensions or offers in the same installation flow?

No. Every extension must have its own, distinct installation flow.

## What are the requirements for Chrome Web Store listing windows?

The Chrome listing includes essential information about the extension that the Chrome Web Store is
able to review. The window should be sized such that the user can easily review all the content on
the extension listing, not just the title and "Add to Chrome" button. Unfortunately, we have seen
bad actors make the listing window smaller to trick users into installing an extension.

To comply with this requirement, the referrer page must ensure that the listing window is no smaller
than the size of the referrer, and does not have the effect of withholding or hiding extension
metadata from the user. Referrer pages cannot utilize distracting elements, such as animations or
audio, to interrupt the installation flow.

## I comply with Ads policies, do I comply with the Chrome Web Store policy?

Not necessarily. While CWS and Ads policies overlap, they are distinct and impact different
components of your extension. It is the responsibility of the developer to comply with both.
However, a violation of the [Google Ads
Misrepresentation][ads-misrepresentation] Policy or [Abusing the ad
network][abuse-ad] does violate Chrome Web Store
[Developer Program Policies][program-policies]


## What if I use affiliates that independently create and advertise my extensions?

Extensions must be marketed responsibly. It is up to the publishing entity to ensure that all parts
of your extension and all installation flows are compliant with all Chrome Web Store Developer
Program policies. We will remove extensions from the Chrome Web Store irrespective of whether the
developer or its contractors or affiliates engage in deceptive installation tactics. Repeated abuse
may additionally result in the permanent termination of your publisher account and possibly the
termination of any associated publisher account(s).

## What happens to an extension found engaging in deceptive installation tactics?

A notification email will be sent to the associated developer account of the extension about the
action taken against your extension. Depending on the egregiousness of the deceptive behavior there
are different outcomes for your extension:

*   A warning email that deceptive installation tactics for your extension have been identified

*   Immediate removal of the violating extension and disabling of its active user base

*   Repeated abuse may result in the permanent termination of your publisher account and possibly
    the termination of any associated publisher account(s)

## What should I do if I receive a warning email?

Review all of your extension's marketing materials, both developed by you or a 3rd party, for
compliance per our program policies. Repeated warnings may result in removal of your extension from
the Chrome Web Store, the disabling of your extension's user base, the termination of your publisher
account, and possibly the termination of any associated publisher account(s).

## Is there a way to appeal this decision?

If you received a warning email or your publisher account was terminated, you can fill out the [CWS
Support form][cws-support-form] to receive further clarifications and appeal the decision.
To learn more, see the [Complaint handling
process FAQ][complaint-faq].

[abuse-ad]: https://support.google.com/adspolicy/answer/6020954
[ads-misrepresentation]: https://support.google.com/adspolicy/answer/6020955
[complaint-faq]: /docs/webstore/complaint-faq
[cws-support-form]: https://support.google.com/chrome_webstore/contact/one_stop_support
[program-policies]: /docs/webstore/program-policies

