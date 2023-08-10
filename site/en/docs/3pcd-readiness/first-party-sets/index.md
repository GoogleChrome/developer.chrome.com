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
---

With the upcoming deprecation of third-party cookies, there is a mechanism to allow sites to use shared cookies in a validated, safe manner.

[First-Party Sets (FPS)](/docs/privacy-sandbox/first-party-sets/) allows websites to specify a set of sites that can share cookies, much like third-party cookie usage, but on a restricted scale.

Today, if you want to share cookies among your different sites, you need to set sameSite='none', but that means all other sites, even those not belonging to you, will get your cookies on every request.

Once third-party cookies are deprecated, you won't have that option, and these "third-party" sites will not be sent the cookies.

A Privacy Sandbox solution to this problem, and the use cases discussed next, is to indicate a list of related sites you own that the browser should treat as first-party sites. That's what First-Party Sets lets you accomplish.

## Use cases

Using First-party sets, multi-domain sites can declare relationships between domains so the browser understands the relationships and handles cookie access appropriately.

First-Party Sets facilitates proper functioning of features such as:

- Single sign-on
- Shared shopping carts on multi-domain sites 
- All cross-site contexts you control 


<!--
{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/NIUl4xLnUCe3yYP7TblC.png", alt="Diagram showing three sites accessing each other's cookies.", width="800", height="446" %}
-->

Chrome uses these declared relationships to decide when to allow or deny a site access to their cookies when in a third-party context.

Declaring your sites as part of a First-Party Set will allow you to use [Storage Access API (SAA)](/docs/privacy-sandbox/first-party-sets-integration/#storage-access-api) and the [requestStorageAccessFor API](/docs/privacy-sandbox/first-party-sets-integration/#requeststorageaccessfor-in-chrome) to request access to those cookies.


## Declaring First Party Sets

First-party sets are declared in JSON format. In the following example, the primary domain is `travel.site`, and `air-travel.site` is in the list of associated sites.

```json
{
  "primary": "https://travel.site",
  "associatedSites": ["https://air-travel.site"]
}
```
Note how sites not in the First-party Set are outside the boundaries of sites that can share cookies:

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/zbeLi9FbtJVhLXiCiRig.png", alt="Diagram showing only sites within the same First-Party Set accessing each other's cookies, while the third site is denied access.", width="800", height="452" %}

## Storage access

Top-level sites can request storage access on behalf of specific origins with [`Document.requestStorageAccessFor()`](https://privacycg.github.io/requestStorageAccessFor/).

```js
document.requestStorageAccessFor('https://target.site');
```

## Learn more

For more details about technical design, use cases, and set submission process, check out [First-Party Sets developer documentation](/docs/privacy-sandbox/first-party-sets-integration/).
