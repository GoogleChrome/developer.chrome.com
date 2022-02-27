---
layout: 'layouts/doc-post.njk'
title: Is it ready yet?
subhead: Implementation status for Privacy Sandbox APIs.
description: Implementation status for Privacy Sandbox APIs.
date: 2021-05-18
updated: 2021-11-09
authors:
  - samdutton
  - alexandrawhite
---

{% Aside 'caution' %}
There may be multiple separate origin trial periods for each API.
{% endAside %}

## Attribution Reporting

_Previously known as Conversion Measurement._

- [Current origin trial](https://web.dev/origin-trials/): from Chrome 86, [now extended](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev/c/ZKf9T8sRqAM) to Chrome&nbsp;93. 
- [Register for origin
  trial](/origintrials/#/view_trial/3411476717733150721).
- [Demo](https://goo.gle/demo-event-level-conversion-measurement-api).
- [Chrome Platform Status](https://www.chromestatus.com/features/6412002824028160).
- [Blink
  status](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=conversion%20measurement).
- [GitHub](https://github.com/WICG/conversion-measurement-api/): see
  [issues](https://github.com/WICG/conversion-measurement-api/issues) for API questions
  and discussion.

### Status: details

See [Status](/docs/privacy-sandbox/attribution-reporting-introduction/#status).

### All resources

- [Attribution Reporting (Conversion
  Measurement)](/docs/privacy-sandbox/attribution-reporting)
- [Introduction to Attribution Reporting (Conversion
  Measurement)](/docs/privacy-sandbox/attribution-reporting-introduction)
- [API technical explainers](https://github.com/WICG/conversion-measurement-api/)
- (⚠️ obsolete) [A more private way to measure ad
  conversions](https://web.dev/conversion-measurement/): overview of the first iteration
  of this API for web developers
- (⚠️ obsolete) [A more private way to measure ad conversions -
  Video](https://www.youtube.com/watch?v=jcDfOoWwZcM): demo of the first iteration of this
  API (clicks only)
- (⚠️ obsolete) [Using the Event Conversion Measurement
  API](https://web.dev/using-conversion-measurement/): how to experiment with the first
  iteration of this API for web developers
- [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)

## Trust Tokens

- [Current origin trial](https://web.dev/origin-trials/): from Chrome 84, 
[now extended](https://groups.google.com/a/chromium.org/g/blink-dev/c/-W90wVkS0Ks/m/Jfh5-ZWpAQAJ) to Chrome 94.
- [Register for origin
  trial](/origintrials/#/view_trial/2479231594867458049).
- [Demo](https://trust-token-demo.glitch.me/).
- [Chrome Platform Status](https://www.chromestatus.com/feature/5078049450098688).
- [Blink
  status](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=trust%tokens).
- [GitHub](https://github.com/WICG/trust-token-api): see
  [issues](https://github.com/WICG/trust-token-api/issues) for API questions and
  discussion.
- [Chrome DevTools
  integration](https://developers.google.com/web/updates/2021/01/devtools?utm_source=devtools#trust-token).
- Find out more: [Getting started with Trust Tokens](https://web.dev/trust-tokens/)

## First-Party Sets

- [Current origin trial](https://web.dev/origin-trials/): Chrome 89 to 93.
- [Register for origin
  trial](/origintrials/#/view_trial/988540118207823873).
- [Chrome Platform Status](https://chromestatus.com/feature/5640066519007232).
- [Blink
  status](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=first-party%20sets).
- [API proposal](https://github.com/privacycg/first-party-sets): see
  [issues](hhttps://github.com/privacycg/first-party-sets/issues) for API questions and
  discussion.
- Find out more: [The Chromium Projects: First-Party
  Sets](https://www.chromium.org/updates/first-party-sets).

## User-Agent Client Hints (UA-CH)

- [Origin trial and schedule](https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html)
- [Register for origin trial](/origintrials/#/view_trial/-7123568710593282047)
- [Demo](https://uar-ot.glitch.me/)
- [UA-CH proposal](https://github.com/WICG/ua-client-hints)
- Tutorial to [migrate from UA string to UA-CH](https://web.dev/migrate-to-ua-ch/)
- Find out more: [User-Agent reduction](/docs/privacy-sandbox/user-agent/)

## FLoC

- Initial [origin trial](https://web.dev/origin-trials) now closed. See [Intent to
  Experiment](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs) for
  updates.
- [Demo](https://floc.glitch.me/) of initial version (origin trial now closed).
- [Blink status](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=floc).
- [API proposal](https://github.com/WICG/floc) is under discussion with
  [WICG](https://www.w3.org/community/wicg/) and interest groups.
- [GitHub](https://github.com/WICG/floc): see
  [issues](https://github.com/WICG/floc/issues) for API questions and discussion.
- [Chrome Platform Status](https://www.chromestatus.com/features/5710139774468096).
- Find out more: [What is FLoC?](https://web.dev/floc/)

## FLEDGE

Descendant of [TURTLEDOVE](https://github.com/WICG/turtledove).

- [Intent to
  Prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI/m/LqT59250CAAJ).
- [Blink status](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=fledge).
- [API proposal](https://github.com/WICG/turtledove/blob/main/FLEDGE.md) is under
  discussion with [WICG](https://www.w3.org/community/wicg/) and interest groups.
- [GitHub](https://github.com/WICG/turtledove/blob/main/FLEDGE.md): see [TURTLEDOVE
  issues](https://github.com/WICG/turtledove/issues) for API questions and discussion.

<br>

---

## Find out more

### Blink, Chromium and Chrome

- [Chrome release schedule](https://www.chromestatus.com/features/schedule)
- [Process for launching new features in
  Chromium](https://www.chromium.org/blink/launching-features)
- [Intent to explain: Demystifying the Blink shipping
  process](https://www.youtube.com/watch?time_continue=291&v=y3EZx_b-7tk)
- [blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev/): implementation
  status and discussion of features in Blink, the rendering engine used by Chromium.
- [Chromium code search](https://source.chromium.org/).

### Origin trials

- [Getting started with Chrome's origin trials](https://web.dev/origin-trials/)
- [What are third-party origin trials?](https://web.dev/third-party-origin-trials)
- [Troubleshooting Chrome's origin trials](/blog/origin-trial-troubleshooting/)
- [Origin trials guide for web
  developers](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
- [Origin trial
  explainer](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md)
- [Running an origin
  trial](https://www.chromium.org/blink/origin-trials/running-an-origin-trial)
