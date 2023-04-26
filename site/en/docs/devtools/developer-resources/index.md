---
layout: "layouts/doc-post.njk"
title: "Developer Resources: View and manually load source maps"
authors:
  - sofiayem
date: 2023-04-26
#updated: YYYY-MM-DD
description: "Use the Developer Resources drawer tab to check if source maps load successfully and load them manually."
---

Use the **Developer Resources** tab to check if DevTools loads source maps successfully. If required, you can load them manually.

{% YouTube id='SkUcO4ML5U0', startTime=139 %}

{% Aside 'important' %}
To learn how source maps can make debugging easier for you, see [Debug your original code instead of deployed with source maps](/docs/devtools/javascript/source-maps/).
{% endAside %}

When you open DevTools, it attempts to load source maps, if any. In case of failure, the **Console** logs an error similar to the following.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/wbVBOGD7jn0wQeYnvaRE.png", alt="The source map load error in the Console.", width="800", height="495" %}

In the **Developer Resources** drawer tab, you can view the source map load status and even load source maps manually. 

## Open Developer Resources and check status {: #open-developer-resources }

To check the load statuses of source maps:

1. [Open DevTools](/docs/devtools/open/), make sure to [enable source maps](/docs/devtools/javascript/source-maps/#enable_source_maps_in_settings), and navigate to {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Three-dot menu.", width="22", height="22" %} > **More tools** > **Developer Resources**.
1. In the table, check the values in the following columns:

   - **Status** to see if the source map loading was a success or failure.
   - **Error** to read the error message, if any.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/vYeuYDIasIImzGs1Y6hw.png", alt="The Status and Error columns.", width="800", height="495" %}

## Filter resources by URL or Error {: #filter-resources }

To focus on source maps that interest you, enter text in the textbox at the top to filter out source maps that don't contain this text in URLs or error messages.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/y1VcNVAkSuNp0ofvaD3q.png", alt="Filtering out source maps that don't contain 'js' in URL.", width="800", height="553" %}

## Troubleshoot {: #troubleshoot }

By default, DevTools requests source maps rather than the website. Such requests may be treated as [cross-origin](https://developer.mozilla.org/docs/Web/HTTP/CORS) and might not get through.

To make the website request source maps first, in the top right corner of **Developer Resources**, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="24", height="24" %} **Enable loading through target**.

If you still have issues with loading source maps, try to load them manually as described next.

## Load a source map manually {: #load }

If you encounter load failures or, for example, want to [debug your original code](/docs/devtools/javascript/source-maps/) on a website in production that lacks source maps, you can load them manually:

1. [Generate source maps using tools that support them](/docs/devtools/javascript/source-maps/#use_a_supported_preprocessor).
1. Host the source maps locally.
1. [Open DevTools](/docs/devtools/open/) on your page and make sure to [enable source maps](/docs/devtools/javascript/source-maps/#enable_source_maps_in_settings).
1. Open the deployed (processed) file in **Sources**, right-click it in the **Editor**, and select **Add source map** from the menu.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/snRTwnA88ziEz5MslUBJ.png", alt="Selecting 'Add source maps' from the menu.", width="800", height="553" %}
1. In the textbox, specify the source map URL and click **Add**.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/W8gjE6hv8zPdzT4OfUup.png", alt="Specifying the source map URL.", width="800", height="553" %}

1. Check if the source map appeared in **Developer Resources** and the original file (mapped from the deployed one) in the file tree.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bKZ5xtima2U1z6RSHJ3B.png", alt="A manually loaded source map makes the original file appear in the file tree.", width="800", height="553" %}

1. Proceed to [debug your original file](/docs/devtools/javascript/source-maps/#debugging_with_source_maps).
