---
title: New in Chrome 89
description: >
  Chrome 89 is rolling out now! WebHID, WebNFC, and Web Serial have graduated
  from their origin trials and are now available in stable. We're closing a
  loophole a few developers used to skirt the PWA installability checks.
  Web Share, and Web Share Target arrive on the desktop. And there's plenty
  more!
layout: 'layouts/blog-post.njk'
date: 2021-03-02
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/st3dNRCY5FpDmmZXJ8ZG.jpg'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-89
---

Chrome 89 is starting to roll out to stable now.

{% YouTube id='O-gv6zLZHKw' %}

Here's what you need to know:

* [WebHID, WebNFC, and Web Serial](#hardware) have graduated from their
  origin trials and are now available in stable.
* We're closing a loophole a few developers used to skirt the
  [PWA installability checks](#installability).
* [Web Share, and Web Share Target](#webshare) arrive on the desktop.
* And, there's [plenty more](#more).

I'm [Pete LePage](https://twitter.com/petele), working, and shooting
from home, let's dive in and see what's new for developers in Chrome 89!

## WebHID, WebNFC, and Web Serial {: #hardware }

I'm really excited about WebHID, WebNFC, and Web Serial. They open up new
scenarios for users that were never possible before, interacting with real
world hardware.

They allow makers to connect to fun, quirky hardware, video conferencing apps
to use the dedicated telephony buttons on specialized speakers. Or any number
of other use cases.

{% Video className="float-right", autoplay="true", muted="true", loop="true", src="video/0g2WvpbGRGdVs0aAPc6ObG7gkud2/g8VCbIMljnxuemDFxl99.mp4" %}

Using Web Serial, and [about 60 lines of code][pico-code],
[@AndreBan][andre-tweet] created a [page][andre-page] that can interact with
the MicroPython REPL on a [Raspberry Pi Pico][rpi-pico]. Web Serial is also
used by Espruino in their [web based IDE][espruino-ide].

At CDS 2019, Francois wrote a fun, memory-style game using Web NFC.
You had to tap the phone to the right card, in the right order.

<div style="clear:both;"></div>

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/VAuLti7I9ZQCwLUEWF5Y.png", className="float-right", alt="StreamDeck with Daft Punk Drum Pad", width="800", height="536" %}

And my favorite, [@bramus][bramus-tweet] used WebHID to connect to a
StreamDeck, building a [Daft Punk drum pad][bramus-demo]. If you don't have
a StreamDeck, check out his [demo video][bramus-demo-video] on YouTube, and
check out the [code on GitHub][bramus-code].

Whether it's your site that interacts with your hardware, or your hardware
that can interact with lots of sites, users win because they don't need to
install special drivers, or software.

You can learn more about some of the devices you can connect to at
[web.dev/devices](https://web.dev/devices/), or check out the getting started
guides for [WebHID](https://web.dev/hid/), [WebNFC](https://web.dev/nfc/),
and [Web Serial](https://web.dev/serial/).

## PWA installability criteria changes {: #installability }

Offline support has been a key part of the Progressive Web App criteria for
installability since the beginning. As with other installed app, users
expect it to work reliably. It should be fast, and, they should never see
the offline dino!

Later this year, we plan to close a loophole that allowed a few sites to
pass the installability criteria, without an offline experience. **If your
PWA already has an offline experience, you're all set. There's no
action required, but, if you don't, it's time to add one!**

Starting in Chrome 89, if your PWA doesn't provide a valid response when
offline, you'll see a warning in DevTools under the Issues tab, and Lighthouse
will indicate there's an issue. And, enforcement will start in Chrome 93,
later this year.

<figure>
  {% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/qQHA9CJQrYX6w9FY9P6T.png", alt="DevTools showing warning message in Console.", width="800", height="100" %}
  <figcaption>
    Warning message in the Chrome DevTools Console.
  </figcaption>
</figure>

<figure>
  {% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/On0AEdm2u9EZUuI3NIVv.png", alt="DevTools showing warning message in Application tab.", width="800", height="170" %}
  <figcaption>
    Warning message in Application tab &gt; Manifest &gt; Installability.
  </figcaption>
</figure>

You can decide what kind of offline experience you want to provide. Ideally,
you should provide as much of your experience as possible. But, at a minimum,
it can be as simple as an [offline fallback page][offline-fallback-page].

You can find more details about the change, and why we're making it in
[Improving Progressive Web App offline support detection](/blog/improved-pwa-offline-detection/).

If you're not sure where to get started, check out [Workbox][workbox]. It has
a set of libraries that can power a production-ready service worker for your
PWA. Or, for a simple offline fallback page, the article
[Create an offline fallback page][offline-fallback-page] has all the code you
need, and you can copy and paste directly in to your site.

## Web Share and Web Share Target for Desktop {: #webshare }

{% Video className="float-right", autoplay="true", muted="true", loop="true", src=["video/0g2WvpbGRGdVs0aAPc6ObG7gkud2/0vmJ4uVRmhkufMBsNrEO.webm","video/0g2WvpbGRGdVs0aAPc6ObG7gkud2/8rZz40MCN1qTifH2FHqG.mp4"] %}

If your site allows users to create, edit, or interact with files, you should
be using the Web Share and Web Share Target APIs. These APIs have been
available on mobile for some time but are now supported on Chrome OS and
Windows.

Web Share makes it possible for users to send files or data to other
installed apps on their device, for example, sharing a photo from Google
Photos to Twitter.

<div style="clear:both;"></div>

```js
async function share(title, text, url) {
  try {
    await navigator.share({title, text, url});
    return true;
  } catch (ex) {
    console.error('Share failed', ex);
    return false;
  }
}
```

To register as a target so other apps can share files or data with you,
you'll want to use the Web Share Target API.

```json
"share_target": {
  "action": "/?share-target",
  "method": "POST",
  "enctype": "multipart/form-data",
  "params": {
    "files": [
      {
        "name": "file",
        "accept": ["image/*"],
      },
    ],
  },
},
```

Check
[Integrate with the OS sharing UI with the Web Share API](https://web.dev/web-share/)
and
[Receiving shared data with the Web Share Target API](https://web.dev/web-share-target/)
for getting started guides.

## And more {: #more }

And of course there's plenty more.

Chrome now allows top level `await` within JavaScript modules.

{% Img className="float-right",  src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/Yqyikwd9xFsj6jqnhYar.png", alt="New omnibox install icon for PWAs", width="380", height="180" %}

To reduce confusion for users, we've updated the icon shown in the omnibox for
installable PWAs.

<br style="clear:both;">

And, if you've used a Trusted Web Activity to make your PWA available in the
Play Store for Chrome OS, you can sign up for the
[Digital Goods API origin trial](/blog/new-in-chrome-88/#play-billing).

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 89.

* [What's new in Chrome DevTools (89)](/blog/new-in-devtools-89)
* [Chrome 89 deprecations & removals](/blog/deps-rems-89/)
* [ChromeStatus.com updates for Chrome 88](https://www.chromestatus.com/features#milestone%3D89)
* [What's new in JavaScript in Chrome 88](https://v8.dev/blog/v8-release-89)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/88.0.4324.98..89.0.4389.75)

## Subscribe

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I'm Pete LePage, and as soon as Chrome 90 is released, I'll be right here to
tell you what's new in Chrome!

## Credits

The photo of the Raspberry Pis and Arduino are by by
[Harrison Broadbent on Unsplash](https://unsplash.com/photos/1mu9gF8OhNk)

[pico-code]: https://glitch.com/edit/#!/viridian-receptive-rugby?path=index.html%3A91%3A3
[andre-tweet]: https://twitter.com/andreban/status/1355212228618813440
[andre-page]: https://viridian-receptive-rugby.glitch.me/
[espruino-ide]: https://www.espruino.com/ide/
[rpi-pico]: https://www.raspberrypi.org/products/raspberry-pi-pico/
[bramus-tweet]: https://twitter.com/bramus/status/1360005151394832388
[bramus-code]: https://github.com/bramus/webhid-elgato-stream-deck-daft-punk-soundboard
[bramus-demo]: https://webhid-elgato-stream-deck-daft-punk-soundboard.netlify.app/
[bramus-demo-video]: https://www.youtube.com/watch?v=BcRyAlT5xtg
[workbox]: https://developers.google.com/web/tools/workbox
[offline-fallback-page]: https://web.dev/offline-fallback-page/
