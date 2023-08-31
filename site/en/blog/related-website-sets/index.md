---
layout: 'layouts/blog-post.njk'
title: Related Website Sets - the new name for First-Party Sets in Chrome 117
description: >
  Related Website Sets (RWS) is the new name for First-Party Sets. It also brings increased flexibility in defining sets.
date: 2023-08-31
thumbnail: 'image/80mq7dk16vVEg8BBhsVe42n6zn82/s3iDQJUgLZV25YbtYxs1.png'
alt: Privacy Sandbox logo
tags: 
  - privacy
authors:
  - helencho
---

Many Privacy Sandbox APIs are ramping up to General Availability (GA) in Chrome Stable in preparation for third-party cookie deprecation beginning in 2024. Some of these APIs will help preserve crucial cross-site cookie use cases, like [CHIPS](/docs/privacy-sandbox/chips/), and the API currently known as [First-Party Sets (FPS)](/docs/privacy-sandbox/first-party-sets/). In this post, we introduce Related Website Sets (RWS)—our new name for FPS that better reflects its purpose—and provide a refresher on key use cases along with an update on the associated subset domain limit. 


## Preserving critical user journeys

RWS is designed to minimize disruptions to specific user-facing features once Chrome starts limiting access to third-party cookies by default. Our goal is to allow users to browse the web with minimal disruption while still upholding the privacy goals of the Privacy Sandbox. To strike this balance, RWS targets specific use cases related to website functionality:

* The [ccTLD use case](https://github.com/WICG/first-party-sets/tree/main#defining-a-set-through-use-case-based-subsets) addresses breakages like the [login example](https://issuetracker.google.com/268390722) filed in our public tracker. Such cases are often addressed in the ecosystem through heuristic-based exceptions (See [ref 1](#ref-1)).
* The [service domain use case](https://github.com/WICG/first-party-sets/tree/main#defining-a-set-through-use-case-based-subsets) addresses a common developer practice to isolate sensitive functions (like supporting an authentication flow) from user-facing domains. Such cases may be addressed in the ecosystem through targeted [exceptions](https://searchfox.org/mozilla-central/rev/3002762e41363de8ee9ca80196d55e79651bcb6b/browser/extensions/webcompat/data/shims.js#686) (See [ref 2](#ref-2)).
*   The [associated domain use case](https://github.com/WICG/first-party-sets/tree/main#defining-a-set-through-use-case-based-subsets) provides more flexibility for the types of domains that may require third-party cookie access for critical user journeys (See [ref 3](#ref-3)). While the ccTLD and service domain use cases employ strict technical checks based on domain characteristics to minimize abuse, the associated domain uses a numeric limit. Read more about this in the next section.


## Associated domain limit increased to five domains 

Chrome previously proposed a numeric limit of three domains for the Associated Subset (plus one primary domain), in alignment with our objective to prevent widespread tracking abuse. We have heard feedback from web standards participants that the limit was too low for different types of use cases. 

We have decided to increase the associated domain limit to five domains (plus one primary domain) which best matches the most comparable implementation offered by another major browser (See [ref 4](#ref-4)). This will take effect beginning in Chrome 117.

Since RWS is not intended as an ads solution, we are not taking into consideration feedback on how to improve RWS to better serve ads use cases. For ads use cases, developers should explore using the Topics, Protected Audience, and Attribution Reporting APIs and provide feedback on them accordingly. 


## Users have a choice for extended use cases, beyond five associated domains

For user-impacting experiences that are not supported by this limit, Chrome is [working on a user prompting flow](https://github.com/cfredric/chrome-storage-access-api) that also leverages the Storage Access API (SAA), a standard adopted by other browsers. For use cases that need more than five associated domains, we encourage developers to evaluate how SAA may be supported in non-RWS contexts. We are following the Blink launch process separately for [this feature](https://groups.google.com/a/chromium.org/g/blink-dev/c/JHf7CWXDZUc/m/Dy2EElgvAgAJ), which will be rolling out in Chrome Desktop beginning in Chrome 117.


## Next steps

We're grateful for the ecosystem feedback that has helped shape the API so far. We have invested in RWS as a method of providing developers predictability, control, and agency in preserving the end user experience of the websites they build. We are excited to see how developers adopt and use RWS as we ramp up. The [submission process](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md) is currently live, and the [RWS JSON generator tool](https://goo.gle/rws-json-generator) is a great starting point to help with submissions.

Follow the [Intent to Ship thread](https://groups.google.com/a/chromium.org/g/blink-dev/c/7_6JDIfE1as/m/wModmpcaAgAJ) to track progress, and check out [these materials](/docs/privacy-sandbox/first-party-sets-integration/) for implementation guidance. 


{% Details %}

{% DetailsSummary %}

References

{% endDetailsSummary %}

1. <a id="ref-1"></a>There is general agreement across browsers that these cross-site cookie use-cases are necessary, but they have taken different approaches in enabling them. [Firefox](https://developer.mozilla.org/docs/Web/Privacy/Storage_Access_Policy#automatic_storage_access_upon_interaction) ([code](https://searchfox.org/mozilla-central/rev/3002762e41363de8ee9ca80196d55e79651bcb6b/dom/base/Document.cpp#16328)) and [Safari](https://webkit.org/blog/8311/intelligent-tracking-prevention-2-0/#:~:text=Temporary%20Compatibility%20Fix%3A%20Automatic%20Storage%20Access%20for%20Popups) ([code](https://searchfox.org/wubkat/rev/5b368793a8c0a3d99c6991fcd3ef96e3dbd2cf2a/Source/WebKit/NetworkProcess/Classifier/ResourceLoadStatisticsDatabaseStore.cpp#1266)) have both implemented the pop-up heuristic that addresses the breakage observed, for example in the [Nintendo login flow](https://issuetracker.google.com/268390722).
2. <a id="ref-2"></a>There are also multiple examples where browsers hard code exceptions to minimize disruption for users. Firefox grants [storage access on redirect flows between Microsoft Teams and login.microsoftonline.us](https://searchfox.org/mozilla-central/rev/3002762e41363de8ee9ca80196d55e79651bcb6b/browser/extensions/webcompat/data/shims.js#686). 
3. <a id="ref-3"></a>Firefox provides a ["shim" that will call requestStorageAccessForOrigin on behalf of facebook.com](https://searchfox.org/mozilla-central/source/browser/extensions/webcompat/shims/instagram.js) when the user logs in on instagram.com. An example of site grouping can also be seen in Safari's [hard coded exceptions](https://github.com/WebKit/WebKit/blob/a2db53cd97dc8136ac5c2a22d4cd2b53d0d717d6/Source/WebCore/platform/network/NetworkStorageSession.cpp#L395) to group storage access prompts for multiple domains.
4. <a id="ref-4"></a>Firefox [autogrants the first 5 requestStorageAccess calls made by a third-party site](https://developer.mozilla.org/docs/Web/API/Storage_Access_API#:~:text=Firefox%20only%20prompts%20users%20after%20an%20origin%20has%20requested%20storage%20access%20on%20more%20than%20a%20threshold%20number%20of%20sites) ([code](https://searchfox.org/mozilla-central/rev/c615dc4db129ece5cce6c96eb8cab8c5a3e26ac3/modules/libpref/init/StaticPrefList.yaml#4035)) that the user has visited before. In Chrome, the first five domains listed in the associated subset in addition to the same set's primary domain will have autogranted third-party cookie access through RWS.

{% endDetails %}
