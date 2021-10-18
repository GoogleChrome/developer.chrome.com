---
layout: 'layouts/doc-post.njk'
title: 'First-Party Sets'
subhead: >
  Allow related domain names owned and operated by the same entity to declare themselves as belonging to the same first party.
description: >
  First-Party Sets enables related domain names owned and operated by the same entity to declare themselves as belonging to the same first party.
date: 2021-05-18
updated: 2021-10-18
authors:
  - samdutton
---

<!--lint disable no-smart-quotes-->

## Implementation status

* The initial [origin trial](https://developer.chrome.com/origintrials/#/view_trial/988540118207823873) 
for First-Party Sets and SameParty was available in Chrome from versions 89 to 93 and is now closed.
* [Chrome Platform Status](https://chromestatus.com/feature/5640066519007232).
* [Chromium Projects](https://www.chromium.org/updates/first-party-sets).


## Why do we need First-Party Sets?

{% YouTube
  id='cNJ8mZ-J3F8' 
%}

Web pages are composed of content from multiple [origins](/docs/privacy-sandbox/glossary#origin).
Some content is first-party and comes from the top-level site the user is visiting. Other content
may come from third parties, such as ads, embedded media, or shared resources such as JavaScript
libraries from [CDNs](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/). Third parties
may also want to correlate user activity across different sites by using mechanisms such as
[cookies](/docs/privacy-sandbox/glossary#origin).

Browsers are proposing privacy models that restrict access to user identity within a cross-site
context. However, many organizations have related sites with different domain names, such as domains
for different countries (`example.com` and `example.co.uk`, for example). It should be possible to
allow related domain names with an appropriate relationship, perhaps common ownership, to declare
themselves as belonging to the same first party, so browsers treat those domains as first-party in
situations where first party and third party are treated differently.

Any solution would also need to prevent abuse of the system. For example, it should not be possible
to declare organizations that include unrelated sites with different owners, in order to gain
first-party privileges.

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

The owner domain hosts a manifest file that lists its member domains. A browser can ask a member
website to specify its owner, and then check the owner's manifest to verify the relationship.

Browser policies are expected to prevent abuse or misuse. For example, First-Party Sets must not
enable the exchange of user information across unrelated sites, or the grouping of sites that are
not owned by the same entity. One possible way for a site to register could be for the site to submit
their proposed group of domains to a public tracker (such as a dedicated GitHub repository) along
with information needed to satisfy browser policy. Verification of the owner’s control over member
domains may also require a challenge to be served at a `.well-known` URL on each of the domains in
the set.

The complementary proposal to First-Party Sets is the `SameParty` cookie attribute. Specifying the
`SameParty` attribute on a cookie instructs the browser to include the cookie when its context is
part of the same First-Party Set as the top-level context.

For example, for the First-Party Set described above, a.example can set the following cookie:

```Set-Cookie: session=123; Secure; SameSite=Lax; SameParty```

This means that when a visitor on b.example or c.example makes a request to a.example, the `session`
cookie is included on that request.


---

## Engage and share feedback

* **Origin trial**: The initial [origin trial](https://developer.chrome.com/origintrials/#/view_trial/988540118207823873) 
for First-Party Sets and SameParty was available in Chrome from versions 89 to 93 and is now closed.
* **GitHub**: Read the [proposal](https://github.com/privacycg/first-party-sets), [raise questions and
follow discussion](https://github.com/privacycg/first-party-sets/issues).
* **Developer support**: Ask questions and join discussions on the
[Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).


## Find out more

* [First-Party Sets and the SameParty attribute](https://developer.chrome.com/blog/first-party-sets-sameparty/)
* [First-Party Sets technical explainer](https://github.com/privacycg/first-party-sets)
* [Chrome Platform Status](https://chromestatus.com/feature/5640066519007232).
* [Chromium Projects](https://www.chromium.org/updates/first-party-sets).
