---
layout: "layouts/doc-post.njk"
title: "Developer Resources: View and load source maps manually"
authors:
  - sofiayem
date: 2023-04-26
#updated: YYYY-MM-DD
description: "Check if source maps load successfully and, if required, load them manually."
---

Use the **Developer Resources** drawer panel to check if DevTools loads source maps successfully. If required, you can load them manually.

{% YouTube id='SkUcO4ML5U0' %}

{% Aside 'important' %}
To learn how source maps can make debugging easier for you, see [Debug your original code instead of deployed with source maps](/docs/devtools/javascript/source-maps/).
{% endAside %}

When you open DevTools, it attempts to load source maps, if any. In case of failure, the **Console** logs an error similar to the following.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/wbVBOGD7jn0wQeYnvaRE.png", alt="The source map load error in the Console.", width="800", height="495" %}

In the **Developer Resources** drawer tab, you can view the source map load status and even load a source maps manually. 

## Open Developer Resources and check status {: #open-developer-resources }

To check the load statuses of source maps:

1. Open {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Three-dot menu.", width="22", height="22" %} > **More tools** > **Developer Resources**.
1. In the table, check the values in the following columns:

   - **Status** to see if the source map load resulted in success or failure.
   - **Error** to read the error message.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/vYeuYDIasIImzGs1Y6hw.png", alt="The Status and Error columns.", width="800", height="495" %}

## Filter resources by URL or Error {: #filter-resources }



## Load a source map manually {: #load }


