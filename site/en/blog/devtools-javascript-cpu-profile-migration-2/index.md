---
layout: 'layouts/blog-post.njk'
title: Chrome DevTools - JavaScript CPU Profiling in Chrome 58
description: >
    "Record JavaScript CPU Profile" has been changed in Chrome 58.
authors:
  - kaycebasques
date: 2016-12-15 
updated: 2019-01-16
---


In Chrome 58, which is currently Canary, the Timeline panel has been renamed
to the Performance panel, the Profiles panel has been
renamed to the Memory panel, and the Record JavaScript CPU Profile feature
on the Profiles panel has been moved to a more hidden location.

The long-term goal is to remove the old JavaScript CPU Profiler, and
get everyone working with the new workflow.

This little migration guide shows you how to record a JS profile in the 
Performance panel, and how the Performance panel's UI maps to the old
workflow that you're used to.

## Accessing the old JavaScript CPU profiler

If you prefer the old "Record JavaScript CPU Profile" workflow that used to
be available on the Profiles panel, you can still access it like so:

1. Open the DevTools [main menu](https://developers.google.com/web/tools/chrome-devtools/ui#main-menu).
1. Select **More tools** > **JavaScript Profiler**. The old profiler opens
   in a new panel called **JavaScript Profiler**.

{% Aside 'warning' %}
The long-term goal is to migrate everyone to the new workflow.
This workflow may be removed in future DevTools versions.
{% endAside%}


## How to record a JS profile

1. Open DevTools.
1. Click the **Performance** tab.

     <figure>
        {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/Y6ucATEHruHmJxiosJ3p.png", alt="The Chrome DevTools performance panel.", width="800", height="463" %}
       <figcaption><b>Figure 1</b>. The Performance panel.</figcaption>
     </figure>

1. Record in one of the following ways:

     * To profile a page load, click **Record Page Load**.
       DevTools automatically starts the recording and then automatically
       stops when it detects that the page has finished loading.
     * To profile a running page, click **Record**, perform the actions that
       you want to profile, and then click **Stop** when you're finished.

## How the old workflow maps to the new 

From the **Chart** view of the old workflow, the screenshot below shows
you the position of the CPU usage overview chart (top arrow) and the 
flame chart (bottom arrow) in the new workflow.

<figure>
    {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/coKPPGJaZqLiPNBtFbZ5.png", alt="Mapping between flame chart in old workflow and new workflow.", width="800", height="329" %}
  <figcaption>
    <b>Figure 2</b>. Mapping between flame chart in old workflow (left) and
    new workflow (right).
  </figcaption>
</figure>

The **Heavy (Bottom Up)** view is available in the **Bottom-Up** tab:

<figure>
    {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/WC8vjHEk2JOwUmvVC05k.png", alt="Mapping between Bottom-Up view in old workflow and new workflow.", width="800", height="282" %}
  <figcaption>
    <b>Figure 3</b>. Mapping between Bottom-Up view in old workflow (left) and
    new workflow (right).
  </figcaption>
</figure>

And the **Tree (Top Down)** view is available in the **Call Tree** tab:

<figure>
    {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/IFOOgGqWXSwGzQUjgOub.png", alt="Mapping between Tree view in old workflow and new workflow.", width="800", height="59" %}
  <figcaption>
    <b>Figure 4</b>. Mapping between Tree view in old workflow (left) and
    new workflow (right).
  </figcaption>
</figure>


Ping [@ChromeDevTools](https://twitter.com/chromedevtools) on Twitter or
[open a GitHub issue][GH] on our docs repo if we missed any features, or if you
have any other questions about this article.

[GH]: https://github.com/google/WebFundamentals/issues/new?title=[DevTools%20CPU%20Profile%20Migration]
