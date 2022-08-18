---
title: 'Sanity test'
description: ''
permalink: '{{locale}}/sanity/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}index.html'
layout: 'layouts/blog-landing.njk'
type: landing
pagination:
  data: sanity_posts
  size: 24
---
sanity

{% for post in pagination.items %}
        {{ post.title }}
        {{ post | dump }}
      {% endfor %}