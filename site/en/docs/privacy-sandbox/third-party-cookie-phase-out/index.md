---
layout: 'layouts/doc-post.njk'
title: 'Prepare for phasing out third-party cookies'
subhead: >
  Learn how to audit your code to look for third-party cookies and what action you can take to ensure you're all set for the end of third-party cookies.
description: >
  Learn how to audit your code to look for third-party cookies and what action you can take to ensure you're all set for the end of third-party cookies.
date: 2023-05-17
updated: 2023-07-27
authors:
  - mihajlija
---

Third-party cookies are the main mechanism that enables cross-site tracking and several major browsers either already placed restrictions on third-party cookies in some way or are planning to. Third-party cookies also enable many valid use cases such as managing state in embedded content or enabling user sessions across multiple sites.

As part of the [Privacy Sandbox](https://privacysandbox.com/) project, Chrome is phasing out support for third-party cookies and proposing new functionality for cookies along with purpose-built APIs to continue supporting legitimate use cases while preserving user privacy. The phase out will be gradual, [starting from midway through 2024](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline).

To get ready for the future without cross-site tracking, audit your use of cookies and plan the actions needed if your site is impacted.

## Overview

1.  [Identify first-party and third-party cookies](#identify) in your code. Cookies that contain `SameSite=None` will require updates.
1.  If you use third-party cookies in a fully contained, embedded context, investigate [partitioned cookies](#partitioned-cookies).
1.  If you need third-party cookies across multiple sites that form one cohesive group, investigate [First-Party Sets](#first-party-sets).
1.  If you're not covered by either of these options, [investigate other Privacy Sandbox APIs](#other-apis) for individual use cases that don't rely on cross-site tracking.

## Identify your first-party and third-party cookies {: #identify }

Cookies can be first-party or third-party relative to the user's context; depending on which site the user is on at the time. This distinction between first-party and third-party context on the web isn't always obvious and the effect it has on different resources can vary.

Cookies are associated with the site that set them and they can be sent on HTTP requests or accessed by JavaScript. If the site in the browser's location bar matches the site associated with the cookie request, then that's a first-party cookie. If the site is different, it's a third-party cookie.

### First-party cookies

If your cookie is never used on a third-party site, for example if you set a cookie to manage the session on your site and it's never used in a cross-site iframe, that cookie is always used in a first-party context.
{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/ArhVqaVr6O2X0mE0YYxp.png", alt="Diagram showing a first-party cookie.", width="800", height="653" %}
To identify your first-party or same-site cookies, look for:

-   Cookies set without any `SameSite` attribute.
    -   `Set-Cookie: cookie-name=value;`
-   Cookies with `SameSite` set to `Lax` or `Strict`.
    -   `Set-Cookie: cookie-name=value; SameSite=Lax;`
    -   `Set-Cookie: cookie-name=value; SameSite=Strict;`

{% Aside 'important' %}
In this case, your cookie should not be affected by third-party cookie phase out.

If you have not explicitly set the `SameSite` attribute with an appropriate value on your first-party cookie, you should do that to ensure consistent behavior across browsers.

{% endAside %}

There are a number of other sensible defaults for other first-party cookie attributes in the best practice recipe:

```text
Set-Cookie:
__Host-cookiename=value;
Secure;
Path=/;
HttpOnly;
Max-Age=7776000;
SameSite=Lax
```

For more details, check out [Recipes for first-party cookies](https://web.dev/first-party-cookie-recipes).

### Third-party cookies

Cookies that are sent in cross-site contexts, like iframes or subresource requests, are generally referred to as third-party cookies.
{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/NJLl1qG9AN8tD9GwR2jp.png", alt="Diagram showing a third-party cookie.", width="800", height="646" %}
[Some use cases for third-party cookies](https://web.dev/samesite-cookie-recipes/#use-cases-for-cross-site-or-third-party-cookies) include:

-   Embedded content shared from other sites, such as videos, maps, code samples, and social posts.
-   Widgets from external services such as payments, calendars, booking, and reservation functionality.
-   Widgets such as social buttons or anti-fraud services.
-   Remote resources on a page such as `<img>` or `<script>` tags, that rely on cookies to be sent with a request (commonly used for tracking pixels and personalizing content).

[In 2019, browsers changed the cookie behavior, restricting them to first-party access by default](https://web.dev/samesite-cookies-explained/#changes-to-the-default-behavior-without-samesite). Any cookies used in cross-site contexts today must be set with `SameSite=None` attribute.

```text
Set-Cookie: cookie-name=value; SameSite=None; Secure
```

{% Aside 'important' %}
Make sure to review your cookies and have a list of those set with the `SameSite=None`. These are the cookies for which you will need to take action to ensure they keep functioning properly.
{% endAside %}

## Debugging cookies

One way to identify third-party cookies in your code base is to search for cookies containing `SameSite=None`.

Another option is to browse through your site with third-party cookies blocked on your machine and use DevTools to investigate any potential breakage. 

To learn more about DevTools features you can use to investigate third-party cookies check out [the instructions on chromium.org](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox/third-party-cookie-phaseout/).

In Chrome version 115 or higher, you can test the browser behavior after third-party cookie phase out by [running Chrome from the command line](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/) with the flag `--test-third-party-cookies-phaseout`. This will block third-party cookies, enable [third-party storage partitioning](/docs/privacy-sandbox/storage-partitioning) and [FedCM](/docs/privacy-sandbox/fedcm), and enable Chrome UI settings for [First-Party Sets](docs/privacy-sandbox/first-party-sets-integration) (["Allow related sites to see your activity in the group"](https://support.google.com/chrome/answer/95647?hl=EN#zippy=%2Callow-related-sites-to-access-your-activity)).

If your site breaks when third-party cookies are blocked, you can report the issue to [Chrome's cookie breakage tracker](goo.gle/report-3pc-broken).

## Partitioned cookies

[CHIPS (Cookies Having Independent Partitioned State)](/docs/privacy-sandbox/chips/) is a web platform mechanism that enables opting-in to having third-party cookies partitioned by top-level site using a new cookie attribute `Partitioned`.

If you have a service that is used as a component on another site, any cookies it sets are in a cross-site context. The way cookies currently work, the same cookie that service C sets on site A, can be read when service C is embedded on site B.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/4eKoilhldt8qdmiEvEDo.jpg", alt="Diagram showing sites and storage with unpartitioned cookies.", width="800", height="450" %}

If your service and the sites using it have a 1:1 relationship, those cookies are only ever needed on the site where they were set and not used across multiple sites. [Examples](/docs/privacy-sandbox/chips/#use-cases) include saving preferences for a widget or sharing a session cookie for an API.

In this case, having cookies partitioned by top-level site is an improvement as it reduces the complexity and risk of cross-site data leaks. Third-party cookies can still be used across sites, however, you will see different cookies when the browser is on different top-level sites.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/Myb2Km4gEVROgCi5NZFQ.png", alt="Diagram showing sites and paritioned storage with cookies.", width="800", height="393" %}

```text
Set-Cookie: __Host-cookie=value; SameSite=None; Secure; Path=/; Partitioned;
```
### Learn more

For more details about technical design, use cases, and testing, check out [CHIPS documentation](/docs/privacy-sandbox/chips/).

## First-Party Sets

[First-Party Sets (FPS)](/docs/privacy-sandbox/first-party-sets/) is a web platform mechanism for developers to declare relationships among sites, so that browsers can use this information to enable limited cross-site cookie access for specific, user-facing purposes. Chrome will use these declared relationships to decide when to allow or deny a site access to their cookies when in a third-party context.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/NIUl4xLnUCe3yYP7TblC.png", alt="Diagram showing three sites accessing each other's cookies.", width="800", height="446" %}

If a cookie is used across multiple related sites, blocking cross-site cookies or partitioning by top-level site would prevent [use cases](/blog/first-party-sets-sameparty/#usecases) such as single sign-on or a shared shopping cart.

Declaring your sites as part of a First-Party Set will allow you to use [Storage Access API (SAA)](/docs/privacy-sandbox/first-party-sets-integration/#storage-access-api) and the [requestStorageAccessFor API](/docs/privacy-sandbox/first-party-sets-integration/#requeststorageaccessfor-in-chrome) to request access to those cookies.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/zbeLi9FbtJVhLXiCiRig.png", alt="Diagram showing only sites within the same First-Party Set accessing each other's cookies, while the third site is denied access.", width="800", height="452" %}

The sets are declared in JSON format–in the example below, the primary domain is `travel.site`, and `air-travel.site` is in the list of associated sites.

```json
{
 "primary": "https://travel.site",
 "associatedSites": ["https://air-travel.site"]
}
```

Top-level sites can request storage access on behalf of specific origins with [`Document.requestStorageAccessFor()`](https://privacycg.github.io/requestStorageAccessFor/) (rSAFor).

```js
document.requestStorageAccessFor('https://target.site')
```

### Learn more

For more details about technical design, use cases, and set submission process, check out [First-Party Sets developer documentation](/docs/privacy-sandbox/first-party-sets-integration/).

## Privacy Sandbox APIs replacing the need for cookies {: #other-apis }

CHIPS and First-Party Sets cover use cases that can continue to rely on cross-site cookies in a privacy-preserving way.

If neither meets your needs, there is a wider set of Privacy Sandbox proposals for new APIs for specific use cases, replacing the need for cookies. Some of the new APIs are focused on identity, fraud detection, and more, while others cover advertising.

[Federated Credential Management (FedCM)](/docs/privacy-sandbox/fedcm/) enables privacy-preserving approach to federated identity services so users can log into sites without sharing their personal information with a third-party service or website.

[Private State Tokens](/docs/privacy-sandbox/trust-tokens/) convey a limited amount of information from one browsing context to another (for example, across sites) to help combat fraud, without passive tracking.

A suite of APIs is available to cover [ad relevance](/docs/privacy-sandbox/#show-relevant-content) and [measurement](/docs/privacy-sandbox/#measure-digital-ads) use cases such as interest-based advertising, on-device auctions for custom audiences, cross-site content selection, ad conversion measurement and attribution, and more.

To learn more about how new APIs might serve use cases that are not covered in this post, explore the [Privacy Sandbox documentation](/docs/privacy-sandbox/).