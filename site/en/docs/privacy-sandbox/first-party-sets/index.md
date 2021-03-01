---
layout: 'layouts/doc-post.njk'
title: 'First-Party Sets'
subhead: >
  Allow related domain names owned by the same entity to declare themselves as belonging to the same first party.
description: >
 
date: 2021-02-28
updated: 2021-02-28
authors:
  - samdutton
---

## When will First-Party Sets be available?

* An [origin trial is in progress](https://developer.chrome.com/origintrials/#/view_trial/988540118207823873) 
from Chrome 89 to 91.
* Find out more about other implementations from [Chrome Platform Status](https://chromestatus.com/feature/5640066519007232).


[Embed video when available.]

{% Aside 'warning' %}

[For Googlers, February 2021.]

This document is a work in progress, unfinished and not to be shared externally.

The aim is to include the following textual content in this page in 300 words or less. 

Potentially, these items (or similar) could be headings.

* Why do we need this technology? 
* What requirements does it meet?
* Who needs to know about this API?
* [Short glossary if necessary: just a few words.]
* How does the technology work?
* What are the major use cases?
* Simple diagram
* Simple example
* Are there any new capabilities this technology will give web platforms?
* If there are existing solutions, why do we need something new? 
* How to share feedback and comments
* How to get involved

**Text below is content in progress.**

{% endAside %}


## What are the anticipated use cases for First-Party Sets?

Allow related domain names owned by the same entity to declare themselves as belonging to the same 
first party, so browsers treat those domains as first party in situations where first party and 
third party are treated differently.


## How do First-Party Sets work?

An **owner** domain hosts a manifest file which lists the **member** domains it owns.  A browser can 
ask a member website to specify its owner, and then check the owner's manifest to verify the 
relationship.  Additional browser policies would prevent abuse or misuse, for example First Party 
Sets is not intended to enable the exchange of user information across unrelated sites, or the 
grouping of sites that are not owned by the same entity.


## How can I try out First-Party Sets?

Register for the [origin trial](https://developer.chrome.com/origintrials/#/view_trial/988540118207823873).


## Find out more

* GitHub: [First-Party Sets explainer](https://github.com/privacycg/first-party-sets). See the 
[Issues tab](https://github.com/privacycg/first-party-sets/issues) for discussion of the proposal.
* [Chrome Platform Status](https://chromestatus.com/feature/5640066519007232).