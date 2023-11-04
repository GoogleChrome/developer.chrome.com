---
layout: 'layouts/blog-post.njk'
title: The larger-than advanced Network Panel filter, and a few others
description: >
   Did you know that the filter in the Network panel supports a few nifty custom search labels?
authors:
  - umarhansa
date: 2015-08-24
updated: 2015-08-24
---

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/75gYaLF9Bt5sJ4z2anjM.gif", alt="The larger-than advanced Network Panel filter, and a few others.", width="786", height="540" %}
</figure>

Use the Advanced Network Panel Filtering feature to narrow down resources to exactly what you want to find. For example:


- `larger-than:100` will find and filter for resources larger than 100 bytes
- You can negate a query by prepending a '-' to it. E.g. `-larger-than:50k` to find resources which are __not__ larger than 50k.
- `status-code:200` to find resources with a status code response of `200`.

A few other queries which you can experiment with:

- domain
- mime-type
- scheme
- set-cookie-domain
- set-cookie-value
- has-response-header


Note: you get autocomplete for these, it makes it easier to discover query types and their corresponding values. The values which autocomplete will exist in your current network recording.



