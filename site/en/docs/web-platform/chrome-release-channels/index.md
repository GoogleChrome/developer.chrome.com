---
layout: 'layouts/doc-post.njk'
title: What are Chrome release channels?
subhead: Learn how Chrome uses the Canary, Dev, Beta, and Stable release channels to test new features, and roll out updates.
description: Learn how Chrome uses the Canary, Dev, Beta, and Stable release channels to test new features, and roll out updates.
date: 2022-12-20
authors:
- samdutton
---
 
{% YouTube
  id='WL1guL5n9PU'
%}
 
 
## Chrome has four channels
 
There are four varieties of Chrome available at any one time, on mobile and desktop platforms:
Canary, Dev, Beta and Stable. These are called _release channels_.
 
Within each channel, Chrome deploys a series of _versions_ which indicate the order
of release and degree of change from previous versions.
 
### Chrome Canary
 
Chrome Canary is released daily.
 
<figure class="float-right">
<img src="https://storage.googleapis.com/web-dev-uploads/image/80mq7dk16vVEg8BBhsVe42n6zn82/8xsH74UIueqhYgz4ZAqD.png"
  alt="Chrome Canary logo." width="100" height="100">
</figure>
 
This channel is like the proverbial canary in the coalmine. This is the most experimental Chrome
channel, including new and experimental features. Chrome Canary helps us try
out changes with real users and developers, to test for glitches before they become a problem.
 
We add changes and new features to the Canary channel with minimal testing. Canary can (and does)
break. Occasionally, a Canary build may even have a bug that makes the browser crash or be completely
unusable on some sites. The good thing about releasing Canary every day is that updates and bug
fixes can be shipped quickly too. By default, Canary reports crashes and usage statistics to
Google (you can deactivate this feature).
 
Canary is very useful for developers and enterprise users who need to test new
features as soon as they're implemented. Remember that some features may never make it beyond
Canary—that's what makes it useful! It's much better that a feature is tested (and potentially rejected, or reworked) in Canary with a small number of users, before the feature is implemented for general availability in Chrome Stable.
 
### Chrome Dev
 
Chrome Dev is released once or twice a week.
 
<figure class="float-right">
<img src="https://storage.googleapis.com/web-dev-uploads/image/80mq7dk16vVEg8BBhsVe42n6zn82/TAyVeX2XEq9EEZBo4bpj.png"
  alt="Chrome Dev logo." width="100" height="100">
</figure>
 
Chrome Dev shows what the Chrome team is working on right now. This release channel is still pretty fresh—we
test it more than Canary, but you're still likely to find bugs and other glitches.
 
### Chrome Beta
 
Chrome Beta is updated about once a week, with major updates every four weeks.
 
<figure class="float-right">
<img src="https://storage.googleapis.com/web-dev-uploads/image/80mq7dk16vVEg8BBhsVe42n6zn82/nvmdSaya5cUwMZkVului.png"
  alt="Chrome Beta logo." width="100" height="100">
</figure>
 
This browser is much more polished, carefully checked and tested. With Chrome Beta, you have access to improvements and new
features more than a month before the Stable channel gets them, with a level of reliability close
to Chrome Stable. You can preview features still under development, and provide feedback to
improve Chrome.
 
### Chrome Stable
 
Chrome Stable is updated every two to three weeks with minor updates and every four weeks for major releases.
 
<figure class="float-right">
<img src="https://storage.googleapis.com/web-dev-uploads/image/80mq7dk16vVEg8BBhsVe42n6zn82/uMZDN6BJtGMJXpm86PHD.png"
  alt="Chrome Stable logo." width="100" height="100">
</figure>
 
This release is known by most people simply as 'Chrome'. Changes and updates only make it into Stable after we
perform rigorous automated testing and manual checks.
 
This is the Chrome channel you should consider as default and current—the channel installed
by the vast majority of users.
 
## Channel ≠ version
 
A series of versions of Chrome is deployed within each release channel, as updates, improvements, and
bug fixes are incorporated during testing. For each channel, the version keeps the same
[major version number](https://www.chromium.org/developers/version-numbers/) throughout one
release cycle. For example, when this article was drafted, Chrome Stable was on version 101, Chrome
Beta was 102, Chrome Dev and Chrome Canary were different versions of 103. You'll sometimes see
these major numbers referred to as _milestones_: for example, M101 or M102.
 
If you're curious about the version you're using, take a look at the `chrome://version` page. You
can observe how the [version number](https://www.chromium.org/developers/version-numbers/) changes
over time for each channel. You can check the latest versions for each Chrome release channel and
platform at [omahaproxy.appspot.com](https://omahaproxy.appspot.com/). This site also provides tools
to view code differences between versions.
 
{% Aside %}
 
Chrome version numbers have four parts: `MAJOR.MINOR.BUILD.PATCH`.
 
`MAJOR` must be updated for any backwards incompatible change.
 
Find out more from [Chromium Projects: Version Numbers](https://www.chromium.org/developers/version-numbers/).

[User-Agent reduction](/docs/privacy-sandbox/user-agent/) explains plans to minimize the identifying browser version number information exposed in JavaScript and passively shared in the `User-Agent` HTTP request header.
 
{% endAside %}
 
## Why does Chrome need release channels?
 
Chrome has thousands of contributors, millions of lines of code, and billions of users. Widely-used,
complex software needs robust processes and strict testing mechanisms to ensure that new features
and changes to code avoid adding bugs and causing unexpected side effects. Chrome engineers continue
to test _after Stable release_, when real people start using the browser at scale. 
 
Web browsers don't work in isolation! They need to cope with the quirks of millions of websites,
changing constantly, and all kinds of user behavior—expected and unexpected.
 
We could release a new version of Chrome with hundreds of changes and updates, to billions of users
in dozens of languages across multiple operating systems for thousands of different devices, all
at once,—and cross our fingers and hope for the best. Of course, we don't do that. Instead, we
begin by experimenting with a change or a new feature in Chrome Canary. In other words, we update
part of the application code. Some changes never make it any further—but if all goes well, we update
Chrome Dev with the change, then Chrome Beta, with more and more testing and more checks, until
finally the changed code makes its way into Chrome Stable. Chrome Stable is the Chrome release that
just about everyone uses—most people just call it 'Chrome'.
 
## What other mechanisms does Chrome use to test and deploy new features?
 
### Field trials {: #field-trials}
 
Chrome is designed so that some new features can be enabled or disabled with _field trial flags_.
The Chrome application, running on your device, periodically checks Chrome's backend servers
to see if there are any changes to field trial flags. Depending on the flag _seed file_ returned
by the server and a locally stored [_randomization seed_](/docs/web-platform/chrome-variations#how-do-chrome-variations-work), features can be turned off or turned on
by Chrome running on your device.
 
For Chrome, field trials are also known as Chrome Variations or by the Google internal codename
Finch. Microsoft has a similar system for the Edge browser called
[ECS](https://learn.microsoft.com/en-us/deployedge/edge-configuration-and-experiments). The Chrome
Variations mechanism allows new features to be enabled for some Chrome users and not others (or
turned off if necessary). You can find out more from our article and video: [What are Chrome
Variations?](/docs/web-platform/chrome-variations).
 
### Metrics {: #metrics}
 
If the setting to help improve Chrome's features and performance is enabled (`chrome://settings/syncSetup?search=improve`) then Chrome can automatically monitor and send anonymous metrics to the Chrome backend—such as memory usage, page load times, or the usage of a browser feature.

Chrome uses metrics to check performance, stability, and for unexpected behavior. This mechanism can also be used with [field trials](#field-trials) to compare metrics for users who
have a new feature activated, and the control group of those who don't. That way, if a problem
occurs, Chrome engineers can turn off the new feature while they're working on a fix.
 
### Chrome Components
 
For some functionality, Chrome takes a modular approach: some pieces of the browser are deployed as
Chrome Components using the [Component Updater](https://chromium.googlesource.com/chromium/src/+/lkgr/components/component_updater/README.md).
 
Components can be updated without requiring a new version of Chrome to be installed. This allows
updates to be deployed more quickly, outside of release channel schedules, without needing the
browser to be relaunched. That's particularly important for security features and can reduce the
size of the Chrome installer for new versions.
 
For example, Chrome has a module to enable playback of copyrighted video, called Widevine. You can
see the full list of Components at `chrome://components`.
 
## What are Chromium, Blink, and V8?
 
[Chromium](https://www.chromium.org/Home/) is the open source browser project on which Chrome and
other browsers are based, including Edge, Samsung Internet, and Brave.
Browsers have become so complex to build and maintain that basing the code on an open source
project has become a common pattern.
(The Safari browser uses [WebKit](https://webkit.org/).) Chrome adds extra features to
Chromium, such as additional video codecs, support for copyright content, and automatic updates.

You can [install Chromium](download-chromium.appspot.com), which frequently has new versions available, but may be missing
key features you rely on in other browsers (such as automatic updates, and licensed media codecs required to stream video).
Chromium is best used by browser developers building browser features, rather than an average web consumer.
 
[Blink](https://www.chromium.org/blink/) is the [rendering
engine](https://en.wikipedia.org/wiki/Browser_engine) used to transform web page code and resources
into the pages you see and interact with.
 
[V8](https://v8.dev/) is the open-source [JavaScript and WebAssembly
engine](https://en.wikipedia.org/wiki/JavaScript_engine) developed by the Chromium project for
Chrome, [Node.js](https://nodejs.org/en/), and other applications and environments.
 
## How does Chrome roll out new versions?
 
Chrome doesn't just release a new version to all users and hope for the best. Instead, Chrome uses
staged rollouts.
 
This means that initially, only a small number of users for each release channel get an update—maybe
only 1–5% to start, gradually building up to 100%. As a feature rolls out, Chrome engineers
use [metrics](#metrics) and user feedback to check for unexpected problems. If something goes
wrong, the rollout is paused while the Chrome team works out how to fix the problem. The solution may be
turning off an experimental feature, updating a component, or shipping a code update called
a _respin_.
 
## How do I install different release channels?
 
[Chrome Release Channels](https://chromium.org/getting-involved/dev-channel) provides
downloads for every Chrome channel on desktop or mobile, for multiple platforms. You can
install them all if you want! You can also [install Chromium](https://download-chromium.appspot.com),
the open source browser that Chrome is built on.
 
{% Aside 'caution' %}
Chrome Canary, Dev or Beta have undergone less testing
than Chrome Stable. And remember that features in non-Stable channels may stop working or be removed
without notice.
{% endAside %}
 
## How do Chrome updates work?
 
New versions are not just about adding new features. Chrome also needs to fix bugs, add security
updates, improve existing features, make code more efficient, and remove
code that's no longer needed. Fast update cycles are particularly important to keep users secure,
and safe from new types of attack.
 
Chrome downloads updates in the background. To update Chrome, you only need to
relaunch the browser. You might see an Update button in Chrome, or notice the ⋮ menu change color,
if there's an update available and you haven't restarted for a while.
[Update Google Chrome](https://support.google.com/chrome/answer/95414) explains how to install
automatic updates.
 
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/R0rrWShka9uFNRQrRkAg.png",
  alt="about:blank in Chrome, with red Update button.", width="800", height="460" %}
 
[Enterprise customers](support.google.com/chrome/a/answer/9027636) can try out new versions of
Chrome Canary, Beta or Dev, and maintain control over software roll-out to their staff.
 
The operating system used by Chromebooks, Chrome OS, works the same way. If you're feeling
adventurous or you want to try out new features early on, you can [switch your Chromebook to a
different Chrome OS channel](support.google.com/chromebook/answer/1086915).
 
## Find out more
 
- [Download Chrome for all channels and platforms](http://chromium.org/getting-involved/dev-channel)
- [Understand Chrome version numbers](https://www.chromium.org/developers/version-numbers/)
- [View the Chrome release blog](http://chromereleases.googleblog.com)
- Find the latest versions for each Chrome release channel and platform, and access tools for
    viewing the difference between versions: [omahaproxy.appspot.com](https://omahaproxy.appspot.com/)
- [Report bugs](https://www.chromium.org/getting-involved/dev-channel/#reporting-dev-channel-and-canary-build-problems)
- [Manage Chrome release channels for enterprise and education](support.google.com/chrome/a/answer/9027636)