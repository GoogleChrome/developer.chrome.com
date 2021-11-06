---
title: 'Blog'
description: ''
permalink: '{{locale}}/blog/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}index.html'
layout: 'layouts/blog-landing.njk'
type: landing
pagination:
  data: collections.blog-es
  size: 24
---
