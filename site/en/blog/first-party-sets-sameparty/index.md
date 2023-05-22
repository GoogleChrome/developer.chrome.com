---
layout: 'layouts/blog-post.njk'
title: "[OUTDATED] First-Party Sets and the SameParty attribute"
description: >
  First-Party Sets can allow related domain names that are owned and operated by
  the same entity to be treated as first-party in situations where first party and
  third party are otherwise treated differently. 
date: 2021-08-26
updated: 2022-11-30
thumbnail: 'image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/JL7L7S2qKI53pTWACfcv.jpg'
alt: A diagram showing First-Party Sets. One set contains domains example.com,
  example.rs, and example.co.uk. The other set containts brandx.site,
  fly-brandx.site, and drive-brandx.site.
tags: 
  - privacy
is_outdated: true
authors:
  - rowan_m
  - mihajlija
---


{% Aside 'warning' %}
First-Party Sets proposal has been updated and this article is no longer up to date. Refer to the [explainer](https://github.com/WICG/first-party-sets) and [testing instructions](/blog/first-party-sets-testing-instructions) for the latest information.
{% endAside %}

Many organizations have related sites with different domain names, such as
`brandx.site` and `fly-brandx.site`—or domains for different countries such as
`example.com`, `example.rs`, `example.co.uk` and so on. 

Browsers are moving towards [making third-party cookies
obsolete](https://blog.google/products/ads-commerce/a-more-privacy-first-web/)
to improve privacy on the web, but sites like these often rely on cookies for
functionalities that require maintaining and accessing state across domains
(such as single sign-on and consent management). 

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/JNtmMZl7o44LwUk7mE5G.png", alt="", width="800", height="316" %}

First-Party Sets can allow related domain names that are owned and operated by
the same entity to be treated as first-party in situations where first party and
third party are otherwise treated differently. The domain names within a
first-party set are considered _same-party_ and they can label which cookies are
intended to be set or sent in the same-party context. The aim is to find a
balance between preventing cross-site tracking by third-parties while still
maintaining a path that doesn't break valid use-cases.  

The First-Party Sets proposal is currently [in the testing
phase](https://privacysandbox.com/timeline/), read on to find out how it works
and how you can try it out.

## What is the difference between first-party and third-party cookies? 

Cookies are not inherently first-party or third-party, it depends on the current
context where the cookie is included. That's either on a request in the
``cookie`` header or via ``document.cookie`` in JavaScript.  

If for example, `video.site` has a `theme=dark` cookie, when you're browsing
`video.site` and a request is made to `video.site`, that's a [same-site
context](https://web.dev/same-site-same-origin/#same-site-cross-site) and the
included cookie is _first-party_.  

However, if you're on ``my-blog.site`` which embeds an iframe player for
``video.site``, when the request is made from `my-blog.site` to `video.site`
that's cross-site context and the ``theme`` cookie is _third-party_.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/zHa3CTG1l3lYA6C3P433.png", alt="Diagram showing a cookie from video.site in two contexts. The cookie is same-site when the top-level context is also video.site. The cookie is cross-site when the top-level context is my-blog.site with video.site in an iframe.", width="800", height="514" %}

Cookie inclusion is determined by the cookie's ``SameSite`` attribute:

+   [**Same-site
    context**](https://web.dev/same-site-same-origin/#same-site-cross-site) with
    ``SameSite=Lax``, ``Strict``, or ``None`` makes the cookie **first-party**.
+   **Cross-site context** with ``SameSite=None`` makes the cookie **third-party**.

However, this isn't always so clear cut. Imagine ``brandx.site`` is a travel
booking site and they also use ``fly-brandx.site`` and ``drive-brandx.site`` to
separate flights and car hire. Over the course of booking one journey, visitors
go between these sites to select their different options—they expect their
"shopping cart" of selections to persist across these sites. ``brandx.site``
manages the user's session with a ``SameSite=None`` cookie to allow it in
cross-site contexts. The downside though is now the cookie has no Cross Site
Request Forgery (CSRF) protection. If ``evil.site`` includes a request to
``brandx.site`` then it would include that cookie!  

The cookie is cross-site, but all those sites are owned and operated by the same
organization. Visitors also understand it's the same organization and want the
same session, in other words—a shared identity, across them. 

{% Aside %}
With First-Party Sets there's a route to define the situations where a
**cross-site context** is still **first-party**. The cookie can be included
within the first-party set and excluded in third-party contexts.
{% endAside %}

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/oNCKndk5TJyiqcPgvv5E.png", alt="Diagram showing how a cookie may still be included in a cross-site context if the sites are part of the same First-Party Set, but that it would be rejected for cross-site contexts outside of the set.", width="400", height="362" %}

## First-Party Sets policy

[First-Party Sets proposes](https://github.com/privacycg/first-party-sets) a
method for **explicitly defining this relationship across multiple sites that
are owned and operated by the same party**. This would enable ``brandx.site`` to
define its first-party relationship with ``fly-brandx.site``,
``drive-brandx.site``, and so on.  

The [Privacy Model](https://github.com/michaelkleber/privacy-model) that drives
the various Privacy Sandbox proposals is based on the concept of partitioning
identity to prevent cross-site tracking—drawing a boundary between sites that
limits access to any information that can be used to identify users. 

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/bTGzUkmiyY1d0ZssO8Jq.png", alt="Diagram showing the unpartitioned state where the same third-party cookie is accessible in multiple cross-site contexts in contrast to a partitioned model where each top-level context has a separate instance of the cross-site cookie preventing linking activity across those sites.", width="800", height="305" %}

While the default option is to partition by site, which solves many first-party
use cases, the ``brandx.site`` example shows that a first-party can be larger
than just one site.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/mGJiTbDhAYa9ZpChapX3.png", alt="Diagram showing how the same instance of a cookie for one set may be included in cross-site contexts when all those sites are part of the same set.", width="400", height="356" %}

An important part of the First-Party Sets proposal is to ensure that policy
across browsers prevents abuse or misuse. For example, First-Party Sets must not
enable the exchange of user information across unrelated sites, or the grouping
of sites that are not owned by the same entity. The idea is to ensure that a
First-Party Set maps to something a person understands as a first-party and is
not used as a way of sharing identity across different parties.  

One possible way for a site to register a first-party set could be for the site
to submit their proposed group of domains to a public tracker (such as a
dedicated GitHub repository) along with information needed to satisfy browser
policy.  

{% Aside %}
The acceptance process for a new first-party set is under discussion with the
W3C and one of the considered options is for verification to be handled by an
independent entity, not a browser company.   
{% endAside %}

Once the first-party set assertion has been verified as per policy, browsers may
then fetch lists of sets via an update process.    

The origin trial has a defined policy which is not final, but the principles are
likely to remain the same:

+   The domains in a first-party set must be owned and operated by the same
    organization.
+   The domains should be recognisable to users as a group.
+   The domains should share a common privacy policy.

{% Aside %}
Learn more about the [proposed policy for First-Party
Sets](https://github.com/privacycg/first-party-sets/blob/main/ua_policy_proposal.md).
{% endAside %}

## How to define a first-party set

Once you identify the members and the owner of your organization's first-party
set, a crucial step will be to submit your proposed set for approval. The exact
process is still under discussion.   

{% Aside 'caution' %}
A first-party set is _not_ meant to be an exhaustive list of
sites that belong to the same organization. You _only_ need to create a set
between sites if you explicitly need a cross-site cookie allowed across them.
Make sure you check out [What use cases are right for the First-Party Sets
Origin Trial?](#usecases) below.   
{% endAside %}

To declare a first-party set, static JSON resources that list members and owners
should be hosted at `/.well-known/first-party-set` at the top-level of each
included domain.

In the example of the `brandx` first-party set, the owner-domain hosts the
following at  
``https://brandx.site/.well-known/first-party-set``:

```text
{
  "owner": "brandx.site",
  "version": 1,
  "members": ["fly-brandx.site", "drive-brandx.site"]
}
```

Each member of the set also hosts a static JSON resource pointing back to the
owner of the set.  
At ``https://fly-brandx.site/.well-known/first-party-set`` we have:

```text
{ "owner": "brandx.site" }
```

And at ``https://drive-brandx.site/.well-known/first-party-set``:

```text
{ "owner": "brandx.site" }
```

There are a few constraints for first-party sets:

+   A set may only have one owner.
+   A member may only belong to one set, no overlapping or mixing.
+   The members list is intended to remain relatively human-readable and not
    excessively large.

{% Aside %}
You may already be hosting a similar file if you are using [Digital
Asset Links to link sites](/blog/site-affiliation/)
that share the same account management backend. This is specifically to allow
the same credentials to be suggested by the Chrome password manager across the
affiliated sites.
{% endAside %}

## How do First-Party Sets affect cookies?

The matching ingredient for cookies is the proposed [``SameParty``
attribute](https://github.com/cfredric/sameparty). Specifying ``SameParty``
tells the browser to include the cookie when its context is part of the same
first-party set as the top-level context.  

That means that if ``brandx.site`` sets this cookie:

```text
Set-Cookie: session=123; Secure; SameSite=Lax; SameParty
```

Then when the visitor is on ``fly-brandx.site`` and a request goes to
``brandx.site`` then the ``session`` cookie will be included on that request.  
If some other site which is not a part of the first-party set, for example
`hotel.xyz`, sends a request to `brandx.site`, the cookie would not be included.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/bmNqQh85YU16Bw2YEi5L.png", alt="Diagram showing the brandx.site cookie allowed or blocked in cross-site contexts as described.", width="800", height="483" %}

Until `SameParty` is widely supported, use `SameSite` attribute along with it to
define fallback behavior for cookies. You can think of the ``SameParty``
attribute as giving you a setting between ``SameSite=Lax`` and
``SameSite=None``.

+   ``SameSite=Lax; SameParty`` will **expand the ``Lax`` functionality** to
    include same-party contexts where supported, but falls back to the ``Lax``
    restrictions if not.
+   ``SameSite=None; SameParty`` will **restrict the ``None`` functionality** to
    just same-party contexts where supported, but falls back to the wider
    ``None`` permissions if not.

There are some additional requirements:

+   ``SameParty`` cookies **must** include ``Secure``.
+   ``SameParty`` cookies **must not** include ``SameSite=Strict``.

``Secure`` is mandated as this is still cross-site and you should mitigate those
risks by ensuring secure (HTTPS) connections. Likewise, because this is a
cross-site relationship, ``SameSite=Strict`` is invalid as it still allows for
tightly site-based CSRF protection within a set.  

{% Aside 'gotchas' %}
The ``SameParty`` attribute is only affecting the contexts where a
cookie may be sent, it **does not** create a shared cookie jar. A cookie from
``brandx.site`` is **only available** on requests or documents for
``brandx.site``, the cookie is **never directly available** to
``fly-brandx.site``. This can be confusing as you may see this referenced as
shared identity, but this means that the relaxed boundary between the sites
allows them to set or send cookies in same-party, cross-site contexts—not
that cookies are directly shared.
{% endAside %}

## What use cases are right for First-Party Sets? {: #usecases }

First-Party Sets are a good match for cases when an organization needs a form of
shared identity across different top-level sites. Shared identity in this case
means anything from a full single sign-on solution to just needing a shared
preference across sites.  

{% Aside %}
You can identify possible candidates for these use cases because they will
be instances where you have already marked a cookie as ``SameSite=None`` even
though it's only for cross-site contexts where you own all the sites involved.  
{% endAside %}

Your organization may have different top-level domains for:

+   **App domains**: `office.com`,` live.com`, `microsoft.com`
+   **Branded domains**: `amazon.com`, `audible.com` / `disney.com`, `pixar.com`
+   **Country-specific domains** to enable localization: `google.co.in`,
    `google.co.uk`
+   **Service domains** that users never directly interact with, but provide
    services across the same organization's sites: `gstatic.com`,
    `githubassets.com`, `fbcdn.net`
+   **Sandbox domains** that users never directly interact with, but exist for
    security reasons: `googleusercontent.com`, `githubusercontent.com`

## How do you get involved?

If you have a set of sites that matches the criteria above then there are a
number of options to get involved. The lightest investment is to read and join
the discussion on the two proposals:

+   [First-Party Sets Privacy Community Group discussion](https://github.com/privacycg/first-party-sets)
+   [SameParty cookie attribute discussion](https://github.com/cfredric/sameparty)

During the testing phase, you can try the functionality using the
`--use-first-party-set` command line flag and providing a comma separated list
of sites.  

You can try this on the demo site at
[https://fps-member1.glitch.me/](https://fps-member1.glitch.me/) after starting
Chrome with the following flag:  

```text
--use-first-party-set=https://fps-member1.glitch.me,https://fps-member2.glitch.me,https://fps-member3.glitch.me
```

This is helpful if you want to test in your development environment, or want to
try adding the `SameParty` attribute in a live environment to see how a
first-party set would affect the cookies.  

If you have the bandwidth for experimentation and feedback, you can also sign up
for the [Origin Trial for First Party Sets and
SameParty](/origintrials/#/view_trial/988540118207823873)
which is available in Chrome from version 89 to 93.  

{% Aside 'key-term' %}
Origin trials are Chrome's way of enabling external developers to test
early proposals in real-world scenarios to provide the feedback needed to evolve
and iterate towards something that meets the needs of the web platform. Learn
more in [Getting started with Chrome's origin
trials](/blog/origin-trials/).
{% endAside %}

## How to update cookies for the origin trial

If you are joining the origin trial and testing the `SameParty` attribute on
your cookies, here are two patterns to consider.  

### Option 1

First, where you have cookies that you have labelled as `SameSite=None` but you
would like to restrict to first-party contexts, you can add the `SameParty`
attribute to them. In browsers where the origin trial is active, the cookie will
not be sent in cross-site contexts outside the set. 

However, for the majority of
browsers outside of the origin trial the cookie will continue to be sent
cross-site as usual. Consider this as a progressive enhancement approach.  

**Before:**  
`set-cookie: cname=cval; SameSite=None; Secure`  

**After:**  
`set-cookie: cname=cval; SameSite=None; Secure; SameParty`  

### Option 2

The second option is more work, but allows you to fully separate the origin
trial from existing functionality and specifically allows testing of the
`SameSite=Lax; SameParty` combination.  

**Before:**  
`set-cookie: cname=cval; SameSite=None; Secure`  

**After:**  

```text
set-cookie: cname=cval; SameSite=None; Secure
set-cookie: cname-fps=cval; SameSite=Lax; Secure; SameParty  
```

When checking for the cookie on incoming requests, you should only expect to see
the `cname-fps` cookie on a cross-site request if the sites involved are in the
set and the browser is in the origin trial. Consider this approach like a
concurrent launch of an updated feature before turning down the previous
version. 

## Why might you not need a first-party set?

For the majority of sites, their site boundary is an acceptable place to draw
the partition or privacy boundary. This is the route that's being proposed with
[CHIPS (Cookies Having Independent Partitioned
State)](https://github.com/DCtheTall/CHIPS) which would give sites an opt-in
route via the `Partitioned` attribute to still have those critical cross-site
embeds, resources, APIs, and services, while preventing leakage of identifying
information across sites.

A few other things to consider that mean your site might be fine without needing
a set:

+   You host over different origins, not different sites. In the example above,
    if `brandx.site` had `fly.brandx.site` and `drive.brandx.site` then those
    are different subdomains all within the same site. The cookies can use
    `SameSite=Lax` and there's no set needed.
+   You provide third-party embeds to other sites. In the intro, the example of
    a video from `video.site` embedded on `my-blog.site` is a clear third-party
    divide. The sites are operated by different organizations and users see them
    as separate entities. Those two sites should not be in a set together.
+   You provide third-party social sign-in services. Identity providers using
    things like OAuth or OpenId connect often rely on third-party cookies for a
    smoother sign-in experience for users. It's a valid use case, but it's not
    suitable for First-Party Sets as there's a clear difference in organizations.
    Early proposals like [WebID](https://github.com/WICG/WebID) are
    exploring ways to enable these use cases. 
