---
title: 'Can browsers optimize the loading of third-party resources?'
description: >
  Driving changes for better loading of third-party resources on the web
layout:
  'layouts/blog-post.njk'
date: 2022-08-17
authors:
  - addyosmani
hero: 'image/1L2RBhCLSnXjCnSlevaDjy3vba73/kng4NSnIkUQ9BU4RLT3p.jpeg'
alt: >
  A mechanic standing in front of a car with the hood open. The mechanic has turned to the camera for a smile.
tags:
  - performance
  - news
---

[Third-party](https://almanac.httparchive.org/en/2021/third-parties) resources (such as embeds and scripts) are heavily used across the web today. They provide out-of-the-box solutions for embedding social media, videos, analytics, live chat, advertising, A/B testing, personalization, and others. Third-party embeds are a necessary part of modern websites that allow site owners to focus on their core competencies, while offloading standard but critical functions to external providers.

When both first party and third parties on a web page work in harmony, it is possible for a page to deliver a great user-experience. However, this requires significant effort from both engineering and business teams and is often overlooked, resulting in less than performant web pages and a [negative impact](https://web.dev/third-party-javascript/#performance) to user-centric metrics such as the [Core Web Vitals](https://web.dev/vitals/). This is detrimental to both parties and creates missed opportunities in businesses. Could we do better here?

We have a future vision of the web where third-party scripts and resources provide the intended business value with minimal regression to the performance or user experience of websites that use them in the browser. This would allow users to ideally experience faster page loads.

Over the last year, we have considered, discussed, and experimented with many possibilities that can potentially protect the user experience from the detrimental impact of third-party scripts without reducing their business value to site owners.

Through this post, we wish to share information about some of our experiments. We hope this is the beginning of a process that will encourage transparency and visibility between user agents, businesses, and third-party providers and pave the path to a faster web.

## A deeper look at third-parties

A third-party is a resource served by a provider external to the site. They are not directly within the site owners' control, but present with their approval. Third-party resources are:

-   Hosted on a shared and public origin different from the primary site origin.
-   Not authored or influenced by an individual site owner.
-   Widely used by a variety of sites.

From helping to generate revenue (via ads) to providing better marketing opportunities (social media embeds), third-parties serve a wide variety of business objectives. Common categories of third-parties include the following:

Source: [Third-parties by category](https://github.com/patrickhulce/third-party-web/#third-parties-by-category).

<table class="with-heading-tint">
  <thead>
    <tr>
      <th>
<strong>Category</strong></th>
      <th>
<strong>Definition</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
Advertising</td>
      <td>
Scripts used for serving ads or measuring ad performance.</td>
    </tr>
    <tr>
      <td>
Video</td>
      <td>
Scripts that enable video player and streaming functionality.</td>
    </tr>
    <tr>
      <td>
Hosted libraries</td>
      <td>
A mixture of publicly hosted open source libraries.</td>
    </tr>
    <tr>
      <td>
Content</td>
      <td>
Scripts from content providers or publishing-specific affiliate tracking.</td>
    </tr>
    <tr>
      <td>
Customer Success</td>
      <td>
Scripts from customer support/marketing providers that offer chat and contact solutions.</td>
    </tr>
    <tr>
      <td>
Hosting</td>
      <td>
Scripts from web hosting platforms.</td>
    </tr>
    <tr>
      <td>
Marketing</td>
      <td>
Scripts from marketing tools that add popups, newsletters, and others.</td>
    </tr>
    <tr>
      <td>
Social</td>
      <td>
Scripts that enable social features.</td>
    </tr>
    <tr>
      <td>
Tag Manager</td>
      <td>
Scripts that load many other scripts and initiate many tasks.</td>
    </tr>
    <tr>
      <td>
Analytics</td>
      <td>
Scripts that measure or track users and their actions.</td>
    </tr>
    <tr>
      <td>
Cookie Consent Platform</td>
      <td>
Scripts that allow sites to obtain the user consent (GDPR, ePR, CCPA) in an informed and transparent way.</td>
    </tr>
    <tr>
      <td>
Utility</td>
      <td>
Scripts that are developer utilities (API clients, site monitoring, fraud detection, and others.</td>
    </tr>
    <tr>
      <td>
Other</td>
      <td>
Miscellaneous scripts delivered via a shared origin with no precise category or attribution.</td>
    </tr>
  </tbody>
</table>

These third-party scripts and libraries allow web developers to leverage tried and tested solutions to implement standard features instead of re-inventing the wheel. Thus, third-parties reduce development time and help businesses launch or upgrade their products faster. It is no wonder then that more than [94% of all websites](https://almanac.httparchive.org/en/2021/third-parties#fig-5) on desktop and mobile use third-parties.

# How do third-parties impact performance?

Ideally, developers of third-parties are subject matter experts for the specific features they provide. Most popular third-parties have undergone several iterations, and one can expect their code to be optimized for their own business goals, which may or may not include the performance of pages using them. However, we do know that even the most well-optimized third-parties [affect performance](https://almanac.httparchive.org/en/2021/third-parties#popular-third-parties-and-their-impact-on-render). Here are the main reasons for this impact:

1.  **Size and Script Execution Costs**: Third-parties often aim to provide significant functionality "just" by dropping in a `<script>` or `<iframe>` element into your page. These elements then pull in scripts and resources that are significant in size and take longer to download and execute. Too much JavaScript keeps the main thread busy longer, blocks rendering, and delays user interactions. Some of the top third-parties have been known to block the main thread from [42 ms to 1.6 s](https://almanac.httparchive.org/en/2021/third-parties#fig-14) for more than 50% of the sites analysed. A blocked main thread results in a high [Total Blocking Time (TBT)](https://web.dev/tbt/) which is one of the metrics that affects the performance score for the site. Additionally, it also delays response to user interactions and degrades the [Interaction to Next Paint (INP)](https://web.dev/inp/) metric used to measure the responsiveness of websites. Thus, script execution costs have a significant impact on performance.

2.  **Number**: On average, websites use around [21 different third-parties](https://almanac.httparchive.org/en/2021/third-parties#fig-4) on mobile and web. Often, third-party tags are added by tag management tools that are not directly controlled by the technical/development teams. Tags which are not required may be added by other teams without a review process and never get removed. These can significantly impact user experience, page weight, or CPU utilisation. Establishing a [governance process](https://web.dev/controlling-third-party-scripts/) can address such situations and allow developers to audit each provider's impact. It would help if developers had ready data available for all third-parties that provide a specific function with their performance impact, benefits, and trade-offs for comparison. Another challenge teams face is that for many sites, their third-party tags only run in production but not in their development environments, making it more challenging for developers to test them.

3.  **Network**: Since third-parties are hosted on different origins, browsers have to make a larger number of connections to download content from them. The different connections cannot coordinate download based on priority, resulting in network contention. This can further delay the page load if [the proper optimizations](https://web.dev/preconnect-and-dns-prefetch/#:~:text=Adding%20rel%3Dpreconnect%20to%20a,time%20the%20browser%20requests%20them.) are not considered.

4.  **Sequencing**: Third-parties can block the main thread and contend with bandwidth for more critical resources. That said, in some cases, third-parties are the critical resources required for rendering the page. Optimal sequencing of the first and third party resources becomes necessary when websites use multiple third-parties. Web developers should be aware of the different [options](https://web.dev/script-component/#sequencing-third-party-scripts-without-a-framework-component) available to optimize sequencing.

As a consequence of the above, third-parties can affect any or all components of Core Web Vitals. A majority of third-parties negatively impact [Largest Contentful Paint (LCP)](https://web.dev/lcp/) and [First Input Delay (FID)](https://web.dev/fid/). [YouTube embeds block the main thread](https://almanac.httparchive.org/en/2021/third-parties#fig-15) for 4.5 seconds for 10% of the websites on mobile, and at least 1.6 seconds for 50% of the websites studied. Imagine a user's frustration if they came across a page with 20 such scripts on a slow connection. The following visualization from [thirdpartyweb.today](https://www.thirdpartyweb.today/) shows third-parties with the largest performance impact at present.

{% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/U26McnxB3ZYKJ2zE0Zp4.png", alt="Third Party Web visualization", width="800", height="500" %}

"Across top ~4 million sites, ~2700 origins account for ~57% of all script execution time with the top 50 entities already accounting for ~47%". - [third-party-web](https://github.com/patrickhulce/third-party-web)

Pages that render quickly and become interactive within a reasonable timeframe are essential to a good user experience as measured by the Core Web Vitals. Good UX often translates to good business for websites, which can mean good business for third-parties being used. Working together to reduce the impact of third-parties can be a win for everyone in the chain.

We acknowledge that Google vends a number of commonly used third-party scripts, including Google Tag Manager, YouTube embeds, and ReCaptcha to name a few. We acknowledge that a number of our scripts could have a lighter performance impact on the Core Web Vitals, and we are committed to exploring ways to improve this impact where possible.

# How can Chrome help?

Third-party resources being poor for performance is regularly a challenge for developers, requiring a step-change in the underlying ecosystem dynamics. Chrome wants to explore this space to achieve the following outcomes:

1.  **Find better ways of loading third-party resources on the web while not regressing user-experience or business outcomes.**

    We know that we cannot proceed far in this effort if we don't collaborate with partners, businesses, third-parties, and developers. We want to create an open field to discuss the possibilities and exchange ideas via public explainers and specifications. Developers will have time to provide feedback and test the impact of many of these proposals.

2.  **Enable users of third-party scripts to have better attribution for their costs in tooling and in the field, clear, well-paved paths for their usage, and better incentives during authoring time to ensure they are optimal by default.**

    We want to enhance all layers, such as user agents, frameworks, and third-party scripts to reduce the performance impact of third-parties. We intend to also provide sufficient insights to help site owners employ best practices around each script embedded, including faster alternatives where applicable.

## Proposed Approach

We propose a three-pronged approach for achieving these outcomes...

1.  **Give ***developers*** deeper attribution into per third-party impact via RUM and in Chrome's developer tooling.**

    RUM refers to real user metrics data (also known as [field data](https://web.dev/lab-and-field-data-differences/#field-data)) available through [web performance monitoring APIs](https://web.dev/vitals-measurement-getting-started/#collecting-rum-data). Chrome's developer tooling includes Lighthouse, Chrome DevTools and the Chrome User Experience Report. We propose to enhance the available APIs and tools so that site developers understand the impact of every third-party they have used on every page. The tools will also educate them about actions they can take to mitigate the impact (for example, deferring them or using [facades](https://web.dev/third-party-facades/)) and explore other potential solutions (other third-parties or DIY) with trade-offs. For the web performance monitoring APIs, we're exploring ways in which we can expand their coverage of cross-origin resources without compromising our users' privacy and security.

2.  **Give ***businesses*** a well-lit path for efficiently loading third-party resources.**

    We would like to propose new standards that encourage browsers to more intelligently make trade-offs between how first-party and third-party resources are loaded in the name of a better loading experience for users. Later, we'll highlight some of these proposals, such as lazy-loading third-party embeds by default, or applying different resource prioritization to third-party resources that may not be as critical to the initial content users may care about most. These are just a small number of the ideas we're evaluating in this space and would love to collaborate with both web performance experts and the broader community on shaping this work.

    We would similarly like to address such problems in JavaScript frameworks and Content Management Systems (CMS) where more appropriate. Projects such as [Aurora](http://web.dev/aurora) and [WordPress Performance Team](https://github.com/WordPress/performance) have taught us the importance of baked-in defaults that resolve known loading issues. Defaults baked into frameworks and CMS guide businesses along a well-lit path. They can also be helpful to the user agent (for example, Chrome) as hints allowing it to apply heuristics to optimize page load and CWV. Such hints can help the user agent decide when and how specific third-parties should load in the page life cycle. (For example, the [Next.js script component](https://web.dev/script-component/#the-next.js-script-component) has a baked-in default to load third-party scripts after the page becomes interactive.)

3.  **Give ***third-parties*** incentives to reduce their performance impact via better transparency efforts.**

    Third-party developers currently lack the visibility required to understand the impact of their scripts on sites at large. We plan to address this issue and equip these providers with tools to analyze their impact and compare it with other products in the market that provide the same value. We also want to help them use the data to diagnose what causes the impact so that they can mitigate it upstream. We will have to call out all third-parties, including those authored by Google, to succeed.

## Challenges

An effort of this magnitude is not without challenges. Some of the key challenges we have to consider are.

* Third-parties are a cross-cutting problem involving ads, analytics, tag management, utilities, and many others. Each area requires consideration of a unique set of requirements and trade-offs. For example:
  * The decision to optimize the loading of ads depends on a trade-off between revenue and user experience. Too early, they block valuable content; too late, the user would miss seeing them.
  * Analytics scripts add to the page weight but provide valuable data about user actions to the business.

We hope to partner with various categories of third-parties, grasp the nuances involved, resolve trade-offs, and develop incentives that work for all. We realize that we have to work separately with entities in every area for our strategy to be effective. This includes our internal partners such as Google Tag Manager, Google Ads, and YouTube.

2.  We want to provide deeper attribution to both site developers and third-party developers. This requires a conscientious effort where we identify what data is most relevant in measuring impact, attribute it accurately and granularly, and provide the right path forward. Ultimately, the calculation of how a given third-party performs against its competition should be transparent to all.

3.  We propose to enhance Chrome so that it can apply optimizations that help strike the right balance for prioritizing the loading of first vs. third-party resources. A valuable change becomes available as a standard across all browsers, but it takes time. For example, the [`loading`](https://developer.mozilla.org/docs/Web/HTML/Element/img#attr-loading) attribute for `<img>` and `<iframe>` elements has been available in Chrome/Edge since 2019, but became available in Safari only in 2022. Until a feature is standardized, users of third-party resources will have to ensure that they have optimized for other browsers too. We will help by highlighting this in our guidance where relevant.

4.  To execute on this project, we will have to engage with partners and developers to not only help us understand specific requirements, but also to test experimental solutions at scale, provide feedback, iterate and improvise as and when required. The changes will have to be planned, allowing for a reasonable time frame for testing and evaluation.

## Initial Standards Proposals

We have performed some initial experiments to develop features that can be enabled to optimize the third-party loading process. We are pleased with the results observed and can presently discuss two of these features.

### LazyEmbeds

Chrome would previously [lazy-load](https://blog.chromium.org/2019/10/automatically-lazy-loading-offscreen.html) offscreen `<img>` and `<iframe>` elements for our [Lite Mode](https://support.google.com/chrome/answer/2392284?hl=en&co=GENIE.Platform%3DAndroid) users. This feature could be extended to all users to defer the loading of `<iframe>` elements determined to be third-party embeds until the user scrolls near them. This could speed up the loading of other parts of the page, improve Core Web Vitals, reduce memory usage and save data.

Here is a demo using LazyEmbeds to lazy load YouTube videos on a page. A single YouTube video embed typically adds 500-600KB of JavaScript to the page. We tried to optimize a blog post with 14 such video embeds using LazyEmbeds. The results were promising across page-load time and data-savings.

<table>
  <thead>
    <tr>
      <th></th>
      <th><strong>Before</strong></th>
      <th><strong>After</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Data</strong></td>
      <td>15.4 MB</td>
      <td>6.1 MB</td>
    </tr>
    <tr>
      <td><strong>Total Blocking Time</strong></td>
      <td>3.2 seconds</td>
      <td>1.6 seconds</td>
    </tr>
  </tbody>
</table>

{% YouTube id='Ptf-eK3R3nA' %}

To learn more about this work, see our explainer and blink-dev [intent-to-experiment thread](https://groups.google.com/a/chromium.org/g/blink-dev/c/PhLkO3KITyw) and [experiment extension](https://groups.google.com/a/chromium.org/g/blink-dev/c/DjYa9xaoHhs).

### Targeted third-party Throttling

Third-party scripts are often added by various teams without holistic oversight processes. The engineering team at [The Telegraph](https://medium.com/the-telegraph-engineering/improving-third-party-web-performance-at-the-telegraph-a0a1000be5) articulated that "everyone wants 'that tag' on a page which will make the organization money". This can continuously increase the burden of managing the performance impact.

Targeted third-party script throttling proposes to throttle very specific kinds of third-parties to mitigate their impact. This would allow browsers to load key content + critical third-parties early, while those safe to load later are throttled.

{% YouTube id='oU-TRpghG20' %}

### Enhancing RUM APIs

We are also considering enhancing RUM APIs to include information that would be relevant in assessing third-party performance. Enhancements include the following:

1. `<iframe>` reporting: We are working on solutions that can leverage the [Performance Timeline](https://developer.mozilla.org/docs/Web/API/Performance_Timeline) API for cross-frame reporting. This would allow authors of the top-level page to inspect performance data for a cooperating third-party iframe that is embedded on the page.

2. Long Task attribution: The [Long Tasks API](https://w3c.github.io/longtasks/#dom-performancelongtasktiming-attribution) in RUM will help site owners identify long tasks that tie up the main thread for a long time and delay interaction.

## Further updates

We are still experimenting with many such ideas and hope to publish GitHub explainers and specification drafts for changes as we move along. Third-parties and site-owners who wish to partner with us or leave feedback can contribute to discussions through these. Third-parties can also start focussing on optimizing for Core Web Vitals and INP metrics to ensure that poor Core Web Vitals/INP data is not attributed to them. For now, those actively looking for updates can refer to posts on the [blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev) group.

We look forward to exploring this problem space further and engaging with the community on our learnings.

*With special thanks to Leena Sohoni-Kasture, Jeremy Wagner, Gilberto Cocchi, Kenji Baheux, Kouhei Ueno, Kentaro Hara, Alex N. Jose, Melissa Mitchell, Yoav Weiss, Shunya Shishido, and Minoru Chikamune for their feedback and contributions.*
