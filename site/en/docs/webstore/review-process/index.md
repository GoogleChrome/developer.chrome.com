---
layout: "layouts/doc-post.njk"
title: "Chrome Web Store review process"
date: 2021-12-10
# updated: 2021-12-10
description: >
  An overview of the review process and how enforcement actions result from detected policy violations.
---

This document provides an overview of the Chrome Web Store review process and the enforcement
actions that are taken when an extension violates the Chrome Web Store's policies. The enforcement
practices described in this document are accurate as of the document's last updated date and are
subject to change without notification.

See [Lifecycle of a Chrome Web Store item][doc-lifecycle] for an overview of how reviews fit in the
lifecycle.

The review process helps protect end users from scams, data harvesting, malware, and malicious
actors seeking to take advantage of Chrome users, as well as from extensions that inadvertently
violate policy.

## The basics {: #basics }

When you submit an extension for review, the review team will review the extension for compliance
with the [developer program policies][doc-dpp] and, if any violations are found, take appropriate
[enforcement actions][header-enforcement].

Existing items are also reviewed periodically for compliance. We do this because the extension
ecosystem is constantly evolving; as malicious actors evolve their attacks or exploits are
discovered, the review process must also evolve in response. Also, as the developer program
policies change, we need to ensure that existing published items comply with current policy in order
to protect end users.

## Review times {: #review-time }

Chrome Web Store review times can vary. In early 2021, most submissions completed review in less
than 24 hours, with over 90% completed within three days.

{% Aside %}

If your extension is pending review for more than three weeks, please [contact developer
support][header-support] to request assistance.

{% endAside %}

The review process uses a combination of manual and automated systems. All submissions go through
the same review system, regardless of the tenure of the developer or number of active users.
However, some signals may cause the reviewer to examine an extension more closely, including:

* new developers
* new extensions
* dangerous permission requests
* significant code changes

These signals may therefore cause the review to take longer. Review times may also be longer than
normal after an extension has been rejected or warned.

### Notable factors that increase review time  {: #review-time-factors }

Reviews may take longer for extensions that request broad host permissions or sensitive execution
permissions, or which include a lot of code or hard-to-review code.

Broad host permissions

: [Host permissions][doc-host-perms] patterns like `*://*/*`, `https://*/*`, and `<all_urls>` give
  extensions extensive access to the user's web activity, especially when combined with other
  permissions. Extensions with this kind of access can collect a user's browsing history, hijack web
  search behavior, scrape data from banking websites, harvest credentials, or exploit users in other
  ways.

Sensitive execution permissions

: Permissions grant extensions special data access and manipulation rights. Some permissions do this
  directly (for example, `tabs` and `downloads`) while others must be combined with host permissions
  grants (for example, `cookies` and `webRequest`). Review must verify that each requested
  permission is actually necessary and is used appropriately. Requesting powerful and potentially
  dangerous capabilities takes more time to review.

Amount and formatting of code

: The more code an extension contains, the more work it takes to verify that code is safe.
  Obfuscation is disallowed as it increases the complexity of the validation process. Minification
  is allowed, but it can also make reviewing extension code more difficult. Where possible, consider
  submitting your code as authored. You may also want to consider structuring your code in a way
  that is easy for others to understand.

## Review outcomes {: #outcomes }

There are a number of possible pass/no-pass outcomes, depending on whether it's a publishing review
or a periodic re-review. These outcomes are described in the following sections.

### Publishing review outcomes {: #publish-outcomes }

This section describes how we handle policy violations that we find while reviewing an extension
submitted for publishing.

{% Aside %}

Existing published items may also be checked for these same violations; that process is described in
the [Periodic review outcomes][header-periodic-outcomes] section.

{% endAside %}

Publish review requests have two basic outcomes.

- **No violations are found:** The submission is approved and can be published to the Chrome Web
  Store.
- **A violation is found:** The submission is [rejected][header-rejection] and the developer is
  informed why.

See [Developer communication][header-comms] for details on how these outcomes are communicated back
to the developer and how developers can contact the review team regarding the outcome.

Finally, a third potential outcome is that the submission is found to contain malware or another
extreme policy violation. See the [malware][header-malware] section for details on how these
verdicts are enforced.

### Periodic review outcomes {: #periodic-outcomes }

This section describes how policy violations are handled during the periodic review process. Note
that a violation identified during the [publishing review][header-publish-outcomes] process may
trigger a re-review of the currently published version of the extension.

{% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/J0afA0FTf3TbbcOawOD3.png", alt="Illustration of
   potential review outcomes and policy enforcement practices. Text details found in the 'Periodic
   review outcomes' and 'Violation enforcement' sections.", width="731", height="885" %}

Existing published extensions are occasionally subject to review outside of the standard submission
time review process. Possible reasons for this include, but are not limited to regular periodic
review, review triggered by a violation observed in a new submission, and user reports of unexpected
or malicious behavior.

There are four outcomes for review of a published item:

- **No violations are found:** No action is taken. The extension remains on the Chrome Web Store.
- **A minor violation is found:** A warning is sent to the developer about the violation. The
  developer has a set amount of time to address the violation before the item will be taken down.
  See [warning][header-warning] for more information.
- **A more serious violation is found:** The extension is immediately taken down and the developer
  is notified of the violation. See [takedown][header-takedown] for more information.
- **An extreme issue is found:** The extension is immediately taken down and the developer **is
  not** notified. See [malware][header-malware] for more information.

See [Developer communication][header-comms] for details on how this is communicated and how to
appeal the verdict.

## Violation enforcement {: #enforcement }

In the event that a policy violation is identified during the review process, the Chrome Web Store
will take appropriate action depending on the type of review being performed, the severity of
violation, the discretion of the reviewer, and potentially other factors.

### Rejection {: #rejection }

Rejection can occur in response to a "Submit for review" request. If the submission is found to
violate Chrome Web Store policy but is not an egregious policy violation, the submission will be
rejected.

In some cases, a violation detected in a submission may trigger a review of the published extension.
If the violation is also found in the published version of the extension, additional enforcement
actions may be taken.

{% Aside %}

Rejection applies only when the submission is not found to contain malware or other extreme policy
violation. If an extension is found to contain malware during the submission review process, proceed
directly to [malware enforcement][header-malware].

{% endAside %}

Developer communication

: The publisher email address associated with the extension will be sent an email stating that the
  submission was rejected. The rejection emails will state which policy the extension violated and
  provide the developer with guidance on how to appeal the verdict.

Chrome Web Store listing

: The extension's listing in the Chrome Web Store is not affected; the description text, image
  assets, privacy disclosures, and published CRX all remain unchanged.

Chrome UI

: End users are not notified when a submission is rejected.

### Warning {: #warning }

If a currently published item is found to contain minor policy violations, Chrome Web Store Review
will notify the extension publisher of the violation via email. Depending on the violation, the
publisher are typically given 7 to 30 days to address the issue(s). The extension developer can
resolve the warning by submitting a new version of the extension that fixes the violation(s) using
the standard submission process. If the violation is not addressed within the warning period, the
extension will be taken down.

The following information only covers the warning period. See [Takedown][header-takedown] for
additional information on takedown handling.

Developer communication

: The publisher email address associated with the extension will be sent a warning email stating
  that the extension will be taken down due to one or more policy violations. The exact length of
  the warning period depends on the observed violation.

  If the developer does not resolve the violation(s) within the warning period, the publisher will
  receive another email explaining that the warning period expired and that the extension has been
  taken down. See [Developer communication][header-comms] for additional information about email
  communication.

Chrome Web Store listing

: The extension's Chrome Web Store listing is not affected during the warning period. The item will
  remain available for download and existing users will be able to update to the most recent
  successfully published version of the extension.

Chrome UI

: End users are not notified during the warning period.

### Takedown {: #takedown }

Takedown refers to the act of removing an extension from the Chrome Web Store. In most situations
takedowns are not permanent: the extension's publisher can return the extension to the web store by
submitting a new version that resolves the policy violation and passing the review process.

Takedowns occur in two primary scenarios. First, immediate takedowns occur when reviewers detect one
or more policy violations of moderate or greater severity in the published version of an extension.
Second, delayed takedowns occur after the [warning period][header-warning] for a minor policy
violation expires. In both cases, the impact of the takedown is the same.

Developer communication

: The publisher email address associated with the extension will be sent an email stating that the
  extension has been taken down due to one or more policy violations. In the case of an expired
  warning, the email will include a reference to the warning email the developer previously
  received.

Chrome Web Store listing

: When an extension is taken down, it will no longer be available in the Chrome Web Store. If normal
  users attempt to access the extension's listing, Chrome Web Store will return a 404 error. If
  the developer that owns the extension or a member of the extension's group publisher list (if
  there is one) is logged into the Chrome Web Store, they will see the last published version of the
  extension and a warning at the top of the window indicating that the extension has been taken
  down. Additionally, the item will not appear in Chrome Web Store search results, collections,
  category listings, or elsewhere in the Chrome Web Store's consumer UI.

Chrome UI

: End users are not notified of the enforcement action immediately after takedown. If the violation
  remains unresolved for several weeks, Chrome will automatically disable the extension and notify
  the end user that the extension violates Chrome Web Store policy. Users may choose to re-enable
  the extension if they wish.

### Malware and extreme violations {: #malware }

The Chrome Web Store Review team has special procedures for egregious policy violations. In cases
such as malware distribution, deceptive behavior designed to evade review, repeated severe
violations indicative of malicious intent, and other egregious policy violations, more drastic
measures are necessary.

To limit the potential for these developers to further harm users, the Chrome Web Store
team intentionally does not provide details regarding these violations. Additionally, in more severe
cases the developer's Chrome Web Store account will be permanently suspended.

Developer communication

: Unlike other enforcement actions, notification **is not** sent to the publisher's email address
  when the extension(s) are taken down. In the event that the developer's Chrome Web Store account
  is suspended, the developer will be sent an email to notify them of that enforcement action.

Chrome Web Store listing

: Just as with a [takedown][header-takedown], the offending item is removed from the Chrome Web
  Store.

Chrome UI

: The violating extension is disabled on all end user devices. Unlike standard takedowns, these
  extensions cannot be re-enabled. Chrome notifies the user that the extension has been disabled
  because it was found to contain malware. Users may choose to remove the extension or dismiss the
  dialog.

## Developer communication {: #comms }

The Chrome Web Store review process has two primary ways of communicating with developers: automated
emails sent to the extension publisher's email address and support tickets.

Support tickets must be opened using the [One Stop Support][header-support] form, but once a
ticket is opened all communication takes place over email.

### Automated emails {: #emails }

In all but the most extreme policy violations, the Chrome Web Store will send developers automated
emails informing them about the violation observed and the enforcement action taken. These emails
state what policy or policies were violated, link to troubleshooting documentation related to the
violation, and provide the developer with guidance on how to appeal the verdict.

### One Stop Support {: #support }

The [One Stop Support contact form][page-oss-form] provides Chrome Web Store publishers with a
single contact point to request assistance with a variety of issues.

{% Details %}
{% DetailsSummary %}

Appealing a review verdict

{% endDetailsSummary %}

Use the following steps to appeal a [takedown][header-takedown] or [warning][header-warning].

1. Open the [One Stop Support contact form][page-oss-form].
2. Select "My item (extensions, app, or theme)".
3. Select "My item was warned / removed / rejected".
4. Select why you are appealing, and the reference color and element.
5. Review the violation troubleshooting guidance.
6. Provide additional details as requested by the form.

{% endDetails %}

{% Details %}
{% DetailsSummary %}

Appealing an account suspension

{% endDetailsSummary %}

Use the following steps to appeal a developer account suspension.

1. Open the [One Stop Support contact form][page-oss-form].
2. Select "My developer account".
3. Select "My account was suspended".
4. Provide additional details as requested by the form.

{% endDetails %}

A few minutes after submitting a support request, you should receive an email with a unique ID for
your support request. Depending on the size of the support queue and the specific violation, it may
take up to three days to receive a reply. If you do not receive a response within that period, you
can reply to the initial case email to request an update.

Please only open one support request per enforcement action. Multiple support requests makes it more
difficult for the agents assisting you to find and keep track of all of the relevant information
about your issue.

[doc-dpp]: /docs/webstore/program-policies
[doc-host-perms]: /docs/extensions/mv3/declare_permissions/
[doc-lifecycle]: /docs/webstore/manage/#about-the-lifecycle-of-an-item-in-the-chrome-web-store
[header-basics]: #basics
[header-comms]: #comms
[header-emails]: #emails
[header-enforcement]: #enforcement
[header-malware]: #malware
[header-outcomes]: #outcomes
[header-periodic-outcomes]: #periodic-outcomes
[header-publish-outcomes]: #publish-outcomes
[header-rejection]: #rejection
[header-review-time-factors]: #review-time-factors
[header-review-time]: #review-time
[header-support]: #support
[header-takedown]: #takedown
[header-warning]: #warning
[page-oss-form]: https://support.google.com/chrome_webstore/contact/one_stop_support
