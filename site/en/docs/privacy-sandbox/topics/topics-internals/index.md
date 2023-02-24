---
layout: 'layouts/doc-post.njk'
title: 'Topic model and controls'
subhead: >
  Try out the Topics demo, and learn about the API and how to run Topics with flags or participate in an origin trial.
description: >
  Try out the Topics demo, and learn about the API and how to run Topics with flags or participate in an origin trial.
date: 2022-01-25
updated: 2022-02-01
authors:
  - samdutton
---

### Implementation status
{% Partial 'privacy-sandbox/ps-implementation-status.njk' %}

## What is a topic?
A topic, in the Topics API, is a subject a user is interested in as evidenced by the websites they visit.

The Topics API allows third parties, such as ad tech platforms, to observe and then access topics of interest to a user. For example, the API might suggest the topic "Fiber & Textile Arts" for a user who visits the website `knitting.example`. 

Topics are a signal to help ad tech platforms select relevant ads. Unlike third-party cookies, this information is shared without revealing further information about the user themself or the user's browsing activity.

The [list of topics used by the Topics API](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md) is public, human-curated, human-readable, and designed to avoid sensitive categories. This is the current list, which will expand over time. This type of list is known as a _taxonomy_. The topics can be high-level or more specific. For example, `Food & Drink` is a broad category, with a subcategory of `Cooking & Recipes`. Subcategories may be further divided into additional subcategories.

A taxonomy of topics needs to make a tradeoff between utility and privacy. If topics are too specific, they could be used to identify an individual user. If they are too general, they aren't useful for selecting advertising or other content.

The topics taxonomy is constructed with two underlying requirements in mind:
- Support interest-based advertising
- Keep users safe and protect their privacy

This suggests several questions. For example:
- What's the best way for the API to infer topics of interest for a user, based on their browsing activity, while preserving the user's privacy?
- How could the taxonomy be structured to make it more useful?
- What specific items should the taxonomy include?

### How the API infers topics for a site

Topics are derived from a [classifier model](https://github.com/jkarlin/topics#:~:text=classifier) that maps website [hostnames}(https://web.dev/same-site-same-origin/#origin) to zero or more topics.
Analyzing additional information (such as full URLs or page contents) might allow for more relevant ads, but might also reduce privacy.
The classifier model for mapping hostnames to topics is publicly available, and the explainer proposes that it should be possible to view the topics for a site via browser developer tools. The model is expected to evolve and improve over time and be updated periodically; the frequency of this is still under consideration.

Only sites that include code that calls the Topics API are included in the browsing history eligible for topic frequency calculations, and API callers only receive topics they've observed. In other words, sites are not eligible for topic frequency calculations without the site or an embedded service taking action to call the API.

In addition, a caller can only receive topics that their code has “seen.” So if another caller’s code registered a topic, say `/Autos & Vehicles/Motor Vehicles (By Type)/Hatchbacks`, for a user’s browser and your code did not cause that topic to be registered for that user’s browser, you will not be able to learn of that topic of interest for that user’s browser when you call the API from your embedded code.
The Topics explainer also suggests sites are allowed to block topic calculation for their visitors with the following [Permissions-Policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy) header:

```
Permissions-Policy: browsing-topics=()
```

