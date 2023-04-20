---
layout: 'layouts/blog-post.njk'
pagination:
  alias: post
  data: shortPosts
  size: 1
  addAllPagesToCollections: true
eleventyComputed:
  title: '{{ post.title }}'
  description: '{{ post.description }}'

---

{{ post.content | md | safe }}