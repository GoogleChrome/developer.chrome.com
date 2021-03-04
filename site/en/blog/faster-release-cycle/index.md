---
layout: 'layouts/blog-post.njk'
title: Speeding up Google Chrome's release cycle
description: >
  Later this year, we plan to shorten the release cycle and ship a new version
  of Google Chrome to the stable channel every four weeks, down from the
  current six-week cycle.
date: 2021-03-04
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/XfJpTb2N1cpHQ5HuPA9l.jpg'
alt: Side of road in the evening with light trails from vehicles.
tags:
  - chrome-94
authors:
  - petelepage
---

Later this year, we plan to shorten the release cycle and ship a new version
of Google Chrome to the stable channel every four weeks, down from the current
six-week cycle. There's more detail on the [Chromium Blog][cr-blog-announce]
about the impetus and rationale for this change.

One of my favorite aspects of being a web developer is the ease of deployment.
I can fix a critical bug and deploy it to all of my users quickly. Moving to
a four-week release cycle will give us more agility to get critical security
and bug fixes out to users faster. And for developers, you won't have to
wait as long for updates and bug fixes.

Shifting to a faster release cycle allows us to experiment and iterate on
new features more effectively via origin trials, without having to wait as
long between releases. It doesn't mean we'll be shipping more features, or
shipping new features in less time. And it doesn't change
[the way we ship][way-we-ship] new features. We remain committed to working
with standards bodies, our developer community, and the Chromium ecosystem.

## Timeline

Our current plan is for Chrome 94 to be the first release on the new
four-week schedule, and it will be released on September 21st, 2021 (instead
of October 12th, 2021). Each subsequent release will take place four weeks
later. Thus, Chrome 93 (August 31st, 2021) will be the last release on the
six-week schedule. We've updated our [release calendar][release-cal] so you
can see the updated dates.

As always, this may change based on feedback we receive from our team and
the developer community.

## What channel should I be using?

As a web developer, it's a good idea to have both [stable][cr-stable] and
[beta][cr-beta] installed on your device, and test your site in both. By
using the beta channel, you can find and fix any issues before the majority
of your users see them. With the beta channel you can start using new DevTools
features sooner, and get early access to new web platform features.
[Side-by-side installation of the different channels of Chrome][cr-sxs] is
available on all platforms, including Mac.

Today, it can take upwards of 2 weeks for the majority of users to move to
the latest stable release. We believe that the four-week release cycle will
allow us to more consistently move the majority of users to the latest
stable release within 2 weeks. Of course, it's always a good idea to check
the analytics for your site to understand how fast your users upgrade to
the latest stable. In some scenarios, it may be longer.

## How can I stay up to date?

For web developers, there are several ways to stay informed about the things
you care about.

- [Beta posts][cr-blog-beta] on the Chromium blog: Highlights new web platform
  features that are landing in the latest beta release.
- [New in Chrome][nic]: Highlights new web platform features that landed in
  the latest stable release.
- [New in Chrome DevTools][nicdt]: Highlights new features in Chrome DevTools.

## Supporting developers

We've tried to make sure that the impact of this change is minimal to web
developers, but there are some things that we may have overlooked. We'll
keep this post up-to-date as we progress. If you have questions, or concerns,
reach out to [@ChromiumDev][chromiumdev] on Twitter with the hashtag
`#ChromeFaster`.

We know this is a big change, but we feel strongly that it's something that
will benefit everyone by reducing the time it takes to get important updates,
and will improve the overall quality of Chrome.

Hero photo by [Marc-Olivier Jodoin][hero-name] on [Unsplash][hero-link].

[cr-blog-announce]: https://blog.chromium.org/2021/03/speeding-up-release-cycle.html
[way-we-ship]: https://blog.chromium.org/2019/11/intent-to-explain-demystifying-blink.html
[release-cal]: https://chromiumdash.appspot.com/schedule
[cr-stable]: https://chrome.com/stable
[cr-beta]: https://chrome.com/beta
[cr-sxs]: https://blog.chromium.org/2017/08/run-multiple-versions-of-chrome-side-by.html
[cr-blog-beta]: https://blog.chromium.org/search/label/beta
[nic]: /tags/new-in-chrome/
[nicdt]: https://developers.google.com/web/updates/tags/devtools-whatsnew
[chromiumdev]: https://twitter.com/chromiumdev
[hero-name]: https://unsplash.com/@marcojodoin
[hero-link]: https://unsplash.com/photos/NqOInJ-ttqM
