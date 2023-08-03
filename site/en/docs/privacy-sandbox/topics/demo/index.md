---
layout: 'layouts/doc-post.njk'
title: 'Topics API demos'
subhead: >
  Experiment and learn how topics are inferred from hostnames with minimal setup.
description: >
  Experiment and learn how topics are inferred from hostnames with minimal setup.
date: 2023-03-08
authors:
  - samdutton
---

## Implementation status
{% Partial 'privacy-sandbox/ps-implementation-status.njk' %}

The Topics API demo provides a look at how topics are inferred from hostnames. You can preview what topics are observed when you visit a demo site, which requires very little setup.

If you want to test the API with your users, sign up for the [Relevance and Measurement origin trial](/docs/privacy-sandbox/unified-origin-trial/).

Our demo is a preview that demonstrates most features of the Topics API, for you to gain familiarity with how the API is implemented.

You can also run the Topics [colab](/docs/privacy-sandbox/topics/colab) to try out the Topics [classifier model](/docs/privacy-sandbox/topics/topic-classification/#classifier-model).

The following video shows how the demo works.

{% YouTube
  id='hEBzWuXjeTQ'
%}

## Test with chrome://flags or feature flags {: #feature-flags}

There are two ways to try the Topics API as a single user; you'll need to be running Chrome 101 or above:

- Enable the API in the `chrome://flags/#privacy-sandbox-ads-apis` Chrome page:

    <figure>

    {% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/4kpW1PAuzrMrecSAR3tU.png", alt="Enable the Topics API using the chrome://flags/#privacy-sandbox-ads-apis page", width="800", height="246" %}
          <figcaption>The chrome://flags/#privacy-sandbox-ads-apis page where you can enable or disable the API. <a href="https://wd.imgix.net/image/RtQlPaM9wdhEJGVKR8boMPkWf443/4kpW1PAuzrMrecSAR3tU.png?auto=format&w=1600">View a larger version</a></figcaption>
    </figure>

- Run Chrome from the command line with the following flags:

    ```text
    --enable-features=BrowsingTopics,BrowsingTopicsParameters:time_period_per_epoch/15s/browsing_topics_max_epoch_introduction_delay/3s,PrivacySandboxAdsAPIsOverride,PrivacySandboxSettings3,OverridePrivacySandboxSettingsLocalTesting
    ```

{% Aside %}
Before starting Chrome using flags, quit any Chrome running processes or use "force quit."
{% endAside %}

## The Topics API demo

The [Topics demo](https://topics-demo.glitch.me/) shows how to use additional flags to adjust settings, such as epoch length. If you access the Topics API by running Chrome with command-line flags, don't set `chrome://flags`, as these can override command-line settings.

[Run Chromium with flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags) explains how to set flags when running Chrome and other Chromium-based browsers from the command line, although this demo is specific to Google Chrome.

## The Topics API headers demo

The demo at [topics-fetch-demo.glitch.me](https://topics-fetch-demo.glitch.me/) shows how to use `fetch()` request and response headers to access topics and mark them as observed.

### Access the `Sec-Browsing-Topics` request header {: #headers}

Instead of using `document.browsingTopics()` from an iframe to view topics for a user, API callers can access observed topics from the `Sec-Browsing-Topics` request header of a [fetch() request](https://developer.mozilla.org/docs/Web/API/fetch) that includes `{browsingTopics: true}` in its options parameter—or from the same header of an [XHR request](https://developer.mozilla.org/docs/Web/API/fetch) that sets the `deprecatedBrowsingTopics` attribute to `true`.

For example:

```javascript
fetch('https://topics-server.glitch.me', {browsingTopics: true})
    .then((response) => {
        // Process the response
 })
```

In browsers that support the API, the `fetch()` request will include a `Sec-Browsing-Topics` header that lists topics observed for the request URL hostname: in this example, `topics-server.glitch.me`.

If no topics have been observed for this hostname and this user, the header is included but the value is empty. In other words, the `Sec-Browsing-Topics` header on a `fetch()` request only includes topics that have been observed for the current user's browser by a caller whose origin matches the hostname of the request URL. This is the same as if you were calling `document.browsingTopics()` from an iframe to view observed topics for the current user.

The request header is sent on a request as long as it has the appropriate permission policy is in play, the context is secure, and user settings permit it. Topics are not provided in headers for navigation requests.

The Topics request header looks like this:

```text
Sec-Browsing-Topics: 186;version="chrome.1:1:2206021246";config_version="chrome.1";model_version="2206021246";taxonomy_version="1", 265;version="chrome.1:1:2206021246";config_version="chrome.1";model_version="2206021246";taxonomy_version="1"
```

This example includes two topics from the [Topics taxonomy](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md), 186 and 265, along with each topic's version information.

{% Aside 'note' %}
The [fetch()](https://chromium-review.googlesource.com/c/chromium/src/+/4044267) and [XHR](https://chromium-review.googlesource.com/c/chromium/src/+/4103742) implementations were first made available in Chrome 111. (Refer to these builds for more information.)
{% endAside %}

Inclusion of the topics header in XHR requests is only available temporarily, and support will be removed in the future.

### Mark topics as observed with `Observe-Browsing-Topics`

If a request includes a `Sec-Browsing-Topics` header and the response to that request includes an `Observe-Browsing-Topics: ?1` header, then topics from the request header will be marked by the browser as observed. Observed topics are eligible for calculation by the Topics API. This mechanism is designed to match the functionality provided by using the JavaScript API from an iframe.

The screenshot below shows the topics recorded from visiting the sites on the API demo page.

<figure>
  {% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/7GjvLNY86mBzeXPERRam.png", alt="Topics API demo page on glitch.me", width="656", height="566" %}
  <figcaption>The glitch.me demo for trying the API. <a href="https://wd.imgix.net/image/RtQlPaM9wdhEJGVKR8boMPkWf443/7GjvLNY86mBzeXPERRam.png?auto=format&w=1600">View a larger version</a></figcaption>
</figure>

This list shows the sites you can visit from the demo to record topics of interest. As you can see, the Arts &amp; Entertainment/Humor category in the screenshot is not the topic of one of these websites, so this recorded topic is one that was added as the possible 5 percent random topics.

- pets-animals-pets-cats.glitch.me
- cats-cats-cats-cats.glitch.me
- cats-pets-animals-pets.glitch.me
- cats-feline-meow-purr-whiskers-pet.glitch.

You can check to see which topics are real and which are random on the Topics State tab of the `chrome://topics-internals` page. This screenshot shows an example from different browsing sessions.

<figure>
  {% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/Ef9ml82uPg3RdX5PX5QU.png", alt="The Topics state tab provides information on topics observed.", width="474", height="416" %}
  <figcaption>Topics State tab showing real and random topics. <a href="https://wd.imgix.net/image/RtQlPaM9wdhEJGVKR8boMPkWf443/Ef9ml82uPg3RdX5PX5QU.png?auto=format&w=1600">View a larger version</a></figcaption>
</figure>

## Next steps

If you're an ad tech developer, [experiment and participate](/docs/privacy-sandbox/topics-experiment/) with the Topics API. Read the [developer guide](/docs/privacy-sandbox/topics/) for more in-depth resources.

{% Partial 'privacy-sandbox/topics-feedback.njk' %}
