---
layout: layouts/doc-post.njk
title: Review your Scenarios
subhead: >
  .
description: ''
date: 2023-07-26
updated: 2023-07-26
authors:
  - mihajlija
  - albertomedina
---

The next step to get ready for a web without unresticted 3P cookies, is to audit your site and review it is using cookies, which functionalities are implemented using state provided by cookies, and assess if any of them could potentially be impacted. This includes the following steps:

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

- Cookies set without any `SameSite` attribute.
  - `Set-Cookie: cookie-name=value;`
- Cookies with `SameSite` set to `Lax` or `Strict`.
  - `Set-Cookie: cookie-name=value; SameSite=Lax;`
  - `Set-Cookie: cookie-name=value; SameSite=Strict;`

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

- Embedded content shared from other sites, such as videos, maps, code samples, and social posts.
- Widgets from external services such as payments, calendars, booking, and reservation functionality.
- Widgets such as social buttons or anti-fraud services.
- Remote resources on a page such as `<img>` or `<script>` tags, that rely on cookies to be sent with a request (commonly used for tracking pixels and personalizing content).

[In 2019, browsers changed the cookie behavior, restricting them to first-party access by default](https://web.dev/samesite-cookies-explained/#changes-to-the-default-behavior-without-samesite). Any cookies used in cross-site contexts today must be set with `SameSite=None` attribute.

```text
Set-Cookie: cookie-name=value; SameSite=None; Secure
```

{% Aside 'important' %}
Make sure to review your cookies and have a list of those set with the `SameSite=None`. These are the cookies for which you will need to take action to ensure they keep functioning properly.
{% endAside %}

One way to identify them is to examine your code base and search for cookies containing `SameSite=None`.

Another option is to browse through your site with third-party cookies blocked on your machine and use DevTools to investigate any potential breakage.

To learn more about DevTools features you can use to investigate third-party cookies check out [the instructions on chromium.org](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox/third-party-cookie-phaseout/).

## Privacy Sandbox APIs replacing the need for cookies {: #other-apis }

CHIPS and First-Party Sets cover use cases that can continue to rely on cross-site cookies in a privacy-preserving way.

If neither meets your needs, there is a wider set of Privacy Sandbox proposals for new APIs for specific use cases, replacing the need for cookies. Some of the new APIs are focused on identity, fraud detection, and more, while others cover advertising.

[Federated Credential Management (FedCM)](/docs/privacy-sandbox/fedcm/) enables privacy-preserving approach to federated identity services so users can log into sites without sharing their personal information with a third-party service or website.

[Private State Tokens](/docs/privacy-sandbox/trust-tokens/) convey a limited amount of information from one browsing context to another (for example, across sites) to help combat fraud, without passive tracking.

A suite of APIs is available to cover [ad relevance](/docs/privacy-sandbox/#show-relevant-content) and [measurement](/docs/privacy-sandbox/#measure-digital-ads) use cases such as interest-based advertising, on-device auctions for custom audiences, cross-site content selection, ad conversion measurement and attribution, and more.

To learn more about how new APIs might serve use cases that are not covered in this post, explore the [Privacy Sandbox documentation](/docs/privacy-sandbox/).
