---
layout: 'layouts/blog-post.njk'
title: Richer PWA installation UI
description: An introduction to the Richer Install UI with guidance on how to implement it.
date: 2021-04-23
updated: 2023-03-30
authors:
  - mustafa
  - ajara
tags:
  - progressive-web-apps
hero: "image/xizoeLGxYNf3VLUHc5BsIoiE1Af1/H5CevJUnOWSewM02r4on.jpg"
alt: "New install surface for progressive web apps"
---

{% Aside 'caution' %}
This is an experimental UI, and could potentially change in the future depending on developer, user,
and partner feedback. We are also planning on expanding the UI to more clearly set expectations
around what installation means, and to provide users with additional signals for making a well
informed decision regarding installing a particular application.
{% endAside %}

## Introduction {: #introduction }

Mobile devices and the introduction of device vendor app stores have changed users' mental model
of how to discover, evaluate and install software. Users are now so familiar with app stores, and
the additional information that is provided through app stores such as context about the app,
social feedback, ratings etc that you see the app store metaphor emerging in Desktop operating
systems including ChromeOS, Mac and Windows.


## Challenge with today's install surfaces {: #today }

Today, if a user wants to install a PWA, an infobar and modal overlay appears with minimal
information. If they continue to install, the process is over too quickly without giving
context to the user. This goes against their expectations of installing apps and can leave them
somewhat confused about what has happened.

<figure>
  {% Img src="image/xizoeLGxYNf3VLUHc5BsIoiE1Af1/VwB1V3K61vQMs1htKJpY.png", alt="An example of PWA install UI.", width="360", height="720" %}
  <figcaption>An example of the PWA install UI.</figcaption>
</figure>

To enable developers to provide installed experiences on par with native experiences
Chrome is introducing a new install surface, Richer Install, that allows developers to add a
description and screenshots to their manifest file and have it appear in a bottomsheet dialog
within Chrome for Android.

<figure>
  {% Img src="image/xizoeLGxYNf3VLUHc5BsIoiE1Af1/RoQRxu3CPkKvAtkxYsAQ.jpeg", alt="Example of bottomsheet UI in Chrome.", width="360", height="720" %}
  <figcaption>Example of bottomsheet UI in Chrome.</figcaption>
</figure>

This gives developers the opportunity to create a more enticing install process
that better aligns to user expectations and that mimics their existing mental model
of installed experiences.


{% Columns %}
{% Column %}
<figure>
  {% Img src="image/xizoeLGxYNf3VLUHc5BsIoiE1Af1/SpStAtUk8Zp5iwi9yqKP.jpg",
alt="Richer Install UI Expanded.", width="342", height="722" %}
  <figcaption>Richer Install UI Expanded.</figcaption>
</figure>
{% endColumn %}
{% Column %}
<figure>
  {% Img src="image/xizoeLGxYNf3VLUHc5BsIoiE1Af1/k7r4yKqrh6iOm2XyZHfw.jpg",
alt="Richer Install UI Collapsed.", width="342", height="722" %}
  <figcaption>Richer Install UI Collapsed.</figcaption>
</figure>
{% endColumn %}
{% endColumns %}

## Backwards compatibility {: #compatibility }

Websites that do not include at least one screenshot to their manifest file will continue to receive
the existing prompts. This may change in the future depending on uptake of the developer community
and users' reaction.

## Previewing the UI {: #previewing }

This UI works from Chrome 94 on Android, and [Chrome 108 on desktop](/blog/richer-install-ui-desktop/).

This feature is enabled on [squoosh.app](https://squoosh.app) and can be previewed there.

## Implementation {: #implementation }

To display the richer install UI dialog developers need to add at least one screenshot for the corresponding form factor in the `screenshots` array. The `description` field is not required but it is recommended. The content dialog is built using the content of the `screenshots` and `description` fields to make the experience more similar to an app store install. This UI helps users identify they are adding an app to their device, and with more space available developers can provide specific context to their users at install time.

For example developers can use the `description` field to highlight the app’s features that incentivize the user to keep it in their devices, and with the `screenshots`  they can present the look and feel of the web app as a standalone, with all the easy access that platform apps have.

For a detailed specification and a guide to add them to your app visit the [Richer Install UI pattern](https://web.dev/patterns/advanced-apps/richer-install-ui).


## Feedback
In the future we will consider adding other data such as categories and app rating, but this will
be based on feedback from developers and users.

In the coming months we would love to see how developers explore this new UI pattern and we
would like to get feedback from you. Reach out to us by filling out [this form](https://forms.gle/7sXrpQwDbLuaZVzN7)
