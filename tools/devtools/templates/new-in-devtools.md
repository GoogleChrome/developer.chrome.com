---
layout: 'layouts/blog-post.njk'
title: "{{title}}"
authors:
  - jecelynyeen
date: {{date}}
description: {{desc}}
hero: '{{image}}'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-{{version}}
<% if lang !== 'en' -%>
  draft: true
<% endif -%>
---

{{thankful}}

{% Partial 'devtools/banner.md' %}

<% if lang != 'en' -%>
<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/{{lang}}/_partials/devtools/whats-new.md file -->
<%- endif %>

<%- if lang == 'en' -%><!-- $contentStart --><%- endif %>
{{content}}
<% if lang == 'en' -%><!-- $contentEnd --><%- endif %>

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
