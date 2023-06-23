---
title: 'Author'
description: ''
permalink: '{{ author.url }}'
layout: 'layouts/author-individual.njk'
eleventyComputed:
  title: '{{ author.title | i18n(locale) or title }}'
  description: '{{ author.description | i18n(locale) or description }}'
  hero: '{{ author.image }}'
pagination:
  data: collections.authors
  size: 1
  alias: author
  resolve: values
---
