---
layout: 'layouts/blog-post.njk'
title: Paint Holding - reducing the flash of white on same-origin navigations
description: >
  A quick overview of paint holding. A Chrome feature for reducing the flash of white on same-origin navigations
date: 2019-05-06
updated: 2019-05-24
---

For a while now, Chrome has eagerly cleared the screen when transitioning to a
new page to give users the reassurance that the page is loading. This "flash of
white" is this brief moment during which the browser shows a white paint while
loading a page. This can be distracting in-between navigations, especially when
the page is reasonably fast in reaching a more interesting state.

But for pages that load lightning fast, this approach is actually detrimental
to the user experience. In the following animation, you see an example of what
this looks like today. 

<figure>
{% Video src="video/T4FyVKpzu4WKF1kBNvXepbi08t52/iNgrQaVB9QtXT581EgKJ.mp4", autoplay="true", loop="true", muted="true" %}
</figure>

We are big fans of this website and it kills us that their quality experience
has a flash of white, and we wanted to fix it. We did so with a new behavior
that we're calling Paint Holding, where the browser waits briefly before
starting to paint, especially if the page is fast enough. This ensures that the
page renders as a whole delivering a truly instant experience.

The way this works is that we defer compositor commits until a given page load
signal (PLS) (e.g. first contentful paint / fixed timeout) is reached. We
distinguish between main-thread rendering work and commit to the impl thread
(only the latter is deferred). Waiting until a PLS occurs reduces likelihood of
flashes of white/solid-color.

Our goal with this work was for navigations in Chrome between two pages that
are of the same origin to be seamless and thus deliver a fast default navigation
experience with no flashes of white/solid-color background between old and new
content.

Try Paint Holding in Chrome Canary (Chrome 76) and let us know what you think.
Developers shouldn't have to worry about making any modifications to their
pages to take advantage of it.
