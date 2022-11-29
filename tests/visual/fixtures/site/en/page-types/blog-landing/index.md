---
title: 'Blog'
description: ''
permalink: '{{locale}}/page-types/blog-landing/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}index.html'
layout: 'layouts/blog-landing.njk'
type: landing
pagination:
  data: collections.blogPosts
  size: 6
---

