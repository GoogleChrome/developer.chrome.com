---
layout: 'layouts/doc-post.njk'
title: 'First-Party Sets'
subhead: >
  Allow related domain names owned by the same entity to declare themselves as belonging to the same first party.
description: >
  Allow related domain names owned by the same entity to declare themselves as belonging to the same first party.
date: 2021-04-23
updated: 2021-04-23
authors:
  - samdutton
---

{% Aside 'warning' %}
[For Googlers, March 2021.]

This document is a work in progress, unfinished and not to be shared externally.
{% endAside %}


## Implementation status

* [In origin trial](https://web.dev/origin-trials/) Chrome 89 to 91: [register for the trial](https://developer.chrome.com/origintrials/#/view_trial/988540118207823873).
* [Chrome Platform Status](https://chromestatus.com/feature/5640066519007232).
* [Chromium Projects](https://www.chromium.org/updates/first-party-sets). 


## Why do we need First-Party Sets?

Web pages are composed of content from multiple [origins](/docs/privacy-sanddbox/glossary#origin). 
Some content is first-party and comes from the top-level site the user is visiting. Other content 
may come from third parties, such as ads, embedded media, or shared resources such as JavaScript 
libraries from [CDNs](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/). Third parties 
may also want to correlate user activity across different sites by using mechanisms such as 
[cookies](/docs/privacy-sanddbox/glossary#origin).

Browsers are proposing privacy models that restrict access to user identity outside of a first-party 
context. However, many organizations have related sites with different domain names or with domains 
for different countries (such as `bbc.co.uk` and `bbc.com`). It should be possible to allow related 
domain names owned by the same entity to declare themselves as belonging to the same first party, so 
browsers treat those domains as first-party in situations where first party and third party are 
treated differently. 

Any solution would also need to prevent abuse of the system. For example, ad networks must not be 
able to define organizations that include all the sites they advertise on.


## How do First-Party Sets work?

A website can declare that it is a member (or owner) of a set of web domains by serving a manifest 
file that defines its relationship to the other domains: a JSON file at a 
`.well-known/first-party-set` address.

Suppose `a.example`, `b.example`, and `c.example` wish to form a first-party set owned by 
`a.example`. The sites would then serve the following resources:

```json
// https://a.example/.well-known/first-party-set
{
  "owner": "a.example",
  "members": ["b.example", "c.example"],
  ...
}

// https://b.example/.well-known/first-party-set
{ 
	"owner": "a.example" 
}

// https://c.example/.well-known/first-party-set
{ 
	"owner": "a.example" 
}
```

In other words, an owner domain hosts a manifest file that lists its member domains.  A browser can 
ask a member website to specify its owner, and then check the owner's manifest to verify the 
relationship. Additional browser policies would prevent abuse or misuse. For example, First-Party 
Sets must not enable the exchange of user information across unrelated sites, or the grouping of 
sites that are not owned by the same entity.

---

## Engage and share feedback

* **Origin trial**: Register and take part in the [Chrome origin trial](https://developer.chrome.com/origintrials/#/view_trial/988540118207823873).
* **GitHub**: Read the [proposal](https://github.com/privacycg/first-party-sets), [raise questions and 
follow discussion](https://github.com/privacycg/first-party-sets/issues).
* **W3C**: Discuss industry use cases in the [Improving Web Advertising Business&nbsp;Group](https://www.w3.org/community/web-adv/participants).


## Find out more

* [First-Party Sets technical explainer](https://github.com/privacycg/first-party-sets)
* [Chrome Platform Status](https://chromestatus.com/feature/5640066519007232).
* [Chromium Projects](https://www.chromium.org/updates/first-party-sets). 
