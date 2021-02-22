---
title: "The Chromium Chronicle #16: Updating Google Apps on Desktop"
description: >
  Ever wondered how Chrome keeps itself up-to-date on your desktop? Or how
  updates are served to Chromebooks, Chromecast, or Android?
layout: 'layouts/blog-post.njk'
date: 2021-01-11
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hgu6uTktp2ipmuODZZhP.jpg'
alt: >
  Chromium Chronicle image
tags:
  - chromium-chronicle
---

**Episode 16:** by Anjali Doneria in Bellevue, WA (January 2021)<br>
[Previous episodes](/tags/chromium-chronicle/)

Ever wondered how Chrome keeps itself up-to-date on your desktop? Or how
updates are served to Chromebooks, Chromecast, or Android? Wait no more! Read
on to understand how Google Update works to serve regular updates to your
devices.

**Google Update is the tool for managing desktop (Mac and Windows) client
install and update processes. It's not just for Chrome!** This tool serves
updates via Auto-Update Server (also known as Omaha Server).

On Windows, Google Update works both as an installer and updater for Google
apps, while on Mac, Keystone is designed to centrally update all Mac software
that Google ships; it is installed by the software it updates during install
or first launch.

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/XPiCoUveSMYp24BbOT50.jpg", alt="Overview of how Omaha works", height="431", width="701" %}

The update process is controlled by rules in Omaha Configuration Language. The
following example shows an update for Chrome extensions update checks:

```protobuf
Update {
  # UpdatedVersion and subsequent Pair MUST be provided for chrome responses
  UpdatedVersion: "1.8.3.0"
  Pair: {Tag: "version" Value: "{updated_version}" }
  Codebase: "http://dl.google.com/foo/{updated_version}/item.crx"
}
```

Once you are done creating/changing your config, it can be deployed on Omaha
Server. Alternatively, you can use Release Manager to automatically upload
binaries to dl.google.com, generate and deploy the Omaha config. And voila,
your desktop app is now ready to serve updates through Google Update!
