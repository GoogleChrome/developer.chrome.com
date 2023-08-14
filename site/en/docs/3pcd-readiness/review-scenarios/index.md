---
layout: layouts/doc-post.njk
title: Review your scenarios
subhead: >
  .
description: ''
date: 2023-07-26
updated: 2023-07-26
authors:
  - nmichell
  - albertomedina
---

As a site owner, getting ready for a web without unresticted third-party cookies requires that you audit your sites to review and understand which of your features rely on state provided by cookies, and assess if any of these could be impacted. Here's an overview of the steps involved:

1. [Identify the use of first-party and third-party cookies](#identify) on your site.
1. Review how the identified cookies are configured and accessed.
1. [Investigate how to leverage Web Platform and Privacy Sandbox APIs](#other-apis) to implement specific use cases without relying on third-party cookies.

## Identify first-party and third-party cookies {: #identify }

{% Aside 'update' %}
Improve/complete this section.
{% endAside %}

The classification of a cookie as first-party or third-party is not about the cookie itself. Instead, it is a contextual classification. A cookie is always created and intended to be accessed by a given site/domain. But the information that is placed on a cookie in the context of a site (first party), could be accessed in the context of a different site (third party). So, whether a cookie is first-party or third-party is about how the information stored in it is accessed across site boundaries.

### First-party cookies

The following are use cases for first-party cookies. Because first-party cookies are not going away, you likely won't have to change anything in these scenarios.

- User logged in. You may set a cookie to indicate that the user is logged into your site. However, if logging into your site means the user is logged into another site as well, this may be a third-party cookie.
- Items in cart. You may set a cookie or cookies to persist a user's shopping cart additions. If you share shopping carts with another site, you might be using third-party cookies. If the other sites you share the cart with are actually owned by you but have a different domain, you should be able to use First-Party Sets. First-Party Sets lets you indicate a list of sites of different origins that belong to you.
- Favorite movies, games, etc. If you have a site that allows users to favorite an item but do not require them to have an account with you, the favorited items are likely set using cookies with a very long expiry.


{% Aside 'update' %}
Complete this section.
{% endAside %}

{% Aside 'important' %}
1P cookies will not be affected by third-party cookie phase out.
{% endAside %}

### Third-party cookies

The following are common use cases for third-party cookies. Because third-party cookies will be deprecated, you'll need to use other means to achieve the same goals.

- Embedded apps. You may have, say, a weather app in an iframe on your site. To set location preferences for the user so they can always see the weather for their location, the iframe sets a cookie. This is a third-party cookie because the origin of the iframe (where the weather app lives) is not owned by you.
- Ads. Most sites display ads from ad networks by placing iframes from the ad network on their site. Right now, cookies are set for actions such as a user clicking an ad. That cookie is set while the user is on your site by the iframe because it happens in the iframe and that makes it a third-party cookie. For measurement purposes, the Privacy Sandbox has an API, the Attribution Reporting API, that can help you continue to measure ad performance without the use of third-party cookies.
- Shared shopping carts.


{% Aside 'update' %}
Complete this section.
{% endAside %}

## Replacing third-party cookies

{% Aside 'update' %}
Complete this section.
Point to mapping section.
{% endAside %}
