---
layout: 'layouts/doc-post.njk'
title: Add a YouTube Embed
description: 'Add a YouTube embed to a post.'
date: 2020-11-30
---

## Add a YouTube Embed

To add an YouTube embed to a post you can use a custom shortcode.

{% raw %}

```md
{% YouTube
  id='whnms4CLJys'
%}
```

{% endraw %}

{% YouTube
  id='whnms4CLJys'
%}

You can also specify the startTime in the second parameter.

{% raw %}

```md
{% YouTube
  id='whnms4CLJys',
  startTime='123'
%}
```

{% endraw %}
