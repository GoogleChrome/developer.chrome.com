---
layout: 'layouts/doc-post.njk'
title: 'Topic classification'
subhead: >
  Read how topics are inferred, how they're assigned to users' browsers, and how users can control their topics list.
description: >
  More in-depth information about the topics themselves and how they are chosen.
  
date: 2022-01-25
updated: 2022-02-01
authors:
  - samdutton
---

## Implementation status
{% Partial 'privacy-sandbox/ps-implementation-status.njk' %}

## What is a topic?
A topic, in the Topics API, is a subject a user is interested in as evidenced by the websites they visit.

Topics are a signal to help ad tech platforms select relevant ads. Unlike third-party cookies, this information is shared without revealing further information about the user themself or the user's browsing activity.

The Topics API allows third parties, such as ad tech platforms, to observe and then access topics of interest to a user. For example, the API might suggest the topic "Fiber & Textile Arts" for a user who visits the website `knitting.example`. 

The [list of topics used by the Topics API](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md) is public, human-curated, human-readable, and designed to avoid sensitive categories. This is the current list, which will expand over time. This type of list is known as a _taxonomy_. The topics can be high-level or more specific. For example, `Food & Drink` is a broad category, with a subcategory of `Cooking & Recipes`. Subcategories may be further divided into additional subcategories.

A taxonomy of topics needs to make a tradeoff between utility and privacy. If topics are too specific, they could be used to identify an individual user. If they are too general, they aren't useful for selecting advertising or other content.

The topics taxonomy is constructed with two underlying requirements in mind:
- Support interest-based advertising
- Keep users safe and protect their privacy

This suggests several questions. For example:
- What's the best way for the API to infer topics of interest for a user, based on their browsing activity, while preserving the user's privacy?
- How could the taxonomy be structured to make it more useful?
- What specific items should the taxonomy include?

## How the API infers topics for a site

Topics are derived from a [classifier model](https://github.com/jkarlin/topics#:~:text=classifier) that maps website [hostnames](https://web.dev/same-site-same-origin/#origin) to zero or more topics.
Analyzing additional information (such as full URLs or page contents) might allow for more relevant ads, but might also reduce privacy.
The classifier model for mapping hostnames to topics is publicly available, and the [explainer](https://github.com/patcg-individual-drafts/topics) proposes that it should be possible to view the topics for a site via browser developer tools. The model is expected to evolve and improve over time and be updated periodically; the frequency of this is still under consideration.

Only sites that include code that calls the Topics API are included in the browsing history eligible for topic frequency calculations, and API callers only receive topics they've observed. In other words, sites are not eligible for topic frequency calculations without the site or an embedded service taking action to call the API.

In addition, a caller can only receive topics that their code has “seen.” So if another caller’s code registered a topic, say `/Autos & Vehicles/Motor Vehicles (By Type)/Hatchbacks`, for a user’s browser and your code did not cause that topic to be registered for that user’s browser, you will not be able to learn of that topic of interest for that user’s browser when you call the API from your embedded code.
The Topics explainer also suggests sites are allowed to block topic calculation for their visitors with the following [Permissions-Policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy) header:

```text
Permissions-Policy: browsing-topics=()
```

## The classifier model

Topics are manually curated for 10,000 top domains, and this curation is used to train the classifier. This list can be found in `override_list.pb.gz`, which is available at `chrome://topics-internals/` under the current model in the "Classifier" tab. The domain-to-topics associations in the list are used by the API in lieu of the output of the model itself.

<figure>
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/SOTuE2ljC55PaYll1UP1.png",
  alt="chrome://topics-internal page with Classifier panel selected.",
  width="800", height="695" %}
  <figcaption>
    chrome://topics-internal page with Classifier panel selected
  </figcaption>
</figure>


To run the model directly, refer to [TensorFlow's guide to running a model](https://www.tensorflow.org/lite/guide/inference#running_a_model).

To inspect the `override_list.pb.gz` file:
Unpack it: 
```text
gunzip -c override_list.pb.gz > override_list.pb
```
Use protoc to inspect: 
```text
protoc --decode_raw < override_list.pb > output.txt
```

A full [taxonomy of topics with IDs](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md) is available on GitHub.


### Providing feedback or input on the classifier model

There are [several channels](/docs/privacy-sandbox/feedback/) for providing feedback on the Topics proposal. For feedback on the classifier model, we recommend [submitting a GitHub issue](https://github.com/patcg-individual-drafts/topics/issues) or replying to an existing issue. For example:

- [What topics taxonomy should be used long term?](https://github.com/patcg-individual-drafts/topics/issues/3)
- [What if a site disagrees to the topics assigned?](https://github.com/patcg-individual-drafts/topics/issues/3)

## How the user's top five topics are selected

The API returns one topic for each epoch, up to a maximum of three. If three are returned, this includes topics for the current epoch and the previous two.

1. At the end of each epoch, the browser compiles a list of pages that meet the following criteria:
    - The page was visited by the user during the epoch.
    - The page includes code that calls `document.browsingTopics()`
    - The API was enabled (for example, not blocked by the user or via a [response header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy)).
2. The browser, on the user's device, uses the classifier model provided by the Topics API to map the hostname for each page to a list of topics.
3. The browser accumulates the list of topics.
4. The browser generates a list of the top five topics by frequency.

The `document.browsingTopics()` method then returns a random topic from the top five for each epoch, with a 5% chance that any of these may be randomly chosen from the full taxonomy of topics. In Chrome, users would also be able to remove individual topics, or clear their browsing history to reduce the number of topics returned by the API. Users may also [opt out](#opt-out) of the API.

View information about topics observed during the current epoch from the `chrome://topics-internals` page.


## How the API decides which callers see which topics

API callers only receive topics they've recently observed, and the topics for a user are refreshed once each epoch. That means the API provides a rolling window in which a given caller may receive certain topics.
The table below outlines an example (though unrealistically small) of a hypothetical browsing history for a user during a single epoch, showing topics associated with the sites they've visited, and the API callers present on each site (the entities that call `document.browsingTopics()` in JavaScript code included on the site).

<table>
  <thead>
  <tr>
  <th style="text-align: left;"><strong>Site</strong></th>
  <th style="text-align: left;"><strong>Topics</strong></th>
  <th style="text-align: left;"><strong>API callers on site</strong></th>
  </tr>
  </thead>
  <tbody>
    <tr>
    <td>yoga.example</td>
    <td>Fitness</td>
    <td>adtech1.example adtech2.example</td>
    </tr>
    <tr>
    <td>knitting.example</td>
    <td>Crafts</td>
    <td>adtech1.example</td>
    </tr>
    <tr>
    <td>hiking-holiday.example</td>
    <td>Fitness, Travel & Transportation</td>
    <td>adtech2.example</td>
    </tr>
    <tr>
    <td>diy-clothing.example</td>
    <td>Crafts, Fashion & Style</td>
    <td>[none]</td>
    </tr>
  </tbody>
</table>

At the end of the epoch (currently proposed to be one week) the Topics API generates the browser's top topics for the week.
- adtech1.example is now eligible to receive the "Fitness" and "Crafts" topics, since it observed them on yoga.example and also on knitting.example.
- adtech1.example is not eligible to receive the "Travel & Transportation" topic for this user as it is not present on any sites the user visited recently that are associated with that topic.
- adtech2.example has seen the "Fitness" and "Travel & Transportation" topics, but has not seen the "Crafts" topic.

The user visited diy-clothing.example, which has the "Fashion & Style" topic, but there were no calls to the Topics API on that site. At this point, this means the "Fashion & Style" topic would not be returned by the API for any caller.
In week two, the user visits another site:

<table>
  <thead>
    <tr>
    <th style="text-align: left;"><strong>Site</strong></th>
    <th style="text-align: left;"><strong>Topics</strong></th>
    <th style="text-align: left;"><strong>API callers on site</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>sewing.example</td>
    <td>Crafts</td>
    <td>adtech2.example</td>
    </tr>
  </tbody>
</table>

In addition, code from adtech2.example is added to diy-clothing.example:


<table>
  <thead>
    <tr>
    <th style="text-align: left;"><strong>Site</strong></th>
    <th style="text-align: left;"><strong>Topics</strong></th>
    <th style="text-align: left;"><strong>API callers on site</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>diy-clothing.example</td>
    <td>Crafts, Fashion & Style</td>
    <td>adtech2.example</td>
    </tr>
  </tbody>
</table>

As well as "Fitness" and "Travel & Transportation" from week 1, this means that adtech2.example will now be able to receive the "Crafts" and "Fashion & Style" topic — but not until the following epoch, week 3. This ensures that third parties can't learn more about a user's past (in this case, an interest in fashion) than they could with cookies.
After another two weeks, "Fitness" and "Travel & Transportation" may drop out of adtech2.example's list of eligible topics, if the user doesn't visit any sites with those topics that include code from adtech2.example.


## User controls, transparency, and opting out {: #opt-out}

Users should be able to understand the purpose of the Topics API, recognize what is being said about them, know when the API is in use, and be provided with controls to enable or disable it.

The API's human-readable taxonomy enables people to learn about and control the topics that may be suggested for them by their browser. Users can remove topics they specifically do not want the Topics API to share with advertisers or publishers, and there can be controls to inform the user about the API and show how to enable or disable it. Chrome provides information and settings for the Topics API at `chrome://settings/privacySandbox`. In addition, topics are not available to API callers in Incognito mode, and topics are cleared when browsing history is cleared.

The list of topics returned will be empty if:

- The user opts out of the Topics API via browser settings at `chrome://settings/privacySandbox`.
- The user has cleared their topics (via the browser settings at `chrome://settings/privacySandbox`) or cleared their cookies.
- The browser is in Incognito mode.

The explainer [provides more detail about privacy goals](https://github.com/jkarlin/topics#meeting-the-privacy-goals) and how the API seeks to address them.

## Next steps

If you’re an ad tech developer, [experiment and participate](/docs/privacy-sandbox/topics-experiment/) with the Topics API. Read the [developer guide](/docs/privacy-sandbox/topics/) for more in-depth resources.



