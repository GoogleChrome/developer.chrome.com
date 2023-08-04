---
layout: layouts/doc-post.njk
title: First Party Sets
subhead: >
  A new web platform mechanism to declare a collection of related domains as being in a First-Party Set.
description: ''
date: 2023-07-26
updated: 2023-07-26
authors:
  - mihajlija
---

Blocking cross-site cookies or partitioning by top-level site would prevent [use cases](/blog/first-party-sets-sameparty/#usecases) such as single sign-on or a shared shopping cart.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/NIUl4xLnUCe3yYP7TblC.png", alt="Diagram showing three sites accessing each other's cookies.", width="800", height="446" %}

[First-Party Sets (FPS)](/docs/privacy-sandbox/first-party-sets/) is a web platform mechanism for developers to declare relationships among sites, so that browsers can use this information to enable limited cross-site cookie access for specific, user-facing purposes. Chrome will use these declared relationships to decide when to allow or deny a site access to their cookies when in a third-party context.

Declaring your sites as part of a First-Party Set will allow you to use [Storage Access API (SAA)](/docs/privacy-sandbox/first-party-sets-integration/#storage-access-api) and the [requestStorageAccessFor API](/docs/privacy-sandbox/first-party-sets-integration/#requeststorageaccessfor-in-chrome) to request access to those cookies.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/zbeLi9FbtJVhLXiCiRig.png", alt="Diagram showing only sites within the same First-Party Set accessing each other's cookies, while the third site is denied access.", width="800", height="452" %}

## Declaring First Party Sets

First-party sets are declared in JSON format. In the following example, the primary domain is `travel.site`, and `air-travel.site` is in the list of associated sites.

```json
{
  "primary": "https://travel.site",
  "associatedSites": ["https://air-travel.site"]
}
```

## Storage Access

Top-level sites can request storage access on behalf of specific origins with [`Document.requestStorageAccessFor()`](https://privacycg.github.io/requestStorageAccessFor/) (rSAFor).

```js
document.requestStorageAccessFor('https://target.site');
```

## Learn more

For more details about technical design, use cases, and set submission process, check out [First-Party Sets developer documentation](/docs/privacy-sandbox/first-party-sets-integration/).
