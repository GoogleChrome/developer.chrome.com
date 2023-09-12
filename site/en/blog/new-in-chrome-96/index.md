---
title: New in Chrome 96
description: >
  Chrome 96 is rolling out now! There are two new properties in the web app
  manifest. The id property allows you to specify a unique ID for your PWA,
  and the protocol_handlers property allows you to automatically register your
  PWA as a protocol handler upon installation. There's a new origin trial that
  allows you to specify fetch priority for downloading resources. And there's
  plenty more!
layout: 'layouts/blog-post.njk'
date: 2021-11-16
updated: 2022-08-24
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/gyhkrKnrs5TxwcF0Ybke.jpg'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-96
---

{% YouTube id='PPukHsOH_BI' %}

Here's what you need to know:

* The [manifest `id` property](#manifest-id) lets you specify a unique ID for
  your PWA.
* The [`protocol_handlers` property](#pwa-protocol-handlers) allows you to
  automatically register your PWA as a protocol handler upon installation.
* The [priority hints origin trial](#pri-hints) allows you to specify
  fetch priority for downloading resources.
* You can [force the Chrome version to 100](#chrome-100) to test how your code
  will react to a three digit version number.
* Videos from the [Chrome Dev Summit](#cds-videos) are all online.
* And there's plenty [more](#more).

I'm [Pete LePage](https://petelepage.com), finally shooting
**in the studio**, let's dive in and see what's new for developers in Chrome 96.

## Manifest `id` for PWAs {: #manifest-id }

When a user installs a PWA, the browser needs a way to uniquely identify it.
But, until recently, the web app manifest spec didn't specify how to identify
a PWA, leaving browsers to decide, and leading to different implementations.
In some browsers, the `start_url` is used, while in others, the path to the
manifest file is used.

That makes it impossible to change either of those fields without breaking the
install experience. Now, there's a new optional `id` property, that allows
you to explicitly define the identifier used for your PWA.

Adding the `id` property to the manifest removes the dependency on the
`start_url` or the location of the manifest, and makes it possible for those
fields to be updated.

```json/2
{
  ...
  id: "/?homescreen=1",
  start_url: "/?homescreen=1",
  ...
}
```

Support for the `id` property lands in desktop Chromium-based browsers
starting in Chrome 96. Support for mobile, which currently uses the manifest
url as the unique ID, should land in the first half of 2022.

{% Img class="float-right", linkTo="true", src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/XY3FVUeeCjhB9K71niJE.png", alt="DevTools showing computed app ID", width="800", height="533" %}

If you already have a PWA in production and want to add an `id` to your
manifest, you'll need to use the ID that was assigned by the browser. You can
find the `id` in the _Manifest_ pane of the _Application_ panel in Dev Tools.

<p style="clear:both;"></p>

For a brand new PWA, you can set the `id` to any string value you like, but
remember, you won't be able to change it in the future, so choose wisely.

```json/2
{
  ...
  id: "SquooshApp",
  start_url: "/?homescreen=1",
  ...
}
```

Check out [Uniquely identifying PWAs with the web app manifest id property][manifest-id]
for more info.

## URL protocol handlers for PWAs {: #pwa-protocol-handlers }

Web apps can use [`navigator.registerProtocolHandler()`][mdn-regph] to
register as a protocol handler. For example, Gmail can register the `mailto`
protocol. Then when a user clicks on a link with the `mailto:` prefix, Gmail
will open, making it easy for the user to send an email.

Starting in Chrome 96, a PWA can register as a protocol handler as part of its
installation. To do that for your PWA, add a `protocol_handlers` property to
your web app manifest, specify the `protocol` you want to handle, and the
`url` that should be opened when clicked.

```json
  ...
  "protocol_handlers": [
    {
      "protocol": "web+tea",
      "url": "/tea?type=%s"
    },
    {
      "protocol": "web+coffee",
      "url": "/coffee?type=%s"
    }
  ]
}
```

There are some restrictions here, and you can't just register any protocol, so
check out [URL protocol handler registration for PWAs][wd-phreg] for complete
details, and how you can use the `web+` syntax to create your own protocols!

## Priority hints (origin trial) {: #pri-hints }

When a browser parses a web page and begins to discover and download resources
such as images, scripts, or CSS, it assigns them a fetch priority to try to
optimize the page load. Browsers are pretty good at assigning priorities, but
may not be optimal in all cases.

Priority Hints are an experimental feature, available as an
[origin trial][ph-ot] starting in Chrome 96, and can help optimize the Core
Web Vitals. The `importance` attribute allows you to specify the priority
for resource types such as CSS, fonts, scripts, images, and iframes.

{% Aside 'warning' %}
The `importance` attribute has been renamed `fetchpriority`. Read [Optimizing resource loading with the Fetch Priority API](https://web.dev/fetch-priority/) for the latest on this feature.
{% endAside %}

```html
<!-- We don't want a high priority for this above-the-fold image -->
<img src="/not-important.svg" importance="low">

<!-- Initiate an early fetch for a resource, but de-prioritize it -->
<link rel="preload" href="/script.js" as="script" importance="low">

<script>
  fetch('https://example.com/', {importance: 'high'})
      .then(data => {
        // Trigger a high priority fetch
      });
</script>
```

For example, here's the Google Flights page. That background image is the
largest contentful paint (LCP).

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/zdnbrVyWw7AMcWXVIT2g.png", alt="Screenshot of Google Flights with large background image", width="800", height="533" %}

Let's see it loaded with, and without priority hints. With the priority set
to `high` on the background image, the LCP drops from 2.6 seconds to 1.9
seconds.

{% Video src="video/0g2WvpbGRGdVs0aAPc6ObG7gkud2/MGM6YFi3IHrjRoguRr92.mp4", autoplay="true", muted="true", loop="true" %}

Check out [Optimizing resource loading with the Fetch Priority API][wd-phints] for
all the details, how to register for the origin trial, and some great examples
of how it can help to improve your rendering performance.

## Emulate Chrome 100 in the UA string {: #chrome-100 }

Early next year, we'll hit Chrome 100, a **three** digit version number. Any
code that checks version numbers, or parses the UA string, should be checked
to make sure it handles three digits.

Starting in Chrome 96, there's a new flag `#force-major-version-to-100` that
will change the current version number to 100, so you can make sure
everything works as expected.

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/4drS8JxKXgtzSAxyM6WF.png", alt="Chrome Flags page highlighting new #force-major-version-to-100 option", width="800", height="533" %}

For details see [Force Chrome major version to 100 in the User-Agent string][dcc-cr100].

## Chrome Dev Summit {: #cds-videos }

Chrome Dev Summit is a wrap. All of the videos and content are available
online. Check out the [Chrome Dev Summit site][cds-site], or if you missed
the keynote or livestream, check out the [CDS Playlist][cds-playlist] on the
[Chrome Developers YouTube Channel][cr-dev-yt].

## And more! {: #more }

Of course there's plenty more.

* The Back, forward cache – or `bfcache` – is now available in stable, and
  brings Chrome in line with both Firefox and Safari.

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 96.

* [What's new in Chrome DevTools (96)](/blog/new-in-devtools-96/)
* [Chrome 96 deprecations and removals](/blog/deps-rems-96/)
* [ChromeStatus.com updates for Chrome 96](https://www.chromestatus.com/features#milestone%3D96)
* [What's new in JavaScript in Chrome 96](https://v8.dev/blog/v8-release-96)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/95.0.4638.56..96.0.4664.50)
* [Chrome release calendar](https://chromiumdash.appspot.com/schedule)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5)
to [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I'm Pete LePage, and as soon as Chrome 97 is released, I'll be right here to
tell you what's new in Chrome!

[dcc]: /blog/
[manifest-id]: /blog/pwa-manifest-id/
[mdn-regph]: https://developer.mozilla.org/docs/Web/API/Navigator/registerProtocolHandler
[wd-phreg]: https://web.dev/url-protocol-handler/
[wd-phints]: https://web.dev/fetch-priority/
[ph-ot]: /origintrials/#/view_trial/365917469723852801
[dcc-cr100]: /blog/force-major-version-to-100/
[cds-site]: /devsummit/
[cds-playlist]: https://www.youtube.com/playlist?list=PLNYkxOF6rcIBju4hD9ed1pt6YO20LgLWg
[cr-dev-yt]: https://www.youtube.com/c/GoogleChromeDevelopers
