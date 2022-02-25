---
title: 'Author'
description: ''
permalink: '{{paged.permalink}}'
layout: 'layouts/author-individual.njk'
eleventyComputed:
  title: '{{ paged.title | i18n(locale) or title }}'
  description: '{{ paged.description | i18n(locale) or description }}'
  hero: '{{ paged.image }}'
pagination:
  data: postsData.authors
  size: 1
  alias: paged
  resolve: values
---
