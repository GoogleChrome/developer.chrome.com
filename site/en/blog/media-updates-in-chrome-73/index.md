---
title: Media updates in Chrome 73
description: >
  Hardware media keys support, HDCP policy check, Picture-in-Picture origin
  trials, and more.
layout: 'layouts/blog-post.njk'
date: 2019-02-06
updated: 2019-02-08
authors:
  - beaufortfrancois
tags:
  - media
  - chrome-73
---

In this article, I'll discuss Chrome 73 new media features which include:

- [Hardware media keys](#media-keys) are now supported to control media playback
  on desktop.
- Web developers can [query whether a certain HDCP policy can be
  enforced](#hdcp).
- [Auto Picture-in-Picture](#auto-pip) in desktop PWAs and ["Skip Ad" in
  Picture-in-Picture](#skipad) are coming to origin trials.
- Desktop PWAs are granted [autoplay with sound](#autoplay-pwa).

## Hardware Media Keys support {: #media-keys}

Many keyboards nowadays have keys to control basic media playback functions such
as play/pause, previous and next track. Headsets have them too. Until now,
desktop users couldn't use these media keys to control audio and video playback
in Chrome. This changes today!

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/sHvqy6DFMuLJjkCRUrHF.jpeg", alt="Keyboard media keys", width="800", height="293" %}
  <figcaption>
    Keyboard media keys
  </figcaption>
</figure>

If user presses the pause key, the active media element playing in Chrome will
be paused and receive a "paused" media event. If the play key is pressed, the
previously paused media element will be resumed and receive a "play" media
event. It works whether Chrome is in foreground or background.

In ChromeOS, Android apps using [audio focus] will now tell Chrome to pause and
resume audio to create a seamless media experience between websites on Chrome,
Chrome Apps and Android Apps. This is currently supported only on ChromeOS
device running Android P.

In short, it's a good practice to always listen to these media events and act
accordingly.

```js
video.addEventListener('pause', function() {
  // Video is now paused.
  // TODO: Let's update UI accordingly.
});

video.addEventListener('play', function() {
  // Video is now playing.
  // TODO: Let's update UI accordingly.
});
```

But wait, there's more! With the [Media Session API] now available on desktop
(it was supported on mobile only before), web developers can handle media
related events such as track changing that are triggered by media keys. The
events `previoustrack` and `nexttrack` are currently supported.

```js
navigator.mediaSession.setActionHandler('previoustrack', function() {
  // User hit "Previous Track" key.
});

navigator.mediaSession.setActionHandler('nexttrack', function() {
  // User hit "Next Track" key.
});
```

Play and pause keys are handled automatically by Chrome. However if the default
behavior doesn't work out for you, you can still set some action handlers for
"play" and "pause" to prevent this.

```js
navigator.mediaSession.setActionHandler('play', function() {
  // User hit "Play" key.
});

navigator.mediaSession.setActionHandler('pause', function() {
  // User hit "Pause" key.
});
```

Hardware Media Keys support is available on ChromeOS, macOS, and Windows. Linux
will come later.

{% Aside %}
Setting some media session metadata such as the title, artist, album name,
and artwork with the Media Session API is available but not hooked up to desktop
notifications yet. It will come in supported platforms later.
{% endAside %}

Check out our existing [developer documentation] and try out the [official Media
Session samples].

[Chromestatus Tracker](https://www.chromestatus.com/feature/5639924124483584) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=497735)

## Encrypted Media: HDCP Policy Check {: #hdcp }

Thanks to the [HDCP Policy Check API], web developers can now query whether a
specific policy, e.g. [HDCP] requirement, can be enforced **before** requesting
Widevine licenses, and loading media.

```js
const status = await video.mediaKeys.getStatusForPolicy({ minHdcpVersion: '2.2' });

if (status == 'usable')
  console.log('HDCP 2.2 can be enforced.');
```

The API is available on all platforms. However, the actual policy checks might
not be available on certain platforms. For example, HDCP policy check promise
will reject with `NotSupportedError` on Android and Android WebView.

Check out our [previous developer documentation] and give a try to the [official
sample] to see all HDCP versions that are supported.

[Intent to Ship](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/w0jNaAhyTV0/3oDkR_ASAQAJ) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5652917147140096) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=709348)

## Origin Trial for Auto Picture-in-Picture for installed PWAs {: #auto-pip }

Some pages may want to automatically enter and leave [Picture-in-Picture] for a
video element; for example, video conferencing web apps would benefit from some
automatic Picture-in-Picture behavior when user switches back and forth between
the web app and other applications or tabs. This is sadly not possible with the
[user gesture requirement]. So here comes Auto Picture-in-Picture!

{% Video
  src="video/vvhSqZboQoZZN9wBvoXq72wzGAf1/QqD84WpfAAfk8UeSryF0.mp4",
  autoplay=true,
  loop=true,
  muted=true,
  playsinline=true
%}

To support these tab and app switching, a new `autopictureinpicture` attribute
is added to the `<video>` element.

```html
<video autopictureinpicture></video>
```

Here's roughly how it works:

- When document becomes hidden, the video element whose `autopictureinpicture`
  attribute was set most recently automatically enters Picture-in-Picture, if
  allowed.
- When document becomes visible, the video element in Picture-in-Picture
  automatically leaves it.

And that's it! Note that the Auto Picture-in-Picture feature applies only to
[Progressive Web Apps] (PWAs) that users have installed on desktop.

Check out the [spec] for more details and try out using the [official PWA
sample].

{% Aside %}
To get feedback from web developers, the Auto Picture-in-Picture
feature is available as an [origin trial] in Chrome 73 for desktop (ChromeOS,
Linux, Mac, and Windows). You will need to [request a token], so that the
feature is automatically enabled for your origin for a limited period of time.
This will eliminate the need to enable the "Web Platform Features" flag.
{% endAside %}

[Intent to Experiment](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/eFZ3h_A3VTY) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5317876315586560) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=917303)

## Origin Trial for Skip Ad in Picture-in-Picture window {: #skipad }

The video advertisement model usually consists of pre-roll ads. Content
providers often provide the ability to skip the ad after a few seconds. Sadly,
as the Picture-in-Picture window is not interactive, users watching a video in
Picture-in-Picture can't do this today.

With the [Media Session API] now available on desktop (it was supported on
mobile only before), a new `skipad` media session action may be used to offer this
option in [Picture-in-Picture].

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/LawyPY28acxZd6t4NQDS.png", alt="Skip Ad button in Picture-in-Picture window", width="668", height="416" %}
  <figcaption>
    "Skip Ad" button in Picture-in-Picture window
  </figcaption>
</figure>

To provide this feature pass a function with `skipad` when calling
`setActionHandler()`. To hide it pass `null`. As you can read below, it is
pretty straightforward.

```js
try {
  navigator.mediaSession.setActionHandler('skipad', null);
  showSkipAdButton();
} catch(error) {
    // The "Skip Ad" media session action is not supported.
}

function showSkipAdButton() {
  // The Picture-in-Picture window will show a "Skip Ad" button.
  navigator.mediaSession.setActionHandler('skipad', onSkipAdButtonClick);
}

function onSkipAdButtonClick() {
  // User clicked "Skip Ad" button, let's hide it now.
  navigator.mediaSession.setActionHandler('skipad', null);

  // TODO: Stop ad and play video.
}
```

{% Aside 'caution' %}
Media session action handlers will persist. I'd suggest always resetting them
when media playback starts and ends to avoid showing an unexpected "Skip Ad"
button.
{% endAside %}

Try out the [official "Skip Ad" sample] and [let us know] how this feature can
be improved.

{% Aside %}
To get feedback from web developers, the Skip Ad in Picture-in-Picture
window feature is available as an [origin trial] in Chrome 73 for desktop
(ChromeOS, Linux, Mac, and Windows). You will need to [request a token], so
that the feature is automatically enabled for your origin for a limited period
of time. This will eliminate the need to enable the "Web Platform Features"
flag.
{% endAside %}

[Intent to Experiment](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/l6sW0G4jzhE) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/4749278882824192) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=910436)

## Autoplay granted for Desktop PWAs {: #autoplay-pwa }

Now that [Progressive Web Apps] (PWAs) are available on all desktop platforms,
we are extending the rule that we had on mobile to desktop: [autoplay] with
sound is now allowed for installed PWAs. Note that it only applies to pages in
the [scope] of the web app manifest.

[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=794874)

<!-- lint disable definition-case -->

[audio focus]: https://developer.android.com/guide/topics/media-apps/audio-focus
[Media Session API]: https://w3c.github.io/mediasession/
[developer documentation]: https://web.dev/media-session
[official Media Session samples]: https://googlechrome.github.io/samples/media-session/
[HDCP Policy Check API]: https://wicg.github.io/hdcp-detection/
[HDCP]: https://en.wikipedia.org/wiki/High-bandwidth_Digital_Content_Protection
[previous developer documentation]: /blog/media-updates-in-chrome-69#hdcp
[official sample]: https://googlechrome.github.io/samples/hdcp-detection/
[Picture-in-Picture]: https://developers.google.com/web/updates/2018/10/watch-video-using-picture-in-picture
[user gesture requirement]: https://developers.google.com/web/updates/2018/10/watch-video-using-picture-in-picture#enter_picture-in-picture
[Progressive Web Apps]: https://web.dev/progressive-web-apps/
[spec]: https://wicg.github.io/picture-in-picture/#auto-pip
[official PWA sample]: https://googlechrome.github.io/samples/auto-picture-in-picture/index.html
[Origin Trial]: https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md
[request a token]: https://developers.chrome.com/origintrials
[official "Skip Ad" sample]: https://googlechrome.github.io/samples/picture-in-picture/skip-ad.html
[let us know]: https://github.com/WICG/picture-in-picture/issues
[autoplay]: /blog/autoplay/
[scope]: https://web.dev/add-manifest/#scope
