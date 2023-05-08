---
layout: 'layouts/blog-post.njk'
title: Media playback notifications for Chrome on Android
description: >
  When audio or video is playing on a web page, a notification showing the page title and a play/pause button is displayed in the notification tray and on the lock screen. The notification can be used to pause/resume play or return to the page playing the media.
authors:
  - samdutton
date: 2015-07-20
updated: 2017-07-09
---

Chrome 45 Beta introduces a handy new feature for controlling audio and video playback.

When an audio or video element is playing on a web page, a notification showing the page title and a play/pause button is displayed in the notification tray and on the lock screen. The notification can be used to pause or resume play, and to quickly return to the page that is playing the media.

Great for controlling music apps and for many other audio and video use cases.

{% Columns %}

{% Column %}
<figure>
    {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/5yHFzeTUjg2Xx8aex4Wd.gif", alt="Notification displayed over a web page.", width="548", height="972" %}
    <figcaption>Notification displayed over a web page</figcaption>
  </figure>
{% endColumn %}

{% Column %}
 <figure>
    {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/30jEssgtg13LIdrA6JBI.gif", alt="Notification displayed over the Android lock screen", width="548", height="972" %}
    <figcaption>Notification displayed over the Android lock screen</figcaption>
  </figure>
{% endColumn %}

{% endColumns %}



The screencast below shows the process of displaying a notification and controlling video playback on a web page:

<figure>
{% Video src="video/T4FyVKpzu4WKF1kBNvXepbi08t52/0WVAlWuMvZcbijsaGXJE.mp4" %}
</figure>

Note that:

* Notifications are only shown for media over five seconds in length.
* There is no notification for audio from the Web Audio API unless it is played back via an audio element.

With the [Media Session API](/blog/media-session), you can
customize media notifications by providing metadata for the media your web app
is playing. This API also allows you to handle media related events such as
seeking or track changing which may come from notifications or media keys.

