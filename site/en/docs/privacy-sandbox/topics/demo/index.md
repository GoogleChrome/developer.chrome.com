---
layout: 'layouts/doc-post.njk'
title: 'Topics API demos'
subhead: >
  Try out the Topics API demos. 
description: >
  Try out the Topics API demos.
date: 2022-01-25
updated: 2022-02-01
authors:
  - samdutton
---

The Topics API demo provides a look at how topics are inferred from hostnames. You can preview what topics are observed when you visit a demo site which requires very little setup.

If you want to test the API with your users, sign up for the [Relevance and Measurement origin trial](LINK).

Our demo is a preview  that demonstrates most features of the Topics API, for you to gain familiarity with how the API is implemented.

## Test with chrome://flags or feature flags

There are two ways to try the Topics API as a single user, running Chrome 101 or above:

- Enable the API in the `chrome://flags/#privacy-sandbox-ads-apis` Chrome page:

    <figure>

    {% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/4kpW1PAuzrMrecSAR3tU.png", alt="Enable the Topics API using the chrome://flags/#privacy-sandbox-ads-apis page", width="800", height="246" %}
          <figcaption>Enable the Topics API using the chrome://flags/#privacy-sandbox-ads-apis page</figcaption>
    </figure>
[View a larger version](https://wd.imgix.net/image/RtQlPaM9wdhEJGVKR8boMPkWf443/4kpW1PAuzrMrecSAR3tU.png?auto=format&w=1600)


- Run Chrome from the command line with the following flags:
    ```text
    --enable-features=BrowsingTopics,PrivacySandboxAdsAPIsOverride,OverridePrivacySandboxSettingsLocalTesting
    ```

## The Topics API demo

The [Topics demo](https://topics-demo.glitch.me/) shows how to use additional flags to adjust settings, such as epoch length. If you access the Topics API by running Chrome with command-line flags, don't set `chrome://flags`, as these can override command-line settings.

[Run Chromium with flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags) explains how to set flags when running Chrome and other Chromium-based browsers from the command line, although this demo is specific to Google Chrome.

## The Topics API headers demo

The demo at [topics-fetch-demo.glitch.me](https://topics-fetch-demo.glitch.me/) shows how to use fetch() request and response headers to access topics and mark them as observed.

### Access the `Sec-Browsing-Topics` request header

Instead of using `document.browsingTopics()` from an iframe to view topics for a user, API callers can access observed topics from the `Sec-Browsing-Topics` request header of a [fetch() request](https://developer.mozilla.org/docs/Web/API/fetch) that includes `{browsingTopics: true}` in its options parameter—or from the same header of an [XHR request](https://developer.mozilla.org/docs/Web/API/fetch) that sets the `deprecatedBrowsingTopics` attribute to `true`.

For example:

```text
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

This example includes two topics from the [Topics taxonomy](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md), 186 and 265, along with each topic's version information

The [fetch()](https://chromium-review.googlesource.com/c/chromium/src/+/4044267) and [XHR](https://chromium-review.googlesource.com/c/chromium/src/+/4103742) implementations were first made available in Chrome 111.

Inclusion of the topics header in XHR requests is only available temporarily, and support will be removed in the future.


### Mark topics as observed with `Observe-Browsing-Topics`

If a request includes a `Sec-Browsing-Topics` header and the response to that request includes an `Observe-Browsing-Topics: ?1` header, then topics from the request header will be marked by the browser as observed. Observed topics are eligible for calculation by the Topics API. This mechanism is designed to match the functionality provided by using the JavaScript API from an iframe.


The screenshot below shows the topics recorded from visiting the sites on the API demo page. 


<figure>
  {% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/7GjvLNY86mBzeXPERRam.png", alt="Topics API demo page on glitch.me", width="656", height="566" %}
  <figcaption>Topics API demo page on glitch.me</figcaption>
</figure>

[View a larger version](https://wd.imgix.net/image/RtQlPaM9wdhEJGVKR8boMPkWf443/7GjvLNY86mBzeXPERRam.png?auto=format&w=1600)


This list shows the sites you can visit from the demo to record topics of interest. As you can see, the Arts & Entertainment/Humor category in the screenshot is not the topic of one of these websites, so this recorded topic is one that was added as the possible 5 percent random topics.

- pets-animals-pets-cats.glitch.me
- cats-cats-cats-cats.glitch.me
- cats-pets-animals-pets.glitch.me
- cats-feline-meow-purr-whiskers-pet.glitch.

You can check to see which topics are real and which are random on the Topics State tab of the `chrome://topics-internals` page. This screen shot shows an example from different browsing sessions.

<figure>
  {% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/Ef9ml82uPg3RdX5PX5QU.png", alt="ALT_TEXT_HERE", width="474", height="416" %}
  <figcaption>Topics State tab showing real and random topics</figcaption>
</figure>

[View a larger version](https://wd.imgix.net/image/RtQlPaM9wdhEJGVKR8boMPkWf443/Ef9ml82uPg3RdX5PX5QU.png?auto=format&w=1600)

## Next steps

If you’re an ad tech developer, [experiment and participate](/docs/privacy-sandbox/topics-experiment/) with the Topics API. Read the [developer guide](/docs/privacy-sandbox/topics/) for more in-depth resources.
