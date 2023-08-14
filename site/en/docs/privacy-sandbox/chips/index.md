---
layout: 'layouts/doc-post.njk'
title: 'Cookies Having Independent Partitioned State (CHIPS)'
subhead: >
  Allow developers to opt-in a cookie to "partitioned" storage, with a separate cookie jar per top-level site.
description: >
  Allow developers to opt-in a cookie to "partitioned" storage, with a separate cookie jar per top-level site.
  Partitioned cookies can be set by a third-party service, but only read within the context of the top-level site where they were initially set.
date: 2022-02-15
updated: 2023-08-14
authors:
  - mihajlija
tags:
  - cookies
  - privacy  
---

## Changes
 
- **June 2022**:  Based on feedback, setting cookies with the `Partitioned` attribute no longer requires omitting the `Domain` attribute. This allows subdomains of a third-party site to access cookies within a partition.

## Implementation status

{% Partial 'privacy-sandbox/timeline/chips.njk' %}

## What is CHIPS

Cookies Having Independent Partitioned State (CHIPS) allows developers to opt a cookie into partitioned storage, with separate cookie jars per top-level site, improving user privacy and security.

Browsers are well under way in phasing out unpartitioned third-party cookies, so CHIPS and [First-Party Sets](/first-party-sets) will be the only way to read and write cookies from cross-site contexts, such as iframes, when third-party cookies are blocked.

Without partitioning, third-party cookies can enable services to track users and join their information from across many unrelated top-level sites. This is known as cross-site tracking.

{% Img
   src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/jLOlPtLY9Zqte4IOoU6g.png",
   alt="Without cookie partitioning, a third-party service can set a cookie when embedded in one top-level site and access that same cookie when the service is embedded in other top-level sites.",
   width="800", height="450"
%}

CHIPS introduces a new cookie attribute, `Partitioned`, to support cross-site cookies that are partitioned by top-level context. 

Set-Cookie header:

```text
Set-Cookie: __Host-name=value; Secure; Path=/; SameSite=None; Partitioned;
```

Javascript:

```js
Document.cookie="__Host-name=value; Secure; Path=/; SameSite=None; Partitioned;"
```

A partitioned third-party cookie is tied to the top-level site where it's initially set and cannot be accessed from elsewhere. This way cookies set by a third-party service can only be read within the context of the top-level site where they were initially set.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/PODInBIXZrgGeUoFhipj.png", alt="With cookie partitioning, a third-party service that sets a cookie when embedded in one top-level site cannot access that same cookie when the service is embedded in other top-level sites.", width="800", height="443" %}

With partitioned cookies, when a user visits site A and embedded content from site C sets a cookie with the Partitioned attribute, the cookie is saved in a partitioned jar designated only for cookies that the site C sets when it's embedded on site A. The browser will only send that cookie when the top-level site is A.

When the user visits a new site, for example site B, an embedded C frame will not receive the cookie that was set when C was embedded in site A.

If a user visits site C as a top level website, the partitioned cookie that C set when it was embedded in A will not be sent in that request either.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/FaQYaZyTsAxCm8GvvVc8.png", alt="With cookie partitioning, a third-party service that sets a cookie when embedded in a site cannot access that same cookie even when the users visits the service as top-level site.", width="400", height="304" %}

## Use cases

For example, the site `retail.example` may want to work with a third-party service `support.chat.example` to embed a support chat box on its site. Many embeddable chat services today rely on cookies to save interaction history. 

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/jsxgCpkMRXwXughPjg7j.png", alt="Top-level site retail.example embedding a third-party service support.chat.example.", width="400", height="310" %}

Without the ability to set a cross-site cookie, `support.chat.example` could instead rely on `retail.example` passing along their first-party session identifier (or some derived value of it). In that case, every website that `support.chat.example` is embedded on would require additional setup to pass along the state.  

Alternatively, `support.chat.example` may request `retail.example` to embed JavaScript that's hosted on `support.chat.example` on `retail.example` pages. This introduces security risks, because it allows the `support.chat.example` script to have elevated privileges on `retail.example`, such as the ability to access authentication cookies.

Example use cases for CHIPS include any scenarios where cross-site subresources require some notion of session or persistent state that is scoped to a user's activity on a single top-level site, such as:

+   Third-party chat embeds
+   Third-party map embeds
+   Third-party payment embeds
+   Subresource CDN load balancing
+   Headless CMS providers
+   Sandbox domains for serving untrusted user content (such as googleusercontent.com and githubusercontent.com)
+   Third-party CDNs that use cookies to serve content that's access-controlled by the authentication status on the first-party site (for example, profile pictures on social media sites hosted on third-party CDNs)
+   Front-end frameworks that rely on remote APIs using cookies on their requests
+   Embedded ads that need state scoped per publisher (for example, capturing users' ads preferences for that website)


## Why it's important to opt into cookie partitioning

As browsers are phasing out unpartitioned third-party cookies, a couple of other approaches to partitioning have been attempted.

Firefox announced that they are [partitioning all third-party cookies by default](https://hacks.mozilla.org/2021/02/introducing-state-partitioning/) in their ETP Strict mode and private browsing mode, so all cross-site cookies are partitioned by the top-level site. However, partitioning cookies without a third-party opt-in can lead to unexpected bugs, since some third-party services have built servers which expect an unpartitioned third-party cookie.

[Safari previously tried partitioning cookies based on heuristics](https://webkit.org/blog/8613/intelligent-tracking-prevention-2-1/), but eventually chose to block them altogether, citing developer confusion as one of the reasons. Recently, [Safari expressed interest in an opt-in based model](https://github.com/privacycg/storage-access/issues/75).

What sets CHIPS apart from existing implementations of partitioned cookies is the third-party opt-in. Cookies must be set with a new attribute in order to be sent on cross-party requests once (unpartitioned) third-party cookies are obsoleted.

While third-party cookies still exist, the `Partitioned` attribute provides an opt-in to a more restrictive, more secure type of cookie behavior. CHIPS is an important step to help services make a smooth transition to a future without third-party cookies.

## CHIPS design details

### Partitioning model

Today, cookies are keyed on the hostname or domain of the site that set them, that is, their _host key_.   

For example, for cookies from `https://support.chat.example`, the host key is `("support.chat.example")`.  

Under CHIPS, cookies that opt into partitioning will be double-keyed on their host key and _partition key_.   

A _cookie's partition key_ is the site ([scheme and registrable domain](https://web.dev/same-site-same-origin/#%22schemeful-same-site%22)) of the top-level URL the browser was visiting at the start of the request to the endpoint that set the cookie.  

In the example above where `https://support.chat.example` is embedded on `https://retail.example`, the top-level URL is `https://retail.example`.  

The partition key in that case is `("https", "retail.example")`.  

Likewise, a _request's partition key_ is the site of the top-level URL the browser is visiting at the start of a request. Browsers must only send a cookie with the `Partitioned` attribute in requests with the same partition key as that cookie.  

Here's what the cookie key in the example above looks like before and after CHIPS.

{% Img
   src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/ZZm3G3cCgziUK2eezdiu.png",
   alt="Site A and the embedded site C share a partitioned cookie. When not embedded, site C cannot access the partitioned cookie.",
   width="800", height="204"
%}


**Before CHIPS**

```text
key=("support.chat.example")
```

**After CHIPS**

```text
key={("https", "retail.example"),
     ("support.chat.example")}
```

{% Aside %}
Chrome has a limit of maximum 180 cookies per partition that cannot exceed 10 KB per-embedded-site.
{% endAside %}

#### First-Party Sets and cookie partitioning

[First-Party Sets (FPS)](/first-party-sets-integration) is a web platform mechanism for developers to declare relationships among sites, so that browsers can use this information to enable limited cross-site cookie access for specific, user-facing purposes. Chrome will use these declared relationships to decide when to allow or deny a site access to their cookies when in a third-party context.

The current First-Party Sets design relies on Storage Access API and does not integrate with CHIPS partitioning.

Consider First-Party Sets in situations where you need the same cookie to be available to a service that's embedded in multiple related sites.

CHIPS provides the functionality for a service to act as an isolated component across multiple sites. If the service that a member of a First-Party Set sets a partitioned cookie, its partition key will be the top-level site and that cookie will not be available to other set members.

If you have a use case that relies on a shared cookie partition across sites within a FPS you can [provide examples and feedback on the GitHub issue](https://github.com/WICG/first-party-sets/issues/94).


### Security design

To encourage good security practices, CHIPS proposes cookies only be set by and sent over secure protocols.

Partitioned cookies must be set with `Secure`.

It is recommended to use the `__Host` prefix when setting partitioned cookies to make them bound to the hostname (and not the registrable domain).

Example: 

```text
Set-Cookie: __Host-example=34d8g; SameSite=None; Secure; Path=/; Partitioned;
```

{% Aside %}
Adding `SameSite=None` will allow your cookie to be sent in third-party contexts where the `Partitioned` attribute is not supported, as long as third-party cookies are allowed in browser settings.
{% endAside %}

## Demo

A demo on Glitch will walk you through how Partitioned cookies work and how you can inspect them in DevTools.

Site A embeds an iframe from Site B which uses JavaScript to set two cookies: a partitioned and unpartitioned cookie. Site B displays all cookies accessible from that location using [`document.cookie`](https://developer.mozilla.org/docs/Web/API/Document/cookie).

When third-party cookies are blocked, site B will only be able to set and access the cookie with the Partitioned attribute in cross-site context.

When third-party cookies are allowed, site B is able to also set and access the unpartitioned cookie.

<figure>
{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/HC6JRFc7OLng5DWvEnp4.png", alt="Site A and site B", width="800", height="716" %}
  <figcaption>Left: Third-party cookies are blocked. Right: Third-party cookies are allowed.</figcaption>
</figure>

### Prerequisites

1.  Chrome 114 or higher.
1.  Ensure third-party cookies are blocked:
    -   Open **Settings > Privacy and security**.
    -   Click **Third party cookies**.
    -   Select **Block third party cookies**.

<figure>
{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/8W4pkQmcEfGZYrq5ZzTO.png", alt="Chrome cookie settings.", width="800", height="734" %}
  <figcaption>Chrome cookie settings.</figcaption>
</figure>

### Use DevTools to inspect partitioned cookies

1.  Visit [https://chips-site-A.glitch.me](https://CHIPS-site-A.glitch.me).
1.  Press `Control+Shift+J` (or `Command+Option+J` on Mac) to open DevTools.
1.  Click the **Application** tab.
1.  Navigate to **Application > Storage > Cookies**.
1.  Click on `https://chips-site-B.glitch.me`.

DevTools will display all the cookies from the selected origin.

<figure>
{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/QcTVEgWjGYQZJtMX0g4a.png", alt="", width="800", height="263" %}
  <figcaption>Cookies from site B in the DevTools Application tab.</figcaption>
</figure>

Site B can only set the partitioned cookie in cross-site context, the unpartitioned cookie will be blocked:

-   You should see `__Host-partitioned-cookie` with the partition key of the top level site `https://chips-site-A.glitch.me`.

<figure>
{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/DvSAMie7T41SFBY7wUrc.png", alt="", width="800", height="52" %}
  <figcaption>Partition key for __Host-partitioned-cookie.</figcaption>
</figure>


{% Aside %}
This view shows all cookies for that partition and any unparitioned cookies, even if they are not accessible in the current page. If you visit site B as a top level site, you would see the unpartitioned cookie here, but it would not be available to site B when it's embedded on site A.
{% endAside %}

1.  Click **Go to Site B**.
1.  In DevTools, navigate to **Application > Storage > Cookies
1.  Click on `https://chips-site-B.glitch.me`.

<figure>
{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/WXqkkGCjROCcDSEKXew5.png", alt="Site B", width="400", height="1129" %}
</figure>

In this scenario, because you are on site B in a top level context, it can set and access both cookies:

-   `unpartitioned-cookie` has an empty partition key.
-   `__Host-partitioned-cookie` cookie has the partition key `https://chips-site-B.glitch.me`.

<figure>
{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/vl4ouXXVqQ1bB5dEP4iK.png", alt="", width="800", height="245" %}
  <figcaption>Cookies from site B in the DevTools Application tab when visiting B as a top-level site. __Host-partitioned-cookie cookie has the partition key https://chips-site-B.glitch.me.</figcaption>
</figure>

If you navigate back to site A, `unpartitioned-cookie` is now stored in the browser, but it will not be accessible from site A.

1.  Click **Go to Site A**.
1.  Click the **Network** tab.
1.  Click on `https://chips-site-B.glitch.me`.
1.  Click on the **Cookies** tab.

While on site A, you should see the `__Host-partitioned-cookie` with the partition key of the top level site `https://chips-site-A.glitch.me`.

<figure>
{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/223LlvPnqtMPoEjMASht.png", alt="", width="800", height="236" %}
  <figcaption>Network tab showing cookies from site B iframe that are accessible when it's embedded on site A.</figcaption>
</figure>

If you check **show filtered out cookies requests** DevTools will show that the unpartitioned cookie is blocked, highlighted in yellow with a tooltip: _"This cookie was blocked due to user preferences"_.

<figure>
{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/a4jDguCgbwt9D5RB5Q6r.png", alt="", width="800", height="245" %}
  <figcaption>Network tab showing blocked cookies from site B iframe.</figcaption>
</figure>

{% Aside %}
Because you visited B as a top-level site, site B also has a partitioned cookie with the partition key `https://chips-site-B.glitch.me` that's not available to it in this context so you will see a message: _"This site has cookies in another partition that were not sent with this request"._
{% endAside %}

In **Application > Storage > Cookies** clicking on `https://chips-site-B.glitch.me`
will show:

-   `unpartitioned-cookie` with the empty partition key.
-   `__Host-partitioned-cookie` cookie with the partition key `https://chips-site-A.glitch.me`.

<figure>
{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/tv3pAAoTktiX3nZdIUIh.png", alt="", width="800", height="257" %}
  <figcaption>Cookies from site B in the DevTools Application tab. __Host-partitioned-cookie cookie has the partition key https://chips-site-A.glitch.me. unpartitioned-cookie is shown, but it's not accessible to site B iframe when it's ebmedded on site A.</figcaption>
</figure>

### Clear cookies

To reset the demo, clear all cookies for the site:

-   Open DevTools.
-   Click the **Application** tab.
-   Navigate to **Application > Storage > Cookies**.
-   Right click on `https://chips-site-B.glitch.me`.
-   Click **Clear**.

## Resources

+   **GitHub**: Read the [proposal](https://github.com/WICG/CHIPS), [raise questions and follow the discussion](https://github.com/WICG/CHIPS/issues).
+   **Developer support**: Ask questions and join discussions on the [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
