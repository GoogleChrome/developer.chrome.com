---
layout: 'layouts/doc-post.njk'
title: 'Privacy Budget'
subhead: >
  Limit the amount of individual user data exposed to sites to prevent covert tracking.
description: >
  A proposal to limit the amount of individual user data exposed to sites to prevent covert tracking.
date: 2022-03-04
authors:
  - alexandrawhite
---

## Implementation status

This document outlines a new proposal for preventing covert tracking: the 
Privacy Budget.

*  The [Privacy Budget 
   proposal](https://github.com/bslassey/privacy-budget) has entered [public
   discussion](https://github.com/bslassey/privacy-budget/issues).
*  Privacy Budget has not yet been implemented in any browser. 
*  [The Privacy Sandbox
   timeline](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline) 
   provides implementation timings for Privacy Budget and other Privacy Sandbox 
   proposals.

## Why do we need this proposal?

As browsers continue to change how cookies are treated, some user-tracking 
efforts have moved to harder-to-detect methods which subvert cookie controls. 
These methods, known as _fingerprinting_, rely on varied techniques to 
determine unique browsers, hidden from users.

{% Aside 'key-term' %}
A _fingerprinting surface_ is any interaction point where a website can learn 
information about a given user (such as network identifiers or user language) 
or device (such as the specific device model). This data can be returned by 
JavaScript APIs.

Fingerprinting surfaces are most problematic for privacy when combined with 
other sources of information, as this could lead to covert identification of 
users over time.
{% endAside %}

The Privacy Budget proposal suggests a limit to the amount of individual user 
data that can be exposed to sites, so that in total it is insufficient to 
track and identify individuals. This requires quantifying how much users share 
with third-parties, which may be determined through:

*  [K-anonymity](https://en.wikipedia.org/wiki/K-anonymity): a property 
   possessed by some anonymized data, where “k” is the number of other users 
   with identical information
*  [Entropy](https://en.wikipedia.org/wiki/Entropy_(information_theory)): an 
   information theory which, when applied, means there's a level of 
   uncertainty inherent to the possible limit of data
*  [Differential privacy](https://en.wikipedia.org/wiki/Differential_privacy): 
   a system to ensure that no one individual data can be determined in a set 
   of aggregated data

The maximum tolerance for an amount of information revealed about each user is 
the privacy budget. The fewer fingerprinting surfaces available to a site and 
the lower the granularity of information revealed lowers the possibility for 
identification of any single user.

### Measure fingerprinting data

The success of the Privacy Budget proposal relies on browsers estimating the 
information revealed by each fingerprint surface.  Browsers will also need to 
measure the total information exposed to a site. These measurements will need 
to be reported back to a single service. 

There are a number of possible ways to measure this data, and Chrome is 
actively exploring solutions.

### Reduce total information exposed to sites

Once the total information is measured across the web, we expect to analyze 
exposed API surfaces to prioritize what information is necessary and what 
doesn't need to be shared.

In accounting for the privacy budget, data revealed by passive fingerprinting 
would be assumed to be used by a site. It's important that passive 
fingerprinting surfaces are reduced, such as achieved by [User-Agent 
reduction](/docs/privacy-sandbox/user-agent/) and proposed by 
[IP Protection](/docs/privacy-sandbox/gnatcatcher/).

## How could a privacy budget be enforced?

Once the average site accesses a reasonable amount of data, a budget could be 
meaningfully enforced by the browser. The Privacy Budget proposal suggests 
that above a set data threshold, the budget could be enforced in a number of 
ways. For example:

*  API calls which violate the budget could cause an error;
*  If possible, API calls could be replaced with a privacy-preserving call 
   which returns noised results or generic results which are not tied to a 
   single user;
*  Storage and network requests could be declined, so that the site cannot 
   exfiltrate new information.

### Exceptions to the budget

Some applications, such as 3D games and video conferencing, may never be able 
to run within a reasonable privacy budget. There are some options, including a 
permissions prompt for users, which could allow those applications to run. How 
these exceptions will be handled is open to discussion.

## When will the Privacy Budget be available?

The earliest date of scaled availability represents the earliest date when 
Privacy Budget could be enforced. This will not happen before 2024.

At this time, Privacy Budget is a proposal and has not been implemented for 
any browser.

## Engage and share feedback

The Privacy Budget proposal is under active discussion and subject to change in the future.

*  **GitHub**: Read the [proposal](https://github.com/bslassey/privacy-budget), 
   [raise questions and participate in 
   discussion](https://github.com/bslassey/privacy-budget/issues).
*  **Developer support**: Ask questions and join discussions on the [Privacy 
   Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
