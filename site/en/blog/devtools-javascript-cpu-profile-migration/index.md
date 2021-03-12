---
layout: "layouts/blog-post.njk"
title: "Chrome DevTools: JavaScript CPU Profiling in Chrome 58"
authors:
  - kaycebasques
date: 2016-12-15
updated: 2019-01-16
description: "Record JavaScript CPU Profile has been changed in Chrome 58."
---

In Chrome 58, which is currently Canary, the Timeline panel has been renamed to the Performance
panel, the Profiles panel has been renamed to the Memory panel, and the Record JavaScript CPU
Profile feature on the Profiles panel has been moved to a more hidden location.

The long-term goal is to remove the old JavaScript CPU Profiler, and get everyone working with the
new workflow.

This little migration guide shows you how to record a JS profile in the Performance panel, and how
the Performance panel's UI maps to the old workflow that you're used to.

## Accessing the old JavaScript CPU profiler {: #old }

If you prefer the old "Record JavaScript CPU Profile" workflow that used to be available on the
Profiles panel, you can still access it like so:

1.  Open the DevTools [main menu][1].
2.  Select **More tools** > **JavaScript Profiler**. The old profiler opens in a new panel called
    **JavaScript Profiler**.

{% Aside 'warning' %}

**Warning:** The long-term goal is to migrate everyone to the new workflow. This workflow may be
removed in future DevTools versions.

{% endAside %}

## How to record a JS profile {: #record }

1.  Open DevTools.
2.  Click the **Performance** tab.

    {% Img src="image/admin/4RsO4nZuUZrC8UpNrbf8.png", alt="The Chrome DevTools Performance panel", width="800", height="463" %}

    **Figure 1**. The Performance panel.

3.  Record in one of the following ways:

    - To profile a page load, click **Record Page Load**. DevTools automatically starts the
      recording and then automatically stops when it detects that the page has finished loading.
    - To profile a running page, click **Record**, perform the actions that you want to profile, and
      then click **Stop** when you're finished.

## How the old workflow maps to the new {: #mind-map }

From the **Chart** view of the old workflow, the screenshot below shows you the position of the CPU
usage overview chart (top arrow) and the flame chart (bottom arrow) in the new workflow.

{% Img src="image/admin/65r1vd3w5FGALyttqIE7.png", alt="Mapping between flame chart in old workflow and new workflow.", width="800", height="329" %}

**Figure 2**. Mapping between flame chart in old workflow (left) and new workflow (right).

The **Heavy (Bottom Up)** view is available in the **Bottom-Up** tab:

{% Img src="image/admin/DJFYcoz74MXgHsJTEwg2.png", alt="Mapping between Bottom-Up view in old workflow and new workflow.", width="800", height="282" %}

**Figure 3**. Mapping between Bottom-Up view in old workflow (left) and new workflow (right).

And the **Tree (Top Down)** view is available in the **Call Tree** tab:

{% Img src="image/admin/cAjO3BTWVqZj1XC7mxWD.png", alt="Mapping between Tree view in old workflow and new workflow.", width="800", height="286" %}

**Figure 4**. Mapping between Tree view in old workflow (left) and new workflow (right).

[1]: /docs/devtools/ui#main-menu
