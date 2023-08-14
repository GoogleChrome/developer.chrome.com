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

As a site owner, getting ready for a web without unresticted third-party cookies requires that you audit your sites to review an understand which of your features rely on state provided by cookies, and assess if any of these could be impacted. Here's an overview of the steps involved:

1. [Identify the use of first-party and third-party cookies](#identify) on your site.
1. Review how the identified cookies are configured and accessed.
1. [Investigate how to leverage Web Platform and Privacy Sandbox APIs](#other-apis) to implement specific use cases without relying on third-party cookies.

## Identify first-party and third-party cookies {: #identify }

{% Aside 'update' %}
Improve/complete this section.
{% endAside %}

The classification of a cookie as first-party or third-party is not about the cookie itself. Instead, it is a contextual classification. A cookie is always created and intended to be accessed by a given site/domain. But the information that is placed on a cookie in the context of a site (first party), could be accessed in the context of a different site (third party). So, whether a cookie is first-party or third-party is about how the information stored in it is accessed across site boundaries.

### First-party cookies

{% Aside 'update' %}
Complete this section.
{% endAside %}

{% Aside 'important' %}
1P cookies will not be affected by third-party cookie phase out.
{% endAside %}

### Third-party cookies

{% Aside 'update' %}
Complete this section.
{% endAside %}

## Replacing third-party cookies

{% Aside 'update' %}
Complete this section.
Point to mapping section.
{% endAside %}
