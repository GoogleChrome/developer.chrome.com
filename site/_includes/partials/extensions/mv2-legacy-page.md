{% set found = false %}
{% set mv3url = page.url | replace('/mv2/', '/mv3/') %}
{% for item in collections.all %}
  {% if item.url == mv3url %}
    {% set found = true %}
  {% endif %}
{% endfor %}

{% Aside 'warning' %}
The page you're viewing describes extensions using Manifest V2. Now that
[Manifest V3 has launched](/docs/extensions/mv3/intro), we strongly recommend
that you use it for any new extensions that you create.

{% if found %}
[Click here]({{ mv3url }}) for the MV3 version of this page.
{% endif %}
{% endAside %}
