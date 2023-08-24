---
layout: 'layouts/blog-post.njk'
title: What's new in Lighthouse 11
authors:
  - adamraine
  - jasmineyan
date: 2023-08-24
description: >
  Lighthouse 11 is here with new accessibility changes and audit updates
hero: 'image/MtjnObpuceYe3ijODN3a79WrxLU2/SM05YIr19Ucx2cUCx5lR.png'
alt: 'Lighthouse category scores, all 100'
tags:
  - new-in-lighthouse
  - lighthouse
  - chrome-118
---

[Lighthouse is a website auditing tool](/docs/lighthouse/overview/) that helps developers with opportunities and diagnostics to improve the user experience of their sites.

Lighthouse 11 is available immediately on the [command line through npm](https://www.npmjs.com/package/lighthouse) and in [Chrome Canary](https://www.google.com/chrome/canary/). It will land in Chrome stable in Chrome 118 and in [PageSpeed Insights](https://pagespeed.web.dev/) in the coming weeks.

See the full list of changes in the [11.0 changelog](https://github.com/GoogleChrome/lighthouse/releases/tag/v11.0.0).

## Accessibility category updates

Category updates include new automated audits, improved weighting, and prioritized manual audits to help developers make their sites more accessible.

### New audits and weighting

Since Lighthouse 10.0, 13 new accessibility audits have been added:

- `aria-allowed-role`
- `aria-dialog-name`
- `aria-text`
- `html-xml-lang-mismatch`
- `image-redundant-alt`
- `input-button-name`
- `label-content-name-mismatch`
- `link-in-text-block`
- `select-name`
- `skip-link`
- `table–duplicate-name`
- `table-fake-caption`
- `td-has-header`

In addition to the new audits, the weights of all the audits have been updated to better match the corresponding [aXe rule impact levels](https://docs.deque.com/devtools-mobile/2023.4.19/en/impact). See the [Lighthouse accessibility scoring](/docs/lighthouse/accessibility/scoring/) documentation for exact details about the new audits and weights.

### Manual audit visibility

Lighthouse has always included some manual audits that cannot be tested automatically, but are still included as a checklist to verify important functionality. The manual audit section is now automatically expanded when all the automated audits have passed.

{% Img src="image/9B7J9oWjgsWbuE84mmxDaY37Wpw2/Gm3aRnJOiWahqTQZKPty.png", alt="A Lighthouse report showing the manual audits in the accessibility category expanded", width="800", height="874" %}

This emphasizes that passing all the automated audits and scoring a 100 in accessibility does not guarantee that the audited page is accessible; manual testing is still important. The manual audits have also been reordered to start with the most approachable checks.

## Changes to existing audits

### Interaction to Next Paint (INP)

INP is [no longer experimental](https://web.dev/inp-cwv/), so the metric has been moved from `experimental-interaction-to-next-paint` to `interaction-to-next-paint`.

### Service workers

A service worker is no longer required for a page to be installable as a  PWA in Chrome, so the `service-worker` check has been removed from the Lighthouse PWA category.

### Resource summary

The `resource-summary` audit has been removed from the Lighthouse report. Network request stats can still be compiled using the hidden `network-requests` audit:

```js
const {lhr} = await lighthouse('https://example.com');
const networkRequests = lhr.audits['network-requests'].details.items;
const resourceSummary = {};

for (const request of networkRequests) {
  let total = resourceSummary[request.resourceType] || 0;
  total += request.resourceSize;
  resourceSummary[request.resourceType] = total;
}

console.log(resourceSummary);
```

## Legacy navigation

The `--legacy-navigation` flag for the CLI, the `legacyNavigation()` function in the Node API, and the "Legacy navigation" checkbox in the DevTools panel have all been removed. This completes a years-long transition in Lighthouse’s infrastructure to support [user flows](https://github.com/GoogleChrome/lighthouse/blob/main/docs/user-flows.md).

## Running Lighthouse {: #running-lighthouse }

Lighthouse is available in [Chrome DevTools](/docs/devtools/overview/), [npm](https://www.npmjs.com/package/lighthouse) (as a Node module and a CLI tool), and as a browser extension (in [Chrome](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/google-lighthouse/)). It also powers several Google services, including [PageSpeed Insights](https://pagespeed.web.dev/).

To try the Lighthouse Node CLI, use the following commands:

```text
npm install -g lighthouse
lighthouse https://www.example.com --view
```

## Get in touch with the Lighthouse team {: #contact-us }

To discuss the new features, changes in the Lighthouse 11 release, or anything else related to Lighthouse:

- Report an issue or submit feedback in the [Lighthouse GitHub issue tracker](https://github.com/GoogleChrome/lighthouse/issues).
- Ask questions in the [Lighthouse GitHub discussion forums](https://github.com/GoogleChrome/lighthouse/discussions).
- Reach out to the Lighthouse team on Twitter <a href="https://twitter.com/intent/tweet?text=@____lighthouse" target="_blank">@____lighthouse</a>.
