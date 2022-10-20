---
title: 'Building a Better Web - Part 1: A faster YouTube on web'
description: >
  This is Part 1 of our new series on Building a Better YouTube Web called "Building a faster YouTube on web"
layout:
  'layouts/blog-post.njk'
date: 2022-10-19
authors:
  - addyosmani
  - sriramkrishnan
hero: 'image/1L2RBhCLSnXjCnSlevaDjy3vba73/1gRfAdlty3acAWLzq2ui.jpg'
alt: >
  A hero image of the YouTube mWeb loading experience.
tags:
  - performance
  - news
---

The Chrome team often talks about "building a *better* web", but what does that
mean? Web experiences should be [fast](https://web.dev/why-speed-matters/),
[accessible](https://web.dev/accessibility/), and leverage [device
capabilities](https://web.dev/reliable/) in the moment when users need it most.
Dogfooding is part of Google's culture, so the Chrome team has partnered with
YouTube to share lessons learned along the way in a new series called, "Building
a better web". The first part of the series will dive into how YouTube built a
faster web experience.

<figure>
{% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/hIcVf8Pob6DaLrmNjdNX.png", alt="PageSpeed Insights showing the Chrome UX Report data for YouTube Mobile Web passing the Core Web Vitals", width="800", height="450" %}
  <figcaption>
    The YouTube for mobile web Watch page passing the <a href="https://web.dev/vitals">Core Web Vitals</a> thresholds 
  </figcaption>
</figure>

## Building a faster web

Performance to YouTube is how fast videos and other content, such as
recommendations and comments, load on web pages. It is also how quickly it
responds to user interactions such as search, player control, likes, shares, and
many others.

Growing developing markets, such as Brazil, India, and Indonesia are important
for YouTube mobile web. Because many users in these regions have slower devices
and limited network bandwidth, ensuring a fast and seamless experience is a
critical goal.

To provide an inclusive experience for all users, YouTube set out to improve
performance metrics such as Core Web Vitals through lazy-loading and code
modernization.

### Improving Core Web Vitals

To identify areas of improvement, the YouTube team used the Chrome User
Experience Report
([CrUX](https://developer.chrome.com/docs/crux/))
to see how real users were experiencing video watch and search result pages on
mobile in [the
field](https://web.dev/lab-and-field-data-differences/#field-data). They
realized their Core Web Vitals metrics had a lot of room for improvement, with
their [Largest Contentful Paint (LCP)](https://web.dev/lcp/) metric clocking in
at 4-6 seconds in some cases. This was substantially higher than their target of
2.5 seconds.

{% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/uy6hO7M60rRw3bTfXTCH.png", alt="Charts of FCP and LCP showing YouTube Watch page pass rates as well as the YouTube origin", width="800", height="285" %}

To identify areas for improvement, they turned to
[Lighthouse](/docs/lighthouse/overview/) to audit
the YouTube watch pages, revealing a low Lighthouse
([lab](https://web.dev/lab-and-field-data-differences/#lab-data)) score with a
First Contentful Paint (FCP) of 3.5 seconds and a LCP of 8.5 seconds.

<figure>
{% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/PeCzGyBCTcY63B5Nft1a.jpg", alt="Lighthouse Report for YouTube Mobile", width="800", height="518" %}

  <figcaption>
    Chrome sets a target of 1.8s for FCP and 2.5s for LCP as a gold standard. The FCP and LCP were clearly in the yellow and red at 3.5s and 8.5s, respectively.
  </figcaption>
</figure>

To optimize FCP and LCP, the YouTube team dove into several experiments,
resulting in two big discoveries.

1. **The first change was reordering the Player rendering to before the
    Player's main JavaScript logic.** By moving the Player HTML before the
    render-blocking script, the team saw improvements in FCP and LCP of all
    watch pages on cold-loads from 4.4 seconds to 1.1 seconds in the lab.

1. **The second discovery was realizing the JavaScript-based video player was
    the most significant element on the page triggering LCP values upwards of
    4.5 seconds.** To improve LCP, the team experimented with showing the actual video (poster) thumbnail before the player buffered.
    Although this improved LCP, there was a drop in active users. As a result,
    the team decided to render a base64 image of black background of the player
    to communicate to the user the video player is loading as this was believed to be a closer approximation of the lived experience. As a result, both
    FCP and LCP showed marked improvement, with field LCP improving from 4.6
seconds to 2.0 seconds.  
  
<figure>
{% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/e2es1tQ9JJ31pcOMvWhM.jpg", alt="Watch Page LCP Experiment for mobile web showing control, experiment A (image thumbnail) and experiment B (black thumbnail)", width="800", height="514" %}
  <figcaption>
    In the lab, we observed an improvement to the YouTube for mobile watch page FCP and LCP from 4.4s to 1.1s after this change landed. 
  </figcaption>
</figure>

{% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/wGjBH4sMWoZEbRon6gBS.png", alt="The black thumbnail was deployed in production for all mobile web users July 2021 showing marked improvement in FCP and LCP, as seen in the above RUM analysis.", width="800", height="408" %}

The black thumbnail was deployed in production for all mobile web users July 2021
showing marked improvement in FCP and LCP, as seen in the above RUM analysis.

{% Aside %}
LCP [considers](https://web.dev/lcp/#what-elements-are-considered) the poster image for video elements but not the main video element. YouTube is interested in better optimizing for this measurement gap and the Chrome team is actively working to address it.
{% endAside %}


#### Applying learnings from mobile to desktop

After improving LCP on YouTube's mobile web properties, YouTube ran both the thumbnail and base64 black placeholder image experiments on their desktop website. YouTube noticed that they did not see the same drop in active devices on desktop than on the earlier mobile web experiments. As a result, they decided to launch the thumbnail image, improving their Core Web Vitals, with lab LCP reducing from approximately 4.6 seconds to 1.6 seconds.

<figure>
{% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/Jjk6MXtChCvg5QsiczDh.jpg", alt="A WebPageTest comparison of control, experiment A (black thumbnail) and experiment B (image thumbnail)", width="800", height="415" %}
  <figcaption>
    Prioritizing showing an Image Thumbnail early helped improve Desktop LCP in the lab from 4.6s to 1.6s.
  </figcaption>
</figure>

This work included taking advantage of the new [Priority Hints](https://web.dev/priority-hints/) `fetchpriority` attribute, which we use with Preload to both improve discovery of the thumbnail and prioritize it:

```html
<link as="image" rel="preload" href="thumbnail.jpg" fetchpriority="high">
```

### Modularization with lazy loading

YouTube pages contained many modules that were eagerly loaded. To optimize how
50+ components were rendered, the team built a component to JS module map that
would tell the client which modules to load. By marking components as lazy, the
JS modules would load later, reducing the initial load time of the page and the
amount of unused Javascript sent to the client.

However, after lazy loading was implemented, the team noticed a waterfall effect
that lazy loaded components and their dependencies would load at suboptimal
times.

To solve this problem, the team determined the minimal set of components needed
in a view and batched them in a single network request. The results were
improved page speed, reduced JavaScript parse time, and, ultimately, better
initial rendering times.

### State-management across components

YouTube was experiencing performance issues due to its player controls,
especially on older devices. Code analysis showed that the player, which allows
users to control features such as playback speed and progress, had become
over-componentized over time. 


<figure>
{% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/qh9N7ZdkxylN1vYOOdUO.png", alt="YouTube player and controls visualized", width="800", height="300" %}
  <figcaption>
    The YouTube video player allows users to control playback speed, follow progress, skip sections, and others. When a user taps on a particular control, the change in the state must be communicated to other controls e.g. a user tap on the progress bar must be shared to controls such as play-head, subtitles etc.
  </figcaption>
</figure>

Each progress bar touch-move event triggered two
extra style recalculations and took 21.17 ms during performance test runs in the lab. As new controls were added over time, the pattern of decentralized control would often cause circular dependencies and memory leaks, negatively impacting watch page performance.

<figure>
{% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/vCTMilflEoDnkw1p8EuU.png", alt="21.17ms event shown on the Performance timeline", width="800", height="202" %}
  <figcaption>
    Chrome DevTools with a 4x CPU slow-down performance run. 
  </figcaption>
</figure>

To fix the issues due to decentralized control, the team updated the player UI
to synchronize all updates, essentially refactoring the player to one top-level
component that would pass down data to its children. This ensured only one UI
update (render) cycle for any state change, eliminating chained updates. The new
player progress bar touch-move event has no style recalculations during its
JavaScript execution and now only requires 25% the time of the old player.

{% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/E1EbOYuT2q7mDqfmR1zz.png", alt="Reduced time in events shown on the performance timeline", width="800", height="90" %}

This code modernization also resulted in additional performance improvements
such as improved watch load times on old devices, fewer abandoned playbacks, and
a reduced number of non-fatal errors.

## Conclusion

As a result of YouTube's investment in performance, watch pages load much faster
with 76% of YouTube's mobile website URLs now passing Core Web Vitals metric
thresholds. Interaction and rendering performance of the site, especially on the
YouTube video player, are seeing up to 75% less time spent in JavaScript
execution than before.

{% Aside 'success' %}
76% of YouTube's mobile web URLs now pass the Core Web Vitals metrics, with improvements to business metrics like watch time as a result.
{% endAside %}

Improvements to the performance of YouTube mobile web over the last year have
also improved business metrics, including watch time and daily active users. We
look forward to exploring how more of these performance optimizations can be
applied to the YouTube desktop site.

In part two of this series, "Building an accessible web", you'll read how
YouTube made their website more accessible for screen-reader users. 

_With special thanks to Gilberto Cocchi, Lauren Usui, Benji Bear, Bo Aye, Bogdan Balas, Kenny Tran, Matthew Smith, Jeremy Wagner, Philip Walton, Leena Sahoni and both the YouTube and Chrome teams for their help._