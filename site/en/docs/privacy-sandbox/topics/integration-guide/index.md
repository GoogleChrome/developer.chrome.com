---
layout: 'layouts/doc-post.njk'
title: 'Topics API integration guide'
subhead: Learn how to use the Topics API to meet specific ad tech use cases.
description: Learn how to use the Topics API to meet specific ad tech use cases.
date: 2023-06-02
authors:
  - thiagodiogo
  - andreeacucu
  - samdutton
---

{% Aside %}
We'd love to know how this article could be improved!

You can [make article suggestions here](https://github.com/GoogleChrome/developer.chrome.com/blob/main/site/en/docs/privacy-sandbox/topics/integration-guide/index.md), and provide API feedback at the bottom of this page.
{% endAside %}


## Before you begin

The first step is to familiarize yourself with the Topics API and services.

1. Review developer docs: 
    1. Begin by reading the [overview](/docs/privacy-sandbox/topics/overview/) to get up to speed with the Topics API and its capabilities.
    1. Watch the [Topics demo walkthrough](https://www.youtube.com/watch?v=hEBzWuXjeTQ) (video).
    1. Try the Topics [header](https://topics-fetch-demo.glitch.me/) and [JavaScript API](https://topics-demo.glitch.me/) demos.
    1. Fork the demos (they both provide links to their code) and run them from your own site.
    1. Read the API [explainer](https://github.com/patcg-individual-drafts/topics) to understand more of the details.
1. Check the [implementation status](/docs/privacy-sandbox/topics/#implementation-status) and the [timeline](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline) of the Topics API.
1. Understand the API's role in [supporting ad relevance in a cookieless future](https://privacysandbox.com/news/maximize-ad-relevance-after-third-party-cookies).
1. To be notified of status changes in the API, [join the mailing list for developers](https://groups.google.com/u/3/a/chromium.org/g/topics-api-announce) and stay tuned for the [latest Topics updates](/docs/privacy-sandbox/topics/latest/).
1. Keep up with the [latest news](/docs/privacy-sandbox/topics/latest/) about the Topics API.
1. Contribute to the conversation via [GitHub issues](https://github.com/patcg-individual-drafts/topics/issues) or [W3C calls](https://github.com/patcg-individual-drafts/topics/issues/115).
1. If you encounter unfamiliar terms, review the [Privacy Sandbox glossary](/docs/privacy-sandbox/glossary/).
1. For more information on Chrome concepts, such as origin trials or Chrome flags, review the short videos and articles available at [goo.gle/cc](http://goo.gle/cc).


## Build and test locally

This section describes how to try out the Topics API as an individual developer. 
[Participate in the origin trial](#participate-in-the-origin-trial) explains how to test at scale with your users by taking part in the origin trial.

1. Local testing and deployment (Estimated time: around 2 days)
    1. Enable the API with your local browser from the command line with [feature flags](/docs/privacy-sandbox/topics/#feature-flags). Test the [header](https://topics-fetch-demo.glitch.me/) and [JavaScript API](https://topics-demo.glitch.me/) demos to see Topics in action ([walkthrough video](https://www.youtube.com/watch?v=hEBzWuXjeTQ)).
    1. Run the [Topics colab](/docs/privacy-sandbox/topics/colab/) to test topic inference using the Topics machine learning model.


### Enable Topics in your browser

To enable the Topics API in your own Chrome instance for local testing you have two options:

1. Open **chrome://flags/#privacy-sandbox-ads-apis** and enable the Privacy Sandbox APIs.
1. **(Recommended)** Run Chrome from the command line with [Chromium flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags) using Topics API-specific parameters to configure as needed.

{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/uuLMIrAjr2ndeLOqBhmq.png", width="744", height="131", alt="Enable the Privacy Sandbox APIs at chrome://flags/#privacy-sandbox-ads-apis." %}
<figcaption>Enabling the Privacy Sandbox APIs.</figcaption>

You have more fine-grained control over Topics features by running Chrome from the command line. For example, it's possible to set Topics epochs (the time frame used by the API to calculate user interests) and configure the behavior of the API according to your needs.

It's important to remember that if **chrome://flags/#privacy-sandbox-ads-apis** is enabled, this will override your command-line epoch setting, returning it to the default value (currently one week).

### Preview Topics API mechanics

You can get visibility into the underlying Topics API mechanics locally by using the [chrome://topics-internals](/docs/privacy-sandbox/topics/#debug) tools. 

{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/4LysAisUZpkryMHwk18f.png", alt="Take a look inside the Topics API at chrome://topics-internals.", width="768", height="669" %}
<figcaption>The chrome://topics-internals tools Topics State tab.</figcaption>

Use the Topics API Internals tool to locally test the classifier based on the sites you visit. 

With this tool, you can review:

* **Topics State:** Display topics observed for the current user.
* **Classifier:** Preview topics inferred for hostnames.
* **Features and Parameters:** View API parameter values to check that feature flags are working as intended.

Learn how to [debug Topics with the Internals tool](/docs/privacy-sandbox/topics/#debug).


### How the API returns topics

If Chrome lacks a sufficient number of observed topics to create the top five topics for an epoch (one week), then the Topics API will add random topics to complete the top five. The Topics Internals column headed **Real or Random** indicates whether that particular topic was based on a real observation or additional random "padding" to complete the top five. Read more about this mechanism in the [explainer](https://github.com/patcg-individual-drafts/topics#specific-details). 

The topic selected for each epoch is randomly selected from the user's top five topics for that time period. If not enough topics have been observed during the epoch, then additional topics will be chosen at random to make up the total of five. These randomly selected topics are subject to filtering.

To further enhance privacy and ensure that all topics may be represented, there is a 5% chance that the topic selected for an epoch is randomly selected from all topics, instead of being chosen from observed topics. As in the case above where too few topics had been observed, these randomly selected topics are not subject to filtering. 

More on how topics are selected is available in [Topics classification](/docs/privacy-sandbox/topics/topic-classification/#how-the-users-top-five-topics-are-selected).


### Key recommendations

1. Make sure you close (and stop) all Chrome processes before starting the new one using the flags.
2. If testing in your local environment, then you should disable **chrome://flags/#privacy-sandbox-ads-apis**, since it overrides the command-line settings, reverting to the default values.
3. Use the [debug page](/docs/privacy-sandbox/topics/#debug) to understand how Topics is working locally.
4. When you have questions, check the [GitHub Issues for the explainer](https://github.com/patcg-individual-drafts/topics/issues).
5. If the API doesn't work as expected, try our [troubleshooting](http://topics-demo.glitch.me/#:~:text=Troubleshooting) tips.


## Plan your MVP deployment

The Topics API gives access to topics of interest observed for a user, without having to resort to tracking the sites a user visits, or exposing their navigation history. 

The Topics API _caller_ is the entity that calls the [`document.browsingTopics()` JavaScript method](/docs/privacy-sandbox/topics/#access-topics), or observes and accesses topics [using HTTP request headers](/docs/privacy-sandbox/topics/#use-headers-to-access-and-observe-topics). Your code, and the [eTLD+1](/docs/privacy-sandbox/glossary/#etld) it's called from, in this instance, is the caller. When you call the Topics API, you're instructing the user's browser to observe the topics of interest when the user visits a website. This visit is then considered in the topics calculation for the next epoch.

The Topics API is designed to [filter results](/docs/privacy-sandbox/topics/topic-classification/#how-the-api-decides-which-callers-see-which-topics) per-caller or per-eTLD+1 of the calling context. In other words, the origin of the iframe (when using the JavaScript API) or the URL of the fetch request (when using headers) is considered the caller, and topics are calculated according to that caller.

The following diagram illustrates this approach:

{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/VVymEStTvzIonqoYlAUr.png", alt="The steps the Topics API takes as users visit sites that use the API.", width="800", height="382" %}
<figcaption>
How the API observes and accesses topics. 
</figcaption>

**In this diagram**:

1. A user opens Chrome and visits multiple websites (customerA.example, customerB.example.br, etc.) which include your ad tech's iframe (source:  iframe.adtech.example) or the fetch call passing headers.
    * Chrome will record topics of interest of this user.
2. After seven days navigating, with topics of interest being observed by the Topics API, the same user on the same device visits a target website (publisher-e.example). The Topics API returns a list of topics and in this specific example, one topic calculated from the previous week of observations of this user will be returned.
    * Only browsers of users who visited sites that adtech.example has observed in Step 1 will be returning topics results in Step 2 (we call this observation filtering—you can't see topics of users you never saw before).
3. With this list (of one topic for now) you can call your back-end API (ads.adtech.example/topics-backend) to use topics data as part of your contextual dataset.
4. Now, depending on your use case, you can create a more personalized experience for this user by accessing the topics of interest you have observed for them during the last weeks.

### Call the Topics API

There are two ways to observe and access the topics for a user. You can use

* The JavaScript API from within an iframe:
    * Adding an iframe on target websites (publisher's websites) that contains JavaScript code calling the Topics API using `document.browsingTopics()`.
* Headers option:
    * Fetch **(which is recommended)** or XHR (**not recommended** and only available during origin trial):
        * You can access topics from the `Sec-Browsing-Topics` header in requests to the ad tech back end. This is the most performant option (low latency to observe topics of one specific user).
    * Using an iframe tag with the `browsingtopics` attribute:
        * You can add an iframe with a `browsingtopics` attribute and Chrome will include topics (observed for the eTLD+1  of the iframe) in the `Sec-Browsing-Topics` header on the request for the iframe.


### Implement with JavaScript and iframes

We recommend you fork either the Topics [JavaScript API demo](https://glitch.com/edit/#!/topics-demo) or the [header demo](https://glitch.com/edit/#!/topics-demo) and use one of these as a starting point for your code.

You can include an `<iframe>` element in HTML or add an iframe dynamically with JavaScript. One way to dynamically create an iframe is with the following JavaScript:

```javascript
const iframe = document.createElement('iframe');
iframe.setAttribute('src', 'https://...');
document.body.appendChild(iframe);
```

Check if the Topics API is supported and available on this device through feature detection:

```javascript
'browsingTopics' in document && document.featurePolicy.allowsFeature('browsing-topics') ?
  console.log('document.browsingTopics() is supported on this page') :
  console.log('document.browsingTopics() is not supported on this page');
```

Call the Topics API from within that iframe:

```javascript
const topics = await document.browsingTopics();
```

You should receive a list of topics observed for this user from the last three weeks. Remember, this list can be empty or may include 1, 2, or 3 topics, from up to the last three weeks.

Here's an example of what the API returns:

```javascript
[{'configVersion': String, 
  'modelVersion': String, 
  'taxonomyVersion': String, 
  'topic': Number, 
  'version': String}]
```

* **configVersion**: a string identifying the current configuration.
* **modelVersion**: a string identifying the machine-learning classifier used to infer topics.
* **taxonomyVersion**: a string identifying the set of topics currently in use by the browser.
* **topic**: a number identifying the topic in the taxonomy.
* **version**: a string combining the `configVersion` and the `modelVersion`.

Read [more about this implementation](/docs/privacy-sandbox/topics/#access-topics).


### Implement with HTTP headers

Topics can be accessed from the `Sec-Browsing-Topics` header of a fetch()/XHR request, or of an `iframe` request. 

{% Img src="image/URLGRmk9LjR39BLvmeGDZFZkz3p2/jOtLgBaveAAyRUXTe7hQ.png", alt="Request and Response headers for setting and retrieving topics.", width="800", height="347" %}
<figcaption>
Headers for iframe and <code>fetch()</code>. 
</figcaption>

You can mark topics provided by request headers as observed by setting an `Observe-Browsing-Topics: ?1` header on the response to the request. The browser will then use those topics to calculate topics of interest for a user.

If the API returns one or more topics, a fetch request to the eTLD+1 from which the topics were observed will include a `Sec-Browsing-Topics` header like this: 

``` text
(325);v=chrome.1:1:1, ();p=P000000000
```

If no topics are returned by the API, the header looks like this:

``` text
();p=P0000000000000000000000000000000
```

`Sec-Browsing-Topics` header values are padded, to mitigate the risk of an attacker learning the number of topics scoped to a caller based on the header length.


#### Implement with `fetch()`

On the publisher page, add your code for the fetch request, making sure to include `{browsingTopics: true}`.

```javascript
fetch('<topics_caller_eTLD+1>', {browsingTopics: true})
    .then((response) => {
        // Process the response
 })
```

In browsers that support the API, the `fetch()` request will include a `Sec-Browsing-Topics` header that lists topics observed for the request URL hostname.

#### Implement with an iframe

Similarly to a `fetch()` request, the `Sec-Browsing-Topics` header will be sent when using the `browsingtopics` attribute on an iframe.

```html
<iframe src="<topics_caller_eTLD+1>" browsingtopics></iframe>
```

In this case, the <code><topics_caller_eTLD+1></code> will be the caller, similar to the fetch call.

#### Server side—identical for all cases

To have the topics in the `Sec-Browsing-Topics` request header marked by the browser as observed, but also to include the current page visit in the user's next epoch top topic calculation, the server's response has to include `Observe-Browsing-Topics: ?1`.

Here's a JavaScript example using `setHeader()`:

```javascript
res.setHeader('Observe-Browsing-Topics', '?1');
```

### Topics back-end implementation

Adding a back end for Topics is optional. Your choice depends on how and where you want to use the topics calculated on-device (in the browser). 

```javascript
// Use the language/framework/stack of your preference
function processTopicsBackendAPI(topics, user, domain, caller) {
  // Validate inputs
  // If the list is not empty, continue
  // Use topics as an additional contextual signal
}
```

### Use topics as contextual data

Topics data can be considered alongside other signals such as URLs, keywords, and even tags, as an additional signal about your audience. 

As explained in [Maximize ad relevance after third-party cookies](/docs/privacy-sandbox/maximize-ad-relevance/), there are multiple approaches to leveraging Topics to serve relevant ads. Some of these involve using topics to build audiences, and others suggest using Topics as one signal among others to train machine learning models that will be used to infer additional interests of the audience or even to optimize bidding logic. 


### Participate in the origin trial

Now that you've deployed locally, the following section will guide you on how to deploy and test at scale with your users. To achieve this, you must register the eTLD+1 of your code for the [Privacy Sandbox Relevance and Measurement origin trial](/docs/privacy-sandbox/unified-origin-trial/). The Topics API will be activated on any page that provides a valid trial token. You can check the [current status of this Origin Trial](/docs/privacy-sandbox/unified-origin-trial/#status) on the status page.


[Origin trials](/docs/web-platform/origin-trials/) are a safe way to test new or experimental web platform features in Chrome. Anyone participating in the trial can test these features and provide feedback on usability and effectiveness. Typically these trials are limited in duration.

#### Configure your site or app to participate in the origin trial

The Privacy Sandbox Relevance and Measurement origin trial makes the trial APIs available for both first-party and third-party contexts. This means you can access the trial APIs in code running on your own eTLD+1, and also from JavaScript code from your eTLD+1 that is embedded on a third-party site.

To allow usage in a third-party context, you must select **Third-party matching** when you register your eTLD+1 for the trial. 

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/6bRyXMiYLzRfKZ9R3Sxa.png", alt="Registration page for the Privacy Sandbox Relevance and Measurement origin trial.", width="800", height="512" %}
<figcaption>The origin trial registration page with third-party matching.</figcaption>

{% Aside 'caution' %}
A third-party token must be provided in an external JavaScript file included via a `script` element; a third-party token won't work in a meta tag, inline script, or HTTP header.

You can register multiple tokens for the same eTLD+1 if necessary—both first- and third-party. 
{% endAside %}

1. **[Register](/docs/privacy-sandbox/unified-origin-trial/#configure) yourself** on behalf of your company. This is recommended when you are going to implement and integrate the Topics API directly in your application (building the iframe, calling the Topics API). 
 

    In this case you will need to add an origin trial token to your Topics iframe, to help you decide which token you will need in your application. We recommend you use a First-Party Token with the JavaScript API.

    The figure below shows part of the registration page. To register a first-party token, do not check any boxes in this section. 

    {% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/mctvCWr97SWNylSRktwW.png", width="715", height="411", alt="Registration page for the Privacy Sandbox Relevance and Measurement origin trial." %}
    <figcaption>The origin trial registration page for first-party token.</figcaption>

    The following decision tree can help you decide which token you need. 

    {% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/cgWSN3o9pUqFq8ZtRB3e.png", alt="Decision tree to help you determine the type of token you need.", width="800", height="455" %}
    <figcaption>Determining which token you need. 
    </figcaption>

1. **Register as a third party**. This is recommended when you are not implementing the Topics API directly into your application and are relying on another partner to test it for you. [Learn about third-party origin trials](/docs/web-platform/third-party-origin-trials/).


#### Key recommendations

1. Discuss with your team to make sure you have selected the correct origin trial option for your specific case.
1. After registering, [embed the origin trial token](/docs/web-platform/origin-trials/#iframe) in your iframe code, not in the top-level site where the iframe is embedded.


#### Provide a first-party origin trial token

A first-party token can be provided in a meta tag, an HTTP header, or [programmatically](/docs/web-platform/origin-trials/#programmatic), for the eTLD+1 of the Topics caller.

For example, here's how to do it in a page in an iframe that includes code (from the same eTLD+1) that calls `document.browsingTopics()`:

```html
<meta http-equiv="origin-trial" content="OT_FOR_<topics_caller_eTLD+1>">
```

#### Provide a third-party origin trial token

To use Topics with fetch headers, a third-party origin trial token must be provided programmatically by the party making the fetch call, registered for the same origin as the call (and making sure the token is read before the call is made). Read more about how to [programmatically provide an origin trial token](/docs/web-platform/origin-trials/#programmatic). An example is shown here:


```javascript
{
  // Programmatically inject <meta> tag for
  // Third-party origin trial token
  
  const otMeta = document.createElement('meta');
  otMeta.httpEquiv = 'origin-trial';
  otMeta.content = 'YOUR TOKEN HERE';
  document.head.append(otMeta);
}

fetch('<topics_caller_eTLD+1>', {browsingTopics: true})
    .then((response) => {
        // Process the response
 })
```

{% Aside %}
Given that the origin trial token has to be generated for the same origin as the code, it is recommended   that publishers use a script owned by the ad tech. This way, multiple sites can include the same script (as shown in the example below) which provides a third-party token registered for the ad tech origin (https://adtech.com).
{% endAside %}

```html
<script src="https://adtech.com/js/topics.js">
```

## Build and deploy

1. Collect topics by observing users in production—not scaled yet (Estimated time: approximately 1 week)
    1. Understand your options: [iframe and JavaScript](/docs/privacy-sandbox/topics/#access-topics) or [HTTP headers](/docs/privacy-sandbox/topics/#use-headers-to-access-and-observe-topics)
    1. Define the domain of the iframe.
    1. Build the JavaScript code, using the [demo app](https://topics-demo.glitch.me/) as a code reference — or implement the headers option.
    1. Deploy Topics to your controlled environment (some production sites).
    1. Register for the origin trial.
    1. Add the Topics implementation to some target sites (no more than five sites at this time).
    1. Functional testing and validation.
2. [Optional] Use Topics data as a contextual signal (with URLs, tags, etc.) (Estimated time: around 3 days).
    1. After receiving the list of topics, you can send it to your back end with other contextual signals.


### Deploy to some target sites

Now that you have the code and you have registered for the origin trial, let's add it to some target sites for a first test and to make sure the API is stable and working in this controlled environment.

We recommend that you pick target websites that:

* **Get a small number of monthly visits (less than about 1 million visits/month)**: You should begin by deploying the API to a small audience first.
* **You own and control**: If necessary you can quickly disable the implementation without complex approvals.
* **Are not business critical**: Since this implementation can disrupt your user's experience, start with low risk target sites.
* **Total no more than five sites**: You won't need that much traffic or exposure for now.
* **Represent different themes**: Choose websites that represent different categories (for example, one about sports, another about news, one more from food and drink, etc.). You can [use the internal topics tool in Chrome](/docs/privacy-sandbox/topics/#view-inferred-topics) to validate domains and how they are classified by the Topics machine-learning classifier. Learn more about [debugging](/docs/privacy-sandbox/topics/#debug) in the Topics API developer guide.


## Functional testing and validation

When calling the Topics API in this limited environment you can expect:

* An empty array of topics [] if this is the first call of this device, for this site and caller in the last seven days.
* A list of zero to three topics, representing the interests of this user.
* After seven days of observation you should receive:
    * One topic representing the interest of that user calculated from the navigation history of that week.
        * One important detail: if not enough topics have been observed by you for a user for the Topics API to calculate the top five topics of that week, then Topics will add as many random topics as necessary to arrive at the total number of five. Find [more details in the API proposal](https://github.com/patcg-individual-drafts/topics#specific-details).
* A new topic entry replacing one of the three if you are calling it after four weeks of observation.
    * This happens because the Topics API will be stable for the following weeks, not exposing too many of the user's interests. Find [more details in the API proposal](https://github.com/patcg-individual-drafts/topics#specific-details).
* If you have not observed topics for the user for more than three weeks, then the Topics API will return an empty array `[]` again.

Measure the performance and metrics of your user experience.

* The run time of the JavaScript calls to the Topics API inside a cross-origin iframe should be measured to be used in future performance analysis—make sure to collect and store telemetry data properly in your back end.
    * The time taken to create an iframe and `postMessage()` topics, after topics are received, is also another possible metric to be calculated.


### Troubleshooting

<dl>
<dt>
<strong>I'm calling the Topics API but I'm receiving null as the result. What can I do?</strong>
</dt>
<dd>
If you are calling the Topics API within the first week of observing a user, then this is expected.
</dd>
<dt>
<strong>I can't see much traffic from users with Topics API enabled visiting my site, what can I do?</strong>
</dt>
<dd>
Make sure your origin trial configuration is correct. <a href="/docs/web-platform/origin-trial-troubleshooting/">Troubleshoot Chrome origin trials</a> provides a checklist to help fix origin trial problems.

When using the JavaScript API from an iframe, a common mistake is to add an origin trial token to the target site (top level site). Instead, the origin trial token must be provided from your iframe.

</dd>
</dl>

### Key recommendations

1. Test your front-end code to make sure your JavaScript is working as expected.
    1. It's important to make sure your origin trial token is valid and can be used in your context. We highly recommend you use the Chrome DevTools (Application tab) to troubleshoot and validate that your origin trial token is being used correctly. More details can be found in the  [origin trials troubleshooting guide](/docs/web-platform/origin-trial-troubleshooting/#use-chrome-devtools-to-check-tokens).
1. Test your back end to receive the topics results.
    1. Remember to make sure data types and back-end API parameters are configured correctly.
    1. Make sure your back end is configured to scale appropriately.
1. From our experience, it is necessary to allow at least three weeks before starting to get more relevant topics results.
1. Not all users will have Topics enabled during the origin trial: 
    1. It depends on the device being selected to participate in this origin trial .
    1. Users can explicitly disable the Topics API.
    1. Publisher's pages can control permissions policy. Refer to ([opt-out](/docs/privacy-sandbox/topics/#site-opt-out)) in the Topics API developer guide.
    1. Check [chromestatus.com](https://chromestatus.com/) for more details.
1. Add metrics and observability to this environment: you'll need them to analyze the first results. Example metrics include:
    1. Latency of calls;
    1. HTTP errors on topics calls;
1. Try to limit changes to your implementation during the initial three weeks.

## Scale to production

Here's a step-by-step summary of how you can scale to production. The steps are explained below.

1. Scale the implementation (production) This is described below.
    1. Add the iframe to multiple publisher's websites.
1. Process and use topics data (Estimated time: around 4 weeks).
    1. Incorporate topics data as an additive signal alongside other data.
    1. Source real-time-bidding testing partners.
    1. Run utility testing with topics as an additive signal to your other data.


## Scale your implementation

At this point you should have topics data being collected from some sites in a controlled environment, with a higher level of confidence about the whole solution.

Now it's time to scale this implementation by deploying the same code to more target websites. This will enable you to observe more users, collect more topics data, and deepen your understanding of your audiences.

We recommend the following:

1. Deploy gradually across your sites, especially if you have a large volume of traffic.
1. Perform load testing for your topics data, according to your expected traffic.
    1. Confirm that your back end can handle a large volume of calls.
    1. Set up metric collection and logs for analysis.
1. Immediately after deploying the Topics API, check your metrics to detect any severe end-user issues. Keep checking your metrics regularly.
1. In case of disruption or unexpected behavior, roll back the deployment and analyze your logs to understand and fix the issue.

{% Partial 'privacy-sandbox/topics-feedback.njk' %}
