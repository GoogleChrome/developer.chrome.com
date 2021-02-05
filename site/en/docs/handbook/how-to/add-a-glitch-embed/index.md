---
layout: 'layouts/doc-post.njk'
title: Add a Glitch Embed
description: 'Add a Glitch embed to a post.'
date: 2020-11-23
---

## Add a Glitch Embed

To add an Glitch embed to a post you can use a custom shortcode which optimizes
Glitch embeds on the site.

{% raw %}

```md
{% Glitch
  id='fav-kitties-compress-starter'
%}
```

{% endraw %}

{% Glitch
  id='fav-kitties-compress-starter'
%}

The Glitch embed shortcode supports additional properties though. Below is an
example interface of the accepted argument:

```typescript
interface GlitchArgs {
  allow?: string | string[];
  height?: number;
  id: string;
  path?: string;
  previewSize?: number;
}
```
