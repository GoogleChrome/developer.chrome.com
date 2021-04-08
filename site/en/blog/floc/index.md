---
layout: 'layouts/blog-post.njk'
title: How to take part in the FLoC origin trial
authors:
  - samdutton
description: >
  Federated Learning of Cohorts (FLoC) provides a privacy preserving mechanism for interest-based ad selection. This article explains how to take part in the FLoC origin trial.
date: 2021-03-30
updated: 2021-04-07
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


To find out more about FLoC, see [What is Federated Learning of Cohorts (FLoC)](https://web.dev/floc).

## Take part in the origin trial

The trial will start in Chrome 89, and will be made available as a [third-party origin trial](https://web.dev/third-party-origin-trials/).  
You will need to [register](https://developer.chrome.com/origintrials/#/view_trial/213920982300098561) for a FLoC origin trial token.

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

The FLoC API is very simple: just a single method that returns a promise that resolves to an object providing the cohort `id` and `version`:  

``` js
document.interestCohort()
```

The cohort data made available looks like this:

``` json
    {
        "id": "14159",
        "version": "chrome.1.0"
    }
```

The FLoC API is available in Chrome 89 and above, but if you're not taking part in the origin trial, you will need to set flags and run Chrome from the command line. [Run Chromium with flags](http://www.chromium.org/developers/how-tos/run-chromium-with-flags) explains how to do this for different operating systems.  

1.  Start Chrome with the following flags:  

    ``` text
    --enable-blink-features=InterestCohortAPI 
    --enable-features="FederatedLearningOfCohorts:update_interval/10s/minimum_history_domain_size_required/1,FlocIdSortingLshBasedComputation,InterestCohortFeaturePolicy"
    ```

1.  Make sure third-party cookies are not blocked and that no ad blocker is running.
1.  View the demo at [floc.glitch.me](https://floc.glitch.me/).

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


## Find out more

+   [What is Federated Learning of Cohorts (FLoC)?](web.dev/floc)
+   [Getting started with Chrome's origin trials](https://web.dev/origin-trials/): a basic overview.
+   [Origin trials guide for web developers](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md): additional technical detail and an extensive FAQ.
+   [Origin trial explainer](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md): motivations and design for origin trial provision, with an extensive FAQ.
+   [Running an origin trial](https://www.chromium.org/blink/origin-trials/running-an-origin-trial): technical detail from a Chrome and Chromium perspective.
+   [Process for launching new features in Chromium](https://www.chromium.org/blink/launching-features): how new features make their way to browser implementation.

---

Photo by [Rhys Kentish](https://unsplash.com/@rhyskentish) on [Unsplash](https://unsplash.com/photos/I5AYxsxSuVA).
