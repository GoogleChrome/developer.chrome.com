---
layout: 'layouts/doc-post.njk'
title: 'Topics API overview'
subhead: >
  The Topics API enables interest-based advertising (IBA) without having to resort to tracking the sites a user visits.
description: >
  The Topics API enables interest-based advertising (IBA) without having to resort to tracking the sites a user visits.
date: 2022-01-25
updated: 2023-06-26
authors:
  - samdutton
---

## Implementation status

{% Partial 'privacy-sandbox/ps-implementation-status.njk' %}

## What is the Topics API?

The Topics API is a [Privacy Sandbox](/docs/privacy-sandbox/overview/) mechanism designed to preserve privacy while allowing a browser to share information with third parties about a user's interests. It enables interest-based advertising (IBA) without having to resort to tracking the sites a user visits.

Interest-based advertising is a key concept in the Topics API. It is a form of personalized advertising in which an ad is selected for a user based on their interests, inferred from the sites they've recently visited. This is different from contextual advertising, which aims to match ads to the content on the page the user is visiting.

Interest-based advertising can help both advertisers (sites that want to advertise their products or services)  and publishers (sites that use ads to help monetize their content):

- IBA can help advertisers reach potential customers.
- IBA can supplement contextual information to help publishers use advertising to fund websites.

The Topics API provides a new form of interest-based advertising using topics (categories of interest) that are assigned to a browser based on recent user activity. These topics can supplement contextual information to help select appropriate advertisements.

## How it works

In the past, third-party cookies and other mechanisms have been used to track user browsing behavior across sites to infer topics of interest. These mechanisms are being phased out.

With the Topics API, the browser observes and records topics that appear to be of interest to the user, based on their browsing activity. This information is recorded on the user's device. The Topics API can then give API callers (such as ad tech platforms) access to a user's topics of interest, but without revealing additional information about the user's browsing activity.

### Observation of ancestor topics {: #ancestor}

Since Chrome 114, when a caller observes a topic for a user on a page, the browser also regards the caller as having observed all ancestors of the topic. 

For example, if the browser records that a caller observes `Shopping/Apparel/Footwear/Boots` for a user, then the ancestors of that topic are also regarded as having been observed: `Shopping/Apparel/Footwear`, `Shopping/Apparel`, and `Shopping`.

Previously, in order for a caller to be regarded by the browser as having observed (for example) `Shopping/Apparel`, that specific topic would have to have been returned by the API as the topic observed. This means that if `Shopping/Apparel` is observed for a caller for a user on one page, and `Shopping/Apparel/Footwear/Boots` on another, then the API will treat `Shopping/Apparel` as having been observed on both pages.

### Epochs {: #epoch}

Of course the Topics API must ensure that the topics of interest it provides are kept up to date. The browser infers topics for a user based on their browsing activity during a period of time known as an *epoch*, currently one week. The topic selected for each epoch is randomly selected from the user's top five topics for that time period. To further enhance privacy and ensure that all topics may be represented, there is a 5% chance the topic is randomly selected from all possible topics in a [taxonomy](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md) of interests.

The Topics API has three main tasks:

-   Map browser activity to topics of interest. With the current design of the Topics API, topics are inferred from the hostnames of pages the user visits. For example, the topic inferred for a website about aquariums might be [/Pets & Animals/Pets/Fish & Aquaria](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md#:~:text=/Pets%20%26%20Animals/Pets/Fish%20%26%20Aquaria).
-   Calculate the top topics for a user based on their recent browsing activity.
-   Provide mechanisms to access topics currently of interest to the user, to help select the appropriate ads.

The Topics API provides human-readable, easily understandable topics, so it's possible to provide meaningful controls to users.

### How topics are curated and selected {: #manually-curated}

Topics are selected from a [taxonomy](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md) consisting of hierarchical categories such as [/Arts & Entertainment/Music & Audio/Soul & R&B](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md#:~:text=/Arts%20%26%20Entertainment/Music%20%26%20Audio/Soul%20%26%20R%26B) and [/Business & Industrial/Agriculture & Forestry](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md#:~:text=106-,/Business%20%26%20Industrial/Agriculture%20%26%20Forestry,-107). These topics have been curated by Chrome for initial testing, but with the goal that the taxonomy becomes a resource maintained by trusted ecosystem contributors. The taxonomy needs to be small enough that many users' browsers will be associated with each topic. Currently the number of topics is 349, but we expect the final number of topics to be between a few hundred and a few thousand.

{% Partial 'privacy-sandbox/topics-taxonomy-v2.njk' %}

{: #sensitive-topics}

To avoid sensitive categories, topics must be public, human-curated, and remain up to date. The initial taxonomy proposed for testing by Chrome has been human-curated [to exclude categories generally considered sensitive](https://github.com/patcg-individual-drafts/topics#meeting-the-privacy-goals:~:text=of%20a%20page.-,The,-topics%20revealed%20by), such as ethnicity or sexual orientation.

For 10,000 top sites, the Topics API implementation in Chrome uses a manually curated, publicly available [override list](/docs/privacy-sandbox/topics/topic-classification/#classifier-model) to map hostnames to topics. For other sites, the Topics API uses a [machine learning](https://royalsociety.org/topics-policy/projects/machine-learning/what-is-machine-learning-infographic/) model to infer topics from hostnames. 

Chrome's implementation of the Topics API downloads a [TensorFlow Lite](https://www.tensorflow.org/lite/guide) file representing the model so it can be used locally on the user's device. 

You can access the TensorFlow Lite model file and the topics inferred for hostnames from `chrome://topics-internals`.

The diagram below shows a simplified example to demonstrate how the Topics API might help an ad tech platform select an appropriate ad. The example assumes that the user's browser already has a model to map website hostnames to topics.

<figure>
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png",
  alt="Diagram showing the stages in the Topics API lifecycle, from a user visiting websites to an ad
  being displayed.", width="800", height="275" %}
<figcaption>
The Topics API lifecycle diagram walks through the stages of the API actions from a high-level point of view. <a href="https://wd.imgix.net/image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png?auto=format&w=1600">View a larger version</a>.
</figcaption>
</figure>

### API callers only receive topics they've observed

A design goal of the Topics API is to enable interest-based advertising without sharing information with more entities than is currently possible with third-party cookies. The Topics API is designed so topics can only be returned for API callers that have already observed them, within a limited timeframe. An API caller is said to have observed a topic for a user if it has called the `document.browsingTopics()` method in code included on a site that the Topics API has mapped to that topic.

The API returns only topics that have been observed by the caller within the most recent three epochs. This helps stop information about the user from being shared with more entities than the technologies the API is replacing (including third-party cookies).

The number of topics returned  depends on the number of topics that the API caller has previously observed, and the number of topics that the user has available (such as the number of weeks of data accumulated). Anywhere from zero to three topics may be returned, as one topic can be indicated for each of the three recent epochs

For more information on how to use and test the Topics API, refer to the [Topics API developer guide](/docs/privacy-sandbox/topics/).

{% Details %}
{% DetailsSummary %}
#### How the API reduces fingerprinting
{% endDetailsSummary %}

The Topics API provides multiple mechanisms to help ensure that it is difficult to re-identify significant numbers of users *across* sites using the Topics API alone:

- Because the Topics taxonomy provides coarsely grained topics, each topic is expected to have large numbers of users. In fact, there is a guaranteed minimum number of users per topic, because 5% of the time the returned topic is random.
- Topics are returned at random from the user's top five.
- If a user frequently visits the same site (every week, for example) code running on the site can learn one new topic per week, at most.
- Different sites will receive different topics for the same user in the same epoch. There is only a one-in-five chance that the topic returned for a user on one site matches the topic returned for them on another. This makes it more difficult to determine if they're the same user.
- Topics are updated for a user once each week, which limits the rate at which information can be shared. In other words, the API helps mitigate against fingerprinting by not providing topic updates too frequently.
- A topic will only be returned for an API caller that previously observed the same topic for the same user recently. This approach helps limit the potential for entities to learn about (or share) information about user interests they have not observed firsthand.

{% endDetails %}

{% Details %}
{% DetailsSummary %}
#### How the API addressed concerns with FLoC
{% endDetailsSummary %}

The origin trial of [FLoC](https://github.com/WICG/floc) in 2021 received a wide range of feedback from ad tech and web ecosystem contributors. In particular, there were concerns that FLoC cohorts could be used as a fingerprinting surface to identify users, or could reveal a user's association with a sensitive category. There were also calls to make FLoC more transparent and understandable to users.

The Topics API has been designed with this feedback in mind. It aims to explore other ways to support interest-based advertising, with improved transparency, stronger privacy assurances and a different approach for sensitive categories.
{% endDetails %}

## Next steps

Learn more about [what topics are and how they work](/docs/privacy-sandbox/topics/topic-classification/).

If you're an ad tech developer, [experiment and participate](/docs/privacy-sandbox/topics-experiment/) with the Topics API. Read the [developer guide](/docs/privacy-sandbox/topics) for more in-depth resources.

{% Partial 'privacy-sandbox/topics-feedback.njk' %}

