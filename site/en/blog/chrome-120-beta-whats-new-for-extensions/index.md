---
layout: 'layouts/blog-post.njk'
title: What's new in Chrome 120 for Extensions
description: >
  A summary of important changes in Chrome 120 for Chrome Extension developers.
subhead: >
  Chrome 120 is now available in beta and includes many exciting updates for Chrome Extension developers. 
date: 2023-11-02
hero: 'image/6hHqS5auVgWhN0cQNQztaJx5w4M2/yNTK9kjwbKdM0ZFcqnui.png'
alt: 'Chrome 120 Beta'
authors:
  - sebastianbenz
tags:
  - extensions-news
---

It’s been a busy year for the Chrome Extensions team. With yesterday’s [Chrome 120 Beta release](/blog/chrome-120-beta/), the extensions platform is making another big step forward.  For an overview on what’s happened this year, check out our quarterly updates from 
[July](/blog/extension-news-july-2023/) and [October](/blog/extension-news-october-2023/). Read on for what's new in Chrome 120 for Extensions.

## Closing the platform gap

With the release of Chrome 120, we will close the remaining platform gaps listed on our [Manifest V3 known issues page](/docs/extensions/migrating/known-issues/). The new userScript API  as well as support for fileHandler on ChromeOS have been the two remaining items on the list that we can now cross off, Together with the changes described in the previous quarterly update we are really happy about the current state of the Chrome extension platform and what we’ve accomplished over the past year.

## New userScripts API

User script support has landed! User scripts are (usually relatively small) snippets of code that extensions can inject into web pages in order to modify the page's appearance or behavior. They can be created directly by the user or discovered in a number of different user script repositories around the web. Starting with Chrome 120 Manifest V3 extensions can now manage the collection of user scripts and determine when and how to inject them on web pages. 

There is one significant difference between user script support in Manifest V2 and Manifest V3. As user scripts are powerful and require high trust in the author of the user script, the Chrome team decided that users must opt into Developer mode before they can run a user script. 

{% Img src="image/6hHqS5auVgWhN0cQNQztaJx5w4M2/ktS60KiJNxwjd3PSIEkb.png", alt="Screenshot showing the extensions management tab", width="800", height="164", class="screenshot screenshot--filled" %}




Our new [userScript sample](LINK) demonstrates a simple approach for detecting whether Developer mode is enabled and providing a simple onboarding flow.



<figure>
{% Img src="image/6hHqS5auVgWhN0cQNQztaJx5w4M2/Fh4eS4ovF8QboLiwLhY4.png", alt="Sample onboarding flow for user scripts.", width="800", height="401" %}
<figcaption>Onboard users when Developer mode is disabled</figcaption>
</figure>

To get started check out the [documentation](LINK) or take a look at the [official sample](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/userScripts).

## Increased DNR limits

Declarative Net Request (DNR) got two big updates this Chrome release. 

### Higher static DNR ruleset limits

The first update is big: higher static DNR ruleset limits.  We significantly increased the limit on enabled static rulesets from 10 to 50. Additionally, we increased the total number of allowed static rulesets from 50 to 100. This is in response to feedback we received in the Web Extensions Community Group.

###  Higher dynamic rule limits

The second update is even bigger: we are introducing the concept of safe rules in DNR, which allows extensions to increase the limit on the number of rules that can be added at runtime.

It helps to first understand dynamic rules in general. The [`declarativeNetRequest`](/docs/extensions/reference/declarativeNetRequest/) API allows extensions to define rules which block or modify requests. Extensions can bundle rules with their extension, or they can add up to 5000 rules at runtime. One of the reasons for limiting the number of rules added at runtime is to mitigate the risks of unreviewed rules acting on requests, as some DNR rules can potentially be abused. Redirects, for example, can be used for phishing or affiliate link fraud. The risk is even higher when rules are loaded dynamically at runtime without being reviewed by the Web Store team.

But it turned out that the initial limit of 5000 dynamic rules was too low. AdGuard reported that more than 2600 changes are made to popular lists each week, and of the 5% of users using custom filter lists, one in four of those users have a combined total of more than 5,000 custom rules across them (source). Adguard noted this as a significant challenge for migrating their extension to MV3 and we heard similar feedback from other ad blockers.

We determined that some DNR rules such as "block" or "allow" are much safer and are less likely to be abused. The good news is, these rules make up the large majority of adblock filter rules, for example, 98-99% of all AdGuard’s filter rules are block rules. By raising the limit for dynamic rules only for these safe rules, we can provide more flexibility for ad blockers, while still keeping the same security guarantees as before - and this is what we’re doing in Chrome 120.

Starting with Chrome 120, there is a new dynamic rule limit of 30000 for safe DNR rules, which we are defining as rules with an action of “block”, “allow”, “allowAllRequests” or "upgradeScheme". This is available in Chrome as the [MAX_NUMBER_OF_DYNAMIC_RULES](/docs/extensions/reference/declarativeNetRequest/#property-MAX_NUMBER_OF_DYNAMIC_RULES) constant. The rule limit for all other DNR rules stays at 5000. We still keep an upper limit to avoid performance regressions. We are optimistic that this new limit will enable ad blockers to continue to provide their functionality in the Manifest V3 version of their extension. 

As part of this work, we made some additional changes such as enforcing the limits on dynamic and session rulesets separately to align with Firefox. For more information, see our proposal.

What makes me personally really happy about this change is how quickly it landed. [Oliver](https://twitter.com/oliverdunk_) wrote the initial proposal in August following his discussions with different ad blockers. It’s now landing in Chrome - two months later! 🎉

## New ReadingList API

Chrome introduced the reading list in 2021. Last year, the Chrome team made access to the reading list even easier via the side panel. With Chrome 120 we are adding the ability for Chrome Extensions to create, read, update, and delete reading list entries. To learn more, checkout the [API docs](/docs/extensions/reference/readingList/) and our [new sample](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/readingList).

<figure>
{% Img src="image/6hHqS5auVgWhN0cQNQztaJx5w4M2/hbkhOAXaKLb6k3PI3zTp.png", alt="Chrome’s reading list showing extension doc pages.", width="754", height="1070" %}
<figcaption>The reading list side panel in Chrome.</figcaption>
</figure>



 
## File handling on ChromeOS

The File Handling API lets extensions open files with specified MIME types and file extensions in a similar manner to web platform file handling. Check out [File handling on ChromeOS](/docs/extensions/mv3/file_handling/) for more on how to use it.


<figure>
{% Img src="image/6hHqS5auVgWhN0cQNQztaJx5w4M2/DWpss6N4rnxu3BzfauRv.png", alt="Screenshot of the open file with extension dialog on ChromeOS", width="800", height="454" %}
<figcaption>Open files in an extension on ChromeOS.</figcaption>
</figure>


## Trigger an alarm in 30 seconds

This is a small update, but addresses an important gap in the service worker lifecycle. Due to the event driven nature of service workers, the recommended way to fire an event in the future is to use [`chrome.alarms`](/docs/extensions/reference/alarms/). The Alarms API ensures that the event gets fired even if the service worker shuts down in the meantime. 

There’s a catch though. Before Chrome 120, the shortest timespan to trigger an alarm was 1 minute. However, service workers shut down after 30 seconds of inactivity. So there was no straightforward way to schedule an alarm to fire in 45 seconds, because when using [`setTimeout()`](https://developer.mozilla.org//docs/Web/API/setTimeout) to set an event in 45 seconds, the service worker could potentially be shut down before the event fired. 

With Chrome 120 you can now set an alarm for as short as 30 seconds matching the time:

In a service worker, to fire an event in less than 30 seconds use [`setTimeout()`](https://developer.mozilla.org//docs/Web/API/setTimeout). 
For anything  longer than or equal to 30 seconds, use [`chrome.alarms`](/docs/extensions/reference/alarms/):

await chrome.alarms.create('demo-default-alarm', {
   periodInMinutes: 0.45
 });


## Summary {: #summary }

We are really excited about the progress the extension platform has made over the past year. Chrome 120 is another big step with increasing DNR limits and user script support. 


