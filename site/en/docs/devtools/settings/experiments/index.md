---
layout: "layouts/doc-post.njk"
title: "Experiments"
authors:
  - sofiayem
date: 2023-02-16
#updated: YYYY-MM-DD
description: "Experiments tab reference."
---

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings**](/docs/devtools/settings/#open) > **Experiments** let you enable and disable experimental features of Chrome DevTools.

{% Aside 'caution' %}
Chrome DevTools experiments may be unstable.
{% endAside %}

To enable an experiment:

1. [Open Settings](/docs/devtools/settings/#open).
1. In the **Experiments** tab, search for the experiment you would like to try in the **Filter** textbox.
1. Enable the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} checkbox next to the experiment.
1. Close {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings**.
1. If required, click **Reload DevTools** in the prompt at the top.

The next time you open DevTools, the experiment is enabled. To disable an experiment, clear the corresponding checkbox.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/TmKNYVbWgbsx5MSnHLgs.png", alt="The Experiments tab.", width="800", height="533" %}