---
title: Compare Widget
description: Testing the compare widget.
layout: 'layouts/blog-post.njk'
date: 2021-01-12
hero: 'image/BrQidfK9jaQyIHwdw91aVpkPiib2/EnMzOm0mBytBA3AzlCG6.png'
alt: Delete this file.
---

This file will be deleted before the PR is submitted, but will be merged with
the appropriate docs.

## Compare

{% Compare 'better' %}
The right way to do something
{% endCompare %}

{% Compare 'worse' %}
Don't do it this way!
{% endCompare %}

### Compare with with caption

{% Compare 'worse' %}
Bad code example

{% CompareCaption %}
Explanation of why `example` is bad.
{% endCompareCaption %}

{% endCompare %}

{% Compare 'better' %}
Good code example

{% CompareCaption %}
Explanation of why `example` is good.
{% endCompareCaption %}

{% endCompare %}

### Compare with custom labels

{% Compare 'worse', 'unhelpful' %}
Lorem ipsum [dolor sit amet](#), consectetur adipiscing elit. Proin dictum a
massa sit amet ullamcorper. `Suspendisse` auctor ultrices ante, nec tempus
nibh varius at.
{% endCompare %}

{% Compare 'better', 'helpful' %}
Lorem ipsum [dolor sit amet](#), consectetur adipiscing elit. Proin dictum a
massa sit amet ullamcorper. `Suspendisse` auctor ultrices ante, nec tempus
nibh varius at.
{% endCompare %}

### Compare with fenced code block

{% Compare 'better' %}
```js
const x = 0;
```
{% endCompare %}

{% Compare 'worse' %}
```js
var x = 0;
```
{% endCompare %}