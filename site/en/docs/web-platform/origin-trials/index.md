---
layout: 'layouts/doc-post.njk'
title: Get started with origin trials
subhead: Test a new or experimental web platform feature.
description: >
  Test a new or experimental web platform feature. Give feedback to the
  web standards community on the feature's usability, practicality, and
  effectiveness, before the feature is made available to all users.
authors:
  - samdutton
date: 2020-06-22
updated: 2023-01-05
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/KeaVCdXHWzrI35QRvsZL.jpg
alt: Pipette with purple liquid.
tags:
  - origin-trials
---

{% YouTube 
  id='v_gI8wcsPUA' 
%}

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
specifications and explainers, [though we try to provide guidance](/docs/web-platform/) whenever
possible.

If you register for a trial, the Chrome team will periodically ask you for specific
feedback on your use of the trial feature. Some features may undergo multiple origin
trials, as feedback is incorporated and adjustments are made.

Origin trials are also available for [Firefox](https://wiki.mozilla.org/Origin_Trials) and [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/origin-trials/).


## Third-party origin trials {: #third-party}

Origin trials are usually only available on a first-party basis: they only work for a single
registered [origin](https://web.dev/same-site-same-origin/#origin). Third-party origin trials make
it possible for providers of embedded content to try a new feature across multiple sites
without requiring a token for every origin.

Find out more: [What are third-party origin trials?](/docs/web-platform/third-party-origin-trials/)

## Deprecation trials

Not all origin trials are for testing new APIs. Some trials enable a deprecated feature to be 
temporarily re-enabled. These are known as **deprecation trials**, and in some contexts have been 
referred to as "reverse" origin trials.

For example, [from Chrome 85](https://web.dev/appcache-removal/#origin-trial) AppCache is no longer 
available in Chrome by default. Sites needing extra time to migrate off AppCache could register for 
the [deprecation trial to continue using AppCache](/origintrials/#/view_trial/1776670052997660673) until Chrome 93.


## Take part in an origin trial

1. Choose an origin trial from the [list of active trials](/origintrials/#/trials/active).
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

{: #multiple}

You can register for the same origin trial multiple times, for different origins, and include 
multiple tokens in the same page. This can be useful if you need to provide tokens 
that are valid for resources served from different origins, such as code included on multiple 
sites that you own.

The origin trials framework looks for the first valid token and then ignores all other tokens. You
can validate this [with Chrome DevTools](/docs/web-platform/origin-trial-troubleshooting/#use-chrome-devtools-to-check-tokens).

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

{% Aside 'caution' %}
A third-party token must be provided in an external JavaScript file included via a `<script>`
element: a third-party token won't work in a meta tag, inline script or HTTP header.
{% endAside %}

### Tokens and iframes {: #iframe}

To access a trial feature from an iframe, you can provide a trial token in a meta tag, an HTTP
header, or [programmatically](#programmatic).

As for all token usage, the origin registered for the token must match the context of JavaScript
that accesses the trial feature: either the origin of the page the includes an inline script,
or the `src` of a `<script>` element for JavaScript included from an external file.

### Renew origin trial enrollment {: #renew}

If an origin trial is extended, you will receive an email warning that you need to renew
registration and provide a new token, for each origin enrolled in the trial.

1. Navigate to the [My Registrations](/origintrials/#/trials/my) page.

2. For each origin registered for the extended trial, click the **RENEW** button.
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/cyYunVjVUSnDGYZQaC4v.png",
   alt="Screenshot of Chrome origin trial My Registrations page, showing RENEW buttons",
   width="800", height="358" %}

3. Copy the new token and make it available for every page that should remain enrolled in the trial.
You can provide multiple tokens if necessary: Chrome will ignore invalid or expired tokens.

{% Aside %}
The requirement for a [breaking period](https://docs.google.com/document/d/1oSlxRwsc8vTUGDGAPU6CaJ8dXRdvCdxvZJGxDp9IC3M/edit#heading=h.r5cdr0aazfpm) was [removed in April 2022](https://www.chromium.org/blink/launching-features/#step-5-optional-origin-trial).
{% endAside %}


## View origin trial information {: #devtools}

View information about the origin trials available to a page from the **Application** panel in
[Chrome DevTools](/blog/new-in-devtools-94/#origin-trials).

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/bL1kJIzf8Glf79Ptz6qN.png", alt="Origin trial
   information for a site displayed in Chrome DevTools **Application** panel frame details view.",
   width="800", height="465" %}

You can also use our [origin trial token decoder](http://ot-decode.glitch.me) to view the data
encoded in a token.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/6QMydxrJrS4nYQD6jQDl.png",
   alt="Origin trial decoder tool, showing decoded origin trial values.",
   width="800", height="823" %}

## Origin trial demos

* [Token in a meta tag](https://ot-meta.glitch.me)
* [Token in a header](https://ot-header.glitch.me)
* [Token injected by third-party script](https://ot-3p.glitch.me)
* [Feature accessed in an iframe](https://ot-iframe.glitch.me)
* [Cross-origin iframe examples](https://ot-iframe-3p.glitch.me)
* [Origin trial token decoder](http://ot-decode.glitch.me)


## Find out more

* [Troubleshooting Chrome's origin trials](/docs/web-platform/origin-trial-troubleshooting)
* [What are third-party origin trials?](/docs/web-platform/third-party-origin-trials/)
* [Origin trials guide for web developers](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
* [Origin trial explainer](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md)
* [Running an origin trial](https://www.chromium.org/blink/origin-trials/running-an-origin-trial)
* [Process for launching new features in Chromium](https://www.chromium.org/blink/launching-features)
* [Intent to explain: Demystifying the Blink shipping process](https://www.youtube.com/watch?time_continue=291&v=y3EZx_b-7tk)
* [View origin trials information in DevTools](/blog/new-in-devtools-94/#origin-trials)
* [Use Origin Trials in Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/origin-trials/)
* [Origin trials for Firefox](https://wiki.mozilla.org/Origin_Trials)
