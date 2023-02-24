---
layout: "layouts/doc-post.njk"
title: "Throttling"
authors:
  - sofiayem
date: 2023-02-16
#updated: YYYY-MM-DD
description: "Throttling tab reference."
---

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings**](/docs/devtools/settings/#open) > **Throttling** lists custom throttling profiles. You can use these profiles to test [custom connection speeds in the **Network** panel](/docs/devtools/network/reference/#throttling-profile).

To add a custom profile:

1. [Open Settings](/docs/devtools/settings/#open).
1. In the **Throttling** tab, click **Add custom profile**.
1. Specify the following values for the new entry:

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/g3rn7EG4jq5Y3gofMlJH.png", alt="Creating a new profile in the Throttling tab.", width="800", height="464" %}

   - **Profile Name**.
   - **Download** and **Upload** speeds in Kbps.
   - **Latency** in milliseconds.

1. Click **Add** to save the new profile. You can now select it from the [throttling drop-down list in the **Network** panel](/docs/devtools/network/reference/#throttling-profile).

To edit or remove an existing profile, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JJEyylF1sToNKTtoFm4Q.svg", alt="Edit.", width="22", height="22" %} or {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YxQ6ggkbUKxxxqHiaUz4.svg", alt="Delete.", width="22", height="22" %} buttons that appear on hover.
