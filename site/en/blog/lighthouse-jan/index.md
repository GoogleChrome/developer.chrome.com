---
# Required
layout: 'layouts/blog-post.njk'

# Required
title: Lighthouse January 2017 update

# Required
description: >
  What's new in Lighthouse 1.5.

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
authors:
  - brendankenny
  - ericbidelman

# Required
date: 2017-02-10

# Optional
# Include an updated date when you update your post
updated: 2017-02-10

# Optional
# How to add a new tag
# https://developer.chrome.com/docs/handbook/how-to/add-a-tag/
tags:
  - lighthouse


---


[Lighthouse](/docs/lighthouse/overview/) is an
[open-source](https://github.com/GoogleChrome/lighthouse), automated tool for
improving the quality of your web apps. You can install it as a
[Chrome Extension](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)
or run it as a Node command line tool. When you give Lighthouse a URL, it runs
a barrage of tests against the page and then generates a report explaining
how well the page did and indicating areas for improvement.

<figure class="float-right">
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/teRxOktAKhivyBBuLkdA.png", alt="Lighthouse Logo", width="800", height="451" %}
  <figcaption>
    Lighthouse Logo
  </figcaption>
</figure>


<style>
.lighthouse-logo {
  height: 150px;
  width: auto;
}
</style>

Today, we're happy to announce the
[1.5 release](https://github.com/GoogleChrome/lighthouse/releases/tag/1.5.0)
of Lighthouse, a huge release, with over **128 PRs**. Lighthouse 1.5 includes
a bunch of big new features, audits, and the usual bug fixes. You can install
it from npm (`npm i -g lighthouse`) or
[download the extension](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)
from the Chrome Web Store.

## New Audits

The **CSS Usage Audit** reports the number of unused style rules in your page
and the cost/time savings of removing them:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/KWWXBkRnErqVBExbV9zL.png", alt="CSS Usage Audit", width="800", height="354" %}
</figure>

The **Optimized Images Audit** reports images that are unoptimized and the
cost/time savings of optimizing them:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/VAtyApD4pu1l33SZgZkU.png", alt="Optimized Images AudiT", width="800", height="518" %}
</figure>


The **Responsive Images Audit** reports images that are too big and the
potential cost/time savings of sizing them correctly for the given device:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/VAtyApD4pu1l33SZgZkU.png", alt="Optimized Images AudiT", width="800", height="518" %}
</figure>

The **Deprecations and Interventions Audit** lists console warnings from Chrome
if your page is using deprecated APIs or features that have
[interventions](https://www.chromestatus.com/features#intervention):

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/hsvaX5wazXqSUgPUV6WM.png", alt="Deprecations and Interventions Audit", width="800", height="331" %}
</figure>

## Report changes

As you've seen, we've focused on making the report less visually cluttered by
adding tabular data, hiding extraneous help text, and adding new features to
make it easier to navigate the data.

### Emulation settings

It's easy to forget what throttling and emulation settings were used for a
particular Lighthouse run. Lighthouse reports now include the
**runtime emulation settings** that were used to create the report; a
[long time feature request](https://github.com/GoogleChrome/lighthouse/issues/568):

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/7IZbz8dhy65bwuoIXlVr.gif", alt="Emulation settings", width="800", height="240" %}
</figure>

### More useful trace data

Lighthouse metrics like "First meaningful paint", "Time to Interactive", etc are
mocked out as User Timing measures and injected back into the trace data saved
with the `--save-assets` flag.

If you use the `--save-assets` flag, you can now drop the trace into DevTools or
open it in the [DevTools Timeline Viewer](https://chromedevtools.github.io/timeline-viewer/).
You'll be able to see your key metrics in context with the full trace of the
page load.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/9E6IOdZpz5uSnTI5t2qM.png", alt="Trace data", width="800", height="578" %}
</figure>

## Lighthouse Viewer

In HTML reports, you'll notice a new button with options for exporting the
report in different formats. One of those options is "Open in Viewer". Clicking
this button will send the report to the online
[Viewer](https://googlechrome.github.io/lighthouse/viewer/), where you can
further share the report with GitHub users.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/ENCZmTbcI3NUlYVDNIMw.png", alt="Open in Viewer button", width="800", height="236" %}
</figure>

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/Xez8cD9srj5O8J2EclbL.png", alt="Open in Viewer result", width="800", height="236" %}
</figure>


Behind the scenes, Viewer gets your permission via OAuth to create a GitHub
[secret gist](https://help.github.com/articles/about-gists/#secret-gists) and
saves the report there. Since it's done as your Gist, you maintain full control
over the sharing of the report and you can delete it at any time. You can revoke
the Viewer's permission to create gists under your
[GitHub settings](https://github.com/settings/applications).

## Performance Experiment

The first version of the
[Performance Experiment](https://github.com/GoogleChrome/lighthouse/issues/1143)
project has landed in 1.5.0. This lets you experiment with your page load performance,
interactively testing the effects of blocking or delaying assets in your critical
path **during development**.

When Lighthouse is run with the `--interactive` flag, a special report is
generated that allows interactive selection of costly page resources. The
experiment server then reruns Lighthouse on that page with those resources
blocked.


<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/gJE5lMccqdv2B3Duo7rE.png", alt="Toggling runtime settings", width="800", height="699" %}
</figure>


[Learn more](https://docs.google.com/document/d/1FYt5Es_Kf5IyC_bkTHj2G_a_sTvRvIq5iZCEN8VZY5o/edit#heading=h.cetla8h0y4o)
about the Performance Experiment in Lighthouse.

## New Documentation

Last but not least, we've modernized the documentation at
[developers.google.com/web/tools/lighthouse/](https://developers.google.com/web/tools/lighthouse/)
and added new audit references.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/B1vWvYeFDMGUay2R0PWt.png", alt="New documentation", width="800", height="528" %}
</figure>

That's it for now!

For all the details on the latest in Lighthouse, see the
[full release notes](https://github.com/GoogleChrome/lighthouse/releases/tag/1.5.0)
over on GitHub. As always,
[hit us up](https://github.com/GoogleChrome/lighthouse/graphs/contributors)
to [report bugs](https://github.com/GoogleChrome/lighthouse/issues), file
feature requests, or brainstorm
[ideas](https://github.com/GoogleChrome/lighthouse/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+bug%22)
on what you'd like to see next.

