---
layout: layouts/doc-post.njk
title: First-Party Sets
subhead: >
  A new web platform mechanism allows developers to declare domains that can share cookies.
description: ''
date: 2023-07-26
updated: 2023-07-26
authors:
  - mihajlija
  - albertomedina
---

[First-Party Sets (FPS)](/docs/privacy-sandbox/first-party-sets/) is a new web platform mechanism that allows a company that owns multiple sites to declare a collection of related domains as being in a First-Party Set. Sites that are part of a First Party Set would be able to access cookies across the set of included domains.

## Cookie-related Scenarios

Today, sharing cookies among different sites belonging to the same organization, can be achieved by setting the **sameSite** attribute to **'none'**. But once third-party cookies are phased out, this approach to share cookies across a specific set of sites will no longer work.

First-party sets enable multi-domain sites to declare relationships between the components of a set of domains, and browswers can use such information to handles cookie access accordingly. This capability facilitates proper functioning of features such as:

- Single sign-on
- Shared shopping carts on multi-domain sites
- All cross-site contexts under unilateral control

## Declaring First Party Sets

First-party sets are declared in JSON format, and Chrome uses these declared relationships to decide when to allow or deny a site access to their cookies when in a third-party context.

The following example shows the declaraion of a first-party set with `travel.site` as the primary domain, and a list of associated sites, currently containing `air-travel.site`.

```json
{
  "primary": "https://travel.site",
  "associatedSites": ["https://air-travel.site"]
}
```

With this declaration, sites outside the First-party Set will not be able to get access to the storage partitions of any of the sites in the FPS:

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/zbeLi9FbtJVhLXiCiRig.png", alt="Diagram showing only sites within the same First-Party Set accessing each other's cookies, while the third site is denied access.", width="800", height="452" %}

## Storage access

Declaring sites as part of a First-Party Set allows them to use the [Storage Access API (SAA)](/docs/privacy-sandbox/first-party-sets-integration/#storage-access-api) and the [requestStorageAccessFor API](/docs/privacy-sandbox/first-party-sets-integration/#requeststorageaccessfor-in-chrome) to request access to each other's storage partitions, including cookies.

Top-level sites can request storage access on behalf of specific origins with [`Document.requestStorageAccessFor()`](https://privacycg.github.io/requestStorageAccessFor/).

```js
document.requestStorageAccessFor('https://target.site');
```

## Learn more

For more details about technical design, use cases, and set submission process, check out the following references:

- [First-Party Sets developer documentation](/docs/privacy-sandbox/first-party-sets-integration/)
- [Proposal](https://github.com/privacycg/first-party-sets): Public explanation for the proposed solution
- [Public Discussion](https://github.com/privacycg/first-party-sets/issues): Public questions and feedback about the proposal
- [Public Deck](https://github.com/w3ctag/meetings/blob/gh-pages/2021/telcons/First-Party%20Sets%20TAG%20Discussion.pdf): 2021 - Public presentation
- [Video Overview](https://www.youtube.com/watch?v=cNJ8mZ-J3F8): Short summary video
- [Dev Documentation](/docs/privacy-sandbox/first-party-sets/): Additional detail and developer guidance
