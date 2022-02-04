---
layout: 'layouts/blog-post.njk'
title: 'Permissions request chip'
description: >
  Permission prompts demand an answer immediately and are frequently ignored. Chrome 98 adds
  dedicated space in the location bar for permissions, with the goal of putting all
  permissions-related UI (prompts, indicators, and controls) in the same place and thereby making
  the prompts less demanding to reduce the perceived insistence on a decision.
authors:
  - thomassteiner
date: 2022-02-01
updated: 2022-02-03
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/K7jiiutmZA0DvzGU9irA.jpg
alt: Computer user in front of a desktop computer.
tags:
  - chrome-98
---

## The permissions UX until now

When a user visits a site that requests a permission, a bubble pops up to prompt the user to make a
decision. For example, below you can see the geolocation permission prompt as implemented in Chrome
up to version 96. (You can try this and other permissions on our demo site
[permission.site](https://permission.site/).)

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/dVZNzWjq3wBsRY4E7ShO.png", alt="Chrome geolocation permission prompt", width="690", height="432" %}

### Most permission prompts are ignored or dismissed

Chrome's telemetry data proves that a lot of permission prompts are ignored. You can explore the
[notification permission data](https://developers.google.com/web/updates/2020/02/notification-permission-data-in-crux)
in the Chrome UX report yourself. For now, consider the table below that shows
how Windows users reacted to the notification prompt on sites in an accumulated way, while noting
that geolocation prompts saw a similar dismiss or ignore behavior.

<div class="table-wrapper scrollbar">
<table>
<thead>
<tr>
<th>Action</th>
<th>Percent of notification prompts</th>
</tr>
</thead>
<tbody>
<tr>
<td>Allow</td>
<td>6.69%</td>
</tr>
<tr>
<td>Block</td>
<td>9.20%</td>
</tr>
<tr>
<td>Dismiss</td>
<td>35.76%</td>
</tr>
<tr>
<td>Ignore</td>
<td>47.19%</td>
</tr>
</tbody>
</table>
</div>

Given an ignore/dismiss rate of approximately 85%, and especially given how much the prompt stands out and
insists on users making a decision immediately, there is a conflict between the level of urgency
assumed by the browser versus the user's preference for waiting to make a decision. This creates the
perception that it's "annoying" for a site to ask for a permission because it will be lost in the potential extra
things users need to react to like cookie consent banners, newsletter signups, etc.

## New design

From Chrome 98 on, we therefore introduced an animated chip UI which appears next to the lock
whenever a permission is requested. This consists of an icon and label describing the permission being
requested. Our aim was to improve the experience of web browsing while avoiding permission requests
that are generally unnecessary for the vast majority of users and frequently ignored or dismissed.

{% Video src="video/8WbTDNrhLsU0El80frMBGE4eMCD3/4rH9koYThnPvEgLu4mF6.mp4", autoplay=true, muted=true, playsinline=true, loop=true%}

The existing prompt bubble will be shown when the request chip is clicked (if not already shown) and
the request UI is automatically augmented with the request bubble based on the heuristics listed
below:

- The permission was triggered through a user gesture when interacting with the site itself rather
  than automatically triggered by the site.
- The permission is deemed essential and generally non-spammy. Currently this includes camera,
  microphone, and camera paired with microphone.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/LoPc4O4atyPkXdSKh7gh.png", alt="Flow diagram going from padlock to the geolocation prompt, which, if dismissed, results in the 'geolocation blocked' icon, which, after a four second delay, is finally replaced with the padlock again.", width="800", height="303" %}

### Forcing the new design

Since this is a staged rollout, you can force the new design by toggling the following flags:

- `chrome://flags/#permission-chip`
- `chrome://flags/#permission-chip-gesture`
- `chrome://flags/#permission-chip-request-type`

### Flow of the new design

#### Without user gesture

For non-essential permissions not triggered by a gesture, the prompt no longer intrudes on the site
contents, and does not insist on an immediate decision. The user can ignore the request chip until
they have enough information to make a decision.

#### Without interaction

With no interaction, and after a short delay, the request chip will automatically collapse to just a
blocked icon (to indicate the permission being temporarily blocked), before being dismissed
entirely. The aim is to get out of the way of users who choose not to make a decision letting them do so
without any interaction.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/73sL3v6PG3VSFjtrHZr6.png", alt="Flow diagram going from padlock to the unobtrusive geolocation chip, which, after a twelve second delay results in the 'geolocation blocked' icon, which, after a four second delay, is finally replaced with the padlock again.", width="800", height="140" %}

### Expected short-term impact

In the short term, and until users get used to the new UI, it is likely that site owners will observe
lower grant rates for sites, especially for those that auto-request permissions without priming or
demanding a user gesture (which is considered a [bad practice](https://web.dev/notification-on-start/) anyway). This
acknowledged downside is vastly outweighed by the less interruptive experience.

### Best practices

It is up to the site to ensure it provides the necessary context and only requests permissions at
the appropriate and expected moment. Permissions that have been temporarily blocked—through a user
ignoring the request or dismissing the prompt—can request the permission again within the same
session. Only do this if the permission is essential for the site or feature to work, otherwise it
runs the risk of annoying users and getting auto blocked. In those cases we show the
[quiet messaging](https://blog.chromium.org/2020/01/introducing-quieter-permission-ui-for.html) that
was introduced in Chrome 80. For more general guidance, see
[Permission UX](https://developers.google.com/web/fundamentals/push-notifications/permission-ux).

## Outlook and conclusions

There are plans for further UI and UX improvements. The Chrome team is already working on
them and investigating potentially more aggressive auto-blocking of permissions
based on prior behavior. You will learn about the news here once these plans mature.

Concluding, the new UI reduces the perceived insistence on a decision and improves the browsing
experience. Since most permission prompts are blocked or ignored, the met objective was to improve the
general experience of browsing, while not breaking user flows when showing a permission prompt,
especially in situations where permissions are required to complete a use case.

## Acknowledgements

Hero image by [Sigmund](https://unsplash.com/@sigmund) on
[Unsplash](https://unsplash.com/photos/UmaojK7erQo). This article was reviewed by
[Joe Medley](https://github.com/jpmedley).
