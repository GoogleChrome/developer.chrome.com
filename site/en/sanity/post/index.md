---
eleventyComputed:
  title: "{{paged.title}}"
description: ''
permalink: "{{locale}}/sanity/{{paged.slug.current}}/index.html"
layout: 'layouts/blog-post.njk'
type: landing
pagination:
  data: sanity_posts
  size: 1
  alias: paged
---

{{ paged.body }}