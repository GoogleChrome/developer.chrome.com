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

As site owners, getting ready for a web without unresticted 3P cookies requires that we audit our sites to review an understand which functionalities are implemented using state provided by cookies, and assess if any of them could potentially be impacted. This includes the following steps:

1. [Identify the use of first-party and third-party cookies](#identify) in your site
1. Review how the identified cookies are configured and accessed.
1. [Investigate how to leverage Web Platform and Privacy Sandbox APIs](#other-apis) to implement specific use cases wihtout relying on 3P Cookies.

## Identify first-party and third-party cookies {: #identify }

{% Aside 'update' %}
Improve/complete this section.
{% endAside %}

The classification of a cookie into the 1P/3P categories is not about the cookie itself. Instead, it is a contextual classification. A cookie is always created and intended to be accessed by a given site/domain. But the information that is placed on a cookie in the context of a site (1P), could be accessed in the context of a different site (3P). So, 1P vs. 3P is about how the information about the user is accessed across site boundaries.

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
