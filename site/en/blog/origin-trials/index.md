---
layout: 'layouts/blog-post.njk'
title: Getting started with Chrome's origin trials
subhead: Origin trials are a way to test a new or experimental web platform feature, and give feedback to the web standards community on the feature's usability, practicality, and effectiveness, before the feature is made available to all users.
authors:
  - samdutton
date: 2020-06-22
updated: 2022-04-19
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/KeaVCdXHWzrI35QRvsZL.jpg
alt: Pipette with purple liquid
tags:
  - origin-trials
---

Origin trials give you access to a new or experimental feature, to build
functionality your users can try out for a limited time before the feature
is made available to everyone.

When Chrome offers an origin trial for a feature, you can register for the trial to enable
the feature for all users on your [origin](https://web.dev/same-site-same-origin/#origin),
without requiring them to toggle any flags or switch to an alternative build
of Chrome (though they may need to upgrade). Origin trials enable developers
to build demos and prototypes using new features. The trials also help Chrome engineers
understand how new features are used, and how they may interact with other web technologies.

Origin trials are public and open to all developers. They are limited in duration and
usage. Participation is a self-managed process with limited documentation and support.
Participants should be willing and able to work relatively independently using the
documentation available, which, at this stage, will likely be limited to API
specifications and explainers, though [web.dev](https://web.dev) tries to provide guidance whenever
possible.

If you register for a trial, the Chrome team will periodically ask you for specific
feedback on your use of the trial feature. Some features may undergo multiple origin
trials, as feedback is incorporated and adjustments are made.


## Third-party origin trials {: #third-party}

Origin trials are usually only available on a first-party basis: they only work for a single
registered [origin](https://web.dev/same-site-same-origin/#origin). Third-party origin trials make
it possible for providers of embedded content to try a new feature across multiple sites
without requiring a token for every origin.

Find out more: [What are third-party origin trials?](/blog/third-party-origin-trials/)


## Deprecation trials

Not all origin trials are for testing new APIs. Some trials enable a deprecated feature to be 
temporarily re-enabled. These are known as **deprecation trials**, and in some contexts have been 
referred to as "reverse" origin trials.

For example, [from Chrome 85](https://web.dev/appcache-removal/#origin-trial) AppCache is no longer 
available in Chrome by default. Sites needing extra time to migrate off AppCache could register for 
the [deprecation trial to continue using AppCache](/origintrials/#/view_trial/1776670052997660673) until Chrome 93.


## Take part in an origin trial

1. Choose an origin trial from the [list of active trials](https://developers.chrome.com/origintrials/#/trials/active).
1. Request a token by clicking the **Register** button and filling out the form.
1. Provide the token on every web page for which you want the trial feature to be enabled:
   -  As a meta tag in the &lt;head&gt;:
      `<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">`
   -  As an HTTP header:
      `Origin-Trial: TOKEN_GOES_HERE`
   - By [providing a token programmatically](#programmatic).
1. Try out the new feature.
1. Submit feedback. Do this through the origin trial site. This feedback is
   not public and is available only to a limited group of people on the Chrome
   team. Each trial also provides a link for spontaneous community feedback.
   This typically points to the feature on GitHub or some other public
   channel.
1. When your token expires, you will get an email with a renewal link.
   To do so, you are again asked to submit feedback.

### Provide a token programmatically {: #programmatic}

Instead of providing a token as an HTTP header or as a meta tag in the HTML of your page, as
described earlier, you can inject a token with JavaScript:

```javascript
const otMeta = document.createElement('meta');
otMeta.httpEquiv = 'origin-trial';
otMeta.content = 'TOKEN_GOES_HERE';
document.head.append(otMeta);
```

Use this method if you're participating in a [third-party trial](#third-party).

{% Aside %}

Usually if an API lands unchanged after a successful origin trial, there is a
short period between the end of the origin trial and the date the implementation ships in the
browser when the API is unavailable. This is by design. If Chrome were to avoid the
mandatory total-breakage period, that would bias toward avoiding breakages in the API surface. Such
breakages are often needed to improve the API. The final shipping API might be worse for it.

In some circumstances, if there was clear evidence that developers engaged with the origin trial and
that their concerns were taken into account in the final API design and implementation, this
breakage period may be skipped [upon request](https://sites.google.com/a/chromium.org/dev/blink/launching-features#sites-canvas-main-content:~:text=If%20you%20wish%20to%20skip%20the,Ship%20imply%20approval%20of%20the%20request.).

{% endAside %}


## View origin trial information in Chrome DevTools {: #devtools}

View information about the origin trials available to a page from the **Application** panel in
[Chrome DevTools](/blog/new-in-devtools-94/#origin-trials).

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/bL1kJIzf8Glf79Ptz6qN.png", alt="Origin trial
   information for a site displayed in Chrome DevTools **Application** panel frame details view.",
   width="800", height="465" %}


## Origin trial demos

-  [Token in a meta tag](https://ot-meta.glitch.me)
-  [Token in a header](https://ot-header.glitch.me)
-  [Feature accessed in an iframe](https://ot-iframe.glitch.me)
-  [Token injected by third-party script](https://ot-3p.glitch.me)


## Find out more

-  [Troubleshooting Chrome's origin trials](/blog/origin-trial-troubleshooting)
-  [Origin trials guide for web developers](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
-  [Origin trial explainer](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md)
-  [Running an origin trial](https://www.chromium.org/blink/origin-trials/running-an-origin-trial)
-  [Process for launching new features in Chromium](https://www.chromium.org/blink/launching-features)
-  [Intent to explain: Demystifying the Blink shipping process](https://www.youtube.com/watch?time_continue=291&v=y3EZx_b-7tk)
-  [What are third-party origin trials?](/blog/third-party-origin-trials/)
-  [View origin trials information in DevTools](/blog/new-in-devtools-94/#origin-trials)

---

Photo by [Louis Reed](https://unsplash.com/@_louisreed) on
[Unsplash](https://unsplash.com/photos/pwcKF7L4-no).
