---
title: New in Chrome 81
description: >
  Chrome 81 is rolling out now! App icon badging graduates from it's origin
  trial. Hit testing for augmented reality is now available in the browser.
  Web NFC starts its origin trial. And I've got an update on the adjusted
  Chrome release schedule. Let's dive in and see what's new for developers
  in Chrome 81!
layout: 'layouts/blog-post.njk'
date: 2020-04-07
updated: 2020-04-11
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/W9PRB9OCSMvxfDZRAOiK.jpg'
alt: 'Cropped Chrome logo on the left, version number on the right.'
tags:
  - new-in-chrome
  - chrome-81
---

Chrome 81 is starting to roll out to stable now.

{% YouTube id='ihjL0mcnlQs' %}

Here's what you need to know:

* I've got an [update](#adjusted-schedule) on the adjusted Chrome release
  schedule.
* [App Icon Badging](#badging) graduates from its origin trial.
* [Hit testing](#hit-testing) for augmented reality is now available in the
  browser.
* [Web NFC](#web-nfc) starts its origin trial.
* And [more](#more).

I'm [Pete LePage](https://twitter.com/petele), working and shooting from home,
let's dive in and see what's new for developers in Chrome 81!

{% Aside %}
We've created a [set of resources](https://web.dev/covid19) to help you
ensure your site remains available and accessible to all during the COVID-19
situation.
{% endAside %}

## Updated Chrome release schedule {: #adjusted-schedule }

We recently announced an [adjusted release schedule][sched-adjust] for Chrome.
We did this because it is important to ensure Chrome continues to be stable,
secure, and work reliably for anyone who depends on it.

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/GHbwYSfm0D7biJ0GZhOL.jpg", alt="Screenshot of Chromium Calendar", class="float-right", height="391", width="800" %} %}

In short, Chrome 81 is rolling out now. We're going to skip Chrome 82, and move
directly to Chrome 83, which will be released 3 weeks earlier than planned,
in approximately mid-May.

We'll keep everyone informed of any changes to our schedule on our
[release blog][cr-release-blog], and will share additional details on the
schedule in the [Chromium Developers group][cr-dev]. You can also check our
[schedule page][cr-schedule] for specific dates for each milestone at any time.

[sched-adjust]: https://chromereleases.googleblog.com/2020/03/upcoming-chrome-and-chrome-os-releases.html
[cr-release-blog]: https://chromereleases.googleblog.com/
[cr-dev]: https://groups.google.com/a/chromium.org/g/chromium-dev
[cr-schedule]: https://chromiumdash.appspot.com/schedule

## WebXR hit testing {: #hit-testing }

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/ZQU1XkZB415LOjJZ11L4.jpg", alt="", class="float-right", height="1422", width="800" %} %}

There are a handful of native apps that let you see what a new couch or chair
might look like in your home. With an update to the Web XR Device API, it's
now possible to do that on the web too.

With the Web XR Hit Test API, you can place virtual objects into your camera's
view of the real world.

Check out the Immersive Web Working Group's [Hit Testing sample][ht-sample]
([code][ht-sample-code]) where you can place virtual sunflowers on surfaces in
the real world, or [Positioning virtual objects in real-world views][hit-test-article]
for more details.

<br style="clear:both;">

## App icon badging {: #badging }

App icon badging is graduating from Origin Trial to stable, which means you
can now use it on any site, without a token.

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/OYVASlDc4gtR75yunTHh.jpg", alt="", class="float-right", height="388", width="658" %}

Badging of app icons makes it easy to subtly notify the user that there is
some new activity that might require their attention, or to indicate a small
amount of information, such as an unread count.

It's more user-friendly than notification. And because it doesn't interrupt
the user, it can be updated with a much higher frequency. It's perfect for
chat or email apps to indicate the number of unread messages. Social media
apps could use it to indicate the number of times you've been tagged in other
peoples posts.  Or for games, to indicate to a user that it's their turn.

Check out my [Badging API][wd-badging] article on web.dev for full details.

## New origin trials {: #ot-new }

### Web NFC {: #web-nfc }

[Web NFC is starting its origin trial][nfc-ot] in Chrome 81. Web NFC allows a
web app to read and write to NFC tags. This opens new use cases, including
providing more details about museum exhibits, inventory management, reading
information from a conference badge, and more.

It's super easy to use. To read a tag, create a new instance of an `NDEFReader`
object, and start the scan.

```js
const reader = new NDEFReader();

async function startScan() {
  await reader.scan();
  reader.onreading = (e) => {
    console.log(e.message);
  };
}
```

Then, when an NFC tag is scanned, the reader will fire a `reading` event that you
can use to loop through the incoming messages.

Francois has a great [post][wd-nfc] that covers all the details and it
includes a number of common patterns that you might want to use.

### Other origin trials

Check </origintrials/#/trials/active> for
a complete list of features in origin trial.

## And more {: #more }

* The media session API now supports [tracking position state][ms-tracking] so
  you can see where you are in a track and easily skip back or forwards.
* The INTL API now provides a [`DisplayNames`][intl-display-names] method that
  gets the localized names of languages, currency, and other commonly used
  names, no more having to include that yourself.
* We had planned to remove support for TLS 1.0 and TLS 1.1, but have
  **postponed** that until at least Chrome 83.

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 81.

* [What's new in Chrome DevTools (81)](/blog/new-in-devtools-81)
* [Chrome 81 deprecations & removals](https://developers.google.com/web/updates/2020/02/chrome-81-deps-rems)
* [ChromeStatus.com updates for Chrome 81](https://www.chromestatus.com/features#milestone%3D81)
* [What's new in JavaScript in Chrome 81](https://v8.dev/blog/v8-release-81)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/80.0.3987.87..81.0.4044.99)

## Subscribe

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I'm Pete LePage, and as soon as Chrome 83 is released, I'll be right
here to tell you -- what's new in Chrome!

## A personal note from Pete

Over the last week, two songs have brought me joy, and I wanted to share them
with you, in hopes they bring you some joy.

* [You Will Be Found](https://www.youtube.com/watch?v=_10msPMEick&t=113)
  performed by Ben Platt & the Cast of Dear Even Hansen.
* [I Just Wanna Dance](https://www.youtube.com/watch?v=PSeJ6wfqhsw)
  from Jerry Springer: The Musical. (Contains use of the 'F' word.)

A huge thanks to my production team, Sean Meehan, Lee Carruthers, Loren Borja,
Taylor Reifurth, and the whole Google Developers Studio team. They got me the
equipment, helped me get it all setup in my tiny NYC apartment, and then
busted their butts to get this video out in the tight turn-around time we had.
Working with them is a pleasure. **Thank you, you all rock!**

[nfc-ot]: /origintrials/#/view_trial/236438980436951041
[ms-tracking]: https://googlechrome.github.io/samples/media-session/video.html
[intl-display-names]: https://github.com/tc39/proposal-intl-displaynames
[wd-nfc]: https://web.dev/nfc/
[wd-badging]: https://web.dev/badging-api/
[ms-form]: https://blogs.windows.com/msedgedev/2019/10/15/form-controls-microsoft-edge-chromium/
[hit-test-article]: https://web.dev/ar-hit-test/
[ht-sample]: https://immersive-web.github.io/webxr-samples/hit-test.html
[ht-sample-code]: https://github.com/immersive-web/webxr-samples/blob/master/hit-test.html
[amazon-nfc-stickers]: https://www.amazon.com/s?k=nfc+stickers
