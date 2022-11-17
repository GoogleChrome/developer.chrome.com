---
layout: 'layouts/doc-post.njk'
title: 'Topics API: developer guide'
subhead: >
  Try out the Topics demo, and learn about the API and how to run Topics with flags or participate in an origin trial.
description: >
  Try out the Topics demo, and learn about the API and how to run Topics with flags or participate in an origin trial.
date: 2022-01-25
updated: 2022-11-13
authors:
  - samdutton
---


## Implementation status

This document outlines a new proposal for interest-based advertising: the Topics API.

-  The [Topics API proposal](https://github.com/jkarlin/topics) has entered [public
   discussion](https://github.com/jkarlin/topics/issues) and is now available in an [origin trial](#origin-trial).
-  This proposal needs your feedback. If you have comments, create an issue on the [Topics
   Explainer repository](https://github.com/jkarlin/topics) or participate in discussions in the
   [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants).
   The explainer has a number of [open questions](https://github.com/jkarlin/topics/issues) that
   still require further definition.
-  [The Privacy Sandbox timeline](http://privacysandbox.com/timeline) provides implementation
   timings for the Topics API and other Privacy Sandbox proposals.

{% Aside %}

[Topics API: latest updates](/docs/privacy-sandbox/topics/latest) details changes and enhancements to the API and implementations.

{% endAside %}

---

## Try the demo {: #demo}

There is a demo of the Topics API at [topics-demo.glitch.me](https://topics-demo.glitch.me/).
This explains how to try out and debug the API for a single user.

You can also run the Topics [colab](#colab) to try out the Topics [classifier model](#classifier-model).

{% YouTube
  id='hEBzWuXjeTQ'
%}

## Take part in a Topics origin trial {: #origin-trial}

A Privacy Sandbox Relevance and Measurement [origin trial](/blog/origin-trials/) has been
made available in Chrome Beta 101.0.4951.26 and above on desktop for the Topics,
[FLEDGE](/docs/privacy-sandbox/fledge) and [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/) APIs.

To take part, [register for an origin trial token](/origintrials/#/view_trial/771241436187197441).

Once you have successfully enrolled in the trial, you can try out the Topics JavaScript API on pages
that provide a valid trial token:

*   As a meta tag in the &lt;head&gt;:<br>

    `<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">`

*   As an HTTP header:<br>

    `Origin-Trial: TOKEN_GOES_HERE`

*   By providing a token programmatically:<br>

    ```javascript
    const otMeta = document.createElement('meta');
    otMeta.httpEquiv = 'origin-trial';
    otMeta.content = 'TOKEN_GOES_HERE';
    document.head.append(otMeta);
    ```

An iframe running Topics code&mdash;such as a `document.browsingTopics()` call to observe
topics&mdash;will need to provide a token that matches its origin.

{% Aside 'caution' %}

Not all users are eligible for the Privacy Sandbox Relevance and Measurement
origin trial, even on pages that provide a valid trial token.

[Testing the Privacy Sandbox ads relevance and measurement APIs](/blog/privacy-sandbox-unified-origin-trial#eligible-users)
explains why this is, and shows how you can (and should) detect if an origin trial feature is
available before attempting to use it.

{% endAside %}


## Test with `chrome://flags` or feature flags {: #feature-flags}

There are two ways to try the Topics API as a single user, running Chrome 101 or above:

*  Enable `chrome://flags/#privacy-sandbox-ads-apis`
*  Run Chrome from the command line with the following flags:

``` text
--enable-features=BrowsingTopics,PrivacySandboxAdsAPIsOverride,OverridePrivacySandboxSettingsLocalTesting
```

The [Topics demo](#demo) shows how to use additional flags to adjust settings such as epoch
length. If you access the Topics API by running Chrome with command-line flags, don't
set `chrome://flags`, as these can override command-line settings.

[Run Chromium with flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)
explains how to set flags when running Chrome and other Chromium-based browsers from the command
line.


{% Aside %}

This is an in-progress version of the API for early testing, so it should not be considered feature
complete or indicative of the final implementation.

The [Privacy Sandbox timeline](https://privacysandbox.com/timeline) provides implementation timing
information for FLEDGE and other Privacy Sandbox proposals.

{% endAside %}


## Detect feature support

Before using the API, check if it's supported by the browser and available in the document:

```javascript
'browsingTopics' in document && document.featurePolicy.allowsFeature('browsing-topics') ?
  console.log('document.browsingTopics() is supported on this page') :
  console.log('document.browsingTopics() is not supported on this page');
```

{% Aside 'caution' %}

Feature support on the current page isn't a guarantee that an API is usable: the user may have
disabled the API via browser settings, or they may have other settings that prevent the API from
being used. To protect user privacy, there is no way to check for this programmatically.

{% endAside %}

---

## Why do we need this API?

The Topics API is a [Privacy Sandbox](/docs/privacy-sandbox/overview/) proposal for a mechanism to
enable interest-based advertising, without having to resort to tracking the sites a user visits.

{% Aside %}

**Interest-based advertising (IBA)** is a form of personalized advertising in which an ad is
selected for a user based on their interests, inferred from the sites they've recently visited.
This is different from contextual advertising, which aims to match content on the page the user is
visiting.

IBA can help advertisers to reach potential customers and help fund websites that cannot
otherwise easily monetize visits to their site purely via contextual advertising. IBA can also
supplement contextual information for the current page to help find an appropriate advertisement
for the visitor.

{% endAside %}

The Topics API proposes a way to provide topics that a user might currently be interested in, based
on their recent browsing activity. These topics can supplement contextual information to help select
appropriate advertisements.

The Topics API has three main tasks:

-  Map website hostnames to topics of interest. For example, a yoga website might be classified as
   being related to "Fitness".
-  Calculate the top topics for a user based on their recent browsing activity.
-  Provide a JavaScript API to provide topics currently of interest to the user, to help select the
   appropriate ads.

The Topics API can help facilitate robust user controls, as the API is built on top of recognizable,
high-level topics. Chrome plans to offer users the option to remove individual topics, and to show
the user the topics stored in the browser.

### How would topics be curated and selected?

Topics would be selected from a
[taxonomy](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md): a list of items such as
"Country Music", "Make-Up&nbsp;&&nbsp;Cosmetics" or "Vegetarian Cuisine". These topics would initially be
curated by Chrome for testing, but with the goal that the topic taxonomy becomes a resource
maintained by trusted ecosystem contributors. The taxonomy needs to provide a set of topics that is
small enough in number (currently proposed to be around 350, though we expect the final number of
topics to be between a few hundred and a few thousand) so that many browsers will be associated with
each topic.

To avoid sensitive categories, these topics must be public, human-curated, and kept
updated. The initial taxonomy proposed for testing by Chrome has been human-curated [to exclude
categories generally considered sensitive](#sensitive-topics), such as ethnicity or sexual
orientation.

{: #classifier-model}

The Topics API proposes using
[machine learning](https://royalsociety.org/topics-policy/projects/machine-learning/what-is-machine-learning-infographic/)
to infer topics from hostnames. The classifier model for this would initially be trained by the
browser vendor, or a trusted third party, using human-curated hostnames and topics. The model would
be distributed with the browser, so it would be openly developed and freely available. The browser,
on the user's device, could then use the model to calculate the most popular topics for a user,
based on the [hostnames](https://web.dev/same-site-same-origin/#origin) of the sites recently
visited.

{% Aside %}
Chrome's implementation of the Topics API downloads a [TensorFlow Lite](tensorflow.org/lite/guide)
file representing the model, so it can be used locally on your device. The model file is in an efficient,
portable format known as FlatBuffers, which has the `.tflite` filename extension.

Access the TensorFlow Lite model file, and the topics inferred for hostnames,
[from the `chrome://topics internal` page](#view-inferred-topics).
{% endAside %}

The diagram below outlines a simplified example, to demonstrate how the Topics API might help an
adtech platform to select an appropriate ad. The example assumes that the user's browser already
has a model to map website hostnames to topics.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png",
  alt="Diagram showing the stages in the Topics API lifecycle, from a user visiting websites to an ad
  being displayed.", width="800", height="275" %}

The Topics API lifecycle: [view a larger version](https://wd.imgix.net/image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png?auto=format&w=1600)

## How does the Topics API work?

{% Aside %}

The Topics API proposal is at the
[initial discussion phase](/docs/privacy-sandbox/cds21-update/#discussion)
to gather and act on feedback from the ecosystem.

The API design is not final and the details below will change as discussions progress.

{% endAside %}

A mechanism to facilitate interest-based advertising, such as the Topics API, must ensure that the
topics of interest it provides are kept up to date.

{: #epoch}

With the Topics API proposal, the browser would infer topics for a user based on their browsing
activity during a period of time known as an _epoch_, currently proposed to be one week. The topic
selected for each epoch would be randomly selected from the user's top five topics for that time
period. To further enhance privacy and ensure that all topics may be represented, there is a 5%
chance the topic is randomly selected from all possible topics in the Taxonomy.

The Topics JavaScript API has one method: `document.browsingTopics()`. This returns a promise that
resolves to an array of up to three topics, one for each of the three most recent epochs, in random
order.

The Topics explainer proposes that each topic object in the array returned by
`document.browsingTopics()` would have three properties:

-  `configVersion`: a string identifying the current configuration
-  `modelVersion`: a string identifying the machine-learning classifier used to infer site
-  `taxonomyVersion`: a string identifying the set of topics currently in use by the browser
-  `topic`: a number identifying the topic in the [taxonomy](#how-would-topics-be-curated-and-selected)
-  `version`: a string combining the `configVersion` and the `modelVersion`

{% Aside %}

The design of the Topics API is currently under discussion as an
[explainer](https://github.com/jkarlin/topics), which is only the first step in the
standardization process. The API is not finalized.

The parameters described in this article, and details of the API (such as taxonomy size, the
number of topics calculated per week and the number of topics returned per call) are subject to
change as we incorporate ecosystem feedback and iterate on the API.

{% endAside %}

{: #observed-topics}

### API callers only receive topics they've observed

A design goal of the Topics API is to enable interest-based advertising without the sharing of
information to more entities than is currently possible with third-party cookies. The Topics API
proposes that topics can only be returned for API callers that have already observed them, within a
limited timeframe.

{: #caller}

{% Aside 'key-term' %}

A Topics API _caller_ is the entity that calls the `document.browsingTopics()` JavaScript
method, and will use the topics returned by the method to help select relevant ads.
Typically, a call to `document.browsingTopics()` would be from code included in a site from a
third party such as an adtech platform. The browser determines the caller from the site of the
current document. So, if you're a third party on a page, make sure you call the API from an
iframe that your site owns.

In order for  `document.browsingTopics() `to return one or more topics, it must be called in
code from the same origin as code that was on a site where those topics were observed.

{% endAside %}

An API caller is said to have _observed_ a topic for a user if it has called the
`document.browsingTopics()` method in code included on a site that the Topics API has mapped to that
topic. For example:

1. The Topics API maps the hostname `knitting.example` to topics including "Fabric & Textile Arts".
1. Code from `adtech.example` is included in pages on `knitting.example`.
1. A user visits `knitting.example`.
1. The  `adtech.example` code calls  `document.browsingTopics(). `
1. One of the topics the browser has inferred for knitting.example is "Fabric & Textile Arts".
1. `adtech.example` is said to have observed the topic "Fabric & Textile Arts" for that user.

The API's `document.browsingTopics()` method will only provide topics that have already been
observed by the caller within the most recent three [epochs](#epoch). This helps stop information
about the user from being shared with more entities than technologies the API is replacing
(including third-party cookies).

The number of topics returned by `document.browsingTopics()` depends on the number of topics that
the [API caller](#caller) has previously observed, and the number of topics that the user has
available (such as the number of weeks of data accumulated). Anywhere from zero to three topics may
be returned.

{: #skipobservation}

{% Aside %}
From Chrome 108, the `document.browsingTopics()` method can be passed an optional `{skipObservation:true}` 
argument.

This allows the method to return topics without causing the browser to record 
a topic observation (the default is `false`). In other words, `document.browsingTopics({skipObservation:true})` 
can be used to return topics of interest for the current user, but with no side effects.
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
This snippet of code is provided only to show how the Topics JavaScript API
might be used. API design is subject to change.
{% endAside %}

#### Access topics without modifying state {: #observe-false}

A caller can specify that they would like to retrieve topics without modifying state by calling
`document.browsingTopics({observe: false})`.

Including the `{observe: false}` argument means that topics can be returned, but the call will not
cause the current page to be included in the weekly epoch calculation, nor will it update the list
of topics observed for the caller.

### Use a header to access topics

Instead of calling `document.browsingTopics()`, topics can be retrieved via a request header, and
marked as observed and eligible for topics calculation via response headers.

This is likely to be much more performant than using the JavaScript API.

The request header will be sent on document requests, if the list of topics is non-empty and the
request is allowable. For example, when the appropriate [permission policy](#site-opt-out) is in play,
and the context is secure.

{% Aside 'caution' %}
This feature is not yet available for testing within the [Privacy Sandbox Relevance and Measurement origin trial](/origintrials/#/view_trial/771241436187197441). It will be made available in the future,
and is currently [targeted for Chrome 108](https://github.com/patcg-individual-drafts/topics/pull/81#issuecomment-1260846931),
but that is subject to change.
{% endAside %}

#### Request header example

``` text
Sec-Browsing-Topics: 123;model=1;taxonomy=1;version=2, 2;model=1;taxonomy=1;version=2
```

This header includes two topics from the
[taxonomy](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md), 123 and 2,
along with their version information.

A Topics request header can also be provided with a `fetch()` request:

``` javascript
fetch(<url>, {browsingTopics: true})
```

#### Response header example

``` text
Observe-Browsing-Topics: ?1
```

#### Notes

-  Redirects will be followed, and the topics sent in the redirect request will be specific to
    the redirect URL.
-  The request header will not modify state for the caller unless there is a corresponding
    response header. That is, the topic of the page won't be considered observed, nor will it
    affect the user's topic calculation for the next epoch.
-  The response header is only honored if the corresponding request included the topics
    header (or would have included the header, if the request wasn't empty).
-  The URL of this request provides the registrable domain used for topic observation.

### How does the Topics API decide which callers can see which topic?

API callers only receive topics they've recently observed, and the topics for a user are refreshed
once each epoch. That means the API provides a rolling window in which a given caller may receive
certain topics.

The table below outlines an example (though unrealistically small) of a hypothetical browsing
history for a user during a single epoch, showing topics associated with the sites they've visited,
and the API [callers](#caller) present on each site (the entities that call
`document.browsingTopics()` in JavaScript code included on the site).

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

At the end of the epoch (currently proposed to be one week) the Topics API generates the browser's
top topics for the week.

-  adtech1.example is now eligible to receive the "Fitness" and "Crafts" topics, since it
   observed them on yoga.example and also on knitting.example.
-  adtech1.example is not eligible to receive the "Travel & Transportation" topic for this user as it is not
   present on any sites the user visited recently that are associated with that topic.
-  adtech2.example has seen the "Fitness" and "Travel & Transportation" topics, but has not seen the "Crafts" topic.

The user visited diy-clothing.example, which has the "Fashion & Style" topic, but there were no calls to the
Topics API on that site. At this point, this means the "Fashion & Style" topic would not be returned by the
API for any caller.

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

As well as "Fitness" and "Travel & Transportation" from week 1, this means that adtech2.example will now be able to
receive the "Crafts" and "Fashion & Style" topic — but not until the following epoch, week 3. This ensures
that third parties can't learn more about a user's past (in this case, an interest in fashion) than
they could with cookies.

After another two weeks, "Fitness" and "Travel & Transportation" may drop out of adtech2.example's list of eligible
topics, if the user doesn't visit any sites with those topics that include code from
adtech2.example.

### How does the API infer topics for a site?

The Topics API explainer proposes that topics are derived from a [classifier
model](https://github.com/jkarlin/topics#:~:text=classifier) that maps website
[hostnames](https://web.dev/same-site-same-origin/#origin) to zero or more topics.

Analyzing additional information (such as full URLs or page contents) might
allow for more relevant ads, but might also reduce privacy.

The classifier model for mapping hostnames to topics would be publicly available, and the explainer
proposes that it should be possible to view the topics for a site via browser developer tools.  The
model is expected to evolve and improve over time and be updated periodically; the frequency of this
is still under consideration.

#### Where can I find the current classifier model?

{: #manually-curated}

Topics are manually curated for 10,000 top domains, and this curation is used to train the
classifier. This list can be found in `override_list.pb.gz`, which is available at
`chrome://topics-internals/` under the current model in the "Classifier" tab. The domain-to-topics
associations in the list are used by the API in lieu of the output of the model itself.

To run the model directly, refer to [TensorFlow's guide to running a model](https://www.tensorflow.org/lite/guide/inference#running_a_model).

To inspect the `override_list.pb.gz` file:

* Unpack it: `gunzip -c override_list.pb.gz > override_list.pb`
* Use protoc to inspect: `protoc --decode_raw < override_list.pb > output.txt`

 A full [taxonomy of topics with IDs is available on GitHub](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md).

#### How can I provide feedback or input on the classifier model?

There are [several channels](/docs/privacy-sandbox/feedback/) for
providing feedback on the Topics proposal. For feedback on the classifier model, we recommend
[submitting a GitHub issue](https://github.com/patcg-individual-drafts/topics/issues) or replying to
an existing issue. For example:

* [What topics taxonomy should be used long term?](https://github.com/patcg-individual-drafts/topics/issues/3)
* [What if a site disagrees to the topics assigned?](https://github.com/patcg-individual-drafts/topics/issues/2)

### How are the user's top five topics selected?

The API returns one topic for each epoch, up to a maximum of three. If three are returned, this
includes topics for the current epoch and the previous two.

1. At the end of each epoch, the browser compiles a list of pages that meet the following
   criteria:
   - The page was visited by the user during the epoch.
   - The page includes code that calls `document.browsingTopics()`
   - The API was enabled (for example, not blocked by the user or via a [response
      header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy)).

1. The browser, on the user's device, uses the classifier model provided by the Topics API to map
   the hostname for each page to a list of topics.
1. The browser accumulates the list of topics.
1. The browser generates a list of the top five topics by frequency.

The  `document.browsingTopics()` method then returns a random topic from the top five  for each
epoch, with a 5% chance that any of these may be randomly chosen from the full taxonomy of topics.
In Chrome, users would also be able to remove individual topics, or clear their browsing history to
reduce the number of topics returned by the API. Users may also opt-out of the API: see [User
opt-out](#opt-out).

{% Aside %}
View information about topics observed during the current epoch [from the `chrome://topics internal` page](#view-current-topics).
{% endAside %}

### How can I debug API usage? {: #debug}

The `chrome://topics-internals` page is available in Chrome on desktop if
[you enable the Topics API](/docs/privacy-sandbox/topics/#feature-flags).
This displays topics for the current user, topics inferred for hostnames, and technical information
about the API implementation.

{% Aside %}
The `chrome://topics-internals` page is new! Design and functionality are still under discussion.

We're currently iterating and improving the design based on developer feedback. Add your feedback at
[bugs.chromium.org](https://bugs.chromium.org/p/chromium/issues/entry?template=Defect+report+from+developer&components=Blink%3ETopicsAPI).
{% endAside %}

#### View topics calculated for your browser {: #view-current-topics}

You can view information about topics observed for your browser during the current and previous
epochs.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/M253GclVFDCnvPJlTSVR.png",
  alt="chrome://topics-internal page with Topics State panel selected.",
  width="800", height="697" %}

In this example, recently visited sites included
[topics-demo-cats.glitch.me](http://topics-demo-cats.glitch.me) and
[cats-cats-cats-cats.glitch.me](cats-cats-cats-cats.glitch.me). This caused the Topics API to
select `Pets` and `Cats` as two of the top topics for the current epoch. The remaining three
topics have been [chosen at random](https://github.com/patcg-individual-drafts/topics#:~:text=random),
since there is not enough browsing history (on sites that observe topics) to provide five topics.

The **Observed-by context domains (hashed)** column provides the hashed value of a hostname for
which a topic was observed.

#### View topics inferred for hostnames {: #view-inferred-topics}

You can view the topics inferred by the Topics
[classifier model](https://github.com/patcg-individual-drafts/topics#:~:text=classifier%20model) for
one or more hostnames.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/SOTuE2ljC55PaYll1UP1.png",
  alt="chrome://topics-internal page with Classifier panel selected.",
  width="800", height="695" %}

{% Aside %}
The current implementation of the Topics API infers topics from hostnames only: not any other part
of a URL.

Use hostnames only (without protocol or path) to view inferred topics from the
`chrome://topics-internals` Classifier. `chrome://topics-internals` will display an error if you
attempt to include a  "/" in the Host field.
{% endAside %}

####  View Topics API information {: #view-api-information}

Information is provided about the Topics API implementation and settings, such as the
[taxonomy](/docs/privacy-sandbox/topics/#taxonomy) version and
[epoch](/docs/privacy-sandbox/topics/#epoch) duration. These values
reflect default settings for the API or parameters successfully set [from the command
line](#feature-flags). This is handy for checking that command line flags have worked as expected:
in the example below, `time_period_per_epoch` has been set to 15 seconds (the default is seven
days).

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/7vFveJtxWgY6yB8gHnW3.png",
  alt="chrome://topics-internal page with Features and Parameters panel selected.",
  width="800", height="695" %}

The meaning of each parameter is explained in the table below. (You'll need to scroll it horizontally
to see all the details!)

The parameters correspond to flags that can be set when running Chrome from the command line. For
example, the demo at [topics-demo.glitch.me](https://topics-demo.glitch.me/) recommends using the
following flags:

```text
--enable-features=BrowsingTopics:time_period_per_epoch/15s,PrivacySandboxAdsAPIsOverride,PrivacySandboxSettings3,OverridePrivacySandboxSettingsLocalTesting
```

<table>
  <thead>
    <tr>
      <th style="text-align: left;"><strong>Parameter</strong></th>
      <th style="text-align: left;"><strong>Default value</strong></th>
      <th style="text-align: left;"><strong>Meaning</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>BrowsingTopics</code></td>
      <td>enabled</td>
      <td>Whether the Topics API is enabled.</td>
    </tr>
    <tr>
      <td><code>PrivacySandboxAdsAPIsOverride</code></td>
      <td>enabled</td>
      <td>Enables ads APIs: Attribution Reporting, FLEDGE, Topics, Fenced Frames.</td>
    </tr>
    <tr>
      <td><code>PrivacySandboxSettings3</code></td>
      <td>disabled</td>
      <td>Enables the third release of the Privacy Sandbox UI settings.</td>
    </tr>
    <tr>
      <td><code>OverridePrivacySandboxSettingsLocalTesting</code></td>
      <td>enabled</td>
      <td>If enabled, the browser no longer requires the underlying settings to be enabled for
enabling the Privacy Sandbox features.</td>
    </tr>
    <tr>
      <td><code>BrowsingTopicsBypassIPIsPubliclyRoutableCheck</code></td>
      <td>disabled</td>
      <td>If enabled, the check for whether the IP address is publicly routable will be
bypassed when determining the eligibility for a page to be included in topics
calculation.</td>
    </tr>
    <tr>
      <td><code>BrowsingTopics:number_of_epochs_to_expose</code></td>
      <td>3</td>
      <td>The number of epochs from where to calculate the topics to give to a requesting
context. The browser will internally keep up to N+1 epochs.</td>
    </tr>
    <tr>
      <td><code>BrowsingTopics:time_period_per_epoch</code></td>
      <td style="white-space: nowrap;">7d-0h-0m-0s</td>
      <td>Duration of each <a href="https://developer.chrome.com/docs/privacy-sandbox/topics/#:~:text=epoch">epoch</a>.
      For debugging, it can be useful to set this to (say) 15 seconds, rather than the default 7 days.</td>
    </tr>
    <tr>
      <td><code>BrowsingTopics:number_of_top_topics_per_epoch</code></td>
      <td>5</td>
      <td>Number of topics calculated per epoch.</td>
    </tr>
    <tr>
      <td><code>BrowsingTopics:use_random_topic_probability_percent</code></td>
      <td>5</td>
      <td>Probability that an individual topic within an epoch is one returned at random from
the entire <a
href="https://developer.chrome.com/docs/privacy-sandbox/topics/#:~:text=taxonomy">taxonomy</a>
of topics. The randomness is sticky to an epoch and site.</td>
    </tr>
    <tr>
      <td><code>BrowsingTopics:number_of_epochs_of_observation_data_to_use_for_filtering</code></td>
      <td>3</td>
      <td>How many epochs of API usage data (i.e. topics observations) will be used for
filtering the topics for a calling context.</td>
    </tr>
    <tr>
      <td><code>BrowsingTopics:max_number_of_api_usage_context_domains_to_keep_per_topic</code></td>
      <td>1000</td>
      <td>The max number of observed-by context domains to keep for each top topic. The intent
is to cap the in-use memory.</td>
    </tr>
    <tr>
      <td><code>BrowsingTopics:max_number_of_api_usage_context_entries_to_load_per_epoch</code></td>
      <td>100000</td>
      <td>The max number of entries allowed to be retrieved from the database for each query
for the API usage contexts. The query will occur once per epoch at topics calculation
time. The intent is to cap the peak memory usage.</td>
    </tr>
    <tr>
      <td><code>BrowsingTopics:max_number_of_api_usage_context_domains_to_store_per_page_load</code></td>
      <td>30</td>
      <td>The max number of API usage context domains allowed to be stored per page load.</td>
    </tr>
    <tr>
      <td><code>BrowsingTopics:config_version</code></td>
      <td>1</td>
      <td>Encodes the Topics API configuration parameters. Each version number should only be
mapped to one configuration set. Updating the configuration parameters without updating the `config_version` should
be usually fine for local testing, but in some situations could leave the browser in an
inconsistent state and/or could let the browser crash, e.g. updating the
`number_of_top_topics_per_epoch`.</td>
    </tr>
    <tr>
      <td><code>BrowsingTopics:taxonomy_version</code></td>
      <td>1</td>
      <td>The <a
href="https://developer.chrome.com/docs/privacy-sandbox/topics/#:~:text=taxonomy">taxonomy</a>
version used by the API.</td>
    </tr>
  </tbody>
</table>


## Run the Topics colab to test topic inference {: #colab}

A colab—or colaboratory—is a data analysis tool that combines code, output, and descriptive text
into one collaborative document. You can run the [Topics Model Execution Demo colab](https://colab.research.google.com/drive/1hIVoz8bRCTpllYvads51MV7YS3zi3prn) to test topic inference
using the Topics classifier model.

1. From the **Classifier** tab of the `chrome://topics-internals` page get the directory path for the
`.tflite` file used by the Topics API. The [override list](#manually-curated) `.pb.gz` file is in
the same directory.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/txujKqPgnQdbwmTfdPZT.png",
  alt="chrome://topics-internal page with Classifier panel selected and tflite file path highlighted.",
  width="800", height="696" %}

2. Open the [colab](https://colab.research.google.com/drive/1hIVoz8bRCTpllYvads51MV7YS3zi3prn) and
click on the folder icon.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/FcBRhBOyLm2EEU1J4ET0.png",
  alt="Topics API colab.", width="800", height="605" %}

3. Click the Upload icon and upload `model.tflite` and `override_list.pb.gz` from your computer to
the colab.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/8PiaYhdpKUx5hyMNcVwG.png",
  alt="Topics API colab file upload.", width="800", height="402" %}

You can then run all the colab steps, by selecting **Run all** from the **Runtime** menu.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/gP8GmUH2xiwbEz27LbjO.png",
  alt="Topics API colab page, 'Run all' selected form the Runtime menu.", width="800", height="605" %}

This does the following:

1. Install the Python packages used by the colab.
2. Install the `tflite` libraries and the Topics taxonomy.
3. Define the taxonomy.
4. Run each of the Model Execution Demo steps to show how classification works for two example
domains.

You'll see a green tick next to each step that completes successfully. (Each step can also be
run individually,
by clicking the Play button next to it.)

For each of the domains defined, you can see the topic scores inferred by the classifier. Try
listing different
domains to see how they compare.

{% Aside 'caution' %}
For some domains you may notice a difference in topic inference, between the colab and the `chrome://topics-internals` Classifier.

This is because the colab only uses the classifier model to infer topics, whereas
`chrome://topics-internals` uses Chrome's Topics implementation, which uses a
[manually-curated list of topics](#manually-curated) (rather than the classifier model) for the top
10,000 sites.
{% endAside %}


## How does the Topics API address concerns with FLoC?

The origin trial of [FLoC](https://github.com/WICG/floc) in 2021 received a wide range of feedback
from adtech and web ecosystem contributors. In particular, there were concerns that FLoC cohorts
could be used as a fingerprinting surface to identify users, or could reveal a user's association
with a sensitive category. There were also calls to make FLoC more transparent and understandable to
users.

The Topics API has been designed with this feedback in mind, to explore other ways to support
interest-based advertising, with improved transparency, stronger privacy assurances and a different
approach for sensitive categories.

### Reduce fingerprinting

The Topics API proposes multiple mechanisms to help ensure that it is difficult to reidentify
significant numbers of users across sites using the Topics API alone:

-  The Topics taxonomy provides a set of coarse-grained topics (the first taxonomy has around
   350 in total) which means that each topic is likely to have large numbers of users (depending on
   the total number of users the given browser has). In fact, there is a guaranteed minimum number
   of users per topic, because 5% of the time the returned topic is random.
-  Topics are returned at random from the user's top five.
-  5% of the time, a random topic (chosen from the full set of topics) is provided.
-  If a user frequently visits the same site (every week, for example) code running on the site
   can only learn at most one new topic per week.
-  Different sites will receive distinct topics for the same user in the same epoch. There is
   only a one-in-five chance that the topic returned for a user on one site matches the topic
   returned for them on another. This makes it more difficult to determine if they're the same user.
-  Topics are updated for a user once each week, which limits the rate at which information can
   be shared.
-  A topic will only be returned for an API caller that [previously observed the same
   topic](#observed-topics) for the same user recently. This approach helps limit the potential for
   entities to learn about (or share) information about user interests they have not observed
   firsthand.

{: #sensitive-topics}

### Sensitive topics

The Topics [taxonomy](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md) will be public and
human-curated to avoid sensitive categories.

In addition, both sites and users can [opt out](#opt-out) of the Topics API.

{% Aside %}

The [Topics proposal explainer states](https://github.com/jkarlin/topics#meeting-the-privacy-goals):

"Third party cookies can be used to track anything about a user, from the
exact URLs they visited, to the precise page content on those pages. This
could include limitless sensitive material. The Topics API, on the other
hand, is restricted to a human-curated taxonomy of topics. That's not to say
that other things couldn't be statistically correlated with the topics in
that taxonomy. That is possible. But when comparing the two, Topics seems
like a clear improvement over cookies."

{% endAside %}

### User controls and transparency

Users should be able to understand the purpose of the Topics API, recognize what is being said about
them, know when the API is in use, and be provided with controls to enable or disable it.

The API's human-readable taxonomy enables people to learn about and control the topics that may be
suggested for them by their browser. Users can remove topics they specifically do not want the Topics
API to share with advertisers or publishers, and there can be UX for informing the user about the API
and how to enable or disable it. Chrome would provide information and settings for the Topics API at
`chrome://settings/privacySandbox`. In addition, topics are not available to API callers in Incognito
mode, and topics are cleared when browsing history is cleared.

{: #opt-out}

### Site opt-out

Only sites that include code which calls the Topics API would be included in the browsing history
eligible for topic frequency calculations, and API callers [only receive topics they've
observed](#observed-topics). In other words, sites are not eligible for topic frequency calculations
without the site or an embedded service taking action to call the API.

The Topics explainer also proposes sites be allowed to block topic
calculation for their visitors with the following
[Permissions-Policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy) header:

```text
Permissions-Policy: browsing-topics=()
```

### User opt-out

The Topics API explainer [proposes](https://github.com/jkarlin/topics#:~:text=empty) that the list
of topics returned will be empty if:

-  The user opts out of the Topics API via browser settings at chrome://settings/privacySandbox.
-  The user has cleared their topics (via the browser settings at
   chrome://settings/privacySandbox) or [cleared their
   cookies](https://support.google.com/accounts/answer/32050).
-  The browser is in Incognito mode.

The explainer provides [more detail about privacy
goals](https://github.com/jkarlin/topics#meeting-the-privacy-goals) and how the API seeks to address
them.

---

## Engage and share feedback

-  **GitHub**: Read the [proposal explainer](https://github.com/jkarlin/topics), and raise
   questions and follow discussion in [issues on the proposal
   repo](https://github.com/jkarlin/topics/issues).
-  **W3C**: Discuss industry use cases in the [Improving Web Advertising Business
   Group](https://www.w3.org/community/web-adv/participants).
-  **Topics API announcements**:  join or view the mailing list at [groups.google.com/a/chromium.org/g/topics-api-announce](https://groups.google.com/a/chromium.org/g/topics-api-announce)
-  **Privacy Sandbox developer support**: Ask questions and join discussions on the
   [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## Find out more

-  [Topics API technical explainer](https://github.com/jkarlin/topics)
-  [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
