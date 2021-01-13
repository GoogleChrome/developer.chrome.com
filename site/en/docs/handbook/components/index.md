---
title: Components
layout: 'layouts/doc-post.njk'
date: 2021-01-12
---

## Compare

```md
{% raw %}{% Compare 'better' %}
The right way to do something
{% endCompare %}

{% Compare 'worse' %};
Don't do it this way!
{% endCompare %}{% endraw %}
```

{% Compare 'better' %}
The right way to do something
{% endCompare %}

{% Compare 'worse' %}
Don't do it this way!
{% endCompare %}

### Compare with caption

```md
{% raw %}{% Compare 'worse' %}
Bad code example

{% CompareCaption %}
Explanation of why example is **bad**.
{% endCompareCaption %}

{% endCompare %}

{% Compare 'better' %}
Good code example

{% CompareCaption %}
Explanation of why example is **good**.
{% endCompareCaption %}

{% endCompare %}{% endraw %}
```

{% Compare 'worse' %}
Bad code example

{% CompareCaption %}
Explanation of why example is **bad**.
{% endCompareCaption %}

{% endCompare %}

{% Compare 'better' %}
Good code example

{% CompareCaption %}
Explanation of why example is **good**.
{% endCompareCaption %}

{% endCompare %}

### Compare with custom labels

To support localization all custom labels will need to be added to the
`site/_data/i18n/common.yml` file.

```yml
# site/_data/i18n/common.yml
compare_unhelpful:
  en: 'Unhelpful'

compare_helpful:
  en: 'Helpful'
```

```md
{% raw %}{% Compare 'worse', 'unhelpful' %}
Lorem ipsum dolor sit amet.
{% endCompare %}

{% Compare 'better', 'helpful' %}
Lorem ipsum dolor sit amet.
{% endCompare %}{% endraw %}
```

{% Compare 'worse', 'unhelpful' %}
Lorem ipsum dolor sit amet.
{% endCompare %}

{% Compare 'better', 'helpful' %}
Lorem ipsum dolor sit amet.
{% endCompare %}

### Compare with fenced code block

````md
{% raw %}{% Compare 'better' %}
```js
const x = 0;
```
{% endCompare %}

{% Compare 'worse' %}
```js
var x = 0;
```
{% endCompare %}{% endraw %}
````

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