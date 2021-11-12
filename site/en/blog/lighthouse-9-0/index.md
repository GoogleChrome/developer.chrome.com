---
layout: 'layouts/blog-post.njk'
title: What's new in Lighthouse 9.0
authors:
  - brendankenny
date: 2021-11-12
description: >
  Lighthouse 9.0 arrives with a refreshed report and a preview of support for user flows.
hero: 'image/MtjnObpuceYe3ijODN3a79WrxLU2/hcf9uCrSxA4VNMiXHsVn.png'
alt: 'A new Lighthouse 9.0 report'
tags:
  - new-in-lighthouse
  - lighthouse
  - chrome-98
---

Lighthouse is a website auditing tool that helps developers with opportunities and diagnostics to improve the user experience of their sites.

Lighthouse 9.0 is available immediately on the command line and in [Chrome Canary](https://www.google.com/chrome/canary/).
It will land in Chrome stable in Chrome 98 and be available in [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) within a week.

## API changes

Most users should not run into any workflow-breaking changes with this release. If you run custom Lighthouse audits or use tools that depend on details deep in the Lighthouse report JSON, there may be some breaking changes in 9.0 that you need to be aware of.

See the full list of changes in the [9.0 changelog](https://github.com/GoogleChrome/lighthouse/releases/tag/v9.0.0).

## Report refresh {: #report-refresh }

The Lighthouse report has been refreshed to improve readability and make the source of the report and how it was run clearer.

A final screenshot has been embedded at the top of the report to make it obvious at a glance if the page being tested loaded correctly and is in the format expected.

{% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/VTimm2GLjvFXwywBi9mn.png", alt="A Lighthouse 9.0 report", width="800", height="629", class="screenshot" %}

The summary information at the bottom of the report has also been redesigned to better communicate how Lighthouse was run and the report collected.

{% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/GHSC5ydLKvFL6kcIohE9.png", alt="The updated settings section of the Lighthouse report", width="800", height="105", class="screenshot" %}

To see the new report in action, try out Lighthouse 9.0 or visit this [example report](https://googlechrome.github.io/lighthouse/viewer/?gist=85f3348c82047ab92fe9ea7929af7ffc).

## Lighthouse for user flows {: #lighthouse-user-flows }

Lighthouse has a new user-flow API that allows lab testing at any point within a page's lifespan.

Puppeteer is used to script page loads and trigger synthetic user interactions, and Lighthouse can be invoked in multiple ways to capture key insights during those interactions. This means that performance can be measured during page load _and_ during interactions with the page.

{% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/SpZcfNnbmKnbub3l8FWe.png", alt="A Lighthouse user-flow report listing multiple steps of interacting with a page and Lighthouse audit results at each step", width="800", height="450", class="screenshot" %}

For more information, see the [Lighthouse user flows tutorial and code samples](https://web.dev/lighthouse-user-flows/).

## Running Lighthouse {: #running-lighthouse }

Lighthouse is available in Chrome DevTools, [npm](https://www.npmjs.com/package/lighthouse) (as a Node module and a CLI), and as a browser extension (in [Chrome](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/google-lighthouse/)). It powers many Google services, including [web.dev/measure](https://web.dev/measure/) and [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights).

To try the Lighthouse Node CLI, use the following commands:

```text
npm install -g lighthouse
lighthouse https://www.example.com --view
```

## Get in touch with the Lighthouse team {: #contact-us }

To discuss the new features, changes in the 9.0 rleae, or anything else related to Lighthouse:

- Report an issue or submit feedback in the [Lighthouse GitHub issue tracker](https://github.com/GoogleChrome/lighthouse/issues).
- Ask questions in the [Lighthouse GitHub discussion forums](https://github.com/GoogleChrome/lighthouse/discussions).
- Reach out to the Lighthouse team on Twitter <a href="https://twitter.com/intent/tweet?text=@____lighthouse" target="_blank">@____lighthouse</a>.
