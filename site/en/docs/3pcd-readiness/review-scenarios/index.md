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

As site owners, getting ready for a web without unresticted 3P cookies requires that we audit our sites to review an understand which functionalities are implemented using state provided by cookies, and assess if any of them could potentially be impacted. This includes the following steps:

1. [Identify the use of first-party and third-party cookies](#identify) in your site
1. Review how the identified cookies are configured and accessed.
1. [Investigate how to leverage Web Platform and Privacy Sandbox APIs](#other-apis) to implement specific use cases wihtout relying on 3P Cookies.

## Identify first-party and third-party cookies {: #identify }

The classification of a cookie into the 1P/3P categories is not about the cookie itself. Instead, it is a contextual classification. A cookie is always created and intended to be accessed by a given site/domain. But the information that is placed on a cookie in the context of a site (1P), could be accessed in the context of a different site (3P). So, 1P vs. 3P is about how the information about the user is accessed across site boundaries.

Cookies are associated with the site that set them and they can be sent on HTTP requests or accessed by JavaScript. If the site in the browser's location bar matches the site associated with the cookie request, then that's a first-party cookie. If the site is different, it's a third-party cookie.

### First-party cookies

1P cookies are cookies that are never used on a third-party site (i.e. in a cross-site iframe).

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/ArhVqaVr6O2X0mE0YYxp.png", alt="Diagram showing a first-party cookie.", width="800", height="653" %}

First-party or same-site cookies can be identified manually by looking for configurations such as:

- Cookies set without any `SameSite` attribute.
  - `Set-Cookie: cookie-name=value;`
- Cookies with `SameSite` set to `Lax` or `Strict`.
  - `Set-Cookie: cookie-name=value; SameSite=Lax;`
  - `Set-Cookie: cookie-name=value; SameSite=Strict;`

{% Aside 'important' %}
1P cookies will not be affected by third-party cookie phase out.
If you have not explicitly set the `SameSite` attribute with an appropriate value on your first-party cookie, you should do that to ensure consistent behavior across browsers.
{% endAside %}

Some key considerations about 1P cookies:

1. Any first-party cookie with the `SameSite` attribute set to `None` will need to be updated.
1. If you use third-party cookies in a fully contained, embedded context, investigate [partitioned cookies](#partitioned-cookies).
1. If you need third-party cookies across multiple sites that form one cohesive group, investigate [First-Party Sets](#first-party-sets).
1. Check out [Recipes for first-party cookies](https://web.dev/first-party-cookie-recipes).

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

## Investigate Privacy Sandbox APIs replacing the need for cookies {: #other-apis }
