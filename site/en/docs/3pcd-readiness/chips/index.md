---
layout: layouts/doc-post.njk
title: Cookies Having Independent Partitioned State
subhead: >
  A Privacy Sandbox proposal that will allow developers to opt a cookie into "partitioned" storage, with separate cookie jars per top-level site.
description: ''
date: 2023-07-26
updated: 2023-07-26
authors:
  - mihajlija
  - albertomedina
---

[CHIPS (Cookies Having Independent Partitioned State)](/docs/privacy-sandbox/chips/) is a web platform mechanism that enables opting-in to having third-party cookies partitioned by top-level site using a new cookie attribute `Partitioned`.

If you have a service that is used as a component on another site, any cookies it sets are in a cross-site context. The way cookies currently work, the same cookie that service C sets on site A, can be read when service C is embedded on site B.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/4eKoilhldt8qdmiEvEDo.jpg", alt="Diagram showing sites and storage with unpartitioned cookies.", width="800", height="450" %}

If your service and the sites using it have a 1:1 relationship, those cookies are only ever needed on the site where they were set and not used across multiple sites. [Examples](/docs/privacy-sandbox/chips/#use-cases) include saving preferences for a widget or sharing a session cookie for an API.

In this case, having cookies partitioned by top-level site is an improvement as it reduces the complexity and risk of cross-site data leaks. Third-party cookies can still be used across sites, however, you will see different cookies when the browser is on different top-level sites.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/Myb2Km4gEVROgCi5NZFQ.png", alt="Diagram showing sites and paritioned storage with cookies.", width="800", height="393" %}

```text
Set-Cookie: __Host-cookie=value; SameSite=None; Secure; Path=/; Partitioned;
```

## Learn more

For more details about technical design, use cases, and testing, check out [CHIPS documentation](/docs/privacy-sandbox/chips/).
