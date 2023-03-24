---
layout: 'layouts/doc-post.njk'
title: 'Topics API developer guide'
subhead: >
  Learn how to work with the API, including how to use Chrome flags for testing.
description: >
  Learn how to work with the API, including how to use Chrome flags for testing.
date: 2022-01-25
updated: 2023-03-08
authors:
  - samdutton
---

## Implementation status
{% Partial 'privacy-sandbox/ps-implementation-status.njk' %}

## Try the Topics API

Topics is not currently available by default in any version of Chrome, but you can activate the API in two ways, as a single user or at scale:

-   The Topics API demo allows you to try it out as a single user.
-   The Topics origin trial allows you to try the API at scale with your website users.

### Try the demo {: #demo}

The demo of the Topics API is at [topics-demo.glitch.me](https://topics-demo.glitch.me/). It explains how to try out and debug the API for a single user.

You can also run the Topics [colab](/docs/privacy-sandbox/topics/colab/) to try out the Topics [classifier model](/docs/privacy-sandbox/topics/topic-classification/#classifier-model).

### Test Topics in an origin trial {: #origin-trial}

A Privacy Sandbox Relevance and Measurement [origin trial](/docs/privacy-sandbox/unified-origin-trial/) has been made available in Chrome Beta 101.0.4951.26 and above on desktop for the Topics, [FLEDGE](/docs/privacy-sandbox/fledge/), and [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/) APIs.

## Get and set topics {: #epoch}

The Topics JavaScript API has one method: `document.browsingTopics()`, which is used to get and set Topics. It returns a promise that resolves to an array of up to three topics, one for each of the three most recent epochs, in random order. An epoch is a period of time currently set to one week.

Each topic object in the array returned by `document.browsingTopics()` will have these properties:

-   `configVersion`: a string identifying the current Topics API configuration
-   `modelVersion`: a string identifying the machine-learning classifier used to infer topics for the site
-   `taxonomyVersion`: a string identifying the set of topics currently in use by the browser
-   `topic`: a number identifying the topic in the [taxonomy](/docs/privacy-sandbox/topics/overview/#how-topics-are-curated-and-selected)
-   `version`: a string combining the `configVersion` and the `modelVersion`

The parameters described in this article, and details of the API (such as taxonomy size, the number of topics calculated per week and the number of topics returned per call) are subject to change as we incorporate ecosystem feedback and iterate on the API.

### Detect support for document.browsingTopics

Before using the API, check if it's supported by the browser and available in the document:

```javascript
'browsingTopics' in document && document.featurePolicy.allowsFeature('browsing-topics') ?
 console.log('document.browsingTopics() is supported on this page') :
 console.log('document.browsingTopics() is not supported on this page');
```

{% Aside 'caution' %}

Feature support on the current page isn't a guarantee that an API is usable: the user may have disabled the API via browser settings, or they may have other settings that prevent the API from being used. To protect user privacy, there is no way to check for these other settings programmatically.
{% endAside %}

### Access topics without modifying state {: #skipobservation}

{% Aside %}
From Chrome 108, the `document.browsingTopics()` method can be passed an optional argument: `{skipObservation:true}`.
This allows the method to return topics without causing the browser to record a topic observation. By default, it does. In other words, the call will not cause the current page to be included in the weekly epoch calculation, nor will it update the list of topics observed for the caller.
{% endAside %}

### Access topics with the JavaScript API {: #access-topics}

Here is a basic example of possible API usage to access topics for the current user. To keep it simple, there's no error handling.

```javascript
// Get the array of top topics for this user.
const topics = await document.browsingTopics();

// Request an ad creative.
const response = await fetch('https://ads.example/get-creative', {
 method: 'POST',
 headers: {
   'Content-Type': 'application/json',
 },
 body: JSON.stringify(topics)
})

// Get the JSON from the response.
const creative = await response.json();

// Display ad.
```

{% Aside 'warning' %}
This snippet of code above is provided only to show how the Topics JavaScript API might be used. API design is subject to change.
{% endAside %}

### Use headers to access and observe topics

Rather than using the Topics JavaScript API from an iframe, topics can be accessed and marked as observed by using [request](https://developer.mozilla.org/docs/Web/API/Request/headers) and [response](https://developer.mozilla.org/docs/Web/API/Response/headers) headers:

-   Topics can be accessed from the `Sec-Browsing-Topics` header of a [`fetch()`](https://developer.mozilla.org/docs/Web/API/fetch) or [`XHR`](https://developer.mozilla.org/docs/Glossary/XHR_(XMLHttpRequest)) request.
-   Topics that were provided in a request header can be marked as observed by setting an `Observe-Browsing-Topics: ?1` header on the response to the request. The browser will then use those topics (that were included in the request header) for calculating topics of interest for a user.

Using request and response headers to access topics and mark them as observed can be much more performant than using the JavaScript API from an iframe. For example, the header mechanism could be used when a `fetch()` request is made to an ad server. No iframe required! For more on this technique, check out the [demo](/docs/privacy-sandbox/topics/demo#the-topics-api-headers-demo).

#### Notes

-   Redirects will be followed, and the topics sent in the redirect request will be specific to the redirect URL.
-   The request header will not modify state for the caller unless there is a corresponding response header. That is, the topic of the page won't be considered observed, nor will it affect the user's topic calculation for the next epoch.
-   The response header is only honored if the corresponding request included the topics header (or would have included the header, if the request wasn't empty).
-   The URL of the request provides the registrable domain used for topic observation.

## Opt out {: #site-opt-out}

You can opt out of topic calculation for specific pages on your site by including the `Permissions-Policy: browsing-topics=()` [Permissions-Policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy) header on a page to prevent topics calculation for all users on that page only. Subsequent visits to other pages on your site will not be affected. If you set a policy to block the Topics API on one page, this won't affect other pages.

You can also control which third parties have access to topics on your page by using the Permission Policy header to control third-party access to the Topics API.

Use `self` and any domains you would like to allow access to the API as parameters.

For example, to completely disable use of the Topics API within all browsing contexts except for your own origin and those whose origin is `https://example.com`, set the following HTTP response header: 

```text
Permissions-Policy: geolocation=(self "https://example.com")
```


## Debug your API implementation {: #debug}

The `chrome://topics-internals` page is available in Chrome on desktop once [you enable the Topics API](/docs/privacy-sandbox/topics/demo/#feature-flags). This displays topics for the current user, topics inferred for hostnames, and technical information about the API implementation.

The `chrome://topics-internals` page is new. The design and functionality are still under discussion. We're currently iterating and improving the design based on developer feedback. Add your feedback at [bugs.chromium.org](https://bugs.chromium.org/p/chromium/issues/entry?template=Defect+report+from+developer&components=Blink%3ETopicsAPI).

### View topics calculated for your browser {: #observed-topics}

Users can view information about topics observed for their browser during the current and previous epochs by viewing `chrome://topics-internals`.

<figure>
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/M253GclVFDCnvPJlTSVR.png",
  alt="The chrome://topics-internals page with Topics State panel selected.",
  width="800", height="697" %}
<figcaption>The chrome://topics-internals page Topics State panel shows Topics IDs, random and real topic assignments, and taxonomy and model versions.
</figcaption>
</figure>

In this example, recently visited sites include topics-demo-cats.glitch.me and cats-cats-cats-cats.glitch.me. This causes the Topics API to select `Pets` and `Cats` as two of the top topics for the current epoch. The remaining three topics have been [chosen at random](https://github.com/patcg-individual-drafts/topics#:~:text=random), since there is not enough browsing history (on sites that observe topics) to provide five topics.

The **Observed-by context domains (hashed)** column provides the hashed value of a hostname for which a topic was observed.

### View topics inferred for hostnames {: #view-inferred-topics}

You can also view the topics inferred by the Topics [classifier model](https://github.com/patcg-individual-drafts/topics#:~:text=classifier%20model) for one or more hostnames in `chrome://topics-internals`.

<figure>
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/SOTuE2ljC55PaYll1UP1.png",
  alt="The chrome://topics-internals page with Classifier panel selected.",
  width="800", height="695" %}
  <figcaption>The chrome://topics-internals page Classifier panel shows topics selected, hosts visited, and model version and path.</figcaption>
</figure>

The current implementation of the Topics API infers topics from hostnames only; not from any other part of a URL.

Use hostnames only (without protocol or path) to view inferred topics from the `chrome://topics-internals` Classifier. `chrome://topics-internals` will display an error if you attempt to include a "/" in the Host field.

### View Topics API information {: #view-api-information}

You can find information about the Topics API implementation and settings, such as the [taxonomy](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md) version and epoch duration, in `chrome://topics-internals`. These values reflect default settings for the API or parameters successfully set [from the command line](#feature-flags). This may be helpful to confirm that command line flags have worked as expected.

In the example below, `time_period_per_epoch` has been set to 15 seconds (the default is seven days).

<figure>
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/7vFveJtxWgY6yB8gHnW3.png",
  alt="chrome://topics-internals page with Features and Parameters panel selected.",
  width="800", height="695" %}
<figcaption>The chrome://topics-internals Features and Parameters panel shows enabled features, time per epoch, number of epochs to use to calculate topics, taxonomy version, and other settings.
</figcaption>
</figure>

The parameters shown in the screenshot correspond to flags that can be set when running Chrome from the command line. For example, the demo at [topics-demo.glitch.me](https://topics-demo.glitch.me/) recommends using the following flags:

```text
--enable-features=BrowsingTopics:time_period_per_epoch/15s,PrivacySandboxAdsAPIsOverride,PrivacySandboxSettings3,OverridePrivacySandboxSettingsLocalTesting
```

Each parameter, its default value, and its purpose is explained in the list below.

#### Chrome flags {: #feature-flags}

<dl>
<dt>
      <dd><code>BrowsingTopics</code></dd>
      <dd><strong>Default value:</strong> enabled</dd>
      <dd>Whether the Topics API is enabled.</dd>
    </dt><br />
    <dt>
      <dd><code>PrivacySandboxAdsAPIsOverride</code></dd>
      <dd><strong>Default value:</strong> enabled</dd>
      <dd>Enables ads APIs: Attribution Reporting, FLEDGE, Topics, Fenced Frames.</dd>
    </dt><br />
    <dt>
      <dd><code>PrivacySandboxSettings3</code></dd>
      <dd><strong>Default value:</strong> disabled</dd>
      <dd>Enables the third release of the Privacy Sandbox UI settings.</dd>
    </dt><br />
    <dt>
      <dd><code>OverridePrivacySandboxSettingsLocalTesting</code></dd>
      <dd><strong>Default value:</strong> enabled</dd>
      <dd>If enabled, the browser no longer requires the underlying settings to be enabled for
enabling the Privacy Sandbox features.</dd>
    </dt><br />
    <dt>
      <dd><code>BrowsingTopicsBypassIPIsPubliclyRoutableCheck</code></dd>
      <dd><strong>Default value:</strong> disabled</dd>
      <dd>If enabled, the check for whether the IP address is publicly routable will be
bypassed when determining the eligibility for a page to be included in topics
calculation.</dd>
    </dt><br />
    <dt>
      <dd><code>BrowsingTopics:number_of_epochs_to_expose</code></dd>
      <dd><strong>Default value:</strong> 3</dd>
      <dd>The number of epochs from where to calculate the topics to give to a requesting
context. The browser will internally keep up to N+1 epochs.</dd>
    </dt><br />
    <dt>
      <dd><code>BrowsingTopics:time_period_per_epoch</code></dd>
      <dd><strong>Default value:</strong> 7d-0h-0m-0s</dd>
      <dd>Duration of each epoch.
      For debugging, it can be useful to set this to (say) 15 seconds, rather than the default 7 days.</dd>
    </dt><br />
    <dt>
      <dd><code>BrowsingTopics:number_of_top_topics_per_epoch</code></dd>
      <dd><strong>Default value:</strong> 5</dd>
      <dd>Number of topics calculated per epoch.</dd>
    </dt><br />
    <dt>
      <dd><code>BrowsingTopics:use_random_topic_probability_percent</code></dd>
      <dd><strong>Default value:</strong> 5</dd>
      <dd>Probability that an individual topic within an epoch is one returned at random from
the entire <a
href="https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md">taxonomy</a>
of topics. The randomness is sticky to an epoch and site.</dd>
    </dt><br />
    <dt>
      <dd><code>BrowsingTopics:number_of_epochs_of_observation_data_to_use_for_filtering</code></dd>
      <dd><strong>Default value:</strong> 3</dd>
      <dd>How many epochs of API usage data (i.e. topics observations) will be used for
filtering the topics for a calling context.</dd>
    </dt><br />
    <dt>
      <dd><code>BrowsingTopics:max_number_of_api_usage_context_domains_to_keep_per_topic</code></dd>
      <dd><strong>Default value:</strong> 1000</dd>
      <dd>The max number of observed-by context domains to keep for each top topic. The intent
is to cap the in-use memory.</dd>
    </dt><br />
    <dt>
      <dd><code>BrowsingTopics:max_number_of_api_usage_context_entries_to_load_per_epoch</code></dd>
      <dd><strong>Default value:</strong> 100000</dd>
      <dd>The max number of entries allowed to be retrieved from the database for each query
for the API usage contexts. The query will occur once per epoch at topics calculation
time. The intent is to cap the peak memory usage.</dd>
    </dt><br />
    <dt>
      <dd><code>BrowsingTopics:max_number_of_api_usage_context_domains_to_store_per_page_load</code></dd>
      <dd><strong>Default value:</strong> 30</dd>
      <dd>The max number of API usage context domains allowed to be stored per page load.</dd>
    </dt><br />
    <dt>
      <dd><code>BrowsingTopics:config_version</code></dd>
      <dd><strong>Default value:</strong> 1</dd>
      <dd>Encodes the Topics API configuration parameters. Each version number should only be
mapped to one configuration set. Updating the configuration parameters without updating the <code>config_version</code> should
be usually fine for local testing, but in some situations could leave the browser in an
inconsistent state and/or could let the browser crash, e.g. updating the
<code>number_of_top_topics_per_epoch</code>.</dd>
    </dt><br />
    <dt>
      <dd><code>BrowsingTopics:taxonomy_version</code></dd>
      <dd><strong>Default value:</strong> 1</dd>
      <dd>The <a
href="https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md">taxonomy</a>
version used by the API.</dd>
    </dt><br />
</dl>


## Next steps

- Learn more about [what topics are and how they work](/docs/privacy-sandbox/topics/topic-classification). <!-- topic classification page and demo and trial links needed-->
- Try out the [demo](/docs/privacy-sandbox/topics/demo) or join an [origin trial](/docs/web-platform/origin-trials/).

## Find out more

-   [Topics API technical explainer](https://github.com/jkarlin/topics)
-   [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)

{% Partial 'privacy-sandbox/topics-feedback.njk' %}
