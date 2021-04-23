---
layout: 'layouts/doc-post.njk'
title: Is it ready yet?
subhead: Implementation status for Privacy Sandbox APIs.
description: Implementation status for Privacy Sandbox APIs.
date: 2021-04-23
updated: 2021-04-23
authors:
  - samdutton
---


{% Aside 'warning' %}
[For Googlers, March 2021.]

This document is a work in progress, unfinished and not to be shared externally.
{% endAside %}


## Attribution Reporting
Previously known as Event Conversion Measurement.
* [In origin trial](https://web.dev/origin-trials/): Chrome 86 to 91. 
* [Register for origin trial](https://developer.chrome.com/origintrials/#/view_trial/3411476717733150721).
* [Chrome Platform Status](https://www.chromestatus.com/features/6412002824028160).
* [Blink status](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=conversion%20measurement)
* [GitHub](https://github.com/WICG/conversion-measurement-api/): see 
[issues](https://github.com/WICG/conversion-measurement-api/issues) for API questions and discussion.
* [Demo](https://goo.gle/demo-event-level-conversion-measurement-api).
* Find out more: [A more private way to measure ad conversions](https://web.dev/conversion-measurement)

## Trust Tokens
* [In origin trial](https://web.dev/origin-trials/): Chrome 84 to 91. 
* [Register for origin trial](https://developer.chrome.com/origintrials/#/view_trial/2479231594867458049).
* [Chrome Platform Status](https://www.chromestatus.com/feature/5078049450098688).
* [Blink status](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=trust%tokens)
* [GitHub](https://github.com/WICG/trust-token-api): see 
[issues](https://github.com/WICG/trust-token-api/issues) for API questions and discussion.
* [Demo](https://trust-token-demo.glitch.me/).
* [Chrome DevTools integration](https://developers.google.com/web/updates/2021/01/devtools?utm_source=devtools#trust-token).
* Find out more: [Getting started with Trust Tokens](https://web.dev/trust-tokens/)

## First-Party Sets
* [In origin trial](https://web.dev/origin-trials/): Chrome 89 to 91. 
* [Register for origin trial](https://developer.chrome.com/origintrials/#/view_trial/988540118207823873).
* [Chrome Platform Status](https://chromestatus.com/feature/5640066519007232).
* [Blink status](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=first-party%20sets)
* [API proposal](https://github.com/privacycg/first-party-sets)): see [issues](hhttps://github.com/privacycg/first-party-sets/issues) and [proposal on WICG](https://discourse.wicg.io/t/proposal-first-party-sets/3331) for API questions and discussion.
* Find out more: [The Chromium Projects: First-Party Sets](https://www.chromium.org/updates/first-party-sets).  

## Federated Learning of Cohorts (FLoC)
* [In origin trial](https://web.dev/origin-trials): Chrome 89–91. See [Intent to Experiment](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs) for updates.
* [Register for origin trial](https://developer.chrome.com/origintrials/#/view_trial/213920982300098561).
* [Blink status](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=floc)
* [API proposal](https://github.com/WICG/floc) is under discussion with 
[WICG](https://www.w3.org/community/wicg/) and interest groups.
* [GitHub](https://github.com/WICG/floc): see [issues](https://github.com/WICG/floc/issues) for 
API questions and discussion.
* [Chrome Platform Status](https://www.chromestatus.com/features/5710139774468096).
* Find out more: [What is Federated Learning of Cohorts (FLoC)?](https://web.dev/floc/)

## FLEDGE
Descendant of [TURTLEDOVE](https://github.com/WICG/turtledove).
* [Blink status](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=fledge)
* [API proposal](https://github.com/WICG/turtledove/blob/master/FLEDGE.md) is under discussion with 
[WICG](https://www.w3.org/community/wicg/) and interest groups.
* [GitHub](https://github.com/WICG/turtledove/blob/master/FLEDGE.md): see [TURTLEDOVE issues](https://github.com/WICG/turtledove/issues) for API questions and discussion.

<br>

___


## Find out more

### Blink, Chromium and Chrome

* [Chrome release schedule](https://www.chromestatus.com/features/schedule)
* [Process for launching new features in Chromium](https://www.chromium.org/blink/launching-features)
* [Intent to explain: Demystifying the Blink shipping process](https://www.youtube.com/watch?time_continue=291&v=y3EZx_b-7tk)
* [blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev/): implementation status and 
discussion of features in Blink, the rendering engine used by Chromium. 
* [Chromium code search](https://source.chromium.org/).

### Origin trials
* [Getting started with Chrome's origin trials](https://web.dev/origin-trials/)
* [What are third-party origin trials?](https://web.dev/third-party-origin-trials)
* [Origin trials guide for web developers](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
* [Origin trial explainer](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md)
* [Running an origin trial](https://www.chromium.org/blink/origin-trials/running-an-origin-trial)
