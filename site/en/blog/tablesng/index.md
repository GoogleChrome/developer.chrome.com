---
title: TablesNG Resolves 72 Chromium Bugs for Better Interoperability
description: --
  A new rendering engine for tables makes it more consistent to author tabular data across the web.
layout: 'layouts/blog-post.njk'
date: 2021-06-16
authors:
  - unakravets
  - atotic
hero: 'image/HodOHWjMnbNw56hvNASHWSgZyAf2/4cBeoycli1TWiwNJBcq1.jpeg'
alt: --
  A set of tables from a birds-eye view
tags:
  - chrome-91
---

TablesNG launches in Chromium 91, and fixes a [ton of
bugs](https://bugs.chromium.org/p/chromium/issues/list?q=label%3ATarget-TablesNG&can=2)
that have been a part of the web platform for years. These updates will improve
browser compatibility as a part of the
[#Compat2021](https://web.dev/compat2021/) effort, and improve using tables on
the web platform overall. Some of the most-starred issues include [`position:
sticky` in
rows](https://bugs.chromium.org/p/chromium/issues/detail?id=702927&q=label%3ATarget-TablesNG&can=2&sort=pri),
[subpixel
geometry](https://bugs.chromium.org/p/chromium/issues/detail?id=377847&q=label%3ATarget-TablesNG&can=2&sort=pri),
and proper
[border-collapsing](https://bugs.chromium.org/p/chromium/issues/detail?id=2902&q=label%3ATarget-TablesNG&can=2&sort=pri).

## The TablesNG effort

TablesNG is a multi-year effort, led by Chrome developer Aleks Totic, to
completely re-architect how tables are rendered on the web. Tables are a
particular area of friction in web development, in part because of their
history. 

{% Img src="image/HodOHWjMnbNw56hvNASHWSgZyAf2/bfUfXYeGsTklMOz8J1Kt.png",
alt="Parts of a table", width="800", height="420" %}

Tables were added to HTML in 1994, then used as the [primary
method](https://codeburst.io/a-brief-history-of-trends-in-web-design-845b6acb35bc)
to create complex page layouts for many years. They are still found all over the web, 
although modern usage is generally to display tabular data.
However, there are big differences in table behavior across browsers, 
many of which came about due to the tables specification being incomplete and lacking detail.
Tables were also implemented in browsers before many CSS features:
orthogonal writing modes, `position:relative`, `box-sizing`, flexbox containers,
and more. So support for many of these features was inconsistent.

<figure>
{% Img src="image/HodOHWjMnbNw56hvNASHWSgZyAf2/8WgxvkO2EnoXXA1n21qH.png",
alt="Space Jam website screenshot", width="800", height="380" %}
<figcaption>The innovative table layout that comprised the Space Jam website, via <a href="https://codeburst.io/a-brief-history-of-trends-in-web-design-845b6acb35bc">Shannon Draper</a>.
</figcaption>
</figure>

The new spec, CSS Table Module Level 3, was written after Edge
reimplemented tables in 2018. TablesNG is a re-architecture effort that
aims to not only follow this new specification, but to also fix a lot of the
inconsistencies in tables along the way. Some of the most visible changes that
have come out of this are:

- Enabling sticky positioning in rows for long tables that scroll.
- Fixing alignment with sub-pixel geometry and table borders.
- Improved painting for backgrounds and borders.

## `position: sticky` in rows

One of the biggest asks and most frustrating things about styling tables in the
past was the lack of support for `position: sticky` in rows. This feature would enable
a table header to remain on the page as you scroll, and give context to long
data tables. By the time you scroll the header out of view and you're looking at
a table full of numbers, it's easy to forget what those numbers mean.

<figure>
{% Video src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/QKOKGUUuVP6i86nyDdeH.mp4", autoplay="true", muted="true", loop="true"  %}
<figcaption>
The table header is not remaining in the sticky position, despite <code>position: sticky</code> being applied to the <code>&lt;thead&gt;</code>.</figcaption>
</figure>

The reason we've had this bug around for so long is because `position: sticky`
was specified well after HTML tables came out. Before this fix, headers with an
intended `position: sticky` were just [converted
into](https://github.com/w3c/csswg-drafts/issues/3136) `position: static`, but
now, you can use `position: sticky` anywhere in the tables: on headers (`<thead>`) or
vertical axis labels. 

<figure>
{% Video src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/SZc6cN9UeFhPZ1q2BRyq.mp4", autoplay="true", muted="true", loop="true"  %}
<figcaption>
Table header has sticky positioning in Chromium 91+. <a href="https://codepen.io/una/pen/zYZdgMJ">See Demo on
Codepen</a>.
</figcaption>
</figure>

{% Aside 'warning' %} 
If you're using `position: sticky` on a table, make sure
it doesn't have borders. Border painting is currently an open cross-browser
compatibility issue, as borders belong to the table, not the header row itself.
{% endAside %}



## Improved border painting and background painting

One of the oldest table
[bugs](https://bugs.chromium.org/p/chromium/issues/detail?id=2902) dates
back to September 2008. It was filed almost as soon as Chrome was released, and was
never able to be fixed due to the old table architecture. The issue surrounds
table painting and collapsed borders.

The way that tables are painted, in order of `z-index`, is: cells > rows >
sections > tables. They then are painted by the order they appear in the DOM
(Document Object Model), though the cells themselves are in reverse DOM order,
where the first cell in the table is the top-most.

{% Img src="image/HodOHWjMnbNw56hvNASHWSgZyAf2/KsyTCCXLRhF2bdxlZP96.png",
alt="z-index order of tables", width="800", height="434" %}

So the issue here is that borders belong to the table, not the cell, in the old
way that tables were painted. Collapsed borders are painted when table paints its foreground. 
This means that a single table cell could not have
multiple borders:

<figure>
{% Img src="image/HodOHWjMnbNw56hvNASHWSgZyAf2/Ms8AqAJn1oKmM1thWYut.png",
alt="correct and incorrect table rendering", width="800", height="333" %}
<figcaption>Left: Incorrect table rendering prior to TablesNG. Right: correct display of a table’s borders in TablesNG.</figcaption>
</figure>


In the example above, you can see that the leftmost blue cell was incorrectly
painting on top of the orange bottom-right cell as it could not have multiple
borders. In the re-architected implementation, this is solved, and the orange
border cell correctly paints on top of the blue one, allowing the second table
gap to have both blue and orange border lines.

This bug is now fixed in Chromium and Firefox.

## Sub-pixel geometry (table alignment)

Pixel alignment in tables is another interoperability issue that has been fixed
with TablesNG. Previously, the older engine always rounded graphics values to
the pixel. This meant that as you zoom in and out of the page, things would
shift, causing alignment problems. TablesNG fixes these alignment issues.

{% Aside 'warning' %} 
There is a [known bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1201762) with table zoom and how borders are
repainted. If you are testing this out, you may run into that. {% endAside %}

## Rearchitecting the web

The Chrome team has not only been introducing new features to make web authoring
more robust, but they've also been working hard to improve existing APIs and
their compatibility. In fact, TablesNG is just one of many re-architecture
projects that this team has taken on over the past eight years. Others, though
not all of the projects, include:

- LayoutNG: a ground-up rewrite of all layout algorithms, for greatly improved
reliability and more predictable performance. 
- BlinkNG: a systematic cleanup and
refactoring of the Blink rendering engine into cleanly separated pipeline
phases. This allows for better caching, higher reliability, and re-entrant /
delayed-rendering features such as [content-visibility](/content-visibility/)
and [container queries](/new-responsive/). 
- GPU Raster Everywhere: a long-term
effort to roll out GPU rasterization on all platforms, whenever possible.
- Threaded scrolling and animations: a long-term effort to move all scrolling and
non-layout-inducing animations to the compositor thread.

Keep a lookout for some more updates on these improvements and more!
