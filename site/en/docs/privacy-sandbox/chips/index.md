---
layout: 'layouts/doc-post.njk'
title: 'Cookies Having Independent Partitioned State (CHIPS)'
subhead: >
  Allow developers to opt-in a cookie to "partitioned" storage, with a separate cookie jar per top-level site.
description: >
  Allow developers to opt-in a cookie to "partitioned" storage, with a separate cookie jar per top-level site.
  Partitioned cookies can be set by a third-party service, but only read within the context of the top-level site where they were initially set.
date: 2022-02-15
updated: 2023-06-14
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

Cookies Having Independent Partitioned State (CHIPS) is a Privacy Sandbox proposal that will allow developers to opt a cookie into "partitioned" storage, with separate cookie jars per top-level site.

A partitioned third-party cookie is tied to the top-level site where it's initially set and cannot be accessed from elsewhere. The aim is to allow cookies to be set by a third-party service, but only read within the context of the top-level site where they were initially set. 

## Why do we need it

Currently, third-party cookies can enable services to track users and join their information from across many unrelated top-level sites. This is known as cross-site tracking. 

{% Img
   src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/jLOlPtLY9Zqte4IOoU6g.png",
   alt="Without cookie partitioning, a third-party service can set a cookie when embedded in one top-level site and access that same cookie when the service is embedded in other top-level sites.",
   width="800", height="450"
%}

For example, when a user visits site A, embedded content from site C can set a cookie on the user's machine in response to the cross-site request. If the user then visits site B which also embeds C, site C could access the same cookie that has been set earlier when the user visited site A. This allows site C to compile a user's browsing activity across site A, site B, and every site that it is embedded on.

To protect user privacy, browser vendors are placing restrictions on this behavior and phasing out support for third-party cookies.

While cross-site tracking is an issue, there are valid cross-site cookie needs on the web today which can be achieved in a privacy-preserving way with cookie partitioning.

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

## How does it work?

CHIPS introduces a new cookie attribute, `Partitioned`, to support cross-site cookies that are partitioned by top-level context.  

Under this proposal, when a user visits site A and embedded content from site C sets a cookie with the `Partitioned` attribute, the cookie is saved in a partitioned jar designated only for cookies that the site C sets when it's embedded on site A. The browser would only send that cookie when the top-level site is A.   

When the user visits a new site, for example site B, an embedded C frame would not receive the cookie that was set when C was embedded in site A. 

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/PODInBIXZrgGeUoFhipj.png", alt="With cookie partitioning, a third-party service that sets a cookie when embedded in one top-level site cannot access that same cookie when the service is embedded in other top-level sites.", width="800", height="443" %}

If a user visits site C as a top level website, the partitioned cookie that C set when it was embedded in A will not be sent in that request either.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/FaQYaZyTsAxCm8GvvVc8.png", alt="With cookie partitioning, a third-party service that sets a cookie when embedded in a site cannot access that same cookie even when the users visits the service as top-level site.", width="400", height="304" %}

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

#### First-Party Sets and cookie partitioning

[First-Party Sets (FPS)](/blog/first-party-sets-testing-instructions) is a web platform mechanism for developers to declare relationships among sites, so that browsers can use this information to enable limited cross-site cookie access for specific, user-facing purposes. Chrome will use these declared relationships to decide when to allow or deny a site access to their cookies when in a third-party context.

The current First-Party Sets design relies on Storage Access API and does not integrate with CHIPS partitioning.

If you have a use case that relies on a shared cookie partition across sites within a FPS you can [provide examples and feedback on the GitHub issue](https://github.com/WICG/first-party-sets/issues/94).

### Security design

To encourage good security practices, CHIPS proposes cookies only be set by and sent over secure protocols.

Partitioned cookies must be set with `Secure`.

It is recommended to use the `__Host` prefix when setting partitioned cookies to make them bound to the hostname (and not the registrable domain).

Example: 

```text
Set-Cookie: __Host-example=34d8g; SameSite=None; Secure; Path=/; Partitioned;
```

## Try it out

[CHIPS origin trial](/blog/chips-origin-trial) is available from Chrome 100 to 106.

CHIPS is also available behind flags from Chrome 99. Check out the testing instructions and demo on [chromium.org](https://www.chromium.org/updates/chips/). 

To try it out locally, turn on the `chrome://flags/#partitioned-cookies` flag in Chrome Canary or use the `--partitioned-cookies=true` command line flag.

{% Img
   src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/Afo08gb3WxuNT77Bi6xc.png",
   alt="Set the partitioned cookies flag to Enabled.",
   width="779", height="329"
%}

## Engage and share feedback

+   **GitHub**: Read the [proposal](https://github.com/WICG/CHIPS), [raise questions and follow the discussion](https://github.com/WICG/CHIPS/issues).
+   **Developer support**: Ask questions and join discussions on the [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
