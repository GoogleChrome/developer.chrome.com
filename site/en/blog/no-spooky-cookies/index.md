---
title: No spooky cookies
subhead: >
  Cookies are best fresh, so what are the latest recipes to ensure you can
  still enjoy spooky season without any stale cookies?
description: >
  Cookies are best fresh, so what are the latest recipes to ensure you can
  still enjoy spooky season without any stale cookies?
layout: 'layouts/blog-post.njk'
date: 2022-10-24
authors:
  - rowan_m
hero: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/m2MdomFImr4xrDeBgRht.png'
alt: >
  A random assortment of spider webs, hourglasses and cookies - as time is
  running out for third-party cookies on the web. Ho ho ho.
tags:
  - privacy
---

Cookies are best fresh, so what are the latest recipes to ensure you can still
enjoy spooky season without any stale cookies?

We are on the path towards phasing out third-party cookies across the web
platform. That's a major milestone in tackling cross-site tracking, but it's
part of a pretty long journey. Let's take a peek at how far we've come and what
treats are in store in the future…

On the surface, cookies provide a simple key-value store that's sent between the
browser and the server. That can provide useful functionality on a site such as
saving a preference: `theme=bats` or storing the session ID for a signed in
user.

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/bwfhKOn5hODNKWWTFwH9.png", alt="A third-party cookie carrying a simple value like theme=bats or fav_pumpkins=us-nyc", width="800", height="450" %}

If that cookie is being used on the same site that set it, then we tend to call
that a first-party cookie. If it's being used as part of a different site than
the one that set it, we call that a third-party cookie. For example, my
`theme=bats` cookie would be first-party if I'm visiting that same site that set
it, but if it's included in an iframe or other cross-site resource as part of a
different site then it would be a third-party cookie.

{% Aside %}
**Remember:** first-party or third-party is all about same-site or cross-site
context!
{% endAside %}

The problem with third-party cookies is that they can enable cross-site
tracking. Instead of setting something like a theme, the shared service might
store a whole identifier in there. That same identifier is then sent when you
navigate across different sites that include shared services cookie—which
means that one service can observe and link your activity across those sites.

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/vSNgfP4EegQGF1WmKGQa.png", alt="A third-party cookie carrying a unique ID which allows the third-party site to track a user around the web", width="800", height="450" %}

## First-party cookies by default

We've already made progress on our journey here! It used to be that just setting
a plain cookie: `theme=pumpkins` would be sent in all contexts: same-site or
cross-site! The majority of sites do only want their cookies to be sent in a
same-site context. This can be controlled via the `SameSite` attribute on the
cookie. For example:

```text
Set-Cookie: theme=bats; SameSite=Lax
```

This tells the browser to only send the cookie if the resource matches the
top-level site. However, that meant the site had to specify when it wanted the
first-party cookie. That's a bit backwards in security terms as really you
should be asking when you want more privileges - not just getting them by
default.

So now, `SameSite=Lax` is the default. If you just set `theme=bats` it will only
be sent in a same-site context.

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/6HGeQJg31h69UtE9zh4v.png", alt="The default SameSite=Lax value stops a cookie being sent in a third-party context", width="800", height="450" %}

If you want a cross-site or third-party cookie (perhaps you need the theme
displayed in an embedded widget) then you need to specify:

```text
Set-Cookie: theme=bats; SameSite=None; Secure
```

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/rmrLeyBLQXkkLgRfaN3I.png", alt="The explicit SameSite=None value marks the cookie to be sent in cross-site contexts", width="800", height="450" %}

This tells the browser you want the cookie sent in any cross-site context, but
we do want to restrict to just secure connections.

## Even tastier first-party cookies

While the default did get a bit better, there's still room for you to improve
that recipe. Here's a quick taste:

```text
Set-Cookie:  __Host-theme=bats;
  Secure;
  Path=/;
  HttpOnly;
  Max-Age=7776000;
  SameSite=Lax;
```

That will get you a first-party cookie that stays restricted to just one domain,
secure connections, no access by JavaScript, automatically expires before it
goes stale, and (of course!) is only allowed in same-site contexts.

{% Aside %}
**Read more:** There's plenty of tweaking you can do to suit your taste and
we've got all the details in our [first-party cookie
recipes](https://web.dev/first-party-cookie-recipes/).
{% endAside %}

## Cookies taste better with CHIPS!

One of the magical aspects of the web is the ability to compose multiple sites
together. Let's say I want to create a map widget that lets other sites show the
best pumpkin patch tours or trick-or-treating routes. My service uses a cookie
to let the users store their progress along the route. The problem is, that same
third-party cookie is going to get sent on the pumpkin patch site as on the
trick-or-treating site. I don't want to track users between sites, but the
browser just uses one cookie jar—there's no way for me to separate that usage!

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/APvorz7Y2JFIeplAAtfd.png", alt="Cross-site cookies with SameSite=None still all go into a shared cookie jar", width="800", height="450" %}

That's where the Cookies Having Independent Partitioned State, or CHIPS,
proposal comes in. Instead of one shared cookie jar, there's a separate and
partitioned cookie jar per top-level site. Sites would opt-in to that by using
the `Partitioned` attribute on their cookie.

```text
Set-Cookie: __Host-route=123;
  SameSite=None;
  Secure;
  Path=/;
  Partitioned;
```

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/SdhD7epfdq9FjRNC76Kx.png", alt="The Partitioned attribute on the cookie creates separate cookie jars per top-level site", width="800", height="450" %}

Instead of having to share that cookie jar, everyone gets their own! Simpler,
safer, and more hygienic.

We've just sent the [Intent to
Ship](https://groups.google.com/a/chromium.org/g/blink-dev/c/JNOQvsTxecI/m/gmIe7KCBAwAJ)
for [Cookies Having Independent Partitioned State
(CHIPS)](/docs/privacy-sandbox/chips/) in Chrome 109 which means they will be
available to test in Beta in December and then ready for Stable in January 2023.
So, if you're looking for a new year's resolution to improve your site's cookie
recipe then take a look and see if you can start sprinkling CHIPS into those
cross-site cookies!

## Inviting cookies to the party with First-Party Sets

On the subject of developer feedback, lots of you also made it clear that there
are situations where you share services across sites you control and want to be
able to use cookies across them - but not let them be sent in true third-party
contexts. For example, perhaps you have `pretty-pumpkins.com` and
`pretty-pumpkins.co.uk`. You might have a cookie-based single-sign on system
that works across these sites. CHIPS wouldn't work because I'd just have to
sign-in on both sites—the requirement is that I need the same cookie across
these related sites.

We're working on the First-Party Sets proposal to try and make this possible.
We've been through one origin trial and plenty of community discussion which has
brought us to the latest version that aims to:

*   Give organizations a way to define a group of sites that should be
    same-party to each other.
*   Leverage the Storage Access API to request access to cross-site cookies
    inside that first-party set.

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/CNkxjTyLOOuGJH40haFz.png", alt="First-Party Sets allows a shared cookie jar only between related sites", width="800", height="450" %}

These cookies are all still baking away in the oven, but you can check in on the
[First-Party Sets](/docs/privacy-sandbox/first-party-sets/) developer guide when
there's more for you to test, or you can jump into the
[WICG/first-party-sets](https://github.com/WICG/first-party-sets) proposal if
you would like to contribute to the discussion.

## Don't let your cookies go stale!

Our goal is to start phasing out support for third-party cookies in Chrome from
midway through 2024. There's time to prepare, but you should start planning now.

1. Audit your code for any cookies with `SameSite=None`. These are the cookies
   that will require updates.
2. If you don't have any third-party cookies, make sure your same-site cookies
   are using the best [First-party cookies
   recipes](https://web.dev/first-party-cookie-recipes/)
3. If you use those cookies in a fully contained, embedded context then
   investigate and test the [CHIPS proposal](/docs/privacy-sandbox/chips/).
4. If you need those cookies across multiple sites that form one cohesive group,
   then investigate the [First-Party Sets
   proposal](/docs/privacy-sandbox/first-party-sets/).
5. If you're not covered by either of these options, you will need to
   investigate the other [Privacy Sandbox proposals](/privacy-sandbox/) where
   we're developing purpose-built APIs for individual use cases that don't rely
   on cross-site tracking.

This is just a short overview and we will continue sharing more news and
guidance as the work progresses. If you have questions, issues or would like to
share the results of your own work then we have [plenty of routes for you to get
in touch](/docs/privacy-sandbox/feedback/).

So, remember: cookies can be delicious—but only a few at a time and definitely
don't try to steal anyone else's!
