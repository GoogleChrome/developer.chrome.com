---
layout: 'layouts/doc-post.njk'
title: 'Bounce tracking mitigations'
subhead: >
   Reduce or eliminate the ability of bounce tracking to recognize people
   across contexts.
description: >
   Reduce or eliminate the ability of bounce tracking to recognize people
   across contexts.
date: 2022-10-04
updated: 2023-06-16
authors:
  - anusmitaray
---

## Implementation status {: #status}

This document outlines a [new proposal for bounce tracking mitigations](https://github.com/privacycg/nav-tracking-mitigations/blob/main/bounce-tracking-explainer.md).

{% Partial 'privacy-sandbox/timeline/bounce-tracking.njk' %}

[The Privacy Sandbox timeline](http://privacysandbox.com/timeline) provides implementation timings for bounce tracking mitigation and other Privacy Sandbox proposals.

## Why do we need this proposal? {: #proposal-reason}

Browser vendors are now actively removing third-party cookies from the web. Consequently, some platform trackers are introducing bounce tracking.

{% Aside 'key-term' %}
*Bounce tracking* is a method of circumventing anti-tracking browser settings. This allows third-party vendors to set and read first-party cookies.
{% endAside %}

The bounce tracking mitigations proposal aims to:

-   Reduce or eliminate the ability of bounce tracking to [recognize people across contexts](https://w3ctag.github.io/privacy-principles/#hl-recognition-cross-context).
-   Prevent stateful bounces from simulating third-party cookies when third-party cookies are disabled, either due to browser policy or user settings.
-   Avoid breaking supported use cases valued by the user that are implemented using stateful redirects.
-   Mitigate the impact of short-lived domains that may not be adequately addressed by other privacy interventions that rely on blocklists.
-   Avoid using block or allow lists to decide which websites are affected.

## How will bounce tracking mitigations work? {: #how-it-works}

Our proposal will address bounce tracking in the following use cases:

-   **Third-party cookie simulation**: Sites that use redirection to a third-party tracker to create a cookie bypass browser settings. To mitigate this issue, the browser could wipe the tracker's domain storage.
-   **Outgoing redirection**:  Sites that redirect all outgoing links through a tracker domain. To mitigate this issue, the browser could wipe the tracker's domain storage.

Chrome intends to protect users from bounce tracking by periodically deleting state for these tracking sites. The process will work as follows:

1. Chrome will monitor navigations and internally flag sites that are part of a "stateful bounce". This means a navigation redirected through the site, and that the site accessed state during the redirection. This includes both server-initiated redirections and client-side redirections where JavaScript programmatically triggers a navigation. Accessing state includes both cookies and other types of storage; for example, localstorage, indexedDB, and so on.
1. Chrome will periodically examine the list of flagged sites and check to see if the user has actively used the site by interacting with it within the last 45 days. This interaction can occur before, during, or after the bounce was detected.
1. If the site does not have any user interaction and third-party cookies are blocked, then its state will be deleted.

We hope to launch these changes to users who have opted-in to blocking third-party cookies in early Q3 2023.

### Out-of-scope use cases

Redirect flows that are out-of-scope include: federated authentication, SSO and payments. This is because these flows, while similar to bounce tracking scenarios, involve direct user interaction. You can find [further information in the explainer](https://github.com/privacycg/nav-tracking-mitigations/blob/main/bounce-tracking-explainer.md).

-   **Federated authentication**: [Federated authentication](/docs/privacy-sandbox/fedcm/) occurs when a user clicks on a **Login with Identity Provider** button on the web, for example, Facebook, GitHub, or Google.
-   **Single sign-on**:  When a site uses single sign-on (SSO), the user expects to log in with the identity provider once and then be automatically logged-in for all visits on other sites.
-   **Payments**: There are a wide variety of payment flows in use on the web today and the proposal aims to have them continue functioning.

### Security considerations

There are some [security considerations for this proposal that have been outlined in the bounce tracking mitigations explainer](https://github.com/privacycg/nav-tracking-mitigations/blob/main/bounce-tracking-explainer.md#privacy-and-security-considerations).

## When will bounce tracking mitigations be available? {: #availability}

Currently [this proposal is available for testing in Chrome](/blog/bounce-tracking-mitigations-dev-trial/). We hope to launch these changes to users who have opted-in to blocking third-party cookies in early Q3 2023.

This proposal largely only adds value when third-party cookies are disabled. Third-party cookies can be used to achieve mostly the same results as bounce tracking. Therefore it is not a goal to enable these mitigations when third-party cookies are enabled.

## Engage and share feedback {: #feedback}

The bounce tracking mitigations proposal is being tested and subject to change in the future. If you have any feedback, we'd love to hear it.

-   **GitHub**: Read the [proposal](https://github.com/privacycg/nav-tracking-mitigations/blob/main/bounce-tracking-explainer.md), [raise questions and participate in discussion](https://github.com/privacycg/proposals/issues/6).
-   **Developer support**: Ask questions and join discussions on the [Privacy Sandbox Developer Support repository](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
-	**Chromium bug tracker**: You can provide feedback in the [Chromium bug tracker](http://crbug.com/new) using the "Privacy>NavTracking" component.
