---
title: "A deeper dive into Manifest V3"
description: ""  
layout: "layouts/blog-post.njk"
authors:
  - alispivak
date: 2023-06-09
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/dySQ192apvojdQDvVFxS.jpg'
alt: ''
tags:
  - extensions-news
---

As covered in the [technical session at Google I/O 2023](https://www.youtube.com/watch?v=QYd2XiUYNlE), Google has been working over the last several years to adapt the extensions platform and the Chrome Web Store to set a higher bar for performance, data access, privacy, and security. 

Many of the platform changes that raise these standards for extensions are incorporated into Manifest V3. This post will summarize the motivations for moving to MV3 and examine some of the changes that are incorporated into it.

Manifest V2 deprecation timelines are currently under review and there is no official timeline for when we will begin experiments to remove support in Chrome. For more information on deprecation, read our most recent update in the [chromium-extensions](https://groups.google.com/a/chromium.org/g/chromium-extensions/c/zQ77HkGmK9E) Google Group or check out the [Manifest V3 Known Issues page](/docs/extensions/migrating/known-issues/). This post will share some additional context on the migration but does not include any updates on the timeline, which we will share as separate updates in the future.

## Our Goals

As a quick refresher, in 2019, when Manifest V3 was proposed, it acknowledged the need for better protections for sensitive data. In addition to addressing issues with how extensions access and use data, Manifest V3 also aims to improve the performance of extensions by moving some processes off the main thread and using a declarative approach to modifying and filtering network requests.

So, exactly what is changing in Manifest V3? There are three key, large changes plus several smaller adjustments to the platform. We’ll cover the main changes first, then discuss some additional adjustments and a few new API’s.

## No more remotely hosted code

Manifest V3 removes the ability for an extension to use [remotely hosted code](/docs/extensions/migrating/improve-security/#remove-remote-code), which presents security risks by allowing unreviewed code to be executed in extensions. With this change, an extension can only execute JavaScript that is included within its package and subject to review by the Chrome Web Store. Not allowing unreviewed code helps us better protect extension users.

Some best practices for adjusting to this change include loading a remote configuration at runtime, such as a JSON file, and caching the configuration locally. The extension then uses this cached configuration to decide if specific features should be enabled.

Application logic which needs to change frequently can alternatively be moved to a remote web service that your extension can call. This provides the ability to keep code private and change the code on demand while avoiding the extra overhead of resubmitting to the Chrome Web Store.

And If you are using a popular framework like React or Bootstrap which you were previously loading from an external server, you can download the minified files, add them to your project and import them locally.

## Moving to service workers

Another big change is replacing background pages with extension service workers to improve performance and better manage resources.

Background pages have been part of extensions for a long time, and allow extensions a lot of flexibility in how they take action in response to events. However, they can create a consistent drain on resources. A useful way to think of this is imagining a background page as an invisible tab running in the background at all times, even when not being used.

To address this, Manifest V3 switched to service workers for many of the tasks previously done in background pages. Unlike background pages, service workers are ephemeral by design, are stopped when not in use and restart when needed. Similar to [web workers](https://developer.mozilla.org/docs/Web/API/Web_Workers_API/Using_web_workers), all the work they do occurs on their own threads and won't compete for attention with other tasks.

Service workers are a big change, and we have received a lot of feedback from developers on improvements and changes needed to support a wide range of extension use cases. Based on that feedback, we’ve recently made several updates to how extension service workers function in extensions. 

One critical change was to [remove a mandatory 5 minute timeout](/blog/longer-esw-lifetimes/), and ensure that some APIs, such as [native messaging](/docs/extensions/mv3/nativeMessaging/), will always keep a service worker alive during critical operations. We are also working on more intuitive lifetime rules for other APIs, such as messaging and WebSockets, so they are not shut down while continuing to do work.

One area where service workers are different from full document-based pages is that they lack support for DOM APIs (and while DOM APIs can be used in [content scripts](/docs/extensions/mv3/content_scripts/), this leaves extensions at the mercy of different content security policies on a page-to-page basis). To address this, the [Offscreen Documents API](/docs/extensions/reference/offscreen/) was released in Chrome 109. This API allows extensions to open minimal, scoped, and relatively un-permissioned offscreen documents at runtime through a dedicated API, which gives extensions using service workers access to the DOM.

```json
{
  "name": "Offscreen API - DOM Parsing",
  "version": "1.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "background.js"
  },
  "action": {},
  "permissions": ["offscreen"]
}
```

We plan to continue to refine extension service worker APIs to expand their ability to address additional use cases, and we will update Offscreen Documents as needed. For example we recently added two new [reason](/docs/extensions/reference/offscreen/#type-Reason) values, LOCAL_STORAGE and WORKER.

For more information, check out our recently updated extension service worker [documentation](/docs/extensions/mv3/service_workers/) and a new [tutorial](/docs/extensions/mv3/getstarted/tut-quick-reference/).


## Changes to network request modification

The way that extensions modify network requests also changed in Manifest V3. The [Declarative Net Request API](/docs/extensions/reference/declarativeNetRequest/) replaces the blocking version of the Web Request API, and while the [Web Request](/docs/extensions/reference/webRequest/) API continues to be supported, we are evaluating ways to give users more control over the access they grant.

To understand the decisions behind these changes, it’s helpful to know that between January of 2018 and June of 2019, during the design of Manifest V3, 42% of malicious extensions caught by Chrome Web Store review were abusing the Web Request API. This informed the approach to both this API and the blocking version.

In the Web Request API, the browser sends all the data in a network request to the extension, the extension evaluates it and then tells the browser what to do. This API requires host permissions, and each network request is evaluated in the main extension process, which can impact performance. Web Request gives developers great flexibility, but also allows extensions to read everything a user does on the web. At the bare minimum, we believe users need more information and control over this functionality at install or runtime. We want to avoid situations where users give data to extensions without fully understanding what they are sharing or what they are getting in return. 

To help users make these choices, in the coming year we plan to launch some improvements to how users set extensions permissions. 

An in-the-works, updated extension menu will better highlight page-level permissions and allow users to easily toggle those permissions on or off as they browse the web. We’re currently fine-tuning the design and experience, but did preview some ideas for the menu in the “[What’s New in Chrome Extensions](https://www.youtube.com/watch?v=QYd2XiUYNlE)” session recording from Google I/O 2023. 

<figure>
  {% Img src="image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/hKybdlq1HHzQ9QAQD84C.png", alt="Design exploration for the new permissions menu. It's a work in progress.", width="800", height="698" %}
  <figcaption>Preliminary design exploration for the new permissions menu. The final version may differ.</figcaption>
</figure>

Of course, privacy control should also be possible at extension install. That’s why we’re also exploring how to make toggling host permissions at install clearer and easier, so if a user wants to block an extension from accessing their data on their banking site but will allow it anywhere else, they can. Our goal is to make sure the user is informed and in control of what information they’re giving up over the entirety of their extension journey. 

<figure>
  {% Img src="image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/RPRcMNuWjPlGUSjNhjWe.png", alt="Design explorations for improvements to setting host permissions at install", width="800", height="450" %}
  <figcaption>Design explorations for improvements to setting host permissions at install.</figcaption>
</figure>

We are planning on starting development of this functionality by the end of 2023, and will have more to share soon. 

The blocking version of the Web Request API goes a bit further, allowing extensions to programmatically intercept and block network requests, including altering the content of the page. This is useful for certain types of extensions, such as ad-blockers or those that provide parental controls, but it also carries a significant risk of malicious code injection and requires these extensions to have access to a large amount of user data. Unlike the non-blocking version of WebRequest API, we believe addressing this risk requires more than just giving users more information and controls, as we plan to do with the Web Request API. 

Our solution is to replace Web Request Blocking with Declarative Net Request. With Declarative Net Request, extensions can modify and block network requests in a more privacy-preserving and performant way. They do this by asking Chrome to evaluate and modify requests on their behalf, based on a declared set of rules, rather than intercepting a request and modifying it procedurally. This declarative approach dramatically reduces the need for persistent host permissions, as it allows extensions to block network requests without accessing their content. Since Declarative Net Request does not require access to user data we can also avoid requiring explicit user permissions, which we will continue to do for extensions that use Web Request.

By using rules to specify how the browser handles requests, the Declarative Net Request API can support many of the same use cases as Web Request Blocking. Collections of rules ([rulesets](/docs/extensions/reference/declarativeNetRequest/#type-Ruleset)) may be bundled and distributed with a specific version of an extension. 

Here is a sample rule:

```json
{
  "id" : 1,
  "priority": 1,
  "action" : { "type" : "block" },
  "condition" : {
    "urlFilter" : "abc",
    "domains" : ["foo.com"],
    "resourceTypes" : ["script"]
  }
}
```

There are three types of rulesets; static, dynamic, and session. Static rulesets are packaged as part of your extension. The current limits for static rules guarantee at least 30,000 per extension. Extensions may be allowed more, subject to a global limit of 300,000 static rules across all of your extensions.

Dynamic rulesets persist across sessions but not extension updates, and session rulesets are only valid in the current session and do not persist. These two types of rulesets have a combined limit of 5,000 (MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES). This limit is separate from the limits for static rules and is smaller to reflect that they are not intended to replace larger static rulesets that can be reviewed during submission.

We are actively working in the Web Extensions Community Group to evolve the Declarative Net Request API to meet the needs of extension developers, and will continue to evaluate rule limits along with bringing new capabilities to this API. We are actively tracking that work on our [Known Issues](/docs/extensions/migrating/known-issues/#closing-the-platform-gap) page.

We recently updated the Declarative Net Request [documentation](/docs/extensions/reference/declarativeNetRequest/) and added a new set of [samples](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/declarativeNetRequest) to developer.chrome.com.


## Other changes in Manifest V3

There are a number of other changes incorporated into Manifest V3 beyond the three major ones discussed above. These include:


* The Browser Action and Page Action APIs have been replaced with a single [Action API](/docs/extensions/reference/action/), which is demonstrated in the [Action API demo](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/action) in the extension samples repo.
* [Promise](/docs/extensions/mv3/promises/) support has been added to many APIs, though callbacks are still supported for backward compatibility.
* Match patterns are supported in [web accessible resources](/docs/extensions/mv3/manifest/web_accessible_resources/), letting you expose individual resources to specified pages, domains, or extensions.
* A new [Scripting API](/docs/extensions/reference/scripting/) has been added, which includes [dynamic content scripts](/docs/extensions/mv3/content_scripts/#run_time) that allow you to register and unregister content scripts at runtime. A [new sample](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/scripting) for this API demonstrates dynamic declarations, where a content script is registered at runtime, and programmatic injection, where a script is executed in a tab that is already open. In addition, we’ve moved several methods from the Tabs API to the Scripting API, including [executeScript()](/docs/extensions/migrating/api-calls/), [insertCSS()](/docs/extensions/reference/scripting/#method-insertCSS) and [removeCSS()](/docs/extensions/reference/scripting/#method-removeCSS).
* The [Content security policy (CSP)](/docs/extensions/mv3/intro/mv3-migration#content-security-policy) manifest property now allows developers to specify separate policies for different execution contexts in a single object. Certain policies are disallowed to reflect the new policies on remotely hosted code.
* Updating the CSP directive required to use Web Assembly. To learn more, see two new samples demonstrating how to use WASM in an extension, submitted by a contributor on GitHub. [Using WASM in Manifest V3](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.wasm-helloworld-print-nomodule) shows the general method for including a WASM module, and [Using WASM as a module in Manifest V3](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.wasm-helloworld-print) shows how to use it in a module.

Manifest V3 is also the home for the recently introduced [Side Panel API](/docs/extensions/reference/sidePanel/), which we covered in detail in a [recent blog post](/blog/extension-side-panel-launch/).

You can keep up with Manifest V3 status and other updates to Chrome Extensions by visiting the [What's new in Chrome extensions](/docs/extensions/whatsnew/) page, and if you need help, you can ask questions in the [Chromium extensions](https://groups.google.com/a/chromium.org/g/chromium-extensions) Google Group.

Photo by <a href="https://unsplash.com/@marco_assmann?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Marco Assmann</a> on <a href="https://unsplash.com/photos/zUMk4bg8GFc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  