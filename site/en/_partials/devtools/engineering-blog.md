## More from the Chrome DevTools team {: #devtools-eng }

<!-- lint disable no-unescaped-template-tags -->

{% set colld = collections.tags['devtools-engineering'].posts[locale] %}
{% set colln = collections.tags['new-in-devtools'].posts[locale] %}

<!-- Get 3 random engineering posts and 2 latest what's new in DevTools posts -->
{% if colld.length and colln.length %}
{% set sliced = (colld.length / 3) | round(0, "floor") %}
{% set list1 = colld | slice(sliced) | random %}
{% set list2 = [ colln[0], colln[1] ] %}

{% if list1.length %}
  {% set list = list1.concat(list2) %}
{% endif %}

{% for item in list %}
- [{{ item.data.title }}]({{ item.url | url }})
{% endfor %}
{% endif %}

Subscribe to [Chrome DevTools blog](/tags/devtools) to stay up to date with the DevTools news.
