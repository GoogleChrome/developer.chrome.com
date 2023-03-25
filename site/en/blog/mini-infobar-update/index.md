---
layout: 'layouts/blog-post.njk'
title: In Chrome 76 you can hide the Add to Home screen mini-infobar
description: >
  Adding more control to the mini-infobar for PWAs in Chrome 76.
authors:
  - pjmclachlan
date: 2019-05-20
updated: 2019-07-25
---

{% Aside %}
  **TL;DR:** We're giving you more control over the PWA Add to Home Screen
  mini-infobar. Starting in Chrome 76 (July 2019), you can prevent the
  mini-infobar from appearing by calling `preventDefault()` on the
  `beforeinstallprompt` event.
{% endAside %}

## Background on Progressive Web Apps and the mini-infobar

[Progressive Web Apps (PWA)](https://web.dev/progressive-web-apps/) are a pattern for
creating app-like, instant loading, reliable and installable websites.

When your PWA passes the
[installability checklist](https://developers.google.com//web/fundamentals/app-install-banners/#criteria) on
Android, a Chrome system dialog called the mini-infobar will appear at the
bottom of the browser window.

Today the Add to Home screen mini-infobar is shown at the same time as the
[`beforeinstallprompt`](https://web.dev/customize-install/#beforeinstallprompt)
event.

## Changes in Chrome 76

{% Aside %}
Chrome 76 went to stable in July 2019.
{% endAside %}

We’ve been listening to our community and what we heard was that developers
want more control over when to ask users to install a PWA.  We heard you!

**Starting in Chrome 76, you can prevent the mini-infobar by calling
`preventDefault()` on the `beforeinstallprompt` event.**

The `beforeinstallprompt` event can help you promote the installation of your
progressive web app, making it easy for users to add it to their home screen.
Our community has shared that users who install a PWA to the home screen are
highly engaged, with more repeat visits, time spent in the app and when
applicable, higher conversion rates.

<figure>
    {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/I1TKoeZqVha9xPyWtCua.png", alt="Example of Pinterest using an install banner to promote the installability
    of their PWA.", width="800", height="252" %}  <figcaption>
    Example of Pinterest using an install banner to promote the installability
    of their PWA. See <a href="/web/fundamentals/app-install-banners/">Add to
    Home Screen</a> for complete details on the add to home screen flow,
    including code samples, and other best practices.
  </figcaption>
</figure>

To promote your web app without the mini-infobar, listen for the
`beforeinstallprompt` event, then, save the event. Next, update your user
interface to indicate your PWA can be installed, for example by adding an
install button, showing an install banner, using in-feed promotions, or a
menu option. When the user clicks on the install element, call `prompt()` on
the saved `beforeinstallprompt` event to show the add to home screen modal
dialog.


## Future of the Add to Home screen mini-infobar

The use of the add to home screen infobar is still a temporary measure.
We’re experimenting with new UI patterns that will continue to give Progressive
Web App users the ability to install, and do this in a way that reduces
clutter in the browsing experience.
