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
authors:
  - anusmitaray
---

## Implementation status {: #status}

This document outlines a [new proposal for bounce tracking mitigations](https://github.com/wanderview/bounce-tracking-mitigations).

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

### Out-of-scope use cases

Redirect flows that are out-of-scope include: federated authentication, SSO and payments. This is because these flows, while similar to bounce tracking scenarios, involve direct user interaction. You can find [further information in the explainer](https://github.com/privacycg/nav-tracking-mitigations/blob/main/bounce-tracking-explainer.md).

-   **Federated authentication**: [Federated authentication](/docs/privacy-sandbox/fedcm/) occurs when a user clicks on a **Login with Identity Provider** button on the web, for example, Facebook, GitHub, or Google.
-   **Single sign-on**:  When a site uses single sign-on (SSO), the user expects to log in with the identity provider once and then be automatically logged-in for all visits on other sites.
-   **Payments**: There are a wide variety of payment flows in use on the web today and the proposal aims to have them continue functioning.

## How will bounce tracking mitigations be enforced? {: #enforcement}

This proposal doesn't have any additional API surface, instead it changes the behavior of the browser.

At a high level the proposal is for the browser to automatically delete storage for a site (eTLD+1) when both the following conditions are true:
*  The browser believes that state has been stored during a redirect bounce.
*  The browser has not had any signals that the user is performing a supported use case on the site (eTLD+1).

Clarifying these definitions will be a key part of the bounce tracking mitigation effort.

Enforcement for bounce tracking mitigation is still [in discussion](https://github.com/privacycg/proposals/issues/6).

### Security considerations

There are some [security considerations for this proposal that have been outlined in the bounce tracking mitigations explainer](https://github.com/privacycg/nav-tracking-mitigations/blob/main/bounce-tracking-explainer.md#privacy-and-security-considerations).

## When will bounce tracking mitigations be available? {: #availability}

This proposal largely only adds value when third-party cookies are disabled. Third-party cookies can be used to achieve mostly the same results as bounce tracking. Therefore it is not a goal to enable these mitigations when third-party cookies are enabled.

## Engage and share feedback {: #feedback}

The bounce tracking mitigations proposal is under active discussion and subject to change in the future. If you have any feedback, we'd love to hear it.

-   **GitHub**: Read the [proposal](https://github.com/privacycg/nav-tracking-mitigations/blob/main/bounce-tracking-explainer.md), [raise questions and participate in discussion](https://github.com/privacycg/proposals/issues/6).
-   **Developer support**: Ask questions and join discussions on the [Privacy Sandbox Developer Support repository](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
