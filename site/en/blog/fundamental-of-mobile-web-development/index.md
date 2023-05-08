---
layout: "layouts/blog-post.njk"
title: Fundamentals of mobile web development
description: >
  A quick look at some of the efforts the Chrome team are doing to helps developers get started with web development and iterate on their sites.
authors:
  - paulkinlan
date: 2014-12-01 
updated: 2019-03-15
---

At [Chrome Dev Summit 2014](https://developers.google.com/web/showcase/2015/chrome-dev-summit) there was a whole host of topics and brand spanking new API's covered, but its not all about
the new and shiny.

{% YouTube id="z6dg_V22wV0" %}


If you are a new Web Developer or even an experienced developer about to embark
on exploring new APIs, chances are you'll follow these three steps: learn, build
and iterate.

[Matt Gaunt](https://twitter.com/gauntface) covers the ongoing efforts to
address these problems from the Chrome Developer Platform team.


## Learn

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/7Od4bssRqQ693KiKMNGR.png", alt="WebFundamentals on a HTML5Rocks", width="800", height="533" %}
</figure>

[Web Fundamentals](https://developers.google.com/web/fundamentals/) is a set of
use case led documentation covering a range of topics. The core goal is get
developers from little or no knowledge, to implementing best practices as
quickly as possible.

One of the main goals of Web Fundamentals is to ensure that if you are new to a
topic, the guidance reduces "choice paralysis" as much as possible. [Addy
Osmani](https://addyosmani.com/) covers this perfectly over at [Pastry
Box](https://the-pastry-box-project.net/addy-osmani/2014-January-19).

If you do spot any issues with the site or it's content or you'd like Web
Fundamentals to cover a particular topic, then please do let us know by
[submitting feedback on
GitHub](https://github.com/Google/WebFundamentals/issues/new?title=Feedback%20for:%20/fundamentals/index.html).

## Build

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/HQ7F0dQfpCVV7rVLrvew.gif", alt="Web Starter Kit on a Range Devices", width="800", height="533" %}
</figure>

To help you kick off a new web project we created [Web Starter
Kit](https://developers.google.com/web/tools/starter-kit/). It has everything you
need:

* A solid build process
* Boilerplate HTML
* Styleguide

### The Build Process

For those of you who are new to build processes, the easiest way to think of a
build process is to view it as a program which takes a set of files and performs
certain tasks on them and outputs new versions in a different location. The
tasks optimize the files to improve load times, check for possible errors or
handle tasks that can be automated.

In Web Starter Kit we have the following processes:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/fA98vwFtOvZKiM2oVe0G.png", alt="Diagram of Web Starter Kits Build Process", width="800", height="604" %}
</figure>

We minify and concatenate CSS and JavaScript so that the browser can fetch the
file quickly, the JavaScript is also run through JSHint to check for JavaScript
best practices and common coding mistakes. Images are minified with imagemin and
you can get **huge** reductions in file size by using this. We also have a
process to create the styleguides CSS.

### Boilerplate for Multi-Device HTML

The first set of HTML you write for a new page is pretty bog standard and
chances are you'll have some way of quickly getting hold a stock HTML file that
works well across multiple devices and screen sizes.

In Web Starter Kit we wanted to add in support for any features which blurred
the lines between the platform and your site, so we've added support for [add to
home screen](https://developers.google.com/web/fundamentals/design-and-ux/browser-customization/)
and splash screens for Android, Windows Phone, iOS and Opera Coast.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/mhKvP1XTW48IYz1c8DyT.gif", alt="Example of Web Starter Kit Add to home screen.", width="800", height="701" %}
</figure>

### Styleguide

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/QwKMiTcJcLHQ9lmWafew.gif", alt="Web starter kit styleguide on Chromebook Pixel.", width="800", height="533" %}
</figure>

The final piece of Web Starter Kit is it's Styleguide.

This gives any new project a great set of default styles and components that
encourages style driven development. You can alter existing styles to elements
and add your own.

In the next version of WSK, due for release early next year, we are working hard
to simplify how the styleguide fits together and switching to a [material
design](https://github.com/google/web-starter-kit/tree/material-sprint) look and
feel. [Matt](https://youtu.be/z6dg_V22wV0?t=15m5s)[showed
an](https://youtu.be/z6dg_V22wV0?t=15m5s)[early
mock](https://youtu.be/z6dg_V22wV0?t=15m5s) of what this may look like at Chrome
Dev Summit and you can see an example below.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/mSAze254uL1tSkT35sgK.gif", alt="Web starter kit's material design styleguide mock.", width="800", height="533" %}
</figure>

## Iterate

Once you've started to put your new knowledge into practice, you'll want to use
DevTools to debug, improve and maintain your work.

There are some huge new features landing in DevTools and Matt takes a look at
the following new features.

### Device Mode

Device mode is a new section in DevTools which allows you to quickly see how
your site works across different mobile devices, while viewing the media queries
in your CSS.


<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/DYbtGa8YVtnLbewzjRKQ.gif", alt="Screenshot of Device Mode feature in Chrome DevTools.", width="532", height="298" %}
</figure>

One of the great features of Device Mode is the ability to throttle the network
speeds, allowing you simulate the experience of a user on a GPRS, EDGE, 3G, DSL
or Wifi connection.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/SqQCE5Erj7ZMc1duH4rf.png", alt="Screenshot of network throttling in Chrome DevTools.", width="800", height="430" %}
</figure>

### Paint Profiler

If you've ever opened up the timeline tab and hit the record button, you've
probably seen some paint events happen in the waterfall. Normally this would be
a black box with no way for you to know why the browser had done, or what it was
doing.

Paint profiler no gives you more information on what exactly the browser is
doing during that paint.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/AAuzCcFTuGEsb9lFaoON.jpg", alt="Screenshot of the Paint Profiler in Chrome DevTools.", width="800", height="445" %}
</figure>

### Invalidation Tracking

DevTools now gives a reason why a paint or layout occurred whenever it can, this
is useful for anyone learning about the timeline, the browser behaviors and
allows you to optimize your code to prevent performance issues.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/Ud79WroO3CLG4sY4hYUg.png", alt="Screenshot of Invalidation Tracking in Chrome Devtools.", width="800", height="507" %}
</figure>

### Flame Chart View

This is a very different way of viewing the information available in the
timeline. This makes it much easier to see how tasks overlap and what browser
behavior happened as a result of other tasks.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/E6qK3rOP5SSgwZzYJ4yn.png", alt="Screenshot of Flame Chart View in Chrome DevTools.", width="800", height="492" %}
</figure>

### Frame Viewer

While in Flame Chart view, you can select a specific frame and within this,
you'll be able to explore which elements in the page had been promoted to a
composite layer as well as why they've been promoted.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/FVx0Wxa9EgQKfBws32Yh.jpg", alt="Screenshot of Frame Viewer in Chrome DevTools", width="800", height="689" %}
</figure>

## Learn. Build. Iterate

These are some of the efforts from the Chrome team to help developers get up to
speed with web development, so be sure to check out [Web
Fundamentals](https://developers.google.com/web/fundamentals/), [Web Starter
Kit](https://developers.google.com/web/tools/starter-kit/) and the new features in
[Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools).


