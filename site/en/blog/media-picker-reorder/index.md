---
layout: 'layouts/blog-post.njk'
title: 'Privacy win! Users now share their screens more wisely'
description: >
 Using the nudge theory, we got users to stop shooting themselves in the foot during video conferencing calls.
authors:
  - beaufortfrancois
  - eladalon
date: 2023-03-02
hero: image/vvhSqZboQoZZN9wBvoXq72wzGAf1/XSMbLh499JYrwCB7xAcO.jpg
alt: Golfer flicking ball.
tags:
  - chrome-108
---

The web platform allows users to share their screen using the [Screen Capture API]. Chrome’s implementation of [`getDisplayMedia()`] includes a media picker through which users may choose to share any tab, window, or screen. Starting with Chrome 107, we experimented with a small modification of that dialog, putting tabs as the first option, to encourage users to share tabs and away from sharing their entire screen. This relies on the well-understood concept that the way a question is phrased influences the distribution of answers. This is known colloquially as Nudge Theory, and known to children as “pretty please.” After some initial bumps, the experiment proved to be a great success, and we have now shipped this new experience to all users.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/ms7aIpxAOoC0ytp3iICU.png", alt="Screenshots of the old and new media picker prompts.", width="800", height="439" %}
  <figcaption>
    Chrome’s media picker (the new version on top).
  </figcaption>
</figure>

As [previously discussed], sharing tabs is usually the superior option:
- Better for privacy, as users are far less likely to expose private information from other apps, notifications, desktop wallpaper, or settings.
- Better use of screen real-estate on the receiving side.
- Better utilization of network resources due to sharing less pixels.

We therefore experimented with presenting tabs as the first option.

The initial roll-out of the experiment uncovered an unfortunate side-effect—by placing tabs first, the rate at which the users were choosing the current tab increased. For many applications, arguably even most, this is not desirable. For instance, in video-conferencing applications, this produces the "hall of mirrors" effect, confusing remote participants and derailing calls. We therefore paused the experiment.

Luckily, from Chrome 107 the [`selfBrowserSurface`] option is available. This option enables the app to dictate whether Chrome should include or exclude the current tab from the list of tabs offered to the user. As this is a new control, the vast majority of web apps do not provide an explicit value here. In the renewed experiment, starting with Chrome 108, we switched the default value from `"include"` to `"exclude"`. This eliminated the undesirable effect, while still allowing specialized apps to invoke the previous behavior.

The change of default value as part of the experiment introduced its own benefits—self-capture dropped from around 0.8% of capture-sessions down to nearly 0%, eliminating nearly all cases of such self-sabotage, which previously affected nearly 1 out of every 100 users.

The experiment resumed in Chrome 108. Once it reached 50% of users, we observed the following results:
- Tab sharing increased from 16% to 30%.
- Window sharing increased from 14% to 20%.
- Screen sharing decreased from 55% to 36%.
- Self capture (tab based) decreased from 0.8% to 0%.
- Cancellations increased by a varying amount; more on that below.
- Activations (number of calls to `getDisplayMedia()`) increased by a varying amount.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/epS3f6YgxOnpUNETtFKB.png", alt="Observed changes in users' interaction with the dialog.", width="800", height="483" %}
  <figcaption>
    Observed changes in users' interaction with the dialog.
  </figcaption>
</figure>

We were extremely pleased with the changes to the frequency with which users share tabs, windows, and screens. But the changes in cancellations and activations was a potential cause for concern.

By running the experiment for longer, we noticed that the number of cancellations in the experiment group regressed towards that of the control group. This correlated with our theory that users were bailing out as soon as they saw an unfamiliar dialog, then got used to it over time.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/pyCCIPryRLD5uhFo8twK.png", alt="The increase in cancellations in the test group petered out over time.", width="800", height="327" %}
  <figcaption>
    The increase in cancellations in the test group petered out over time.
  </figcaption>
</figure>

The increase in activations could only be partially explained by the above theory, because the numbers don’t add up, and because the number of activations remained higher in the test group. The likely explanation for the increase in activations is that when users shared the entire screen, they never needed to stop and restart capture in order to start sharing something else. Now that they were sharing tabs and windows more often, the necessity to restart the capture arose more often. We hope to make further improvements here in the future by allowing more seamless transitions between capturing different surfaces.

[screen capture api]: https://developer.mozilla.org/docs/Web/API/Screen_Capture_API
[`getdisplaymedia()`]: https://developer.mozilla.org/docs/web/api/mediadevices/getdisplaymedia
[previously discussed]: /blog/avoiding-oversharing-when-screen-sharing/#reordering
[`selfbrowsersurface`]: /docs/web-platform/screen-sharing-controls/#selfBrowserSurface
