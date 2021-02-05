---
layout: 'layouts/doc-post.njk'
title: Add an IFrame
description: 'Add an IFrame to a post.'
date: 2020-11-23
---

## Add an IFrame

To add an IFrame to a post you can use a custom shortcode which optimizes
IFrames on the site.

{% raw %}

```md
{% IFrame
  src='https://example.com',
%}
```

{% endraw %}

The IFrame shortcode supports additional properties though. Below is an example
interface of the accepted argument:

```typescript
interface IFrameArgs {
  src: string;
  [key: string]: string | boolean | number;
}
```

Effectiveley you can add any attribute to an IFrame, the only required argument
is a `src`.

Keep in mind, for an attribute that has a boolean value, just set the value to
`true`, like so:

{% raw %}

```md
{% IFrame
  src='https://example.com',
  allowfullscreen=true
%}
```

{% endraw %}

The generated HTML will look like this:

```html
<iframe style="height: 100%; width: 100%; border: 0;" title="IFrame content" src="https://example.com" allowfullscreen loading="lazy"></iframe>
```
