---
layout: "layouts/doc-post.njk"
title: Deceptive Installation Tactics FAQ
date: 2019-06-24
description: >
  Frequently asked questions about Chrome Web Store's policies on deceptive
  installation tactics.
---

## Why is Chrome Web Store enforcing on deceptive installation tactics for extensions?

User transparency is important, and developers are accountable for how they market their extensions.
Unfortunately, we have seen instances of developers using ads and landing pages to mislead users
into installing an extension they may not want or need.

## What does a compliant "disclosure" consist of?

A compliant disclosure explains to the user what they can expect from your Chrome extension.

A disclosure must include two components, along with any additional information the developer
considers necessary for the user.

- The fact that a user will be downloading a Chrome browser extension.
- What the extension does. The single purpose of your extension must be clear to the user, and not
  buried in unrelated text.

In addition to including these components, the disclosure must comply with the following:

- Keep disclosures in readable text and utilize contrast to ensure the disclosure is legible.
  Disclosures in an image or audio form must be accompanied by a text disclosure.
- The disclosure must be above the first link or button that leads to the Chrome Web Store.

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

Quite likely yes, but they are different policies and it is the responsibility of the developer to
comply with both. However, a violation of the [Google Ads Misrepresentation][1] Policy or [Abusing
the ad network][2] does violate Chrome Web Store [Developer Program Policies][3].

## What if I use affiliates that independently create and advertise my extensions?

Extensions must be marketed responsibly, and it is up to the developer to ensure that all parts of
your extension and all installation flows are compliant with all our program policies. We will
remove extensions from the Chrome Web Store irrespective of whether the developer or its contractors
or affiliates engage in deceptive installation tactics.

## What happens to an extension found engaging in deceptive installation tactics?

A notification email will be sent to the associated developer account of the extension about the
action taken against your extension. Depending on the egregiousness of the deceptive behavior there
are different outcomes for your extension:

- A warning email that deceptive installation tactics for your extension have been identified
- Immediate removal of the violating extension and disabling of its active user base

## What should I do if I receive a warning email?

Review all of your extension's marketing materials, both developed by you or a 3rd party, for
compliance per our program policies. Repeated warnings may result in removal of your extension from
the Chrome Web Store and disabling of your extension's user base.

## Is there a way to appeal this decision?

Yes, appeals can be made through the instructions included in the notification email you will
receive to the email address listed under your CWS developer account. Our enforcement team will
process the appeal within 48 hours.

[1]: https://support.google.com/adspolicy/answer/6020955
[2]: https://support.google.com/adspolicy/answer/6020954
[3]: /docs/webstore/program_policies/
