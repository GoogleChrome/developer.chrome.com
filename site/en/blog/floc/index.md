---
layout: 'layouts/blog-post.njk'
title: How to take part in the FLoC origin trial
authors:
  - samdutton
description: >
  Federated Learning of Cohorts (FLoC) provides a privacy preserving mechanism for interest-based ad selection. This article explains how to take part in the FLoC origin trial.
date: 2021-03-30
updated: 2021-04-22
hero: image/80mq7dk16vVEg8BBhsVe42n6zn82/cfY1L58Z3w2xzCOo3Ayx.jpg
alt: Murmuration of starlings over Brighton pier
tags:
  - privacy
  - security
---


Federated Learning of Cohorts (FLoC) provides a privacy-preserving mechanism for interest-based ad 
selection. As a user moves around the web, their browser uses the FLoC algorithm to work out its 
"interest cohort", which will be the same for thousands of browsers with a similar recent browsing 
history. The user's browser is associated with one interest cohort at a time and recalculates its 
cohort periodically (currently once every seven days during this initial origin trial) on 
the user's device, without sharing individual browsing data with the browser vendor or anyone else. 

{% Aside %}
During the current FLoC origin trial, a page visit will only be included in the browser's FLoC 
computation for one of two reasons: 
* The FLoC API (`document.interestCohort()`) is used on the page. 
* Chrome detects that the page [loads ads or ads-related resources](https://github.com/WICG/floc/issues/82). 

For other clustering algorithms, the trial may experiment with different inclusion criteria: that's 
part of the origin trial experiment process.
{% endAside %}

To find out more about FLoC, see [What is Federated Learning of Cohorts?](https://web.dev/floc).

## Take part in a FLoC origin trial

An origin trial for FLoC started in Chrome 89, and has been made available as a [third-party origin trial](https://web.dev/third-party-origin-trials/). 

To take part, you will need to [register](https://developer.chrome.com/origintrials/#/view_trial/213920982300098561) for a FLoC origin trial token.

{% Aside %}
The initial testing of FLoC is taking place with a [small percentage of users](https://blog.google/products/chrome/privacy-sustainability-and-the-importance-of-and/#jump-content:~:text=The%20initial%20testing%20of%20FLoC%20is%20taking%20place%20with%20a%20small%20percentage%20of%20users), and FLoC is subject to [origin trial usage limits](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#19-are-there-any-usage-limits-on-experimental-features). This means that initially during the 
current trial you will only be able to access the user's cohort (with `document.interestCohort()`) for a small proportion of visits to pages on your site that include your origin trial token. Alternatively, you can test the FLoC API locally by [setting browser flags](#enable-floc-with-browser-flags).
{% endAside %}


### First-party context

To access interest cohort data on your own site(s), add the origin trial token to your web pages, using one of the following methods:

+   As a meta tag in the &lt;head&gt; of each page served:  
  
    `<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">`

+   As an HTTP header:  
  
    `Origin-Trial: TOKEN_GOES_HERE`

With this in place, you can try out FLoC in a first-party context: for example, to observe cohorts for visitors to your site(s).

### Third-party context

You will need to inject the origin trial token in a meta tag in order to test the FLoC API in your code on third-party sites. [Origin Trials Guide for Web Developers](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#16-can-i-provide-tokens-by-running-script) explains how to do this. 

### Submit feedback

Do this through Chrome's [origin trial site](https://developer.chrome.com/origintrials/#/trials/active). This feedback is not public and is available only to a limited group of people on the Chrome team.   
When your token expires, you will get an email with a renewal link. Before renewing the token, you are again asked to submit feedback.

## Try out FLoC as a web developer

There are two ways to try out FLoC during the origin trial: 
* Enable FLoC for your browser by setting browser flags.
* Use a browser that is included in the trial.

### Enable FLoC with browser flags

The FLoC API is very simple: just a single method that returns a promise which resolves to an object providing the cohort `id` and `version`:  

``` js
document.interestCohort()
```

The cohort data made available looks like this:

``` json
{
  "id": "14159",
  "version": "chrome.2.1"
}
```

The FLoC API is available in Chrome 89 and above, but if your browser is not included in the origin 
trial, you will need to run Chrome with flags in order to try out the API. [Run Chromium with flags](http://www.chromium.org/developers/how-tos/run-chromium-with-flags) explains how to do this for different operating systems.  

1.  Start Chrome with the following flags. Make sure to copy all the text!<br> <br>  

    ``` text
    --enable-blink-features=InterestCohortAPI 
    --enable-features="FederatedLearningOfCohorts:update_interval/10s/minimum_history_domain_size_required/1,FlocIdSortingLshBasedComputation,InterestCohortFeaturePolicy"
    ```
    <br>

1.  Check that third-party cookies are not blocked and that no ad blocker is running.
1.  View the demo at [floc.glitch.me](https://floc.glitch.me/) or run the following code from the 
DevTools console:<br><br>

    ``` js
    await document.interestCohort()
    ```

#### What do the experimental flags mean?

* `InterestCohortAPI` enables FLoC.
* `update_interval/10s` sets the cohort to be recalculated every 10 seconds. This is only to enable 
testing; the cohort recalculation interval currently defaults otherwise to every seven days.
* `minimum_history_domain_size_required/1` specifies the minimum number of domains that must be 
available in order for the cohort to be computed. The value here is for testing only and normally 
would be higher.
* `FlocIdSortingLshBasedComputation` sets the clustering algorithm used by FLoC.
* `InterestCohortFeaturePolicy` enables the availability of the [Permissions-Policy header for FLoC](#how-can-websites-opt-out-of-the-floc-computation).
* It is also possible to [set the FLoC version](https://github.com/WICG/floc/issues/90#issuecomment-814389410) 
by using a value such as `"FederatedLearningOfCohorts:finch_config_version/2"`. 

You can view FLoC flag code in [Chromium Code Search](https://source.chromium.org/chromium/chromium/src/+/master:components/federated_learning/features/features.cc?q=minimum_history_domain_size_required&ss=chromium).

{% Aside %}
The codebase for Chrome has two different lists of features:
* `--enable-features` is for Chromium browser features.
* `--enable-blink-features` is for Blink.

You have to use the correct flag depending on which list your feature is in (though some are in both!)

[Blink features](https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/platform/runtime_enabled_features.json5;l=108?q=runtime_enabled_features.json5%20&ss=chromium) with `status=experimental` 
can also be enabled by using the Experimental Web Platform features flag in Chrome: 
chrome://flags/#enable-experimental-web-platform-features.
{% endAside %}


### Check if your browser is included in the origin trial

During the origin trial, FLoC is enabled by default for [a small percentage of browsers](https://blog.google/products/chrome/privacy-sustainability-and-the-importance-of-and/#jump-content:~:text=The%20initial%20testing%20of%20FLoC). 
For these browsers, the FLoC API is made available without requiring flags to be set. You can check 
if your browser is included in the trial by trying out one of the two demos below. Each of these 
uses a different method to provide an origin trial token.

* Meta tag: [floc-ot-meta.glitch.me](https://floc-ot-meta.glitch.me)
* HTTP header: [floc-ot-header.glitch.me](https://floc-ot-header.glitch.me)


## Try out FLoC as a publisher, advertiser or adtech platform

The [FLoC API explainer](https://github.com/WICG/floc) suggests use cases, but does not define how the API should be used. Different sites and services will have different constraints and requirements for using FLoC to provide relevant content and ads.   
  
If you manage your own technology for content recommendations, advertising or marketing services then you could apply your FLoC insights to tailor content or marketing messages to specific cohorts.  If you rely on third party companies to provide these services then it might make more sense for them to join the origin trial and run experiments including your site and other sites.  
  
As an example, for a publisher finding ways to select relevant content, the process of trying out FLoC during the origin trial might work something like this:

1.  Collect data about site usage and cohort IDs.
1.  Analyze the data for correlations. Use the data to select relevant content. 
1.  Compare the FLoC approach against other mechanisms. Did it work the way you expect it?
1.  Adjust the use of FLoC to select content.
1.  Provide origin trial feedback.
1.  Repeat.


## How can websites opt out of the FLoC computation?

A site should be able to declare that it does not want to be included in the user's list of sites for cohort calculation. A new `interest-cohort` [permissions policy](https://www.w3.org/TR/permissions-policy-1/) enables this. The policy will be `allow` by default.  

For any frame that is _not_ allowed `interest-cohort` permission, the promise returned when it calls `document.interestCohort()` will reject. If the main frame does not have `interest-cohort` permission then the page visit will not be included in interest cohort calculation.  

For example, a site can opt out of all FLoC cohort calculation by sending the HTTP response header:  

``` text
Permissions-Policy: interest-cohort=()
```  

During the FLoC origin trial, pages on websites that don't opt out will be included in the FLoC 
calculation if Chrome detects that they load [ads-related resources](https://chromium.googlesource.com/chromium/src/+/master/docs/ad_tagging.md) or if they use `document.interestCohort()`. Pages served from private IP addresses, 
such as intranet pages, won't be part of the FLoC computation.

{% Aside %}  
[Ad Tagging in Chromium](https://chromium.googlesource.com/chromium/src/+/master/docs/ad_tagging.md) explains how Chrome's ad detection mechanism works.  
{% endAside %}

### Why are pages that have ads or ads-related resources included in FLoC cohort computation during the initial origin trial?

Origin trials give developers a chance to see what a new API proposal would be like *if* it were 
launched. For FLoC, how can we enable the API to be evaluated realistically before it has wide 
adoption? For the small-scale origin trial experiment, Chrome chose to make the assumption that 
every page which uses ads would use FLoC. This is unlikely to be completely realistic, but is the 
most plausible heuristic available.


## Find out more

+   [What is Federated Learning of Cohorts (FLoC)?](web.dev/floc)
+   [Getting started with Chrome's origin trials](https://web.dev/origin-trials/): a basic overview.
+   [Origin trials guide for web developers](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md): additional technical detail and an extensive FAQ.
+   [Origin trial explainer](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md): motivations and design for origin trial provision, with an extensive FAQ.
+   [Running an origin trial](https://www.chromium.org/blink/origin-trials/running-an-origin-trial): technical detail from a Chrome and Chromium perspective.
+   [Process for launching new features in Chromium](https://www.chromium.org/blink/launching-features): how new features make their way to browser implementation.

---

Photo by [Rhys Kentish](https://unsplash.com/@rhyskentish) on [Unsplash](https://unsplash.com/photos/I5AYxsxSuVA).
