---
title: This page type generates a paginated list of blog posts for the given locale ordered by date.
description:
permalink: '{{locale}}/content-types/blog-landing/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}index.html'
layout: layouts/blog-landing.njk
type: landing
pagination:
  data: collections.blog-en
  size: 5
---

