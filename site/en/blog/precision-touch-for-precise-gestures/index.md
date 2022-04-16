---
layout: "layouts/blog-post.njk"
title: Precision touch for precise gestures
description: >
  TouchEvents have changed in Chrome to return float values, instead of integers, to account for varying screen densities. This leads to more detailed feedback during slow gestures.
authors:
  - mattgaunt
date: 2014-09-14
updated: 2019-03-15
---

A [change landed](https://bugs.chromium.org/p/chromium/issues/detail?id=323935) in
the implementation of Chrome's [TouchEvents](https://dvcs.w3.org/hg/webevents/raw-file/v1-errata/touchevents.html#attributes)
as of M37 (stable in 08/2014), which alters the reported co-ordinates to floats
instead of integers.

<table>
    <thead>
        <tr>
            <th>Before</th>
            <th>After</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                clientX: 167<br />
                clientY: 196<br />
                pageX: &nbsp;&nbsp;167<br />
                pageY: &nbsp;&nbsp;196<br />
                radiusX: 26<br />
                radiusY: 26<br />
                screenX: 167<br />
                screenY: 277<br />
            </td>
            <td>
                clientX: 167.33299255371094<br />
                clientY: 195.66700744628906<br />
                pageX: &nbsp;&nbsp;167.33299255371094<br />
                pageY: &nbsp;&nbsp;195.66700744628906<br />
                radiusX: 25.843116760253906<br />
                radiusY: 25.843116760253906<br />
                screenX: 167.33334350585938<br />
                screenY: 276.66668701171875
            </td>
        </tr>
    </tbody>
</table>

The result of this change means you have a smoother response to the users
gestures as it gives you higher accuracy of the fingers position.

Using [Rick Byers' demo](http://www.rbyers.net/paint.html#points), you can
see what a huge difference this can make when slowly drawing a swirl.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/m2los3tgcbdtSFJR6Cfc.png", alt="Differences in Touch Events.", width="800", height="331" %}
</figure>


This will only make affect screens which have a pixel density greater than 1. To
understand why, let's step through an example.

Imagine you have a 3x3 grid of **CSS pixels** and the screen density is 3,
meaning we have a grid of 9x9 **physical pixels** and the user gestures from the
top left to the bottom right.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/kKVgYStnAuE80sZvnepB.png", alt="CSS Pixel and screen pixel grid.", width="800", height="922" %}
</figure>


Originally, we were rounding the touches position to the nearest CSS pixel,
which meant in this gesture you would end up with the following steps.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/wWIOo61cwrNzhwDq3U4E.png", alt="CSS pixel precision during gesture.", width="800", height="2952" %}
</figure>

We miss out on drawing any of the intermediate steps that the physical pixels
could show as the user moves their finger.

Now that we've switched to floats, our gesture can look like this.


<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/3RI1kpf3SEeTwaD3GNu7.png", alt="Float precision during gesture.", width="800", height="4009" %}
</figure>

In most cases, this won't require any changes in your code, but does mean any
animations or movements you do as a result of TouchEvents, will be smoother,
especially for slow gestures.

There is also plan to bring this improvement to mobile Safari as well: [https://bugs.webkit.org/show_bug.cgi?id=133180](https://bugs.webkit.org/show_bug.cgi?id=133180).


