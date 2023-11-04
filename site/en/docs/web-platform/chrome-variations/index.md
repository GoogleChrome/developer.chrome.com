---
layout: 'layouts/doc-post.njk'
title: What are Chrome Variations?
subhead: A mechanism for Chrome to test new browser features
description: A mechanism for Chrome to test new browser features
date: 2022-12-20
authors:
- samdutton
---

{% YouTube
id='teSgavrweWI' 
%}

You might have heard of Chrome Variations, or Chrome Field Trials—or maybe even the internal
codename, Chrome Finch.

These are all names for the same thing: a mechanism to test new features or changes to the Chrome
browser, or to Chrome OS, the Chrome operating system that runs on Chromebooks.

## What are Chrome Variations used for?

Chrome Variations enable Chrome to **activate** a new feature, **deactivate** a feature, or try out
a change to a feature for a subset of users. 

Not everything in Chrome is introduced via the Chrome Variations mechanism. However, the Chrome team
can use Chrome Variations whenever we need to be especially careful about making a change, or where
there's a risk that a change might affect performance in ways we didn't expect. A 'change' might
mean a performance enhancement in Chrome's code, an update to how the browser looks or functions, or
occasionally even a modification to a JavaScript API. 

Chrome Variations can also be used to **validate a hypothesis** about a change or an update. For
example, for a percentage of users in a Chrome Variations group, we tried tweaking
[QUIC networking protocol](https://blog.cloudflare.com/the-road-to-quic/) parameters to make Chrome
faster for users' real network conditions.

Another area where you may encounter Chrome Variations is if you work with Chrome's [origin
trials](/docs/web-platform/origin-trials/). By default, an origin trial feature is enabled on
all pages that provide a valid trial token, but in some cases Chrome Variations is used to control
activation of a feature. This means that an origin trial feature may not be available to certain
users, even when they visit a page that provides a valid trial token. Information about the
proportion of users eligible for activation of an origin trial feature is provided with the
documentation and updates for each origin trial.

## How do Chrome Variations work?

Every 30 minutes on desktop or mobile, or each time you start Chrome, the browser makes a request to
the Chrome backend to get the Chrome Variations configuration file, which is known as the variations
_seed_. In other words, there is a dedicated server to provide Chrome Variations seeds. Chrome
makes an HTTPS request to the server, and the server responds with a
[delta-compressed](https://en.wikipedia.org/wiki/Delta_encoding) seed.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/7sweaUWzxDGAcD3Erv79.png", alt="Information about the
browser and operating system going to the Chrome Variations backend; Chrome Variations seed going to
the browser, which has a randomization seed.", width="800", height="243" %}

When Chrome on your device contacts the Chrome Variations backend to get the seed file, it also
provides information about the version of Chrome, and the operating system it's running on. The file
returned by the Chrome Variations backend is used to turn on features, turn off features, or specify
variations in a feature. 

Chrome uses the data in the seed file, and a locally stored _randomization seed_, to randomly
assign the browser to a variation group. In other words, the randomization seed, combined with the
seed file from the Chrome Variations backend, can be used to activate or deactivate features in the
browser, for a subset of users. Your browser, on your device, keeps track of which variation group
it belongs to.   

### Feature rollout out and Chrome channels

One of the most important uses for Chrome Variations is to gradually roll out changes or new
features to a percentage of users. That's crucial for a complex application like Chrome which has
billions of users, with thousands of types of devices on multiple platforms, using dozens of
different languages for millions of different apps and websites.

Chrome gets valuable feedback from usage and testing in Chrome Canary, Dev, and Beta. We can use
Chrome Variations to activate or deactivate features within any of these [release
channels](https://www.chromium.org/getting-involved/dev-channel/). However, those channels are
primarily used by developers and other specialists. Chrome Stable users interact with Chrome
differently, and in much larger numbers, so we always need to validate on the Stable channel. This
allows us to iron out any problems encountered in normal browser usage. Chrome engineers can't
always predict how real users will respond to changes and new features, at scale.  

Chrome Variations is a crucial mechanism to help with this, making it possible to check usage and
metrics for Chrome Stable with a feature either activated or deactivated. By measuring the impact of
changes in Chrome Stable, we can ship the best features possible and build a better browser—even
when the trade-offs are complex.

## When do Chrome engineers use Chrome Variations?

There are three main reasons that Chrome needs Chrome Variations.

### Activate a new feature 

Using Chrome Variations to provide control over activation of a new feature is particularly useful
for anything that might be more risky in some way, or that might affect performance.

Chrome Variations enable us to roll out a new feature to a subset of users. Then, Chrome
engineers can check for differences in performance or look at other types of feedback from the
variation group. 

### Deactivate a feature

Chrome Variations can be used as a safety mechanism to turn off a feature—although this happens
rarely.

For example, a new networking feature might become subject to a denial-of-service attack.
Chrome Variations can be used to quickly turn off a feature like that, as the Chrome Variations
configuration is downloaded every 30 minutes and settings are activated every time you restart
Chrome. By contrast, updating Chrome and waiting for the new version to be propagated to
billions of users would be much slower.

### Try changes to a feature

Lastly, Chrome Variations can be used to validate changes and updates. For example, we could fine-tune the difficulty for the Chrome Offline Dino game to make the interaction feel more fun.

Chrome Variations can also be used to study the long-term effects of new features. This is done by
using the Chrome Variations mechanism to hold back features for a small proportion of users, maybe
1% or less. A _holdback group_ can be useful to check for changes and side effects that only
become visible over time.

A holdback group can be particularly important for user interface changes, where users are likely to
interact with a feature when it's new, but may behave differently in the long term. 

For example, we launched a photo picker functionality in Chrome, but the feature was temporarily held
back from a small percentage of users, to compare outcomes. We shipped the new Android Photo Picker to
a high proportion of our users, and initially saw a significant increase in the number of images
that group shared on the Web. However, in the six months that we had the holdback variation, we saw
the lift in usage decrease significantly. This was because availability of the new photo picker
encouraged sites to add the accept attribute to file input elements—which led to a better experience
for all users.

## How are Chrome Variations used for validation?

If the setting to help improve Chrome's features and performance is enabled
(`chrome://settings/syncSetup?search=improve`) then Chrome can automatically monitor and send
metrics to the Chrome backend, using a mechanism known as User Metrics Analysis (UMA).  You can see
examples of Chrome's anonymous usage statistics at
[chromestatus.com/metrics](https://chromestatus.com/metrics), such as the percentage of page loads
that use a CSS property or an HTML or JavaScript feature.

Chrome Variations are particularly useful for comparing statistics from one group of users against
another. For example, a feature can be turned on for some users and not others, and Chrome can
compare metrics for each group. These metrics might include memory usage, page load times, or the
usage of a browser feature. This enables Chrome engineers to compare performance or other metrics
between users that have a feature turned on, users that have the feature turned off, or users with
different feature variations. 

### Chrome Variations field trials

Each set of variations for a feature is called a study or _field trial_, and each one has a fixed
duration. Once a study is over for a feature, any users who were included in a non-default behavior
group get the default Chrome setting for the feature: either enabled or disabled. 

Most features that can be controlled by Chrome Variations correspond to a flag that can be set from
the `chrome://flags` page. Alternatively, if you
[run Chrome from the command line](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/),
you can use `--enable-features` and `--disable-features` flags to configure Chrome Variations.

## Chrome Variations for enterprise

For enterprise customers, Chrome also provides the [ChromeVariations
policy](https://support.google.com/chrome/a/answer/9805991?hl=en) to manage Chrome Variations. Of
course, we recommend leaving Chrome Variations enabled, so that Chrome can quickly provide critical
security fixes.

## Find out more

-  [Getting started with Chrome's origin trials](/docs/web-platform/origin-trials/)
-  [Chrome Release Channels](https://www.chromium.org/getting-involved/dev-channel/)
-  [Run Chrome with command-line switches](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/)